from PIL import Image
import numpy as np

im = Image.open('Media/Maps/TheDeadmines_Map.tga')
w, h = im.size
arr = np.array(im)

# Let's inspect the rooms by finding the centers of rooms/corridors
# In Blizzard maps, empty parchment is [~150, ~110, ~55] or dark border
# The corridor floors are lighter/different or have dark outlines.
# Let's check color profile:
print('Top left (parchment):', arr[50, 50])

# Let's inspect specific coordinates along the route:
# 1. Entrance tunnel: where does the dungeon begin?
# In Deadmines, the instance line is at the end of Moonbrook tunnel.
# Usually on the map, this starts at the upper right, lower right, or bottom?
# Let's find all regions where the corridor is drawn!
# Let's compute a mask of "is_corridor_or_room"
# Corridor pixels typically have R, G, B values that differ significantly from the background parchment texture.
# Let's sample parchment background from areas with no dungeon (e.g. top-left (100, 100), bottom-left (100, 900))
bg_samples = np.vstack([
    arr[20:120, 20:120].reshape(-1, 3),
    arr[900:1000, 20:120].reshape(-1, 3),
    arr[900:1000, 900:1000].reshape(-1, 3),
])
bg_mean = bg_samples.mean(axis=0)
bg_std = bg_samples.std(axis=0)
print(f"Background mean: {bg_mean}, std: {bg_std}")

# Distance from background
diff = np.linalg.norm(arr.astype(float) - bg_mean, axis=2)
# Save a map of diff
diff_norm = np.clip((diff / diff.max()) * 255, 0, 255).astype(np.uint8)
Image.fromarray(diff_norm).save('scratch/dm_corridor_mask.png')
print("Saved dm_corridor_mask.png")
