from PIL import Image
import numpy as np

im = Image.open('scratch/user_atlas_deadmines.png')
w, h = im.size
arr = np.array(im)[:, :, :3]

# Wood in the screenshot is only in the bottom-right area (x > 250, y > 350)
# Notice in Screenshot 1:
# The dungeon ends around x=310, y=425 (the curved tunnel below the round gear room 4).
# Everything to the right of that at the bottom (x > 270, y > 350) is the empty corner outside the map!
# Let's inspect this region:
corner_box = (250, 320, w, h)
corner_crop = im.crop(corner_box)
corner_crop.save('scratch/corner_wood.png')
print("Saved corner_wood.png")
