/**
 * Hand-written text for the topic guides. build.mjs passes in the item, price and link helpers.
 * Facts checked November 24, 2026. Write in our own words; label anything that is not confirmed.
 */
const ICON = (n) => `https://render.worldofwarcraft.com/us/icons/56/${n}.jpg`;

export function makeGuides(h) {
  return [sunkenTemple(h), dawnWaker(h), secretToys(h), craftsmansWrits(h), riding(h), weaponSkills(h), bags(h), shendralar(h)];
}

/* ------------------------------------------------------------------ Sunken Temple class quests */
function sunkenTemple({ item, stats, quest: q, guide, bisSpecs, money, price, cell, CHECKED }) {
  // [class, side, final task, reward ids, steps]
  const classes = [
    ['Druid', 'Both', 'Atal\'alarion', [22274, 22272, 22458], [
      `Trainer → ${q(9063, 'Torwa Pathfinder')}: meet **Torwa Pathfinder** in Un'Goro Crater (\`71, 76\`).`,
      `${q(9052, 'Bloodpetal Poison')}: 8 ${item(22435)} from the Gorishi hive in the south (around \`50, 76\`, about 10% drop) and 8 ${item(22434)} from Bloodpetal Sprouts across the crater.`,
      `${q(9051, 'Toxic Test')}: use the ${item(22432)} on any Devilsaur in the west. Soothe it, Hibernate it, stab it, leave.`,
      `${q(9053, 'A Better Ingredient')}: kill **Atal'alarion** in the temple for the ${item(22444)}, then return to Torwa.`]],
    ['Hunter', 'Both', 'Morphaz', [20083, 19991, 19992], [
      `Trainer → ${q(8151, 'The Hunter\'s Charm')}: meet **Ogtinc** on the cliff edge in Azshara (\`42.4, 42.6\`).`,
      `${q(8153, 'Courser Antlers')}: 2 ${item(20017)} from Mosshoof Coursers (about 10%). Run east from Ogtinc to the cliff and back.`,
      `${q(8231, 'Wavethrashing')}: 6 ${item(20087)} from Wavethrashers on the coast (\`86, 12\`, \`88, 32\` or \`79, 84\`; about 30%).`,
      `${q(8232, 'The Green Drake')}: ${item(20019)} from **Morphaz**, then back to Ogtinc.`]],
    ['Mage', 'Both', 'Morphaz', [20035, 20037, 20036], [
      `Trainer → ${q(8250, 'Magecraft')}: hand in to **Sanath Lim-yo** in Azshara (\`28, 50\`) and take his teleport up to **Archmage Xylem** (\`29, 40\`).`,
      `${q(8251, 'Magic Dust')}: 10 ${item(20028)} from the Blood Elves around \`55, 28\`.`,
      `${q(8252, 'The Siren\'s Coral')}: 6 ${item(20029)} from Spitelash Sirens in the Ruins of Eldarath (about 80%).`,
      `${q(8253, 'Destroy Morphaz')}: ${item(20085)} from **Morphaz**, then back to Xylem.`]],
    ['Paladin', 'Alliance', '6 trolls (feathers)', [20504, 20512, 20505], [
      `**Lord Grayson Shadowbreaker** in Stormwind → ${q(8415, 'Chillwind Point')}: meet **Commander Ashlam Valorfist** in Western Plaguelands (\`42, 84\`).`,
      `${q(8414, 'Dispelling Evil')}: 20 ${item(12840)} from Scourge in the zone, handed in to **High Priest Thel'danis** (\`52.1, 83.3\`).`,
      `${q(8416, 'Inert Scourgestones')}: carry the stone back to Ashlam.`,
      `${q(8418, 'Forging the Mightstone')}: the six **Voodoo Feathers** listed above, then back to Ashlam.`]],
    ['Priest', 'Both', 'Morphaz', [19990, 20082, 20006], [
      `Trainer → ${q(8254, 'Cenarion Aid')}: meet **Ogtinc** in Azshara (\`42.4, 42.6\`).`,
      `${q(8255, 'Of Coursers We Know')}: 4 ${item(20027)} from Mosshoof Coursers (about 33%).`,
      `${q(8256, 'The Ichor of Undeath')}: 1 ${item(7972)}, a rare drop from undead (about 5%). The Western Plaguelands farms work well, or check the Auction House.`,
      `${q(8257, 'Blood of Morphaz')}: ${item(20025)} from **Morphaz**. Hand in to **Greta Mosshoof** in Felwood (\`51, 82\`), not to Ogtinc.`]],
    ['Rogue', 'Both', 'Morphaz', [19984, 20255, 19982], [
      `Trainer → ${q(8233, 'A Simple Request')}: meet **Lord Jorach Ravenholdt**. Take the ramp at Hillsbrad \`75, 24\`, go through the short cave and into the large house.`,
      `${q(8234, 'Sealed Azure Bag')}: the bag drops from Timbermaw Shamans in Azshara (\`44, 22\`) at a low rate. Start this one early.`,
      `${q(8235, 'Encoded Fragments')}: from **Xylem** (teleport at \`28, 50\`). Kill or pickpocket Azshara's Thunderhead hippogryphs, Timberweb Recluses and Forest Oozes for 10 ${item(20023)}.`,
      `${q(8236, 'The Azure Key')}: ${item(20022)} from **Morphaz**, then back to Xylem.`]],
    ['Shaman', 'Horde', '6 trolls (feathers)', [20369, 20556, 20503], [
      `Trainer → ${q(8410, 'Elemental Mastery')}: 1 each of ${[7069, 7068, 7067, 7070].map(item).join(', ')}. Buying them is usually fastest.`,
      `${q(8412, 'Spirit Totem')}: from **Bath'rah the Windwatcher** in Alterac Mountains (\`80, 66\`). 8 ${item(20610)} and 8 ${item(20611)} from vultures, lurkers and bears at the Tirisfal entrance to Western Plaguelands (\`32, 62\`; about 20%).`,
      `${q(8413, 'Da Voodoo')}: the six **Voodoo Feathers** listed above, then back to Bath'rah.`]],
    ['Warlock', 'Both', '6 trolls (feathers)', [20536, 20534, 20530], [
      `Trainer → ${q(8419, 'An Imp\'s Request')}: take 1 ${item(14256)} (about ${money(price(14256))} on the Auction House) to **Impsy** in Felwood (\`41, 45\`).`,
      `${q(8421, 'The Wrong Stuff')}: 10 ${item(20613)} from Irontree Woods (\`49, 21\`; about 25%) and 4 ${item(20614)} from the Tainted Oozes beside Impsy (about 20%).`,
      `${q(8422, 'Trolls of a Feather')}: the six **Voodoo Feathers** listed above, then back to Impsy.`]],
    ['Warrior', 'Both', '6 trolls (feathers)', [20521, 20130, 20517], [
      `Trainer → ${q(8417, 'A Troubled Spirit')}: meet the **Fallen Hero of the Horde** in Swamp of Sorrows (\`34.3, 66.1\`).`,
      `${q(8423, 'Warrior Kinship')}: 7 Helboars around the Dark Portal crater (\`51.5, 53.2\` or \`58.9, 45.3\`).`,
      `${q(8424, 'War on the Shadowsworn')}: 20 Adepts, 10 Cultists and 20 Thugs at the cave (\`65, 30\`). Bring a friend.`,
      `${q(8425, 'Voodoo Feathers')}: the six **Voodoo Feathers** listed above, then back to the Fallen Hero.`]]
  ];
  const o = ['### Overview: One Chain, Three Rewards', '',
    'At level 50 every class can start a quest chain that ends inside the **Temple of Atal\'Hakkar** (Sunken Temple). In Classic you picked one of three items. **In Forever you get all three**, which makes this one of the best uses of an evening between 50 and 55.', '',
    '| Detail | What to Know |', '|---|---|',
    '| **Starts at** | Level 50, from your class trainer. The temple itself is easier at 52 or above |',
    '| **Dungeon target** | Morphaz, Atal\'alarion or the six troll guardians, depending on class |',
    '| **Faction limits** | Wowhead reports the **Paladin** chain is currently offered only to Alliance and the **Shaman** chain only to Horde. No chain has been reported yet for Undead Paladins or Alliance Shamans, so ask your trainer at 50 |',
    `| **Dungeon guide** | ${guide('guide-dungeon-sunken-temple', 'Sunken Temple: full dungeon guide')} |`, '',
    '---', '', '### All Rewards', '', '| Class | You Need | Reward 1 | Reward 2 | Reward 3 |', '|---|---|---|---|---|'];
  for (const [c, , target, r] of classes) o.push(`| **${c}** | ${target} | ${r.map(i => `${item(i)}${stats(i) ? ` (${cell(stats(i))})` : ''}`).join(' | ')} |`);
  o.push('');
  const bis = classes.flatMap(([, , , r]) => r).map(i => [i, bisSpecs(i)]).filter(x => x[1].length);
  if (bis.length) {
    o.push('🎯 Still on this site\'s Level 60 pre-raid lists: ' + bis.map(([i, s]) => `${item(i)} (${s.join(', ')})`).join(', ') + '.', '');
  }
  o.push('---', '', '### Voodoo Feathers: Who Drops What', '',
    'Paladins, Shamans, Warlocks and Warriors need **two of each color**. Two trolls drop each color, and it is easy to leave a corpse unlooted.', '',
    '| Feather | Dropped By |', '|---|---|',
    `| ${item(20606)} | Gasher, Zul'Lor |`, `| ${item(20607)} | Hukku, Mijan |`, `| ${item(20608)} | Zolo, Loro |`, '',
    '💡 Before the run, ask who needs feathers and who needs Morphaz. A full clear can finish everybody\'s last step at once.', '', '---', '');
  for (const [c, side, , r, steps] of classes) {
    o.push(`### ${c}${side === 'Both' ? '' : ` (${side} chain)`}`, '', ...steps.map((s, i) => `**${i + 1}.** ${s}`).flatMap(s => [s, '']), `📦 Rewards: ${r.map(item).join(', ')}`, '');
  }
  o.push('---', '', `📦 Quest steps and drop rates from [Wowhead Forever](https://www.wowhead.com/forever/guide/sunken-temple-level-50-class-quest-walkthrough), cross-checked with ForeverDungeonJournal quest data. Item stats from this site's item database. Checked ${CHECKED}.`);
  return {
    id: 'guide-sunken-temple-class-quests', title: 'Sunken Temple Class Quests (Level 50): Every Class, Every Step, All Three Rewards',
    category: 'Leveling & Quests', source: 'Wowhead Forever · ForeverDungeonJournal · item database', icon: ICON('inv_misc_head_dragon_green'),
    summary: 'Level 50 class quest walkthroughs for all nine classes: coordinates, drop rates, which Sunken Temple boss you need, and the three rewards you get in Forever instead of one.',
    content: o.join('\n')
  };
}

