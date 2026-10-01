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
    
    // Look for id: 'drops'
    const dropsIdx = html.indexOf("id: 'drops'");
    const dropsIdx2 = html.indexOf('id: "drops"');
    const idx = dropsIdx !== -1 ? dropsIdx : dropsIdx2;
    
    if (idx === -1) {
        console.log(`No 'drops' listview found for ${name} (${npcid})`);
        results[name] = [];
        continue;
    }
    
    // Find data: [ ... ]
    const dataIdx = html.indexOf('data: [', idx);
    if (dataIdx === -1) {
        console.log(`No 'data: [' found after drops for ${name}`);
        results[name] = [];
        continue;
    }
    
    const start = dataIdx + 'data: '.length;
    let openBrackets = 0;
    let end = start;
    for (let i = start; i < html.length; i++) {
        if (html[i] === '[') openBrackets++;
        else if (html[i] === ']') {
            openBrackets--;
            if (openBrackets === 0) {
                end = i + 1;
                break;
            }
        }
    }
    
    try {
        const jsCode = '(' + html.substring(start, end) + ')';
        const items = eval(jsCode);
        results[name] = items;
        console.log(`Parsed ${items.length} drop items for ${name}`);
    } catch (e) {
        console.error(`Error parsing drops for ${name}: ${e.message}`);
        results[name] = [];
    }
}

fs.writeFileSync('scratch/stockade_boss_drops.json', JSON.stringify(results, null, 2));
console.log('Saved scratch/stockade_boss_drops.json');
