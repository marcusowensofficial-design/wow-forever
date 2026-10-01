from PIL import Image, ImageDraw

im = Image.open('scratch_sfk.jpg')
w, h = im.size
draw = ImageDraw.Draw(im)

sfk_bosses = [
    ("Rethilgore", 0.480, 0.690),
    ("Razorclaw", 0.425, 0.630),
    ("Silverlaine", 0.550, 0.575),
    ("Springvale", 0.585, 0.465),
    ("Odo", 0.410, 0.490),
    ("Fenrus", 0.470, 0.410),
    ("Nandos", 0.525, 0.360),
    ("Arugal", 0.490, 0.220),
]

for name, nx, ny in sfk_bosses:
    px, py = int(nx * w), int(ny * h)
    draw.ellipse((px-8, py-8, px+8, py+8), fill=(255, 0, 0), outline=(255, 255, 0))
    draw.text((px+10, py-5), name, fill=(255, 255, 255))

im.save('scratch_sfk_boss_check.jpg')
print("Saved scratch_sfk_boss_check.jpg")
