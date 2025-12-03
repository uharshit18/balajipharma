import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, X, Pill, ShieldCheck, Loader2, Table, Download, 
  AlertCircle, RefreshCw, Filter, ShoppingCart, MessageCircle, 
  ChevronRight, ArrowRight, CheckCircle2, Box, Phone
} from 'lucide-react';
import { Button } from './Button';
import { PHONE_VALUE } from '../constants';

// --- CONFIGURATION ---
const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log('VITE_API_URL from frontend:', import.meta.env.VITE_API_URL);
const SHEET_ID = "1aXLlSAJxdJuDyMTQzS7rE37sQ_WLi5LtP7xH6jApiwg"; 
const CSV_FALLBACK_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

// --- ADMIN CONTROLS ---
// Add brand names here to hide their rates (Case insensitive)
const HIDDEN_RATE_BRANDS = ["Pfizer", "Abbott"]; 

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

interface BrandIndexItem {
  name: string;
  productCount: string | number;
  sheetName: string;
  logo: string | null;
}

interface ProductItem {
  productName: string;
  composition: string;
  packing: string;
  mrp: string;
  saleRate: string;
  division: string;
}

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

const parseCSV = (text: string) => {
  const lines = text.split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const obj: any = {};
    headers.forEach((header, index) => {
      let value = currentline[index] ? currentline[index].trim().replace(/^"|"$/g, '') : '';
      obj[header] = value;
    });
    result.push(obj);
  }
  return result;
};

