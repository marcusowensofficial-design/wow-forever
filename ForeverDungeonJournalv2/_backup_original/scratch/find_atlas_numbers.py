from PIL import Image
import numpy as np

im = Image.open('scratch/user_atlas_deadmines.png')
w, h = im.size
arr = np.array(im)

# Let's find:
# 1. 'A' (blue letter at entrance):
# Blue is dominant: B > R + 30 and B > G + 30
blue_mask = (arr[:, :, 2].astype(int) - arr[:, :, 0].astype(int) > 30) & (arr[:, :, 2].astype(int) - arr[:, :, 1].astype(int) > 30)
y_blue, x_blue = np.where(blue_mask)
print(f"Blue pixels count: {len(x_blue)}")
if len(x_blue) > 0:
    # 'A' is near top left, 'B' is near right
    left_blue = x_blue < w // 2
    right_blue = x_blue >= w // 2
    if left_blue.any():
        print(f"'A' (Entrance): x={x_blue[left_blue].mean():.1f}, y={y_blue[left_blue].mean():.1f}")
    if right_blue.any():
        print(f"'B' (Exit): x={x_blue[right_blue].mean():.1f}, y={y_blue[right_blue].mean():.1f}")

# 2. Red circle around '3':
# Red is dominant: R > 150 and R > G * 2 and R > B * 2
red_mask = (arr[:, :, 0].astype(int) > 130) & (arr[:, :, 0].astype(int) > arr[:, :, 1].astype(int) * 1.8) & (arr[:, :, 0].astype(int) > arr[:, :, 2].astype(int) * 1.8)
y_red, x_red = np.where(red_mask)
print(f"Red pixels count: {len(x_red)}")
if len(x_red) > 0:
    print(f"Red circle around '3': x={x_red.mean():.1f}, y={y_red.mean():.1f}")

# 3. White / light numbers '1', '2', '4', '5', '6':
# They are bright white or light cream text with black outline.
# Let's crop around expected areas:
# '1': Rhahk'Zor (in the reddish room, left of center)
# '2': Miner Johnson (in the upper side branch)
# '4': Gilnid (in the circular gear/foundry room)
# '5': Defias Gunpowder (above the hallway to cove)
# '6': Cove/Ship (in the large cove area)
