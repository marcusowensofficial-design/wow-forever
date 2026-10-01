from PIL import Image, ImageDraw
import numpy as np

im = Image.open('scratch/dm_combined.jpg')
w, h = im.size

# Let's inspect crop_tunnel_to_cove:
# The crop was x=[0.20*w, 0.52*w], y=[0.40*h, 0.70*h]
# Let's draw grid lines on it
crop_door = im.crop((int(0.20*w), int(0.35*h), int(0.55*w), int(0.70*h)))
cw, ch = crop_door.size
draw = ImageDraw.Draw(crop_door)
x0, y0 = int(0.20*w), int(0.35*h)

for px in range(0, cw, 20):
    nx = (x0 + px) / w
    draw.line([(px, 0), (px, ch)], fill=(100, 100, 100))
    if px % 40 == 0:
        draw.text((px + 2, 2), f"{nx:.3f}", fill=(255, 255, 0))

for py in range(0, ch, 20):
    ny = (y0 + py) / h
    draw.line([(0, py), (cw, py)], fill=(100, 100, 100))
    if py % 40 == 0:
        draw.text((2, py + 2), f"{ny:.3f}", fill=(255, 255, 0))

crop_door.save('scratch/door_grid.png')

# Same for crop_mid_rhahk_sneed:
crop_mid = im.crop((int(0.30*w), int(0.58*h), int(0.55*w), int(0.92*h)))
cw, ch = crop_mid.size
draw = ImageDraw.Draw(crop_mid)
x0, y0 = int(0.30*w), int(0.58*h)

for px in range(0, cw, 20):
    nx = (x0 + px) / w
    draw.line([(px, 0), (px, ch)], fill=(100, 100, 100))
    if px % 40 == 0:
        draw.text((px + 2, 2), f"{nx:.3f}", fill=(255, 255, 0))

for py in range(0, ch, 20):
    ny = (y0 + py) / h
    draw.line([(0, py), (cw, py)], fill=(100, 100, 100))
    if py % 40 == 0:
        draw.text((2, py + 2), f"{ny:.3f}", fill=(255, 255, 0))

crop_mid.save('scratch/mid_grid.png')

# Same for cove:
crop_cove = im.crop((int(0.48*w), int(0.22*h), int(0.72*w), int(0.55*h)))
cw, ch = crop_cove.size
draw = ImageDraw.Draw(crop_cove)
x0, y0 = int(0.48*w), int(0.22*h)

for px in range(0, cw, 20):
    nx = (x0 + px) / w
    draw.line([(px, 0), (px, ch)], fill=(100, 100, 100))
    if px % 40 == 0:
        draw.text((px + 2, 2), f"{nx:.3f}", fill=(255, 255, 0))

for py in range(0, ch, 20):
    ny = (y0 + py) / h
    draw.line([(0, py), (cw, py)], fill=(100, 100, 100))
    if py % 40 == 0:
        draw.text((2, py + 2), f"{ny:.3f}", fill=(255, 255, 0))

crop_cove.save('scratch/cove_grid.png')

print("Saved all grids")
