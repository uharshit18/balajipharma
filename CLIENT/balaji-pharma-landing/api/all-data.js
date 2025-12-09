import { google } from 'googleapis';
import { getAuth, SPREADSHEET_ID, cors } from './_utils.js';

// Helper to normalize headers
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

        // Cache 1 Hour at edge
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

        // OPTIMIZATION: Use batchGet instead of loop
        // We chunk requests to avoid URL length limits.
        const CHUNK_SIZE = 15;
        for (let i = 0; i < companies.length; i += CHUNK_SIZE) {
            const chunk = companies.slice(i, i + CHUNK_SIZE);
            const ranges = chunk.map(c => `${c.sheetName}!A:Z`);

            try {
                const batchRes = await sheets.spreadsheets.values.batchGet({
                    spreadsheetId: SPREADSHEET_ID,
                    ranges: ranges,
                });

                const valueRanges = batchRes.data.valueRanges; // Array of ranges

                if (valueRanges) {
                    valueRanges.forEach((rangeData, idx) => {
                        const company = chunk[idx]; // Match back to company info
                        const rows = rangeData.values;
                        if (!rows || rows.length === 0) return;

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

                        const mapped = products
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

                        allProducts.push(...mapped);
                    });
                }

            } catch (chunkError) {
                console.error(`Batch fetch failed for chunk ${i}`, chunkError.message);
                // Continue to next chunk even if one fails
            }
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
