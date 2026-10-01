from PIL import Image
import numpy as np

im = Image.open('scratch_rfc.jpg')
arr = np.array(im)
mask = arr.mean(axis=2) > 10
rows = np.where(mask.any(axis=1))[0]
cols = np.where(mask.any(axis=0))[0]
print('Original:', im.size)
print('Non-black bounding box:', cols[0], rows[0], cols[-1], rows[-1])
print('Cropped size:', cols[-1] - cols[0] + 1, rows[-1] - rows[0] + 1)
