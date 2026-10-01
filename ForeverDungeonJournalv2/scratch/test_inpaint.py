import cv2
import numpy as np
from PIL import Image

# Test inpainting for each target
# We will create an accurate mask for each target:
# For A and B: blue text + black outline
# For 1, 2, 4, 5, 6: white/light text + black shadow/outline
# For 3: red circle + white number 3 + shadow

im = Image.open('scratch/user_atlas_deadmines.png').convert('RGB')
img_np = np.array(im)
h, w, _ = img_np.shape

mask = np.zeros((h, w), dtype=np.uint8)

# 1. 'A' (x~60, y~96) and 'B' (x~538, y~213):
# Blue text: B > R + 25 and B > G + 25
blue_pixels = (img_np[:, :, 2].astype(int) - img_np[:, :, 0].astype(int) > 20) & \
              (img_np[:, :, 2].astype(int) - img_np[:, :, 1].astype(int) > 20)
# Dilate slightly to catch black outline
blue_mask = np.zeros((h, w), dtype=np.uint8)
blue_mask[blue_pixels] = 255
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
blue_mask = cv2.dilate(blue_mask, kernel, iterations=1)
# Only keep near A (x<100, y<150) and B (x>500, y>180)
valid_ab = np.zeros((h, w), dtype=bool)
valid_ab[70:120, 45:80] = True
valid_ab[195:230, 520:542] = True
mask[blue_mask > 0 & valid_ab] = 255

# 2. Red circle around '3' (x~199, y~401):
# Red pixels: R > 120, R > G * 1.5, R > B * 1.5
red_pixels = (img_np[:, :, 0].astype(int) > 110) & \
             (img_np[:, :, 0].astype(int) > img_np[:, :, 1].astype(int) * 1.5) & \
             (img_np[:, :, 0].astype(int) > img_np[:, :, 2].astype(int) * 1.5)
red_mask = np.zeros((h, w), dtype=np.uint8)
red_mask[red_pixels] = 255
red_kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
red_mask = cv2.dilate(red_mask, red_kernel, iterations=1)
# Also include number 3 inside the circle: x in [180, 220], y in [380, 420]
# Find bright pixels or dark outline inside the circle box
circle_box = np.zeros((h, w), dtype=bool)
circle_box[380:425, 178:222] = True
# Inside this box, any pixel that is either part of red ring OR the number 3
# Number 3 is bright white/yellow
sub = img_np[380:425, 178:222]
# Mark center number 3:
num3_pixels = (sub.mean(axis=2) > 120) | (red_mask[380:425, 178:222] > 0)
mask_sub = np.zeros((45, 44), dtype=np.uint8)
mask_sub[num3_pixels] = 255
mask_sub = cv2.dilate(mask_sub, kernel, iterations=1)
mask[380:425, 178:222] = np.maximum(mask[380:425, 178:222], mask_sub)

# 3. Numbers 1, 2, 4, 5, 6:
# White text with outline:
num_boxes = [
    ("num_1", 114, 292, 10),
    ("num_2", 218, 245, 10),
    ("num_4", 266, 305, 12),
    ("num_5", 299, 186, 10),
    ("num_6", 431, 174, 12),
]

for name, cx, cy, r in num_boxes:
    # in box [cy-r:cy+r, cx-r:cx+r], find text pixels (bright text or dark outline)
    box = img_np[cy-r:cy+r, cx-r:cx+r]
    # text is bright (mean > 130) or dark border (mean < 30 in bright room)
    box_mask = np.zeros((2*r, 2*r), dtype=np.uint8)
    box_mask[box.mean(axis=2) > 130] = 255
    box_mask = cv2.dilate(box_mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3)), iterations=1)
    mask[cy-r:cy+r, cx-r:cx+r] = np.maximum(mask[cy-r:cy+r, cx-r:cx+r], box_mask)

# Save the mask for inspection
Image.fromarray(mask).save('scratch/inpaint_mask.png')
print("Saved inpaint_mask.png")

# Run cv2.inpaint
inpainted = cv2.inpaint(img_np, mask, inpaintRadius=3, flags=cv2.INPAINT_TELEA)

# Save result
Image.fromarray(inpainted).save('scratch/inpainted_deadmines.png')
print("Saved inpainted_deadmines.png")
