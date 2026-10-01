from PIL import Image
import numpy as np

# In the parchment map, the rooms have printed circular icons/skulls:
# Let's inspect where they are in the entire map
im = Image.open('scratch_rfc.jpg').crop((0, 0, 1008, 672))
arr = np.array(im)

# Let's search for the circular skull / spiral icons in the map:
# In the green room (top):
# In the yellow room (center): Taragaman is at yellow room
# In the blue room (bottom-left): Jergosh
# In the pink room (bottom-right):
# Let's find the centers of the colored rooms:
# Green room: where green > red + 10
green_mask = (arr[:, :, 1] > arr[:, :, 0] + 10) & (arr[:, :, 1] > arr[:, :, 2] + 10)
# Blue room: where blue > red + 10
blue_mask = (arr[:, :, 2] > arr[:, :, 0] + 10)
# Pink room: where red > green + 30 and blue > green + 10
pink_mask = (arr[:, :, 0] > arr[:, :, 1] + 30) & (arr[:, :, 2] > arr[:, :, 1] + 10)

def center_of_mass(mask):
    y, x = np.where(mask)
    if len(x) == 0: return None
    return int(np.mean(x)), int(np.mean(y))

print("Green room (Upper troggs/path):", center_of_mass(green_mask))
print("Blue room (Jergosh):", center_of_mass(blue_mask))
print("Pink room (end path):", center_of_mass(pink_mask))
