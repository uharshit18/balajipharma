import Fuse from 'fuse.js';
import { PHONE_VALUE } from "../constants";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";
const CACHE_KEY = "balaji_search_index_v3_fuse"; // Updated cache key
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
                threshold: 0.4, // Lower = stricter, Higher = fuzzy (0.4 is good for "Aspprin")
                distance: 100,
                minMatchCharLength: 2,
                ignoreLocation: true
            });
        }
        if (this.brands.length > 0) {
            this.brandFuse = new Fuse(this.brands, {
                keys: ['companyName'],
                threshold: 0.4
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
                    console.log(`[SearchService] Loaded ${brands.length} brands and ${products.length} products from cache.`);
                    this.initFuse(); // Init fuse after load
                    return;
                }
            }
        } catch (e) {
            console.warn("[SearchService] Failed to load cache", e);
        }
    }

    public async initIndex() {
        if (this.brands.length > 0 && this.products.length > 0) {
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
            this.initFuse(); // Re-init fuse with new data
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
        const q = query.trim(); // Do not lowercase, Fuse handles it
        if (!q) {
            return { brands: this.brands, products: [] };
        }

        // 1. Search Brands
        let matchedBrands: SearchBrand[] = [];
        if (this.brandFuse) {
            matchedBrands = this.brandFuse.search(q).map(r => r.item);
        } else {
            // Fallback
            matchedBrands = this.brands.filter(b => b.companyName.toLowerCase().includes(q.toLowerCase()));
        }

        // 2. Search Products
        let matchedProducts: SearchProduct[] = [];
        if (this.productFuse) {
            matchedProducts = this.productFuse.search(q).map(r => r.item);
        } else {
            // Fallback
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
