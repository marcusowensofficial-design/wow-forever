from PIL import Image

im = Image.open('scratch/inpainted_deadmines.png')

targets = {
    "A_entrance": (60, 96, 25),
    "1_rhahk": (114, 292, 20),
    "2_miner": (218, 245, 20),
    "3_sneed_circle": (199, 401, 35),
    "4_gilnid": (266, 305, 20),
    "5_gunpowder": (299, 186, 20),
    "6_cove_ship": (431, 174, 20),
    "B_exit": (538, 213, 20),
}

for name, (cx, cy, r) in targets.items():
    crop = im.crop((cx - r, cy - r, cx + r, cy + r))
    crop.save(f'scratch/clean_{name}.png')

print("Saved all clean target crops")
