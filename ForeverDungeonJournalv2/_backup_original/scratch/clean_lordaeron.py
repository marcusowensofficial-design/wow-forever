import os
from PIL import Image
import numpy as np

uploaded_dir = r"C:\Users\marco\.gemini\antigravity-ide\brain\bdaed8ea-236c-4f36-aa5c-89ff8320d168\.user_uploaded"
img3 = Image.open(os.path.join(uploaded_dir, "media_1790787869179.png")).convert("RGB")
arr = np.array(img3)

# The dots pill is located around y: 450-475, x: 295-325
# Let's inspect the surrounding parchment color:
# On the left: x in 270-295, y in 450-475
# On the right: x in 325-350, y in 450-475

patch_left = arr[450:475, 275:295]
patch_right = arr[450:475, 325:345]

# Linear horizontal blend of left and right patches to smoothly fill 295:325
fill_width = 325 - 295
blended = np.zeros((25, fill_width, 3), dtype=np.uint8)
for i in range(fill_width):
    alpha = i / (fill_width - 1)
    col_left = patch_left[:, -1]
    col_right = patch_right[:, 0]
    blended[:, i] = ((1 - alpha) * col_left + alpha * col_right).astype(np.uint8)

arr_cleaned = arr.copy()
arr_cleaned[450:475, 295:325] = blended

cleaned_img = Image.fromarray(arr_cleaned)
cleaned_img.save("scratch/lordaeron_cleaned_preview.png")
print("Saved lordaeron_cleaned_preview.png successfully")
