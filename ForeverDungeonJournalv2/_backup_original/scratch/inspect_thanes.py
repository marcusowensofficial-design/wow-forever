import os
from PIL import Image

uploaded_dir = r"C:\Users\marco\.gemini\antigravity-ide\brain\bdaed8ea-236c-4f36-aa5c-89ff8320d168\.user_uploaded"
img2 = Image.open(os.path.join(uploaded_dir, "media_1790787794294.jpg")) # 445x506
print("Hall of Thanes size:", img2.size)
