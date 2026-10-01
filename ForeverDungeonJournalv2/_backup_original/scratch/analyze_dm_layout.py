from PIL import Image
import numpy as np

# Load TheDeadmines_Map.tga
im = Image.open('Media/Maps/TheDeadmines_Map.tga')
w, h = im.size
arr = np.array(im)

# Let's inspect the map structure
# Where is the dungeon route in The Deadmines?
# In WoW Classic Deadmines:
# 1. Entrance portal: You zone in at the entrance tunnel.
# 2. Main mine path goes down, turns.
# 3. Rhahk'Zor is the first boss (ogre guard at the first large iron door).
# 4. Beyond Rhahk'Zor, you enter the Mast Room (timber / wood scaffolding). Miner Johnson (rare) is in a side tunnel.
# 5. Sneed is in the Lumber Room / Mast Room in the goblin shredder.
# 6. Beyond Sneed is the Foundry / Forge. Gilnid (goblin smith) is at the forge.
# 7. Beyond the forge is the Iron Door where you need Defias Gunpowder to blow it open with the cannon!
# 8. Beyond the iron door is the Ironclad Cove (cavern with the giant pirate ship / Juggernaut in the water!).
# 9. At the docks / ramp to ship: Mr. Smite.
# 10. On the ship: Cookie (murloc cook) in the galley / lower deck.
# 11. Captain Greenskin on the main deck / helm.
# 12. Edwin VanCleef on top of the ship cabin.
# 13. Behind the ship: tunnel exit leading to the Westfall coast!

# Now let's check: What is shown on TheDeadmines_Map.tga?
# Does TheDeadmines_Map.tga show the entire path or does it show both levels or just one level?
print(f"TheDeadmines_Map size: {w}x{h}")
