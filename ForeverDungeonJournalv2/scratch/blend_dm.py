from PIL import Image
import numpy as np

im1 = Image.open('scratch/scratch_dm_1.jpg')
im2 = Image.open('scratch/scratch_dm_2.jpg')

arr1 = np.array(im1, dtype=float)
arr2 = np.array(im2, dtype=float)

# Let's inspect the parchment background color:
bg = np.array([130.0, 90.0, 30.0])

# In Blizzard maps, the inactive floor is washed out / blended towards the background parchment color!
# The active floor has higher deviation from background parchment color!
dist1 = np.linalg.norm(arr1 - bg, axis=2)
dist2 = np.linalg.norm(arr2 - bg, axis=2)

# Create a blended map where for each pixel, we choose the one with higher deviation (more active detail),
# with a smooth blend transition!
alpha = np.clip((dist2 - dist1) / 30.0 + 0.5, 0.0, 1.0)
alpha_3d = np.repeat(alpha[:, :, np.newaxis], 3, axis=2)

combined = (1.0 - alpha_3d) * arr1 + alpha_3d * arr2
combined_img = Image.fromarray(combined.astype(np.uint8))
combined_img.save('scratch/dm_combined.jpg')
print("Saved dm_combined.jpg")
