from PIL import Image
import numpy as np

# In WoW parchment maps:
# The background parchment is a yellowish tan color (R~190-210, G~160-180, B~110-130).
# The dungeon rooms/corridors are either lighter/colored/drawn pathways, or specific room features.
# Let's inspect the RGB and local neighborhood of each boss coordinate on each map:

checks = {
    "Ragefire Chasm": ("scratch_rfc.jpg", (0,0,1008,672), [
        ("Oggleflint (Green Cavern)", 0.520, 0.185),
        ("Taragaman (Lava Ring)", 0.390, 0.470),
        ("Jergosh (Blue Cavern)", 0.330, 0.665),
        ("Bazzalan (End Cavern)", 0.640, 0.535),
    ]),
    "Shadowfang Keep": ("scratch_sfk.jpg", None, [
        ("Rethilgore", 0.480, 0.690),
        ("Razorclaw", 0.425, 0.630),
        ("Silverlaine", 0.550, 0.575),
        ("Springvale", 0.585, 0.465),
        ("Odo", 0.410, 0.490),
        ("Fenrus", 0.470, 0.410),
        ("Nandos", 0.525, 0.360),
        ("Arugal", 0.490, 0.220),
    ]),
    "Wailing Caverns": ("scratch_wc.jpg", None, [
        ("Entrance", 0.680, 0.940),
        ("Lady Anacondra", 0.540, 0.770),
        ("Lord Cobrahn", 0.355, 0.170),
        ("Kresh", 0.415, 0.610),
        ("Lord Pythas", 0.485, 0.355),
        ("Skum", 0.615, 0.420),
        ("Lord Serpentis", 0.605, 0.550),
        ("Verdan the Everliving", 0.600, 0.590),
        ("Mutanus the Devourer", 0.675, 0.870),
    ]),
    "Blackfathom Deeps": ("scratch_bfd.jpg", None, [
        ("Ghamoo-ra", 0.480, 0.745),
        ("Lady Sarevess", 0.420, 0.625),
        ("Gelihast", 0.385, 0.490),
        ("Lorgus Jett", 0.460, 0.440),
        ("Baron Aquanis", 0.565, 0.435),
        ("Twilight Lord Kelris", 0.610, 0.270),
        ("Old Serra'kis", 0.635, 0.180),
        ("Aku'mai", 0.685, 0.120),
    ]),
}

for name, (fname, crop, bosses) in checks.items():
    im = Image.open(fname)
    if crop: im = im.crop(crop)
    w, h = im.size
    print(f"=== {name} ({w}x{h}) ===")
    for bname, nx, ny in bosses:
        px, py = int(nx * w), int(ny * h)
        pixel = im.getpixel((px, py))
        print(f"  {bname:25s} -> px=({px:4d},{py:4d}) RGB={pixel}")
