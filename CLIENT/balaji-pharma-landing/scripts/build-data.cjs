const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

console.error("DEBUG: Starting build-data.cjs (Robust Version)");

// Note: dotenv is not needed in Vercel as env vars are injected, 
// but good for local dev if we had a .env file. 
// Since we use Vercel Env Vars, simple process.env is enough.

const SPREADSHEET_ID = '12N4UwzTV0f6s5T_4JtxRwbh9bIir5IU3DgOLepqblnk';
const OUTPUT_PATH = path.join(__dirname, '../public/master-data.json');

// Auth setup
let authConfig;

try {
    // Priority 1: Vercel Env Var (JSON content)
    // console.log('DEBUG: Env Keys:', Object.keys(process.env)); // Commented out to reduce noise, enable if needed

    if (process.env.GOOGLE_CREDENTIALS_JSON) {
        try {
            const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
            authConfig = {
                credentials,
                scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
            };
            console.log("DEBUG: Successfully parsed GOOGLE_CREDENTIALS_JSON");
        } catch (parseError) {
            console.error("ERROR: GOOGLE_CREDENTIALS_JSON is present but Invalid JSON.");
            console.error(parseError.message);
            console.warn("Falling back to other methods...");
        }
    }

    // Priority 2: Vercel Env Var (File Path) - Backup
    if (!authConfig && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        authConfig = {
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        };
        console.log("DEBUG: Using GOOGLE_APPLICATION_CREDENTIALS path");
    }

    // Priority 3: Local Fallback (Backend Folder)
    if (!authConfig) {
        const localFile = path.join(__dirname, 'service-account.json');
        const backendFile = path.resolve(__dirname, '../../../SERVER/backend/service-account.json');

        if (fs.existsSync(localFile)) {
            authConfig = { keyFile: localFile, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] };
        } else if (fs.existsSync(backendFile)) {
            console.log('Found ID in backend folder:', backendFile);
            authConfig = { keyFile: backendFile, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] };
        }
    }
} catch (e) {
    console.error("DEBUG: Error during auth setup:", e);
}

if (!authConfig) {
    console.warn('WARNING: No Google Cloud credentials found.');
    console.warn('Skipping static data generation. The app will rely on the live API or mock data.');
    console.warn('To enable static generation, ensures GOOGLE_CREDENTIALS_JSON is set to the *content* of the json file.');
    // Exit cleanly to allow build to proceed
    process.exit(0);
}

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

        // GENERATE SITEMAP
        const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

        const escapeXml = (unsafe) => {
            return unsafe.replace(/[<>&'"]/g, function (c) {
                switch (c) {
                    case '<': return '&lt;';
                    case '>': return '&gt;';
                    case '&': return '&amp;';
                    case '\'': return '&apos;';
                    case '"': return '&quot;';
                }
            });
        };

        let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>https://balaji-pharma.in/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://balaji-pharma.in/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://balaji-pharma.in/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://balaji-pharma.in/compliance</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://balaji-pharma.in/wholesale-medicines-rajasthan</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Brand Pages -->
`;

        companies.forEach(company => {
            const companySlug = company.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const cleanSlug = `${companySlug}-price-list`;
            const loc = `https://balaji-pharma.in/wholesale-medicines/pharmaceutical-brands/${escapeXml(cleanSlug)}`;

            sitemapContent += `  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
        });

        sitemapContent += `</urlset>`;

        fs.writeFileSync(sitemapPath, sitemapContent);
        console.log(`Successfully wrote sitemap.xml to ${sitemapPath}`);

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
