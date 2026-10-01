from PIL import Image, ImageDraw, ImageFont
import os

# Let's create realistic previews of how the addon displays these 3 maps
maps_to_verify = {
    "The Deadmines": {
        "file": "Media/Maps/TheDeadmines_Map.tga",
        "bosses": [
            ("Entrance", 0.108, 0.217, True, None),
            ("Rhahk'Zor", 0.207, 0.579, False, 1),
            ("Miner Johnson", 0.399, 0.492, False, 2),
            ("Sneed", 0.365, 0.781, False, 3),
            ("Gilnid", 0.489, 0.604, False, 4),
            ("Defias Gunpowder", 0.550, 0.383, False, 5),
            ("Mr. Smite", 0.730, 0.365, False, 6),
            ("Cookie", 0.780, 0.410, False, 7),
            ("Captain Greenskin", 0.775, 0.330, False, 8),
            ("Edwin VanCleef", 0.818, 0.360, False, 9),
        ]
    },
    "The Stockade": {
        "file": "Media/Maps/TheStockade_Map.tga",
        "bosses": [
            ("Entrance", 0.504, 0.885, True, None),
            ("Targorr the Dread", 0.490, 0.370, False, 1),
            ("Kam Deepfury", 0.615, 0.470, False, 2),
            ("Hamhock", 0.635, 0.670, False, 3),
            ("Bazil Thredd", 0.370, 0.670, False, 4),
            ("Dextren Ward", 0.375, 0.480, False, 5),
            ("Bruegal Ironknuckle", 0.540, 0.520, False, 6),
        ]
    },
    "Ruins of Lordaeron": {
        "file": "Media/Maps/RuinsOfLordaeron_Map.tga",
        "bosses": [
            ("Entrance", 0.655, 0.214, True, None),
            ("Witherfang", 0.760, 0.392, False, 1),
            ("The Baron", 0.633, 0.716, False, 2),
            ("Viktor the Vile", 0.377, 0.654, False, 3),
            ("Rath'mael", 0.469, 0.569, False, 4),
            ("Edward Heartweaver", 0.498, 0.577, False, None),
            ("The Abandoned", 0.403, 0.531, False, 5),
            ("Bjork", 0.389, 0.277, False, 6),
        ]
    }
}

for dname, data in maps_to_verify.items():
    im = Image.open(data["file"]).convert('RGB')
    w, h = im.size
    draw = ImageDraw.Draw(im)
    
    for bname, x, y, is_ent, num in data["bosses"]:
        px, py = int(x * w), int(y * h)
        r = 14
        if is_ent:
            # Hearthstone / entrance rune pin: cyan / purple rune
            draw.ellipse((px-r, py-r, px+r, py+r), fill=(20, 140, 200), outline=(255, 255, 255), width=2)
            draw.text((px - 5, py - 6), "H", fill=(255, 255, 255))
            draw.text((px + r + 4, py - 6), f"[Entrance]", fill=(100, 220, 255))
        elif "Gunpowder" in bname or num == 5 and "Deadmines" in dname:
            draw.ellipse((px-r, py-r, px+r, py+r), fill=(220, 160, 20), outline=(255, 255, 255), width=2)
            draw.text((px - 4, py - 6), "5", fill=(0, 0, 0))
            draw.text((px + r + 4, py - 6), f"5. {bname}", fill=(255, 200, 50))
        else:
            # Boss gold circle with number
            draw.ellipse((px-r, py-r, px+r, py+r), fill=(160, 30, 30), outline=(255, 215, 0), width=2)
            if num is not None:
                draw.text((px - 4 if num < 10 else px - 7, py - 6), str(num), fill=(255, 255, 255))
                draw.text((px + r + 4, py - 6), f"{num}. {bname}", fill=(255, 255, 255))
            else:
                draw.text((px - 3, py - 6), "!", fill=(255, 255, 255))
                draw.text((px + r + 4, py - 6), bname, fill=(255, 255, 255))
                
    clean_fname = dname.replace(" ", "_")
    out_path = f"scratch/FINAL_VERIFY_{clean_fname}.jpg"
    im.save(out_path, quality=95)
    print(f"Saved {out_path} ({w}x{h})")
