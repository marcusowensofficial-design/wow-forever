from PIL import Image
import numpy as np

# Let's inspect dm1 where the entrance tunnel is.
# In Deadmines, the tunnel begins at the instance portal.
# Let's check coordinates around x=0.20-0.40, y=0.20-0.60.
dm1 = Image.open('scratch/scratch_dm_1.jpg')
w, h = dm1.size

# Let's crop along the tunnel from top-left/center to Rhahk'Zor
crop = dm1.crop((int(0.20*w), int(0.20*h), int(0.45*w), int(0.65*h)))
crop.save('scratch/dm1_entrance_tunnel.png')
print("Saved dm1_entrance_tunnel.png")
