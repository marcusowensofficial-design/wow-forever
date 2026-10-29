/**
 * World of Warcraft: Forever - Dedicated Legacy Tree Planner Module
 * Account-wide progression perks across Tradeskill Mastery, World Explorer,
 * and Resourcefulness & Economy.
 *
 * Supports:
 * - 16 Launch Points vs 65 Season 1 Cap simulation
 * - Sandbox Theorycrafting vs Account Progression (Earned Points) mode
 * - Multi-character profile allocations (character-specific spending)
 * - 1-Click Curated Meta Build Presets
 * - Shareable Build URL encoding / Discord summary export
 * - Interactive Season 1 Challenge Checklist (65 pts)
 * - Cumulative Active Bonuses HUD
 * - Synergy links to Level 30 Talent Calculator & Professions
 */

(function() {
  'use strict';

  // Storage Keys
  const STORAGE_KEY_PROFILES = 'wow_forever_legacy_profiles';
  const STORAGE_KEY_ACTIVE_PROFILE = 'wow_forever_legacy_active_profile';
  const STORAGE_KEY_CHALLENGES = 'wow_forever_legacy_challenges_completed';
  const STORAGE_KEY_MODE = 'wow_forever_legacy_mode'; // 'sandbox' or 'earned'

  // Default Presets
  const LEGACY_PRESETS = {
    speed_leveler: {
      name: 'Speed Leveler & Adventurer',
      icon: '⚡',
      badge: '16 Launch Pts',
      desc: 'Maximizes early talent points at level 5, combat self-sustain, rested XP, and swift flight paths.',
      cap: 16,
      allocations: {
        'adv-1': 5, // Well Rested 5/5
        'adv-2': 5, // Thrill of Adventure 5/5
        'adv-5': 5, // Talented 5/5 (+5 talent pts)
        'adv-7': 1  // Frequent Flier 1/1
      }
    },
    master_artisan: {
      name: 'Master Artisan & Merchant Tycoon',
      icon: '⚒️',
      badge: '16 Launch Pts',
      desc: 'Max scarce gathering yields, fast skill-ups, vendor price cuts, and bonus Merchant\'s Favor crates.',
      cap: 16,
      allocations: {
        'prof-1': 5, // Working Overtime 5/5
        'prof-2': 5, // Bountiful Harvest 5/5
        'prof-4': 3, // Performance Bonus 3/3
        'prof-5': 2, // Bartering 2/2
        'prof-6': 1  // Master Chef 1/5
      }
    },
    dungeon_economy: {
      name: 'Dungeon Runner & Raid Economy',
      icon: '🛡️',
      badge: '16 Launch Pts',
      desc: 'Zero-cost vendor reagents, double Well Fed & raid buff durations, and reduced repair/death penalties.',
      cap: 16,
      allocations: {
        'res-1': 3, // Gourmand 3/3
        'res-2': 2, // The Quick and the Dead 2/2
        'res-3': 5, // Reinforce 5/5
        'res-5': 2, // Permanence 2/2
        'res-7': 1, // Reagent Economy 1/1
        'adv-3': 2, // Field Medicine 2/2
        'res-4': 1  // Diplomat 1/5
      }
    },
    season_cap_goal: {
      name: 'Season 1 Completionist (65 Cap)',
      icon: '🏆',
      badge: '65 Season Goal',
      desc: 'Endgame 65-point blueprint optimizing 25 Tradeskills, 25 Explorer, and 15 Resourcefulness.',
      cap: 65,
      allocations: {
        // Tradeskill Mastery (25 Max)
        'prof-1': 5, 'prof-2': 5, 'prof-3': 2, 'prof-4': 3, 'prof-5': 2, 'prof-6': 5, 'prof-7': 1, // 23 pts
        // World Explorer (25 Max)
        'adv-1': 5, 'adv-2': 5, 'adv-3': 2, 'adv-4': 3, 'adv-5': 5, 'adv-6': 2, 'adv-7': 1, // 23 pts
        // Resourcefulness & Economy (19 pts)
        'res-1': 3, 'res-2': 2, 'res-3': 5, 'res-4': 5, 'res-5': 2, 'res-7': 1 // 18 pts -> total 64/65
      }
    }
  };

  // Granular Season 1 Challenges (65 Individual 1-Point Challenges = 65 Total Points)
  const DETAILED_CHALLENGES = [
    {
      id: 'classes',
      category: 'Class Mastery (27 Challenges)',
      icon: '🧙',
      totalPoints: 27,
      desc: 'Earn 1 point at level 25 (Novice), 45 (Experienced), and 60 (Master) across all 9 classes',
      items: [
        { id: 'c_warrior', label: 'Novice Warrior (Reach Level 25)', pts: 1 },
        { id: 'c_warrior_45', label: 'Experienced Warrior (Reach Level 45)', pts: 1 },
        { id: 'c_warrior_60', label: 'Master Warrior (Reach Level 60)', pts: 1 },
        { id: 'c_paladin', label: 'Novice Paladin (Reach Level 25)', pts: 1 },
        { id: 'c_paladin_45', label: 'Experienced Paladin (Reach Level 45)', pts: 1 },
        { id: 'c_paladin_60', label: 'Master Paladin (Reach Level 60)', pts: 1 },
        { id: 'c_hunter', label: 'Novice Hunter (Reach Level 25)', pts: 1 },
        { id: 'c_hunter_45', label: 'Experienced Hunter (Reach Level 45)', pts: 1 },
        { id: 'c_hunter_60', label: 'Master Hunter (Reach Level 60)', pts: 1 },
        { id: 'c_rogue', label: 'Novice Rogue (Reach Level 25)', pts: 1 },
        { id: 'c_rogue_45', label: 'Experienced Rogue (Reach Level 45)', pts: 1 },
        { id: 'c_rogue_60', label: 'Master Rogue (Reach Level 60)', pts: 1 },
        { id: 'c_priest', label: 'Novice Priest (Reach Level 25)', pts: 1 },
        { id: 'c_priest_45', label: 'Experienced Priest (Reach Level 45)', pts: 1 },
        { id: 'c_priest_60', label: 'Master Priest (Reach Level 60)', pts: 1 },
        { id: 'c_shaman', label: 'Novice Shaman (Reach Level 25)', pts: 1 },
        { id: 'c_shaman_45', label: 'Experienced Shaman (Reach Level 45)', pts: 1 },
        { id: 'c_shaman_60', label: 'Master Shaman (Reach Level 60)', pts: 1 },
        { id: 'c_mage', label: 'Novice Mage (Reach Level 25)', pts: 1 },
        { id: 'c_mage_45', label: 'Experienced Mage (Reach Level 45)', pts: 1 },
        { id: 'c_mage_60', label: 'Master Mage (Reach Level 60)', pts: 1 },
        { id: 'c_warlock', label: 'Novice Warlock (Reach Level 25)', pts: 1 },
        { id: 'c_warlock_45', label: 'Experienced Warlock (Reach Level 45)', pts: 1 },
        { id: 'c_warlock_60', label: 'Master Warlock (Reach Level 60)', pts: 1 },
        { id: 'c_druid', label: 'Novice Druid (Reach Level 25)', pts: 1 },
        { id: 'c_druid_45', label: 'Experienced Druid (Reach Level 45)', pts: 1 },
        { id: 'c_druid_60', label: 'Master Druid (Reach Level 60)', pts: 1 }
      ]
    },
    {
      id: 'tradeskills',
      category: 'Tradeskill Mastery (18 Challenges)',
      icon: '🔨',
      totalPoints: 18,
      desc: 'Earn 1 point at skill 150 (Journeyman), 225 (Expert), and 300 (Artisan) across 6 crafting professions',
      items: [
        { id: 't_alchemy_150', label: 'Journeyman Alchemist (Reach 150 Alchemy)', pts: 1 },
        { id: 't_alchemy_225', label: 'Expert Alchemist (Reach 225 Alchemy)', pts: 1 },
        { id: 't_alchemy_300', label: 'Artisan Alchemist (Reach 300 Alchemy)', pts: 1 },
        { id: 't_blacksmithing_150', label: 'Journeyman Blacksmith (Reach 150 Blacksmithing)', pts: 1 },
        { id: 't_blacksmithing_225', label: 'Expert Blacksmith (Reach 225 Blacksmithing)', pts: 1 },
        { id: 't_blacksmithing_300', label: 'Artisan Blacksmith (Reach 300 Blacksmithing)', pts: 1 },
        { id: 't_enchanting_150', label: 'Journeyman Enchanter (Reach 150 Enchanting)', pts: 1 },
        { id: 't_enchanting_225', label: 'Expert Enchanter (Reach 225 Enchanting)', pts: 1 },
        { id: 't_enchanting_300', label: 'Artisan Enchanter (Reach 300 Enchanting)', pts: 1 },
        { id: 't_engineering_150', label: 'Journeyman Engineer (Reach 150 Engineering)', pts: 1 },
        { id: 't_engineering_225', label: 'Expert Engineer (Reach 225 Engineering)', pts: 1 },
        { id: 't_engineering_300', label: 'Artisan Engineer (Reach 300 Engineering)', pts: 1 },
        { id: 't_leatherworking_150', label: 'Journeyman Leatherworker (Reach 150 Leatherworking)', pts: 1 },
        { id: 't_leatherworking_225', label: 'Expert Leatherworker (Reach 225 Leatherworking)', pts: 1 },
        { id: 't_leatherworking_300', label: 'Artisan Leatherworker (Reach 300 Leatherworking)', pts: 1 },
        { id: 't_tailoring_150', label: 'Journeyman Tailor (Reach 150 Tailoring)', pts: 1 },
        { id: 't_tailoring_225', label: 'Expert Tailor (Reach 225 Tailoring)', pts: 1 },
        { id: 't_tailoring_300', label: 'Artisan Tailor (Reach 300 Tailoring)', pts: 1 }
      ]
    },
    {
      id: 'pvp',
      category: 'Player vs. Player (12 Challenges)',
      icon: '⚔️',
      totalPoints: 12,
      desc: 'Honor Ranks, Battleground Exalted standings & Field of Honor Journey',
      items: [
        { id: 'pvp_rank_3', label: 'Rank 3 (Sergeant in PvP Honor System)', pts: 1 },
        { id: 'pvp_rank_7', label: 'Rank 7 (Knight-Lieutenant / Blood Guard)', pts: 1 },
        { id: 'pvp_rank_10', label: 'Rank 10 (Commander / Champion)', pts: 1 },
        { id: 'pvp_rank_13', label: 'Rank 13 (Field Marshal / Warlord)', pts: 1 },
        { id: 'pvp_rank_14', label: 'Rank 14 (Grand Marshal / High Warlord)', pts: 1 },
        { id: 'pvp_bg_av', label: 'Master of Alterac Valley (Frostwolf / Stormpike Exalted)', pts: 1 },
        { id: 'pvp_bg_ab', label: 'Master of Arathi Basin (Defilers / League of Arathor Exalted)', pts: 1 },
        { id: 'pvp_bg_wsg', label: 'Master of Warsong Gulch (Outriders / Sentinels Exalted)', pts: 1 },
        { id: 'pvp_bg_darkspear', label: 'Master of Darkspear Islands (Southseas Archipelago Exalted)', pts: 1 },
        { id: 'pvp_foh_w4', label: 'Field of Honor: Week 4 Journey', pts: 1 },
        { id: 'pvp_foh_w7', label: 'Field of Honor: Week 7 Journey', pts: 1 },
        { id: 'pvp_foh_w10', label: 'Field of Honor: Week 10 Journey', pts: 1 }
      ]
    },
    {
      id: 'adventure_world',
      category: 'World Exploration & Epics (2 Challenges)',
      icon: '🧭',
      totalPoints: 2,
      desc: 'Explore Azeroth and Tier 0.5 Dungeon Set Questline',
      items: [
        { id: 'adv_explore', label: 'Explorer (Explore Azeroth Achievement)', pts: 1 },
        { id: 'adv_t05', label: 'Lord Valthalak Laid to Rest (An Earnest Proposition → Saving the Best for Last)', pts: 1 }
      ]
    },
    {
      id: 'dungeons_raids',
      category: 'Dungeons & Raids (6 Challenges)',
      icon: '🏰',
      totalPoints: 6,
      desc: 'New Forever Dungeon Spelunker feats & Season 1 Raid Conqueror titles',
      items: [
        { id: 'dung_novice', label: 'Novice Spelunker (Ruins of Lordaeron & Excavation: Wetlands)', pts: 1 },
        { id: 'dung_exp', label: 'Experienced Spelunker (City of Dalaran, Drowned City & Krol\'Dok Stronghold)', pts: 1 },
        { id: 'dung_master', label: 'Master Spelunker (Alcaz Island, Timbermaw Hold & Shaper\'s Terrace)', pts: 1 },
        { id: 'raid_onyxia', label: 'Conqueror of the Lair: Complete Onyxia\'s Lair', pts: 1 },
        { id: 'raid_hyjal', label: 'Conqueror of the Wilds: Complete Hyjal Summit', pts: 1 },
        { id: 'raid_barrow', label: 'Conqueror of the Deeps: Complete Barrow Deeps', pts: 1 }
      ]
    }
  ];

  // Module State
  let activeProfileId = 'main';
  let profiles = {};
  let completedChallenges = {};
  let simCapActive = false; // false = 16 launch, true = 65 season
  let progressionMode = 'sandbox'; // 'sandbox' vs 'earned'

  // Helper: safe local storage load
  function loadState() {
    try {
      activeProfileId = localStorage.getItem(STORAGE_KEY_ACTIVE_PROFILE) || 'main';
      profiles = JSON.parse(localStorage.getItem(STORAGE_KEY_PROFILES) || 'null') || {
        main: { name: 'Main Character', allocations: {} }
      };

      // Backward compatibility with legacyAllocations
      const oldAllocations = localStorage.getItem('wow_forever_legacy_allocations');
      if (oldAllocations && (!profiles.main.allocations || Object.keys(profiles.main.allocations).length === 0)) {
        try {
          profiles.main.allocations = JSON.parse(oldAllocations);
        } catch {}
      }

      completedChallenges = JSON.parse(localStorage.getItem(STORAGE_KEY_CHALLENGES) || '{}');
      progressionMode = localStorage.getItem(STORAGE_KEY_MODE) || 'sandbox';
    } catch (e) {
      console.warn('Error loading Legacy state:', e);
      profiles = { main: { name: 'Main Character', allocations: {} } };
      completedChallenges = {};
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_PROFILE, activeProfileId);
      localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(profiles));
      localStorage.setItem(STORAGE_KEY_CHALLENGES, JSON.stringify(completedChallenges));
      localStorage.setItem(STORAGE_KEY_MODE, progressionMode);

      // Keep legacy key synced for main profile
      if (profiles[activeProfileId]) {
        localStorage.setItem('wow_forever_legacy_allocations', JSON.stringify(profiles[activeProfileId].allocations || {}));
      }
    } catch (e) {
      console.warn('Error saving Legacy state:', e);
    }
  }

  function getCurrentAllocations() {
    if (!profiles[activeProfileId]) {
      profiles[activeProfileId] = { name: 'Main Character', allocations: {} };
    }
    return profiles[activeProfileId].allocations || {};
  }

  function calculateEarnedPoints() {
    let earned = 0;
    DETAILED_CHALLENGES.forEach(group => {
      group.items.forEach(item => {
        if (completedChallenges[item.id]) {
          earned += item.pts;
        }
      });
    });
    return earned;
  }

  function getTotalAllowedPoints() {
    if (progressionMode === 'earned') {
      const earned = calculateEarnedPoints();
      // Even in earned mode, character cap is 16 at launch unless 65 simulation is checked
      const hardCap = simCapActive ? 65 : 16;
      return Math.min(earned, hardCap);
    }
    return simCapActive
      ? ((window.WOW_FOREVER_DATA && window.WOW_FOREVER_DATA.legacyTreesData && window.WOW_FOREVER_DATA.legacyTreesData.seasonalCap) || 65)
      : ((window.WOW_FOREVER_DATA && window.WOW_FOREVER_DATA.legacyTreesData && window.WOW_FOREVER_DATA.legacyTreesData.totalPointsAtLaunch) || 16);
  }

  function getTreeSpent(tree, allocations) {
    return tree.perks.reduce((sum, p) => sum + (allocations[p.id] || 0), 0);
  }

  // Calculate cumulative active bonuses for HUD
  function calculateActiveBonuses(allocations) {
    const bonuses = [];

    // Tradeskill Perks
    const overtime = allocations['prof-1'] || 0;
    if (overtime > 0) bonuses.push({ label: 'Tradeskill Skill-Up Chance', val: `+${overtime * 4}%`, desc: 'On all primary, secondary, and class tradeskills', icon: '⚡' });

    const harvest = allocations['prof-2'] || 0;
    if (harvest > 0) bonuses.push({ label: 'Scarce Gathering Yield', val: `+${harvest * 20}%`, desc: 'More likely to discover Scarce materials from Mining, Herbalism & Skinning', icon: '🌿' });

    const luremaster = allocations['prof-3'] || 0;
    if (luremaster > 0) bonuses.push({ label: 'Luremaster Fishing', val: `+${luremaster * 25}%`, desc: 'Chance to reel in an extra fish with active Lure', icon: '🎣' });

    const bonusFavor = allocations['prof-4'] || 0;
    if (bonusFavor > 0) bonuses.push({ label: 'Merchant\'s Favor Bonus', val: `${bonusFavor * 5}% chance`, desc: 'For 100% increased Merchant\'s Favor on supply crates', icon: '📦' });

    const bartering = allocations['prof-5'] || 0;
    if (bartering > 0) bonuses.push({ label: 'Vendor Price Discount', val: `-${bartering * 5}%`, desc: 'Gold discount on all items from all vendors across Azeroth', icon: '🪙' });

    const chef = allocations['prof-6'] || 0;
    if (chef > 0) bonuses.push({ label: 'Master Chef Extra Servings', val: `+${chef * 10}%`, desc: 'Chance to craft bonus meals on all cooking recipes', icon: '🍲' });

    const study = allocations['prof-7'] || 0;
    if (study > 0) bonuses.push({ label: 'Dedicated Study', val: '+1 Lowest Skill', desc: 'Auto-boosts lowest tradeskill (or 2–4 Elemental Essences if 300)', icon: '📖' });

    // Adventure Perks
    const rested = allocations['adv-1'] || 0;
    if (rested > 0) bonuses.push({ label: 'Rested XP Gain & Cap', val: `+${rested * 4}%`, desc: 'Accumulates faster and increases maximum rested cap', icon: '💤' });

    const thrill = allocations['adv-2'] || 0;
    if (thrill > 0) bonuses.push({ label: 'Thrill of Adventure', val: `${thrill * 1}% HP & Mana`, desc: 'Regenerated over 10s upon killing non-trivial open world enemies', icon: '🗡️' });

    const fieldMed = allocations['adv-3'] || 0;
    if (fieldMed > 0) bonuses.push({ label: 'Recently Bandaged Cooldown', val: `-${fieldMed * 5}s`, desc: 'Reduces debuff duration when using bandages in open world', icon: '🩹' });

    const fieldGuide = allocations['adv-4'] || 0;
    if (fieldGuide > 0) bonuses.push({ label: 'Camp Feature Cooldown', val: `-${[0, 8, 17, 25][fieldGuide] || (fieldGuide * 8)}%`, desc: 'Faster placement cooldown on campsite workstations', icon: '⛺' });

    const talented = allocations['adv-5'] || 0;
    if (talented > 0) bonuses.push({ label: 'Talented (Early Talents)', val: `+${talented} Pts (from L${10 - talented})`, desc: 'Gain talent points starting earlier than level 10 (+5 points at L30 beta cap!)', icon: '✨', linkTab: 'planner' });

    const highAlert = allocations['adv-6'] || 0;
    if (highAlert > 0) bonuses.push({ label: 'Stealth Detection Level', val: `+${highAlert * 1} Effective Level${highAlert > 1 ? 's' : ''}`, desc: 'Enhanced sight against rogues & prowlers in open world', icon: '👁️' });

    const frequentFlier = allocations['adv-7'] || 0;
    if (frequentFlier > 0) bonuses.push({ label: 'Frequent Flier Flight Paths', val: '50% Off / +20% Speed', desc: 'Flight masters cost half gold and fly 20% faster', icon: '🦅' });

    // Resourcefulness Perks
    const gourmand = allocations['res-1'] || 0;
    if (gourmand > 0) bonuses.push({ label: 'Well Fed Buff Duration', val: `+${[0, 33, 67, 100][gourmand] || (gourmand * 33)}%`, desc: 'Extends the duration of beneficial food buffs up to +100%', icon: '🍖' });

    const quickDead = allocations['res-2'] || 0;
    if (quickDead > 0) bonuses.push({ label: 'The Quick and the Dead', val: `+${quickDead * 5}% Ghost Speed`, desc: `Ghost run speed boost & free abilities for ${quickDead} min after resurrection`, icon: '👻' });

    const reinforce = allocations['res-3'] || 0;
    if (reinforce > 0) bonuses.push({ label: 'Death Durability Loss', val: `-${reinforce * 8}%`, desc: 'Significantly lowers armor repair bills after dying (up to -40%)', icon: '🛡️' });

    const diplomat = allocations['res-4'] || 0;
    if (diplomat > 0) bonuses.push({ label: 'Reputation Gain Bonus', val: `+${diplomat * 2}%`, desc: 'Accelerates all faction reputation grinds across Azeroth (up to +10%)', icon: '🤝' });

    const permanence = allocations['res-5'] || 0;
    if (permanence > 0) bonuses.push({ label: 'Permanence Buff Extension', val: `+${permanence * 50}% Raid & Camp Buffs`, desc: 'Class party/raid buffs and camp resting benefits last +50% longer per rank', icon: '⏳' });

    const honor = allocations['res-6'] || 0;
    if (honor > 0) bonuses.push({ label: 'Honor Points Bonus', val: `+${honor * 2}%`, desc: 'Earn extra PvP honor in battlegrounds and open world skirmishes (up to +10%)', icon: '🎖️' });

    const reagentEcon = allocations['res-7'] || 0;
    if (reagentEcon > 0) bonuses.push({ label: 'Reagent Economy', val: '0 Vendor Reagents', desc: 'Class spells no longer require reagents purchaseable from vendors', icon: '🔮' });

    return bonuses;
  }

  // Initialize Module
  function initLegacyCalculator() {
    loadState();
    checkUrlBuildHash();
    renderLegacyCalculator();
    setupEventListeners();
  }

  function setupEventListeners() {
    // Reset points button
    const resetBtn = document.getElementById('reset-legacy-calc-btn');
    if (resetBtn) {
      resetBtn.onclick = () => {
        if (!profiles[activeProfileId]) return;
        profiles[activeProfileId].allocations = {};
        saveState();
        renderLegacyCalculator();
        showToast('All legacy points reset for active character.');
      };
    }

    // Toggle 16 vs 65 Cap
    const simBtn = document.getElementById('toggle-sim-cap-btn');
    if (simBtn) {
      simBtn.onclick = () => {
        simCapActive = !simCapActive;
        simBtn.textContent = simCapActive ? 'Switch to 16 Launch Points' : 'Simulate 65 Cap';
        renderLegacyCalculator();
        showToast(simCapActive ? 'Simulating Season 1 (65 Cap)' : 'Returned to 16 Launch Points');
      };
    }

    // Progression Mode toggle
    const modeSelect = document.getElementById('legacy-mode-select');
    if (modeSelect) {
      modeSelect.value = progressionMode;
      modeSelect.onchange = (e) => {
        progressionMode = e.target.value;
        saveState();
        renderLegacyCalculator();
      };
    }

    // Character profile selector
    const profileSelect = document.getElementById('legacy-profile-select');
    if (profileSelect) {
      profileSelect.onchange = (e) => {
        switchLegacyProfile(e.target.value);
      };
    }

    // Add new character button
    const addProfileBtn = document.getElementById('legacy-add-profile-btn');
    if (addProfileBtn) {
      addProfileBtn.onclick = () => {
        const name = prompt('Enter Character Name (e.g. Alt Shaman):');
        if (name && name.trim()) {
          const newId = 'char_' + Date.now();
          profiles[newId] = { name: name.trim(), allocations: {} };
          activeProfileId = newId;
          saveState();
          renderLegacyCalculator();
          showToast(`Created profile for ${name.trim()}!`);
        }
      };
    }

    // Copy Share URL
    const shareBtn = document.getElementById('legacy-share-btn');
    if (shareBtn) {
      shareBtn.onclick = copyShareUrl;
    }

    // Copy Discord Summary
    const discordBtn = document.getElementById('legacy-discord-btn');
    if (discordBtn) {
      discordBtn.onclick = copyDiscordSummary;
    }
  }

  function switchLegacyProfile(profileId) {
    if (!profiles[profileId]) return;
    activeProfileId = profileId;
    saveState();
    renderLegacyCalculator();
    showToast(`Switched active profile to ${profiles[profileId].name}`);
  }

  function renderLegacyCalculator() {
    const container = document.getElementById('legacy-trees-wrapper');
    if (!container) return;

    const allocations = getCurrentAllocations();
    const data = window.WOW_FOREVER_DATA && window.WOW_FOREVER_DATA.legacyTreesData;
    if (!data || !data.trees) return;

    const totalAllowed = getTotalAllowedPoints();
    const spentPoints = Object.values(allocations).reduce((a, b) => a + b, 0);
    const remaining = Math.max(0, totalAllowed - spentPoints);
    const earnedPoints = calculateEarnedPoints();

    // 1. Update Points Counters
    const pointsCounter = document.getElementById('legacy-points-remaining');
    if (pointsCounter) {
      const modeLabel = progressionMode === 'earned'
        ? `(${earnedPoints} Earned / ${totalAllowed} Spendable)`
        : simCapActive ? '(Simulating 65 Cap)' : '(16 Launch Cap)';
      pointsCounter.textContent = `${remaining} / ${totalAllowed} Points Remaining ${modeLabel}`;
      pointsCounter.style.color = remaining === 0 ? '#ef4444' : '#10b981';
    }

    // 2. Update Profile Dropdown
    const profileSelect = document.getElementById('legacy-profile-select');
    if (profileSelect) {
      profileSelect.innerHTML = Object.entries(profiles).map(([id, prof]) => {
        const charSpent = Object.values(prof.allocations || {}).reduce((a, b) => a + b, 0);
        return `<option value="${id}" ${id === activeProfileId ? 'selected' : ''}>${escapeHtml(prof.name)} (${charSpent} pts)</option>`;
      }).join('');
    }

    // 3. Render Presets Bar
    renderPresetsBar();

    // 4. Render Milestone Rewards Track (Innkeeper Wiley, Ratchet)
    renderMilestoneRewards(spentPoints, earnedPoints);

    // 5. Render Cumulative Active Bonuses HUD
    renderActiveBonusesHUD(allocations);

    // 6. Render 3 Trees Grid
    const treeCap = data.treeCap || 25;
    container.innerHTML = data.trees.map(tree => {
      const treeSpent = getTreeSpent(tree, allocations);

      return `
        <div class="legacy-tree-col" style="border-top: 4px solid ${tree.color};">
          <div class="legacy-tree-header">
            <span style="font-size: 1.8rem;">${tree.icon}</span>
            <div style="flex: 1;">
              <h4 style="color: #fff; font-size: 1.2rem; margin: 0;">${tree.name}</h4>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.2rem;">
                <span style="font-size: 0.8rem; color: var(--text-gold); font-weight: 700;">
                  ${treeSpent} / ${treeCap} Points
                </span>
                <span style="font-size: 0.72rem; color: ${treeSpent >= treeCap ? '#34d399' : 'var(--text-muted)'};">
                  ${treeSpent >= treeCap ? '✓ TREE CAP REACHED' : `${treeCap - treeSpent} Pts Cap Room`}
                </span>
              </div>
            </div>
          </div>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem; min-height: 2.2rem;">
            ${escapeHtml(tree.description || '')}
          </p>

          <div class="legacy-perks-list">
            ${tree.perks.map(perk => {
              const current = allocations[perk.id] || 0;
              const canAdd = current < perk.max && remaining > 0 && treeSpent < treeCap;
              const canSub = current > 0;
              const isMaxed = current >= perk.max;

              // Check if perk has special cross-links
              let synergyBadge = '';
              if (perk.id === 'adv-5') {
                synergyBadge = `<a href="#planner" onclick="const b = document.querySelector('.nav-tab-btn[data-tab=\\'planner\\']'); if(b) b.click();" class="perk-synergy-tag" title="Opens Level 30 Talent Calculator with 26 Points enabled">✨ Grants +5 Talents at L30 ›</a>`;
              } else if (perk.id === 'prof-4') {
                synergyBadge = `<a href="#professions" onclick="const b = document.querySelector('.nav-tab-btn[data-tab=\\'professions\\']'); if(b) b.click();" class="perk-synergy-tag" title="Boosts ACA & Durotar Supply Crate turn-ins">📦 Merchant's Favor Crates ›</a>`;
              } else if (perk.id === 'res-7') {
                synergyBadge = `<a href="#camping" onclick="const b = document.querySelector('.nav-tab-btn[data-tab=\\'camping\\']'); if(b) b.click();" class="perk-synergy-tag" title="Free Tier 1 Campsite Workstations">⛺ Free Camp Blueprints ›</a>`;
              }

              return `
                <div class="legacy-perk-box ${current > 0 ? 'perk-allocated' : ''} ${isMaxed ? 'perk-maxed' : ''}">
                  <div class="perk-info-row">
                    <span class="perk-name">${escapeHtml(perk.name)}</span>
                    <span class="perk-rank ${current > 0 ? 'active' : ''}">${current} / ${perk.max}</span>
                  </div>
                  <p class="perk-desc">${escapeHtml(perk.desc)}</p>
                  ${synergyBadge}
                  <div class="perk-btn-group">
                    <button type="button" class="perk-step-btn" onclick="LegacyModule.adjustPerk('${perk.id}', -1)" ${!canSub ? 'disabled' : ''} aria-label="Decrease ${escapeHtml(perk.name)}">−</button>
                    <button type="button" class="perk-step-btn add" onclick="LegacyModule.adjustPerk('${perk.id}', 1)" ${!canAdd ? 'disabled' : ''} aria-label="Increase ${escapeHtml(perk.name)}">+</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');

    // 7. Render Interactive Challenge Checklist
    renderChallengeChecklist(earnedPoints);
  }

  function renderPresetsBar() {
    const presetContainer = document.getElementById('legacy-presets-container');
    if (!presetContainer) return;

    presetContainer.innerHTML = Object.entries(LEGACY_PRESETS).map(([key, p]) => `
      <button type="button" class="legacy-preset-btn" onclick="LegacyModule.loadPreset('${key}')" title="${escapeHtml(p.desc)}">
        <span>${p.icon}</span>
        <strong>${escapeHtml(p.name)}</strong>
        <small class="preset-badge">${escapeHtml(p.badge)}</small>
      </button>
    `).join('');
  }

  function renderMilestoneRewards(spentPoints, earnedPoints) {
    const milestoneGrid = document.getElementById('milestone-rewards-grid');
    const milestoneText = document.getElementById('milestone-progress-text');
    if (!milestoneGrid) return;

    // Use earned points for unlocks if in earned mode, otherwise spent points
    const trackPoints = progressionMode === 'earned' ? earnedPoints : spentPoints;

    if (milestoneText) {
      milestoneText.innerHTML = `
        <strong>${trackPoints} / 65 Points Accumulated</strong>
        <span style="color: var(--text-muted); font-size: 0.78rem;">(${progressionMode === 'earned' ? 'Account Challenges Completed' : 'Simulated Tree Investment'})</span>
      `;
    }

    const rewards = (window.WOW_FOREVER_DATA && window.WOW_FOREVER_DATA.legacyMilestoneRewards) || [];
    milestoneGrid.innerHTML = rewards.map(m => {
      const unlocked = trackPoints >= m.points;
      const progressPercent = Math.min(100, Math.round((trackPoints / m.points) * 100));

      return `
        <div class="milestone-reward-card ${unlocked ? 'unlocked' : ''}">
          <div class="milestone-points-badge ${unlocked ? 'unlocked' : ''}">
            ${unlocked ? '✓ UNLOCKED' : `${m.points} Points (${progressPercent}%)`}
          </div>
          <div class="milestone-card-body">
            <span style="font-size: 2rem;">${m.icon}</span>
            <div>
              <strong style="color: ${unlocked ? '#34d399' : '#fff'}; font-size: 1rem;">${escapeHtml(m.name)}</strong>
              <div style="font-size: 0.75rem; color: var(--text-gold); margin: 0.15rem 0;">${escapeHtml(m.type)} • ${escapeHtml(m.vendor)}</div>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">${escapeHtml(m.desc)}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderActiveBonusesHUD(allocations) {
    const hudContainer = document.getElementById('legacy-active-bonuses-container');
    if (!hudContainer) return;

    const bonuses = calculateActiveBonuses(allocations);
    if (bonuses.length === 0) {
      hudContainer.innerHTML = `
        <div class="legacy-bonus-empty">
          <span style="font-size: 1.5rem; opacity: 0.5;">⚡</span>
          <p>No perks allocated yet. Allocate points in the trees or pick a 1-click Preset to view cumulative character bonuses.</p>
        </div>
      `;
      return;
    }

    hudContainer.innerHTML = `
      <div class="legacy-bonuses-grid">
        ${bonuses.map(b => `
          <div class="legacy-bonus-chip">
            <div class="bonus-chip-header">
              <span class="bonus-icon">${b.icon}</span>
              <strong class="bonus-val">${escapeHtml(b.val)}</strong>
            </div>
            <div class="bonus-title">${escapeHtml(b.label)}</div>
            <div class="bonus-desc">${escapeHtml(b.desc)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderChallengeChecklist() {
    const checklistContainer = document.getElementById('legacy-challenges-checklist');
    if (!checklistContainer) return;

    checklistContainer.innerHTML = DETAILED_CHALLENGES.map(cat => {
      const catEarned = cat.items.reduce((sum, item) => sum + (completedChallenges[item.id] ? item.pts : 0), 0);
      const isCatComplete = catEarned >= cat.totalPoints;

      return `
        <div class="challenge-category-card ${isCatComplete ? 'category-complete' : ''}">
          <div class="challenge-category-header">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.3rem;">${cat.icon}</span>
              <h5 style="color: #fff; font-size: 1rem; margin: 0;">${escapeHtml(cat.category)}</h5>
            </div>
            <span class="challenge-cat-tally ${isCatComplete ? 'tally-complete' : ''}">
              ${catEarned} / ${cat.totalPoints} Pts
            </span>
          </div>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.75rem;">${escapeHtml(cat.desc)}</p>

          <div class="challenge-items-list">
            ${cat.items.map(item => {
              const checked = !!completedChallenges[item.id];
              return `
                <label class="challenge-check-item ${checked ? 'item-checked' : ''}">
                  <input type="checkbox" ${checked ? 'checked' : ''} onchange="LegacyModule.toggleChallenge('${item.id}')">
                  <span class="challenge-item-label">${escapeHtml(item.label)}</span>
                  <span class="challenge-item-pts">+${item.pts} pt${item.pts > 1 ? 's' : ''}</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  // Adjust Perk rank
  function adjustPerk(perkId, delta) {
    const data = window.WOW_FOREVER_DATA && window.WOW_FOREVER_DATA.legacyTreesData;
    if (!data || !data.trees) return;

    let targetPerk = null;
    let targetTree = null;
    for (const tree of data.trees) {
      const found = tree.perks.find(p => p.id === perkId);
      if (found) { targetPerk = found; targetTree = tree; break; }
    }
    if (!targetPerk || !targetTree) return;

    const allocations = getCurrentAllocations();
    const current = allocations[perkId] || 0;
    const spentPoints = Object.values(allocations).reduce((a, b) => a + b, 0);
    const totalAllowed = getTotalAllowedPoints();
    const treeSpent = getTreeSpent(targetTree, allocations);
    const treeCap = data.treeCap || 25;

    if (delta > 0) {
      if (spentPoints >= totalAllowed) {
        showToast(`Point limit reached (${totalAllowed} pts max). Reset or remove points first.`);
        return;
      }
      if (treeSpent >= treeCap) {
        showToast(`${targetTree.name} tree cap (${treeCap} pts) reached!`);
        return;
      }
      if (current >= targetPerk.max) return;
      allocations[perkId] = current + 1;
    } else if (delta < 0) {
      if (current <= 0) return;
      allocations[perkId] = current - 1;
      if (allocations[perkId] === 0) {
        delete allocations[perkId];
      }
    }

    profiles[activeProfileId].allocations = allocations;
    saveState();
    renderLegacyCalculator();
  }

  // Load Preset
  function loadPreset(presetKey) {
    const preset = LEGACY_PRESETS[presetKey];
    if (!preset) return;

    if (!profiles[activeProfileId]) {
      profiles[activeProfileId] = { name: 'Main Character', allocations: {} };
    }

    if (preset.cap === 65 && !simCapActive) {
      simCapActive = true;
      const simBtn = document.getElementById('toggle-sim-cap-btn');
      if (simBtn) simBtn.textContent = 'Switch to 16 Launch Points';
    }

    profiles[activeProfileId].allocations = Object.assign({}, preset.allocations);
    saveState();
    renderLegacyCalculator();
    showToast(`Loaded Preset: "${preset.name}"!`);
  }

  // Toggle Challenge completed
  function toggleChallenge(challengeId) {
    if (completedChallenges[challengeId]) {
      delete completedChallenges[challengeId];
    } else {
      completedChallenges[challengeId] = true;
    }
    saveState();
    renderLegacyCalculator();
  }

  // Encode build into URL string
  function getEncodedBuildString() {
    const allocations = getCurrentAllocations();
    const pairs = Object.entries(allocations).filter(([_, v]) => v > 0).map(([k, v]) => `${k}:${v}`);
    return pairs.join(',');
  }

  function copyShareUrl() {
    const buildString = getEncodedBuildString();
    const url = new URL(window.location.href);
    url.hash = `legacy?b=${encodeURIComponent(buildString)}`;
    navigator.clipboard.writeText(url.toString()).then(() => {
      showToast('Build URL copied to clipboard! Share it with your squad.');
    }).catch(() => {
      prompt('Copy your build share link:', url.toString());
    });
  }

  function copyDiscordSummary() {
    const allocations = getCurrentAllocations();
    const data = window.WOW_FOREVER_DATA && window.WOW_FOREVER_DATA.legacyTreesData;
    if (!data) return;

    const totalAllowed = getTotalAllowedPoints();
    const spentPoints = Object.values(allocations).reduce((a, b) => a + b, 0);

    let summary = `**[WoW: Forever] Legacy Tree Build: ${spentPoints}/${totalAllowed} Points**\n`;
    data.trees.forEach(tree => {
      const treeSpent = getTreeSpent(tree, allocations);
      if (treeSpent > 0) {
        summary += `\n> **${tree.name} (${treeSpent} pts):**\n`;
        tree.perks.forEach(p => {
          const rank = allocations[p.id] || 0;
          if (rank > 0) {
            summary += `> • ${p.name}: ${rank}/${p.max}\n`;
          }
        });
      }
    });

    const shareUrl = `${window.location.origin}${window.location.pathname}#legacy?b=${encodeURIComponent(getEncodedBuildString())}`;
    summary += `\n🔗 Plan & View: ${shareUrl}`;

    navigator.clipboard.writeText(summary).then(() => {
      showToast('Discord summary formatted & copied to clipboard!');
    }).catch(() => {
      prompt('Copy Discord summary:', summary);
    });
  }

  // Read URL params on load
  function checkUrlBuildHash() {
    const hash = window.location.hash;
    if (!hash.includes('legacy')) return;

    const queryIdx = hash.indexOf('?');
    if (queryIdx === -1) return;

    const query = new URLSearchParams(hash.substring(queryIdx + 1));
    const build = query.get('b');
    if (!build) return;

    try {
      const pairs = decodeURIComponent(build).split(',');
      const imported = {};
      pairs.forEach(pair => {
        const [k, v] = pair.split(':');
        if (k && v) {
          const num = parseInt(v, 10);
          if (!isNaN(num)) imported[k] = num;
        }
      });

      if (Object.keys(imported).length > 0) {
        profiles[activeProfileId].allocations = imported;
        saveState();
        showToast('Loaded shared Legacy Build from URL!');
      }
    } catch (e) {
      console.warn('Failed parsing build from URL:', e);
    }
  }

  // Minimal Toast Notification
  function showToast(msg) {
    let toast = document.getElementById('legacy-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'legacy-toast';
      toast.className = 'legacy-toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // Public API
  window.LegacyModule = {
    init: initLegacyCalculator,
    render: renderLegacyCalculator,
    adjustPerk: adjustPerk,
    loadPreset: loadPreset,
    toggleChallenge: toggleChallenge,
    switchProfile: switchLegacyProfile,
    copyShareUrl: copyShareUrl,
    copyDiscordSummary: copyDiscordSummary
  };

  // Backwards compatibility for inline HTML onclick calls
  window.adjustLegacyPerk = adjustPerk;
  window.initLegacyCalculator = initLegacyCalculator;
  window.renderLegacyCalculator = renderLegacyCalculator;

})();
