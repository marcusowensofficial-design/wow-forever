const fs = require('fs');

const npcs = {
    "Targorr the Dread": 1696,
    "Kam Deepfury": 1666,
    "Hamhock": 1716,
    "Bazil Thredd": 1665,
    "Dextren Ward": 1663,
    "Bruegal Ironknuckle": 1720,
};

const results = {};

for (const [name, npcid] of Object.entries(npcs)) {
    const html = fs.readFileSync(`scratch/npc_${npcid}.html`, 'utf8');
    
    // Find "new Listview" that contains id: 'drops'
    const match = html.match(/new Listview\(\{template:\s*['"]item['"],\s*id:\s*['"]drops['"][\s\S]*?data:\s*(\[[\s\S]*?\])\s*\}\);/);
    if (!match) {
        console.log(`No exact match for ${name}`);
        continue;
    }
    
    try {
        const items = eval('(' + match[1] + ')');
        results[name] = items;
        console.log(`SUCCESS: ${name} (${npcid}) -> ${items.length} items`);
    } catch (e) {
        console.error(`Error eval for ${name}:`, e.message);
    }
}

fs.writeFileSync('scratch/exact_boss_drops.json', JSON.stringify(results, null, 2));
