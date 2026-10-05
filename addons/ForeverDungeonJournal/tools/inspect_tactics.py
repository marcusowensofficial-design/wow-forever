#!/usr/bin/env python3
import os
import re

with open('Data/BossTactics.lua', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'FDJ\.BossTactics\["([^"]+)"\]', text)
if not matches:
    matches = re.findall(r'\["([^"]+)"\]\s*=\s*\{', text)

print(f"Dungeons in BossTactics.lua ({len(matches)}):")
for m in matches:
    print(f"  - {m}")
