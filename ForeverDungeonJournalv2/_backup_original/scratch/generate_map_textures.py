import os
from PIL import Image
import numpy as np

uploaded_dir = r"C:\Users\marco\.gemini\antigravity-ide\brain\bdaed8ea-236c-4f36-aa5c-89ff8320d168\.user_uploaded"
output_dir = "Media/Maps"
os.makedirs(output_dir, exist_ok=True)

# 1. Hall of Thanes
img_thanes = Image.open(os.path.join(uploaded_dir, "media_1790787794294.jpg")).convert("RGB")
w_thanes, h_thanes = img_thanes.size
print(f"Hall of Thanes original: {w_thanes}x{h_thanes}")

# Scale cleanly to 1024x1024 power-of-two TGA using Lanczos resampling
tga_thanes = img_thanes.resize((1024, 1024), Image.Resampling.LANCZOS)
tga_thanes_path = os.path.join(output_dir, "HallOfThanes_Map.tga")
tga_thanes.save(tga_thanes_path)
print(f"Saved {tga_thanes_path} (size={os.path.getsize(tga_thanes_path)} bytes)")

# 2. Ruins of Lordaeron
img_lordaeron = Image.open(os.path.join(uploaded_dir, "media_1790787869179.png")).convert("RGB")
arr_lord = np.array(img_lordaeron)
# Inpaint the bottom reddit pagination dots (y: 450-475, x: 295-325)
patch_left = arr_lord[450:475, 275:295]
patch_right = arr_lord[450:475, 325:345]
fill_width = 325 - 295
blended = np.zeros((25, fill_width, 3), dtype=np.uint8)
for i in range(fill_width):
    alpha = i / (fill_width - 1)
    col_left = patch_left[:, -1]
    col_right = patch_right[:, 0]
    blended[:, i] = ((1 - alpha) * col_left + alpha * col_right).astype(np.uint8)

arr_lord[450:475, 295:325] = blended
cleaned_lord = Image.fromarray(arr_lord)
w_lord, h_lord = cleaned_lord.size
print(f"Ruins of Lordaeron original: {w_lord}x{h_lord}")

# Scale cleanly to 1024x1024 power-of-two TGA using Lanczos resampling
tga_lord = cleaned_lord.resize((1024, 1024), Image.Resampling.LANCZOS)
tga_lord_path = os.path.join(output_dir, "RuinsOfLordaeron_Map.tga")
tga_lord.save(tga_lord_path)
print(f"Saved {tga_lord_path} (size={os.path.getsize(tga_lord_path)} bytes)")
