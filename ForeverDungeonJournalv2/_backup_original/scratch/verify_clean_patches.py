import cv2
import glob

files = glob.glob("scratch/clean_check_*_after.png")
for f in files:
    im = cv2.imread(f)
    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    print(f"{f}: max_gray={gray.max()}, min_gray={gray.min()}, mean={gray.mean():.1f}")
