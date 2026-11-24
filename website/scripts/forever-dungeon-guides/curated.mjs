/**
 * Hand-written text for the level 35-60 dungeons that are new in WoW Forever.
 * Items are ids only: names, levels and stats come from js/data/item-database-data.js at build time.
 *
 * Facts were checked November 24, 2026 against Wowhead Forever, Warcraft Tavern, Blizzard hotfix notes
 * and this site's ForeverDungeonJournal quest data. Where sources disagree the guide says so.
 * Quest fields: [id, name, side (A/H/B), min level, giver and place, what to do, what unlocks it, reward item ids]
 */
export const GUIDES = [
  {
    id: 'guide-the-drowned-city',
    slug: 'the-drowned-city',
    name: 'The Drowned City',
    title: 'The Drowned City: Full Dungeon Guide, Quests, Bosses & Loot (Levels 35–42)',
    icon: 'spell_frost_summonwaterelemental_2',
    levels: [35, 42], optimal: 38,
    zone: 'Stranglethorn Vale (west coast)',
    coords: '21.4, 27.9 (underwater cave)',
    access: 'No key. The entrance is underwater: swim west past the Vile Reef to the Sunken Hollow and look for the cave with a large stone tablet beside it.',
    intro: 'The lost Gurubashi city of **I\'lalai** has surfaced off the Stranglethorn coast. Trolls, Brinescale naga and the undead Saltseer pirates all hold part of it. Blizzard\'s range is 35–40; community guides stretch it to 42. Part of the route is underwater, so a **Warlock** (Unending Breath) or **Shaman** (Water Breathing) makes the run much smoother.',
    travel: [
      '**Horde:** zeppelin from Durotar to Grom\'gol, then swim west. The boat from Ratchet to Booty Bay also works.',
      '**Alliance:** fly to Booty Bay. Without that flight point, start from Darkshire in Duskwood and ride south, and pick up the Booty Bay flight point on the way.',
      '**After a wipe:** the spirit healer is just outside the entrance, so the run back is short.'
    ],
    quests: [
      [95788, 'Magics of the Drowned City', 'A', 30, 'Loremaster Dibbs, Southshore (`50.6, 57.0`)', 'Loot 5 I\'lalai Fetishes from the trolls', 'The Second Rebellion and Bad Medicine, through Troll Witchery', []],
      [95798, 'The Web of Magic', 'A', 30, 'Loremaster Dibbs, then Abra Cadabra in Dalaran', 'Deliver a fetish to Dalaran', 'Magics of the Drowned City', [279879, 279878]],
      [95787, 'Take Two With Water', 'A', 30, 'Loremaster Dibbs, Southshore (`50.6, 57.0`)', 'Make rubbings of the 4 Tablets of I\'lalai', 'Same lead-in as above', []],
      [95799, 'Findings for the Explorer\'s League', 'A', 30, 'Loremaster Dibbs, then Historian Karnik in Ironforge', 'Deliver the translations', 'Take Two With Water', [279880, 279881]],
      [97130, 'Ancient Gurubashi Secrets', 'A', 34, 'Archmage Timear, Dalaran (`15.6, 73.6`)', 'Recover an Ancient Gurubashi Idol', '–', []],
      [95775, 'The Drowned City', 'H', 30, 'Kin\'weelay, Grom\'gol (`32.2, 27.8`)', 'Make rubbings of the 4 Tablets of I\'lalai', 'The Vile Reef', []],
      [96078, 'A Tale Spun Around the Fire', 'H', 30, 'Kin\'weelay, then Master Gadrin in Sen\'jin Village', 'Deliver the tablet etchings', 'The Drowned City', [279885, 279886, 279887]],
      [95776, 'The Only Good Brinescale...', 'H', 30, 'Commander Aggro\'gosh, Grom\'gol (`32.2, 28.8`)', 'Kill Var\'Taka', 'Enemies in the Water and Locating the Lost City', [279888, 279889]],
      [96774, 'Ancient Gurubashi Idol', 'H', 30, 'Mazu\'kon, Skywatcher Plateau, Mulgore', 'Recover an Ancient Gurubashi Idol', '–', []],
      [95789, 'Shady Saltseers', 'B', 34, 'Krazek, Booty Bay (`27.0, 77.2`)', 'Loot 10 Voodoo-Infused Artifacts from the pirates', '–', [279882, 279930]],
      [95791, 'The Saltseer Captain', 'B', 34, 'Krazek, Booty Bay (`27.0, 77.2`)', 'Kill Captain Dreadrise and 3 Saltseer Coroners', '–', [279883, 279884]]
    ],
    questNote: 'The four tablets and the idol are easy to run past. Tell the group before the first pull that you need them.',
    trash: [
      ['Chasm Crawlers & Makrura Snappers', 'The opening packs. Crawlers come two or three at a time, hit hard and weaken Strength; Snappers stack Sunder Armor. One pack at a time until the tank knows how hard they hit.'],
      ['Risen Sentries & Profane Necros', 'Sentries charge and knock back, so fight stacked up with a wall behind you. Kill the Necro first or it keeps raising Drowned Spirits.'],
      ['Brinescale Sorcerers', 'The most dangerous trash here: heavy Frostbolts plus a fear in an area full of other packs. Pull around a corner, save interrupts for the fear and keep Tremor Totem down.']
    ],
    route: [
      { name: 'Zul\'Alai', text: 'Physical damage on the tank, a 3-second stun around him and a strike that slows attack and movement speed.', tank: 'He stands still while casting Monstrous Slam. Step out with melee if you can.', heal: 'Dispel the slow off the tank first. From 30% health he attacks 30% faster and heals himself every 5 seconds.', dps: 'Hold burst for the last 30% so the self-heal never matters.', loot: [274600, 274599, 274598] },
      { name: 'Var\'Taka', text: 'Two Brinescale Priestesses heal him. Clear the packs to the left and right before you start.', tank: 'Face him away: his cleave hits everyone in front.', heal: 'Harpooned players are pulled into melee. Expect a sudden hit there.', dps: 'Sheep or sap one Priestess and kill the other. Afterwards click the **Glowing Pearl** to drop the barrier.', loot: [274602, 274613, 274601] },
      { name: 'Primeval Elemental (optional)', text: 'Go right into the flooded tunnels from the Deep Archives. Killing every Undying Offering in his chamber wakes him.', tank: 'Single-target Waterbolts; nothing to position for.', heal: 'Freeze Water hits the whole group.', dps: 'Watch your breath bar and surface when you need to.', loot: [274612, 274615, 274611, 271718] },
      { name: 'Captain Dreadrise', text: 'Clear the deck fully; patrols wander into this fight. He can be stunned since the November 16 hotfix.', tank: 'You can be bubbled too, so have a second player ready to hold him.', heal: 'Waterbolt Volley hits everyone when it is not interrupted.', dps: 'Break the **Abyssal Bubble** at once, since it drowns whoever is inside. Interrupt the volley. Click the second Glowing Pearl afterwards.', loot: [274605, 274603, 274604] },
      { name: 'Deathless Marrow', text: 'An endurance fight. Guardians and Sorcerers keep coming until the boss dies, and Bloodbolt hits the whole group.', tank: 'Gather the Guardians: their Shield Slam stuns.', heal: 'Save mana for this one. The adds and Bloodbolt overlap near the end.', dps: 'Cleave onto the adds but keep the boss as your target. Fear or sheep when the room gets crowded.', loot: [274606, 274614, 274607] },
      { name: 'Min\'loth the Serpent', text: 'Two full health bars. He dies as a troll, then returns at 100% as a serpent.', tank: 'Drench is the tank hit in phase one.', heal: 'Deluge is channelled group damage. In phase two cleanse the poison volley from everyone.', dps: 'Keep cooldowns for the serpent, and Tremor Totem for his fear.', loot: [274609, 274608, 274610] },
      { name: 'Rares: Umbra, Gill and "Pyromancer" Braxton', text: 'Not every run has them. **Umbra** brings five murlocs whose bleeds stack up, so burn Umbra and then cleave. **Gill** throws dynamite on the path to the Primeval Elemental; pull him clear of the packs. **Braxton** shares the pirate area.', loot: [286662, 286658, 286649, 286646, 286650, 286651] }
    ],
    trashLoot: [286997, 286998, 286999, 287000, 287001, 287002, 287003, 287004, 287005, 287006],
    fixes: [
      ['November 9', 'Creatures lost about 30% extra damage. Deathless Marrow lost 25% health and its adds were toned down.'],
      ['November 11', 'Trash respawns after 2 hours instead of 1.'],
      ['November 16', 'Dreadrise can be stunned, Braxton reacts to combat and the Abyssal Bubble can no longer block, dodge or parry.']
    ],
    tips: ['Structured crowd control beats area pulls here. Nearly everything is humanoid or undead, so plan Polymorph, Sap and Shackle between you.', 'Underwater sections punish slow looting. Refresh water breathing before each dive.', 'Bring the Booty Bay quests even on a repeat run: they also give Steamwheedle reputation.']
  },
  {
    id: 'guide-kroldok-stronghold',
    slug: 'kroldok-stronghold',
    name: 'Krol\'dok Stronghold',
    title: 'Krol\'dok Stronghold: Full Dungeon Guide, Quests, Bosses & Loot (Levels 40–45)',
    icon: 'inv_helmet_25',
    levels: [40, 45], optimal: 43,
    zone: 'The Riverglades (north)',
    coords: '37.5, 37.3 (small cave beside the main gates)',
    access: 'No key to get in. The large fortress gates stay closed: the way in is the small cave beside them, on the hill above Sunnyglade.',
    intro: 'The Krol\'dok ogres have thrown in with the **Twilight\'s Hammer** and the Shadowhide gnolls, and their fortress is one of the biggest of the new dungeons. Plan a long session. Inside, the Riverglades zone map keeps showing your position, so you can navigate with the normal world map.',
    travel: [
      '**Horde:** fly to Rog\'mar in the Riverglades, or ride in from the Badlands.',
      '**Alliance:** fly to Farholde Keep and go north, or ride in through Redridge.',
      '**After a wipe:** the spirit healer is just outside the entrance.'
    ],
    quests: [
      [94982, 'Eye of Mugg', 'A', 40, 'Commander Demar Brant, Farholde Keep (`66.6, 81.0`)', 'Bring proof of Overlord Mugg\'s death', 'Curious Trinkets, Scraps of Knowledge and Saving Sunnyglade', [279852, 279853, 279480]],
      [94984, 'Tome of Twilight', 'A', 39, 'Ashe Amberhall, Farholde Keep (`66.6, 81.0`)', 'Kill Nar\'gurk and take what he carries', 'Same lead-in', [279854, 279855]],
      [94983, 'Twilight Mementos', 'A', 38, 'Sergeant Riftan, Twilight\'s Shroud (`30.6, 49.0`)', 'Loot 8 Twilight Bangles', 'Same lead-in', []],
      [94998, 'Curios of Curiosity', 'A', 38, 'Ashe Amberhall, then Melanie Sable (`66.2, 83.2`)', 'Deliver the Satchel of Mementos', 'Twilight Mementos, then Lingering Essence', [279850]],
      [96771, 'Vengeance of the Highborne', 'A', 37, 'Ranath Nightstride, Dalaran inn (`17.8, 66.0`)', 'Kill Zalfan Moonshadow (after Tunk, before the bridge)', '–', []],
      [94981, 'Key Ingredients', 'A', 38, 'Alphonse Dumas, Farholde Keep (`64.4, 82.0`)', '4 Thick Leather and 12 Iron Bars', 'Krol\'dok Moulding, dropped by Tunk inside', [267089]],
      [94968, 'Eye of Mugg', 'H', 40, 'Krom\'rosh, Rog\'mar (`59.4, 45.5`)', 'Bring proof of Overlord Mugg\'s death', 'Krom\'rosh\'s quests up to The Wayward Warrior', [279852, 279480, 279853]],
      [94972, 'Tome of Twilight', 'H', 39, 'Tran\'gul, Rog\'mar (`59.4, 44.0`)', 'Recover the Tome of Twilight', 'Same lead-in', [279859, 279860]],
      [94975, 'A Token of Vengeance', 'H', 38, 'Da\'grosh, Twilight\'s Shroud (`33.4, 38.0`)', 'Loot 15 Cultist Ears', 'Same lead-in', [267090]],
      [94974, 'Key Ingredients', 'H', 38, 'Kreza Darkthorn, Rog\'mar (`59.8, 46.0`)', '4 Thick Leather and 12 Iron Bars', 'Krol\'dok Moulding, dropped by Tunk inside', [267089]]
    ],
    questNote: 'Keep the **Krol\'dok Moulding** that Tunk drops. It starts the chain for the Krol\'dok Compound Key.',
    trash: [
      ['Twilight Grunts', 'The deadliest packs in the fortress. Each one Bladestorms for area damage within 8 yards and sunders the tank. With more than two in a pack, crowd control one and stun the rest.'],
      ['Twilight Outriders', 'Mounted trios that patrol the long roads and net the tank for 10 seconds while they shoot. Break line of sight; Blessing of Freedom removes the net.'],
      ['Twilight Peons', 'Sprint off to alert other packs. Slow or stun them on sight.'],
      ['Krol\'dok Shamans & Centurions', 'Shamans cast Bloodlust on everything near them, so they die first. Centurions use Mortal Strike, which makes the tank hard to heal.']
    ],
    route: [
      { name: 'Slavecrusher Grox', text: 'Patrols the mines. Clear a pocket of gnolls and fight him there.', tank: 'Keep a defensive for Bloodlust: the knockdown leaves you helpless for 2 seconds.', heal: 'Have the tank topped off before each knockdown.', dps: 'Redridge Prisoners he calls in are weak non-elites. Clear them, then go back to Grox.', loot: [274996, 274997, 274995, 273101] },
      { name: 'Twilight Commander Zarmok', text: 'Clear the cultists around him until he can be pulled alone.', tank: 'Hold him still and well away from ranged players.', heal: 'Rending Whirl hurts anyone inside 8 yards. Stand outside it.', dps: 'Melee back out for the whirl.', loot: [274999, 275000, 274998] },
      { name: 'War Handler Ashka', text: 'Fought with her wolves Snarlfang and Terrorhowl.', tank: 'Keep Ashka busy; you will lose the wolves when she gives the order.', heal: 'Command: Kill! sends both wolves at a random player for 10 seconds. Watch that player, not the tank.', dps: 'Kill the wolves one after the other, stunning as you go, then Ashka.', loot: [275002, 275003, 275001] },
      { name: 'Nar\'gurk', text: 'Has a Shadowhide Curseweaver and two Twilight Warlocks with him. Control or kill them first.', tank: 'Do not drag him through controlled adds.', heal: 'Shadow Bolt Volley hits the group. Stop healing a converted player until the charm breaks.', dps: '**Convert** charms a player until they are beaten down to 50% health. Swap at once, and stop at 50%.', loot: [275006, 275005, 275004] },
      { name: 'Bossman Toof', text: 'Starts as a gauntlet. Pulling the Centurions on the bridge begins waves of two Brutes that keep coming, with another pack and two Shamans before the boss.', tank: 'Finish a Brute wave, then pull Toof straight away so you have the most time before the next.', heal: 'Mortal Strike cuts healing on the tank. Use cooldowns early.', dps: 'Control both Shamans. A Rogue\'s Distract can delay a wave on the bridge.', loot: [286429, 286428, 286430] },
      { name: 'Overlord Mugg', text: 'Deal with his two Centurions before you push him: he only gets more dangerous as his health drops.', tank: 'He swaps weapons through the fight and ends with mauls that add 50% damage. Save your big cooldown for them.', heal: 'Crushing Slam leaps to random players and knocks back everyone near them.', dps: 'Spread out with no unpulled trash behind you.', loot: [275010, 275008, 275007, 275009, 271721] },
      { name: 'Kroog', text: 'A smaller named ogre recorded in ForeverDungeonJournal. His abilities have not been reported.', loot: [279863, 279857] }
    ],
    trashLoot: [287007, 287008, 287009, 287010, 287011, 287012, 287013, 287014, 287015, 287016],
    fixes: [],
    tips: ['The Krol\'dok plate pieces from Nar\'gurk and the trash belong to a 5-piece set. See Codex → Armor Sets.', 'Make the kill order clear before each pull: Shaman, Grunt, Centurion.', 'Mugg\'s key item and the Compound Key are separate things. The key quest pays off on later runs.']
  },
  {
    id: 'guide-alcaz-prison',
    slug: 'alcaz-prison',
    name: 'Alcaz Prison',
    title: 'Alcaz Prison: Full Dungeon Guide, Boss Order, Quests & Loot (Levels 48–54)',
    icon: 'inv_misc_key_10',
    levels: [48, 54], optimal: 51,
    zone: 'Dustwallow Marsh (Alcaz Island)',
    coords: '75.3, 14.1 (basement of the northern building)',
    access: 'No key to get in. Inside, the **Overseer\'s Keyring** from Overseer Wrex opens the barred doors on the right side.',
    intro: 'A short, Stockade-style prison where the Defias and the Strashaz naga are fighting each other while both factions look for the missing King Varian Wrynn. It is quick, but every enemy is elite, and one boss is worth **leaving alive** until the end.',
    travel: [
      '**Alliance:** boat from Menethil Harbor to Theramore, then swim or water-walk north to the western dock of Alcaz Island.',
      '**Horde:** fly to Brackenwall Village, or come south by water from Ratchet.',
      '**On the island:** take the hill path from the dock to the northern building and go down to the cellar. Keep away from the elites on the south side.'
    ],
    warning: '**Do not kill The Questioner on the way through.** Mason Connery only offers The Man in the Iron Chains while The Questioner is alive, and that quest starts the [Alcaz Operative disguise](#guides/guide-secret-toys). Finish the dungeon, talk to Mason, then go back for him.',
    quests: [
      [95262, 'The Secret Prison', 'A', 48, 'Sully McCleary, Theramore graveyard (`63.4, 42.4`)', 'Learn what happened to the king', 'Our Man in Theramore (Mathias Shaw, Stormwind), Watch Yer Back, The Return of the King?', []],
      [95263, 'Somber News', 'A', 48, 'Inside, then Sully McCleary', 'Report back', 'The Secret Prison', []],
      [95264, 'Shaw Needs To Know', 'A', 48, 'Sully McCleary, then Mathias Shaw', 'Report to Stormwind', 'Somber News', [279831, 279833]],
      [96381, 'A Bit of Wet Work', 'A', 48, 'Sully McCleary (`63.4, 42.4`)', '15 Strashaz Soldiers, 8 Enchantresses and Ca\'zass\'s Head', 'Same lead-in', [279825, 279826, 279829]],
      [96772, 'The Dragon\'s Journal', 'A', 46, 'Archmage Lan\'dalock, Dalaran (`15.4, 73.8`)', 'Loot Zarla\'s Journal from the last boss', '–', []],
      [95309, 'No Orc Left Behind', 'H', 48, 'Sergeant Ulka, Alcaz Island (`70.2, 18.8`)', 'Find Commander Folkar inside', 'The Missing Kor\'kron (Eitrigg, Orgrimmar), then Nazeer Bloodspike in Brackenwall', []],
      [95454, 'The Honor of the Kor\'kron', 'H', 48, 'Commander Folkar, inside', 'Search for King Varian; ends at the Perfumed Note behind the last boss', 'No Orc Left Behind', []],
      [96369, 'Bad News for Folkar', 'H', 48, 'Perfumed Note, inside', 'Tell Folkar', 'The Honor of the Kor\'kron', []],
      [95483, 'Thrall Needs to Know', 'H', 48, 'Commander Folkar, then Thrall', 'Report to Orgrimmar', 'Bad News for Folkar', [279831, 279833, 279474]],
      [96332, 'A Little Payback', 'H', 48, 'Sergeant Ulka (`70.2, 18.8`)', '15 Strashaz Soldiers, 8 Enchantresses and Ca\'zass\'s Head', 'Same lead-in', [279824, 279826, 279829]],
      [96334, 'Blood Red Bandanas', 'H', 48, 'Sergeant Ulka, then Eitrigg', 'Loot 8 bandanas from the Defias guards', 'Same lead-in', [279448, 279473]],
      [96335, 'The Man in the Iron Chains', 'B', 48, 'Mason Connery, inside, after the last boss', 'Kill The Questioner and bring the Ornate Shackle Key', 'The Questioner must still be alive', []],
      [96337, 'More Valuable Than Gold', 'B', 48, 'Mason Connery', 'Find his stash upstairs in the Moonbrook inn, Westfall (`43.4, 67.8`)', 'The Man in the Iron Chains', [274041]]
    ],
    questNote: 'Horde: some guides list other coordinates for Sergeant Ulka. Two separate sources put Ulka outside the prison at about `70.2, 18.8`.',
    trash: [
      ['Strashaz Enchantresses & Soldiers', 'Enchantresses sheep players and cast Frostbolt Volley: interrupt both. Soldiers charge anyone 8 or more yards away, so fight on top of them.'],
      ['Alcaz Chaplains & Jailers', 'Chaplains heal and always die first. Jailers cleave, so turn them away from the group.'],
      ['Defias Truthfinders & Renegade Conjurers', 'A wall of caster damage. Pull them around a corner, control one when there are four or more, and interrupt Fireball once no Chaplain is up.'],
      ['Hounds', 'They charge players who run. Stand and fight.']
    ],
    route: [
      { name: '1. Tidemistress Ca\'zass', text: 'Straight ahead from the entrance, with two Enchantresses.', tank: 'Drag her out of the Blizzard she drops on herself.', heal: 'Dispel Frost Nova so nobody is stuck in the Blizzard.', dps: 'Control or kill the Enchantresses first.', loot: [276737, 276736, 276735, 273883] },
      { name: '2. Overseer Wrex', text: 'Left wing. He calls every enemy in the three cell rooms he patrols, so **sneak past him and clear all three rooms first**.', tank: 'Mortal Strike halves healing on you for 5 seconds. Rotate defensives around it.', heal: 'Top the tank before Mortal Strike lands.', dps: 'One player loots the **Overseer\'s Keyring**, which opens the right side.', loot: [276733, 276734, 276732, 263992] },
      { name: '3. Katerina the Cleaner', text: 'Lower corridor, with two Chaplains. Leave the chained prisoners alone until she is dead.', tank: 'Her Deadly Poison is on you; ask for a cleanse.', heal: 'Grievous Garrote keeps bleeding its target until they are above **90% health**. Early reports also mention heavy fire damage in this room.', dps: 'Sheep, sap or fear the Chaplains, or kill them first.', loot: [276739, 276740, 276738] },
      { name: '4. Zarla Ober / Blazeroar', text: 'Starts as a human caster. At 30% she becomes a red dragon with full health. The Perfumed Note is in a concealed room past her arena.', tank: 'Flame Breath and Thrash are the biggest hits in the dungeon. Keep a defensive, potion or healthstone for phase two.', heal: 'Searing Scales ticks on everyone in phase two.', dps: 'Move out of Flamestrike in phase one. Her fear hits everyone except the tank, so use Tremor Totem. One report has fire spells doing nothing to the dragon.', loot: [276745, 276746, 276744, 276890] },
      { name: '5. The Questioner (last)', text: 'Behind the barred door to the right of the entrance. Go back once Mason Connery has given his quest.', tank: 'Pull the side adds first. The boss himself is simple.', heal: 'Dispel Drain Life; Rend is minor. Players report a long fight, so mind your mana.', dps: 'Steady damage, no burst window.', loot: [276741, 276742, 276743, 274029] }
    ],
    trashLoot: [287017, 287018, 287019, 287020, 287021, 287022, 287023, 287024, 287025, 287026],
    fixes: [],
    tips: ['The **Defias Enforcer\'s Garb** is a 5-piece leather set: shoulders from The Questioner, legs from Blazeroar, and mask, chest and boots from trash (bind on equip).', 'Sources list the bosses in different orders. The order here follows the layout and protects Mason\'s quest.', 'The final boss is 53, so a group of 50s is comfortable.']
  },
  {
    id: 'guide-blackmaw-hold',
    slug: 'blackmaw-hold',
    name: 'Blackmaw Hold',
    title: 'Blackmaw Hold: Full Dungeon Guide, Route, Quests & Loot (Levels 55–60)',
    icon: 'ability_druid_demoralizingroar',
    levels: [55, 60], optimal: 58,
    zone: 'Azshara (north)',
    coords: '38.7, 33.4 (furbolg tunnel)',
    access: 'No key. Follow the long furbolg tunnel; the portal at the far end is on the Winterspring map at about `66.6, 84.4`. Several quests need **Neutral with Timbermaw Hold**.',
    intro: 'The city of the Blackmaw furbolgs, corrupted by the Legashi satyrs. It is about the size of Maraudon or Blackrock Depths, with outdoor groves where you can mount, several branches and four rare spawns. Blizzard has also confirmed an entrance to the **Barrow Deeps** raid inside.',
    travel: [
      '**Horde:** fly to Valormok. Otherwise ride in from Splintertree Post, or leave Orgrimmar by its western exit and go north.',
      '**Alliance:** fly to Talrendis Point. Otherwise start from Astranaar or Ratchet.',
      '**After a wipe:** the spirit healer is just outside.'
    ],
    quests: [
      [92065, 'Blackmaw Reclamation', 'B', 47, 'Gatekeeper Rageroar, Azshara (`42.4, 20.2`)', 'Bring the Head of Varrox Bleakhoof', 'Neutral with Timbermaw Hold; The Legashi Threat from Ekkal', [260216, 260217, 260218, 260219]],
      [92066, 'The Twin Bears', 'B', 47, 'Lorekeeper Nok, Azshara (`41.4, 20.0`)', 'Find the Totems of Ursoc and Ursol', 'Neutral with Timbermaw Hold', [279891, 279892]],
      [92069, 'Claws That Rend, Tusks that Gore', 'B', 45, 'Ogtinc, Azshara (`42.4, 42.6`)', 'Loot Withermaw\'s claws and Bonesnout\'s tusks', '–', [260213, 260214, 260215]],
      [97327, 'Blackmaw Pouches', 'B', 55, 'Ekkal, Ruins of Eldarath (`42.0, 38.8`)', 'Loot 5 Blackmaw Pouches', 'Repeatable afterwards for Timbermaw reputation', []],
      [92070, 'A Lost Memento', 'B', 47, 'Feathered Charm Necklace, random drop inside (one player only)', 'Return it to Unele in Ursolan (`43.4, 17.4`)', '–', [279893]],
      [92067, 'Feeding Time!', 'B', 45, 'Flesh-Eating Lasher, inside', 'Bring Fel-Tainted Flesh', 'Repeatable', [249900]],
      [97173, 'Blackmaw Magic', 'A', 52, 'Archmage Timear, Dalaran (`15.6, 73.6`)', 'Loot the Blackmaw Ritual Totem from Bloodmane', '–', []],
      [92344, 'Get to the Roots of It', 'A', 45, 'Mathrengyl Bearwalker, Darnassus (`35.2, 8.4`)', 'Loot 10 Nordrassil Root Caps', 'Starts with Commander Truesong, Talrendis Point (`11.8, 78.2`)', []],
      [97198, 'Blackmaw Magic', 'H', 52, 'Muln Earthfury, Skywatcher Plateau, Mulgore (`33.4, 22.5`)', 'Loot the Blackmaw Ritual Totem from Bloodmane', '–', []],
      [92343, 'Get to the Roots of It', 'H', 45, 'Nara Wildmane, Thunder Bluff (`75.6, 31.0`)', 'Loot 10 Nordrassil Root Caps', 'Beneath Nordrassil from Jediga, Valormok (`22.4, 51.4`)', []]
    ],
    questNote: 'Minimum levels come from quest data, so some quests open well before the dungeon is realistic. Coordinates for Nok, Ogtinc and Muln are wrong in some guides; these are cross-checked.',
    trash: [
      ['Headhunters & Berserkers', 'Cleanse the Headhunter\'s poison and stun Berserkers when they enrage.'],
      ['Blackmaw Champions', 'An area fear plus a 2-second tank stun. Kill them first and keep Tremor Totem down, or pull back to cleared ground.'],
      ['Plaguebringers & Bloated Grizzlies', 'Plaguebringers summon disease-spreading swarmers. Grizzlies explode on death: ranged stay out, and cleanse anyone caught.'],
      ['Legashi Summoners', 'Fear plus a pack of Swarming Imps that blow up when they die. Kill the imps a few at a time rather than all at once.']
    ],
    route: [
      { name: '1. Withermaw', text: 'Festering Grotto, east along the path from the first village.', tank: 'Maul is a plain hit. Pick up the maggots as they appear.', heal: 'Intimidating Roar fears everyone for 8 seconds. Fear Ward on you is ideal.', dps: 'Flesh Maggots are fragile; clear them quickly.', loot: [280064, 280062, 280063, 249697] },
      { name: '2. Bonesnout the Unbroken', text: 'The thicket south-east of the Grotto. He takes **no damage** until four Legashi Ritualists in the thicket are dead; each one removes 25% of the shield.', tank: 'He patrols, so track him while the group hunts Ritualists.', heal: 'Stay out of melee: Stomp stuns for 2 seconds.', dps: 'Four Ritualists, then the boss.', loot: [280061, 280059, 280060, 249696] },
      { name: '3. Impaan the Imprisoner', text: 'Up the winding path from Blackmaw Grove to the Defiled Peak. Clear a space before the pull.', tank: 'All of his shadow damage goes to you.', heal: 'Single-target healing on the tank.', dps: 'His three imps cut damage to him by **99%**. Kill them first every time.', loot: [280058, 280057, 280056] },
      { name: '4. Unbound Spirit', text: 'Cross the hollow tree and take the side passage south. Talk to Elder Bramblesnap to begin.', tank: 'Pick up the Ethereal Beasts while the group is on the totems.', heal: 'Fire Nova keeps ticking on everyone.', dps: 'Break the three Profane Totems one by one, then clear beasts. The spirit itself has little health.', loot: [280072, 280073, 280071] },
      { name: '5. Elder Shaman Bloodmane', text: 'East and down from the Unbound Spirit.', tank: 'Hold two Feral Spirits along with the boss.', heal: 'Purge strips your buffs; Chain Lightning punishes stacking.', dps: 'Boss first. The spirits stay after he dies, so finish them afterwards.', loot: [280070, 280069, 280068, 276893] },
      { name: '6. Clawbert & the Blackmaw Behemoth', text: 'North and down the ramp. Clawbert dies first, and the Behemoth eats him and gains his Lightning Bolt.', tank: 'In the second half it channels a whirlwind and follows you slowly. Walk it away from everyone.', heal: 'The roar lowers the group\'s damage, so the fight lasts longer than you expect.', dps: 'Clawbert, then the Behemoth; stay out of the whirlwind.', loot: [280067, 280066, 280065] },
      { name: '7. Varrox Bleakhoof (final)', text: 'Jump down the hole in the Behemoth\'s room.', tank: 'Move him when Crimson Wrest pools reach melee.', heal: 'Nightmare Detonation pulls a player in and explodes on everyone near them. Heal the group during that cast.', dps: 'Run from the marked player. Keep Tremor Totem for the fear so nobody is sent through a pool.', loot: [280076, 280075, 280074, 249692] },
      { name: 'Rares: Moontouched Wanderer, Tunnelweb Matriarch, Mopes, Gortek the Apprentice', text: 'Tougher trash rather than real bosses. Dispel the **Wanderer\'s** Moonfire and stun its enrage. The **Matriarch** is stealthed, poisons and webs for 10 seconds. **Mopes** only casts Shadow Bolt. Interrupt **Gortek\'s** Lightning Bolt.', loot: [280079, 280080, 280086, 280085, 280081, 280082, 280078, 280077] }
    ],
    trashLoot: [287028, 287029, 287030, 287031, 287032, 287033, 287034, 287035, 287036, 252893, 251453],
    fixes: [['After launch', 'Entrance Blackmaw Devotees, which are not elite, no longer drop elite loot and silver.']],
    tips: ['Claws That Rend needs a drop from **both** Withermaw and Bonesnout, so agree on the full route before you start.', 'Shortcut: a Slow Fall or levitation-style jump from the ledge at the start lands close to the Behemoth.', 'Four quests share the Azshara camps near `42, 20` and `42, 40`. Collect them in one ride before you enter.']
  },
  {
    id: 'guide-shapers-terrace',
    slug: 'shapers-terrace',
    name: 'Shaper\'s Terrace',
    title: 'Shaper\'s Terrace: Full Dungeon Guide, Crystal Consoles, Quests & Loot (Levels 58–60)',
    icon: 'inv_misc_gem_variety_02',
    levels: [58, 60], optimal: 60,
    zone: 'Un\'Goro Crater (northern rim)',
    coords: '48.1, 6.1 (above Marshal\'s Refuge)',
    access: 'No key or attunement. The four console bosses each need **15 power crystals of one color**.',
    intro: 'A titan facility overrun by Un\'Goro\'s wildlife, and the hardest of the new five-player dungeons. It is large and not linear, with **ten bosses**: five that roam or guard an area, four summoned from crystal consoles, and Nanaya. Boss drops are item level 63. Wowhead suggests starting at 57, Blizzard and Warcraft Tavern list 58–60.',
    travel: [
      '**Both factions:** fly to Marshal\'s Refuge and climb the hill behind the Northern Crystal Pylon. The nearest other flight point is Gadgetzan.',
      '**After a wipe:** the spirit healer is just outside.'
    ],
    quests: [
      [95924, 'Panic at the Digsite', 'A', 55, 'Curator Thorius, Hall of Explorers, Ironforge (`72.8, 16.8`)', 'Kill Venomridge, 6 Ravasaur Matriarchs and 8 Ironhide Ravasaurs', '–', [279903, 279905]],
      [95925, 'Mapping the Way Forward', 'A', 55, 'Curator Thorius', 'Map five landmarks: Pillar of Assimilation, Achromatic Crystal, Western Gates, Regrowth Vestibule, Unearthed Stone Watcher', 'Has a lead-in quest', [279908, 279910, 279912]],
      [95790, 'Digestible Research', 'A', 55, 'Partially Digested Journal, near the entrance inside', 'Collect 15 journal pages', '–', [279931, 279901]],
      [95928, 'Crystalline Elements', 'H', 55, 'Mayena Earthseeker, Skywatcher Plateau, Mulgore (`34.8, 22.2`)', 'Bring a Moist, Charged, Noxious and Fiery Crystal', '–', [279904, 279906]],
      [97049, 'Essence of Seeping Slimes', 'H', 55, 'Chemist Fuely, Apothecarium, Undercity (`48.0, 72.2`)', 'Loot 8 essences from the slime pools', '–', [279932, 279902]],
      [95926, 'The Dark Crystal', 'H', 55, 'Master Apothecary Faranell, Apothecarium (`48.6, 69.6`)', 'Take a Drained Crystal Fragment beside the Achromatic Crystal', '–', [279908, 279910, 279912]]
    ],
    questNote: 'Digestible Research is on the Alliance side in Warcraft Tavern\'s list and has Alliance reputation rewards. Each city quest giver is a separate trip, so collect them before you fly to Un\'Goro.',
    extra: {
      heading: 'Power Crystals & Consoles',
      lines: [
        '| Console | Crystals | Boss | Where |',
        '|---|---|---|---|',
        '| **Blue** | 15 Blue | Snowtalon | Cave behind the waterfall on the Path of the Shaper |',
        '| **Red** | 15 Red | Cinder | Up the mountain path south of the waterfall, past the fire elementals |',
        '| **Yellow** | 15 Yellow | Bolt | Along the wall by Venomridge\'s patrol |',
        '| **Green** | 15 Green | Vitrix | Regrowth Vestibule, near Izha\'Rel and Tor\'Rel |',
        '',
        '- One player needs **all 15** in their bags, or the console shows no option.',
        '- Crystals grow in Un\'Goro and inside the dungeon. Bringing 60 saves a lot of time.',
        '- **Crystal converter:** the white crystal by the tar pits trades 10 of one color for 5 of another.',
        '- The boss appears at once. Clear the area first.',
        '- With all four consoles done, use the Titan Panel on the **Pillar of Assimilation** to wake Nanaya.'
      ]
    },
    trash: [
      ['Devilsaurs & Tyranosaurs', 'A 5-second area fear. Use Tremor Totem, or pull back so nobody runs into another pack. They can be stunned.'],
      ['Ravasaur Hunters & Matriarchs', 'Stacking bleeds that can kill a tank. Single-target them instead of cleaving the pack.'],
      ['Ravasaur Juveniles & Stalkers', 'Juveniles sprint across the dungeon and Stalkers are stealthed. An empty clearing is rarely empty.'],
      ['Tar Walkers & Tar Lurkers', 'Roots, self-heals and disarms. Black Sludge slows movement and attacks for **30 minutes**, so bring a disease cleanse.']
    ],
    route: [
      { name: 'Titanosaur', text: 'Appears when you reach the waterfall and then patrols the path.', tank: 'Mighty Blow knocks you back. Keep a cleared area or wall behind you.', heal: 'His fear is the same as the Devilsaurs\': Tremor Totem or Fear Ward.', dps: 'Wait for a clear pull.', loot: [280010, 280011, 280009] },
      { name: 'Snowtalon (blue console)', text: 'Frost Nova plus Howling Blast within 8 yards.', tank: 'Hold him still.', heal: 'You come first, then melee: the tank must live through the frost damage.', dps: 'Ranged stay out. Melee step away to be healed when it gets heavy.', loot: [280026, 280027] },
      { name: 'Cinder (red console)', text: 'Conflagration disables the top threat target for 4 seconds and Cinder turns to whoever is second.', tank: 'Ask a sturdy player to sit second on threat.', heal: 'Have a heal ready for that second player.', dps: 'Ranged at maximum distance. Do not race the tank.', loot: [280028, 280029] },
      { name: 'Venomridge', text: 'One mechanic that matters: Poison Bolt Volley on the whole group.', tank: 'Ignore the slow.', heal: 'Every poison cleanse in the group should be in use.', dps: 'Alliance: he counts for Panic at the Digsite.', loot: [280016, 280017, 280015] },
      { name: 'Bolt (yellow console)', text: 'Chain Lightning on up to four players and Thunderclap in melee. Reported **immune to Nature damage**.', tank: 'Hold him away from ranged.', heal: 'Spread out and the damage is light.', dps: 'Elemental Shamans and Balance Druids should plan other spells.', loot: [280031, 280032] },
      { name: 'Thunderhoof', text: 'Shock on the tank, Chain Lightning and Thunderclap.', tank: 'Move him out of each Lightning Cloud.', heal: 'Damage comes in single bursts, not steadily.', dps: 'Spread and stay out of clouds.', loot: [280019, 280018, 280020] },
      { name: 'Vitrix (green console)', text: 'Poison Shock was cut in the November 19 hotfix after hitting for about 2,000, but it still hurts.', tank: 'Face him away; the shock hits players near you.', heal: 'Keep the tank close to full. Leech Poison heals the boss.', dps: 'Cleanse if you can. Loot sources differ: Wowhead and players list items shared with the other console bosses.', loot: [280031, 280028, 280032] },
      { name: 'Izha\'Rel & Tor\'Rel', text: 'A raptor pair that cannot be separated. Kill **Tor\'Rel** first.', tank: 'Tor\'Rel enrages near 30% for 50% attack speed.', heal: 'Dispel the stacking fire effect and the chill.', dps: 'Focus one target. Splitting damage makes the fire stacks unmanageable.', loot: [280013, 280014, 280012] },
      { name: 'Direhorn Matriarch', text: 'Puncture stacks on the tank, so this is a race.', tank: 'Cooldowns late, when the stacks are high.', heal: 'Tank damage only grows.', dps: 'Everyone stacks at her **side, within 10 yards**. That avoids both the charge and the tail lash.', loot: [280045, 280022, 280021] },
      { name: 'Nanaya (final)', text: 'She draws power from one crystal at a time and gains that color\'s attack; players report a change every 25% health.', tank: 'Face Sonic Screech away from the group. Powerful Slam stuns anyone near for 2 seconds.', heal: 'Stay out of slam range.', dps: '**Green:** leave the poison pool. **Red:** melee out of Blast Wave. **Yellow:** spread for Chain Lightning. **Blue:** leave the Blizzard.', loot: [280024, 280025, 280023, 273116, 273128] }
    ],
    trashLoot: [287037, 287038, 287039, 287040, 287041, 287042, 287043, 287044, 287045, 287046],
    fixes: [['November 9', 'Vitrix, Snowtalon and Cinder drop the right loot.'], ['November 19', 'Vitrix\'s Poison Shock deals less damage.']],
    tips: ['An ideal group has a Shaman for Tremor Totem and cleansing, plus a second poison dispel.', 'Warcraft Tavern reports that only five of the ten bosses are needed for the dungeon to count as complete, but not which five.', 'Nanaya\'s Blueprint: Arcane Forge is for [Camping](#guides/guide-camping-master).']
  }
];
