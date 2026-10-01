import urllib.request
from PIL import Image

url = "https://wowquesting.weebly.com/uploads/8/0/8/2/80828608/rc-1_1.jpg"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=10) as resp:
    data = resp.read()
with open("scratch_weebly_rfc.jpg", "wb") as f:
    f.write(data)

im = Image.open("scratch_weebly_rfc.jpg")
print("RFC Weebly size:", im.size)
