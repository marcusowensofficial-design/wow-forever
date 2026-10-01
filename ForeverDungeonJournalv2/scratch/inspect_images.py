import os
from PIL import Image

uploaded_dir = r"C:\Users\marco\.gemini\antigravity-ide\brain\bdaed8ea-236c-4f36-aa5c-89ff8320d168\.user_uploaded"
files = os.listdir(uploaded_dir)
print("Files in .user_uploaded:")
for f in files:
    path = os.path.join(uploaded_dir, f)
    try:
        with Image.open(path) as img:
            print(f"- {f}: format={img.format}, size={img.size}, mode={img.mode}")
    except Exception as e:
        print(f"- {f}: error {e}")
