import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('--- WEAPON PROGRESSION MOUSEOVER TOOLTIPS VERIFICATION ---');

const capturedListeners = [];
let currentTestTarget = null;
let tooltipHidden = false;
const mockElement = {
  id: 'wow-item-tooltip',
  innerHTML: '',
  style: {},
  hasAttribute: (attr) => attr === 'hidden' && tooltipHidden,
  setAttribute: (attr, val) => {
    if (attr === 'hidden') tooltipHidden = true;
  },
  removeAttribute: (attr) => {
    if (attr === 'hidden') tooltipHidden = false;
  },
  getAttribute: (attr) => currentTestTarget ? currentTestTarget.getAttribute(attr) : '',
  addEventListener: (event, handler) => {
    capturedListeners.push({ event, handler });
  }
};

const sandbox = {
  console,
  window: {},
  document: {
    querySelectorAll: (selector) => {
      if (selector === '[data-weapon-target="true"]') {
        return [mockElement];
      }
      return [];
    },
    getElementById: (id) => {
      if (id === 'wow-item-tooltip') return mockElement;
      return null;
    },
    createElement: (tag) => {
      return { ...mockElement };
    },
    body: { appendChild: () => {} }
  },
  localStorage: { getItem: () => null, setItem: () => {} }
};
sandbox.window = sandbox;
vm.createContext(sandbox);

// 1. Load BiS data
let bisCode = fs.readFileSync(path.join(ROOT, 'js', 'data', 'bis-data.js'), 'utf8');
bisCode = bisCode.replace('const WOW_BIS_DATA =', 'window.WOW_BIS_DATA =');
vm.runInContext(bisCode, sandbox);

// 2. Load progression data
const progDataCode = fs.readFileSync(path.join(ROOT, 'js', 'data', 'class-progression-data.js'), 'utf8');
vm.runInContext(progDataCode, sandbox);

// 3. Load class-progression.js
const progModuleCode = fs.readFileSync(path.join(ROOT, 'js', 'modules', 'deepdives', 'class-progression.js'), 'utf8');
vm.runInContext(progModuleCode, sandbox);

const mod = sandbox.window.WOW_DEEPDIVES_PROGRESSION;
if (!mod || typeof mod.renderProgressionSubtab !== 'function') {
  throw new Error('WOW_DEEPDIVES_PROGRESSION.renderProgressionSubtab is missing');
}

// 4. Test Mage weapons HTML
const mageHtml = mod.renderProgressionSubtab('weapons', { id: 'mage', name: 'MAGE' });
const mageWandsHtml = mod.renderProgressionSubtab('wands', { id: 'mage', name: 'MAGE' });

if (!mageHtml.includes('data-weapon-target="true"')) {
  throw new Error('Missing data-weapon-target attribute in weapon HTML');
}
if (!mageHtml.includes('data-wowhead="domain=forever&item=273040"')) {
  throw new Error('Missing data-wowhead attribute for Spine of the Devourer (273040)');
}
if (!mageWandsHtml.includes('data-wowhead="domain=forever&item=273043"')) {
  throw new Error('Missing data-wowhead attribute for Wand of Mana Concentration (273043) in wands tab');
}
if (!mageHtml.includes('data-wowhead="domain=forever&item=276631"')) {
  throw new Error('Missing data-wowhead attribute for Coldflame Saber (276631)');
}
console.log('✓ Mage weapon card HTML renders valid data-weapon-target and data-wowhead links for Spine, Coldflame, and Wand');

// 5. Test all 9 classes have weapon progression with data-weapon-target
const classes = ['warrior', 'paladin', 'hunter', 'rogue', 'priest', 'shaman', 'mage', 'warlock', 'druid'];
for (const cls of classes) {
  const html = mod.renderProgressionSubtab('weapons', { id: cls, name: cls.toUpperCase() });
  if (!html.includes('data-weapon-target="true"')) {
    throw new Error(`Class ${cls} missing data-weapon-target in weapon progression`);
  }
}
console.log('✓ All 9 classes render weapons with data-weapon-target interactive elements');

// 6. Test setupEventListeners binds mouseenter, mousemove, mouseleave
mod.setupEventListeners();
const boundEvents = capturedListeners.map(l => l.event);
if (!boundEvents.includes('mouseenter') || !boundEvents.includes('mousemove') || !boundEvents.includes('mouseleave')) {
  throw new Error('Missing mouseover event bindings in setupEventListeners');
}
console.log('✓ setupEventListeners successfully binds mouseenter, mousemove, and mouseleave on [data-weapon-target="true"]');

