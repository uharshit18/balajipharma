const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Note: dotenv is not needed in Vercel as env vars are injected, 
// but good for local dev if we had a .env file. 
// Since we use Vercel Env Vars, simple process.env is enough.

const SPREADSHEET_ID = '12N4UwzTV0f6s5T_4JtxRwbh9bIir5IU3DgOLepqblnk';
const OUTPUT_PATH = path.join(__dirname, '../public/master-data.json');

// Auth setup
// In Vercel, we can paste the content of service-account.json into an Env Var 
// e.g. GOOGLE_CREDENTIALS_JSON or handle GOOGLE_APPLICATION_CREDENTIALS path.
// BETTER: If GOOGLE_CREDENTIALS_JSON contains the actual JSON string (Vercel recommendation).
// Auth setup
let authConfig;
// Priority 1: Vercel Env Var (JSON content)
if (process.env.GOOGLE_CREDENTIALS_JSON) {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
    authConfig = {
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    };
}
// Priority 2: Vercel Env Var (File Path)
else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    authConfig = {
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    };
}
// Priority 3: Local Fallback (Backend Folder)
else {
    const localFile = path.join(__dirname, 'service-account.json');
    const backendFile = path.resolve(__dirname, '../../../SERVER/backend/service-account.json');

    if (fs.existsSync(localFile)) {
        authConfig = { keyFile: localFile, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] };
    } else if (fs.existsSync(backendFile)) {
        console.log('Found ID in backend folder:', backendFile);
        authConfig = { keyFile: backendFile, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] };
    } else {
        console.warn('WARNING: No Google Cloud credentials found.');
        console.warn('Skipping static data generation. The app will rely on the live API or mock data.');
        console.warn('To enable static generation, set GOOGLE_CREDENTIALS_JSON in Vercel Environment Variables.');
        return null;
        // process.exit(0); // Don't fail the build, just skip data
    }
}

if (!authConfig) return;

const auth = new google.auth.GoogleAuth(authConfig);
const sheets = google.sheets({ version: 'v4', auth });

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
        console.log('Starting Static Data Generation...');

        // Ensure Credentials exist
        // logic handled in authConfig

        console.log('Fetching Companies...');
        const companies = await fetchCompanies();
        console.log(`Found ${companies.length} companies.`);

        const allProducts = [];
        const BATCH_SIZE = 2; // Reduced to prevent rate limits

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

            // Small delay to be nice to API
            await new Promise(r => setTimeout(r, 2500));
        }

        const payload = {
            brands: companies,
            products: allProducts,
            lastUpdated: Date.now()
        };

        const dir = path.dirname(OUTPUT_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(payload)); // Minified
        console.log(`Successfully wrote master-data.json to ${OUTPUT_PATH}`);
        console.log(`Total Products: ${allProducts.length}`);

    } catch (error) {
        console.error('GENERATION FAILED:', error);
        // Important: Exit 1 to fail build if data fails, or Exit 0 to proceed with stale data?
        // Let's fail build so we know something is wrong.
        process.exit(1);
    }
};

generateData();
