from PIL import Image
import numpy as np

im = Image.open('scratch/scratch_dm_1.jpg')
w, h = im.size
arr = np.array(im)

# In Deadmines, let's trace from Rhahk'Zor at x=0.365 (px=368), y=0.612 (py=412) back up to the entrance.
# Let's inspect the corridor center moving north from Rhahk'Zor:
# y goes from 412 upwards towards ~200
# Let's trace the corridor:
current_x = 368
for py in range(412, 180, -10):
    # in row py, find the corridor center near current_x
    # corridor floor has distinct RGB
    row = arr[py, max(0, current_x - 50):min(w, current_x + 50)]
    # parchment has [130, 90, 30]. Corridor is lighter or has borders.
    diffs = np.linalg.norm(row.astype(float) - [130, 90, 30], axis=1)
    if diffs.max() > 25:
        offset = np.argmax(diffs) - 50
        current_x += int(offset * 0.3)
        print(f"y={py} (norm_y={py/h:.3f}): center_x={current_x} (norm_x={current_x/w:.3f})")
    else:
        print(f"y={py} (norm_y={py/h:.3f}): reached end of corridor at x={current_x} (norm_x={current_x/w:.3f})")
        break
