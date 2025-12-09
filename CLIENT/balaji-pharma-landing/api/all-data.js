import { google } from 'googleapis';
import { getAuth, SPREADSHEET_ID, cors } from './_utils.js';

// Helper to normalize headers (duplicated for edge independence)
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

export default async function handler(req, res) {
    cors(res);
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const auth = getAuth();
        const sheets = google.sheets({ version: 'v4', auth });

        // Cache 1 Hour at the EDGE
        // This means subsequent requests from ANY user will hit Vercel's global cache
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');

        console.log("Fetching meta data...");
        const meta = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });

        const tabs = meta.data.sheets;
        const companies = tabs.map(s => ({
            companyName: s.properties.title,
            sheetName: s.properties.title
        }));

        let allProducts = [];

        // Parallel fetch with batching
        // Vercel Serverless has a 10s or 60s timeout depending on plan. 
        // 50 tabs might timeout if done sequentially.
        // We will execute in parallel batches.
        const BATCH_SIZE = 8;
        for (let i = 0; i < companies.length; i += BATCH_SIZE) {
            const batch = companies.slice(i, i + BATCH_SIZE);
            const results = await Promise.all(batch.map(async (company) => {
                try {
                    const response = await sheets.spreadsheets.values.get({
                        spreadsheetId: SPREADSHEET_ID,
                        range: `${company.sheetName}!A:Z`,
                    });
                    const rows = response.data.values;
                    if (!rows || rows.length === 0) return [];

                    let headerIndex = 0;
                    for (let r = 0; r < Math.min(rows.length, 5); r++) {
                        const rowStr = rows[r].join(' ').toLowerCase();
                        if (rowStr.includes('product') || rowStr.includes('name')) {
                            headerIndex = r;
                            break;
                        }
                    }
                    const headers = rows[headerIndex];
                    const dataRows = rows.slice(headerIndex + 1);
                    const products = mapRowsToObjects(headers, dataRows);

                    const brandSlug = company.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-price-list';

                    return products
                        .filter(p => p.productName && p.productName.trim())
                        .map(p => ({
                            productName: p.productName || '',
                            composition: p.composition || '',
                            packing: p.packing || '',
                            mrp: p.mrp || '',
                            saleRate: p.saleRate || '',
                            division: p.division || '',
                            brandName: company.companyName,
                            brandSlug: brandSlug
                        }));

                } catch (e) {
                    console.error(`Failed to fetch ${company.companyName}`, e);
                    return [];
                }
            }));

            results.forEach(pList => allProducts.push(...pList));
        }

        const payload = {
            brands: companies,
            products: allProducts,
            lastUpdated: Date.now()
        };

        res.status(200).json(payload);

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
    }
}
