/**
 * World of Warcraft: Forever - Profession Quiz & Scoring Matrix Dataset
 * Powers the interactive 6-question profession matcher (#professions/quiz)
 */

(function () {
  "use strict";

  window.WOW_PROFESSIONS_QUIZ_DATA = {
    title: "Which professions should I pick?",
    subtitle: "Answer six quick questions about how you play to calculate your optimal profession duo in WoW Forever, backed by client recipes, BiS crafted gear, and trade synergies.",
    questions: [
      {
        id: "goal",
        num: 1,
        question: "What do you want most from professions?",
        options: [
          {
            label: "Make gold",
            desc: "Sell raw materials, essential potions, and bags for steady income",
            weights: { herbalism: 3, mining: 3, skinning: 3, alchemy: 1, enchanting: 1, leatherworking: 1, tailoring: 1 }
          },
          {
            label: "Gear myself",
            desc: "Craft powerful weapons, armor sets, and stat boosts while leveling",
            weights: { blacksmithing: 3, leatherworking: 3, tailoring: 3, enchanting: 2, engineering: 1 }
          },
          {
            label: "Help my group",
            desc: "Supply elixirs, weapon stones, camp features, and utility perks",
            weights: { alchemy: 3, enchanting: 2, blacksmithing: 1, engineering: 1, tailoring: 1 }
          },
          {
            label: "Something relaxing",
            desc: "Gather resources at my own pace without complex recipes",
            weights: { herbalism: 3, skinning: 3, tailoring: 2, alchemy: 1, enchanting: 1, mining: 1 }
          }
        ]
      },
      {
        id: "playstyle",
        num: 2,
        question: "Gathering or crafting?",
        options: [
          {
            label: "Gathering: out in the world",
            desc: "Harvesting nodes and skinning beasts during exploration",
            weights: { herbalism: 3, mining: 3, skinning: 3, alchemy: -2, blacksmithing: -2, enchanting: -2, engineering: -2, leatherworking: -2, tailoring: -2 }
          },
          {
            label: "Crafting: making things",
            desc: "Turning reagents into finished gear, consumables, and enchants",
            weights: { alchemy: 3, blacksmithing: 3, enchanting: 3, engineering: 3, leatherworking: 3, tailoring: 3, herbalism: -2, mining: -2, skinning: -2 }
          },
          {
            label: "A bit of both",
            desc: "Gathering my own materials to power a crafting discipline",
            synergyBonus: 2 // Grants bonus to gatherer + crafter pairs
          }
        ]
      },
      {
        id: "hours",
        num: 3,
        question: "How much do you play?",
        options: [
          {
            label: "A few hours a week",
            desc: "Casual progression where simple leveling is ideal",
            weights: { herbalism: 2, skinning: 2, tailoring: 1, mining: 1, enchanting: -1, engineering: -1 }
          },
          {
            label: "A few evenings a week",
            desc: "Steady dungeon runs, leveling, and trade skill farming",
            weights: { alchemy: 1, blacksmithing: 1, leatherworking: 1, tailoring: 1, mining: 1, herbalism: 1 }
          },
          {
            label: "Most days",
            desc: "Dedicated endgame preparation, BiS crafting, and high-tier engineering",
            weights: { engineering: 3, alchemy: 2, enchanting: 2, blacksmithing: 1, leatherworking: 1, tailoring: 1 }
          }
        ]
      },
      {
        id: "content",
        num: 4,
        question: "What do you play most?",
        options: [
          {
            label: "Questing and leveling",
            desc: "Solo world exploration, zone quest chains, and self-made upgrades",
            weights: { leatherworking: 2, herbalism: 2, mining: 2, skinning: 2, tailoring: 1, blacksmithing: 1 }
          },
          {
            label: "Dungeons and raids",
            desc: "Instanced group content requiring potent consumables and enchants",
            weights: { enchanting: 3, alchemy: 3, engineering: 1, blacksmithing: 1 }
          },
          {
            label: "PvP & Battlegrounds",
            desc: "Grenades, trinkets, burst survivability, and utility gadgets",
            weights: { engineering: 4, alchemy: 2, enchanting: 1 }
          }
        ]
      },
      {
        id: "characterClass",
        num: 5,
        question: "Your class (optional)",
        options: [
          { label: "Warrior", classKey: "warrior", favored: { blacksmithing: 3, mining: 3, engineering: 2 } },
          { label: "Paladin", classKey: "paladin", favored: { blacksmithing: 3, mining: 3, engineering: 1 } },
          { label: "Hunter", classKey: "hunter", favored: { leatherworking: 3, skinning: 3, engineering: 2 } },
          { label: "Rogue", classKey: "rogue", favored: { leatherworking: 3, skinning: 3, engineering: 2 } },
          { label: "Priest", classKey: "priest", favored: { tailoring: 3, enchanting: 3, alchemy: 1 } },
          { label: "Shaman", classKey: "shaman", favored: { leatherworking: 3, skinning: 3, alchemy: 1 } },
          { label: "Mage", classKey: "mage", favored: { tailoring: 3, enchanting: 3, alchemy: 1 } },
          { label: "Warlock", classKey: "warlock", favored: { tailoring: 3, enchanting: 3, alchemy: 1 } },
          { label: "Druid", classKey: "druid", favored: { leatherworking: 3, skinning: 3, alchemy: 1 } },
          { label: "Skip this question", classKey: "none", favored: {} }
        ]
      },
      {
        id: "economy",
        num: 6,
        question: "Happy to buy materials on the Auction House?",
        options: [
          {
            label: "No: I'd rather supply myself",
            desc: "I want a gathering profession to feed my crafting skill",
            dualCraftPenalty: 3,
            selfSupplyBonus: 3
          },
          {
            label: "Yes: I don't mind buying mats",
            desc: "I am fine pairing two crafting professions (e.g. Tailoring + Enchanting)",
            dualCraftPenalty: 0,
            selfSupplyBonus: 0
          }
        ]
      }
    ],
    pairSynergies: [
      { p1: "mining", p2: "blacksmithing", label: "Blacksmith & Miner", desc: "The canonical plate & mail crafter. Mining supplies 100% of the copper, bronze, iron, and thorium required to forge arms, plate armor, and sharpening stones.", tags: ["Self-Supplied", "Plate / Mail", "BiS Weapons"] },
      { p1: "mining", p2: "engineering", label: "Engineer & Miner", desc: "Supreme PvP dominance. Mining feeds copper tubes, bronze gizmos, and iron bars for grenades, target dummies, and jumper cables.", tags: ["PvP King", "Utility", "Self-Supplied"] },
      { p1: "skinning", p2: "leatherworking", label: "Leatherworker & Skinner", desc: "Flawless self-sufficiency for Hunters, Rogues, Shamans, and Druids. Every beast killed on your journey directly crafts your armor kits, quivers, and gear.", tags: ["Self-Supplied", "Leather / Mail", "Armor Kits"] },
      { p1: "herbalism", p2: "alchemy", label: "Alchemist & Herbalist", desc: "Endless sustain and group utility. Harvest herbs across Azeroth to brew healing potions, mana potions, stat elixirs, and place mana well camp perks.", tags: ["Consumables", "High Demand", "Self-Supplied"] },
      { p1: "tailoring", p2: "enchanting", label: "Tailor & Enchanter", desc: "The ultimate caster combination. Tailoring needs zero gathering skill (cloth drops from humanoids), and crafted green garments are disenchanted into essences and dust.", tags: ["Dual Crafting", "Cloth", "Disenchanting Engine"] },
      { p1: "herbalism", p2: "mining", label: "Dual Gatherer (Ore & Herb)", desc: "Pure economy powerhouse. Ideal for dedicated gatherers leveling an alt to amass gold on the auction house.", tags: ["Pure Gold", "Zero Investment", "Relaxing"] },
      { p1: "skinning", p2: "mining", label: "Tracker & Miner", desc: "Steady gold income while leveling out in the open world, pairing skinnable beasts with vein deposits.", tags: ["Gold", "Zero Downtime"] },
      { p1: "blacksmithing", p2: "engineering", label: "Heavy Industrialist", desc: "Craft both peak plate weaponry and explosive PvP gadgets. Requires deep pockets or an alt supplying ore.", tags: ["Hardcore", "Dual Crafting", "High Cost"] }
    ]
  };
})();
