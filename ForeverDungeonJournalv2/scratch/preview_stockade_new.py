from PIL import Image, ImageDraw, ImageFont

im = Image.open("Media/Maps/TheStockade_Map.tga").convert("RGB")
w, h = im.size
draw = ImageDraw.Draw(im)

bosses = [
    ("Entrance", 0.496, 0.778, True, None),
    ("Targorr the Dread", 0.496, 0.261, False, 1),
    ("Kam Deepfury", 0.724, 0.336, False, 2),
    ("Hamhock", 0.837, 0.502, False, 3),
    ("Bazil Thredd", 0.941, 0.580, False, 4),
    ("Dextren Ward", 0.159, 0.309, False, 5),
    ("Bruegal Ironknuckle", 0.230, 0.471, False, 6),
    # Optional spawn points for Targorr
    ("Targorr (Spawn)", 0.272, 0.440, False, 1),
    ("Targorr (Spawn)", 0.413, 0.483, False, 1),
    ("Targorr (Spawn)", 0.576, 0.577, False, 1),
]

for bname, x, y, is_ent, num in bosses:
    px, py = int(x * w), int(y * h)
    r = 14
    if is_ent:
        # Entrance hearthstone / rune icon
        draw.ellipse((px-r, py-r, px+r, py+r), fill=(20, 140, 200), outline=(255, 255, 255), width=2)
        draw.text((px - 5, py - 6), "H", fill=(255, 255, 255))
        draw.text((px + r + 4, py - 6), "[Entrance]", fill=(100, 220, 255))
    else:
        # Boss gold ring
        draw.ellipse((px-r, py-r, px+r, py+r), fill=(160, 30, 30), outline=(255, 215, 0), width=2)
        draw.text((px - 4 if num < 10 else px - 7, py - 6), str(num), fill=(255, 255, 255))
        draw.text((px + r + 4, py - 6), f"{num}. {bname}", fill=(255, 255, 255))

out_path = "scratch/FINAL_VERIFY_The_Stockade_New.jpg"
im.save(out_path, quality=95)
print(f"Saved {out_path} ({w}x{h})")
