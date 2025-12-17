
import os
import re
import time
import requests
import random
from bs4 import BeautifulSoup
from urllib.parse import urlparse, parse_qs, unquote
from pathlib import Path
from typing import Optional, List

# -----------------------------------------------------------------------------
# DEPENDENCIES:
# pip install requests beautifulsoup4
# -----------------------------------------------------------------------------

# TODO: Paste your full list of Google Images URLs into IMAGE_SEARCH_URLS below.
# I have pre-filled it with a few examples and the first few from your list.

IMAGE_SEARCH_URLS = [
    "https://www.google.com/search?tbm=isch&q=AIMILL+PHARAMA+logo",
    "https://www.google.com/search?tbm=isch&q=ALEMBIC+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=APEX+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Abbott+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Adonis+Laboratries+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Ajanta+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Akumentis+Healthcere+logo",
    "https://www.google.com/search?tbm=isch&q=Alkem+Laboratories+logo",
    "https://www.google.com/search?tbm=isch&q=Amagen+India+Life+Sciences+logo",
    "https://www.google.com/search?tbm=isch&q=Arinna+Lifesciences+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Arissa+Life+Science+logo",
    "https://www.google.com/search?tbm=isch&q=Aristo+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Assurica+Life+Sciences+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Astaris+Lifesciences+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Aventis+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=BIOCHEM+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=BOOTS-KNOLL+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Bennet+Pharmaceutical+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Bestochem+Formulations+logo",
    "https://www.google.com/search?tbm=isch&q=Blucross+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=CIPLA+logo",
    "https://www.google.com/search?tbm=isch&q=Cachet+pharmaceuticals+logo",
    "https://www.google.com/search?tbm=isch&q=Cadila+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Canixa+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Coman+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Comed+pharmaceuticals+logo",
    "https://www.google.com/search?tbm=isch&q=Connote+Heathcare+logo",
    "https://www.google.com/search?tbm=isch&q=Cu-Card+Skincare+Div+logo",
    "https://www.google.com/search?tbm=isch&q=Cyrus+Remedies+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Cytus+Healthcare+logo",
    "https://www.google.com/search?tbm=isch&q=DUPHAR+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Dakshinamurti+Pharma+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Demorbus+India+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Dr+Reddy+logo",
    "https://www.google.com/search?tbm=isch&q=E-MERCK+logo",
    "https://www.google.com/search?tbm=isch&q=Emcure+Gen+Div+logo",
    "https://www.google.com/search?tbm=isch&q=Erie+Pharmaceuticals+logo",
    "https://www.google.com/search?tbm=isch&q=Fdc+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Fluford+India+logo",
    "https://www.google.com/search?tbm=isch&q=Franco+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=GLAXO+logo",
    "https://www.google.com/search?tbm=isch&q=GUFIC+logo",
    "https://www.google.com/search?tbm=isch&q=Galcare+Pharmaceutical+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=German+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Glaxosmithkline+logo",
    "https://www.google.com/search?tbm=isch&q=Glenmark+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Glowderma+Lab+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Grenitta+Pharmaceuticals+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Group+Pharmaceuticals+Limited+logo",
    "https://www.google.com/search?tbm=isch&q=HOUECHST+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Hbl+Lifesciences+logo",
    "https://www.google.com/search?tbm=isch&q=Healing+Pharma+India+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Himalaya+Drug+Company+logo",
    "https://www.google.com/search?tbm=isch&q=Hll+Lifecare+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Ignited+India+Pharmaceutical+logo",
    "https://www.google.com/search?tbm=isch&q=Ikon+Rememdies+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Ind+pharma+company+logo",
    "https://www.google.com/search?tbm=isch&q=Indchemie+logo",
    "https://www.google.com/search?tbm=isch&q=Indoco+Remedies+logo",
    "https://www.google.com/search?tbm=isch&q=Indswift+Laboratories+logo",
    "https://www.google.com/search?tbm=isch&q=Innovcare+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Intas+pharmaceuticals+logo",
    "https://www.google.com/search?tbm=isch&q=Ipca+Laboratories+logo",
    "https://www.google.com/search?tbm=isch&q=J.B+Chemicals+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Jagsonpal+logo",
    "https://www.google.com/search?tbm=isch&q=Johnson+%26+Johnson+logo",
    "https://www.google.com/search?tbm=isch&q=Juggat+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=KLM+LABORATORIES+logo",
    "https://www.google.com/search?tbm=isch&q=Kelgan+Pharmaceutical+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Kenmed+Pharma+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Kenrox+Healthcare+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Kepler+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Khandelwal+Laboratories+logo",
    "https://www.google.com/search?tbm=isch&q=Knoll+pharmaceuticals+logo",
    "https://www.google.com/search?tbm=isch&q=LUPIN+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Laures+Pharmacetical+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Lincoln+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=MACLEODS+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=MAYER+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=MEDELY+pharmaceutical+logo",
    "https://www.google.com/search?tbm=isch&q=Mankind+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Mapra+Pharmaceuticals+logo",
    "https://www.google.com/search?tbm=isch&q=Martyn+pharmaceutical+logo",
    "https://www.google.com/search?tbm=isch&q=Mclean+Laboratories+logo",
    "https://www.google.com/search?tbm=isch&q=Med+Manor+Organics+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Meksun+Biotec+Pvt+logo",
    "https://www.google.com/search?tbm=isch&q=Merion+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Micro+Labs+logo",
    "https://www.google.com/search?tbm=isch&q=Nabarun+Life+Sciences+logo",
    "https://www.google.com/search?tbm=isch&q=Neuborn+Life+Sciences+logo",
    "https://www.google.com/search?tbm=isch&q=Nicholas+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=OTSIRA+GENETICA+logo",
    "https://www.google.com/search?tbm=isch&q=Olcare+Laboratoies+logo",
    "https://www.google.com/search?tbm=isch&q=PSYCOTROPICS+India+logo",
    "https://www.google.com/search?tbm=isch&q=Pfizer+logo",
    "https://www.google.com/search?tbm=isch&q=Pil+Psychotropics+India+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Piramal+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Protec+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=RPG+LIFE+Sciences+logo",
    "https://www.google.com/search?tbm=isch&q=Radical+Div+Of+Pil+logo",
    "https://www.google.com/search?tbm=isch&q=Radico+Remedies+Bipl+logo",
    "https://www.google.com/search?tbm=isch&q=Rapross+Pharmaceuticals+P+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Raptakos+Brett+Co+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Research+Pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Rv+Lifesciences+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=SANOFI+INDIA+LTD+logo",
    "https://www.google.com/search?tbm=isch&q=SIGMA+LABO+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=SUN+PHARMACEUTICAL+logo",
    "https://www.google.com/search?tbm=isch&q=Segull+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Sertec+Pharmaceuticals+logo",
    "https://www.google.com/search?tbm=isch&q=Shreya+Life+Sciences+logo",
    "https://www.google.com/search?tbm=isch&q=Solderma+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Sunwin+Healthcare+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Svizera+Healthcare+logo",
    "https://www.google.com/search?tbm=isch&q=Swiss+Medicare+Pvt+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=Syncom+Formulations+India+Ltd+logo",
    "https://www.google.com/search?tbm=isch&q=T.T.K.+Pharma+logo",
    "https://www.google.com/search?tbm=isch&q=TABLET-INDIA+logo",
    "https://www.google.com/search?tbm=isch&q=Torrent+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Troika+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=J.B+CHEMICALS+logo",
    "https://www.google.com/search?tbm=isch&q=UNISANKYO+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Torrent+Pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Unimarck+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Univentis+Medicare+logo",
    "https://www.google.com/search?tbm=isch&q=Universal+Pharmaceuticals+Pvt+logo",
    "https://www.google.com/search?tbm=isch&q=WIN-MEDICARE+logo",
    "https://www.google.com/search?tbm=isch&q=Wallace+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Westcost+pharma+logo",
    "https://www.google.com/search?tbm=isch&q=Willcare+Life+Sciences+logo",
    "https://www.google.com/search?tbm=isch&q=Wockhardt+logo",
    "https://www.google.com/search?tbm=isch&q=Zydus+Cadila+Healthcare+logo",
]

