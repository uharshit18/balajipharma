import Fuse from 'fuse.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const CACHE_KEY = "balaji_search_index_v6_static"; // Updated cache key
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours (for master data)

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
}

export interface SearchResult {
    brands: SearchBrand[];
    products: SearchProduct[];
    source?: 'static' | 'api' | 'cache';
}

class SearchService {
    private brands: SearchBrand[] = [];
    private products: SearchProduct[] = [];
    private isIndexing: boolean = false;
    private listeners: ((isIndexing: boolean) => void)[] = [];

    // Fuse instances
    private productFuse: Fuse<SearchProduct> | null = null;
    private brandFuse: Fuse<SearchBrand> | null = null;

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
                    return;
                }
            }
        } catch (e) {
            console.warn("[SearchService] Failed to load cache", e);
        }
    }

    public async initIndex() {
        // If we already have data (from cache), don't re-fetch immediately unless forced
        if (this.brands.length > 0 && this.products.length > 0) {
            // Optional: Background re-validate if needed
            return;
        }
        await this.buildIndex();
    }

    public async buildIndex() {
        if (this.isIndexing) return;
        this.setIndexing(true);

        try {
            console.log("[SearchService] Starting Data Fetch...");

            let fetchedData: { brands: SearchBrand[], products: SearchProduct[] } | null = null;

            // STRATEGY 1: Fetch Static JSON (Fastest)
            try {
                console.time("Fetch Static Data");
                const response = await fetch('/master-data.json');
                console.timeEnd("Fetch Static Data");

                if (response.ok) {
                    fetchedData = await response.json();
                    console.log("[SearchService] Successfully loaded static master-data.json");
                } else {
                    console.warn(`[SearchService] Static master-data.json not found (${response.status})`);
                }
            } catch (err) {
                console.warn("[SearchService] Static fetch failed", err);
            }

            // STRATEGY 2: Fallback to Live API (Slower)
            if (!fetchedData) {
                console.log("[SearchService] Fallback to Live API...");
                const res = await fetch(`${API_BASE_URL}/api/all-data`);
                if (!res.ok) throw new Error("Failed to fetch all-data from API");
                fetchedData = await res.json();
            }

            if (fetchedData) {
                this.brands = fetchedData.brands || [];
                this.products = fetchedData.products || [];

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

    // Get products filtered by brand slug
    public getProductsByBrand(brandSlug: string): SearchProduct[] {
        if (!this.products.length) return [];
        return this.products.filter(p => p.brandSlug === brandSlug);
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
