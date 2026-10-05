import json
import re

with open('scratch/all_abilities_dump.txt', 'r', encoding='utf-8') as f:
    dump_text = f.read()

# Load classic NPC spells
with open('scratch/classic_boss_spells.json', 'r', encoding='utf-8') as f:
    npc_spells = json.load(f)

# Load resolved spells from fast_resolve
with open('scratch/resolved_spells.json', 'r', encoding='utf-8') as f:
    resolved_data = json.load(f)

resolved_by_name = {r['name'].lower(): r for r in resolved_data['resolved']}

# Parse all 177 abilities
abilities = []
cur_dun = ""
cur_boss = ""
for line in dump_text.splitlines():
    m_dun = re.match(r'^=== DUNGEON: (.*) ===', line)
    if m_dun:
        cur_dun = m_dun.group(1).strip()
        continue
    m_boss = re.match(r'^\s\sBoss: (.*)', line)
    if m_boss:
        cur_boss = m_boss.group(1).strip()
        continue
    m_ab = re.match(r'^\s\s\s\sLine (\d+): ID=(\d+) \| Name=\'([^\']+)\' \| Icon=\'([^\']+)\'', line)
    if m_ab:
        abilities.append({
            'line': int(m_ab.group(1)),
            'id': int(m_ab.group(2)),
            'name': m_ab.group(3),
            'icon': m_ab.group(4),
            'dungeon': cur_dun,
            'boss': cur_boss
        })

print(f"Loaded {len(abilities)} total abilities.")

# Build mapping
master_updates = []

