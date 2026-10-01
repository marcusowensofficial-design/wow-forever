import urllib.request

req = urllib.request.Request('https://www.wowhead.com/forever/npc=1717', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
    with open('scratch/npc_1717_hamhock.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Saved scratch/npc_1717_hamhock.html, length:", len(html))
except Exception as e:
    print("Error:", e)
