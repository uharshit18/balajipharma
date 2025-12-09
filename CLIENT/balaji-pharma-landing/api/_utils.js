import { google } from 'googleapis';

export const cors = (res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
};

export const getAuth = () => {
    // Vercel Environment Variables need to handle newlines in private keys correctly
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (privateKey) {
        // Handle wrapping quotes if they exist (sometimes users paste them)
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
            privateKey = privateKey.slice(1, -1);
        }
        // Handle literal '\n' characters (common in Vercel env vars Copy/Paste)
        privateKey = privateKey.replace(/\\n/g, '\n');
    }

    return new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
};

export const SPREADSHEET_ID = '12N4UwzTV0f6s5T_4JtxRwbh9bIir5IU3DgOLepqblnk'; // Updated ID
