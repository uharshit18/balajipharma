
import os
import shutil
import json
import re
from pathlib import Path

# Paths
SOURCE_DIR = Path("assets/brands")
TARGET_DIR = Path("balajipharma/CLIENT/balaji-pharma-landing/public/brands")
MAPPING_FILE = Path("balajipharma/CLIENT/balaji-pharma-landing/src/data/logoMap.json")

def main():
    if not SOURCE_DIR.exists():
        print(f"[ERROR] Source directory {SOURCE_DIR} does not exist.")
        return

    if not TARGET_DIR.exists():
        os.makedirs(TARGET_DIR)
        print(f"[INFO] Created target directory {TARGET_DIR}")

    brand_map = {}
    
    print(f"[INFO] Processing files from {SOURCE_DIR}...")
    
    for file_path in SOURCE_DIR.iterdir():
        if file_path.is_file() and file_path.suffix.lower() in ['.png', '.jpg', '.jpeg', '.webp']:
            # Source filename example: sun_pharma.png
            filename = file_path.name
            
            # Copy file
            shutil.copy2(file_path, TARGET_DIR / filename)
            
            # Create key. We want to map roughly:
            # "sun-pharma" (slug) -> "sun_pharma.png" (file)
            # "sun_pharma" (snake) -> "sun_pharma.png" (file)
            
            # Let's clean the name to be a standard key
            name_stem = file_path.stem # sun_pharma
            
            # Map both snake_case and kebab-case variants to be safe
            snake_key = name_stem.lower().replace('-', '_').replace(' ', '_')
            kebab_key = snake_key.replace('_', '-')
            
            brand_map[snake_key] = filename
            brand_map[kebab_key] = filename
            
            # specific fix for "johnson_and_johnson" vs "johnson_johnson" if needed
            # but our fetcher produced consistently named files based on query.
            
    # Write JSON map
    with open(MAPPING_FILE, 'w') as f:
        json.dump(brand_map, f, indent=2)
        
    print(f"[INFO] Successfully moved {len(brand_map)//2} images (mapped double keys) to {TARGET_DIR}")
    print(f"[INFO] Created mapping file at {MAPPING_FILE}")

if __name__ == "__main__":
    main()
