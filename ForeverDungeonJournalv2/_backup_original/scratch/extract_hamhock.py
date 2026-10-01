import json
import re

with open('scratch/npc_1717_hamhock.html', 'r', encoding='utf-8') as f:
    html = f.read()

m = re.search(r'new Listview\(\{template:\s*[\'"]item[\'"],\s*id:\s*[\'"]drops[\'"].*?data:\s*(\[.*?\])\s*\}\);', html, re.DOTALL)
if m:
    # write to temp json
    with open('scratch/hamhock_raw.js', 'w', encoding='utf-8') as f_out:
        f_out.write('const fs = require("fs"); const data = ' + m.group(1) + '; console.log(JSON.stringify(data.slice(0, 15)));')
