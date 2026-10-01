from PIL import Image
import numpy as np

im = Image.open('scratch/user_atlas_deadmines.png')
w, h = im.size
print(f"Atlas Deadmines image size: {w}x{h}, mode: {im.mode}")

arr = np.array(im)

# Check background color around edges
print("Top-left pixel:", arr[0, 0])
print("Top-right pixel:", arr[0, -1])
print("Bottom-left pixel:", arr[-1, 0])
print("Bottom-right pixel:", arr[-1, -1])

# Check non-black bounding box
# If alpha channel exists, check both RGB and Alpha
if arr.shape[2] == 4:
    rgb = arr[:, :, :3]
    alpha = arr[:, :, 3]
    mask = (rgb.sum(axis=2) > 15) & (alpha > 50)
else:
    mask = arr.sum(axis=2) > 15

y_indices, x_indices = np.where(mask)
min_x, max_x = x_indices.min(), x_indices.max()
min_y, max_y = y_indices.min(), y_indices.max()

print(f"Non-black content bounding box: x=[{min_x}, {max_x}] (width={max_x - min_x + 1}), y=[{min_y}, {max_y}] (height={max_y - min_y + 1})")
