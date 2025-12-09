import React from 'react';
import { Link } from 'react-router-dom';

interface BrandCardProps {
  brand: { name: string; logo: string };
}

const createBrandSlug = (brandName: string) => {
  return brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-price-list';
};

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  // Logic to enlarge specific small logos
  const shouldScaleUp = brand.name.includes("Indchemie") || brand.name.includes("Unimarck");
  const slug = createBrandSlug(brand.name);

  return (
    <Link to={`/wholesale-medicines/pharmaceutical-brands/${slug}`} className="block">
      <div className="w-[180px] h-28 mx-6 flex-shrink-0 flex items-center justify-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 group cursor-pointer">
        <img
          src={brand.logo}
          alt={`${brand.name} Logo`}
          className={`h-16 w-auto object-contain transition-all duration-300 mix-blend-multiply opacity-90 hover:opacity-100 hover:scale-110 ${shouldScaleUp ? 'scale-[1.6] hover:scale-[1.7]' : ''}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Brand';
          }}
        />
      </div>
    </Link>
  );
};

const MarqueeRow: React.FC<{ brands: { name: string; logo: string }[], reverse?: boolean }> = ({ brands, reverse = false }) => {
  return (
    <div className="flex overflow-hidden select-none w-full mb-8">
      <div className={`flex shrink-0 items-center justify-around min-w-full gap-12 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {brands.map((brand, idx) => (
          <BrandCard key={`a-${idx}`} brand={brand} />
        ))}
      </div>
      <div className={`flex shrink-0 items-center justify-around min-w-full gap-12 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {brands.map((brand, idx) => (
          <BrandCard key={`b-${idx}`} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export const BrandShowcase: React.FC = () => {
  // ... brands array ...
  const allBrands = [
    // Original Brands
    { name: "Sun Pharma", logo: "https://upload.wikimedia.org/wikipedia/en/5/50/Sun_Pharma_logo.svg" },
    { name: "Dr. Reddy’s", logo: "https://baselarea.swiss//wp-content/uploads/2020/06/dr-reddys-logo.jpg" },
    { name: "Cipla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/be/Cipla_logo.svg" },
    { name: "Mankind", logo: "https://i0.wp.com/spicyip.com/wp-content/uploads/2025/08/image-34.png?resize=1024%2C560&ssl=1" },
    { name: "Zydus", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/Zydus_Lifesciences.svg/1200px-Zydus_Lifesciences.svg.png" },
    { name: "Torrent", logo: "https://images.cnbctv18.com/uploads/2024/06/torrent-pharma-logo-2024-06-0bef5070e6f7acf2072a9951f836938f-780x438.jpg" },
    { name: "Glenmark", logo: "https://upload.wikimedia.org/wikipedia/en/6/62/Glenmark_Pharmaceuticals_logo.png" },
    { name: "Abbott", logo: "https://www.molecular.abbott/etc.clientlibs/abbott-platform/clientlibs/clientlib-site/resources/images/abbott-logo.png" },
    { name: "GSK", logo: "https://corporatewatch.org/wp-content/uploads/2017/10/Glaxo-SmithKline-PLC_company_logo.jpg" },
    { name: "Pfizer", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL16DdYjx1f8fvx9eUFGRd7zMJ7WQOcJ4WuQ&s" },
    { name: "Intas", logo: "https://static.capitalgroup.com/content/dam/cgc/shared-content/images/private-markets/portfolio-images/Intas.cq5dam.web.1280.1280%20copy.png" },
    { name: "Aristo", logo: "https://medicaldialogues.in/h-upload/2022/09/09/185303-aristo-logo.webp" },

    // New Brands
    { name: "Kepler Healthcare", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KI8ZqT89f7x195tjb-Ht3MRqJP4jy0rnsA&s" },
    { name: "Svizera", logo: "https://www.doxinate.com/images/svizera.png" },
    { name: "Blue Cross", logo: "https://www.pilanienviro.com/sitepad-data/uploads/2023/07/blue-cross.jpg" },
    { name: "Healing Pharma", logo: "https://i0.wp.com/www.healingpharma.in/wp-content/uploads/2024/08/Healing-Pharma-Logo.png?fit=2212%2C764&ssl=1" },
    { name: "Cachet Pharma", logo: "https://iphex-india.com/uploads/company_logo_2024/603_CACHET_PHARMACEUTICALS_PVT._LTD._comp_logo_20240712115235.png" },
    { name: "Unimarck Pharma", logo: "https://unimarckpharma.com/wp-content/uploads/2024/10/1_History_Unimarck.png" },
    { name: "Indchemie Health", logo: "https://www.indianpharmajobs.com/getimage/ca847392-e288-4600-a02e-0f8e59ec5af3_325x325_exact.jpeg" },
    { name: "Canixa Lifesciences", logo: "https://www.canixalife.com/assets/images/logo.gif" },
    { name: "Ind-Swift", logo: "https://www.indswiftgroup.com/wp-content/uploads/2025/03/logo-side.png" },
    { name: "Lincoln Pharma", logo: "https://www.pngfind.com/pngs/m/89-897290_lincoln-pharma-hiring-for-medical-representative-lincoln-pharma.png" },
    { name: "Kenmed Pharma", logo: "https://lh3.googleusercontent.com/proxy/ZaDLXsesOWhj7HkcXDcvWxl0WihJ6eDQzjASundqtPl6-6WGwHp7c66KgDIqVn6TW7Jw" },
    { name: "Innovcare", logo: "https://www.innovcare.in/wp-content/uploads/2022/07/Logo.png" },
    { name: "West Coast Pharma", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9hrUsFLMtLv56t3KekJRvo19qID3tN6td-A&s" },
    { name: "Comed", logo: "https://logospharma.com/wp-content/uploads/2022/04/10-scaled.jpg" }
  ];

  // Split brands into two even rows
  const midPoint = Math.ceil(allBrands.length / 2);
  const row1 = allBrands.slice(0, midPoint);
  const row2 = allBrands.slice(midPoint);

  return (
    <section id="brands" className="py-20 bg-slate-50 border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Authorized Distributors for Leading Brands</h2>
        <div className="h-1.5 w-24 bg-brandBlue mx-auto rounded-full mb-6"></div>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          We are the authorized stockists in Rajasthan for over 100+ reputable pharmaceutical manufacturers, ensuring 100% genuine products for your pharmacy.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full group">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>

        <MarqueeRow brands={row1} />
        <MarqueeRow brands={row2} reverse />

      </div>

      <div className="mt-8 text-center relative z-20">
        <p className="text-sm font-semibold text-slate-500 bg-white inline-block px-6 py-2 rounded-full border border-gray-200 shadow-sm">
          Supplying to Bhilwara, Jaipur, Udaipur, and all major cities...
        </p>
      </div>
    </section>
  );
};