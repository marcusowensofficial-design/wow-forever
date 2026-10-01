from PIL import Image
import numpy as np

im = Image.open('scratch/user_atlas_deadmines.png')
w, h = im.size
arr = np.array(im)

# Let's inspect the screenshot:
# In the screenshot, the map is rendered on a black/dark background.
# The user took a screenshot or cropped the AtlasLoot window.
# Notice on the left edge, there is a gray vertical line or pixels around [49, 49, 49].
# Notice at the bottom, there is wood texture starting below the map.
# Let's find where the wood texture begins:
for y in range(h - 1, 200, -1):
    # Wood texture has significant red/green and low blue: e.g. R > 30 and R > B * 1.5
    row = arr[y, :, :3]
    wood_pixels = (row[:, 0] > 30) & (row[:, 0] > row[:, 2] * 1.5)
    # in the dark map area, background is almost pure black (sum < 30) except where the dungeon is.
    print(f"y={y}: wood_pct={wood_pixels.mean():.2f}, mean_rgb={row.mean(axis=0).astype(int)}")
    if y % 20 == 0:
        pass
