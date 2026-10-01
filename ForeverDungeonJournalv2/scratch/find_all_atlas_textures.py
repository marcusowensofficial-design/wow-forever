import os

search_dirs = [
    '../AtlasLootClassic',
    '../AtlasLootClassic_DungeonsAndRaids',
    '../AtlasLootClassic_Data',
]

for d in search_dirs:
    if not os.path.exists(d):
        continue
    for root, dirs, files in os.walk(d):
        for f in files:
            if f.endswith(('.tga', '.blp', '.png', '.jpg')):
                print(os.path.join(root, f))
