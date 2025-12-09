import { google } from 'googleapis';
import { getAuth, SPREADSHEET_ID, cors } from './_utils.js';

export default async function handler(req, res) {
    cors(res);
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const auth = getAuth();
        const sheets = google.sheets({ version: 'v4', auth });

        // Cache 1 hour (3600 seconds)
        // stale-while-revalidate for faster subsequent loads
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59');

        const meta = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });

        const tabs = meta.data.sheets;
        const companies = tabs.map(s => {
            const title = s.properties.title;
            return {
                companyName: title,
                sheetName: title,
                productCount: 'View Catalog',
            };
        });

        res.status(200).json(companies);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
    }
}
