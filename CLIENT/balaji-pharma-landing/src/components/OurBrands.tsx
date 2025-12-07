import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, Building2, Loader2, ShoppingCart, Pill } from "lucide-react";
import { searchService, SearchResult, SearchProduct } from "../utils/searchService";
import { PHONE_VALUE } from "../constants";

// --- ASSETS: LOGO DATABASE ---
const BRAND_LOGOS: Record<string, string> = {
    "Sun Pharma": "https://upload.wikimedia.org/wikipedia/en/5/50/Sun_Pharma_logo.svg",
    "Dr. Reddy's": "https://baselarea.swiss//wp-content/uploads/2020/06/dr-reddys-logo.jpg",
    "Cipla": "https://upload.wikimedia.org/wikipedia/commons/b/be/Cipla_logo.svg",
    "Mankind": "https://i0.wp.com/spicyip.com/wp-content/uploads/2025/08/image-34.png?resize=1024%2C560&ssl=1",
    "Zydus": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/Zydus_Lifesciences.svg/1200px-Zydus_Lifesciences.svg.png",
    "Torrent": "https://images.cnbctv18.com/uploads/2024/06/torrent-pharma-logo-2024-06-0bef5070e6f7acf2072a9951f836938f-780x438.jpg",
    "Glenmark": "https://upload.wikimedia.org/wikipedia/en/6/62/Glenmark_Pharmaceuticals_logo.png",
    "Abbott": "https://www.molecular.abbott/etc.clientlibs/abbott-platform/clientlibs/clientlib-site/resources/images/abbott-logo.png",
    "GSK": "https://corporatewatch.org/wp-content/uploads/2017/10/Glaxo-SmithKline-PLC_company_logo.jpg",
    "Pfizer": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL16DdYjx1f8fvx9eUFGRd7zMJ7WQOcJ4WuQ&s",
    "Intas": "https://static.capitalgroup.com/content/dam/cgc/shared-content/images/private-markets/portfolio-images/Intas.cq5dam.web.1280.1280%20copy.png",
    "Aristo": "https://medicaldialogues.in/h-upload/2022/09/09/185303-aristo-logo.webp",
    "Alkem": "https://www.alkemlabs.com/images/logo.png",
    "Lupin": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Lupin_Limited_Logo.svg/2560px-Lupin_Limited_Logo.svg.png",
    "Macleods": "https://macleodspharma.com/wp-content/uploads/2019/06/logo.png",
    "Micro Labs": "https://www.microlabsltd.com/static/media/logo.92523277.svg",
    "FDC": "https://www.fdcindia.com/images/logo.png",
    "Blue Cross": "https://www.pilanienviro.com/sitepad-data/uploads/2023/07/blue-cross.jpg",
    "Ipca": "https://www.ipca.com/wp-content/themes/ipca/images/logo.png",
    "Alembic": "https://www.alembicpharmaceuticals.com/wp-content/uploads/2018/06/alembic-logo.png",
    "Ajanta": "https://ajantapharma.com/images/logo.png",
    "Eris": "https://eris.co.in/wp-content/uploads/2016/05/logo.png",
    "Indoco": "https://www.indoco.com/images/logo.png",
    "J.B. Chemicals": "https://jbpharma.com/wp-content/uploads/2021/08/JB-Logo.png",
    "Hetero": "https://hetero.com/images/logo.png",
    "Corona": "https://coronaremedies.com/assets/img/logo.png",
    "Leeford": "https://www.leeford.in/img/logo.png",
    "Systopic": "https://systopic.com/wp-content/uploads/2021/03/systopic-logo.png",
    "Zuventus": "https://www.zuventus.co.in/images/logo.png",
    "Himalaya": "https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Himalaya_Wellness_logo.svg/1200px-Himalaya_Wellness_logo.svg.png",
    "Dabur": "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Dabur_Logo.svg/1200px-Dabur_Logo.svg.png",
    "Baidyanath": "https://www.baidyanath.co.in/images/logo.png",
    "Patanjali": "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Patanjali_Ayurved_Logo.svg/1200px-Patanjali_Ayurved_Logo.svg.png",
    "Kepler": "https://keplerhealthcare.com/wp-content/uploads/2020/09/kepler-logo.png",
    "Kepler Healthcare": "https://keplerhealthcare.com/wp-content/uploads/2020/09/kepler-logo.png",
    "Svizera": "https://www.doxinate.com/images/svizera.png",
    "Healing": "https://www.healingpharma.in/wp-content/uploads/2024/08/Healing-Pharma-Logo.png",
    "Healing Pharma": "https://www.healingpharma.in/wp-content/uploads/2024/08/Healing-Pharma-Logo.png",
    "Indchemie": "https://www.indchemie.in/images/logo.png",
    "Indchemie Health": "https://www.indchemie.in/images/logo.png",
    "Unimarck": "https://unimarckpharma.com/wp-content/uploads/2024/10/1_History_Unimarck.png",
    "Unimarck Pharma": "https://unimarckpharma.com/wp-content/uploads/2024/10/1_History_Unimarck.png",
    "Canixa": "https://www.canixalife.com/assets/images/logo.gif",
    "Canixa Lifesciences": "https://www.canixalife.com/assets/images/logo.gif",
    "Lincoln": "https://www.lincolnpharma.com/wp-content/uploads/2019/05/logo.png",
    "Lincoln Pharma": "https://www.lincolnpharma.com/wp-content/uploads/2019/05/logo.png",
    "West Coast": "https://westcoastin.com/wp-content/uploads/2018/11/logo.png",
    "West Coast Pharma": "https://westcoastin.com/wp-content/uploads/2018/11/logo.png",
    "Cachet Pharma": "https://iphex-india.com/uploads/company_logo_2024/603_CACHET_PHARMACEUTICALS_PVT._LTD._comp_logo_20240712115235.png",
    "Ind-Swift": "https://www.indswiftgroup.com/wp-content/uploads/2025/03/logo-side.png",
    "Kenmed Pharma": "https://lh3.googleusercontent.com/proxy/ZaDLXsesOWhj7HkcXDcvWxl0WihJ6eDQzjASundqtPl6-6WGwHp7c66KgDIqVn6TW7Jw",
    "Innovcare": "https://www.innovcare.in/wp-content/uploads/2022/07/Logo.png",
    "Comed": "https://logospharma.com/wp-content/uploads/2022/04/10-scaled.jpg",
};

