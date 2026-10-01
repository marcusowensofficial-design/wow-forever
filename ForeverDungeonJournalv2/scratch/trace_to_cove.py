from PIL import Image
import numpy as np

# Trace corridor from Gilnid (0.124, 0.758) to Cove
im = Image.open('scratch/dm_combined.jpg')
arr = np.array(im)
w, h = im.size

# Let's inspect along rows from y=0.75 down to y=0.40
# Where is the corridor located in x?
for y_pct in range(74, 34, -4):
    y = int(y_pct / 100 * h)
    row = arr[y, int(0.10*w):int(0.55*w)]
    diffs = np.linalg.norm(row.astype(float) - [130, 90, 30], axis=1)
    peaks = np.where(diffs > 45)[0]
    if len(peaks) > 0:
        norm_xs = (int(0.10*w) + peaks) / w
        print(f"y={y_pct}%: corridor at x=[{norm_xs.min():.3f}, {norm_xs.max():.3f}] center={norm_xs.mean():.3f}")
