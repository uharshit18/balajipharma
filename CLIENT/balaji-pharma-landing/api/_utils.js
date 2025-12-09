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
        // 1. Remove wrapping double quotes if present
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
            privateKey = privateKey.slice(1, -1);
        }

        // 2. Handle escaped newlines (literal "\n") -> real newlines
        // logical explanation: many users copy from JSON where it is "\n" literal
        if (privateKey.includes('\\n')) {
            privateKey = privateKey.replace(/\\n/g, '\n');
        }

        // 3. Ensure it looks like a valid PEM key
        // Sometimes spaces are lost or it's a one-liner without newlines
        const header = '-----BEGIN PRIVATE KEY-----';
        const footer = '-----END PRIVATE KEY-----';

        if (!privateKey.includes(header)) {
            // It might be just the base64 body, let's try to wrap it?
            // Unlikely, usually headers are there.
            // Let's assume if headers are missing, it's definitely broken or raw base64
            // But let's check for "one long line with spaces" issue
        }

        // 4. Final safety cleanup
        // Sometimes copy-paste results in spaces instead of newlines for the headers
        // We ensure headers are on their own lines
        privateKey = privateKey.replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n');
        privateKey = privateKey.replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----');

        // Collapse multiple newlines just in case
        privateKey = privateKey.replace(/\n+/g, '\n');
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