# Standard User-Agent to mimic a browser
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

OUTPUT_DIR = Path("assets/brands")

def setup_directories():
    """Ensure the output directory exists."""
    if not OUTPUT_DIR.exists():
        os.makedirs(OUTPUT_DIR)
        print(f"[INFO] Created directory: {OUTPUT_DIR}")

def extract_brand_slug(url: str) -> str:
    """
    Extract a brand-safe slug from the search URL.
    Example: ...q=CIPLA+logo -> cipla
    """
    parsed = urlparse(url)
    query_params = parse_qs(parsed.query)
    q_val = query_params.get("q", [""])[0]
    
    # Remove 'logo' (case insensitive)
    clean_name = re.sub(r'\blogo\b', '', q_val, flags=re.IGNORECASE)
    
    # Replace special chars with space first to handle '+' or '%20'
    # parse_qs handles decoding, but we might still have '+' if it wasn't decoded as space
    clean_name = clean_name.replace('+', ' ')
    
    # Normalize: strip, lower, replace non-alphanumeric with _
    clean_name = clean_name.strip().lower()
    
    # Replace spaces and other symbols with underscore
    slug = re.sub(r'[\s\W]+', '_', clean_name)
    
    # Strip leading/trailing underscores
    slug = slug.strip('_')
    
    if not slug:
        # Fallback if slug extraction fails
        return f"brand_{int(time.time())}"
        
    return slug

