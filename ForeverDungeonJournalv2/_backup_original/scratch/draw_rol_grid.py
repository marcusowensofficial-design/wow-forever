from PIL import Image, ImageDraw
import numpy as np

im = Image.open('Media/Maps/RuinsOfLordaeron_Map.tga')
w, h = im.size
draw = ImageDraw.Draw(im)

# Draw grid lines on Ruins of Lordaeron map
for pct in range(5, 100, 5):
    x = int(pct / 100 * w)
    y = int(pct / 100 * h)
    draw.line([(x, 0), (x, h)], fill=(80, 80, 80), width=1)
    draw.line([(0, y), (w, y)], fill=(80, 80, 80), width=1)
    draw.text((x + 2, 2), f"{pct}%", fill=(255, 255, 0))
    draw.text((2, y + 2), f"{pct}%", fill=(255, 255, 0))

# Current bosses & landmarks
rol_bosses = [
    ("Bjork", 0.389, 0.277),
    ("The Abandoned", 0.403, 0.531),
    ("Viktor the Vile", 0.377, 0.654),
    ("Rath'mael", 0.469, 0.569),
    ("Edward Heartweaver", 0.498, 0.577),
    ("The Baron", 0.633, 0.716),
    ("Witherfang", 0.760, 0.392),
]
for name, x, y in rol_bosses:
    px, py = int(x * w), int(y * h)
    draw.ellipse((px-8, py-8, px+8, py+8), fill=(255, 0, 0), outline=(255, 255, 0), width=2)
    draw.text((px+10, py-5), name, fill=(255, 255, 255))

im.save('scratch/rol_grid_pins.png')
print("Saved rol_grid_pins.png")
