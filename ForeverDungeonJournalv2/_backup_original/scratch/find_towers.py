import os
from PIL import Image
import numpy as np
from scipy.ndimage import label, center_of_mass

uploaded_dir = r"C:\Users\marco\.gemini\antigravity-ide\brain\bdaed8ea-236c-4f36-aa5c-89ff8320d168\.user_uploaded"
img4 = Image.open(os.path.join(uploaded_dir, "media_1790787879752.png")).convert("RGB")
arr4 = np.array(img4)

# White text has RGB > (220, 220, 220) with black shadow around it.
white_text = (arr4[:, :, 0] > 220) & (arr4[:, :, 1] > 220) & (arr4[:, :, 2] > 220)

# Check each bounding box and get center of white text:
boxes = {
    "Mausoleum": (125, 160, 200, 310),
    "Tower 3": (145, 175, 280, 360),
    "Tower 2": (260, 290, 220, 310),
    "Crypt": (305, 335, 360, 440),
    "Tower 1": (260, 290, 440, 530),
}

for name, (y1, y2, x1, x2) in boxes.items():
    sub = white_text[y1:y2, x1:x2]
    cy, cx = center_of_mass(sub)
    text_x = x1 + cx
    text_y = y1 + cy
    # Shield is centered directly above text, roughly 18-20 pixels up
    shield_x = text_x
    shield_y = text_y - 20
    # In img3 space (offset_x = 44):
    img3_x = shield_x - 44
    img3_y = shield_y
    print(f"{name}: img4=({shield_x:.1f}, {shield_y:.1f}), in img3 space=({img3_x:.1f}, {img3_y:.1f}), norm_img3=({img3_x/614:.4f}, {img3_y/490:.4f})")
