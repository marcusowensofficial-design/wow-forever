from PIL import Image, ImageDraw, ImageFont
import numpy as np

# Load the current Deadmines map and draw grid coordinates on it
im = Image.open('Media/Maps/TheDeadmines_Map.tga')
w, h = im.size
draw = ImageDraw.Draw(im)

# Draw 10% grid lines with labels
for i in range(1, 10):
    x = int(i * 0.10 * w)
    y = int(i * 0.10 * h)
    draw.line([(x, 0), (x, h)], fill=(100, 100, 100), width=1)
    draw.line([(0, y), (w, y)], fill=(100, 100, 100), width=1)
    draw.text((x + 2, 5), f"{i*10}%", fill=(255, 255, 255))
    draw.text((5, y + 2), f"{i*10}%", fill=(255, 255, 255))

# Current boss positions in DungeonMaps.lua:
# Rhahk'Zor: (0.535, 0.565)
# Miner Johnson: (0.450, 0.490)
# Sneed: (0.580, 0.485)
# Gilnid: (0.505, 0.360)
# Mr. Smite: (0.395, 0.220)
# Cookie: (0.380, 0.145)
# Captain Greenskin: (0.360, 0.170)
# Edwin VanCleef: (0.340, 0.125)
# Defias Gunpowder: (0.470, 0.280)

current_bosses = [
    ("Rhahk'Zor", 0.535, 0.565),
    ("Miner Johnson", 0.450, 0.490),
    ("Sneed", 0.580, 0.485),
    ("Gilnid", 0.505, 0.360),
    ("Defias Gunpowder", 0.470, 0.280),
    ("Mr. Smite", 0.395, 0.220),
    ("Cookie", 0.380, 0.145),
    ("Captain Greenskin", 0.360, 0.170),
    ("Edwin VanCleef", 0.340, 0.125),
]

for name, x, y in current_bosses:
    px, py = int(x * w), int(y * h)
    draw.ellipse((px-8, py-8, px+8, py+8), fill=(255, 0, 0), outline=(255, 255, 0), width=2)
    draw.text((px + 10, py - 6), name, fill=(255, 255, 0))

im.save('scratch/deadmines_grid_pins.png')
print('Saved deadmines_grid_pins.png')
