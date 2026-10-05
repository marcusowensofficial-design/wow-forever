import re

with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    text = f.read()

items = re.findall(r'\{\s*(\d+)\s*,\s*"([^"]+)"', text)
forever_items = [(int(iid), name) for iid, name in items if int(iid) >= 200000]
forever_items.sort()

print(f"Total Forever items in Dungeons.lua: {len(forever_items)}")

# Group into ranges/clusters
clusters = []
cur_cluster = []
for iid, name in forever_items:
    if not cur_cluster:
        cur_cluster.append((iid, name))
    else:
        if iid - cur_cluster[-1][0] <= 15:
            cur_cluster.append((iid, name))
        else:
            clusters.append(cur_cluster)
            cur_cluster = [(iid, name)]
if cur_cluster:
    clusters.append(cur_cluster)

for c in clusters:
    print(f"\nCluster {c[0][0]} - {c[-1][0]} ({len(c)} items):")
    for iid, name in c:
        print(f"  [{iid}] {name}")
