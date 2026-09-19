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
      { id: "discipline", label: "Discipline & Penance", icon: "🛡️" },
      { id: "holy", label: "Holy & Prayer of Mending", icon: "✨" },
      { id: "shadow", label: "Shadow & Devouring Plague", icon: "🌑" },
      { id: "nightelf", label: "Night Elf Testing & Races", icon: "🌙" },
      { id: "matrix", label: "Verification Matrix", icon: "🔬" }
    ],

    coreRules: [
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
    ]
  };
}