/* ------------------------------------------------------------------ Dawn Waker */
function dawnWaker({ item, quest: q, guide, CHECKED }) {
  const content = `### Overview: Forever's First Big Secret

The **Dawn Waker** hunt begins with a plain ring on Zephras Isle and leads through seven zones to Prince Tortheldrin in Dire Maul. It appears to concern two blades, **Eluvi'ana** and **Eluvi'tor**.

⚠️ **This secret is unsolved.** Players have completed the steps below, but nobody has reported an ending or final reward. Don't vendor or delete anything from the chain.

| Detail | What to Know |
|---|---|
| **Suggested level** | About 22 for the water globe, 40 or more for the rest, plus a Dire Maul group |
| **Group needed** | 5 players for the Star of Elune |
| **Reward so far** | ${item(276188)}, an uncommon one-hand sword from Part 1 |
| **Keep** | ${item(264908)}, the Ancient Hilt, Eluvi'ana and the Scrawled Note |

---

### Before You Start: Night Watchman's Torch

You need ${item(280612)}. It works from level 1 for both factions and lights dark areas anywhere except inns and capitals.

- In Duskwood, look for a **dead Night Watch Guard**. The corpse gives An Unfortunate End, which completes as soon as you accept it.
- Most reports put him on the hill in Raven Hill Cemetery (\`21, 32\`), with level 25 ghouls all around.
- Other reported spots: \`20.9, 34.4\`, \`17, 54\`, \`30.0, 67.4\`, \`45.9, 78.3\` and \`47.8, 59.4\`.

---

### Part 1: The Ring, the Hilt and the Blade (Zephras Isle)

- **Ring, Skyborne:** take ${q(92460, 'Coming of Age')} from Ailee Farheart in Thendal Village (\`42.8, 23.5\`) and hand it in to Rorian the Dayseeker nearby.
- **Ring, everyone else:** it is also on the top floor of a building at \`41.7, 23.4\`.
- **Hilt:** use the torch at the Ruins of Ban'aethal (\`58.1, 24.1\`), then take the hilt to **Ealaane Nimbuswalker** (\`65.9, 74.4\`).
- **Blade:** find the Ancient Skyborne Blade and bring it to Ealaane for Eluvi'ana. It has been seen at \`48.9, 72.7\`, \`50.4, 44.3\`, \`66.3, 43.2\` and \`59.9, 82.2\`.

---

### Part 2: The Befouled Water Globe

#### Alliance (Darkshore)
- Gather 20 ${item(279276)} from the naga at the Ruins of Mathystra and combine them.
- Use the amulet at the water structure (\`58.9, 22.6\`) and kill **Baron Marinous**.
- Hand the globe to **Onu** (\`43.6, 76.4\`), then talk again to get it back.

#### Horde (Ashenvale)
- Kill **Baron Aquanis** in ${guide('guide-blackfathom-deeps', 'Blackfathom Deeps')} for the Strange Water Globe.
- Hand it to **Je'neu** at Zoram'gar Outpost (\`11.6, 34.2\`), then talk again to get it back.

---

### Part 3: The Highborne Spirit

- **Equip the ring** and go to Zoram Strand, Ashenvale (\`15.7, 19.3\`) with the globe in your bags. Speak to the spirit.
- Climb the Tower of Althalaxx in Darkshore (\`56.4, 26.5\`), kill **Narassin** for the ${item(282406)} and open the lockbox behind him for ${item(282404)}.
- Return to the spirit.

---

### Part 4: Three Cleansing Items

Bring the Hilt, Eluvi'ana and the Tome to **Mordent Evenshade** in ${guide('guide-zone-shendralas', 'Shen\'dralas')} (\`35.1, 46.5\`), then collect these in any order:

| Item | Where | How |
|---|---|---|
| ${item(282548)} | Ogre-held temple, south Feralas (\`58.5, 71.6\`) | **5 players wearing the ring.** Four toggle the Ancient Switches (\`58.5, 71.0\` upstairs, \`57.3, 71.7\`, \`59.7, 72.0\`, \`61.1, 73.6\`) while the fifth opens the vault |
| ${item(282547)} | Underwater chest, Azshara (\`66.0, 54.1\`) | Finish the quest chain from ${q(2721, 'Kirith')} to Azsharite first, or it can't be looted |
| ${item(282431)} | Lake Kel'theril, Winterspring (\`53.6, 43.2\`) | Kill Anguished or Suffering Highborne. Not a guaranteed drop. The ring isn't needed |

Then go back to Mordent.

---

### Part 5: The Cleansing Ritual

- At the **Shrine of Coalescence** in ${guide('guide-zone-mount-hyjal', 'Mount Hyjal')} (\`72.7, 37.2\`), click the globe in your bags with all three items on you to receive the ${item(282699)}.
- Show it to Mordent, who sends you to Dire Maul.

---

### Part 6: Prince Tortheldrin (Current Frontier)

- Speak to the Prince. He names the two blades and says more is for those Honored in his court. One player who reached Honored with the ${guide('guide-shendralar-reputation', 'Shen\'dralar')} got **no new dialogue**, so reputation alone isn't the answer.
- Make an ${item(282707)}: 1 ${item(282712)}, 1 ${item(18335)}, 2 ${item(14344)} and 1 ${item(12363)}.
- Use it on the Ancient Hilt and speak to the Prince again for the ${item(283387)}. The riddle talks about a pair, a pure-hearted wielder and flames born of air.
- **Being tested:** place the Hilt in front of **Altairus**; the dragon flies off after its breath. With the Night Dancer sword in your bags, clicking the hilt you placed starts a 10-second channel. Nothing has followed it so far.

🗺️ The same steps are a checklist under Guides → Exploration & Secrets.

📦 All discoveries belong to the **WoW Secret Finding Discord** (write-up by Miko, Aerinis and Padwarle; later findings by Blikey), published through [Wowhead](https://www.wowhead.com/forever/guide/dawn-waker-secret-walkthrough). Torch locations from [Wowhead](https://www.wowhead.com/forever/guide/night-watchmans-torch-guide-quest-location). Checked ${CHECKED}.`;
  return {
    id: 'guide-dawn-waker-secret', title: 'Dawn Waker Secret (Unsolved): Every Known Step, plus the Night Watchman\'s Torch',
    category: 'Exploration & Secrets', source: 'WoW Secret Finding Discord · Wowhead Forever', icon: ICON('inv_jewelry_ring_03'),
    summary: 'All known steps of the unsolved Dawn Waker chain for both factions: torch, ring, hilt, water globe, cleansing items, the Hyjal ritual and where the hunt stands now.',
    content
  };
}

