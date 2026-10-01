import re

with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all top-level keys under FDJ.DB
matches = re.findall(r'^\s*\["([^"]+)"\]\s*=\s*\{', text, re.M)
print('Dungeons in DB:', matches)

# For each dungeon, check boss names
for d in matches:
    # find bosses block
    m = re.search(r'\["' + re.escape(d) + r'"\]\s*=\s*\{.*?\nbosses\s*=\s*\{(.*?)\n\s*\},', text, re.DOTALL)
    if m:
        boss_block = m.group(1)
        bosses = re.findall(r'name\s*=\s*"([^"]+)"', boss_block)
        print(f'{d}: {len(bosses)} bosses: {bosses}')
    else:
        print(f'{d}: NO bosses block found!')
