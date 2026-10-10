/**
 * World of Warcraft: Forever - Priest Class Deep Dive Dataset
 * Primary Source: Sodapoppin Level-38 Night Elf Priest Hands-On Early Access Demo & Closed Beta Forensics
 * Video URL: https://www.youtube.com/watch?v=TQiUy-g_TJ4
 */

if (typeof window !== 'undefined' && window.WOW_FOREVER_DATA) {
  if (!window.WOW_FOREVER_DATA.classDeepDives) window.WOW_FOREVER_DATA.classDeepDives = {};
  window.WOW_FOREVER_DATA.classDeepDives.priest = {
    id: "priest",
    name: "Priest",
    icon: "✨",
    color: "#FFFFFF",
    role: "Healer / Ranged DPS",
    specs: "Discipline (Penance/Soul Warding) • Holy (Prayer of Mending/Litany of Light) • Shadow (Shadowform/Devouring Plague)",
    hasData: true,
    videoTitle: "WoW Forever Priest Class Deep Dive & Night Elf Racials",
    videoUrl: "https://www.youtube.com/watch?v=TQiUy-g_TJ4",
    sourceAttribution: "Sodapoppin Level-38 Night Elf Priest BlizzCon Early Access Demo & Closed Beta Forensics",
    summary: "WoW Forever brings an expansive revitalization to the Priest: Penance and cooldown-free Power Word: Shield (Soul Warding) in Discipline, Prayer of Mending (5 bounces) and alternating-heal mana sustain (Litany of Light) in Holy, critical-strike DoTs and 50% mana reduction in Shadowform, and universal access to Devouring Plague and Fear Ward across all Priest races.",

    subTabs: [
      { id: "overview", label: "Full Dossier", icon: "📑" },
      { id: "core", label: "Core Rules & Shared Spells", icon: "📜" },
      { id: "betaBuilds", label: "Level 20 & 30 Builds", icon: "⚡" },
      { id: "discipline", label: "Discipline & Penance", icon: "🛡️" },
      { id: "holy", label: "Holy & Prayer of Mending", icon: "✨" },
      { id: "shadow", label: "Shadow & Devouring Plague", icon: "🌑" },
      { id: "nightelf", label: "Night Elf Testing & Races", icon: "🌙" },
      { id: "matrix", label: "Verification Matrix", icon: "🔬" }
    ],

    coreRules: [
      {
        title: "Devouring Plague Critical Scaling",
        status: "verified",
        statusLabel: "Phase 2 Beta Update (Oct 2026)",
        badge: "Shadow Modernization",
        desc: "Devouring Plague periodic ticks can now critically strike, scaling directly with Shadow Spell Power and critical damage multipliers across all Priest races."
      },
      {
        title: "Inner Focus Periodic Spell Fix",
        status: "verified",
        statusLabel: "Phase 2 Beta Update (Oct 2026)",
        badge: "Discipline Fix",
        desc: "Inner Focus (+25% critical effect chance, 100% mana cost reduction) no longer loses its charge to background periodic damage ticks, ensuring it applies properly to the intended active cast."
      },
      {
        title: "Universal Devouring Plague",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Racial Decoupling",
        desc: "Devouring Plague is no longer exclusive to Undead Priests! In WoW Forever, it is a baseline class spell accessible to all Priest races with a 1-minute cooldown."
      },
      {
        title: "Universal Fear Ward",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Racial Decoupling",
        desc: "Fear Ward is no longer exclusive to Dwarf Priests. It is a shared class ability across all Priest races with a 3-minute duration and 3-minute cooldown."
      },
      {
        title: "Critical Strike DoTs",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "DoT Modernization",
        desc: "Priest damage-over-time spells (Shadow Word: Pain, Devouring Plague, Holy Fire periodic ticks) can now critically strike, greatly enhancing overall sustained throughput."
      },
      {
        title: "Baseline Divine Spirit",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Baseline Buff",
        desc: "Divine Spirit is moved from deep Discipline talents into the baseline class trainer toolkit, providing the iconic Spirit buff to all Priests regardless of specialization."
      },
      {
        title: "Tree Capstone Tradeoff (Penance vs PoM)",
        status: "verified",
        statusLabel: "Verified in Beta",
        badge: "Build Architecture",
        desc: "Penance (Discipline) and Prayer of Mending (Holy) reside on distinct talent branches, requiring dedicated talent investment so a hybrid build cannot trivially take both."
      },
      {
        title: "Shadow Word: Death Progression",
        status: "demo",
        statusLabel: "🎙️ Sodapoppin Demo Finding",
        badge: "Skill Progression",
        desc: "The level-38 character did not yet have Shadow Word: Death; trainer tooltips indicate it becomes available at level 40 or later in progression."
      },
      {
        title: "No Mind Sear in Demo Build",
        status: "demo",
        statusLabel: "🎙️ Sodapoppin Demo Finding",
        badge: "AoE Audit",
        desc: "The level-38 build does not feature Mind Sear or a dedicated Shadow AoE channel; Shadow Priests rely on multi-dotting and Holy Nova for area damage."
      },
      {
        title: "Native Cooldown Manager: Priest Essentials",
        status: "verified",
        statusLabel: "Verified in Beta (Oct 8)",
        badge: "Native UI & Edit Mode",
        desc: "Expanded in Beta Build 1.60.6.71890 directly in default HUD Edit Mode. Rotational Spells Tracked: Penance (10s), Mind Blast (8s/5.5s), Power Word: Shield (monitored alongside Weakened Soul duration), Prayer of Mending (10s), and Circle of Healing (6s). Major Defensives & Bursts: Power Infusion (3m), Pain Suppression (2m), Psychic Scream (30s), Silence (45s), Inner Focus (3m), and Desperate Prayer (10m). Active Procs & Buffs: Surge of Light (instant Flash Heal / Smite procs with highlight), Spirit Tap active regen window, Shadow Weaving stacks (1–5), and Inner Fire charges."
      }
    ],

    discipline: {
      title: "Discipline: Penance, Soul Warding & Divine Aegis",
      tagline: "Unleash volleys of Holy light with Penance, remove shield cooldowns with Soul Warding, and create critical absorb shields",
      talents: [
        {
          name: "Penance",
          type: "Signature Discipline Channel",
          cast: "Channeled (2 sec)",
          cd: "10 sec Cooldown",
          status: "verified",
          desc: "Launches a volley of Holy light at the target, dealing heavy Holy damage to an enemy or healing an ally for high burst over 2 seconds. Can be channeled on the move with talents."
        },
        {
          name: "Soul Warding (No Shield Cooldown)",
          type: "Shield Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Permanently removes the 4-second cooldown from Power Word: Shield! Targets still receive the 15-second Weakened Soul debuff, enabling rapid shielding across multiple party/raid members."
        },
        {
          name: "Divine Aegis (50% Critical Absorb)",
          type: "Absorb Keystone",
          cast: "Passive Proc",
          duration: "12 sec Duration",
          status: "verified",
          desc: "Critical healing strikes create an absorb shield on the target equal to 50% of the amount healed, protecting against subsequent physical and magical spikes."
        },
        {
          name: "Holy Fire Smite/Penance Synergy",
          type: "Offensive Discipline Synergy",
          cast: "Passive",
          status: "verified",
          desc: "Smite and Penance deal 10% additional damage when striking targets afflicted by your Holy Fire damage-over-time effect."
        },
        {
          name: "Weakened Soul Healing Acceleration",
          type: "Rotational Synergies",
          cast: "Passive",
          status: "verified",
          desc: "Direct heals cast on targets affected by Weakened Soul gain increased critical-strike chance and reduce the remaining duration of that target's Weakened Soul."
        },
        {
          name: "Power Infusion",
          type: "Signature Offensive Support",
          cast: "Instant",
          cd: "2 min Cooldown",
          duration: "15 sec Duration",
          status: "verified",
          desc: "Infuses the target with power, increasing spell damage and healing done by 20% for 15 seconds."
        },
        {
          name: "Martyrdom (Focused Casting)",
          type: "Defensive Casting",
          cast: "Passive Proc",
          duration: "6 sec Duration",
          status: "verified",
          desc: "Suffering a melee or ranged critical hit grants Focused Casting for 6 seconds, preventing cast-time loss from damage and adding 20% interrupt resistance."
        },
        {
          name: "Discipline Passives & Shield Power",
          type: "Passive Stat Cluster",
          cast: "Passive",
          status: "verified",
          desc: "Increases wand damage by up to 25%, overall damage and healing by 5%, Power Word: Shield absorb strength by 20%, and provides up to 18% Holy spell hit chance."
        }
      ]
    },

    holy: {
      title: "Holy: Prayer of Mending, Litany of Light & Spirit Scaling",
      tagline: "Chain bouncing heals with Prayer of Mending, restore mana by alternating spells, and scale throughput directly from Spirit",
      talents: [
        {
          name: "Prayer of Mending (5 Bounces)",
          type: "Signature Holy Spell",
          cast: "Instant",
          cd: "10 sec Cooldown",
          status: "verified",
          desc: "Places a protective ward on an ally. When the target takes damage, they are instantly healed, and Prayer of Mending jumps to a nearby injured party member, bouncing up to 5 times!"
        },
        {
          name: "Litany of Light (Alternating Heal Mana)",
          type: "Resource Management Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Casting a healing spell different from your previous heal restores mana equal to 10% of the new spell's base mana cost, rewarding dynamic, non-repetitive triage casting."
        },
        {
          name: "Spirit-to-Spell Conversion",
          type: "Throughput Scaling Keystone",
          cast: "Passive",
          status: "verified",
          desc: "Increases spell healing by up to 5% of your total Spirit, and increases spell damage by up to 1% of total Spirit, reinforcing Spirit as Holy's premier stat."
        },
        {
          name: "Blessed Recovery / Reactive Self-Heal",
          type: "Defensive Sustain",
          cast: "Passive Proc",
          duration: "6 sec Duration",
          status: "verified",
          desc: "After suffering a critical hit or an attack exceeding 30% of your maximum health, heals for 25% of the damage taken over 6 seconds. This heal refreshes and carries over remaining amounts."
        },
        {
          name: "Inspiration (+25% Target Armor)",
          type: "Tank Mitigation Keystone",
          cast: "Passive Proc",
          duration: "15 sec Duration",
          status: "verified",
          desc: "Non-periodic critical heals increase the target's armor by 25% for 15 seconds, providing critical physical damage reduction to tanks."
        },
        {
          name: "Holy Nova Free-Cast Procs",
          type: "AoE Synergy",
          cast: "Passive Proc",
          status: "verified",
          desc: "Increases periodic Holy damage by 5% and gives periodic Holy damage a 10% chance to make your next Holy Nova cost 0 mana."
        },
        {
          name: "Range & Radius Amplification",
          type: "Utility Enhancements",
          cast: "Passive",
          status: "verified",
          desc: "Increases Smite and Holy Fire range by up to 6 yards, and enlarges the effective radius of Prayer of Healing and Holy Nova."
        },
        {
          name: "Holy Cast Time & Renew Buffs",
          type: "Throughput Foundations",
          cast: "Passive Cluster",
          status: "verified",
          desc: "Reduces cast times of core Holy spells, increases Holy spell critical-strike chance, strengthens Renew healing, and reduces spell damage taken."
        }
      ]
    },

    shadow: {
      title: "Shadow: Shadowform 50% Mana, Devouring Plague & Vampiric Embrace",
      tagline: "Crush single-target foes with critical DoTs, sustain party health via Vampiric Embrace, and cut Shadow mana costs by 50% in Shadowform",
      talents: [
        {
          name: "Shadowform (50% Mana Reduction)",
          type: "Signature Shadow Stance",
          cast: "Instant",
          status: "verified",
          desc: "Assumes Shadowform: increases Shadow damage by 10%, reduces Shadow-spell mana costs by 50%, doubles the critical-strike damage bonus of Shadow spells, and reduces physical damage taken by 15%. Cannot cast Holy healing spells while active."
        },
        {
          name: "Spreading Devouring Plague",
          type: "Rotational Keystone",
          cast: "Instant",
          cd: "1 min Cooldown",
          duration: "24 sec Duration",
          status: "verified",
          desc: "Afflicts the target with a disease dealing massive Shadow damage and healing the Priest. Talents reduce its mana cost by up to 50%; if the target dies while affected, it jumps to a nearby enemy within 10 yards!"
        },
        {
          name: "Improved Mind Flay (+10 Yds & Slow)",
          type: "Channel Enhancement",
          cast: "Channeled (3 sec)",
          range: "30 Yards",
          status: "verified",
          desc: "Increases Mind Flay damage by 10%, extends its range by 10 yards (to 30 yards), and applies a 20% movement-speed reduction."
        },
        {
          name: "Vampiric Embrace & Spirit Tap Procs",
          type: "Sustained Party Healing",
          cast: "Instant",
          duration: "30 sec Duration",
          status: "verified",
          desc: "Afflicts the target for 30 seconds; heals party members for 20% of the Priest's Shadow spell damage. Also gives Spirit Tap a chance to trigger on death even if the Priest does not receive the killing blow."
        },
        {
          name: "Silence (45s CD / 3s Lockout)",
          type: "Crowd Control & Interrupt",
          cast: "Instant",
          cd: "45 sec Cooldown",
          duration: "5 sec Silence",
          status: "verified",
          desc: "Silences the target for 5 seconds and interrupts spellcasting for 3 seconds, shutting down enemy casters in PvE and PvP."
        },
        {
          name: "Shadow Weaving (5 Stacks)",
          type: "Damage Stacking Debuff",
          cast: "Passive Proc",
          duration: "15 sec Duration",
          status: "verified",
          desc: "Shadow damage spells have a 100% chance to cause the target to take 3% increased Shadow damage per stack, stacking up to 5 times (+15% Shadow damage)."
        },
        {
          name: "Spirit Tap & Blackout",
          type: "Resource & Control",
          cast: "Passive",
          status: "verified",
          desc: "Spirit Tap grants 100% mana regeneration while casting on kills; Blackout gives Shadow damage spells a 10% chance to stun the target for 3 seconds."
        },
        {
          name: "Darkness & Range Foundations",
          type: "Core Shadow Talents",
          cast: "Passive",
          status: "verified",
          desc: "Increases Shadow spell damage, extends offensive Shadow range by 20%, reduces threat generated by 25%, and reduces Mind Blast cooldown by 2.5s."
        }
      ]
    },

    racialSynergies: {
      nightElfDemo: {
        title: "Sodapoppin's Night Elf Priest Hands-On Demo Findings",
        subtitle: "Forensic testing of updated Night Elf racials on a Priest in the BlizzCon 2026 early access demo",
        items: [
          {
            name: "In-Combat Shadowmeld (Threat Drop)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Can be activated in combat on a 2-minute cooldown. While it does not drop combat completely, it causes enemies to immediately stop targeting and attacking the Priest."
          },
          {
            name: "Elune's Light (+10% Crit Burst)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Active racial granting +10% critical-strike chance for all spells and attacks for 15 seconds on a 2-minute cooldown. Excellent for burst Penance or Holy Nova."
          },
          {
            name: "Elune's Grace (50% Miss Rate)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Reduces the chance of being hit by melee and ranged attacks by 50% for 15 seconds or until 3 attacks miss, providing powerful anti-physical survival."
          },
          {
            name: "Starshards (Arcane Channel)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Channeled Arcane spell dealing Arcane damage over 6 seconds. Gives Night Elf Priests an extra direct damage channel outside of the Shadow school."
          },
          {
            name: "Quickness (+1% Dodge & +2% Move Speed)",
            status: "verified",
            statusLabel: "Verified in Beta",
            desc: "Passive racial granting 1% permanent dodge chance and a permanent 2% movement speed increase on foot."
          }
        ]
      },
      newRaces: [
        {
          race: "Night Elf Priest",
          faction: "Alliance",
          badge: "Priestess of the Moon",
          desc: "Alliance champions combining in-combat Shadowmeld threat dropping, Elune's Light (+10% crit burst), and Starshards."
        },
        {
          race: "Human Priest",
          faction: "Alliance",
          badge: "Cleric of Stormwind",
          desc: "The Human Spirit (+5% Spirit -> direct Holy spell power scaling), Will to Survive stun break, and Perception."
        },
        {
          race: "Dwarf Priest",
          faction: "Alliance",
          badge: "Thane of Ironforge",
          desc: "Stoneform (bleed/poison/disease immunity + 10% physical reduction) and Mace Specialization (+1% crit to all spells and attacks)."
        },
        {
          race: "Undead Priest",
          faction: "Horde",
          badge: "Cult of Forgotten Shadow",
          desc: "Will of the Forsaken (2m CC break), Cannibalize (7% HP/Mana), and Touch of the Grave passive life drain."
        },
        {
          race: "Troll Priest",
          faction: "Horde",
          badge: "Darkspear Witch Doctor",
          desc: "Berserking (up to +30% casting haste based on missing health) and Shadowguard passive orbs."
        }
      ]
    },

    forensicMatrix: [
      {
        feature: "Penance",
        category: "Discipline",
        details: "Channeled Holy volley; heals ally or damages enemy over 2s; 10s cooldown",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo & Tooltip"
      },
      {
        feature: "Soul Warding",
        category: "Discipline",
        details: "Removes Power Word: Shield cooldown; 15s Weakened Soul debuff remains",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Divine Aegis",
        category: "Discipline",
        details: "Critical heals create an absorb shield equal to 50% of the healed amount",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Holy Fire / Penance Synergy",
        category: "Discipline",
        details: "Smite and Penance deal +10% damage to targets affected by Holy Fire",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Prayer of Mending",
        category: "Holy",
        details: "10s CD; bounces up to 5 times to injured party members upon taking damage",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Litany of Light (Alternating)",
        category: "Holy",
        details: "Healing with a different spell than previous restores 10% base mana cost",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Spirit to Spell Power",
        category: "Holy",
        details: "Up to 5% total Spirit added as spell healing; 1% as spell damage",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Blessed Recovery",
        category: "Holy",
        details: "Crits or hits >30% HP heal 25% damage taken over 6s; refreshes and stacks",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Inspiration (+25% Armor)",
        category: "Holy",
        details: "Non-periodic critical heals increase target's armor by 25% for 15s",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Shadowform (50% Mana Reduction)",
        category: "Shadow",
        details: "+10% Shadow dmg, -50% Shadow mana cost, 200% crit bonus, -15% phys dmg",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Devouring Plague Baseline",
        category: "Shadow",
        details: "Available across all Priest races; 1m CD; talents allow jumping on death",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Critical Strike DoTs",
        category: "Core Mechanics",
        details: "Priest damage-over-time spells can critically strike",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Improved Mind Flay Range & Slow",
        category: "Shadow",
        details: "+10% damage, +10 yards range (30 yd total), 20% movement slow",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Vampiric Embrace & Spirit Tap",
        category: "Shadow",
        details: "30s duration; heals party for 20% Shadow dmg; triggers Spirit Tap on kill assist",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "In-Combat Shadowmeld",
        category: "Night Elf Racials",
        details: "Usable in combat (2m CD); does not exit combat but causes enemies to drop target",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Elune's Light (+10% Crit)",
        category: "Night Elf Racials",
        details: "+10% critical-strike chance for all spells/attacks for 15s (2m CD)",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Universal Fear Ward",
        category: "Core Mechanics",
        details: "Available to all races; 3m duration, 3m cooldown",
        status: "Verified in Closed Beta",
        statusType: "verified",
        source: "Sodapoppin Hands-On Demo"
      },
      {
        feature: "Shadow Word: Death Status",
        category: "Unconfirmed",
        details: "Visible in trainer lists for later level progression; not in level-38 build",
        status: "🎙️ Expected at Level 40+",
        statusType: "demo",
        source: "Sodapoppin Commentary"
      }
    ],
    betaBuilds: {
      season: "Closed Beta Phase 2",
      levelCap: 30,
      talentPointsTotal: 21,
      legacyPointsNotice: "Legacy Milestones allow up to +5 additional points at Level 30 (26 total points).",
      level20: {
        levelCap: 20,
        talentPointsTotal: 11,
        legacyPointsNotice: "Legacy Milestones allow up to +2 to +5 additional points at Level 20.",
        specs: [
          {
            specId: "discipline",
            name: "Discipline (Wand & Shield Battery)",
            icon: "🛡️",
            role: "Solo Leveling & Support Healing",
            buildUrl: "/talents/priest?b=551000--&l=20",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/priest/500501",
            tagline: "Top solo leveling speed through Wand Specialization (+25% damage + 30% SP scaling) and zero downtime.",
            statPriority: "Spirit > Intellect > Spell Power > Stamina",
            bestWeapon: "Highest DPS Wand (Necromantic Wand / Gravestone Scepter)",
            talents: [
              { name: "Wand Specialization", points: "5/5", tree: "Discipline (Tier 1)", desc: "Increases your damage with Wands by 25%. Coupled with 30% SP wand scaling, out-damages hard casts at 0 mana!" },
              { name: "Silent Resolve", points: "5/5", tree: "Discipline (Tier 1)", desc: "Reduces threat generated by your spells by 20%, keeping aggro firmly on dungeon tanks." },
              { name: "Inner Focus", points: "1/1", tree: "Discipline (Tier 3)", desc: "When activated, reduces the Mana cost of your next spell by 100% and increases its critical effect chance by 25%." }
            ],
            legacyNotes: "Extra points obtained through Legacy Discovery unlock 5/5 Mental Agility (10% instant spell mana reduction) and Soul Warding (cooldown-free Power Word: Shield).",
            rotation: [
              { label: "Pull Sequence", desc: "Power Word: Shield -> Holy Fire or Smite opener -> Shadow Word: Pain." },
              { label: "Wand Down (5-Second Rule)", desc: "Auto-wand target until dead. Because no mana is spent for >5 sec, Spirit regeneration runs at 100% rate." },
              { label: "Emergency Shield", desc: "Use Inner Focus + Flash Heal for free critical heals when under heavy dungeon assault." }
            ],
            bisGear: [
              { slot: "Ranged / Wand", item: "Necromantic Wand", source: "Ruins of Lordaeron (Crypt)", stats: "Shadow Wand, +3 Shadow SP" },
              { slot: "Finger", item: "Thane's Healing Band", source: "Hall of Thanes (Ironforge)", stats: "+6 Healing, +4 Spirit" },
              { slot: "Two-Hand / Staff", item: "Staff of Westfall", source: "Deadmines (Quest)", stats: "+11 Int, +5 Spi" },
              { slot: "Chest", item: "Robe of Arugal", source: "Shadowfang Keep (Arugal)", stats: "+10 Int, +5 Spi, +3 Agi" },
              { slot: "Back", item: "Mantle of the Penitent", source: "Ruins of Lordaeron", stats: "+4 Spi, +3 Sta" }
            ],
            campingPerk: {
              name: "Meditation of the Light (+10% Total Spirit)",
              desc: "Setting camp with a Cozy Sleeping Bag provides 200% rested XP rate and grants the 'Purified Spirit' 2-hour +10% Spirit buff."
            },
            classQuestNote: "Level 20 Priest unlocks Desperate Prayer and Fear Ward (now baseline across all races)."
          },
          {
            specId: "shadow",
            name: "Shadow (Spirit Tap & Darkness)",
            icon: "🌑",
            role: "Ranged Shadow DPS",
            buildUrl: "/talents/priest?b=--551000&l=20",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/priest/--505001",
            tagline: "Relentless shadow DoT engine maintaining 100% mana uptime through 5/5 Spirit Tap resets.",
            statPriority: "Shadow Spell Power > Spirit > Intellect",
            bestWeapon: "Shadow Wand + High Spirit Staff",
            talents: [
              { name: "Spirit Tap", points: "5/5", tree: "Shadow (Tier 1)", desc: "Gives a 100% chance to gain a 100% bonus to Spirit after killing an enemy, allowing 50% mana regen while casting for 15 sec." },
              { name: "Darkness", points: "5/5", tree: "Shadow (Tier 2)", desc: "Increases your Shadow spell damage by 10%." },
              { name: "Shadow Focus", points: "1/5", tree: "Shadow (Tier 2)", desc: "Reduces the chance for targets to resist your Shadow spells by 2%." }
            ],
            legacyNotes: "Extra Legacy points unlock Mind Flay at level 20+1 and Improved Mind Flay (80% slow!).",
            rotation: [
              { label: "Opener", desc: "Mind Blast from max range -> Shadow Word: Pain -> Devouring Plague." },
              { label: "Execute", desc: "Switch to Wand at low health to ensure Spirit Tap kill trigger proc." }
            ],
            bisGear: [
              { slot: "Two-Hand", item: "Living Root", source: "Wailing Caverns (Verdan)", stats: "+6 Spi, +5 Sta, 14.8 DPS" },
              { slot: "Wand", item: "Necromantic Wand", source: "Ruins of Lordaeron", stats: "+3 Shadow SP" }
            ],
            campingPerk: {
              name: "Shadow Trance (+5% Shadow Damage)",
              desc: "Resting in a tent grants +5% increased Shadow spell damage and 15% reduced threat for 2 hours."
            },
            classQuestNote: "Level 20 unlocks universal Devouring Plague for all priest races."
          },
          {
            specId: "holy",
            name: "Holy (Divine Fury Dungeon Healer)",
            icon: "✨",
            role: "Dedicated Dungeon Healer",
            buildUrl: "/talents/priest?b=-551000-&l=20",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/priest/-505001",
            tagline: "Fast cast-time heals, high critical strike triage, and group preservation in low-level dungeons.",
            statPriority: "Healing Power > Spirit > Intellect > Stamina",
            bestWeapon: "Staff with +Healing or One-Hand + Off-Hand",
            talents: [
              { name: "Holy Specialization", points: "5/5", tree: "Holy (Tier 1)", desc: "Increases the critical effect chance of your Holy spells by 5%." },
              { name: "Divine Fury", points: "5/5", tree: "Holy (Tier 2)", desc: "Reduces the cast time of your Smite, Holy Fire, Heal, and Greater Heal spells by 0.5 sec." },
              { name: "Desperate Prayer", points: "1/1", tree: "Holy (Tier 3)", desc: "Instantly heals the caster for a large amount on a 10-minute cooldown; costs 0 mana." }
            ],
            legacyNotes: "Extra Legacy points unlock Inspiration (25% armor buff on heal crits) and Prayer of Mending.",
            rotation: [
              { label: "Tank Upkeep", desc: "Keep Renew rolling on tank; pre-cast downranked Heal rank 1." },
              { label: "Emergency Save", desc: "Flash Heal -> Desperate Prayer if focused by dungeon adds." }
            ],
            bisGear: [
              { slot: "Staff", item: "Emberstone Staff", source: "Deadmines (Greenskin)", stats: "+5 Int, +5 Spi, +5 Sta" },
              { slot: "Ring", item: "Thane's Healing Band", source: "Hall of Thanes", stats: "+6 Healing, +4 Spirit" }
            ],
            campingPerk: {
              name: "Grace of the Camp (+10% Healing Done)",
              desc: "Camp resting grants +10% bonus to all healing output and reduced pushback for 2 hours."
            },
            classQuestNote: "Level 20 unlocks the Holy Vestments questline and racial priest blessing."
          }
        ]
      },
      level30: {
        levelCap: 30,
        talentPointsTotal: 21,
        legacyPointsNotice: "Legacy Milestones allow up to +5 additional points at Level 30 (26 total points).",
        specs: [
          {
            specId: "shadow",
            name: "Shadow (Shadowform & Vampiric Embrace)",
            icon: "🌑",
            role: "Shadow Ranged DPS & Vampiric Healing Engine",
            buildUrl: "/talents/priest?b=--30532200120131201&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/priest/--505001",
            tagline: "Signature Shadowform keystone (+15% Shadow damage, -15% physical damage taken), critical-strike Devouring Plague, and passive party healing from Vampiric Embrace.",
            statPriority: "Shadow Spell Power > Spell Hit (to 4%) > Spirit > Intellect",
            bestWeapon: "Rod of the Sleepwalker (BFD) / Staff of Westfall / Necromantic Wand",
            talents: [
              { name: "Spirit Tap", points: "5/5", tree: "Shadow (Tier 1)", desc: "Gives a 100% chance to gain 100% bonus Spirit and 50% in-combat mana regen for 15 sec on mob kill." },
              { name: "Improved Shadow Word: Pain", points: "2/2", tree: "Shadow (Tier 2)", desc: "Increases the duration of your Shadow Word: Pain spell by 6 sec." },
              { name: "Shadow Focus", points: "3/5", tree: "Shadow (Tier 2)", desc: "Reduces the chance for targets to resist your Shadow spells by 6%." },
              { name: "Mind Flay", points: "1/1", tree: "Shadow (Tier 3 Keystone)", desc: "Assaults the target's mind with Shadow energy, dealing Shadow damage and slowing movement by 50% over 3 sec." },
              { name: "Shadow Reach", points: "2/2", tree: "Shadow (Tier 3)", desc: "Increases the range of your offensive Shadow spells by 20% (36-yard range)." },
              { name: "Shadow Weaving", points: "3/5", tree: "Shadow (Tier 4)", desc: "Shadow damage spells have a 60% chance to cause the target to be vulnerable to Shadow damage by 3% for 15 sec (stacks 5 times)." },
              { name: "Vampiric Embrace", points: "1/1", tree: "Shadow (Tier 3 Keystone)", desc: "Afflicts target with Shadow energy, healing all party members for 20% of any single-target Shadow damage you deal for 1 min." },
              { name: "Darkness", points: "3/5", tree: "Shadow (Tier 4)", desc: "Increases your Shadow spell damage by 6%." },
              { name: "Shadowform", points: "1/1", tree: "Shadow (Tier 5 Keystone)", desc: "Assume a Shadowform: increases your Shadow damage by 15%, reduces physical damage taken by 15%, but prevents Holy spell casting." }
            ],
            legacyNotes: "Extra Legacy discovery points unlock 5/5 Darkness (+10% damage) and Silence (5-second ranged spell silence).",
            rotation: [
              { label: "Shadowform Buff", desc: "Shift into permanent Shadowform -> Vampiric Embrace on primary target." },
              { label: "Critical DoT Spreading", desc: "Devouring Plague (now critically strikes!) -> Shadow Word: Pain -> Mind Blast on cooldown." },
              { label: "Mind Flay Weave", desc: "Channel 36-yard Mind Flay to snare mobs and stack Shadow Weaving to 5 stacks (+15% shadow damage)." },
              { label: "Execute & Spirit Tap", desc: "Finish with Wand or Shadow Word: Death to proc 100% Spirit Tap mana engine." }
            ],
            bisGear: [
              { slot: "Staff", item: "Rod of the Sleepwalker", source: "Blackfathom Deeps (Twilight Lord Kelris)", stats: "+11 Spell Power, +7 Int, +4 Sta" },
              { slot: "Robe", item: "Robes of the Kirin Tor", source: "City of Dalaran (Archmage Boss)", stats: "+14 Spell Power, +10 Int, +6 Spi" },
              { slot: "Off-Hand", item: "Cursed Shadow Tome", source: "Ruins of Lordaeron", stats: "+8 Shadow Spell Power, +4 Sta" },
              { slot: "Wand", item: "Necromantic Wand", source: "Ruins of Lordaeron", stats: "+3 Shadow Spell Power" }
            ],
            campingPerk: {
              name: "Shadow Trance (+5% Shadow Damage)",
              desc: "Resting in a tent grants +5% increased Shadow spell damage and 15% reduced threat for 2 hours."
            },
            classQuestNote: "Universal Devouring Plague upgrades and Shadowform visual aura available at level 30 trainers."
          },
          {
            specId: "discipline",
            name: "Discipline (Power Infusion & Soul Warding)",
            icon: "🛡️",
            role: "Burst Healer & Power Infusion Support",
            buildUrl: "/talents/priest?b=023303131300121-3-&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/priest/500501",
            tagline: "Unbreakable shielding with Soul Warding (cooldown-free Power Word: Shield), Power Infusion 21-pt steroid (+20% spell damage & healing), and 100% mana Inner Focus.",
            statPriority: "Intellect > Spirit > Spell Power > Healing Power",
            bestWeapon: "Dalaran Caretaker Gavel / Staff of Westfall",
            talents: [
              { name: "Unbreakable Will", points: "5/5", tree: "Discipline (Tier 1)", desc: "Increases your chance to resist Stun, Fear, and Silence effects by an additional 15%." },
              { name: "Improved Power Word: Shield", points: "3/3", tree: "Discipline (Tier 2)", desc: "Increases the damage absorbed by your Power Word: Shield by 15%." },
              { name: "Meditation", points: "3/3", tree: "Discipline (Tier 3)", desc: "Allows 15% of your Mana regeneration to continue while casting." },
              { name: "Inner Focus", points: "1/1", tree: "Discipline (Tier 3 Keystone)", desc: "When activated, reduces the Mana cost of your next spell by 100% and increases critical chance by 25% (fixed to prevent periodic consumption)." },
              { name: "Mental Agility", points: "5/5", tree: "Discipline (Tier 3)", desc: "Reduces the Mana cost of your instant cast spells by 10% (Power Word: Shield, Renew, Penance ticks)." },
              { name: "Divine Spirit", points: "1/1", tree: "Discipline (Tier 4)", desc: "Holy power infuses the target, increasing their Spirit by 17 for 30 min." },
              { name: "Mental Strength", points: "2/5", tree: "Discipline (Tier 4)", desc: "Increases your maximum Mana by 4%." },
              { name: "Power Infusion", points: "1/1", tree: "Discipline (Tier 5 Keystone)", desc: "Infuses the target with power, increasing spell damage and healing by 20% and spell casting speed by 20% for 15 sec." }
            ],
            legacyNotes: "Extra Legacy discovery points unlock Penance channeling and Soul Warding.",
            rotation: [
              { label: "Shield Vanguard", desc: "Power Word: Shield on tank prior to pull; Mental Agility lowers instant shield mana cost." },
              { label: "Power Infusion Steroid", desc: "Cast Power Infusion on your top Mage/Warlock or yourself during boss burn windows." },
              { label: "Inner Focus Burst", desc: "Combine Inner Focus with Prayer of Healing or Greater Heal for 0 mana and guaranteed critical healing." }
            ],
            bisGear: [
              { slot: "One-Hand Mace", item: "Gavel of the Crystal Lake", source: "Excavation Site: Wetlands", stats: "+14 Healing Power, +6 Int, +4 Spi" },
              { slot: "Chest", item: "Robes of Dalaran Caretaker", source: "City of Dalaran", stats: "+18 Healing Power, +8 Int, +6 Spi" },
              { slot: "Finger", item: "Thane's Healing Band", source: "Hall of Thanes", stats: "+6 Healing, +4 Spirit" }
            ],
            campingPerk: {
              name: "Meditation of the Light (+10% Total Spirit)",
              desc: "Setting camp with a Cozy Sleeping Bag provides 200% rested XP rate and grants the 'Purified Spirit' 2-hour +10% Spirit buff."
            },
            classQuestNote: "Divine Spirit and Prayer of Fortitude upgraded at Level 30 trainers."
          },
          {
            specId: "holy",
            name: "Holy (Spirit of Redemption & Holy Nova)",
            icon: "✨",
            role: "Dedicated Dungeon Group Healer",
            buildUrl: "/talents/priest?b=-0350510103202031-&l=30&tl=5",
            wowheadCalcUrl: "https://www.wowhead.com/forever/talent-calc/priest/-505001",
            tagline: "Master group preservation with Holy Nova AoE bursts, -0.5s Divine Fury casting, Inspiration armor buffs (+25% armor on heal crits), and Spirit of Redemption.",
            statPriority: "Healing Power > Spirit > Intellect > Mp5",
            bestWeapon: "Gavel of the Crystal Lake / Emberstone Staff",
            talents: [
              { name: "Holy Specialization", points: "5/5", tree: "Holy (Tier 1)", desc: "Increases the critical effect chance of your Holy spells by 5%." },
              { name: "Divine Fury", points: "5/5", tree: "Holy (Tier 2)", desc: "Reduces the casting time of Smite, Holy Fire, Heal, and Greater Heal by 0.5 sec." },
              { name: "Holy Nova", points: "1/1", tree: "Holy (Tier 3 Keystone)", desc: "Causes an explosion of holy light around the caster, dealing Holy damage to all enemy targets and healing party members within 10 yards. Causes no threat!" },
              { name: "Blessed Recovery", points: "3/3", tree: "Holy (Tier 3)", desc: "After being struck by a melee or ranged critical strike, heal 25% of the damage taken over 6 sec." },
              { name: "Inspiration", points: "3/3", tree: "Holy (Tier 3)", desc: "Increases your target's armor value from items by 25% for 15 sec after getting a critical effect from Flash Heal, Heal, Greater Heal, or Prayer of Healing." },
              { name: "Improved Healing", points: "3/3", tree: "Holy (Tier 4)", desc: "Reduces the Mana cost of your Lesser Heal, Heal, and Greater Heal spells by 15%." },
              { name: "Spirit of Redemption", points: "1/1", tree: "Holy (Tier 5 Keystone)", desc: "Upon death, the priest becomes the Spirit of Redemption for 10 sec, unable to move, attack or be targeted, but able to cast any healing spell completely free of mana cost." }
            ],
            legacyNotes: "Extra Legacy discovery points unlock Prayer of Mending (5-bounce reactive group triage) and Spiritual Guidance (+25% Spirit to spell power).",
            rotation: [
              { label: "Armor Buff Maintenance", desc: "Cast Heal or Flash Heal targeting the tank; critical strikes proc Inspiration (+25% armor) to drastically mitigate physical boss hits." },
              { label: "Holy Nova AoE", desc: "Spam Holy Nova during dense dungeon trash packs in Excavation Site; deals AoE holy damage while healing the melee core with zero threat!" },
              { label: "Sustained Triage", desc: "Renew rolling on tank -> Greater Heal downranked for maximum mana efficiency." }
            ],
            bisGear: [
              { slot: "One-Hand Mace", item: "Gavel of the Crystal Lake", source: "Excavation Site: Wetlands", stats: "+14 Healing Power, +6 Int, +4 Spi" },
              { slot: "Chest", item: "Robes of Dalaran Caretaker", source: "City of Dalaran (Hospital Wing)", stats: "+18 Healing Power, +8 Int, +6 Spi" },
              { slot: "Ring", item: "Thane's Healing Band", source: "Hall of Thanes", stats: "+6 Healing, +4 Spirit" }
            ],
            campingPerk: {
              name: "Grace of the Camp (+10% Healing Done)",
              desc: "Camp resting grants +10% bonus to all healing output and reduced pushback for 2 hours."
            },
            classQuestNote: "Holy Vestments rank 2 and Mass Dispel preparation quests available at level 30."
          }
        ]
      },
      specs: []
    }
  };
  WOW_FOREVER_DATA.classDeepDives.priest.betaBuilds.specs = WOW_FOREVER_DATA.classDeepDives.priest.betaBuilds.level30.specs;
}
