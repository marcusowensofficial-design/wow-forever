from PIL import Image
import numpy as np

im = Image.open('scratch/user_atlas_deadmines.png')
w, h = im.size
arr = np.array(im)

# Let's inspect along rows and columns:
# In the screenshot, there is the map frame with a dark background,
# and maybe outside the map frame is wood/dialog border.
# Let's sample along edges:
print("Left col mean:", arr[:, 0, :3].mean(axis=0))
print("Right col mean:", arr[:, -1, :3].mean(axis=0))
print("Top row mean:", arr[0, :, :3].mean(axis=0))
print("Bottom row mean:", arr[-1, :, :3].mean(axis=0))

# Let's find rows from bottom where the wooden brown gradient starts:
# Wood has warm brownish tones (R >> B, e.g. R=60..100, G=30..60, B=10..30)
# Dark map background has near-black tones (R < 15, G < 15, B < 15)
for y in range(h - 1, h - 200, -10):
    print(f"y={y}: row center rgb={arr[y, w//2, :3]}")
