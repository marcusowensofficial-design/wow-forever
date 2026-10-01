from PIL import Image
import numpy as np

dm1 = Image.open('scratch/scratch_dm_1.jpg')
w, h = dm1.size
arr = np.array(dm1)

# Rhahk'Zor is at x=368, y=412
# Let's trace corridors connected to (368, 412)
# In WoW dungeon maps, the hallway floor is lighter than parchment or dark walls.
# Let's see what direction leads away from Rhahk'Zor towards the entrance.
# In Deadmines: You enter from Moonbrook, head down a long spiraling/winding tunnel,
# reach Rhahk'Zor (the ogre with the massive hammer at the door).
# Behind Rhahk'Zor is the door to the Mast Room (Sneed).
# So the entrance MUST come from the tunnel before Rhahk'Zor!

# Let's inspect along various angles from (368, 412):
for angle in [0, 45, 90, 135, 180, 225, 270, 315]:
    rad = np.deg2rad(angle)
    dx = np.cos(rad)
    dy = np.sin(rad)
    # sample at dist=50, 100, 150
    p50 = arr[int(412 + 50*dy), int(368 + 50*dx)]
    p100 = arr[int(412 + 100*dy), int(368 + 100*dx)]
    p150 = arr[int(412 + 150*dy), int(368 + 150*dx)]
    print(f"Angle {angle:3d}: dist50={p50}, dist100={p100}, dist150={p150}")
