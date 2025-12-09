import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env explicitly since we are running a standalone script
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');

if (fs.existsSync(envPath)) {
    console.log('Loading .env from', envPath);
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
        // Simple parse: KEY=VALUE. Handles basic quotes if needed but raw is usually fine for these keys unless multiline which .env usually handles or we check for.
        // Google Private Key can be tricky with newlines.
        const msg = line.trim();
        if (!msg || msg.startsWith('#')) return;

        const idx = msg.indexOf('=');
        if (idx !== -1) {
            const key = msg.substring(0, idx).trim();
            let value = msg.substring(idx + 1).trim();
            // Remove surrounding quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            process.env[key] = value;
        }
    });
} else {
    console.warn('.env file not found at', envPath);
}

// Import utils - use absolute path or relative to this script
// Using absolute path via file URL or just relative import since type=module
// Note: We need to import the file as a module.
try {
    const utilsModule = await import('../api/_utils.js');
    const { getAuth, SPREADSHEET_ID } = utilsModule;
    const { google } = await import('googleapis'); // Ensure googleapis is available

    console.log('Testing connection with:');
    console.log('Spreadsheet ID:', SPREADSHEET_ID);
    console.log('GOOGLE_CLIENT_EMAIL:', process.env.GOOGLE_CLIENT_EMAIL || '(missing)');
    console.log('GOOGLE_PRIVATE_KEY is set:', !!process.env.GOOGLE_PRIVATE_KEY);

    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        console.error('ERROR: Missing credentials in .env');
        process.exit(1);
    }

    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    console.log('Attempting to fetch spreadsheet metadata...');
    const res = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID
    });

    console.log('SUCCESS: Connected to Google Sheets.');
    console.log('Title:', res.data.properties.title);
    console.log('Sheets found:', res.data.sheets.length);
    res.data.sheets.forEach(s => console.log(' - ' + s.properties.title));

} catch (error) {
    console.error('FAILURE: Connection failed.');
    console.error(error);
}
