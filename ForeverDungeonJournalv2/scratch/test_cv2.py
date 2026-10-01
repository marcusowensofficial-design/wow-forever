import os
from PIL import Image, ImageFilter
import numpy as np
import cv2

uploaded_dir = r"C:\Users\marco\.gemini\antigravity-ide\brain\bdaed8ea-236c-4f36-aa5c-89ff8320d168\.user_uploaded"

# Check if cv2 is available
try:
    import cv2
    has_cv2 = True
except ImportError:
    has_cv2 = False
print("has cv2:", has_cv2)
