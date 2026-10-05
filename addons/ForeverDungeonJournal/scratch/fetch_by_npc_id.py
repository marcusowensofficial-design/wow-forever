import urllib.request
import re
import json

npc_map = {
    # Wailing Caverns
    3669: "Lord Cobrahn",
    3671: "Lady Anacondra",
    3653: "Kresh",
    3670: "Lord Pythas",
    3674: "Skum",
    3673: "Lord Serpentis",
    5775: "Verdan the Everliving",
    3654: "Mutanus the Devourer",
    5912: "Deviate Faerie Dragon",

    # Deadmines
    644: "Rhahk'Zor",
    3586: "Miner Johnson",
    642: "Sneed's Shredder",
    646: "Mr. Smite",
    647: "Captain Greenskin",
    639: "Edwin VanCleef",
    645: "Cookie",

    # Blackfathom Deeps
    4887: "Ghamoo-ra",
    4831: "Lady Sarevess",
    6243: "Gelihast",
    12902: "Lorgus Jett",
    12876: "Baron Aquanis",
    4830: "Old Serra'kis",
    4832: "Twilight Lord Kelris",
    4829: "Aku'mai",

    # Stockade
    1696: "Targorr the Dread",
    1666: "Kam Deepfury",
    1717: "Hamhock",
    1663: "Dextren Ward",
    1716: "Bazil Thredd",
    1720: "Bruegal Ironknuckle",

    # Shadowfang Keep
    3914: "Rethilgore",
    3886: "Razorclaw the Butcher",
    3887: "Baron Silverlaine",
    4278: "Commander Springvale",
    4279: "Odo the Blindwatcher",
    3872: "Deathsworn Captain",
    4274: "Fenrus the Devourer",
    3927: "Wolf Master Nandos",
    4275: "Archmage Arugal",

    # Gnomeregan
    7079: "Viscous Fallout",
    7316: "Grubbis",
    6235: "Electrocutioner 6000",
    6229: "Crowd Pummeler 9-60",
    7800: "Mekgineer Thermaplugg",
    7078: "Dark Iron Ambassador",

    # Razorfen Kraul
    4421: "Charlga Razorflank",
    4420: "Overlord Ramtusk",
    4422: "Agathelos the Raging",
    4425: "Blind Hunter",
    4424: "Aggem Thorncurse",
    4428: "Death Speaker Jargba",
    4426: "Earthcaller Halmgar",
    4438: "Roogug",

    # Scarlet Monastery Graveyard
    3983: "Interrogator Vishas",
    6487: "Azshir the Sleepless",
    6488: "Fallen Champion",
    6489: "Ironspine",
    4543: "Bloodmage Thalnos",
}

results = {}

for nid, name in npc_map.items():
    url = f"https://classicdb.ch/?npc={nid}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=6) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            spells = []
            for m in re.finditer(r'_\[(\d+)\]=\{icon:\'([^\']*)\',name_enus:\'([^\']+)\'\}', html):
                sid = int(m.group(1))
                icon = m.group(2)
                sname = m.group(3)
                if not icon.startswith('INV_'):
                    spells.append({'id': sid, 'name': sname, 'icon': icon})
            results[name] = spells
            print(f"[{name} (#{nid})]: {len(spells)} spells")
            for s in spells:
                print(f"   Spell {s['id']}: {s['name']} (Icon: {s['icon']})")
    except Exception as e:
        print(f"[{name} (#{nid})]: Error {e}")

with open('scratch/classic_boss_spells.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)