/* ------------------------------------------------------------------ Secret toys */
function secretToys({ item, guide, money, price, realm, scanDate, CHECKED }) {
  const ins = price(279450);
  const box = price(274041);
  const content = `### Overview: Two Secret Toys

| Toy | What It Does | Where | Effort |
|---|---|---|---|
| ${item(279471)} | Disguises you as a Defias operative | ${guide('guide-alcaz-prison', 'Alcaz Prison')} and a short trip | One dungeon run plus 5 insignia from other players |
| ${item(221315)} | Plants a signpost with a message for an hour | ${guide('guide-dungeon-blackrock-depths', 'Blackrock Depths')} | A few careful jumps |

Looking for the torch? ${guide('guide-dawn-waker-secret', 'The Dawn Waker guide')} covers the Night Watchman's Torch.

---

### Alcaz Operative Disguise

⚠️ **Don't kill The Questioner on your way through Alcaz Prison**, or Mason Connery won't offer the quest.

- **Step 1:** Clear Alcaz Prison but leave **The Questioner** alive. Talk to **Mason Connery** at the end, then go back, kill The Questioner and bring Mason the ${item(274029)}.
- **Step 2:** Mason's note reads "WF, 43.4, 67.8": Westfall, the Moonbrook inn. Upstairs, a loose floorboard holds your ${item(274041)}.
- **Step 3:** **Keep the box.** It sells to a vendor for 25g, but it starts **State Secrets**.
  - **Alliance:** Renzik "The Shiv", SI:7, Old Town, Stormwind.
  - **Horde:** Rix Xizzix, near the Booty Bay Auction House.
- **Step 4:** State Secrets rewards one ${item(279450)}. You need **six**. They can be traded, so get five from other players and combine them.

📦 **Cost check** (14-day medians, ${realm}, scanned ${scanDate}): an insignia goes for ${money(ins)}${ins ? `, so the five you need are about **${money(ins * 5)}**` : ''}. Document Boxes go for ${money(box)} against a 25g vendor price. If you only want gold, compare selling your box with selling the insignia.

💡 Going with friends? A full chain gives one insignia per character, so six characters can pool theirs instead of buying.

---

### Traveler's Symbols (Blackrock Depths)

The same ledge also holds ${item(221316)} (a shirt that turns you to face your target on use) and Student Fodder for the ${guide('guide-sleeping-bag', 'sleeping bag')}.

- **Step 1:** Just east of the **Ring of Law**, find the bridge that runs north over the lava. Looking down to the left, you can see a friendly Dark Iron dwarf at the foot of a pillar.
- **Step 2:** Clear the bridge: Blazing Fireguards and a Shadowforge pack.
- **Step 3:** On the left by the small brazier, climb the railing, stay tight to the rock and leap ahead to the platform.
- **Step 4:** Follow the platform to the end and push into the rock corner.
- **Step 5:** With your left shoulder on the wall, edge along until you drop into the corner, then drop to the outcrop below.

🔒 A door on the ledge takes you to a spot above **Lord Incendius**. It's one-way, so loot everything first.

The sign offers phrases such as "Good Camping", "Unsafe area", "Secret nearby" and "Death Trap".

---

📦 Credit: the Alcaz chain was solved by the **WoW Secret Finding Discord** (Miko, Hobe and Aluuni) and the Blackrock Depths ledge by **SeventeenUncles**, both published through [Wowhead](https://www.wowhead.com/forever/guide/alcaz-operative-disguise-toy-secret-walkthrough). Checked ${CHECKED}.`;
  return {
    id: 'guide-secret-toys', title: 'Secret Toys: Alcaz Operative Disguise & Traveler\'s Symbols',
    category: 'Exploration & Secrets', source: 'WoW Secret Finding Discord · SeventeenUncles · Wowhead Forever', icon: ICON('inv_misc_bandana_03'),
    summary: 'How to get the Defias disguise toy (and what its insignia cost on the Auction House) and the hidden signpost toy in Blackrock Depths.',
    content
  };
}

