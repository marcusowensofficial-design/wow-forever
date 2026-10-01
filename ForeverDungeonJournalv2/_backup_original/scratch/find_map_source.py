import os, re

for root, dirs, files in os.walk('../AtlasLootClassic_DungeonsAndRaids'):
    for f in files:
        if f.endswith('.lua'):
            with open(os.path.join(root, f), 'r', encoding='utf-8', errors='ignore') as fp:
                c = fp.read()
                if 'deadmines' in c.lower() and ('map' in c.lower() or 'settexture' in c.lower()):
                    print('Match in', f)
                    for line in c.splitlines():
                        if any(k in line.lower() for k in ['texture', 'map', 'deadmines']):
                            print('  ', line[:100])
