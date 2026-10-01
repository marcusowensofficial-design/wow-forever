from PIL import Image, ImageDraw, ImageFont
import numpy as np

# Load the cleaned map
clean_map = Image.open("scratch/stockade_cleaned_preview.png")
w, h = clean_map.size

# Exact detected centers from Screenshot 1:
# A (Entrance): (268, 322) -> (268/540, 322/414)
# 1 (Targorr the Dread - Varies):
#   - North room: (268, 108) -> (268/540, 108/414)
#   - Mid-left cell: (223, 200) -> (223/540, 200/414)
#   - Bottom-right cell: (311, 239) -> (311/540, 239/414)
#   - West cell: (147, 182) -> (147/540, 182/414)
# 2 (Kam Deepfury): (391, 139) -> (391/540, 139/414)
# 3 (Hamhock): (452, 208) -> (452/540, 208/414)
# 4 (Bazil Thredd): (508, 240) -> (508/540, 240/414)
# 5 (Dextren Ward): (86, 128) -> (86/540, 128/414)
# 6 (Bruegal Ironknuckle - Rare): (124, 195) -> (124/540, 195/414)

boss_coords = [
    ("Entrance", 268/w, 322/h, True, None),
    ("Targorr the Dread", 268/w, 108/h, False, 1),
    ("Kam Deepfury", 391/w, 139/h, False, 2),
    ("Hamhock", 452/w, 208/h, False, 3),
    ("Bazil Thredd", 508/w, 240/h, False, 4),
    ("Dextren Ward", 86/w, 128/h, False, 5),
    ("Bruegal Ironknuckle", 124/w, 195/h, False, 6),
]

# Optional spawn locations for Targorr the Dread (Varies)
targorr_extra_spawns = [
    ("Targorr (Spawn)", 147/w, 182/h),
    ("Targorr (Spawn)", 223/w, 200/h),
    ("Targorr (Spawn)", 311/w, 239/h),
]

print("=== CALCULATED COORDINATES ===")
for name, nx, ny, is_ent, num in boss_coords:
    print(f"{{ name = \"{name}\", " + (f"isEntrance = true, " if is_ent else f"mapNumber = {num}, ") + f"x = {nx:.3f}, y = {ny:.3f} }},")

print("\nTargorr extra spawn points:")
for name, nx, ny in targorr_extra_spawns:
    print(f"{{ name = \"{name}\", x = {nx:.3f}, y = {ny:.3f} }},")
