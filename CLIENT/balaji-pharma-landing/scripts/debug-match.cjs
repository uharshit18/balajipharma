const fs = require('fs');
const path = require('path');

const masterPath = path.join(__dirname, '../public/master-data.json');
const stockPath = path.join(__dirname, '../public/assets/ADMINStocks.json');

const masterData = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
const stockData = JSON.parse(fs.readFileSync(stockPath, 'utf8'));

const product = masterData.products.find(p => p.productName.includes('AVERZINE LOTION'));
console.log('Product Found:', product);

if (product) {
    const rawCode = product.productCode;
    const normalizedCode = rawCode.toString().trim().toLowerCase();

    console.log(`Raw Code: '${rawCode}'`);
    console.log(`Normalized Code: '${normalizedCode}'`);
    console.log(`Code Char Codes:`, normalizedCode.split('').map(c => c.charCodeAt(0)));

    const stockItem = stockData.find(s => s.ProductCode.toString().trim().toLowerCase() === normalizedCode);
    console.log('Stock Item Found:', stockItem);

    if (stockItem) {
        console.log('MATCH SUCCESSFUL');
    } else {
        console.log('MATCH FAILED');
        // Let's search for partial matches
        const partial = stockData.find(s => s.ProductCode.includes('CAN037'));
        console.log('Partial match in stock:', partial);
        if (partial) {
            console.log(`Stock Code: '${partial.ProductCode}'`);
            console.log(`Stock Code normalized: '${partial.ProductCode.toString().trim().toLowerCase()}'`);
            console.log(`Stock Code Char Codes:`, partial.ProductCode.toString().trim().toLowerCase().split('').map(c => c.charCodeAt(0)));
        }
    }
}
