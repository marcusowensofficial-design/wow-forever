import os
from PIL import Image
import numpy as np

uploaded_dir = r"C:\Users\marco\.gemini\antigravity-ide\brain\bdaed8ea-236c-4f36-aa5c-89ff8320d168\.user_uploaded"
img2 = Image.open(os.path.join(uploaded_dir, "media_1790787794294.jpg")).convert("RGB")
arr = np.array(img2)
h, w, _ = arr.shape
print(f"Hall of Thanes: w={w}, h={h}")

# The dots are distinctly purple/blue (high blue, moderate red, low green):
# Let's inspect pixels near Durgen Dirgehammer (top, around x=220, y=50)
print("Pixel at 220, 50:", arr[50, 220])

# Let's search for purple/blue dots: B > 120 and B > G + 50 and R > 50
mask = (arr[:, :, 2] > 120) & (arr[:, :, 2] > arr[:, :, 1] + 50) & (arr[:, :, 0] > 40)
y_indices, x_indices = np.where(mask)
print(f"Found {len(x_indices)} purple dot pixels")

# Cluster connected components or find distinct centroids
from scipy.ndimage import label, center_of_mass
lbl, num_features = label(mask)
print("Number of dots found:", num_features)
centers = center_of_mass(mask, lbl, range(1, num_features + 1))
for i, (cy, cx) in enumerate(centers):
    # Normalized coords:
    nx = cx / w
    ny = cy / h
    print(f"Dot {i+1}: pixel=({cx:.1f}, {cy:.1f}), normalized=({nx:.4f}, {ny:.4f})")
