from PIL import Image, ImageDraw

im = Image.open('Media/Maps/RuinsOfLordaeron_Map.tga')
w, h = im.size
crop = im.crop((int(0.40 * w), int(0.70 * h), int(0.60 * w), int(0.95 * h)))
cw, ch = crop.size
draw = ImageDraw.Draw(crop)

x0 = int(0.40 * w)
y0 = int(0.70 * h)

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

crop.save('scratch/rol_south_gate_grid.png')
print("Saved rol_south_gate_grid.png")
