from PIL import Image, ImageDraw
import numpy as np

im = Image.open('scratch/TheDeadmines_Atlas_Clean.png')
w, h = im.size

# Let's crop the Cove area:
# Cove in original was x~320..520, y~130..250 (out of 540)
# On 1024x1024, norm_x is ~0.60 to 0.98, norm_y is ~0.25 to 0.55
cove_crop = im.crop((int(0.60 * w), int(0.24 * h), int(0.98 * w), int(0.55 * h)))
cove_crop.save('scratch/atlas_cove_crop.png')

# Draw fine grid on cove_crop
cw, ch = cove_crop.size
draw = ImageDraw.Draw(cove_crop)
x0 = int(0.60 * w)
y0 = int(0.24 * h)

for px in range(0, cw, 20):
    nx = (x0 + px) / w
    draw.line([(px, 0), (px, ch)], fill=(80, 80, 80))
    if px % 40 == 0:
        draw.text((px + 2, 2), f"{nx:.3f}", fill=(255, 255, 0))

for py in range(0, ch, 20):
    ny = (y0 + py) / h
    draw.line([(0, py), (cw, py)], fill=(80, 80, 80))
    if py % 40 == 0:
        draw.text((2, py + 2), f"{ny:.3f}", fill=(255, 255, 0))

cove_crop.save('scratch/atlas_cove_grid.png')
print("Saved atlas_cove_crop.png and atlas_cove_grid.png")
