from PIL import Image, ImageDraw
import numpy as np

# Let's inspect the entire entrance tunnel and find the exact entrance coordinate.
# Also let's check:
# 1. Entrance coordinate
# 2. Rhahk'Zor coordinate
# 3. Miner Johnson coordinate
# 4. Sneed coordinate
# 5. Gilnid coordinate
# 6. Defias Gunpowder / Iron Door coordinate
# 7. Mr. Smite coordinate
# 8. Cookie coordinate
# 9. Captain Greenskin coordinate
# 10. Edwin VanCleef coordinate
# 11. Exit tunnel coordinate (at the back of the cove)

# Let's inspect dm1 and dm2!
# On dm1:
# The tunnel starts around:
dm1 = Image.open('scratch/scratch_dm_1.jpg')
w, h = dm1.size
arr1 = np.array(dm1)

# Let's find the corridor pixels in the upper-left (entrance area)
# Parchment is roughly [130, 90, 30].
# Corridor floor is lighter (mean around 150-180, distinct texture)
# Wall outlines are dark brown/black [50, 30, 10].
# Let's crop a 10%x10% grid and save an annotated image of the whole dungeon with all potential landmarks
annotated = dm1.copy()
draw = ImageDraw.Draw(annotated)

# Let's test candidate points:
points = {
    "Rhahk'Zor": (0.365, 0.612),
    "Sneed": (0.501, 0.868),
}

for name, (nx, ny) in points.items():
    px, py = int(nx * w), int(ny * h)
    draw.ellipse((px-8, py-8, px+8, py+8), fill=(255, 0, 0), outline=(255, 255, 0), width=2)
    draw.text((px+10, py-5), name, fill=(255, 255, 255))

annotated.save('scratch/dm1_candidates.jpg')
print("Saved dm1_candidates.jpg")
