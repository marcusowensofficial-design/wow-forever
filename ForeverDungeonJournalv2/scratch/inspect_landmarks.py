from PIL import Image, ImageDraw
import numpy as np

# Let's inspect dm_combined.jpg or dm1 and dm2 to find the exact room centers for all bosses and entrance.
im = Image.open('scratch/dm_combined.jpg')
w, h = im.size

# Let's list the rooms in order of dungeon progression:
# 1. Entrance:
# Where does the player enter?
# Let's find the entrance doorway / portal at the start of the mine tunnel.
# 2. Rhahk'Zor:
# Official wowhead coords: [36.5, 61.2]
# 3. Miner Johnson:
# Rare spawn in the side tunnel off the path to the Mast Room.
# 4. Sneed:
# Official wowhead coords: [50.1, 86.8] (Lumber Room / Mast Room)
# 5. Gilnid:
# Official wowhead coords: [12.4, 75.8] (Goblin Foundry)
# 6. Defias Gunpowder (Iron Door):
# The keg is right next to the cannon and iron door leading to the cove.
# 7. Mr. Smite:
# Stands at the ramp/dock leading onto the juggernaut.
# 8. Cookie:
# Stands on the lower deck / galley of the juggernaut by the cooking pot.
# 9. Captain Greenskin:
# Official wowhead coords: [60.7, 37.4] (helm/main deck of juggernaut)
# 10. Edwin VanCleef:
# Official wowhead coords: [65.4, 40.2] (top of the cabin)

# Let's crop around each of these regions to inspect the room structures visually!
crops_to_check = {
    "RhahkZor_area": (0.30, 0.55, 0.42, 0.68),
    "Sneed_area": (0.44, 0.80, 0.56, 0.94),
    "Gilnid_area": (0.06, 0.68, 0.20, 0.84),
    "Cove_area": (0.48, 0.25, 0.72, 0.55),
    "Entrance_candidates": (0.20, 0.20, 0.40, 0.50),
    "Between_Rhahk_and_Sneed": (0.35, 0.60, 0.50, 0.85),
    "Between_Gilnid_and_Cove": (0.15, 0.40, 0.40, 0.70),
}

for name, (x1, y1, x2, y2) in crops_to_check.items():
    crop = im.crop((int(x1*w), int(y1*h), int(x2*w), int(y2*h)))
    crop.save(f'scratch/check_{name}.png')

print("Saved all check crops")
