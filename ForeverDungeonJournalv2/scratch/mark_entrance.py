from PIL import Image, ImageDraw

img = Image.open('Media/Maps/RuinsOfLordaeron_Map.tga').convert('RGB')
w, h = img.size

# Let's crop the area around normalized x=0.60..0.72, y=0.15..0.28
crop = img.crop((int(0.60 * w), int(0.15 * h), int(0.72 * w), int(0.28 * h)))
draw = ImageDraw.Draw(crop)

# In the crop coordinates:
# origin is at (0.60*w, 0.15*h)
ox = int(0.60 * w)
oy = int(0.15 * h)

cx = int(0.6557 * w) - ox
cy = int(0.2120 * h) - oy

draw.ellipse((cx - 8, cy - 8, cx + 8, cy + 8), outline=(255, 0, 0), width=2)
crop.save('scratch/entrance_spot_marked.png')
print('Saved entrance_spot_marked.png')
