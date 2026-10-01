import urllib.request
from PIL import Image
import io

urls = [
    'https://wow.zamimg.com/images/wow/maps/enus/original/2437.jpg',
    'https://wow.zamimg.com/images/wow/maps/enus/original/2437-1.jpg',
    'https://wow.zamimg.com/images/wow/classic/maps/enus/original/2437.jpg',
    'https://wow.zamimg.com/images/wow/maps/enus/zoom/2437.jpg',
    'https://wow.zamimg.com/images/wow/maps/enus/zoom/2437-1.jpg',
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = resp.read()
            im = Image.open(io.BytesIO(data))
            print(f"FOUND: {u} -> size {im.size} len {len(data)}")
    except Exception as e:
        pass
