from PIL import Image, ImageDraw
import numpy as np

# Let's inspect The Stockade map: Media/Maps/TheStockade_Map.tga
im = Image.open('Media/Maps/TheStockade_Map.tga')
w, h = im.size
draw = ImageDraw.Draw(im)

# Let's draw grid lines on The Stockade map
for pct in range(5, 100, 5):
    x = int(pct / 100 * w)
    y = int(pct / 100 * h)
    draw.line([(x, 0), (x, h)], fill=(80, 80, 80), width=1)
    draw.line([(0, y), (w, y)], fill=(80, 80, 80), width=1)
    draw.text((x + 2, 2), f"{pct}%", fill=(255, 255, 0))
    draw.text((2, y + 2), f"{pct}%", fill=(255, 255, 0))

# Current bosses in The Stockade:
# Targorr the Dread: (0.490, 0.370)
# Kam Deepfury: (0.615, 0.470)
# Hamhock: (0.635, 0.670)
# Bazil Thredd: (0.370, 0.670)
# Dextren Ward: (0.375, 0.480)
# Bruegal Ironknuckle: (0.540, 0.520)

stock_bosses = [
    ("Targorr the Dread", 0.490, 0.370),
    ("Kam Deepfury", 0.615, 0.470),
    ("Hamhock", 0.635, 0.670),
    ("Bazil Thredd", 0.370, 0.670),
    ("Dextren Ward", 0.375, 0.480),
    ("Bruegal Ironknuckle", 0.540, 0.520),
]

for name, x, y in stock_bosses:
    px, py = int(x * w), int(y * h)
    draw.ellipse((px-8, py-8, px+8, py+8), fill=(255, 0, 0), outline=(255, 255, 0), width=2)
    draw.text((px+10, py-5), name, fill=(255, 255, 255))

im.save('scratch/stockade_grid_pins.png')
print("Saved stockade_grid_pins.png")
