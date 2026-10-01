import os
from PIL import Image
import numpy as np

uploaded_dir = r"C:\Users\marco\.gemini\antigravity-ide\brain\bdaed8ea-236c-4f36-aa5c-89ff8320d168\.user_uploaded"
img3 = Image.open(os.path.join(uploaded_dir, "media_1790787869179.png")).convert("RGB")
img4 = Image.open(os.path.join(uploaded_dir, "media_1790787879752.png")).convert("RGB")

arr3 = np.array(img3)
arr4 = np.array(img4)

# Find horizontal offset of img3 inside img4:
# We can search for a patch from the banner "RUINS OF LORDAERON"
patch = arr3[20:60, 200:300]
h, w, _ = patch.shape

best_diff = 1e9
best_x = -1
for x in range(0, arr4.shape[1] - w):
    sub = arr4[20:60, x:x+w]
    diff = np.mean(np.abs(sub.astype(float) - patch.astype(float)))
    if diff < best_diff:
        best_diff = diff
        best_x = x

print(f"Banner matched at x={best_x}, mean diff={best_diff}")
offset_x = best_x - 200
print(f"img3 left edge in img4 coordinate space: offset_x={offset_x}")