def get_logo_image_url(search_url: str) -> Optional[str]:
    """
    Scrape the Google Images results page to find a logo URL.
    Handles both the modern JS-heavy page (via regex) and the Basic HTML page (via BeautifulSoup).
    """
    try:
        response = requests.get(search_url, headers=HEADERS, timeout=10)
        response.raise_for_status()
        html_content = response.text
        
        # Method 1: Regex for high-res images in JS blobs (Modern/Desktop version)
        # Look for typical Google JSON patterns for images: ["http...", height, width]
        candidates = re.findall(r'"(https?://[^"]+\.(?:png|jpg|jpeg|webp))",\d+,\d+', html_content)
        
        if candidates:
            # Filter and pick the first good one
            for url in candidates:
                url = bytes(url, "utf-8").decode("unicode_escape")
                lower = url.lower()
                if "google" not in lower and "gstatic" not in lower:
                     return url

        # Method 2: BeautifulSoup for Basic/WAP version (Fallback to thumbnails)
        # This is what requests usually gets without a browser driver.
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # In Basic HTML, images are usually inside <a> tags or just <img> tags with gstatic src
        # Example: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:..." />
        
        for img in soup.find_all('img'):
            src = img.get('src')
            if not src:
                continue
                
            # Skip Google's own logos
            if 'googlelogo' in src or '/images/branding/' in src:
                continue
            
            # Valid result images usually come from gstatic in the basic view
            if src.startswith('https://') and ('gstatic.com' in src or 'encrypted-tbn' in src):
                return src
                
            # Sometimes they are direct URLs in advanced mobile views
            if src.startswith('http') and not any(x in src for x in ['google.com', 'gstatic.com']):
                 return src

        return None

    except Exception as e:
        print(f"[ERROR] Failed to fetch search page {search_url}: {e}")
        return None

def download_image(image_url: str, slug: str) -> bool:
    """
    Download the image and save it to the assets/brands folder.
    Returns True if successful.
    """
    try:
        # Retry logic
        for attempt in range(3):
            try:
                # Use a specific header for image requests to avoid blocking
                img_headers = HEADERS.copy()
                img_headers['Accept'] = 'image/webp,image/apng,image/*,*/*;q=0.8'
                
                r = requests.get(image_url, headers=img_headers, timeout=10)
                r.raise_for_status()
                
                # Determine extension
                content_type = r.headers.get('Content-Type', '').lower()
                ext = 'png' # Default
                if 'jpeg' in content_type or 'jpg' in content_type:
                    ext = 'jpg'
                elif 'webp' in content_type:
                    ext = 'webp'
                elif 'png' in content_type:
                    ext = 'png'
                else:
                    # Fallback to URL extension
                    if image_url.lower().endswith('.jpg') or image_url.lower().endswith('.jpeg'):
                        ext = 'jpg'
                    elif image_url.lower().endswith('.png'):
                        ext = 'png'
                
                output_path = OUTPUT_DIR / f"{slug}.{ext}"
                
                with open(output_path, "wb") as f:
                    f.write(r.content)
                
                print(f"[INFO] Saved logo to {output_path}")
                return True
                
            except requests.exceptions.RequestException as re_err:
                time.sleep(1 + attempt)  # Backoff
                if attempt == 2:
                    raise re_err
                    
    except Exception as e:
        print(f"[ERROR] Could not download image for {slug} logic url: {image_url}. Error: {e}")
        return False

def main():
    setup_directories()
    
    print(f"[INFO] Starting logo fetch for {len(IMAGE_SEARCH_URLS)} brands...")
    
    for url in IMAGE_SEARCH_URLS:
        slug = extract_brand_slug(url)
        print(f"[INFO] Processing {slug}...")
        
        image_url = get_logo_image_url(url)
        
        if image_url:
            print(f"[INFO] Chosen image URL: {image_url}")
            success = download_image(image_url, slug)
            if not success:
                print(f"[ERROR] Download failed for {slug}")
        else:
            print(f"[ERROR] Could not find a suitable candidate image for {slug}")
        
        # Rate limiting: random sleep between requests
        sleep_time = random.uniform(2.0, 5.0)
        time.sleep(sleep_time)

if __name__ == "__main__":
    main()
