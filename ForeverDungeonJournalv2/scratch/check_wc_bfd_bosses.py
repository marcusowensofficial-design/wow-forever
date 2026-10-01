from PIL import Image, ImageDraw

# Wailing Caverns
im_wc = Image.open('scratch_wc.jpg')
w, h = im_wc.size
draw = ImageDraw.Draw(im_wc)
wc_bosses = [
    ("Entrance", 0.680, 0.940),
    ("Lady Anacondra", 0.540, 0.770),
    ("Lord Cobrahn", 0.355, 0.170),
    ("Kresh", 0.415, 0.610),
    ("Lord Pythas", 0.485, 0.355),
    ("Skum", 0.615, 0.420),
    ("Lord Serpentis", 0.605, 0.550),
    ("Verdan the Everliving", 0.600, 0.590),
    ("Mutanus the Devourer", 0.675, 0.870),
]
for name, nx, ny in wc_bosses:
    px, py = int(nx * w), int(ny * h)
    draw.ellipse((px-8, py-8, px+8, py+8), fill=(255, 0, 0), outline=(255, 255, 0))
    draw.text((px+10, py-5), name, fill=(255, 255, 255))
im_wc.save('scratch_wc_boss_check.jpg')
print("Saved scratch_wc_boss_check.jpg")

# Blackfathom Deeps
im_bfd = Image.open('scratch_bfd.jpg')
w, h = im_bfd.size
draw = ImageDraw.Draw(im_bfd)
bfd_bosses = [
    ("Ghamoo-ra", 0.480, 0.745),
    ("Lady Sarevess", 0.420, 0.625),
    ("Gelihast", 0.385, 0.490),
    ("Lorgus Jett", 0.460, 0.440),
    ("Baron Aquanis", 0.565, 0.435),
    ("Twilight Lord Kelris", 0.610, 0.270),
    ("Old Serra'kis", 0.635, 0.180),
    ("Aku'mai", 0.685, 0.120),
]
for name, nx, ny in bfd_bosses:
    px, py = int(nx * w), int(ny * h)
    draw.ellipse((px-8, py-8, px+8, py+8), fill=(255, 0, 0), outline=(255, 255, 0))
    draw.text((px+10, py-5), name, fill=(255, 255, 255))
im_bfd.save('scratch_bfd_boss_check.jpg')
print("Saved scratch_bfd_boss_check.jpg")