/* ------------------------------------------------------------------ Craftsman's Writs */
function craftsmansWrits({ item, guide, money, price, cheapest, writs, cell, realm, scanDate, CHECKED }) {
  const TIERS = { Journeyman: { rep: 75, coin: '5s to 19s' }, Expert: { rep: 125, coin: 'about 36s' }, Artisan: { rep: 200, coin: 'about 74s' } };
  const rows = writs.map(w => {
    const writ = price(w.id);
    const c = cheapest(w.product);
    const total = writ != null && c.cost != null ? writ + c.cost : null;
    return { ...w, writ, craft: c.cost, how: c.how, total, per100: total == null ? null : (total / TIERS[w.tier].rep) * 100 };
  });
  const turnIn = (w) => [w.npc, w.zone].filter(Boolean).join(', ') || 'Not known yet';
  const best = rows.filter(r => r.per100 != null && r.zone).sort((a, b) => a.per100 - b.per100).slice(0, 15);
  const o = ['### Overview: What a Writ Is', '',
    'A **Craftsman\'s Writ** is a tradable drop that starts a daily quest: hand in a crafted item to a set NPC for reputation with the **Azeroth Commerce Authority** (Alliance) or **Durotar Supply & Logistics** (Horde) and a Coin Pouch. Writs match the level of the zone you are in, also drop in dungeons, and you don\'t need the profession yourself.', '',
    '| Tier | Reputation | Coin Pouch |', '|---|---|---|',
    ...Object.entries(TIERS).map(([t, v]) => `| **${t}** | ${v.rep} | ${v.coin} |`), '',
    '💡 The pouch never pays for the trip. Run writs for reputation, or **sell the writ** if you don\'t need it.', '',
    `See ${guide('guide-supply-crates-rep', 'supply crates and reputation math')} for what the reputation buys.`, '',
    '---', '', '### Cheapest Reputation Right Now', '',
    `The 15 cheapest writs with a known turn-in, as writ price plus one crafted item. Prices are 14-day medians from one scan (${realm}, ${scanDate}).`, '',
    '| Writ | Tier | Turn In | Writ | Item | Cost per 100 Rep |', '|---|---|---|---|---|---|',
    ...best.map(r => `| ${item(r.id)} | ${r.tier} | ${cell(turnIn(r))} | ${money(r.writ)} | ${money(r.craft)} (${r.how.toLowerCase()}) | **${money(r.per100)}** |`), '',
    '⚠️ Costs assume **one** crafted item. Check the quantity on the quest before you buy; no source we checked lists it. Your realm\'s prices will differ.', '',
    '---', '', '### Good Routes', '',
    '- **Wetlands and Stonetalon:** Kixxle and Ziz Fizziks each take a writ from all five professions. Kzixx in Duskwood takes four.',
    '- **Arathi and Alterac:** Alyce and Muggol Breezebeard in Arathi, with Sos\'mol and Alan Sneeks in Alterac, are one loop.',
    '- **Moonglade:** one writ from each of the five professions, easy for druids.',
    '- **Riverglades:** Spek takes several while you quest for Krol\'dok Stronghold.', '',
    '💡 At **Friendly**, the Uncertified Scribe at your faction camp (Dianne Softstep or Kurvelk Shadowhoof) sells a Forged Delivery Receipt that turns Waylaid Supply Crates into 50 reputation each. All crates go to one place, which often beats chasing writs.', '',
    '---', ''];
  for (const prof of ['Alchemy', 'Blacksmithing', 'Engineering', 'Leatherworking', 'Tailoring']) {
    const list = rows.filter(r => r.profs.includes(prof));
    o.push(`### ${prof} (${list.length})`, '', '| Writ | Tier | Turn In | Writ Price | Crafted Item |', '|---|---|---|---|---|');
    for (const r of list) o.push(`| ${item(r.id)} | ${r.tier} | ${cell(turnIn(r))} | ${money(r.writ)} | ${money(r.craft)}${r.how ? ` (${r.how.toLowerCase()})` : ''} |`);
    o.push('');
  }
  const unknown = rows.filter(r => !r.zone).length;
  o.push('---', '', `📦 ${writs.length} writs listed; ${unknown} still have no reported turn-in zone. Turn-ins from [Wowhead Forever](https://www.wowhead.com/forever/guide/professions/craftsmans-writs-overview-recipes-rewards), prices and recipe costs from this site. "Craft" means buying every material is cheaper than buying the item. Checked ${CHECKED}.`);
  return {
    id: 'guide-craftsmans-writs', title: `Craftsman's Writs: All ${writs.length} Writs, Turn-Ins and Cost per Reputation`,
    category: 'Economy & Professions', source: 'Wowhead Forever · Auction House scan · profession data', icon: ICON('inv_scroll_03'),
    summary: `Every Craftsman's Writ by profession with turn-in NPCs and Auction House prices, plus the 15 cheapest ways to buy reputation (${scanDate} scan).`,
    content: o.join('\n')
  };
}

