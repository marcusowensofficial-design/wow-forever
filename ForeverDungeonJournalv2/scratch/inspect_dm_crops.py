from PIL import Image

im = Image.open('Media/Maps/TheDeadmines_Map.tga')
w, h = im.size

bosses = [
    ("Rhahk'Zor", 0.535, 0.565),
    ("Miner Johnson", 0.450, 0.490),
    ("Sneed", 0.580, 0.485),
    ("Gilnid", 0.505, 0.360),
    ("Defias Gunpowder", 0.470, 0.280),
    ("Mr. Smite", 0.395, 0.220),
    ("Cookie", 0.380, 0.145),
    ("Captain Greenskin", 0.360, 0.170),
    ("Edwin VanCleef", 0.340, 0.125),
]

for name, x, y in bosses:
    px, py = int(x * w), int(y * h)
    crop = im.crop((max(0, px - 60), max(0, py - 60), min(w, px + 60), min(h, py + 60)))
    clean_name = name.replace("'", "").replace(" ", "_")
    crop.save(f"scratch/dm_crop_{clean_name}.png")

print("Saved all DM boss crops")
