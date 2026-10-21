import fs from 'node:fs';

const d = JSON.parse(fs.readFileSync('data/scraped/forever_weapons.json', 'utf8'));
const offhandsData = JSON.parse(fs.readFileSync('data/scraped/forever_offhands.json', 'utf8'));

let cache = {};
if (fs.existsSync('scratch/forever_items_cache.json')) {
  try {
    cache = JSON.parse(fs.readFileSync('scratch/forever_items_cache.json', 'utf8'));
  } catch {
    cache = {};
  }
}

// Strict Proficiencies Check
const knownStaffNames = ["staff of orgrimmar", "fallen dragon's scepter", "golemheart stave", "segmented spider leg", "coldspire staff", "living root", "crescent staff", "odo's ley staff", "rod of the sleepwalker", "healer's staff", "striking staff", "spine of the devourer", "illusionary rod", "spellshifter rod", "kindling stave", "wisepaw totem", "benediction", "staff of jordan", "warden staff", "staff of westfall", "oakthrush staff", "apprentice's spellstaff", "staff of the dor'danil", "walking stick", "short staff", "militia quarterstaff", "glimmering staff", "soulstaff", "staff of the friar", "death prophet spine", "staff of soran'ruk", "soul harvester", "rod of the ogre magi", "zum'rah's vexing cane", "gritroot staff", "darkwood staff", "cauldron stirrer", "makeshift stormcaller", "gnarled necromancer's staff", "alliance outrunner staff", "emerald watcher's dreamstaff"];

const knownMaceNames = ["crude battle axe", "wooden mallet", "large club", "northshire hammer", "giant mace", "trogg scepter", "heavy copper maul", "ironforge greathammer", "rhahk'zor's hammer", "smite's mighty hammer", "verigan's fist", "heavehammer", "defender of dalaran", "dark hearted hammer", "manual crowd pummeler", "mograine's might", "princess theradras' scepter", "dark iron pulverizer", "hammer of the grand crusader", "the unstoppable force", "militia warhammer", "scepter of the abandoned", "rage of the storm", "dendweller's hammer", "copper mace", "bronze mace", "bronze warhammer", "solid iron maul", "mighty iron hammer", "the pacifier", "enchanted battlehammer", "club", "crested scepter", "rock pulverizer", "archeus", "grisly sack of skulls", "goblin smasher", "bonecracker", "hammer of orgrimmar", "hammerbone", "mug of muddled memories", "the stitcher", "gul'gash's greathammer"];

const knownAxeNames = ["crude battle axe", "copper battle axe", "thick war axe", "durgen's crescent axe", "corpse chopper", "forsaken greataxe", "reef axe", "taurenbane's family cleaver", "guardian's dualblade", "whirlwind axe", "corpsemaker", "ravager", "executioner's cleaver", "gatorbite axe", "arcanite reaper", "woodchopper", "lumbering ogre axe", "taskmaster axe", "bronze battle axe", "heavy mithril axe", "bonebiter", "massive iron axe", "riptear's cleaver", "thun'grim's axe", "axe of orgrimmar", "icesworn decapitator", "butcher's cleaver"];

const knownSwordNames = ["worn shortsword", "copper claymore", "heavy copper broadsword", "haunting blade", "vileblood scimitar", "plaguefang", "strike of the hydra", "trusty sword", "whirlwind sword", "stoneslayer", "blackblade of shahram", "copper shortsword", "bronze greatsword", "wolfsbane", "moonsteel broadsword", "sword of serenity", "blade of the titans", "warmonger", "cutlass", "cruel barb", "wingblade", "deadly bronze poniard", "bronze shortsword", "ruby-adorned blade", "city guard's tarnished blade", "sword of hammerfall", "the butcher", "vanquisher's sword", "thrash blade", "mirah's song", "dal'rend's sacred charge", "dal'rend's tribal guardian", "coldflame saber", "debt collector", "witchblade", "master hunter's spellsword", "zealot blade", "sword of omen", "forsaken shortsword", "deathstalker shortsword", "talonstrike", "thun'grim's sword", "heirloom sword", "sword of the fallen", "militia shortsword", "militia sword", "curved scimitar", "wildgore greatsword", "gilded blademaster's greatsword", "monstrous cleaver", "the skyblade", "blade of silverlaine", "alliance outrunner's sword", "blade of senseless slaughter"];

const knownRangedNames = ["polished shortbow", "hornwood recurve bow", "rough boomstick", "militia bow", "heavy recurve bow", "fine shortbow", "laminated recurve bow", "hunter's boomstick", "deadly blunderbuss", "calibrated blunderbuss", "venomstrike", "lovingly crafted boomstick", "silver-plated shotgun", "reinforced bow", "naga heartpiercer", "moonsight rifle", "fallenroot longbow", "bkp 2700 \"enforcer\"", "concealed hand crossbow", "gravespike repeater", "golemsight long gun", "glass shooter", "master hunter's rifle", "master hunter's bow", "quilboar blaster", "booty bay bruiser's buckshot", "spellsever crossbow", "crystalpine stinger", "mithril blunderbuss", "chesterfall musket", "blasting hackbut", "mithril heavy-bore rifle", "shrapnel blaster", "ironweaver", "truthseeker's bow", "gryphonwing bow", "riphook", "megashot rifle", "thorium rifle", "dark iron rifle", "blackcrow", "ancient bone bow", "flawless arcanite rifle", "core marksman rifle", "kolkar bow", "skorn's rifle", "orcish battle bow", "snarlsnout shooter", "bristlebark bow", "walton's second-favorite gun", "misplaced shooter", "barbaric crossbow", "dun garok rifle", "siegebreaker's blaster", "reaver's repeater", "alliance outrunner bow"];

