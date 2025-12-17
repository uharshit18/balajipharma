const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/*
 * USAGE:
 * 1. Install sharp: npm install sharp
 * 2. Run script: node scripts/optimize-assets.cjs
 */

const TARGET_DIR = path.join(__dirname, '../public/assets');
const QUALITY = 80;

async function optimizeImages() {
    try {
        const sharp = require('sharp');

        const files = fs.readdirSync(TARGET_DIR);

        for (const file of files) {
            if (file.match(/\.(png|jpg|jpeg)$/i)) {
                const filePath = path.join(TARGET_DIR, file);
                const fileExt = path.extname(file);
                const fileName = path.basename(file, fileExt);
                const outputPath = path.join(TARGET_DIR, `${fileName}.webp`);

                console.log(`Optimizing: ${file} -> ${fileName}.webp`);

                await sharp(filePath)
                    .webp({ quality: QUALITY })
                    .toFile(outputPath);

                console.log(`Saved: ${outputPath}`);
            }
        }
        console.log("Optimization Complete!");

    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            console.error("\x1b[31m%s\x1b[0m", "ERROR: 'sharp' module not found.");
            console.log("Please run: npm install sharp");
            console.log("Then re-run this script.");
        } else {
            console.error("Optimization failed:", error);
        }
    }
}

optimizeImages();
