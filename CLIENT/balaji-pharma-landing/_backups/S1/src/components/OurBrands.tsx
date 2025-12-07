import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, Building2, Loader2 } from "lucide-react";

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
    "Svizera": "https://www.doxinate.com/images/svizera.png",
    "Healing": "https://www.healingpharma.in/wp-content/uploads/2024/08/Healing-Pharma-Logo.png",
    "Indchemie": "https://www.indchemie.in/images/logo.png",
    "Unimarck": "https://unimarckpharma.com/wp-content/uploads/2024/10/1_History_Unimarck.png",
    "Canixa": "https://www.canixalife.com/assets/images/logo.gif",
    "Lincoln": "https://www.lincolnpharma.com/wp-content/uploads/2019/05/logo.png",
    "West Coast": "https://westcoastin.com/wp-content/uploads/2018/11/logo.png",
};

interface Brand {
    companyName: string;
    sheetName: string;
    logoUrl?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://balajipharma.onrender.com";

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
    const [brands, setBrands] = useState<Brand[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/companies`);
                const data = await response.json();

                // Handle different response formats
                const rawBrands = Array.isArray(data) ? data : data.data || [];

                // Map and enrich with local logos
                const enrichedBrands = rawBrands.map((brand: any) => ({
                    companyName: brand.companyName,
                    sheetName: brand.sheetName,
                    logoUrl: getBrandLogo(brand.companyName) || brand.logoUrl // Prioritize local logo
                }));

                setBrands(enrichedBrands);
            } catch (error) {
                console.error("Error fetching brands:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    const createBrandSlug = (brandName: string) => {
        return brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-price-list';
    };

    const filteredBrands = useMemo(() => {
        return brands.filter(brand =>
            brand.companyName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [brands, searchQuery]);

    return (
        <div className="bg-slate-50 min-h-screen font-sans">

            {/* Hero Section - Matches 'Drawer' Design */}
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
                                placeholder="Search for a company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="hidden md:flex pr-2 text-xs text-slate-400 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 whitespace-nowrap">
                                {brands.length} Companies
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10 relative z-20">
                {loading ? (
                    <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-slate-100">
                        <Loader2 className="w-12 h-12 animate-spin mx-auto text-brandBlue mb-4" />
                        <p className="text-slate-500 font-medium">Syncing with Live Inventory...</p>
                    </div>
                ) : filteredBrands.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filteredBrands.map((brand) => (
                            <Link
                                key={brand.sheetName || brand.companyName}
                                to={`/wholesale-medicines/pharmaceutical-brands/${createBrandSlug(brand.companyName)}`}
                                className="group block"
                            >
                                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden h-full flex flex-col items-center">

                                    <div className="h-24 w-full flex items-center justify-center mb-6 p-2">
                                        {brand.logoUrl ? (
                                            <img
                                                src={brand.logoUrl}
                                                alt={brand.companyName}
                                                className="max-h-full w-auto object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-2xl font-bold text-slate-300 uppercase">
                                                {brand.companyName.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Full Name Display */}
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
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <div className="inline-flex p-4 bg-blue-50 rounded-full mb-4">
                            <Search className="text-brandBlue" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No Brand found matching "{searchQuery}"</h3>
                        <p className="text-slate-500">Try searching for a different company.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default OurBrands;