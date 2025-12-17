import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, Loader2, Pill } from "lucide-react";
import { useCart } from "../context/CartContext";
import { searchService, SearchResult, SearchProduct } from "../utils/searchService";
import { PHONE_VALUE } from "../constants";
import { Card } from "./UI/Card";
import { Button } from "./UI/Button";
import { Section } from "./UI/Section";

import logoMap from '../data/logoMap.json';

// --- ASSETS: LOGO DATABASE ---
// Keeping this as a fallback for external URLs if needed, but prioritizing local map
const BRAND_LOGOS: Record<string, string> = {
    "Sun Pharma": "https://upload.wikimedia.org/wikipedia/en/5/50/Sun_Pharma_logo.svg",
    // ... (rest of the list can stay or be removed, but better to keep for now as fallback)
};

const getBrandLogo = (brandName: string) => {
    if (!brandName) return null;

    // 1. Try Local Map (New Logic)
    // slugify: "Sun Pharma" -> "sun_pharma" or "sun-pharma"
    const snakeSlug = brandName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    const kebabSlug = brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const localLogo = (logoMap as any)[snakeSlug] || (logoMap as any)[kebabSlug];
    if (localLogo) {
        return `/brands/${localLogo}`;
    }

    // 2. Fallback to Hardcoded List (Old Logic)
    const lowerName = brandName.toLowerCase();
    const key = Object.keys(BRAND_LOGOS).find(k =>
        k.toLowerCase() === lowerName ||
        lowerName.includes(k.toLowerCase()) ||
        k.toLowerCase().includes(lowerName)
    );
    return key ? BRAND_LOGOS[key] : null;
};

