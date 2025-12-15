const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const SPREADSHEET_ID = '12N4UwzTV0f6s5T_4JtxRwbh9bIir5IU3DgOLepqblnk';
// Output to CLIENT public folder
const OUTPUT_PATH = path.join(__dirname, '../../CLIENT/balaji-pharma-landing/public/master-data.json');

// Auth setup
const SERVICE_ACCOUNT_FILE =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    path.join(__dirname, 'service-account.json');

console.log(`Using Service Account: ${SERVICE_ACCOUNT_FILE}`);

const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Helpers
const normalizeHeader = (header) => {
    if (!header) return '';
    const h = header.toString().toLowerCase().trim();
    if (h.includes('product') || h.includes('item') || h.includes('name') || h.includes('description')) return 'productName';
    if (h.includes('pack')) return 'packing';
    if (h.includes('mrp')) return 'mrp';
    if (h.includes('sale') || h.includes('rate') || h.includes('ptr') || h.includes('price')) return 'saleRate';
    if (h.includes('div')) return 'division';
    if (h.includes('comp') || h.includes('generic')) return 'composition';
    return h.replace(/\s+/g, '');
};

const mapRowsToObjects = (headers, rows) => {
    const normalizedHeaders = headers.map(normalizeHeader);
    return rows.map(row => {
        let obj = {};
        normalizedHeaders.forEach((key, index) => {
            if (key) obj[key] = row[index] || '';
        });
        return obj;
    });
};

const fetchCompanies = async () => {
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const tabs = meta.data.sheets;
    return tabs.map(s => ({
        companyName: s.properties.title,
        sheetName: s.properties.title,
        productCount: 'View Catalog',
    }));
};

const fetchSheetData = async (sheetName) => {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A:Z`,
    });
    const rows = response.data.values;
    if (!rows || rows.length === 0) return [];

    let headerIndex = 0;
    for (let i = 0; i < Math.min(rows.length, 5); i++) {
        const rowStr = rows[i].join(' ').toLowerCase();
        if (rowStr.includes('product') || rowStr.includes('name') || rowStr.includes('pack')) {
            headerIndex = i;
            break;
        }
    }

    const headers = rows[headerIndex];
    const dataRows = rows.slice(headerIndex + 1);
    const products = mapRowsToObjects(headers, dataRows);
    return products.filter(p => p.productName && p.productName.trim().length > 0);
};

const generateData = async () => {
    try {
        console.log('Fetching Companies...');
        const companies = await fetchCompanies();
        console.log(`Found ${companies.length} companies.`);

        const allProducts = [];
        const BATCH_SIZE = 2; // Reduced to avoid Rate Limits (60 req/min)

        for (let i = 0; i < companies.length; i += BATCH_SIZE) {
            const batch = companies.slice(i, i + BATCH_SIZE);
            console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} / ${Math.ceil(companies.length / BATCH_SIZE)}...`);

            await Promise.all(batch.map(async (company) => {
                try {
                    const products = await fetchSheetData(company.sheetName);
                    const brandSlug = company.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-price-list';
                    products.forEach(p => {
                        allProducts.push({
                            productName: p.productName || '',
                            composition: p.composition || '',
                            packing: p.packing || '',
                            mrp: p.mrp || '',
                            saleRate: p.saleRate || '',
                            division: p.division || '',
                            brandName: company.companyName,
                            brandSlug: brandSlug
                        });
                    });
                } catch (err) {
                    console.warn(`Failed to fetch ${company.sheetName}`, err.message);
                }
            }));

            // Wait 2.5s between batches (2 reqs / 2.5s = ~48 req/min < 60 limit)
            await new Promise(r => setTimeout(r, 2500));
        }

        const payload = {
            brands: companies,
            products: allProducts,
            lastUpdated: Date.now()
        };

        // Ensure directory exists
        const dir = path.dirname(OUTPUT_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2));
        console.log(`Successfully wrote master-data.json to ${OUTPUT_PATH}`);
        console.log(`Total Products: ${allProducts.length}`);

    } catch (error) {
        console.error('GENERATION FAILED:', error);
        process.exit(1);
    }
};

generateData();
