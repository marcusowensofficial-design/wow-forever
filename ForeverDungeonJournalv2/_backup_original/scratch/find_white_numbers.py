from PIL import Image
import numpy as np

im = Image.open('scratch/user_atlas_deadmines.png')
w, h = im.size
arr = np.array(im)

# Let's inspect crops around each expected number location:
# '1': Rhahk'Zor room is to the left of the circular room, around x=100..150, y=280..320
# '2': Miner Johnson is above Rhahk'Zor/Sneed, around x=200..230, y=230..260
# '4': Gilnid is in the circular room center, around x=260..275, y=300..320
# '5': Defias Gunpowder is above the hallway to cove, around x=290..310, y=180..200
# '6': Cove/Ship is around x=420..445, y=170..190

# Let's crop 50x50 around each candidate and find the exact character!
candidates = {
    "num_1": (118, 298),
    "num_2": (222, 244),
    "num_4": (268, 307),
    "num_5": (298, 187),
    "num_6": (432, 178),
}

for name, (cx, cy) in candidates.items():
    crop = im.crop((cx - 25, cy - 25, cx + 25, cy + 25))
    crop.save(f'scratch/check_{name}.png')
    # find brightest white pixel in crop
    c_arr = np.array(crop)[:, :, :3]
    # white text has high R, G, B: e.g. R>180, G>180, B>180
    white_mask = (c_arr[:, :, 0] > 180) & (c_arr[:, :, 1] > 180) & (c_arr[:, :, 2] > 180)
    wy, wx = np.where(white_mask)
    if len(wx) > 0:
        actual_x = cx - 25 + wx.mean()
        actual_y = cy - 25 + wy.mean()
        print(f"{name}: found white text at x={actual_x:.1f}, y={actual_y:.1f}")
    else:
        print(f"{name}: no white text found near ({cx}, {cy})")
