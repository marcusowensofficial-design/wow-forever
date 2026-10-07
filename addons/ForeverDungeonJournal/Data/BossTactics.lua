local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- Boss Overview, Abilities, and Role-specific Tips for WoW Forever Dungeons
FDJ.BOSS_TACTICS = {
    ["Hall of Thanes"] = {
        ["Faldrim Anvilmar"] = {
            overview = "The tormented spirit of high king Faldrim Anvilmar guards the royal tombs. He periodically spins in a deadly whirlwind and calls forth ancient dwarven ancestral spirits to defend his resting place.",
            roleTips = {
                tank = "Keep Faldrim faced away from the group. Step back slightly when Whirlwind begins to minimize incoming burst.",
                healer = "Prepare area healing when Ancestral Call apparitions appear and watch for rapid tank spikes during enrage.",
                dps = "Ranged: Switch immediately to summoned spirits, then resume burning Faldrim.\nMelee: Step out 8+ yards during Whirlwind; stay behind Faldrim to avoid Cleave.",
            },
            abilities = {
                { id = 15589, name = "Whirlwind", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Spins rapidly with heavy weapon strikes, dealing physical damage to all players within 8 yards." },
                { id = 0, name = "Ancestral Call", icon = "Interface\\Icons\\Spell_Holy_PrayerOfHealing", desc = "Summons ghostly dwarven apparitions that cast Holy Bolt at random party members." },
                { id = 797, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping attack hitting up to 3 players in front of the caster." },
            },
        },
        ["Magmatus"] = {
            overview = "An ancient subterranean fire elemental awakened in the deep magma chasms beneath Ironforge. Accompanied by a Dark Iron Summoner, it spews molten lava at ranged targets and reflects melee damage.",
            roleTips = {
                tank = "Turn Magmatus toward the wall to keep Molten Breath off the party. Keep the boss centered and stationary so ranged players can maintain max distance without getting cornered.",
                healer = "Stand 30+ yards back to avoid Molten Eruption and keep Fire Resistance active if available. Expect burst damage on the tank from Molten Breath and heavy sustained damage on melee DPS hitting into Fire Shield.",
                dps = "Ranged: Stay 30+ yards back to completely outrange Molten Eruption (25 yd range) and spread 8+ yards to prevent Molten Spit chaining. Kill the Dark Iron Summoner add first.\nMelee: Step out of range during Molten Eruption casts. Pace attacks or pop personal defensives to manage self-damage from Fire Shield.",
            },
            abilities = {
                { id = 0, name = "Molten Breath", icon = "Interface\\Icons\\Spell_Fire_Fire", desc = "Spews a cone of liquid fire forward, dealing heavy Fire damage over 4 sec." },
                { id = 0, name = "Molten Eruption", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Erupts violently, dealing Fire damage to all enemies within 25 yards." },
                { id = 134, name = "Fire Shield", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Deals Fire damage to attackers whenever struck by melee attacks." },
            },
        },
        ["Plunder"] = {
            overview = "A cunning subterranean goblin scoundrel attempting to loot the royal reliquary. Relies on dirty tricks, smoke bombs, and explosive dynamite.",
            roleTips = {
                tank = "Keep aggro tightly held and back against the wall; Plunder uses Gouge to incapacitate the tank and charge the highest ranged threat.",
                healer = "Pre-shield or HoT the highest ranged DPS before Gouge lands; heal through explosive bleed wounds.",
                dps = "Ranged: Spread out to avoid clustered Dynamite; move 5+ yards out of red dynamite circles immediately.\nMelee: Stay strictly behind to avoid Gouge; save stuns and interrupts for his escape attempts.",
            },
            abilities = {
                { id = 1776, name = "Gouge", icon = "Interface\\Icons\\Ability_Gouge", desc = "Gouges the tank's eyes, incapacitating them for 4 sec and turning to attack the next highest threat target." },
                { id = 7978, name = "Throw Dynamite", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Hurls explosive dynamite at a target location, dealing Fire damage in a 5 yard radius." },
                { id = 7964, name = "Smoke Bomb", icon = "Interface\\Icons\\Ability_Vanish", desc = "Obscures vision and drops threat, briefly confusing party members." },
            },
        },
        ["Durgen Dirgehammer"] = {
            overview = "The fanatical Dark Iron commander orchestrating the infiltration into Old Ironforge. Durgen wields a massive enchanted maul that sends shockwaves through the chamber floor.",
            roleTips = {
                tank = "Position Durgen with his back to the royal vault door. Mitigate Ground Slam stun; save major defensive cooldowns for his 25% Berserk frenzy.",
                healer = "Heavy physical healing required during Ground Slam and 25% Berserk. Keep active HoTs rolling continuously.",
                dps = "Ranged: Focus down Dark Iron Infiltrator adds as soon as they respond to Durgen's horn call.\nMelee: Stay behind boss to avoid Ground Slam frontal stun; save burst cooldowns for 25% enrage.",
            },
            abilities = {
                { id = 15588, name = "Thunderclap", icon = "Interface\\Icons\\Spell_Nature_ThunderClap", desc = "Slams the ground, slowing attack speed of nearby enemies by 35% and dealing Nature damage." },
                { id = 0, name = "Ground Slam", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stuns all players directly in front of the caster for 3 sec." },
                { id = 0, name = "Call Reinforcements", icon = "Interface\\Icons\\INV_Misc_Horn_01", desc = "Blows a Dark Iron warhorn, summoning two Dark Iron veterans to join the fight." },
            },
        },
    },

    ["Ruins of Lordaeron"] = {
        ["The Baron"] = {
            overview = "A fallen noble of Lordaeron cursed with endless undeath. The Baron commands shadow magic and attempts to turn party members against one another.",
            roleTips = {
                tank = "Hold The Baron near the center altar against the crypt wall; taunt back quickly if charmed allies draw threat.",
                healer = "Dispel shadow curses promptly; burst heal the tank through heavy crushing blows.",
                dps = "Ranged: Focus down summoned crypt ghouls immediately; crowd control charmed allies without killing them.\nMelee: Stay strictly behind to avoid Shadow Cleave.",
            },
            abilities = {
                { id = 14515, name = "Dominate Mind", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordDominate", desc = "Takes mental control of an enemy party member for up to 10 sec, increasing their damage done." },
                { id = 15245, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Hurls missiles of dark magic at all nearby enemies, dealing Shadow damage." },
                { id = 980, name = "Curse of Agony", icon = "Interface\\Icons\\Spell_Shadow_CurseOfSargeras", desc = "Curses a target with wracking pain over 24 sec. Decurse immediately if possible." },
            },
        },
        ["Witherfang"] = {
            overview = "A mutated plague hound patrolling the overgrown courtyards. Witherfang infects victims with debilitating virulent toxins and releases disorienting roars.",
            roleTips = {
                tank = "Keep Witherfang centered; taunt back immediately when he pounces to a ranged player.",
                healer = "Cleanse Rabies disease immediately (reduces stamina and strength).",
                dps = "Ranged: Spread 10+ yards apart to prevent chained pounces.\nMelee: Stay behind boss; slow or stun lupine adds if summoned.",
            },
            abilities = {
                { id = 0, name = "Envenomed Bite", icon = "Interface\\Icons\\Spell_Nature_NullifyPoison", desc = "Bites the target, dealing Nature damage and applying a stacking poison over 15 sec." },
                { id = 8715, name = "Terrifying Howl", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Howls in fury, causing nearby enemies to flee in fear for 3 sec." },
            },
        },
        ["The Abandoned"] = {
            overview = "A towering patchwork abomination assembled from fallen defenders of Capital City. Strikes with enormous heavy cleaves and emits foul noxious gas.",
            roleTips = {
                tank = "Position near room center; prepare for threat drops during Terrifying Shriek fear.",
                healer = "Use Tremor Totem or Will of the Forsaken for fear; AoE heal through Shadow Bolt Volley.",
                dps = "Ranged: Interrupt Shadow Bolt Volley on cooldown.\nMelee: Pace attacks or pop defensives when Bone Armor activates to avoid self-inflicted reflected damage.",
            },
            abilities = {
                { id = 15284, name = "Heavy Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping cleave that deals high physical damage to all targets in an arc in front of the caster." },
                { id = 21070, name = "Noxious Cloud", icon = "Interface\\Icons\\Spell_Shadow_CreepingPlague", desc = "Leaves a pool of poisonous gas on the ground that ticks for heavy Nature damage." },
            },
        },
        ["Bjork"] = {
            overview = "A hulking savage warrior resurrected in the ruins. Bjork enters an uncontrollable frenzy as his health declines.",
            roleTips = {
                tank = "Turn away from the party; use active mitigation when Mortal Strike is applied (-50% healing received).",
                healer = "Anticipate Mortal Strike on the tank (-50% healing); pre-shield and use big heals before it lands.",
                dps = "Melee: Stay strictly behind boss to avoid Cleave.\nRanged: Burn boss down before enrage stacks overwhelm the tank.",
            },
            abilities = {
                { id = 3490, name = "Frenzied Rage", icon = "Interface\\Icons\\Ability_Druid_Enrage", desc = "At 30% health, attack speed increases by 50% and physical damage increases by 30%." },
                { id = 9347, name = "Mortal Strike", icon = "Interface\\Icons\\Ability_Warrior_SavageBlow", desc = "Strikes the target for weapon damage and reduces healing received by 50% for 5 sec." },
            },
        },
        ["Rath'mael"] = {
            overview = "A fallen high elven sorcerer who succumbed to the scourge. Rath'mael unleashes devastating frost storms across the chamber floor.",
            roleTips = {
                tank = "Interrupt Mind Blast; keep boss positioned away from neighboring patrol paths.",
                healer = "Dispel Shadow Word: Pain; keep Fear Ward on the tank or prepare group heal after Psychic Scream.",
                dps = "Ranged: Interrupt Mind Blast and dispel Shadowform shields.\nMelee: Kick Shadow Word: Pain and stun during cast bars.",
            },
            abilities = {
                { id = 10, name = "Blizzard", icon = "Interface\\Icons\\Spell_Frost_IceStorm", desc = "Calls down shards of ice on a target area, dealing Frost damage every 2 sec and slowing movement." },
                { id = 15531, name = "Frost Nova", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Freezes all nearby enemies in place for up to 6 sec." },
                { id = 116, name = "Frostbolt", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Launches a bolt of frost, dealing heavy Frost damage and slowing target movement speed." },
            },
        },
        ["Viktor the Vile"] = {
            overview = "A twisted apothecary experimenting on the remnants of Lordaeron's populace. Throws volatile chemical flasks and acidic mixtures.",
            roleTips = {
                tank = "Drag Viktor along outer perimeter as green poison pools drop; never stand in noxious clouds.",
                healer = "Cleanse Poison quickly; heal through sustained ticking Nature damage.",
                dps = "Ranged: Switch to exploding oozes before they reach melee range.\nMelee: Move out of green noxious pools immediately.",
            },
            abilities = {
                { id = 6306, name = "Acid Splash", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Corrodes target armor by 30% and deals Nature damage over time." },
                { id = 0, name = "Explosive Concoction", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Hurls a bubbling flask at a random party member, detonating for Fire damage." },
            },
        },
        ["Lordaeron Captain"] = {
            overview = "A rare ghostly commander of the royal guard still carrying his ceremonial blade and shield.",
            roleTips = {
                tank = "Face away from the party; anticipate Disarm (temporarily disables parry/block and drops threat).",
                healer = "Keep the tank topped during Disarm phase when incoming damage spikes.",
                dps = "TOP PRIORITY: Interrupt Holy Light to prevent the boss from healing to full. Melee pace attacks during Shield Wall.",
            },
            abilities = {
                { id = 871, name = "Shield Wall", icon = "Interface\\Icons\\Ability_Warrior_ShieldWall", desc = "Reduces all damage taken by 60% for 8 sec." },
                { id = 15655, name = "Shield Slam", icon = "Interface\\Icons\\INV_Shield_05", desc = "Slams the target with a shield, dealing physical damage and stunning for 2 sec." },
            },
        },
    },

    ["Ragefire Chasm"] = {
        ["Oggleflint"] = {
            overview = "The chieftain of the Ragefire troggs. Fights with brute force alongside a pack of loyal trogg bodyguards.",
            roleTips = {
                tank = "Pick up Oggleflint and his trogg guards immediately on pull with Thunderclap or Demoralizing Roar.",
                healer = "Be prepared for sudden target shifts when Oggleflint uses Intimidating Roar.",
                dps = "Kill the trogg bodyguard adds first before burning down Oggleflint.",
            },
            abilities = {
                { id = 797, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes up to 2 targets in front of the caster for physical damage." },
                { id = 5246, name = "Intimidating Roar", icon = "Interface\\Icons\\Ability_GolemThunderClap", desc = "Shouts with terrifying rage, causing nearby enemies to tremble in fear for 3 sec." },
            },
        },
        ["Taragaman the Hungerer"] = {
            overview = "A ferocious felguard summoned into the subterranean lava tubes beneath Orgrimmar. Uses knockbacks and searing fire magic.",
            roleTips = {
                tank = "Tank Taragaman with your back facing a rock wall so his Uppercut does not launch you into the surrounding lava pool.",
                healer = "Keep the tank topped off to absorb the Uppercut spike damage.",
                dps = "Never stand behind the tank; stay out of the cone of Fire Nova.",
            },
            abilities = {
                { id = 18072, name = "Uppercut", icon = "Interface\\Icons\\INV_Gauntlets_05", desc = "Knocks the target high into the air and backward, causing threat to temporarily reset." },
                { id = 8349, name = "Fire Nova", icon = "Interface\\Icons\\Spell_Fire_SealOfFire", desc = "Radiates waves of flame in all directions, dealing Fire damage to all nearby enemies." },
            },
        },
        ["Jergosh the Invoker"] = {
            overview = "A treacherous orc warlock of the Shadow Council. Hurls destructive fire spells and curses party members.",
            roleTips = {
                tank = "Interrupt Jergosh's Immolate casts. Pull him away from summoned Voidwalkers.",
                healer = "Dispel Curse of Weakness from physical damage dealers and heal through Immolate damage ticks.",
                dps = "Quickly interrupt or stun Jergosh to prevent his casted fire spells from landing.",
            },
            abilities = {
                { id = 348, name = "Immolate", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Burns an enemy for initial Fire damage and additional damage every 3 sec for 15 sec." },
                { id = 702, name = "Curse of Weakness", icon = "Interface\\Icons\\Spell_Shadow_CurseOfMannoroth", desc = "Reduces the target's physical attack power by 15 for 2 min." },
            },
        },
        ["Bazzalan"] = {
            overview = "A cunning satyr infiltrator of the Burning Blade clan hiding in the upper crags.",
            roleTips = {
                tank = "Keep aggro firmly locked on Bazzalan; his fast attack speed can quickly drop a healer if threat is lost.",
                healer = "Cure or heal through Deadly Poison applied to the tank.",
                dps = "Burn down Bazzalan quickly before poison stacks build up on the tank.",
            },
            abilities = {
                { id = 744, name = "Poison", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Poisons the target, dealing Nature damage every 3 sec for 15 sec." },
                { id = 1752, name = "Sinister Strike", icon = "Interface\\Icons\\Spell_Shadow_RitualOfSacrifice", desc = "Vicious melee strike dealing increased weapon damage." },
            },
        },
    },

    ["The Deadmines"] = {
        ["Rhahk'Zor"] = {
            overview = "The massive ogre taskmaster guarding the entrance tunnels to the Defias stronghold. Swings a devastating heavy maul that sends shockwaves through the cavern floor.",
            roleTips = {
                tank = "Keep Rhahk'Zor faced away from the party. Be prepared for Rhahk'Zor Slam which stuns you for 3 sec.",
                healer = "Pre-heal the tank before Rhahk'Zor Slam as the boss continues auto-attacking while the tank is stunned.",
                dps = "Ranged: Stay 15+ yards back.\nMelee: Stand strictly behind the boss to avoid getting clipped by his frontal slam stun.",
            },
            abilities = {
                { id = 6304, name = "Rhahk'Zor Slam", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Slams the ground, dealing heavy physical damage and stunning targets in front of him for 3 sec." },
            },
        },
        ["Miner Johnson"] = {
            overview = "A rare miner who lost his mind in the deep veins of the Defias mines. Blinds targets with gold dust and enrages.",
            roleTips = {
                tank = "Turn Johnson away so Gold Dust does not blind ranged members.",
                healer = "If the tank is blinded, prepare to heal whichever party member Johnson targets next.",
                dps = "Burn him down swiftly once he activates Enrage.",
            },
            abilities = {
                { id = 773, name = "Gold Dust", icon = "Interface\\Icons\\INV_Misc_Dust_02", desc = "Flings a pouch of blinding gold dust into the target's eyes, reducing hit chance by 50% for 5 sec." },
                { id = 8269, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases physical attack power by 50% for 15 sec." },
            },
        },
        ["Sneed's Shredder"] = {
            overview = "The goblin lumber master pilots a deadly mechanical shredder. When the shredder is demolished, Sneed himself ejects and continues fighting on foot.",
            roleTips = {
                tank = "Tank the shredder facing away. Be ready to immediately taunt Sneed the moment the shredder breaks apart.",
                healer = "Be mindful of Disarm on the tank which causes threat to drop; heal through Terrify fear.",
                dps = "Ranged: Keep distance so Terrify does not catch casters.\nMelee: Save major burst cooldowns for Sneed on foot after the shredder dies.",
            },
            abilities = {
                { id = 7399, name = "Terrify", icon = "Interface\\Icons\\Spell_Shadow_Possession", desc = "Intimidates nearby enemies, causing them to flee in fear for 3 sec." },
                { id = 6713, name = "Disarm", icon = "Interface\\Icons\\Ability_Warrior_Disarm", desc = "Knocks the weapon from the target's hands, disarming them for 6 sec." },
            },
        },
        ["Gilnid"] = {
            overview = "The chief goblin smelter operating the central Defias iron forge. Emits scorching molten metal and sunders armor.",
            roleTips = {
                tank = "Keep Gilnid stationary near the anvil. Watch for Sunder Armor stacks.",
                healer = "Heal through Molten Metal burn ticks on affected group members.",
                dps = "Interrupt Molten Metal casts whenever possible.",
            },
            abilities = {
                { id = 5213, name = "Molten Metal", icon = "Interface\\Icons\\Spell_Fire_Fireball", desc = "Splashes boiling liquid metal on an enemy, dealing Fire damage over 6 sec." },
                { id = 7386, name = "Sunder Armor", icon = "Interface\\Icons\\Ability_Warrior_Sunder", desc = "Hacks away at the target's armor, reducing armor value for 30 sec." },
            },
        },
        ["Mr. Smite"] = {
            overview = "The fearsome tauren first mate guarding the Ironclad warship. At 66% and 33% health, Smite stomps the ground to stun the entire group, runs to his weapon chest, and equips progressively deadlier armaments.",
            roleTips = {
                tank = "War Stomp stuns the entire group at 66% and 33%. Immediately re-taunt Smite as soon as the stun breaks.",
                healer = "Pre-shield and HoT the tank right before 66% and 33% stuns; heal immediately after the stun breaks as two-hand damage spikes.",
                dps = "Stop burst right before 66% and 33% health transitions to avoid pulling threat when Smite equips new weapons.",
            },
            abilities = {
                { id = 6435, name = "Smite Slam", icon = "Interface\\Icons\\Ability_Smash", desc = "Stuns all nearby enemies for 2 sec." },
                { id = 6432, name = "Smite Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "War stomp that stuns all enemies for 5 sec at 66% and 33% health while Smite equips new weapons." },
            },
        },
        ["Captain Greenskin"] = {
            overview = "The goblin captain commanding the Defias flagship deck alongside Edwin VanCleef. Fights with poisoned harpoons and calls elite Defias crew members.",
            roleTips = {
                tank = "Hold Greenskin facing away from the group. Pick up spawned Defias adds quickly.",
                healer = "Cleanse Poison from players hit by Poisoned Harpoon; heal through Cleave spikes.",
                dps = "Ranged: Kill Greenskin's crew adds first.\nMelee: Stay behind boss to avoid Cleave.",
            },
            abilities = {
                { id = 5208, name = "Poisoned Harpoon", icon = "Interface\\Icons\\INV_ThrowingKnife_04", desc = "Strikes an enemy with an envenomed spear, slowing movement and dealing Nature damage over time." },
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping attack hitting up to 3 enemies in front of the caster." },
            },
        },
        ["Edwin VanCleef"] = {
            overview = "The mastermind of the Defias Brotherhood and supreme leader of the stonemasons. Fights with blistering dual-wield melee strikes and summons Defias Blackguard assassins at 75%, 50%, and 25% health.",
            roleTips = {
                tank = "Pull VanCleef to the ship deck wall. Immediately AoE taunt when Defias Blackguard adds spawn at 75%, 50%, and 25%.",
                healer = "Stay close to the tank so spawned adds hit the tank rather than running to you.",
                dps = "Switch immediately to Defias Blackguard stealth adds as soon as they spawn before continuing damage on VanCleef.",
            },
            abilities = {
                { id = 1752, name = "Sinister Strike", icon = "Interface\\Icons\\Spell_Shadow_RitualOfSacrifice", desc = "Vicious strike dealing weapon damage plus additional physical damage." },
                { id = 0, name = "Call Blackguard", icon = "Interface\\\\Icons\\\\Spell_Shadow_Charm", desc = "Calls two stealthy Defias Blackguard assassins from the shadows to ambush the party." },
            },
        },
        ["Cookie"] = {
            overview = "The eccentric murloc ship chef found in the galley below deck. Throws rolling pins, spits acidic stew, and wields his famous tenderizer.",
            roleTips = {
                tank = "Tank Cookie inside the kitchen galley. Interrupt Acid Spit when possible.",
                healer = "Keep players topped up; Cookie's spit deals quick nature burst.",
                dps = "Burn Cookie down swiftly and look out for his tenderizer knockbacks.",
            },
            abilities = {
                { id = 9591, name = "Acid Spit", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Spits corrosive juices at an enemy, dealing Nature damage." },
                { id = 0, name = "Cookie's Tenderize", icon = "Interface\\Icons\\INV_Mace_01", desc = "Whacks the target with a tenderizer, briefly dazing and increasing damage taken." },
            },
        },
    },

    ["Wailing Caverns"] = {
        ["Lord Cobrahn"] = {
            overview = "A corrupted Druid of the Fang who commands the venom of the serpent. Transforms into a deadly viper at 50% health.",
            roleTips = {
                tank = "Face away from party; call for an immediate magic dispel if hit by Slumber. Interrupt Healing Touch!",
                healer = "Dispel Slumber from the tank immediately so Cobrahn does not run loose on the party. Cleanse Poison.",
                dps = "TOP PRIORITY: Interrupt Healing Touch on cooldown! Melee stay behind to avoid poison spit.",
            },
            abilities = {
                { id = 5187, name = "Healing Touch", icon = "Interface\\Icons\\Spell_Nature_HealingTouch", desc = "Heals himself or an ally for a significant amount of health. Must be interrupted." },
                { id = 7965, name = "Viper Form", icon = "Interface\\Icons\\Spell_Nature_GuardianWard", desc = "Transforms into a viper at 50% health, increasing attack speed and applying venom on hit." },
                { id = 700, name = "Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts a target to sleep for up to 10 sec. Any damage taken breaks the effect." },
            },
        },
        ["Lady Anacondra"] = {
            overview = "A cunning Druid of the Fang located on the upper ledge overlooking the cavern entrance.",
            roleTips = {
                tank = "Keep Anacondra focused on you. Interrupt Lightning Bolt.",
                healer = "Dispel Sleep from the tank immediately so Anacondra does not attack squishy party members.",
                dps = "Focus on interrupting Healing Touch; she heals a massive portion of health if the cast succeeds.",
            },
            abilities = {
                { id = 5187, name = "Healing Touch", icon = "Interface\\Icons\\Spell_Nature_HealingTouch", desc = "Heals herself for a large portion of health. Interrupt immediately." },
                { id = 700, name = "Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts an enemy party member into a slumber for up to 10 sec." },
            },
        },
        ["Kresh"] = {
            overview = "A giant ancient snapping turtle residing in the underground waterways. Withdraws into his thick shell when threatened.",
            roleTips = {
                tank = "Hold Kresh stationary near the pool; maintain threat through Shell Spin.",
                healer = "Melee DPS will take heavy self-damage during Spiked Shell; conserve mana and alert the group.",
                dps = "Ranged: Full uptime from distance.\nMelee: STOP ATTACKING or pace attacks when Spiked Shell activates to avoid killing yourself on reflected damage.",
            },
            abilities = {
                { id = 26064, name = "Shell Shield", icon = "Interface\\Icons\\Ability_Hunter_Pet_Turtle", desc = "Retreats into its spiky shell, reducing damage taken by 50% for 10 sec." },
            },
        },
        ["Lord Pythas"] = {
            overview = "One of the four leaders of the Fang guarding the deeper chambers of the dream.",
            roleTips = {
                tank = "Keep Pythas locked down and interrupt his nature spells.",
                healer = "Watch for Sleep on the tank and dispel promptly.",
                dps = "Prioritize interrupts on Healing Touch above all other actions.",
            },
            abilities = {
                { id = 5187, name = "Healing Touch", icon = "Interface\\Icons\\Spell_Nature_HealingTouch", desc = "Restores substantial health. High interrupt priority." },
                { id = 700, name = "Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Incapacitates an enemy for up to 10 sec." },
            },
        },
        ["Skum"] = {
            overview = "A ferocious thunder lizard corrupted by the nightmare in the cavern depths. Unleashes crackling bolts of lightning.",
            roleTips = {
                tank = "Face Skum away from the party; position perpendicular to the group.",
                healer = "Keep ranged topped off against Chained Lightning; dispel movement slows.",
                dps = "Ranged: Spread 10+ yards apart to prevent Chained Lightning bouncing.\nMelee: Stay at Skum's flanks; never stand behind his tail (Tail Sweep stun).",
            },
            abilities = {
                { id = 6254, name = "Chain Lightning", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Fires a crackling lightning bolt that arcs between nearby enemies, dealing Nature damage." },
            },
        },
        ["Lord Serpentis"] = {
            overview = "The master of the Fang and supreme commander of the corrupted druids inside Wailing Caverns.",
            roleTips = {
                tank = "Position Serpentis away from the party. Be prepared for Sleep effects and keep taunt ready.",
                healer = "Be ready with quick dispel magic or poison cleanses.",
                dps = "Coordinate interrupts on Healing Touch so Serpentis cannot recover health.",
            },
            abilities = {
                { id = 6778, name = "Healing Touch", icon = "Interface\\Icons\\Spell_Nature_HealingTouch", desc = "Full heal spell; must be interrupted." },
                { id = 700, name = "Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts target to sleep for 10 sec." },
            },
        },
        ["Verdan the Everliving"] = {
            overview = "A colossal ancient plant guardian corrupted by the Nightmare. Verdan deals immense physical damage with heavy club-like tree arms.",
            roleTips = {
                tank = "Verdan hits exceptionally hard with physical auto-attacks. Kite slightly if low; keep active mitigation up.",
                healer = "Focus heavy heals on the tank continuously; do not let the tank drop below 60%.",
                dps = "Melee: Stay strictly behind boss.\nRanged: Help free rooted allies if Grasping Vines hits healers.",
            },
            abilities = {
                { id = 0, name = "Tremor", icon = "Interface\\\\Icons\\\\Spell_Nature_Earthquake", desc = "Shakes the cavern floor, dealing heavy physical damage to all nearby enemies." },
                { id = 8142, name = "Grasping Vines", icon = "Interface\\Icons\\Spell_Nature_StrangleVines", desc = "Entangles enemies in roots, preventing movement for 6 sec." },
            },
        },
        ["Mutanus the Devourer"] = {
            overview = "The nightmare manifestation summoned at the end of the Naralex waking ritual. Mutanus thrashes with extra attacks and puts players into deep narcolepsy.",
            roleTips = {
                tank = "Protect Disciple of Naralex from preceding nightmare waves before Mutanus spawns. Call for dispel on Narcolepsy.",
                healer = "Use Tremor Totem or Will of the Forsaken against Fear. Dispel Narcolepsy sleep from the tank immediately.",
                dps = "Kill wave adds first during Naralex event. Spread out to avoid multi-target Thundershock stuns.",
            },
            abilities = {
                { id = 3391, name = "Thrash", icon = "Interface\\Icons\\Ability_GhoulFrenzy", desc = "Gives the caster 2 additional attacks on its next swing." },
                { id = 8399, name = "Narcolepsy", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts the target to sleep for up to 10 sec." },
            },
        },
        ["Deviate Faerie Dragon"] = {
            overview = "A rare mystical faerie dragon fluttering through the cavern tunnels. Burns mana and casts faerie fire.",
            roleTips = {
                tank = "Establish quick threat to prevent Faerie Dragon from targeting casters.",
                healer = "Keep distance to avoid Mana Burn drains.",
                dps = "Interrupt Mana Burn whenever cast.",
            },
            abilities = {
                { id = 8129, name = "Mana Burn", icon = "Interface\\Icons\\Spell_Shadow_ManaBurn", desc = "Drains mana from an enemy and deals Shadow damage equal to the mana drained." },
            },
        },
    },

    ["Shadowfang Keep"] = {
        ["Rethilgore"] = {
            overview = "A savage worgen fiend imprisoned in the lower courtyard dungeons. Emits shadowy curses and life-draining auras.",
            roleTips = {
                tank = "Keep Rethilgore facing the dungeon wall to prevent Soul Drain from targeting the rest of the group.",
                healer = "Dispel shadow debuffs and keep the tank stabilized against life drains.",
                dps = "Burst him down swiftly before Soul Drain stacks heal him significantly.",
            },
            abilities = {
                { id = 7295, name = "Soul Drain", icon = "Interface\\Icons\\Spell_Shadow_LifeDrain02", desc = "Channels shadow energy, draining health from the target and restoring it to Rethilgore." },
            },
        },
        ["Razorclaw the Butcher"] = {
            overview = "The castle's deranged worgen cook who carves up victims with razor-sharp meat cleavers.",
            roleTips = {
                tank = "Be prepared for Gouge which will cause Razorclaw to turn on the healer or nearest DPS.",
                healer = "Keep defensive buffs up; when the tank is gouged, heal whichever player takes aggro.",
                dps = "Save stuns for when Razorclaw turns away from the incapacitated tank.",
            },
            abilities = {
                { id = 1776, name = "Gouge", icon = "Interface\\Icons\\Ability_Gouge", desc = "Incapacitates the tank for 4 sec, dropping threat temporarily." },
                { id = 15496, name = "Butcher's Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Hits multiple targets in an arc for heavy physical weapon damage." },
            },
        },
        ["Baron Silverlaine"] = {
            overview = "The former lord of Shadowfang Keep, now a restless spectre. Applies Veil of Shadow, a devastating curse that reduces healing taken by 75%.",
            roleTips = {
                tank = "Call out Veil of Shadow immediately so the healer can decurse you.",
                healer = "TOP PRIORITY: Decurse / dispel Veil of Shadow instantly! Tank receives 75% less healing while cursed.",
                dps = "Interrupt Silverlaine's shadow casts; burn down before multiple curses are applied to the party.",
            },
            abilities = {
                { id = 7068, name = "Veil of Shadow", icon = "Interface\\Icons\\Spell_Shadow_GatherShadows", desc = "Curses the target, reducing all healing received by 75% for 15 sec. High decurse priority." },
            },
        },
        ["Commander Springvale"] = {
            overview = "A loyal ghost commander of the keep garrison. Shields himself with the souls of the perished and unleashes unholy strikes.",
            roleTips = {
                tank = "Pull Springvale away from Desecration ground pools; gather his ghostly guard adds.",
                healer = "Heavy party healing required during Desecration; keep the tank shielded.",
                dps = "Ranged: Kill the ghost bodyguards first.\nMelee: Move out of Desecrated ground circles immediately.",
            },
            abilities = {
                { id = 0, name = "Shield of the Perished", icon = "Interface\\Icons\\Spell_Holy_SealOfProtection", desc = "Surrounds the commander in an unholy barrier, absorbing damage." },
            },
        },
        ["Odo the Blindwatcher"] = {
            overview = "The blind worgen sentinel perched atop the courtyard watchtower alongside bat companions.",
            roleTips = {
                tank = "Pick up Odo and his pet bats quickly on pull.",
                healer = "Watch for Blind on party members and heal through his howling enrage.",
                dps = "Burn the pet bats down first with AoE, then switch to Odo.",
            },
            abilities = {
                { id = 7481, name = "Howling Rage", icon = "Interface\\Icons\\Ability_BullRush", desc = "Increases attack speed and physical damage by 25% for 10 sec." },
            },
        },
        ["Deathsworn Captain"] = {
            overview = "A rare ghost captain roaming the upper battlements with martial perfection.",
            roleTips = {
                tank = "Save defensives for Mortal Strike debuff (-50% healing received).",
                healer = "Anticipate Mortal Strike on the tank; pre-heal and shield before it lands.",
                dps = "Melee stay strictly behind to avoid Cleave. Burn down quickly.",
            },
            abilities = {
                { id = 15589, name = "Whirlwind", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Spins with weapon outstretched, dealing physical damage to all nearby enemies." },
            },
        },
        ["Fenrus the Devourer"] = {
            overview = "A massive two-headed worgen hound guarding Arugal's private sanctum. Attacks with rapid double bites and poisonous spit.",
            roleTips = {
                tank = "Hold Fenrus steady. Double Attack can cause sudden health drops.",
                healer = "Cleanse poison from party members.",
                dps = "Burn the hound down quickly; no complex mechanics.",
            },
            abilities = {
                { id = 0, name = "Double Attack", icon = "Interface\\Icons\\Ability_GhoulFrenzy", desc = "Chance on hit to instantly make a second melee swing." },
            },
        },
        ["Wolf Master Nandos"] = {
            overview = "Arugal's chief kennel master who commands packs of spectral worgen wolves.",
            roleTips = {
                tank = "Pick up the summoned wolf pack immediately with AoE abilities.",
                healer = "Be ready for multiple enemies attacking at once; use defensive cooldowns if adds target you.",
                dps = "AoE down the Lupine Horror wolves as soon as Nandos summons them.",
            },
            abilities = {
                { id = 7489, name = "Call Lupine Horrors", icon = "Interface\\Icons\\Ability_Hunter_Pet_Wolf", desc = "Summons a pack of spectral wolves to overwhelm the party." },
            },
        },
        ["Archmage Arugal"] = {
            overview = "The renegade archmage of Kirin Tor who unleashed the worgen curse upon Silverpine. Arugal teleports across the high balconies, pelts the party with Shadow Bolts, and casts Thundershock and Mind Control.",
            roleTips = {
                tank = "Maintain line of sight when Arugal teleports to balcony; taunt quickly after Mind Control fades.",
                healer = "Dispel curses; heal through heavy Shadow Bolt burst damage. Crowd control charmed allies.",
                dps = "Ranged: Position on opposite balcony or stairs to keep line of sight and interrupt Shadow Bolt.\nMelee: Run out of melee range when Thundershock casts; do not kill charmed allies.",
            },
            abilities = {
                { id = 9613, name = "Shadow Bolt", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Hurls a bolt of dark energy dealing heavy Shadow damage. High interrupt priority." },
                { id = 7803, name = "Thundershock", icon = "Interface\\Icons\\Spell_Lightning_LightningBolt01", desc = "Blasts all nearby enemies for Nature damage and stuns them for 5 sec." },
                { id = 0, name = "Arugal's Curse", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordDominate", desc = "Takes control of an enemy party member for 10 sec, increasing their size and damage." },
            },
        },
    },

    ["The Stockade"] = {
        ["Targorr the Dread"] = {
            overview = "A notorious Defias thug locked in the western cell blocks. Relies on brutal cleaves and demoralizing shouts.",
            roleTips = {
                tank = "Hold Targorr inside his cell with his back turned to the door.",
                healer = "Maintain steady healing; Targorr hits hard but has no complex spell mechanics.",
                dps = "Stand behind him to avoid Cleave.",
            },
            abilities = {
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes up to 2 enemies in front of the caster for physical damage." },
            },
        },
        ["Kam Deepfury"] = {
            overview = "A rebellious Dark Iron dwarf prisoner inciting chaos among the inmates.",
            roleTips = {
                tank = "Watch for Enrage at low health. Sunder Armor can reduce your defense.",
                healer = "Save burst healing for the final 20% when Kam enrages.",
                dps = "Focus down any cellmate adds before damaging Kam.",
            },
            abilities = {
                { id = 8599, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases physical damage dealt by 40% when health drops low." },
            },
        },
        ["Hamhock"] = {
            overview = "A hulking ogre prisoner chained in the eastern wing, accompanied by gnoll cellmates.",
            roleTips = {
                tank = "Pick up Hamhock and his gnoll attendant immediately. Position Hamhock away from the hallway.",
                healer = "Keep the tank above 70% to handle Chain Slam spikes.",
                dps = "Kill the gnoll add first to eliminate extra incoming damage.",
            },
            abilities = {
                { id = 0, name = "Chain Slam", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Swings heavy iron chains, dealing physical damage and knocking back nearby enemies." },
            },
        },
        ["Dextren Ward"] = {
            overview = "A mad convicted felon whose terrifying screams send players fleeing in panic.",
            roleTips = {
                tank = "Tank Dextren inside his cell so feared party members do not run out into adjacent prison halls and pull extra mobs.",
                healer = "Stay near max range to avoid Terrifying Roar fear.",
                dps = "Keep your back to a cell corner so if feared, you don't run into uncleared cells.",
            },
            abilities = {
                { id = 14100, name = "Terrifying Roar", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Roars with fury, causing nearby enemies to flee in fear for 4 sec." },
            },
        },
        ["Bazil Thredd"] = {
            overview = "The cunning ringleader behind the Stockade riot. Commands riot conspirators and uses evasion and dirty rogue tricks.",
            roleTips = {
                tank = "Taunt Thredd back when he attempts to switch targets. Pick up summoned riot adds.",
                healer = "Keep hot effects ticking on the tank; Thredd attacks rapidly with daggers.",
                dps = "Do not waste high-cooldown attacks while Evasion is active (switch to magic damage).",
            },
            abilities = {
                { id = 5277, name = "Evasion", icon = "Interface\\Icons\\Spell_Shadow_ShadowWard", desc = "Increases dodge chance by 50% for 15 sec." },
                { id = 1752, name = "Sinister Strike", icon = "Interface\\Icons\\Spell_Shadow_RitualOfSacrifice", desc = "Heavy weapon strike dealing physical damage." },
            },
        },
        ["Bruegal Ironknuckle"] = {
            overview = "A rare Dark Iron pugilist roaming the cell corridors with reinforced knuckles.",
            roleTips = {
                tank = "Watch for Concussion Blow which stuns for 5 sec.",
                healer = "When the tank is stunned, be ready to shield or heal whoever takes aggro.",
                dps = "Burn him down quickly; simple melee fight.",
            },
            abilities = {
                { id = 12809, name = "Concussion Blow", icon = "Interface\\Icons\\Ability_ThunderBolt", desc = "Stuns the target for 5 sec and deals physical damage." },
            },
        },
    },

    ["Blackfathom Deeps"] = {
        ["Ghamoo-ra"] = {
            overview = "An ancient colossal sea turtle venerated by the Twilight's Hammer cult. Possesses nearly impenetrable spiky armor.",
            roleTips = {
                tank = "Hold Ghamoo-ra near the water edge.",
                healer = "Melee DPS take heavy reflect damage during Spiked Shell; conserve mana and alert group.",
                dps = "Ranged: Full uptime from distance.\nMelee: Pace attacks or pop personal defensives during Spiked Shell to avoid self-inflicted damage.",
            },
            abilities = {
                { id = 0, name = "Triple Chomp", icon = "Interface\\Icons\\Ability_Hunter_Pet_Turtle", desc = "Bites the target three times in rapid succession, dealing heavy physical damage." },
            },
        },
        ["Lady Sarevess"] = {
            overview = "A ruthless naga siren who casts Frost Nova, slows attackers, and commands an elite naga bodyguard.",
            roleTips = {
                tank = "Pick up both Lady Sarevess and her guard. Dispel Frost Nova or move out of it.",
                healer = "Dispel Slow from party members and heal through Forked Lightning.",
                dps = "Kill the naga bodyguard first, then interrupt Sarevess's Frost spells.",
            },
            abilities = {
                { id = 865, name = "Frost Nova", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Freezes all nearby enemies in place for up to 6 sec." },
                { id = 8435, name = "Forked Lightning", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Hurls cones of electrical energy at targets in front of her." },
            },
        },
        ["Gelihast"] = {
            overview = "The fanatical murloc high priest of the Old God Aku'mai. At 66% and 33% health, Gelihast enters an immune shadow bubble and summons swarms of murlocs.",
            roleTips = {
                tank = "When Gelihast bubbles, group up and gather the incoming waves of murloc minions with AoE.",
                healer = "Keep distance from murloc waves; their nets can root you in place.",
                dps = "AoE down the murloc swarms during immune phases. Stop attacking Gelihast while his bubble is up.",
            },
            abilities = {
                { id = 0, name = "Curse of the Deep", icon = "Interface\\Icons\\Spell_Shadow_CurseOfMannoroth", desc = "Curses the target, increasing Shadow damage taken." },
                { id = 0, name = "Shadow Bubble", icon = "Interface\\Icons\\Spell_Shadow_AntiShadow", desc = "Becomes completely immune to damage for 15 sec while spawning murloc minions." },
            },
        },
        ["Lorgus Jett"] = {
            overview = "A Twilight's Hammer elementalist summoned in the submerged ruins. Drops healing and lightning totems.",
            roleTips = {
                tank = "Pull Lorgus Jett away from his totems as soon as he drops them.",
                healer = "Prepare for steady Nature damage from Lightning Shield and Shock.",
                dps = "KILL HEALING TOTEM IMMEDIATELY. It heals the boss for immense amounts.",
            },
            abilities = {
                { id = 5675, name = "Healing Stream Totem", icon = "Interface\\Icons\\INV_Spear_04", desc = "Summons a totem that constantly heals Lorgus Jett. Must be destroyed immediately." },
                { id = 8056, name = "Frost Shock", icon = "Interface\\Icons\\Spell_Frost_FrostShock", desc = "Blasts the target with frost, dealing damage and reducing movement speed by 50% for 8 sec." },
            },
        },
        ["Baron Aquanis"] = {
            overview = "A corrupted water elemental summoned at the submerged altar by interacting with the Strange Water Globe.",
            roleTips = {
                tank = "Keep Aquanis faced away from the water platform. Watch for Tidal Wave knockbacks.",
                healer = "Frost Resistance helps absorb Frostbolt damage.",
                dps = "Interrupt Frostbolt whenever possible.",
            },
            abilities = {
                { id = 15043, name = "Frostbolt", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Deals heavy Frost damage and slows the target." },
                { id = 0, name = "Tidal Wave", icon = "Interface\\Icons\\Spell_Frost_SummonWaterElemental", desc = "Sends a crashing wave outward, dealing Frost damage and knocking back players." },
            },
        },
        ["Old Serra'kis"] = {
            overview = "A monstrous three-headed thresher lurking in the deep flooded chasms before Aku'mai's sanctuary.",
            roleTips = {
                tank = "Fight Serra'kis while swimming or near the platform lip. Beware of underwater breath timers.",
                healer = "Keep an eye on party member breath meters; stay close to the water surface or use underwater breathing.",
                dps = "Burn Serra'kis down quickly to avoid prolonged swimming combat.",
            },
            abilities = {
                { id = 9591, name = "Corrosive Spit", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Spits corrosive bile, dealing Nature damage and reducing armor." },
            },
        },
        ["Twilight Lord Kelris"] = {
            overview = "The insidious dark leader of the Twilight's Hammer in Blackfathom Deeps. Puts players into nightmare Sleep, casts Mind Blast, and channels Shadow Word: Pain.",
            roleTips = {
                tank = "Interrupt Mind Blast on cooldown; hold Kelris in the center dais.",
                healer = "TOP PRIORITY: Dispel Sleep immediately! Kelris crits sleeping targets with Mind Blast.",
                dps = "Interrupt Mind Blast and Shadow Word: Pain as top priority. Burn down before party sleeps chain.",
            },
            abilities = {
                { id = 8399, name = "Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts an enemy party member into a nightmare slumber for up to 10 sec." },
                { id = 15587, name = "Mind Blast", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Blasts the target for immense Shadow damage. Must be interrupted." },
            },
        },
        ["Aku'mai"] = {
            overview = "The ancient three-headed primordial hydra god slumbering in the deepest sanctum. Aku'mai poisons targets with Corrosive Bite, emits Void Spray cones, and enters a deadly frenzy at 20% health.",
            roleTips = {
                tank = "Drag Aku'mai along room perimeter as poison clouds drop; save defensives for 25% Enrage.",
                healer = "Cleanse Poison; save biggest healing surges for 25% Enrage.",
                dps = "Melee stay out of green poison clouds. Save major burst cooldowns for 25% Enrage burn.",
            },
            abilities = {
                { id = 0, name = "Corrosive Bite", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Bites the target for Nature damage and reduces armor by 25%." },
                { id = 0, name = "Void Spray", icon = "Interface\\Icons\\Spell_Shadow_CallofBone", desc = "Spews dark energy in a forward cone, dealing heavy Shadow damage over 6 sec." },
                { id = 3490, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "At 20% health, Aku'mai enrages, increasing attack speed by 50% and damage dealt by 25%." },
            },
        },
    },

    ["Excavation Site: Wetlands"] = {
        ["Saltspine"] = {
            overview = "A colossal prehistoric crocolisk awakened by the dwarven excavators deep in the flooded dig site. Saltspine lunges with bone-crushing bites and unleashes a violent tail sweep.",
            roleTips = {
                tank = "Engage Saltspine with your back to the cavern rocks to prevent knockback repositioning. Keep him turned away from all party members.",
                healer = "Be ready for immediate burst healing on the tank after Crushing Bite reduces maximum health and armor.",
                dps = "Stand strictly at Saltspine's flank. Never stand behind him due to Tail Sweep, nor in front due to Triple Bite.",
            },
            abilities = {
                { id = 0, name = "Crushing Bite", icon = "Interface\\Icons\\Ability_Druid_Rake", desc = "Viciously bites the target, dealing physical damage and reducing armor by 30% for 10 sec." },
                { id = 15847, name = "Tail Sweep", icon = "Interface\\Icons\\INV_Misc_MonsterTail_03", desc = "Whips his armored tail in a rear arc, dealing damage and knocking back anyone behind the crocolisk." },
                { id = 28131, name = "Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases attack speed by 40% and physical damage by 25% when reaching 30% health." },
            },
        },
        ["Shadetooth"] = {
            overview = "An ancient subterranean trogg warlord wielding cursed earthen relics. Shadetooth commands savage trogg berserkers and periodically sends shockwaves reverberating through the excavation tunnel.",
            roleTips = {
                tank = "Pick up Shadetooth and immediately establish threat on the Excavation Trogg adds that rush from the mine shafts.",
                healer = "Anticipate heavy group-wide damage during Quake. Dispel the Skull Crack stun from the tank.",
                dps = "Focus down the Trogg Berserkers immediately before burning Shadetooth. Interrupt Shadow Ward casts.",
            },
            abilities = {
                { id = 13323, name = "Earthquake", icon = "Interface\\Icons\\Spell_Nature_Earthquake", desc = "Channels a subterranean tremor, dealing Nature damage every 2 sec and knocking players down." },
                { id = 3551, name = "Skull Crack", icon = "Interface\\Icons\\Spell_Frost_Stun", desc = "Bashes the primary target with a blunt stone mace, stunning them for 3 sec." },
                { id = 0, name = "Call of the Dig", icon = "Interface\\Icons\\INV_Misc_Horn_01", desc = "Summons 2 Excavation Trogg miners to swarm the party." },
            },
        },
        ["Highland Horror"] = {
            overview = "A colossal bog beast unearthed in the marshy excavation, entangling victims with rooted vines and spewing necrotic spore bursts.",
            roleTips = {
                tank = "Face Highland Horror away from the party to avoid cone root sweeps. Taunt quickly after Bog Slam knockbacks.",
                healer = "Dispel Strangling Roots immediately to prevent stacking Nature damage on affected party members.",
                dps = "Kill Creeping Tendrils and Spore Pods immediately when summoned before burning the boss.",
            },
            abilities = {
                { id = 0, name = "Strangling Roots", icon = "Interface\\Icons\\Spell_Nature_Stranglevines", desc = "Entangles all enemies in front of the caster, dealing Nature damage every 3 sec and rooting them in place for 9 sec." },
                { id = 0, name = "Bog Slam", icon = "Interface\\Icons\\Ability_Smash", desc = "Slams the ground with massive force, inflicting heavy Physical damage and knocking back the current target." },
                { id = 0, name = "Fungal Spores", icon = "Interface\\Icons\\Spell_Shadow_CreepingPlague", desc = "Spews corrosive fungal spores around the arena, leaving toxic clouds that inflict periodic Nature damage." },
            },
        },
        ["Relic Guardian"] = {
            overview = "An animated titan-forged defense construct safeguarding the prime vault chamber. It emits arcane pulse barriers, electrifies the wet cavern floor, and overloads when critically damaged.",
            roleTips = {
                tank = "Keep the Relic Guardian centered in the chamber. Move the boss out of Static Fields quickly so melee can continue DPS.",
                healer = "Use heavy group heals when Arcane Overload pulses every 15 seconds. Dispel Static Charge.",
                dps = "Quickly switch to Arcane Power Cells when they deploy around the room to remove the Guardian's damage immunity shield.",
            },
            abilities = {
                { id = 0, name = "Static Field", icon = "Interface\\Icons\\Spell_Nature_LightningOverload", desc = "Electrifies a 10-yard pool of water on the chamber floor, dealing Nature damage to anyone standing inside." },
                { id = 0, name = "Arcane Pulse", icon = "Interface\\Icons\\Spell_Holy_MagicalSentry", desc = "Emits an expanding wave of arcane energy, knocking players back and dealing Arcane damage." },
                { id = 0, name = "Overload Barrier", icon = "Interface\\Icons\\Spell_Holy_PowerWordShield", desc = "Surrounds itself with a titan energy shield, absorbing damage and reflecting 20% back to attackers until power cells are destroyed." },
            },
        },
    },

    ["City of Dalaran"] = {
        ["Atrexis the Grave Knight"] = {
            overview = "A fallen Kirin Tor battle-mage turned death knight, guarding the breached gates of Violet Citadel. He strikes with frost-imbued runeblades and summons unholy chains to drag distant casters.",
            roleTips = {
                tank = "Hold Atrexis facing away from the staircase. Rotate active mitigation when he begins casting Obliterating Strike.",
                healer = "Cleanse Frost Fever instantly to prevent severe attack and casting speed slows on party members.",
                dps = "If gripped by Death's Grasp, immediately reposition away from his frontal Frost Cleave.",
            },
            abilities = {
                { id = 0, name = "Frost Cleave", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Cleaves enemies in front of the caster for Frost damage, slowing movement speed by 40%." },
                { id = 49576, name = "Death's Grasp", icon = "Interface\\Icons\\Spell_DeathKnight_Strangulate", desc = "Hurls unholy chains at the furthest ranged player, pulling them into melee range." },
                { id = 48721, name = "Blood Boil", icon = "Interface\\Icons\\Spell_DeathKnight_BloodBoil", desc = "Boils the blood of all nearby enemies, dealing heavy Shadow damage." },
            },
        },
        ["Arcane Anomaly"] = {
            overview = "A swirling nexus of raw unstable ley-line magic unleashed during the Kirin Tor's containment experiments. It pulses wild arcane storms and teleports across the laboratory terrace.",
            roleTips = {
                tank = "Taunt and reposition the Anomaly immediately after each Blink. Pick up wild Mana Remnants as they spawn.",
                healer = "Keep raid health topped above 70% before Arcane Explosion detonates.",
                dps = "Save mobility tools to close the distance when the Anomaly teleports. Prioritize burning volatile mana sparks before they detonate.",
            },
            abilities = {
                { id = 1449, name = "Arcane Explosion", icon = "Interface\\Icons\\Spell_Nature_WispSplode", desc = "Releases a violent burst of raw mana, dealing Arcane damage to all enemies within 15 yards." },
                { id = 1953, name = "Ley Blink", icon = "Interface\\Icons\\Spell_Arcane_Blink", desc = "Teleports to an alternate vantage point on the terrace, dropping threat." },
                { id = 0, name = "Mana Flare", icon = "Interface\\Icons\\Spell_Holy_SilencingShot", desc = "Burns the mana of all spellcasters in line of sight, dealing damage equal to mana drained." },
            },
        },
        ["Fel Ancient"] = {
            overview = "A colossal treant corrupted by demonic shadowflame in Dalaran's botanical conservatory. The Ancient tramples players and ignites ground foliage with Fel Immolation.",
            roleTips = {
                tank = "Tank the Fel Ancient on the stone pathway to avoid burning grass patches. Taunt Corrupted Treant adds.",
                healer = "Dispel Fel Toxin immediately from healers and tanks to prevent rapid health loss.",
                dps = "AoE down Fel Seedlings before they mature into Corrupted Treants. Do not stand in green fire patches.",
            },
            abilities = {
                { id = 0, name = "Fel Immolation", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Ignites nearby soil, causing emerald flames that tick for Fire and Chaos damage." },
                { id = 5568, name = "Trample", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stomps the ground violently, dealing Physical damage and knocking down all melee players for 2 sec." },
                { id = 0, name = "Corrupting Spores", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Releases a cloud of diseased spores, dealing Nature damage and reducing armor." },
            },
        },
        ["Unstable Sentinel"] = {
            overview = "An enchanted arcane automaton patrolling the Violet Hold security corridors. It projects impenetrable directional barriers and spins in a barrage of concentrated laser bursts.",
            roleTips = {
                tank = "Face away from party; call out Overload cast when Sentinel reaches low health.",
                healer = "Keep tank topped during Pulverize; prepare for raid-wide burst if Overload explodes.",
                dps = "Ranged: Finish off Sentinel from max range.\nMelee: RUN OUT 15+ YARDS when Sentinel begins Overload death cast!",
            },
            abilities = {
                { id = 0, name = "Spinning Arcane Cannon", icon = "Interface\\Icons\\Spell_Arcane_Blast", desc = "Spins in a circle firing beams of arcane energy, dealing heavy damage to anyone caught in the beam." },
                { id = 0, name = "Aegis Projection", icon = "Interface\\Icons\\Spell_Holy_PowerWordShield", desc = "Deploys a front-facing energy shield that reflects all frontal spell and physical attacks." },
            },
        },
        ["Mana Wraith"] = {
            overview = "An ethereal apparition formed from vaporized Kirin Tor scholars. It feeds on magical energy, drains player mana pools, and casts devastating Shadow Word curses.",
            roleTips = {
                tank = "Hold the Wraith in place and interrupt Siphon Essence whenever it begins channeling.",
                healer = "Keep mana pots ready or request innervates/mana springs; Mana Wraith rapidly siphons caster pools.",
                dps = "TOP PRIORITY: Kick and counterspell Siphon Essence immediately! Magic damage is resisted; prioritize Physical burst.",
            },
            abilities = {
                { id = 0, name = "Siphon Essence", icon = "Interface\\Icons\\Spell_Shadow_LifeDrain02", desc = "Drains health and mana from the target, healing the Mana Wraith for double the amount drained." },
                { id = 0, name = "Curse of Torment", icon = "Interface\\Icons\\Spell_Shadow_CurseOfSargeras", desc = "Curses the party with debilitating pain, increasing mana costs by 50% for 15 sec." },
            },
        },
        ["Mana Devourer"] = {
            overview = "A ravenous void creature escaped from Dalaran's deepest prisons. It gorged on ambient leylines and periodically purges all magic buffs from the entire party.",
            roleTips = {
                tank = "Aggro the Devourer quickly after each Nullification pulse. Tank active mitigation is critical.",
                healer = "DO NOT cast new buffs during combat; the Devourer consumes active buffs to heal itself!",
                dps = "Save offensive burst cooldowns for Mana Satiation (+50% damage taken for 10 sec).",
            },
            abilities = {
                { id = 0, name = "Nullification Burst", icon = "Interface\\Icons\\Spell_Holy_DispelMagic", desc = "Purges all magical beneficial effects from players and deals damage proportional to buffs removed." },
                { id = 0, name = "Mana Bomb", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Launches an explosive orb of volatile arcane power at a ranged player's location." },
            },
        },
        ["Mana Elemental"] = {
            overview = "A condensed core of pure enchanted water and arcane flux, guarding the Violet Citadel fountain. Splinters into smaller unstable droplets upon defeat.",
            roleTips = {
                tank = "Gather all Splintered Mana Droplets together when the elemental divides at 50% health.",
                healer = "Group AoE damage ramps up when droplets explode upon death. Stagger your healing cooldowns.",
                dps = "Ranged: Focus down one droplet at a time to prevent simultaneous death explosions.\nMelee: Step back if low health when droplets detonate.",
            },
            abilities = {
                { id = 15241, name = "Water Bolt Volley", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Fires pressurized water bolts at all party members, dealing Frost damage and slowing movement." },
                { id = 0, name = "Fission", icon = "Interface\\Icons\\Spell_Arcane_PrismaticCloak", desc = "Splits into four unstable Mana Droplets upon reaching 50% health." },
            },
        },
        ["Lyn the Ignored"] = {
            overview = "A bitter, overlooked Dalaran apprentice who tapped into forbidden chronomancy and dark mirror magic. She creates holographic duplicates that confuse and strike from stealth.",
            roleTips = {
                tank = "Watch for mirror images. Keep Lyn tagged with Rend or Faerie Fire to distinguish the real boss from illusions.",
                healer = "Dispel polymorph effects from party members immediately.",
                dps = "Identify the real Lyn by checking her debuff icons; kill illusions with quick single-target strikes.",
            },
            abilities = {
                { id = 118, name = "Polymorph: Sheep", icon = "Interface\\Icons\\Spell_Nature_Polymorph", desc = "Transforms an enemy party member into a sheep for up to 8 sec, disabling them completely." },
                { id = 0, name = "Mirror Image", icon = "Interface\\Icons\\Spell_Magic_LesserInvisibilty", desc = "Creates three holographic duplicates that cast Frostbolt and Fireball at random targets." },
                { id = 0, name = "Time Warp Stutter", icon = "Interface\\Icons\\Spell_Arcane_PortalDalaran", desc = "Hastens her own spellcasting by 50% while slowing all player actions by 20% for 6 sec." },
            },
        },
        ["Shade of the Archmage"] = {
            overview = "The echo of Archmage Antonidas himself, testing worthy champions in the Violet Council Chamber. He casts tri-school magic: Blizzard, Flamestrike, and Arcane Missiles.",
            roleTips = {
                tank = "Center Antonidas in the chamber. TOP PRIORITY: Interrupt Pyroblast on cooldown to avoid tank one-shots.",
                healer = "Move constantly to avoid Blizzard storms. Heal through heavy tri-school magical damage.",
                dps = "Kick Flamestrike and Arcane Missiles. Spread out so Blizzard and Flamestrike do not overlap multiple players.",
            },
            abilities = {
                { id = 10, name = "Blizzard", icon = "Interface\\Icons\\Spell_Frost_IceStorm", desc = "Calls down shards of ice on a targeted area, dealing Frost damage and slowing movement speed by 60%." },
                { id = 2120, name = "Flamestrike", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Summons a pillar of fire, dealing initial Fire damage and leaving burning ground for 8 sec." },
                { id = 5143, name = "Arcane Missiles", icon = "Interface\\Icons\\Spell_Nature_StarFall", desc = "Channels high-velocity magical bolts into the primary target over 3 sec." },
            },
        },
    },

    ["Gnomeregan"] = {
        ["Grubbis"] = {
            overview = "A mutant trogg chieftain who dug through the deepest ventilation tunnels beneath the Workshop. Accompanied by his loyal basilisk pet, Chomper.",
            roleTips = {
                tank = "Hold Grubbis and Chomper together. Have DPS kill Chomper first or off-tank to avoid Petrifying Gaze.",
                healer = "Dispel Basilisk Stun from party members. Watch for sudden tank spikes when Grubbis enrages.",
                dps = "Burn Chomper down first to remove Petrifying Gaze, then focus Grubbis. Don't pull extra troggs from the side vents.",
            },
            abilities = {
                { id = 10252, name = "Petrifying Gaze", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Chomper glares at a target, turning them to stone and stunning them for 4 sec." },
                { id = 12734, name = "Trogg Smash", icon = "Interface\\Icons\\Ability_MaceRagDoll", desc = "Grubbis strikes with brute force, dealing heavy Physical damage to his primary target." },
            },
        },
        ["Viscous Fallout"] = {
            overview = "A toxic sentient radioactive slime coalesced from irradiated coolant leaks inside the dormitory halls. Emits heavy radiating nature auras.",
            roleTips = {
                tank = "Keep Viscous Fallout away from the party. Drag the boss backward as toxic puddles form underfoot.",
                healer = "Cleanse Radioactive Poison quickly. Use Nature Resistance Totem or Aspect of the Wild if available.",
                dps = "Quickly eliminate Irradiated Slime adds before they reach the boss and heal it.",
            },
            abilities = {
                { id = 0, name = "Radioactive Aura", icon = "Interface\\Icons\\Spell_Shadow_CreepingPlague", desc = "Deals periodic Nature damage to all players within 20 yards and reduces healing received." },
                { id = 3815, name = "Toxic Cloud", icon = "Interface\\Icons\\Spell_Nature_AbolishPoison", desc = "Expels a venomous green haze that damages anyone standing inside." },
            },
        },
        ["Electrocutioner 6000"] = {
            overview = "A lethal high-voltage defense robot patrolling the cogwheel platforms. Fires chain lightning that arcs lethally between grouped allies.",
            roleTips = {
                tank = "Position the Electrocutioner on the rim of the platform. Face him away so Megavolt doesn't blast the party.",
                healer = "Heavy burst healing required during Megavolt. Keep yourself at least 10 yards away from all DPS.",
                dps = "SPREAD OUT AT LEAST 10 YARDS APART. Grouping up will cause Chain Lightning to arc and wipe the group.",
            },
            abilities = {
                { id = 11082, name = "Megavolt", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Fires a devastating arc of electricity that jumps to all players standing within 8 yards of each other." },
                { id = 11084, name = "Shock Shield", icon = "Interface\\Icons\\Spell_Nature_LightningShield", desc = "Surrounds itself with lightning, damaging attackers when struck by melee weapons." },
            },
        },
        ["Crowd Pummeler 9-60"] = {
            overview = "A berserk crowd-control automaton in the engineering launch bay. It knocks players high into the air and spins violently in an unstoppable whirlwind.",
            roleTips = {
                tank = "Tank with your back against the pillar so Knockback doesn't send you flying off the platform edges.",
                healer = "Watch for massive falling damage after players are punted into the air.",
                dps = "Ranged: Full uptime from distance.\nMelee: RUN OUT OF MELEE when Crowd Pummeler casts Arcing Smash / Whirlwind.",
            },
            abilities = {
                { id = 15589, name = "Pummel Whirlwind", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Spins its massive bronze fists in a 360-degree whirlwind, dealing lethal physical damage to melee." },
                { id = 10887, name = "Crowd Punt", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Punts the primary target into the air, causing high physical damage and threat drop." },
            },
        },
        ["Mekgineer Thermaplugg"] = {
            overview = "The mad betrayer of Gnomeregan piloting his heavily mechanized walking fortress. Thermaplugg activates bomb dispensers around the room that must be clicked to disarm.",
            roleTips = {
                tank = "Hold Thermaplugg in the center of the hex room. Turn him away from the active bomb consoles.",
                healer = "Conserve mana for the final 20% phase. Heal bomb runners who take incidental blast damage.",
                dps = "DESIGNATE BOMB CLICKERS. When warning horns sound, immediately run to the green-flashing wall buttons to shut off Walking Bomb dispensers.",
            },
            abilities = {
                { id = 0, name = "Deploy Walking Bombs", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Opens ventilation chutes, releasing walking mechanical bombs that detonate on contact with players." },
                { id = 10101, name = "Knock Away", icon = "Interface\\Icons\\Ability_Kick", desc = "Knocks the tank away, reducing threat and temporarily switching targets." },
                { id = 0, name = "Toxic Vent Discharge", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Emits clouds of irradiating gas from floor grates around the perimeter." },
            },
        },
        ["Dark Iron Ambassador"] = {
            overview = "A covert Dark Iron envoy brokering an alliance with Thermaplugg. Accompanied by elite Dark Iron bodyguards and armed with incendiary firearms.",
            roleTips = {
                tank = "Pick up the Ambassador and his two Dark Iron bodyguards. Group them together for cleave.",
                healer = "Cleanse Flame Shock and maintain high health on the tank to survive burst rifle shots.",
                dps = "Kill the Dark Iron bodyguards first. Interrupt Incendiary Grenade casts.",
            },
            abilities = {
                { id = 0, name = "Incendiary Shot", icon = "Interface\\Icons\\Spell_Fire_Fireball02", desc = "Fires an explosive rifle round, dealing Fire damage and burning the target over 8 sec." },
                { id = 13813, name = "Explosive Trap", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Places a hidden incendiary trap that detonates when stepped on, knocking back nearby players." },
            },
        },
    },

    ["Razorfen Kraul"] = {
        ["Roogug"] = {
            overview = "A quillboar earth-caller guarding the Bramble maze. Channels geomantic powers to erect thorn barriers and impale trespassers.",
            roleTips = {
                tank = "Face Roogug away from party members. Taunt quickly after Spiked Brambles knockback.",
                healer = "Dispel Root and Bleed effects. Keep the tank above 60% health before Earth Spike casts.",
                dps = "Interrupt Earth Spike. Move out of thorny entanglements on the ground immediately.",
            },
            abilities = {
                { id = 0, name = "Earth Spike", icon = "Interface\\Icons\\Spell_Nature_Earthquake", desc = "Erupts sharp rock spikes beneath a player, dealing physical damage and launching them airborne." },
                { id = 8391, name = "Bramble Entanglement", icon = "Interface\\Icons\\Spell_Nature_StrangleVines", desc = "Roots all players in a 10-yard radius in razor-sharp thorns, dealing bleeding damage over 6 sec." },
            },
        },
        ["Aggem Thorncurse"] = {
            overview = "A ruthless Death's Head necromancer who commands rotting quilboar corpses and inflicts debilitating blood curses.",
            roleTips = {
                tank = "Grab Aggem and pick up the Risen Boar thralls as soon as they crawl from the bone piles.",
                healer = "Decurse Curse of Weakness and Curse of Thorns from melee and tank immediately.",
                dps = "Melee: Watch for Curse of Thorns (reflects damage back to attacker!).\nRanged: Focus down the skeletal adds with AoE cleave.",
            },
            abilities = {
                { id = 15245, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Fires shadowy skull missiles at all players, dealing Shadow damage." },
                { id = 6909, name = "Curse of Thorns", icon = "Interface\\Icons\\Spell_Shadow_AntiShadow", desc = "Reflects physical damage back to attackers whenever they strike in melee." },
            },
        },
        ["Death Speaker Jargba"] = {
            overview = "The high priest of the Death's Head quillboar cult. Channels dark mind control magic and raises bone shields to deflect incoming spells.",
            roleTips = {
                tank = "Keep Jargba positioned near the center. Be ready to retake aggro when Mind Control fades from party members.",
                healer = "Dispel Magic to remove Bone Shield. Prepare heavy healing when Shadow Nova detonates.",
                dps = "Crowd control (polymorph, trap, stun) charmed allies without killing them! Interrupt Dominate Mind.",
            },
            abilities = {
                { id = 14515, name = "Dominate Mind", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordDominate", desc = "Chontrolls the mind of a party member for up to 10 sec, forcing them to attack their allies." },
                { id = 0, name = "Bone Shield", icon = "Interface\\Icons\\Spell_Shadow_GrimWard", desc = "Surrounds the caster with spinning bone fragments, absorbing physical and magical damage." },
            },
        },
        ["Overlord Ramtusk"] = {
            overview = "The hulking military leader of the Razorfen clan, accompanied by two elite boar champions and armed with massive stone cleavers.",
            roleTips = {
                tank = "Tank Ramtusk and his two boars. Pop defensive cooldowns when Ramtusk begins his Berserker Enrage.",
                healer = "Massive physical spike damage on the tank. Keep active HoTs and shields applied continuously.",
                dps = "Burn the boar adds first with focused single-target damage, then switch to Ramtusk. Melee beware of Cleave.",
            },
            abilities = {
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping cleave striking the tank and up to 2 adjacent players." },
                { id = 8599, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Enrages at 30% health, increasing attack speed by 50% and physical damage dealt by 35%." },
            },
        },
        ["Agathelos the Raging"] = {
            overview = "A colossal ancient spirit boar sacred to Agamaggan. Roams the deep ravine, stomping the earth and charging ranged party members.",
            roleTips = {
                tank = "Pull Agathelos against the canyon wall. Intercept him quickly after he charges ranged players.",
                healer = "Group-wide physical damage after Earth Stomp. Keep all party members above 50% health.",
                dps = "Do not stand between Agathelos and the ranged group. Move away from the head to avoid Trample.",
            },
            abilities = {
                { id = 5624, name = "Earth Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stomps the cavern floor, dealing physical damage and stunning nearby players for 2 sec." },
                { id = 100, name = "Raging Charge", icon = "Interface\\Icons\\Ability_Warrior_Charge", desc = "Charges the furthest target, dealing heavy damage and knocking them backward." },
            },
        },
        ["Charlga Razorflank"] = {
            overview = "The venerable Crone of the Kraul and leader of all Razorfen quillboar. She wields supreme geomancy, encases enemies in stone, and drains life continuously.",
            roleTips = {
                tank = "Keep Charlga near the center of her elevated dais. Interrupt Chain Lightning on cooldown.",
                healer = "Dispel Crystalline Sleep immediately. Heal through the ticking life drain of Mana/Life Spike.",
                dps = "TOP PRIORITY: INTERRUPT CHAIN LIGHTNING! Spread out 10+ yards around her platform so lightning does not arc across multiple players.",
            },
            abilities = {
                { id = 8292, name = "Chain Lightning", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Strikes an enemy with a bolt of lightning that arcs to up to 3 nearby allies for heavy Nature damage." },
                { id = 8399, name = "Crystalline Slumber", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Encases an enemy player in crystalline stone, incapacitating them for up to 8 sec." },
                { id = 689, name = "Drain Life", icon = "Interface\\Icons\\Spell_Shadow_LifeDrain02", desc = "Channels dark geomantic energy, draining health from a player to heal Charlga." },
            },
        },
        ["Blind Hunter"] = {
            overview = "A rare mutated subterranean bat roosting in the dark canyon ceilings. Uses echolocation to silence spellcasters and dives with venomous claws.",
            roleTips = {
                tank = "Grab Blind Hunter when he dives from the ceiling. Position him away from casters.",
                healer = "Stay at maximum range (30+ yards) to avoid Sonic Screech silence. Dispel Bat Poison.",
                dps = "Casters: STOP CASTING when Sonic Screech casts to avoid 6-sec school lockout!\nMelee: Burn boss from behind.",
            },
            abilities = {
                { id = 0, name = "Sonic Screech", icon = "Interface\\Icons\\Ability_Hunter_Pet_Bat", desc = "Emits an ear-piercing shriek that silences all spellcasters within 15 yards for 4 sec." },
                { id = 0, name = "Corrosive Bat Venom", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Infects the target with virulent bat poison, dealing Nature damage over 12 sec." },
            },
        },
        ["Earthcaller Halmgar"] = {
            overview = "A rare hermit shaman hidden in the overgrown side tunnels. Drops multiple totems that buff his physical strikes and shock enemies with frost.",
            roleTips = {
                tank = "Pull Halmgar away from his Earthbind and Strength of Earth totems immediately.",
                healer = "Frost Resistance helps absorb Frost Shock burst. Cleanse slows.",
                dps = "Kill totems on sight, especially Earthbind Totem and Healing Totem.",
            },
            abilities = {
                { id = 8056, name = "Frost Shock", icon = "Interface\\Icons\\Spell_Frost_FrostShock", desc = "Blasts the target with frost, dealing damage and reducing movement speed by 50% for 6 sec." },
                { id = 8075, name = "Strength of Earth Totem", icon = "Interface\\Icons\\Spell_Nature_EarthBindTotem", desc = "Plants a totem that increases Halmgar's melee damage by 30%." },
            },
        },
    },

    ["Scarlet Monastery: Graveyard"] = {
        ["Interrogator Vishas"] = {
            overview = "The sadistic chief torturer of the Scarlet Crusade, conducting horrific interrogations in the dungeon vaults below the monastery.",
            roleTips = {
                tank = "Face Vishas away from the cells. Watch out for sudden aggro spikes when he uses Word of Pain.",
                healer = "Dispel Shadow Word: Pain and heal through the burning fire poker strikes.",
                dps = "Burn Vishas down quickly. He has low health and can be stunned and interrupted freely.",
            },
            abilities = {
                { id = 589, name = "Shadow Word: Pain", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordPain", desc = "Inflicts pure shadow pain on a target, dealing periodic Shadow damage over 18 sec." },
                { id = 0, name = "Naughty Secret", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Strikes the target with a red-hot iron, dealing Fire damage and causing a burn over 6 sec." },
            },
        },
        ["Azshir the Sleepless"] = {
            overview = "A rare restless crypt ghoul haunting the sealed mausoleum vaults. Emits soul-draining shrieks and summons undead crypt fiends.",
            roleTips = {
                tank = "Establish aggro on Azshir and hold him near the mausoleum entrance. Pick up summoned ghouls.",
                healer = "Heavy shadow damage during Terrifying Shriek. Dispel sleep/fear effects.",
                dps = "AoE down the Crypt Crawler adds quickly, then resume single-target focus on Azshir.",
            },
            abilities = {
                { id = 7399, name = "Terrifying Shriek", icon = "Interface\\Icons\\Spell_Shadow_PsychicScream", desc = "Lets out a horrifying scream, causing all players within 10 yards to flee in terror for 4 sec." },
                { id = 0, name = "Call Crypt Ghouls", icon = "Interface\\Icons\\Spell_Shadow_RaiseDead", desc = "Summons 2 skeletal fiends from surrounding sarcophagi to attack the party." },
            },
        },
        ["Fallen Champion"] = {
            overview = "The reanimated spirit of a decorated Scarlet Crusade paladin who succumbed to the scourge plague. Uses unholy seals and strikes with heavy desecrated polearms.",
            roleTips = {
                tank = "Tank the Champion away from the crypt steps. Use defensive mitigation when he casts Desecrated Strike.",
                healer = "Be prepared for sudden physical spike damage on the tank. Cleanse disease debuffs.",
                dps = "Stay behind the Champion. Interrupt Holy/Unholy spellcasts.",
            },
            abilities = {
                { id = 0, name = "Desecrated Strike", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes the target with unholy fury, dealing physical damage and applying a stacking disease." },
                { id = 8289, name = "Unholy Aura", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Deals pulsing Shadow damage to all enemies within 8 yards every 3 sec." },
            },
        },
        ["Ironspine"] = {
            overview = "A rare skeletal monstrosity reinforced with steel plates, guarding the bone-littered catacombs. Slams the ground with immense kinetic force.",
            roleTips = {
                tank = "Keep Ironspine centered in the crypt chamber. Mitigate high physical crushing blows.",
                healer = "Keep the tank at high health; Ironspine deals high baseline physical auto-attack damage.",
                dps = "Burn Ironspine down with maximum burst. Melee players watch for bone cleaves.",
            },
            abilities = {
                { id = 0, name = "Bone Slam", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Slams a massive skeletal fist onto the ground, stunning the tank for 2 sec." },
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes up to 3 players in front of the caster for physical damage." },
            },
        },
        ["Bloodmage Thalnos"] = {
            overview = "The master necromancer and final boss of the Graveyard, consumed by vampiric blood magic. Summons skeletal minions and rains down shadow bolts.",
            roleTips = {
                tank = "Tank Thalnos near the sacrificial altar. Taunt summoned skeletons immediately so they do not overwhelm casters.",
                healer = "Keep party health topped against Shadow Bolt Volley. Cleanse Flame Shock immediately.",
                dps = "AoE down the summoned skeletons as top priority. Kick Shadow Bolt and Flame Shock casts.",
            },
            abilities = {
                { id = 15245, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Hurls dark shadow bolts at all party members, dealing heavy Shadow damage." },
                { id = 8053, name = "Flame Shock", icon = "Interface\\Icons\\Spell_Fire_FlameShock", desc = "Scorches an enemy target for Fire damage and burns them over 12 sec." },
                { id = 0, name = "Raise Fallen Crusaders", icon = "Interface\\Icons\\Spell_Shadow_RaiseDead", desc = "Raises fallen Scarlet crusaders as skeletal minions to swarm the highest threat target." },
            },
        },
    },

    ["Scarlet Monastery: Library"] = {
        ["Houndmaster Loksey"] = {
            overview = "The kennel master of the Scarlet Monastery, stationed in the Huntsman's Cloister surrounded by fierce Scarlet Tracking Hounds. Uses Battle Shout and enrages into Bloodlust.",
            roleTips = {
                tank = "Pull Loksey and immediately gather his hounds. Keep the pack grouped together facing away from the group.",
                healer = "Be prepared for rapid spike damage when Loksey casts Bloodlust on himself and his hounds.",
                dps = "Focus down and AoE the Scarlet Tracking Hounds first to eliminate extra incoming damage before burning Loksey.",
            },
            abilities = {
                { id = 6742, name = "Bloodlust", icon = "Interface\\Icons\\Spell_Nature_BloodLust", desc = "Increases melee attack speed of the caster and all nearby hound allies by 30% for 30 sec." },
                { id = 9128, name = "Battle Shout", icon = "Interface\\Icons\\Ability_Warrior_BattleShout", desc = "Increases melee attack power of the caster and all allies within 20 yards for 2 min." },
                { id = 0, name = "Summon Hounds", icon = "Interface\\Icons\\Ability_Hunter_Pet_Wolf", desc = "Whistles for additional trained Scarlet Tracking Hounds to join the fray when health is low." },
            },
        },
        ["Arcanist Doan"] = {
            overview = "The powerful arcane scholar and final boss of the Library, residing in the Athenaeum. Unleashes devastating AoE bursts and channels Detonation, requiring players to break line of sight behind pillars.",
            roleTips = {
                tank = "Tank Doan near the center of the circular room. When he begins channeling Detonation, sprint behind a pillar out of sight!",
                healer = "Heal through Arcane Explosion and Fire Nova bursts. Dispel Silence from healers and casters if possible.",
                dps = "Kick Arcane Explosion and Polymorph. Immediately run behind pillars when Doan begins his Detonation cast!",
            },
            abilities = {
                { id = 9435, name = "Detonation", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Channels for 5 sec before unleashing a massive fiery explosion dealing catastrophic lethal Fire damage within 30 yards. Line of sight behind library pillars to avoid!" },
                { id = 9433, name = "Arcane Explosion", icon = "Interface\\Icons\\Spell_Nature_WispSplode", desc = "Unleashes an instant blast of arcane energy dealing moderate Arcane damage to all enemies within 10 yards." },
                { id = 8988, name = "Silence", icon = "Interface\\Icons\\Spell_Holy_Silence", desc = "Silences all enemies within 30 yards, preventing spellcasting for 6 sec." },
                { id = 13323, name = "Polymorph", icon = "Interface\\Icons\\Spell_Nature_Polymorph", desc = "Transforms the highest-threat non-tank enemy into a sheep for up to 10 sec." },
                { id = 11969, name = "Fire Nova", icon = "Interface\\Icons\\Spell_Fire_SealOfFire", desc = "Releases an expanding ring of fire, inflicting Fire damage to all nearby enemies." },
            },
        },
    },

}
