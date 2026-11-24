/**
 * Hand-written content for the classic level 29–60 dungeon guides.
 * Boss names must match js/data/forever-instances-data.js (ForeverDB) exactly; loot, quests and
 * BiS-60 callouts are attached automatically by build-guides.mjs.
 *
 * Tactics describe the Classic encounters. As of Nov 22, 2026 Blizzard has not published encounter
 * changes for these dungeons, so anything Forever-specific lives in `forever` with its source date.
 */

export const GUIDES = [
  {
    slug: 'razorfen-kraul',
    title: 'Razorfen Kraul: Full Dungeon Guide & Boss Tactics',
    icon: 'inv_misc_head_quilboar_01',
    zone: 'The Barrens (Southern Razorfen Thornhedge)',
    coords: '40.8, 87.2',
    intro: 'A thorny quilboar warren in the southern Barrens, run by Charlga Razorflank and her death speakers. It is a compact, mostly linear dungeon and a good first stop once your group reaches the high 20s.',
    travel: [
      'Horde: fly to Camp Taurajo and ride south-west past the Great Lift road to the thornhedge.',
      'Alliance: fly to Thalanaar (Feralas border) or take the long road south from Ratchet; there is no Alliance flight point close by.'
    ],
    access: 'No key or attunement.',
    route: [
      { wing: 'The Warren', bosses: ['Roogug', 'Aggem Thorncurse', 'Death Speaker Jargba', 'Overlord Ramtusk', 'Agathelos the Raging', 'Charlga Razorflank'] }
    ],
    tactics: {
      'Roogug': 'Quilboar shaman pack at the entrance tunnels. Interrupt his heals and kill totems as they drop.',
      'Aggem Thorncurse': 'Summons a boar companion and heals. Kill the boar or crowd-control it, interrupt heals, then burn Aggem.',
      'Death Speaker Jargba': 'Casts Dominate Mind on a party member. Keep a fear, polymorph or stun ready for the controlled player and stay spread from the pull so the charmed player cannot chain onto healers.',
      'Overlord Ramtusk': 'Pulls with the nearby guards. Clear the platform first, then tank him away from the ramp so adds do not join.',
      'Agathelos the Raging': 'Enrages at low health and hits hard. Save cooldowns and healer mana for the last 30%.',
      'Charlga Razorflank': 'Heals herself and her adds. Kill the adds first, interrupt every Chain Heal and bring a poison/disease cleanser for the trash leading up to her.'
    },
    tips: [
      'Quilboar packs include healers and Frenzy casters: mark kill order on every pull.',
      'Several RFK quests start in the Barrens and Thousand Needles; check the quest table below before you go in.'
    ],
    forever: []
  },
  {
    slug: 'gnomeregan',
    title: 'Gnomeregan: Full Dungeon Guide & Boss Tactics',
    icon: 'inv_gizmo_02',
    zone: 'Dun Morogh (Gnomeregan, west of Kharanos)',
    coords: '24.7, 39.8',
    intro: 'The irradiated gnome capital, overrun by troggs and Mekgineer Thermaplugg. It is long and maze-like, with two entrances and plenty of engineering loot.',
    travel: [
      'Alliance: ride west from Ironforge/Kharanos to the front door, or use the Tinker Town elevator inside Ironforge to reach the back entrance.',
      'Horde: there is no nearby Horde flight point. Fly to Hammerfall (Arathi Highlands) and ride through the Wetlands and Loch Modan into Dun Morogh, or summon at the front door.'
    ],
    access: 'No key. The Workshop Key (from the dungeon\'s mechanic area) opens the side door shortcut for repeat runs.',
    route: [
      { wing: 'Outer Gnomeregan & Hall of Gears', bosses: ['Grubbis', 'Viscous Fallout'] },
      { wing: 'Launch Bay & Engineering Labs', bosses: ['Electrocutioner 6000', 'Crowd Pummeler 9-60'] },
      { wing: 'Tinkers\' Court', bosses: ['Mekgineer Thermaplugg'] }
    ],
    tactics: {
      'Grubbis': 'Optional trogg boss with Chomper the pet. Talk to Blastmaster Emi Shortfuse to start the escort; Grubbis spawns with the last wave. Bring AoE and stay on Emi.',
      'Viscous Fallout': 'An ooze that applies a stacking nature DoT and corrosive debuffs. Melee can rotate out; cleanse disease/poison where possible.',
      'Electrocutioner 6000': 'Chain Lightning and Shock. Spread out so chains do not jump. He carries the Workshop Key.',
      'Crowd Pummeler 9-60': 'Knocks the tank away and hits everyone in front. Tank him against a wall and keep the group behind him.',
      'Mekgineer Thermaplugg': 'Bomb bots spawn from the wall vents. Assign one player to press the vent buttons as they light up, kill any bomb that gets through, and burn the boss while he is in melee.'
    },
    tips: [
      'Gnomeregan trash includes radiation-casting troggs and leper gnomes that flee and pull more. Use stuns and keep pulls tight.',
      'Engineers can loot extra schematics here; take an engineer if your group can.'
    ],
    forever: []
  },
  {
    slug: 'scarlet-monastery',
    title: 'Scarlet Monastery: All 4 Wings Guide (Graveyard, Library, Armory, Cathedral)',
    icon: 'inv_misc_tabardpvp_04',
    zone: 'Tirisfal Glades (north-east, past Brill)',
    coords: '84.9, 30.6',
    intro: 'The Scarlet Crusade stronghold in Tirisfal, split into four separate instances that you run in level order. It is the main 30–45 leveling hub, and the Cathedral needs a key from the Library.',
    travel: [
      'Horde: fly to the Undercity or Brill and ride east along the road to the monastery courtyard.',
      'Alliance: fly to Chillwind Camp (Western Plaguelands), ride north into Tirisfal and east to the monastery. Hearth-back via Southshore for repeat runs.'
    ],
    access: 'Graveyard, Library and Armory are open. The Cathedral needs the Scarlet Key, which drops from Doan\'s area chest at the end of the Library (one per player; it stays in the key ring).',
    route: [
      { wing: 'Graveyard (around level 30–35)', bosses: ['Interrogator Vishas', 'Bloodmage Thalnos'] },
      { wing: 'Library (around 33–38)', bosses: ['Houndmaster Loksey', 'Arcanist Doan'] },
      { wing: 'Armory (around 36–41)', bosses: ['Herod'] },
      { wing: 'Cathedral (around 38–45)', bosses: ['High Inquisitor Fairbanks', 'High Inquisitor Whitemane'] }
    ],
    tactics: {
      'Interrogator Vishas': 'Simple tank-and-spank with a Shadow Word: Pain. He yells when hurt; nearby packs can join, so clear the room first.',
      'Bloodmage Thalnos': 'Fire and shadow caster with Flame Spike. Use line of sight to pull him to melee and interrupt casts.',
      'Houndmaster Loksey': 'Comes with three dogs. Kill or crowd-control the dogs, then Loksey. His Bloodlust can be purged/dispelled.',
      'Arcanist Doan': 'At half health he casts Arcane Bubble, then a big Detonation. Run out of range as soon as the bubble goes up, then return. Polymorph is used on random players: dispel it.',
      'Herod': 'Whirlwinds at intervals and enrages at low health. Ranged and healers stay back; melee step out during Whirlwind. When he dies, a wave of Scarlet Trainees runs in: AoE them down at the door.',
      'High Inquisitor Fairbanks': 'Optional boss in a hidden room behind the Cathedral altar (open the door on the left side). Dispels and heals; easy with interrupts.',
      'High Inquisitor Whitemane': 'Kill Scarlet Commander Mograine first. Whitemane then enters, puts the group to sleep and resurrects Mograine. Break sleeps if you can (Tremor Totem, Will of the Forsaken, trinkets), kill Mograine again, then interrupt her heals and finish her.'
    },
    tips: [
      'Clear the Cathedral courtyard carefully: the Scarlet guards call for help and patrols are frequent.',
      'Graveyard and Library quests are the best XP; the Armory and Cathedral are mostly for gear.'
    ],
    forever: []
  },
  {
    slug: 'razorfen-downs',
    title: 'Razorfen Downs: Full Dungeon Guide & Boss Tactics',
    icon: 'spell_shadow_raisedead',
    zone: 'The Barrens (south-east, above Thousand Needles)',
    coords: '49.0, 93.9',
    intro: 'The quilboar burial grounds, taken over by the Scourge and Amnennar the Coldbringer. Expect lots of undead, diseases and one gong event.',
    travel: [
      'Horde: fly to Camp Taurajo and ride south to the Great Lift, then follow the thorns east.',
      'Alliance: fly to Thalanaar or Freewind Post area routes; most groups summon at the entrance.'
    ],
    access: 'No key. Blizzard lists it as 25+; the ForeverDB/client range is used here.',
    route: [
      { wing: 'The Downs', bosses: ['Tuten\'kash', 'Plaguemaw the Rotting', 'Mordresh Fire Eye', 'Ragglesnout', 'Glutton', 'Amnennar the Coldbringer'] }
    ],
    tactics: {
      'Tuten\'kash': 'Summoned by ringing the gong in the central room: three waves of spiders, then the boss. Bring AoE for the waves and a poison cleanse.',
      'Plaguemaw the Rotting': 'Rare boss. Disease-heavy melee: cleanse and keep him tanked away from casters.',
      'Mordresh Fire Eye': 'Fire caster with shields. Interrupt Fireball and kill the escort skeletons first.',
      'Ragglesnout': 'Rare quilboar caster who uses Dominate Mind and heals. Interrupt and break the charm quickly.',
      'Glutton': 'Big abomination with an AoE disease cloud. Melee rotate out; he enrages at low health.',
      'Amnennar the Coldbringer': 'Frost Nova and Frostbolt Volley; at two health thresholds he summons Frozen Spectres. AoE the spectres, keep the tank topped through the volleys and use frost resistance if you have it.'
    },
    tips: [
      'Disease and poison are constant here: Paladins, Priests, Shamans and Druids make the run much easier.',
      'Many quests start in the Barrens and Thousand Needles; check the quest table below before you go in.'
    ],
    forever: []
  },
  {
    slug: 'uldaman',
    title: 'Uldaman: Full Dungeon Guide & Archaedas Tactics',
    icon: 'inv_misc_platnumdisks',
    zone: 'Badlands (front entrance north; back entrance east)',
    coords: '42.9, 13.4 (front) · 65.8, 43.7 (back)',
    intro: 'A Titan excavation dug into by the Dark Iron dwarves and troggs. It has two entrances, a long quest chain to the Discs of Norgannon, and a final Titan guardian that wakes the room.',
    travel: [
      'Alliance: fly to Thelsamar or Kargath-side routes; the front entrance is reached from the Loch Modan pass.',
      'Horde: fly to Kargath and ride north-east to the back entrance (saves time for repeat Archaedas runs).'
    ],
    access: 'No key. The Staff of Prehistoria (quest chain) is needed to open the dig room; most groups have someone with it. Blizzard lists it as 30+; the client range is used here.',
    route: [
      { wing: 'Dig Site & Hall of the Crafters', bosses: ['Revelosh', 'The Lost Dwarves', 'Ironaya', 'Obsidian Sentinel'] },
      { wing: 'Khaz\'Goroth\'s Seat & the Map Chamber', bosses: ['Ancient Stone Keeper', 'Galgann Firehammer', 'Grimlok', 'Archaedas'] }
    ],
    tactics: {
      'Revelosh': 'Trogg caster with Chain Lightning. Spread out and interrupt.',
      'The Lost Dwarves': 'Baelog, Eric and Olaf fight together on a platform. Kill Eric (the caster) first, then Baelog; Olaf is a heavy hitter but slow.',
      'Ironaya': 'Opened with the Staff of Prehistoria. She knocks the tank up and hits hard. Tank her against a wall so knockbacks do not throw the tank into the room.',
      'Obsidian Sentinel': 'Spawns Obsidian Shards as he is damaged. Burn him fast and AoE the shards; do not let them stack up.',
      'Ancient Stone Keeper': 'Pulses Sand Storms (small tornado adds). Kite them or kill them, keep DPS on the boss.',
      'Galgann Firehammer': 'Fire Nova and Amplify Flames. Melee step out when he casts.',
      'Grimlok': 'Rides a basilisk; kill the basilisk first, then Grimlok. He uses Bloodlust: dispel/purge it.',
      'Archaedas': 'Click the altar to start. He awakens Earthen Guardians and then Vault Warders over the fight. Assign an off-tank for warders and keep healers safe; kill adds, then focus Archaedas.'
    },
    tips: [
      'Uldaman has 25 quests in this data, more than any other dungeon here. Most start in Loch Modan, the Badlands and Ironforge.',
      'Keep the Staff of Prehistoria in your bags; it is needed for Ironaya each run.'
    ],
    forever: []
  },
  {
    slug: 'zul-farrak',
    title: 'Zul\'Farrak: Full Dungeon Guide & Pyramid Event',
    icon: 'inv_misc_head_troll_01',
    zone: 'Tanaris (north-west desert ruins)',
    coords: '39.2, 19.8',
    intro: 'A sand-troll city in the Tanaris desert. The highlight is the pyramid event, where the group frees prisoners and holds the stairs against waves of trolls.',
    travel: [
      'Both factions: fly to Gadgetzan and ride west/north-west to the gates. Hearth to Gadgetzan for repeat runs.'
    ],
    access: 'No key. The Mallet of Zul\'Farrak (from the Hinterlands, Altar of Zul) is needed to summon Gahz\'rilla.',
    route: [
      { wing: 'Outer City', bosses: ['Antu\'sul', 'Theka the Martyr', 'Witch Doctor Zum\'rah', 'Hydromancer Velratha'] },
      { wing: 'The Pyramid', bosses: ['Nekrum Gutchewer', 'Shadowpriest Sezz\'ziz', 'Chief Ukorz Sandscalp'] },
      { wing: 'Sacred Pool (optional)', bosses: ['Gahz\'rilla'] }
    ],
    tactics: {
      'Antu\'sul': 'Summons basilisk waves and heals himself. Kill the healing ward and adds, then burn him.',
      'Theka the Martyr': 'At low health he turns into a scarab and becomes immune to physical damage: casters finish him. Nearby scarabs swarm, so keep AoE ready.',
      'Witch Doctor Zum\'rah': 'Raises zombies from the graveyard. Pull him away from the graves and kill his ward.',
      'Hydromancer Velratha': 'Water caster near the Sacred Pool. Interrupt Healing Wave; she drops a Tablet of Theka quest item.',
      'Nekrum Gutchewer': 'Fought with Sezz\'ziz after the pyramid stair waves. Kill Sezz\'ziz first (healer and psychic scream), then Nekrum.',
      'Shadowpriest Sezz\'ziz': 'Heals Nekrum and casts Psychic Scream. Interrupt and focus him first.',
      'Chief Ukorz Sandscalp': 'Fought with Ruuzlu. Tank them apart; Ukorz cleaves and enrages. Kill Ruuzlu first if your tank is struggling.',
      'Gahz\'rilla': 'Summoned by using the Mallet of Zul\'Farrak at the pool gong. Ice Blast and Slam knock players back; avoid standing near the cliff edge.'
    },
    tips: [
      'Pyramid event: free Sergeant Bly\'s group, then hold the top of the stairs. Waves come from all sides; AoE and a strong healer keep it safe.',
      'Bly\'s group turns hostile after the event. Kill them for the Divino-matic Rod key item.'
    ],
    forever: []
  },
  {
    slug: 'maraudon',
    title: 'Maraudon: Full Dungeon Guide (Purple, Orange & Inner Wings)',
    icon: 'inv_misc_root_02',
    zone: 'Desolace (Maraudon, west of the Valley of Spears)',
    coords: '29.0, 62.5',
    intro: 'A huge cavern of corrupted centaur, satyrs and the earth princess Theradras. Two outer wings meet at Zaetar\'s Grave and the inner sanctum.',
    travel: [
      'Horde: fly to Shadowprey Village and ride north-east.',
      'Alliance: fly to Nijel\'s Point and ride south through the Valley of Spears.'
    ],
    access: 'No key. The Scepter of Celebras (quest) opens the shortcut from the outer area to the inner sanctum for faster repeat runs.',
    route: [
      { wing: 'Purple (Satyr) Wing', bosses: ['Noxxion', 'Razorlash'] },
      { wing: 'Orange (Centaur) Wing', bosses: ['Lord Vyletongue'] },
      { wing: 'Inner Maraudon', bosses: ['Tinkerer Gizlock', 'Celebras the Cursed', 'Landslide', 'Rotgrip', 'Princess Theradras'] }
    ],
    tactics: {
      'Noxxion': 'Splits into poison slimes at intervals. AoE the slimes and cleanse the poison.',
      'Razorlash': 'Cleaves and hits hard; tank faces him away and the group stays behind.',
      'Lord Vyletongue': 'Satyr who blinks and multi-shots. Kill his guards, keep him in melee range with stuns.',
      'Tinkerer Gizlock': 'Goblin with bombs and a gun. Easy if you interrupt and stay out of the bomb area.',
      'Celebras the Cursed': 'Roots and summons corrupted forces. Free roots with Freedom/Escape Artist; after the kill, speak with his spirit for the Scepter chain.',
      'Landslide': 'Knockbacks and summoned rock adds. Tank against a wall, AoE adds.',
      'Rotgrip': 'Big crocolisk in the water room. Simple, but watch out for the patrols around the lake.',
      'Princess Theradras': 'Repulsive Gaze knocks players back, and Dust Field pulses. Tank her near a wall so knockbacks do not scatter the group, and keep healers out of melee. Defeat her to free Zaetar\'s Spirit.'
    },
    tips: [
      'Princess runs are a classic gold and gear farm: groups often skip both wings and go straight in via the waterfall.'
    ],
    forever: [
      { date: 'Nov 9, 2026', source: 'Blizzard hotfix', text: 'Fixed a progression blocker where Zaetar\'s Spirit did not spawn after Princess Theradras was defeated.' }
    ]
  },
  {
    slug: 'sunken-temple',
    title: 'Sunken Temple (Temple of Atal\'Hakkar): Full Dungeon Guide',
    icon: 'inv_misc_idol_03',
    zone: 'Swamp of Sorrows (sunken temple lake)',
    coords: '69.5, 53.5',
    intro: 'The drowned temple of the Atal\'ai trolls, guarded by a green dragonflight. It is a multi-level puzzle dungeon with the Avatar of Hakkar event and Shade of Eranikus at the bottom.',
    travel: [
      'Horde: fly to Stonard and ride east to the lake; dive into the temple ruins.',
      'Alliance: fly to Nethergarde Keep and ride north-west into the swamp.'
    ],
    access: 'No key. For the Avatar of Hakkar, someone needs the Egg of Hakkar (from the Atal\'ai quest chain in Tanaris).',
    route: [
      { wing: 'Upper Ring & Statue Room', bosses: ['Atal\'alarion'] },
      { wing: 'Dragonkin Balconies', bosses: ['Dreamscythe', 'Weaver', 'Hazzas', 'Morphaz'] },
      { wing: 'Inner Sanctum', bosses: ['Jammal\'an the Prophet', 'Avatar of Hakkar', 'Shade of Eranikus'] }
    ],
    tactics: {
      'Atal\'alarion': 'Activate the statues in the correct order in the bottom room to summon him. He knocks players back and hits hard; ranged spread around the room.',
      'Dreamscythe': 'Green dragon with Acid Breath and Wing Buffet. Tank faces him away; nobody stands in front.',
      'Weaver': 'Paired with Dreamscythe on the balconies. Same rules: face away, avoid the front.',
      'Hazzas': 'Spawns with Morphaz after the balcony dragons. Breath and Wing Buffet; kill one at a time.',
      'Morphaz': 'Fights with Hazzas. Drops the Essence of Eranikus quest item.',
      'Jammal\'an the Prophet': 'Hexes players and heals. His partner Ogom curses; dispel hexes and kill Jammal\'an fast.',
      'Avatar of Hakkar': 'Use the Egg of Hakkar to start. Kill Hakkari Bloodkeepers to extinguish the braziers with the Hakkari Blood they drop. When the Avatar spawns, tank him away from the group; his curse lowers stats and he silences.',
      'Shade of Eranikus': 'Final dragon. Sleeps players and breathes. Spread out, keep him tanked facing away and use Nature resistance if you have it.'
    },
    tips: [
      'Level 50 class quests end here, and Forever gives all three rewards: see [Sunken Temple class quests](#guides/guide-sunken-temple-class-quests) before you enter.',
      'The temple is three stacked rings. Learn the balcony route before pulling: falling into the central pit means a long walk back.'
    ],
    forever: []
  },
  {
    slug: 'blackrock-depths',
    title: 'Blackrock Depths: Full Dungeon Guide (Prison, Ring of Law, Emperor)',
    icon: 'inv_misc_key_08',
    zone: 'Blackrock Mountain (between Searing Gorge and Burning Steppes)',
    coords: 'Blackrock Mountain, lower level',
    intro: 'The Dark Iron capital under Blackrock Mountain. With 21 encounters it is the biggest dungeon in the game and the main level 52–60 hub for quests, keys, attunements and pre-raid gear.',
    travel: [
      'Horde: fly to Kargath (Badlands) or Flame Crest (Burning Steppes) and ride into the mountain.',
      'Alliance: fly to Thorium Point (Searing Gorge) or Morgan\'s Vigil (Burning Steppes).',
      'Inside Blackrock Mountain, take the chain down to the lower level for BRD; LBRS/UBRS are on the upper level.'
    ],
    access: 'No key for the prison and Ring of Law. The Shadowforge Key (quest chain from Kalaran Windblade in Searing Gorge) opens the Shadowforge City gate; Prison Cell Key and Shadowforge Lockpicking open the side doors.',
    route: [
      { wing: 'Detention Block & Ring of Law', bosses: ['High Interrogator Gerstahn', 'Lord Roccor', 'Houndmaster Grebmar', 'Ring of Law', 'Pyromancer Loregrain'] },
      { wing: 'Shadowforge City & Lyceum', bosses: ['Warder Stilgiss', 'Fineous Darkvire', 'Bael\'Gar', 'Lord Incendius', 'General Angerforge', 'Golem Lord Argelmach', 'Ambassador Flamelash', 'The Vault'] },
      { wing: 'Grim Guzzler', bosses: ['Hurley Blackbreath', 'Phalanx', 'Ribbly Screwspigot', 'Plugger Spazzring'] },
      { wing: 'The Seven & the Imperial Seat', bosses: ['The Seven', 'Magmus', 'Princess Moira Bronzebeard', 'Emperor Dagran Thaurissan'] }
    ],
    tactics: {
      'High Interrogator Gerstahn': 'Shadow priest in the detention block. Interrupt Psychic Scream and Shadow Word: Pain; simple.',
      'Lord Roccor': 'Fire elemental with Earth Shock and Flame Shock. Stay spread and interrupt.',
      'Houndmaster Grebmar': 'Paired with a pack of hounds. Kill the hounds, then Grebmar.',
      'Ring of Law': 'Talk to High Justice Grimstone to start. Random waves of beasts then a random boss (Anub\'shiah, Eviscerator, Gorosh, Grizzle, Hedrum, Ok\'thor). Fight in the centre and keep healers in sight of everyone.',
      'Pyromancer Loregrain': 'Fire caster near the Shrine of Thaurissan. Interrupt and kill his totems.',
      'Warder Stilgiss': 'Frost caster in the vault area; paired with Verek the hound. Kill Verek after Stilgiss or crowd-control him.',
      'Fineous Darkvire': 'Holy caster; heals himself. Interrupt heals. Drops part of the Ironfoe quest line.',
      'Bael\'Gar': 'Fire giant on the Molten Span. Calls molten adds during the fight; AoE them and use fire resistance on the tank.',
      'Lord Incendius': 'Fire elemental lord at the Black Anvil. Fire Storm and Mighty Blow; tank him with his back to the lava and use fire resistance.',
      'General Angerforge': 'At 30% health he calls a wave of medics and warriors. Burn him before the wave or kite them while killing him.',
      'Golem Lord Argelmach': 'Activates nearby golems when pulled. Clear the golems first, then fight him alone.',
      'Ambassador Flamelash': 'Use the runes on the Chamber of Enchantment balconies to stop fire spirits from spawning, or kill spirits as they appear.',
      'The Vault': 'Open the vault for the Dark Coffer and the Secret Safe. Watch for the guardians when the door opens.',
      'Hurley Blackbreath': 'Steal the Thunderbrew lager in the Grim Guzzler to make him appear with guards.',
      'Phalanx': 'Big golem in the bar. Disarm-immune; tank and burn.',
      'Ribbly Screwspigot': 'Goblin in the bar with bodyguards. Killing him angers some NPCs; plan it if you need his drops.',
      'Plugger Spazzring': 'Bartender. Stealing from his kegs makes him and the bar hostile.',
      'The Seven': 'Talk to Doom\'rel to start: seven dwarves attack one by one. Each has a different school; keep the tank on the active one and use crowd control if two arrive.',
      'Magmus': 'Fire golem on the bridge to the throne room. Burn him while the statues breathe fire; stay out of the flame lanes.',
      'Princess Moira Bronzebeard': 'Fought with the Emperor. Moira heals him: interrupt her heals, but do not kill her if you are on the Alliance quest chain.',
      'Emperor Dagran Thaurissan': 'Tank him away from Moira. Hand of Thaurissan stuns and Avatar of Flame hits hard. Kill him after interrupting Moira.'
    },
    tips: [
      'BRD runs are split by goal: Lava Run (Incendius, Golem Lord, Magmus, Emperor), Arena runs, Jailbreak (Marshal Windsor quest) or Bar/Emperor runs.',
      'BRD has 23 quests in this data: chain them across several runs.'
    ],
    forever: [
      { date: 'Nov 9, 2026', source: 'Blizzard hotfix', text: 'The Throne Room doors reopen after a wipe on Emperor Dagran Thaurissan, and the Heart of the Mountain can be looted more than once.' }
    ]
  },
  {
    slug: 'lower-blackrock-spire',
    instanceSlug: 'blackrock-spire',
    title: 'Lower Blackrock Spire (LBRS): Full Dungeon Guide & Seal of Ascension',
    icon: 'inv_misc_key_11',
    zone: 'Blackrock Mountain (upper level)',
    coords: 'Blackrock Mountain, upper level',
    intro: 'The orc and troll lower levels of the Blackrock Spire, ruled by Overlord Wyrmthalak. It is a key stop for level 55–60 quests and for the Seal of Ascension that opens Upper Blackrock Spire.',
    travel: [
      'Use the same Blackrock Mountain flight points as BRD (Kargath, Flame Crest, Thorium Point, Morgan\'s Vigil).',
      'Inside the mountain, go up the ramp to the Blackrock Spire entrance instead of down the chain.'
    ],
    access: 'No key. Collect the Seal of Ascension gems here (Gemstones of Spirestone, Smolderthorn and Bloodaxe from Omokk, Vosh\'gajin and Voone) for the UBRS key.',
    route: [
      { wing: 'Spirestone & Skitterweb Tunnels', bosses: ['Highlord Omokk', 'Mother Smolderweb'] },
      { wing: 'Hordemar City', bosses: ['Shadow Hunter Vosh\'gajin', 'War Master Voone', 'Quartermaster Zigris', 'Halycon', 'Gizrul the Slavener'] },
      { wing: 'Mok\'Doom & Tazz\'Alaor', bosses: ['Urok Doomhowl', 'Overlord Wyrmthalak'] }
    ],
    tactics: {
      'Highlord Omokk': 'Ogre with a big knockback. Clear the ogres on his ledge and tank him with his back to the wall.',
      'Mother Smolderweb': 'Spider queen with a stacking poison and Crystallize stun. Cleanse poisons and keep the tank well healed.',
      'Shadow Hunter Vosh\'gajin': 'Hexes and curses. Dispel and decurse; kill her quickly.',
      'War Master Voone': 'Switches between attacks and throws axes. Stand behind him and kill nearby trolls first.',
      'Quartermaster Zigris': 'Shoots and drinks healing potions. Stuns or interrupts stop the heal.',
      'Halycon': 'Worg matriarch; Gizrul spawns when she dies. Burn her, then pick up Gizrul.',
      'Gizrul the Slavener': 'Fear and Frenzy. Tremor Totem/Fear Ward help; tranquilise/soothe the frenzy.',
      'Urok Doomhowl': 'Summoned with the Urok\'s Tribute pile and the Omokk\'s Head quest item. Waves of ogres, then Urok; AoE and keep healers safe.',
      'Overlord Wyrmthalak': 'At low health he calls two Bloodaxe Veterans. Save cooldowns to kill him after they arrive.'
    },
    tips: [
      'Seal of Ascension (Classic steps): the Unadorned Seal drops in LBRS; add the three gemstones and hand it to Vaelan by the LBRS entrance, then charge the forged seal by defeating Emberstrife in Dustwallow Marsh. Collect all three gemstones in one run if you can.',
      'Horde players start the Onyxia attunement here with Warlord\'s Command (Omokk, Voone and Wyrmthalak): see the [Onyxia Attunement guide](#guides/guide-onyxia-attunement).'
    ],
    forever: [
      { date: 'Oct 20, 2026', source: 'Blizzard raid overview', text: 'The Horde Onyxia attunement says to fight Warchief Rend Blackhand in Lower Blackrock Spire. In Classic, and in Wowhead\'s Forever loot data, he is in Upper Blackrock Spire, which is where this site lists him.' }
    ]
  },
  {
    slug: 'upper-blackrock-spire',
    instanceSlug: 'blackrock-spire',
    title: 'Upper Blackrock Spire (UBRS): Full Dungeon Guide & General Drakkisath',
    icon: 'inv_misc_head_dragon_black',
    zone: 'Blackrock Mountain (upper level, through LBRS)',
    coords: 'Blackrock Mountain, upper level',
    intro: 'The black dragonflight halls above LBRS: Pyroguard Emberseer, Warchief Rend Blackhand, The Beast and General Drakkisath. It is the end point of both Onyxia attunement chains and a top pre-raid BiS source.',
    travel: [
      'Enter Blackrock Spire as for LBRS and take the left ramp to the UBRS door.'
    ],
    access: 'Classic required the Seal of Ascension (one group member) to open the door. Most Forever guides say it is still required, but Blizzard has not confirmed it; check before forming a group. Our dungeon list shows UBRS as a 10-player instance, which Blizzard has also not announced officially.',
    route: [
      { wing: 'Hall of Blackhand & Emberseer', bosses: ['Pyroguard Emberseer'] },
      { wing: 'Rookery & Stadium', bosses: ['Warchief Rend Blackhand'] },
      { wing: 'Halls of Binding & Drakkisath', bosses: ['The Beast', 'Lord Valthalak', 'General Drakkisath'] }
    ],
    tactics: {
      'Pyroguard Emberseer': 'Clear the Blackhand Incarcerators in the room, which wakes him. Fire damage and Fire Nova; stack fire resistance on the tank and keep healers out of melee.',
      'Warchief Rend Blackhand': 'Talk to Nefarius in the stadium to start waves of orcs and dragonkin, then Rend and Gyth. Stand in the corner by the gate, AoE the waves and focus Gyth when it lands.',
      'The Beast': 'Fire breath, Fireball and a fear. Tank him against the back wall facing away and use Fear Ward/Tremor Totem.',
      'Lord Valthalak': 'Summoned with the Brazier of Beckoning from the Valthalak quest chain. Optional; casts shadow bolts and calls spectral assassins.',
      'General Drakkisath': 'Two Chromatic Elite Guards protect him. Pull them away or off-tank them, then tank Drakkisath facing away (Flamestrike and Cleave). Fire resistance helps a lot.'
    },
    tips: [
      'Bring fire resistance gear and potions: three of the four main bosses deal heavy fire damage.',
      'Drakkisath\'s room completes Blood of the Black Dragon Champion (Horde) and the Alliance Onyxia attunement step. Full chains: [Onyxia Attunement guide](#guides/guide-onyxia-attunement).'
    ],
    forever: [
      { date: 'Nov 17, 2026', source: 'Blizzard hotfix', text: 'Fixed enemy health and damage being much lower than intended; UBRS is back to full group difficulty.' },
      { date: 'Nov 20, 2026', source: 'Blizzard hotfix', text: 'A stone pillar in Blackrock Spire no longer traps players.' },
      { date: 'Oct 20, 2026', source: 'Blizzard raid overview', text: 'The Horde Onyxia attunement says to fight Warchief Rend Blackhand in Lower Blackrock Spire. In Classic, and in Wowhead\'s Forever loot data, he is in Upper Blackrock Spire. If he is not here, check the other wing.' }
    ]
  },
  {
    slug: 'dire-maul',
    title: 'Dire Maul: East, West & North Guide (Tribute Run & Lashers)',
    icon: 'inv_misc_key_10',
    zone: 'Feralas (Dire Maul ruins)',
    coords: '59.3, 45.0',
    intro: 'The ruined Highborne city of Eldre\'Thalas in Feralas, split into three wings. East is a fast quest wing, West holds the Highborne and Immol\'thar, and North is the ogre wing with the famous Tribute Run.',
    travel: [
      'Alliance: fly to Feathermoon Stronghold or Thalanaar and ride to the ruins.',
      'Horde: fly to Camp Mojache and ride west.'
    ],
    access: 'East is open. West and North need the Crescent Key, which drops from Pusillin in Dire Maul East.',
    route: [
      { wing: 'Dire Maul East (Warpwood Quarter)', bosses: ['Pusillin', 'Zevrim Thornhoof', 'Hydrospawn', 'Lethtendris', 'Alzzin the Wildshaper'] },
      { wing: 'Dire Maul West (Capital Gardens)', bosses: ['Tendris Warpwood', 'Illyanna Ravenoak', 'Magister Kalendris', 'Immol\'thar', 'Prince Tortheldrin', 'Lord Hel\'nurath'] },
      { wing: 'Dire Maul North (Gordok Commons)', bosses: ['Guard Mol\'dar', 'Stomper Kreeg', 'Guard Fengus', 'Guard Slip\'kik', 'Captain Kromcrush', 'Cho\'Rush the Observer', 'King Gordok'] },
      { wing: 'Rare', bosses: ['Tsu\'zee'] }
    ],
    tactics: {
      'Pusillin': 'Chase the imp through DM East; he runs and teleports until cornered. He drops the Crescent Key.',
      'Zevrim Thornhoof': 'Satyr who sacrifices a party member. Keep the sacrificed player healed and burn Zevrim.',
      'Hydrospawn': 'Water elemental with knockbacks and Massive Geyser. Tank near a wall.',
      'Lethtendris': 'Shadow caster with an imp. Interrupt and kill the imp.',
      'Alzzin the Wildshaper': 'Shapeshifts between forms and summons lashers. Burn him and AoE the lashers; can be fought quickly in a "jump run" from the back.',
      'Tendris Warpwood': 'Treant who entangles players. Free roots and kill the protector adds first.',
      'Illyanna Ravenoak': 'Hunter with her bear, Ferra. Kill or crowd-control Ferra, then Illyanna; watch out for Volley.',
      'Magister Kalendris': 'Shadow priest who mind controls. Interrupt and break the charm.',
      'Immol\'thar': 'Destroy the five crystal pylons around the Prison of Immol\'thar to open it. Eye of Immol\'thar adds spawn; the boss teleports and Infected Bites the tank. Kill him to reach Prince Tortheldrin.',
      'Prince Tortheldrin': 'Arcane caster with Whirlwind and Counterspell. Fight him in his room; dispel his arcane buff.',
      'Lord Hel\'nurath': 'Warlock epic mount quest summon. Optional.',
      'Guard Mol\'dar': 'Ogre guard. For a Tribute Run, use the Ogre Suit (tailoring/quest item) or leave him alive.',
      'Stomper Kreeg': 'Drunk ogre at the kegs. Can be talked to instead of killed during a Tribute Run.',
      'Guard Fengus': 'Ogre guard. Leave him alive for Tribute.',
      'Guard Slip\'kik': 'Freeze him with a Frost Trap or use the Ogre Suit to slip past; leave him alive for Tribute.',
      'Captain Kromcrush': 'Leave him alive for Tribute. He calls ogre adds.',
      'Cho\'Rush the Observer': 'Ogre mage who fights with King Gordok. Kill Gordok first; Cho\'Rush then becomes friendly.',
      'King Gordok': 'Kill him with the guards alive to earn the Gordok Tribute chest, the King of the Gordok buff and the best loot in DM North.',
      'Tsu\'zee': 'Rare stealthed elf in DM East. Not always present.'
    },
    tips: [
      'Tribute Run: kill only King Gordok (and Cho\'Rush if needed) and leave the five guards alive. The Gordok Tribute chest gets more loot for every guard left alive.',
      'DM East has a jump route straight to Alzzin; it is the fastest way to farm his drops.'
    ],
    forever: []
  },
  {
    slug: 'scholomance',
    title: 'Scholomance: Full Dungeon Guide & Darkmaster Gandling',
    icon: 'inv_misc_key_13',
    zone: 'Western Plaguelands (Caer Darrow island)',
    coords: '69.4, 73.2',
    intro: 'The Scourge necromancer school on Caer Darrow, under Darkmaster Gandling. It is a dense level 58–60 dungeon with important pre-raid drops and the Dawn\'s Gambit event.',
    travel: [
      'Alliance: fly to Chillwind Camp and ride south to the lake; swim to Caer Darrow.',
      'Horde: fly to the Bulwark and ride south past Andorhal to the lake.'
    ],
    access: 'The Skeleton Key is needed to enter (from the Barov Family Fortune / Skeleton Key quest chain).',
    route: [
      { wing: 'Reliquary & Great Hall', bosses: ['Kirtonos', 'Jandice Barov', 'Rattlegore', 'Ras Frostwhisperer'] },
      { wing: 'Viewing Room & Laboratory', bosses: ['Marduk Blackpool', 'Vectus', 'Kormok'] },
      { wing: 'The Six Rooms', bosses: ['Instructor Malicia', 'Doctor Theolen Krastinov', 'Lorekeeper Polkelt', 'The Ravenian', 'Lord Alexei Barov', 'Lady Illucia Barov'] },
      { wing: 'Headmaster\'s Study', bosses: ['Darkmaster Gandling'] }
    ],
    tactics: {
      'Kirtonos': 'Summoned with the Blood of Innocents at the brazier on the balcony. Switches between bat and human forms and disarms. Pull the lever to close the gates when his adds come in.',
      'Jandice Barov': 'Spawns many illusion copies. AoE the illusions or find the real Jandice (she takes damage normally).',
      'Rattlegore': 'Bone construct that knocks the tank back. Tank him near a wall.',
      'Ras Frostwhisperer': 'Frost lich with Frost Nova and Frostbolt Volley. Frost resistance helps; dispel slows. His death completes part of the Barov chain.',
      'Marduk Blackpool': 'Shadow caster with Vectus in the Viewing Room. Interrupt Shadow Bolt Volley.',
      'Vectus': 'Fights with Marduk. Use the Dawn\'s Gambit (quest item) on Vectus\'s students to start the event.',
      'Kormok': 'Summoned with the Brazier of Beckoning. Skeleton adds; optional.',
      'Instructor Malicia': 'Heals and summons adds. Interrupt heals.',
      'Doctor Theolen Krastinov': 'Rends and frenzies. Tank him and burn him; tranquilise/soothe frenzy.',
      'Lorekeeper Polkelt': 'Applies stacking diseases and Volatile Infection. Cleanse diseases.',
      'The Ravenian': 'Big Trample and Cleave. Only the tank stands in front.',
      'Lord Alexei Barov': 'Applies Unholy Aura and Immolate. Interrupt and heal through it.',
      'Lady Illucia Barov': 'Shadow caster who mind controls and uses Dominate Mind. Break charms quickly.',
      'Darkmaster Gandling': 'Teleports a random player into one of the six side rooms full of undead. Stay together while you can; anyone teleported should run back or wait for help. Kill him fast.'
    },
    tips: [
      'Clear the six side rooms (Malicia to Illucia) before Gandling to make his teleports much safer.',
      'Bring Holy Water or AoE for the undead trash; necrofiends and risen guards come in large packs.'
    ],
    forever: []
  },
  {
    slug: 'stratholme',
    title: 'Stratholme: Live & Undead Side Guide (Baron Rivendare)',
    icon: 'inv_misc_key_14',
    zone: 'Eastern Plaguelands (northern city gates)',
    coords: '30.8, 16.0 (main gate) · 47.0, 24.0 (Service Gate)',
    intro: 'The plague-ruined city of Stratholme, split into a Live side held by the Scarlet Crusade and an Undead side ruled by Baron Rivendare. It drops many pre-raid BiS items and feeds the Argent Dawn reputation grind.',
    travel: [
      'Both factions: fly to Light\'s Hope Chapel and ride north-west to the main gate, or ride to the Service Gate for the Undead side.'
    ],
    access: 'Main gate (Live side) is open. The Service Gate (Undead side) needs the Key to the City, which drops from Magistrate Barthilas (Undead side) or is used by a group member who has it.',
    route: [
      { wing: 'Live Side (King\'s Square & Scarlet Bastion)', bosses: ['Skul', 'Hearthsinger Forresten', 'Timmy the Cruel', 'Malor the Zealous', 'Cannon Master Willey', 'Crimson Hammersmith', 'Archivist Galford', 'Balnazzar'] },
      { wing: 'Undead Side (Elders\' Square & Slaughterhouse)', bosses: ['The Unforgiven', 'Postmaster Malown', 'Stonespine', 'Baroness Anastari', 'Nerub\'enkan', 'Maleki the Pallid', 'Magistrate Barthilas', 'Ramstein the Gorger', 'Black Guard Swordsmith', 'Baron Rivendare'] },
      { wing: 'Rare & event', bosses: ['Ezra Grimm'] }
    ],
    tactics: {
      'Skul': 'Rare skeleton caster near the entrance. Frostbolts; simple if he is up.',
      'Hearthsinger Forresten': 'Undead bard who appears in the square. Fear and curses; decurse and burn.',
      'Timmy the Cruel': 'Spawns after you clear the courtyard ghoul packs. Big hits and a slow; tank and burn.',
      'Malor the Zealous': 'Scarlet boss on the Live side. Tank and burn; he drops a weapon that is new in WoW Forever (marked ✦).',
      'Cannon Master Willey': 'Calls Crimson Rifleman adds and fires the cannon. Kill the riflemen and keep moving.',
      'Crimson Hammersmith': 'Summoned in the Scarlet blacksmith area (Blacksmithing quest). Optional.',
      'Archivist Galford': 'Fire caster in the library. Burn the Scarlet Archive with a torch for the quest; interrupt and spread.',
      'Balnazzar': 'Grand Crusader Dathrohan turns into Balnazzar. Psychic Scream and Domination: break charms and keep Fear Ward/Tremor up. Counts toward the Master Spelunker Legacy challenge in Forever.',
      'The Unforgiven': 'Summons ghostly adds and slows. AoE the adds and keep moving through the rooms.',
      'Postmaster Malown': 'Summoned by opening the three postboxes in the city with the Key to the City. Optional.',
      'Stonespine': 'Rare gargoyle on the Undead side. Simple.',
      'Baroness Anastari': 'Possesses a player (Possess). Break it with CC or by killing her quickly.',
      'Nerub\'enkan': 'Crypt lord who spawns scarabs and casts Encasing Webs. AoE scarabs and cleanse webs.',
      'Maleki the Pallid': 'Frost caster with Ice Tomb and Drain Life. Interrupt Frostbolt and Drain Life.',
      'Magistrate Barthilas': 'Runs from you. Kill him before he reaches the Slaughterhouse to get the Key to the City.',
      'Ramstein the Gorger': 'Big abomination that knocks players back. Tank against a wall; after his kill a wave of Black Guards spawns in the Slaughterhouse.',
      'Black Guard Swordsmith': 'Summoned in the Slaughterhouse for the Blacksmithing quest. Optional.',
      'Baron Rivendare': 'Death Pact and Raise Dead: he raises skeletons and periodically drains health. AoE the skeletons and burn Rivendare. Kill him within 45 minutes of entering the Service Gate for the old 45-minute run bonus (check whether Forever keeps it).',
      'Ezra Grimm': 'Rare undead NPC who may appear on the Undead side.'
    },
    tips: [
      'Undead side (Baron runs) is the main farm for pre-raid BiS: check the BiS callout below.',
      'Collect Scourgestones on both sides for Argent Dawn reputation.'
    ],
    forever: [
      { date: 'Nov 9, 2026', source: 'Blizzard hotfix', text: 'Players can no longer mount inside Stratholme.' },
      { date: 'Nov 13, 2026', source: 'Blizzard hotfix', text: 'Defeating Balnazzar counts toward the Master Spelunker Legacy challenge.' }
    ]
  }
];