for ab in abilities:
    name = ab['name']
    boss = ab['boss']
    dun = ab['dungeon']
    curr_id = ab['id']
    curr_icon = ab['icon']
    
    assigned_id = None
    assigned_spell_name = None
    assigned_icon = curr_icon
    status = "CUSTOM"
    
    # 1. Check NPC spells first
    if boss in npc_spells:
        for s in npc_spells[boss]:
            norm_s = s['name'].lower().replace("'", "").replace(":", "").replace("-", "").replace(" ", "")
            norm_a = name.lower().replace("'", "").replace(":", "").replace("-", "").replace(" ", "")
            if norm_s == norm_a or (norm_s in norm_a and len(norm_s) > 4) or (norm_a in norm_s and len(norm_a) > 4):
                assigned_id = s['id']
                assigned_spell_name = s['name']
                if s['icon'] and not s['icon'].startswith('INV_'):
                    assigned_icon = "Interface\\Icons\\" + s['icon']
                status = "NPC_MATCH"
                break
    
    # 2. Check resolved exact spells
    if not assigned_id:
        norm_a = name.lower()
        if norm_a in resolved_by_name:
            r = resolved_by_name[norm_a]
            assigned_id = r['resolved_id']
            assigned_spell_name = r['resolved_name']
            if r.get('resolved_icon'):
                assigned_icon = "Interface\\Icons\\" + r['resolved_icon']
            status = "EXACT_SPELL_MATCH"
    
    # 3. Known specific boss ability IDs in Classic
    KNOWN_OVERRIDES = {
        ("The Deadmines", "Edwin VanCleef", "Sinister Strike"): (1752, "Sinister Strike", "Interface\\Icons\\Spell_Shadow_RitualOfSacrifice"),
        ("The Deadmines", "Captain Greenskin", "Poisoned Harpoon"): (5208, "Poisoned Harpoon", "Interface\\Icons\\INV_ThrowingKnife_04"),
        ("The Deadmines", "Mr. Smite", "Smite Slam"): (6435, "Smite Slam", "Interface\\Icons\\Ability_Smash"),
        ("The Deadmines", "Mr. Smite", "Smite Stomp"): (6432, "Smite Stomp", "Interface\\Icons\\Ability_WarStomp"),
        ("The Deadmines", "Miner Johnson", "Gold Dust"): (773, "Gold Dust", "Interface\\Icons\\INV_Misc_Dust_02"),
        ("The Deadmines", "Miner Johnson", "Enrage"): (8269, "Enrage", "Interface\\Icons\\Spell_Shadow_UnholyFrenzy"),
        ("The Deadmines", "Sneed's Shredder", "Terrify"): (7399, "Terrify", "Interface\\Icons\\Spell_Shadow_Possession"),
        ("The Deadmines", "Sneed's Shredder", "Disarm"): (6713, "Disarm", "Interface\\Icons\\Ability_Warrior_Disarm"),
        ("The Deadmines", "Gilnid", "Molten Metal"): (5213, "Molten Metal", "Interface\\Icons\\Spell_Fire_Fireball"),
        ("The Deadmines", "Gilnid", "Sunder Armor"): (7386, "Sunder Armor", "Interface\\Icons\\Ability_Warrior_Sunder"),
        ("The Deadmines", "Cookie", "Acid Spit"): (9591, "Acid Spit", "Interface\\Icons\\Spell_Nature_Acid_01"),
        
        ("Wailing Caverns", "Lord Cobrahn", "Viper Form"): (7965, "Cobrahn Serpent Form", "Interface\\Icons\\Spell_Nature_GuardianWard"),
        ("Wailing Caverns", "Lord Cobrahn", "Healing Touch"): (5187, "Healing Touch", "Interface\\Icons\\Spell_Nature_HealingTouch"),
        ("Wailing Caverns", "Lord Cobrahn", "Sleep"): (700, "Sleep", "Interface\\Icons\\Spell_Nature_Sleep"),
        ("Wailing Caverns", "Lady Anacondra", "Healing Touch"): (5187, "Healing Touch", "Interface\\Icons\\Spell_Nature_HealingTouch"),
        ("Wailing Caverns", "Lady Anacondra", "Sleep"): (700, "Sleep", "Interface\\Icons\\Spell_Nature_Sleep"),
        ("Wailing Caverns", "Lord Pythas", "Healing Touch"): (5187, "Healing Touch", "Interface\\Icons\\Spell_Nature_HealingTouch"),
        ("Wailing Caverns", "Lord Pythas", "Sleep"): (700, "Sleep", "Interface\\Icons\\Spell_Nature_Sleep"),
        ("Wailing Caverns", "Lord Serpentis", "Healing Touch"): (6778, "Healing Touch", "Interface\\Icons\\Spell_Nature_HealingTouch"),
        ("Wailing Caverns", "Lord Serpentis", "Sleep"): (700, "Sleep", "Interface\\Icons\\Spell_Nature_Sleep"),
        ("Wailing Caverns", "Kresh", "Shell Shield"): (26064, "Shell Shield", "Interface\\Icons\\Ability_Hunter_Pet_Turtle"),
        ("Wailing Caverns", "Skum", "Chain Lightning"): (6254, "Chained Bolt", "Interface\\Icons\\Spell_Nature_ChainLightning"),
        ("Wailing Caverns", "Verdan the Everliving", "Grasping Vines"): (8142, "Grasping Vines", "Interface\\Icons\\Spell_Nature_StrangleVines"),
        ("Wailing Caverns", "Mutanus the Devourer", "Thrash"): (3391, "Thrash", "Interface\\Icons\\Ability_GhoulFrenzy"),
        ("Wailing Caverns", "Mutanus the Devourer", "Narcolepsy"): (8399, "Sleep", "Interface\\Icons\\Spell_Nature_Sleep"),
        ("Wailing Caverns", "Deviate Faerie Dragon", "Mana Burn"): (11989, "Mana Burn", "Interface\\Icons\\Spell_Shadow_ManaBurn"),

        ("Shadowfang Keep", "Rethilgore", "Soul Drain"): (7295, "Soul Drain", "Interface\\Icons\\Spell_Shadow_LifeDrain02"),
        ("Shadowfang Keep", "Razorclaw the Butcher", "Gouge"): (1776, "Gouge", "Interface\\Icons\\Ability_Gouge"),
        ("Shadowfang Keep", "Baron Silverlaine", "Veil of Shadow"): (7068, "Veil of Shadow", "Interface\\Icons\\Spell_Shadow_GatherShadows"),
        ("Shadowfang Keep", "Commander Springvale", "Shield of the Perished"): (0, None, "Interface\\Icons\\Spell_Holy_SealOfProtection"),
        ("Shadowfang Keep", "Odo the Blindwatcher", "Howling Rage"): (7481, "Howling Rage", "Interface\\Icons\\Ability_BullRush"),
        ("Shadowfang Keep", "Deathsworn Captain", "Whirlwind"): (15589, "Whirlwind", "Interface\\Icons\\Ability_Whirlwind"),
        ("Shadowfang Keep", "Deathsworn Captain", "Cleave"): (15496, "Cleave", "Interface\\Icons\\Ability_Warrior_Cleave"),
        ("Shadowfang Keep", "Fenrus the Devourer", "Double Attack"): (3391, "Thrash", "Interface\\Icons\\Ability_GhoulFrenzy"),
        ("Shadowfang Keep", "Wolf Master Nandos", "Call Lupine Horrors"): (7489, "Call Lupine Horror", "Interface\\Icons\\Ability_Hunter_Pet_Wolf"),
        ("Shadowfang Keep", "Archmage Arugal", "Shadow Bolt"): (9613, "Shadow Bolt", "Interface\\Icons\\Spell_Shadow_ShadowBolt"),
        ("Shadowfang Keep", "Archmage Arugal", "Thundershock"): (7803, "Thundershock", "Interface\\Icons\\Spell_Lightning_LightningBolt01"),
        ("Shadowfang Keep", "Archmage Arugal", "Arugal's Curse"): (14515, "Dominate Mind", "Interface\\Icons\\Spell_Shadow_ShadowWordDominate"),

        ("The Stockade", "Targorr the Dread", "Cleave"): (15496, "Cleave", "Interface\\Icons\\Ability_Warrior_Cleave"),
        ("The Stockade", "Kam Deepfury", "Enrage"): (8599, "Enrage", "Interface\\Icons\\Spell_Shadow_UnholyFrenzy"),
        ("The Stockade", "Hamhock", "Chain Slam"): (0, None, "Interface\\Icons\\Ability_WarStomp"),
        ("The Stockade", "Dextren Ward", "Terrifying Roar"): (14100, "Terrifying Roar", "Interface\\Icons\\Ability_Physical_Taunt"),
        ("The Stockade", "Bazil Thredd", "Evasion"): (5277, "Evasion", "Interface\\Icons\\Spell_Shadow_ShadowWard"),
        ("The Stockade", "Bazil Thredd", "Sinister Strike"): (1752, "Sinister Strike", "Interface\\Icons\\Spell_Shadow_RitualOfSacrifice"),
        ("The Stockade", "Bruegal Ironknuckle", "Concussion Blow"): (12809, "Concussion Blow", "Interface\\Icons\\Ability_ThunderBolt"),

        ("Blackfathom Deeps", "Ghamoo-ra", "Triple Chomp"): (0, None, "Interface\\Icons\\Ability_Hunter_Pet_Turtle"),
        ("Blackfathom Deeps", "Lady Sarevess", "Frost Nova"): (865, "Frost Nova", "Interface\\Icons\\Spell_Frost_FrostNova"),
        ("Blackfathom Deeps", "Lady Sarevess", "Forked Lightning"): (8435, "Forked Lightning", "Interface\\Icons\\Spell_Nature_ChainLightning"),
        ("Blackfathom Deeps", "Gelihast", "Curse of the Deep"): (0, None, "Interface\\Icons\\Spell_Shadow_CurseOfMannoroth"),
        ("Blackfathom Deeps", "Gelihast", "Shadow Bubble"): (0, None, "Interface\\Icons\\Spell_Shadow_AntiShadow"),
        ("Blackfathom Deeps", "Lorgus Jett", "Healing Stream Totem"): (5675, "Healing Stream Totem", "Interface\\Icons\\INV_Spear_04"),
        ("Blackfathom Deeps", "Lorgus Jett", "Frost Shock"): (8056, "Frost Shock", "Interface\\Icons\\Spell_Frost_FrostShock"),
        ("Blackfathom Deeps", "Baron Aquanis", "Frostbolt"): (15043, "Frostbolt", "Interface\\Icons\\Spell_Frost_FrostBolt02"),
        ("Blackfathom Deeps", "Baron Aquanis", "Tidal Wave"): (0, None, "Interface\\Icons\\Spell_Frost_SummonWaterElemental"),
        ("Blackfathom Deeps", "Old Serra'kis", "Corrosive Spit"): (9591, "Acid Spit", "Interface\\Icons\\Spell_Nature_Acid_01"),
        ("Blackfathom Deeps", "Twilight Lord Kelris", "Sleep"): (8399, "Sleep", "Interface\\Icons\\Spell_Nature_Sleep"),
        ("Blackfathom Deeps", "Twilight Lord Kelris", "Mind Blast"): (15587, "Mind Blast", "Interface\\Icons\\Spell_Shadow_UnholyFrenzy"),
        ("Blackfathom Deeps", "Aku'mai", "Corrosive Bite"): (0, None, "Interface\\Icons\\Spell_Nature_Acid_01"),
        ("Blackfathom Deeps", "Aku'mai", "Void Spray"): (0, None, "Interface\\Icons\\Spell_Shadow_CallofBone"),
        ("Blackfathom Deeps", "Aku'mai", "Enrage"): (3490, "Frenzied Rage", "Interface\\Icons\\Spell_Shadow_UnholyFrenzy"),

        ("Gnomeregan", "Grubbis", "Petrifying Gaze"): (10252, "Petrifying Gaze", "Interface\\Icons\\Spell_Nature_Sleep"),
        ("Gnomeregan", "Grubbis", "Trogg Smash"): (12734, "Ground Tremor", "Interface\\Icons\\Ability_MaceRagDoll"),
        ("Gnomeregan", "Viscous Fallout", "Radioactive Aura"): (0, None, "Interface\\Icons\\Spell_Shadow_CreepingPlague"),
        ("Gnomeregan", "Viscous Fallout", "Toxic Cloud"): (3815, "Poison Cloud", "Interface\\Icons\\Spell_Nature_AbolishPoison"),
        ("Gnomeregan", "Electrocutioner 6000", "Megavolt"): (11082, "Megavolt", "Interface\\Icons\\Spell_Nature_ChainLightning"),
        ("Gnomeregan", "Electrocutioner 6000", "Shock Shield"): (11084, "Shock", "Interface\\Icons\\Spell_Nature_LightningShield"),
        ("Gnomeregan", "Crowd Pummeler 9-60", "Pummel Whirlwind"): (15589, "Whirlwind", "Interface\\Icons\\Ability_Whirlwind"),
        ("Gnomeregan", "Crowd Pummeler 9-60", "Crowd Punt"): (10887, "Crowd Pummel", "Interface\\Icons\\Ability_WarStomp"),
        ("Gnomeregan", "Mekgineer Thermaplugg", "Deploy Walking Bombs"): (0, None, "Interface\\Icons\\Spell_Fire_SelfDestruct"),
        ("Gnomeregan", "Mekgineer Thermaplugg", "Knock Away"): (10101, "Knock Away", "Interface\\Icons\\Ability_Kick"),
        ("Gnomeregan", "Mekgineer Thermaplugg", "Toxic Vent Discharge"): (0, None, "Interface\\Icons\\Spell_Nature_CorrosiveBreath"),
        ("Gnomeregan", "Dark Iron Ambassador", "Incendiary Shot"): (8269, "Incendiary Shot", "Interface\\Icons\\Spell_Fire_Fireball02"),
        ("Gnomeregan", "Dark Iron Ambassador", "Explosive Trap"): (13813, "Explosive Trap", "Interface\\Icons\\Spell_Fire_SelfDestruct"),

        ("Razorfen Kraul", "Roogug", "Earth Spike"): (0, None, "Interface\\Icons\\Spell_Nature_Earthquake"),
        ("Razorfen Kraul", "Roogug", "Bramble Entanglement"): (8391, "Entangling Roots", "Interface\\Icons\\Spell_Nature_StrangleVines"),
        ("Razorfen Kraul", "Aggem Thorncurse", "Shadow Bolt Volley"): (15245, "Shadow Bolt Volley", "Interface\\Icons\\Spell_Shadow_ShadowBolt"),
        ("Razorfen Kraul", "Aggem Thorncurse", "Curse of Thorns"): (6909, "Curse of Thorns", "Interface\\Icons\\Spell_Shadow_AntiShadow"),
        ("Razorfen Kraul", "Death Speaker Jargba", "Dominate Mind"): (14515, "Dominate Mind", "Interface\\Icons\\Spell_Shadow_ShadowWordDominate"),
        ("Razorfen Kraul", "Death Speaker Jargba", "Bone Shield"): (0, None, "Interface\\Icons\\Spell_Shadow_GrimWard"),
        ("Razorfen Kraul", "Overlord Ramtusk", "Cleave"): (15496, "Cleave", "Interface\\Icons\\Ability_Warrior_Cleave"),
        ("Razorfen Kraul", "Overlord Ramtusk", "Enrage"): (8599, "Enrage", "Interface\\Icons\\Spell_Shadow_UnholyFrenzy"),
        ("Razorfen Kraul", "Agathelos the Raging", "Earth Stomp"): (5624, "War Stomp", "Interface\\Icons\\Ability_WarStomp"),
        ("Razorfen Kraul", "Agathelos the Raging", "Raging Charge"): (100, "Charge", "Interface\\Icons\\Ability_Warrior_Charge"),
        ("Razorfen Kraul", "Charlga Razorflank", "Chain Lightning"): (8292, "Chain Bolt", "Interface\\Icons\\Spell_Nature_ChainLightning"),
        ("Razorfen Kraul", "Charlga Razorflank", "Crystalline Slumber"): (8399, "Sleep", "Interface\\Icons\\Spell_Nature_Sleep"),
        ("Razorfen Kraul", "Charlga Razorflank", "Drain Life"): (689, "Drain Life", "Interface\\Icons\\Spell_Shadow_LifeDrain02"),
        ("Razorfen Kraul", "Blind Hunter", "Sonic Screech"): (0, None, "Interface\\Icons\\Ability_Hunter_Pet_Bat"),
        ("Razorfen Kraul", "Blind Hunter", "Corrosive Bat Venom"): (0, None, "Interface\\Icons\\Spell_Nature_CorrosiveBreath"),
        ("Razorfen Kraul", "Earthcaller Halmgar", "Frost Shock"): (8056, "Frost Shock", "Interface\\Icons\\Spell_Frost_FrostShock"),
        ("Razorfen Kraul", "Earthcaller Halmgar", "Strength of Earth Totem"): (8075, "Strength of Earth Totem", "Interface\\Icons\\Spell_Nature_EarthBindTotem"),

        ("Scarlet Monastery: Graveyard", "Interrogator Vishas", "Shadow Word: Pain"): (589, "Shadow Word: Pain", "Interface\\Icons\\Spell_Shadow_ShadowWordPain"),
        ("Scarlet Monastery: Graveyard", "Interrogator Vishas", "Naughty Secret"): (0, None, "Interface\\Icons\\Spell_Fire_Immolation"),
        ("Scarlet Monastery: Graveyard", "Azshir the Sleepless", "Terrifying Shriek"): (7399, "Terrify", "Interface\\Icons\\Spell_Shadow_PsychicScream"),
        ("Scarlet Monastery: Graveyard", "Azshir the Sleepless", "Call Crypt Ghouls"): (0, None, "Interface\\Icons\\Spell_Shadow_RaiseDead"),
        ("Scarlet Monastery: Graveyard", "Fallen Champion", "Desecrated Strike"): (0, None, "Interface\\Icons\\Ability_Warrior_Cleave"),
        ("Scarlet Monastery: Graveyard", "Fallen Champion", "Unholy Aura"): (8289, "Unholy Aura", "Interface\\Icons\\Spell_Shadow_UnholyFrenzy"),
        ("Scarlet Monastery: Graveyard", "Ironspine", "Bone Slam"): (0, None, "Interface\\Icons\\Ability_WarStomp"),
        ("Scarlet Monastery: Graveyard", "Ironspine", "Cleave"): (15496, "Cleave", "Interface\\Icons\\Ability_Warrior_Cleave"),
        ("Scarlet Monastery: Graveyard", "Bloodmage Thalnos", "Shadow Bolt Volley"): (15245, "Shadow Bolt Volley", "Interface\\Icons\\Spell_Shadow_ShadowBolt"),
        ("Scarlet Monastery: Graveyard", "Bloodmage Thalnos", "Flame Shock"): (8053, "Flame Shock", "Interface\\Icons\\Spell_Fire_FlameShock"),
        ("Scarlet Monastery: Graveyard", "Bloodmage Thalnos", "Raise Fallen Crusaders"): (0, None, "Interface\\Icons\\Spell_Shadow_RaiseDead"),
        
        # Ragefire Chasm
        ("Ragefire Chasm", "Oggleflint", "Cleave"): (797, "Cleave", "Interface\\Icons\\Ability_Warrior_Cleave"),
        ("Ragefire Chasm", "Oggleflint", "Intimidating Roar"): (5246, "Intimidating Shout", "Interface\\Icons\\Ability_GolemThunderClap"),
        ("Ragefire Chasm", "Taragaman the Hungerer", "Uppercut"): (18072, "Uppercut", "Interface\\Icons\\INV_Gauntlets_05"),
        ("Ragefire Chasm", "Taragaman the Hungerer", "Fire Nova"): (8349, "Fire Nova", "Interface\\Icons\\Spell_Fire_SealOfFire"),
        ("Ragefire Chasm", "Jergosh the Invoker", "Immolate"): (348, "Immolate", "Interface\\Icons\\Spell_Fire_Immolation"),
        ("Ragefire Chasm", "Jergosh the Invoker", "Curse of Weakness"): (702, "Curse of Weakness", "Interface\\Icons\\Spell_Shadow_CurseOfMannoroth"),
        ("Ragefire Chasm", "Bazzalan", "Poison"): (744, "Poison", "Interface\\Icons\\Spell_Nature_CorrosiveBreath"),
        ("Ragefire Chasm", "Bazzalan", "Sinister Strike"): (1752, "Sinister Strike", "Interface\\Icons\\Spell_Shadow_RitualOfSacrifice"),

        # Custom Beta Dungeons
        ("Hall of Thanes", "Faldrim Anvilmar", "Whirlwind"): (15589, "Whirlwind", "Interface\\Icons\\Ability_Whirlwind"),
        ("Hall of Thanes", "Faldrim Anvilmar", "Ancestral Call"): (0, None, "Interface\\Icons\\Spell_Holy_PrayerOfHealing"),
        ("Hall of Thanes", "Faldrim Anvilmar", "Cleave"): (797, "Cleave", "Interface\\Icons\\Ability_Warrior_Cleave"),
        ("Hall of Thanes", "Magmatus", "Molten Breath"): (12466, "Molten Breath", "Interface\\Icons\\Spell_Fire_Fire"),
        ("Hall of Thanes", "Magmatus", "Molten Eruption"): (0, None, "Interface\\Icons\\Spell_Fire_SelfDestruct"),
        ("Hall of Thanes", "Magmatus", "Fire Shield"): (134, "Fire Shield", "Interface\\Icons\\Spell_Fire_Immolation"),
        ("Hall of Thanes", "Plunder", "Gouge"): (1776, "Gouge", "Interface\\Icons\\Ability_Gouge"),
        ("Hall of Thanes", "Plunder", "Throw Dynamite"): (7978, "Throw Dynamite", "Interface\\Icons\\Spell_Fire_SelfDestruct"),
        ("Hall of Thanes", "Plunder", "Smoke Bomb"): (7964, "Smoke Bomb", "Interface\\Icons\\Ability_Vanish"),
        ("Hall of Thanes", "Durgen Dirgehammer", "Thunderclap"): (15588, "Thunderclap", "Interface\\Icons\\Spell_Nature_ThunderClap"),
        ("Hall of Thanes", "Durgen Dirgehammer", "Ground Slam"): (0, None, "Interface\\Icons\\Ability_WarStomp"),
        ("Hall of Thanes", "Durgen Dirgehammer", "Call Reinforcements"): (0, None, "Interface\\Icons\\INV_Misc_Horn_01"),

        ("Ruins of Lordaeron", "The Baron", "Dominate Mind"): (14515, "Dominate Mind", "Interface\\Icons\\Spell_Shadow_ShadowWordDominate"),
        ("Ruins of Lordaeron", "The Baron", "Shadow Bolt Volley"): (15245, "Shadow Bolt Volley", "Interface\\Icons\\Spell_Shadow_ShadowBolt"),
        ("Ruins of Lordaeron", "The Baron", "Curse of Agony"): (980, "Curse of Agony", "Interface\\Icons\\Spell_Shadow_CurseOfSargeras"),
        ("Ruins of Lordaeron", "Witherfang", "Envenomed Bite"): (0, None, "Interface\\Icons\\Spell_Nature_NullifyPoison"),
        ("Ruins of Lordaeron", "Witherfang", "Terrifying Howl"): (8715, "Terrifying Howl", "Interface\\Icons\\Ability_Physical_Taunt"),
        ("Ruins of Lordaeron", "The Abandoned", "Heavy Cleave"): (15284, "Cleave", "Interface\\Icons\\Ability_Warrior_Cleave"),
        ("Ruins of Lordaeron", "The Abandoned", "Noxious Cloud"): (21070, "Noxious Cloud", "Interface\\Icons\\Spell_Shadow_CreepingPlague"),
        ("Ruins of Lordaeron", "Bjork", "Frenzied Rage"): (3490, "Frenzied Rage", "Interface\\Icons\\Ability_Druid_Enrage"),
        ("Ruins of Lordaeron", "Bjork", "Mortal Strike"): (9347, "Mortal Strike", "Interface\\Icons\\Ability_Warrior_SavageBlow"),
        ("Ruins of Lordaeron", "Rath'mael", "Blizzard"): (10, "Blizzard", "Interface\\Icons\\Spell_Frost_IceStorm"),
        ("Ruins of Lordaeron", "Rath'mael", "Frost Nova"): (15531, "Frost Nova", "Interface\\Icons\\Spell_Frost_FrostNova"),
        ("Ruins of Lordaeron", "Rath'mael", "Frostbolt"): (116, "Frostbolt", "Interface\\Icons\\Spell_Frost_FrostBolt02"),
        ("Ruins of Lordaeron", "Viktor the Vile", "Acid Splash"): (6306, "Acid Splash", "Interface\\Icons\\Spell_Nature_Acid_01"),
        ("Ruins of Lordaeron", "Viktor the Vile", "Explosive Concoction"): (0, None, "Interface\\Icons\\Spell_Fire_SelfDestruct"),
        ("Ruins of Lordaeron", "Lordaeron Captain", "Shield Wall"): (871, "Shield Wall", "Interface\\Icons\\Ability_Warrior_ShieldWall"),
        ("Ruins of Lordaeron", "Lordaeron Captain", "Shield Slam"): (15655, "Shield Slam", "Interface\\Icons\\INV_Shield_05"),

        ("Excavation Site: Wetlands", "Saltspine", "Crushing Bite"): (0, None, "Interface\\Icons\\Ability_Druid_Rake"),
        ("Excavation Site: Wetlands", "Saltspine", "Tail Sweep"): (15847, "Tail Sweep", "Interface\\Icons\\INV_Misc_MonsterTail_03"),
        ("Excavation Site: Wetlands", "Saltspine", "Frenzy"): (28131, "Frenzy", "Interface\\Icons\\Spell_Shadow_UnholyFrenzy"),
        ("Excavation Site: Wetlands", "Shadetooth", "Earthquake"): (13323, "Earthquake", "Interface\\Icons\\Spell_Nature_Earthquake"),
        ("Excavation Site: Wetlands", "Shadetooth", "Skull Crack"): (3551, "Skull Crack", "Interface\\Icons\\Spell_Frost_Stun"),
        ("Excavation Site: Wetlands", "Shadetooth", "Call of the Dig"): (0, None, "Interface\\Icons\\INV_Misc_Horn_01"),
        ("Excavation Site: Wetlands", "Highland Horror", "Strangling Roots"): (339, "Entangling Roots", "Interface\\Icons\\Spell_Nature_Stranglevines"),
        ("Excavation Site: Wetlands", "Highland Horror", "Bog Slam"): (0, None, "Interface\\Icons\\Ability_Smash"),
        ("Excavation Site: Wetlands", "Highland Horror", "Fungal Spores"): (0, None, "Interface\\Icons\\Spell_Shadow_CreepingPlague"),
        ("Excavation Site: Wetlands", "Relic Guardian", "Static Field"): (0, None, "Interface\\Icons\\Spell_Nature_LightningOverload"),
        ("Excavation Site: Wetlands", "Relic Guardian", "Arcane Pulse"): (0, None, "Interface\\Icons\\Spell_Holy_MagicalSentry"),
        ("Excavation Site: Wetlands", "Relic Guardian", "Overload Barrier"): (0, None, "Interface\\Icons\\Spell_Holy_PowerWordShield"),

        ("City of Dalaran", "Atrexis the Grave Knight", "Frost Cleave"): (0, None, "Interface\\Icons\\Spell_Frost_FrostNova"),
        ("City of Dalaran", "Atrexis the Grave Knight", "Death's Grasp"): (49576, "Death Grip", "Interface\\Icons\\Spell_DeathKnight_Strangulate"),
        ("City of Dalaran", "Atrexis the Grave Knight", "Blood Boil"): (48721, "Blood Boil", "Interface\\Icons\\Spell_DeathKnight_BloodBoil"),
        ("City of Dalaran", "Arcane Anomaly", "Arcane Explosion"): (1449, "Arcane Explosion", "Interface\\Icons\\Spell_Nature_WispSplode"),
        ("City of Dalaran", "Arcane Anomaly", "Ley Blink"): (1953, "Blink", "Interface\\Icons\\Spell_Arcane_Blink"),
        ("City of Dalaran", "Arcane Anomaly", "Mana Flare"): (0, None, "Interface\\Icons\\Spell_Holy_SilencingShot"),
        ("City of Dalaran", "Fel Ancient", "Fel Immolation"): (0, None, "Interface\\Icons\\Spell_Fire_Immolation"),
        ("City of Dalaran", "Fel Ancient", "Trample"): (5568, "Trample", "Interface\\Icons\\Ability_WarStomp"),
        ("City of Dalaran", "Fel Ancient", "Corrupting Spores"): (0, None, "Interface\\Icons\\Spell_Nature_CorrosiveBreath"),
        ("City of Dalaran", "Unstable Sentinel", "Spinning Arcane Cannon"): (0, None, "Interface\\Icons\\Spell_Arcane_Blast"),
        ("City of Dalaran", "Unstable Sentinel", "Aegis Projection"): (0, None, "Interface\\Icons\\Spell_Holy_PowerWordShield"),
        ("City of Dalaran", "Mana Wraith", "Siphon Essence"): (0, None, "Interface\\Icons\\Spell_Shadow_LifeDrain02"),
        ("City of Dalaran", "Mana Wraith", "Curse of Torment"): (0, None, "Interface\\Icons\\Spell_Shadow_CurseOfSargeras"),
        ("City of Dalaran", "Mana Devourer", "Nullification Burst"): (0, None, "Interface\\Icons\\Spell_Holy_DispelMagic"),
        ("City of Dalaran", "Mana Devourer", "Mana Bomb"): (0, None, "Interface\\Icons\\Spell_Fire_SelfDestruct"),
        ("City of Dalaran", "Mana Elemental", "Water Bolt Volley"): (15241, "Water Bolt Volley", "Interface\\Icons\\Spell_Frost_FrostBolt02"),
        ("City of Dalaran", "Mana Elemental", "Fission"): (0, None, "Interface\\Icons\\Spell_Arcane_PrismaticCloak"),
        ("City of Dalaran", "Lyn the Ignored", "Polymorph: Sheep"): (118, "Polymorph", "Interface\\Icons\\Spell_Nature_Polymorph"),
        ("City of Dalaran", "Lyn the Ignored", "Mirror Image"): (0, None, "Interface\\Icons\\Spell_Magic_LesserInvisibilty"),
        ("City of Dalaran", "Lyn the Ignored", "Time Warp Stutter"): (0, None, "Interface\\Icons\\Spell_Arcane_PortalDalaran"),
        ("City of Dalaran", "Shade of the Archmage", "Blizzard"): (10, "Blizzard", "Interface\\Icons\\Spell_Frost_IceStorm"),
        ("City of Dalaran", "Shade of the Archmage", "Flamestrike"): (2120, "Flamestrike", "Interface\\Icons\\Spell_Fire_SelfDestruct"),
        ("City of Dalaran", "Shade of the Archmage", "Arcane Missiles"): (5143, "Arcane Missiles", "Interface\\Icons\\Spell_Nature_StarFall"),
    }
    
    key = (dun, boss, name)
    if key in KNOWN_OVERRIDES:
        o_id, o_sname, o_icon = KNOWN_OVERRIDES[key]
        assigned_id = o_id
        assigned_spell_name = o_sname
        assigned_icon = o_icon
        status = "EXACT_VERIFIED_OVERRIDE"
    elif not assigned_id:
        assigned_id = 0
        assigned_spell_name = None
        status = "CUSTOM_NO_SPELL"
        
    master_updates.append({
        'line': ab['line'],
        'dungeon': dun,
        'boss': boss,
        'name': name,
        'old_id': curr_id,
        'new_id': assigned_id,
        'spell_name': assigned_spell_name,
        'old_icon': curr_icon,
        'new_icon': assigned_icon,
        'status': status
    })

print(f"\nAudit Complete! Total abilities evaluated: {len(master_updates)}")
status_counts = {}
for u in master_updates:
    st = u['status']
    status_counts[st] = status_counts.get(st, 0) + 1

for st, count in status_counts.items():
    print(f"  {st}: {count}")

with open('scratch/master_ability_updates.json', 'w', encoding='utf-8') as f:
    json.dump(master_updates, f, indent=2)
