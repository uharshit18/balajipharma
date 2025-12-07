import { PHONE_VALUE } from "../constants";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://balajipharma.onrender.com";
const CACHE_KEY = "balaji_search_index_v1";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

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
}

class SearchService {
    private brands: SearchBrand[] = [];
    private products: SearchProduct[] = [];
    private isIndexing: boolean = false;
    private listeners: ((isIndexing: boolean) => void)[] = [];

    constructor() {
        this.loadFromCache();
    }

    private loadFromCache() {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { timestamp, brands, products } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    this.brands = brands;
                    this.products = products;
                    console.log(`[SearchService] Loaded ${brands.length} brands and ${products.length} products from cache.`);
                    return;
                }
            }
        } catch (e) {
            console.warn("[SearchService] Failed to load cache", e);
        }
        // If no cache or expired, we will need to build it.
        // We don't auto-build in constructor to avoid side effects, 
        // we let the component trigger it.
    }

    public async initIndex() {
        if (this.brands.length > 0 && this.products.length > 0) {
            // Already have data, maybe check if we want to update in background?
            // For now, just return.
            return;
        }
        await this.buildIndex();
    }

    public async buildIndex() {
        if (this.isIndexing) return;
        this.setIndexing(true);

        try {
            console.log("[SearchService] Starting background indexing via bulk endpoint...");

            const res = await fetch(`${API_BASE_URL}/api/all-data`);
            if (!res.ok) throw new Error("Failed to fetch all-data");

            const data = await res.json();

            this.brands = data.brands || [];
            this.products = data.products || [];

            this.saveToCache();
            console.log(`[SearchService] Indexing complete. ${this.products.length} products indexed.`);

        } catch (e) {
            console.error("[SearchService] Indexing failed", e);
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
        const q = query.toLowerCase().trim();
        if (!q) {
            return { brands: this.brands, products: [] };
        }

        // 1. Search Brands
        const matchedBrands = this.brands.filter(b =>
            b.companyName.toLowerCase().includes(q)
        );

        // 2. Search Products
        // Simple scoring: exact match > starts with > includes
        const matchedProducts = this.products.filter(p =>
            p.productName.toLowerCase().includes(q) ||
            p.composition.toLowerCase().includes(q)
        );

        // Sort products by relevance (optional, keep it fast for now)
        // We can limit results if needed, e.g., top 50
        return {
            brands: matchedBrands,
            products: matchedProducts.slice(0, 100) // Limit to 100 to prevent rendering lag
        };
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
