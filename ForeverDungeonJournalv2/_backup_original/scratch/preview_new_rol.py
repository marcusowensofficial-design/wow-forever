from PIL import Image, ImageDraw, ImageFont

# Load Ruins of Lordaeron map
map_img = Image.open('Media/Maps/RuinsOfLordaeron_Map.tga').convert('RGB')
w, h = map_img.size
canvas = map_img.copy()
draw = ImageDraw.Draw(canvas)

# New boss definitions
bosses = [
    {"name": "Entrance", "isEntrance": True, "x": 0.655, "y": 0.214},
    {"name": "Witherfang", "mapNumber": 1, "x": 0.760, "y": 0.392},
    {"name": "The Baron", "mapNumber": 2, "x": 0.633, "y": 0.716},
    {"name": "Viktor the Vile", "mapNumber": 3, "x": 0.377, "y": 0.654},
    {"name": "Rath'mael", "mapNumber": 4, "x": 0.469, "y": 0.569},
    {"name": "Edward Heartweaver", "isNPC": True, "x": 0.498, "y": 0.577},
    {"name": "The Abandoned", "mapNumber": 5, "x": 0.403, "y": 0.531},
    {"name": "Bjork", "mapNumber": 6, "x": 0.389, "y": 0.277},
]

landmarks = [
    {"name": "Mausoleum", "x": 0.322, "y": 0.259},
    {"name": "Tower 3", "x": 0.434, "y": 0.298},
    {"name": "Tower 2", "x": 0.370, "y": 0.530},
    {"name": "Crypt", "x": 0.597, "y": 0.615},
    {"name": "Tower 1", "x": 0.725, "y": 0.519},
]

# Draw landmarks (silver shield)
for lm in landmarks:
    lx, ly = int(lm["x"] * w), int(lm["y"] * h)
    r = 16
    draw.ellipse((lx - r, ly - r, lx + r, ly + r), fill=(60, 60, 60), outline=(200, 200, 200), width=3)
    draw.text((lx - 4, ly - 6), "S", fill=(255, 255, 255))

# Draw bosses
for b in bosses:
    bx, by = int(b["x"] * w), int(b["y"] * h)
    r = 20
    if b.get("isEntrance"):
        # Blue / rune circle for Entrance
        draw.ellipse((bx - r, by - r, bx + r, by + r), fill=(30, 80, 200), outline=(255, 215, 0), width=3)
        draw.text((bx - 6, by - 8), "H", fill=(255, 255, 255))
        draw.text((bx + r + 6, by - 8), "Entrance", fill=(255, 255, 255))
    elif b.get("isNPC"):
        draw.ellipse((bx - r, by - r, bx + r, by + r), fill=(20, 140, 60), outline=(255, 215, 0), width=3)
        draw.text((bx - 6, by - 8), "+", fill=(255, 255, 255))
        draw.text((bx + r + 6, by - 8), b["name"], fill=(150, 255, 150))
    else:
        num = b["mapNumber"]
        draw.ellipse((bx - r, by - r, bx + r, by + r), fill=(140, 20, 20), outline=(255, 215, 0), width=3)
        draw.text((bx - 5, by - 8), str(num), fill=(255, 255, 255))
        # Draw number to the left and name below
        draw.text((bx - r - 16, by - 8), str(num), fill=(255, 215, 0))
        draw.text((bx - 20, by + r + 4), b["name"], fill=(255, 255, 255))

canvas.save('scratch/RuinsOfLordaeron_Map_new_preview.png')
print("Preview generated at scratch/RuinsOfLordaeron_Map_new_preview.png")
