from PIL import Image
import numpy as np

dm1 = Image.open('scratch/scratch_dm_1.jpg')
w, h = dm1.size
arr = np.array(dm1)

# In Deadmines, does the instance portal have a swirl, or an arch, or where does the tunnel open?
# Let's check along the top-left boundary of the dungeon:
# Let's inspect along y = 200..350, x = 200..350:
# Where does the tunnel start?
for y_pct in range(25, 45, 2):
    row_y = int(y_pct / 100 * h)
    for x_pct in range(20, 38, 2):
        col_x = int(x_pct / 100 * w)
        rgb = arr[row_y, col_x]
        # check if this is floor or wall
        # floor is usually bright (e.g. sum(rgb) > 350)
        # dark wall outline is (sum(rgb) < 180)
        # parchment is ~250
        print(f"x={x_pct:2d}% y={y_pct:2d}%: {rgb} sum={int(sum(rgb))}")