const OurBrands: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState<SearchResult>({ brands: [], products: [] });
    const [isIndexing, setIsIndexing] = useState(false);
    const [loading, setLoading] = useState(true);
    const { items, addItem, updateQuantity } = useCart();

    useEffect(() => {
        const init = async () => {
            // Mocking index init success if offline, generally searchService handles this.
            if (searchService.initIndex) await searchService.initIndex();
            setResults(searchService.search(""));
            setLoading(false);
        };
        init();
        const unsubscribe = searchService.subscribe(setIsIndexing);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleSearch = () => {
            const res = searchService.search(searchQuery);
            setResults(res);
        };
        const timeoutId = setTimeout(handleSearch, 100);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const createBrandSlug = (brandName: string) => {
        return brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-price-list';
    };

    const formatPrice = (price: string | number | null | undefined) => {
        if (!price || price === '0' || price === 0 || price === '') return '₹';
        return `₹${price}`;
    };

    const handleWhatsAppInquiry = (product: SearchProduct) => {
        const message = `Hi Balaji Pharma, I am interested in:\n\n*Product:* ${product.productName}\n*Brand:* ${product.brandName}\n*Packing:* ${product.packing}\n*Rate:* ${product.saleRate}\n\nPlease share availability.`;
        const url = `https://wa.me/${PHONE_VALUE}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            {/* Header / Search Section */}
            <Section background="dark" className="relative overflow-hidden !pt-40 !pb-24">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brandBlue/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Authorized Distribution <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Partner of Giants.</span>
                    </h1>
                    <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Instant access to 100+ top pharmaceutical companies. <br className="hidden md:block" /> Search brands or products to see live wholesale rates.
                    </p>

                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-cyan-500/50 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        <div className="relative bg-white rounded-xl shadow-2xl flex items-center p-2">
                            <Search className="ml-4 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                className="w-full p-4 text-lg outline-none text-slate-800 placeholder:text-slate-400 bg-transparent"
                                placeholder="Search 'Sun Pharma' or 'Dolo 650'..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {isIndexing && (
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full animate-pulse">
                                    <Loader2 className="w-3 h-3 animate-spin" /> Indexing
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Section>

            <Section background="light">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-brandBlue mb-4" />
                        <p className="text-slate-500 font-medium">Loading Catalog...</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {/* BRANDS GRID */}
                        {results.brands.length > 0 && searchQuery.length < 3 && (
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-slate-800">Available Brands</h2>
                                    <span className="text-sm font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                                        {results.brands.length} Companies
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                    {results.brands.map((brand) => (
                                        <Link
                                            key={brand.sheetName || brand.companyName}
                                            to={`/wholesale-medicines/pharmaceutical-brands/${createBrandSlug(brand.companyName)}`}
                                            className="block h-full"
                                        >
                                            <Card className="h-full flex flex-col items-center justify-between !p-5 group cursor-pointer border-slate-200">
                                                <div className="h-16 w-full flex items-center justify-center mb-4">
                                                    {getBrandLogo(brand.companyName) || brand.logoUrl ? (
                                                        <img
                                                            src={getBrandLogo(brand.companyName) || brand.logoUrl}
                                                            alt={brand.companyName}
                                                            className="max-h-full max-w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-400 group-hover:bg-blue-50 group-hover:text-brandBlue transition-colors">
                                                            {brand.companyName.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <h3 className="text-sm font-bold text-slate-700 text-center w-full group-hover:text-brandBlue transition-colors">
                                                    {brand.companyName}
                                                </h3>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* PRODUCT RESULTS */}
                        {(searchQuery.length >= 3 || results.products.length > 0) && (
                            <div className="animate-fade-in-up">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                    Search Results
                                    <span className="text-sm font-normal text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">
                                        {results.products.length} Items Found
                                    </span>
                                </h2>

                                {results.products.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {results.products.map((product, idx) => (
                                            <Card key={idx} className="!p-4 border-slate-200 hover:border-blue-300">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-slate-900 line-clamp-1 text-lg mb-1">{product.productName}</h3>
                                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{product.composition}</p>
                                                    </div>
                                                    <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100 uppercase tracking-wider">{product.brandName}</span>
                                                </div>

                                                <div className="flex items-center gap-4 text-sm mt-4 mb-6 p-3 bg-slate-50 rounded-lg">
                                                    <div className="flex items-center gap-1 text-slate-600">
                                                        <Pill size={14} className="text-slate-400" /> {product.packing}
                                                    </div>
                                                    <div className="ml-auto font-semibold text-slate-900 text-base">
                                                        {formatPrice(product.saleRate)} <span className="text-xs font-medium text-slate-400 line-through ml-1">{formatPrice(product.mrp)}</span>
                                                    </div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <div className="flex gap-2 w-full">
                                                        {(() => {
                                                            const inCart = items.find(i => i.productName === product.productName);
                                                            return inCart ? (
                                                                <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-1 w-full">
                                                                    <button
                                                                        onClick={() => updateQuantity(product.productName, -1)}
                                                                        className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-slate-700 hover:text-brandBlue font-bold"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <span className="font-bold text-slate-900 text-sm">{inCart.quantity}</span>
                                                                    <button
                                                                        onClick={() => updateQuantity(product.productName, 1)}
                                                                        className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-slate-700 hover:text-brandBlue font-bold"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <Button
                                                                    variant="primary"
                                                                    fullWidth
                                                                    size="sm"
                                                                    onClick={() => addItem(product)}
                                                                    className="!bg-brandBlue !shadow-lg hover:!bg-blue-700"
                                                                >
                                                                    Add to Cart
                                                                </Button>
                                                            );
                                                        })()}
                                                    </div>
                                                    <Link to={`/wholesale-medicines/pharmaceutical-brands/${product.brandSlug}`} className="flex-1">
                                                        <Button variant="secondary" fullWidth size="sm">
                                                            Pricelist
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 border-dashed">
                                        <div className="inline-flex p-4 bg-slate-50 rounded-full mb-4">
                                            <Search className="text-slate-400" size={24} />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">No matches found</h3>
                                        <p className="text-slate-500 mb-6 text-sm">We might still have it in offline stock.</p>
                                        <Button
                                            onClick={() => {
                                                const message = `Hi Balaji Pharma, I am looking for "${searchQuery}". Do you have it?`;
                                                window.open(`https://wa.me/${PHONE_VALUE}?text=${encodeURIComponent(message)}`, '_blank');
                                            }}
                                            className="!bg-[#25D366]"
                                        >
                                            Ask on WhatsApp
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Section>
        </div>
    );
};

export default OurBrands;