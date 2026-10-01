import cv2
import numpy as np
from PIL import Image

# Load original user screenshot 1
im_bgr = cv2.imread(r'C:\Users\marco\.gemini\antigravity-ide\brain\ccb6473a-aaa8-4aec-977b-885f743cf81a\.user_uploaded\media_1790808834188.png')
h, w, _ = im_bgr.shape
print(f"Original image size: {w}x{h}")

clean_map = im_bgr.copy()

# All number / letter locations to clean:
# (name, center_x, center_y, box_radius)
targets = [
    ("Entrance_A", 268, 322, 14),
    ("1_north", 268, 108, 12),
    ("1_mid_left", 223, 200, 12),
    ("1_bottom_right", 311, 239, 12),
    ("1_west", 147, 182, 12),
    ("6_west", 124, 195, 12),
    ("2_northeast", 391, 139, 12),
    ("3_east_circle", 452, 208, 14),
    ("4_southeast", 508, 240, 12),
    ("5_west_circle", 86, 128, 14),
]

for name, cx, cy, r in targets:
    x1, y1 = max(0, cx - r), max(0, cy - r)
    x2, y2 = min(w, cx + r), min(h, cy + r)
    
    patch = clean_map[y1:y2, x1:x2].copy()
    hsv = cv2.cvtColor(patch, cv2.COLOR_BGR2HSV)
    h_ch, s_ch, v_ch = cv2.split(hsv)
    
    # White digits: high V, low S
    # Blue letter 'A': H 100-135, S > 80, V > 80
    is_white = (v_ch > 140) & (s_ch < 60)
    is_blue = (h_ch >= 95) & (h_ch <= 140) & (s_ch > 70) & (v_ch > 70)
    # Dark drop shadow around white text
    is_shadow = (v_ch < 50)
    
    # Core text mask
    core = is_white | is_blue
    # Dilate core slightly to include the black shadow borders
    kernel_core = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    dilated_core = cv2.dilate(core.astype(np.uint8) * 255, kernel_core, iterations=1)
    
    # Final mask: inside dilated envelope, either text or shadow
    mask = (dilated_core > 0) & (is_white | is_blue | is_shadow)
    
    # Smooth mask
    kernel_small = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    mask = cv2.dilate(mask.astype(np.uint8) * 255, kernel_small, iterations=1)
    
    # Inpaint using TELEA
    inpainted = cv2.inpaint(patch, mask, 3, cv2.INPAINT_TELEA).astype(float)
    
    # Subtle stone texture noise
    np.random.seed(42 + cx + cy)
    noise = np.random.normal(0, 1.5, size=patch.shape)
    inpainted[mask > 0] += noise[mask > 0]
    inpainted = np.clip(inpainted, 0, 255).astype(np.uint8)
    
    clean_map[y1:y2, x1:x2] = inpainted
    
    # Save before/after crop for verification
    cv2.imwrite(f"scratch/clean_check_{name}_before.png", patch)
    cv2.imwrite(f"scratch/clean_check_{name}_after.png", inpainted)

cv2.imwrite("scratch/stockade_cleaned_preview.png", clean_map)
print("Cleaned all target areas and saved scratch/stockade_cleaned_preview.png")
