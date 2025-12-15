import json
import os
from datetime import datetime

# Configuration
BASE_URL = "https://balaji-pharma.in"
TODAY = datetime.now().strftime("%Y-%m-%d")

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(BASE_DIR, 'CLIENT', 'balaji-pharma-landing', 'public', 'master-data.json')
SITEMAP_PATH = os.path.join(BASE_DIR, 'CLIENT', 'balaji-pharma-landing', 'public', 'sitemap.xml')

def slugify(text):
    return text.lower().replace(' ', '-').replace('.', '').replace('/', '-')

def generate_sitemap():
    print("Generating sitemap...")
    
    # Static Routes
    routes = [
        {"loc": "/", "priority": "1.0", "changefreq": "daily"},
        {"loc": "/about", "priority": "0.8", "changefreq": "monthly"},
        {"loc": "/contact", "priority": "0.8", "changefreq": "monthly"},
        {"loc": "/wholesale-medicines-rajasthan", "priority": "0.9", "changefreq": "daily"},
    ]
    
    # Dynamic Brand Routes
    try:
        with open(JSON_PATH, 'r') as f:
            data = json.load(f)
            brands = data.get('brands', [])
            
        unique_brands = set()
        for item in brands:
            if item.get('companyName'):
                unique_brands.add(item['companyName'])
                
        print(f"Found {len(unique_brands)} brands for sitemap.")
        
        for brand in sorted(list(unique_brands)):
            slug = slugify(brand)
            # URL structure: /brand-name-price-list
            routes.append({
                "loc": f"/{slug}-price-list",
                "priority": "0.8",
                "changefreq": "weekly"
            })
            
    except Exception as e:
        print(f"Error reading brand data: {e}")
        return

    # Build XML
    xml_content = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml_content.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    
    for route in routes:
        xml_content.append('  <url>')
        xml_content.append(f'    <loc>{BASE_URL}{route["loc"]}</loc>')
        xml_content.append(f'    <lastmod>{TODAY}</lastmod>')
        xml_content.append(f'    <changefreq>{route["changefreq"]}</changefreq>')
        xml_content.append(f'    <priority>{route["priority"]}</priority>')
        xml_content.append('  </url>')
        
    xml_content.append('</urlset>')
    
    with open(SITEMAP_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(xml_content))
        
    print(f"Sitemap generated at: {SITEMAP_PATH} with {len(routes)} URLs.")

if __name__ == "__main__":
    generate_sitemap()
