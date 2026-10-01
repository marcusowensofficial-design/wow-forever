from PIL import Image
import numpy as np

im = Image.open('scratch_rfc.jpg').crop((0, 0, 1008, 672))
w, h = im.size
print(f"RFC parchment size: {w}x{h}")

# The four bosses in Ragefire Chasm:
# 1. Oggleflint (Trogg chief, near the beginning/upper right)
# 2. Taragaman the Hungerer (Demon in the center lava pit)
# 3. Jergosh the Invoker (Warlock in the lower path)
# 4. Bazzalan (Satyr at the end of the lower cave)

# Let's inspect coordinates of the rooms in RFC
# Center room (Taragaman) is around center
# Let's search around known relative areas:
# In the original 1008x672 image:
# Where are the tunnels?
