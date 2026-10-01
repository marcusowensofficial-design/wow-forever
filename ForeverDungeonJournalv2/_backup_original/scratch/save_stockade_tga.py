from PIL import Image
import os

clean_map = Image.open("scratch/stockade_cleaned_preview.png").convert("RGB")
w, h = clean_map.size
print(f"Cleaned source map size: {w}x{h}")

# Upscale to 1024x1024 using Lanczos filter
tga_1024 = clean_map.resize((1024, 1024), Image.Resampling.LANCZOS)

target_tga = "Media/Maps/TheStockade_Map.tga"
tga_1024.save(target_tga)
print(f"Saved {target_tga}, file size={os.path.getsize(target_tga)} bytes")

# Verify by re-reading
verify = Image.open(target_tga)
print(f"Re-read verification: size={verify.size}, mode={verify.mode}")
