import urllib.request
from PIL import Image
import io

base = "https://wowquesting.weebly.com/"
urls = [
    "uploads/8/0/8/2/80828608/rc-1_1.jpg",
    "uploads/8/0/8/2/80828608/wailing-caverns_1.jpg",
]

for path in urls:
    full_url = base + path
    req = urllib.request.Request(full_url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            im = Image.open(io.BytesIO(data))
            print(f"{path}: size={im.size} len={len(data)}")
    except Exception as e:
        print(f"Error {path}: {e}")
