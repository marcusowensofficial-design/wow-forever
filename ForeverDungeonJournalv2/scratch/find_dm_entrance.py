from PIL import Image
import numpy as np

dm1 = Image.open('scratch/scratch_dm_1.jpg')
w, h = dm1.size

# Rhahk'Zor is at x=0.365, y=0.612 (px=368, py=412)
# The entrance to Deadmines leads into Rhahk'Zor's room.
# Where is the entrance corridor coming from?
# Is it coming from the top, top-right, right?
# Let's inspect a crop around px=250-450, py=200-500
crop_entrance_area = dm1.crop((int(0.15*w), int(0.15*h), int(0.50*w), int(0.70*h)))
crop_entrance_area.save('scratch/dm1_entrance_area.png')

# Where does the corridor go from the edge?
# Let's inspect along the top / left / right of Rhahk'Zor to find where the tunnel starts (dungeon entrance)
print("Saved dm1_entrance_area.png")
