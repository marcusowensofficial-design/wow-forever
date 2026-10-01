from PIL import Image
import numpy as np

# Let's inspect the crops without dots to verify room boundaries
raw_im = Image.open('scratch/dm_combined.jpg')
w, h = raw_im.size

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
    # Check 20x20 area around (px, py)
    crop = np.array(raw_im.crop((px - 10, py - 10, px + 10, py + 10)))
    # Parchment background is [130, 90, 30].
    # Floor is usually distinct:
    diff_from_bg = np.linalg.norm(crop.astype(float) - [130, 90, 30], axis=2).mean()
    print(f"{name:20s} at ({x:.3f}, {y:.3f}) px=({px}, {py}): diff_from_bg={diff_from_bg:.1f}")