const TEST_REGEX = /\b(test|foo|dnt|monster|copy|deprecated|debug)\b/i;

console.log('--- STRICT AUDIT OF WEAPON PROFICIENCIES & CONSISTENCY ---');
let errors = 0;

for (const [cls, cData] of Object.entries(d)) {
  const allLevelSets = [cData.levels, cData.healingLevels].filter(Boolean);
  allLevelSets.forEach(levelList => {
    levelList.forEach(lvl => {
      const itemsToCheck = [
        { ...lvl, isPrimary: true, value: `${lvl.weaponType || ''} ${lvl.source?.detail || ''}` },
        ...(lvl.alts || []).map(alt => ({ ...alt, isPrimary: false, value: `${alt.weaponType || ''} ${alt.value || ''}` }))
      ];

      itemsToCheck.forEach(item => {
        const aName = (item.name || '').toLowerCase();
        const aVal = (item.value || '').toLowerCase();
        const label = item.isPrimary ? `primary "${item.name}"` : `alt "${item.name}"`;
        const id = item.itemId || item.id;

        // 1. Purge Developer Test Items
        if (TEST_REGEX.test(item.name || '') || id === 7170 || id === 215235) {
          console.log(`FAIL: Developer test item detected in ${cls}: ${label} (ID: ${id})`);
          errors++;
        }

        // 2. Class Restriction Enforcement
        const restriction = item.classRestriction || cache[id]?.classRestriction;
        if (restriction && !restriction.toLowerCase().includes(cls)) {
          console.log(`FAIL: Class restriction violation: ${cls} has ${label} (ID: ${id}) restricted to ${restriction}`);
          errors++;
        }

        // 3. Reject Fishing Poles across all classes in combat progression
        if (item.subclass === 20 || aVal.includes('fishing pole') || aName.includes('fishing pole')) {
          console.log(`FAIL: Combat progression contains fishing pole: ${cls} ${label}`);
          errors++;
        }

        // 4. Hunter ranged track must be ranged weapon
        if (cls === 'hunter') {
          const isRanged = knownRangedNames.some(rn => aName.includes(rn) || rn.includes(aName)) || aVal.includes('bow') || aVal.includes('gun') || aVal.includes('crossbow') || aVal.includes('rifle') || aVal.includes('blaster') || aVal.includes('repeater') || aVal.includes('shotgun') || aVal.includes('boomstick');
          if (!isRanged) {
            console.log(`FAIL: Hunter ${label} is not a ranged weapon!`);
            errors++;
          }
        }

        // 5. Rogue: NO Axes, NO 2H, NO Staves, NO Wands
        if (cls === 'rogue') {
          const isAxe = knownAxeNames.some(an => aName === an) || aVal.includes('axe') || aVal.includes('cleaver') && !aVal.includes('sword');
          const is2H = aVal.includes('2h') || aVal.includes('two-hand');
          const isStaff = knownStaffNames.some(sn => aName === sn) || aVal.includes('staff');
          const isWand = item.subclass === 19 || item.weaponType === 'Wand' || String(item.weaponType || '').toLowerCase().includes('wand');
          if (isAxe || is2H || isStaff || isWand) {
            console.log(`FAIL: Rogue cannot equip ${label}!`);
            errors++;
          }
        }

        // 6. Mage & Warlock: NO Maces, NO Axes, NO Fist, NO Thrown
        if (cls === 'mage' || cls === 'warlock') {
          const isMace = knownMaceNames.some(mn => aName === mn) || aVal.includes('mace') || aVal.includes('hammer') || aVal.includes('maul');
          const isAxe = knownAxeNames.some(an => aName === an) || aVal.includes('axe');
          const isFist = item.subclass === 13 || String(item.weaponType || '').toLowerCase().includes('fist');
          const isThrown = item.subclass === 16 || String(item.weaponType || '').toLowerCase().includes('thrown');
          if (isMace || isAxe || isFist || isThrown) {
            console.log(`FAIL: ${cls} cannot equip mace/axe/fist/thrown ${label}!`);
            errors++;
          }
        }

        // 7. Priest: NO Swords, NO Axes, NO 2H Maces, NO Fist, NO Thrown
        if (cls === 'priest') {
          const isSword = knownSwordNames.some(sn => aName === sn) || aVal.includes('sword');
          const isAxe = knownAxeNames.some(an => aName === an) || aVal.includes('axe');
          const is2HMace = (aVal.includes('2h') || aVal.includes('two-hand')) && (aVal.includes('mace') || aVal.includes('hammer'));
          const isFist = item.subclass === 13 || String(item.weaponType || '').toLowerCase().includes('fist');
          const isThrown = item.subclass === 16 || String(item.weaponType || '').toLowerCase().includes('thrown');
          if (isSword || isAxe || is2HMace || isFist || isThrown) {
            console.log(`FAIL: Priest cannot equip sword/axe/2H mace/fist/thrown ${label}!`);
            errors++;
          }
        }

        // 8. Shaman: NO Swords
        if (cls === 'shaman') {
          const isSword = knownSwordNames.some(sn => aName === sn) || aVal.includes('sword');
          if (isSword) {
            console.log(`FAIL: Shaman cannot equip sword ${label}!`);
            errors++;
          }
        }

        // 9. Druid: NO Swords, NO Axes, NO Thrown (Polearms allowed)
        if (cls === 'druid') {
          const isSword = knownSwordNames.some(sn => aName === sn) || aVal.includes('sword');
          const isAxe = (knownAxeNames.some(an => aName === an) || aVal.includes('axe')) && !aVal.includes('polearm') && !aVal.includes('poleaxe');
          const isThrown = item.subclass === 16 || String(item.weaponType || '').toLowerCase().includes('thrown');
          if (isSword || isAxe || isThrown) {
            console.log(`FAIL: Druid cannot equip sword/axe/thrown ${label}!`);
            errors++;
          }
        }

        // 10. Paladin: NO Axes, NO Shields in 2H track, NO Fist, NO Thrown, 100% Alliance only
        if (cls === 'paladin') {
          const isAxe = knownAxeNames.some(an => aName === an) || aVal.includes('axe');
          const isShield = item.weaponType === 'Shield' || String(item.weaponType || '').toLowerCase().includes('shield');
          const isFist = item.subclass === 13 || String(item.weaponType || '').toLowerCase().includes('fist');
          const isThrown = item.subclass === 16 || String(item.weaponType || '').toLowerCase().includes('thrown');
          const isHorde = item.faction === 'horde' || item.side === 2;
          if (isAxe || isShield || isFist || isThrown || isHorde) {
            console.log(`FAIL: Paladin invalid item ${label} (axe: ${isAxe}, shield: ${isShield}, fist: ${isFist}, thrown: ${isThrown}, horde: ${isHorde})!`);
            errors++;
          }
        }
      });
    });
  });
}