/* ------------------------------------------------------------------ Riding */
function riding({ item, quest: q, guide, CHECKED }) {
  // [race, trainer, vendor, rare ids, epic ids, note]
  const races = {
    Alliance: [
      ['Human', 'Randal Hunter, Eastvale Logging Camp, Elwynn (`84.2, 65.0`)', 'Katie Hunter (`84.0, 65.4`)', [5655, 5656, 2414], [18776, 18777, 18778], `Unger Statforth in Wetlands (\`8.6, 54.6\`) also sells ${item(2411)}. His quest ${q(97171, 'Your First Horse')} can award it.`],
      ['Dwarf', 'Ultham Ironhorn, Gol\'Bolar Quarry, Dun Morogh (`63.8, 50.2`)', 'Veron Amberstill (`63.6, 50.6`)', [5864, 5872, 5873], [18787, 18786, 18785]],
      ['Night Elf', 'Jartsam, Darnassus (`38.6, 16.0`)', 'Lelanai (`38.6, 15.6`)', [8629, 8631, 8632, 274706], [18902, 18766, 18767]],
      ['Gnome', 'Binjy Featherwhistle, Kharanos, Dun Morogh (`49.2, 48.0`)', 'Milli Featherwhistle, beside him', [8563, 8595, 13321, 13322], [18774, 18773, 18772]]
    ],
    Horde: [
      ['Orc', 'Kildar, Valley of Honor, Orgrimmar (`69.2, 13.2`)', 'Ogunaro Wolfrunner (`69.4, 12.4`)', [1132, 5665, 5668, 1041], [18797, 18798, 18796]],
      ['Undead', 'Velma Warnam, Brill, Tirisfal (`60.0, 52.6`)', 'Zachariah Post (`59.8, 52.6`)', [13331, 13332, 13333, 276063], [274799, 18791, 13334]],
      ['Tauren', 'Kar Stormsinger, Bloodhoof Village, Mulgore (`46.8, 61.8`)', 'Harb Clawhoof (`46.6, 62.0`)', [15277, 15290, 275993], [18795, 18794, 18793], `Tylana Clawhoof in Stonetalon (\`46.0, 59.8\`) also sells ${item(277960)}. Her quest ${q(97446, 'Your First Riding Kodo')} can award it.`],
      ['Troll', 'Xar\'Ti, Sen\'jin Village, Durotar (`55.2, 75.6`)', 'Zjolnir, beside him', [8588, 8591, 8592], [18790, 18789, 18788]]
    ],
    'Both Factions': [
      ['Skyborne', 'Genn Fairweather, west of Valanaar, Zephras Isle (`53.8, 81.2`)', 'Genn sells the mounts too', [269681, 269683, 274930], [269671, 269678, 274933], 'Skyborne currently always get the Honored discount on training.']
    ]
  };
  const o = ['### Overview: Costs and Levels', '', '| Skill | Level | Speed | Training | Mount |', '|---|---|---|---|---|',
    '| **Apprentice Riding** | 40 | +60% | 100g | 20g, **first one free** |', '| **Journeyman Riding** | 60 | +100% | 1,000g | 200g, **first one free** |', '',
    '- **Save 10%:** be **Honored** with your race\'s faction before you train. That is 10g at 40 and **100g at 60**.',
    '- **Don\'t buy your first mount.** After each skill, your race\'s vendor gives you one for free.',
    '- **Paladins and Warlocks** get a mount and the matching riding skill from class quests at 40 and 60.',
    '- **Another race\'s mount** needs Exalted with that race plus 100g for its riding style.',
    '- Learned mounts are in Account Collections (Shift+P).', '',
    `💡 Saving for 60? See the ${guide('guide-gold-making-60', 'gold guide')} and the ${guide('guide-level-60-checklist', 'level 60 checklist')}. All mounts are listed in the Codex.`, '', '---', ''];
  for (const [side, list] of Object.entries(races)) {
    o.push(`### ${side}`, '');
    for (const [race, trainer, vendor, rare, epic, note] of list) {
      o.push(`#### ${race}`, '', '| What | Where / Which |', '|---|---|', `| **Trainer** | ${trainer} |`, `| **Mounts** | ${vendor} |`, `| **Level 40 (60%)** | ${rare.map(item).join(', ')} |`, `| **Level 60 (100%)** | ${epic.map(item).join(', ')} |`, '');
      if (note) o.push(`💡 ${note}`, '');
    }
  }
  o.push('---', '', `📦 Costs, trainers and mounts from [Wowhead Forever](https://www.wowhead.com/forever/guide/unlocking-riding-skill-mounts), names and ids checked against this site's item database. Checked ${CHECKED}.`);
  return {
    id: 'guide-riding-first-mount', title: 'Riding & Your First Mount: Costs, Discounts, Trainers and Every Racial Mount',
    category: 'Leveling & Quests', source: 'Wowhead Forever · item database', icon: ICON('ability_mount_ridinghorse'),
    summary: 'Level 40 and 60 riding costs, the Honored discount, the free first mount, and trainer and vendor coordinates for every race.',
    content: o.join('\n')
  };
}

