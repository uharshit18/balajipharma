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

export const normalizeHeader = (header) => {
    if (!header) return '';
    const h = header.toString().toLowerCase().trim();
    if (h.includes('code') || h.includes('sku') || h.includes('id')) return 'productCode'; // Moved to top
    if (h.includes('product') || h.includes('item') || h.includes('name') || h.includes('description')) return 'productName';
    if (h.includes('pack')) return 'packing';
    if (h.includes('mrp')) return 'mrp';
    if (h.includes('sale') || h.includes('rate') || h.includes('ptr') || h.includes('price')) return 'saleRate';
    if (h.includes('div')) return 'division';
    if (h.includes('comp') || h.includes('generic')) return 'composition';
    return h.replace(/\s+/g, '');
};

export const getAuth = () => {
    // Vercel Environment Variables need to handle newlines in private keys correctly
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (privateKey) {
        // 0. CHECK FOR JSON: If user pasted the whole google-services.json file content
        if (privateKey.trim().startsWith('{')) {
            try {
                const keyFile = JSON.parse(privateKey);
                if (keyFile.private_key) {
                    privateKey = keyFile.private_key;
                }
            } catch (e) {
                // Not valid JSON, proceed as string
            }
        }

        // 1. Remove wrapping double quotes if present (only if not JSON)
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

        if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
            // User provided just the base64 body (common mistake)
            // We need to clean it and wrap it.
            const body = privateKey.trim();
            privateKey = `-----BEGIN PRIVATE KEY-----\n${body}\n-----END PRIVATE KEY-----`;
        }

        // 4. Final safety cleanup
        // Ensure headers are on their own lines (handling potential bad copy-pastes)
        privateKey = privateKey.replace(/-----BEGIN PRIVATE KEY-----/g, '-----BEGIN PRIVATE KEY-----\n');
        privateKey = privateKey.replace(/-----END PRIVATE KEY-----/g, '\n-----END PRIVATE KEY-----');

        // Collapse multiple newlines just in case and trim
        privateKey = privateKey.replace(/\n+/g, '\n').trim();
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