const ProductInquiryModal: React.FC<{ 
    product: ProductItem | null, 
    brandName: string, 
    isOpen: boolean, 
    onClose: () => void 
}> = ({ product, brandName, isOpen, onClose }) => {
    if (!isOpen || !product) return null;

    const handleWhatsApp = () => {
        const message = `Hi Balaji Pharma, I am interested in bulk purchasing:\n\n*Product:* ${product.productName}\n*Brand:* ${brandName}\n*Packing:* ${product.packing}\n*Rate:* ${product.saleRate}\n\nPlease share availability and best quote.`;
        const url = `https://wa.me/${PHONE_VALUE}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-zoom-in">
                <div className="bg-brandBlue px-6 py-4 flex justify-between items-center text-white">
                    <h3 className="font-bold text-lg flex items-center gap-2"><ShoppingCart size={20} /> Bulk Inquiry</h3>
                    <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors"><X size={20} /></button>
                </div>
                
                <div className="p-6">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">{brandName}</p>
                        <h4 className="text-xl font-bold text-slate-900 mb-1">{product.productName}</h4>
                        <p className="text-sm text-slate-600 mb-2 line-clamp-2">{product.composition}</p>
                        <div className="flex gap-3 text-xs mt-3">
                            <span className="bg-white border px-2 py-1 rounded text-slate-600">Pack: <strong>{product.packing}</strong></span>
                            {product.saleRate !== 'Call for Rate' && (
                                <span className="bg-blue-50 border border-blue-100 px-2 py-1 rounded text-blue-700">Rate: <strong>₹{product.saleRate}</strong></span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button 
                            onClick={handleWhatsApp}
                            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20 active:scale-[0.98]"
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-6 h-6" alt="WhatsApp" />
                            Inquire via WhatsApp
                        </button>
                        <p className="text-center text-xs text-slate-400">Directly connects to our sales desk.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const OurBrands: React.FC = () => {
  const [brandIndex, setBrandIndex] = useState<BrandIndexItem[]>([]);
  const [isIndexLoading, setIsIndexLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<BrandIndexItem | null>(null);
  const [currentProducts, setCurrentProducts] = useState<ProductItem[]>([]);
  const [isDrawerLoading, setIsDrawerLoading] = useState(false);
  const [brandSearchTerm, setBrandSearchTerm] = useState("");
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setIsIndexLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/companies`);
      if (!res.ok) throw new Error("Backend not reachable");
      
      const data = await res.json();
      const mappedData = data.map((item: any) => ({
          name: item.companyName,
          productCount: item.productCount,
          sheetName: item.sheetName,
          logo: getBrandLogo(item.companyName)
      }));
      setBrandIndex(mappedData);
      setUsingFallback(false);
    } catch (err) {
      console.warn("Backend failed, using fallback.", err);
      setUsingFallback(true);
    } finally {
      setIsIndexLoading(false);
    }
  };

  const handleBrandClick = async (brand: BrandIndexItem) => {
    setSelectedBrand(brand);
    setIsDrawerLoading(true);
    setCurrentProducts([]);
    setProductSearchTerm("");
    document.body.style.overflow = 'hidden';

    // Check if rates should be hidden for this brand
    const shouldHideRate = HIDDEN_RATE_BRANDS.some(b => brand.name.toLowerCase().includes(b.toLowerCase()));

    try {
        const res = await fetch(`${API_BASE_URL}/api/companies/${encodeURIComponent(brand.sheetName)}`);
        if (!res.ok) throw new Error("Product fetch failed");
        const data = await res.json();
        
        const mappedProducts = data.map((item: any) => ({
            productName: item.productName || 'Unknown Product',
            composition: item.composition || '',
            packing: item.packing || '-',
            mrp: item.mrp || '-',
            saleRate: shouldHideRate ? 'Call for Rate' : (item.saleRate || 'Ask'),
            division: item.division || ''
        }));

        setCurrentProducts(mappedProducts);
    } catch (error) {
        console.error("Error fetching details:", error);
    } finally {
        setIsDrawerLoading(false);
    }
  };

  const closeDrawer = () => {
    setSelectedBrand(null);
    document.body.style.overflow = 'unset';
  };

  // Search Logic
  const filteredBrands = useMemo(() => {
    return brandIndex.filter(brand => brand.name.toLowerCase().includes(brandSearchTerm.toLowerCase()));
  }, [brandIndex, brandSearchTerm]);

  const filteredProducts = useMemo(() => {
    return currentProducts.filter(p => 
        p.productName.toLowerCase().includes(productSearchTerm.toLowerCase()) || 
        p.composition.toLowerCase().includes(productSearchTerm.toLowerCase())
    );
  }, [currentProducts, productSearchTerm]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandBlue/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                Global Brands.<br/>
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
                        placeholder="Search for a company (or enter product name to enquire)..."
                        value={brandSearchTerm}
                        onChange={(e) => setBrandSearchTerm(e.target.value)}
                    />
                    <div className="hidden md:flex pr-2 text-xs text-slate-400 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 whitespace-nowrap">
                        {brandIndex.length} Companies
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Brand Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10 relative z-20">
        {isIndexLoading ? (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-slate-100">
                <Loader2 className="w-12 h-12 animate-spin mx-auto text-brandBlue mb-4" />
                <p className="text-slate-500 font-medium">Syncing with Live Inventory...</p>
            </div>
        ) : filteredBrands.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredBrands.map((brand, idx) => (
                    <div 
                        key={idx}
                        onClick={() => handleBrandClick(brand)}
                        className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    >
                        <div className="relative z-10 flex flex-col items-center text-center h-full">
                            <div className="h-24 w-full flex items-center justify-center mb-6 p-2">
                                {brand.logo ? (
                                    <img 
                                        src={brand.logo} 
                                        alt={brand.name} 
                                        className="max-h-full w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-110" 
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-2xl font-bold text-slate-300 uppercase">
                                        {brand.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <h3 className="text-base font-bold text-slate-800 mb-1 group-hover:text-brandBlue transition-colors w-full break-words">
                                {brand.name}
                            </h3>
                            <div className="mt-auto pt-4 w-full border-t border-slate-50 flex justify-between items-center">
                                <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">Catalog</span>
                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-brandBlue group-hover:text-white transition-colors">
                                    <ChevronRight size={14} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            // SMART FALLBACK FOR PRODUCT SEARCH
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="inline-flex p-4 bg-blue-50 rounded-full mb-4">
                    <Search className="text-brandBlue" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Brand found matching "{brandSearchTerm}"</h3>
                <p className="text-slate-500 mb-6">Are you looking for a specific product named "{brandSearchTerm}"?</p>
                <button 
                    onClick={() => {
                        const message = `Hi Balaji Pharma, I am looking for the product "${brandSearchTerm}". Do you have it in stock?`;
                        window.open(`https://wa.me/${PHONE_VALUE}?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/20"
                >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5" alt="WhatsApp" />
                    Ask Availability on WhatsApp
                </button>
            </div>
        )}
      </section>

      {/* --- PRODUCT DRAWER --- */}
      {selectedBrand && (
        <div className="fixed inset-0 z-[100] h-[100dvh] flex justify-end isolate">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={closeDrawer}></div>
            <div className="relative w-full max-w-5xl bg-white shadow-2xl h-full flex flex-col animate-slide-in-right">
                
                {/* Header */}
                <div className="px-6 lg:px-10 py-6 border-b border-slate-100 bg-white z-20 flex flex-col gap-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-slate-900">{selectedBrand.name}</h2>
                            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Live
                            </p>
                        </div>
                        <button onClick={closeDrawer} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brandBlue/50 transition-all font-medium"
                            placeholder={`Search ${selectedBrand.name} products...`}
                            value={productSearchTerm}
                            onChange={(e) => setProductSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 lg:p-10">
                    {isDrawerLoading ? (
                        <div className="flex flex-col justify-center items-center h-full space-y-4">
                            <Loader2 className="w-10 h-10 animate-spin text-brandBlue" />
                            <p className="text-slate-500 font-medium animate-pulse">Fetching latest rates...</p>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-100 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-wider border border-slate-200">
                                <div className="col-span-5">Product Details</div>
                                <div className="col-span-2 text-center">Packing</div>
                                <div className="col-span-1 text-right">MRP</div>
                                <div className="col-span-1 text-right">Rate</div>
                                <div className="col-span-3 text-center">Action</div>
                            </div>

                            {filteredProducts.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className="group bg-white rounded-xl border border-slate-200 p-5 md:p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                                >
                                    {/* Name */}
                                    <div className="md:col-span-5">
                                        <div className="flex items-start justify-between md:hidden mb-2">
                                            <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{item.division || 'General'}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-brandBlue transition-colors">{item.productName}</h3>
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">{item.composition || 'N/A'}</p>
                                        <div className="mt-2 md:hidden flex gap-4 text-sm">
                                            <div><span className="text-slate-400 text-xs">MRP:</span> <span className="text-slate-600 font-medium">{item.mrp}</span></div>
                                            <div><span className="text-slate-400 text-xs">Rate:</span> <span className="font-bold text-brandBlue">{item.saleRate}</span></div>
                                        </div>
                                    </div>

                                    {/* Packing */}
                                    <div className="md:col-span-2 md:text-center flex md:block items-center gap-2">
                                        <span className="md:hidden text-xs text-slate-400 font-medium">Pack:</span>
                                        <span className="text-sm font-medium text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-100">{item.packing}</span>
                                    </div>

                                    {/* MRP */}
                                    <div className="md:col-span-1 md:text-right hidden md:block">
                                        <div className="text-sm font-medium text-slate-500">{item.mrp}</div>
                                    </div>

                                    {/* Rate */}
                                    <div className="md:col-span-1 md:text-right hidden md:block">
                                        <div className="text-sm font-bold text-brandBlue">{item.saleRate}</div>
                                    </div>

                                    {/* Actions */}
                                    <div className="md:col-span-3 flex items-center justify-end gap-3 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                                        <button 
                                            onClick={() => setInquiryProduct(item)}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                                        >
                                            <ShoppingCart size={16} /> Bulk Order
                                        </button>
                                        
                                        <button 
                                            onClick={() => {
                                                const message = `Hi Balaji Pharma, I need info on: ${item.productName} (${item.packing})`;
                                                window.open(`https://wa.me/${PHONE_VALUE}?text=${encodeURIComponent(message)}`, '_blank');
                                            }}
                                            className="p-2.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-lg transition-colors border border-[#25D366]/20 shadow-sm"
                                            title="Quick WhatsApp"
                                        >
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5" alt="WhatsApp" style={{ filter: 'inherit' }} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <Search size={32} className="opacity-50 mb-4" />
                            <h3 className="text-lg font-semibold text-slate-600">No products found</h3>
                            <p className="text-sm">Try a different search term.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}

      {/* Inquiry Modal */}
      <ProductInquiryModal 
        isOpen={!!inquiryProduct} 
        product={inquiryProduct} 
        brandName={selectedBrand?.name || ''} 
        onClose={() => setInquiryProduct(null)} 
      />
    </div>
  );
};