import cv2
import numpy as np
from PIL import Image

# 1. Load the original screenshot
raw = Image.open('scratch/user_atlas_deadmines.png').convert('RGB')
arr = np.array(raw)

# 2. Crop the 2-pixel gray line on the left
cropped = arr[:, 2:].copy()
h, w, _ = cropped.shape
print(f"Cropped dimensions: {w}x{h}")

# 3. Create inpaint mask
mask = np.zeros((h, w), dtype=np.uint8)

# Target 1: 'A' (Entrance, blue text) near (58, 96)
blue_A = (cropped[75:120, 40:80, 2].astype(int) - cropped[75:120, 40:80, 0].astype(int) > 15) & \
         (cropped[75:120, 40:80, 2].astype(int) - cropped[75:120, 40:80, 1].astype(int) > 15)
mask_A = np.zeros((45, 40), dtype=np.uint8)
mask_A[blue_A] = 255
mask_A = cv2.dilate(mask_A, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)), iterations=1)
mask[75:120, 40:80] = mask_A

# Target 2: 'B' (Exit, blue text) near (536, 212)
blue_B = (cropped[195:230, 515:540, 2].astype(int) - cropped[195:230, 515:540, 0].astype(int) > 15) & \
         (cropped[195:230, 515:540, 2].astype(int) - cropped[195:230, 515:540, 1].astype(int) > 15)
mask_B = np.zeros((35, 25), dtype=np.uint8)
mask_B[blue_B] = 255
mask_B = cv2.dilate(mask_B, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)), iterations=1)
mask[195:230, 515:540] = mask_B

# Target 3: '3' and RED CIRCLE (Sneed) at (197, 401)
cv2.ellipse(mask, (197, 401), (25, 26), 0, 0, 360, 255, -1)

# Target 4: Number '1' (Rhahk'Zor) at (112, 292)
cv2.circle(mask, (112, 292), 10, 255, -1)

# Target 5: Number '2' (Miner Johnson) at (216, 245)
cv2.circle(mask, (216, 245), 10, 255, -1)

# Target 6: Number '4' (Gilnid) at (264, 305)
cv2.circle(mask, (264, 305), 11, 255, -1)

# Target 7: Number '5' (Gunpowder) at (297, 186)
cv2.circle(mask, (297, 186), 10, 255, -1)

# Target 8: Number '6' (Cove / Ship) at (428, 174)
cv2.circle(mask, (428, 174), 11, 255, -1)

# 4. Perform Inpainting
inpainted = cv2.inpaint(cropped, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)

# 5. Remove Wood Texture in bottom-right corner
# Floor corridor ends at x=308, y=425. Cove ends at y=260.
for y in range(250, h):
    for x in range(240, w):
        if (x > 308 and y > 260) or (x >= 245 and y > 428):
            inpainted[y, x] = [0, 0, 0]

# 6. Make Canvas Square (540x540) by padding top & bottom symmetrically with black [0, 0, 0]
# Current size is 540 wide x 497 high.
pad_total = w - h  # 540 - 497 = 43
pad_top = pad_total // 2       # 21
pad_bottom = pad_total - pad_top  # 22

square_arr = np.zeros((w, w, 3), dtype=np.uint8)
square_arr[pad_top:pad_top + h, 0:w] = inpainted

# 7. Scale cleanly to 1024x1024 using Lanczos resampling
img_square = Image.fromarray(square_arr)
final_map = img_square.resize((1024, 1024), Image.Resampling.LANCZOS)

# Save preview and TGA
final_map.save('scratch/TheDeadmines_Atlas_Clean.png')
print(f"Generated clean map: 1024x1024 square, pad_top={pad_top}")
