from PIL import Image

with Image.open("Media/HallOfThanes.tga") as img:
    print(f"HallOfThanes.tga: size={img.size}, mode={img.mode}, format={img.format}")

with Image.open("Media/RuinsOfLordaeron.tga") as img:
    print(f"RuinsOfLordaeron.tga: size={img.size}, mode={img.mode}, format={img.format}")
