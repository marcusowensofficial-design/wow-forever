from PIL import Image
import numpy as np

# Let's inspect each tile to identify where the dungeon features are
# Specifically:
# Where is the dungeon entrance?
# In Deadmines:
# Where is the start of the instance?
# Let's find the entrance tunnel opening!

im = Image.open('Media/Maps/TheDeadmines_Map.tga')
w, h = im.size
arr = np.array(im)

# Let's check the bottom-right and bottom-center:
# Does the tunnel start at bottom right?
# In Classic Deadmines:
# Entrance portal is at (x, y)?
# Let's scan along borders and find where tunnels hit dead-ends or portal markers
print("Tile analysis:")
for r in range(4):
    for c in range(4):
        x1, y1 = int(c * 0.25 * w), int(r * 0.25 * h)
        x2, y2 = int((c + 1) * 0.25 * w), int((r + 1) * 0.25 * h)
        tile = arr[y1:y2, x1:x2]
        # check how much non-parchment content is in this tile
        # parchment has R around 120-160, G around 80-120, B around 20-50
        diff_from_bg = np.linalg.norm(tile.astype(float) - [130, 90, 30], axis=2)
        non_bg_pct = (diff_from_bg > 35).mean() * 100
        print(f"Tile ({r},{c}) [y:{r*25}%-{(r+1)*25}%, x:{c*25}%-{(c+1)*25}%]: non-bg={non_bg_pct:.1f}%")
