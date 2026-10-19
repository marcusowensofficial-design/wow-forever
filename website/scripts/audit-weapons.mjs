import fs from 'node:fs';

const d = JSON.parse(fs.readFileSync('data/scraped/forever_weapons.json', 'utf8'));

// Strict Proficiencies Check
const knownStaffNames = ["staff of orgrimmar", "fallen dragon's scepter", "golemheart stave", "segmented spider leg", "coldspire staff", "living root", "crescent staff", "odo's ley staff", "rod of the sleepwalker", "healer's staff", "striking staff", "spine of the devourer", "illusionary rod", "spellshifter rod", "kindling stave", "wisepaw totem", "benediction", "staff of jordan", "warden staff", "staff of westfall", "oakthrush staff", "apprentice's spellstaff", "staff of the dor'danil", "walking stick", "short staff", "militia quarterstaff", "glimmering staff", "soulstaff", "staff of the friar", "death prophet spine", "staff of soran'ruk", "soul harvester", "rod of the ogre magi", "zum'rah's vexing cane", "gritroot staff", "darkwood staff", "cauldron stirrer", "makeshift stormcaller", "gnarled necromancer's staff", "alliance outrunner staff", "emerald watcher's dreamstaff"];

const knownMaceNames = ["crude battle axe", "wooden mallet", "large club", "northshire hammer", "giant mace", "trogg scepter", "heavy copper maul", "ironforge greathammer", "rhahk'zor's hammer", "smite's mighty hammer", "verigan's fist", "heavehammer", "defender of dalaran", "dark hearted hammer", "manual crowd pummeler", "mograine's might", "princess theradras' scepter", "dark iron pulverizer", "hammer of the grand crusader", "the unstoppable force", "militia warhammer", "scepter of the abandoned", "rage of the storm", "dendweller's hammer", "copper mace", "bronze mace", "bronze warhammer", "solid iron maul", "mighty iron hammer", "the pacifier", "enchanted battlehammer", "club", "crested scepter", "rock pulverizer", "archeus", "grisly sack of skulls", "goblin smasher", "bonecracker", "hammer of orgrimmar", "hammerbone", "mug of muddled memories", "the stitcher", "black menace", "gul'gash's greathammer"];

const knownAxeNames = ["crude battle axe", "copper battle axe", "thick war axe", "durgen's crescent axe", "corpse chopper", "forsaken greataxe", "reef axe", "taurenbane's family cleaver", "guardian's dualblade", "whirlwind axe", "corpsemaker", "ravager", "executioner's cleaver", "gatorbite axe", "arcanite reaper", "woodchopper", "lumbering ogre axe", "taskmaster axe", "bronze battle axe", "heavy mithril axe", "bonebiter", "massive iron axe", "riptear's cleaver", "thun'grim's axe", "axe of orgrimmar", "icesworn decapitator"];

const knownSwordNames = ["worn shortsword", "copper claymore", "militia shortblade", "heavy copper broadsword", "haunting blade", "vileblood scimitar", "plaguefang", "strike of the hydra", "trusty sword", "whirlwind sword", "stoneslayer", "blackblade of shahram", "copper shortsword", "bronze greatsword", "wolfsbane", "moonsteel broadsword", "sword of serenity", "blade of the titans", "warmonger", "cutlass", "cruel barb", "wingblade", "deadly bronze poniard", "bronze shortsword", "butcher's cleaver", "meteor shard", "ruby-adorned blade", "city guard's tarnished blade", "sword of hammerfall", "the butcher", "vanquisher's sword", "thrash blade", "mirah's song", "dal'rend's sacred charge", "dal'rend's tribal guardian", "coldflame saber", "debt collector", "witchblade", "master hunter's spellsword", "zealot blade", "sword of omen", "forsaken shortsword", "deathstalker shortsword", "talonstrike", "thun'grim's sword", "heirloom sword", "sword of the fallen", "militia shortsword", "militia sword", "curved scimitar", "wildgore greatsword", "gilded blademaster's greatsword", "monstrous cleaver", "the skyblade", "blade of silverlaine", "alliance outrunner's sword", "blade of senseless slaughter"];

const knownRangedNames = ["polished shortbow", "hornwood recurve bow", "rough boomstick", "militia bow", "heavy recurve bow", "fine shortbow", "laminated recurve bow", "hunter's boomstick", "deadly blunderbuss", "calibrated blunderbuss", "venomstrike", "lovingly crafted boomstick", "silver-plated shotgun", "reinforced bow", "naga heartpiercer", "moonsight rifle", "fallenroot longbow", "bkp 2700 \"enforcer\"", "concealed hand crossbow", "gravespike repeater", "golemsight long gun", "glass shooter", "master hunter's rifle", "master hunter's bow", "quilboar blaster", "booty bay bruiser's buckshot", "spellsever crossbow", "crystalpine stinger", "mithril blunderbuss", "chesterfall musket", "blasting hackbut", "mithril heavy-bore rifle", "shrapnel blaster", "ironweaver", "truthseeker's bow", "gryphonwing bow", "riphook", "megashot rifle", "thorium rifle", "dark iron rifle", "blackcrow", "ancient bone bow", "flawless arcanite rifle", "core marksman rifle", "kolkar bow", "skorn's rifle", "orcish battle bow", "snarlsnout shooter", "bristlebark bow", "walton's second-favorite gun", "misplaced shooter", "barbaric crossbow", "dun garok rifle", "siegebreaker's blaster", "reaver's repeater", "alliance outrunner bow"];

