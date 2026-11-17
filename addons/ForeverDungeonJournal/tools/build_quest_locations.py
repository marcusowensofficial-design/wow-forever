#!/usr/bin/env python3
"""Rebuild the WOWHEAD_QUEST_SPOTS table in Data/QuestLocations.lua.

Input: tools/wowhead_quest_spots.json, one entry per quest ID:
  {"<questID>": {"t": title, "p": [[point, type, id, name, zoneID, [x, y], coords|null, item|null], ...]}}
which is the map data ("new Mapper({...})") of each Wowhead Forever quest page
(https://www.wowhead.com/forever/quest=<id>), flattened. Only the table between
the BEGIN/END spots markers is rewritten; the code after it is hand-written.

Usage: python tools/build_quest_locations.py
"""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(HERE, "wowhead_quest_spots.json")
DST = os.path.join(ROOT, "Data", "QuestLocations.lua")

WORLD = {1:1426,3:1418,4:1419,8:1435,10:1431,11:1437,12:1429,14:1411,15:1445,16:1447,17:1413,28:1422,33:1434,36:1416,38:1432,40:1436,41:1430,44:1433,45:1417,46:1428,47:1425,51:1427,85:1420,130:1421,139:1423,141:1438,148:1439,215:1412,267:1424,331:1440,357:1444,361:1448,400:1441,405:1443,406:1442,440:1446,490:1449,493:1450,618:1452,1377:1451,1497:1458,1519:1453,1537:1455,1637:1454,1638:1456,1657:1457,16591:2548}

ZN={1:"Dun Morogh",3:"Badlands",4:"Blasted Lands",8:"Swamp of Sorrows",10:"Duskwood",11:"Wetlands",12:"Elwynn Forest",14:"Durotar",15:"Dustwallow Marsh",16:"Azshara",17:"The Barrens",28:"Western Plaguelands",33:"Stranglethorn Vale",36:"Alterac Mountains",38:"Loch Modan",40:"Westfall",41:"Deadwind Pass",44:"Redridge Mountains",45:"Arathi Highlands",46:"Burning Steppes",47:"The Hinterlands",51:"Searing Gorge",85:"Tirisfal Glades",130:"Silverpine Forest",139:"Eastern Plaguelands",141:"Teldrassil",148:"Darkshore",215:"Mulgore",267:"Hillsbrad Foothills",331:"Ashenvale",357:"Feralas",361:"Felwood",400:"Thousand Needles",405:"Desolace",406:"Stonetalon Mountains",440:"Tanaris",490:"Un'Goro Crater",493:"Moonglade",618:"Winterspring",1377:"Silithus",1497:"Undercity",1519:"Stormwind",1537:"Ironforge",1637:"Orgrimmar",1638:"Thunder Bluff",1657:"Darnassus",16591:"Riverglades",
 209:"Shadowfang Keep",491:"Razorfen Kraul",717:"The Stockade",718:"Wailing Caverns",719:"Blackfathom Deeps",721:"Gnomeregan",722:"Razorfen Downs",796:"Scarlet Monastery",1176:"Zul'Farrak",1337:"Uldaman",1477:"the Sunken Temple",1497:"Undercity",1581:"The Deadmines",1584:"Blackrock Depths",1583:"Blackrock Spire",2017:"Stratholme",2057:"Scholomance",2100:"Maraudon",2557:"Dire Maul",2437:"Ragefire Chasm",16550:"The Drowned City",16611:"Ruins of Lordaeron",16620:"Alcaz Prison",16651:"Shen'dralas",16732:"Excavation Site: Wetlands",16919:"Old Ironforge"}
data=json.load(open(SRC, encoding='utf-8'))
def lua(s): return '"'+str(s).replace('\\','\\\\').replace('"','\\"')+'"'
def fmt(c): return "%.1f, %.1f"%(c[0],c[1])
def spot(p):
    pt,t,id_,name,zid,c,cs,it=p
    if zid not in WORLD or not c: return None
    zone=ZN.get(zid,"")
    s={'mapID':WORLD[zid],'x':round(c[0]/100,3),'y':round(c[1]/100,3),'label':f"{name} — {zone}",'zone':zone,'name':name,'type':t}
    if t==1: s['targetName']=name
    if cs: s['alt']=[[round(a[0]/100,3),round(a[1]/100,3)] for a in cs if abs(a[0]-c[0])+abs(a[1]-c[1])>1.0][:5]
    if it: s['item']=it
    return s
out={}
for qid,q in data.items():
    rec={'title':q['t'],'start':None,'finish':None,'obj':[],'inside':[]}
    for p in q['p']:
        pt=p[0]; s=spot(p)
        if pt=='start' and rec['start'] is None and p[1] in (1,2):
            if s: rec['start']=s
            elif p[4] not in WORLD: rec['startInside']=ZN.get(p[4],"")
        elif pt=='end' and rec['finish'] is None and p[1] in (1,2):
            if s: rec['finish']=s
            elif p[4] not in WORLD: rec['endInside']=ZN.get(p[4],"")
        elif pt not in ('start','end'):
            if s: rec['obj'].append(s)
            elif p[4] not in WORLD:
                nm=ZN.get(p[4],"");
                if nm and nm not in rec['inside']: rec['inside'].append(nm)
    out[int(qid)]=rec

def S(s):
    if not s: return 'nil'
    parts=[f"mapID = {s['mapID']}", f"x = {s['x']}", f"y = {s['y']}", f"label = {lua(s['label'])}"]
    if s.get('targetName'): parts.append(f"targetName = {lua(s['targetName'])}")
    det=f"{s['name']}: {s['zone']} ({fmt([s['x']*100,s['y']*100])})"
    if s.get('alt'): det+="; also at "+", ".join("(%s)"%fmt([a[0]*100,a[1]*100]) for a in s['alt'])
    parts.append(f"detail = {lua(det)}")
    if s.get('alt'): parts.append(f"spawns = {len(s['alt'])+1}")
    return "{ "+", ".join(parts)+" }"
L=[]
for qid in sorted(out):
    r=out[qid]
    items=[f"title = {lua(r['title'])}"]
    if r['start']: items.append("start = "+S(r['start']))
    if r.get('startInside'): items.append("startInside = "+lua(r['startInside']))
    if r['finish']: items.append("finish = "+S(r['finish']))
    if r.get('endInside'): items.append("finishInside = "+lua(r['endInside']))
    if r['obj']:
        objs=[]
        for o in r['obj'][:6]:
            x=S(o)[:-2]
            if o.get('item'): x+=f", item = {lua(o['item'])}"
            objs.append(x+" }")
        items.append("objectives = { "+", ".join(objs)+" }")
    if r['inside']: items.append("inside = { "+", ".join(lua(i) for i in r['inside'])+" }")
    L.append(f"    [{qid}] = {{ "+", ".join(items)+" },")
text=open(DST, encoding='utf-8').read()
a=text.index("-- BEGIN spots table\n")+len("-- BEGIN spots table\n")
b=text.index("-- END spots table")
open(DST,'w',encoding='utf-8',newline='\n').write(text[:a]+"\n".join(L)+"\n"+text[b:])
print(len(out),'quests;', sum(1 for r in out.values() if r['start']),'starts', sum(1 for r in out.values() if r['finish']),'ends', sum(1 for r in out.values() if r['obj']),'with world objectives')
