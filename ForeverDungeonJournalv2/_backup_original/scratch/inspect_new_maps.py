import urllib.request
from PIL import Image
import numpy as np
import os

maps = {
    "Ragefire Chasm": ("https://wow.zamimg.com/images/wow/maps/enus/original/2437-1.jpg", "scratch_rfc.jpg"),
    "Shadowfang Keep": ("https://wow.zamimg.com/images/wow/maps/enus/original/209-1.jpg", "scratch_sfk.jpg"),
    "Wailing Caverns": ("https://wow.zamimg.com/images/wow/maps/enus/original/718.jpg", "scratch_wc.jpg"),
    "Blackfathom Deeps": ("https://wow.zamimg.com/images/wow/maps/enus/original/719-1.jpg", "scratch_bfd.jpg"),
}

for name, (url, fname) in maps.items():
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = resp.read()
    with open(fname, 'wb') as f:
        f.write(data)
    im = Image.open(fname)
    arr = np.array(im)
    print(f"=== {name} ===")
    print(f"  Size: {im.size}, aspect: {im.size[0]/im.size[1]:.4f}")
    # check edges for black pixels
    print(f"  Top row mean RGB: {arr[0].mean(axis=0)}")
    print(f"  Bottom row mean RGB: {arr[-1].mean(axis=0)}")
    print(f"  Left col mean RGB: {arr[:, 0].mean(axis=0)}")
    print(f"  Right col mean RGB: {arr[:, -1].mean(axis=0)}")