const getBrandLogo = (brandName: string) => {
    if (!brandName) return null;
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

    useEffect(() => {
        // Initialize search service
        const init = async () => {
            await searchService.initIndex();
            // Initial search to load all brands
            setResults(searchService.search(""));
            setLoading(false);
        };
        init();

        // Subscribe to indexing status
        const unsubscribe = searchService.subscribe(setIsIndexing);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleSearch = () => {
            const res = searchService.search(searchQuery);
            setResults(res);
        };

        // Debounce search
        const timeoutId = setTimeout(handleSearch, 100);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const createBrandSlug = (brandName: string) => {
        return brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-price-list';
    };

    const handleWhatsAppInquiry = (product: SearchProduct) => {
        const message = `Hi Balaji Pharma, I am interested in:\n\n*Product:* ${product.productName}\n*Brand:* ${product.brandName}\n*Packing:* ${product.packing}\n*Rate:* ${product.saleRate}\n\nPlease share availability.`;
        const url = `https://wa.me/${PHONE_VALUE}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans">

            {/* Hero Section */}
            <section className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandBlue/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                        Global Brands.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300">Local Reliability.</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Browse our real-time inventory of <strong>75+ pharmaceutical giants</strong>.
                    </p>

                    {/* Main Search Bar */}
                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative bg-white rounded-xl shadow-2xl flex items-center p-2">
                            <Search className="ml-4 text-slate-400 w-6 h-6" />
                            <input
                                type="text"
                                className="w-full p-4 text-lg outline-none text-slate-700 placeholder:text-slate-400 bg-transparent"
                                placeholder="Search for a company or product..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="hidden md:flex flex-col items-end pr-2">
                                <span className="text-xs text-slate-400 font-medium bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 whitespace-nowrap">
                                    {results.brands.length} Brands
                                </span>
                                {isIndexing && (
                                    <span className="text-[10px] text-emerald-500 flex items-center gap-1 mt-1 animate-pulse">
                                        <Loader2 className="w-3 h-3 animate-spin" /> Indexing Products...
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10 relative z-20">
                {loading ? (
                    <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-slate-100">
                        <Loader2 className="w-12 h-12 animate-spin mx-auto text-brandBlue mb-4" />
                        <p className="text-slate-500 font-medium">Loading Brands...</p>
                    </div>
                ) : (
                    <div className="space-y-12">

                        {/* 1. Brand Results */}
                        {results.brands.length > 0 && (
                            <div>
                                {searchQuery && <h2 className="text-2xl font-bold text-slate-800 mb-6">Brands ({results.brands.length})</h2>}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {results.brands.map((brand) => (
                                        <Link
                                            key={brand.sheetName || brand.companyName}
                                            to={`/wholesale-medicines/pharmaceutical-brands/${createBrandSlug(brand.companyName)}`}
                                            className="group block"
                                        >
                                            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden h-full flex flex-col items-center">

                                                <div className="h-24 w-full flex items-center justify-center mb-6 p-2">
                                                    {getBrandLogo(brand.companyName) || brand.logoUrl ? (
                                                        <img
                                                            src={getBrandLogo(brand.companyName) || brand.logoUrl}
                                                            alt={brand.companyName}
                                                            className="max-h-full w-auto object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-2xl font-bold text-slate-300 uppercase">
                                                            {brand.companyName.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>

                                                <h3 className="text-base font-bold text-slate-800 mb-1 group-hover:text-brandBlue transition-colors w-full break-words text-center">
                                                    {brand.companyName}
                                                </h3>

                                                <div className="mt-auto pt-4 w-full border-t border-slate-50 flex justify-between items-center">
                                                    <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">Catalog</span>
                                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-brandBlue group-hover:text-white transition-colors">
                                                        <ChevronRight size={14} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2. Product Results */}
                        {results.products.length > 0 && (
                            <div className="animate-fadeIn">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    Products ({results.products.length})
                                    <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Top 100 matches</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {results.products.map((product, idx) => (
                                        <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-bold text-slate-900 line-clamp-1" title={product.productName}>{product.productName}</h3>
                                                    <p className="text-xs text-slate-500">{product.composition}</p>
                                                </div>
                                                <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded">{product.brandName}</span>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm mt-2 mb-4">
                                                <div className="flex items-center gap-1 text-slate-600">
                                                    <Pill size={14} /> {product.packing}
                                                </div>
                                                <div className="flex items-center gap-1 font-semibold text-slate-900">
                                                    ₹{product.saleRate} <span className="text-xs font-bold text-slate-900">₹{product.mrp}</span>
                                                </div>
                                            </div>

                                            <div className="mt-auto flex gap-2">
                                                <button
                                                    onClick={() => handleWhatsAppInquiry(product)}
                                                    className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                                >
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-4 h-4" alt="WhatsApp" />
                                                    Inquire
                                                </button>
                                                <Link
                                                    to={`/wholesale-medicines/pharmaceutical-brands/${product.brandSlug}`}
                                                    className="px-3 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                                                    title="View Brand Catalog"
                                                >
                                                    <ChevronRight size={18} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* No Results */}
                        {searchQuery && results.brands.length === 0 && results.products.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                                <div className="inline-flex p-4 bg-blue-50 rounded-full mb-4">
                                    <Search className="text-brandBlue" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No results found for "{searchQuery}"</h3>
                                <p className="text-slate-500 mb-6">
                                    {isIndexing ? "Still indexing products... please wait a moment." : "Try checking the spelling or search for a different product."}
                                </p>
                                <button
                                    onClick={() => {
                                        const message = `Hi Balaji Pharma, I am looking for "${searchQuery}". Do you have it?`;
                                        window.open(`https://wa.me/${PHONE_VALUE}?text=${encodeURIComponent(message)}`, '_blank');
                                    }}
                                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/20"
                                >
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5" alt="WhatsApp" />
                                    Ask on WhatsApp
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default OurBrands;