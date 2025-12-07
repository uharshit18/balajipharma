
import fs from 'fs';
import path from 'path';

const API_URL = 'https://balajipharma.onrender.com/api/companies';
const OUTPUT_FILE = path.join('src', 'data', 'companies.json');

async function fetchCompanies() {
    console.log('Fetching companies from:', API_URL);
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        const data = await res.json();

        // Ensure directory exists
        const dir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
        console.log(`Successfully saved ${data.length} companies to ${OUTPUT_FILE}`);
    } catch (error) {
        console.error('Error fetching companies:', error);
        process.exit(1);
    }
}

fetchCompanies();
