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
                melee = "Step out 8+ yards during Whirlwind; stay behind Faldrim to avoid Cleave.",
                ranged = "Switch immediately to summoned spirits, then resume burning Faldrim.",
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
                melee = "Step out of range during Molten Eruption casts. Pace attacks or pop personal defensives to manage self-damage from Fire Shield.",
                ranged = "Stay 30+ yards back to completely outrange Molten Eruption (25 yd range) and spread 8+ yards to prevent Molten Spit chaining. Kill the Dark Iron Summoner add first.",
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
                melee = "Stay strictly behind to avoid Gouge; save stuns and interrupts for his escape attempts.",
                ranged = "Spread out to avoid clustered Dynamite; move 5+ yards out of red dynamite circles immediately.",
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
                melee = "Stay behind boss to avoid Ground Slam frontal stun; save burst cooldowns for 25% enrage.",
                ranged = "Focus down Dark Iron Infiltrator adds as soon as they respond to Durgen's horn call.",
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
                melee = "Stay strictly behind to avoid Shadow Cleave.",
                ranged = "Focus down summoned crypt ghouls immediately; crowd control charmed allies without killing them.",
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
                melee = "Stay behind boss; slow or stun lupine adds if summoned.",
                ranged = "Spread 10+ yards apart to prevent chained pounces.",
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
                melee = "Pace attacks or pop defensives when Bone Armor activates to avoid self-inflicted reflected damage.",
                ranged = "Interrupt Shadow Bolt Volley on cooldown.",
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
                melee = "Stay strictly behind boss to avoid Cleave.",
                ranged = "Burn boss down before enrage stacks overwhelm the tank.",
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
                melee = "Kick Shadow Word: Pain and stun during cast bars.",
                ranged = "Interrupt Mind Blast and dispel Shadowform shields.",
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
                melee = "Move out of green noxious pools immediately.",
                ranged = "Switch to exploding oozes before they reach melee range.",
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
                melee = "TOP PRIORITY: Interrupt Holy Light to prevent the boss from healing to full. Melee pace attacks during Shield Wall.",
                ranged = "TOP PRIORITY: Interrupt Holy Light to prevent the boss from healing to full. Melee pace attacks during Shield Wall.",
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
                melee = "Kill the trogg bodyguard adds first before burning down Oggleflint.",
                ranged = "Kill the trogg bodyguard adds first before burning down Oggleflint.",
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
                melee = "Never stand behind the tank; stay out of the cone of Fire Nova.",
                ranged = "Never stand behind the tank; stay out of the cone of Fire Nova.",
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
                melee = "Quickly interrupt or stun Jergosh to prevent his casted fire spells from landing.",
                ranged = "Quickly interrupt or stun Jergosh to prevent his casted fire spells from landing.",
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
                melee = "Burn down Bazzalan quickly before poison stacks build up on the tank.",
                ranged = "Burn down Bazzalan quickly before poison stacks build up on the tank.",
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
                melee = "Stand strictly behind the boss to avoid getting clipped by his frontal slam stun.",
                ranged = "Stay 15+ yards back.",
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
                melee = "Burn him down swiftly once he activates Enrage.",
                ranged = "Burn him down swiftly once he activates Enrage.",
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
                melee = "Save major burst cooldowns for Sneed on foot after the shredder dies.",
                ranged = "Keep distance so Terrify does not catch casters.",
                dps = "Ranged: Keep distance so Terrify does not catch casters.\nMelee: Save major burst cooldowns for Sneed on foot after the shredder dies.",
            },
            abilities = {
                { id = 7399, name = "Terrify", icon = "Interface\\Icons\\Spell_Shadow_Possession", desc = "Intimidates nearby enemies, causing them to flee in fear for 3 sec." },
                { id = 6713, name = "Disarm", icon = "Interface\\Icons\\Ability_Warrior_Disarm", desc = "Knocks the weapon from the target's hands, disarming them for 6 sec." },
            },
        },
        ["Sneed"] = {
            overview = "The goblin lumber master pilots a deadly mechanical shredder. When the shredder is demolished, Sneed himself ejects and continues fighting on foot.",
            roleTips = {
                tank = "Tank the shredder facing away. Be ready to immediately taunt Sneed the moment the shredder breaks apart.",
                healer = "Be mindful of Disarm on the tank which causes threat to drop; heal through Terrify fear.",
                melee = "Save major burst cooldowns for Sneed on foot after the shredder dies.",
                ranged = "Keep distance so Terrify does not catch casters.",
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
                melee = "Interrupt Molten Metal casts whenever possible.",
                ranged = "Interrupt Molten Metal casts whenever possible.",
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
                melee = "Stop burst right before 66% and 33% health transitions to avoid pulling threat when Smite equips new weapons.",
                ranged = "Stop burst right before 66% and 33% health transitions to avoid pulling threat when Smite equips new weapons.",
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
                melee = "Stay behind boss to avoid Cleave.",
                ranged = "Kill Greenskin's crew adds first.",
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
                melee = "Switch immediately to Defias Blackguard stealth adds as soon as they spawn before continuing damage on VanCleef.",
                ranged = "Switch immediately to Defias Blackguard stealth adds as soon as they spawn before continuing damage on VanCleef.",
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
                melee = "Burn Cookie down swiftly and look out for his tenderizer knockbacks.",
                ranged = "Burn Cookie down swiftly and look out for his tenderizer knockbacks.",
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
                melee = "TOP PRIORITY: Interrupt Healing Touch on cooldown! Melee stay behind to avoid poison spit.",
                ranged = "TOP PRIORITY: Interrupt Healing Touch on cooldown! Melee stay behind to avoid poison spit.",
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
                melee = "Focus on interrupting Healing Touch; she heals a massive portion of health if the cast succeeds.",
                ranged = "Focus on interrupting Healing Touch; she heals a massive portion of health if the cast succeeds.",
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
                melee = "STOP ATTACKING or pace attacks when Spiked Shell activates to avoid killing yourself on reflected damage.",
                ranged = "Full uptime from distance.",
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
                melee = "Prioritize interrupts on Healing Touch above all other actions.",
                ranged = "Prioritize interrupts on Healing Touch above all other actions.",
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
                melee = "Stay at Skum's flanks; never stand behind his tail (Tail Sweep stun).",
                ranged = "Spread 10+ yards apart to prevent Chained Lightning bouncing.",
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
                melee = "Coordinate interrupts on Healing Touch so Serpentis cannot recover health.",
                ranged = "Coordinate interrupts on Healing Touch so Serpentis cannot recover health.",
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
                melee = "Stay strictly behind boss.",
                ranged = "Help free rooted allies if Grasping Vines hits healers.",
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
                melee = "Kill wave adds first during Naralex event. Spread out to avoid multi-target Thundershock stuns.",
                ranged = "Kill wave adds first during Naralex event.",
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
                melee = "Interrupt Mana Burn whenever cast.",
                ranged = "Interrupt Mana Burn whenever cast.",
                dps = "Interrupt Mana Burn whenever cast.",
            },
            abilities = {
                { id = 8129, name = "Mana Burn", icon = "Interface\\Icons\\Spell_Shadow_ManaBurn", desc = "Drains mana from an enemy and deals Shadow damage equal to the mana drained." },
            },
        },
    },

    ["Shadowfang Keep"] = {
        ["Fel Steed / Shadow Charger"] = {
            overview = "Corrupted demonic steeds stabled in the courtyard of Shadowfang Keep. They charge distant targets with [Rushing Charge] and lash out with [Fel Stomp] in close quarters.",
            roleTips = {
                tank = "Pull the steeds back into the courtyard corner away from patrolling worgs. Keep them faced away from the group and brace for [Fel Stomp].",
                healer = "Watch for sudden burst damage on ranged players hit by [Rushing Charge] and top off melee after [Fel Stomp].",
                melee = "Stay behind the steeds and step out briefly if multiple steeds begin casting [Fel Stomp].",
                ranged = "Stand closer to the tank or against a wall to minimize knockback distance from [Rushing Charge].",
                dps = "Melee: Stay behind the steeds and step out briefly if multiple steeds begin casting [Fel Stomp].\nRanged: Stand closer to the tank or against a wall to minimize knockback distance from [Rushing Charge].",
            },
            abilities = {
                { id = 6268, name = "Rushing Charge", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Charges a distant enemy, dealing physical damage and knocking them back." },
                { id = 7102, name = "Fel Stomp", icon = "Interface\\Icons\\Spell_Shadow_Requiem", desc = "Stomps the ground with demonic hooves, dealing Shadow and physical damage to nearby enemies." },
            },
        },
        ["Arugal's Voidwalker"] = {
            overview = "A pack of four unstable void anomalies summoned from Fenrus the Devourer's remains, guarding the stairs to the Rookery. They channel [Dark Offering] and strike with heavy [Shadow Shock].",
            roleTips = {
                tank = "Pick up all four Voidwalkers at the doorway and hold threat with AoE abilities while DPS focus them one by one.",
                healer = "Heal through frequent instant [Shadow Shock] casts on the tank and conserve mana before ascending to Wolf Master Nandos.",
                melee = "Focus-fire the skull target down quickly to reduce incoming [Shadow Shock] damage on the tank.",
                ranged = "Use single-target burst on the primary target and avoid pulling additional voidwalkers from the upper catwalk.",
                dps = "Melee: Focus-fire the skull target down quickly to reduce incoming [Shadow Shock] damage on the tank.\nRanged: Use single-target burst on the primary target and avoid pulling additional voidwalkers from the upper catwalk.",
            },
            abilities = {
                { id = 16583, name = "Shadow Shock", icon = "Interface\\Icons\\Spell_Shadow_ShadowShock", desc = "Instantly lashes the target with dark energy, inflicting Shadow damage." },
                { id = 6398, name = "Dark Offering", icon = "Interface\\Icons\\Spell_Shadow_Haunting", desc = "Empowers nearby voidwalkers with dark energy when slain." },
            },
        },
        ["Rethilgore"] = {
            overview = "A savage worgen fiend imprisoned in the lower courtyard dungeons. Emits shadowy curses and life-draining auras.",
            roleTips = {
                tank = "Keep Rethilgore facing the dungeon wall to prevent Soul Drain from targeting the rest of the group.",
                healer = "Dispel shadow debuffs and keep the tank stabilized against life drains.",
                melee = "Burst him down swiftly before Soul Drain stacks heal him significantly.",
                ranged = "Burst him down swiftly before Soul Drain stacks heal him significantly.",
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
                melee = "Save stuns for when Razorclaw turns away from the incapacitated tank.",
                ranged = "Save stuns for when Razorclaw turns away from the incapacitated tank.",
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
                melee = "Interrupt Silverlaine's shadow casts; burn down before multiple curses are applied to the party.",
                ranged = "Interrupt Silverlaine's shadow casts; burn down before multiple curses are applied to the party.",
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
                melee = "Move out of Desecrated ground circles immediately.",
                ranged = "Kill the ghost bodyguards first.",
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
                melee = "Burn the pet bats down first with AoE, then switch to Odo.",
                ranged = "Burn the pet bats down first with AoE, then switch to Odo.",
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
                melee = "Melee stay strictly behind to avoid Cleave. Burn down quickly.",
                ranged = "Burn down quickly.",
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
                melee = "Burn the hound down quickly; no complex mechanics.",
                ranged = "Burn the hound down quickly; no complex mechanics.",
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
                melee = "AoE down the Lupine Horror wolves as soon as Nandos summons them.",
                ranged = "AoE down the Lupine Horror wolves as soon as Nandos summons them.",
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
                melee = "Run out of melee range when Thundershock casts; do not kill charmed allies.",
                ranged = "Position on opposite balcony or stairs to keep line of sight and interrupt Shadow Bolt.",
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
                melee = "Stand behind him to avoid Cleave.",
                ranged = "Stand behind him to avoid Cleave.",
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
                melee = "Focus down any cellmate adds before damaging Kam.",
                ranged = "Focus down any cellmate adds before damaging Kam.",
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
                melee = "Kill the gnoll add first to eliminate extra incoming damage.",
                ranged = "Kill the gnoll add first to eliminate extra incoming damage.",
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
                melee = "Keep your back to a cell corner so if feared, you don't run into uncleared cells.",
                ranged = "Keep your back to a cell corner so if feared, you don't run into uncleared cells.",
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
                melee = "Do not waste high-cooldown attacks while Evasion is active (switch to magic damage).",
                ranged = "Do not waste high-cooldown attacks while Evasion is active (switch to magic damage).",
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
                melee = "Burn him down quickly; simple melee fight.",
                ranged = "Burn him down quickly; simple melee fight.",
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
                melee = "Pace attacks or pop personal defensives during Spiked Shell to avoid self-inflicted damage.",
                ranged = "Full uptime from distance.",
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
                melee = "Kill the naga bodyguard first, then interrupt Sarevess's Frost spells.",
                ranged = "Kill the naga bodyguard first, then interrupt Sarevess's Frost spells.",
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
                melee = "Stop attacking Gelihast while his bubble is up.",
                ranged = "AoE down the murloc swarms during immune phases. Stop attacking Gelihast while his bubble is up.",
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
                melee = "It heals the boss for immense amounts.",
                ranged = "KILL HEALING TOTEM IMMEDIATELY. It heals the boss for immense amounts.",
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
                melee = "Interrupt Frostbolt whenever possible.",
                ranged = "Interrupt Frostbolt whenever possible.",
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
                melee = "Burn Serra'kis down quickly to avoid prolonged swimming combat.",
                ranged = "Burn Serra'kis down quickly to avoid prolonged swimming combat.",
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
                melee = "Interrupt Mind Blast and Shadow Word: Pain as top priority. Burn down before party sleeps chain.",
                ranged = "Burn down before party sleeps chain.",
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
                melee = "Melee stay out of green poison clouds. Save major burst cooldowns for 25% Enrage burn.",
                ranged = "Save major burst cooldowns for 25% Enrage burn.",
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
                melee = "Stand strictly at Saltspine's flank. Never stand behind him due to Tail Sweep, nor in front due to Triple Bite.",
                ranged = "Stand strictly at Saltspine's flank.",
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
                melee = "Focus down the Trogg Berserkers immediately before burning Shadetooth. Interrupt Shadow Ward casts.",
                ranged = "Focus down the Trogg Berserkers immediately before burning Shadetooth.",
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
                melee = "Kill Creeping Tendrils and Spore Pods immediately when summoned before burning the boss.",
                ranged = "Kill Creeping Tendrils and Spore Pods immediately when summoned before burning the boss.",
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
                melee = "Quickly switch to Arcane Power Cells when they deploy around the room to remove the Guardian's damage immunity shield.",
                ranged = "Quickly switch to Arcane Power Cells when they deploy around the room to remove the Guardian's damage immunity shield.",
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
                melee = "If gripped by Death's Grasp, immediately reposition away from his frontal Frost Cleave.",
                ranged = "If gripped by Death's Grasp, immediately reposition away from his frontal Frost Cleave.",
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
                melee = "Save mobility tools to close the distance when the Anomaly teleports. Prioritize burning volatile mana sparks before they detonate.",
                ranged = "Save mobility tools to close the distance when the Anomaly teleports. Prioritize burning volatile mana sparks before they detonate.",
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
                melee = "Do not stand in green fire patches.",
                ranged = "AoE down Fel Seedlings before they mature into Corrupted Treants. Do not stand in green fire patches.",
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
                melee = "RUN OUT 15+ YARDS when Sentinel begins Overload death cast!",
                ranged = "Finish off Sentinel from max range.",
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
                melee = "TOP PRIORITY: Kick and counterspell Siphon Essence immediately! Magic damage is resisted; prioritize Physical burst.",
                ranged = "Magic damage is resisted; prioritize Physical burst.",
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
                melee = "Save offensive burst cooldowns for Mana Satiation (+50% damage taken for 10 sec).",
                ranged = "Save offensive burst cooldowns for Mana Satiation (+50% damage taken for 10 sec).",
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
                melee = "Step back if low health when droplets detonate.",
                ranged = "Focus down one droplet at a time to prevent simultaneous death explosions.",
                dps = "Ranged: Focus down one droplet at a time to prevent simultaneous death explosions.\nMelee: Step back if low health when droplets detonate.",
            },
            abilities = {
                { id = 15241, name = "Water Bolt Volley", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Fires pressurized water bolts at all party members, dealing Frost damage and slowing movement." },
                { id = 0, name = "Fission", icon = "Interface\\Icons\\Spell_Arcane_PrismaticCloak", desc = "Splits into four unstable Mana Droplets upon reaching 50% health." },
            },
        },
        ["Arcanic Enigma"] = {
            overview = "A condensed core of pure enchanted water and arcane flux, guarding the Violet Citadel fountain. Splinters into smaller unstable droplets upon defeat.",
            roleTips = {
                tank = "Gather all Splintered Mana Droplets together when the elemental divides at 50% health.",
                healer = "Group AoE damage ramps up when droplets explode upon death. Stagger your healing cooldowns.",
                melee = "Step back if low health when droplets detonate.",
                ranged = "Focus down one droplet at a time to prevent simultaneous death explosions.",
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
                melee = "Identify the real Lyn by checking her debuff icons; kill illusions with quick single-target strikes.",
                ranged = "Identify the real Lyn by checking her debuff icons; kill illusions with quick single-target strikes.",
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
                melee = "Kick Flamestrike and Arcane Missiles.",
                ranged = "Spread out so Blizzard and Flamestrike do not overlap multiple players.",
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
                melee = "Burn Chomper down first to remove Petrifying Gaze, then focus Grubbis. Don't pull extra troggs from the side vents.",
                ranged = "Burn Chomper down first to remove Petrifying Gaze, then focus Grubbis. Don't pull extra troggs from the side vents.",
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
                melee = "Quickly eliminate Irradiated Slime adds before they reach the boss and heal it.",
                ranged = "Quickly eliminate Irradiated Slime adds before they reach the boss and heal it.",
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
                melee = "Grouping up will cause Chain Lightning to arc and wipe the group.",
                ranged = "SPREAD OUT AT LEAST 10 YARDS APART. Grouping up will cause Chain Lightning to arc and wipe the group.",
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
                melee = "RUN OUT OF MELEE when Crowd Pummeler casts Arcing Smash / Whirlwind.",
                ranged = "Full uptime from distance.",
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
                melee = "DESIGNATE BOMB CLICKERS.",
                ranged = "DESIGNATE BOMB CLICKERS. When warning horns sound, immediately run to the green-flashing wall buttons to shut off Walking Bomb dispensers.",
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
                melee = "Kill the Dark Iron bodyguards first. Interrupt Incendiary Grenade casts.",
                ranged = "Kill the Dark Iron bodyguards first.",
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
                melee = "Interrupt Earth Spike. Move out of thorny entanglements on the ground immediately.",
                ranged = "Move out of thorny entanglements on the ground immediately.",
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
                melee = "Watch for Curse of Thorns (reflects damage back to attacker!).",
                ranged = "Focus down the skeletal adds with AoE cleave.",
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
                melee = "Crowd control (polymorph, trap, stun) charmed allies without killing them! Interrupt Dominate Mind.",
                ranged = "Crowd control (polymorph, trap, stun) charmed allies without killing them! Interrupt Dominate Mind.",
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
                melee = "Burn the boar adds first with focused single-target damage, then switch to Ramtusk. Melee beware of Cleave.",
                ranged = "Burn the boar adds first with focused single-target damage, then switch to Ramtusk.",
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
                melee = "Move away from the head to avoid Trample.",
                ranged = "Do not stand between Agathelos and the ranged group. Move away from the head to avoid Trample.",
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
                melee = "TOP PRIORITY: INTERRUPT CHAIN LIGHTNING!",
                ranged = "Spread out 10+ yards around her platform so lightning does not arc across multiple players.",
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
                melee = "Burn boss from behind.",
                ranged = "STOP CASTING when Sonic Screech casts to avoid 6-sec school lockout!",
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
                melee = "Kill totems on sight, especially Earthbind Totem and Healing Totem.",
                ranged = "Kill totems on sight, especially Earthbind Totem and Healing Totem.",
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
                melee = "Burn Vishas down quickly. He has low health and can be stunned and interrupted freely.",
                ranged = "Burn Vishas down quickly.",
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
                melee = "AoE down the Crypt Crawler adds quickly, then resume single-target focus on Azshir.",
                ranged = "AoE down the Crypt Crawler adds quickly, then resume single-target focus on Azshir.",
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
                melee = "Stay behind the Champion. Interrupt Holy/Unholy spellcasts.",
                ranged = "Stay behind the Champion. Interrupt Holy/Unholy spellcasts.",
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
                melee = "Burn Ironspine down with maximum burst. Melee players watch for bone cleaves.",
                ranged = "Burn Ironspine down with maximum burst.",
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
                melee = "Kick Shadow Bolt and Flame Shock casts.",
                ranged = "AoE down the summoned skeletons as top priority.",
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
                melee = "Focus down and AoE the Scarlet Tracking Hounds first to eliminate extra incoming damage before burning Loksey.",
                ranged = "Focus down and AoE the Scarlet Tracking Hounds first to eliminate extra incoming damage before burning Loksey.",
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
                melee = "Kick Arcane Explosion and Polymorph. Immediately run behind pillars when Doan begins his Detonation cast!",
                ranged = "Kick Arcane Explosion and Polymorph. Immediately run behind pillars when Doan begins his Detonation cast!",
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

    ["Scarlet Monastery: Armory"] = {
        ["Herod"] = {
            overview = "The Scarlet Champion and master-at-arms of the Monastery. Herod fights in a circular training arena, periodically becoming immune to interrupts during [Whirlwind] and entering a [Frenzy] at low health before calling twenty Scarlet Trainees upon death.",
            roleTips = {
                tank = "Hold Herod in the center of the arena. Step out of melee range during [Whirlwind] if taking heavy damage, and save defensive cooldowns for his 30% [Frenzy].",
                healer = "Pre-shield melee players who get caught in [Whirlwind], and prepare heavy tank healing when [Frenzy] triggers at 30% health.",
                melee = "Run 8+ yards away immediately when Herod shouts 'Blades of Light!' and channels [Whirlwind]. Re-engage only after he stops spinning.",
                ranged = "Maintain steady DPS from the outer stairs during [Whirlwind], and save AoE spells to burn down the 20 Scarlet Trainees that rush in when Herod dies.",
                dps = "Melee: Run 8+ yards away immediately when Herod shouts 'Blades of Light!' and channels [Whirlwind]. Re-engage only after he stops spinning.\nRanged: Maintain steady DPS from the outer stairs during [Whirlwind], and save AoE spells to burn down the 20 Scarlet Trainees that rush in when Herod dies.",
            },
            abilities = {
                { id = 8989, name = "Whirlwind", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Spins in a vortex of steel for 10 sec, immune to stuns and interrupts, striking all enemies within 8 yards." },
                { id = 8269, name = "Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Enters a fanatic frenzy at 30% health, increasing attack speed by 60%." },
                { id = 11551, name = "Rushing Charge", icon = "Interface\\Icons\\Ability_Warrior_Charge", desc = "Charges a target, stunning them for 2 sec and dealing physical damage." },
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes up to 3 targets in front of Herod for heavy weapon damage." },
            },
        },
    },

    ["Scarlet Monastery: Cathedral"] = {
        ["High Inquisitor Fairbanks"] = {
            overview = "Hidden inside a secret chamber in the eastern wall of the chapel, Fairbanks was infected by the undead plague and locked away. He alternates between [Curse of Blood], [Fear], and [Power Word: Shield] while healing himself.",
            roleTips = {
                tank = "Tank Fairbanks inside his secret alcove so [Fear] does not send party members into chapel patrols. Interrupt [Heal] immediately.",
                healer = "Remove [Curse of Blood] immediately (it increases all physical damage taken) and dispel [Power Word: Shield] or [Sleep] on allies.",
                melee = "Save all kicks and stuns for [Heal] casts, and pause attacks if [Curse of Blood] is active on the tank.",
                ranged = "Decurse [Curse of Blood] on sight, purge [Power Word: Shield], and stay inside the alcove doorway to avoid pulling chapel trash during [Fear].",
                dps = "Melee: Save all kicks and stuns for [Heal] casts, and pause attacks if [Curse of Blood] is active on the tank.\nRanged: Decurse [Curse of Blood] on sight, purge [Power Word: Shield], and stay inside the alcove doorway to avoid pulling chapel trash during [Fear].",
            },
            abilities = {
                { id = 8282, name = "Curse of Blood", icon = "Interface\\Icons\\Spell_Shadow_RitualOfBlood", desc = "Increases physical damage taken by nearby enemies for 10 min. Decurse immediately." },
                { id = 12096, name = "Fear", icon = "Interface\\Icons\\Spell_Shadow_Possession", desc = "Strikes fear into an enemy, causing them to flee for up to 6 sec." },
                { id = 11647, name = "Power Word: Shield", icon = "Interface\\Icons\\Spell_Holy_PowerWordShield", desc = "Wraps the caster in a holy shield that absorbs damage and prevents spell pushback." },
                { id = 12039, name = "Heal", icon = "Interface\\Icons\\Spell_Holy_Heal", desc = "Calls upon Holy magic to restore a large amount of health." },
            },
        },
        ["Scarlet Commander Mograine"] = {
            overview = "Commander of the Scarlet garrison in the Cathedral. Clearing the chapel is mandatory because pulling Mograine alerts every remaining crusader in the room. When slain, High Inquisitor Whitemane emerges and resurrects him.",
            roleTips = {
                tank = "Full-clear every crusader in the chapel before pulling Mograine. Hold threat through [Crusader Strike] and move him out of [Consecration].",
                healer = "Keep the tank topped through [Crusader Strike] + [Hammer of Justice] stuns, and conserve mana for Phase 2 when Whitemane joins the fight.",
                melee = "Wait for Mograine's [Divine Shield] immunity to expire before spending cooldowns. Step out of [Consecration] on the floor.",
                ranged = "Burn Mograine down at the altar, then immediately prepare to swap or CC when Whitemane emerges from the back chamber.",
                dps = "Melee: Wait for Mograine's [Divine Shield] immunity to expire before spending cooldowns. Step out of [Consecration] on the floor.\nRanged: Burn Mograine down at the altar, then immediately prepare to swap or CC when Whitemane emerges from the back chamber.",
            },
            abilities = {
                { id = 14517, name = "Crusader Strike", icon = "Interface\\Icons\\Spell_Holy_HolySmite", desc = "Inflicts Holy damage and increases Holy damage taken by the target for 30 sec." },
                { id = 853, name = "Hammer of Justice", icon = "Interface\\Icons\\Spell_Holy_SealOfMight", desc = "Stuns the primary target for 4 sec." },
                { id = 642, name = "Divine Shield", icon = "Interface\\Icons\\Spell_Holy_DivineIntervention", desc = "Protects Mograine from all attacks and spells for 8 sec." },
            },
        },
        ["High Inquisitor Whitemane"] = {
            overview = "Supreme priestess of the Scarlet Monastery. Emerging when Mograine falls, she casts [Deep Sleep] on the entire party and channels [Scarlet Resurrection] to raise Mograine at full health so both must be fought together.",
            roleTips = {
                tank = "Pick up Mograine immediately after [Deep Sleep] ends while dragging him onto Whitemane so melee can interrupt her heals.",
                healer = "Dispel [Power Word: Shield] on Whitemane and heal through [Holy Smite] bursts while the tank holds both bosses.",
                melee = "Lock down Whitemane with kicks and stuns on [Heal] and [Power Word: Shield]; kill Whitemane first or cleave both down together.",
                ranged = "Purge [Power Word: Shield], counterspell [Heal], and focus Whitemane down quickly so she cannot sustain Mograine.",
                dps = "Melee: Lock down Whitemane with kicks and stuns on [Heal] and [Power Word: Shield]; kill Whitemane first or cleave both down together.\nRanged: Purge [Power Word: Shield], counterspell [Heal], and focus Whitemane down quickly so she cannot sustain Mograine.",
            },
            abilities = {
                { id = 9256, name = "Deep Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts all enemies to sleep for 10 sec while Whitemane resurrects Mograine." },
                { id = 9232, name = "Scarlet Resurrection", icon = "Interface\\Icons\\Spell_Holy_Resurrection", desc = "Resurrects Scarlet Commander Mograine with full health and mana." },
                { id = 12039, name = "Heal", icon = "Interface\\Icons\\Spell_Holy_Heal", desc = "Restores a large amount of health to Mograine or Whitemane." },
                { id = 9481, name = "Holy Smite", icon = "Interface\\Icons\\Spell_Holy_HolySmite", desc = "Smites an enemy with Holy fire." },
            },
        },
    },

    ["Razorfen Downs"] = {
        ["Tuten'kash"] = {
            overview = "A giant undead spider summoned by striking the gong in Razorfen Downs twice after clearing two waves of spider adds. Tuten'kash immobilizes players with [Web Spray] and curses the tank with [Virulent Poison].",
            roleTips = {
                tank = "Tank the two gong waves before striking the gong a third time for Tuten'kash. Hold him facing away from the group to isolate [Web Spray].",
                healer = "Cleanse [Virulent Poison] and decurse [Curse of Tuten'kash] immediately so tank attack speed and health stay stable.",
                melee = "Stay behind Tuten'kash to avoid frontal [Web Spray] and interrupt or burn quickly.",
                ranged = "AoE the Tomb Fiend and Tomb Weaver gong waves before the boss spawns, then decurse [Curse of Tuten'kash] on the tank.",
                dps = "Melee: Stay behind Tuten'kash to avoid frontal [Web Spray] and interrupt or burn quickly.\nRanged: AoE the Tomb Fiend and Tomb Weaver gong waves before the boss spawns, then decurse [Curse of Tuten'kash] on the tank.",
            },
            abilities = {
                { id = 12252, name = "Web Spray", icon = "Interface\\Icons\\Ability_Ensnare", desc = "Sprays webs in a frontal cone, immobilizing targets for 8 sec." },
                { id = 12255, name = "Curse of Tuten'kash", icon = "Interface\\Icons\\Spell_Nature_Drowsy", desc = "Reduces attack and casting speed of nearby enemies by 25%." },
                { id = 12254, name = "Virulent Poison", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Inflicts stacking Nature damage over time on the tank." },
            },
        },
        ["Mordresh Fire Eye"] = {
            overview = "A flamboyant skeletal mage standing atop a bone mound surrounded by skeletal acolytes. Mordresh unleashes [Fireball] barrages and AoE [Fire Nova] blasts.",
            roleTips = {
                tank = "Pull the surrounding skeletal packs before engaging Mordresh, then hold him at the base of the bone pile and interrupt [Fireball].",
                healer = "Keep Fire Resistance active and prepare group heals after [Fire Nova] detonations.",
                melee = "Assign a kick rotation on [Fireball] so Mordresh is forced into weak melee attacks.",
                ranged = "Stay 15+ yards back from the bone mound to completely avoid [Fire Nova].",
                dps = "Melee: Assign a kick rotation on [Fireball] so Mordresh is forced into weak melee attacks.\nRanged: Stay 15+ yards back from the bone mound to completely avoid [Fire Nova].",
            },
            abilities = {
                { id = 12466, name = "Fireball", icon = "Interface\\Icons\\Spell_Fire_FlameBolt", desc = "Hurls a fiery boulder that deals heavy Fire damage." },
                { id = 12470, name = "Fire Nova", icon = "Interface\\Icons\\Spell_Fire_SealOfFire", desc = "Inflicts Fire damage to all enemies within 12 yards." },
            },
        },
        ["Glutton"] = {
            overview = "A massive patchwork abomination patrolling the lower bone tunnel in counter-clockwise loops. Glutton attacks rapidly with [Frenzy] and spreads [Disease Cloud] to everyone in melee.",
            roleTips = {
                tank = "Intercept Glutton in a cleared section of the bone ring and pop mitigation cooldowns during [Frenzy].",
                healer = "Cleanse [Infected Wound] and heal through constant [Disease Cloud] ticks on the tank and melee.",
                melee = "Expect pulsing Nature damage from [Disease Cloud] and step back if low on health during [Frenzy].",
                ranged = "Stay at maximum range outside [Disease Cloud] and burn Glutton before he patrols into extra packs.",
                dps = "Melee: Expect pulsing Nature damage from [Disease Cloud] and step back if low on health during [Frenzy].\nRanged: Stay at maximum range outside [Disease Cloud] and burn Glutton before he patrols into extra packs.",
            },
            abilities = {
                { id = 12627, name = "Disease Cloud", icon = "Interface\\Icons\\Spell_Nature_AbolishMagic", desc = "Pulses Nature damage every 3 sec to all enemies within 10 yards." },
                { id = 12795, name = "Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases Glutton's attack speed by 60% for 2 min." },
                { id = 12258, name = "Infected Wound", icon = "Interface\\Icons\\Spell_Nature_NullifyDisease", desc = "Increases physical damage taken by the target." },
            },
        },
        ["Ragglesnout"] = {
            overview = "A rare undead quilboar warlock who spawns near the bone piles. Ragglesnout casts [Dominate Mind] on party members and heals himself with [Heal].",
            roleTips = {
                tank = "Hold Ragglesnout away from bone patrols and be ready to re-establish threat after [Dominate Mind] expires.",
                healer = "Dispel [Shadow Word: Pain] and keep the tank healthy while DPS crowd-control charmed allies.",
                melee = "Interrupt [Heal] and [Shadow Bolt] casts immediately.",
                ranged = "Polymorph or stun any ally hit by [Dominate Mind] without killing them.",
                dps = "Melee: Interrupt [Heal] and [Shadow Bolt] casts immediately.\nRanged: Polymorph or stun any ally hit by [Dominate Mind] without killing them.",
            },
            abilities = {
                { id = 7645, name = "Dominate Mind", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordDominate", desc = "Charms a party member to fight for Ragglesnout for 10 sec." },
                { id = 11642, name = "Heal", icon = "Interface\\Icons\\Spell_Holy_Heal", desc = "Heals Ragglesnout for a substantial amount." },
                { id = 11659, name = "Shadow Word: Pain", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordPain", desc = "Inflicts Shadow damage over 18 sec." },
            },
        },
        ["Plaguemaw the Rotting"] = {
            overview = "The chieftain of the Death's Head quilboar who spawns as the culmination of Belnistrasz's Brazier defense event, applying [Withered Touch] and [Contagion of Rot].",
            roleTips = {
                tank = "Pick up Plaguemaw immediately as the final wave spawns near Belnistrasz's Brazier and hold him steady.",
                healer = "Cleanse [Withered Touch] and [Contagion of Rot] diseases as top priority after recovering mana from the wave defense.",
                melee = "Finish off any remaining wave adds first, then focus Plaguemaw from behind.",
                ranged = "Conserve mana during the final wave of the ritual so you have burst ready when Plaguemaw arrives.",
                dps = "Melee: Finish off any remaining wave adds first, then focus Plaguemaw from behind.\nRanged: Conserve mana during the final wave of the ritual so you have burst ready when Plaguemaw arrives.",
            },
            abilities = {
                { id = 11442, name = "Withered Touch", icon = "Interface\\Icons\\Spell_Nature_Drowsy", desc = "Infects the target with a rotting disease that reduces attributes." },
                { id = 7105, name = "Contagion of Rot", icon = "Interface\\Icons\\Spell_Shadow_CallofBone", desc = "Spreads a virulent disease that increases damage taken." },
            },
        },
        ["Amnennar the Coldbringer"] = {
            overview = "The lich lord of Razorfen Downs. Amnennar blasts the group with [Frostbolt] and [Amnennar's Wrath] frost novas while summoning waves of Frost Spectres at 60% and 30% health.",
            roleTips = {
                tank = "Hold Amnennar near the center of his bone summit and pick up summoned [Frost Spectres] immediately when they spawn.",
                healer = "Dispel [Frostbolt] and [Amnennar's Wrath] roots on the tank and melee immediately so they can reach adds.",
                melee = "Prioritize interrupting [Frostbolt] and immediately cleave down [Frost Spectres] whenever Amnennar summons them.",
                ranged = "Spread out around the summit and nuke [Frost Spectres] the moment they appear at 60% and 30% boss health.",
                dps = "Melee: Prioritize interrupting [Frostbolt] and immediately cleave down [Frost Spectres] whenever Amnennar summons them.\nRanged: Spread out around the summit and nuke [Frost Spectres] the moment they appear at 60% and 30% boss health.",
            },
            abilities = {
                { id = 15530, name = "Frostbolt", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Inflicts heavy Frost damage and slows movement speed by 50%." },
                { id = 13009, name = "Amnennar's Wrath", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Blasts all nearby enemies with frost, rooting them in place." },
                { id = 12642, name = "Frost Spectres", icon = "Interface\\Icons\\Spell_Shadow_RaiseDead", desc = "Summons undead Frost Spectres at 60% and 30% health to swarm the party." },
            },
        },
    },

    ["Uldaman"] = {
        ["Revelosh"] = {
            overview = "A trogg shaman guarding the Hall of the Keepers who holds the Shaft of Tsol. He casts [Chain Lightning] and [Lightning Bolt] at the party.",
            roleTips = {
                tank = "Clear the surrounding trogg packs first, then tank Revelosh in the alcove and interrupt [Chain Lightning].",
                healer = "Expect multi-target Nature damage if [Chain Lightning] finishes casting.",
                melee = "Kick [Chain Lightning] and [Lightning Bolt] on cooldown.",
                ranged = "Spread 10+ yards apart so [Chain Lightning] cannot jump between ranged players.",
                dps = "Melee: Kick [Chain Lightning] and [Lightning Bolt] on cooldown.\nRanged: Spread 10+ yards apart so [Chain Lightning] cannot jump between ranged players.",
            },
            abilities = {
                { id = 16006, name = "Chain Lightning", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Strikes an enemy with lightning that arcs to nearby allies." },
                { id = 15801, name = "Lightning Bolt", icon = "Interface\\Icons\\Spell_Nature_Lightning", desc = "Blasts the target with Nature damage." },
            },
        },
        ["The Lost Dwarves"] = {
            overview = "Baelog, Eric 'The Swift', and Olaf guard the Gni'kiv Medallion in the Dig One compound (friendly to Alliance, hostile to Horde). Olaf stuns with [Shield Slam], Eric charges distant targets with [Rushing Charge], and Baelog shoots from range.",
            roleTips = {
                tank = "Hold Olaf and Baelog together while stunning or rooting Eric 'The Swift' as he darts between ranged players.",
                healer = "Keep HoTs on ranged players targeted by Eric's [Rushing Charge] and watch for Olaf's [Shield Slam] stun on the tank.",
                melee = "Kill Eric 'The Swift' first using stuns and snares, then kill Olaf, and finish Baelog last.",
                ranged = "Kite or root Eric 'The Swift' when he charges and stay out of Baelog's [Shoot] line of sight if low.",
                dps = "Melee: Kill Eric 'The Swift' first using stuns and snares, then kill Olaf, and finish Baelog last.\nRanged: Kite or root Eric 'The Swift' when he charges and stay out of Baelog's [Shoot] line of sight if low.",
            },
            abilities = {
                { id = 8242, name = "Shield Slam", icon = "Interface\\Icons\\INV_Shield_05", desc = "Olaf slams the target with his shield, stunning them for 2 sec." },
                { id = 6268, name = "Rushing Charge", icon = "Interface\\Icons\\Ability_Warrior_Charge", desc = "Eric sprints rapidly and charges a distant party member." },
                { id = 6660, name = "Shoot", icon = "Interface\\Icons\\Ability_Marksmanship", desc = "Baelog fires arrows at ranged targets from across the camp." },
            },
        },
        ["Ironaya"] = {
            overview = "A giant titanic watcher awakened by placing the Staff of Prehistoria in the Map Chamber keystone. Ironaya cleaves with [Arcing Smash] and knocks the tank away with [Knock Away].",
            roleTips = {
                tank = "Tank Ironaya with your back wedged tightly against a corner pillar to negate [Knock Away] and face her away from the party for [Arcing Smash].",
                healer = "Stay out of the frontal cone of [Arcing Smash] and heal the tank rapidly after [War Stomp] stuns.",
                melee = "Stand strictly behind Ironaya to avoid [Arcing Smash] and step back before [War Stomp].",
                ranged = "Stand near the doorway away from her frontal cone and hold threat briefly if the tank is hit by [Knock Away].",
                dps = "Melee: Stand strictly behind Ironaya to avoid [Arcing Smash] and step back before [War Stomp].\nRanged: Stand near the doorway away from her frontal cone and hold threat briefly if the tank is hit by [Knock Away].",
            },
            abilities = {
                { id = 8374, name = "Arcing Smash", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping frontal strike that deals massive physical damage and reduces armor." },
                { id = 10101, name = "Knock Away", icon = "Interface\\Icons\\Ability_Kick", desc = "Flings the tank backward and reduces their threat." },
                { id = 11876, name = "War Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stomps the ground, stunning all nearby enemies for 3 sec." },
            },
        },
        ["Ancient Stone Keeper"] = {
            overview = "A colossal sand golem guarding the Hall of the Crafters. It summons wandering [Sand Storm] tornadoes that silence and damage anyone caught inside.",
            roleTips = {
                tank = "Kite Ancient Stone Keeper slowly around the perimeter of the room whenever a [Sand Storm] spawns on top of melee.",
                healer = "Stay in the outer ring clear of [Sand Storm] clouds, as stepping inside silences spellcasting.",
                melee = "Move out of [Sand Storm] clouds immediately as the tank repositions the golem.",
                ranged = "Stand at max range in a clear lane and sidestep wandering [Sand Storm] whirlwinds.",
                dps = "Melee: Move out of [Sand Storm] clouds immediately as the tank repositions the golem.\nRanged: Stand at max range in a clear lane and sidestep wandering [Sand Storm] whirlwinds.",
            },
            abilities = {
                { id = 10092, name = "Sand Storm", icon = "Interface\\Icons\\Spell_Nature_Cyclone", desc = "Summons swirling sand vortices that deal Nature damage and silence players inside them." },
            },
        },
        ["Galgann Firehammer"] = {
            overview = "A Dark Iron demolitionist leading the excavation inside Uldaman. Galgann casts [Fire Nova] and [Flame Spike] while flanked by two Shadowforge Geologist casters.",
            roleTips = {
                tank = "Pull the surrounding Dark Iron packs first, then group Galgann with his two Shadowforge Geologists for AoE and interrupt.",
                healer = "Prepare group healing for [Flame Spike] and [Fire Nova] bursts.",
                melee = "Kill the two Shadowforge Geologist adds first while kicking [Flame Spike].",
                ranged = "Spread out so [Flame Spike] pillars only hit one player at a time, and burn the Geologist adds first.",
                dps = "Melee: Kill the two Shadowforge Geologist adds first while kicking [Flame Spike].\nRanged: Spread out so [Flame Spike] pillars only hit one player at a time, and burn the Geologist adds first.",
            },
            abilities = {
                { id = 6725, name = "Flame Spike", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Calls down a pillar of flame at a target's location." },
                { id = 11969, name = "Fire Nova", icon = "Interface\\Icons\\Spell_Fire_SealOfFire", desc = "Inflicts Fire damage to all nearby enemies." },
            },
        },
        ["Grimlok"] = {
            overview = "Chieftain of the Stonevault troggs, accompanied by a basilisk pet and two trogg priests. Grimlok casts [Chain Bolt] and [Bloodlust] while his basilisk pet petrifies players with [Crystalline Slumber].",
            roleTips = {
                tank = "Hold Grimlok and the basilisk while DPS focus the two Stonevault Flameweaver/Healer adds.",
                healer = "Dispel [Crystalline Slumber] petrification and purge [Bloodlust] from Grimlok immediately.",
                melee = "Kill the trogg healer adds first, then the basilisk, and interrupt Grimlok's [Chain Bolt].",
                ranged = "Polymorph or crowd-control one add on the pull and purge [Bloodlust] from Grimlok.",
                dps = "Melee: Kill the trogg healer adds first, then the basilisk, and interrupt Grimlok's [Chain Bolt].\nRanged: Polymorph or crowd-control one add on the pull and purge [Bloodlust] from Grimlok.",
            },
            abilities = {
                { id = 8292, name = "Chain Bolt", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Hurls a lightning bolt that arcs to nearby enemies." },
                { id = 6742, name = "Bloodlust", icon = "Interface\\Icons\\Spell_Nature_BloodLust", desc = "Increases attack speed by 30% for 30 sec." },
                { id = 3636, name = "Crystalline Slumber", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Stuns a target in stone for up to 15 sec." },
            },
        },
        ["Archaedas"] = {
            overview = "The ancient titanic guardian of Uldaman, awakened by channeling the Altar of Archaedas. He continuously awakens [Earthen Guardians] throughout the fight, wakes [Vault Warders] at 66% health, and animates [Ground Tremor] stuns.",
            roleTips = {
                tank = "Hold Archaedas near the center altar and pick up the two elite [Vault Warders] immediately when they awaken at 66% health.",
                healer = "Stand at range to avoid [Ground Tremor] stuns and keep the tank alive when both [Vault Warders] wake at 66%.",
                melee = "Cleave down the low-health [Earthen Guardians], switch to kill the two [Vault Warders] at 66%, and burn Archaedas from 33% to 0%.",
                ranged = "Focus down the non-elite [Earthen Guardians] quickly so the healer does not get swarmed, then nuke Archaedas below 33%.",
                dps = "Melee: Cleave down the low-health [Earthen Guardians], switch to kill the two [Vault Warders] at 66%, and burn Archaedas from 33% to 0%.\nRanged: Focus down the non-elite [Earthen Guardians] quickly so the healer does not get swarmed, then nuke Archaedas below 33%.",
            },
            abilities = {
                { id = 6524, name = "Ground Tremor", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Shakes the chamber floor, stunning all nearby enemies for 2 sec." },
                { id = 10252, name = "Awaken Earthen Guardians", icon = "Interface\\Icons\\Spell_Nature_EarthShock", desc = "Animates stone dwarves around the chamber to attack the party." },
                { id = 10258, name = "Awaken Vault Warders", icon = "Interface\\Icons\\Spell_Frost_Stun", desc = "At 66% health, awakens two powerful elite stone golems to defend Archaedas." },
            },
        },
    },

    ["Zul'Farrak"] = {
        ["Antu'sul"] = {
            overview = "Overseer of the sacred basilisk cave in Zul'Farrak. Antu'sul summons [Greater Healing Wave] totems, calls [Sul'lithuz Broodling] basilisks from the cave, and casts [Chain Lightning].",
            roleTips = {
                tank = "Pull the two basilisks guarding his threshold first, then pull Antu'sul back out of his cave and pick up summoned [Sul'lithuz Broodling] adds.",
                healer = "Dispel petrification stuns from basilisks and heal through [Chain Lightning] bursts.",
                melee = "Destroy every totem Antu'sul drops immediately (especially [Healing Ward]) and interrupt [Greater Healing Wave].",
                ranged = "Kill totems on sight and AoE down the [Sul'lithuz Broodling] basilisk wave when they rush out of the cave.",
                dps = "Melee: Destroy every totem Antu'sul drops immediately (especially [Healing Ward]) and interrupt [Greater Healing Wave].\nRanged: Kill totems on sight and AoE down the [Sul'lithuz Broodling] basilisk wave when they rush out of the cave.",
            },
            abilities = {
                { id = 11895, name = "Healing Ward", icon = "Interface\\Icons\\Spell_Holy_LayOnHands", desc = "Drops a powerful totem that rapidly heals Antu'sul and his basilisks." },
                { id = 16006, name = "Chain Lightning", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Strikes a target with lightning that arcs to nearby allies." },
                { id = 11894, name = "Sul'lithuz Broodling", icon = "Interface\\Icons\\Spell_Nature_NatureTouchGrow", desc = "Summons a wave of young basilisks to overwhelm the party." },
            },
        },
        ["Witch Doctor Zum'rah"] = {
            overview = "Initially neutral in the sacred graveyard, Zum'rah turns hostile on approach and raises [Zul'Farrak Zombies] from surrounding shallow graves while dropping [Ward of Zum'rah] totems.",
            roleTips = {
                tank = "Open every shallow grave and clear the zombies BEFORE engaging Zum'rah so he has fewer corpses to raise. Tank him away from active graves.",
                healer = "Heal through [Shadow Bolt Volley] and stay clear of freshly opened graves.",
                melee = "Destroy [Ward of Zum'rah] totems immediately (they summon skeleton adds) and kick [Shadow Bolt Volley] and [Healing Wave].",
                ranged = "Shoot [Ward of Zum'rah] totems the instant they drop and cleave down risen [Zul'Farrak Zombies].",
                dps = "Melee: Destroy [Ward of Zum'rah] totems immediately (they summon skeleton adds) and kick [Shadow Bolt Volley] and [Healing Wave].\nRanged: Shoot [Ward of Zum'rah] totems the instant they drop and cleave down risen [Zul'Farrak Zombies].",
            },
            abilities = {
                { id = 11086, name = "Ward of Zum'rah", icon = "Interface\\Icons\\Spell_Totem_WardOfDraining", desc = "Summons a totem that continuously spawns skeletal minions until destroyed." },
                { id = 15245, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Fires Shadow Bolts at all nearby party members." },
                { id = 12491, name = "Healing Wave", icon = "Interface\\Icons\\Spell_Nature_MagicImmunity", desc = "Calls upon voodoo magic to heal Zum'rah." },
            },
        },
        ["Shadowpriest Sezz'ziz"] = {
            overview = "Fought at the base of the great pyramid after defending Sergeant Bly's party against the hundred-troll stair event, alongside Nekrum Gutchewer. Sezz'ziz casts [Heal], [Psychic Scream], and [Shadow Bolt].",
            roleTips = {
                tank = "Grab both Nekrum Gutchewer and Shadowpriest Sezz'ziz at the bottom of the temple steps after the stair waves finish.",
                healer = "Dispel [Shadow Word: Pain] and use Fear Ward or Tremor Totem for [Psychic Scream].",
                melee = "Focus Shadowpriest Sezz'ziz first and lock down his [Heal] casts with kicks and stuns.",
                ranged = "Burn Sezz'ziz first so he cannot heal Nekrum, then finish Nekrum Gutchewer.",
                dps = "Melee: Focus Shadowpriest Sezz'ziz first and lock down his [Heal] casts with kicks and stuns.\nRanged: Burn Sezz'ziz first so he cannot heal Nekrum, then finish Nekrum Gutchewer.",
            },
            abilities = {
                { id = 12039, name = "Heal", icon = "Interface\\Icons\\Spell_Holy_Heal", desc = "Restores a large amount of health to Sezz'ziz or Nekrum Gutchewer." },
                { id = 13704, name = "Psychic Scream", icon = "Interface\\Icons\\Spell_Shadow_PsychicScream", desc = "Causes nearby enemies to flee in terror for 6 sec." },
                { id = 12739, name = "Shadow Bolt", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Hurls a bolt of dark magic at the target." },
            },
        },
        ["Gahz'rilla"] = {
            overview = "A massive three-headed hydra summoned by striking Gahz'rilla's Gong with the Sacred Mallet. Gahz'rilla launches players high into the air with [Gahz'rilla Slam] and freezes them with [Freeze Solid].",
            roleTips = {
                tank = "Tank Gahz'rilla with your back against the inner wall or pool basin so [Gahz'rilla Slam] does not launch you across the courtyard and cause fall damage.",
                healer = "Keep everyone above 70% health so the combination of [Gahz'rilla Slam] and fall damage is never fatal, and dispel [Freeze Solid].",
                melee = "Fight with your back against a tent or wall to cut the vertical launch of [Gahz'rilla Slam] short.",
                ranged = "Stand outside the 15-yard radius of [Gahz'rilla Slam] to avoid being launched into the air entirely.",
                dps = "Melee: Fight with your back against a tent or wall to cut the vertical launch of [Gahz'rilla Slam] short.\nRanged: Stand outside the 15-yard radius of [Gahz'rilla Slam] to avoid being launched into the air entirely.",
            },
            abilities = {
                { id = 11902, name = "Gahz'rilla Slam", icon = "Interface\\Icons\\Ability_Devastation", desc = "Slams the ground, launching all nearby enemies high into the air for heavy physical plus fall damage." },
                { id = 11836, name = "Freeze Solid", icon = "Interface\\Icons\\Spell_Frost_Glacier", desc = "Encases the target in solid ice, stunning them for 6 sec." },
                { id = 11837, name = "Icicle", icon = "Interface\\Icons\\Spell_Frost_IceShard", desc = "Drops giant icicles onto enemy targets." },
            },
        },
        ["Zerillis"] = {
            overview = "A rare Sandfury executioner wandering the central plazas of Zul'Farrak. Zerillis throws [Net] snares and strikes with [Frost Shot] and heavy axe swings.",
            roleTips = {
                tank = "Pull Zerillis back into a cleared alley so his patrol does not chain-aggro desert packs.",
                healer = "Dispel [Net] and [Frost Shot] slows on the tank or melee.",
                melee = "Close distance quickly after [Net] expires and stay behind him.",
                ranged = "Burn Zerillis safely from range while keeping clear of wandering scarabs.",
                dps = "Melee: Close distance quickly after [Net] expires and stay behind him.\nRanged: Burn Zerillis safely from range while keeping clear of wandering scarabs.",
            },
            abilities = {
                { id = 6533, name = "Net", icon = "Interface\\Icons\\Ability_Ensnare", desc = "Immobilizes an enemy in a weighted net for 5 sec." },
                { id = 12551, name = "Frost Shot", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Fires a chilling arrow that deals Frost damage and slows movement." },
            },
        },
        ["Sandarr Dunereaver"] = {
            overview = "A rare Sandfury berserker patrolling the desert courtyards. Sandarr cleaves nearby targets with [Mortal Strike] and demoralizes the group.",
            roleTips = {
                tank = "Use defensive cooldowns when [Mortal Strike] lands (-50% healing received).",
                healer = "Top off the tank before [Mortal Strike] lands and pre-shield during the healing reduction window.",
                melee = "Stay behind Sandarr and stun him during low health.",
                ranged = "Focus Sandarr down before another patrol walks through the courtyard.",
                dps = "Melee: Stay behind Sandarr and stun him during low health.\nRanged: Focus Sandarr down before another patrol walks through the courtyard.",
            },
            abilities = {
                { id = 13737, name = "Mortal Strike", icon = "Interface\\Icons\\Ability_Warrior_SavageBlow", desc = "Inflicts heavy weapon damage and reduces healing received by 50% for 5 sec." },
                { id = 13730, name = "Demoralizing Shout", icon = "Interface\\Icons\\Ability_Warrior_WarCry", desc = "Reduces the melee attack power of nearby enemies." },
            },
        },
        ["Dustwraith"] = {
            overview = "A rare Sandfury witch doctor who spawns near the graveyard and pyramid base. Dustwraith channels [Chaotic Focus] and [Shadow Bolt].",
            roleTips = {
                tank = "Interrupt [Shadow Bolt] and pull Dustwraith away from nearby graves.",
                healer = "Dispel shadow debuffs and keep the tank topped.",
                melee = "Kick [Shadow Bolt] and [Zero Mana] drains on cooldown.",
                ranged = "Burst Dustwraith down quickly from range.",
                dps = "Melee: Kick [Shadow Bolt] and [Zero Mana] drains on cooldown.\nRanged: Burst Dustwraith down quickly from range.",
            },
            abilities = {
                { id = 12739, name = "Shadow Bolt", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Blasts the target with Shadow damage." },
                { id = 11838, name = "Zero Mana", icon = "Interface\\Icons\\Spell_Shadow_ManaBurn", desc = "Burns mana from a spellcaster target." },
            },
        },
        ["Ruuzlu"] = {
            overview = "Sworn bodyguard to Chief Ukorz Sandscalp atop the great temple pyramid. Ruuzlu fights alongside the Chief with sweeping [Cleave] and [Uppercut] attacks.",
            roleTips = {
                tank = "Hold both Ruuzlu and Chief Ukorz together inside the temple chamber with your back to the wall to prevent [Uppercut] knockbacks.",
                healer = "Expect heavy dual-boss physical damage on the tank until Ruuzlu falls.",
                melee = "Focus-fire Ruuzlu down first while standing behind him to avoid [Cleave].",
                ranged = "Burn Ruuzlu down first to cut incoming tank damage in half before switching to Chief Ukorz.",
                dps = "Melee: Focus-fire Ruuzlu down first while standing behind him to avoid [Cleave].\nRanged: Burn Ruuzlu down first to cut incoming tank damage in half before switching to Chief Ukorz.",
            },
            abilities = {
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes up to 3 enemies in a frontal arc." },
                { id = 10966, name = "Uppercut", icon = "Interface\\Icons\\INV_Gauntlets_05", desc = "Knocks the target back and deals physical damage." },
            },
        },
        ["Chief Ukorz Sandscalp"] = {
            overview = "Supreme ruler of the Sandfury tribe and wielder of one half of Sul'thraze. Ukorz fights alongside Ruuzlu, cleaving with [Wide Slash] and entering [Frenzy] at low health.",
            roleTips = {
                tank = "Face Ukorz away from the party so [Wide Slash] only hits you, and save major defensives for his [Frenzy] phase.",
                healer = "Keep heavy heals rolling on the tank once Ukorz enters [Frenzy] after Ruuzlu dies.",
                melee = "Kill Ruuzlu first, then stand strictly behind Chief Ukorz to avoid [Wide Slash] and [Cleave].",
                ranged = "Kill Ruuzlu first, then finish Chief Ukorz from the doorway.",
                dps = "Melee: Kill Ruuzlu first, then stand strictly behind Chief Ukorz to avoid [Wide Slash] and [Cleave].\nRanged: Kill Ruuzlu first, then finish Chief Ukorz from the doorway.",
            },
            abilities = {
                { id = 11837, name = "Wide Slash", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Sweeping blade strike hitting all enemies in a wide frontal cone." },
                { id = 8269, name = "Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases Ukorz's attack speed by 60% at low health." },
            },
        },
    },

    ["The Drowned City"] = {
        ["Zul'Alai"] = {
            overview = "An ancient undead Gurubashi warlord guarding the sunken streets of I'lalai. Zul'Alai batters the group with [Sunken Slam] and enters a lethal [Undying Frenzy] near death.",
            roleTips = {
                tank = "Hold Zul'Alai in the cleared plaza and save Shield Wall or major mitigation for his low-health [Undying Frenzy].",
                healer = "Prepare group heals after [Sunken Slam] and burst heal the tank during [Undying Frenzy].",
                melee = "Stay behind Zul'Alai and save execute/burst cooldowns for the final 25% [Undying Frenzy].",
                ranged = "Spread around the plaza to reduce [Sunken Slam] splash and burn hard below 25%.",
                dps = "Melee: Stay behind Zul'Alai and save execute/burst cooldowns for the final 25% [Undying Frenzy].\nRanged: Spread around the plaza to reduce [Sunken Slam] splash and burn hard below 25%.",
            },
            abilities = {
                { id = 15588, name = "Sunken Slam", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Slams the flooded stones, dealing physical damage to all nearby players." },
                { id = 8269, name = "Undying Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Enrages near death, dramatically increasing attack speed and damage." },
            },
        },
        ["Var'Taka"] = {
            overview = "Commander of the Brinescale naga occupying the western ruins of the Drowned City. Var'Taka hurls [Forked Lightning] and summons [Tidal Surge] waves.",
            roleTips = {
                tank = "Face Var'Taka away from the party so [Forked Lightning] only strikes the tank.",
                healer = "Heal through [Forked Lightning] bursts and dispel Frost/Water slows.",
                melee = "Stand behind Var'Taka out of the [Forked Lightning] cone and sidestep [Tidal Surge].",
                ranged = "Spread out behind the tank and interrupt watery spellcasts.",
                dps = "Melee: Stand behind Var'Taka out of the [Forked Lightning] cone and sidestep [Tidal Surge].\nRanged: Spread out behind the tank and interrupt watery spellcasts.",
            },
            abilities = {
                { id = 8435, name = "Forked Lightning", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Unleashes a cone of lightning in front of Var'Taka, striking all enemies in the arc." },
                { id = 15744, name = "Tidal Surge", icon = "Interface\\Icons\\Spell_Frost_SummonWaterElemental", desc = "Calls a crashing wave of seawater that damages and slows nearby enemies." },
            },
        },
        ["Captain Dreadrise"] = {
            overview = "The cursed undead pirate captain aboard the wrecked galleon off I'lalai's shore. Dreadrise fires [Broadside Grapeshot] and slashes with [Cursed Cutlass].",
            roleTips = {
                tank = "Tank Captain Dreadrise near the mainmast away from the deck railings and turn him away from the group.",
                healer = "Remove [Cursed Cutlass] curses and top off players hit by [Broadside Grapeshot].",
                melee = "Stay behind the Captain to avoid frontal [Broadside Grapeshot] cones.",
                ranged = "Use the ship's cabin and mast to position safely while burning down deck hands.",
                dps = "Melee: Stay behind the Captain to avoid frontal [Broadside Grapeshot] cones.\nRanged: Use the ship's cabin and mast to position safely while burning down deck hands.",
            },
            abilities = {
                { id = 6660, name = "Broadside Grapeshot", icon = "Interface\\Icons\\INV_Musket_01", desc = "Fires a scatter of shrapnel in a frontal cone, inflicting physical and bleed damage." },
                { id = 14517, name = "Cursed Cutlass", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes the target and applies a lingering sea curse." },
            },
        },
        ["Deathless Marrow"] = {
            overview = "A skeletal colossus bound to a Primeval Elemental in the sunken courtyard. Marrow strikes with [Bone Shatter] while the Primeval Elemental pulses [Tidal Nova].",
            roleTips = {
                tank = "Tank Deathless Marrow and the Primeval Elemental together initially, then separate them slightly when [Tidal Nova] begins casting.",
                healer = "Keep the tank topped against combined physical + elemental hits and heal the group after [Tidal Nova].",
                melee = "Focus down the Primeval Elemental first while kicking [Tidal Nova], then switch to Deathless Marrow.",
                ranged = "Focus the Primeval Elemental down first from range, then burn Deathless Marrow.",
                dps = "Melee: Focus down the Primeval Elemental first while kicking [Tidal Nova], then switch to Deathless Marrow.\nRanged: Focus the Primeval Elemental down first from range, then burn Deathless Marrow.",
            },
            abilities = {
                { id = 15496, name = "Bone Shatter", icon = "Interface\\Icons\\Spell_Shadow_CallofBone", desc = "Crushes the primary target with skeletal force, reducing armor." },
                { id = 15531, name = "Tidal Nova", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "The Primeval Elemental releases a freezing ring of water around itself." },
            },
        },
        ["Primeval Elemental"] = {
            overview = "An ancient bound water spirit fought simultaneously alongside Deathless Marrow in the flooded courtyard. Drops its own distinct loot table once slain and unleashes [Tidal Nova] and [Water Bolt Volley].",
            roleTips = {
                tank = "Pick up the Primeval Elemental alongside Deathless Marrow on the pull and interrupt [Water Bolt Volley] when possible.",
                healer = "Dispel freezing slows from [Tidal Nova] immediately so melee can reposition, and top off the group after [Water Bolt Volley].",
                melee = "Focus the Primeval Elemental down first while kicking [Water Bolt Volley] and stepping out of [Tidal Nova].",
                ranged = "Burn the Primeval Elemental down first from range outside [Tidal Nova] radius so it cannot overwhelm the party with water spells.",
                dps = "Melee: Focus the Primeval Elemental down first while kicking [Water Bolt Volley] and stepping out of [Tidal Nova].\nRanged: Burn the Primeval Elemental down first from range outside [Tidal Nova] radius so it cannot overwhelm the party with water spells.",
            },
            abilities = {
                { id = 15531, name = "Tidal Nova", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Unleashes a freezing wave of abyssal water around the elemental, damaging and rooting nearby enemies." },
                { id = 34427, name = "Water Bolt Volley", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Hurls bolts of pressurized seawater at nearby party members." },
            },
        },
        ["Gill"] = {
            overview = "A mutated deep-sea murloc terror lurking in the flooded grottoes of I'lalai. Gill leaps between targets with [Ravenous Leap] and secretes [Venomous Slime].",
            roleTips = {
                tank = "Taunt Gill back immediately after [Ravenous Leap] and move him out of [Venomous Slime] pools.",
                healer = "Cleanse [Venomous Slime] poison immediately and heal ranged targets struck by [Ravenous Leap].",
                melee = "Move out of green [Venomous Slime] puddles and stun Gill when he summons murloc whelps.",
                ranged = "Group loosely near the tank so [Ravenous Leap] does not pull Gill far across the grotto.",
                dps = "Melee: Move out of green [Venomous Slime] puddles and stun Gill when he summons murloc whelps.\nRanged: Group loosely near the tank so [Ravenous Leap] does not pull Gill far across the grotto.",
            },
            abilities = {
                { id = 8205, name = "Ravenous Leap", icon = "Interface\\Icons\\Ability_Hunter_Pet_Crocolisk", desc = "Leaps onto a random party member, dealing physical damage." },
                { id = 12254, name = "Venomous Slime", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Coats the ground and target in toxic slime that deals Nature damage over time." },
            },
        },
        ["Min'loth the Serpent"] = {
            overview = "The high Gurubashi witch doctor who ruled I'lalai before it sank beneath the waves. Fought atop the storm-lashed temple altar, Min'loth channels [Serpent's Wrath] lightning and summons [Venomous Effigy] wards.",
            roleTips = {
                tank = "Hold Min'loth at the center of the storm altar and move him away from [Venomous Effigy] wards as soon as they appear.",
                healer = "Cleanse serpent poisons promptly and prepare group healing during storm-empowered [Serpent's Wrath] casts.",
                melee = "Destroy [Venomous Effigy] totems immediately and interrupt [Serpent's Wrath].",
                ranged = "Spread out across the temple platform to avoid chained lightning from [Serpent's Wrath] and snipe [Venomous Effigy] wards.",
                dps = "Melee: Destroy [Venomous Effigy] totems immediately and interrupt [Serpent's Wrath].\nRanged: Spread out across the temple platform to avoid chained lightning from [Serpent's Wrath] and snipe [Venomous Effigy] wards.",
            },
            abilities = {
                { id = 16006, name = "Serpent's Wrath", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Calls down storm lightning from the tempest above I'lalai, arcing across nearby players." },
                { id = 11086, name = "Venomous Effigy", icon = "Interface\\Icons\\Spell_Totem_WardOfDraining", desc = "Summons a serpent totem that spits poison bolts at the party until destroyed." },
            },
        },
    },

    ["Maraudon"] = {
        ["Noxxion"] = {
            overview = "A foul toxic elemental lord in the Wicked Grotto (Orange wing). Noxxion sprays [Toxic Volley] poison at the party and periodically splits into five [Noxxion's Spawn] adds while becoming untargetable.",
            roleTips = {
                tank = "Face Noxxion away from the group and gather all five [Noxxion's Spawn] adds quickly when he divides.",
                healer = "Cleanse [Toxic Volley] poison stacks on the tank and melee, or coordinate Anti-Venom / Poison Resistance Totem.",
                melee = "Cleave down the five [Noxxion's Spawn] adds before Noxxion reforms, and step back if poison stacks get high.",
                ranged = "AoE the five [Noxxion's Spawn] adds during the split phase and stay at max range to minimize [Toxic Volley] hits.",
                dps = "Melee: Cleave down the five [Noxxion's Spawn] adds before Noxxion reforms, and step back if poison stacks get high.\nRanged: AoE the five [Noxxion's Spawn] adds during the split phase and stay at max range to minimize [Toxic Volley] hits.",
            },
            abilities = {
                { id = 21687, name = "Toxic Volley", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Hurls bolts of virulent poison at nearby enemies, inflicting initial and periodic Nature damage." },
                { id = 21707, name = "Noxxion's Spawn", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Splits into 5 toxic elemental spawns for 15 sec until they are slain." },
                { id = 10966, name = "Uppercut", icon = "Interface\\Icons\\INV_Gauntlets_05", desc = "Knocks the tank backward." },
            },
        },
        ["Razorlash"] = {
            overview = "A massive thrashing lasher elemental patrolling the Wicked Grotto. Razorlash inflicts stacking [Puncture] bleeds on the tank and cleaves anyone in front of it.",
            roleTips = {
                tank = "Face Razorlash away from the group and rotate mitigation cooldowns as [Puncture] bleed stacks accumulate.",
                healer = "Expect heavy sustained bleed damage on the tank from stacking [Puncture]; keep HoTs active continuously.",
                melee = "Stand strictly behind Razorlash to avoid frontal [Cleave] hits.",
                ranged = "Maintain steady DPS from range and watch for patrolling lashers in the cavern.",
                dps = "Melee: Stand strictly behind Razorlash to avoid frontal [Cleave] hits.\nRanged: Maintain steady DPS from range and watch for patrolling lashers in the cavern.",
            },
            abilities = {
                { id = 15976, name = "Puncture", icon = "Interface\\Icons\\Ability_Gouge", desc = "Pierces the target with thorny vines, causing a stacking bleed every 2 sec." },
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping vine strike that hits up to 3 targets in front of Razorlash." },
            },
        },
        ["Lord Vyletongue"] = {
            overview = "Leader of the Shadowstalker satyrs in the Foulspore Cavern (Purple wing). Vyletongue is guarded by two stealthy Shadowstalkers and uses [Smoke Bomb] and [Multishot].",
            roleTips = {
                tank = "Pick up the two stealthed Shadowstalker bodyguards immediately on pull and pull Vyletongue out of his [Smoke Bomb] cloud.",
                healer = "Keep the tank topped while both stealth adds are alive and heal ranged hit by [Multishot].",
                melee = "Kill the two Shadowstalker adds first and step out of [Smoke Bomb] so your attacks are not parried/missed.",
                ranged = "Focus down the two Shadowstalker bodyguards first, then burn Lord Vyletongue.",
                dps = "Melee: Kill the two Shadowstalker adds first and step out of [Smoke Bomb] so your attacks are not parried/missed.\nRanged: Focus down the two Shadowstalker bodyguards first, then burn Lord Vyletongue.",
            },
            abilities = {
                { id = 7964, name = "Smoke Bomb", icon = "Interface\\Icons\\Ability_Vanish", desc = "Drops a cloud of smoke that stuns and disorients nearby enemies." },
                { id = 14443, name = "Multishot", icon = "Interface\\Icons\\Ability_UpgradeMoonGlaive", desc = "Fires arrows at up to 3 targets." },
            },
        },
        ["Meshlok the Harvester"] = {
            overview = "A rare giant fungal monster patrolling near the waterfall bridge between the outer caverns and Inner Maraudon.",
            roleTips = {
                tank = "Hold Meshlok on the stone path away from neighboring fungal packs.",
                healer = "Cleanse fungal poisons and heal through steady melee hits.",
                melee = "Stay behind Meshlok and burn him down quickly.",
                ranged = "Engagement is straightforward; nuke from range.",
                dps = "Melee: Stay behind Meshlok and burn him down quickly.\nRanged: Engagement is straightforward; nuke from range.",
            },
            abilities = {
                { id = 12254, name = "Virulent Poison", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Inflicts Nature damage over time." },
            },
        },
        ["Celebras the Cursed"] = {
            overview = "Corrupted keeper of the grove who helps forge the Scepter of Celebras once redeemed. Celebras summons [Corrupt Forces of Nature] treants and casts [Wrath] and [Entangling Roots].",
            roleTips = {
                tank = "Hold Celebras and pick up the three [Corrupt Forces of Nature] treants when summoned.",
                healer = "Dispel [Entangling Roots] and [Twisted Tranquility] effects while keeping the tank healthy.",
                melee = "Interrupt [Wrath] and [Twisted Tranquility] immediately!",
                ranged = "Kick/counterspell [Twisted Tranquility] so Celebras cannot heal himself and his treants.",
                dps = "Melee: Interrupt [Wrath] and [Twisted Tranquility] immediately!\nRanged: Kick/counterspell [Twisted Tranquility] so Celebras cannot heal himself and his treants.",
            },
            abilities = {
                { id = 21793, name = "Twisted Tranquility", icon = "Interface\\Icons\\Spell_Nature_Tranquility", desc = "Channels a dark nature spell that heals Celebras and nearby allies." },
                { id = 21807, name = "Wrath", icon = "Interface\\Icons\\Spell_Nature_AbolishMagic", desc = "Hurls a bolt of Nature energy at the target." },
                { id = 12747, name = "Entangling Roots", icon = "Interface\\Icons\\Spell_Nature_StrangleVines", desc = "Roots an enemy in place and deals Nature damage over time." },
            },
        },
        ["Landslide"] = {
            overview = "A towering mountain giant patrolling the Poison Falls of Inner Maraudon. Landslide stuns the group with [War Stomp], knocks the tank away with [Knock Away], and summons [Subterranean Diemetradon] adds.",
            roleTips = {
                tank = "Tank Landslide with your back against the cavern wall to negate [Knock Away] and pick up summoned adds.",
                healer = "Stay at max range outside [War Stomp] and [Trample] radius so your heals are never stunned.",
                melee = "Step back before [War Stomp] or switch to kill summoned adds quickly.",
                ranged = "Stay 25+ yards back to avoid [War Stomp] stuns and kill summoned rock elementals.",
                dps = "Melee: Step back before [War Stomp] or switch to kill summoned adds quickly.\nRanged: Stay 25+ yards back to avoid [War Stomp] stuns and kill summoned rock elementals.",
            },
            abilities = {
                { id = 21808, name = "Landslide", icon = "Interface\\Icons\\Spell_Nature_Earthquake", desc = "Stuns all nearby enemies and summons stone shards to attack the party." },
                { id = 10101, name = "Knock Away", icon = "Interface\\Icons\\Ability_Kick", desc = "Knocks the primary target back and reduces threat." },
                { id = 5568, name = "Trample", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Inflicts physical damage to all nearby enemies." },
            },
        },
        ["Tinkerer Gizlock"] = {
            overview = "A crazed goblin engineer perched on a wooden catwalk overlooking the chasm. Gizlock hurls [Bomb] explosives, sprays [Goblin Dragon Gun] fire cones, and shoots with [Shoot].",
            roleTips = {
                tank = "Tank Gizlock on his platform facing away from the party so [Goblin Dragon Gun] only hits you.",
                healer = "Heal through [Bomb] stuns and Fire damage from [Goblin Dragon Gun].",
                melee = "Stand behind Gizlock to avoid his frontal [Goblin Dragon Gun] flamethrower.",
                ranged = "Spread out on the ramp so [Bomb] throws only hit a single player.",
                dps = "Melee: Stand behind Gizlock to avoid his frontal [Goblin Dragon Gun] flamethrower.\nRanged: Spread out on the ramp so [Bomb] throws only hit a single player.",
            },
            abilities = {
                { id = 9143, name = "Bomb", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Throws a bomb at a random target, dealing Fire damage and stunning for 2 sec." },
                { id = 21833, name = "Goblin Dragon Gun", icon = "Interface\\Icons\\Spell_Fire_Incinerate", desc = "Channels a cone of flame in front of Gizlock for 6 sec." },
                { id = 16100, name = "Shoot", icon = "Interface\\Icons\\INV_Weapon_Rifle_01", desc = "Shoots a distant enemy with a blunderbuss." },
            },
        },
        ["Rotgrip"] = {
            overview = "A massive albino snapjaw crocolisk lurking in the waters below Princess Theradras's island. Rotgrip inflicts stacking [Fatal Bite] bleeds that cannot be cleansed.",
            roleTips = {
                tank = "Pull Rotgrip up onto the dry ramp before Princess Theradras's bridge and pop armor/mitigation cooldowns for [Fatal Bite].",
                healer = "Pump heavy direct heals into the tank to outheal stacking [Fatal Bite] bleeds.",
                melee = "Burn Rotgrip down quickly before [Fatal Bite] stacks overwhelm the tank.",
                ranged = "Stand up on the dry ramp and nuke Rotgrip.",
                dps = "Melee: Burn Rotgrip down quickly before [Fatal Bite] stacks overwhelm the tank.\nRanged: Stand up on the dry ramp and nuke Rotgrip.",
            },
            abilities = {
                { id = 16495, name = "Fatal Bite", icon = "Interface\\Icons\\Ability_BackStab", desc = "Takes a massive bite out of the tank, causing heavy physical bleed damage over 10 sec." },
            },
        },
        ["Princess Theradras"] = {
            overview = "Earth elemental daughter of Therazane ruling Zaetar's Grave. Theradras channels [Dust Field] to fling all melee players backward while resetting threat, stuns with [Repulsive Gaze] fear, and hurls [Boulder] rocks.",
            roleTips = {
                tank = "Fight near the inner island rocks so [Dust Field] does not fling you off the bridge, and intercept Theradras immediately when she charges ranged during [Dust Field].",
                healer = "Use Fear Ward or Tremor Totem for [Repulsive Gaze] and pre-shield ranged players hit by [Boulder] while the tank is knocked back by [Dust Field].",
                melee = "Run out 15+ yards when Theradras begins channeling [Dust Field], then charge back in after it ends.",
                ranged = "Stop attacking briefly when the tank is knocked back by [Dust Field] so Theradras does not flatten you with melee swings.",
                dps = "Melee: Run out 15+ yards when Theradras begins channeling [Dust Field], then charge back in after it ends.\nRanged: Stop attacking briefly when the tank is knocked back by [Dust Field] so Theradras does not flatten you with melee swings.",
            },
            abilities = {
                { id = 21909, name = "Dust Field", icon = "Interface\\Icons\\Spell_Nature_Cyclone", desc = "Channels a violent dust storm for 6 sec that continuously knocks back all nearby enemies." },
                { id = 21869, name = "Repulsive Gaze", icon = "Interface\\Icons\\Spell_Shadow_Charm", desc = "Causes a target to flee in horror for 6 sec." },
                { id = 21832, name = "Boulder", icon = "Interface\\Icons\\INV_Stone_14", desc = "Hurls a massive boulder at a distant target, knocking them down." },
            },
        },
    },

    ["Sunken Temple"] = {
        ["Atal'alarion"] = {
            overview = "A towering stone guardian in the basement pit, summoned by activating the six Atal'ai Statues in the correct order (South, North, SW, SE, NW, NE). He strikes with [Sweeping Slam] and [Atal'ai Traps].",
            roleTips = {
                tank = "Tank Atal'alarion with your back against one of the inner pillars so [Sweeping Slam] does not launch you across the pit.",
                healer = "Stay near a pillar inside line of sight and keep the tank topped after [Sweeping Slam].",
                melee = "Stand behind Atal'alarion with your back to a pillar in case of knockbacks.",
                ranged = "Stand against the pit wall and avoid stepping on glowing floor traps.",
                dps = "Melee: Stand behind Atal'alarion with your back to a pillar in case of knockbacks.\nRanged: Stand against the pit wall and avoid stepping on glowing floor traps.",
            },
            abilities = {
                { id = 12887, name = "Sweeping Slam", icon = "Interface\\Icons\\Ability_Devastation", desc = "Slams targets in front of the golem, knocking them far back." },
            },
        },
        ["Dreamscythe"] = {
            overview = "One of the four Nightmare green drakes patrolling the central ring after all six upper Atal'ai Troll mini-bosses are slain. Dreamscythe breathes [Acid Breath] and beats his wings with [Wing Flap].",
            roleTips = {
                tank = "Pull Dreamscythe solo before Weaver patrols close, and face him away from the group to isolate [Acid Breath].",
                healer = "Keep the tank topped against stacking [Acid Breath] Nature DoTs.",
                melee = "Stand at Dreamscythe's flank (never in front) to avoid [Acid Breath] and [Wing Flap].",
                ranged = "Pull when Dreamscythe is separated from Weaver so you do not fight two drakes at once.",
                dps = "Melee: Stand at Dreamscythe's flank (never in front) to avoid [Acid Breath] and [Wing Flap].\nRanged: Pull when Dreamscythe is separated from Weaver so you do not fight two drakes at once.",
            },
            abilities = {
                { id = 12884, name = "Acid Breath", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Inflicts frontal cone Nature damage and applies a stacking acid DoT." },
                { id = 12882, name = "Wing Flap", icon = "Interface\\Icons\\INV_Misc_MonsterScales_14", desc = "Knocks back enemies in front of the drake." },
            },
        },
        ["Weaver"] = {
            overview = "Dreamscythe's partner drake patrolling the central hall. Like Dreamscythe, Weaver uses [Acid Breath] and [Wing Flap].",
            roleTips = {
                tank = "Tank Weaver with your back to the wall and face his head away from the party.",
                healer = "Monitor stacking [Acid Breath] damage on the tank.",
                melee = "Attack from the side or rear to avoid [Acid Breath] and [Wing Flap].",
                ranged = "Stay at range in the cleared hallway.",
                dps = "Melee: Attack from the side or rear to avoid [Acid Breath] and [Wing Flap].\nRanged: Stay at range in the cleared hallway.",
            },
            abilities = {
                { id = 12884, name = "Acid Breath", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Breathes corrosive acid in a frontal cone." },
                { id = 12882, name = "Wing Flap", icon = "Interface\\Icons\\INV_Misc_MonsterScales_14", desc = "Buffets frontal targets backward." },
            },
        },
        ["Avatar of Hakkar"] = {
            overview = "Summoned in the Hall of Masks using the Egg of Hakkar. Players must defeat waves of Atal'ai Bloodkeepers (to loot 4 Hakkari Bloods and extinguish the 4 Eternal Flames) while suppressing Nightmare Suppressors before the Avatar materializes.",
            roleTips = {
                tank = "Tank the summon waves near the center, then hold the Avatar of Hakkar and prepare for [Cause Insanity] mind control.",
                healer = "Decurse [Curse of Tongues] immediately and dispel magic effects during the Avatar phase.",
                melee = "Interrupt Nightmare Suppressors during the wave event, then focus the Avatar.",
                ranged = "Click the 4 corner braziers using Hakkari Blood as soon as they drop, and crowd-control any ally hit by [Cause Insanity].",
                dps = "Melee: Interrupt Nightmare Suppressors during the wave event, then focus the Avatar.\nRanged: Click the 4 corner braziers using Hakkari Blood as soon as they drop, and crowd-control any ally hit by [Cause Insanity].",
            },
            abilities = {
                { id = 12888, name = "Cause Insanity", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordDominate", desc = "Charms a party member for 6 sec." },
                { id = 12889, name = "Curse of Tongues", icon = "Interface\\Icons\\Spell_Shadow_CurseOfTounges", desc = "Slows spellcasting speed by 50%." },
            },
        },
        ["Jammal'an the Prophet"] = {
            overview = "Leader of the Atal'ai trolls in the eastern sanctuary, fought alongside Ogom the Wretched. Every remaining troll pack in his hall will rush to his aid if not cleared first! Jammal'an drops [Earthgrab Totem], casts [Healing Wave], and transforms a player with [Hex of Jammal'an].",
            roleTips = {
                tank = "Full-clear the entire eastern hall before pulling Jammal'an. Hold Jammal'an and Ogom while moving away from [Earthgrab Totem].",
                healer = "Heal any player cursed with [Hex of Jammal'an] and watch for friendly damage when the hex transforms them into an Atal'ai troll!",
                melee = "Destroy [Earthgrab Totem] immediately and lock down Jammal'an's [Healing Wave] and [Flamestrike] casts.",
                ranged = "Crowd-control (Sheep/Hibernate/Fear) any party member transformed by [Hex of Jammal'an] so they do not wipe the group!",
                dps = "Melee: Destroy [Earthgrab Totem] immediately and lock down Jammal'an's [Healing Wave] and [Flamestrike] casts.\nRanged: Crowd-control (Sheep/Hibernate/Fear) any party member transformed by [Hex of Jammal'an] so they do not wipe the group!",
            },
            abilities = {
                { id = 12480, name = "Hex of Jammal'an", icon = "Interface\\Icons\\Spell_Totem_WardOfDraining", desc = "After 10 sec, transforms the target into a hostile Atal'ai troll with quadrupled damage for 10 sec." },
                { id = 12491, name = "Healing Wave", icon = "Interface\\Icons\\Spell_Nature_MagicImmunity", desc = "Restores a large amount of health to Jammal'an or Ogom." },
                { id = 8376, name = "Earthgrab Totem", icon = "Interface\\Icons\\Spell_Nature_NatureTouchDecay", desc = "Roots nearby enemies in place every few seconds." },
            },
        },
        ["Ogom the Wretched"] = {
            overview = "Undead troll shadowpriest who fights alongside Jammal'an the Prophet. Ogom casts [Shadow Word: Pain], [Curse of Weakness], and [Shadow Bolt].",
            roleTips = {
                tank = "Keep threat on Ogom while the party burns or CCs him during the Jammal'an pull.",
                healer = "Dispel [Shadow Word: Pain] and decurse [Curse of Weakness].",
                melee = "Kill Ogom first (or burn Jammal'an while kicking heals) and interrupt [Shadow Bolt].",
                ranged = "Shackle Undead or off-tank Ogom until Jammal'an falls, or burn Ogom first so only one caster remains.",
                dps = "Melee: Kill Ogom first (or burn Jammal'an while kicking heals) and interrupt [Shadow Bolt].\nRanged: Shackle Undead or off-tank Ogom until Jammal'an falls, or burn Ogom first so only one caster remains.",
            },
            abilities = {
                { id = 11659, name = "Shadow Word: Pain", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordPain", desc = "Inflicts Shadow damage over 18 sec." },
                { id = 12493, name = "Curse of Weakness", icon = "Interface\\Icons\\Spell_Shadow_CurseOfMannoroth", desc = "Reduces physical damage dealt by the target." },
            },
        },
        ["Morphaz"] = {
            overview = "Fought together with Hazzas in front of the Shade of Eranikus's alcove once Jammal'an is slain. Both drakes breathe [Acid Breath] and cast [Lethargic Cloud].",
            roleTips = {
                tank = "Tank both Morphaz and Hazzas facing the side wall with your back wedged in a corner against [Wing Flap].",
                healer = "Heavy tank healing required while both drakes are alive and breathing [Acid Breath].",
                melee = "Focus-fire Morphaz down first to quickly eliminate half of the incoming tank damage.",
                ranged = "Single-target focus Morphaz first, then switch to Hazzas.",
                dps = "Melee: Focus-fire Morphaz down first to quickly eliminate half of the incoming tank damage.\nRanged: Single-target focus Morphaz first, then switch to Hazzas.",
            },
            abilities = {
                { id = 12884, name = "Acid Breath", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Cone of corrosive acid that stacks a Nature DoT." },
                { id = 12882, name = "Wing Flap", icon = "Interface\\Icons\\INV_Misc_MonsterScales_14", desc = "Knocks back frontal targets." },
            },
        },
        ["Hazzas"] = {
            overview = "Twin guardian drake fought simultaneously with Morphaz before the final chamber. Uses [Acid Breath] and [Wing Flap].",
            roleTips = {
                tank = "Keep Hazzas turned away from the party alongside Morphaz.",
                healer = "Sustain tank health through double [Acid Breath] stacks until Morphaz dies.",
                melee = "Kill Morphaz first, then finish Hazzas from his flank.",
                ranged = "Focus Hazzas once Morphaz is dead.",
                dps = "Melee: Kill Morphaz first, then finish Hazzas from his flank.\nRanged: Focus Hazzas once Morphaz is dead.",
            },
            abilities = {
                { id = 12884, name = "Acid Breath", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Cone of corrosive acid." },
                { id = 12882, name = "Wing Flap", icon = "Interface\\Icons\\INV_Misc_MonsterScales_14", desc = "Frontal wing knockback." },
            },
        },
        ["Shade of Eranikus"] = {
            overview = "The corrupted green dragon final boss of the Sunken Temple. Pulling Eranikus BEFORE killing Jammal'an will pull every green dragon in the instance! Eranikus puts the highest-threat target to sleep with [Deep Slumber] (cannot be dispelled!), batters the group with [Thrash], and breathes [Acid Breath].",
            roleTips = {
                tank = "Never pull Eranikus until Jammal'an and all 4 mini-drakes are dead. Bring an off-tank or high-armor melee to hold Eranikus during the 12-sec undispellable [Deep Slumber] on the main tank!",
                healer = "Pre-shield and spam heal the secondary tank/highest DPS immediately whenever the main tank is hit by [Deep Slumber].",
                melee = "Stand at Eranikus's rear hip (never in front for [Acid Breath] or behind the tail) and pop evasion/defensives if you have top threat when the tank falls asleep to [Deep Slumber].",
                ranged = "Watch your threat carefully so Eranikus targets a plate/bear off-tank rather than a cloth caster when the main tank is put into [Deep Slumber].",
                dps = "Melee: Stand at Eranikus's rear hip (never in front for [Acid Breath] or behind the tail) and pop evasion/defensives if you have top threat when the tank falls asleep to [Deep Slumber].\nRanged: Watch your threat carefully so Eranikus targets a plate/bear off-tank rather than a cloth caster when the main tank is put into [Deep Slumber].",
            },
            abilities = {
                { id = 12890, name = "Deep Slumber", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts the primary threat target to sleep for 12 sec and temporarily drops their threat. Cannot be dispelled!" },
                { id = 12884, name = "Acid Breath", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Breathes corrosive acid in a wide frontal cone." },
                { id = 12787, name = "Thrash", icon = "Interface\\Icons\\Ability_GhoulFrenzy", desc = "Grants Eranikus 2 extra attacks on his next swing." },
                { id = 11876, name = "War Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stuns nearby enemies for 2 sec." },
            },
        },
    },

    ["Scholomance"] = {
        ["Kirtonos the Herald"] = {
            overview = "A vampiric gargoyle summoned on the outer balcony using Blood of Innocents at the brazier. Kirtonos alternates between flying/caster form ([Shadow Bolt Volley], [Curse of Tongues]) and grounded gargoyle form ([Wing Flap], [Pierce Armor], [Swoop]).",
            roleTips = {
                tank = "Tank Kirtonos with your back against the balcony doorway wall so [Wing Flap] does not knock you off or drop threat.",
                healer = "Decurse [Curse of Tongues] and heal the group through [Shadow Bolt Volley] and [Swoop] stuns.",
                melee = "Stay behind Kirtonos during grounded form to avoid [Wing Flap] knockbacks andfrontal cleaves.",
                ranged = "Spread along the inner balcony wall and decurse [Curse of Tongues] on healers.",
                dps = "Melee: Stay behind Kirtonos during grounded form to avoid [Wing Flap] knockbacks andfrontal cleaves.\nRanged: Spread along the inner balcony wall and decurse [Curse of Tongues] on healers.",
            },
            abilities = {
                { id = 12882, name = "Wing Flap", icon = "Interface\\Icons\\INV_Misc_MonsterScales_14", desc = "Knocks back enemies in front of Kirtonos and reduces threat." },
                { id = 17228, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Hurls Shadow Bolts at all enemies on the balcony." },
                { id = 12889, name = "Curse of Tongues", icon = "Interface\\Icons\\Spell_Shadow_CurseOfTounges", desc = "Reduces casting speed by 50%." },
                { id = 18144, name = "Swoop", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Dives down to stun nearby enemies for 2 sec." },
            },
        },
        ["Jandice Barov"] = {
            overview = "Illusionist noblewoman hiding in the secret crypt beneath the summoning room. Jandice periodically vanishes and splits into 15 [Illusion of Jandice Barov] copies that deal real melee damage.",
            roleTips = {
                tank = "Tank Jandice in a cleared corner of the crypt and use Thunder Clap / Demo Shout when she splits into [Illusion of Jandice Barov] copies.",
                healer = "Shield players being swarmed by illusions and conserve mana during split phases.",
                melee = "Avoid Whirlwind/Cleave during the split phase if illusions hit too hard; single-target test illusions with 1 hit to find the real Jandice.",
                ranged = "Use rank-1 single-target spells or pet attacks to pop the 1-HP [Illusion of Jandice Barov] copies without pulling all 15 with AoE.",
                dps = "Melee: Avoid Whirlwind/Cleave during the split phase if illusions hit too hard; single-target test illusions with 1 hit to find the real Jandice.\nRanged: Use rank-1 single-target spells or pet attacks to pop the 1-HP [Illusion of Jandice Barov] copies without pulling all 15 with AoE.",
            },
            abilities = {
                { id = 17773, name = "Illusion of Jandice Barov", icon = "Interface\\Icons\\Spell_Magic_LesserInvisibility", desc = "Summons 15 mirror images of Jandice around the crypt while she briefly vanishes." },
                { id = 17772, name = "Curse of Blood", icon = "Interface\\Icons\\Spell_Shadow_RitualOfBlood", desc = "Increases physical damage taken by nearby enemies." },
            },
        },
        ["Rattlegore"] = {
            overview = "A towering bone golem patrolling the Great Ossuary basement. After clearing the room's Bone Construct packs, Rattlegore hits hard with [Knock Away], [Strike], and [War Stomp].",
            roleTips = {
                tank = "Clear the entire Ossuary first, then tank Rattlegore with your back wedged in a corner to prevent [Knock Away] threat drops.",
                healer = "Keep the tank at 100% health; Rattlegore's [Strike] and [Thrash] combinations deal massive physical burst.",
                melee = "Watch your threat carefully—if the tank is hit by [Knock Away], Rattlegore will immediately one-shot the highest melee DPS.",
                ranged = "Stand at max range outside [War Stomp] and wait 2 seconds if the tank is knocked back.",
                dps = "Melee: Watch your threat carefully—if the tank is hit by [Knock Away], Rattlegore will immediately one-shot the highest melee DPS.\nRanged: Stand at max range outside [War Stomp] and wait 2 seconds if the tank is knocked back.",
            },
            abilities = {
                { id = 10101, name = "Knock Away", icon = "Interface\\Icons\\Ability_Kick", desc = "Knocks the primary tank backward and reduces their threat by 50%." },
                { id = 11876, name = "War Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stuns all nearby enemies for 3 sec." },
                { id = 15580, name = "Strike", icon = "Interface\\Icons\\Ability_Rogue_Ambush", desc = "Delivers a crushing physical blow to the tank." },
            },
        },
        ["Marduk Blackpool"] = {
            overview = "An undead death knight fought alongside Vectus at the viewing gallery lectern (hostile once you carry the Dawn's Gambit or engage Vectus). Marduk casts [Shadow Shield] and [Cleave].",
            roleTips = {
                tank = "Pull the viewing gallery skeletons first with Dawn's Gambit, then hold Marduk and Vectus together.",
                healer = "Purge/dispel Marduk's [Shadow Shield] and heal through Vectus's AoE fire damage.",
                melee = "Focus Marduk Blackpool down first while kicking Vectus's spells.",
                ranged = "Stay at range to avoid Marduk's [Defiling Aura] and Vectus's [Flamestrike].",
                dps = "Melee: Focus Marduk Blackpool down first while kicking Vectus's spells.\nRanged: Stay at range to avoid Marduk's [Defiling Aura] and Vectus's [Flamestrike].",
            },
            abilities = {
                { id = 16440, name = "Shadow Shield", icon = "Interface\\Icons\\Spell_Shadow_AntiShadow", desc = "Absorbs incoming damage and reflects Shadow damage." },
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes up to 3 frontal targets." },
            },
        },
        ["Vectus"] = {
            overview = "Necromancer overseeing the viewing gallery alongside Marduk Blackpool. Vectus casts [Flamestrike], [Fire Shield], and [Blast Wave].",
            roleTips = {
                tank = "Hold Vectus alongside Marduk and step out of [Flamestrike] ground patches.",
                healer = "Heal melee hitting into [Fire Shield] and group damage from [Blast Wave].",
                melee = "Kill Marduk first, move out of [Flamestrike], and kick Vectus's casts.",
                ranged = "Spread out outside [Blast Wave] range and burn Marduk then Vectus.",
                dps = "Melee: Kill Marduk first, move out of [Flamestrike], and kick Vectus's casts.\nRanged: Spread out outside [Blast Wave] range and burn Marduk then Vectus.",
            },
            abilities = {
                { id = 18399, name = "Flamestrike", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Calls down a pillar of fire that burns the ground for 8 sec." },
                { id = 16099, name = "Blast Wave", icon = "Interface\\Icons\\Spell_Holy_Excorcism_02", desc = "Unleashes a wave of flame that damages and dazes nearby enemies." },
            },
        },
        ["Ras Frostwhisper"] = {
            overview = "The mighty lich ruling the Frostwhisper Vault. After clearing every pack in his laboratory, Ras casts [Frostbolt Volley], [Freeze], [Fear], and [Chill Nova].",
            roleTips = {
                tank = "Clear the entire laboratory first. Keep Ras in a corner and re-acquire threat quickly after [Freeze] or [Fear] resets.",
                healer = "Dispel [Freeze] ice blocks on the tank immediately so Ras does not drop aggro and charge healers!",
                melee = "Kick every single-target [Frostbolt] and step back if frozen near the tank.",
                ranged = "Keep Frost Protection active, dispel [Freeze] on the tank immediately, and use Tremor Totem / Fear Ward for [Fear].",
                dps = "Melee: Kick every single-target [Frostbolt] and step back if frozen near the tank.\nRanged: Keep Frost Protection active, dispel [Freeze] on the tank immediately, and use Tremor Totem / Fear Ward for [Fear].",
            },
            abilities = {
                { id = 18103, name = "Freeze", icon = "Interface\\Icons\\Spell_Frost_Glacier", desc = "Encases the primary target in ice for 10 sec and drops threat unless dispelled immediately." },
                { id = 8398, name = "Frostbolt Volley", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Hurls Frostbolts at all nearby enemies, dealing Frost damage and slowing movement." },
                { id = 12096, name = "Fear", icon = "Interface\\Icons\\Spell_Shadow_Possession", desc = "Fears a random player for up to 6 sec." },
            },
        },
        ["Instructor Malicia"] = {
            overview = "One of the six coven guardians in the Headmaster's Study. Malicia is a shadow/holy priestess who casts [Call of the Grave], [Slow], [Renew], and [Heal].",
            roleTips = {
                tank = "Clear the zombies in her room first, then hold Malicia in the center of the alcove.",
                healer = "Dispel [Slow] and [Call of the Grave] magic debuffs immediately.",
                melee = "Interrupt [Heal] and [Flash Heal] casts so she cannot prolong the fight.",
                ranged = "Purge [Renew] from Malicia and counterspell her healing casts.",
                dps = "Melee: Interrupt [Heal] and [Flash Heal] casts so she cannot prolong the fight.\nRanged: Purge [Renew] from Malicia and counterspell her healing casts.",
            },
            abilities = {
                { id = 17831, name = "Call of the Grave", icon = "Interface\\Icons\\Spell_Shadow_ChillTouch", desc = "Inflicts heavy Shadow damage after 10 sec unless dispelled." },
                { id = 12039, name = "Heal", icon = "Interface\\Icons\\Spell_Holy_Heal", desc = "Restores a large amount of health to Malicia." },
                { id = 13747, name = "Slow", icon = "Interface\\Icons\\Spell_Nature_Slow", desc = "Reduces movement and attack speed." },
            },
        },
        ["Doctor Theolen Krastinov"] = {
            overview = "The 'Butcher of Scholomance' in the eastern surgical hall. Krastinov batters the tank with [Rend], knocks them back with [Backhand], and enters a terrifying [Frenzy] at 50% health.",
            roleTips = {
                tank = "Clear every ghoul in the room first. Tank Krastinov with your back to the wall and pop Shield Wall or major cooldowns when [Frenzy] triggers at 50%.",
                healer = "Save Nature's Swiftness / Power Word: Shield for the 50% [Frenzy] phase and heal the off-tank if [Backhand] stuns the main tank.",
                melee = "Stay behind Krastinov and save all burst cooldowns and stuns to burn him from 50% to 0% during [Frenzy].",
                ranged = "Save offensive cooldowns for 50% so Krastinov dies before his [Frenzy] overwhelms the tank.",
                dps = "Melee: Stay behind Krastinov and save all burst cooldowns and stuns to burn him from 50% to 0% during [Frenzy].\nRanged: Save offensive cooldowns for 50% so Krastinov dies before his [Frenzy] overwhelms the tank.",
            },
            abilities = {
                { id = 8269, name = "Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "At 50% health, attack speed increases by 60% and physical damage increases significantly." },
                { id = 6253, name = "Backhand", icon = "Interface\\Icons\\INV_Gauntlets_05", desc = "Stuns the primary target for 2 sec and drops threat temporarily." },
                { id = 18106, name = "Rend", icon = "Interface\\Icons\\Ability_Gouge", desc = "Inflicts a severe physical bleed over 15 sec." },
            },
        },
        ["Lorekeeper Polkelt"] = {
            overview = "Putrid undead scholar in the northern library vault. Polkelt casts [Volatile Infection], [Corrosive Acid], and [Noxious Catalyst] to rot the group's armor and health.",
            roleTips = {
                tank = "Hold Polkelt inside the vault and rotate mitigation if hit by [Corrosive Acid] (-1000 armor).",
                healer = "Cleanse [Volatile Infection] disease IMMEDIATELY so it does not explode on nearby allies!",
                melee = "Spread slightly around Polkelt so [Volatile Infection] disease ticks do not splash onto other melee.",
                ranged = "Stay 15+ yards back and help cleanse [Volatile Infection] disease on the tank and melee.",
                dps = "Melee: Spread slightly around Polkelt so [Volatile Infection] disease ticks do not splash onto other melee.\nRanged: Stay 15+ yards back and help cleanse [Volatile Infection] disease on the tank and melee.",
            },
            abilities = {
                { id = 18149, name = "Volatile Infection", icon = "Interface\\Icons\\Spell_Holy_HarmUndeadAura", desc = "Infects a player with a disease that periodically damages the target and all allies within 8 yards." },
                { id = 16359, name = "Corrosive Acid", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Reduces the target's armor by 1000 for 30 sec." },
                { id = 18151, name = "Noxious Catalyst", icon = "Interface\\Icons\\Spell_Holy_HarmUndeadAura", desc = "Inflicts heavy Nature damage over time." },
            },
        },
        ["The Ravenian"] = {
            overview = "A hulking feral horror guarding the lower dining hall. The Ravenian charges targets with [Trample], knocks the tank away with [Knock Away], and sweeps with [Cleave].",
            roleTips = {
                tank = "Tank The Ravenian with your back wedged in a corner to negate [Knock Away] and face him away from the group.",
                healer = "Heal melee after [Trample] AoE hits and keep the tank topped.",
                melee = "Stand strictly behind The Ravenian to avoid [Cleave] and watch your threat if the tank gets knocked away.",
                ranged = "Stay near the room center so if he charges after [Knock Away], the tank can immediately intercept.",
                dps = "Melee: Stand strictly behind The Ravenian to avoid [Cleave] and watch your threat if the tank gets knocked away.\nRanged: Stay near the room center so if he charges after [Knock Away], the tank can immediately intercept.",
            },
            abilities = {
                { id = 15550, name = "Trample", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stomps all nearby enemies for physical damage." },
                { id = 10101, name = "Knock Away", icon = "Interface\\Icons\\Ability_Kick", desc = "Knocks the primary target away and reduces threat." },
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping frontal strike." },
            },
        },
        ["Lord Alexei Barov"] = {
            overview = "Undead patriarch of House Barov in the southern crypt. Lord Alexei is surrounded by a permanent [Unholy Aura], cloaks himself in [Veil of Shadow] (-75% healing!), and casts [Immolate].",
            roleTips = {
                tank = "Clear the two skeletal guards first, then hold Lord Alexei in the crypt and use defensive cooldowns whenever [Veil of Shadow] is active.",
                healer = "Decurse [Veil of Shadow] IMMEDIATELY—it reduces all healing received by 75%! Power Word: Shield still absorbs full damage while cursed.",
                melee = "Expect constant Shadow ticks from [Unholy Aura] and pause or pop potions if the tank has [Veil of Shadow] without a decurse.",
                ranged = "Mages/Druids MUST decurse [Veil of Shadow] on the tank instantly, and Priests/Paladins dispel [Immolate].",
                dps = "Melee: Expect constant Shadow ticks from [Unholy Aura] and pause or pop potions if the tank has [Veil of Shadow] without a decurse.\nRanged: Mages/Druids MUST decurse [Veil of Shadow] on the tank instantly, and Priests/Paladins dispel [Immolate].",
            },
            abilities = {
                { id = 17820, name = "Veil of Shadow", icon = "Interface\\Icons\\Spell_Shadow_GatherShadows", desc = "Curse that reduces all healing received by nearby enemies by 75% for 15 sec. Decurse immediately!" },
                { id = 17467, name = "Unholy Aura", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Pulses Shadow damage every 2 sec to all enemies within 15 yards." },
                { id = 15732, name = "Immolate", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Burns the target with Fire damage over time." },
            },
        },
        ["Lady Illucia Barov"] = {
            overview = "Undead matriarch of House Barov in the western study. Lady Illucia casts [Dominate Mind], [Silence], [Fear], and [Shadow Shock].",
            roleTips = {
                tank = "Clear every skeleton in the study first so [Fear] never pulls adds. Hold Illucia in a corner.",
                healer = "Stand 30+ yards away to outrange her 20-yard [Silence] and dispel [Silence] on casters.",
                melee = "Stay on Illucia and prepare to stun/CC any party member hit by [Dominate Mind].",
                ranged = "Outrange [Silence] at 25+ yards and immediately Polymorph any ally charmed by [Dominate Mind].",
                dps = "Melee: Stay on Illucia and prepare to stun/CC any party member hit by [Dominate Mind].\nRanged: Outrange [Silence] at 25+ yards and immediately Polymorph any ally charmed by [Dominate Mind].",
            },
            abilities = {
                { id = 20740, name = "Dominate Mind", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordDominate", desc = "Charms a party member for 10 sec." },
                { id = 12528, name = "Silence", icon = "Interface\\Icons\\Spell_Holy_Silence", desc = "Silences nearby enemies for 5 sec." },
                { id = 12096, name = "Fear", icon = "Interface\\Icons\\Spell_Shadow_Possession", desc = "Fears a target for up to 6 sec." },
            },
        },
        ["Darkmaster Gandling"] = {
            overview = "Headmaster of Scholomance, who spawns in the center of the Headmaster's Study once all six mini-bosses are slain. Gandling casts [Shadow Portal] to teleport random players into one of the six surrounding mini-boss rooms locked with 3 skeletal guards!",
            roleTips = {
                tank = "Hold Gandling in the center of the study. If teleported by [Shadow Portal], kill the 3 skeletons inside the cage room immediately to unlock the gate and run back!",
                healer = "Stay near the tank in the center; if the tank or healer is hit by [Shadow Portal], use cooldowns/potions until the cage gate opens.",
                melee = "Kick [Arcane Missiles] and [Curse of the Darkmaster]; if ported into a side room by [Shadow Portal], burn the 3 skeletons as fast as possible to open the door.",
                ranged = "Decurse [Curse of the Darkmaster] immediately and help finish off any skeletons when a teammate is teleported by [Shadow Portal].",
                dps = "Melee: Kick [Arcane Missiles] and [Curse of the Darkmaster]; if ported into a side room by [Shadow Portal], burn the 3 skeletons as fast as possible to open the door.\nRanged: Decurse [Curse of the Darkmaster] immediately and help finish off any skeletons when a teammate is teleported by [Shadow Portal].",
            },
            abilities = {
                { id = 17950, name = "Shadow Portal", icon = "Interface\\Icons\\Spell_Arcane_PortalUnderCity", desc = "Teleports a random player into one of the 6 surrounding study rooms and locks the gate until the 3 skeletons inside are killed." },
                { id = 15790, name = "Arcane Missiles", icon = "Interface\\Icons\\Spell_Nature_StarFall", desc = "Channels waves of arcane missiles at the target." },
                { id = 18702, name = "Curse of the Darkmaster", icon = "Interface\\Icons\\Spell_Shadow_AntiShadow", desc = "Curses the target with Shadow damage." },
                { id = 17945, name = "Shadow Shield", icon = "Interface\\Icons\\Spell_Shadow_AntiShadow", desc = "Surrounds Gandling with a damage-absorbing shield." },
            },
        },
    },

    ["Dire Maul: East"] = {
        ["Zevrim Thornhoof"] = {
            overview = "A sadistic Warpwood satyr warlock atop the sacrificial altar in Dire Maul East. Zevrim teleports a random player onto his stone altar with [Sacrifice], stunning them while draining their health.",
            roleTips = {
                tank = "Tank Zevrim near the edge of the altar platform so healers can line-of-sight his [Intense Pain] casts behind the pillar while still reaching you.",
                healer = "Top off whichever player is teleported onto the altar by [Sacrifice] immediately, and use the altar pillar to line-of-sight [Intense Pain].",
                melee = "Kick [Intense Pain] and [Shadow Bolt] casts on cooldown.",
                ranged = "Stand near the side pillar to duck out of line of sight if Zevrim targets you with [Intense Pain].",
                dps = "Melee: Kick [Intense Pain] and [Shadow Bolt] casts on cooldown.\nRanged: Stand near the side pillar to duck out of line of sight if Zevrim targets you with [Intense Pain].",
            },
            abilities = {
                { id = 22651, name = "Sacrifice", icon = "Interface\\Icons\\Spell_Shadow_AntiMagicShell", desc = "Teleports a player onto the sacrificial altar, stunning them and draining health over 8 sec." },
                { id = 22478, name = "Intense Pain", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordPain", desc = "Channels dark agony that deals heavy Shadow damage over time." },
            },
        },
        ["Hydrospawn"] = {
            overview = "A corrupted water elemental lord in the Conservatory pool. Hydrospawn knocks nearby players back with [Riptide] and [Massive Geyser], and splits into two [Hydrospawn Essence] elementals at 50% health.",
            roleTips = {
                tank = "Tank Hydrospawn with your back against the conservatory wall near Pusillin's pillar, and pick up both [Hydrospawn Essence] adds at 50%.",
                healer = "Stand away from the group to avoid [Massive Geyser] knockups and heal through [Riptide].",
                melee = "Fight with your back to a pillar to shorten [Riptide] knockbacks, and cleave the two [Hydrospawn Essence] adds at 50%.",
                ranged = "Spread around the dry edge of the pool so [Massive Geyser] only hits one player at a time.",
                dps = "Melee: Fight with your back to a pillar to shorten [Riptide] knockbacks, and cleave the two [Hydrospawn Essence] adds at 50%.\nRanged: Spread around the dry edge of the pool so [Massive Geyser] only hits one player at a time.",
            },
            abilities = {
                { id = 22456, name = "Massive Geyser", icon = "Interface\\Icons\\Spell_Frost_SummonWaterElemental", desc = "Erupts a geyser beneath a target, launching nearby players high into the air." },
                { id = 22458, name = "Riptide", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Knocks back all nearby enemies and reduces movement speed." },
                { id = 22461, name = "Hydrospawn Essence", icon = "Interface\\Icons\\Spell_Frost_Wisp", desc = "At 50% health, summons two water elemental adds to aid Hydrospawn." },
            },
        },
        ["Lethtendris"] = {
            overview = "A female Blood Elf warlock perched on the upper terrace with her imp familiar Pimgib. Lethtendris casts [Shadow Bolt Volley], [Curse of Tongues], [Immolate], and [Enlarge] on Pimgib.",
            roleTips = {
                tank = "Pull Lethtendris and Pimgib back around the ramp corner to group them together.",
                healer = "Dispel [Immolate] and [Shadow Word: Pain], and decurse [Curse of Tongues] or [Curse of Thorns].",
                melee = "Kill her imp Pimgib first (before [Enlarge] makes him hit like a truck), then kick Lethtendris's [Shadow Bolt Volley].",
                ranged = "Nuke Pimgib first, decurse [Curse of Thorns] from the tank, and interrupt Lethtendris.",
                dps = "Melee: Kill her imp Pimgib first (before [Enlarge] makes him hit like a truck), then kick Lethtendris's [Shadow Bolt Volley].\nRanged: Nuke Pimgib first, decurse [Curse of Thorns] from the tank, and interrupt Lethtendris.",
            },
            abilities = {
                { id = 22709, name = "Enlarge", icon = "Interface\\Icons\\Spell_Nature_Strength", desc = "Enlarges her imp Pimgib, dramatically increasing his damage and fire rate." },
                { id = 17228, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Hurls Shadow Bolts at all nearby enemies." },
                { id = 12889, name = "Curse of Tongues", icon = "Interface\\Icons\\Spell_Shadow_CurseOfTounges", desc = "Slows spellcasting speed by 50%." },
            },
        },
        ["Alzzin the Wildshaper"] = {
            overview = "The satyr lord corrupting the Shrine of Eldretharr. Alzzin shifts between Satyr form ([Enervate], [Wither]), Dire Wolf form ([Mangle], [Vicious Bite]), and Tree of Life form ([Wild Regeneration], [Disarm]) before breaking open the wall at 35% to summon a swarm of non-elite Imps.",
            roleTips = {
                tank = "Tank Alzzin near the inner cavern wall away from the crumble point until 35%, then hold the imp wave with AoE threat.",
                healer = "Cleanse [Enervate] mana-drain poison IMMEDIATELY on yourself and casters, and dispel [Wither] disease on the tank!",
                melee = "Stay on Alzzin through shapeshifts and save AoE/cleave cooldowns for 35% when the wall collapses and Imps rush in.",
                ranged = "Cleanse [Enervate] poison immediately so your mana isn't drained, and save Frost Nova / Rain of Fire / Volley to AoE the 35% Imp swarm.",
                dps = "Melee: Stay on Alzzin through shapeshifts and save AoE/cleave cooldowns for 35% when the wall collapses and Imps rush in.\nRanged: Cleanse [Enervate] poison immediately so your mana isn't drained, and save Frost Nova / Rain of Fire / Volley to AoE the 35% Imp swarm.",
            },
            abilities = {
                { id = 22661, name = "Enervate", icon = "Interface\\Icons\\Spell_Nature_NullifyPoison", desc = "Poison that drains mana rapidly every 2 sec. Cleanse immediately!" },
                { id = 22662, name = "Wither", icon = "Interface\\Icons\\Spell_Nature_NullifyDisease", desc = "Disease that deals Nature damage and reduces strength and stamina." },
                { id = 22688, name = "Mangle", icon = "Interface\\Icons\\Ability_Druid_Disembowel", desc = "In Wolf form, savages the tank and reduces movement speed." },
                { id = 22660, name = "Wild Regeneration", icon = "Interface\\Icons\\Spell_Nature_Rejuvenation", desc = "In Tree form, heals Alzzin over time (Purge/Dispel immediately)." },
            },
        },
    },

    ["Dire Maul: West"] = {
        ["Tendris Warpwood"] = {
            overview = "An ancient corrupted protector standing in the courtyard of Capital Gardens. Attacking Tendris without first clearing the Ironbark Protectors in the gardens will summon every living tree in the courtyard! He casts [Entangle], [Trample], and [Uppercut].",
            roleTips = {
                tank = "Clear the courtyard Ironbark Protectors before pulling Tendris (unless doing a coordinated speed burn). Tank him with your back against the ramp wall.",
                healer = "Dispel [Entangle] roots on the tank and melee, and stay 20+ yards away to avoid [Trample].",
                melee = "Fight with your back to the wall to shorten [Uppercut] knockbacks.",
                ranged = "Stay at max range outside [Trample] and [Entangle] radius.",
                dps = "Melee: Fight with your back to the wall to shorten [Uppercut] knockbacks.\nRanged: Stay at max range outside [Trample] and [Entangle] radius.",
            },
            abilities = {
                { id = 22994, name = "Entangle", icon = "Interface\\Icons\\Spell_Nature_StrangleVines", desc = "Roots all nearby enemies in thorny vines." },
                { id = 5568, name = "Trample", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stomps the ground, dealing heavy physical damage to nearby enemies." },
                { id = 22916, name = "Uppercut", icon = "Interface\\Icons\\INV_Gauntlets_05", desc = "Knocks the primary target backward and drops threat temporarily." },
            },
        },
        ["Illyanna Ravenoak"] = {
            overview = "An undead Highborne huntress patrolling the upper walkways with her skeletal bear Ferra. Illyanna fires [Multi-Shot], [Volley], and [Concussive Shot] while trapping players in [Immolation Trap].",
            roleTips = {
                tank = "Hold Illyanna while a Mage/Druid/Hunter crowd-controls or off-tanks her bear Ferra (or tank both together).",
                healer = "Heal ranged targets hit by [Multi-Shot] and move out of [Volley] ground circles.",
                melee = "Kill Ferra first (or CC Ferra and burn Illyanna) while avoiding [Immolation Trap] in the center.",
                ranged = "Hibernate or Freezing Trap her bear Ferra and step out of [Volley].",
                dps = "Melee: Kill Ferra first (or CC Ferra and burn Illyanna) while avoiding [Immolation Trap] in the center.\nRanged: Hibernate or Freezing Trap her bear Ferra and step out of [Volley].",
            },
            abilities = {
                { id = 22915, name = "Volley", icon = "Interface\\Icons\\Ability_Marksmanship", desc = "Rains arrows down on a target area for 6 sec." },
                { id = 20735, name = "Multi-Shot", icon = "Interface\\Icons\\Ability_UpgradeMoonGlaive", desc = "Fires arrows at 3 random party members." },
                { id = 22910, name = "Immolation Trap", icon = "Interface\\Icons\\Spell_Fire_FlameShock", desc = "Places a fire trap that burns the first enemy to step on it." },
            },
        },
        ["Tsu'zee"] = {
            overview = "A rare Highborne ghost weaver patrolling the upper halls of Capital Gardens. Tsu'zee casts [Chain Lightning] and [Lightning Shield].",
            roleTips = {
                tank = "Pull Tsu'zee into a cleared hallway away from Arcane Aberration packs.",
                healer = "Purge [Lightning Shield] so melee do not take reflected Nature damage.",
                melee = "Kick [Chain Lightning] and pause if [Lightning Shield] is unpurged at low health.",
                ranged = "Spread 10+ yards apart to prevent [Chain Lightning] jumps.",
                dps = "Melee: Kick [Chain Lightning] and pause if [Lightning Shield] is unpurged at low health.\nRanged: Spread 10+ yards apart to prevent [Chain Lightning] jumps.",
            },
            abilities = {
                { id = 16006, name = "Chain Lightning", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Strikes a target with lightning that arcs to nearby allies." },
                { id = 12550, name = "Lightning Shield", icon = "Interface\\Icons\\Spell_Nature_LightningShield", desc = "Deals Nature damage to melee attackers." },
            },
        },
        ["Magister Kalendris"] = {
            overview = "Highborne shadow-mage overseeing the upper terrace. Kalendris casts [Dominate Mind] on the highest non-tank threat, channels [Mind Flay], and enters [Shadowform] at 50% health.",
            roleTips = {
                tank = "Pull Kalendris into a cleared corner and hold threat after [Dominate Mind] ends.",
                healer = "Dispel [Shadow Word: Pain] and [Mind Flay] slows immediately.",
                melee = "Kick [Mind Blast] and [Mind Flay] casts.",
                ranged = "Polymorph or stun any party member charmed by [Dominate Mind] immediately.",
                dps = "Melee: Kick [Mind Blast] and [Mind Flay] casts.\nRanged: Polymorph or stun any party member charmed by [Dominate Mind] immediately.",
            },
            abilities = {
                { id = 7645, name = "Dominate Mind", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordDominate", desc = "Takes control of a party member for 10 sec." },
                { id = 22919, name = "Mind Flay", icon = "Interface\\Icons\\Spell_Shadow_SiphonMana", desc = "Channels Shadow damage and slows movement speed by 50%." },
                { id = 22917, name = "Shadowform", icon = "Interface\\Icons\\Spell_Shadow_Shadowform", desc = "At 50% health, reduces physical damage taken and increases Shadow damage dealt." },
            },
        },
        ["Immol'thar"] = {
            overview = "A colossal void terror imprisoned in the Prison of Immol'thar once all five Crystal Pylons are deactivated. Immol'thar casts [Portal of Immol'thar] to teleport players, enters [Frenzy], and spawns [Eye of Immol'thar] adds that must be killed immediately.",
            roleTips = {
                tank = "Hold Immol'thar in the center ring and regain position quickly if swapped by [Portal of Immol'thar].",
                healer = "Bring Tranquilizing Shot (Hunter) or heavy tank cooldowns for [Frenzy], and stay near the center circle.",
                melee = "Swap immediately to kill every [Eye of Immol'thar] that spawns around the ring before it finishes casting.",
                ranged = "Assign a ranged DPS to one-shot [Eye of Immol'thar] adds the moment they appear, and use Tranquilizing Shot on [Frenzy].",
                dps = "Melee: Swap immediately to kill every [Eye of Immol'thar] that spawns around the ring before it finishes casting.\nRanged: Assign a ranged DPS to one-shot [Eye of Immol'thar] adds the moment they appear, and use Tranquilizing Shot on [Frenzy].",
            },
            abilities = {
                { id = 22899, name = "Eye of Immol'thar", icon = "Interface\\Icons\\Spell_Shadow_EvilEye", desc = "Periodically spawns floating eyes around the prism that cast Arcane/Shadow spells until killed." },
                { id = 22896, name = "Portal of Immol'thar", icon = "Interface\\Icons\\Spell_Arcane_PortalDarnassus", desc = "Teleports a random player to the edge of the prison pit and drops threat." },
                { id = 22895, name = "Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Enters a demonic frenzy, increasing attack speed by 75% (dispellable by Tranquilizing Shot)." },
                { id = 5568, name = "Trample", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Inflicts heavy physical damage to all nearby enemies." },
            },
        },
        ["Lord Hel'nurath"] = {
            overview = "Dreadlord master of the Xorothian Dreadsteed, summoned in Immol'thar's prison during the Warlock epic mount ritual. Hel'nurath casts [Shadow Bolt Volley], [Sleep], and [Cripple].",
            roleTips = {
                tank = "Hold Hel'nurath and dread guards inside the ritual circle after the Warlock wheel/bell/candle phase.",
                healer = "Dispel [Cripple] and [Sleep] debuffs on the tank and DPS.",
                melee = "Interrupt [Shadow Bolt Volley] and cleave dread guard adds.",
                ranged = "Maintain the Warlock ritual artifacts until Hel'nurath spawns, then burn him down.",
                dps = "Melee: Interrupt [Shadow Bolt Volley] and cleave dread guard adds.\nRanged: Maintain the Warlock ritual artifacts until Hel'nurath spawns, then burn him down.",
            },
            abilities = {
                { id = 17228, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Fires Shadow Bolts at all nearby party members." },
                { id = 20812, name = "Cripple", icon = "Interface\\Icons\\Spell_Shadow_Cripple", desc = "Reduces movement speed, attack speed, and strength by 50%." },
                { id = 20663, name = "Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts a random enemy to sleep for 8 sec." },
            },
        },
        ["Prince Tortheldrin"] = {
            overview = "Ruler of the Shen'dralar Highborne in the Athenaeum, who turns hostile once Immol'thar is slain. Tortheldrin spins in [Whirlwind], flings the tank with [Thrash] and [Counterattack], and casts [Arcane Blast] (which knocks back and resets threat!).",
            roleTips = {
                tank = "Tank Tortheldrin with your back against the Athenaeum bookcases so [Arcane Blast] knockback is minimal, and taunt immediately when he targets ranged.",
                healer = "Stand behind a pillar out of line of sight of Tortheldrin while keeping line of sight to the tank.",
                melee = "Run out during [Whirlwind] and watch threat after the tank is hit by [Arcane Blast].",
                ranged = "Wait 1 second to resume DPS whenever the tank is hit by [Arcane Blast] (it resets the tank's threat!).",
                dps = "Melee: Run out during [Whirlwind] and watch threat after the tank is hit by [Arcane Blast].\nRanged: Wait 1 second to resume DPS whenever the tank is hit by [Arcane Blast] (it resets the tank's threat!).",
            },
            abilities = {
                { id = 22920, name = "Arcane Blast", icon = "Interface\\Icons\\Spell_Nature_WispSplode", desc = "Blasts the primary target for heavy Arcane damage, knocking them far back and wiping their threat!" },
                { id = 15589, name = "Whirlwind", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Spins in place, striking all nearby enemies for physical damage." },
                { id = 3391, name = "Thrash", icon = "Interface\\Icons\\Ability_GhoulFrenzy", desc = "Grants 2 extra attacks on his next swing." },
            },
        },
    },

    ["Dire Maul: North"] = {
        ["Guard Mol'dar"] = {
            overview = "First of the three Gordok ogre guards patrolling the lower courtyard (leave alive for a Tribute run!). Mol'dar uses [Shield Bash], [Strike], and [Frenzy] while calling nearby ogres.",
            roleTips = {
                tank = "Pull Mol'dar far back into the entrance hallway if killing him so he does not call courtyard patrols.",
                healer = "Heal through [Frenzy] at 50% health.",
                melee = "Stand behind Mol'dar and burn him down (or skip him using the Gordok Ogre Suit / inner wall hug for Tribute).",
                ranged = "Watch for patrolling Gordok Mastiffs in the courtyard.",
                dps = "Melee: Stand behind Mol'dar and burn him down (or skip him using the Gordok Ogre Suit / inner wall hug for Tribute).\nRanged: Watch for patrolling Gordok Mastiffs in the courtyard.",
            },
            abilities = {
                { id = 11972, name = "Shield Bash", icon = "Interface\\Icons\\Ability_Warrior_ShieldBash", desc = "Bashes the target, interrupting spellcasting for 5 sec." },
                { id = 8269, name = "Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases attack speed at low health." },
            },
        },
        ["Stomper Kreeg"] = {
            overview = "Drunken Gordok ogre guard at the bottom of the courtyard stairs (turns friendly after King Gordok falls to sell Kreeg's Stout Beatdown!). Uses [Booze Spit], [War Stomp], and [Whirlwind].",
            roleTips = {
                tank = "Skip Stomper Kreeg on a Tribute run so you can buy drinks from him afterward! If fighting him, hold him at the stairs.",
                healer = "Stand outside [War Stomp] and [Whirlwind] range.",
                melee = "Step out during [Whirlwind] and expect reduced hit chance when hit by [Booze Spit].",
                ranged = "Stand up the stairs out of [War Stomp] range.",
                dps = "Melee: Step out during [Whirlwind] and expect reduced hit chance when hit by [Booze Spit].\nRanged: Stand up the stairs out of [War Stomp] range.",
            },
            abilities = {
                { id = 22833, name = "Booze Spit", icon = "Interface\\Icons\\INV_Drink_05", desc = "Spits alcohol on the target, intoxicating them and reducing hit chance." },
                { id = 15589, name = "Whirlwind", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Spins rapidly, hitting nearby enemies." },
                { id = 16727, name = "War Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stuns nearby enemies." },
            },
        },
        ["Guard Fengus"] = {
            overview = "Second Gordok guard patrolling the middle courtyard around the Gordok Inner Door key chest (leave alive for Tribute + +200 AP buff!). Uses [Ferocious Charge] and [Ice Lock].",
            roleTips = {
                tank = "On a Tribute run, wait for Fengus to patrol to the far western ramp before looting the Gordok Inner Door Key from his chest.",
                healer = "Dispel [Ice Lock] frost nova if fighting Fengus.",
                melee = "Stay behind Fengus if killing him; otherwise time his patrol carefully to skip him.",
                ranged = "Keep tight to the eastern wall when sneaking past Fengus to the chest.",
                dps = "Melee: Stay behind Fengus if killing him; otherwise time his patrol carefully to skip him.\nRanged: Keep tight to the eastern wall when sneaking past Fengus to the chest.",
            },
            abilities = {
                { id = 22835, name = "Ferocious Charge", icon = "Interface\\Icons\\Ability_Warrior_Charge", desc = "Charges a distant enemy and knocks them down." },
                { id = 22856, name = "Ice Lock", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Freezes nearby enemies in place." },
            },
        },
        ["Guard Slip'kik"] = {
            overview = "Third Gordok guard patrolling the upper courtyard beside the Broken Trap (freeze him in the repaired Frost Trap using Frost Oil + Thorium Widget for Tribute + +3% spell crit buff!).",
            roleTips = {
                tank = "For a Tribute run, have someone repair the Broken Trap while Slip'kik patrols north, so he walks into it and freezes permanently.",
                healer = "If fighting him, dispel [Ice Lock] and heal through [Frenzy].",
                melee = "Do not attack Slip'kik once he is frozen in the Frost Trap on a Tribute run!",
                ranged = "Clear the two ogre packs around the Broken Trap before repairing it so Slip'kik freezes cleanly.",
                dps = "Melee: Do not attack Slip'kik once he is frozen in the Frost Trap on a Tribute run!\nRanged: Clear the two ogre packs around the Broken Trap before repairing it so Slip'kik freezes cleanly.",
            },
            abilities = {
                { id = 22856, name = "Ice Lock", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Freezes nearby enemies in ice." },
                { id = 22835, name = "Ferocious Charge", icon = "Interface\\Icons\\Ability_Warrior_Charge", desc = "Charges a target." },
            },
        },
        ["Captain Kromcrush"] = {
            overview = "Commander of the Gordok guard in the throne approach (distract him with the Gordok Ogre Suit on a Tribute run!). Kromcrush uses [Retaliation] (reflecting every melee attack!), [Mortal Strike], and calls two Gordok Reavers at 50%.",
            roleTips = {
                tank = "For Tribute, talk to Kromcrush while wearing the Gordok Ogre Suit so he runs out of the hall! If fighting him, STOP melee attacks immediately when he casts [Retaliation]!",
                healer = "Heal through [Mortal Strike] (-50% healing) and [Intimidating Shout] fears.",
                melee = "STOP ALL MELEE ATTACKS instantly when Kromcrush activates [Retaliation] or he will counter-strike you to death in seconds!",
                ranged = "Continue casting spells during [Retaliation] (only melee attacks trigger counter-strikes) and CC the two Gordok Reavers at 50%.",
                dps = "Melee: STOP ALL MELEE ATTACKS instantly when Kromcrush activates [Retaliation] or he will counter-strike you to death in seconds!\nRanged: Continue casting spells during [Retaliation] (only melee attacks trigger counter-strikes) and CC the two Gordok Reavers at 50%.",
            },
            abilities = {
                { id = 22857, name = "Retaliation", icon = "Interface\\Icons\\Ability_Warrior_Challange", desc = "Instantly counter-attacks any enemy that strikes Kromcrush in melee for 15 sec!" },
                { id = 15708, name = "Mortal Strike", icon = "Interface\\Icons\\Ability_Warrior_SavageBlow", desc = "Inflicts heavy damage and reduces healing received by 50%." },
                { id = 19134, name = "Intimidating Shout", icon = "Interface\\Icons\\Ability_GolemThunderClap", desc = "Fears nearby enemies for 6 sec." },
            },
        },
        ["Cho'Rush the Observer"] = {
            overview = "Two-headed ogre magus who stands beside King Gordok. For a full Tribute chest, YOU MUST LEAVE CHO'RUSH ALIVE and only kill King Gordok (Cho'Rush turns friendly the instant Gordok dies)! Cho'Rush randomly spawns as a Shaman ([Chain Lightning], [Healing Wave]), Mage ([Fireball], [Frost Nova]), or Priest ([Heal], [Mind Blast]).",
            roleTips = {
                tank = "Pull King Gordok while keeping Cho'Rush separated behind a pillar on the raised dais so Cho'Rush stays alive for Tribute.",
                healer = "Use the stone pillar on the dais to line-of-sight Cho'Rush's [Chain Lightning] / [Fireball] while healing the tank on Gordok.",
                melee = "DO NOT KILL CHO'RUSH on a Tribute run! Only interrupt his [Healing Wave] / [Heal] casts if he heals King Gordok.",
                ranged = "Use Polymorph, Counterspell, or pillar line-of-sight to neutralize Cho'Rush while burning 100% of your damage into King Gordok.",
                dps = "Melee: DO NOT KILL CHO'RUSH on a Tribute run! Only interrupt his [Healing Wave] / [Heal] casts if he heals King Gordok.\nRanged: Use Polymorph, Counterspell, or pillar line-of-sight to neutralize Cho'Rush while burning 100% of your damage into King Gordok.",
            },
            abilities = {
                { id = 16006, name = "Chain Lightning", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Hurls lightning that arcs between nearby players (Shaman variant)." },
                { id = 15982, name = "Healing Wave", icon = "Interface\\Icons\\Spell_Nature_MagicImmunity", desc = "Heals King Gordok for a large amount (interrupt immediately)." },
                { id = 15532, name = "Frost Nova", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Freezes nearby enemies in place (Mage variant)." },
            },
        },
        ["King Gordok"] = {
            overview = "Supreme ruler of the Gordok ogres. Slaying King Gordok while leaving all guards and Cho'Rush alive awards the Gordok Tribute chest and makes you the new King! Gordok uses [Mortal Strike], [War Stomp], [Sunder Armor], and [Berserker Charge].",
            roleTips = {
                tank = "Tank King Gordok near the broken pillar on the dais so the party can line-of-sight Cho'Rush while staying inside Gordok's minimum [Berserker Charge] range.",
                healer = "Pre-shield and top off the tank before [Mortal Strike] (-50% healing) lands, and hug the pillar out of Cho'Rush's line of sight.",
                melee = "Focus 100% of your damage onto King Gordok (leave Cho'Rush alive for Tribute!) and step back before [War Stomp].",
                ranged = "Stand within 15 yards of King Gordok (or behind the pillar) to prevent his [Berserker Charge] knockback and burn Gordok down.",
                dps = "Melee: Focus 100% of your damage onto King Gordok (leave Cho'Rush alive for Tribute!) and step back before [War Stomp].\nRanged: Stand within 15 yards of King Gordok (or behind the pillar) to prevent his [Berserker Charge] knockback and burn Gordok down.",
            },
            abilities = {
                { id = 16856, name = "Mortal Strike", icon = "Interface\\Icons\\Ability_Warrior_SavageBlow", desc = "Inflicts heavy physical damage and reduces healing received by 50% for 5 sec." },
                { id = 16727, name = "War Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stuns all nearby enemies for 4 sec and reduces threat." },
                { id = 22886, name = "Berserker Charge", icon = "Interface\\Icons\\Ability_Warrior_Charge", desc = "Charges a distant enemy, knocking them down and dealing heavy damage." },
                { id = 15572, name = "Sunder Armor", icon = "Interface\\Icons\\Ability_Warrior_Sunder", desc = "Stacks armor reduction on the primary tank." },
            },
        },
    },

    ["Stratholme: Living"] = {
        ["Skul"] = {
            overview = "A rare undead death knight wandering the burning streets of King's Square. Skul casts [Frostbolt], [Frost Shock], and [Arcane Bolt].",
            roleTips = {
                tank = "Pull Skul back into a cleared alley away from patrolling Gargoyles and Eyes of Naxxramas.",
                healer = "Dispel [Frost Shock] and [Frostbolt] slows.",
                melee = "Kick [Frostbolt] and [Arcane Bolt] casts.",
                ranged = "Kill any floating Eye of Naxxramas immediately so it cannot summon gargoyles during the pull.",
                dps = "Melee: Kick [Frostbolt] and [Arcane Bolt] casts.\nRanged: Kill any floating Eye of Naxxramas immediately so it cannot summon gargoyles during the pull.",
            },
            abilities = {
                { id = 16369, name = "Frostbolt", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Inflicts Frost damage and slows movement." },
                { id = 15089, name = "Frost Shock", icon = "Interface\\Icons\\Spell_Frost_FrostShock", desc = "Instantly shocks the target with Frost damage." },
            },
        },
        ["Hearthsinger Forresten"] = {
            overview = "A ghostly bard patrolling Elders' Square with his enchanted Piccolo of the Flaming Fire. Forresten puts players to sleep with [Enchanting Lullaby] and shoots from range with [Multi-Shot].",
            roleTips = {
                tank = "Line-of-sight pull Forresten around a building corner so he runs into melee range instead of shooting from the street.",
                healer = "Dispel [Enchanting Lullaby] sleep on the tank or DPS immediately!",
                melee = "Interrupt [Enchanting Lullaby] on every cast and stay in dead-zone/melee range.",
                ranged = "Dispel [Enchanting Lullaby] if a healer is put to sleep.",
                dps = "Melee: Interrupt [Enchanting Lullaby] on every cast and stay in dead-zone/melee range.\nRanged: Dispel [Enchanting Lullaby] if a healer is put to sleep.",
            },
            abilities = {
                { id = 16798, name = "Enchanting Lullaby", icon = "Interface\\Icons\\Spell_Shadow_SoothingKiss", desc = "Plays a haunting melody that puts a target to sleep for 8 sec." },
                { id = 14443, name = "Multi-Shot", icon = "Interface\\Icons\\Ability_UpgradeMoonGlaive", desc = "Fires arrows at up to 3 targets." },
            },
        },
        ["The Unforgiven"] = {
            overview = "A tormented banshee apparition that ambushes the party in the narrow tunnel leading toward Market Row alongside three Vengeful Phantoms. She casts [Frost Nova] and [Relentless Strike].",
            roleTips = {
                tank = "Pick up The Unforgiven and all three Vengeful Phantoms in the archway.",
                healer = "Dispel [Frost Nova] on the tank and melee immediately.",
                melee = "Cleave down the Vengeful Phantom adds first, then finish The Unforgiven.",
                ranged = "AoE the Vengeful Phantoms and stay clear of the courtyard entrance behind you.",
                dps = "Melee: Cleave down the Vengeful Phantom adds first, then finish The Unforgiven.\nRanged: AoE the Vengeful Phantoms and stay clear of the courtyard entrance behind you.",
            },
            abilities = {
                { id = 14907, name = "Frost Nova", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Freezes all nearby enemies in place for 8 sec." },
            },
        },
        ["Timmy the Cruel"] = {
            overview = "A monstrous ghoul spawned in the Crusader's Square courtyard once all undead packs in the plaza are cleared. Timmy batters the tank with [Ravenous Claw] and enters [Enrage] at 50% health.",
            roleTips = {
                tank = "Pull Timmy back into the doorway archway before the Scarlet Bastion and pop mitigation cooldowns during [Enrage].",
                healer = "Pump heavy single-target healing into the tank as Timmy's attack speed is extremely fast during [Enrage].",
                melee = "Stand behind Timmy and use stuns/disarms when he enters [Enrage].",
                ranged = "Burn Timmy from inside the Bastion courtyard doorway.",
                dps = "Melee: Stand behind Timmy and use stuns/disarms when he enters [Enrage].\nRanged: Burn Timmy from inside the Bastion courtyard doorway.",
            },
            abilities = {
                { id = 17470, name = "Ravenous Claw", icon = "Interface\\Icons\\Ability_GhoulFrenzy", desc = "Strikes the target with a rapid flurry of claws and drains health." },
                { id = 8599, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases attack speed by 60% and physical damage at 50% health." },
            },
        },
        ["Postmaster Malown"] = {
            overview = "Summoned by opening three Stratholme Postboxes using Postbox Keys looted from Undead Postmen. Malown curses players with [Curse of Weakness], silences with [Backhand], and casts [Call of the Grave].",
            roleTips = {
                tank = "Pick up Malown and the Undead Postman adds when the third postbox is opened.",
                healer = "Dispel [Call of the Grave] and decurse [Curse of Weakness] immediately.",
                melee = "Focus down the Undead Postman adds first, then interrupt Malown's casts.",
                ranged = "Decurse [Curse of Weakness] and stay back from [Backhand] stuns.",
                dps = "Melee: Focus down the Undead Postman adds first, then interrupt Malown's casts.\nRanged: Decurse [Curse of Weakness] and stay back from [Backhand] stuns.",
            },
            abilities = {
                { id = 17831, name = "Call of the Grave", icon = "Interface\\Icons\\Spell_Shadow_ChillTouch", desc = "Inflicts heavy Shadow damage after 10 sec unless dispelled." },
                { id = 6253, name = "Backhand", icon = "Interface\\Icons\\INV_Gauntlets_05", desc = "Stuns the primary target for 2 sec." },
                { id = 12741, name = "Curse of Weakness", icon = "Interface\\Icons\\Spell_Shadow_CurseOfMannoroth", desc = "Reduces physical damage dealt." },
            },
        },
        ["Cannon Master Willey"] = {
            overview = "Commander of the Scarlet Armory inside the Bastion. Willey knocks the tank away with [Knock Away], shoots rapidly with [Shoot], and continuously summons [Crimson Rifleman] adds that can be blasted using his own cannons + Cannonballs!",
            roleTips = {
                tank = "Tank Willey with your back against the back wall away from the cannonballs so [Knock Away] does not push you out of melee range.",
                healer = "Heal the player assigned to load and fire the cannons at the [Crimson Rifleman] waves.",
                melee = "Stay on Willey in melee range so he cannot use [Shoot], and cleave nearby adds.",
                ranged = "Designate one player to loot Cannonballs from the floor stacks and click the Scarlet Cannons to one-shot the [Crimson Rifleman] waves!",
                dps = "Melee: Stay on Willey in melee range so he cannot use [Shoot], and cleave nearby adds.\nRanged: Designate one player to loot Cannonballs from the floor stacks and click the Scarlet Cannons to one-shot the [Crimson Rifleman] waves!",
            },
            abilities = {
                { id = 17279, name = "Summon Crimson Rifleman", icon = "Interface\\Icons\\INV_Musket_01", desc = "Calls waves of non-elite Scarlet riflemen from the doorway (use the Scarlet Cannons to blast them!)." },
                { id = 10101, name = "Knock Away", icon = "Interface\\Icons\\Ability_Kick", desc = "Knocks the primary target backward and drops threat." },
                { id = 16496, name = "Shoot", icon = "Interface\\Icons\\Ability_Marksmanship", desc = "Fires heavy rifle rounds at distant targets." },
            },
        },
        ["Archivist Galford"] = {
            overview = "Keeper of the Scarlet archives inside the Bastion. Galford casts [Fire Nova], stuns and drops threat with [Burning Winds], and casts [Pyroblast].",
            roleTips = {
                tank = "Pull Galford into a cleared room corner and re-taunt immediately after [Burning Winds] swirls end.",
                healer = "Keep Fire Resistance active and top off whoever is targeted by [Burning Winds] + [Pyroblast].",
                melee = "Kick [Pyroblast] on every cast and step back if low before [Fire Nova].",
                ranged = "Stay 15+ yards back to avoid [Fire Nova] and counterspell [Pyroblast].",
                dps = "Melee: Kick [Pyroblast] on every cast and step back if low before [Fire Nova].\nRanged: Stay 15+ yards back to avoid [Fire Nova] and counterspell [Pyroblast].",
            },
            abilities = {
                { id = 17293, name = "Burning Winds", icon = "Interface\\Icons\\Spell_Nature_Cyclone", desc = "Envelops the primary target in fiery winds, stunning them for 4 sec, dealing Fire damage, and dropping threat." },
                { id = 17273, name = "Fire Nova", icon = "Interface\\Icons\\Spell_Fire_SealOfFire", desc = "Unleashes a ring of flame around Galford." },
                { id = 17274, name = "Pyroblast", icon = "Interface\\Icons\\Spell_Fire_Fireball02", desc = "Hurls a massive fiery boulder for heavy Fire damage." },
            },
        },
        ["Balnazzar"] = {
            overview = "Initially disguised as Grand Crusader Dathrohan in the Crimson Throne room, he transforms into the Nathrezim dreadlord Balnazzar at 40% health! Balnazzar casts [Domination] mind control, [Sleep], [Psychic Scream], and [Shadow Shock].",
            roleTips = {
                tank = "Tank Dathrohan/Balnazzar in a corner of the throne room and use Berserker Rage / Fear Ward for [Psychic Scream].",
                healer = "Dispel [Sleep] on allies immediately and stay at max range after he transforms into Balnazzar at 40%.",
                melee = "Save burst cooldowns for 40% when he transforms into Balnazzar, and prepare to stun/CC any ally hit by [Domination].",
                ranged = "Polymorph or Fear any teammate charmed by [Domination] immediately, and dispel [Sleep] on the healer/tank.",
                dps = "Melee: Save burst cooldowns for 40% when he transforms into Balnazzar, and prepare to stun/CC any ally hit by [Domination].\nRanged: Polymorph or Fear any teammate charmed by [Domination] immediately, and dispel [Sleep] on the healer/tank.",
            },
            abilities = {
                { id = 17405, name = "Domination", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordDominate", desc = "Takes mental control of a party member for 10 sec, increasing their attack and casting speed." },
                { id = 13704, name = "Psychic Scream", icon = "Interface\\Icons\\Spell_Shadow_PsychicScream", desc = "Fears up to 4 nearby enemies for 6 sec." },
                { id = 16798, name = "Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts a random party member to sleep for 8 sec." },
                { id = 17289, name = "Crusader's Hammer", icon = "Interface\\Icons\\Spell_Holy_SealOfMight", desc = "In Dathrohan form, stuns all nearby enemies for 3 sec." },
            },
        },
    },

    ["Stratholme: Undead"] = {
        ["Stonespine"] = {
            overview = "A rare giant gargoyle patrolling the rooftops and alleys near the Service Entrance. Stonespine strikes with [Vicious Rend] bleeds and [Furious Stone].",
            roleTips = {
                tank = "Pull Stonespine back toward the gatehouse away from patrolling gargoyles.",
                healer = "Heal through heavy [Vicious Rend] bleed ticks on the tank.",
                melee = "Interrupt any stone form casts and burn him down.",
                ranged = "Pull with ranged attacks when he separates from nearby undead packs.",
                dps = "Melee: Interrupt any stone form casts and burn him down.\nRanged: Pull with ranged attacks when he separates from nearby undead packs.",
            },
            abilities = {
                { id = 14331, name = "Vicious Rend", icon = "Interface\\Icons\\Ability_Gouge", desc = "Rends the target, inflicting heavy bleed damage every 3 sec." },
            },
        },
        ["Magistrate Barthilas"] = {
            overview = "The undead former magistrate of Stratholme. If you enter through the Service Entrance, he flees to the Gauntlet gate; if you enter through the Main Gate, he stands at the Service Gate. He uses [Draining Blow], [Crowd Pummel], and [Furious Anger].",
            roleTips = {
                tank = "Tank Barthilas with your back against the gate wall so [Mighty Blow] does not knock you into undead packs.",
                healer = "Heal through [Crowd Pummel] AoE stuns and rising damage from [Furious Anger] stacks.",
                melee = "Step back before [Crowd Pummel] or burn him quickly before [Furious Anger] stacks high.",
                ranged = "Stay 15+ yards back outside [Crowd Pummel] stun range.",
                dps = "Melee: Step back before [Crowd Pummel] or burn him quickly before [Furious Anger] stacks high.\nRanged: Stay 15+ yards back outside [Crowd Pummel] stun range.",
            },
            abilities = {
                { id = 10887, name = "Crowd Pummel", icon = "Interface\\Icons\\INV_Gauntlets_04", desc = "Slams the ground, dealing physical damage and stunning nearby enemies for 4 sec." },
                { id = 16791, name = "Furious Anger", icon = "Interface\\Icons\\Spell_Nature_Reincarnation", desc = "Stacking self-buff that increases Barthilas's physical damage over time." },
                { id = 14099, name = "Mighty Blow", icon = "Interface\\Icons\\INV_Gauntlets_05", desc = "Knocks the primary target backward." },
            },
        },
        ["Nerub'enkan"] = {
            overview = "An undead Nerubian crypt lord guarding the first ziggurat. Defeating him and clearing the Acolytes inside unlocks the gate segment! Nerub'enkan casts [Crypt Scarabs], [Encasing Webs], and [Raise Undead Scarab].",
            roleTips = {
                tank = "Clear the gargoyles and packs around the ziggurat steps before pulling Nerub'enkan, and hold threat on summoned scarabs.",
                healer = "Dispel [Encasing Webs] on the tank immediately because webs root and wipe threat temporarily!",
                melee = "Cleave down [Raise Undead Scarab] adds and watch threat when the tank is hit by [Encasing Webs].",
                ranged = "Dispel [Encasing Webs] and enter the ziggurat immediately after Nerub'enkan dies to kill the 5 Thuzadin Acolytes.",
                dps = "Melee: Cleave down [Raise Undead Scarab] adds and watch threat when the tank is hit by [Encasing Webs].\nRanged: Dispel [Encasing Webs] and enter the ziggurat immediately after Nerub'enkan dies to kill the 5 Thuzadin Acolytes.",
            },
            abilities = {
                { id = 4962, name = "Encasing Webs", icon = "Interface\\Icons\\Spell_Nature_EarthBind", desc = "Wraps the target in webs, immobilizing them and temporarily dropping threat." },
                { id = 16418, name = "Crypt Scarabs", icon = "Interface\\Icons\\INV_Misc_MonsterScales_05", desc = "Launches a swarm of scarabs at a line of enemies." },
                { id = 17235, name = "Raise Undead Scarab", icon = "Interface\\Icons\\Spell_Shadow_Contagion", desc = "Summons undead scarabs from nearby corpses." },
            },
        },
        ["Baroness Anastari"] = {
            overview = "Highborne banshee guarding the second ziggurat. Anastari casts [Possess] to physically inhabit a party member's body until they are brought below 50% health, plus [Silence] and [Banshee Wail].",
            roleTips = {
                tank = "Clear around the ziggurat steps first. When Anastari casts [Possess] on a teammate, swap to that teammate and damage them gently down to 50% HP to force her out!",
                healer = "Stand 25+ yards away to outrange [Silence], and heal the possessed player back up immediately after Anastari is forced out at 50% HP!",
                melee = "Carefully bring any ally hit by [Possess] down to 50% health (do not execute/crit them to death!), then switch back to Anastari.",
                ranged = "Outrange her [Silence] and help chip the possessed teammate down to 50% HP to break [Possess].",
                dps = "Melee: Carefully bring any ally hit by [Possess] down to 50% health (do not execute/crit them to death!), then switch back to Anastari.\nRanged: Outrange her [Silence] and help chip the possessed teammate down to 50% HP to break [Possess].",
            },
            abilities = {
                { id = 17244, name = "Possess", icon = "Interface\\Icons\\Spell_Shadow_Possession", desc = "Inhabits a party member's body, mind-controlling them until their health is reduced below 50%." },
                { id = 18327, name = "Silence", icon = "Interface\\Icons\\Spell_Holy_Silence", desc = "Silences all nearby enemies for 6 sec." },
                { id = 16565, name = "Banshee Wail", icon = "Interface\\Icons\\Spell_Shadow_ShadeTrueSight", desc = "Inflicts heavy Shadow damage to the target." },
            },
        },
        ["Maleki the Pallid"] = {
            overview = "Skeletal necromancer guarding the third ziggurat. Maleki casts [Ice Tomb] to freeze the tank in ice (dropping threat!), [Frostbolt], and [Drain Life].",
            roleTips = {
                tank = "Pull the surrounding packs first, then hold Maleki on the ziggurat steps.",
                healer = "Dispel [Ice Tomb] on the tank IMMEDIATELY—while frozen in [Ice Tomb], the tank loses threat and Maleki charges the healer!",
                melee = "Kick [Frostbolt] and [Drain Life] on every cast.",
                ranged = "Dispel [Ice Tomb] on the tank instantly and kill the 5 Thuzadin Acolytes inside the ziggurat afterward to open the Slaughter Square gate.",
                dps = "Melee: Kick [Frostbolt] and [Drain Life] on every cast.\nRanged: Dispel [Ice Tomb] on the tank instantly and kill the 5 Thuzadin Acolytes inside the ziggurat afterward to open the Slaughter Square gate.",
            },
            abilities = {
                { id = 16869, name = "Ice Tomb", icon = "Interface\\Icons\\Spell_Frost_Glacier", desc = "Encases the primary target in solid ice for 8 sec and drops threat until dispelled!" },
                { id = 16369, name = "Frostbolt", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Blasts the target with Frost damage and slows movement." },
                { id = 17238, name = "Drain Life", icon = "Interface\\Icons\\Spell_Shadow_LifeDrain02", desc = "Drains health from the target to heal Maleki." },
            },
        },
        ["Ramstein the Gorger"] = {
            overview = "A massive elite abomination who marches out of the Slaughterhouse once every Venom Belcher and Bile Spewer in Slaughter Square is slain. Ramstein stuns and wipes threat on all melee with [Knockout] and [Trample]!",
            roleTips = {
                tank = "Tank Ramstein near the outer gate of Slaughter Square (NOT near the Slaughterhouse door, as 30 Mindless Undead rush out when he dies!). Use a secondary tank or ranged kite when hit by [Knockout].",
                healer = "Stay 20+ yards away to avoid [Knockout] and [Trample], and pre-shield ranged players because [Knockout] stuns the tank and drops their threat!",
                melee = "Step out before [Knockout] or wait for the tank to recover threat after the stun.",
                ranged = "Stay at max range near the outer gate; after Ramstein dies, AoE the 30 non-elite Mindless Undead that pour out of the Slaughterhouse.",
                dps = "Melee: Step out before [Knockout] or wait for the tank to recover threat after the stun.\nRanged: Stay at max range near the outer gate; after Ramstein dies, AoE the 30 non-elite Mindless Undead that pour out of the Slaughterhouse.",
            },
            abilities = {
                { id = 17307, name = "Knockout", icon = "Interface\\Icons\\Ability_GolemThunderClap", desc = "Slams the primary target and nearby melee, stunning them for 5 sec, knocking them back, and reducing threat!" },
                { id = 5568, name = "Trample", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Inflicts heavy physical damage to all nearby enemies." },
            },
        },
        ["Baron Rivendare"] = {
            overview = "Death Knight lord of Stratholme inside the Slaughterhouse. Rivendare pulses [Unholy Aura], strikes the tank with [Mortal Strike] and [Cleave], and periodically summons 6 [Raise Dead] skeletons from the floor runes to heal himself with [Death Pact]!",
            roleTips = {
                tank = "Tank Baron Rivendare in a back corner away from the skeleton spawn runes and save defensive cooldowns for [Mortal Strike].",
                healer = "Top off the tank BEFORE [Mortal Strike] lands (-50% healing for 5s) and keep group health up against pulsing [Unholy Aura].",
                melee = "Stand behind Rivendare to avoid [Cleave], and swap immediately to AoE the 6 [Raise Dead] skeletons before he consumes them with [Death Pact].",
                ranged = "Drop Frost Nova / Flamestrike / Volley on the 6 [Raise Dead] skeletons the instant they spawn so Rivendare cannot heal with [Death Pact]!",
                dps = "Melee: Stand behind Rivendare to avoid [Cleave], and swap immediately to AoE the 6 [Raise Dead] skeletons before he consumes them with [Death Pact].\nRanged: Drop Frost Nova / Flamestrike / Volley on the 6 [Raise Dead] skeletons the instant they spawn so Rivendare cannot heal with [Death Pact]!",
            },
            abilities = {
                { id = 15708, name = "Mortal Strike", icon = "Interface\\Icons\\Ability_Warrior_SavageBlow", desc = "Inflicts heavy physical damage and reduces healing received by 50% for 5 sec." },
                { id = 17473, name = "Raise Dead", icon = "Interface\\Icons\\Spell_Shadow_RaiseDead", desc = "Summons 6 Mindless Skeletons that attack the party until Rivendare sacrifices them." },
                { id = 17471, name = "Death Pact", icon = "Interface\\Icons\\Spell_Shadow_DeathPact", desc = "Sacrifices any surviving summoned skeletons after 12 sec, healing Rivendare for each skeleton consumed!" },
                { id = 17467, name = "Unholy Aura", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Pulses Shadow damage every 2 sec to all enemies in the room." },
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping frontal strike." },
            },
        },
    },

    ["Blackrock Depths"] = {
        ["High Interrogator Gerstahn"] = {
            overview = "Chief torturer of the Detention Block who carries the Prison Cell Key. Gerstahn casts [Mana Burn], [Psychic Scream], [Shadow Word: Pain], and [Shadow Shield].",
            roleTips = {
                tank = "Clear the surrounding cell hallway first so [Psychic Scream] never pulls extra packs, then hold Gerstahn in her cell.",
                healer = "Use pillar line-of-sight or Tremor Totem to avoid [Mana Burn] and [Psychic Scream], and dispel [Shadow Word: Pain].",
                melee = "Interrupt [Mana Burn] and [Shadow Word: Pain] on every cast.",
                ranged = "Purge [Shadow Shield] and interrupt [Mana Burn] so the healer's mana is preserved.",
                dps = "Melee: Interrupt [Mana Burn] and [Shadow Word: Pain] on every cast.\nRanged: Purge [Shadow Shield] and interrupt [Mana Burn] so the healer's mana is preserved.",
            },
            abilities = {
                { id = 14033, name = "Mana Burn", icon = "Interface\\Icons\\Spell_Shadow_ManaBurn", desc = "Burns mana from a target and deals Shadow damage equal to half the mana burned." },
                { id = 13704, name = "Psychic Scream", icon = "Interface\\Icons\\Spell_Shadow_PsychicScream", desc = "Fears nearby enemies for 6 sec." },
                { id = 14032, name = "Shadow Word: Pain", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordPain", desc = "Inflicts periodic Shadow damage." },
            },
        },
        ["Lord Roccor"] = {
            overview = "A massive magma elemental patrolling the Detention Block ring. Roccor hurls [Flame Shock], stuns melee with [Ground Tremor], and applies [Earth Shock] interrupts.",
            roleTips = {
                tank = "Pull Roccor into a cleared side alcove off the main ring path.",
                healer = "Dispel [Flame Shock] magic DoTs and stand 20+ yards away to avoid [Ground Tremor] and [Earth Shock] interrupts.",
                melee = "Expect brief stuns from [Ground Tremor] and burn him steadily.",
                ranged = "Avoid casting when Roccor faces you if within [Earth Shock] range.",
                dps = "Melee: Expect brief stuns from [Ground Tremor] and burn him steadily.\nRanged: Avoid casting when Roccor faces you if within [Earth Shock] range.",
            },
            abilities = {
                { id = 13728, name = "Earth Shock", icon = "Interface\\Icons\\Spell_Nature_EarthShock", desc = "Shocks the target with Nature damage and interrupts spellcasting for 2 sec." },
                { id = 13729, name = "Flame Shock", icon = "Interface\\Icons\\Spell_Fire_FlameShock", desc = "Sears the target with Fire damage over time." },
                { id = 6524, name = "Ground Tremor", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stuns nearby enemies for 2 sec." },
            },
        },
        ["Houndmaster Grebmar"] = {
            overview = "Keeper of the Dark Iron kennels in the Detention Block. Grebmar buffs nearby Dark Screechers and Bloodhounds with [Bloodlust] and [Demoralizing Shout].",
            roleTips = {
                tank = "Pull the patrolling hound packs around the kennel BEFORE engaging Grebmar.",
                healer = "Purge [Bloodlust] from Grebmar and heal through hound pack damage.",
                melee = "Kill the two kennel hounds with Grebmar first, then focus Grebmar.",
                ranged = "Purge [Bloodlust] immediately and AoE the hounds.",
                dps = "Melee: Kill the two kennel hounds with Grebmar first, then focus Grebmar.\nRanged: Purge [Bloodlust] immediately and AoE the hounds.",
            },
            abilities = {
                { id = 6742, name = "Bloodlust", icon = "Interface\\Icons\\Spell_Nature_BloodLust", desc = "Increases attack speed by 30% for 30 sec." },
                { id = 13730, name = "Demoralizing Shout", icon = "Interface\\Icons\\Ability_Warrior_WarCry", desc = "Reduces melee attack power of nearby enemies." },
            },
        },
        ["Gorosh the Dervish"] = {
            overview = "Orc warrior champion in the Ring of Law arena (drops Savage Gladiator Chain!). Gorosh spins in a deadly [Whirlwind] and strikes with [Mortal Strike] and [Bloodlust].",
            roleTips = {
                tank = "Pop defensive cooldowns when [Mortal Strike] lands (-50% healing) and disarm Gorosh if possible.",
                healer = "Purge [Bloodlust] immediately and pre-heal/shield the tank through [Mortal Strike].",
                melee = "Step out 8+ yards during [Whirlwind] if taking heavy damage.",
                ranged = "Purge [Bloodlust] on sight and burn Gorosh from the arena center.",
                dps = "Melee: Step out 8+ yards during [Whirlwind] if taking heavy damage.\nRanged: Purge [Bloodlust] on sight and burn Gorosh from the arena center.",
            },
            abilities = {
                { id = 15589, name = "Whirlwind", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Spins rapidly, striking all enemies within 8 yards." },
                { id = 15708, name = "Mortal Strike", icon = "Interface\\Icons\\Ability_Warrior_SavageBlow", desc = "Inflicts heavy physical damage and reduces healing received by 50%." },
                { id = 21049, name = "Bloodlust", icon = "Interface\\Icons\\Spell_Nature_BloodLust", desc = "Increases attack speed by 30%." },
            },
        },
        ["Grizzle"] = {
            overview = "Stone trogg champion in the Ring of Law arena. Grizzle stuns and wipes threat on all melee with [Ground Tremor] while entering a heavy [Frenzy].",
            roleTips = {
                tank = "Re-taunt Grizzle immediately after [Ground Tremor] ends and use Tranquilizing Shot / mitigation during [Frenzy].",
                healer = "Stay 25+ yards away to avoid [Ground Tremor] stuns and heal ranged players when Grizzle drops tank threat during tremors.",
                melee = "Run out when Grizzle casts [Ground Tremor] or wait for the tank to pick him back up.",
                ranged = "Stay at max range and use Tranquilizing Shot to remove [Frenzy].",
                dps = "Melee: Run out when Grizzle casts [Ground Tremor] or wait for the tank to pick him back up.\nRanged: Stay at max range and use Tranquilizing Shot to remove [Frenzy].",
            },
            abilities = {
                { id = 6524, name = "Ground Tremor", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stomps the arena floor, stunning nearby enemies for 4 sec and wiping their threat!" },
                { id = 8269, name = "Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases Grizzle's attack speed by 60%." },
            },
        },
        ["Eviscerator"] = {
            overview = "Ferocious worg champion in the Ring of Law arena. Eviscerator shields himself against magic with [Anti-Magic Shield] and batters the group with [Rend] and [Shadow Bolt Volley].",
            roleTips = {
                tank = "Hold Eviscerator in the center of the arena and mitigate [Rend] bleeds.",
                healer = "Heal party members hit by [Shadow Bolt Volley].",
                melee = "Physical damage is unaffected by [Anti-Magic Shield]; burn Eviscerator down quickly.",
                ranged = "Hold big spell cooldowns while [Anti-Magic Shield] is active (it absorbs/blocks spells for 10 sec).",
                dps = "Melee: Physical damage is unaffected by [Anti-Magic Shield]; burn Eviscerator down quickly.\nRanged: Hold big spell cooldowns while [Anti-Magic Shield] is active (it absorbs/blocks spells for 10 sec).",
            },
            abilities = {
                { id = 7121, name = "Anti-Magic Shield", icon = "Interface\\Icons\\Spell_Shadow_AntiMagicShell", desc = "Renders Eviscerator immune to harmful spells for 10 sec." },
                { id = 15245, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Hurls Shadow Bolts at nearby enemies." },
            },
        },
        ["Ok'thor the Breaker"] = {
            overview = "Ogre magus champion in the Ring of Law arena. Ok'thor casts [Polymorph], [Arcane Bolt], [Slow], and [Arcane Explosion].",
            roleTips = {
                tank = "Hold Ok'thor and prepare for threat shifts if hit by [Polymorph].",
                healer = "Dispel [Polymorph] and [Slow] on the tank and melee immediately!",
                melee = "Kick [Arcane Bolt] and [Polymorph] on cooldown.",
                ranged = "Counterspell [Polymorph] and dispel magic debuffs.",
                dps = "Melee: Kick [Arcane Bolt] and [Polymorph] on cooldown.\nRanged: Counterspell [Polymorph] and dispel magic debuffs.",
            },
            abilities = {
                { id = 13323, name = "Polymorph", icon = "Interface\\Icons\\Spell_Nature_Polymorph", desc = "Transforms the target into a sheep and drops threat temporarily." },
                { id = 15254, name = "Arcane Bolt", icon = "Interface\\Icons\\Spell_Arcane_StarFire", desc = "Blasts the target with Arcane damage." },
                { id = 15253, name = "Arcane Explosion", icon = "Interface\\Icons\\Spell_Nature_WispSplode", desc = "Deals Arcane damage to all nearby enemies." },
            },
        },
        ["Anub'shiah"] = {
            overview = "Nerubian crypt lord champion in the Ring of Law arena. Anub'shiah casts [Banish], [Curse of Tongues], [Curse of Weakness], and [Enveloping Web].",
            roleTips = {
                tank = "Hold Anub'shiah and swap threat with an off-tank or melee if hit by [Banish].",
                healer = "Decurse [Curse of Tongues] and dispel [Enveloping Web] roots.",
                melee = "Stay on Anub'shiah and step in to tank briefly if the main tank is hit by [Banish].",
                ranged = "Decurse [Curse of Tongues] on healers and casters immediately.",
                dps = "Melee: Stay on Anub'shiah and step in to tank briefly if the main tank is hit by [Banish].\nRanged: Decurse [Curse of Tongues] on healers and casters immediately.",
            },
            abilities = {
                { id = 8994, name = "Banish", icon = "Interface\\Icons\\Spell_Shadow_Cripple", desc = "Banishes a target for 10 sec, making them invulnerable and unable to act." },
                { id = 15470, name = "Curse of Tongues", icon = "Interface\\Icons\\Spell_Shadow_CurseOfTounges", desc = "Slows spellcasting speed by 50%." },
                { id = 15471, name = "Enveloping Web", icon = "Interface\\Icons\\Spell_Nature_EarthBind", desc = "Roots the target in webs." },
            },
        },
        ["Hedrum the Creeper"] = {
            overview = "Giant crystal spider champion in the Ring of Law arena. Hedrum immobilizes players with [Web Explosion] and infects the tank with [Paralytic Poison] and [Baneful Poison].",
            roleTips = {
                tank = "Hold Hedrum in the arena center.",
                healer = "Cleanse [Paralytic Poison] IMMEDIATELY before it stuns the tank for 8 sec!",
                melee = "Stay behind Hedrum and use Anti-Venom if needed.",
                ranged = "Help cleanse poisons and stay outside [Web Explosion] radius.",
                dps = "Melee: Stay behind Hedrum and use Anti-Venom if needed.\nRanged: Help cleanse poisons and stay outside [Web Explosion] radius.",
            },
            abilities = {
                { id = 3609, name = "Paralytic Poison", icon = "Interface\\Icons\\Ability_Poisons", desc = "Poisons the target and stuns them for 8 sec if not cleansed quickly." },
                { id = 15474, name = "Web Explosion", icon = "Interface\\Icons\\Ability_Ensnare", desc = "Roots all nearby enemies in webs." },
                { id = 15475, name = "Baneful Poison", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Inflicts heavy Nature damage over time." },
            },
        },
        ["Pyromancer Loregrain"] = {
            overview = "Twilight's Hammer shaman guarding the Shrine of Thaurissan statue. Loregrain summons [Searing Totem], buffs himself with [Molten Blast], and casts [Flame Ward].",
            roleTips = {
                tank = "Clear the Twilight cultists around the statue first, then pull Loregrain away from his totems.",
                healer = "Purge [Flame Ward] and heal through Fire damage.",
                melee = "Destroy [Searing Totem] immediately and kick [Molten Blast].",
                ranged = "Snipe totems as soon as they drop and purge buffs.",
                dps = "Melee: Destroy [Searing Totem] immediately and kick [Molten Blast].\nRanged: Snipe totems as soon as they drop and purge buffs.",
            },
            abilities = {
                { id = 15038, name = "Searing Totem", icon = "Interface\\Icons\\Spell_Fire_SearingTotem", desc = "Summons a totem that repeatedly hurls fireballs at party members." },
                { id = 15039, name = "Molten Blast", icon = "Interface\\Icons\\Spell_Fire_Fire", desc = "Blasts the target with heavy Fire damage." },
            },
        },
        ["Fineous Darkvire"] = {
            overview = "Chief architect of the Dark Iron dwarves patrolling the Mason's Walk toward the Ironfel anvil (drops Ironfel for the Shadowforge Key quest!). Darkvire casts [Holy Light], [Devotion Aura], and [Seal of Reckoning].",
            roleTips = {
                tank = "Pull Darkvire when he patrols into a cleared alcove along the ramp.",
                healer = "Dispel his paladin buffs if possible and keep the tank topped.",
                melee = "Interrupt [Holy Light] on every cast so he cannot heal back to full.",
                ranged = "Purge [Seal of Reckoning] and counterspell [Holy Light].",
                dps = "Melee: Interrupt [Holy Light] on every cast so he cannot heal back to full.\nRanged: Purge [Seal of Reckoning] and counterspell [Holy Light].",
            },
            abilities = {
                { id = 13952, name = "Holy Light", icon = "Interface\\Icons\\Spell_Holy_HolyBolt", desc = "Heals Fineous Darkvire for a large amount of health." },
                { id = 15346, name = "Seal of Reckoning", icon = "Interface\\Icons\\Spell_Holy_SealOfWrath", desc = "Adds bonus Holy damage to melee attacks." },
            },
        },
        ["Warder Stilgiss"] = {
            overview = "Master of the Dark Iron Vault fought alongside his frost hound Verek. Stilgiss blasts the group with [Frostbolt], [Frost Nova], and [Cone of Cold] while Verek curses the tank with [Curse of Blood].",
            roleTips = {
                tank = "Open the Secret Safe portraits only after clearing Stilgiss and Verek. Hold both bosses together.",
                healer = "Decurse Verek's [Curse of Blood] and dispel [Frost Nova] on the tank immediately.",
                melee = "Kill Verek first, then kick Stilgiss's [Frostbolt] casts.",
                ranged = "Burn Verek down first and counterspell Stilgiss.",
                dps = "Melee: Kill Verek first, then kick Stilgiss's [Frostbolt] casts.\nRanged: Burn Verek down first and counterspell Stilgiss.",
            },
            abilities = {
                { id = 12675, name = "Frostbolt", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Blasts the target with Frost damage and slows movement." },
                { id = 12674, name = "Frost Nova", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Freezes nearby enemies in place." },
                { id = 15041, name = "Curse of Blood", icon = "Interface\\Icons\\Spell_Shadow_RitualOfBlood", desc = "Verek curses enemies to take increased physical damage." },
            },
        },
        ["Lord Incendius"] = {
            overview = "A towering fire elemental guarding the Black Anvil atop the molten bridge. Incendius knocks players far backward with [Mighty Blow] (straight into the lava below if mispositioned!) and casts [Fire Storm] and [Curse of the Elemental Lord].",
            roleTips = {
                tank = "Tank Incendius with your back wedged tightly against a bridge pillar so [Mighty Blow] cannot knock you off the bridge into the lava!",
                healer = "Decurse [Curse of the Elemental Lord] (-100 Fire Resistance!) immediately and sidestep [Fire Storm] ground pillars.",
                melee = "Stand with your back against the inner pillar and step out of [Fire Storm].",
                ranged = "Decurse [Curse of the Elemental Lord] on the tank immediately and move out of [Fire Storm].",
                dps = "Melee: Stand with your back against the inner pillar and step out of [Fire Storm].\nRanged: Decurse [Curse of the Elemental Lord] on the tank immediately and move out of [Fire Storm].",
            },
            abilities = {
                { id = 14099, name = "Mighty Blow", icon = "Interface\\Icons\\INV_Gauntlets_05", desc = "Knocks the target far backward (fatal if knocked off the bridge into lava!)." },
                { id = 13899, name = "Fire Storm", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Calls down a rain of fire on a target location." },
                { id = 26977, name = "Curse of the Elemental Lord", icon = "Interface\\Icons\\Spell_Fire_Lavaspawn", desc = "Reduces Fire Resistance by 100. Decurse immediately!" },
            },
        },
        ["Bael'Gar"] = {
            overview = "A colossal molten giant guarding the Dark Iron Highway door. Bael'Gar cleaves the front and periodically excretes [Summon Spawn of Bael'Gar] magma elementals.",
            roleTips = {
                tank = "Face Bael'Gar away from the party and have an off-tank or AoE pick up [Summon Spawn of Bael'Gar] adds.",
                healer = "Keep Fire Resistance active and heal through [Magma Splash] DoTs on the tank.",
                melee = "Kill every [Summon Spawn of Bael'Gar] add quickly before they overwhelm the healer.",
                ranged = "Focus down [Summon Spawn of Bael'Gar] adds immediately whenever they spawn.",
                dps = "Melee: Kill every [Summon Spawn of Bael'Gar] add quickly before they overwhelm the healer.\nRanged: Focus down [Summon Spawn of Bael'Gar] adds immediately whenever they spawn.",
            },
            abilities = {
                { id = 13895, name = "Summon Spawn of Bael'Gar", icon = "Interface\\Icons\\Spell_Fire_Lavaspawn", desc = "Spawns fiery elemental adds from Bael'Gar's molten body." },
                { id = 13880, name = "Magma Splash", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Scorches the tank with stacking Fire damage." },
            },
        },
        ["General Angerforge"] = {
            overview = "Commander of the West Garrison. At 40% health, Angerforge sounds the alarm to summon 8 Anvilrage Reservists and 2 elite Anvilrage Medics while stacking [Sunder Armor] and [Enrage].",
            roleTips = {
                tank = "Tank Angerforge up in the top corner of the stairs. At 40%, hold threat on the Reservist wave while DPS lock down the 2 Medics.",
                healer = "Conserve mana for the 40% reinforcement wave when Angerforge also enters [Enrage].",
                melee = "At 40% health, either finish burning Angerforge with cooldowns or immediately switch to interrupt and kill the 2 Anvilrage Medics!",
                ranged = "Save AoE (Frost Nova / Flamestrike) for the 8 non-elite Reservists at 40% and Counterspell the 2 Anvilrage Medics.",
                dps = "Melee: At 40% health, either finish burning Angerforge with cooldowns or immediately switch to interrupt and kill the 2 Anvilrage Medics!\nRanged: Save AoE (Frost Nova / Flamestrike) for the 8 non-elite Reservists at 40% and Counterspell the 2 Anvilrage Medics.",
            },
            abilities = {
                { id = 15572, name = "Sunder Armor", icon = "Interface\\Icons\\Ability_Warrior_Sunder", desc = "Stacks heavy armor reduction on the primary tank." },
                { id = 15061, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Enrages at 40% health and summons 8 Reservists and 2 Medics." },
            },
        },
        ["Golem Lord Argelmach"] = {
            overview = "Master artificer of the Manufactory. Pulling Argelmach alerts the two Warbringer Construct golems and Ragereaver Golem in his room if not cleared first! He casts [Chain Lightning], [Shock], and [Lightning Shield].",
            roleTips = {
                tank = "Clear every golem in Argelmach's room before pulling him, then tank him in the corner.",
                healer = "Purge [Lightning Shield] so melee do not take heavy reflected Nature damage.",
                melee = "Kick [Chain Lightning] and wait for [Lightning Shield] to be purged if low on health.",
                ranged = "Spread 10+ yards apart to prevent [Chain Lightning] arcs and purge [Lightning Shield].",
                dps = "Melee: Kick [Chain Lightning] and wait for [Lightning Shield] to be purged if low on health.\nRanged: Spread 10+ yards apart to prevent [Chain Lightning] arcs and purge [Lightning Shield].",
            },
            abilities = {
                { id = 15305, name = "Chain Lightning", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Strikes a target with lightning that arcs to nearby allies." },
                { id = 15507, name = "Lightning Shield", icon = "Interface\\Icons\\Spell_Nature_LightningShield", desc = "Inflicts heavy Nature damage to melee attackers." },
                { id = 15605, name = "Shock", icon = "Interface\\Icons\\Spell_Nature_EarthShock", desc = "Instantly blasts the target with Nature damage." },
            },
        },
        ["Hurley Blackbreath"] = {
            overview = "Summoned in the Grim Guzzler by smashing the three Thunderbrew Lager kegs in the back cellar. Hurley breathes [Flame Breath] and gets the party drunk with [Drunken Rage].",
            roleTips = {
                tank = "Pull Hurley and his three Cronies back into the keg cellar doorway and face him away from the party.",
                healer = "Heal through frontal [Flame Breath] on the tank and AoE down the non-elite Cronies.",
                melee = "Stand behind Hurley to avoid [Flame Breath] and cleave his Cronies.",
                ranged = "AoE the three Cronies in the doorway, then burn Hurley.",
                dps = "Melee: Stand behind Hurley to avoid [Flame Breath] and cleave his Cronies.\nRanged: AoE the three Cronies in the doorway, then burn Hurley.",
            },
            abilities = {
                { id = 9573, name = "Flame Breath", icon = "Interface\\Icons\\Spell_Fire_Fire", desc = "Breathes a cone of fire at enemies in front of Hurley." },
                { id = 14872, name = "Drunken Rage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Enters a drunken frenzy, increasing attack speed and damage." },
            },
        },
        ["Phalanx"] = {
            overview = "Massive stone golem guarding the Grim Guzzler back door. He activates if Plugger Spazzring is attacked, Rocknot is given 2 Dark Iron Ale Mugs, or Mistress Nagmara disappears. Phalanx uses [Thunderclap], [Mighty Blow], and [Fireball Volley].",
            roleTips = {
                tank = "Tank Phalanx with your back against the back door wall to negate [Mighty Blow] knockbacks.",
                healer = "Heal the party through [Fireball Volley] and [Thunderclap].",
                melee = "Fight with your back to the wall alongside the tank.",
                ranged = "Clear any neutral patrons near the back door before activating Phalanx so they do not turn hostile.",
                dps = "Melee: Fight with your back to the wall alongside the tank.\nRanged: Clear any neutral patrons near the back door before activating Phalanx so they do not turn hostile.",
            },
            abilities = {
                { id = 15285, name = "Fireball Volley", icon = "Interface\\Icons\\Spell_Fire_FlameBolt", desc = "Fires a volley of fireballs at all nearby enemies." },
                { id = 14099, name = "Mighty Blow", icon = "Interface\\Icons\\INV_Gauntlets_05", desc = "Knocks the primary target backward." },
                { id = 15588, name = "Thunderclap", icon = "Interface\\Icons\\Spell_Nature_ThunderClap", desc = "Slows attack speed and deals Nature damage to nearby enemies." },
            },
        },
        ["Ribbly Screwspigot"] = {
            overview = "Goblin engineer hiding in the back room of the Grim Guzzler. Talking to him turns him and his three Cronies hostile without alerting the rest of the bar! He uses [Gouge] and [Hamstring].",
            roleTips = {
                tank = "Pull Ribbly and his three Cronies inside his back alcove.",
                healer = "Watch for temporary target switches when Ribbly uses [Gouge] on the tank.",
                melee = "Cleave down the three Cronies first, then finish Ribbly.",
                ranged = "Stay inside the back room so stray AoE never hits neutral Grim Guzzler patrons.",
                dps = "Melee: Cleave down the three Cronies first, then finish Ribbly.\nRanged: Stay inside the back room so stray AoE never hits neutral Grim Guzzler patrons.",
            },
            abilities = {
                { id = 12540, name = "Gouge", icon = "Interface\\Icons\\Ability_Gouge", desc = "Incapacitates the primary target for 4 sec and drops threat temporarily." },
                { id = 9080, name = "Hamstring", icon = "Interface\\Icons\\Ability_ShockWave", desc = "Slows movement speed by 50%." },
            },
        },
        ["Plugger Spazzring"] = {
            overview = "Bartender of the Grim Guzzler (drops Barman Shanker and Dark Iron Ale Mug!). Stealing mugs from the table three times or attacking him turns him hostile and activates the back door. He casts [Banish], [Curse of Tongues], and [Shadow Bolt].",
            roleTips = {
                tank = "Finish all other Grim Guzzler business before engaging Plugger, as killing him turns bar patrons hostile.",
                healer = "Decurse [Curse of Tongues] and dispel [Immolate].",
                melee = "Kick [Shadow Bolt] and [Banish] casts on cooldown.",
                ranged = "Counterspell [Banish] and burn Plugger quickly.",
                dps = "Melee: Kick [Shadow Bolt] and [Banish] casts on cooldown.\nRanged: Counterspell [Banish] and burn Plugger quickly.",
            },
            abilities = {
                { id = 8994, name = "Banish", icon = "Interface\\Icons\\Spell_Shadow_Cripple", desc = "Banishes a party member for 10 sec." },
                { id = 13338, name = "Curse of Tongues", icon = "Interface\\Icons\\Spell_Shadow_CurseOfTounges", desc = "Slows spellcasting speed by 50%." },
                { id = 12739, name = "Shadow Bolt", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Hurls a bolt of dark magic." },
            },
        },
        ["Ambassador Flamelash"] = {
            overview = "Fire elemental ambassador in the Chamber of Enchantment. Flamelash summons waves of non-elite [Burning Spirit] elementals from the 7 floor runes that walk toward him and buff his damage with [Burning Spirit] if they reach him!",
            roleTips = {
                tank = "Hold Flamelash in the center of the chamber.",
                healer = "Keep Fire Resistance up and heal melee hitting into Flamelash.",
                melee = "Intercept and kill nearby [Burning Spirit] elementals before they reach Flamelash.",
                ranged = "Priority #1: Snipe every [Burning Spirit] elemental walking from the outer runes before it touches Flamelash!",
                dps = "Melee: Intercept and kill nearby [Burning Spirit] elementals before they reach Flamelash.\nRanged: Priority #1: Snipe every [Burning Spirit] elemental walking from the outer runes before it touches Flamelash!",
            },
            abilities = {
                { id = 13489, name = "Burning Spirit", icon = "Interface\\Icons\\Spell_Fire_Elemental_Totem", desc = "Summons small fire elementals from the 7 floor runes that heal and permanently buff Flamelash if they reach him." },
            },
        },
        ["Panzor the Invincible"] = {
            overview = "A rare giant stone golem patrolling the Mold Foundry before the Summoner's Tomb.",
            roleTips = {
                tank = "Clear the Foundry packs along his patrol path before pulling Panzor.",
                healer = "Keep the tank topped against heavy physical swings.",
                melee = "Stand behind Panzor and burn him down.",
                ranged = "Watch for patrolling Fireguards while fighting in the Foundry.",
                dps = "Melee: Stand behind Panzor and burn him down.\nRanged: Watch for patrolling Fireguards while fighting in the Foundry.",
            },
            abilities = {
                { id = 15588, name = "Thunderclap", icon = "Interface\\Icons\\Spell_Nature_ThunderClap", desc = "Slows attack speed and damages nearby enemies." },
            },
        },
        ["The Seven"] = {
            overview = "Seven spectral dwarf lords fought sequentially in the Summoner's Tomb after speaking to Doom'rel (Hate'rel, Anger'rel, Vile'rel, Gloom'rel, Seeth'rel, Dope'rel, and finally Doom'rel). You must kill each spirit cleanly before the next activates to unlock the Chest of the Seven!",
            roleTips = {
                tank = "Pick up each dwarf spirit immediately as it activates on the dais, and hold Doom'rel's summoned Voidwalkers during the final wave.",
                healer = "Drink between spirit waves whenever briefly out of combat, dispel Vile'rel's [Prayer of Healing], and decurse Doom'rel's curses.",
                melee = "Burn each spirit fast so two spirits are never active at once! Kick Vile'rel's [Heal] and Seeth'rel's [Frostbolt].",
                ranged = "Burn each spirit down before the next spawns, and ignore/kite Doom'rel's Voidwalkers while burning Doom'rel at the end.",
                dps = "Melee: Burn each spirit fast so two spirits are never active at once! Kick Vile'rel's [Heal] and Seeth'rel's [Frostbolt].\nRanged: Burn each spirit down before the next spawns, and ignore/kite Doom'rel's Voidwalkers while burning Doom'rel at the end.",
            },
            abilities = {
                { id = 15586, name = "Prayer of Healing", icon = "Interface\\Icons\\Spell_Holy_PrayerOfHealing02", desc = "Vile'rel heals himself and any active spirit (interrupt immediately!)." },
                { id = 12674, name = "Frost Nova", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Seeth'rel freezes nearby enemies in place." },
                { id = 15092, name = "Summon Voidwalkers", icon = "Interface\\Icons\\Spell_Shadow_SummonVoidWalker", desc = "Doom'rel summons 3 Voidwalkers during the final wave." },
                { id = 12741, name = "Curse of Weakness", icon = "Interface\\Icons\\Spell_Shadow_CurseOfMannoroth", desc = "Reduces physical damage dealt." },
            },
        },
        ["Magmus"] = {
            overview = "Towering molten giant guarding the Iron Hall before the Imperial Seat. Fighting Magmus also activates the flame-spouting statues along the walls! Magmus casts [Fiery Burst] and [War Stomp].",
            roleTips = {
                tank = "Tank Magmus in the safe pocket between the third and fourth wall statues on the right side where statue flames cannot reach.",
                healer = "Stand in the safe pocket between wall statues out of [War Stomp] range so you are never hit by statue fire cones.",
                melee = "Stand in the safe alcove pocket behind Magmus and watch for [War Stomp] stuns.",
                ranged = "Stand in the safe zone between wall statues and move only when statue flames rotate.",
                dps = "Melee: Stand in the safe alcove pocket behind Magmus and watch for [War Stomp] stuns.\nRanged: Stand in the safe zone between wall statues and move only when statue flames rotate.",
            },
            abilities = {
                { id = 13900, name = "Fiery Burst", icon = "Interface\\Icons\\Spell_Fire_FireBolt", desc = "Fires explosive magma at a target area." },
                { id = 15593, name = "War Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stomps the ground, stunning nearby enemies for 3 sec and knocking them back." },
            },
        },
        ["Princess Moira Bronzebeard"] = {
            overview = "Daughter of King Magni Bronzebeard, fought alongside Emperor Dagran Thaurissan (leave her alive at the end to complete the rescue quest!). Moira casts [Heal], [Renew], [Mind Blast], and [Shadow Word: Pain].",
            roleTips = {
                tank = "Hold threat on both Emperor Thaurissan and Princess Moira, or have a Rogue/Shaman/Mage lock down Moira's heals while you tank the Emperor.",
                healer = "Dispel Moira's [Shadow Word: Pain] and purge her [Renew] off Emperor Thaurissan.",
                melee = "Assign one dedicated interrupter to sit on Princess Moira and kick every [Heal] cast while leaving her alive for the quest!",
                ranged = "Counterspell Moira's [Heal] casts and purge [Renew] from the Emperor while focusing all lethal damage on Thaurissan.",
                dps = "Melee: Assign one dedicated interrupter to sit on Princess Moira and kick every [Heal] cast while leaving her alive for the quest!\nRanged: Counterspell Moira's [Heal] casts and purge [Renew] from the Emperor while focusing all lethal damage on Thaurissan.",
            },
            abilities = {
                { id = 15586, name = "Heal", icon = "Interface\\Icons\\Spell_Holy_Heal", desc = "Restores a huge amount of health to Emperor Thaurissan (interrupt immediately!)." },
                { id = 8362, name = "Renew", icon = "Interface\\Icons\\Spell_Holy_Renew", desc = "Heals Emperor Thaurissan over 15 sec (purge/dispel)." },
                { id = 15587, name = "Mind Blast", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Blasts the target with Shadow damage." },
            },
        },
        ["Emperor Dagran Thaurissan"] = {
            overview = "Ruler of the Dark Iron clan in the Imperial Seat. You MUST clear the entire Senate hall before pulling him, or every senator and guard in the room will aggro! Thaurissan periodically turns red with [Avatar of Flame] (making him immune to magic and dealing heavy Fire damage on every swing) and stuns with [Hand of Thaurissan].",
            roleTips = {
                tank = "Full-clear the Imperial Seat first! Tank Thaurissan down on the steps away from Moira, and pop defensive cooldowns during [Avatar of Flame].",
                healer = "Pump heavy heals into the tank whenever Thaurissan glows red with [Avatar of Flame] and after [Hand of Thaurissan] stuns.",
                melee = "Focus Thaurissan while one interrupter locks down Princess Moira's heals.",
                ranged = "Hold spell cooldowns when Thaurissan glows red with [Avatar of Flame] (he is completely immune to magic for 10 sec!).",
                dps = "Melee: Focus Thaurissan while one interrupter locks down Princess Moira's heals.\nRanged: Hold spell cooldowns when Thaurissan glows red with [Avatar of Flame] (he is completely immune to magic for 10 sec!).",
            },
            abilities = {
                { id = 15636, name = "Avatar of Flame", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Turns Thaurissan into living magma for 10 sec, granting 100% magic immunity and adding heavy Fire damage to his melee attacks." },
                { id = 17492, name = "Hand of Thaurissan", icon = "Interface\\Icons\\Spell_Fire_Fireball", desc = "Stuns the primary target for 4 sec and deals Fire damage." },
            },
        },
    },

    ["Upper Blackrock Spire"] = {
        ["Pyroguard Emberseer"] = {
            overview = "A massive fire elemental locked inside the Hall of Binding until all Blackhand Incarcerators are slain and 3+ players click the Blackrock Altar. Emberseer stacks [Growing Flames] to increase his size and damage while pulsing [Fire Nova].",
            roleTips = {
                tank = "Hold Emberseer in the center of the chamber away from the upper ramp doors.",
                healer = "Keep Fire Resistance active and top off melee between [Fire Nova] pulses.",
                melee = "Step out briefly if low on health before [Fire Nova] pulses.",
                ranged = "Stand 15+ yards back to completely outrange [Fire Nova] and burn him before [Growing Flames] stacks high.",
                dps = "Melee: Step out briefly if low on health before [Fire Nova] pulses.\nRanged: Stand 15+ yards back to completely outrange [Fire Nova] and burn him before [Growing Flames] stacks high.",
            },
            abilities = {
                { id = 16079, name = "Growing Flames", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Periodically increases Emberseer's Fire damage and size." },
                { id = 23462, name = "Fire Nova", icon = "Interface\\Icons\\Spell_Fire_SealOfFire", desc = "Pulses heavy Fire damage to all enemies within 12 yards." },
            },
        },
        ["Solakar Flamewreath"] = {
            overview = "Dragonspawn commander who spawns as the final wave when clicking the Father Flame brazier in the Rookery. Solakar casts [War Stomp] while flanked by two elite Rookery Guardians.",
            roleTips = {
                tank = "Clear the loose whelps around the Father Flame altar first, then hold the wave adds and Solakar away from unhatched eggs.",
                healer = "Stand on the ramp away from Rookery eggs so [War Stomp] never knocks you onto eggs.",
                melee = "Do not step on Rookery eggs! Kill the two Rookery Guardians with Solakar first, then finish Solakar.",
                ranged = "Keep Hibernate/Polymorph on one dragonkin add during the waves and stay off the egg beds.",
                dps = "Melee: Do not step on Rookery eggs! Kill the two Rookery Guardians with Solakar first, then finish Solakar.\nRanged: Keep Hibernate/Polymorph on one dragonkin add during the waves and stay off the egg beds.",
            },
            abilities = {
                { id = 16727, name = "War Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stomps the ground, stunning nearby enemies and knocking them back." },
            },
        },
        ["Jed Runewatcher"] = {
            overview = "A rare Blackhand orc mage who spawns in the Rune Room or Furnace hallways (drops Briarwood Reed!). Jed casts [Shield Charge], [Strike], and [Battle Shout].",
            roleTips = {
                tank = "Use `/target Jed Runewatcher` from the entrance to check if he spawned, then pull his patrol back to a cleared balcony.",
                healer = "Heal through [Shield Charge] stuns.",
                melee = "Burn Jed down after clearing or CCing his patrol guards.",
                ranged = "Sheep/trap his accompanying Blackhand guards on the pull.",
                dps = "Melee: Burn Jed down after clearing or CCing his patrol guards.\nRanged: Sheep/trap his accompanying Blackhand guards on the pull.",
            },
            abilities = {
                { id = 15749, name = "Shield Charge", icon = "Interface\\Icons\\Ability_Warrior_Charge", desc = "Charges an enemy and interrupts spellcasting." },
            },
        },
        ["Goraluk Anvilcrack"] = {
            overview = "Master blacksmith of the Blackhand Legion in the Furnace room. Goraluk strikes with [Head Crack], [Backhand], and [Strike].",
            roleTips = {
                tank = "Pull the surrounding furnace packs first, then tank Goraluk at his anvil.",
                healer = "Watch for temporary threat drops when [Backhand] stuns the tank.",
                melee = "Stand behind Goraluk and burn him down.",
                ranged = "Clear the summoners and veterans around the anvil before pulling Goraluk.",
                dps = "Melee: Stand behind Goraluk and burn him down.\nRanged: Clear the summoners and veterans around the anvil before pulling Goraluk.",
            },
            abilities = {
                { id = 6253, name = "Backhand", icon = "Interface\\Icons\\INV_Gauntlets_05", desc = "Stuns the primary target for 2 sec." },
                { id = 16172, name = "Head Crack", icon = "Interface\\Icons\\Ability_ThunderBolt", desc = "Reduces the target's stamina for 20 sec." },
            },
        },
        ["Gyth"] = {
            overview = "Chromatic drake mount of Warchief Rend Blackhand, arriving after 7 waves of dragonspawn and orcs in the Blackrock Stadium. Gyth breathes [Corrosive Acid Breath], [Flame Breath], and [Freeze] before Rend dismounts at 15% health.",
            roleTips = {
                tank = "Tank Gyth at the side wall facing away from the raid so [Corrosive Acid Breath], [Flame Breath], and [Freeze] never hit the group. Have a second tank pick up Rend when he dismounts!",
                healer = "Dispel [Freeze] on the tank immediately and heal through [Corrosive Acid Breath] armor reduction.",
                melee = "Attack Gyth strictly from his side flank (never in front) and switch to finish Gyth before swapping to Rend.",
                ranged = "Stand in the center away from Gyth's head and tail.",
                dps = "Melee: Attack Gyth strictly from his side flank (never in front) and switch to finish Gyth before swapping to Rend.\nRanged: Stand in the center away from Gyth's head and tail.",
            },
            abilities = {
                { id = 16359, name = "Corrosive Acid Breath", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Frontal cone breath that reduces armor by 1000 and deals Nature damage over time." },
                { id = 16390, name = "Flame Breath", icon = "Interface\\Icons\\Spell_Fire_Fire", desc = "Breathes a cone of fire in front of Gyth." },
                { id = 16350, name = "Freeze", icon = "Interface\\Icons\\Spell_Frost_Glacier", desc = "Freezes frontal enemies in solid ice for 6 sec." },
                { id = 16128, name = "Chromatic Chaos", icon = "Interface\\Icons\\Spell_Fire_Lavaspawn", desc = "Increases Gyth's attack speed and elemental resistance." },
            },
        },
        ["Warchief Rend Blackhand"] = {
            overview = "False Warchief of the Dark Horde, who dismounts from Gyth at low health. Rend spins in a devastating [Whirlwind], applies [Mortal Strike] and [Cleave], and enters [Frenzy] at low health.",
            roleTips = {
                tank = "Pick up Rend immediately when he jumps off Gyth, face him away from melee for [Cleave], and save Shield Wall for his low-health [Frenzy].",
                healer = "Keep the tank at 100% HP—[Mortal Strike] reduces healing by 50% and Rend's dual-wield swings hit hard.",
                melee = "Finish killing Gyth first, then stand behind Rend and run out during [Whirlwind].",
                ranged = "Kill Gyth first so only one boss remains, then burn Rend down.",
                dps = "Melee: Finish killing Gyth first, then stand behind Rend and run out during [Whirlwind].\nRanged: Kill Gyth first so only one boss remains, then burn Rend down.",
            },
            abilities = {
                { id = 15589, name = "Whirlwind", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Spins rapidly for 4 sec, striking all nearby enemies for heavy physical damage." },
                { id = 15708, name = "Mortal Strike", icon = "Interface\\Icons\\Ability_Warrior_SavageBlow", desc = "Inflicts heavy weapon damage and reduces healing received by 50%." },
                { id = 15284, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping frontal strike hitting up to 3 targets." },
                { id = 8269, name = "Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases attack speed by 60% at low health." },
            },
        },
        ["The Beast"] = {
            overview = "A colossal two-headed core hound in the Furnace pit (skinning him with Finkles Skinner has a chance to yield Pristine Hide of the Beast!). The Beast fears the raid with [Terrifying Roar], charges with [Berserker Charge], and breathes [Flamebreak] and [Immolate].",
            roleTips = {
                tank = "Tank The Beast with your back wedged tightly inside the back corner of his cave so [Flamebreak] cannot launch you out of the room!",
                healer = "Use Fear Ward / Tremor Totem for [Terrifying Roar] and dispel [Immolate] on the tank.",
                melee = "Fight with your back against the inner cave wall so [Flamebreak] knockback does not throw you into the hallway.",
                ranged = "Stand inside the cave corner with the raid so [Berserker Charge] does not pull The Beast across the hall during [Terrifying Roar] fears.",
                dps = "Melee: Fight with your back against the inner cave wall so [Flamebreak] knockback does not throw you into the hallway.\nRanged: Stand inside the cave corner with the raid so [Berserker Charge] does not pull The Beast across the hall during [Terrifying Roar] fears.",
            },
            abilities = {
                { id = 16785, name = "Flamebreak", icon = "Interface\\Icons\\Spell_Fire_Fire", desc = "Blasts all nearby enemies with fire and launches them far backward." },
                { id = 14100, name = "Terrifying Roar", icon = "Interface\\Icons\\Ability_Devastation", desc = "Fears all enemies within 25 yards for 5 sec." },
                { id = 15571, name = "Immolate", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Burns the target for Fire damage over time." },
                { id = 16636, name = "Berserker Charge", icon = "Interface\\Icons\\Ability_Warrior_Charge", desc = "Charges a distant enemy and knocks them down." },
            },
        },
        ["Lord Valthalak"] = {
            overview = "Tier 0.5 dungeon set upgrade boss summoned in the Blackrock Stadium using the Brazier of Beckoning. Valthalak channels a lethal [Shadow Wrath] aura below 40% health and casts [Shadow Staff] and [Summon Spectral Assassin].",
            roleTips = {
                tank = "Hold Valthalak in the center of the stadium and save major cooldowns for his sub-40% [Shadow Wrath] phase.",
                healer = "Spam group heals below 40% when Valthalak begins pulsing [Shadow Wrath] and top off anyone targeted by Spectral Assassins.",
                melee = "Swap immediately to kill every [Summon Spectral Assassin] add before it reaches its fixated target.",
                ranged = "Save burst cooldowns for 40% to 0% when [Shadow Wrath] pulses across the room.",
                dps = "Melee: Swap immediately to kill every [Summon Spectral Assassin] add before it reaches its fixated target.\nRanged: Save burst cooldowns for 40% to 0% when [Shadow Wrath] pulses across the room.",
            },
            abilities = {
                { id = 27286, name = "Shadow Wrath", icon = "Interface\\Icons\\Spell_Shadow_Requiem", desc = "Below 40% health, pulses heavy Shadow damage to the entire party." },
                { id = 27249, name = "Summon Spectral Assassin", icon = "Interface\\Icons\\Spell_Shadow_Haunting", desc = "Summons ghostly assassins that fixate on random players." },
            },
        },
        ["General Drakkisath"] = {
            overview = "Commander of Nefarian's armies in Blackrock Spire, flanked by two elite Chromatic Elite Guards. Drakkisath disorients and wipes threat on the primary tank for 10 sec with [Conflagration], breathes [Flamestrike], and cleaves with [Cleave].",
            roleTips = {
                tank = "A Hunter (or off-tank) kiting Drakkisath across the bridge back to the Beast's room while the raid kills the two Chromatic Elite Guards makes this fight trivial! When tanking Drakkisath, use two tanks because [Conflagration] disorients the main tank and drops their threat for 10 sec.",
                healer = "Keep the Hunter/off-tank alive during the kite, and switch heals immediately to the secondary tank whenever the main tank is hit by [Conflagration].",
                melee = "Burn down both Chromatic Elite Guards first while Drakkisath is kited or off-tanked, then stand behind Drakkisath and step away from any player burning with [Conflagration].",
                ranged = "Kill the two Chromatic Elite Guards first, and watch your threat whenever the main tank is disoriented by [Conflagration].",
                dps = "Melee: Burn down both Chromatic Elite Guards first while Drakkisath is kited or off-tanked, then stand behind Drakkisath and step away from any player burning with [Conflagration].\nRanged: Kill the two Chromatic Elite Guards first, and watch your threat whenever the main tank is disoriented by [Conflagration].",
            },
            abilities = {
                { id = 16805, name = "Conflagration", icon = "Interface\\Icons\\Spell_Fire_Incinerate", desc = "Sets the primary threat target ablaze in a panic for 10 sec, dealing heavy Fire damage to them and nearby allies while wiping their threat!" },
                { id = 16419, name = "Flamestrike", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Calls down a pillar of flame on a target area." },
                { id = 15284, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping frontal strike hitting up to 3 targets." },
                { id = 16803, name = "Pierce Armor", icon = "Interface\\Icons\\Spell_Shadow_VampiricAura", desc = "Reduces the primary tank's armor by 50%." },
            },
        },
    },

    ["Lower Blackrock Spire"] = {
        ["Spirestone Butcher"] = {
            overview = "A rare Firebrand ogre executioner patrolling the first bridge of Hordemar City. He strikes with [Cleave] and [Backhand].",
            roleTips = {
                tank = "Pull Spirestone Butcher back onto the entrance ramp away from patrolling Firebrand packs.",
                healer = "Heal through [Backhand] stuns on the tank.",
                melee = "Stand behind the Butcher to avoid [Cleave].",
                ranged = "Engage from the upper ramp.",
                dps = "Melee: Stand behind the Butcher to avoid [Cleave].\nRanged: Engage from the upper ramp.",
            },
            abilities = {
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes up to 3 frontal targets." },
                { id = 6253, name = "Backhand", icon = "Interface\\Icons\\INV_Gauntlets_05", desc = "Stuns the primary target for 2 sec." },
            },
        },
        ["Spirestone Battle Lord"] = {
            overview = "A rare ogre warlord who can spawn in Highlord Omokk's alcove. He uses [Mortal Strike], [Cleave], and [Berserker Charge].",
            roleTips = {
                tank = "Clear the alcove ogres and hold the Battle Lord facing the wall.",
                healer = "Pre-heal before [Mortal Strike] (-50% healing).",
                melee = "Stay behind the Battle Lord to avoid [Cleave].",
                ranged = "Stand within 15 yards to prevent [Berserker Charge].",
                dps = "Melee: Stay behind the Battle Lord to avoid [Cleave].\nRanged: Stand within 15 yards to prevent [Berserker Charge].",
            },
            abilities = {
                { id = 15708, name = "Mortal Strike", icon = "Interface\\Icons\\Ability_Warrior_SavageBlow", desc = "Reduces healing received by 50% for 5 sec." },
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Frontal sweeping cleave." },
            },
        },
        ["Spirestone Lord Magus"] = {
            overview = "A rare ogre magus who can spawn in Highlord Omokk's alcove. He casts [Bloodlust], [Frostbolt], and [Shadow Bolt].",
            roleTips = {
                tank = "Hold the Lord Magus and his two ogre guards.",
                healer = "Purge [Bloodlust] immediately.",
                melee = "Kick [Frostbolt] and [Shadow Bolt] casts.",
                ranged = "Polymorph one ogre guard on the pull and purge [Bloodlust].",
                dps = "Melee: Kick [Frostbolt] and [Shadow Bolt] casts.\nRanged: Polymorph one ogre guard on the pull and purge [Bloodlust].",
            },
            abilities = {
                { id = 6742, name = "Bloodlust", icon = "Interface\\Icons\\Spell_Nature_BloodLust", desc = "Increases attack speed by 30%." },
                { id = 16369, name = "Frostbolt", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Blasts the target with Frost damage." },
            },
        },
        ["Highlord Omokk"] = {
            overview = "Chieftain of the Spirestone ogres (drops Omokk's Head and Gemstone of Spirestone!). Omokk flings the tank with [Knock Away], stuns with [War Stomp], and enters [Frenzy] below 50% health.",
            roleTips = {
                tank = "Clear his two ogre bodyguards first, then tank Omokk with your back wedged in the alcove corner to negate [Knock Away].",
                healer = "Expect heavy physical damage once Omokk drops below 50% and enters [Frenzy].",
                melee = "Kill the two Spirestone bodyguards first, then burn Omokk from behind.",
                ranged = "Polymorph one ogre bodyguard on the pull and wait 1 second if the tank is hit by [Knock Away].",
                dps = "Melee: Kill the two Spirestone bodyguards first, then burn Omokk from behind.\nRanged: Polymorph one ogre bodyguard on the pull and wait 1 second if the tank is hit by [Knock Away].",
            },
            abilities = {
                { id = 10101, name = "Knock Away", icon = "Interface\\Icons\\Ability_Kick", desc = "Flings the primary tank backward and reduces threat." },
                { id = 8269, name = "Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Below 50% health, increases attack speed and physical damage." },
                { id = 16727, name = "War Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stuns nearby enemies for 3 sec." },
            },
        },
        ["Shadow Hunter Vosh'gajin"] = {
            overview = "Leader of the Smolderthorn troll witch doctors (drops Fifth Mosh'aru Tablet!). Vosh'gajin turns players into frogs with [Hex], curses the tank with [Curse of Blood], and casts [Chain Healing].",
            roleTips = {
                tank = "Clear the troll room completely before pulling Vosh'gajin and her two guards.",
                healer = "Decurse [Curse of Blood] IMMEDIATELY (it increases all damage taken!) and watch for the tank being turned into a frog by [Hex].",
                melee = "Kill her two Smolderthorn guards first while kicking Vosh'gajin's [Chain Healing].",
                ranged = "Decurse [Curse of Blood] on the tank instantly and Counterspell [Chain Healing].",
                dps = "Melee: Kill her two Smolderthorn guards first while kicking Vosh'gajin's [Chain Healing].\nRanged: Decurse [Curse of Blood] on the tank instantly and Counterspell [Chain Healing].",
            },
            abilities = {
                { id = 16097, name = "Hex", icon = "Interface\\Icons\\Spell_Shaman_Hex", desc = "Transforms a random enemy into a frog for 10 sec, preventing all actions." },
                { id = 16098, name = "Curse of Blood", icon = "Interface\\Icons\\Spell_Shadow_RitualOfBlood", desc = "Increases physical damage taken by the target. Decurse immediately!" },
                { id = 15868, name = "Chain Healing", icon = "Interface\\Icons\\Spell_Nature_HealingWaveGreater", desc = "Heals Vosh'gajin and nearby troll allies." },
            },
        },
        ["War Master Voone"] = {
            overview = "Commander of the Smolderthorn trolls (drops Gemstone of Smolderthorn and Talisman of Evasion!). Voone stuns the tank with [Thrash], [Snap Kick], and [Uppercut], and hurls [Throw Axe] at ranged targets.",
            roleTips = {
                tank = "Tank Voone with your back wedged tightly in the back corner of his room so [Uppercut] does not knock you across the hall.",
                healer = "Keep the tank topped against burst combinations of [Thrash] + [Mortal Strike] + [Snap Kick], and heal ranged hit by [Throw Axe].",
                melee = "Stand behind Voone to avoid [Cleave] and step in if the tank is stunned by [Snap Kick].",
                ranged = "Spread out so [Throw Axe] stuns only one ranged player.",
                dps = "Melee: Stand behind Voone to avoid [Cleave] and step in if the tank is stunned by [Snap Kick].\nRanged: Spread out so [Throw Axe] stuns only one ranged player.",
            },
            abilities = {
                { id = 16075, name = "Throw Axe", icon = "Interface\\Icons\\INV_ThrowingAxe_06", desc = "Hurls an axe at a distant enemy, dealing heavy physical damage and stunning for 2 sec." },
                { id = 15618, name = "Snap Kick", icon = "Interface\\Icons\\Ability_Kick", desc = "Stuns the primary target for 2 sec." },
                { id = 10966, name = "Uppercut", icon = "Interface\\Icons\\INV_Gauntlets_05", desc = "Knocks the primary target backward." },
                { id = 16856, name = "Mortal Strike", icon = "Interface\\Icons\\Ability_Warrior_SavageBlow", desc = "Reduces healing received by 50%." },
            },
        },
        ["Mother Smolderweb"] = {
            overview = "Broodmother of the Spire Spiderlings in the Skitterweb Tunnels. Smolderweb infects players with [Mother's Milk] (which periodically encases you in webs and spreads to anyone standing nearby!) and [Crystallize], then spawns spiderlings upon death.",
            roleTips = {
                tank = "Tank Mother Smolderweb in the cleared corner of her platform and hold the spiderlings that hatch when she dies.",
                healer = "Bring Anti-Venom or a Paladin/Shaman/Druid to cleanse [Mother's Milk] poison immediately, or stay spread 10+ yards apart!",
                melee = "Cleanse [Mother's Milk] with Anti-Venom/Jungle Remedy or spread slightly so you do not web each other.",
                ranged = "Spread 10+ yards apart so [Mother's Milk] web procs never chain-stun the group, and AoE the spiderlings on death.",
                dps = "Melee: Cleanse [Mother's Milk] with Anti-Venom/Jungle Remedy or spread slightly so you do not web each other.\nRanged: Spread 10+ yards apart so [Mother's Milk] web procs never chain-stun the group, and AoE the spiderlings on death.",
            },
            abilities = {
                { id = 16468, name = "Mother's Milk", icon = "Interface\\Icons\\Ability_Creature_Poison_02", desc = "Virulent poison that periodically webs the victim and spreads to any nearby ally within 8 yards!" },
                { id = 16104, name = "Crystallize", icon = "Interface\\Icons\\Spell_Shadow_Teleport", desc = "Stuns nearby enemies in crystalline webs for 3 sec." },
                { id = 16103, name = "Summon Spire Spiderling", icon = "Interface\\Icons\\INV_Misc_MonsterSpiderCarapace_01", desc = "Releases a swarm of spiderlings when Mother Smolderweb is slain." },
            },
        },
        ["Crystal Fang"] = {
            overview = "A rare giant crystal spider that can spawn in the Skitterweb Tunnels near Mother Smolderweb. Casts [Crystal Gaze] and [Venom Spit].",
            roleTips = {
                tank = "Pull Crystal Fang onto a cleared ledge away from spider patrols.",
                healer = "Cleanse [Venom Spit] poisons and dispel [Crystal Gaze].",
                melee = "Burn Crystal Fang down quickly.",
                ranged = "Stay at range in a cleared tunnel.",
                dps = "Melee: Burn Crystal Fang down quickly.\nRanged: Stay at range in a cleared tunnel.",
            },
            abilities = {
                { id = 15524, name = "Crystal Gaze", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Stuns a target in crystal for 6 sec." },
            },
        },
        ["Urok Doomhowl"] = {
            overview = "Summoned at Urok's Tribute Pile by placing the Roughshod Pike and Omokk's Head. Waves of Spirestone ogres attack until 4 ogres are killed using the Roughshod Pike activation (30s cooldown), after which Urok Doomhowl materializes and uses [Intimidating Roar] and [Strike].",
            roleTips = {
                tank = "Hold the ogre waves at the tribute mound while a designated player clicks the Roughshod Pike every 30s to instantly execute an ogre.",
                healer = "Use Fear Ward / Tremor Totem when Urok Doomhowl spawns and casts [Intimidating Roar].",
                melee = "Click the Roughshod Pike on cooldown during the wave phase to speed up Urok's spawn, then burn Urok.",
                ranged = "Crowd-control extra wave ogres until Urok spawns, then focus Urok down.",
                dps = "Melee: Click the Roughshod Pike on cooldown during the wave phase to speed up Urok's spawn, then burn Urok.\nRanged: Crowd-control extra wave ogres until Urok spawns, then focus Urok down.",
            },
            abilities = {
                { id = 16508, name = "Intimidating Roar", icon = "Interface\\Icons\\Ability_GolemThunderClap", desc = "Fears nearby enemies for 6 sec." },
                { id = 15580, name = "Strike", icon = "Interface\\Icons\\Ability_Rogue_Ambush", desc = "Delivers a heavy physical strike." },
            },
        },
        ["Bannok Grimaxe"] = {
            overview = "A rare Scarshield orc commander who spawns in the Scarshield Legion barracks (drops Plans: Arcanite Reaper!). Bannok uses [Mortal Strike] and [Whirlwind].",
            roleTips = {
                tank = "Pull the surrounding Scarshield packs carefully before engaging Bannok.",
                healer = "Top off the tank before [Mortal Strike] lands.",
                melee = "Step out during [Whirlwind] and focus Bannok down.",
                ranged = "Crowd-control his Scarshield guards on the pull.",
                dps = "Melee: Step out during [Whirlwind] and focus Bannok down.\nRanged: Crowd-control his Scarshield guards on the pull.",
            },
            abilities = {
                { id = 15708, name = "Mortal Strike", icon = "Interface\\Icons\\Ability_Warrior_SavageBlow", desc = "Inflicts heavy damage and reduces healing received by 50%." },
                { id = 15589, name = "Whirlwind", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Spins rapidly, striking nearby enemies." },
            },
        },
        ["Quartermaster Zigris"] = {
            overview = "Supply officer of the Scarshield Legion in the barracks. Zigris throws [Stun Bomb], drinks [Drink Healing Potion], and nets players with [Hooked Net].",
            roleTips = {
                tank = "Clear the barracks room first, then hold Zigris in the corner.",
                healer = "Heal through [Stun Bomb] and [Shoot] damage.",
                melee = "Stun or burst Zigris at 30% health to prevent [Drink Healing Potion].",
                ranged = "Stay spread out so [Stun Bomb] only hits one player.",
                dps = "Melee: Stun or burst Zigris at 30% health to prevent [Drink Healing Potion].\nRanged: Stay spread out so [Stun Bomb] only hits one player.",
            },
            abilities = {
                { id = 16497, name = "Stun Bomb", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Throws an explosive bomb that stuns enemies in a small radius for 3 sec." },
                { id = 15504, name = "Drink Healing Potion", icon = "Interface\\Icons\\INV_Potion_54", desc = "Drinks a potion to restore health." },
                { id = 15609, name = "Hooked Net", icon = "Interface\\Icons\\Ability_Ensnare", desc = "Immobilizes a target in a net." },
            },
        },
        ["Halycon"] = {
            overview = "Den mother of the Blackrock worgs. Slaying Halycon immediately summons her mate, Gizrul the Slavener, from the back of the kennel! Halycon uses [Thrash] and [Rend].",
            roleTips = {
                tank = "Clear the worg packs in the kennel first. Tank Halycon near the entrance and stay ready to pick up Gizrul the Slavener the instant Halycon dies.",
                healer = "Conserve mana during Halycon because Gizrul engages immediately without a break.",
                melee = "Burn Halycon steadily and save cooldowns for Gizrul.",
                ranged = "Stand near the kennel entrance away from the back gate where Gizrul rushes in.",
                dps = "Melee: Burn Halycon steadily and save cooldowns for Gizrul.\nRanged: Stand near the kennel entrance away from the back gate where Gizrul rushes in.",
            },
            abilities = {
                { id = 3391, name = "Thrash", icon = "Interface\\Icons\\Ability_GhoulFrenzy", desc = "Grants 2 extra attacks on her next swing." },
                { id = 13738, name = "Rend", icon = "Interface\\Icons\\Ability_Gouge", desc = "Inflicts physical bleed damage over 15 sec." },
            },
        },
        ["Gizrul the Slavener"] = {
            overview = "Massive alpha worg who charges into the kennel the moment Halycon dies. Gizrul uses [Fatal Bite], [Infected Bite], and [Frenzy].",
            roleTips = {
                tank = "Intercept Gizrul as he charges from the back gate and pop mitigation cooldowns during [Frenzy].",
                healer = "Cleanse [Infected Bite] disease and heal through [Fatal Bite] bursts.",
                melee = "Stay behind Gizrul and burn him down.",
                ranged = "Use Tranquilizing Shot on [Frenzy] if available and finish him off.",
                dps = "Melee: Stay behind Gizrul and burn him down.\nRanged: Use Tranquilizing Shot on [Frenzy] if available and finish him off.",
            },
            abilities = {
                { id = 16495, name = "Fatal Bite", icon = "Interface\\Icons\\Ability_BackStab", desc = "Bites the tank for heavy physical damage and drains health." },
                { id = 8269, name = "Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases attack speed by 60%." },
                { id = 16128, name = "Infected Bite", icon = "Interface\\Icons\\Spell_Nature_NullifyDisease", desc = "Inflicts a disease that increases physical damage taken." },
            },
        },
        ["Ghok Bashguud"] = {
            overview = "A rare Bloodaxe orc veteran who can spawn near the Bloodaxe barracks before Overlord Wyrmthalak. Uses [Whirlwind], [Cleave], and [Enrage].",
            roleTips = {
                tank = "Pull Ghok and his two Bloodaxe guards back to the ramp.",
                healer = "Heal through [Enrage] at low health.",
                melee = "Step out during [Whirlwind] and stay behind Ghok.",
                ranged = "Crowd-control one Bloodaxe guard on the pull.",
                dps = "Melee: Step out during [Whirlwind] and stay behind Ghok.\nRanged: Crowd-control one Bloodaxe guard on the pull.",
            },
            abilities = {
                { id = 15589, name = "Whirlwind", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Spins rapidly, hitting nearby enemies." },
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping frontal strike." },
            },
        },
        ["Overlord Wyrmthalak"] = {
            overview = "Black dragonspawn overlord and final boss of Lower Blackrock Spire (drops Gemstone of Bloodaxe and General Drakkisath's Command!). Wyrmthalak knocks the tank far back with [Sweeping Slam], stuns with [Blast Wave], breathes [Flame Breath], and summons two elite Bloodaxe Guards at 50% health.",
            roleTips = {
                tank = "Tank Wyrmthalak with your back wedged tightly against a side pillar or corner so [Sweeping Slam] cannot launch you off the bridge into the abyss! Pick up the 2 Bloodaxe Guards at 50%.",
                healer = "Stand away from the bridge edge and save healing cooldowns for 50% when the two elite Bloodaxe Guards rush in.",
                melee = "Stand behind Wyrmthalak with your back to a pillar (never near the open bridge ledge!) and cleave/CC the 2 Bloodaxe Guards at 50%.",
                ranged = "Polymorph or Freezing Trap one of the summoned Bloodaxe Guards at 50% and stay away from the open bridge edge.",
                dps = "Melee: Stand behind Wyrmthalak with your back to a pillar (never near the open bridge ledge!) and cleave/CC the 2 Bloodaxe Guards at 50%.\nRanged: Polymorph or Freezing Trap one of the summoned Bloodaxe Guards at 50% and stay away from the open bridge edge.",
            },
            abilities = {
                { id = 12887, name = "Sweeping Slam", icon = "Interface\\Icons\\Ability_Devastation", desc = "Knocks all frontal enemies far backward and reduces threat (fatal if knocked off the bridge!)." },
                { id = 11130, name = "Blast Wave", icon = "Interface\\Icons\\Spell_Holy_Excorcism_02", desc = "Unleashes a fiery shockwave that damages and dazes nearby enemies." },
                { id = 9573, name = "Flame Breath", icon = "Interface\\Icons\\Spell_Fire_Fire", desc = "Breathes a cone of fire in front of Wyrmthalak." },
                { id = 15284, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping frontal strike." },
            },
        },
    },
}
