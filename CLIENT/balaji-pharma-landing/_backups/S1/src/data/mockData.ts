export interface Product {
    sku: string;
    product_name: string;
    strength: string;
    pack: string;
    mrp: number;
    wholesale_price: number;
    brand_name: string;
}

// Simulated API Response - Comprehensive Mock Data
export const mockProducts: Product[] = [
    // Sun Pharma
    { sku: 'SP-001', product_name: 'Volini Gel', strength: '30g', pack: '1 Tube', mrp: 145.00, wholesale_price: 110.00, brand_name: 'Sun Pharma' },
    { sku: 'SP-002', product_name: 'Revital H', strength: '30 Caps', pack: '1 Bottle', mrp: 300.00, wholesale_price: 240.00, brand_name: 'Sun Pharma' },

    // Dr. Reddy's
    { sku: 'DR-001', product_name: 'Omez 20', strength: '20mg', pack: '20 Capsules', mrp: 60.00, wholesale_price: 45.00, brand_name: "Dr. Reddy's" },
    { sku: 'DR-002', product_name: 'Nise Gel', strength: '30g', pack: '1 Tube', mrp: 110.00, wholesale_price: 85.00, brand_name: "Dr. Reddy's" },

    // Cipla
    { sku: 'CP-001', product_name: 'Nice Tablet', strength: '100mg', pack: '15 Tablets', mrp: 60.00, wholesale_price: 45.00, brand_name: 'Cipla' },
    { sku: 'CP-002', product_name: 'Cipcal 500', strength: '500mg', pack: '15 Tablets', mrp: 85.00, wholesale_price: 65.00, brand_name: 'Cipla' },
    { sku: 'CP-003', product_name: 'Foracort 200', strength: '200mcg', pack: '1 Inhaler', mrp: 450.00, wholesale_price: 380.00, brand_name: 'Cipla' },

    // Mankind
    { sku: 'MK-001', product_name: 'Manforce 100', strength: '100mg', pack: '4 Tablets', mrp: 250.00, wholesale_price: 180.00, brand_name: 'Mankind' },
    { sku: 'MK-002', product_name: 'Gas-O-Fast', strength: '5g', pack: '1 Sachet', mrp: 10.00, wholesale_price: 7.50, brand_name: 'Mankind' },
    { sku: 'MK-003', product_name: 'Unwanted 72', strength: '1.5mg', pack: '1 Tablet', mrp: 100.00, wholesale_price: 80.00, brand_name: 'Mankind' },

    // Zydus
    { sku: 'ZY-001', product_name: 'Pantodac 40', strength: '40mg', pack: '15 Tablets', mrp: 130.00, wholesale_price: 95.00, brand_name: 'Zydus' },
    { sku: 'ZY-002', product_name: 'Deriphyllin', strength: '150mg', pack: '30 Tablets', mrp: 40.00, wholesale_price: 28.00, brand_name: 'Zydus' },

    // Torrent
    { sku: 'TR-001', product_name: 'Shelcal 500', strength: '500mg', pack: '15 Tablets', mrp: 120.00, wholesale_price: 90.00, brand_name: 'Torrent' },
    { sku: 'TR-002', product_name: 'Chymoral Forte', strength: '100k AU', pack: '20 Tablets', mrp: 400.00, wholesale_price: 320.00, brand_name: 'Torrent' },

    // Glenmark
    { sku: 'GM-001', product_name: 'Telma 40', strength: '40mg', pack: '15 Tablets', mrp: 240.00, wholesale_price: 180.00, brand_name: 'Glenmark' },
    { sku: 'GM-002', product_name: 'Ascoril LS', strength: '100ml', pack: '1 Bottle', mrp: 110.00, wholesale_price: 92.00, brand_name: 'Glenmark' },
    { sku: 'GM-003', product_name: 'Candid Powder', strength: '100g', pack: '1 Bottle', mrp: 145.00, wholesale_price: 110.00, brand_name: 'Glenmark' },
    { sku: 'GM-004', product_name: 'Candid B Cream', strength: '20g', pack: '1 Tube', mrp: 130.00, wholesale_price: 95.00, brand_name: 'Glenmark' },

    // Abbott
    { sku: 'AB-001', product_name: 'Thyronorm 100', strength: '100mcg', pack: '120 Tablets', mrp: 220.00, wholesale_price: 180.00, brand_name: 'Abbott' },
    { sku: 'AB-002', product_name: 'Udiliv 300', strength: '300mg', pack: '15 Tablets', mrp: 550.00, wholesale_price: 420.00, brand_name: 'Abbott' },
    { sku: 'AB-003', product_name: 'Duphaston', strength: '10mg', pack: '10 Tablets', mrp: 650.00, wholesale_price: 580.00, brand_name: 'Abbott' },

    // GSK
    { sku: 'GSK-001', product_name: 'Calpol 650', strength: '650mg', pack: '15 Tablets', mrp: 30.00, wholesale_price: 24.00, brand_name: 'GSK' },
    { sku: 'GSK-002', product_name: 'Betnovate C', strength: '30g', pack: '1 Tube', mrp: 60.00, wholesale_price: 45.00, brand_name: 'GSK' },
    { sku: 'GSK-003', product_name: 'Augmentin 625', strength: '625mg', pack: '10 Tablets', mrp: 200.00, wholesale_price: 160.00, brand_name: 'GSK' },

    // Pfizer
    { sku: 'PF-001', product_name: 'Becosules', strength: 'Multivitamin', pack: '20 Capsules', mrp: 45.00, wholesale_price: 35.00, brand_name: 'Pfizer' },
    { sku: 'PF-002', product_name: 'Gelusil', strength: '200ml', pack: '1 Bottle', mrp: 120.00, wholesale_price: 95.00, brand_name: 'Pfizer' },

    // Intas
    { sku: 'IN-001', product_name: 'Gabapin NT', strength: '100mg', pack: '10 Tablets', mrp: 150.00, wholesale_price: 110.00, brand_name: 'Intas' },
    { sku: 'IN-002', product_name: 'Hifenac P', strength: '100mg', pack: '15 Tablets', mrp: 90.00, wholesale_price: 65.00, brand_name: 'Intas' },

    // Aristo
    { sku: 'AR-001', product_name: 'Monocef O 200', strength: '200mg', pack: '10 Tablets', mrp: 170.00, wholesale_price: 135.00, brand_name: 'Aristo' },
    { sku: 'AR-002', product_name: 'Aristozyme', strength: '200ml', pack: '1 Bottle', mrp: 110.00, wholesale_price: 85.00, brand_name: 'Aristo' },

    // Alkem
    { sku: 'AK-001', product_name: 'Pan-D', strength: '10 Capsules', pack: '1 Strip', mrp: 199.00, wholesale_price: 155.00, brand_name: 'Alkem' },
    { sku: 'AK-002', product_name: 'Pan 40', strength: '40mg', pack: '15 Tablets', mrp: 155.00, wholesale_price: 120.00, brand_name: 'Alkem' },
    { sku: 'AK-003', product_name: 'Taxim O 200', strength: '200mg', pack: '10 Tablets', mrp: 180.00, wholesale_price: 140.00, brand_name: 'Alkem' },

    // Lupin
    { sku: 'LU-001', product_name: 'Gluconorm G1', strength: '1mg', pack: '15 Tablets', mrp: 120.00, wholesale_price: 90.00, brand_name: 'Lupin' },
    { sku: 'LU-002', product_name: 'Budecort 0.5', strength: '0.5mg', pack: '5 Respules', mrp: 100.00, wholesale_price: 75.00, brand_name: 'Lupin' },

    // Macleods
    { sku: 'MC-001', product_name: 'Panderm Plus', strength: '15g', pack: '1 Tube', mrp: 95.00, wholesale_price: 70.00, brand_name: 'Macleods' },
    { sku: 'MC-002', product_name: 'Moxikind CV 625', strength: '625mg', pack: '10 Tablets', mrp: 180.00, wholesale_price: 135.00, brand_name: 'Macleods' },

    // Micro Labs
    { sku: 'ML-001', product_name: 'Dolo 650', strength: '650mg', pack: '15 Tablets', mrp: 30.00, wholesale_price: 22.00, brand_name: 'Micro Labs' },
    { sku: 'ML-002', product_name: 'Amlong 5', strength: '5mg', pack: '15 Tablets', mrp: 45.00, wholesale_price: 32.00, brand_name: 'Micro Labs' },

    // FDC
    { sku: 'FDC-001', product_name: 'Electral', strength: '21.8g', pack: '1 Sachet', mrp: 22.00, wholesale_price: 18.00, brand_name: 'FDC' },
    { sku: 'FDC-002', product_name: 'Zifi 200', strength: '200mg', pack: '10 Tablets', mrp: 110.00, wholesale_price: 85.00, brand_name: 'FDC' },

    // Blue Cross
    { sku: 'BC-001', product_name: 'Meftal Spas', strength: '10 Tablets', pack: '1 Strip', mrp: 50.00, wholesale_price: 38.00, brand_name: 'Blue Cross' },
    { sku: 'BC-002', product_name: 'TusQ DX', strength: '100ml', pack: '1 Bottle', mrp: 90.00, wholesale_price: 70.00, brand_name: 'Blue Cross' },

    // Ipca
    { sku: 'IP-001', product_name: 'Zerodol P', strength: '10 Tablets', pack: '1 Strip', mrp: 60.00, wholesale_price: 45.00, brand_name: 'Ipca' },
    { sku: 'IP-002', product_name: 'Folitrax 15', strength: '15mg', pack: '10 Tablets', mrp: 250.00, wholesale_price: 190.00, brand_name: 'Ipca' },

    // Alembic
    { sku: 'AL-001', product_name: 'Azithral 500', strength: '500mg', pack: '5 Tablets', mrp: 120.00, wholesale_price: 90.00, brand_name: 'Alembic' },
    { sku: 'AL-002', product_name: 'Wikoryl', strength: '10 Tablets', pack: '1 Strip', mrp: 55.00, wholesale_price: 40.00, brand_name: 'Alembic' },

    // Ajanta
    { sku: 'AJ-001', product_name: 'Met XL 50', strength: '50mg', pack: '20 Tablets', mrp: 140.00, wholesale_price: 110.00, brand_name: 'Ajanta' },
    { sku: 'AJ-002', product_name: 'Kamagra 100', strength: '100mg', pack: '4 Tablets', mrp: 180.00, wholesale_price: 120.00, brand_name: 'Ajanta' },

    // Eris
    { sku: 'ER-001', product_name: 'Glimisave M2', strength: '2mg', pack: '15 Tablets', mrp: 160.00, wholesale_price: 125.00, brand_name: 'Eris' },
    { sku: 'ER-002', product_name: 'Remylin D', strength: '10 Tablets', pack: '1 Strip', mrp: 190.00, wholesale_price: 150.00, brand_name: 'Eris' },

    // Indoco
    { sku: 'ID-001', product_name: 'Cyclopam', strength: '10 Tablets', pack: '1 Strip', mrp: 55.00, wholesale_price: 42.00, brand_name: 'Indoco' },
    { sku: 'ID-002', product_name: 'Febrex Plus', strength: '60ml', pack: '1 Bottle', mrp: 70.00, wholesale_price: 55.00, brand_name: 'Indoco' },

    // J.B. Chemicals
    { sku: 'JB-001', product_name: 'Rantac 150', strength: '150mg', pack: '30 Tablets', mrp: 40.00, wholesale_price: 30.00, brand_name: 'J.B. Chemicals' },
    { sku: 'JB-002', product_name: 'Cilacar 10', strength: '10mg', pack: '15 Tablets', mrp: 130.00, wholesale_price: 100.00, brand_name: 'J.B. Chemicals' },

    // Hetero
    { sku: 'HE-001', product_name: 'Covifor', strength: '1 Vial', pack: '1 Injection', mrp: 2000.00, wholesale_price: 1500.00, brand_name: 'Hetero' },
    { sku: 'HE-002', product_name: 'MahaFlox 400', strength: '400mg', pack: '5 Tablets', mrp: 80.00, wholesale_price: 60.00, brand_name: 'Hetero' },

    // Corona
    { sku: 'CO-001', product_name: 'Macbery XT', strength: '100ml', pack: '1 Bottle', mrp: 110.00, wholesale_price: 85.00, brand_name: 'Corona' },
    { sku: 'CO-002', product_name: 'Cefolac 200', strength: '200mg', pack: '10 Tablets', mrp: 160.00, wholesale_price: 125.00, brand_name: 'Corona' },

    // Leeford
    { sku: 'LF-001', product_name: 'Lee-Biotic', strength: '10 Capsules', pack: '1 Strip', mrp: 90.00, wholesale_price: 65.00, brand_name: 'Leeford' },
    { sku: 'LF-002', product_name: 'Megapan D', strength: '10 Capsules', pack: '1 Strip', mrp: 85.00, wholesale_price: 60.00, brand_name: 'Leeford' },

    // Systopic
    { sku: 'SY-001', product_name: 'Normaxin', strength: '10 Tablets', pack: '1 Strip', mrp: 45.00, wholesale_price: 35.00, brand_name: 'Systopic' },
    { sku: 'SY-002', product_name: 'Styptovit E', strength: '10 Tablets', pack: '1 Strip', mrp: 120.00, wholesale_price: 90.00, brand_name: 'Systopic' },

    // Zuventus
    { sku: 'ZU-001', product_name: 'Augpen 625', strength: '625mg', pack: '10 Tablets', mrp: 190.00, wholesale_price: 145.00, brand_name: 'Zuventus' },
    { sku: 'ZU-002', product_name: 'Maxtra Syrup', strength: '60ml', pack: '1 Bottle', mrp: 85.00, wholesale_price: 65.00, brand_name: 'Zuventus' },

    // Himalaya
    { sku: 'HI-001', product_name: 'Liv.52', strength: '100 Tablets', pack: '1 Bottle', mrp: 150.00, wholesale_price: 110.00, brand_name: 'Himalaya' },
    { sku: 'HI-002', product_name: 'Cystone', strength: '60 Tablets', pack: '1 Bottle', mrp: 165.00, wholesale_price: 125.00, brand_name: 'Himalaya' },
    { sku: 'HI-003', product_name: 'Septilin', strength: '60 Tablets', pack: '1 Bottle', mrp: 170.00, wholesale_price: 130.00, brand_name: 'Himalaya' },

    // Dabur
    { sku: 'DA-001', product_name: 'Dabur Chyawanprash', strength: '1kg', pack: '1 Jar', mrp: 395.00, wholesale_price: 310.00, brand_name: 'Dabur' },
    { sku: 'DA-002', product_name: 'Dabur Honey', strength: '500g', pack: '1 Bottle', mrp: 220.00, wholesale_price: 180.00, brand_name: 'Dabur' },
    { sku: 'DA-003', product_name: 'Pudin Hara', strength: '10 Pearls', pack: '1 Strip', mrp: 30.00, wholesale_price: 22.00, brand_name: 'Dabur' },

    // Baidyanath
    { sku: 'BA-001', product_name: 'Triphala Churna', strength: '100g', pack: '1 Pack', mrp: 90.00, wholesale_price: 70.00, brand_name: 'Baidyanath' },
    { sku: 'BA-002', product_name: 'Isabgol', strength: '100g', pack: '1 Pack', mrp: 120.00, wholesale_price: 95.00, brand_name: 'Baidyanath' },

    // Patanjali
    { sku: 'PA-001', product_name: 'Dant Kanti', strength: '200g', pack: '1 Tube', mrp: 100.00, wholesale_price: 85.00, brand_name: 'Patanjali' },
    { sku: 'PA-002', product_name: 'Aloe Vera Gel', strength: '150ml', pack: '1 Tube', mrp: 110.00, wholesale_price: 90.00, brand_name: 'Patanjali' },

    // Kepler
    { sku: 'KE-001', product_name: 'Kepcal', strength: '500mg', pack: '15 Tablets', mrp: 90.00, wholesale_price: 70.00, brand_name: 'Kepler' },
    { sku: 'KE-002', product_name: 'Kep-D3', strength: '60k', pack: '4 Capsules', mrp: 120.00, wholesale_price: 90.00, brand_name: 'Kepler' },

    // Svizera
    { sku: 'SV-001', product_name: 'Doxinate', strength: '24 Tablets', pack: '1 Strip', mrp: 180.00, wholesale_price: 140.00, brand_name: 'Svizera' },
    { sku: 'SV-002', product_name: 'Svizera-D', strength: '10 Tablets', pack: '1 Strip', mrp: 60.00, wholesale_price: 45.00, brand_name: 'Svizera' },

    // Healing Pharma
    { sku: 'HP-001', product_name: 'Heal-D 1000', strength: '1000mg', pack: '10x10 Tablets', mrp: 150.00, wholesale_price: 45.00, brand_name: 'Healing' },
    { sku: 'HP-002', product_name: 'Heal-Cold', strength: '500/10/5mg', pack: '20x10 Tablets', mrp: 80.00, wholesale_price: 22.00, brand_name: 'Healing' },

    // Indchemie
    { sku: 'IC-001', product_name: 'Chericof', strength: '100ml', pack: '1 Bottle', mrp: 110.00, wholesale_price: 85.00, brand_name: 'Indchemie' },
    { sku: 'IC-002', product_name: 'Indclav 625', strength: '625mg', pack: '6 Tablets', mrp: 120.00, wholesale_price: 90.00, brand_name: 'Indchemie' },

    // Unimarck
    { sku: 'UM-001', product_name: 'U-Gesic', strength: '10 Tablets', pack: '1 Strip', mrp: 40.00, wholesale_price: 30.00, brand_name: 'Unimarck' },
    { sku: 'UM-002', product_name: 'U-Cef 200', strength: '200mg', pack: '10 Tablets', mrp: 110.00, wholesale_price: 85.00, brand_name: 'Unimarck' },

    // Canixa
    { sku: 'CL-001', product_name: 'Can-Acne Gel', strength: '20g', pack: '1 Tube', mrp: 220.00, wholesale_price: 85.00, brand_name: 'Canixa' },
    { sku: 'CL-002', product_name: 'Can-Moist Lotion', strength: '100ml', pack: '1 Bottle', mrp: 350.00, wholesale_price: 120.00, brand_name: 'Canixa' },

    // Lincoln
    { sku: 'LN-001', product_name: 'Tinnex', strength: '10 Capsules', pack: '1 Strip', mrp: 180.00, wholesale_price: 140.00, brand_name: 'Lincoln' },
    { sku: 'LN-002', product_name: 'Pa 12', strength: '500mg', pack: '10 Tablets', mrp: 50.00, wholesale_price: 35.00, brand_name: 'Lincoln' },

    // West Coast
    { sku: 'WC-001', product_name: 'Cosmelite Cream', strength: '20g', pack: '1 Tube', mrp: 190.00, wholesale_price: 150.00, brand_name: 'West Coast' },
    { sku: 'WC-002', product_name: 'Foliderm', strength: '10 Tablets', pack: '1 Strip', mrp: 120.00, wholesale_price: 90.00, brand_name: 'West Coast' }
];

export const getBrandData = (brandParam: string) => {
    // Normalize param to match brand name (very simple logic)
    // e.g. "glenmark" -> "Glenmark", "healing-pharma" -> "Healing Pharma"
    const brandName = brandParam
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Fuzzy match or exact match
    return mockProducts.filter(p => p.brand_name.toLowerCase().includes(brandName.toLowerCase()));
};

export const getAllBrands = () => {
    return Array.from(new Set(mockProducts.map(p => p.brand_name)));
};

export const getAllProducts = () => {
    return mockProducts;
};
