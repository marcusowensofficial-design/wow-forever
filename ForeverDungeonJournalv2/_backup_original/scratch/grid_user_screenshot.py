from PIL import Image
import numpy as np

# Load user screenshot 1
im = Image.open(r'C:\Users\marco\.gemini\antigravity-ide\brain\ccb6473a-aaa8-4aec-977b-885f743cf81a\.user_uploaded\media_1790808834188.png').convert('RGB')
w, h = im.size
print(f"User screenshot 1 size: {w}x{h}")

# Let's save a grid image of user screenshot 1 to easily read pixel coords
from PIL import ImageDraw

grid_im = im.copy()
draw = ImageDraw.Draw(grid_im)

# Grid every 50 pixels
for x in range(0, w, 50):
    draw.line([(x, 0), (x, h)], fill=(120, 120, 120), width=1)
    draw.text((x + 2, 2), str(x), fill=(255, 255, 0))

for y in range(0, h, 50):
    draw.line([(0, y), (w, y)], fill=(120, 120, 120), width=1)
    draw.text((2, y + 2), str(y), fill=(255, 255, 0))

grid_im.save('scratch/stockade_user_grid.png')
print("Saved scratch/stockade_user_grid.png")
