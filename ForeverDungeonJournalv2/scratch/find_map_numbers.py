import cv2
import numpy as np

im = cv2.imread(r'C:\Users\marco\.gemini\antigravity-ide\brain\ccb6473a-aaa8-4aec-977b-885f743cf81a\.user_uploaded\media_1790808834188.png')
h, w, _ = im.shape

# 1. Detect blue 'A' (Entrance)
# In BGR, blue 'A' has high blue, lower red/green
hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)
# Blue range in HSV: H around 100-130, S > 100, V > 100
blue_mask = (hsv[:, :, 0] >= 100) & (hsv[:, :, 0] <= 135) & (hsv[:, :, 1] >= 80) & (hsv[:, :, 2] >= 80)
blue_mask = blue_mask.astype(np.uint8) * 255
contours, _ = cv2.findContours(blue_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
print("Blue contours found:", len(contours))
for c in contours:
    x, y, bw, bh = cv2.boundingRect(c)
    if bw >= 5 and bh >= 5:
        print(f"Blue 'A' candidate at: x={x+bw/2:.1f}, y={y+bh/2:.1f}, w={bw}, h={bh} -> norm: ({ (x+bw/2)/w:.4f}, {(y+bh/2)/h:.4f} )")

# 2. Detect white digits (1, 2, 3, 4, 5, 6)
# White digits: high V, low S (e.g. V > 180, S < 40)
white_mask = (hsv[:, :, 2] >= 180) & (hsv[:, :, 1] <= 45)
white_mask = white_mask.astype(np.uint8) * 255

# Clean noise with morphological open/close
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
white_clean = cv2.morphologyEx(white_mask, cv2.MORPH_OPEN, kernel)

num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(white_clean)
print(f"\nWhite connected components found: {num_labels}")
for i in range(1, num_labels):
    x, y, cw, ch, area = stats[i]
    cx, cy = centroids[i]
    # Numbers in atlas are around 8-20 pixels wide/tall, area 20-300
    if 4 <= cw <= 25 and 8 <= ch <= 30 and 15 <= area <= 400:
        print(f"Digit candidate #{i}: at center=({cx:.1f}, {cy:.1f}), bbox=[x={x}, y={y}, w={cw}, h={ch}, area={area}] -> norm: ({cx/w:.4f}, {cy/h:.4f})")
        # Save a crop of this digit
        crop = im[max(0, y-4):min(h, y+ch+4), max(0, x-4):min(w, x+cw+4)]
        cv2.imwrite(f"scratch/digit_{i}_{int(cx)}_{int(cy)}.png", crop)
