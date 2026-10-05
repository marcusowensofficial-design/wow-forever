import urllib.request
import re
import json

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

def fetch_page(url):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def find_zone_items(zone_id):
    url = f"https://www.wowhead.com/forever/zone={zone_id}"
    html = fetch_page(url)
    if not html:
        return []
    print(f"Zone {zone_id} fetched, length: {len(html)}")
    # Find all listviews
    items = []
    # Find listviewitems blocks
    matches = re.findall(r'new Listview\((\{.*?\})\);', html, re.DOTALL)
    print(f"Found {len(matches)} listviews in zone {zone_id}")
    for m in matches:
        if '"id":"zone-drops"' in m or '"id":"drops"' in m or '"id":"items"' in m or "'id':'zone-drops'" in m or "'id':'drops'" in m:
            print("Found drops/zone-drops listview!")
            # extract data: [...]
            data_m = re.search(r'data:\s*(\[.*?\])(?:,\s*[a-zA-Z_]+:|\}\);)', m, re.DOTALL)
            if data_m:
                raw = data_m.group(1)
                # parse item ids
                item_ids = re.findall(r'"id":\s*(\d+)', raw)
                names = re.findall(r'"name":"([^"]+)"', raw)
                print(f"Item IDs found: {len(item_ids)}")
                return list(zip(item_ids, names))
    return items

if __name__ == "__main__":
    print("RFC 2437:")
    print(find_zone_items(2437))
    print("\nRFK 491:")
    print(find_zone_items(491))
