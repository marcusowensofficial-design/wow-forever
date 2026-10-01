from PIL import Image, ImageDraw

dm1 = Image.open('scratch/scratch_dm_1.jpg')
w, h = dm1.size
draw = ImageDraw.Draw(dm1)

# Draw 5% grid lines
for pct in range(5, 100, 5):
    x = int(pct / 100 * w)
    y = int(pct / 100 * h)
    draw.line([(x, 0), (x, h)], fill=(80, 80, 80), width=1)
    draw.line([(0, y), (w, y)], fill=(80, 80, 80), width=1)
    draw.text((x + 2, 2), f"{pct}%", fill=(255, 255, 0))
    draw.text((2, y + 2), f"{pct}%", fill=(255, 255, 0))

dm1.save('scratch/dm1_fine_grid.jpg')

dm2 = Image.open('scratch/scratch_dm_2.jpg')
draw2 = ImageDraw.Draw(dm2)
for pct in range(5, 100, 5):
    x = int(pct / 100 * w)
    y = int(pct / 100 * h)
    draw2.line([(x, 0), (x, h)], fill=(80, 80, 80), width=1)
    draw2.line([(0, y), (w, y)], fill=(80, 80, 80), width=1)
    draw2.text((x + 2, 2), f"{pct}%", fill=(255, 255, 0))
    draw2.text((2, y + 2), f"{pct}%", fill=(255, 255, 0))

dm2.save('scratch/dm2_fine_grid.jpg')
print("Saved dm1_fine_grid.jpg and dm2_fine_grid.jpg")
