from PIL import Image, ImageDraw
import numpy as np

# Let's inspect Entrance_candidates: box was (0.20*w, 0.20*h) to (0.40*w, 0.50*h)
im = Image.open('scratch/scratch_dm_1.jpg')
w, h = im.size
x0, y0 = int(0.20 * w), int(0.20 * h)
crop = im.crop((x0, y0, int(0.40 * w), int(0.55 * h)))
cw, ch = crop.size

# Draw a 10px grid on the crop so we can find the exact entrance pixel
crop_grid = crop.copy()
draw = ImageDraw.Draw(crop_grid)
for px in range(0, cw, 20):
    norm_x = (x0 + px) / w
    draw.line([(px, 0), (px, ch)], fill=(120, 120, 120))
    if px % 40 == 0:
        draw.text((px + 2, 2), f"{norm_x:.3f}", fill=(255, 255, 0))

for py in range(0, ch, 20):
    norm_y = (y0 + py) / h
    draw.line([(0, py), (cw, py)], fill=(120, 120, 120))
    if py % 40 == 0:
        draw.text((2, py + 2), f"{norm_y:.3f}", fill=(255, 255, 0))

crop_grid.save('scratch/entrance_grid.png')
print("Saved entrance_grid.png")