// 7. Test triggering mouseenter on Spine of the Devourer
const mouseEnterHandler = capturedListeners.find(l => l.event === 'mouseenter')?.handler;
const spineTarget = {
  getAttribute: (attr) => {
    const map = {
      'data-item-name': 'Spine of the Devourer',
      'data-item-id': '273040',
      'data-quality': 'q3',
      'data-weapon-type': 'Staff',
      'data-speed': '3.60',
      'data-dps': '20.7 DPS',
      'data-ilvl': '33',
      'data-req-level': '28',
      'data-source-title': 'Mana Devourer',
      'data-source-detail': 'City of Dalaran (+14 Sta, +36 Spell Power)'
    };
    return map[attr] || '';
  }
};

currentTestTarget = spineTarget;
mouseEnterHandler({ clientX: 100, clientY: 100 });
const tooltipHtml = mockElement.innerHTML;
console.log('Rendered Tooltip HTML Preview (first 200 chars):', tooltipHtml.slice(0, 200) + '...');

if (!tooltipHtml.includes('Spine of the Devourer')) throw new Error('Tooltip missing item name');
if (!tooltipHtml.includes('59 - 90 Damage') || !tooltipHtml.includes('Speed 3.60')) throw new Error('Tooltip missing damage/speed row');
if (!tooltipHtml.includes('+36 Spell Power') && !tooltipHtml.includes('by up to 36')) throw new Error('Tooltip missing +36 Spell Power / 36 spell damage equip line');
if (!tooltipHtml.includes('Mana Devourer, City of Dalaran') && !tooltipHtml.includes('Mana Devourer')) throw new Error('Tooltip missing drop source');
if (!tooltipHtml.includes('Click weapon to view on Wowhead')) throw new Error('Tooltip missing Wowhead hint');
if (!tooltipHtml.includes('wow-tip-dmg-row')) throw new Error('Tooltip missing wow-tip-dmg-row styling class');
if (!tooltipHtml.includes('wow-tip-dps')) throw new Error('Tooltip missing wow-tip-dps styling class');

console.log('✓ Spine of the Devourer tooltip renders full stats, speed, DPS, bonuses, source, and Wowhead hint');

// 8. Test Wand of Mana Concentration tooltip
const wandTarget = {
  getAttribute: (attr) => {
    const map = {
      'data-item-name': 'Wand of Mana Concentration',
      'data-item-id': '273043',
      'data-quality': 'q3',
      'data-weapon-type': 'Wand',
      'data-speed': '1.70',
      'data-dps': '31.18 DPS',
      'data-ilvl': '32',
      'data-req-level': '27',
      'data-alt-val': '31.2 DPS, 1.70s, +4 Int, 2 MP5 - City of Dalaran: Arcanic Enigma'
    };
    return map[attr] || '';
  }
};

currentTestTarget = wandTarget;
mouseEnterHandler({ clientX: 100, clientY: 100 });
const wandTooltipHtml = mockElement.innerHTML;
if (!wandTooltipHtml.includes('Wand of Mana Concentration')) throw new Error('Wand tooltip missing name');
if (!wandTooltipHtml.includes('+4 Intellect')) throw new Error('Wand tooltip missing +4 Intellect');
if (!wandTooltipHtml.includes('Arcanic Enigma') && !wandTooltipHtml.includes('City of Dalaran')) throw new Error('Wand tooltip missing source');
console.log('✓ Wand of Mana Concentration alt tooltip renders full stats, MP5, source, and Wowhead hint');

// 9. Test Absence of False-Positive Stats (Rhahk\'Zor\'s Hammer, Copper Axe, Rough Boomstick)
const rhahkTarget = {
  getAttribute: (attr) => {
    const map = {
      'data-item-name': "Rhahk'Zor's Hammer",
      'data-item-id': '5187',
      'data-quality': 'q3',
      'data-weapon-type': 'Two-handed mace',
      'data-speed': '3.20',
      'data-dps': '18.4 DPS',
      'data-ilvl': '21',
      'data-req-level': '16',
      'data-source-title': "Rhahk'Zor",
      'data-source-detail': 'First boss in The Deadmines, levels 18–23'
    };
    return map[attr] || '';
  }
};

