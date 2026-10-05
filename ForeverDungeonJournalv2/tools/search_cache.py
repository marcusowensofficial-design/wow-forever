with open('tools/cached_wowhead_items.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re

for word in ['Thanes', 'Anvilmar', 'Dirgehammer', 'Magmatus', 'Plunder', 'Lordaeron', 'Ragefire', 'Kraul', 'Razorfen', 'Trogg', 'Quilboar', 'Rotmender', 'Dark Iron', 'Baron']:
    matches = re.findall(r'"id":(\d+)[^}]*?"name":"([^"]*' + word + r'[^"]*)"', text, re.IGNORECASE)
    if matches:
        print(f"{word}: {set(matches)}")
