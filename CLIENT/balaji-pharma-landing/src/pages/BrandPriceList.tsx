import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { Phone, CheckCircle2, Search, ArrowLeft, Loader2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchService } from '../utils/searchService';
import { PHONE_VALUE } from '../constants';
import { getBrandData } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Button } from '../components/UI/Button';
import logoMap from '../data/logoMap.json';

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
    stock?: string;
}

// Helper for price display
const formatPrice = (price: string | number | null | undefined) => {
    if (!price || price === '0' || price === 0 || price === '' || price === '0.00' || price === '0.0') return '₹';
    return `₹${price}`;
};

const BrandPriceList: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const { items, addItem, updateQuantity } = useCart();
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

            try {
                // Initialize search service to ensure data is loaded
                await searchService.initIndex();

                // Get products directly using the slug
                const brandProducts = searchService.getProductsByBrand(slug);

                if (brandProducts.length > 0) {
                    setProducts(brandProducts);

                    // Derive brand name from the first product
                    // Use division or fallback to formatted slug
                    let derivedBrandName = brandProducts[0].division ||
                        slug.replace('-price-list', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

                    // Try to improve name using logoMap (New Logic)
                    const formatPretty = (originalName: string) => {
                        const snakeSlug = originalName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
                        const kebabSlug = originalName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                        const filename = (logoMap as any)[snakeSlug] || (logoMap as any)[kebabSlug];
                        if (filename) {
                            return filename.split('.')[0].split('_')
                                .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                        }
                        return originalName;
                    };

                    derivedBrandName = formatPretty(derivedBrandName);

                    setBrandName(derivedBrandName);

                    // SEO Logic - KEYWORD EXPLOSION
                    const topProducts = brandProducts.slice(0, 6);
                    const productNames = topProducts.map((p: Product) => p.productName).join(', ');

                    const cities = ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar", "Sikar", "Pali"];
                    const roles = ["Stockist", "Distributor", "Wholesaler", "Supplier", "Agency", "C&F"];

                    // Generate permutations
                    const keywordPermutations = [];
                    cities.forEach(city => {
                        roles.forEach(role => {
                            keywordPermutations.push(`${derivedBrandName} ${role} in ${city}`);
                        });
                    });

                    // Add product specific keywords
                    topProducts.forEach(p => {
                        keywordPermutations.push(`${p.productName} wholesale price`);
                    });

                    const seoKeywordsString = keywordPermutations.slice(0, 40).join(', ') + ", " +
                        `${derivedBrandName} price list rajasthan, wholesale medicine supplier`;

                    setSeoDescription(`Authorized ${derivedBrandName} Stockist & Wholesaler in Rajasthan. Supply to Jaipur, Jodhpur, Udaipur, Kota. Best rates for ${productNames}. Direct bulk order.`);
                    setSeoKeywords(seoKeywordsString);
                } else {
                    // Fallback to finding brand in list if no products found (might be empty brand)
                    const cleanSlug = slug.replace('-price-list', '');
                    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const targetSlug = normalize(cleanSlug);

                    const allBrands = searchService.getAllBrands();
                    const matchingBrand = allBrands.find(b => {
                        const cName = normalize(b.companyName);
                        return cName.includes(targetSlug) || targetSlug.includes(cName);
                    });

                    if (matchingBrand) {
                        setBrandName(matchingBrand.companyName);

                        // Fallback: Try to find products by company name since slug match failed
                        const fallbackProducts = searchService.getProductsByCompanyName(matchingBrand.companyName);

                        if (fallbackProducts.length > 0) {
                            setProducts(fallbackProducts);
                            // We already know the brand name, so we can skip setting it again

                            // Run SEO Logic for fallback products
                            const topProducts = fallbackProducts.slice(0, 6);
                            const productNames = topProducts.map((p: Product) => p.productName).join(', ');

                            const cities = ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar", "Sikar", "Pali"];
                            const roles = ["Stockist", "Distributor", "Wholesaler", "Supplier", "Agency", "C&F"];

                            const keywordPermutations = [];
                            cities.forEach(city => {
                                roles.forEach(role => {
                                    keywordPermutations.push(`${matchingBrand.companyName} ${role} in ${city}`);
                                });
                            });

                            topProducts.forEach(p => {
                                keywordPermutations.push(`${p.productName} wholesale price`);
                            });

                            const seoKeywordsString = keywordPermutations.slice(0, 40).join(', ') + ", " +
                                `${matchingBrand.companyName} price list rajasthan, wholesale medicine supplier`;

                            setSeoDescription(`Authorized ${matchingBrand.companyName} Stockist & Wholesaler in Rajasthan. Supply to Jaipur, Jodhpur, Udaipur, Kota. Best rates for ${productNames}. Direct bulk order.`);
                            setSeoKeywords(seoKeywordsString);
                        } else {
                            setError("Catalog is currently being updated. Please check back shortly.");
                        }
                    } else {
                        // Final fallback to mock data
                        throw new Error("Brand not found in live data");
                    }
                }
            } catch (err: any) {
                console.warn("Live data load failed, switching to mock data.", err);

                // Fallback to mock data
                const cleanSlug = slug.replace('-price-list', '');
                const readableName = cleanSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                setBrandName(readableName);

                const mockProducts = getBrandData(cleanSlug);
                if (mockProducts.length > 0) {
                    const mappedProducts = mockProducts.map(p => ({
                        productName: p.product_name,
                        composition: p.strength,
                        packing: p.pack,
                        mrp: p.mrp.toString(),
                        saleRate: p.wholesale_price.toString(),
                        division: p.brand_name
                    }));
                    setProducts(mappedProducts);

                    // Mock SEO Logic
                    const topProducts = mappedProducts.slice(0, 6);
                    const productNames = topProducts.map(p => p.productName).join(', ');
                    setSeoDescription(`Authorized stockist and wholesale supplier of ${readableName} medicines in Rajasthan. We supply ${productNames} and more at best rates.`);
                } else {
                    setError("Could not load price list. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);



    const getBrandLogo = (slug: string) => {
        if (!slug) return null;
        const cleanSlug = slug.replace('-price-list', '');
        // Try exact match, or snake_case match; map has both
        const logoFile = (logoMap as any)[cleanSlug];
        return logoFile ? `/brands/${logoFile}` : null;
    };

    const brandLogoUrl = getBrandLogo(slug || '');


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
                canonicalUrl={`https://balaji-pharma.in/${slug}`}
                schema={JSON.stringify([
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://balaji-pharma.in"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Brands",
                                "item": "https://balaji-pharma.in/wholesale-medicines-rajasthan"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": brandName,
                                "item": `https://balaji-pharma.in/${slug}`
                            }
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "WholesaleStore",
                        "name": `Balaji Pharma - ${brandName} Distributor`,
                        "description": `Authorized wholesale stockist for ${brandName} medicines in Rajasthan. Serving Jaipur, Jodhpur, Udaipur.`,
                        "image": brandLogoUrl ? `https://balaji-pharma.in${brandLogoUrl}` : undefined,
                        "telephone": PHONE_VALUE,
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Bhilwara",
                            "addressRegion": "Rajasthan",
                            "postalCode": "311001",
                            "addressCountry": "IN"
                        },
                        "priceRange": "₹₹"
                    },
                    ...products.slice(0, 10).map(product => ({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": product.productName,
                        "brand": {
                            "@type": "Brand",
                            "name": brandName
                        },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "INR",
                            "price": product.saleRate,
                            "availability": "https://schema.org/InStock",
                            "seller": {
                                "@type": "WholesaleStore",
                                "name": "Balaji Pharma"
                            }
                        }
                    }))
                ])}
            />


            {/* Premium Header */}
            <div className="bg-slate-900 text-white pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandBlue/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <Link to="/wholesale-medicines-rajasthan" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to All Brands
                    </Link>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                        {brandLogoUrl && (
                            <div className="bg-white p-3 rounded-xl shadow-lg w-24 h-24 flex items-center justify-center shrink-0">
                                <img
                                    src={brandLogoUrl}
                                    alt={`${brandName} logo`}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        )}
                        <h1 className="text-4xl md:text-5xl font-bold">{brandName} Wholesale Distributor Rajasthan</h1>
                    </div>


                    {/* Rich Content for SEO */}
                    {/* Rich Content for SEO */}
                    <div className="max-w-4xl text-lg text-slate-300 leading-relaxed mb-8">
                        <p>
                            Authorized <strong className="text-white">{brandName} Wholesale Distributor & Stockist</strong> serving <span className="text-brandBlue font-semibold">Jaipur, Jodhpur, Udaipur, Kota, Bhilwara, & Ajmer</span>.
                            Get the complete range of genuine medicines at best bulk rates across Rajasthan.
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
                                    <th className="p-3 md:p-5 font-semibold text-slate-500 uppercase text-[10px] md:text-xs tracking-wider w-[10%]">Stock</th>
                                    <th className="p-3 md:p-5 font-semibold text-slate-500 uppercase text-[10px] md:text-xs tracking-wider text-right w-[15%]">MRP</th>
                                    <th className="p-3 md:p-5 font-semibold text-brandBlue uppercase text-[10px] md:text-xs tracking-wider text-right w-[15%]">Net Rate</th>
                                    <th className="p-3 md:p-5 font-semibold text-slate-500 uppercase text-[10px] md:text-xs tracking-wider text-center w-[20%]">Order</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center text-slate-500">
                                            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brandBlue" />
                                            Fetching latest {brandName} rates...
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center text-red-500 font-medium">
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
                                            <td className="p-2 md:p-5 align-top">
                                                <span className={`inline-block text-[10px] md:text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded border whitespace-nowrap font-medium ${!product.stock || product.stock === '0'
                                                    ? 'bg-red-50 text-red-600 border-red-100'
                                                    : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                    }`}>
                                                    {!product.stock || product.stock === '0' ? 'Out of Stock' : `${product.stock} Qty`}
                                                </span>
                                            </td>
                                            <td className="p-2 md:p-5 text-right text-slate-600 font-bold text-xs md:text-sm align-top">{formatPrice(product.mrp)}</td>
                                            <td className="p-2 md:p-5 text-right font-bold text-emerald-600 text-sm md:text-lg align-top">{formatPrice(product.saleRate)}</td>
                                            <td className="p-2 md:p-5 align-top text-center">
                                                {(() => {
                                                    const cartItem = items.find(i => i.productName === product.productName);
                                                    return cartItem ? (
                                                        <div className="flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 rounded-lg p-1 min-w-[100px] mx-auto">
                                                            <button
                                                                onClick={() => updateQuantity(product.productName, -1)}
                                                                className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-700 hover:text-brandBlue font-bold"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="font-bold text-slate-900 text-sm w-4">{cartItem.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(product.productName, 1)}
                                                                className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-slate-700 hover:text-brandBlue font-bold"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            variant="primary"
                                                            size="sm"
                                                            onClick={() => addItem({
                                                                ...product,
                                                                brandName: product.division || brandName,
                                                                brandSlug: slug || ''
                                                            })}
                                                            className="!px-4 !py-1 !text-xs"
                                                        >
                                                            Add
                                                        </Button>
                                                    );
                                                })()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center text-slate-400">
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
