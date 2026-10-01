with open(r'C:\Users\marco\.gemini\antigravity-ide\brain\a712447b-4385-49bd-95fe-a7188b5419d0\.system_generated\steps\115\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

import re
imgs = re.findall(r'uploads/[^\s\"\'\<\>]+\.(?:jpg|png|jpeg)', text)
print(f"Total images found: {len(imgs)}")
for img in sorted(set(imgs)):
    print(img)
