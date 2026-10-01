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
}
