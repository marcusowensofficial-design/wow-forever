from PIL import Image, ImageDraw

im = Image.open('scratch/TheDeadmines_Atlas_Clean.png')
w, h = im.size
draw = ImageDraw.Draw(im)

pins = [
    ("Entrance", 0.108, 0.217, True),
    ("1. Rhahk'Zor", 0.207, 0.579, False),
    ("2. Miner Johnson", 0.399, 0.492, False),
    ("3. Sneed", 0.365, 0.781, False),
    ("4. Gilnid", 0.489, 0.604, False),
    ("5. Defias Gunpowder", 0.550, 0.383, False),
    ("6. Mr. Smite", 0.730, 0.365, False),
    ("7. Cookie", 0.780, 0.410, False),
    ("8. Captain Greenskin", 0.775, 0.330, False),
    ("9. Edwin VanCleef", 0.818, 0.360, False),
]

for name, x, y, is_ent in pins:
    px, py = int(x * w), int(y * h)
    color = (0, 220, 255) if is_ent else ((255, 180, 0) if "Gunpowder" in name else (255, 40, 40))
    draw.ellipse((px-9, py-9, px+9, py+9), fill=color, outline=(255, 255, 255), width=2)
    # text with dark shadow
    draw.text((px + 13, py - 5), name, fill=(0, 0, 0))
    draw.text((px + 12, py - 6), name, fill=(255, 255, 255))

im.save('scratch/deadmines_atlas_pins_preview.png')
print("Saved deadmines_atlas_pins_preview.png")
