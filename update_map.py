
import json
import re

MAP_FILE = "balajipharma/CLIENT/balaji-pharma-landing/src/data/logoMap.json"

def main():
    try:
        with open(MAP_FILE, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: {MAP_FILE} not found.")
        return

    new_map = data.copy()
    
    # Suffixes to strip (in order of length/specificity)
    suffixes = [
        "_laboratories_pvt_ltd", "_laboratories_limited", "_laboratories",
        "_pharmaceuticals_pvt_ltd", "_pharmaceuticals_limited", "_pharmaceuticals",
        "_lifesciences_pvt_ltd", "_lifesciences", "_life_sciences", "_lifecare_ltd",
        "_healthcare_pvt_ltd", "_healthcare",
        "_remedies_pvt_ltd", "_remedies",
        "_pharma_pvt_ltd", "_pharma_limited", "_pharma_company", "_pharma",
        "_limited", "_pvt_ltd", "_ltd", "_pvt"
    ]

    count = 0
    for key, filename in data.items():
        # Only process snake_case keys to avoid duplicating effort (kebab handled by logic or duplicate)
        if '-' in key:
            continue
            
        original_key = key
        simplified_key = key

        # Try to strip suffixes
        matched = False
        for suffix in suffixes:
            if simplified_key.endswith(suffix):
                simplified_key = simplified_key[:-len(suffix)]
                matched = True
                break
        
        # If we stripped something, add the new key
        if matched and simplified_key and simplified_key != original_key:
            # Add snake_case version
            if simplified_key not in new_map:
                new_map[simplified_key] = filename
                print(f"Added alias: {simplified_key} -> {filename}")
                count += 1
            
            # Add kebab-case version
            kebab_key = simplified_key.replace('_', '-')
            if kebab_key not in new_map:
                new_map[kebab_key] = filename
                print(f"Added alias: {kebab_key} -> {filename}")
                count += 1

    with open(MAP_FILE, 'w') as f:
        json.dump(new_map, f, indent=2)
        
    print(f"Successfully updated map with {count} new aliases.")

if __name__ == "__main__":
    main()
