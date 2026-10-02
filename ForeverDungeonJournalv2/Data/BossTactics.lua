local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- Boss Overview, Abilities, and Role-specific Tips for WoW Forever Dungeons
FDJ.BOSS_TACTICS = {
    ["Hall of Thanes"] = {
        ["Faldrim Anvilmar"] = {
            overview = "The tormented spirit of high king Faldrim Anvilmar guards the royal tombs. He periodically spins in a deadly whirlwind and calls forth ancient dwarven ancestral spirits to defend his resting place.",
            roleTips = {
                tank = "Keep Faldrim faced away from the group. Step back slightly when Whirlwind begins to minimize incoming burst.",
                healer = "Prepare area healing when ancestral spirits appear and watch for rapid tank spikes during enrage.",
                dps = "Switch immediately to summoned spirits, then resume burning Faldrim. Do not stand in melee during Whirlwind.",
            },
            abilities = {
                { id = 15589, name = "Whirlwind", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Spins rapidly with heavy weapon strikes, dealing physical damage to all players within 8 yards." },
                { id = 15284, name = "Ancestral Call", icon = "Interface\\Icons\\Spell_Holy_PrayerOfHealing", desc = "Summons ghostly dwarven apparitions that cast Holy Bolt at random party members." },
                { id = 8269, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping attack hitting up to 3 players in front of the caster." },
            },
        },
        ["Magmatus"] = {
            overview = "An ancient subterranean fire elemental awakened in the deep magma chasms beneath Ironforge. Emits intense passive heat and spews molten lava at ranged targets.",
            roleTips = {
                tank = "Turn Magmatus towards the cavern wall to prevent Molten Breath from hitting party members.",
                healer = "Keep Fire Resistance buffs active if available. High ambient party damage occurs during Molten Eruption.",
                dps = "Spread out at least 8 yards apart to prevent Molten Spit from splashing between multiple players.",
            },
            abilities = {
                { id = 12466, name = "Molten Breath", icon = "Interface\\Icons\\Spell_Fire_Fire", desc = "Spews a cone of liquid fire forward, dealing heavy Fire damage over 4 sec." },
                { id = 13338, name = "Molten Eruption", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Erupts violently, dealing Fire damage to all enemies within 25 yards." },
                { id = 11989, name = "Fire Shield", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Deals Fire damage to attackers whenever struck by melee attacks." },
            },
        },
        ["Plunder"] = {
            overview = "A cunning subterranean goblin scoundrel attempting to loot the royal reliquary. Relies on dirty tricks, smoke bombs, and explosive dynamite.",
            roleTips = {
                tank = "Keep aggro tightly held; Plunder uses Gouge to incapacitate the main tank and run towards the highest threat ranged player.",
                healer = "Dispel or heal through explosive bleed wounds and be ready to immediately pop defensive cooldowns when the tank is gouged.",
                dps = "Move out of thrown dynamite circles on the floor immediately. Save stuns or interrupts for his escape attempts.",
            },
            abilities = {
                { id = 1776, name = "Gouge", icon = "Interface\\Icons\\Ability_Gouge", desc = "Gouges the tank's eyes, incapacitating them for 4 sec and turning to attack the next highest threat target." },
                { id = 7978, name = "Throw Dynamite", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Hurls explosive dynamite at a target location, dealing Fire damage in a 5 yard radius." },
                { id = 1860, name = "Smoke Bomb", icon = "Interface\\Icons\\Ability_Vanish", desc = "Obscures vision and drops threat, briefly confusing party members." },
            },
        },
        ["Durgen Dirgehammer"] = {
            overview = "The fanatical Dark Iron commander orchestrating the infiltration into Old Ironforge. Durgen wields a massive enchanted maul that sends shockwaves through the chamber floor.",
            roleTips = {
                tank = "Position Durgen with his back to the royal vault door. When he casts Ground Slam, prepare for high incoming physical burst.",
                healer = "Save your strongest healing surges for his Berserk frenzy at 25% health.",
                dps = "Focus down Dark Iron Infiltrator adds as soon as they respond to Durgen's horn call.",
            },
            abilities = {
                { id = 15588, name = "Thunderclap", icon = "Interface\\Icons\\Spell_Nature_ThunderClap", desc = "Slams the ground, slowing attack speed of nearby enemies by 35% and dealing Nature damage." },
                { id = 11972, name = "Ground Slam", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stuns all players directly in front of the caster for 3 sec." },
                { id = 8269, name = "Call Reinforcements", icon = "Interface\\Icons\\INV_Misc_Horn_01", desc = "Blows a Dark Iron warhorn, summoning two Dark Iron veterans to join the fight." },
            },
        },
    },

    ["Ruins of Lordaeron"] = {
        ["The Baron"] = {
            overview = "A fallen noble of Lordaeron cursed with endless undeath. The Baron commands shadow magic and attempts to turn party members against one another.",
            roleTips = {
                tank = "Hold The Baron near the center altar and prepare to taunt back quickly if charmed allies draw threat.",
                healer = "Be prepared with instant heals when players are targeted by Shadow Bolt Volley.",
                dps = "Crowd control any allies afflicted by Dominate Mind without using lethal damage on them.",
            },
            abilities = {
                { id = 14515, name = "Dominate Mind", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordDominate", desc = "Takes mental control of an enemy party member for up to 10 sec, increasing their damage done." },
                { id = 15245, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Hurls missiles of dark magic at all nearby enemies, dealing Shadow damage." },
                { id = 12542, name = "Curse of Agony", icon = "Interface\\Icons\\Spell_Shadow_CurseOfSargeras", desc = "Curses a target with wracking pain over 24 sec. Decurse immediately if possible." },
            },
        },
        ["Witherfang"] = {
            overview = "A mutated plague hound patrolling the overgrown courtyards. Witherfang infects victims with debilitating virulent toxins and releases disorienting roars.",
            roleTips = {
                tank = "Keep Witherfang turned away from the party to prevent Poison Spray from spraying party members.",
                healer = "Cleanse poison effects quickly; Witherfang's venom reduces physical damage dealt and stacks up to 5 times.",
                dps = "Stay behind the beast and interrupt Terrifying Howl to prevent party members from fleeing into additional trash packs.",
            },
            abilities = {
                { id = 7668, name = "Envenomed Bite", icon = "Interface\\Icons\\Spell_Nature_NullifyPoison", desc = "Bites the target, dealing Nature damage and applying a stacking poison over 15 sec." },
                { id = 13704, name = "Terrifying Howl", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Howls in fury, causing nearby enemies to flee in fear for 3 sec." },
            },
        },
        ["The Abandoned"] = {
            overview = "A towering patchwork abomination assembled from fallen defenders of Capital City. Strikes with enormous heavy cleaves and emits foul noxious gas.",
            roleTips = {
                tank = "Never face The Abandoned toward the party. His Cleave hits for catastrophic damage on non-tanks.",
                healer = "Keep the tank at full health at all times; Cleave combined with toxic aura can kill in two swings.",
                dps = "Stand firmly behind the boss. Move out of the Poison Cloud when he expels gas.",
            },
            abilities = {
                { id = 15284, name = "Heavy Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping cleave that deals high physical damage to all targets in an arc in front of the caster." },
                { id = 11989, name = "Noxious Cloud", icon = "Interface\\Icons\\Spell_Shadow_CreepingPlague", desc = "Leaves a pool of poisonous gas on the ground that ticks for heavy Nature damage." },
            },
        },
        ["Bjork"] = {
            overview = "A hulking savage warrior resurrected in the ruins. Bjork enters an uncontrollable frenzy as his health declines.",
            roleTips = {
                tank = "Use defensive cooldowns when Bjork drops below 30% health and enters Frenzied Rage.",
                healer = "The last 30% of the fight features intense tank damage; conserve mana for this burst window.",
                dps = "Save major offensive cooldowns (Bloodlust, potion, trinkets) for the 30% execute phase.",
            },
            abilities = {
                { id = 8269, name = "Frenzied Rage", icon = "Interface\\Icons\\Ability_Druid_Enrage", desc = "At 30% health, attack speed increases by 50% and physical damage increases by 30%." },
                { id = 15588, name = "Mortal Strike", icon = "Interface\\Icons\\Ability_Warrior_SavageBlow", desc = "Strikes the target for weapon damage and reduces healing received by 50% for 5 sec." },
            },
        },
        ["Rath'mael"] = {
            overview = "A fallen high elven sorcerer who succumbed to the scourge. Rath'mael unleashes devastating frost storms across the chamber floor.",
            roleTips = {
                tank = "Interrupt Frostbolt whenever possible to reduce magic damage spikes.",
                healer = "Quickly dispel Frost Nova roots so players can escape Blizzard zones.",
                dps = "Immediately step out of Blizzard circles. Interrupt Rath'mael's Frost spells on rotation.",
            },
            abilities = {
                { id = 15007, name = "Blizzard", icon = "Interface\\Icons\\Spell_Frost_IceStorm", desc = "Calls down shards of ice on a target area, dealing Frost damage every 2 sec and slowing movement." },
                { id = 15531, name = "Frost Nova", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Freezes all nearby enemies in place for up to 6 sec." },
                { id = 116, name = "Frostbolt", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Launches a bolt of frost, dealing heavy Frost damage and slowing target movement speed." },
            },
        },
        ["Viktor the Vile"] = {
            overview = "A twisted apothecary experimenting on the remnants of Lordaeron's populace. Throws volatile chemical flasks and acidic mixtures.",
            roleTips = {
                tank = "Taunt Viktor back immediately if he turns to throw concoctions at healers.",
                healer = "Dispel Acid Splash to remove armor reduction debuffs from the tank.",
                dps = "Do not cluster together; spread around the boss to minimize splash damage from thrown flasks.",
            },
            abilities = {
                { id = 12542, name = "Acid Splash", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Corrodes target armor by 30% and deals Nature damage over time." },
                { id = 7978, name = "Explosive Concoction", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Hurls a bubbling flask at a random party member, detonating for Fire damage." },
            },
        },
        ["Lordaeron Captain"] = {
            overview = "A rare ghostly commander of the royal guard still carrying his ceremonial blade and shield.",
            roleTips = {
                tank = "Hold the captain in position. Watch for Shield Slam which can briefly stun.",
                healer = "Prepare for steady tank damage; the captain hits harder than standard dungeon rare spawns.",
                dps = "Burn through Shield Wall with spell damage if possible.",
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
                { id = 8269, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes up to 2 targets in front of the caster for physical damage." },
                { id = 5255, name = "Intimidating Roar", icon = "Interface\\Icons\\Ability_GolemThunderClap", desc = "Shouts with terrifying rage, causing nearby enemies to tremble in fear for 3 sec." },
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
                { id = 11989, name = "Fire Nova", icon = "Interface\\Icons\\Spell_Fire_SealOfFire", desc = "Radiates waves of flame in all directions, dealing Fire damage to all nearby enemies." },
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
                { id = 11989, name = "Immolate", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Burns an enemy for initial Fire damage and additional damage every 3 sec for 15 sec." },
                { id = 11988, name = "Curse of Weakness", icon = "Interface\\Icons\\Spell_Shadow_CurseOfMannoroth", desc = "Reduces the target's physical attack power by 15 for 2 min." },
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
                { id = 7668, name = "Poison", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Poisons the target, dealing Nature damage every 3 sec for 15 sec." },
                { id = 1776, name = "Sinister Strike", icon = "Interface\\Icons\\Spell_Shadow_RitualOfSacrifice", desc = "Vicious melee strike dealing increased weapon damage." },
            },
        },
    },

    ["The Deadmines"] = {
        ["Rhahk'Zor"] = {
            overview = "The massive ogre taskmaster guarding the entrance tunnels to the Defias stronghold. Swings a devastating heavy maul that sends shockwaves through the cavern floor.",
            roleTips = {
                tank = "Keep Rhahk'Zor faced away from the party. Be prepared for Rhahk'Zor Slam which briefly stuns the tank.",
                healer = "Watch tank health closely after a slam stun as Rhahk'Zor continues auto-attacking.",
                dps = "Stand strictly behind the boss to avoid getting clipped by his forward cleave.",
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
                { id = 6432, name = "Gold Dust", icon = "Interface\\Icons\\INV_Misc_Dust_02", desc = "Flings a pouch of blinding gold dust into the target's eyes, reducing hit chance by 50% for 5 sec." },
                { id = 8269, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases physical attack power by 50% for 15 sec." },
            },
        },
        ["Sneed's Shredder"] = {
            overview = "The goblin lumber master pilots a deadly mechanical shredder. When the shredder is demolished, Sneed himself ejects and continues fighting on foot.",
            roleTips = {
                tank = "Tank the shredder facing away. Be ready to immediately taunt Sneed the moment the shredder breaks apart.",
                healer = "Be mindful of Disarm on the tank which causes threat generation to sharply drop.",
                dps = "Do not waste high-cooldown abilities right before the shredder dies; save burst for Sneed on foot.",
            },
            abilities = {
                { id = 6435, name = "Terrify", icon = "Interface\\Icons\\Spell_Shadow_Possession", desc = "Intimidates nearby enemies, causing them to flee in fear for 3 sec." },
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
                tank = "Face Mr. Smite away from the party. Be ready to re-establish threat immediately after the 66% and 33% party stuns.",
                healer = "Top off the party before each health threshold (66% and 33%). High burst damage follows each weapon swap.",
                dps = "Hold major burst cooldowns until after weapon-swap transitions so damage is not wasted during party stuns.",
            },
            abilities = {
                { id = 6432, name = "Smite Slam", icon = "Interface\\Icons\\Ability_Smash", desc = "Stuns all nearby enemies for 2 sec." },
                { id = 6435, name = "Smite Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "War stomp that stuns all enemies for 5 sec at 66% and 33% health while Smite equips new weapons." },
            },
        },
        ["Captain Greenskin"] = {
            overview = "The goblin captain commanding the Defias flagship deck alongside Edwin VanCleef. Fights with poisoned harpoons and calls elite Defias crew members.",
            roleTips = {
                tank = "Position Greenskin so his Cleave faces away from the ship deck. Pick up any Defias add that enters the fight.",
                healer = "Cleanse poison from affected members or maintain heavy healing over time.",
                dps = "Kill the pirate crew adds quickly before burning Greenskin.",
            },
            abilities = {
                { id = 6435, name = "Poisoned Harpoon", icon = "Interface\\Icons\\INV_ThrowingKnife_04", desc = "Strikes an enemy with an envenomed spear, slowing movement and dealing Nature damage over time." },
                { id = 8269, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping attack hitting up to 3 enemies in front of the caster." },
            },
        },
        ["Edwin VanCleef"] = {
            overview = "The mastermind of the Defias Brotherhood and supreme leader of the stonemasons. Fights with blistering dual-wield melee strikes and summons Defias Blackguard assassins at 75%, 50%, and 25% health.",
            roleTips = {
                tank = "Hold VanCleef firmly in place. Pick up summoned Blackguard adds immediately so they do not kill healers.",
                healer = "Tank damage is extremely high during add phases; use big heals proactively.",
                dps = "Focus down summoned Defias Blackguard adds as soon as they spawn, then switch back to VanCleef.",
            },
            abilities = {
                { id = 7386, name = "Sinister Strike", icon = "Interface\\Icons\\Spell_Shadow_RitualOfSacrifice", desc = "Vicious strike dealing weapon damage plus additional physical damage." },
                { id = 5255, name = "Call Blackguard", icon = "Interface\\Icons\\Spell_Shadow_Charm", desc = "Calls two stealthy Defias Blackguard assassins from the shadows to ambush the party." },
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
                { id = 6435, name = "Acid Spit", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Spits corrosive juices at an enemy, dealing Nature damage." },
                { id = 6432, name = "Cookie's Tenderize", icon = "Interface\\Icons\\INV_Mace_01", desc = "Whacks the target with a tenderizer, briefly dazing and increasing damage taken." },
            },
        },
    },

    ["Wailing Caverns"] = {
        ["Lord Cobrahn"] = {
            overview = "A corrupted Druid of the Fang who commands the venom of the serpent. Transforms into a deadly viper at 50% health.",
            roleTips = {
                tank = "Interrupt Cobrahn's Healing Touch and Lightning Bolt casts in caster form. Pick up the viper immediately upon transformation.",
                healer = "Dispel Sleep quickly to keep party members active and cure poison during the serpent phase.",
                dps = "Interrupt Healing Touch at all costs. Burn through his viper phase.",
            },
            abilities = {
                { id = 23381, name = "Healing Touch", icon = "Interface\\Icons\\Spell_Nature_HealingTouch", desc = "Heals himself or an ally for a significant amount of health. Must be interrupted." },
                { id = 7964, name = "Viper Form", icon = "Interface\\Icons\\Spell_Nature_SpiritWolf", desc = "Transforms into a viper at 50% health, increasing attack speed and applying venom on hit." },
                { id = 23382, name = "Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts a target to sleep for up to 10 sec. Any damage taken breaks the effect." },
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
                { id = 23381, name = "Healing Touch", icon = "Interface\\Icons\\Spell_Nature_HealingTouch", desc = "Heals herself for a large portion of health. Interrupt immediately." },
                { id = 23382, name = "Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts an enemy party member into a slumber for up to 10 sec." },
            },
        },
        ["Kresh"] = {
            overview = "A giant ancient snapping turtle residing in the underground waterways. Withdraws into his thick shell when threatened.",
            roleTips = {
                tank = "Hold Kresh facing away from the water edge to prevent knockback issues.",
                healer = "Expect steady physical damage on the tank throughout the encounter.",
                dps = "Continue attacking during Shell Shield; armor is high but magic damage still bypasses armor.",
            },
            abilities = {
                { id = 6432, name = "Shell Shield", icon = "Interface\\Icons\\Ability_Hunter_Pet_Turtle", desc = "Retreats into its spiky shell, reducing damage taken by 50% for 10 sec." },
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
                { id = 23381, name = "Healing Touch", icon = "Interface\\Icons\\Spell_Nature_HealingTouch", desc = "Restores substantial health. High interrupt priority." },
                { id = 23382, name = "Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Incapacitates an enemy for up to 10 sec." },
            },
        },
        ["Skum"] = {
            overview = "A ferocious thunder lizard corrupted by the nightmare in the cavern depths. Unleashes crackling bolts of lightning.",
            roleTips = {
                tank = "Turn Skum sideways so Lightning Breath does not hit the entire group.",
                healer = "Keep party health topped up against Chain Lightning bounces.",
                dps = "Spread out slightly to reduce the number of Chain Lightning jumps.",
            },
            abilities = {
                { id = 8269, name = "Chain Lightning", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Fires a crackling lightning bolt that arcs between nearby enemies, dealing Nature damage." },
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
                { id = 23381, name = "Healing Touch", icon = "Interface\\Icons\\Spell_Nature_HealingTouch", desc = "Full heal spell; must be interrupted." },
                { id = 23382, name = "Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts target to sleep for 10 sec." },
            },
        },
        ["Verdan the Everliving"] = {
            overview = "A colossal ancient plant guardian corrupted by the Nightmare. Verdan deals immense physical damage with heavy club-like tree arms.",
            roleTips = {
                tank = "Use all defensive abilities and shield block constantly. Verdan hits exceptionally hard with physical auto-attacks.",
                healer = "Focus entirely on single-target healing on the tank; two unmitigated hits can easily kill.",
                dps = "Stay clear of Verdan's melee range and burn him down quickly.",
            },
            abilities = {
                { id = 11972, name = "Tremor", icon = "Interface\\Icons\\Spell_Nature_Earthquake", desc = "Shakes the cavern floor, dealing heavy physical damage to all nearby enemies." },
                { id = 15531, name = "Grasping Vines", icon = "Interface\\Icons\\Spell_Nature_StrangleVines", desc = "Entangles enemies in roots, preventing movement for 6 sec." },
            },
        },
        ["Mutanus the Devourer"] = {
            overview = "The nightmare manifestation summoned at the end of the Naralex waking ritual. Mutanus thrashes with extra attacks and puts players into deep narcolepsy.",
            roleTips = {
                tank = "Position Mutanus near the slumbering Naralex. Be prepared for sudden burst damage from extra Thrash swings.",
                healer = "Dispel Narcolepsy and Sleep quickly to keep everyone participating in the fight.",
                dps = "Kill the nightmare viper adds that spawn during the ritual before Mutanus awakens.",
            },
            abilities = {
                { id = 3391, name = "Thrash", icon = "Interface\\Icons\\Ability_GhoulFrenzy", desc = "Gives the caster 2 additional attacks on its next swing." },
                { id = 23382, name = "Narcolepsy", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts the target to sleep for up to 10 sec." },
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
                { id = 11989, name = "Mana Burn", icon = "Interface\\Icons\\Spell_Shadow_ManaBurn", desc = "Drains mana from an enemy and deals Shadow damage equal to the mana drained." },
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
                { id = 12542, name = "Soul Drain", icon = "Interface\\Icons\\Spell_Shadow_LifeDrain02", desc = "Channels shadow energy, draining health from the target and restoring it to Rethilgore." },
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
                { id = 8269, name = "Butcher's Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Hits multiple targets in an arc for heavy physical weapon damage." },
            },
        },
        ["Baron Silverlaine"] = {
            overview = "The former lord of Shadowfang Keep, now a restless spectre. Applies Veil of Shadow, a devastating curse that reduces healing taken by 75%.",
            roleTips = {
                tank = "Hold Silverlaine in the dining hall center. Expect heavy damage while cursed.",
                healer = "Decurse Veil of Shadow IMMEDIATELY (Mages / Druids / Shamans / Paladins). Healing through the curse is nearly impossible at level.",
                dps = "If you have a Decurse spell, prioritize removing Veil of Shadow from the tank above doing damage.",
            },
            abilities = {
                { id = 7068, name = "Veil of Shadow", icon = "Interface\\Icons\\Spell_Shadow_GatherShadows", desc = "Curses the target, reducing all healing received by 75% for 15 sec. High decurse priority." },
            },
        },
        ["Commander Springvale"] = {
            overview = "A loyal ghost commander of the keep garrison. Shields himself with the souls of the perished and unleashes unholy strikes.",
            roleTips = {
                tank = "Pull Springvale away from his two ghost guards; kill the guards first or crowd control them.",
                healer = "Expect heavy party damage from Desecration unholy pulses.",
                dps = "Focus down the adds immediately before damaging the commander.",
            },
            abilities = {
                { id = 871, name = "Shield of the Perished", icon = "Interface\\Icons\\Spell_Holy_SealOfProtection", desc = "Surrounds the commander in an unholy barrier, absorbing damage." },
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
                { id = 6432, name = "Howling Rage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases attack speed and physical damage by 25% for 10 sec." },
            },
        },
        ["Deathsworn Captain"] = {
            overview = "A rare ghost captain roaming the upper battlements with martial perfection.",
            roleTips = {
                tank = "Keep the captain faced away from the group; his Whirlwind deals heavy damage.",
                healer = "Keep the tank topped off against sudden mortal strike burst.",
                dps = "Move away when Whirlwind begins.",
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
                { id = 3391, name = "Double Attack", icon = "Interface\\Icons\\Ability_GhoulFrenzy", desc = "Chance on hit to instantly make a second melee swing." },
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
                { id = 5255, name = "Call Lupine Horrors", icon = "Interface\\Icons\\Ability_Hunter_Pet_Wolf", desc = "Summons a pack of spectral wolves to overwhelm the party." },
            },
        },
        ["Archmage Arugal"] = {
            overview = "The renegade archmage of Kirin Tor who unleashed the worgen curse upon Silverpine. Arugal teleports across the high balconies, pelts the party with Shadow Bolts, and casts Thundershock and Mind Control.",
            roleTips = {
                tank = "Chase Arugal up and down the balconies when he teleports to maintain threat and interrupt Void Bolt.",
                healer = "Stay in line of sight of the tank while staying spread out to avoid Thundershock AoE.",
                dps = "Interrupt Void Bolt on rotation. If an ally is affected by Arugal's Curse (Mind Control), crowd control them without killing them.",
            },
            abilities = {
                { id = 15245, name = "Shadow Bolt", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Hurls a bolt of dark energy dealing heavy Shadow damage. High interrupt priority." },
                { id = 15588, name = "Thundershock", icon = "Interface\\Icons\\Spell_Nature_ThunderClap", desc = "Blasts all nearby enemies for Nature damage and stuns them for 5 sec." },
                { id = 14515, name = "Arugal's Curse", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordDominate", desc = "Takes control of an enemy party member for 10 sec, increasing their size and damage." },
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
                { id = 8269, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes up to 2 enemies in front of the caster for physical damage." },
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
                { id = 8269, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases physical damage dealt by 40% when health drops low." },
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
                { id = 6304, name = "Chain Slam", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Swings heavy iron chains, dealing physical damage and knocking back nearby enemies." },
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
                { id = 13704, name = "Terrifying Roar", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Roars with fury, causing nearby enemies to flee in fear for 4 sec." },
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
                { id = 1776, name = "Sinister Strike", icon = "Interface\\Icons\\Spell_Shadow_RitualOfSacrifice", desc = "Heavy weapon strike dealing physical damage." },
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
                tank = "Position Ghamoo-ra away from the edge of the pool. Be ready for Triple Chomp spikes.",
                healer = "Tank damage is steady; keep HoTs active. Ranged members take little to no damage.",
                dps = "Physical damage is reduced by his thick shell; casters deal full damage.",
            },
            abilities = {
                { id = 6432, name = "Triple Chomp", icon = "Interface\\Icons\\Ability_Hunter_Pet_Turtle", desc = "Bites the target three times in rapid succession, dealing heavy physical damage." },
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
                { id = 15531, name = "Frost Nova", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Freezes all nearby enemies in place for up to 6 sec." },
                { id = 8269, name = "Forked Lightning", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Hurls cones of electrical energy at targets in front of her." },
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
                { id = 12542, name = "Curse of the Deep", icon = "Interface\\Icons\\Spell_Shadow_CurseOfMannoroth", desc = "Curses the target, increasing Shadow damage taken." },
                { id = 11989, name = "Shadow Bubble", icon = "Interface\\Icons\\Spell_Shadow_AntiShadow", desc = "Becomes completely immune to damage for 15 sec while spawning murloc minions." },
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
                { id = 11989, name = "Healing Stream Totem", icon = "Interface\\Icons\\INV_Spear_04", desc = "Summons a totem that constantly heals Lorgus Jett. Must be destroyed immediately." },
                { id = 11988, name = "Frost Shock", icon = "Interface\\Icons\\Spell_Frost_FrostShock", desc = "Blasts the target with frost, dealing damage and reducing movement speed by 50% for 8 sec." },
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
                { id = 116, name = "Frostbolt", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Deals heavy Frost damage and slows the target." },
                { id = 11972, name = "Tidal Wave", icon = "Interface\\Icons\\Spell_Frost_SummonWaterElemental", desc = "Sends a crashing wave outward, dealing Frost damage and knocking back players." },
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
                { id = 7668, name = "Corrosive Spit", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Spits corrosive bile, dealing Nature damage and reducing armor." },
            },
        },
        ["Twilight Lord Kelris"] = {
            overview = "The insidious dark leader of the Twilight's Hammer in Blackfathom Deeps. Puts players into nightmare Sleep, casts Mind Blast, and channels Shadow Word: Pain.",
            roleTips = {
                tank = "Interrupt Mind Blast whenever possible. Prepare for Kelris to sleep party members.",
                healer = "Dispel Sleep from the tank immediately! Keep HoTs running to counter Shadow Word: Pain.",
                dps = "Focus on kicking and interrupting Mind Blast on every cast.",
            },
            abilities = {
                { id = 23382, name = "Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts an enemy party member into a nightmare slumber for up to 10 sec." },
                { id = 15245, name = "Mind Blast", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Blasts the target for immense Shadow damage. Must be interrupted." },
            },
        },
        ["Aku'mai"] = {
            overview = "The ancient three-headed primordial hydra god slumbering in the deepest sanctum. Aku'mai poisons targets with Corrosive Bite, emits Void Spray cones, and enters a deadly frenzy at 20% health.",
            roleTips = {
                tank = "Turn Aku'mai away from the party. His Void Spray and Poison Breath are dangerous cones. Pop defensive cooldowns at 20% Enrage.",
                healer = "Save your biggest heals for the 20% Enrage frenzy. Cleanse poison quickly.",
                dps = "Stand strictly at Aku'mai's flank or rear. Save all major damage cooldowns for the 20% execute phase.",
            },
            abilities = {
                { id = 7668, name = "Corrosive Bite", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Bites the target for Nature damage and reduces armor by 25%." },
                { id = 15245, name = "Void Spray", icon = "Interface\\Icons\\Spell_Shadow_CallofBone", desc = "Spews dark energy in a forward cone, dealing heavy Shadow damage over 6 sec." },
                { id = 8269, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "At 20% health, Aku'mai enrages, increasing attack speed by 50% and damage dealt by 25%." },
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
                { id = 3130, name = "Crushing Bite", icon = "Interface\\Icons\\Ability_Druid_Rake", desc = "Viciously bites the target, dealing physical damage and reducing armor by 30% for 10 sec." },
                { id = 15847, name = "Tail Sweep", icon = "Interface\\Icons\\INV_Misc_MonsterTail_03", desc = "Whips his armored tail in a rear arc, dealing damage and knocking back anyone behind the crocolisk." },
                { id = 8269, name = "Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases attack speed by 40% and physical damage by 25% when reaching 30% health." },
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
                { id = 11972, name = "Earthquake", icon = "Interface\\Icons\\Spell_Nature_Earthquake", desc = "Channels a subterranean tremor, dealing Nature damage every 2 sec and knocking players down." },
                { id = 15618, name = "Skull Crack", icon = "Interface\\Icons\\Ability_MaceRagDoll", desc = "Bashes the primary target with a blunt stone mace, stunning them for 3 sec." },
                { id = 8269, name = "Call of the Dig", icon = "Interface\\Icons\\INV_Misc_Horn_01", desc = "Summons 2 Excavation Trogg miners to swarm the party." },
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
                { id = 15245, name = "Static Field", icon = "Interface\\Icons\\Spell_Nature_LightningOverload", desc = "Electrifies a 10-yard pool of water on the chamber floor, dealing Nature damage to anyone standing inside." },
                { id = 15588, name = "Arcane Pulse", icon = "Interface\\Icons\\Spell_Holy_MagicalSentry", desc = "Emits an expanding wave of arcane energy, knocking players back and dealing Arcane damage." },
                { id = 11989, name = "Overload Barrier", icon = "Interface\\Icons\\Spell_Holy_PowerWordShield", desc = "Surrounds itself with a titan energy shield, absorbing damage and reflecting 20% back to attackers until power cells are destroyed." },
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
                { id = 49909, name = "Frost Cleave", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Cleaves enemies in front of the caster for Frost damage, slowing movement speed by 40%." },
                { id = 49576, name = "Death's Grasp", icon = "Interface\\Icons\\Spell_DeathKnight_Strangulate", desc = "Hurls unholy chains at the furthest ranged player, pulling them into melee range." },
                { id = 50842, name = "Blood Boil", icon = "Interface\\Icons\\Spell_DeathKnight_BloodBoil", desc = "Boils the blood of all nearby enemies, dealing heavy Shadow damage." },
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
                { id = 14515, name = "Arcane Explosion", icon = "Interface\\Icons\\Spell_Nature_WispSplode", desc = "Releases a violent burst of raw mana, dealing Arcane damage to all enemies within 15 yards." },
                { id = 1953, name = "Ley Blink", icon = "Interface\\Icons\\Spell_Arcane_Blink", desc = "Teleports to an alternate vantage point on the terrace, dropping threat." },
                { id = 15284, name = "Mana Flare", icon = "Interface\\Icons\\Spell_Holy_SilencingShot", desc = "Burns the mana of all spellcasters in line of sight, dealing damage equal to mana drained." },
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
                { id = 11989, name = "Fel Immolation", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Ignites nearby soil, causing emerald flames that tick for Fire and Chaos damage." },
                { id = 11972, name = "Trample", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stomps the ground violently, dealing Physical damage and knocking down all melee players for 2 sec." },
                { id = 7668, name = "Corrupting Spores", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Releases a cloud of diseased spores, dealing Nature damage and reducing armor." },
            },
        },
        ["Unstable Sentinel"] = {
            overview = "An enchanted arcane automaton patrolling the Violet Hold security corridors. It projects impenetrable directional barriers and spins in a barrage of concentrated laser bursts.",
            roleTips = {
                tank = "Turn the Sentinel perpendicular to the party so party members can attack its vulnerable unshielded back.",
                healer = "Stay out of the Sentinel's tracking beam. Heal through the ticking Arcane Radiance.",
                dps = "Never strike the Sentinel from the front while its Aegis Barrier is active; flank to the rear to bypass deflection.",
            },
            abilities = {
                { id = 15589, name = "Spinning Arcane Cannon", icon = "Interface\\Icons\\Spell_Arcane_Blast", desc = "Spins in a circle firing beams of arcane energy, dealing heavy damage to anyone caught in the beam." },
                { id = 11989, name = "Aegis Projection", icon = "Interface\\Icons\\Spell_Holy_PowerWordShield", desc = "Deploys a front-facing energy shield that reflects all frontal spell and physical attacks." },
            },
        },
        ["Mana Wraith"] = {
            overview = "An ethereal apparition formed from vaporized Kirin Tor scholars. It feeds on magical energy, drains player mana pools, and casts devastating Shadow Word curses.",
            roleTips = {
                tank = "Hold the Wraith in place and interrupt Siphon Essence whenever it begins channeling.",
                healer = "Keep mana pots ready or request innervates/mana springs; Mana Wraith rapidly siphons caster pools.",
                dps = "Kick and counterspell Siphon Essence as top priority. Magic damage is resisted; prioritize Physical burst.",
            },
            abilities = {
                { id = 15245, name = "Siphon Essence", icon = "Interface\\Icons\\Spell_Shadow_LifeDrain02", desc = "Drains health and mana from the target, healing the Mana Wraith for double the amount drained." },
                { id = 12542, name = "Curse of Torment", icon = "Interface\\Icons\\Spell_Shadow_CurseOfSargeras", desc = "Curses the party with debilitating pain, increasing mana costs by 50% for 15 sec." },
            },
        },
        ["Mana Devourer"] = {
            overview = "A ravenous void creature escaped from Dalaran's deepest prisons. It gorged on ambient leylines and periodically purges all magic buffs from the entire party.",
            roleTips = {
                tank = "Aggro the Devourer quickly after each Nullification pulse. Tank active mitigation is critical.",
                healer = "Do not waste mana re-buffing during combat; the Devourer consumes active buffs to heal itself.",
                dps = "Burst with pure damage. When Devourer enters Mana Satiation, it takes 50% increased damage for 10 sec.",
            },
            abilities = {
                { id = 15284, name = "Nullification Burst", icon = "Interface\\Icons\\Spell_Holy_DispelMagic", desc = "Purges all magical beneficial effects from players and deals damage proportional to buffs removed." },
                { id = 13338, name = "Mana Bomb", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Launches an explosive orb of volatile arcane power at a ranged player's location." },
            },
        },
        ["Mana Elemental"] = {
            overview = "A condensed core of pure enchanted water and arcane flux, guarding the Violet Citadel fountain. Splinters into smaller unstable droplets upon defeat.",
            roleTips = {
                tank = "Gather all Splintered Mana Droplets together when the elemental divides at 50% health.",
                healer = "Group AoE damage ramps up when droplets explode upon death. Stagger your cooldowns.",
                dps = "Focus down one droplet at a time or coordinate AoE burst so they don't detonate simultaneously.",
            },
            abilities = {
                { id = 116, name = "Water Bolt Volley", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Fires pressurized water bolts at all party members, dealing Frost damage and slowing movement." },
                { id = 11989, name = "Fission", icon = "Interface\\Icons\\Spell_Arcane_PrismaticCloak", desc = "Splits into four unstable Mana Droplets upon reaching 50% health." },
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
                { id = 1953, name = "Mirror Image", icon = "Interface\\Icons\\Spell_Magic_LesserInvisibilty", desc = "Creates three holographic duplicates that cast Frostbolt and Fireball at random targets." },
                { id = 13338, name = "Time Warp Stutter", icon = "Interface\\Icons\\Spell_Arcane_PortalDalaran", desc = "Hastens her own spellcasting by 50% while slowing all player actions by 20% for 6 sec." },
            },
        },
        ["Shade of the Archmage"] = {
            overview = "The echo of Archmage Antonidas himself, testing worthy champions in the Violet Council Chamber. He casts tri-school magic: Blizzard, Flamestrike, and Arcane Missiles.",
            roleTips = {
                tank = "Center Antonidas in the chamber. Interrupt Pyroblast on cooldown to avoid tank one-shots.",
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
                { id = 11972, name = "Petrifying Gaze", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Chomper glares at a target, turning them to stone and stunning them for 4 sec." },
                { id = 8269, name = "Trogg Smash", icon = "Interface\\Icons\\Ability_MaceRagDoll", desc = "Grubbis strikes with brute force, dealing heavy Physical damage to his primary target." },
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
                { id = 7668, name = "Radioactive Aura", icon = "Interface\\Icons\\Spell_Shadow_CreepingPlague", desc = "Deals periodic Nature damage to all players within 20 yards and reduces healing received." },
                { id = 11989, name = "Toxic Cloud", icon = "Interface\\Icons\\Spell_Nature_AbolishPoison", desc = "Expels a venomous green haze that damages anyone standing inside." },
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
                { id = 15284, name = "Megavolt", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Fires a devastating arc of electricity that jumps to all players standing within 8 yards of each other." },
                { id = 11988, name = "Shock Shield", icon = "Interface\\Icons\\Spell_Nature_LightningShield", desc = "Surrounds itself with lightning, damaging attackers when struck by melee weapons." },
            },
        },
        ["Crowd Pummeler 9-60"] = {
            overview = "A berserk crowd-control automaton in the engineering launch bay. It knocks players high into the air and spins violently in an unstoppable whirlwind.",
            roleTips = {
                tank = "Tank with your back against the pillar so Knockback doesn't send you flying off the platform edges.",
                healer = "Watch for massive falling damage after players are punted into the air.",
                dps = "RUN OUT OF MELEE when Crowd Pummeler casts Arcing Smash / Whirlwind. Ranged DPS have free uptime.",
            },
            abilities = {
                { id = 15589, name = "Pummel Whirlwind", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Spins its massive bronze fists in a 360-degree whirlwind, dealing lethal physical damage to melee." },
                { id = 11972, name = "Crowd Punt", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Punts the primary target into the air, causing high physical damage and threat drop." },
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
                { id = 13338, name = "Deploy Walking Bombs", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Opens ventilation chutes, releasing walking mechanical bombs that detonate on contact with players." },
                { id = 15588, name = "Knock Away", icon = "Interface\\Icons\\Ability_Kick", desc = "Knocks the tank away, reducing threat and temporarily switching targets." },
                { id = 11989, name = "Toxic Vent Discharge", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Emits clouds of irradiating gas from floor grates around the perimeter." },
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
                { id = 8269, name = "Incendiary Shot", icon = "Interface\\Icons\\Spell_Fire_Fireball02", desc = "Fires an explosive rifle round, dealing Fire damage and burning the target over 8 sec." },
                { id = 13338, name = "Explosive Trap", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Places a hidden incendiary trap that detonates when stepped on, knocking back nearby players." },
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
                { id = 11972, name = "Earth Spike", icon = "Interface\\Icons\\Spell_Nature_Earthquake", desc = "Erupts sharp rock spikes beneath a player, dealing physical damage and launching them airborne." },
                { id = 15284, name = "Bramble Entanglement", icon = "Interface\\Icons\\Spell_Nature_StrangleVines", desc = "Roots all players in a 10-yard radius in razor-sharp thorns, dealing bleeding damage over 6 sec." },
            },
        },
        ["Aggem Thorncurse"] = {
            overview = "A ruthless Death's Head necromancer who commands rotting quilboar corpses and inflicts debilitating blood curses.",
            roleTips = {
                tank = "Grab Aggem and pick up the Risen Boar thralls as soon as they crawl from the bone piles.",
                healer = "Decurse Curse of Weakness and Curse of Thorns from melee and tank.",
                dps = "Focus down the skeletal adds with AoE cleave. Interrupt Shadow Bolt casts.",
            },
            abilities = {
                { id = 15245, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Fires shadowy skull missiles at all players, dealing Shadow damage." },
                { id = 12542, name = "Curse of Thorns", icon = "Interface\\Icons\\Spell_Shadow_AntiShadow", desc = "Reflects physical damage back to attackers whenever they strike in melee." },
            },
        },
        ["Death Speaker Jargba"] = {
            overview = "The high priest of the Death's Head quillboar cult. Channels dark mind control magic and raises bone shields to deflect incoming spells.",
            roleTips = {
                tank = "Keep Jargba positioned near the center. Be ready to retake aggro when Mind Control fades from party members.",
                healer = "Dispel Magic to remove Bone Shield. Prepare heavy healing when Shadow Nova detonates.",
                dps = "Crowd control (polymorph, trap, stun) charmed allies without killing them. Interrupt Dominate Mind.",
            },
            abilities = {
                { id = 14515, name = "Dominate Mind", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordDominate", desc = "Chontrolls the mind of a party member for up to 10 sec, forcing them to attack their allies." },
                { id = 11989, name = "Bone Shield", icon = "Interface\\Icons\\Spell_Shadow_GrimWard", desc = "Surrounds the caster with spinning bone fragments, absorbing physical and magical damage." },
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
                { id = 8269, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping cleave striking the tank and up to 2 adjacent players." },
                { id = 8269, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Enrages at 30% health, increasing attack speed by 50% and physical damage dealt by 35%." },
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
                { id = 11972, name = "Earth Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stomps the cavern floor, dealing physical damage and stunning nearby players for 2 sec." },
                { id = 100, name = "Raging Charge", icon = "Interface\\Icons\\Ability_Warrior_Charge", desc = "Charges the furthest target, dealing heavy damage and knocking them backward." },
            },
        },
        ["Charlga Razorflank"] = {
            overview = "The venerable Crone of the Kraul and leader of all Razorfen quillboar. She wields supreme geomancy, encases enemies in stone, and drains life continuously.",
            roleTips = {
                tank = "Keep Charlga near the center of her elevated dais. Interrupt Chain Lightning on cooldown.",
                healer = "Dispel Crystalline Sleep immediately. Heal through the ticking life drain of Mana/Life Spike.",
                dps = "INTERRUPT CHAIN LIGHTNING. Spread out around her platform so lightning does not arc across multiple players.",
            },
            abilities = {
                { id = 15284, name = "Chain Lightning", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Strikes an enemy with a bolt of lightning that arcs to up to 3 nearby allies for heavy Nature damage." },
                { id = 23382, name = "Crystalline Slumber", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Encases an enemy player in crystalline stone, incapacitating them for up to 8 sec." },
                { id = 15245, name = "Drain Life", icon = "Interface\\Icons\\Spell_Shadow_LifeDrain02", desc = "Channels dark geomantic energy, draining health from a player to heal Charlga." },
            },
        },
        ["Blind Hunter"] = {
            overview = "A rare mutated subterranean bat roosting in the dark canyon ceilings. Uses echolocation to silence spellcasters and dives with venomous claws.",
            roleTips = {
                tank = "Grab Blind Hunter when he dives from the ceiling. Position him away from casters.",
                healer = "Stay at maximum range to avoid Sonic Screech silence. Dispel Bat Poison.",
                dps = "Casters must stop channeling when Sonic Screech begins casting to avoid school lockouts.",
            },
            abilities = {
                { id = 15284, name = "Sonic Screech", icon = "Interface\\Icons\\Ability_Hunter_Pet_Bat", desc = "Emits an ear-piercing shriek that silences all spellcasters within 15 yards for 4 sec." },
                { id = 7668, name = "Corrosive Bat Venom", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Infects the target with virulent bat poison, dealing Nature damage over 12 sec." },
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
                { id = 11988, name = "Frost Shock", icon = "Interface\\Icons\\Spell_Frost_FrostShock", desc = "Blasts the target with frost, dealing damage and reducing movement speed by 50% for 6 sec." },
                { id = 11989, name = "Strength of Earth Totem", icon = "Interface\\Icons\\Spell_Nature_EarthBindTotem", desc = "Plants a totem that increases Halmgar's melee damage by 30%." },
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
                { id = 15245, name = "Shadow Word: Pain", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordPain", desc = "Inflicts pure shadow pain on a target, dealing periodic Shadow damage over 18 sec." },
                { id = 11989, name = "Naughty Secret", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Strikes the target with a red-hot iron, dealing Fire damage and causing a burn over 6 sec." },
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
                { id = 13704, name = "Terrifying Shriek", icon = "Interface\\Icons\\Spell_Shadow_PsychicScream", desc = "Lets out a horrifying scream, causing all players within 10 yards to flee in terror for 4 sec." },
                { id = 15245, name = "Call Crypt Ghouls", icon = "Interface\\Icons\\Spell_Shadow_RaiseDead", desc = "Summons 2 skeletal fiends from surrounding sarcophagi to attack the party." },
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
                { id = 8269, name = "Desecrated Strike", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes the target with unholy fury, dealing physical damage and applying a stacking disease." },
                { id = 15588, name = "Unholy Aura", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Deals pulsing Shadow damage to all enemies within 8 yards every 3 sec." },
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
                { id = 11972, name = "Bone Slam", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Slams a massive skeletal fist onto the ground, stunning the tank for 2 sec." },
                { id = 8269, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes up to 3 players in front of the caster for physical damage." },
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
                { id = 11988, name = "Flame Shock", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Scorches an enemy target for Fire damage and burns them over 12 sec." },
                { id = 15284, name = "Raise Fallen Crusaders", icon = "Interface\\Icons\\Spell_Shadow_RaiseDead", desc = "Raises fallen Scarlet crusaders as skeletal minions to swarm the highest threat target." },
            },
        },
    },

}