console.log('--- STRICT AUDIT OF WEAPON PROFICIENCIES & CONSISTENCY ---');
let errors = 0;

for (const [cls, cData] of Object.entries(d)) {
  const allLevelSets = [cData.levels, cData.healingLevels].filter(Boolean);
  allLevelSets.forEach(levelList => {
    levelList.forEach(lvl => {
      const itemsToCheck = [
        { name: lvl.name, value: `${lvl.weaponType || ''} ${lvl.source?.detail || ''}`, isPrimary: true },
        ...(lvl.alts || []).map(alt => ({ name: alt.name, value: `${alt.weaponType || ''} ${alt.value || ''}`, isPrimary: false }))
      ];

    itemsToCheck.forEach(item => {
      const aName = item.name.toLowerCase();
      const aVal = (item.value || '').toLowerCase();
      const label = item.isPrimary ? `primary "${item.name}"` : `alt "${item.name}"`;

      // Hunter ranged track must be ranged weapon
      if (cls === 'hunter') {
        const isRanged = knownRangedNames.some(rn => aName.includes(rn) || rn.includes(aName)) || aVal.includes('bow') || aVal.includes('gun') || aVal.includes('crossbow') || aVal.includes('rifle') || aVal.includes('blaster') || aVal.includes('repeater') || aVal.includes('shotgun') || aVal.includes('boomstick');
        if (!isRanged) {
          console.log(`FAIL: Hunter ${label} is not a ranged weapon!`);
          errors++;
        }
      }

      // Rogue: NO Axes, NO 2H, NO Staves
      if (cls === 'rogue') {
        const isAxe = knownAxeNames.some(an => aName === an) || aVal.includes('axe') || aVal.includes('cleaver') && !aVal.includes('sword');
        const is2H = aVal.includes('2h') || aVal.includes('two-hand');
        const isStaff = knownStaffNames.some(sn => aName === sn) || aVal.includes('staff');
        if (isAxe || is2H || isStaff) {
          console.log(`FAIL: Rogue cannot equip ${label}!`);
          errors++;
        }
      }

      // Mage & Warlock: NO Maces, NO Axes
      if (cls === 'mage' || cls === 'warlock') {
        const isMace = knownMaceNames.some(mn => aName === mn) || aVal.includes('mace') || aVal.includes('hammer') || aVal.includes('maul');
        const isAxe = knownAxeNames.some(an => aName === an) || aVal.includes('axe');
        if (isMace || isAxe) {
          console.log(`FAIL: ${cls} cannot equip mace/axe ${label}!`);
          errors++;
        }
      }

      // Priest: NO Swords, NO Axes, NO 2H Maces
      if (cls === 'priest') {
        const isSword = knownSwordNames.some(sn => aName === sn) || aVal.includes('sword');
        const isAxe = knownAxeNames.some(an => aName === an) || aVal.includes('axe');
        const is2HMace = (aVal.includes('2h') || aVal.includes('two-hand')) && (aVal.includes('mace') || aVal.includes('hammer'));
        if (isSword || isAxe || is2HMace) {
          console.log(`FAIL: Priest cannot equip sword/axe/2H mace ${label}!`);
          errors++;
        }
      }

      // Shaman: NO Swords
      if (cls === 'shaman') {
        const isSword = knownSwordNames.some(sn => aName === sn) || aVal.includes('sword');
        if (isSword) {
          console.log(`FAIL: Shaman cannot equip sword ${label}!`);
          errors++;
        }
      }

      // Druid: NO Swords, NO Axes
      if (cls === 'druid') {
        const isSword = knownSwordNames.some(sn => aName === sn) || aVal.includes('sword');
        const isAxe = knownAxeNames.some(an => aName === an) || aVal.includes('axe');
        if (isSword || isAxe) {
          console.log(`FAIL: Druid cannot equip sword/axe ${label}!`);
          errors++;
        }
      }

      // Paladin: NO Axes, NO Shields in 2H track
      if (cls === 'paladin') {
        const isAxe = knownAxeNames.some(an => aName === an) || aVal.includes('axe');
        const isShield = aVal.includes('shield') || aVal.includes('deflector');
        if (isAxe || isShield) {
          console.log(`FAIL: Paladin 2H track cannot have axe/shield ${label}!`);
          errors++;
        }
      }
    });
  });
  });
}

console.log(`Audit finished with ${errors} errors.`);
