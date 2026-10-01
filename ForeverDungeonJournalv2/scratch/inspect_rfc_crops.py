from PIL import Image
import numpy as np

# Let's inspect where the skull symbols are on RFC map
im = Image.open('scratch_rfc.jpg').crop((0, 0, 1008, 672))
arr = np.array(im)

# Look at the 4 bosses in RFC:
# 1. Oggleflint: In our test, x=0.885, y=0.585 -> px=892, py=393.
# 2. Taragaman: x=0.435, y=0.515 -> px=438, py=346.
# 3. Jergosh: x=0.350, y=0.825 -> px=352, py=554.
# 4. Bazzalan: x=0.485, y=0.885 -> px=488, py=594.

# Let's crop around these points and inspect
crops = [
    ("Oggleflint", 892, 393),
    ("Taragaman", 438, 346),
    ("Jergosh", 352, 554),
    ("Bazzalan", 488, 594),
]

for name, x, y in crops:
    c = im.crop((x-30, y-30, x+30, y+30))
    c.save(f"scratch_rfc_{name}.png")
    print(f"{name} at ({x}, {y}) saved.")
