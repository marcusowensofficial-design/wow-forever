import os
import re

for d in os.listdir('..'):
    p = os.path.join('..', d)
    if not os.path.isdir(p):
        continue
    for root, dirs, files in os.walk(p):
        for f in files:
            if f.endswith('.lua'):
                full_path = os.path.join(root, f)
                try:
                    with open(full_path, 'r', encoding='utf-8', errors='ignore') as fp:
                        content = fp.read()
                        if 'deadmines' in content.lower():
                            matches = re.findall(r'"([^"]*Deadmines[^"]*)"', content, re.I)
                            if matches:
                                print(f"{f}: {matches}")
                except Exception as e:
                    pass
