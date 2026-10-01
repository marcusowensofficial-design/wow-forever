from PIL import Image, ImageDraw

orig = Image.open(r'C:\Users\marco\.gemini\antigravity-ide\brain\ccb6473a-aaa8-4aec-977b-885f743cf81a\.user_uploaded\media_1790808834188.png').convert('RGB')
w, h = orig.size
draw = ImageDraw.Draw(orig)

# The coordinates we calculated:
pins = [
    ("Entrance (A)", 0.496, 0.778, True, None),
    ("1. Targorr the Dread", 0.496, 0.261, False, 1),
    ("2. Kam Deepfury", 0.724, 0.336, False, 2),
    ("3. Hamhock", 0.837, 0.502, False, 3),
    ("4. Bazil Thredd", 0.941, 0.580, False, 4),
    ("5. Dextren Ward", 0.159, 0.309, False, 5),
    ("6. Bruegal Ironknuckle", 0.230, 0.471, False, 6),
    ("1. Targorr (Spawn)", 0.272, 0.440, False, 1),
    ("1. Targorr (Spawn)", 0.413, 0.483, False, 1),
    ("1. Targorr (Spawn)", 0.576, 0.577, False, 1),
]

for label, nx, ny, is_ent, num in pins:
    px = int(nx * w)
    py = int(ny * h)
    r = 10
    color = (0, 200, 255) if is_ent else (255, 50, 50)
    draw.ellipse((px-r, py-r, px+r, py+r), outline=(255, 255, 0), width=2)
    draw.line([(px-r-2, py), (px+r+2, py)], fill=(255, 255, 0), width=1)
    draw.line([(px, py-r-2), (px, py+r+2)], fill=(255, 255, 0), width=1)

orig.save("scratch/test_pin_overlay_on_orig.png")
print("Saved scratch/test_pin_overlay_on_orig.png")
