from PIL import Image, ImageDraw

im = Image.open('scratch/dm_combined.jpg')
w, h = im.size

# Let's inspect each candidate location in detail:
# Let's check the Foundry and hallway to Cove:
# Gilnid is in the Foundry at x=0.124, y=0.758.
# Where does the path go from Gilnid?
# It goes through a tunnel towards the Cove.
# Along this tunnel, before entering the cove, is the massive iron door with the Defias cannon!
# And the Defias Gunpowder is right in front of the door.
# Beyond the door is the Cove (water, docks, ship).

# Let's inspect:
# 1. Miner Johnson:
# Miner Johnson is between Rhahk'Zor and Sneed.
# Rhahk'Zor: (0.365, 0.612)
# Sneed: (0.501, 0.868)
# In the tunnel between them, is there a side room?
# Let's crop the area between Rhahk'Zor and Sneed:
crop_mid = im.crop((int(0.30*w), int(0.60*h), int(0.55*w), int(0.85*h)))
crop_mid.save('scratch/crop_mid_rhahk_sneed.png')

# 2. Defias Gunpowder / Iron Door:
# Between Gilnid (0.124, 0.758) and Cove (0.50, 0.35)
crop_door = im.crop((int(0.20*w), int(0.40*h), int(0.52*w), int(0.70*h)))
crop_door.save('scratch/crop_tunnel_to_cove.png')

# 3. Cove details:
crop_cove = im.crop((int(0.48*w), int(0.25*h), int(0.72*w), int(0.55*h)))
crop_cove.save('scratch/crop_cove_details.png')

print("Saved inspection crops")
