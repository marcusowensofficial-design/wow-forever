import re

with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect Gnomeregan
gnomer_m = re.search(r'FDJ\.DB\["Gnomeregan"\]\s*=\s*\{.*?\n\}', text, re.DOTALL)
if gnomer_m:
    print("GNOMEREGAN:")
    print(gnomer_m.group(0)[:1500])