/* ------------------------------------------------------------------ Weapon skills */
function weaponSkills({ CHECKED, guide }) {
  const order = ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Warlock', 'Druid'];
  const use = {
    'One-Handed Axes': 'Warrior Paladin Hunter Shaman', 'One-Handed Maces': 'Warrior Paladin Rogue Priest Shaman Druid',
    'One-Handed Swords': 'Warrior Paladin Hunter Rogue Mage Warlock', Daggers: 'Warrior Hunter Rogue Priest Shaman Mage Warlock Druid',
    'Fist Weapons': 'Warrior Hunter Rogue Shaman Druid', 'Two-Handed Axes': 'Warrior Paladin Hunter Shaman',
    'Two-Handed Maces': 'Warrior Paladin Shaman Druid', 'Two-Handed Swords': 'Warrior Paladin Hunter',
    Polearms: 'Warrior Paladin Hunter Druid', Staves: 'Warrior Hunter Priest Shaman Mage Warlock Druid',
    Bows: 'Warrior Hunter Rogue', Crossbows: 'Warrior Hunter Rogue', Guns: 'Warrior Hunter Rogue', Thrown: 'Warrior Hunter Rogue', Wands: 'Priest Mage Warlock'
  };
  const trainers = [
    ['Bows', 'Ilyenia (Darnassus)', 'Hanashi, Sayoc (Orgrimmar)'], ['Crossbows', 'Bixi (Ironforge), Woo Ping (Stormwind)', 'Archibald (Undercity)'],
    ['Daggers', 'Ilyenia, Bixi, Woo Ping', 'Sayoc, Archibald'], ['Fist Weapons', 'Ilyenia, Buliwyf (Ironforge)', 'Sayoc'], ['Guns', 'Buliwyf', 'Ansekhwa (Thunder Bluff)'],
    ['One-Handed Axes', 'Buliwyf', 'Hanashi, Sayoc'], ['One-Handed Maces', 'Buliwyf', 'Ansekhwa'], ['One-Handed Swords', 'Woo Ping', 'Archibald'],
    ['Polearms', 'Woo Ping', 'Archibald'], ['Staves', 'Ilyenia, Woo Ping', 'Hanashi, Sayoc, Ansekhwa'], ['Thrown', 'Ilyenia, Bixi', 'Hanashi, Sayoc'],
    ['Two-Handed Axes', 'Buliwyf', 'Hanashi, Sayoc'], ['Two-Handed Maces', 'Buliwyf', 'Ansekhwa'], ['Two-Handed Swords', 'Woo Ping', 'Archibald']
  ];
  const o = ['### Overview: The Rules', '', '| Rule | Value |', '|---|---|',
    '| **Skill cap** | 5 × your level (300 at 60) |', '| **Training** | 10s per weapon from level 10. Polearms cost 1g and need level 20 |',
    '| **Why it matters** | Low skill means more misses, dodges and glancing blows against monsters |',
    '| **PvP** | Skill counts as maxed against players in battlegrounds |',
    '| **New in Forever** | Druids can train **Polearms** |', '',
    '💡 Fist Weapons use your **Unarmed** skill. Level Unarmed early and your first fist weapon starts ready.', '',
    '---', '', '### Who Can Use What', '', `| Weapon | ${order.join(' | ')} |`, `|---|${order.map(() => '---').join('|')}|`,
    ...Object.entries(use).map(([w, c]) => `| **${w}** | ${order.map(x => (c.split(' ').includes(x) ? '✅' : '–')).join(' | ')} |`), '',
    'Warriors can use everything except wands. Mages, Priests and Warlocks know wands from the start, and no one else can learn them. Your starting skills depend on class and race: an Orc Hunter begins with bows, a Tauren Hunter with guns.', '',
    '---', '', '### Which Trainer Teaches It', '', '| Weapon | Alliance | Horde |', '|---|---|---|', ...trainers.map(t => `| **${t[0]}** | ${t[1]} | ${t[2]} |`), '',
    '---', '', '### Trainer Locations', '', '| Trainer | City | Coordinates | Teaches |', '|---|---|---|---|',
    '| **Woo Ping** | Stormwind, Trade District (Weller\'s Arsenal) | `57.1, 57.7` | Crossbows, Daggers, 1H Swords, Polearms, Staves, 2H Swords |',
    '| **Bixi Wobblebonk** | Ironforge, Military Ward | `62.2, 89.6` | Crossbows, Daggers, Thrown |',
    '| **Buliwyf Stonehand** | Ironforge, Military Ward | `61.2, 89.5` | Fist, Guns, Axes, Maces |',
    '| **Ilyenia Moonfire** | Darnassus, Warrior\'s Terrace | `57.7, 46.0` | Bows, Daggers, Fist, Staves, Thrown |',
    '| **Hanashi** | Orgrimmar, Valley of Honor | `81.5, 19.6` | Bows, Axes, Staves, Thrown |',
    '| **Sayoc** | Orgrimmar, Valley of Honor | `81.7, 19.6` | Bows, Daggers, Fist, Axes, Staves, Thrown |',
    '| **Ansekhwa** | Thunder Bluff, central rise | `40.0, 63.1` | Guns, Maces, Staves |',
    '| **Archibald** | Undercity, War Quarter | `57.3, 32.8` | Crossbows, Daggers, 1H Swords, Polearms, 2H Swords |', '',
    '---', '', '### Leveling a New Weapon Quickly', '',
    '- Train it when you are in the city anyway, then swap it in on easy quests. Small gaps cost far less time than one long catch-up.',
    '- Fight neutral enemies a little **below** your level that won\'t gang up on you. Change target when you get low instead of stopping to rest.',
    '- Only landed swings against a target that isn\'t evading can raise skill. Fast weapons swing more often.',
    '- Turn off your big hitters so the target lives longer.', '',
    `💡 Picking your next upgrade? Open the Weapons tab for the 1–60 upgrade path. For hit and raid math see ${guide('guide-combat-mechanics-hit-caps', 'hit caps')}.`, '',
    `📦 Trainers and class lists from [Wowhead Forever](https://www.wowhead.com/forever/guide/classes/weapon-trainer-skill-locations). Checked ${CHECKED}.`];
  return {
    id: 'guide-weapon-skills-trainers', title: 'Weapon Skills & Trainers: Who Can Use What, Where to Learn It',
    category: 'Leveling & Quests', source: 'Wowhead Forever', icon: ICON('inv_sword_27'),
    summary: 'Class-by-weapon chart, every weapon trainer with coordinates and cost, and how to level a new weapon without wasting time.',
    content: o.join('\n')
  };
}

