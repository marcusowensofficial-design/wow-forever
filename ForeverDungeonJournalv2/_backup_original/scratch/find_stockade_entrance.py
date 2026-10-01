from PIL import Image
import numpy as np

im = Image.open('Media/Maps/TheStockade_Map.tga')
w, h = im.size
arr = np.array(im)

# Let's inspect along x=0.50 from y=0.50 to y=0.90
# Where does the south corridor end?
# Let's check pixel brightness and colors
for y_pct in range(55, 90, 2):
    y = int(y_pct / 100 * h)
    # Check width of corridor across x=0.40 to 0.60
    row = arr[y, int(0.40*w):int(0.60*w)]
    # parchment background is around [36, 27, 18] or [130, 95, 45]
    diffs = np.linalg.norm(row.astype(float) - [130, 95, 45], axis=1)
    # Corridor pixels are distinct
    print(f"y={y_pct:2d}% ({y}): center_col_rgb={arr[y, int(0.505*w)]} row_mean={row.mean():.1f}")
