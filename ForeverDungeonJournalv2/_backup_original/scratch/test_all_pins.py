from PIL import Image, ImageDraw

im = Image.open('scratch/dm_combined.jpg')
w, h = im.size
draw = ImageDraw.Draw(im)

# Let's test the pins:
# 1. Entrance: top of entrance tunnel where player zones in: x = 0.388, y = 0.055
# 2. Rhahk'Zor: room 1 ogre boss: x = 0.365, y = 0.612 (official)
# 3. Miner Johnson: side cavern off path to Sneed: x = 0.395, y = 0.745
# 4. Sneed: Mast/Lumber room goblin shredder: x = 0.501, y = 0.868 (official)
# 5. Gilnid: Goblin foundry/forge: x = 0.124, y = 0.758 (official)
# 6. Defias Gunpowder (Iron Door): end of tunnel entering Cove: x = 0.468, y = 0.385
# 7. Mr. Smite: pier/dock ramp to ship: x = 0.525, y = 0.345
# 8. Cookie: lower deck galley of juggernaut: x = 0.604, y = 0.455 (official)
# 9. Captain Greenskin: main deck helm: x = 0.607, y = 0.374 (official)
# 10. Edwin VanCleef: top cabin platform: x = 0.654, y = 0.402 (official)

test_pins = [
    ("Entrance", 0.388, 0.055, True),
    ("Rhahk'Zor", 0.365, 0.612, False),
    ("Miner Johnson", 0.395, 0.745, False),
    ("Sneed", 0.501, 0.868, False),
    ("Gilnid", 0.124, 0.758, False),
    ("Defias Gunpowder", 0.468, 0.385, False),
    ("Mr. Smite", 0.525, 0.345, False),
    ("Cookie", 0.604, 0.455, False),
    ("Captain Greenskin", 0.607, 0.374, False),
    ("Edwin VanCleef", 0.654, 0.402, False),
]

for name, x, y, is_ent in test_pins:
    px, py = int(x * w), int(y * h)
    color = (0, 255, 255) if is_ent else (255, 50, 50)
    draw.ellipse((px-8, py-8, px+8, py+8), fill=color, outline=(255, 255, 0), width=2)
    draw.text((px+10, py-5), name, fill=(255, 255, 255))

im.save('scratch/dm_test_pins_all.jpg')
print("Saved dm_test_pins_all.jpg")
