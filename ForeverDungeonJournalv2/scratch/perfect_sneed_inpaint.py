import cv2
import numpy as np
from PIL import Image

# Let's inspect the red circle in Sneed's room on the original user screenshot
im = Image.open('scratch/user_atlas_deadmines.png').convert('RGB')
arr = np.array(im)

# Sneed is centered at (199, 401)
# Let's crop a 60x60 around Sneed
crop = arr[370:430, 170:230]

# Find all red circle pixels
# Red circle has prominent red: R > 100 and R > G * 1.3 and R > B * 1.3
# Also the number 3 inside is at (199, 401)
# We can create a circular mask of radius 18 around (199-170, 401-370) = (29, 31)
mask = np.zeros(crop.shape[:2], dtype=np.uint8)

# The red ring is a circle of radius ~15 to 19, thickness ~3
# And the number 3 is in the center
# So masking the circle and interior: radius 19 from center (29, 31) covers the entire selection circle and number 3!
cv2.circle(mask, (29, 31), 19, 255, -1)

# Inpaint using Telea and NS with radius 5
inpainted_telea = cv2.inpaint(crop, mask, 5, cv2.INPAINT_TELEA)
inpainted_ns = cv2.inpaint(crop, mask, 5, cv2.INPAINT_NS)

Image.fromarray(inpainted_telea).save('scratch/sneed_telea.png')
Image.fromarray(inpainted_ns).save('scratch/sneed_ns.png')

print("Saved sneed_telea.png and sneed_ns.png")
