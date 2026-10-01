from PIL import Image

im = Image.open('Media/Maps/RuinsOfLordaeron_Map.tga')
w, h = im.size

# In WoW Ruins of Lordaeron:
# Lordaeron courtyard entrance:
# Is it the main southern gate or western/northern breach?
# Let's crop:
# 1. South gate area: x=0.45..0.55, y=0.75..0.95
# 2. Bottom-left / South-west: x=0.25..0.45, y=0.70..0.95
# 3. North gate / courtyard: x=0.45..0.55, y=0.15..0.35
# 4. West breach: x=0.25..0.35, y=0.40..0.60
# 5. East breach: x=0.75..0.90, y=0.40..0.60

crops = {
    "south_gate": (0.42, 0.72, 0.58, 0.95),
    "southwest": (0.28, 0.70, 0.45, 0.92),
    "north_gate": (0.45, 0.15, 0.58, 0.35),
    "west_breach": (0.25, 0.40, 0.36, 0.60),
    "center_courtyard": (0.44, 0.50, 0.56, 0.68),
}

for name, (x1, y1, x2, y2) in crops.items():
    crop = im.crop((int(x1*w), int(y1*h), int(x2*w), int(y2*h)))
    crop.save(f'scratch/rol_gate_{name}.png')

print("Saved all gate crops")
