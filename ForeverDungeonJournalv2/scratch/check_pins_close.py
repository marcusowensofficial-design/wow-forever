from PIL import Image

im = Image.open('scratch/dm_test_pins_all.jpg')
w, h = im.size

test_pins = [
    ("Entrance", 0.388, 0.055),
    ("RhahkZor", 0.365, 0.612),
    ("MinerJohnson", 0.395, 0.745),
    ("Sneed", 0.501, 0.868),
    ("Gilnid", 0.124, 0.758),
    ("DefiasGunpowder", 0.468, 0.385),
    ("MrSmite", 0.525, 0.345),
    ("Cookie", 0.604, 0.455),
    ("CaptainGreenskin", 0.607, 0.374),
    ("EdwinVanCleef", 0.654, 0.402),
]

for name, x, y in test_pins:
    px, py = int(x * w), int(y * h)
    crop = im.crop((max(0, px - 40), max(0, py - 40), min(w, px + 80), min(h, py + 40)))
    crop.save(f'scratch/pin_check_{name}.png')

print("Saved all pin checks")
