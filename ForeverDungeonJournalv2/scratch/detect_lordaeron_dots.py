import os
from PIL import Image
import numpy as np

uploaded_dir = r"C:\Users\marco\.gemini\antigravity-ide\brain\bdaed8ea-236c-4f36-aa5c-89ff8320d168\.user_uploaded"
img3 = Image.open(os.path.join(uploaded_dir, "media_1790787869179.png")).convert("RGB")
arr = np.array(img3)
h, w, _ = arr.shape
print(f"Ruins of Lordaeron (img3): w={w}, h={h}")

# The boss dots are bright red: R > 180 and R > G + 80 and R > B + 80
mask = (arr[:, :, 0] > 180) & (arr[:, :, 0] > arr[:, :, 1] + 100) & (arr[:, :, 0] > arr[:, :, 2] + 100)
from scipy.ndimage import label, center_of_mass
lbl, num_features = label(mask)
print("Number of red dot features found:", num_features)

# Let's filter by size (e.g. area > 30 pixels) to get the actual boss pins
centers = []
for i in range(1, num_features + 1):
    comp_mask = (lbl == i)
    area = np.sum(comp_mask)
    if area > 40:
        cy, cx = center_of_mass(comp_mask)
        centers.append((cx, cy, area))

print(f"Found {len(centers)} major red dots:")
for cx, cy, area in sorted(centers, key=lambda p: p[1]):
    nx = cx / w
    ny = cy / h
    print(f"Dot: pixel=({cx:.1f}, {cy:.1f}), normalized=({nx:.4f}, {ny:.4f}), area={area}")

# Also check blue dot for Edward:
blue_mask = (arr[:, :, 2] > 160) & (arr[:, :, 2] > arr[:, :, 0] + 80) & (arr[:, :, 2] > arr[:, :, 1] + 50)
lbl_b, num_b = label(blue_mask)
for i in range(1, num_b + 1):
    area = np.sum(lbl_b == i)
    if area > 20:
        cy, cx = center_of_mass(lbl_b == i)
        print(f"Blue dot (Edward): pixel=({cx:.1f}, {cy:.1f}), normalized=({cx/w:.4f}, {cy/h:.4f}), area={area}")
