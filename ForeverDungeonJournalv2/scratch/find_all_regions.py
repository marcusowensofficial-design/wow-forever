import cv2
import numpy as np
from PIL import Image

im = Image.open(r'C:\Users\marco\.gemini\antigravity-ide\brain\ccb6473a-aaa8-4aec-977b-885f743cf81a\.user_uploaded\media_1790808834188.png').convert('RGB')
arr = np.array(im)
h, w, _ = arr.shape

# Let's inspect known rooms from grid:
# Room 5: Left circular room (around x=80, y=130)
# Room 3: Right circular room (around x=450, y=210)
# Room 4: Room attached to southeast of 3 (around x=510, y=250)
# Room 2: Room in northeast corridor (around x=390, y=140)
# Room 1 top: North dead-end room (around x=268, y=110)
# Room 1 mid-left: (around x=215, y=200)
# Room 1 bottom-right: (around x=310, y=240)
# Room 6 & 1: West corridor south cells (around x=140, y=200)

regions = {
    "A_entrance": (250, 305, 285, 340),
    "1_north": (250, 90, 285, 130),
    "1_mid_left": (200, 185, 235, 220),
    "1_bottom_right": (295, 225, 330, 260),
    "1_and_6_west": (115, 175, 160, 225),
    "2_northeast": (375, 120, 410, 155),
    "3_east_circle": (430, 190, 475, 235),
    "4_southeast": (490, 235, 530, 275),
    "5_west_circle": (65, 105, 110, 150),
}

for name, (x1, y1, x2, y2) in regions.items():
    crop = arr[y1:y2, x1:x2]
    # Find bright pixels in crop (brightness > 130 and outline < 60)
    gray = cv2.cvtColor(crop, cv2.COLOR_RGB2GRAY)
    # in each crop, let's find the brightest 10x10 patch or centroid
    # Let's save the crop
    Image.fromarray(crop).save(f"scratch/crop_{name}.png")
    
    # Let's find local max in gray
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(gray)
    px = x1 + max_loc[0]
    py = y1 + max_loc[1]
    print(f"Region {name:<16}: max_val={max_val} at pixel ({px}, {py}) -> norm: ({px/w:.4f}, {py/h:.4f})")
