from PIL import Image
import numpy as np

# Let's inspect the shapes and room centers in mid_grid, door_grid, and cove_grid
# 1. Miner Johnson:
# In mid_grid (x: 0.30 to 0.55, y: 0.58 to 0.92):
# Rhahk'Zor is at (0.365, 0.612).
# Sneed is at (0.501, 0.868).
# Where is the side alcove / branch?
im = Image.open('scratch/dm_combined.jpg')
arr = np.array(im)
w, h = im.size

# Let's find side branches between Rhahk'Zor (0.365, 0.612) and Sneed (0.501, 0.868):
# In Deadmines, after Rhahk'Zor, you go down the tunnel. To the left is Miner Johnson's tunnel!
# Let's scan for hallway branches:
print("Scanning for Miner Johnson side tunnel...")
for y_pct in range(65, 85, 2):
    y = int(y_pct / 100 * h)
    row = arr[y, int(0.30*w):int(0.55*w)]
    diffs = np.linalg.norm(row.astype(float) - [130, 90, 30], axis=1)
    # find peaks
    peaks = np.where(diffs > 40)[0]
    if len(peaks) > 0:
        norm_xs = (int(0.30*w) + peaks) / w
        print(f"y={y_pct}%: x_range=[{norm_xs.min():.3f}, {norm_xs.max():.3f}] width={len(peaks)}")
