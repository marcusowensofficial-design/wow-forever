from PIL import Image
import numpy as np

im1 = Image.open('scratch/scratch_dm_1.jpg')
im2 = Image.open('scratch/scratch_dm_2.jpg')

# Let's inspect the cove / pirate ship area (x: 0.50 to 0.75, y: 0.20 to 0.60) on BOTH im1 and im2!
w, h = im1.size
cove_box = (int(0.48 * w), int(0.20 * h), int(0.75 * w), int(0.55 * h))

cove1 = im1.crop(cove_box)
cove1.save('scratch/cove_im1.png')

cove2 = im2.crop(cove_box)
cove2.save('scratch/cove_im2.png')

# Also inspect the upper mine area (x: 0.15 to 0.55, y: 0.40 to 0.95) on BOTH im1 and im2!
mine_box = (int(0.15 * w), int(0.40 * h), int(0.55 * w), int(0.95 * h))
mine1 = im1.crop(mine_box)
mine1.save('scratch/mine_im1.png')

mine2 = im2.crop(mine_box)
mine2.save('scratch/mine_im2.png')

print("Saved cove and mine crops for both im1 and im2")