console.log('\n--- STRICT AUDIT OF OFF-HANDS & SHIELDS DATASET ---');
for (const [cls, cData] of Object.entries(offhandsData)) {
  const levels = cData.levels || [];
  // Verify brackets 1-9, 10-14, 15-18 have populated alts
  for (const step of levels.slice(0, 3)) {
    if (!step.alts || step.alts.length === 0) {
      console.log(`FAIL: ${cls} offhand bracket ${step.levelBracket} has 0 alts!`);
      errors++;
    } else {
      console.log(`✓ ${cls.padEnd(8)} bracket ${step.levelBracket.padEnd(6)}: ${step.alts.length} alts, Top: "${step.name}" (effLvl: ${step.effectiveLevel})`);
    }

    const itemsToCheck = [step, ...(step.alts || [])];
    for (const it of itemsToCheck) {
      if (TEST_REGEX.test(it.name || '') || it.itemId === 7170 || it.itemId === 215235) {
        console.log(`FAIL: Test item in offhands ${cls}: ${it.name} (${it.itemId})`);
        errors++;
      }
      if (cls === 'paladin' && (it.faction === 'horde' || it.side === 2)) {
        console.log(`FAIL: Horde item in Paladin offhands: ${it.name}`);
        errors++;
      }
      const restriction = it.classRestriction || cache[it.itemId]?.classRestriction;
      if (restriction && !restriction.toLowerCase().includes(cls)) {
        console.log(`FAIL: Offhand class restriction violation: ${cls} has ${it.name} restricted to ${restriction}`);
        errors++;
      }
    }
  }
}

console.log('\n--- STRICT AUDIT OF PROGRESSION COVERAGE ---');
const minThresholds = {
  warrior: 180,
  paladin: 180,
  hunter: 180,
  rogue: 180,
  shaman: 180,
  mage: 150,
  warlock: 150,
  priest: 180,
  druid: 180
};

for (const [cls, minCount] of Object.entries(minThresholds)) {
  const cData = d[cls];
  const uniqueIds = new Set();
  const allLevelSets = [cData.levels, cData.healingLevels].filter(Boolean);
  allLevelSets.forEach(lvlList => {
    lvlList.forEach(l => {
      if (l.itemId) uniqueIds.add(l.itemId);
      (l.alts || []).forEach(a => { if (a.itemId) uniqueIds.add(a.itemId); });
    });
  });

  if (uniqueIds.size < minCount) {
    console.log(`FAIL: ${cls} progression coverage too low! Expected >= ${minCount}, got ${uniqueIds.size}`);
    errors++;
  } else {
    console.log(`✓ ${cls.padEnd(10)}: ${uniqueIds.size} unique weapons (>= ${minCount})`);
  }
}

console.log(`\nAudit finished with ${errors} errors.`);
if (errors > 0) process.exit(1);
