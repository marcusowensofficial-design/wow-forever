import urllib.request
import re

url = 'https://wowquesting.weebly.com/classic-gallery.html'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8')
    images = re.findall(r'/uploads/[^\s"\'<>]+\.(?:jpg|png)', html)
    print('Found images:', len(images))
    for img in sorted(set(images)):
        print(img)
except Exception as e:
    print('Error:', e)
