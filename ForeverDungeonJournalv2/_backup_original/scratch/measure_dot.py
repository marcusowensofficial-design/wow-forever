from PIL import Image
import numpy as np

img = Image.open(r"C:\Users\marco\.gemini\antigravity-ide\brain\9edd333d-9ffe-4b77-b648-3540c59cfa01\.user_uploaded\media_1790808231648.png").convert("RGBA")
w, h = img.size
print(f"Screenshot size: width={w}, height={h}")

arr = np.array(img)
# Blue dot: B > 180, R < 100, G < 150
# Specifically find the circular dot around x=480..520, y=60..100
dot_pixels = []
for y in range(60, 100):
    for x in range(480, 520):
        r, g, b, a = arr[y, x]
        if b > 180 and r < 100 and g < 150:
            dot_pixels.append((x, y))

xs = [p[0] for p in dot_pixels]
ys = [p[1] for p in dot_pixels]
print(f"Dot pixel count: {len(dot_pixels)}")
min_x, max_x = min(xs), max(xs)
min_y, max_y = min(ys), max(ys)
mean_x = sum(xs) / len(xs)
mean_y = sum(ys) / len(ys)
print(f"X bounds: {min_x} to {max_x}, center X: {mean_x:.2f} (midpoint {(min_x+max_x)/2})")
print(f"Y bounds: {min_y} to {max_y}, center Y: {mean_y:.2f} (midpoint {(min_y+max_y)/2})")
print(f"Normalized coords: x = {mean_x / w:.4f}, y = {mean_y / h:.4f}")
print(f"Midpoint normalized coords: x = {((min_x+max_x)/2) / w:.4f}, y = {((min_y+max_y)/2) / h:.4f}")