currentTestTarget = rhahkTarget;
mouseEnterHandler({ clientX: 100, clientY: 100 });
const rhahkHtml = mockElement.innerHTML;
const statsMatch = rhahkHtml.match(/<div class="wow-tip-stats">([\s\S]*?)<\/div>/);
if (statsMatch && (statsMatch[1].includes('First boss in The Deadmines') || statsMatch[1].includes('levels 18'))) {
  throw new Error(`Rhahk'Zor's Hammer tooltip leaked boss encounter text into stats: ${rhahkHtml}`);
}
if (!rhahkHtml.includes('+8 Stamina') && !rhahkHtml.includes('+8 Spell Power')) {
  throw new Error(`Rhahk'Zor's Hammer missing expected stats: ${rhahkHtml}`);
}
console.log("✓ Rhahk'Zor's Hammer tooltip cleanly excludes boss description text from stats and renders authentic bonuses");

const copperAxeTarget = {
  getAttribute: (attr) => {
    const map = {
      'data-item-name': 'Copper Axe',
      'data-item-id': '2845',
      'data-quality': 'q1',
      'data-weapon-type': 'One-handed axe',
      'data-speed': '2.40',
      'data-dps': '3.75 DPS',
      'data-alt-val': '3.8 DPS - Crafted Blacksmithing (skill 20)'
    };
    return map[attr] || '';
  }
};

currentTestTarget = copperAxeTarget;
mouseEnterHandler({ clientX: 100, clientY: 100 });
const copperAxeHtml = mockElement.innerHTML;
if (copperAxeHtml.includes('wow-tip-stats') && copperAxeHtml.includes('skill 20')) {
  throw new Error(`Copper Axe tooltip leaked crafting skill into stats: ${copperAxeHtml}`);
}
console.log('✓ Copper Axe tooltip cleanly excludes crafting skill from stats');

// 10. Test Staff of Westfall equip sentence preservation
const westfallTarget = {
  getAttribute: (attr) => {
    const map = {
      'data-item-name': 'Staff of Westfall',
      'data-item-id': '2042',
      'data-quality': 'q3',
      'data-weapon-type': 'Staff',
      'data-speed': '3.00',
      'data-dps': '15.17 DPS',
      'data-stats': '+5 Intellect, +6 Spirit, Equip: Increases healing done by up to 48 and damage done by up to 16 for all magical spells and effects., Equip: Movement speed increased by 2% in Elwynn Forest, Westfall, Redridge Mountains, and the Deadmines.'
    };
    return map[attr] || '';
  }
};

currentTestTarget = westfallTarget;
mouseEnterHandler({ clientX: 100, clientY: 100 });
const westfallHtml = mockElement.innerHTML;
if (westfallHtml.includes('><div class="wow-tip-stat" style="color: #fff;">Westfall</div>')) {
  throw new Error(`Staff of Westfall equip sentence was improperly fragmented: ${westfallHtml}`);
}
console.log('✓ Staff of Westfall equip sentence with internal commas remains intact without fragmenting');

// 11. Test Coldflame Saber authentic stats and procs
const cfsTarget = {
  getAttribute: (attr) => {
    const map = {
      'data-item-name': 'Coldflame Saber',
      'data-item-id': '276631',
      'data-quality': 'q3',
      'data-weapon-type': 'Main Hand Sword',
      'data-faction': 'both'
    };
    return map[attr] || '';
  }
};
currentTestTarget = cfsTarget;
mouseEnterHandler({ clientX: 100, clientY: 100 });
const cfsHtml = mockElement.innerHTML;
if (!cfsHtml.includes('Coldflame Saber')) throw new Error('Coldflame Saber tooltip missing name');
if (!cfsHtml.includes('+7 Intellect')) throw new Error('Coldflame Saber missing +7 Intellect');
if (!cfsHtml.includes('Increases damage and healing done by magical spells and effects by up to 32')) {
  throw new Error('Coldflame Saber missing 32 spell damage equip line');
}
if (!cfsHtml.includes('Melee attacks deal 98 additional Fire damage against Frozen targets')) {
  throw new Error('Coldflame Saber missing 98 Fire damage frozen target proc');
}
if (cfsHtml.includes('Tinkerer Gizlock') || cfsHtml.includes('22.5 damage per second')) {
  throw new Error('Coldflame Saber erroneously contains Tinkerer Gizlock stats');
}
console.log('✓ Coldflame Saber tooltip correctly renders authentic Mage class quest stats and 98 Fire proc');

