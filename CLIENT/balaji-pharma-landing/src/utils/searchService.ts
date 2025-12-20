import Fuse from 'fuse.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const CACHE_KEY = 'balaji_search_index_v8_static'; // Incremented to v8 to clear poisoned cache
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours (for master data)
const STOCK_POLL_INTERVAL = 60 * 60 * 1000; // 60 minutes

export interface SearchBrand {
    companyName: string;
    sheetName: string;
    logoUrl?: string;
}

export interface SearchProduct {
    productName: string;
    composition: string;
    packing: string;
    mrp: string;
    saleRate: string;
    division: string;
    brandName: string;
    brandSlug: string;
    productCode?: string;
    stock?: string;
}

export interface SearchResult {
    brands: SearchBrand[];
    products: SearchProduct[];
    source?: 'static' | 'api' | 'cache';
}

interface StockData {
    [productCode: string]: string; // stock quantity
}

class SearchService {
    private brands: SearchBrand[] = [];
    private products: SearchProduct[] = [];
    private isIndexing: boolean = false;
    private listeners: ((isIndexing: boolean) => void)[] = [];
    private stockPollingInterval: NodeJS.Timeout | null = null;

    // Debug stats
    public lastStockStats = {
        fetchSource: 'none' as 'none' | 'api' | 'static',
        stockEntries: 0,
        matchCount: 0,
        missingCodeCount: 0,
        error: null as string | null,
        timestamp: 0
    };

    // Fuse instances
    private productFuse: Fuse<SearchProduct> | null = null;
    private brandFuse: Fuse<SearchBrand> | null = null;

    public getDebugInfo() {
        return {
            cacheKey: CACHE_KEY,
            brandsCount: this.brands.length,
            productsCount: this.products.length,
            sampleProduct: this.products.length > 0 ? this.products[0] : null,
            // Find a product that SHOULD have stock (e.g. Abbott) to see if it has code
            sampleAbbott: this.products.find(p => p.productName.includes('ALINFEC')),
            firstFiveProductsWithStock: this.products.filter(p => p.stock).slice(0, 5),
            stockStats: this.lastStockStats,
            localStorageTimestamp: localStorage.getItem(CACHE_KEY) ? JSON.parse(localStorage.getItem(CACHE_KEY) || '{}').timestamp : 'Not found'
        };
    }

    constructor() {
        this.loadFromCache();
    }

    private initFuse() {
        if (this.products.length > 0) {
            this.productFuse = new Fuse(this.products, {
                keys: [
                    { name: 'productName', weight: 0.6 },
                    { name: 'composition', weight: 0.3 },
                    { name: 'brandName', weight: 0.1 }
                ],
                threshold: 0.3,
                distance: 100,
                minMatchCharLength: 2,
                ignoreLocation: true
            });
        }
        if (this.brands.length > 0) {
            this.brandFuse = new Fuse(this.brands, {
                keys: ['companyName'],
                threshold: 0.4,
                ignoreLocation: true
            });
        }
    }