/* ------------------------------------------------------------------ Bags */
function bags({ item, quest: q, guide, money, price, cheapest, realm, scanDate, CHECKED }) {
  const buyable = [[4240, 8], [5763, 10], [4245, 10], [5764, 12], [10050, 12], [1725, 12], [10051, 14], [1685, 14], [3914, 14], [14046, 14], [4500, 16], [14155, 18], [14156, 20]]
    .map(([id, n]) => ({ id, n, p: price(id) })).filter(x => x.p != null).sort((a, b) => a.p / a.n - b.p / b.n);
  const reagent = [[253664, 6, 'Linen'], [253667, 8, 'Woolen'], [253973, 10, 'Silk'], [254035, 12, 'Mageweave'], [254079, 14, 'Runecloth'], [254133, 18, 'Mooncloth'], [254139, 20, 'Bottomless']];
  const free = [
    [1537, 8, 'Poor Old Blanchy, Westfall (Alliance)'], [3343, 8, 'Captain Sander\'s Hidden Treasure, Westfall'], [918, 10, 'Deviate Hides, Wailing Caverns'], [6446, 10, 'Lady Anacondra, Wailing Caverns'],
    [1729, 10, 'The Night Watch, Duskwood (Alliance)'], [3352, 10, 'Digging Through the Ooze, Wetlands (Alliance)'], [270017, 10, 'Vyrin\'s Revenge, Loch Modan (Alliance)'], [933, 10, 'Foe Reaper 4000, Westfall'],
    [1470, 10, 'Gelihast, Blackfathom Deeps'], [932, 10, 'Fel Steed, Shadowfang Keep'], [276891, 12, 'Stronger than Steel, Mulgore (Horde)'], [221498, 12, 'Stepping Stones, sleeping bag chain'],
    [9587, 14, 'The Platinum Discs, Uldaman'], [11324, 14, 'Cortello\'s Riddle'], [19291, 14, '50 Darkmoon Faire tickets'], [11742, 16, 'Ribbly Screwspigot, Blackrock Depths'],
    [10959, 16, 'You Are Rakh\'likh, Demon, Blasted Lands'], [226697, 16, 'Red Bag Blues'], [260307, 18, 'Top of the Post, Mount Hyjal'], [262801, 18, 'Dala Fairmaw, Honored with Barkskin Burrow'], [22679, 18, 'Superior Armaments of Battle'], [17966, 18, 'Onyxia (from December 9)']
  ];
  const o = ['### Overview', '',
    'You have a 16-slot backpack, four bag slots and, new in Forever, a **reagent bag slot** for profession materials. Stacks are small (herbs 20, ore 10, flasks and potions 5), so space matters more than it looks.', '',
    '---', '', '### Free First Bag in Every Starting Zone', '', '| Zone | Bag (6 Slots) | Quest |', '|---|---|---|',
    `| Elwynn Forest | ${item(279936)} | ${q(91775, 'Book Return')} |`, `| Dun Morogh | ${item(277977)} | ${q(97277, 'Grund and Gozwin')} |`,
    `| Teldrassil | ${item(280088)} | ${q(87288, 'Soft Saber Pelts')} |`, `| Zephras Isle | ${item(256935)} | ${q(92515, 'The Problem With Prideclaws')} |`,
    `| Durotar | ${item(11845)} | ${q(791, 'Carry Your Weight')} |`, `| Mulgore | ${item(277200)} | ${q(95805, 'Grace of An\'she and Mu\'sha')} |`,
    `| Tirisfal Glades | ${item(279939)} | ${q(86784, 'Sticks and Bones')} |`, '',
    '---', '', '### Best Value on the Auction House', '', `Sorted by price per slot. 14-day medians, ${realm}, scanned ${scanDate}.`, '',
    '| Bag | Slots | Price | Per Slot |', '|---|---|---|---|', ...buyable.map(b => `| ${item(b.id)} | ${b.n} | ${money(b.p)} | **${money(b.p / b.n)}** |`), '',
    '💡 Replace your smallest bag first. Four cheap 12-slot bags do more for you while leveling than one 16-slot bag.', '',
    '---', '', '### Bags From Quests, Bosses and Vendors', '', '| Bag | Slots | Source |', '|---|---|---|', ...free.map(([id, n, s]) => `| ${item(id)} | ${n} | ${s} |`), '',
    'General goods vendors also sell 6, 8, 10 and 12-slot bags at fixed prices.', '',
    '---', '', '### Reagent Bags', '',
    `Gathering trainers sell a 4-slot starter bag: ${item(277113)}, ${item(277115)} or ${item(277114)}. Tailors make the general ones:`, '',
    '| Reagent Bag | Slots | Auction House | Cheapest |', '|---|---|---|---|',
    ...reagent.map(([id, n, name]) => { const c = cheapest(`${name} Reagent Bag`); return `| ${item(id)} | ${n} | ${money(price(id))} | ${c.cost == null ? '–' : `${money(c.cost)} (${c.how.toLowerCase()})`} |`; }), '',
    '| Specialty | Bags |', '|---|---|',
    `| **Herbs** | ${item(22250)} (12), ${item(22251)} (20), ${item(22252)} (24) |`,
    `| **Enchanting** | ${item(22246)} (16), ${item(22248)} (20), ${item(22249)} (24) |`,
    `| **Soul shards** | ${item(22243)} (12), ${item(22244)} (16), ${item(21340)} (20), ${item(21341)} (24), ${item(21342)} (28) |`,
    `| **Arrows** | ${item(2101)} (6), ${item(11362)} (10), ${item(7371)} (14), ${item(8217)} (16), ${item(18714)} (18) |`,
    `| **Bullets** | ${item(5441)} (8), ${item(7372)} (14), ${item(8218)} (16) |`, '',
    'Quivers and ammo pouches also raise ranged attack speed. Two do not stack.', '',
    '---', '', '### Bank Slots', '', 'Every character starts with 48 bank slots and can buy six bag slots:', '',
    '| Slot | 1 | 2 | 3 | 4 | 5 | 6 |', '|---|---|---|---|---|---|---|', '| **Cost** | 10s | 1g | 10g | 25g | 50g | 100g |', '',
    '- Buy the first two early: 1g 10s for two full bags of storage.',
    '- A quest item in the bank doesn\'t count until you carry it.',
    '- **Guild banks** hold items and gold and keep a log.',
    '- **Bank alt:** bags have no level requirement, and mail between your own characters is reported as instant.', '',
    `See also the ${guide('guide-sleeping-bag', 'Cozy Sleeping Bag')}: not storage, but its quest chain gives a 12-slot bag.`, '',
    `📦 Bag list from [Wowhead Forever](https://www.wowhead.com/forever/guide/bags-storage-bank), prices and crafting costs from this site. Checked ${CHECKED}.`];
  return {
    id: 'guide-bags-storage', title: 'Bags, Reagent Bags & Bank: Free Bags, Best Value per Slot and Storage Costs',
    category: 'Economy & Professions', source: 'Wowhead Forever · Auction House scan', icon: ICON('inv_misc_bag_10'),
    summary: `The free starting-zone bags, every bag worth getting, Auction House price per slot (${scanDate}), reagent bags and bank slot costs.`,
    content: o.join('\n')
  };
}

