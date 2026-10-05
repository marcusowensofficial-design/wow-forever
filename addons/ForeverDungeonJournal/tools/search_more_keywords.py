#!/usr/bin/env python3
import re

with open('tools/cached_wowhead_items.html', 'r', encoding='utf-8') as f:
    text = f.read()

keywords = [
    'Wetlands', 'Excavation', 'Dalaran', 'Highland', 'Saltspine', 'Shadetooth',
    'Relic', 'Atrexis', 'Archmage', 'Thermaplugg', 'Kraul', 'Charlga', 'Scarlet',
    'Boar Signet', 'Blueprint', 'Manual', 'Recipe', 'Pattern', 'Schematic'
]

for word in keywords:
    matches = re.findall(r'"id":(\d+)[^}]*?"name":"([^"]*' + word + r'[^"]*)"', text, re.IGNORECASE)
    if matches:
        print(f"[{word}] ({len(matches)} items):")
        for m in sorted(set(matches), key=lambda x: int(x[0])):
            print(f"   ID: {m[0]} -> {m[1]}")
