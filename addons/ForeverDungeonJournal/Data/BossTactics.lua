local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- Boss Overview, Abilities, and Role-specific Tips for WoW Forever Dungeons
FDJ.BOSS_TACTICS = {
    ["Hall of Thanes"] = {
        ["Faldrim Anvilmar"] = {
            overview = "Undead dwarven lord circling his tomb in Anvilmar's Rest. A caster with a long-lasting curse; the chamber is packed with ghosts, so clear them first.",
            roleTips = {
                tank = "He circles the tomb, so pull him to a cleared spot. He does not social-aggro, but make room for the group first.",
                healer = "Mind Blast hurts but can be healed through. Dispel or remove Anvilmar's Curse if you can; it is not fatal if you cannot.",
                melee = "Clear nearby ghosts before the pull. Mind Blast can be interrupted but does not have to be.",
                ranged = "Dispel Anvilmar's Curse if you have curse removal. Interrupt Mind Blast if convenient.",
                dps = "Ranged: Dispel Anvilmar's Curse if you have curse removal. Interrupt Mind Blast if convenient.\nMelee: Clear nearby ghosts before the pull. Mind Blast can be interrupted but does not have to be.",
            },
            abilities = {
                { id = 0, name = "Mind Blast", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Shadow damage to the target. Can be interrupted." },
                { id = 0, name = "Anvilmar's Curse", icon = "Interface\\Icons\\Spell_Shadow_CurseOfSargeras", desc = "Lasts 10 min. Reduces attack and casting speed by 20% and makes the target immune to Poisons and Bleeds. Curse-removable." },
            },
        },
        ["Magmatus"] = {
            overview = "Fire elemental in the natural cavern past the Dark Iron dwarves, fought alongside a Dark Iron Summoner. Pulses fire damage to everything near him.",
            roleTips = {
                tank = "Kill the Dark Iron Summoner first; keep Magmatus away from the group while it dies.",
                healer = "Heal everyone in melee range, not just the tank. Fire Nova and Combust hurt anyone close.",
                melee = "Watch your health bar; Fire Nova is instant and hits everyone nearby.",
                ranged = "Stay away from Magmatus; focus the Summoner first.",
                dps = "Ranged: Stay away from Magmatus; focus the Summoner first.\nMelee: Watch your health bar; Fire Nova is instant and hits everyone nearby.",
            },
            abilities = {
                { id = 0, name = "Fire Nova", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Instant Fire damage to everyone near Magmatus." },
                { id = 0, name = "Combust", icon = "Interface\\Icons\\Spell_Fire_Fire", desc = "Fire damage on a random target." },
            },
        },
        ["Plunder"] = {
            overview = "Elemental guardian patrolling the Hall of Thanes hallway. Hits very hard and knocks players back.",
            roleTips = {
                tank = "Pull Plunder into a corner away from other packs, back to a wall, so Knock Away cannot send anyone into more trash.",
                healer = "Burst healing on the tank; keep the group out of melee range if possible.",
                melee = "Position so Knock Away cannot throw you into other packs.",
                ranged = "Stay away from him unless you must be near him.",
                dps = "Ranged: Stay away from him unless you must be near him.\nMelee: Position so Knock Away cannot throw you into other packs.",
            },
            abilities = {
                { id = 0, name = "Knock Away", icon = "Interface\\Icons\\Ability_UpgradeMoonGlaive", desc = "His only listed ability; knocks the target back and reduces threat." },
            },
        },
        ["Durgen Dirgehammer"] = {
            overview = "Dark Iron commander behind the Dark Iron Incursion, standing in the Reliquary of Kings with two Lesser Stone Golems and several Dark Iron Looters.",
            roleTips = {
                tank = "Clear Looters before the pull. Rend ticks on you and the golems add heavy damage, so use cooldowns and kill fast.",
                healer = "Heavy tank damage while Dirgen and the golems live. Fear removes the group; a Tremor Totem or Fear Ward helps.",
                melee = "Kill Dirgen first, then the Lesser Stone Golems. Clear Looters first.",
                ranged = "Spread away from the fear targets; a Shaman should drop Tremor Totem before the pull.",
                dps = "Ranged: Spread away from the fear targets; a Shaman should drop Tremor Totem before the pull.\nMelee: Kill Dirgen first, then the Lesser Stone Golems. Clear Looters first.",
            },
            abilities = {
                { id = 0, name = "Fear", icon = "Interface\\Icons\\Spell_Shadow_Possession", desc = "AoE fear, about 8 sec, scatters the group into nearby packs." },
                { id = 0, name = "Rend", icon = "Interface\\Icons\\Ability_Gouge", desc = "Bleed on the tank, about 44 physical damage every 3 sec." },
            },
        },
    },

    ["Ruins of Lordaeron"] = {
        ["The Baron"] = {
            overview = "Hard-hitting undead noble whose Knockout can nearly kill an unprepared tank.",
            roleTips = {
                tank = "Stay near full health at all times. Knockout removes almost half your health and stuns you.",
                healer = "Keep the tank topped off; the next hit after Knockout is the danger.",
                melee = "Stun him if you can.",
                ranged = "Stun him if you can; otherwise keep damage steady.",
                dps = "Ranged: Stun him if you can; otherwise keep damage steady.\nMelee: Stun him if you can.",
            },
            abilities = {
                { id = 0, name = "Knockout", icon = "Interface\\Icons\\Ability_Warrior_PunishingBlow", desc = "Removes nearly half the tank's health, then stuns." },
                { id = 0, name = "Heavy Melee", icon = "Interface\\Icons\\Ability_MeleeDamage", desc = "Hard melee swings on the tank." },
            },
        },
        ["Witherfang"] = {
            overview = "Plague-ridden beast that patrols Kings Alley with two adds.",
            roleTips = {
                tank = "Clear a spot along his patrol path before pulling. Leech Poison is his only real ability.",
                healer = "Leech Poison ticks on the tank; poison removal helps.",
                melee = "Kill Witherfang first, then the adds.",
                ranged = "Kill Witherfang first, then the adds.",
                dps = "Ranged: Kill Witherfang first, then the adds.\nMelee: Kill Witherfang first, then the adds.",
            },
            abilities = {
                { id = 0, name = "Leech Poison", icon = "Interface\\Icons\\Spell_Nature_NullifyPoison", desc = "Poison cast on the tank; drains health over time." },
            },
        },
        ["The Abandoned"] = {
            overview = "Appears on wave 4 of the event in Market Square, after the statue quakes and 3 add waves.",
            roleTips = {
                tank = "Stun him at the start of a Life Drain cast to prevent it.",
                healer = "Heal through Life Drain; Chilled slows melee that hit him.",
                melee = "Chilled slows melee hitting him; stun at the start of Life Drain.",
                ranged = "Stay clear of Frost Nova; stun him at the start of Life Drain.",
                dps = "Ranged: Stay clear of Frost Nova; stun him at the start of Life Drain.\nMelee: Chilled slows melee hitting him; stun at the start of Life Drain.",
            },
            abilities = {
                { id = 0, name = "Frost Nova", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Freezes nearby players in place." },
                { id = 0, name = "Life Drain", icon = "Interface\\Icons\\Spell_Shadow_LifeDrain02", desc = "Drains the tank's health. Stun or interrupt it." },
                { id = 0, name = "Chilled", icon = "Interface\\Icons\\Spell_Frost_FrostArmor02", desc = "Applied to melee players who hit him." },
            },
        },
        ["Bjork"] = {
            overview = "Patrols the center of the Ruins; the ghouls near him are dangerous.",
            roleTips = {
                tank = "Do not pull with nearby trash. Anti-Magic Shield only lasts about 3 sec.",
                healer = "Expect trash damage if ghouls join the pull.",
                melee = "Avoid pulling him with nearby ghouls.",
                ranged = "Hold spell damage when Anti-Magic Shield is up.",
                dps = "Ranged: Hold spell damage when Anti-Magic Shield is up.\nMelee: Avoid pulling him with nearby ghouls.",
            },
            abilities = {
                { id = 0, name = "Anti-Magic Shield", icon = "Interface\\Icons\\Spell_Shadow_AntiMagicShell", desc = "Absorbs spell damage for about 3 sec. His only ability." },
            },
        },
        ["Rath'mael"] = {
            overview = "Final boss. Not a particularly hard fight.",
            roleTips = {
                tank = "Move out of Flamestrike.",
                healer = "Heal through Flamestrike damage.",
                melee = "Move out of Flamestrike; stun him to prevent the cast.",
                ranged = "Move out of Flamestrike; stun him to prevent the cast.",
                dps = "Ranged: Move out of Flamestrike; stun him to prevent the cast.\nMelee: Move out of Flamestrike; stun him to prevent the cast.",
            },
            abilities = {
                { id = 0, name = "Flamestrike", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Fire damage in an area; leaves burning ground. Move out or stun to prevent." },
            },
        },
        ["Viktor the Vile"] = {
            overview = "Optional boss. Click the chimney in the house southwest of Lordamere Overlook to start 5 waves of adds; Viktor spawns on wave 6.",
            roleTips = {
                tank = "Gain threat the moment Viktor appears. There is little time between waves.",
                healer = "Conserve mana during the waves; Leech Poison ticks on the tank.",
                melee = "Easy boss that players can skip. Burn him down after the waves.",
                ranged = "Conserve mana across the waves.",
                dps = "Ranged: Conserve mana across the waves.\nMelee: Easy boss that players can skip. Burn him down after the waves.",
            },
            abilities = {
                { id = 0, name = "Leech Poison", icon = "Interface\\Icons\\Spell_Nature_NullifyPoison", desc = "Poison cast on the tank; drains health over time." },
            },
        },
        ["Lordaeron Captain"] = {
            overview = "A rare ghostly commander of the royal guard still carrying his ceremonial blade and shield.",
            roleTips = {
                tank = "Face away from the party; anticipate Disarm (temporarily disables parry/block and drops threat).",
                healer = "Keep the tank topped during Disarm phase when incoming damage spikes.",
                melee = "Stay strictly behind the boss to avoid parry and frontal strikes. Kick [Holy Light] on cooldown to prevent healing.",
                ranged = "Counterspell or stun [Holy Light] from max range and burn down the escort guards first.",
                dps = "Melee: Stay strictly behind the boss to avoid parry and frontal strikes. Kick [Holy Light] on cooldown to prevent healing.\nRanged: Counterspell or stun [Holy Light] from max range and burn down the escort guards first.",
            },
            abilities = {
                { id = 871, name = "Shield Wall", icon = "Interface\\Icons\\Ability_Warrior_ShieldWall", desc = "Reduces all damage taken by 60% for 8 sec." },
                { id = 15655, name = "Shield Slam", icon = "Interface\\Icons\\INV_Shield_05", desc = "Slams the target with a shield, dealing physical damage and stunning for 2 sec." },
                { id = 1026, name = "Holy Light", icon = "Interface\\Icons\\Spell_Holy_HolyBolt", desc = "Calls upon the Light to heal the caster." },
            },
        },
        ["Trash Drops"] = {
            overview = "Notable zone trash drops, rare recipes, and world BoEs found across the creatures in Ruins of Lordaeron. Clear pulls methodically and watch for patrolling mobs and runners.",
            roleTips = {
                tank = "Mark primary kill targets (Skull/X) on multi-mob pulls; pull caster packs around corners using Line-of-Sight to group them for cleave.",
                healer = "Prioritize dispelling lethal poisons, curses, and diseases; conserve mana between packs and drink whenever out of combat.",
                melee = "Kick dangerous enemy spellcasts on sight and watch for frontal cleaves or whirlwinds from humanoid and undead trash mobs.",
                ranged = "Focus the primary marked target and use crowd control (Polymorph, Freezing Trap, Sap) on dangerous humanoid pulls before engaging.",
                dps = "Melee: Kick dangerous spellcasts on sight and beware frontal cleaves.\nRanged: Focus skull marker and crowd-control dangerous humanoids.",
            },
            abilities = {
                { id = 0, name = "Line-of-Sight Pulling", icon = "Interface\\Icons\\Ability_Rogue_Sprint", desc = "Duck behind a wall or pillar after pulling ranged casters to force them to run into melee range." },
                { id = 0, name = "Fleeing Adds", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Low-health humanoids flee and aggro adjacent packs. Stun, snare, or execute them quickly." },
            },
        },

    },

    ["Ragefire Chasm"] = {
        ["Oggleflint"] = {
            overview = "The chieftain of the Ragefire troggs. Fights with brute force alongside a pack of loyal trogg bodyguards.",
            roleTips = {
                tank = "Pick up Oggleflint and his trogg guards immediately on pull with Thunderclap or Demoralizing Roar.",
                healer = "Be prepared for sudden target shifts when Oggleflint uses Intimidating Roar.",
                melee = "Focus down the trogg bodyguards first before engaging Oggleflint; position behind to avoid frontal cleave.",
                ranged = "Burn Oggleflint's trogg adds from max distance, then switch to Oggleflint.",
                dps = "Melee: Focus down the trogg bodyguards first before engaging Oggleflint; position behind to avoid frontal cleave.\nRanged: Burn Oggleflint's trogg adds from max distance, then switch to Oggleflint.",
            },
            abilities = {
                { id = 797, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Strikes up to 2 targets in front of the caster for physical damage." },
                { id = 5246, name = "Intimidating Shout", icon = "Interface\\Icons\\Ability_GolemThunderClap", desc = "Shouts with terrifying rage, causing nearby enemies to tremble in fear for 3 sec." },
            },
        },
        ["Taragaman the Hungerer"] = {
            overview = "A ferocious felguard summoned into the subterranean lava tubes beneath Orgrimmar. Uses knockbacks and searing fire magic.",
            roleTips = {
                tank = "Tank Taragaman with your back facing a rock wall so his Uppercut does not launch you into the surrounding lava pool.",
                healer = "Keep the tank topped off to absorb the Uppercut spike damage.",
                melee = "Never stand behind the tank; attack from max melee range behind Taragaman to avoid frontal [Fire Nova].",
                ranged = "Spread out at max 30+ yard range to completely outrange [Fire Nova] and burn the boss.",
                dps = "Melee: Never stand behind the tank; attack from max melee range behind Taragaman to avoid frontal [Fire Nova].\nRanged: Spread out at max 30+ yard range to completely outrange [Fire Nova] and burn the boss.",
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
                melee = "Quickly interrupt or stun Jergosh to prevent his casted fire spells; stay behind to avoid fire breath.",
                ranged = "Counterspell Jergosh's fire casts from range and kill his imp minions immediately.",
                dps = "Melee: Quickly interrupt or stun Jergosh to prevent his casted fire spells; stay behind to avoid fire breath.\nRanged: Counterspell Jergosh's fire casts from range and kill his imp minions immediately.",
            },
            abilities = {
                { id = 348, name = "Immolate", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Burns an enemy for initial Fire damage and additional damage every 3 sec for 15 sec." },
                { id = 702, name = "Curse of Weakness", icon = "Interface\\Icons\\Spell_Shadow_CurseOfMannoroth", desc = "Reduces the target's physical attack power by 15 for 2 min." },
            },
        },
        ["Bazzalan"] = {
            overview = "A satyr rogue hiding at the back of Ragefire Chasm. He coats his blades in Deadly Poison and strikes hard with Sinister Strike.",
            roleTips = {
                tank = "Tank him where the group can reach him; he hits the tank with Sinister Strike and stacks poison.",
                healer = "Watch the tank's poison stacks; cleanse poison if you can, otherwise heal through it.",
                melee = "Stand behind him. Poison on the tank is the main threat, so kill him fast.",
                ranged = "Free DPS on a single target; just stay out of the tank's way.",
                dps = "Ranged: Free DPS on a single target; just stay out of the tank's way.\nMelee: Stand behind him. Poison on the tank is the main threat, so kill him fast.",
            },
            abilities = {
                { id = 2818, name = "Deadly Poison", icon = "Interface\\Icons\\ability_rogue_dualweild", desc = "Poisons the target, dealing Nature damage every 3 sec. Stacks." },
                { id = 14873, name = "Sinister Strike", icon = "Interface\\Icons\\spell_shadow_ritualofsacrifice", desc = "An instant strike for extra weapon damage." },
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
            overview = "A rare Defias foreman in the mine tunnels. His Pierce Armor strips most of the tank's armor, so his melee hits get much harder.",
            roleTips = {
                tank = "Pierce Armor removes 75% of your armor for 20 sec; use a defensive cooldown while it is up.",
                healer = "Expect a big jump in tank damage after Pierce Armor lands.",
                melee = "Stay behind him and burn him quickly.",
                ranged = "Free DPS; kill him before Pierce Armor gets reapplied.",
                dps = "Ranged: Free DPS; kill him before Pierce Armor gets reapplied.\nMelee: Stay behind him and burn him quickly.",
            },
            abilities = {
                { id = 12097, name = "Pierce Armor", icon = "Interface\\Icons\\spell_shadow_vampiricaura", desc = "Reduces the target's armor by 75% for 20 sec." },
            },
        },
        ["Sneed's Shredder"] = {
            overview = "Sneed pilots his lumber shredder. When the shredder is destroyed, Eject Sneed throws him out and he keeps fighting on foot.",
            roleTips = {
                tank = "Terrify can fear you for 4 sec; be ready to pick the shredder back up. Then taunt Sneed when he is ejected.",
                healer = "Distracting Pain slows casting by 35% for 15 sec; start heals early.",
                melee = "Save burst for Sneed once he is ejected.",
                ranged = "Kill the shredder, then switch to Sneed.",
                dps = "Ranged: Kill the shredder, then switch to Sneed.\nMelee: Save burst for Sneed once he is ejected.",
            },
            abilities = {
                { id = 7399, name = "Terrify", icon = "Interface\\Icons\\ability_physical_taunt", desc = "Fears one enemy for 4 sec." },
                { id = 3603, name = "Distracting Pain", icon = "Interface\\Icons\\ability_racial_cannibalize", desc = "Slows the target's casting speed by 35% for 15 sec." },
                { id = 5141, name = "Eject Sneed", icon = "Interface\\Icons\\spell_fire_fire", desc = "When the shredder is destroyed, Sneed is ejected and joins the fight." },
            },
        },
        ["Sneed"] = {
            overview = "The goblin lumber boss, ejected from his destroyed shredder. On foot he disarms the tank.",
            roleTips = {
                tank = "Pick him up as soon as he lands. Disarm lowers your damage and threat for 6 sec.",
                healer = "Steady tank healing; he is weaker than the shredder.",
                melee = "Stay behind him and finish him fast.",
                ranged = "Free DPS.",
                dps = "Ranged: Free DPS.\nMelee: Stay behind him and finish him fast.",
            },
            abilities = {
                { id = 6713, name = "Disarm", icon = "Interface\\Icons\\ability_warrior_disarm", desc = "Disarms the target for 6 sec." },
            },
        },
        ["Gilnid"] = {
            overview = "The goblin smelter boss in the foundry. He throws Molten Metal, which burns the target and slows its attacks and movement.",
            roleTips = {
                tank = "Molten Metal slows your attack speed and movement for 15 sec; keep him away from the goblin workers so they don't join.",
                healer = "Heal through the Fire damage over time from Molten Metal.",
                melee = "Clear the goblin smelters first so they don't join the pull.",
                ranged = "Stay at range; Molten Metal is a melee-range ability.",
                dps = "Ranged: Stay at range; Molten Metal is a melee-range ability.\nMelee: Clear the goblin smelters first so they don't join the pull.",
            },
            abilities = {
                { id = 5213, name = "Molten Metal", icon = "Interface\\Icons\\spell_fire_fireball", desc = "Burns the target for Fire damage every 3 sec and slows its attack and movement speed for 15 sec." },
            },
        },
        ["Mr. Smite"] = {
            overview = "The fearsome tauren first mate guarding the Ironclad warship. At 66% and 33% health, Smite stomps the ground to stun the entire group, runs to his weapon chest, and equips progressively deadlier armaments.",
            roleTips = {
                tank = "War Stomp stuns the entire group at 66% and 33%. Immediately re-taunt Smite as soon as the stun breaks.",
                healer = "Pre-shield and HoT the tank right before 66% and 33% stuns; heal immediately after the stun breaks as two-hand damage spikes.",
                melee = "Stop high-burst attacks right before 66% and 33% health transitions to avoid wasted cooldowns during stun.",
                ranged = "Hold big cooldowns across his 66% and 33% weapon-chest phase shifts; resume burn once he re-engages.",
                dps = "Melee: Stop high-burst attacks right before 66% and 33% health transitions to avoid wasted cooldowns during stun.\nRanged: Hold big cooldowns across his 66% and 33% weapon-chest phase shifts; resume burn once he re-engages.",
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
            overview = "The leader of the Defias Brotherhood on the deck of his juggernaut. He dual-wields, gains extra attacks with Thrash and calls Defias Blackguards to his side.",
            roleTips = {
                tank = "Thrash gives him two extra swings at once; expect spikes. Grab the Blackguards when VanCleef's Allies summons them.",
                healer = "Watch for tank spikes from Thrash and extra damage once the Blackguards join.",
                melee = "Stay behind him. Kill or control the Blackguards when they arrive.",
                ranged = "Switch to the Blackguards when they spawn, then back to VanCleef.",
                dps = "Ranged: Switch to the Blackguards when they spawn, then back to VanCleef.\nMelee: Stay behind him. Kill or control the Blackguards when they arrive.",
            },
            abilities = {
                { id = 3391, name = "Thrash", icon = "Interface\\Icons\\ability_ghoulfrenzy", desc = "Gives VanCleef two extra attacks." },
                { id = 5200, name = "VanCleef's Allies", icon = "Interface\\Icons\\ability_warrior_battleshout", desc = "Calls Defias Blackguards to help him." },
                { id = 674, name = "Dual Wield", icon = "Interface\\Icons\\ability_dualwield", desc = "Attacks with a weapon in each hand." },
            },
        },
        ["Cookie"] = {
            overview = "The murloc cook of the Defias ship. He heals himself with Cookie's Cooking and splashes acid that damages everyone near him.",
            roleTips = {
                tank = "Keep him in place; Acid Splash hits everyone close to him.",
                healer = "Acid Splash puts Nature damage over time on nearby players for 30 sec.",
                melee = "Interrupt Cookie's Cooking, his self-heal.",
                ranged = "Stay out of melee range to avoid Acid Splash.",
                dps = "Ranged: Stay out of melee range to avoid Acid Splash.\nMelee: Interrupt Cookie's Cooking, his self-heal.",
            },
            abilities = {
                { id = 5174, name = "Cookie's Cooking", icon = "Interface\\Icons\\spell_holy_heal", desc = "2 sec cast. Heals Cookie. Interrupt it." },
                { id = 6306, name = "Acid Splash", icon = "Interface\\Icons\\inv_drink_06", desc = "Deals Nature damage to nearby enemies every 5 sec for 30 sec." },
            },
        },
        ["Trash Drops"] = {
            overview = "Notable zone trash drops, rare recipes, and world BoEs found across the creatures in The Deadmines. Clear pulls methodically and watch for patrolling mobs and runners.",
            roleTips = {
                tank = "Mark primary kill targets (Skull/X) on multi-mob pulls; pull caster packs around corners using Line-of-Sight to group them for cleave.",
                healer = "Prioritize dispelling lethal poisons, curses, and diseases; conserve mana between packs and drink whenever out of combat.",
                melee = "Kick dangerous enemy spellcasts on sight and watch for frontal cleaves or whirlwinds from humanoid and undead trash mobs.",
                ranged = "Focus the primary marked target and use crowd control (Polymorph, Freezing Trap, Sap) on dangerous humanoid pulls before engaging.",
                dps = "Melee: Kick dangerous spellcasts on sight and beware frontal cleaves.\nRanged: Focus skull marker and crowd-control dangerous humanoids.",
            },
            abilities = {
                { id = 0, name = "Line-of-Sight Pulling", icon = "Interface\\Icons\\Ability_Rogue_Sprint", desc = "Duck behind a wall or pillar after pulling ranged casters to force them to run into melee range." },
                { id = 0, name = "Fleeing Adds", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Low-health humanoids flee and aggro adjacent packs. Stun, snare, or execute them quickly." },
            },
        },

    },

    ["Wailing Caverns"] = {
        ["Lord Cobrahn"] = {
            overview = "A Fanglord druid of the Druids of the Fang. He casts Lightning Bolt and Druid's Slumber, then turns into a serpent to fight in melee.",
            roleTips = {
                tank = "Once he takes Cobrahn Serpent Form he hits much harder in melee.",
                healer = "Druid's Slumber can sleep you for 15 sec; stay in range of a second healer or use a trinket.",
                melee = "Interrupt Lightning Bolt and Druid's Slumber.",
                ranged = "Interrupt his casts; any damage wakes a slept player.",
                dps = "Ranged: Interrupt his casts; any damage wakes a slept player.\nMelee: Interrupt Lightning Bolt and Druid's Slumber.",
            },
            abilities = {
                { id = 9532, name = "Lightning Bolt", icon = "Interface\\Icons\\spell_nature_lightning", desc = "Nature damage on one target." },
                { id = 8040, name = "Druid's Slumber", icon = "Interface\\Icons\\spell_nature_sleep", desc = "Sleeps one target for up to 15 sec. Any damage wakes it." },
                { id = 7965, name = "Cobrahn Serpent Form", icon = "Interface\\Icons\\spell_nature_guardianward", desc = "Turns into a serpent, gaining a lot of melee damage but attacking more slowly." },
            },
        },
        ["Lady Anacondra"] = {
            overview = "A cunning Druid of the Fang located on the upper ledge overlooking the cavern entrance.",
            roleTips = {
                tank = "Keep Anacondra focused on you. Interrupt Lightning Bolt.",
                healer = "Dispel Sleep from the tank immediately so Anacondra does not attack squishy party members.",
                melee = "Save all kicks and stuns for [Healing Touch]; she heals a massive portion of health if unkicked.",
                ranged = "Prioritize interrupting [Healing Touch] from max range and dispel [Sleep] on allies.",
                dps = "Melee: Save all kicks and stuns for [Healing Touch]; she heals a massive portion of health if unkicked.\nRanged: Prioritize interrupting [Healing Touch] from max range and dispel [Sleep] on allies.",
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
            overview = "A Fanglord druid who fights with Lightning Bolt and Thunderclap, puts players to sleep and heals himself with Healing Touch.",
            roleTips = {
                tank = "Thunderclap slows attack and movement speed of everyone near him for 10 sec.",
                healer = "Sleep can hit you for up to 20 sec; any damage wakes the target.",
                melee = "Interrupt Healing Touch every time.",
                ranged = "Interrupt Lightning Bolt and Healing Touch.",
                dps = "Ranged: Interrupt Lightning Bolt and Healing Touch.\nMelee: Interrupt Healing Touch every time.",
            },
            abilities = {
                { id = 9532, name = "Lightning Bolt", icon = "Interface\\Icons\\spell_nature_lightning", desc = "Nature damage on one target." },
                { id = 8147, name = "Thunderclap", icon = "Interface\\Icons\\spell_nature_thunderclap", desc = "Nature damage to nearby enemies and slows their attack and movement speed for 10 sec." },
                { id = 700, name = "Sleep", icon = "Interface\\Icons\\spell_nature_sleep", desc = "Sleeps one target. Any damage wakes it." },
                { id = 5187, name = "Healing Touch", icon = "Interface\\Icons\\spell_nature_healingtouch", desc = "Heals himself. Interrupt it." },
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
                { id = 6254, name = "Chained Bolt", icon = "Interface\\Icons\\Spell_Nature_ChainLightning", desc = "Fires a crackling lightning bolt that arcs between nearby enemies, dealing Nature damage." },
            },
        },
        ["Lord Serpentis"] = {
            overview = "The master of the Fang and supreme commander of the corrupted druids inside Wailing Caverns.",
            roleTips = {
                tank = "Position Serpentis away from the party. Be prepared for Sleep effects and keep taunt ready.",
                healer = "Be ready with quick dispel magic or poison cleanses.",
                melee = "Coordinate interrupts on [Healing Touch] so Serpentis cannot reset his health; burn him down in serpent form.",
                ranged = "Interrupt [Healing Touch] from distance and burn Serpentis down swiftly.",
                dps = "Melee: Coordinate interrupts on [Healing Touch] so Serpentis cannot reset his health; burn him down in serpent form.\nRanged: Interrupt [Healing Touch] from distance and burn Serpentis down swiftly.",
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
                { id = 0, name = "Tremor", icon = "Interface\\Icons\\\\Spell_Nature_Earthquake", desc = "Shakes the cavern floor, dealing heavy physical damage to all nearby enemies." },
                { id = 8142, name = "Grasping Vines", icon = "Interface\\Icons\\Spell_Nature_StrangleVines", desc = "Entangles enemies in roots, preventing movement for 6 sec." },
            },
        },
        ["Mutanus the Devourer"] = {
            overview = "The murloc horror that appears when Naralex's awakening is interrupted. He sleeps players with Naralex's Nightmare, fears with Terrify and stuns everyone nearby with Thundercrack.",
            roleTips = {
                tank = "Thundercrack stuns everyone near him for 2.5 sec; Terrify can fear you off him for 4 sec.",
                healer = "Naralex's Nightmare sleeps a player for up to 15 sec; damage wakes them.",
                melee = "Thundercrack hits everyone in melee; stay healthy.",
                ranged = "Stay out of Thundercrack range.",
                dps = "Ranged: Stay out of Thundercrack range.\nMelee: Thundercrack hits everyone in melee; stay healthy.",
            },
            abilities = {
                { id = 7967, name = "Naralex's Nightmare", icon = "Interface\\Icons\\spell_nature_sleep", desc = "Sleeps one target for up to 15 sec. Any damage wakes it." },
                { id = 7399, name = "Terrify", icon = "Interface\\Icons\\ability_physical_taunt", desc = "Fears one enemy for 4 sec." },
                { id = 8150, name = "Thundercrack", icon = "Interface\\Icons\\spell_nature_thunderclap", desc = "Nature damage to nearby enemies and stuns them for 2.5 sec." },
            },
        },
        ["Deviate Faerie Dragon"] = {
            overview = "A rare mystical faerie dragon fluttering through the cavern tunnels. Burns mana and casts faerie fire.",
            roleTips = {
                tank = "Establish quick threat to prevent Faerie Dragon from targeting casters.",
                healer = "Keep distance to avoid Mana Burn drains.",
                melee = "Interrupt [Mana Burn] whenever cast to protect healer and caster mana pools.",
                ranged = "Max-range [Mana Burn] (30+ yards) so your mana is never drained; burn the dragon down.",
                dps = "Melee: Interrupt [Mana Burn] whenever cast to protect healer and caster mana pools.\nRanged: Max-range [Mana Burn] (30+ yards) so your mana is never drained; burn the dragon down.",
            },
            abilities = {
                { id = 8129, name = "Mana Burn", icon = "Interface\\Icons\\Spell_Shadow_ManaBurn", desc = "Drains mana from an enemy and deals Shadow damage equal to the mana drained." },
            },
        },
        ["Trash Drops"] = {
            overview = "Notable zone trash drops, rare recipes, and world BoEs found across the creatures in Wailing Caverns. Clear pulls methodically and watch for patrolling mobs and runners.",
            roleTips = {
                tank = "Mark primary kill targets (Skull/X) on multi-mob pulls; pull caster packs around corners using Line-of-Sight to group them for cleave.",
                healer = "Prioritize dispelling lethal poisons, curses, and diseases; conserve mana between packs and drink whenever out of combat.",
                melee = "Kick dangerous enemy spellcasts on sight and watch for frontal cleaves or whirlwinds from humanoid and undead trash mobs.",
                ranged = "Focus the primary marked target and use crowd control (Polymorph, Freezing Trap, Sap) on dangerous humanoid pulls before engaging.",
                dps = "Melee: Kick dangerous spellcasts on sight and beware frontal cleaves.\nRanged: Focus skull marker and crowd-control dangerous humanoids.",
            },
            abilities = {
                { id = 0, name = "Line-of-Sight Pulling", icon = "Interface\\Icons\\Ability_Rogue_Sprint", desc = "Duck behind a wall or pillar after pulling ranged casters to force them to run into melee range." },
                { id = 0, name = "Fleeing Adds", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Low-health humanoids flee and aggro adjacent packs. Stun, snare, or execute them quickly." },
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
                melee = "Burst him down swiftly and stun him before [Soul Drain] stacks heal him significantly.",
                ranged = "Burn Rethilgore down from range; interrupt or knock him back during [Soul Drain].",
                dps = "Melee: Burst him down swiftly and stun him before [Soul Drain] stacks heal him significantly.\nRanged: Burn Rethilgore down from range; interrupt or knock him back during [Soul Drain].",
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
                melee = "Save stuns for when Razorclaw turns away from the incapacitated tank to protect DPS.",
                ranged = "Kite or slow Razorclaw if he drops threat on the tank; maintain distance.",
                dps = "Melee: Save stuns for when Razorclaw turns away from the incapacitated tank to protect DPS.\nRanged: Kite or slow Razorclaw if he drops threat on the tank; maintain distance.",
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
                melee = "Interrupt Silverlaine's shadow casts; burn him down before multiple Shadow Wolf adds spawn.",
                ranged = "Counterspell shadow casts and switch to kill summoned Shadow Wolf adds immediately.",
                dps = "Melee: Interrupt Silverlaine's shadow casts; burn him down before multiple Shadow Wolf adds spawn.\nRanged: Counterspell shadow casts and switch to kill summoned Shadow Wolf adds immediately.",
            },
            abilities = {
                { id = 7068, name = "Veil of Shadow", icon = "Interface\\Icons\\Spell_Shadow_GatherShadows", desc = "Curses the target, reducing all healing received by 75% for 15 sec. High decurse priority." },
            },
        },
        ["Commander Springvale"] = {
            overview = "The fallen paladin commander of Shadowfang Keep. He stuns with Hammer of Justice and heals himself with Holy Light.",
            roleTips = {
                tank = "Hammer of Justice stuns you for 4 sec; keep him away from the healer so he can't stun them.",
                healer = "Watch for a 4 sec stun on yourself or the tank.",
                melee = "Interrupt Holy Light every time.",
                ranged = "Interrupt Holy Light; he heals a lot.",
                dps = "Ranged: Interrupt Holy Light; he heals a lot.\nMelee: Interrupt Holy Light every time.",
            },
            abilities = {
                { id = 5588, name = "Hammer of Justice", icon = "Interface\\Icons\\spell_holy_sealofmight", desc = "Stuns the target for 4 sec." },
                { id = 1026, name = "Holy Light", icon = "Interface\\Icons\\spell_holy_holybolt", desc = "Heals himself. Interrupt it." },
            },
        },
        ["Odo the Blindwatcher"] = {
            overview = "The blind worgen sentinel perched atop the courtyard watchtower alongside bat companions.",
            roleTips = {
                tank = "Pick up Odo and his pet bats quickly on pull.",
                healer = "Watch for Blind on party members and heal through his howling enrage.",
                melee = "AoE down the pet bats first, then position behind Odo to avoid Blind and howling roars.",
                ranged = "AoE the bats down from range, staying 20+ yards back so Blind never hits you.",
                dps = "Melee: AoE down the pet bats first, then position behind Odo to avoid Blind and howling roars.\nRanged: AoE the bats down from range, staying 20+ yards back so Blind never hits you.",
            },
            abilities = {
                { id = 7481, name = "Howling Rage", icon = "Interface\\Icons\\Ability_BullRush", desc = "Increases attack speed and physical damage by 25% for 10 sec." },
            },
        },
        ["Deathsworn Captain"] = {
            overview = "A rare undead captain in the courtyard. He cleaves and hamstrings his target.",
            roleTips = {
                tank = "Face him away from the group because of Cleave.",
                healer = "Steady tank damage; nothing special.",
                melee = "Stay behind him to avoid Cleave. Hamstring slows you by 60%.",
                ranged = "Free DPS from range.",
                dps = "Ranged: Free DPS from range.\nMelee: Stay behind him to avoid Cleave. Hamstring slows you by 60%.",
            },
            abilities = {
                { id = 15496, name = "Cleave", icon = "Interface\\Icons\\ability_warrior_cleave", desc = "Hits the target and its nearest ally." },
                { id = 9080, name = "Hamstring", icon = "Interface\\Icons\\ability_shockwave", desc = "Slows the target's movement by 60% for 10 sec." },
            },
        },
        ["Fenrus the Devourer"] = {
            overview = "A massive two-headed worgen hound guarding Arugal's private sanctum. Attacks with rapid double bites and poisonous spit.",
            roleTips = {
                tank = "Hold Fenrus steady. Double Attack can cause sudden health drops.",
                healer = "Cleanse poison from party members.",
                melee = "Stay behind the hound and burn him down; step back if toxic bite stacks on you.",
                ranged = "Burn Fenrus down from max range; keep distance to avoid spreading disease.",
                dps = "Melee: Stay behind the hound and burn him down; step back if toxic bite stacks on you.\nRanged: Burn Fenrus down from max range; keep distance to avoid spreading disease.",
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
                melee = "AoE down the Lupine Horror wolves as soon as Nandos summons them; stay behind Nandos.",
                ranged = "AoE and slow the Lupine Horror wolf packs from range before they swarm the healer.",
                dps = "Melee: AoE down the Lupine Horror wolves as soon as Nandos summons them; stay behind Nandos.\nRanged: AoE and slow the Lupine Horror wolf packs from range before they swarm the healer.",
            },
            abilities = {
                { id = 7489, name = "Call Lupine Horror", icon = "Interface\\Icons\\Ability_Hunter_Pet_Wolf", desc = "Summons a pack of spectral wolves to overwhelm the party." },
            },
        },
        ["Archmage Arugal"] = {
            overview = "The mad archmage who brought the worgen to Shadowfang Keep. He teleports around the room, casts Void Bolt and turns players into worgen with Arugal's Curse.",
            roleTips = {
                tank = "He teleports with Shadow Port, so you can't hold him in one place. Thundershock stuns everyone near him for 5 sec.",
                healer = "Void Bolt hits very hard; keep everyone topped. A player under Arugal's Curse attacks the group for 10 sec.",
                melee = "Run to him after each Shadow Port. Avoid standing in Thundershock range.",
                ranged = "Interrupt Void Bolt. Spread so a cursed player hits fewer people.",
                dps = "Ranged: Interrupt Void Bolt. Spread so a cursed player hits fewer people.\nMelee: Run to him after each Shadow Port. Avoid standing in Thundershock range.",
            },
            abilities = {
                { id = 7588, name = "Void Bolt", icon = "Interface\\Icons\\spell_shadow_shadowbolt", desc = "3 sec cast. Heavy Shadow damage on one target." },
                { id = 7621, name = "Arugal's Curse", icon = "Interface\\Icons\\spell_shadow_gathershadows", desc = "Turns a player into a Shadowfang Glutton under his control for 10 sec." },
                { id = 7803, name = "Thundershock", icon = "Interface\\Icons\\spell_lightning_lightningbolt01", desc = "Nature damage to nearby enemies and stuns them for 5 sec." },
                { id = 7587, name = "Shadow Port", icon = "Interface\\Icons\\spell_shadow_antishadow", desc = "Teleports to another spot in the room." },
            },
        },
        ["Trash Drops"] = {
            overview = "Notable zone trash drops, rare recipes, and world BoEs found across the creatures in Shadowfang Keep. Clear pulls methodically and watch for patrolling mobs and runners.",
            roleTips = {
                tank = "Mark primary kill targets (Skull/X) on multi-mob pulls; pull caster packs around corners using Line-of-Sight to group them for cleave.",
                healer = "Prioritize dispelling lethal poisons, curses, and diseases; conserve mana between packs and drink whenever out of combat.",
                melee = "Kick dangerous enemy spellcasts on sight and watch for frontal cleaves or whirlwinds from humanoid and undead trash mobs.",
                ranged = "Focus the primary marked target and use crowd control (Polymorph, Freezing Trap, Sap) on dangerous humanoid pulls before engaging.",
                dps = "Melee: Kick dangerous spellcasts on sight and beware frontal cleaves.\nRanged: Focus skull marker and crowd-control dangerous humanoids.",
            },
            abilities = {
                { id = 0, name = "Line-of-Sight Pulling", icon = "Interface\\Icons\\Ability_Rogue_Sprint", desc = "Duck behind a wall or pillar after pulling ranged casters to force them to run into melee range." },
                { id = 0, name = "Fleeing Adds", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Low-health humanoids flee and aggro adjacent packs. Stun, snare, or execute them quickly." },
            },
        },

    },

    ["The Stockade"] = {
        ["Targorr the Dread"] = {
            overview = "A dual-wielding orc prisoner. Thrash gives him extra attacks and he enrages at low health.",
            roleTips = {
                tank = "Thrash and Enrage cause tank damage spikes.",
                healer = "Heal the tank through Thrash spikes, especially after Enrage.",
                melee = "Stay behind him.",
                ranged = "Free DPS; burn him once Enrage starts.",
                dps = "Ranged: Free DPS; burn him once Enrage starts.\nMelee: Stay behind him.",
            },
            abilities = {
                { id = 3391, name = "Thrash", icon = "Interface\\Icons\\ability_ghoulfrenzy", desc = "Gives him two extra attacks." },
                { id = 8599, name = "Enrage", icon = "Interface\\Icons\\spell_shadow_unholyfrenzy", desc = "Enrages at low health, hitting harder and faster." },
            },
        },
        ["Kam Deepfury"] = {
            overview = "A Dark Iron dwarf prisoner who fights with a shield. He stuns with Shield Slam and blocks often.",
            roleTips = {
                tank = "Shield Slam stuns you for 2 sec.",
                healer = "Low damage fight.",
                melee = "Improved Blocking makes him block often; attack from behind.",
                ranged = "Spells and ranged attacks can't be blocked.",
                dps = "Ranged: Spells and ranged attacks can't be blocked.\nMelee: Improved Blocking makes him block often; attack from behind.",
            },
            abilities = {
                { id = 8242, name = "Shield Slam", icon = "Interface\\Icons\\ability_warrior_shieldbash", desc = "Damage and a 2 sec stun." },
                { id = 3419, name = "Improved Blocking", icon = "Interface\\Icons\\spell_fire_firearmor", desc = "Raises his block chance by 75% for 6 sec." },
            },
        },
        ["Hamhock"] = {
            overview = "An ogre shaman prisoner. He casts Chain Lightning and buffs himself with Bloodlust.",
            roleTips = {
                tank = "Bloodlust raises his attack speed by 30% for 30 sec.",
                healer = "Chain Lightning jumps between players; keep everyone topped.",
                melee = "Interrupt Chain Lightning.",
                ranged = "Spread out so Chain Lightning hits fewer players. Interrupt it.",
                dps = "Ranged: Spread out so Chain Lightning hits fewer players. Interrupt it.\nMelee: Interrupt Chain Lightning.",
            },
            abilities = {
                { id = 421, name = "Chain Lightning", icon = "Interface\\Icons\\spell_nature_chainlightning", desc = "Lightning that jumps to nearby enemies." },
                { id = 6742, name = "Bloodlust", icon = "Interface\\Icons\\spell_nature_bloodlust", desc = "Attack speed increased by 30% for 30 sec." },
            },
        },
        ["Dextren Ward"] = {
            overview = "A human prisoner who fears the group with Intimidating Shout.",
            roleTips = {
                tank = "Intimidating Shout can fear you and nearby players; be ready to pick him back up.",
                healer = "Players near him get feared; Fear Ward or a tremor totem helps.",
                melee = "Stand away from other players so fewer get feared.",
                ranged = "Stay at range to avoid the fear.",
                dps = "Ranged: Stay at range to avoid the fear.\nMelee: Stand away from other players so fewer get feared.",
            },
            abilities = {
                { id = 19134, name = "Intimidating Shout", icon = "Interface\\Icons\\ability_golemthunderclap", desc = "Paralyzes the target with fear for 8 sec and fears other nearby enemies." },
                { id = 11976, name = "Strike", icon = "Interface\\Icons\\ability_rogue_ambush", desc = "Weapon strike." },
            },
        },
        ["Bazil Thredd"] = {
            overview = "The Defias leader inside the Stockade. He stuns everyone nearby with Smoke Bomb.",
            roleTips = {
                tank = "Smoke Bomb stuns everyone near him for 4 sec.",
                healer = "Expect a 4 sec stun on melee players.",
                melee = "Smoke Bomb stuns melee; be at full health.",
                ranged = "Stay at range so Smoke Bomb doesn't reach you.",
                dps = "Ranged: Stay at range so Smoke Bomb doesn't reach you.\nMelee: Smoke Bomb stuns melee; be at full health.",
            },
            abilities = {
                { id = 7964, name = "Smoke Bomb", icon = "Interface\\Icons\\ability_hibernation", desc = "Stuns nearby enemies for 4 sec." },
                { id = 9128, name = "Battle Shout", icon = "Interface\\Icons\\ability_warrior_battleshout", desc = "Raises his group's attack power." },
            },
        },
        ["Bruegal Ironknuckle"] = {
            overview = "A rare Dark Iron pugilist roaming the cell corridors with reinforced knuckles.",
            roleTips = {
                tank = "Watch for Concussion Blow which stuns for 5 sec.",
                healer = "When the tank is stunned, be ready to shield or heal whoever takes aggro.",
                melee = "Stay behind Bruegal; watch for sudden threat drops and stun on enrage.",
                ranged = "Burn Bruegal down quickly from range; simple physical fight.",
                dps = "Melee: Stay behind Bruegal; watch for sudden threat drops and stun on enrage.\nRanged: Burn Bruegal down quickly from range; simple physical fight.",
            },
            abilities = {
                { id = 12809, name = "Concussion Blow", icon = "Interface\\Icons\\Ability_ThunderBolt", desc = "Stuns the target for 5 sec and deals physical damage." },
            },
        },
        ["Trash Drops"] = {
            overview = "Notable zone trash drops, rare recipes, and world BoEs found across the creatures in The Stockade. Clear pulls methodically and watch for patrolling mobs and runners.",
            roleTips = {
                tank = "Mark primary kill targets (Skull/X) on multi-mob pulls; pull caster packs around corners using Line-of-Sight to group them for cleave.",
                healer = "Prioritize dispelling lethal poisons, curses, and diseases; conserve mana between packs and drink whenever out of combat.",
                melee = "Kick dangerous enemy spellcasts on sight and watch for frontal cleaves or whirlwinds from humanoid and undead trash mobs.",
                ranged = "Focus the primary marked target and use crowd control (Polymorph, Freezing Trap, Sap) on dangerous humanoid pulls before engaging.",
                dps = "Melee: Kick dangerous spellcasts on sight and beware frontal cleaves.\nRanged: Focus skull marker and crowd-control dangerous humanoids.",
            },
            abilities = {
                { id = 0, name = "Line-of-Sight Pulling", icon = "Interface\\Icons\\Ability_Rogue_Sprint", desc = "Duck behind a wall or pillar after pulling ranged casters to force them to run into melee range." },
                { id = 0, name = "Fleeing Adds", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Low-health humanoids flee and aggro adjacent packs. Stun, snare, or execute them quickly." },
            },
        },

    },

    ["Blackfathom Deeps"] = {
        ["Ghamoo-ra"] = {
            overview = "A giant turtle in the first flooded cavern. He has very high armor and tramples everyone near him.",
            roleTips = {
                tank = "Simple tank and spank. Trample hits everyone close to him.",
                healer = "Easy fight; heal the tank and anyone in melee.",
                melee = "Trample hits melee. Use armor-ignoring or spell damage if you have it; his armor is high.",
                ranged = "Spell damage works well against his armor.",
                dps = "Ranged: Spell damage works well against his armor.\nMelee: Trample hits melee. Use armor-ignoring or spell damage if you have it; his armor is high.",
            },
            abilities = {
                { id = 5568, name = "Trample", icon = "Interface\\Icons\\spell_nature_natureswrath", desc = "Physical damage to nearby enemies." },
            },
        },
        ["Lady Sarevess"] = {
            overview = "A naga leader with two guards. She casts Forked Lightning in a cone, freezes players with Frost Nova and slows them, and shoots from range.",
            roleTips = {
                tank = "Turn her away from the group because of Forked Lightning. Pick up her two guards.",
                healer = "Frost Nova roots everyone near her for up to 8 sec; Slow cuts movement and attack speed.",
                melee = "Stay behind her and move out after a Frost Nova.",
                ranged = "Kill or control her guards first. Interrupt Forked Lightning.",
                dps = "Ranged: Kill or control her guards first. Interrupt Forked Lightning.\nMelee: Stay behind her and move out after a Frost Nova.",
            },
            abilities = {
                { id = 8435, name = "Forked Lightning", icon = "Interface\\Icons\\spell_nature_chainlightning", desc = "Nature damage to enemies in a cone in front of her." },
                { id = 865, name = "Frost Nova", icon = "Interface\\Icons\\spell_frost_frostnova", desc = "Frost damage to nearby enemies and roots them for up to 8 sec." },
                { id = 246, name = "Slow", icon = "Interface\\Icons\\spell_nature_slow", desc = "Slows the target's movement and attack speed for 10 sec." },
                { id = 6660, name = "Shoot", icon = "Interface\\Icons\\ability_marksmanship", desc = "Ranged attack." },
            },
        },
        ["Gelihast"] = {
            overview = "The murloc leader in the Blackfathom tunnels. He throws a Net to root players in place.",
            roleTips = {
                tank = "Easy tank fight; clear the murlocs nearby before you pull.",
                healer = "Net roots a player for 10 sec; nothing to heal through.",
                melee = "Net can root you; move back in when it ends.",
                ranged = "Free DPS.",
                dps = "Ranged: Free DPS.\nMelee: Net can root you; move back in when it ends.",
            },
            abilities = {
                { id = 6533, name = "Net", icon = "Interface\\Icons\\ability_ensnare", desc = "Roots one enemy for 10 sec." },
            },
        },
        ["Lorgus Jett"] = {
            overview = "A Twilight's Hammer shaman who patrols with cultists. He casts Lightning Bolt and protects himself with Lightning Shield.",
            roleTips = {
                tank = "He usually comes with adds; pick them up.",
                healer = "Lightning Bolt hits whoever he targets.",
                melee = "Lightning Shield damages whoever hits him; kill him quickly or purge it.",
                ranged = "Interrupt Lightning Bolt.",
                dps = "Ranged: Interrupt Lightning Bolt.\nMelee: Lightning Shield damages whoever hits him; kill him quickly or purge it.",
            },
            abilities = {
                { id = 12167, name = "Lightning Bolt", icon = "Interface\\Icons\\spell_nature_lightning", desc = "Nature damage on one target." },
                { id = 12550, name = "Lightning Shield", icon = "Interface\\Icons\\spell_nature_lightningshield", desc = "Balls of lightning that damage attackers." },
            },
        },
        ["Baron Aquanis"] = {
            overview = "A corrupted water elemental summoned at the submerged altar by interacting with the Strange Water Globe.",
            roleTips = {
                tank = "Keep Aquanis faced away from the water platform. Watch for Tidal Wave knockbacks.",
                healer = "Frost Resistance helps absorb Frostbolt damage.",
                melee = "Stay close to the water platform edge; interrupt [Frostbolt] whenever possible.",
                ranged = "Interrupt [Frostbolt] from range and stay spaced to avoid chained water damage.",
                dps = "Melee: Stay close to the water platform edge; interrupt [Frostbolt] whenever possible.\nRanged: Interrupt [Frostbolt] from range and stay spaced to avoid chained water damage.",
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
                melee = "Swim down behind Serra'kis and burn him down quickly to avoid prolonged underwater combat.",
                ranged = "Cast from the water surface or platform; keep track of your Breath bar.",
                dps = "Melee: Swim down behind Serra'kis and burn him down quickly to avoid prolonged underwater combat.\nRanged: Cast from the water surface or platform; keep track of your Breath bar.",
            },
            abilities = {
                { id = 9591, name = "Acid Spit", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Spits corrosive bile, dealing Nature damage and reducing armor." },
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
            overview = "The hydra servant of the Old Gods at the bottom of Blackfathom Deeps. He fills the area with Poison Cloud and goes into short bursts of Frenzied Rage.",
            roleTips = {
                tank = "Frenzied Rage raises his attack speed by 75% for 5 sec; use a defensive cooldown when it starts.",
                healer = "Poison Cloud deals Nature damage every 5 sec for 45 sec to everyone near him; curing poison helps.",
                melee = "Poison Cloud hits everyone close to him; watch your health.",
                ranged = "Stay back from the boss to avoid most of Poison Cloud.",
                dps = "Ranged: Stay back from the boss to avoid most of Poison Cloud.\nMelee: Poison Cloud hits everyone close to him; watch your health.",
            },
            abilities = {
                { id = 3815, name = "Poison Cloud", icon = "Interface\\Icons\\spell_nature_regenerate", desc = "Nature damage to nearby enemies every 5 sec for 45 sec." },
                { id = 3490, name = "Frenzied Rage", icon = "Interface\\Icons\\spell_shadow_unholyfrenzy", desc = "Attack speed increased by 75% for 5 sec." },
            },
        },
        ["Trash Drops"] = {
            overview = "Notable zone trash drops, rare recipes, and world BoEs found across the creatures in Blackfathom Deeps. Clear pulls methodically and watch for patrolling mobs and runners.",
            roleTips = {
                tank = "Mark primary kill targets (Skull/X) on multi-mob pulls; pull caster packs around corners using Line-of-Sight to group them for cleave.",
                healer = "Prioritize dispelling lethal poisons, curses, and diseases; conserve mana between packs and drink whenever out of combat.",
                melee = "Kick dangerous enemy spellcasts on sight and watch for frontal cleaves or whirlwinds from humanoid and undead trash mobs.",
                ranged = "Focus the primary marked target and use crowd control (Polymorph, Freezing Trap, Sap) on dangerous humanoid pulls before engaging.",
                dps = "Melee: Kick dangerous spellcasts on sight and beware frontal cleaves.\nRanged: Focus skull marker and crowd-control dangerous humanoids.",
            },
            abilities = {
                { id = 0, name = "Line-of-Sight Pulling", icon = "Interface\\Icons\\Ability_Rogue_Sprint", desc = "Duck behind a wall or pillar after pulling ranged casters to force them to run into melee range." },
                { id = 0, name = "Fleeing Adds", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Low-health humanoids flee and aggro adjacent packs. Stun, snare, or execute them quickly." },
            },
        },

    },

    ["Excavation Site: Wetlands"] = {
        ["Saltspine"] = {
            overview = "First boss; patrols the edge of the crocolisk lake in Lost Marsh. Dangerous if pulled with other mobs.",
            roleTips = {
                tank = "Dust Storm lowers your threat and Fatal Bite and Tendon Rip hit hard. Pull him alone.",
                healer = "Dust Storm and the slow hit several targets; watch more than the tank.",
                melee = "You will miss more during Dust Storm; keep attacking.",
                ranged = "Stay away to avoid Dust Storm.",
                dps = "Ranged: Stay away to avoid Dust Storm.\nMelee: You will miss more during Dust Storm; keep attacking.",
            },
            abilities = {
                { id = 0, name = "Dust Storm", icon = "Interface\\Icons\\Spell_Nature_Cyclone", desc = "AoE damage that lowers attack accuracy and reduces the tank's threat." },
                { id = 0, name = "Fatal Bite", icon = "Interface\\Icons\\Ability_Druid_Rake", desc = "Heavy bite on the target." },
                { id = 0, name = "Tendon Rip", icon = "Interface\\Icons\\Ability_Warrior_Sunder", desc = "Slows its target." },
            },
        },
        ["Shadetooth"] = {
            overview = "Second boss; patrols the raptor path in Stalker's Thicket with two Thicket Hunters.",
            roleTips = {
                tank = "Raptors in the tall grass call for help; clear them first. Rend does 77 every 3 sec. Use defensives at 20% enrage.",
                healer = "Save mana for the 20% Enrage. Dispel fear fast to avoid aggroing extra packs.",
                melee = "Kill the Thicket Hunters first.",
                ranged = "Spread out to limit Terrifying Roar; kill the Hunters first.",
                dps = "Ranged: Spread out to limit Terrifying Roar; kill the Hunters first.\nMelee: Kill the Thicket Hunters first.",
            },
            abilities = {
                { id = 0, name = "Terrifying Roar", icon = "Interface\\Icons\\Ability_Druid_Challangingroar", desc = "AoE fear that can scatter you into hidden raptors. Tremor Totem or Fear Ward helps." },
                { id = 0, name = "Rend", icon = "Interface\\Icons\\Ability_Gouge", desc = "Bleed on the tank, 77 physical damage every 3 sec." },
                { id = 0, name = "Enrage", icon = "Interface\\Icons\\Ability_Druid_Enrage", desc = "At 20% health: +30% attack speed and +15 physical damage." },
            },
        },
        ["Highland Horror"] = {
            overview = "Optional Alliance quest boss north of the Lost Dig Site, surrounded by Oil Slimes. Drops only the quest item.",
            roleTips = {
                tank = "Avoid pulling the slimes. Position so the roots do not catch you.",
                healer = "Roots last a long time; be ready to heal through them.",
                melee = "Kill quickly and take the quest item.",
                ranged = "Interrupt Wild Regeneration.",
                dps = "Ranged: Interrupt Wild Regeneration.\nMelee: Kill quickly and take the quest item.",
            },
            abilities = {
                { id = 0, name = "Entangling Roots", icon = "Interface\\Icons\\Spell_Nature_StrangleVines", desc = "AoE roots with a long duration." },
                { id = 0, name = "Wild Regeneration", icon = "Interface\\Icons\\Spell_Nature_Rejuvenation", desc = "Self-heal. Can be interrupted." },
            },
        },
        ["Relic Guardian"] = {
            overview = "Final boss in the Site of the Guardian. Activate it from the Titan control panel beside it. Level 31, so misses and dodges raise threat difficulty.",
            roleTips = {
                tank = "Face him away from the group. Do not tank near an edge. Use defensives; he can be kited with slows.",
                healer = "Tank and healer check: manage mana and cooldowns.",
                melee = "Stay clear of the knockback and War Stomp.",
                ranged = "Stay away from War Stomp; slow him with Concussive Shot or Earthbind Totem if needed.",
                dps = "Ranged: Stay away from War Stomp; slow him with Concussive Shot or Earthbind Totem if needed.\nMelee: Stay clear of the knockback and War Stomp.",
            },
            abilities = {
                { id = 0, name = "Thunderclap", icon = "Interface\\Icons\\Spell_Nature_ThunderClap", desc = "Slows attack speed of everyone around him." },
                { id = 0, name = "Arcing Smash", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Frontal cleave. Face him away from the group." },
                { id = 0, name = "Knockaway", icon = "Interface\\Icons\\Ability_UpgradeMoonGlaive", desc = "Single-target knockback that reduces threat." },
                { id = 0, name = "War Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "AoE knockback and stun." },
            },
        },
    },

    ["City of Dalaran"] = {
        ["Atrexis the Grave Knight"] = {
            overview = "Patrols with three Kirin Tor Necromancers; kill a couple before pulling him.",
            roleTips = {
                tank = "He hits hard. Pick up Raise Dead skeletons; Disarm hits the primary threat target.",
                healer = "Heal the tank through Unholy Frenzy, Thrash and Strike.",
                melee = "Kill the first adds, then focus the boss.",
                ranged = "Kill the first adds, then focus the boss. Purge Unholy Frenzy if you can.",
                dps = "Ranged: Kill the first adds, then focus the boss. Purge Unholy Frenzy if you can.\nMelee: Kill the first adds, then focus the boss.",
            },
            abilities = {
                { id = 0, name = "Disarm", icon = "Interface\\Icons\\Ability_Warrior_Disarm", desc = "Disarms the primary threat target." },
                { id = 0, name = "Raise Dead", icon = "Interface\\Icons\\Spell_Shadow_AnimateDead", desc = "Cast repeatedly until killed; summons skeletons." },
                { id = 0, name = "Thrash", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Extra auto-attacks." },
                { id = 0, name = "Strike", icon = "Interface\\Icons\\Ability_MeleeDamage", desc = "Instant damage." },
                { id = 0, name = "Unholy Frenzy", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Buffs him and nearby allies. Purgeable." },
            },
        },
        ["Arcane Anomaly"] = {
            overview = "Found in Krasus Landing. Heavy physical hitter with a sweeping beam.",
            roleTips = {
                tank = "Arcane Bolt hits for about 500. Face him away; keep the party behind him.",
                healer = "Heavy tank damage plus Focal Blast raid damage.",
                melee = "Stay behind him; run around the beam.",
                ranged = "Stay behind him; run around the beam.",
                dps = "Ranged: Stay behind him; run around the beam.\nMelee: Stay behind him; run around the beam.",
            },
            abilities = {
                { id = 0, name = "Arcane Bolt", icon = "Interface\\Icons\\Spell_Arcane_Arcane03", desc = "Arcane damage on the tank, about 500." },
                { id = 0, name = "Focal Blast", icon = "Interface\\Icons\\Spell_Arcane_ArcaneTorrent", desc = "3-sec channeled beam that sweeps clockwise or counterclockwise." },
            },
        },
        ["Fel Ancient"] = {
            overview = "Center of Dalaran City. Talk to Grindle Firespark to remove the barriers first.",
            roleTips = {
                tank = "Get out of the pools; use Blessing of Freedom if rooted.",
                healer = "Heal through Entangle and Fel Timbers.",
                melee = "Move out of the green pools quickly.",
                ranged = "Move out of the green pools quickly.",
                dps = "Ranged: Move out of the green pools quickly.\nMelee: Move out of the green pools quickly.",
            },
            abilities = {
                { id = 0, name = "Entangle", icon = "Interface\\Icons\\Spell_Nature_StrangleVines", desc = "Roots players for 10 sec and deals damage." },
                { id = 0, name = "Fel Timbers", icon = "Interface\\Icons\\Spell_Shadow_RainOfFire", desc = "Green pools on the ground that damage anyone standing in them." },
            },
        },
        ["Unstable Sentinel"] = {
            overview = "Found in the trade area. A tank and healer fight.",
            roleTips = {
                tank = "Face him away from the group; Arcing Smash cleaves everyone in front.",
                healer = "Tank takes heavy damage.",
                melee = "Leave the area when Malfunction pulses; stun him before it starts.",
                ranged = "Avoid Malfunction (25 yards); stun him before it starts.",
                dps = "Ranged: Avoid Malfunction (25 yards); stun him before it starts.\nMelee: Leave the area when Malfunction pulses; stun him before it starts.",
            },
            abilities = {
                { id = 0, name = "Arcing Smash", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Frontal cleave hitting all targets." },
                { id = 0, name = "Malfunction", icon = "Interface\\Icons\\Spell_Fire_Fireball02", desc = "Pulsing AoE hitting anyone within 25 yards." },
            },
        },
        ["Mana Devourer"] = {
            overview = "Violet Hold. Clear the whole room first; anything left alive joins the fight.",
            roleTips = {
                tank = "Drain Vitality is a DoT on you; keep threat.",
                healer = "Healing check. Debilitate hits everyone and drains 200 mana.",
                melee = "Kill him before your group runs out of mana.",
                ranged = "Casters lose 200 mana to Debilitate; burn him quickly.",
                dps = "Ranged: Casters lose 200 mana to Debilitate; burn him quickly.\nMelee: Kill him before your group runs out of mana.",
            },
            abilities = {
                { id = 0, name = "Drain Vitality", icon = "Interface\\Icons\\Spell_Shadow_LifeDrain02", desc = "Arcane damage over time on the primary threat target." },
                { id = 0, name = "Debilitate", icon = "Interface\\Icons\\Spell_Shadow_SiphonMana", desc = "Arcane damage to everyone and drains 200 mana from all players." },
            },
        },
        ["Arcanic Enigma"] = {
            overview = "Southern bank garden area. Starts with two Mana Phantoms and summons Manalings.",
            roleTips = {
                tank = "Pick up the Manalings; keep the Phantoms from casting Mana Burn.",
                healer = "Dispel Manamorph. Mana Burn drains mana from casters.",
                melee = "Kill the Mana Phantoms first.",
                ranged = "Stay away to avoid the AoE Silence; kill the Phantoms first.",
                dps = "Ranged: Stay away to avoid the AoE Silence; kill the Phantoms first.\nMelee: Kill the Mana Phantoms first.",
            },
            abilities = {
                { id = 0, name = "Mana Burn", icon = "Interface\\Icons\\Spell_Shadow_ManaBurn", desc = "Cast by the Mana Phantoms. Interrupt and stun." },
                { id = 0, name = "Manamorph", icon = "Interface\\Icons\\Spell_Nature_Polymorph", desc = "Dispellable polymorph on random targets. Does not work on cat form druids." },
                { id = 0, name = "Silence", icon = "Interface\\Icons\\Spell_Holy_Silence", desc = "AoE silence around him." },
                { id = 0, name = "Summon Manalings", icon = "Interface\\Icons\\Spell_Arcane_Arcane04", desc = "Adds throughout the fight." },
            },
        },
        ["Lyn the Ignored"] = {
            overview = "Secret boss, summoned with the Tome of Dalaran. Keeps raising dead.",
            roleTips = {
                tank = "Manage the skeletons. Curse of Thorns damages you when you deal damage.",
                healer = "Remove Curse of Thorns; Shadow Bolt Volley hits everyone.",
                melee = "Kill skeletons that pull off the tank.",
                ranged = "Kill skeletons; avoid pulling threat.",
                dps = "Ranged: Kill skeletons; avoid pulling threat.\nMelee: Kill skeletons that pull off the tank.",
            },
            abilities = {
                { id = 0, name = "Raise Dead", icon = "Interface\\Icons\\Spell_Shadow_AnimateDead", desc = "Continuously summons skeletons." },
                { id = 0, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Shadow damage to everyone." },
                { id = 0, name = "Curse of Thorns", icon = "Interface\\Icons\\Spell_Nature_CurseOfThorns", desc = "Damages the tank when they deal damage. Decurse if possible." },
            },
        },
        ["Shade of the Archmage"] = {
            overview = "Final boss; reached through the portal to the Purple Parlor after speaking to Archmage Modela. Resembles Aran from Karazhan.",
            roleTips = {
                tank = "Arcane Bolt hits very hard. Move him away from where Bounding Mana was cast.",
                healer = "Heavy tank damage; Arcane Explosion after the sphere returns.",
                melee = "Stay outside 20 yards of the sphere's return point.",
                ranged = "Spread out; break the polymorph if you can.",
                dps = "Ranged: Spread out; break the polymorph if you can.\nMelee: Stay outside 20 yards of the sphere's return point.",
            },
            abilities = {
                { id = 0, name = "Arcane Bolt", icon = "Interface\\Icons\\Spell_Arcane_Arcane03", desc = "Intense arcane damage on the tank." },
                { id = 0, name = "Bounding Mana", icon = "Interface\\Icons\\Spell_Arcane_ManaTap", desc = "Mana sphere that moves outward and returns to its origin." },
                { id = 0, name = "Arcane Explosion", icon = "Interface\\Icons\\Spell_Nature_WispSplode", desc = "Hits anyone within 20 yards after the sphere returns." },
                { id = 0, name = "Mass Polymorph", icon = "Interface\\Icons\\Spell_Nature_Polymorph", desc = "At 0 mana, polymorphs the party, then casts Evocation to restore mana." },
            },
        },
        ["Trash Drops"] = {
            overview = "Notable zone trash drops, rare recipes, and world BoEs found across the creatures in City of Dalaran. Clear pulls methodically and watch for patrolling mobs and runners.",
            roleTips = {
                tank = "Mark primary kill targets (Skull/X) on multi-mob pulls; pull caster packs around corners using Line-of-Sight to group them for cleave.",
                healer = "Prioritize dispelling lethal poisons, curses, and diseases; conserve mana between packs and drink whenever out of combat.",
                melee = "Kick dangerous enemy spellcasts on sight and watch for frontal cleaves or whirlwinds from humanoid and undead trash mobs.",
                ranged = "Focus the primary marked target and use crowd control (Polymorph, Freezing Trap, Sap) on dangerous humanoid pulls before engaging.",
                dps = "Melee: Kick dangerous spellcasts on sight and beware frontal cleaves.\nRanged: Focus skull marker and crowd-control dangerous humanoids.",
            },
            abilities = {
                { id = 0, name = "Line-of-Sight Pulling", icon = "Interface\\Icons\\Ability_Rogue_Sprint", desc = "Duck behind a wall or pillar after pulling ranged casters to force them to run into melee range." },
                { id = 0, name = "Fleeing Adds", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Low-health humanoids flee and aggro adjacent packs. Stun, snare, or execute them quickly." },
            },
        },

    },

    ["Gnomeregan"] = {
        ["Grubbis"] = {
            overview = "A mutant trogg chieftain who dug through the deepest ventilation tunnels beneath the Workshop. Accompanied by his loyal basilisk pet, Chomper.",
            roleTips = {
                tank = "Hold Grubbis and Chomper together. Have DPS kill Chomper first or off-tank to avoid Petrifying Gaze.",
                healer = "Dispel Basilisk Stun from party members. Watch for sudden tank spikes when Grubbis enrages.",
                melee = "Burn Chomper down first to remove [Petrifying Gaze], then focus Grubbis from behind.",
                ranged = "Focus down Chomper from range while avoiding basilisk gaze, then burn Grubbis.",
                dps = "Melee: Burn Chomper down first to remove [Petrifying Gaze], then focus Grubbis from behind.\nRanged: Focus down Chomper from range while avoiding basilisk gaze, then burn Grubbis.",
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
                melee = "Step back or focus-fire Irradiated Slime adds before they reach melee range.",
                ranged = "Slow and AoE down the Irradiated Slime adds from range before they reach the party.",
                dps = "Melee: Step back or focus-fire Irradiated Slime adds before they reach melee range.\nRanged: Slow and AoE down the Irradiated Slime adds from range before they reach the party.",
            },
            abilities = {
                { id = 0, name = "Radioactive Aura", icon = "Interface\\Icons\\Spell_Shadow_CreepingPlague", desc = "Deals periodic Nature damage to all players within 20 yards and reduces healing received." },
                { id = 3815, name = "Poison Cloud", icon = "Interface\\Icons\\Spell_Nature_AbolishPoison", desc = "Expels a venomous green haze that damages anyone standing inside." },
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
            overview = "A goblin-built war machine. It smashes everything in front of it, tramples nearby players and interrupts casters with Crowd Pummel.",
            roleTips = {
                tank = "Face it away from the group because of Arcing Smash.",
                healer = "Crowd Pummel interrupts spellcasting near it for 5 sec; stay out of melee range.",
                melee = "Stand behind it. Trample and Crowd Pummel hit everyone close.",
                ranged = "Keep your distance; Crowd Pummel interrupts spells.",
                dps = "Ranged: Keep your distance; Crowd Pummel interrupts spells.\nMelee: Stand behind it. Trample and Crowd Pummel hit everyone close.",
            },
            abilities = {
                { id = 8374, name = "Arcing Smash", icon = "Interface\\Icons\\ability_warrior_cleave", desc = "Damages enemies in a cone in front of it." },
                { id = 5568, name = "Trample", icon = "Interface\\Icons\\spell_nature_natureswrath", desc = "Physical damage to nearby enemies." },
                { id = 10887, name = "Crowd Pummel", icon = "Interface\\Icons\\inv_gauntlets_04", desc = "Damages nearby enemies and can interrupt spellcasting for 5 sec." },
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
            overview = "A rare Dark Iron mage. He casts Fireball, shields himself with fire and summons a Burning Servant and Embers.",
            roleTips = {
                tank = "Pick up the Burning Servant and Embers when they appear.",
                healer = "Fireball hits hard; Fire Shield damages melee.",
                melee = "Fire Shield burns whoever hits him; kill the summons quickly.",
                ranged = "Interrupt Fireball. Help kill the Embers.",
                dps = "Ranged: Interrupt Fireball. Help kill the Embers.\nMelee: Fire Shield burns whoever hits him; kill the summons quickly.",
            },
            abilities = {
                { id = 9053, name = "Fireball", icon = "Interface\\Icons\\spell_fire_flamebolt", desc = "Fire damage on one target." },
                { id = 184, name = "Fire Shield", icon = "Interface\\Icons\\spell_fire_immolation", desc = "A fire shield that damages nearby enemies." },
                { id = 10870, name = "Summon Burning Servant", icon = "Interface\\Icons\\spell_fire_fire", desc = "Summons a Burning Servant." },
                { id = 10869, name = "Summon Embers", icon = "Interface\\Icons\\spell_fire_fire", desc = "Summons 3 Embers for 1 min." },
            },
        },
        ["Trash Drops"] = {
            overview = "Notable zone trash drops, rare recipes, and world BoEs found across the creatures in Gnomeregan. Clear pulls methodically and watch for patrolling mobs and runners.",
            roleTips = {
                tank = "Mark primary kill targets (Skull/X) on multi-mob pulls; pull caster packs around corners using Line-of-Sight to group them for cleave.",
                healer = "Prioritize dispelling lethal poisons, curses, and diseases; conserve mana between packs and drink whenever out of combat.",
                melee = "Kick dangerous enemy spellcasts on sight and watch for frontal cleaves or whirlwinds from humanoid and undead trash mobs.",
                ranged = "Focus the primary marked target and use crowd control (Polymorph, Freezing Trap, Sap) on dangerous humanoid pulls before engaging.",
                dps = "Melee: Kick dangerous spellcasts on sight and beware frontal cleaves.\nRanged: Focus skull marker and crowd-control dangerous humanoids.",
            },
            abilities = {
                { id = 0, name = "Line-of-Sight Pulling", icon = "Interface\\Icons\\Ability_Rogue_Sprint", desc = "Duck behind a wall or pillar after pulling ranged casters to force them to run into melee range." },
                { id = 0, name = "Fleeing Adds", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Low-health humanoids flee and aggro adjacent packs. Stun, snare, or execute them quickly." },
            },
        },

    },

    ["Razorfen Kraul"] = {
        ["Roogug"] = {
            overview = "A quilboar geomancer who casts Lightning Bolt and summons a Stone Rumbler.",
            roleTips = {
                tank = "Pick up the Stone Rumbler he summons.",
                healer = "Steady damage from Lightning Bolt.",
                melee = "Kill Roogug or control the Rumbler.",
                ranged = "Interrupt Lightning Bolt.",
                dps = "Ranged: Interrupt Lightning Bolt.\nMelee: Kill Roogug or control the Rumbler.",
            },
            abilities = {
                { id = 9532, name = "Lightning Bolt", icon = "Interface\\Icons\\spell_nature_lightning", desc = "Nature damage on one target." },
                { id = 8270, name = "Summon Earth Rumbler", icon = "Interface\\Icons\\spell_nature_earthquake", desc = "Summons a Stone Rumbler." },
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
            overview = "A quilboar priest who casts Shadow Bolt and mind controls players with Dominate Mind.",
            roleTips = {
                tank = "Dominate Mind can take a player for 15 sec; don't kill them.",
                healer = "A mind-controlled player attacks the group; crowd control them instead of killing them.",
                melee = "Stun or crowd control mind-controlled players.",
                ranged = "Interrupt Dominate Mind and Shadow Bolt.",
                dps = "Ranged: Interrupt Dominate Mind and Shadow Bolt.\nMelee: Stun or crowd control mind-controlled players.",
            },
            abilities = {
                { id = 14515, name = "Dominate Mind", icon = "Interface\\Icons\\spell_shadow_shadowworddominate", desc = "Takes control of a player for 15 sec." },
                { id = 9613, name = "Shadow Bolt", icon = "Interface\\Icons\\spell_shadow_shadowbolt", desc = "Shadow damage on one target." },
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
            overview = "The leader of Razorfen Kraul. She casts Chain Bolt, becomes immune with Purity, heals with Renew and restores her mana with Mana Spike.",
            roleTips = {
                tank = "Clear her adds first or tank them away from her.",
                healer = "Chain Bolt jumps between up to 3 players.",
                melee = "Purity makes her immune to everything for 2 sec; wait it out.",
                ranged = "Spread out for Chain Bolt and interrupt it. Dispel Renew.",
                dps = "Ranged: Spread out for Chain Bolt and interrupt it. Dispel Renew.\nMelee: Purity makes her immune to everything for 2 sec; wait it out.",
            },
            abilities = {
                { id = 8292, name = "Chain Bolt", icon = "Interface\\Icons\\spell_nature_chainlightning", desc = "Lightning that jumps to up to 3 targets." },
                { id = 8361, name = "Purity", icon = "Interface\\Icons\\spell_holy_holybolt", desc = "Immune to all attacks and spells for 2 sec." },
                { id = 6077, name = "Renew", icon = "Interface\\Icons\\spell_holy_renew", desc = "Heals over 15 sec. Dispel it." },
                { id = 8358, name = "Mana Spike", icon = "Interface\\Icons\\spell_holy_heal", desc = "Restores her mana." },
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
            overview = "A rare quilboar shaman. He casts Lightning Bolt, summons a Stone Rumbler and drops an Earthbind Totem.",
            roleTips = {
                tank = "Pick up the Stone Rumbler.",
                healer = "Light damage fight.",
                melee = "Kill the Earthbind Totem; it slows you.",
                ranged = "Interrupt Lightning Bolt and kill the totem.",
                dps = "Ranged: Interrupt Lightning Bolt and kill the totem.\nMelee: Kill the Earthbind Totem; it slows you.",
            },
            abilities = {
                { id = 9532, name = "Lightning Bolt", icon = "Interface\\Icons\\spell_nature_lightning", desc = "Nature damage on one target." },
                { id = 8270, name = "Summon Earth Rumbler", icon = "Interface\\Icons\\spell_nature_earthquake", desc = "Summons a Stone Rumbler." },
                { id = 2484, name = "Earthbind Totem", icon = "Interface\\Icons\\spell_nature_strengthofearthtotem02", desc = "A totem that slows nearby enemies. Kill it." },
            },
        },
        ["Trash Drops"] = {
            overview = "Notable zone trash drops, rare recipes, and world BoEs found across the creatures in Razorfen Kraul. Clear pulls methodically and watch for patrolling mobs and runners.",
            roleTips = {
                tank = "Mark primary kill targets (Skull/X) on multi-mob pulls; pull caster packs around corners using Line-of-Sight to group them for cleave.",
                healer = "Prioritize dispelling lethal poisons, curses, and diseases; conserve mana between packs and drink whenever out of combat.",
                melee = "Kick dangerous enemy spellcasts on sight and watch for frontal cleaves or whirlwinds from humanoid and undead trash mobs.",
                ranged = "Focus the primary marked target and use crowd control (Polymorph, Freezing Trap, Sap) on dangerous humanoid pulls before engaging.",
                dps = "Melee: Kick dangerous spellcasts on sight and beware frontal cleaves.\nRanged: Focus skull marker and crowd-control dangerous humanoids.",
            },
            abilities = {
                { id = 0, name = "Line-of-Sight Pulling", icon = "Interface\\Icons\\Ability_Rogue_Sprint", desc = "Duck behind a wall or pillar after pulling ranged casters to force them to run into melee range." },
                { id = 0, name = "Fleeing Adds", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Low-health humanoids flee and aggro adjacent packs. Stun, snare, or execute them quickly." },
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
                melee = "AoE down the Crypt Crawler adds quickly, then resume single-target burn on Azshir.",
                ranged = "AoE the Crypt Crawler swarms down from range before they overwhelm the healer.",
                dps = "Melee: AoE down the Crypt Crawler adds quickly, then resume single-target burn on Azshir.\nRanged: AoE the Crypt Crawler swarms down from range before they overwhelm the healer.",
            },
            abilities = {
                { id = 7399, name = "Terrify", icon = "Interface\\Icons\\Spell_Shadow_PsychicScream", desc = "Lets out a horrifying scream, causing all players within 10 yards to flee in terror for 4 sec." },
                { id = 0, name = "Call Crypt Ghouls", icon = "Interface\\Icons\\Spell_Shadow_RaiseDead", desc = "Summons 2 skeletal fiends from surrounding sarcophagi to attack the party." },
            },
        },
        ["Fallen Champion"] = {
            overview = "A rare undead champion in the Graveyard. He cleaves and makes his target bleed with Rend.",
            roleTips = {
                tank = "Face him away from the group because of Cleave.",
                healer = "Rend makes the tank bleed for 7 sec.",
                melee = "Stay behind him to avoid Cleave.",
                ranged = "Free DPS.",
                dps = "Ranged: Free DPS.\nMelee: Stay behind him to avoid Cleave.",
            },
            abilities = {
                { id = 19642, name = "Cleave", icon = "Interface\\Icons\\ability_warrior_cleave", desc = "Hits the target and up to 4 nearby allies." },
                { id = 21949, name = "Rend", icon = "Interface\\Icons\\ability_gouge", desc = "Makes the target bleed for 7 sec." },
                { id = 19644, name = "Strike", icon = "Interface\\Icons\\ability_rogue_ambush", desc = "A strong weapon strike." },
            },
        },
        ["Ironspine"] = {
            overview = "A rare skeletal giant in the Graveyard. He weakens players with Curse of Weakness and fills the area with Poison Cloud.",
            roleTips = {
                tank = "Curse of Weakness lowers your damage for 2 min; remove it if you can.",
                healer = "Poison Cloud deals Nature damage over time to everyone near him.",
                melee = "Watch your health in Poison Cloud.",
                ranged = "Stay at range to avoid Poison Cloud.",
                dps = "Ranged: Stay at range to avoid Poison Cloud.\nMelee: Watch your health in Poison Cloud.",
            },
            abilities = {
                { id = 3815, name = "Poison Cloud", icon = "Interface\\Icons\\spell_nature_regenerate", desc = "Nature damage to nearby enemies every 5 sec for 45 sec." },
                { id = 702, name = "Curse of Weakness", icon = "Interface\\Icons\\spell_shadow_curseofmannoroth", desc = "Lowers the target's Physical damage for 2 min." },
            },
        },
        ["Bloodmage Thalnos"] = {
            overview = "An undead caster at the end of the Graveyard. He casts Shadow Bolt and Flame Shock, calls down Flame Spike and blasts nearby players with Fire Nova.",
            roleTips = {
                tank = "Fire Nova hits everyone near him.",
                healer = "Spread healing; Flame Spike burns an area and Fire Nova hits melee.",
                melee = "Move out of Flame Spike.",
                ranged = "Interrupt Shadow Bolt. Move out of Flame Spike.",
                dps = "Ranged: Interrupt Shadow Bolt. Move out of Flame Spike.\nMelee: Move out of Flame Spike.",
            },
            abilities = {
                { id = 9613, name = "Shadow Bolt", icon = "Interface\\Icons\\spell_shadow_shadowbolt", desc = "Shadow damage on one target." },
                { id = 8053, name = "Flame Shock", icon = "Interface\\Icons\\spell_fire_flameshock", desc = "Fire damage now and over time." },
                { id = 8814, name = "Flame Spike", icon = "Interface\\Icons\\spell_fire_selfdestruct", desc = "A pillar of flame that burns an area. Move out." },
                { id = 12470, name = "Fire Nova", icon = "Interface\\Icons\\spell_fire_sealoffire", desc = "Fire damage to nearby enemies." },
            },
        },
        ["Trash Drops"] = {
            overview = "Notable zone trash drops, rare recipes, and world BoEs found across the creatures in Scarlet Monastery: Graveyard. Clear pulls methodically and watch for patrolling mobs and runners.",
            roleTips = {
                tank = "Mark primary kill targets (Skull/X) on multi-mob pulls; pull caster packs around corners using Line-of-Sight to group them for cleave.",
                healer = "Prioritize dispelling lethal poisons, curses, and diseases; conserve mana between packs and drink whenever out of combat.",
                melee = "Kick dangerous enemy spellcasts on sight and watch for frontal cleaves or whirlwinds from humanoid and undead trash mobs.",
                ranged = "Focus the primary marked target and use crowd control (Polymorph, Freezing Trap, Sap) on dangerous humanoid pulls before engaging.",
                dps = "Melee: Kick dangerous spellcasts on sight and beware frontal cleaves.\nRanged: Focus skull marker and crowd-control dangerous humanoids.",
            },
            abilities = {
                { id = 0, name = "Line-of-Sight Pulling", icon = "Interface\\Icons\\Ability_Rogue_Sprint", desc = "Duck behind a wall or pillar after pulling ranged casters to force them to run into melee range." },
                { id = 0, name = "Fleeing Adds", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Low-health humanoids flee and aggro adjacent packs. Stun, snare, or execute them quickly." },
            },
        },

    },

    ["Scarlet Monastery: Library"] = {
        ["Houndmaster Loksey"] = {
            overview = "The kennel master of the Scarlet Monastery, stationed in the Huntsman's Cloister surrounded by fierce Scarlet Tracking Hounds. Uses Battle Shout and enrages into Bloodlust.",
            roleTips = {
                tank = "Pull Loksey and immediately gather his hounds. Keep the pack grouped together facing away from the group.",
                healer = "Be prepared for rapid spike damage when Loksey casts Bloodlust on himself and his hounds.",
                melee = "Focus down and AoE the Scarlet Tracking Hounds first to eliminate extra incoming damage.",
                ranged = "Slow and AoE the hounds from range, then burn down Loksey.",
                dps = "Melee: Focus down and AoE the Scarlet Tracking Hounds first to eliminate extra incoming damage.\nRanged: Slow and AoE the hounds from range, then burn down Loksey.",
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
                melee = "Kick [Polymorph]; when Doan begins casting [Detonation], RUN 30+ yards away immediately!",
                ranged = "Interrupt [Polymorph] and [Arcane Explosion]; step out of line-of-sight during [Detonation].",
                dps = "Melee: Kick [Polymorph]; when Doan begins casting [Detonation], RUN 30+ yards away immediately!\nRanged: Interrupt [Polymorph] and [Arcane Explosion]; step out of line-of-sight during [Detonation].",
            },
            abilities = {
                { id = 9435, name = "Detonation", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Channels for 5 sec before unleashing a massive fiery explosion dealing catastrophic lethal Fire damage within 30 yards. Line of sight behind library pillars to avoid!" },
                { id = 9433, name = "Arcane Explosion", icon = "Interface\\Icons\\Spell_Nature_WispSplode", desc = "Unleashes an instant blast of arcane energy dealing moderate Arcane damage to all enemies within 10 yards." },
                { id = 8988, name = "Silence", icon = "Interface\\Icons\\Spell_Holy_Silence", desc = "Silences all enemies within 30 yards, preventing spellcasting for 6 sec." },
                { id = 13323, name = "Polymorph", icon = "Interface\\Icons\\Spell_Nature_Polymorph", desc = "Transforms the highest-threat non-tank enemy into a sheep for up to 10 sec." },
                { id = 11969, name = "Fire Nova", icon = "Interface\\Icons\\Spell_Fire_SealOfFire", desc = "Releases an expanding ring of fire, inflicting Fire damage to all nearby enemies." },
            },
        },
        ["Trash Drops"] = {
            overview = "Notable zone trash drops, rare recipes, and world BoEs found across the creatures in Scarlet Monastery: Library. Clear pulls methodically and watch for patrolling mobs and runners.",
            roleTips = {
                tank = "Mark primary kill targets (Skull/X) on multi-mob pulls; pull caster packs around corners using Line-of-Sight to group them for cleave.",
                healer = "Prioritize dispelling lethal poisons, curses, and diseases; conserve mana between packs and drink whenever out of combat.",
                melee = "Kick dangerous enemy spellcasts on sight and watch for frontal cleaves or whirlwinds from humanoid and undead trash mobs.",
                ranged = "Focus the primary marked target and use crowd control (Polymorph, Freezing Trap, Sap) on dangerous humanoid pulls before engaging.",
                dps = "Melee: Kick dangerous spellcasts on sight and beware frontal cleaves.\nRanged: Focus skull marker and crowd-control dangerous humanoids.",
            },
            abilities = {
                { id = 0, name = "Line-of-Sight Pulling", icon = "Interface\\Icons\\Ability_Rogue_Sprint", desc = "Duck behind a wall or pillar after pulling ranged casters to force them to run into melee range." },
                { id = 0, name = "Fleeing Adds", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Low-health humanoids flee and aggro adjacent packs. Stun, snare, or execute them quickly." },
            },
        },

    },

    ["Scarlet Monastery: Armory"] = {
        ["Herod"] = {
            overview = "The Scarlet Champion of the Armory. He cleaves, charges around the room with Rushing Charge, spins with Whirlwind and enrages at low health. When he dies, a wave of Scarlet Trainees runs in.",
            roleTips = {
                tank = "Face him away from the group. When he enrages near the end, use a defensive cooldown.",
                healer = "Whirlwind and Cleave hit everyone in melee; heal through Enrage.",
                melee = "Move away during Whirlwind.",
                ranged = "After he dies, AoE the Scarlet Trainees that rush in.",
                dps = "Ranged: After he dies, AoE the Scarlet Trainees that rush in.\nMelee: Move away during Whirlwind.",
            },
            abilities = {
                { id = 8989, name = "Whirlwind", icon = "Interface\\Icons\\ability_whirlwind", desc = "Spins and hits everyone near him. Melee should move out." },
                { id = 15579, name = "Cleave", icon = "Interface\\Icons\\ability_warrior_cleave", desc = "Hits the target and up to 2 nearby allies." },
                { id = 6268, name = "Rushing Charge", icon = "Interface\\Icons\\ability_warstomp", desc = "Charges with increased speed and extra damage." },
                { id = 8599, name = "Enrage", icon = "Interface\\Icons\\spell_shadow_unholyfrenzy", desc = "Enrages at low health, hitting harder and faster." },
            },
        },
        ["Trash Drops"] = {
            overview = "Notable zone trash drops, rare recipes, and world BoEs found across the creatures in Scarlet Monastery: Armory. Clear pulls methodically and watch for patrolling mobs and runners.",
            roleTips = {
                tank = "Mark primary kill targets (Skull/X) on multi-mob pulls; pull caster packs around corners using Line-of-Sight to group them for cleave.",
                healer = "Prioritize dispelling lethal poisons, curses, and diseases; conserve mana between packs and drink whenever out of combat.",
                melee = "Kick dangerous enemy spellcasts on sight and watch for frontal cleaves or whirlwinds from humanoid and undead trash mobs.",
                ranged = "Focus the primary marked target and use crowd control (Polymorph, Freezing Trap, Sap) on dangerous humanoid pulls before engaging.",
                dps = "Melee: Kick dangerous spellcasts on sight and beware frontal cleaves.\nRanged: Focus skull marker and crowd-control dangerous humanoids.",
            },
            abilities = {
                { id = 0, name = "Line-of-Sight Pulling", icon = "Interface\\Icons\\Ability_Rogue_Sprint", desc = "Duck behind a wall or pillar after pulling ranged casters to force them to run into melee range." },
                { id = 0, name = "Fleeing Adds", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Low-health humanoids flee and aggro adjacent packs. Stun, snare, or execute them quickly." },
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
                { id = 12098, name = "Sleep", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Puts an enemy to sleep for up to 20 sec. Any damage taken will awaken the target." },
            },
        },
        ["Scarlet Commander Mograine"] = {
            overview = "The commander of the Scarlet Crusade in the Cathedral. He uses Crusader Strike, stuns with Hammer of Justice, uses Divine Shield and keeps Retribution Aura up. When he dies, Whitemane comes to resurrect him.",
            roleTips = {
                tank = "Hammer of Justice stuns you for 5 sec. Keep threat high for when Whitemane brings him back.",
                healer = "Retribution Aura damages melee; watch their health.",
                melee = "Retribution Aura damages you each time you hit him.",
                ranged = "Interrupt Whitemane's heals in the second phase.",
                dps = "Ranged: Interrupt Whitemane's heals in the second phase.\nMelee: Retribution Aura damages you each time you hit him.",
            },
            abilities = {
                { id = 14518, name = "Crusader Strike", icon = "Interface\\Icons\\spell_holy_holysmite", desc = "A strike that raises the Holy damage the target takes." },
                { id = 5589, name = "Hammer of Justice", icon = "Interface\\Icons\\spell_holy_sealofmight", desc = "Stuns the target for 5 sec." },
                { id = 1020, name = "Divine Shield", icon = "Interface\\Icons\\spell_holy_divineintervention", desc = "Immune to all damage for 12 sec." },
                { id = 8990, name = "Retribution Aura", icon = "Interface\\Icons\\spell_holy_auraoflight", desc = "Deals Holy damage to anyone who hits him in melee." },
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
                { id = 10901, name = "Power Word: Shield", icon = "Interface\\Icons\\Spell_Holy_PowerWordShield", desc = "Draws upon Holy power to shield Whitemane, absorbing damage and preventing spell pushback." },
            },
        },
        ["Trash Drops"] = {
            overview = "Notable zone trash drops, rare recipes, and world BoEs found across the creatures in Scarlet Monastery: Cathedral. Clear pulls methodically and watch for patrolling mobs and runners.",
            roleTips = {
                tank = "Mark primary kill targets (Skull/X) on multi-mob pulls; pull caster packs around corners using Line-of-Sight to group them for cleave.",
                healer = "Prioritize dispelling lethal poisons, curses, and diseases; conserve mana between packs and drink whenever out of combat.",
                melee = "Kick dangerous enemy spellcasts on sight and watch for frontal cleaves or whirlwinds from humanoid and undead trash mobs.",
                ranged = "Focus the primary marked target and use crowd control (Polymorph, Freezing Trap, Sap) on dangerous humanoid pulls before engaging.",
                dps = "Melee: Kick dangerous spellcasts on sight and beware frontal cleaves.\nRanged: Focus skull marker and crowd-control dangerous humanoids.",
            },
            abilities = {
                { id = 0, name = "Line-of-Sight Pulling", icon = "Interface\\Icons\\Ability_Rogue_Sprint", desc = "Duck behind a wall or pillar after pulling ranged casters to force them to run into melee range." },
                { id = 0, name = "Fleeing Adds", icon = "Interface\\Icons\\Ability_Physical_Taunt", desc = "Low-health humanoids flee and aggro adjacent packs. Stun, snare, or execute them quickly." },
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
            overview = "A bloated abomination. He is surrounded by a Disease Cloud and enrages at low health.",
            roleTips = {
                tank = "Use a defensive cooldown when he enrages.",
                healer = "Disease Cloud damages everyone within 5 yards every 3 sec.",
                melee = "Disease Cloud hits melee; be careful at low health.",
                ranged = "Stay at range out of Disease Cloud.",
                dps = "Ranged: Stay at range out of Disease Cloud.\nMelee: Disease Cloud hits melee; be careful at low health.",
            },
            abilities = {
                { id = 12627, name = "Disease Cloud", icon = "Interface\\Icons\\spell_nature_abolishmagic", desc = "Nature damage every 3 sec to players within 5 yards." },
                { id = 12795, name = "Enrage", icon = "Interface\\Icons\\spell_shadow_unholyfrenzy", desc = "Enrages at low health." },
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
                { id = 9613, name = "Shadow Bolt", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Hurls a bolt of dark magic at an enemy, dealing Shadow damage." },
            },
        },
        ["Plaguemaw the Rotting"] = {
            overview = "A rare plague beast. Putrid Stench weakens nearby players and stops them casting, and Withered Touch can hit the tank.",
            roleTips = {
                tank = "Withered Touch can proc on you during melee.",
                healer = "Putrid Stench stops nearby players from casting for 10 sec; heal from range.",
                melee = "Putrid Stench lowers your Strength and Agility for 10 sec.",
                ranged = "Stay at range so Putrid Stench can't stop your casts.",
                dps = "Ranged: Stay at range so Putrid Stench can't stop your casts.\nMelee: Putrid Stench lowers your Strength and Agility for 10 sec.",
            },
            abilities = {
                { id = 12946, name = "Putrid Stench", icon = "Interface\\Icons\\spell_shadow_callofbone", desc = "Lowers nearby enemies' Strength and Agility and stops spellcasting for 10 sec." },
                { id = 12947, name = "Withered Touch", icon = "Interface\\Icons\\spell_shadow_requiem", desc = "Chance to curse the target on melee hit." },
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
                { id = 12642, name = "Summon Frost Spectres", icon = "Interface\\Icons\\Spell_Shadow_RaiseDead", desc = "Summons undead Frost Spectres at 60% and 30% health to swarm the party." },
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
            overview = "A Dark Iron fire caster. He uses Flame Shock and Flame Lash, raises Fire damage taken with Amplify Flames and blasts nearby players with Fire Nova.",
            roleTips = {
                tank = "Fire Nova hits everyone near him.",
                healer = "Amplify Flames makes a player take much more Fire damage for 30 sec; dispel it if you can.",
                melee = "Fire Nova hits melee.",
                ranged = "Interrupt and dispel Amplify Flames.",
                dps = "Ranged: Interrupt and dispel Amplify Flames.\nMelee: Fire Nova hits melee.",
            },
            abilities = {
                { id = 8053, name = "Flame Shock", icon = "Interface\\Icons\\spell_fire_flameshock", desc = "Fire damage now and over time." },
                { id = 3356, name = "Flame Lash", icon = "Interface\\Icons\\spell_fire_fireball", desc = "Fire damage and lowers Fire resistance for 45 sec." },
                { id = 9482, name = "Amplify Flames", icon = "Interface\\Icons\\spell_fire_fireball", desc = "The target takes more Fire damage for 30 sec." },
                { id = 11969, name = "Fire Nova", icon = "Interface\\Icons\\spell_fire_sealoffire", desc = "Fire damage to nearby enemies." },
            },
        },
        ["Grimlok"] = {
            overview = "A troll shaman leader. He casts Lightning Bolt and Chain Bolt, shrinks players and buffs himself with Bloodlust.",
            roleTips = {
                tank = "Bloodlust raises his attack speed by 30% for 30 sec.",
                healer = "Chain Bolt jumps between up to 3 players.",
                melee = "Shrink lowers your Strength and Stamina for 2 min.",
                ranged = "Spread for Chain Bolt and interrupt it.",
                dps = "Ranged: Spread for Chain Bolt and interrupt it.\nMelee: Shrink lowers your Strength and Stamina for 2 min.",
            },
            abilities = {
                { id = 9532, name = "Lightning Bolt", icon = "Interface\\Icons\\spell_nature_lightning", desc = "Nature damage on one target." },
                { id = 8292, name = "Chain Bolt", icon = "Interface\\Icons\\spell_nature_chainlightning", desc = "Lightning that jumps to up to 3 targets." },
                { id = 11892, name = "Shrink", icon = "Interface\\Icons\\spell_shadow_antishadow", desc = "Lowers nearby enemies' Strength and Stamina for 2 min." },
                { id = 6742, name = "Bloodlust", icon = "Interface\\Icons\\spell_nature_bloodlust", desc = "Attack speed increased by 30% for 30 sec." },
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
                { id = 10258, name = "Awaken Vault Warder", icon = "Interface\\Icons\\Spell_Frost_Stun", desc = "At 66% health, awakens two powerful elite stone golems to defend Archaedas." },
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
                { id = 15586, name = "Greater Healing Wave", icon = "Interface\\Icons\\Spell_Nature_MagicImmunity", desc = "Calls upon nature magic to heal Antu'sul or a nearby ally for significant health." },
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
                { id = 0, name = "Zul'Farrak Zombies", icon = "Interface\\Icons\\Spell_Shadow_RaiseDead", desc = "Summons skeletal zombies from nearby shallow graves to swarm the party." },
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
                { id = 15654, name = "Shadow Word: Pain", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordPain", desc = "Utters a word of darkness, dealing Shadow damage over 18 sec." },
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
            overview = "A Sandfury troll warrior. He interrupts casters with Pummel and lowers attack power with Demoralizing Shout.",
            roleTips = {
                tank = "Steady melee damage.",
                healer = "Pummel interrupts spellcasting for 5 sec if he targets you.",
                melee = "Demoralizing Shout lowers your attack power for 30 sec.",
                ranged = "Free DPS.",
                dps = "Ranged: Free DPS.\nMelee: Demoralizing Shout lowers your attack power for 30 sec.",
            },
            abilities = {
                { id = 15615, name = "Pummel", icon = "Interface\\Icons\\inv_gauntlets_04", desc = "Damage and interrupts spellcasting for 5 sec." },
                { id = 13730, name = "Demoralizing Shout", icon = "Interface\\Icons\\ability_warrior_warcry", desc = "Lowers nearby enemies' attack power for 30 sec." },
                { id = 14516, name = "Strike", icon = "Interface\\Icons\\ability_rogue_ambush", desc = "A strong weapon strike." },
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
                { id = 0, name = "Chaotic Focus", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Channels pure chaotic energy to boost spell power." },
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
                { id = 15284, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping strike that deals weapon damage to the target and its nearest allies." },
                { id = 8269, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases Ukorz's attack speed by 60% at low health." },
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
            overview = "A poisonous elemental in the Wicked Grotto. He hits players with Toxic Volley and periodically spawns Noxxion's Spawns while he becomes untargetable.",
            roleTips = {
                tank = "When the Spawns appear, gather them.",
                healer = "Toxic Volley poisons the group; cure poison.",
                melee = "AoE the Spawns down when they appear.",
                ranged = "AoE the Spawns, then switch back to Noxxion.",
                dps = "Ranged: AoE the Spawns, then switch back to Noxxion.\nMelee: AoE the Spawns down when they appear.",
            },
            abilities = {
                { id = 21687, name = "Toxic Volley", icon = "Interface\\Icons\\spell_nature_corrosivebreath", desc = "Nature damage to enemies." },
                { id = 21547, name = "Spore Cloud", icon = "Interface\\Icons\\spell_nature_dryaddispelmagic", desc = "A cloud of spores around him." },
                { id = 21707, name = "Summon Noxxion's Spawns", icon = "Interface\\Icons\\spell_nature_abolishmagic", desc = "Summons a group of Spawns." },
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
            overview = "A satyr lord who dual-wields, uses Multi-Shot from range, Blinks away and drops Smoke Bombs. His melee can cause Putrid Breath.",
            roleTips = {
                tank = "He Blinks and uses ranged attacks, so he moves around a lot.",
                healer = "Smoke Bomb stuns players near him.",
                melee = "Smoke Bomb stuns you briefly; follow him after Blink.",
                ranged = "Multi-Shot hits several players; spread out.",
                dps = "Ranged: Multi-Shot hits several players; spread out.\nMelee: Smoke Bomb stuns you briefly; follow him after Blink.",
            },
            abilities = {
                { id = 21390, name = "Multi-Shot", icon = "Interface\\Icons\\ability_upgrademoonglaive", desc = "Hits up to 5 targets." },
                { id = 8817, name = "Smoke Bomb", icon = "Interface\\Icons\\spell_nature_invisibilty", desc = "Stuns nearby enemies for 3 sec and he goes into stealth." },
                { id = 21655, name = "Blink", icon = "Interface\\Icons\\spell_arcane_blink", desc = "Teleports 20 yards forward." },
                { id = 21080, name = "Putrid Breath", icon = "Interface\\Icons\\spell_shadow_abominationexplosion", desc = "Chance on melee hit." },
            },
        },
        ["Meshlok the Harvester"] = {
            overview = "A rare plant giant. His War Stomp knocks back and stuns everyone near him.",
            roleTips = {
                tank = "War Stomp stuns you for 5 sec.",
                healer = "Heal everyone in melee after War Stomp.",
                melee = "War Stomp hits melee; be ready for the stun.",
                ranged = "Stay at range out of War Stomp.",
                dps = "Ranged: Stay at range out of War Stomp.\nMelee: War Stomp hits melee; be ready for the stun.",
            },
            abilities = {
                { id = 24375, name = "War Stomp", icon = "Interface\\Icons\\ability_bullrush", desc = "Damages nearby enemies, knocks them back and stuns them for 5 sec." },
                { id = 15580, name = "Strike", icon = "Interface\\Icons\\ability_rogue_ambush", desc = "A strong weapon strike." },
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
                { id = 21908, name = "Corrupt Forces of Nature", icon = "Interface\\Icons\\Spell_Nature_StrangleVines", desc = "Summons corrupted treants from the surrounding grove to attack the party." },
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
                { id = 24375, name = "War Stomp", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Stuns all nearby enemies for 4 sec." },
                { id = 0, name = "Subterranean Diemetradon", icon = "Interface\\Icons\\Ability_Hunter_Pet_Hydra", desc = "Summons a subterranean beast from the cavern depths to assist the giant." },
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
                { id = 0, name = "Atal'ai Traps", icon = "Interface\\Icons\\Spell_Shadow_GrimWard", desc = "Triggers explosive temple ground traps beneath player positions." },
            },
        },
        ["Dreamscythe"] = {
            overview = "One of Eranikus' green dragonkin. It breathes Corrosive Acid Breath in a cone and knocks players back with Wing Flap.",
            roleTips = {
                tank = "Face it away from the group because of the breath.",
                healer = "Corrosive Acid Breath lowers armor and deals damage.",
                melee = "Stand behind it. Wing Flap knocks back players in front.",
                ranged = "Stay out of the frontal cone.",
                dps = "Ranged: Stay out of the frontal cone.\nMelee: Stand behind it. Wing Flap knocks back players in front.",
            },
            abilities = {
                { id = 16359, name = "Corrosive Acid Breath", icon = "Interface\\Icons\\spell_nature_acid_01", desc = "Acid in a cone in front of it; lowers armor." },
                { id = 12882, name = "Wing Flap", icon = "Interface\\Icons\\spell_nature_earthbind", desc = "Knocks back enemies in front of it." },
            },
        },
        ["Weaver"] = {
            overview = "One of Eranikus' green dragonkin. It breathes Corrosive Acid Breath in a cone and knocks players back with Wing Flap.",
            roleTips = {
                tank = "Face it away from the group because of the breath.",
                healer = "Corrosive Acid Breath lowers armor and deals damage.",
                melee = "Stand behind it. Wing Flap knocks back players in front.",
                ranged = "Stay out of the frontal cone.",
                dps = "Ranged: Stay out of the frontal cone.\nMelee: Stand behind it. Wing Flap knocks back players in front.",
            },
            abilities = {
                { id = 16359, name = "Corrosive Acid Breath", icon = "Interface\\Icons\\spell_nature_acid_01", desc = "Acid in a cone in front of it; lowers armor." },
                { id = 12882, name = "Wing Flap", icon = "Interface\\Icons\\spell_nature_earthbind", desc = "Knocks back enemies in front of it." },
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
                { id = 12466, name = "Flamestrike", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Calls down a pillar of flame, inflicting heavy Fire damage." },
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
                { id = 12471, name = "Shadow Bolt", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Hurls a bolt of dark magic at an enemy." },
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
                { id = 12524, name = "Lethargic Cloud", icon = "Interface\\Icons\\Spell_Nature_Sleep", desc = "Releases a sleeping cloud that slows and incapacitates players." },
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
                { id = 12097, name = "Pierce Armor", icon = "Interface\\Icons\\Spell_Shadow_VampiricAura", desc = "Pierces the target's armor, reducing armor by 50% for 20 sec." },
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
                { id = 3391, name = "Thrash", icon = "Interface\\Icons\\Ability_GhoulFrenzy", desc = "Gives the caster 2 extra attacks on the target." },
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
                { id = 11874, name = "Flamestrike", icon = "Interface\\Icons\\Spell_Fire_SelfDestruct", desc = "Calls down a column of fire on the party." },
                { id = 17650, name = "Defiling Aura", icon = "Interface\\Icons\\Spell_Shadow_AuraOfDarkness", desc = "Pulsing aura of unholy shadow damage." },
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
                { id = 134, name = "Fire Shield", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Deals Fire damage to attackers whenever struck in melee." },
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
                { id = 18099, name = "Chill Nova", icon = "Interface\\Icons\\Spell_Frost_FrostNova", desc = "Explodes in a wave of frost, slowing and freezing nearby enemies." },
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
                { id = 8362, name = "Renew", icon = "Interface\\Icons\\Spell_Holy_Renew", desc = "Restores health to an ally over 15 sec." },
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
                { id = 16359, name = "Corrosive Acid Breath", icon = "Interface\\Icons\\Spell_Nature_Acid_01", desc = "Reduces the target's armor by 1000 for 30 sec." },
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
                { id = 17399, name = "Shadow Shock", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Shocks an enemy with instant Shadow damage." },
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
                { id = 12471, name = "Shadow Bolt", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Hurls a bolt of dark magic at an enemy, dealing Shadow damage." },
            },
        },
        ["Hydrospawn"] = {
            overview = "A water elemental in Dire Maul East. It uses Riptide and Massive Geyser, lowers Stamina with Submersion and splits off Hydrolings.",
            roleTips = {
                tank = "Pick up the Hydrolings when they spawn.",
                healer = "Submersion lowers Stamina for 1 min; keep health up.",
                melee = "Kill the Hydrolings.",
                ranged = "Help kill the Hydrolings.",
                dps = "Ranged: Help kill the Hydrolings.\nMelee: Kill the Hydrolings.",
            },
            abilities = {
                { id = 22421, name = "Massive Geyser", icon = "Interface\\Icons\\spell_frost_summonwaterelemental", desc = "Sends players flying." },
                { id = 22419, name = "Riptide", icon = "Interface\\Icons\\ability_warrior_disarm", desc = "Hits nearby players with a rush of water." },
                { id = 22420, name = "Submersion", icon = "Interface\\Icons\\spell_shadow_demonbreath", desc = "Lowers nearby enemies' Stamina for 1 min." },
                { id = 22714, name = "Summon Hydroling", icon = "Interface\\Icons\\spell_frost_chillingblast", desc = "Splits off Hydrolings." },
            },
        },
        ["Lethtendris"] = {
            overview = "A blood elf warlock with her pet Pimgib. She casts Void Bolt, Shadow Bolt Volley and Immolate and curses players with Curse of Tongues and Curse of Thorns.",
            roleTips = {
                tank = "Pick up Pimgib.",
                healer = "Shadow Bolt Volley hits the whole group; remove curses.",
                melee = "Interrupt Void Bolt.",
                ranged = "Interrupt Void Bolt and decurse.",
                dps = "Ranged: Interrupt Void Bolt and decurse.\nMelee: Interrupt Void Bolt.",
            },
            abilities = {
                { id = 22709, name = "Void Bolt", icon = "Interface\\Icons\\spell_shadow_shadowbolt", desc = "Heavy Shadow damage on one target." },
                { id = 14887, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\spell_shadow_shadowbolt", desc = "Shadow damage to nearby enemies." },
                { id = 12742, name = "Immolate", icon = "Interface\\Icons\\spell_fire_immolation", desc = "Fire damage now and over time." },
                { id = 13338, name = "Curse of Tongues", icon = "Interface\\Icons\\spell_shadow_curseoftounges", desc = "Slows casting by 50% for 15 sec." },
                { id = 16247, name = "Curse of Thorns", icon = "Interface\\Icons\\spell_shadow_antishadow", desc = "The target is damaged when it attacks." },
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
                { id = 6713, name = "Disarm", icon = "Interface\\Icons\\Ability_Warrior_Disarm", desc = "Disarms the target's weapon for 5 sec." },
                { id = 19985, name = "Vicious Bite", icon = "Interface\\Icons\\Ability_Druid_Rake", desc = "Bites an enemy for high physical damage." },
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
                { id = 15547, name = "Concussive Shot", icon = "Interface\\Icons\\Spell_Frost_Stun", desc = "Dazes the target, reducing movement speed by 50% for 4 sec." },
            },
        },
        ["Tsu'zee"] = {
            overview = "A rare satyr rogue in Dire Maul West. She uses Gouge, Sinister Strike and Blind.",
            roleTips = {
                tank = "Gouge stuns you for up to 4 sec and drops you from her target; be ready to taunt.",
                healer = "Blind takes a player out for up to 10 sec.",
                melee = "Attack from behind.",
                ranged = "Free DPS.",
                dps = "Ranged: Free DPS.\nMelee: Attack from behind.",
            },
            abilities = {
                { id = 12540, name = "Gouge", icon = "Interface\\Icons\\ability_gouge", desc = "Stuns the target for up to 4 sec." },
                { id = 15581, name = "Sinister Strike", icon = "Interface\\Icons\\spell_shadow_ritualofsacrifice", desc = "A strong instant strike." },
                { id = 21060, name = "Blind", icon = "Interface\\Icons\\spell_shadow_mindsteal", desc = "The target wanders confused for up to 10 sec." },
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
                { id = 15587, name = "Mind Blast", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Blasts the target with direct Shadow damage." },
                { id = 15654, name = "Shadow Word: Pain", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordPain", desc = "Inflicts Shadow damage over 18 sec." },
            },
        },
        ["Immol'thar"] = {
            overview = "A huge demon held by the pylons. He tramples nearby players, infects them with Infected Bite, spawns Eyes of Immol'thar, teleports players with Portal of Immol'thar and enrages.",
            roleTips = {
                tank = "Keep threat high: Portal of Immol'thar can teleport you and he picks a new target. Trample hits melee.",
                healer = "Infected Bite raises Physical damage taken for 3 min. Expect heavy damage after Enrage.",
                melee = "Kill the Eyes of Immol'thar when they spawn.",
                ranged = "Kill the Eyes and keep DPS on the boss.",
                dps = "Ranged: Kill the Eyes and keep DPS on the boss.\nMelee: Kill the Eyes of Immol'thar when they spawn.",
            },
            abilities = {
                { id = 16128, name = "Infected Bite", icon = "Interface\\Icons\\spell_shadow_callofbone", desc = "Nature damage every 10 sec and raises Physical damage taken for 3 min." },
                { id = 15550, name = "Trample", icon = "Interface\\Icons\\spell_nature_natureswrath", desc = "Physical damage to nearby enemies." },
                { id = 22899, name = "Eye of Immol'thar", icon = "Interface\\Icons\\spell_shadow_detectinvisibility", desc = "Summons Eyes of Immol'thar." },
                { id = 22950, name = "Portal of Immol'thar", icon = "Interface\\Icons\\spell_arcane_portalironforge", desc = "Teleports a player." },
                { id = 8269, name = "Enrage", icon = "Interface\\Icons\\spell_shadow_unholyfrenzy", desc = "Attack speed and Physical damage raised for 2 min." },
            },
        },
        ["Lord Hel'nurath"] = {
            overview = "A summoned dreadlord. He casts Shadow Word: Pain and Veil of Shadow, knocks players away and puts them to sleep.",
            roleTips = {
                tank = "Knock Away lowers threat and pushes you back; taunt back.",
                healer = "Veil of Shadow reduces healing on a player by 75% for 8 sec; dispel it.",
                melee = "Sleep takes a player out for up to 10 sec.",
                ranged = "Dispel Shadow Word: Pain and Veil of Shadow.",
                dps = "Ranged: Dispel Shadow Word: Pain and Veil of Shadow.\nMelee: Sleep takes a player out for up to 10 sec.",
            },
            abilities = {
                { id = 17146, name = "Shadow Word: Pain", icon = "Interface\\Icons\\spell_shadow_shadowwordpain", desc = "Shadow damage every 3 sec for 18 sec." },
                { id = 23224, name = "Veil of Shadow", icon = "Interface\\Icons\\spell_shadow_gathershadows", desc = "Reduces healing taken by 75% for 8 sec." },
                { id = 18670, name = "Knock Away", icon = "Interface\\Icons\\inv_gauntlets_05", desc = "Knocks the target back." },
                { id = 20989, name = "Sleep", icon = "Interface\\Icons\\spell_nature_sleep", desc = "Sleeps one target for up to 10 sec." },
            },
        },
        ["Prince Tortheldrin"] = {
            overview = "The last Highborne prince. He uses Arcane Blast, Whirlwind, Thrash and Counterspell, and uses Summon to pull players to him.",
            roleTips = {
                tank = "Arcane Blast knocks you back; Summon pulls players back to him.",
                healer = "Counterspell can lock a school for 15 sec; heal from a different position.",
                melee = "Move out during Whirlwind.",
                ranged = "Counterspell interrupts casters; mix up who casts.",
                dps = "Ranged: Counterspell interrupts casters; mix up who casts.\nMelee: Move out during Whirlwind.",
            },
            abilities = {
                { id = 22920, name = "Arcane Blast", icon = "Interface\\Icons\\spell_shadow_deathpact", desc = "Arcane damage and knocks the target back." },
                { id = 15589, name = "Whirlwind", icon = "Interface\\Icons\\ability_whirlwind", desc = "Hits everyone near him." },
                { id = 3391, name = "Thrash", icon = "Interface\\Icons\\ability_ghoulfrenzy", desc = "Gives him two extra attacks." },
                { id = 20537, name = "Counterspell", icon = "Interface\\Icons\\spell_frost_iceshock", desc = "Interrupts a spell and locks that school for 15 sec." },
                { id = 22995, name = "Summon", icon = "Interface\\Icons\\spell_arcane_portalironforge", desc = "Pulls a player to him." },
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
                { id = 8269, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases attack speed at low health." },
                { id = 11976, name = "Strike", icon = "Interface\\Icons\\Ability_Rogue_Ambush", desc = "Strikes an enemy with weapon damage." },
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
                { id = 8269, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases attack speed by 60%." },
            },
        },
        ["Captain Kromcrush"] = {
            overview = "The gordunni captain. He uses Mortal Cleave, fears with Intimidating Shout, counters melee with Retaliation and calls Gordok Reavers.",
            roleTips = {
                tank = "Mortal Cleave lowers healing taken. Pick up the Reavers he calls.",
                healer = "Mortal Cleave reduces healing on the tank.",
                melee = "Stop attacking him during Retaliation.",
                ranged = "Kill the Reavers he calls.",
                dps = "Ranged: Kill the Reavers he calls.\nMelee: Stop attacking him during Retaliation.",
            },
            abilities = {
                { id = 22859, name = "Mortal Cleave", icon = "Interface\\Icons\\ability_warrior_savageblow", desc = "Heavy damage that reduces healing taken." },
                { id = 19134, name = "Intimidating Shout", icon = "Interface\\Icons\\ability_golemthunderclap", desc = "Fears the target and other nearby enemies." },
                { id = 22857, name = "Retaliation", icon = "Interface\\Icons\\ability_warrior_challange", desc = "Counterattacks melee attacks from the front for 15 sec." },
                { id = 22860, name = "Call Reavers", icon = "Interface\\Icons\\ability_bullrush", desc = "Calls Gordok Reavers." },
                { id = 8599, name = "Enrage", icon = "Interface\\Icons\\spell_shadow_unholyfrenzy", desc = "Enrages at low health." },
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
                { id = 12466, name = "Fireball", icon = "Interface\\Icons\\Spell_Fire_FlameBolt", desc = "Hurls a fiery ball that inflicts Fire damage." },
                { id = 15587, name = "Mind Blast", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Inflicts direct Shadow damage." },
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
                { id = 13748, name = "Arcane Bolt", icon = "Interface\\Icons\\Spell_Arcane_Blast", desc = "Shoots a bolt of pure arcane magic." },
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
                { id = 17208, name = "Relentless Strike", icon = "Interface\\Icons\\Ability_Warrior_DecisiveStrike", desc = "Strikes the target with furious melee damage." },
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
            overview = "The dreadlord posing as Grand Crusader Dathrohan. He mind controls players with Domination, fears with Psychic Scream, puts nearby players to sleep with Deep Sleep and hits the group with Shadow Shock and Shadow Bolt Volley.",
            roleTips = {
                tank = "Deep Sleep can put the group to sleep; damage wakes them.",
                healer = "Shadow Bolt Volley and Shadow Shock hit the whole group.",
                melee = "A player under Domination should be crowd controlled, not killed.",
                ranged = "Spread out and crowd control mind-controlled players.",
                dps = "Ranged: Spread out and crowd control mind-controlled players.\nMelee: A player under Domination should be crowd controlled, not killed.",
            },
            abilities = {
                { id = 17405, name = "Domination", icon = "Interface\\Icons\\spell_shadow_shadowworddominate", desc = "Mind controls a player." },
                { id = 15398, name = "Psychic Scream", icon = "Interface\\Icons\\spell_shadow_psychicscream", desc = "Fears an enemy for 8 sec." },
                { id = 9256, name = "Deep Sleep", icon = "Interface\\Icons\\spell_nature_sleep", desc = "Sleeps nearby enemies for up to 10 sec." },
                { id = 20603, name = "Shadow Shock", icon = "Interface\\Icons\\spell_shadow_shadowbolt", desc = "Shadow damage to nearby enemies." },
                { id = 20741, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\spell_shadow_shadowbolt", desc = "Shadow damage to nearby enemies." },
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
                { id = 0, name = "Furious Stone", icon = "Interface\\Icons\\Spell_Nature_Earthquake", desc = "Hardens his gargoyle hide, increasing armor." },
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
                { id = 16793, name = "Draining Blow", icon = "Interface\\Icons\\Spell_Shadow_LifeDrain", desc = "Strikes for physical damage and drains mana." },
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
                { id = 22417, name = "Shadow Shield", icon = "Interface\\Icons\\Spell_Shadow_AntiMagicShell", desc = "Surrounds the caster in a barrier of shadow." },
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
                { id = 8269, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases Grizzle's attack speed by 60%." },
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
                { id = 13443, name = "Rend", icon = "Interface\\Icons\\Ability_Gouge", desc = "Inflicts bleeding damage over 15 sec." },
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
                { id = 13747, name = "Slow", icon = "Interface\\Icons\\Spell_Nature_Slow", desc = "Slows target movement and attack speed." },
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
                { id = 12741, name = "Curse of Weakness", icon = "Interface\\Icons\\Spell_Shadow_CurseOfMannoroth", desc = "Reduces the target's physical attack power." },
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
                { id = 3609, name = "Paralyzing Poison", icon = "Interface\\Icons\\Ability_Poisons", desc = "Poisons the target and stuns them for 8 sec if not cleansed quickly." },
                { id = 15474, name = "Web Explosion", icon = "Interface\\Icons\\Ability_Ensnare", desc = "Roots all nearby enemies in webs." },
                { id = 15475, name = "Baneful Poison", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Inflicts heavy Nature damage over time." },
            },
        },
        ["Pyromancer Loregrain"] = {
            overview = "A Dark Iron fire shaman. He drops a Scorching Totem, casts Flame Shock and Molten Blast and absorbs fire with Fire Ward.",
            roleTips = {
                tank = "Kill the Scorching Totem quickly.",
                healer = "Flame Shock and Molten Blast deal steady Fire damage; Fire resistance helps.",
                melee = "Kill the Scorching Totem.",
                ranged = "Interrupt Molten Blast. Fire Ward absorbs Fire spells, so use another school.",
                dps = "Ranged: Interrupt Molten Blast. Fire Ward absorbs Fire spells, so use another school.\nMelee: Kill the Scorching Totem.",
            },
            abilities = {
                { id = 15038, name = "Scorching Totem", icon = "Interface\\Icons\\spell_fire_searingtotem", desc = "A totem that attacks a nearby enemy every 2 sec for 35 sec." },
                { id = 15616, name = "Flame Shock", icon = "Interface\\Icons\\spell_fire_flameshock", desc = "Fire damage now and over 12 sec." },
                { id = 15095, name = "Molten Blast", icon = "Interface\\Icons\\spell_fire_fire", desc = "Fire damage on one target." },
                { id = 15041, name = "Fire Ward", icon = "Interface\\Icons\\spell_fire_firearmor", desc = "Absorbs Fire damage for 1 min." },
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
                { id = 10291, name = "Devotion Aura", icon = "Interface\\Icons\\Spell_Holy_DevotionAura", desc = "Increases armor of nearby allies." },
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
                { id = 12557, name = "Cone of Cold", icon = "Interface\\Icons\\Spell_Frost_Glacier", desc = "Cone of frost that slows and damages targets in front." },
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
                { id = 11990, name = "Immolate", icon = "Interface\\Icons\\Spell_Fire_Immolation", desc = "Inflicts Fire damage over 15 sec." },
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
                { id = 15043, name = "Frostbolt", icon = "Interface\\Icons\\Spell_Frost_FrostBolt02", desc = "Hurls frost at the enemy." },
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
                { id = 15654, name = "Shadow Word: Pain", icon = "Interface\\Icons\\Spell_Shadow_ShadowWordPain", desc = "Inflicts Shadow damage over 18 sec." },
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
                { id = 11976, name = "Strike", icon = "Interface\\Icons\\Ability_Rogue_Ambush", desc = "Strikes an enemy with weapon damage." },
                { id = 9128, name = "Battle Shout", icon = "Interface\\Icons\\Ability_Warrior_BattleShout", desc = "Increases attack power of nearby allies." },
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
                { id = 11976, name = "Strike", icon = "Interface\\Icons\\Ability_Rogue_Ambush", desc = "Strikes an enemy with weapon damage." },
            },
        },
        ["Gyth"] = {
            overview = "Rend Blackhand's dragon mount. It breathes Flame Breath and Corrosive Acid Breath and casts Freeze on players.",
            roleTips = {
                tank = "Face Gyth away from the group because of its breaths.",
                healer = "Freeze stuns a player and deals Frost damage over 15 sec.",
                melee = "Stand behind Gyth.",
                ranged = "Stay out of the frontal breaths.",
                dps = "Ranged: Stay out of the frontal breaths.\nMelee: Stand behind Gyth.",
            },
            abilities = {
                { id = 20712, name = "Flame Breath", icon = "Interface\\Icons\\spell_fire_windsofwoe", desc = "Fire damage to enemies in a cone in front of it." },
                { id = 20667, name = "Corrosive Acid Breath", icon = "Interface\\Icons\\spell_nature_acid_01", desc = "Acid in a cone; lowers armor." },
                { id = 18763, name = "Freeze", icon = "Interface\\Icons\\spell_frost_glacier", desc = "Stuns the target and deals Frost damage every 3 sec for 15 sec." },
            },
        },
        ["Warchief Rend Blackhand"] = {
            overview = "The Warchief of the Dark Horde, who jumps down after Gyth. He uses Whirlwind, Cleave and Thunderclap.",
            roleTips = {
                tank = "Thunderclap slows attack and movement speed; Cleave hits nearby allies.",
                healer = "Whirlwind and Cleave hit everyone in melee.",
                melee = "Move out during Whirlwind.",
                ranged = "Free DPS from range.",
                dps = "Ranged: Free DPS from range.\nMelee: Move out during Whirlwind.",
            },
            abilities = {
                { id = 15589, name = "Whirlwind", icon = "Interface\\Icons\\ability_whirlwind", desc = "Spins and hits everyone near him." },
                { id = 20691, name = "Cleave", icon = "Interface\\Icons\\ability_warrior_cleave", desc = "Hits the target and up to 4 nearby allies." },
                { id = 23931, name = "Thunderclap", icon = "Interface\\Icons\\spell_nature_thunderclap", desc = "Nature damage to nearby enemies and slows them for 10 sec." },
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
                { id = 0, name = "Shadow Staff", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Strikes with dark shadow magic." },
            },
        },
        ["General Drakkisath"] = {
            overview = "The commander of Blackrock Spire, guarded by two Chromatic Elite Guards. He casts Conflagration, Fire Nova, Cleave and Thunderclap.",
            roleTips = {
                tank = "Tank the two guards away from him or have them handled first. Face him away for Cleave.",
                healer = "Conflagration burns a player and makes them panic; heal them.",
                melee = "Conflagration spreads to nearby players; move away from a burning player.",
                ranged = "Spread out for Conflagration and Fire Nova.",
                dps = "Ranged: Spread out for Conflagration and Fire Nova.\nMelee: Conflagration spreads to nearby players; move away from a burning player.",
            },
            abilities = {
                { id = 23023, name = "Conflagration", icon = "Interface\\Icons\\spell_fire_incinerate", desc = "Burns the target over 10 sec and makes it panic." },
                { id = 23462, name = "Fire Nova", icon = "Interface\\Icons\\spell_fire_sealoffire", desc = "Fire damage to nearby enemies." },
                { id = 20691, name = "Cleave", icon = "Interface\\Icons\\ability_warrior_cleave", desc = "Hits the target and up to 4 nearby allies." },
                { id = 23931, name = "Thunderclap", icon = "Interface\\Icons\\spell_nature_thunderclap", desc = "Nature damage to nearby enemies and slows them for 10 sec." },
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
                { id = 16636, name = "Berserker Charge", icon = "Interface\\Icons\\Ability_Warrior_Charge", desc = "Charges a distant enemy, stunning them." },
            },
        },
        ["Spirestone Lord Magus"] = {
            overview = "A rare ogre mage. He casts Arcane Bolt, polymorphs players, and buffs his allies with Enlarge and Bloodlust.",
            roleTips = {
                tank = "Bloodlust and Enlarge make his allies hit much harder; tank them carefully.",
                healer = "Polymorph takes a player out of the fight; dispel it.",
                melee = "Kill him before his buffed adds.",
                ranged = "Interrupt Polymorph and Arcane Bolt.",
                dps = "Ranged: Interrupt Polymorph and Arcane Bolt.\nMelee: Kill him before his buffed adds.",
            },
            abilities = {
                { id = 15230, name = "Arcane Bolt", icon = "Interface\\Icons\\spell_arcane_starfire", desc = "Arcane damage on one target." },
                { id = 13323, name = "Polymorph", icon = "Interface\\Icons\\spell_nature_polymorph", desc = "Turns a player into a sheep for up to 20 sec." },
                { id = 8365, name = "Enlarge", icon = "Interface\\Icons\\spell_nature_strength", desc = "Raises an ally's Physical damage for 1 min." },
                { id = 16170, name = "Bloodlust", icon = "Interface\\Icons\\spell_nature_bloodlust", desc = "Raises an ally's attack speed by 60% for 30 sec." },
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
                { id = 8269, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Below 50% health, increases attack speed and physical damage." },
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
                { id = 3391, name = "Thrash", icon = "Interface\\Icons\\Ability_GhoulFrenzy", desc = "Gives the caster 2 extra attacks on the target." },
                { id = 15284, name = "Cleave", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Sweeping attack hitting up to 3 targets in front of the caster." },
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
                { id = 16172, name = "Venom Spit", icon = "Interface\\Icons\\Spell_Nature_CorrosiveBreath", desc = "Spits poisonous venom at a target." },
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
                { id = 16100, name = "Shoot", icon = "Interface\\Icons\\Ability_Marksmanship", desc = "Shoots a projectile at the target." },
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
                { id = 8269, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases attack speed by 60%." },
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
                { id = 8269, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Increases physical damage done." },
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

    ["Krol'dok Stronghold"] = {
        ["Slavecrusher Grox"] = {
            overview = "Patrols the Krol'dok mines, gains 30% attack speed for 30 sec from [Bloodlust], periodically knocks down the tank for 2 sec with [Knockdown], and calls nearby non-elite Redridge Prisoners with [Force Compliance]. Clear nearby gnolls before pulling.\nCallout: \"Clear the pull area. Prisoners first; watch the tank during Bloodlust.\"",
            roleTips = {
                tank = "Pull into your cleared area. Establish threat on Grox, then collect incoming prisoners so they do not overwhelm the healer. Reserve mitigation for [Bloodlust], especially when [Knockdown] overlaps.",
                healer = "Keep the tank healthy before [Knockdown] prevents them from acting. Expect heavier sustained tank damage during [Bloodlust], plus possible party damage while prisoners are being collected.",
                melee = "Switch to the prisoners immediately, kill them quickly, then return to Grox. Avoid chasing adds into uncleared mine packs.",
                ranged = "Help eliminate prisoners before they reach the healer. Keep your fighting position inside the cleared area rather than retreating deeper into the mines.",
                dps = "Melee: Switch to the prisoners immediately, kill them quickly, then return to Grox. Avoid chasing adds into uncleared mine packs.\nRanged: Help eliminate prisoners before they reach the healer. Keep your fighting position inside the cleared area rather than retreating deeper into the mines.",
            },
            abilities = {
                { id = 0, name = "Bloodlust", icon = "Interface\\Icons\\spell_nature_bloodlust", desc = "Increases attack speed by 30% for 30 sec." },
                { id = 0, name = "Knockdown", icon = "Interface\\Icons\\Ability_Warrior_PunishingBlow", desc = "Periodically knocks down the tank for 2 sec." },
                { id = 0, name = "Force Compliance", icon = "Interface\\Icons\\Ability_GolemThunderClap", desc = "Calls nearby low-health, non-elite Redridge Prisoners into the fight." },
            },
        },
        ["Twilight Commander Zarmok"] = {
            overview = "Patrols among Twilight's Hammer enemies; clear those enemies before engaging. Hits the tank with [Strike], deals massive damage within 8 yards via [Rending Whirl], and also uses [Enrage]. Keep non-melee outside 8 yards and minimize melee exposure.\nCallout: \"Ranged outside eight yards. Melee out for Whirl.\"",
            roleTips = {
                tank = "Fight in cleared space, away from nearby packs. Watch your health around [Strike] and prepare to reposition if needed for [Rending Whirl]; avoid dragging him onto ranged players.",
                healer = "Stay more than 8 yards from the boss. Prioritize the tank while watching for melee players caught by [Rending Whirl]. Maintain space to reposition without entering another pack.",
                melee = "Treat the 8-yard [Rending Whirl] as the main danger. Disengage when it is coming rather than trading your life for extra swings; return once it is safe.",
                ranged = "Remain beyond 8 yards throughout the fight. Maintain that distance if the tank moves the boss, and avoid positioning against uncleared enemies.",
                dps = "Melee: Treat the 8-yard [Rending Whirl] as the main danger. Disengage when it is coming rather than trading your life for extra swings; return once it is safe.\nRanged: Remain beyond 8 yards throughout the fight. Maintain that distance if the tank moves the boss, and avoid positioning against uncleared enemies.",
            },
            abilities = {
                { id = 0, name = "Strike", icon = "Interface\\Icons\\ability_rogue_ambush", desc = "Heavy weapon strike against the tank." },
                { id = 0, name = "Rending Whirl", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Deals massive damage to all players within 8 yards." },
                { id = 0, name = "Enrage", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Enrages the commander during the encounter." },
            },
        },
        ["War Handler Ashka"] = {
            overview = "Engages alongside two wolves, Snarlfang and Terrorhowl. Uses [Strike] on the tank and directs the wolves onto a random party member for 10 sec with [Command: Kill!]. Kill the wolves first one at a time and use stuns to reduce their pressure.\nCallout: \"Wolves first, one at a time. Call the fixate; stun the wolves.\"",
            roleTips = {
                tank = "Engage Ashka and the wolves, but expect [Command: Kill!] to send the wolves after someone else. Keep Ashka controlled while the party kills a marked wolf, then the second.",
                healer = "Watch the [Command: Kill!] target, not just the tank. Be ready to shift healing immediately when the wolves focus a party member.",
                melee = "Focus one wolf at a time. Coordinate stuns to reduce damage during the fixate rather than spending all your control at once.",
                ranged = "Focus the marked wolf alongside melee. If targeted, move within the cleared fighting area and keep the wolves accessible to your group instead of running into additional enemies.",
                dps = "Melee: Focus one wolf at a time. Coordinate stuns to reduce damage during the fixate rather than spending all your control at once.\nRanged: Focus the marked wolf alongside melee. If targeted, move within the cleared fighting area and keep the wolves accessible to your group instead of running into additional enemies.",
            },
            abilities = {
                { id = 0, name = "Command: Kill!", icon = "Interface\\Icons\\Ability_Gouge", desc = "Directs Snarlfang and Terrorhowl onto a random party member for 10 sec." },
                { id = 0, name = "Strike", icon = "Interface\\Icons\\ability_rogue_ambush", desc = "Weapon strike against the tank." },
            },
        },
        ["Nar'gurk"] = {
            overview = "Accompanied by a Shadowhide Curseweaver and two Twilight Warlocks (use Polymorph, Sap, or Fear on escorts where possible, otherwise kill them first). Casts [Shadow Bolt Volley] and uses [Convert] to mind-control a player until the party drops them to 50% health.\nCallout: \"Control the escorts. Convert target to fifty, then stop.\"",
            roleTips = {
                tank = "Agree on crowd-control targets before the pull. Hold Nar'gurk and any uncontrolled escorts without dragging them through controlled enemies.",
                healer = "Prepare for party damage from [Shadow Bolt Volley]. During [Convert], coordinate with DPS so healing does not work against lowering the controlled player to 50%; resume healing them once control breaks.",
                melee = "Kill uncontrolled escorts first. On [Convert], switch to controlled damage against the affected player and stop as soon as control breaks—do not continue your full burst rotation.",
                ranged = "Maintain assigned crowd control and avoid breaking it with area damage. Help bring converted players to 50% promptly, then return to the kill target.",
                dps = "Melee: Kill uncontrolled escorts first. On [Convert], switch to controlled damage against the affected player and stop as soon as control breaks—do not continue your full burst rotation.\nRanged: Maintain assigned crowd control and avoid breaking it with area damage. Help bring converted players to 50% promptly, then return to the kill target.",
            },
            abilities = {
                { id = 0, name = "Shadow Bolt Volley", icon = "Interface\\Icons\\Spell_Shadow_ShadowBolt", desc = "Inflicts Shadow damage to the party." },
                { id = 0, name = "Convert", icon = "Interface\\Icons\\Spell_Shadow_Possession", desc = "Controls a party member until the group brings that player down to 50% health." },
            },
        },
        ["Bossman Toof"] = {
            overview = "Bridge gauntlet followed by a boss fight with two Shaman escorts. Engaging the initial Centurions starts periodic waves of two Brutes, plus an approach pack of two Centurions and one Shaman. Clear a Brute wave right before pulling Toof; he uses [Mortal Strike], [Thunderclap], and [Demoralizing Shout].\nCallout: \"Finish the wave, then pull. Control Shamans; no boss tunnel.\"",
            roleTips = {
                tank = "Advance deliberately, not continuously. Pick up Brute waves and avoid stacking a wave, an approach pack, and the boss together. Start Toof just after a wave is handled, with his Shamans controlled or assigned as kill targets.",
                healer = "Treat the bridge as sustained combat with limited breathing room. Call for recovery before the boss pull. During [Mortal Strike], anticipate difficulty recovering the tank and coordinate defensive cooldowns rather than waiting until they are nearly dead.",
                melee = "Prioritize active Shamans, then finish other adds before committing to Toof. Use stuns to reduce overlapping damage. A Rogue can use Distract on approaching Brutes to buy time during the approach.",
                ranged = "Watch for incoming Brute waves and announce them early. Maintain assigned crowd control on the boss's Shamans, and help finish adds instead of tunneling Toof.",
                dps = "Melee: Prioritize active Shamans, then finish other adds before committing to Toof. Use stuns to reduce overlapping damage. A Rogue can use Distract on approaching Brutes to buy time during the approach.\nRanged: Watch for incoming Brute waves and announce them early. Maintain assigned crowd control on the boss's Shamans, and help finish adds instead of tunneling Toof.",
            },
            abilities = {
                { id = 0, name = "Mortal Strike", icon = "Interface\\Icons\\Ability_Warrior_Cleave", desc = "Heavy strike that reduces healing received on the tank." },
                { id = 0, name = "Thunderclap", icon = "Interface\\Icons\\spell_nature_thunderclap", desc = "Damages and slows nearby players." },
                { id = 0, name = "Demoralizing Shout", icon = "Interface\\Icons\\Ability_GolemThunderClap", desc = "Reduces attack power of nearby players." },
            },
        },
        ["Overlord Mugg"] = {
            overview = "Starts with two Krol'dok Centurions—control or kill them one at a time before pushing Mugg. Leaps to random players with [Crushing Slam] for AoE damage and knockback, and speeds up via [Mugg's Fury], swapping weapons until ending on [Set of Mauls] (+50% damage).\nCallout: \"Centurions first. Spread for leaps; defensives for Mauls.\"",
            roleTips = {
                tank = "Keep Mugg and uncontrolled Centurions managed while DPS clears escorts. After a leap, re-establish positioning without pulling the boss through the group. Save meaningful mitigation for the harder-hitting final [Set of Mauls] weapon phase.",
                healer = "Expect random-player damage and knockbacks from [Crushing Slam] alongside escalating tank pressure. Preserve enough mana and cooldowns for [Set of Mauls]; do not spend everything recovering avoidable early damage.",
                melee = "Kill uncontrolled Centurions first and avoid breaking controlled ones with cleave. Once the escorts are resolved, focus Mugg. Avoid unnecessary clustering with other party members when positioning allows.",
                ranged = "Spread away from other players to limit [Crushing Slam] splash and knockback. Use cleared space and avoid positions where a knockback could send you toward additional enemies. Save burst for after the escorts are handled.",
                dps = "Melee: Kill uncontrolled Centurions first and avoid breaking controlled ones with cleave. Once the escorts are resolved, focus Mugg. Avoid unnecessary clustering with other party members when positioning allows.\nRanged: Spread away from other players to limit [Crushing Slam] splash and knockback. Use cleared space and avoid positions where a knockback could send you toward additional enemies. Save burst for after the escorts are handled.",
            },
            abilities = {
                { id = 0, name = "Crushing Slam", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Jumps to a random player, damaging and knocking back that player and others nearby." },
                { id = 0, name = "Mugg's Fury", icon = "Interface\\Icons\\ability_ghoulfrenzy", desc = "Increases Mugg's attack speed as the fight progresses and he changes weapons." },
                { id = 0, name = "Set of Mauls", icon = "Interface\\Icons\\Ability_Smash", desc = "Final weapon stage that increases Mugg's damage by 50%." },
            },
        },
        ["Trash Drops"] = {
            overview = "|cffffd200[Dungeon Trash & Patrol Briefing]|r\nBefore each pull, settle the first kill target, crowd-control assignments, and where the group will stand. Clear space deliberately to avoid multi-pack overlaps and wandering three-enemy patrols.",
            roleTips = {
                tank = "Watch roads for three-enemy [Twilight Outrider] patrols and use line of sight to pull them away from other packs; a 10-sec Hooked Net can strand you (Blessing of Freedom helps). Avoid tanking multiple [Twilight Grunt] mobs together.",
                healer = "Anticipate heavy melee damage from [Twilight Grunt] Sunder Armor and Bladestorm, plus [Krol'dok Shaman] Lightning Bolt and Bloodlust pressure if Shamans are not burned first.",
                melee = "Respect [Twilight Grunt] 8-yard Bladestorm (especially when multiple are active). Kill [Krol'dok Shaman] targets first, stun/slow fleeing [Twilight Peon] runners immediately, and kick or stun dangerous casts.",
                ranged = "Stun or crowd-control [Twilight Grunt] packs, focus down [Krol'dok Shaman] targets first, and snare or stun fleeing [Twilight Peon] runners before they alert nearby enemies.",
                dps = "Melee: Respect [Twilight Grunt] 8-yard Bladestorm, kill [Krol'dok Shaman] targets first, and stun/slow fleeing [Twilight Peon] runners immediately.\nRanged: Stun or CC [Twilight Grunt] packs, focus [Krol'dok Shaman] targets first, and stop fleeing [Twilight Peon] runners before they pull extra enemies.",
            },
            abilities = {
                { id = 0, name = "Twilight Grunt", icon = "Interface\\Icons\\Ability_Whirlwind", desc = "Stun or crowd-control these enemies. Bladestorm damages players within 8 yards and Sunder Armor increases tank pressure." },
                { id = 0, name = "Twilight Outrider Patrol", icon = "Interface\\Icons\\ability_ensnare", desc = "Three-enemy road patrol; use line of sight to pull clear. Their 10-sec Hooked Net can strand the tank (Paladin Blessing of Freedom helps)." },
                { id = 0, name = "Twilight Peon", icon = "Interface\\Icons\\Ability_MeleeDamage", desc = "Stop runners immediately with stuns or slows; they move quickly to alert other enemies." },
                { id = 0, name = "Krol'dok Shaman / Centurion", icon = "Interface\\Icons\\spell_nature_bloodlust", desc = "Kill Shamans first to cut Lightning Bolt and Bloodlust pressure. Centurions add Mortal Strike, Thunderclap, and Demoralizing Shout." },
            },
        },
    },
    -- Alcaz Prison (new in Forever, live 2026-11-04). Only what early-run
    -- guides report; nothing here is guessed. Sources (checked 2026-11-12):
    -- Mobalytics "Alcaz Prison Dungeon Guide" (PhaseShifter, updated
    -- 2026-11-12) and ConquestCapped "WoW Forever Alcaz Prison Guide"
    -- (updated 2026-11-08). Full boss abilities are still unreported; add
    -- named spells only once a source lists them.
    ["Alcaz Prison"] = {
        ["Overseer Wrex"] = {
            overview = "Level 50. Found in a side room with six to eight Alcaz Jailers and Defias Bounty Hunters. When engaged he calls the whole room into the fight, so pull him back into the corridor and control the extra enemies. He drops the Overseer's Keyring that opens the locked door to the lower floor. Full abilities not yet reported.",
            roleTips = {
                tank = "Pull Wrex out of his room and into the corridor, not into the next room. Pick up the extra Jailers and Bounty Hunters.",
                healer = "Expect incoming damage from several enemies at once. Keep the tank alive while they gather the extra enemies.",
                dps = "Crowd-control the extra Jailers where possible (they are humanoids, so Polymorph and Sap work). Help kill the extra enemies while keeping damage on Wrex.",
            },
            abilities = {},
        },
        ["The Questioner"] = {
            overview = "Level 51 humanoid elite, the prison's torturer. Players report a much larger health pool than the other bosses, so the fight runs considerably longer. Groups have met him second, though the game's encounter list puts him fourth. Abilities not yet reported.",
            roleTips = {
                tank = "Hold threat for the whole encounter and be ready for a long fight.",
                healer = "Conserve mana; you will be healing through a prolonged fight.",
                dps = "Save damage cooldowns for this encounter and keep your damage steady throughout.",
            },
            abilities = {},
        },
        ["Tidemistress Ca'zass"] = {
            overview = "Level 50. Fights alongside naga adds (Strashaz Enchantresses) that repeatedly cast [Polymorph] on players. She casts [Blizzard] on the group, so move out of it.",
            roleTips = {
                tank = "Hold threat on Ca'zass and her adds, and help keep the naga adds under control.",
                healer = "Watch for players turned by [Polymorph]. Expect group damage from [Blizzard].",
                dps = "Kill the naga adds first, or interrupt [Polymorph] with Kick or Counterspell. A Grounding Totem can absorb spells. Move out of [Blizzard].",
            },
            abilities = {
                { id = 0, name = "Blizzard", icon = "Interface\\Icons\\Spell_Frost_IceStorm", desc = "Cast by Ca'zass on the group. Move out of the area." },
                { id = 0, name = "Polymorph", icon = "Interface\\Icons\\Spell_Nature_Polymorph", desc = "Cast repeatedly by her Strashaz Enchantress adds. Interruptible (Kick, Counterspell)." },
            },
        },
        ["Katerina the Cleaner"] = {
            overview = "Level 52, reported with two Alcaz Chaplains. Deals heavy fire damage to the whole group, and the room fills with fire effects that make her actions hard to read. Chained prisoners stand around the room: leave them alone until the fight is over (in one run a prisoner freed mid-fight broke the pull). Named abilities not yet reported.",
            roleTips = {
                tank = "Hold threat on Katerina, keep the fight controlled, and do not interact with the chained prisoners.",
                healer = "Drink to full mana before the pull. Expect heavy group-wide fire damage and keep the whole group up.",
                dps = "Burn Katerina fast to end the fight quickly. Do not free any chained prisoners during the fight.",
            },
            abilities = {},
        },
        ["Blazeroar"] = {
            overview = "Level 53 final boss. First appears as the prisoner Zarla Ober, who offers a quest to recover a shackle, then transforms into a red dragon. In the first reported run, fire spells had no effect on her, so fire-heavy groups should expect a slower kill. A hidden room behind her holds the Perfumed Note for the Horde chain. Other abilities not yet reported.",
            roleTips = {
                tank = "Hold threat on Blazeroar. No specific tank mechanics have been reliably documented yet.",
                healer = "Keep the group alive. No specific healing mechanics have been reliably documented yet.",
                dps = "Do not use fire damage; it was reported to have no effect. Fire Mages should switch to Frostbolt.",
            },
            abilities = {},
        },
        ["Trash Drops"] = {
            overview = "|cffffd200[Dungeon Trash & Route Hazards]|r\nEvery mob inside is an elite; going in at level 50 or higher is recommended. Pull every room back into the corridor. The Defias and naga are humanoids, so Polymorph and Sap work on them.",
            roleTips = {
                tank = "Pull each room into the corridor. Do not kite the hounds: they charge players who run, so fight them where they stand.",
                healer = "Every mob is an elite, so drink between pulls. Do not run from the hounds; they charge runners.",
                dps = "Bring interrupts and crowd control; Polymorph and Sap work on the Defias and naga. Do not run from the hounds.",
            },
            abilities = {},
        },
    },
    -- Blackmaw Hold (new in Forever). No role guide exists yet (checked
    -- 2026-11-12: Mobalytics has none; MMOnster says "tactics follow after
    -- the first runs"). Run reports: ConquestCapped "WoW Forever Blackmaw
    -- Hold Guide" (2026-11-08). Varrox's spells: Daybreak Forever
    -- "Discoveries" (client spell data, datamined, not yet seen in a
    -- reported run). Bosses with no reported info are left out on purpose.
    ["Blackmaw Hold"] = {
        ["Withermaw"] = {
            overview = "Level 58 elite beast, on a different route from Bonesnout (take both routes: Claws That Rend, Tusks that Gore needs a drop from each). No abilities recorded yet. Unconfirmed: if it is the rotting bear from Blizzard's preview, it leaves lava pools on the ground.",
            roleTips = {
                tank = "No tank mechanics documented yet. If lava pools appear (unconfirmed), move the fight out of them.",
                healer = "No healing mechanics documented yet.",
                dps = "No DPS mechanics documented yet. If lava pools appear (unconfirmed), stay out of them.",
            },
            abilities = {},
        },
        ["Impaan the Imprisoner"] = {
            overview = "Level 57 elite demon. No abilities recorded yet.",
            roleTips = {
                tank = "No tank mechanics documented yet.",
                healer = "No healing mechanics documented yet.",
                dps = "No DPS mechanics documented yet.",
            },
            abilities = {},
        },
        ["Elder Shaman Bloodmane"] = {
            overview = "Elder shaman of the Blackmaw clan; carries the Blackmaw Ritual Totem for Blackmaw Magic. Level and abilities not recorded yet.",
            roleTips = {
                tank = "No tank mechanics documented yet.",
                healer = "No healing mechanics documented yet.",
                dps = "Furbolg shamans are casters, so bring interrupts. No boss-specific mechanics documented yet.",
            },
            abilities = {},
        },
        ["Bonesnout the Unbroken"] = {
            overview = "Level 58 elite undead boar. Legashi Ritualists around it empower the boar, making its tusks deadlier and its hide harder to break (per Blizzard's preview). Drops the Tusks of the Unbroken quest item. Other abilities not recorded yet.",
            roleTips = {
                tank = "Make sure the Legashi Ritualists are killed or crowd-controlled before you pull the boar.",
                healer = "Expect a harder fight if any Ritualist is left empowering the boar.",
                dps = "Kill or crowd-control the Legashi Ritualists first, then the boar.",
            },
            abilities = {},
        },
        ["Varrox Bleakhoof"] = {
            overview = "Level 60 elite demon; his kill completes Blackmaw Hold for Master Spelunker. Drops the Head of Varrox Bleakhoof. Abilities below come from the game's spell data (datamined), not yet confirmed by a reported run: [Crimson Wrest] pulls the whole party to him, and [Nightmare Detonation] marks every player for 10 sec, then hits within 10 yards and leaves a shadow pool. The datamine notes the marks overlap if players don't spread before Crimson Wrest pulls them together.",
            roleTips = {
                tank = "During [Crimson Wrest] everyone, you included, walks to Varrox and cannot act for 6 sec. Move out of shadow pools.",
                healer = "[Crimson Wrest] stops you casting for 6 sec. Expect Shadow damage when [Nightmare Detonation] marks expire, more if marked players are stacked.",
                dps = "Spread out when marked by [Nightmare Detonation] and do not stand in the shadow pools it leaves.",
            },
            abilities = {
                { id = 0, name = "Crimson Wrest", icon = "Interface\\Icons\\Spell_Shadow_Possession", desc = "Datamined. 2 sec cast, whole room: for 6 sec every player is forced to walk towards Varrox, unable to act, and slowed by 60%." },
                { id = 0, name = "Nightmare Detonation", icon = "Interface\\Icons\\Spell_Shadow_UnholyFrenzy", desc = "Datamined (tied to Varrox by spell ID block, not by name). 2 sec cast marks every player for 10 sec; on expiry 50 Shadow damage within 10 yards and a shadow pool dealing 20 Shadow damage per sec." },
            },
        },
        ["Blackmaw Behemoth"] = {
            overview = "Elite beast. Level and abilities not recorded yet.",
            roleTips = {
                tank = "No tank mechanics documented yet.",
                healer = "No healing mechanics documented yet.",
                dps = "No DPS mechanics documented yet.",
            },
            abilities = {},
        },
        ["Unbound Spirit"] = {
            overview = "Elite elemental, last in the game's encounter list. The fight has not been described yet.",
            roleTips = {
                tank = "No tank mechanics documented yet.",
                healer = "No healing mechanics documented yet.",
                dps = "No DPS mechanics documented yet.",
            },
            abilities = {},
        },
        ["Moontouched Wanderer"] = {
            overview = "Level 55 rare elite beast. It does not always spawn; kill it whenever you find it. No abilities recorded yet.",
            roleTips = {
                tank = "No tank mechanics documented yet.",
                healer = "No healing mechanics documented yet.",
                dps = "No DPS mechanics documented yet.",
            },
            abilities = {},
        },
        ["Trash Drops"] = {
            overview = "|cffffd200[Dungeon Trash & Route Hazards]|r\nCollect the quests before entering (the givers are in the capitals, Dalaran and Azshara) and plan one long session. Take both routes: Withermaw and Bonesnout are on different paths. Blackmaw Shamans and Blackmaw Totemics appear among the warriors, so many packs have casters.",
            roleTips = {
                tank = "Many packs include Blackmaw Shamans and Totemics; pull casters to you with line of sight.",
                healer = "Plan for a long session; the dungeon has several routes.",
                dps = "Bring interrupts for the caster-heavy packs (Blackmaw Shamans and Totemics).",
            },
            abilities = {},
        },
    },
    -- Shaper's Terrace (new in Forever). No role guide exists yet (checked
    -- 2026-11-12). Sources: MMOnster "Shaper's Terrace" (2026-11-10) and
    -- Daybreak Forever "Launch day: every boss in the five new dungeons"
    -- (2026-11-04, client data). Bosses with no reported info are left out.
    ["Shaper's Terrace"] = {
        ["Nanaya"] = {
            overview = "Final boss: a giant in titan armour; her kill completes Shaper's Terrace for Master Spelunker. The game's spell data (datamined) shows she slams the ground and stuns everyone nearby. No run has reported her tactics yet.",
            roleTips = {
                tank = "Expect a ground slam that stuns everyone near her (datamined). No other tank mechanics documented yet.",
                healer = "Stay out of her slam range if you can; it stuns everyone nearby (datamined).",
                dps = "Ranged: stay out of her slam range; it stuns everyone nearby (datamined).\nMelee: you will be in range of her stunning slam (datamined); no other mechanics documented yet.",
            },
            abilities = {
                { id = 0, name = "Ground Slam", icon = "Interface\\Icons\\Ability_WarStomp", desc = "Datamined; exact spell name not published. Slams the ground and stuns everyone nearby." },
            },
        },
        ["Cinder"] = {
            overview = "Elite red-and-orange raptor. Spawns after someone uses the Archival Panel (a November 9 hotfix fixed this spawn). Drops loot and higher-level skinning materials. Abilities not reported yet.",
            roleTips = {
                tank = "Use the Archival Panel only when the group is ready; it spawns Cinder. No tank mechanics documented yet.",
                healer = "No healing mechanics documented yet.",
                dps = "No DPS mechanics documented yet.",
            },
            abilities = {},
        },
    },
}
