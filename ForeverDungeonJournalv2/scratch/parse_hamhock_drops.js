const fs = require('fs');

const html = fs.readFileSync('scratch/npc_1717_hamhock.html', 'utf8');
const match = html.match(/new Listview\(\{template:\s*['"]item['"],\s*id:\s*['"]drops['"][\s\S]*?data:\s*(\[[\s\S]*?\])\s*\}\);/);
if (match) {
    const items = eval('(' + match[1] + ')');
    console.log(`Hamhock (1717) has ${items.length} drops!`);
    items.sort((a,b) => (b.quality||0) - (a.quality||0) || (b.count||0) - (a.count||0));
    for (const it of items) {
        if ((it.quality || 0) >= 2 || it.slot > 0) {
            console.log(`  [${it.id}] Q:${it.quality} slot:${it.slot} class:${it.classs} name:'${it.name}' count:${it.count}`);
        }
    }
} else {
    console.log("No drops listview found for 1717");
}
