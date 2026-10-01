import cv2
import numpy as np

crop = cv2.imread("scratch/crop_1_and_6_west.png")
gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
# In this crop, regions was: (115, 175, 160, 225)
# Let's find all local peaks with brightness > 150
h, w = gray.shape

# Threshold for digit core
_, mask = cv2.threshold(gray, 140, 255, cv2.THRESH_BINARY)
num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(mask)
print(f"Connected components in 1_and_6_west: {num_labels}")
for i in range(1, num_labels):
    x, y, cw, ch, area = stats[i]
    cx, cy = centroids[i]
    print(f"Component {i}: local center=({cx:.1f}, {cy:.1f}), global=({115+cx:.1f}, {175+cy:.1f}) norm=({(115+cx)/540:.4f}, {(175+cy)/414:.4f}) area={area}")
