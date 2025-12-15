import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { Phone, CheckCircle2, Search, ArrowLeft, Loader2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PHONE_VALUE } from '../constants';
import { getBrandData } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

interface Product {
    productName: string;
    composition: string;
    packing: string;
    mrp: string;
    saleRate: string;
    division: string;
    sku?: string;
    strength?: string;
}

// Helper for price display
const formatPrice = (price: string | number | null | undefined) => {
    if (!price || price === '0' || price === 0 || price === '' || price === '0.00' || price === '0.0') return '₹';
    return `₹${price}`;
};

const BrandPriceList: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [brandName, setBrandName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [seoKeywords, setSeoKeywords] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;

            setLoading(true);
            setError('');

            const cleanSlug = slug.replace('-price-list', '');
            const readableName = cleanSlug
                .split('-')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');
            setBrandName(readableName);

            try {
                // 1. Fetch company list
                const companiesRes = await fetch(`${API_BASE_URL}/api/companies`);
                if (!companiesRes.ok) throw new Error("Failed to fetch brand list");

                const companies = await companiesRes.json();

                // Robust matching logic: normalize both to alphanumeric only
                const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
                const targetSlug = normalize(cleanSlug);

                const matchingCompany = companies.find((c: any) => {
                    const cName = normalize(c.companyName);
                    // Check for partial matches in both directions to handle deletions/additions
                    // Special fix for 'aavighna' which might be 'avighna' in DB or similar
                    return cName.includes(targetSlug) || targetSlug.includes(cName);
                });

                if (!matchingCompany) {
                    throw new Error("Brand not found in database");
                }

                // 2. Fetch products
                const productsRes = await fetch(`${API_BASE_URL}/api/company/${encodeURIComponent(matchingCompany.sheetName)}`);
                if (!productsRes.ok) throw new Error("Failed to fetch price list");

                const productsData = await productsRes.json();
                setProducts(productsData);

                // 3. SEO Logic
                const topProducts = productsData.slice(0, 6);
                const productNames = topProducts.map((p: Product) => p.productName).join(', ');

                // Generate specific keywords for the top products
                const productKeywords = topProducts.map((p: Product) => `${p.productName} supplier in Rajasthan`).join(', ');

                setSeoDescription(`Authorized stockist and wholesale supplier of ${readableName} medicines in Rajasthan. We supply ${productNames} and more at best rates. Bulk delivery to Jaipur, Jodhpur, Udaipur.`);
                setSeoKeywords(`${readableName} price list, ${readableName} distributor rajasthan, ${productKeywords}, wholesale medicine supplier`);

            } catch (err: any) {
                console.warn("Backend failed, switching to mock data.", err);

                // Fallback to mock data
                const mockProducts = getBrandData(cleanSlug);
                if (mockProducts.length > 0) {
                    const mappedProducts = mockProducts.map(p => ({
                        productName: p.product_name,
                        composition: p.strength, // Using strength as composition placeholder
                        packing: p.pack,
                        mrp: p.mrp.toString(),
                        saleRate: p.wholesale_price.toString(),
                        division: p.brand_name
                    }));
                    setProducts(mappedProducts);

                    // Mock SEO Logic
                    const topProducts = mappedProducts.slice(0, 6);
                    const productNames = topProducts.map(p => p.productName).join(', ');
                    const productKeywords = topProducts.map(p => `${p.productName} supplier in Rajasthan`).join(', ');

                    setSeoDescription(`Authorized stockist and wholesale supplier of ${readableName} medicines in Rajasthan. We supply ${productNames} and more at best rates. Bulk delivery to Jaipur, Jodhpur, Udaipur.`);
                    setSeoKeywords(`${readableName} price list, ${readableName} distributor rajasthan, ${productKeywords}, wholesale medicine supplier`);
                } else {
                    setError("Could not load price list. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const filteredProducts = products.filter(p =>
        (p.productName && p.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.composition && p.composition.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (!slug?.endsWith('-price-list')) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">Page Not Found</h2>
                    <Link to="/" className="text-brandBlue hover:underline mt-4 block">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <SEOHead
                title={`Wholesale ${brandName} Price List Rajasthan - Balaji Pharma`}
                description={seoDescription || `Get the latest ${brandName} medicine price list for retailers in Rajasthan. Bulk discounts on all ${brandName} products.`}
                keywords={seoKeywords}
                canonicalUrl={`https://balajipharma.com/${slug}`}
            />

            {/* Premium Header */}
            <div className="bg-slate-900 text-white pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandBlue/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <Link to="/wholesale-medicines-rajasthan" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to All Brands
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{brandName} Wholesale Distributor Rajasthan</h1>

                    {/* Rich Content for SEO */}
                    <div className="max-w-3xl text-lg text-slate-300 leading-relaxed mb-8">
                        <p>
                            Balaji Pharma is a leading <strong>wholesale distributor for {brandName}</strong> in Rajasthan.
                            We provide the complete range of {brandName} tablets, syrups, and injectables at the most competitive stockist rates.
                            Whether you are a retailer in Jaipur, Udaipur, or Jodhpur, access our live real-time inventory below and book your bulk orders instantly.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-400">
                        <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">Authorised Stockist</span>
                        <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">100% Genuine</span>
                        <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">Latest Batch</span>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 -mt-16 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                    {/* Toolbar */}
                    <div className="p-6 border-b border-gray-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={`Search ${brandName} products...`}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brandBlue/50 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium bg-emerald-50 px-4 py-2 rounded-full">
                            <CheckCircle2 size={16} /> Live Stock Status
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50/80">
                                <tr>
                                    <th className="p-3 md:p-5 font-semibold text-slate-500 uppercase text-[10px] md:text-xs tracking-wider w-[35%]">Product Name</th>
                                    <th className="p-3 md:p-5 font-semibold text-slate-500 uppercase text-[10px] md:text-xs tracking-wider w-[15%]">Packing</th>
                                    <th className="p-3 md:p-5 font-semibold text-slate-500 uppercase text-[10px] md:text-xs tracking-wider text-right w-[15%]">MRP</th>
                                    <th className="p-3 md:p-5 font-semibold text-brandBlue uppercase text-[10px] md:text-xs tracking-wider text-right w-[15%]">Net Rate</th>
                                    <th className="p-3 md:p-5 font-semibold text-slate-500 uppercase text-[10px] md:text-xs tracking-wider text-center w-[20%]">Order</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center text-slate-500">
                                            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brandBlue" />
                                            Fetching latest {brandName} rates...
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center text-red-500 font-medium">
                                            {error}
                                        </td>
                                    </tr>
                                ) : filteredProducts.length > 0 ? (
                                    filteredProducts.map((product, idx) => (
                                        <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                                            <td className="p-2 md:p-5 align-top">
                                                <div className="font-bold text-slate-800 text-xs md:text-base group-hover:text-brandBlue transition-colors whitespace-normal break-words">{product.productName}</div>
                                                <div className="text-[10px] md:text-xs text-slate-500 mt-0.5 md:mt-1">{product.composition}</div>
                                            </td>
                                            <td className="p-2 md:p-5 align-top">
                                                <span className="inline-block bg-slate-100 text-slate-600 text-[10px] md:text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-slate-200 whitespace-nowrap">
                                                    {product.packing}
                                                </span>
                                            </td>
                                            <td className="p-2 md:p-5 text-right text-slate-600 font-bold text-xs md:text-sm align-top">{formatPrice(product.mrp)}</td>
                                            <td className="p-2 md:p-5 text-right font-bold text-emerald-600 text-sm md:text-lg align-top">{formatPrice(product.saleRate)}</td>
                                            <td className="p-2 md:p-5 align-top text-center">
                                                <a
                                                    href={`https://wa.me/${PHONE_VALUE}?text=Hi, I am interested in ${product.productName}. Please confirm availability and rate.`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center justify-center p-2 bg-[#25D366]/10 text-[#25D366] rounded-full hover:bg-[#25D366] hover:text-white transition-colors"
                                                    title="Order on WhatsApp"
                                                >
                                                    <MessageCircle size={18} />
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center text-slate-400">
                                            No products found matching "{searchTerm}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center bg-brandBlue/5 rounded-2xl p-8 border border-brandBlue/10 mb-12">
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">Want to order {brandName} medicines in bulk?</h3>
                    <p className="text-slate-600 mb-6">We provide same-day billing and dispatch for all major wholesale orders.</p>
                    <a
                        href={`https://wa.me/${PHONE_VALUE}?text=Hi Balaji form, I want to order ${brandName} products.`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-[#20bd5a] hover:shadow-green-500/30 transition-all transform hover:-translate-y-1"
                    >
                        <Phone size={20} /> Order on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BrandPriceList;