/* ------------------------------------------------------------------ Shen'dralar */
function shendralar({ item, stats, quest: q, guide, money, price, cell, realm, scanDate, CHECKED }) {
  const books = [['Warrior', 18357, 7499, 18466], ['Paladin', 18359, 7501, 18472, 'Alliance'], ['Hunter', 18361, 7503, 18473], ['Rogue', 18356, 7498, 18465], ['Priest', 18362, 7504, 18469], ['Shaman', 18363, 7505, 18471, 'Horde'], ['Mage', 18358, 7500, 18468], ['Warlock', 18360, 7502, 18467], ['Druid', 18364, 7506, 18470]];
  const librams = [
    ['Arcanum of Rapidity', 7483, 18329, [[18332, 1], [18335, 1], [14344, 2], [12938, 2]]],
    ['Arcanum of Focus', 7484, 18330, [[18333, 1], [18335, 1], [14344, 4], [12753, 2]]],
    ['Arcanum of Protection', 7485, 18331, [[18334, 1], [18335, 1], [14344, 2], [12735, 1]]]
  ];
  const cost = (parts) => parts.filter(([id]) => price(id) != null).reduce((a, [id, n]) => a + price(id) * n, 0);
  const unpriced = (parts) => parts.filter(([id]) => price(id) == null).map(([id, n]) => `${n}× ${item(id)}`).join(', ');
  const o = ['### Overview', '',
    'The **Shen\'dralar** are the last Highborne of Eldre\'Thalas, in the Athenaeum library of Dire Maul. There is no quartermaster ladder: the value is in what the turn-ins give you.', '',
    '| Source | Reputation |', '|---|---|', '| **Class book** (once per character) | 500 |', '| **Libram turn-in** (repeatable) | 200 |', '| **Enchanted Thorium book** | 200 |', '| **Quel\'Serrar chain** (Warrior, Paladin) | 1,000 in Classic; the sword is not confirmed in Forever |', '',
    `💡 Chasing the ${guide('guide-dawn-waker-secret', 'Dawn Waker')}? One player reached Honored and Prince Tortheldrin said nothing new, so don't grind reputation only for the secret.`, '',
    '---', '', '### Getting to the Library', '',
    '- **Dire Maul North (easiest):** up the ramp by Guard Mol\'dar, near the entrance, with very little fighting.',
    '- **Dire Maul West:** through the north-east exit of Immol\'thar\'s room.',
    `- **Doors:** ${item(18249)}, a Rogue with 275 lockpicking (or pickpocket Mol'dar), an Engineer's ${item(18594)} or a Blacksmith's ${item(15872)}.`, '',
    `Full routes: ${guide('guide-dungeon-dire-maul', 'Dire Maul guide')}.`, '',
    '---', '', '### Class Books and Trinkets', '',
    'Books drop from Dire Maul enemies and from A Dusty Tome inside. Each gives your class\'s Royal Seal of Eldre\'Thalas. Some seals have not been seen in Forever yet.', '',
    '| Class | Book | Quest | Trinket | AH Price (Book) |', '|---|---|---|---|---|',
    ...books.map(([c, b, qid, t, side]) => `| **${c}**${side ? ` (${side} quest)` : ''} | ${item(b)} | ${q(qid, 'Turn in')} | ${item(t)}${stats(t) ? ` (${cell(stats(t))})` : ''} | ${money(price(b))} |`), '',
    '---', '', '### Librams: Head and Leg Enchants', '',
    `First finish **Elven Legends** at the Skeletal Remains in the Athenaeum: ${q(7482, 'Alliance')}, from Scholar Runethorn in Feathermoon Stronghold, or ${q(7481, 'Horde')}, from Sage Korolusk in Camp Mojache. Then turn librams in to **Lorekeeper Lydros**.`, '',
    '| Enchant | Materials | Cost |', '|---|---|---|',
    ...librams.map(([, qid, r, parts]) => `| ${item(r)} (${q(qid, 'quest')}) | ${parts.map(([id, n]) => `${n}× ${item(id)}`).join(', ')} | **${money(cost(parts))}**${unpriced(parts) ? ` + ${unpriced(parts)}` : ''} |`), '',
    `📦 Costs add 14-day medians (${realm}, scanned ${scanDate}); anything after the + was not on the Auction House. Rare materials swing a lot, so check before you commit.`, '',
    '---', '', '### Enchanted Thorium Plans (Armorsmith Blacksmiths)', '', 'Combine both halves of a book and bring it to Lydros.', '',
    '| Plans | Top Half | Bottom Half |', '|---|---|---|',
    `| ${item(12727)} | King Gordok, Dire Maul North | Goraluk Anvilcrack, Lower Blackrock Spire |`,
    `| ${item(12726)} | Rattlegore, Scholomance | Crimson Hammersmith, Stratholme (Live) |`,
    `| ${item(12725)} | Urok Doomhowl, Lower Blackrock Spire | Black Guard Swordsmith, Stratholme (Undead) |`, '',
    `Tailors: the Shen'dralar Provisioner in the library sells ${item(18487)} in limited supply. No reputation needed.`, '',
    `📦 Turn-ins from [Wowhead Forever](https://www.wowhead.com/forever/guide/reputation/shendralar-reputation-faction-location-rewards), prices from this site. Checked ${CHECKED}.`];
  return {
    id: 'guide-shendralar-reputation', title: 'Shen\'dralar Reputation: Class Books, Arcanum Costs and the Dire Maul Library',
    category: 'Dungeons & Raids', source: 'Wowhead Forever · Auction House scan · item database', icon: ICON('inv_misc_book_09'),
    summary: 'Reaching the Dire Maul library, class book trinkets, what each Arcanum costs to make today, Enchanted Thorium plans and the Dawn Waker link.',
    content: o.join('\n')
  };
}
