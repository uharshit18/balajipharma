const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- ROOT ROUTE ---
app.get('/', (req, res) => {
  res.send('Balaji Pharma Backend is Running');
});

// --- CONFIGURATION ---
const SPREADSHEET_ID = '1Lo9PeVltjDkXLkYq7jkgEsrn2-mIA-uPcEm9PC5xRbM';

// Use env var on Render, fallback to local file for development
const SERVICE_ACCOUNT_FILE =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  path.join(__dirname, 'service-account.json');

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

// --- CACHE ---
const CACHE = {
  companies: null,
  companiesTimestamp: 0,
  allData: null,
  allDataTimestamp: 0,
};
const CACHE_DURATION = 60 * 60 * 1000; // 1 Hour

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

const fetchCompanies = async () => {
  // Check Cache
  if (CACHE.companies && (Date.now() - CACHE.companiesTimestamp < CACHE_DURATION)) {
    console.log("Serving companies from cache");
    return CACHE.companies;
  }

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

  // Update Cache
  CACHE.companies = companies;
  CACHE.companiesTimestamp = Date.now();
  return companies;
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

  return products.filter(
    (p) => p.productName && p.productName.trim().length > 0
  );
};

// --- ENDPOINTS ---

// 1. GET /api/companies
app.get('/api/companies', async (req, res) => {
  try {
    const companies = await fetchCompanies();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: error.message });
  }
});

// 2. GET /api/company/:sheetName
app.get('/api/company/:sheetName', async (req, res) => {
  try {
    const sheetName = req.params.sheetName;
    const products = await fetchSheetData(sheetName);
    res.json(products);
  } catch (error) {
    console.error(`Error fetching sheet ${req.params.sheetName}:`, error);
    res.status(500).json({ error: error.message });
  }
});

// 3. GET /api/all-data (Bulk Fetch for Frontend Indexing)
app.get('/api/all-data', async (req, res) => {
  try {
    // Check Cache
    if (CACHE.allData && (Date.now() - CACHE.allDataTimestamp < CACHE_DURATION)) {
      console.log("Serving all-data from cache");
      return res.json(CACHE.allData);
    }

    console.log("Building all-data cache (this may take a while)...");
    const companies = await fetchCompanies();
    const allProducts = [];

    // Fetch all sheets in parallel (with some batching if needed, but for now parallel is faster on server)
    // Note: Google API has rate limits. Sequential or small batches is safer.
    // Let's do batches of 5.
    const BATCH_SIZE = 5;
    for (let i = 0; i < companies.length; i += BATCH_SIZE) {
      const batch = companies.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(async (company) => {
        try {
          const products = await fetchSheetData(company.sheetName);

          // Format for search index
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
          console.warn(`Failed to fetch ${company.sheetName} for all-data cache`, err);
        }
      }));
      // Small delay to be polite to Google API
      await new Promise(r => setTimeout(r, 200));
    }

    const payload = {
      brands: companies,
      products: allProducts,
      lastUpdated: Date.now()
    };

    // Update Cache
    CACHE.allData = payload;
    CACHE.allDataTimestamp = Date.now();

    console.log(`Cache built: ${companies.length} brands, ${allProducts.length} products.`);
    res.json(payload);

  } catch (error) {
    console.error("Error building all-data:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