    private loadFromCache() {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { timestamp, brands, products } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    this.brands = brands;
                    this.products = products;
                    console.log(`[SearchService] Restored ${brands.length} brands and ${products.length} products from localStorage.`);
                    this.initFuse();
                    // Even if loaded from cache, fetch latest stock
                    this.updateStockStatus();
                    return;
                }
            }
        } catch (e) {
            console.warn("[SearchService] Failed to load cache", e);
        }
    }

    public async initIndex() {
        // If we already have data (from cache), we MUST ensure stock is fresh before returning
        // otherwise the UI will render with old/missing stock data.
        if (this.brands.length > 0 && this.products.length > 0) {
            console.log("[SearchService] Using cached data. Refreshing stock...");
            await this.updateStockStatus();
            this.startStockPolling();
            return;
        }

        await this.buildIndex();
        this.startStockPolling();
    }

    private startStockPolling() {
        if (this.stockPollingInterval) return;

        // Initial fetch
        this.updateStockStatus();

        // Poll every 60 mins
        this.stockPollingInterval = setInterval(() => {
            this.updateStockStatus();
        }, STOCK_POLL_INTERVAL);
    }

    public async updateStockStatus() {
        if (this.products.length === 0) return;

        try {
            let stockList: any[] = [];

            // 1. Try fetching from API first
            try {
                // console.log("[SearchService] Fetching stock updates from API...");
                const res = await fetch(`${API_BASE_URL}/api/stock-status`);
                if (!res.ok) throw new Error('API failed');
                stockList = await res.json();

                // CRITICAL FIX: If API returns empty list (but 200 OK), treat as failure
                if (Array.isArray(stockList) && stockList.length === 0) {
                    throw new Error('API returned empty stock list');
                }
            } catch (apiError) {
                console.warn('[SearchService] API stock fetch failed or empty, using static file fallback.', apiError);
                // 2. Fallback to Static File
                try {
                    // console.log("[SearchService] Fetching stock updates from static file...");
                    // Use time-based cache busting
                    const res = await fetch(`/assets/ADMINStocks.json?v=${Date.now()}`);
                    if (!res.ok) throw new Error("Failed to fetch static ADMINStocks.json");
                    stockList = await res.json();
                } catch (staticError) {
                    console.error('[SearchService] All stock fetch attempts failed', staticError);
                    return;
                }
            }

            if (!Array.isArray(stockList)) return;

            // Create Map
            const stockMap = new Map<string, string>();
            stockList.forEach((item: any) => {
                if (item.ProductCode) {
                    stockMap.set(String(item.ProductCode).trim().toLowerCase(), String(item.TotalStock || '0'));
                }
            });

            // Update Products
            this.products.forEach(p => {
                if (p.productCode) {
                    const normalized = p.productCode.trim().toLowerCase();
                    if (stockMap.has(normalized)) {
                        p.stock = stockMap.get(normalized);
                    } else {
                        p.stock = undefined;
                    }
                }
            });

            console.log(`[SearchService] Stock updated. Matched against ${stockList.length} entries.`);

        } catch (err) {
            console.error("[SearchService] Failed to update stock status", err);
        }
    }

    public async buildIndex() {
        if (this.isIndexing) return;
        this.setIndexing(true);

        try {
            console.log("[SearchService] Starting Data Fetch...");

            let fetchedData: { brands: SearchBrand[], products: SearchProduct[] } | null = null;

            let staleData: { brands: SearchBrand[], products: SearchProduct[] } | null = null;

            // STRATEGY 1: Fetch Static JSON (Fastest)
            try {
                console.time("Fetch Static Data");
                const response = await fetch(`/master-data.json?v=${new Date().getTime()}`);
                console.timeEnd("Fetch Static Data");

                if (response.ok) {
                    const data = await response.json();

                    // Validate data freshness: ensure productCode exists
                    if (data.products && data.products.length > 0 && !data.products[0].productCode) {
                        console.warn("Static master-data.json is stale (missing productCode) - Marking as stale candidate");
                        staleData = data;
                    } else {
                        fetchedData = data;
                        console.log("[SearchService] Successfully loaded fresh static master-data.json");
                    }
                } else {
                    console.warn(`[SearchService] Static master-data.json not found (${response.status})`);
                }
            } catch (err) {
                console.warn("[SearchService] Static fetch failed", err);
            }

            // STRATEGY 2: Fallback to Live API (Slower) if no valid data
            if (!fetchedData) {
                console.log("[SearchService] Valid static data not found. Attempting Live API...");
                try {
                    const res = await fetch(`${API_BASE_URL}/api/all-data`);
                    if (!res.ok) throw new Error("Failed to fetch all-data from API");
                    fetchedData = await res.json();
                    console.log("[SearchService] Successfully loaded from Live API");
                } catch (apiErr) {
                    console.error("[SearchService] Live API failed", apiErr);

                    if (staleData) {
                        console.warn("[SearchService] API failed. Falling back to STALE static data (Stock status will be inaccurate).");
                        fetchedData = staleData;
                    } else {
                        throw apiErr; // No data at all
                    }
                }
            }


            if (fetchedData) {
                this.brands = fetchedData.brands || [];
                this.products = fetchedData.products || [];

                // After fetching main data, fetch and merge stock
                await this.updateStockStatus();

                this.saveToCache();
                this.initFuse();
                console.log(`[SearchService] Indexing complete. ${this.products.length} products ready.`);
            }

        } catch (e) {
            console.error("[SearchService] Indexing entirely failed", e);
            // Retry logic could go here
        } finally {
            this.setIndexing(false);
        }
    }

    private saveToCache() {
        try {
            const payload = {
                timestamp: Date.now(),
                brands: this.brands,
                products: this.products
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
        } catch (e) {
            console.warn("[SearchService] Failed to save cache (quota exceeded?)", e);
        }
    }

    public search(query: string): SearchResult {
        const q = query.trim();
        if (!q) {
            // Return empty or default results
            return { brands: this.brands, products: this.products.slice(0, 50) };
        }

        // 1. Search Brands
        let matchedBrands: SearchBrand[] = [];
        if (this.brandFuse) {
            matchedBrands = this.brandFuse.search(q).map(r => r.item);
        } else {
            matchedBrands = this.brands.filter(b => b.companyName.toLowerCase().includes(q.toLowerCase()));
        }

        // 2. Search Products
        let matchedProducts: SearchProduct[] = [];
        if (this.productFuse) {
            matchedProducts = this.productFuse.search(q).map(r => r.item);
        } else {
            matchedProducts = this.products.filter(p =>
                p.productName.toLowerCase().includes(q.toLowerCase()) ||
                p.composition.toLowerCase().includes(q.toLowerCase())
            );
        }

        return {
            brands: matchedBrands,
            products: matchedProducts.slice(0, 100)
        };
    }

    public getProductsByBrand(brandSlug: string): SearchProduct[] {
        if (!this.products.length) return [];
        return this.products.filter(p => p.brandSlug === brandSlug);
    }

    public getProductsByCompanyName(companyName: string): SearchProduct[] {
        if (!this.products.length || !companyName) return [];
        const target = companyName.toLowerCase().trim();
        return this.products.filter(p =>
            (p.brandName && p.brandName.toLowerCase() === target) ||
            (p.division && p.division.toLowerCase() === target)
        );
    }

    public getAllBrands(): SearchBrand[] {
        return this.brands;
    }

    public subscribe(listener: (isIndexing: boolean) => void) {
        this.listeners.push(listener);
        listener(this.isIndexing);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private setIndexing(value: boolean) {
        this.isIndexing = value;
        this.listeners.forEach(l => l(value));
    }

    public getProductCount() {
        return this.products.length;
    }
}

export const searchService = new SearchService();

