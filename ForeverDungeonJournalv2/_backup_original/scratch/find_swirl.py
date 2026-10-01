from PIL import Image
import numpy as np

img = Image.open('Media/Maps/RuinsOfLordaeron_Map.tga').convert('RGB')
w, h = img.size

# In the swirl area around x=660..680, y=210..230
# Let's inspect the pixels in TGA
# The swirl is brownish/gold with a bright center
box = img.crop((650, 195, 690, 240))
box.save('scratch/swirl_exact.png')

# Let's find the brightest pixel or center of swirl
arr = np.array(img)
region = arr[200:235, 655:685]
# Swirl has higher brightness
brightness = region[:, :, 0].astype(int) + region[:, :, 1].astype(int) + region[:, :, 2].astype(int)
max_y, max_x = np.unravel_index(np.argmax(brightness), brightness.shape)
center_y = 200 + max_y
center_x = 655 + max_x

print(f"Swirl center pixel in TGA: ({center_x}, {center_y})")
print(f"Normalized: x = {center_x / w:.4f}, y = {center_y / h:.4f}")
