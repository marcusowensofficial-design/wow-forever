from PIL import Image, ImageDraw
import os

maps_info = {
    "Ragefire Chasm": {
        "file": "scratch_rfc.jpg",
        "crop": (0, 0, 1008, 672),
        "bosses": [
            ("Oggleflint", 0.885, 0.585),
            ("Taragaman the Hungerer", 0.435, 0.515),
            ("Jergosh the Invoker", 0.350, 0.825),
            ("Bazzalan", 0.485, 0.885),
        ]
    },
    "Shadowfang Keep": {
        "file": "scratch_sfk.jpg",
        "crop": (0, 0, 1022, 668),
        "bosses": [
            ("Rethilgore", 0.480, 0.690),
            ("Razorclaw the Butcher", 0.425, 0.630),
            ("Baron Silverlaine", 0.550, 0.575),
            ("Commander Springvale", 0.585, 0.465),
            ("Odo the Blindwatcher", 0.410, 0.490),
            ("Fenrus the Devourer", 0.470, 0.410),
            ("Wolf Master Nandos", 0.525, 0.360),
            ("Archmage Arugal", 0.490, 0.220),
        ]
    },
    "Wailing Caverns": {
        "file": "scratch_wc.jpg",
        "crop": (0, 0, 1002, 668),
        "bosses": [
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
    },
    "Blackfathom Deeps": {
        "file": "scratch_bfd.jpg",
        "crop": (0, 0, 1022, 668),
        "bosses": [
            ("Ghamoo-ra", 0.480, 0.745),
            ("Lady Sarevess", 0.420, 0.625),
            ("Gelihast", 0.385, 0.490),
            ("Lorgus Jett", 0.460, 0.440),
            ("Baron Aquanis", 0.565, 0.435),
            ("Twilight Lord Kelris", 0.610, 0.270),
            ("Old Serra'kis", 0.635, 0.180),
            ("Aku'mai", 0.685, 0.120),
        ]
    }
}

for name, info in maps_info.items():
    im = Image.open(info["file"])
    if info["crop"]:
        im = im.crop(info["crop"])
    w, h = im.size
    draw = ImageDraw.Draw(im)
    for bname, nx, ny in info["bosses"]:
        px, py = int(nx * w), int(ny * h)
        draw.ellipse((px-10, py-10, px+10, py+10), fill=(255, 0, 0), outline=(255, 255, 0), width=2)
        draw.text((px+12, py-6), bname, fill=(255, 255, 255))
    out_name = f"scratch_test_{name.replace(' ', '_')}.jpg"
    im.save(out_name)
    print(f"Saved {out_name} ({w}x{h})")
