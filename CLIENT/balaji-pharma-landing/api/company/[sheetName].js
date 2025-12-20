import { getAuth, SPREADSHEET_ID, cors, normalizeHeader } from '../_utils.js';


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

    const { sheetName } = req.query;

    if (!sheetName) return res.status(400).json({ error: 'Missing sheetName' });

    try {
        const auth = getAuth();
        const sheets = google.sheets({ version: 'v4', auth });

        // Cache 1 hour
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59');

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${sheetName}!A:Z`,
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) return res.status(200).json([]);

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

        const filtered = products.filter(
            (p) => p.productName && p.productName.trim().length > 0
        ).map(p => ({
            ...p,
            productCode: p.productCode || '' // Ensure productCode is passed
        }));

        res.status(200).json(filtered);

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
    }
}
