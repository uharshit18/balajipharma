const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- CONFIGURATION ---
const SPREADSHEET_ID = '1aXLlSAJxdJuDyMTQzS7rE37sQ_WLi5LtP7xH6jApiwg';

// Use env var on Render, fallback to local file for development
const SERVICE_ACCOUNT_FILE =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  path.join(__dirname, 'service-account.json');

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

// --- HELPER: NORMALIZE HEADERS ---
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

// --- ENDPOINTS ---

// 1. GET /api/companies
app.get('/api/companies', async (req, res) => {
  try {
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

    console.log(`Found ${companies.length} sheets. Returning as companies.`);
    res.json(companies);
  } catch (error) {
    console.error('Error fetching sheet metadata:', error);
    res.status(500).json({ error: error.message });
  }
});

// 2. GET /api/company/:sheetName
app.get('/api/company/:sheetName', async (req, res) => {
  try {
    const sheetName = req.params.sheetName;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return res.json([]);

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

    const validProducts = products.filter(
      (p) => p.productName && p.productName.trim().length > 0
    );

    res.json(validProducts);
  } catch (error) {
    console.error(`Error fetching sheet ${req.params.sheetName}:`, error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
