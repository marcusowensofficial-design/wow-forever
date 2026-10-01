from PIL import Image
import numpy as np

im = Image.open('scratch/inpainted_deadmines.png')
arr = np.array(im)
h, w, _ = arr.shape

# Remove the 2-pixel gray line on the left:
clean_arr = arr[:, 2:].copy()
h, w, _ = clean_arr.shape

# Now let's handle the bottom-right wood background:
# Wood is located where:
# x > 270 and y > 260
# In this region, any pixel that is NOT part of the dungeon corridor:
# Dungeon corridor has bluish/greenish stone: Blue > 25, or G > R - 5.
# Wood has warm brownish tones: R > 25, G < R * 0.85, B < 22.
# Let's inspect all pixels in x > 250, y > 250:
for y in range(250, h):
    for x in range(250, w):
        r, g, b = int(clean_arr[y, x, 0]), int(clean_arr[y, x, 1]), int(clean_arr[y, x, 2])
        # Is it wood?
        # Wood condition:
        # If x > 310, anything below the cove (y > 265) is outside the dungeon!
        # If x between 250 and 310, anything below the corridor (y > 430) is outside the dungeon!
        if (x > 310 and y > 265) or (x >= 250 and y > 430):
            # smooth blend to black or set to black [0, 0, 0]
            clean_arr[y, x] = [0, 0, 0]

Image.fromarray(clean_arr).save('scratch/deadmines_no_wood.png')
print("Saved deadmines_no_wood.png")
