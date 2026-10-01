from PIL import Image
import numpy as np

# Let's inspect where the entrance of Deadmines is on TheDeadmines_Map.tga
# Where is the dungeon entrance portal?
# Let's check the endpoints of the dungeon paths.
# A dungeon is a path with an entrance and an exit.
# In Deadmines:
# Start: Entrance tunnel from Moonbrook
# End: Exit tunnel behind the pirate ship leading to Westfall coast

im = Image.open('Media/Maps/TheDeadmines_Map.tga')
w, h = im.size

# Let's inspect several sample points across the image to locate the main features
# Let's search the image for the dungeon entrance arch or opening
# In WoW dungeon maps, where is the entrance portal icon or entrance hallway?
# Let's write a script that analyzes the layout by dividing the map into 16 zones (4x4)
for row in range(4):
    for col in range(4):
        x1, y1 = int(col * 0.25 * w), int(row * 0.25 * h)
        x2, y2 = int((col + 1) * 0.25 * w), int((row + 1) * 0.25 * h)
        crop = im.crop((x1, y1, x2, y2))
        crop.save(f'scratch/dm_tile_{row}_{col}.png')

print("Saved 4x4 tiles of Deadmines map")