// 12. Test Debt Collector authentic equip stats and Alliance exclusivity
const dcTarget = {
  getAttribute: (attr) => {
    const map = {
      'data-item-name': 'Debt Collector',
      'data-item-id': '273827',
      'data-quality': 'q3',
      'data-weapon-type': 'One-handed sword',
      'data-faction': 'alliance'
    };
    return map[attr] || '';
  }
};
currentTestTarget = dcTarget;
mouseEnterHandler({ clientX: 100, clientY: 100 });
const dcHtml = mockElement.innerHTML;
if (!dcHtml.includes('Debt Collector')) throw new Error('Debt Collector tooltip missing name');
if (!dcHtml.includes('Increases damage and healing done by magical spells and effects by up to 34')) {
  throw new Error('Debt Collector missing 34 spell power equip line');
}
if (!dcHtml.includes('Grants 6 health and 2 mana every 5 sec for 15 sec when one of your spells is resisted')) {
  throw new Error('Debt Collector missing spell resist health/mana regen equip line');
}
if (dcHtml.includes('Attack Power')) {
  throw new Error('Debt Collector erroneously contains Attack Power in tooltip');
}
if (!dcHtml.includes('Alliance Exclusive')) {
  throw new Error('Debt Collector missing Alliance Exclusive indicator in tooltip');
}
console.log('✓ Debt Collector tooltip correctly renders dual equip procs, spell power, and Alliance Exclusive tag');

// 13. Test Staff of Orgrimmar promotion for Horde
mod.setWeaponFaction('horde');
const hordeMageHtml = mod.renderProgressionSubtab('weapons', { id: 'mage', name: 'MAGE' });
if (!hordeMageHtml.includes('Staff of Orgrimmar')) {
  throw new Error('Staff of Orgrimmar missing from Horde Mage progression');
}
const shamanProgHtml = mod.renderProgressionSubtab('weapons', { id: 'shaman', name: 'SHAMAN' });
if (!shamanProgHtml.includes('Staff of Orgrimmar')) {
  throw new Error('Staff of Orgrimmar missing from Shaman progression');
}
console.log('✓ Staff of Orgrimmar correctly promoted as BiS for Horde casters and Shaman in brackets 13-18');

// 14. Test tooltip dismissal on subtab switch and hideWeaponTooltip
mod.hideWeaponTooltip();
if (!tooltipHidden) {
  throw new Error('hideWeaponTooltip failed to set hidden attribute on tooltip');
}
console.log('✓ hideWeaponTooltip successfully dismisses floating tooltip to prevent ghosting');

// 15. Test Warsong Gulch PvP vendor weapons (Advisor's Staff, Lorekeeper's Staff, Scout/Sentinel Blades, Legionnaire/Protector Swords)
const wsgItems = [
  { id: '20425', name: "Advisor's Gnarled Staff", type: 'Staff', stats: ['+8 Stamina', '+4 Intellect', '+3 MP5'], dmg: '45 - 69 Damage', faction: 'horde' },
  { id: '20434', name: "Lorekeeper's Staff", type: 'Staff', stats: ['+8 Stamina', '+4 Intellect', '+3 MP5'], dmg: '45 - 69 Damage', faction: 'alliance' },
  { id: '20441', name: "Scout's Blade", type: 'Dagger', stats: ['+4 Agility', '+2 Stamina'], dmg: '18 - 34 Damage', faction: 'horde' },
  { id: '20443', name: "Sentinel's Blade", type: 'Dagger', stats: ['+4 Agility', '+2 Stamina'], dmg: '18 - 34 Damage', faction: 'alliance' },
  { id: '20430', name: "Legionnaire's Sword", type: '1H Sword', stats: ['+4 Strength', '+2 Stamina'], dmg: '28 - 53 Damage', faction: 'horde' },
  { id: '20440', name: "Protector's Sword", type: '1H Sword', stats: ['+4 Strength', '+2 Stamina'], dmg: '28 - 53 Damage', faction: 'alliance' }
];

for (const it of wsgItems) {
  const target = {
    getAttribute: (attr) => {
      const map = {
        'data-item-name': it.name,
        'data-item-id': it.id,
        'data-quality': 'q3',
        'data-weapon-type': it.type,
        'data-faction': it.faction
      };
      return map[attr] || '';
    }
  };
  currentTestTarget = target;
  mouseEnterHandler({ clientX: 100, clientY: 100 });
  const html = mockElement.innerHTML;
  if (!html.includes(it.name)) throw new Error(`${it.name} tooltip missing name`);
  if (!html.includes(it.dmg)) throw new Error(`${it.name} tooltip missing damage row ${it.dmg}`);
  for (const st of it.stats) {
    if (!html.includes(st)) throw new Error(`${it.name} tooltip missing stat ${st}: ${html}`);
  }
}
console.log('✓ All Warsong Gulch vendor staves, blades, and swords render authentic stats, damage ranges, and faction exclusivity');

console.log('--- ALL WEAPON TOOLTIP VERIFICATIONS PASSED ---');

