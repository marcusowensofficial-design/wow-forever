/* global module */
/**
 * World of Warcraft: Forever - Interactive Progression Stat Filter Engine
 * Phase 3 Build 1.60.1.70425
 *
 * Dedicated multi-criteria filtering and tooltip stat parsing module.
 * Exposes window.WOW_PROGRESSION_FILTER.
 */

(function () {
  'use strict';

  // 1. Default Filter State (unconstrained default: all inputs null/empty/0)
  const DEFAULT_FILTER_STATE = {
    // Level & Scaling
    minLevel: null,
    maxLevel: null,
    minDps: null,

    // Weapon Swing Speed
    speedOp: '>=', // '>=' (Slower / At least) | '<=' (Faster / At most)
    speedVal: null,

    // Core Attributes
    minStr: null,
    minAgi: null,
    minSta: null,
    minInt: null,
    minSpi: null,

    // Combat & Caster Stats
    minAp: null,
    minCrit: null,
    minHit: null,
    minSpellDmg: null,
    minHealing: null,
    minMp5: null,

    // Defensive & Shield Stats
    minArmor: null,
    minBlock: null,

    // Drawer UI State
    isDrawerOpen: false
  };

  let filterState = { ...DEFAULT_FILTER_STATE };

  /**
   * Helper: Escape HTML strings
   */
  function safeEscape(str) {
    if (typeof window !== 'undefined' && typeof window.escapeHtml === 'function') {
      return window.escapeHtml(str);
    }
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * 2. Comprehensive Tooltip & Stat Parsing Engine
   * Normalizes 17 stat dimensions from item properties, stats strings, and tooltip lines.
   * Direct item properties take precedence over tooltip lines so UI card values match filter evaluations.
   */
  function parseItemStats(item) {
    if (!item) return null;

    const result = {
      reqLevel: 0,
      iLvl: 0,
      dps: 0,
      speed: 0,
      strength: 0,
      agility: 0,
      stamina: 0,
      intellect: 0,
      spirit: 0,
      attackPower: 0,
      generalAttackPower: 0,
      rangedAttackPower: 0,
      feralAttackPower: 0,
      effectiveAttackPower: 0,
      crit: 0,
      hit: 0,
      spellDamage: 0,
      healing: 0,
      mp5: 0,
      armor: 0,
      baseBlock: 0,
      blockValueBonus: 0,
      totalBlockValue: 0,
      block: 0
    };

    // 2.1 Direct Item Properties (highest precedence for displayed card stats)
    if (typeof item.reqLevel === 'number' && !isNaN(item.reqLevel)) {
      result.reqLevel = item.reqLevel;
    }
    if (typeof item.iLvl === 'number' && !isNaN(item.iLvl)) {
      result.iLvl = item.iLvl;
    } else if (typeof item.ilvl === 'number' && !isNaN(item.ilvl)) {
      result.iLvl = item.ilvl;
    }

    if (typeof item.dps === 'number' && !isNaN(item.dps)) {
      result.dps = item.dps;
    } else if (typeof item.dps === 'string') {
      const m = item.dps.match(/([\d.]+)/);
      if (m) result.dps = parseFloat(m[1]);
    }

    if (typeof item.speed === 'number' && !isNaN(item.speed)) {
      result.speed = item.speed;
    } else if (typeof item.speed === 'string') {
      const m = item.speed.match(/([\d.]+)/);
      if (m) result.speed = parseFloat(m[1]);
    }

    if (typeof item.armor === 'number' && !isNaN(item.armor)) {
      result.armor = item.armor;
    } else if (typeof item.armor === 'string') {
      const cleaned = item.armor.replace(/,/g, '').trim();
      const m = cleaned.match(/([+-]?\d+)/);
      if (m) result.armor = parseInt(m[1], 10);
    }

    if (typeof item.block === 'number' && !isNaN(item.block)) {
      result.baseBlock = item.block;
    } else if (typeof item.block === 'string') {
      const m = item.block.match(/([+-]?\d+)/);
      if (m) result.baseBlock = parseInt(m[1], 10);
    }

    // 2.2 Process Tooltip Lines Array
    const lines = Array.isArray(item.lines) ? item.lines : [];
    let linesApBase = 0;
    let linesApCreature = 0;
    let linesFeralAp = 0;
    let linesRangedAp = 0;

    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      const l = String(rawLine || '').trim();
      if (!l) continue;

      // Required Level
      if (!result.reqLevel) {
        const reqM = l.match(/^Requires Level\s+(\d+)/i);
        if (reqM) result.reqLevel = parseInt(reqM[1], 10);
      }

      // Item Level
      if (!result.iLvl) {
        const ilvlM = l.match(/^Item Level\s+(\d+)/i);
        if (ilvlM) result.iLvl = parseInt(ilvlM[1], 10);
      }

      // Weapon DPS from lines: (X.XX damage per second)
      if (!result.dps) {
        const dpsM = l.match(/\(([\d.]+)\s+damage per second\)/i);
        if (dpsM) result.dps = parseFloat(dpsM[1]);
      }

      // Weapon Speed from lines: Speed X.XX
      if (!result.speed) {
        const spdM = l.match(/Speed\s+([\d.]+)/i);
        if (spdM) result.speed = parseFloat(spdM[1]);
      }

      // Static Armor: handles commas e.g. "1,380 Armor"
      // Rejects proc armor lines e.g. "chance to grant you 1080 armor for 12 sec"
      if (!result.armor && /\barmor\b/i.test(l) && !/chance|when struck|for \d+ sec/i.test(l)) {
        const armM = l.match(/([+-]?[\d,]+)\s+Armor/i);
        if (armM) result.armor = parseInt(armM[1].replace(/,/g, ''), 10);
      }

      // Base Shield Block: "17 Block" or "+1 Block"
      // Strictly excludes Equip effects, chance to block, damage procs on block
      if (!result.baseBlock && /\bblock\b/i.test(l) && !/equip:|chance|every time you block|increases.*block|deals.*damage/i.test(l)) {
        const blkM = l.match(/^([+-]?\d+)\s+Block\b/i) || l.match(/([+-]?\d+)\s+Block\b/i);
        if (blkM) result.baseBlock = parseInt(blkM[1], 10);
      }

      // Equip Block Value Bonus: "Equip: Increases the block value of your shield by 21."
      const blkBonusM = l.match(/increases the block value of your shield by\s+(\d+)/i);
      if (blkBonusM) {
        result.blockValueBonus += parseInt(blkBonusM[1], 10);
      }

      // Attack Power (general, creature-specific, ranged, feral)
      // Excludes debuffs: "Reduces target enemy's attack power by 39"
      if (/attack power/i.test(l) && !/reduces.*attack power|slows.*attack power|chance on hit.*reduces/i.test(l)) {
        const feralM = l.match(/\+(\d+)\s+Attack Power in (?:Cat, Bear, Dire Bear, and Moonkin|Cat, Bear)/i)
          || l.match(/Increases attack power by\s+(\d+)\s+in Cat/i);
        if (feralM) {
          linesFeralAp += parseInt(feralM[1], 10);
        }

        const rapM = l.match(/\+(\d+)\s+Ranged Attack Power/i)
          || l.match(/Increases ranged attack power by\s+(\d+)/i);
        if (rapM) {
          linesRangedAp += parseInt(rapM[1], 10);
        }

        const creatureM = l.match(/(?:(?:\+|Equip:\s*\+)(\d+)\s+Attack Power against\s+(?:Beasts|Humanoids|Undead|Demons|Dragonkin))/i);
        if (creatureM) {
          linesApCreature += parseInt(creatureM[1], 10);
        }

        const apM = l.match(/(?:(?:\+|Equip:\s*\+)(\d+)\s+Attack Power\b|Increases attack power by\s+(\d+)\b)/i);
        if (apM && !feralM && !rapM && !creatureM) {
          linesApBase += parseInt(apM[1] || apM[2], 10);
        }
      }

      // Critical Strike %
      // Excludes temporary proc buffs: "guaranteed to be critical strikes for next 3 sec"
      if (/crit/i.test(l) && !/for the next|party members|guaranteed to be/i.test(l)) {
        const critPctM = l.match(/critical strike(?: with (?:all spells and attacks|spells))? by\s+([\d.]+)%/i);
        if (critPctM) {
          result.crit += parseFloat(critPctM[1]);
        } else {
          const critRatingM = l.match(/(?:\+|Equip:\s*\+)(\d+(?:\.\d+)?)\s*(?:Crit|Critical Strike Rating)\b/i);
          if (critRatingM) result.crit += parseFloat(critRatingM[1]);
        }
      }

      // Hit Chance %
      // Excludes resistance reductions: "Reduces the hit chance of Sleep effects"
      if (/\bhit\b/i.test(l) && !/reduces.*hit chance|causes the target to bleed/i.test(l)) {
        const hitPctM = l.match(/chance to hit(?: with all spells and attacks)? by\s+([\d.]+)%/i);
        if (hitPctM) {
          result.hit += parseFloat(hitPctM[1]);
        } else {
          const hitRatingM = l.match(/(?:\+|Equip:\s*\+)(\d+(?:\.\d+)?)\s*(?:Hit|Hit Rating)\b/i);
          if (hitRatingM) result.hit += parseFloat(hitRatingM[1]);
        }
      }

      // MP5 (Mana per 5 sec)
      // Excludes temporary procs and HP5 (Health per 5 sec)
      if (/mp5|mana per 5/i.test(l) && !/chance/i.test(l)) {
        const mp5M = l.match(/(?:restores\s+(\d+)\s+mana per 5 sec|\+(\d+)\s*mp5|\+(\d+)\s*mana per 5 sec)/i);
        if (mp5M) {
          result.mp5 += parseInt(mp5M[1] || mp5M[2] || mp5M[3], 10);
        }
      }

      // Spell Damage & Healing
      // Dual effect: "Increases damage and healing done by magical spells and effects by up to 14"
      const spDualM = l.match(/increases damage and healing done by magical spells and effects by up to\s+(\d+)/i);
      if (spDualM) {
        const v = parseInt(spDualM[1], 10);
        result.spellDamage += v;
        result.healing += v;
      }

      // Spell Power / SP shorthand
      const spPowM = l.match(/(?:\+|Equip:\s*\+)(\d+)\s*(?:Spell Power|SP)\b/i);
      if (spPowM && !spDualM) {
        const v = parseInt(spPowM[1], 10);
        result.spellDamage += v;
        result.healing += v;
      }

      // Asymmetric hybrid line: "Increases healing done by up to 18 and damage done by up to 6"
      const hybridM = l.match(/increases healing done by up to\s+(\d+)\s+and damage done by up to\s+(\d+)/i);
      if (hybridM) {
        result.healing += parseInt(hybridM[1], 10);
        result.spellDamage += parseInt(hybridM[2], 10);
      }

      // Damage only: "Increases damage done by (School )?spells and effects by up to X"
      const spDmgM = l.match(/increases damage done by (?:[a-zA-Z]+\s+)?spells and effects by up to\s+(\d+)/i);
      if (spDmgM && !spDualM && !hybridM) {
        result.spellDamage += parseInt(spDmgM[1], 10);
      }

      // School specific or generic Spell Damage token
      const spOnlyM = l.match(/(?:\+|(?:equip:\s*\+))(\d+)\s+(?:(?:Shadow|Fire|Frost|Nature|Arcane|Holy)\s+)?Spell Damage\b/i);
      if (spOnlyM && !spDualM && !spPowM && !spDmgM) {
        result.spellDamage += parseInt(spOnlyM[1], 10);
      }

      // Healing only: "Increases healing done by (spells and effects by up to|up to) X"
      const healOnlyM = l.match(/increases healing done by (?:(?:magical )?spells and effects by up to|(?:up to))\s+(\d+)/i);
      if (healOnlyM && !spDualM && !hybridM) {
        result.healing += parseInt(healOnlyM[1], 10);
      }

      // Pure Healing token
      const healM = l.match(/(?:\+|(?:equip:\s*\+))(\d+)\s+Healing\b/i);
      if (healM && !spDualM && !healOnlyM && !spPowM && !hybridM) {
        result.healing += parseInt(healM[1], 10);
      }

      // Core Attributes (Str, Agi, Sta, Int, Spi)
      // Excludes debuffs, reductions, procs, and summon lines (e.g. "spirit of Shahram")
      if (!/reduces target|lowers|chance on hit|when struck|infernal spirit/i.test(l)) {
        const strM = l.match(/([+-]?\d+)\s*(?:Strength|Str)\b/i);
        if (strM) result.strength += parseInt(strM[1], 10);

        const agiM = l.match(/([+-]?\d+)\s*(?:Agility|Agi)\b/i);
        if (agiM) result.agility += parseInt(agiM[1], 10);

        const staM = l.match(/([+-]?\d+)\s*(?:Stamina|Sta)\b/i);
        if (staM) result.stamina += parseInt(staM[1], 10);

        const intM = l.match(/([+-]?\d+)\s*(?:Intellect|Int)\b/i);
        if (intM) result.intellect += parseInt(intM[1], 10);

        const spiM = l.match(/([+-]?\d+)\s*(?:Spirit|Spi)\b/i);
        if (spiM) result.spirit += parseInt(spiM[1], 10);

        // Selectable stats e.g. "+9 [Agility or Strength]"
        const choiceM = l.match(/\+(\d+)\s*\[Agility or Strength\]/i);
        if (choiceM) {
          const cv = parseInt(choiceM[1], 10);
          result.strength = Math.max(result.strength, cv);
          result.agility = Math.max(result.agility, cv);
        }
      }
    }

    // 2.3 Process Stats String (handles items without lines e.g. Golemheart Stave)
    const statsStr = typeof item.stats === 'string' ? item.stats : '';
    if (statsStr) {
      const tokens = statsStr.replace(/(\d),(\d{3})\b/g, '$1$2').split(',').map(s => s.trim());
      tokens.forEach(tok => {
        const choiceM = tok.match(/\+(\d+)\s*\[Agility or Strength\]/i);
        if (choiceM) {
          const cv = parseInt(choiceM[1], 10);
          result.strength = Math.max(result.strength, cv);
          result.agility = Math.max(result.agility, cv);
        }
        if (!result.strength) {
          const m = tok.match(/([+-]?\d+)\s*(?:Strength|Str)\b/i);
          if (m) result.strength = parseInt(m[1], 10);
        }
        if (!result.agility) {
          const m = tok.match(/([+-]?\d+)\s*(?:Agility|Agi)\b/i);
          if (m) result.agility = parseInt(m[1], 10);
        }
        if (!result.stamina) {
          const m = tok.match(/([+-]?\d+)\s*(?:Stamina|Sta)\b/i);
          if (m) result.stamina = parseInt(m[1], 10);
        }
        if (!result.intellect) {
          const m = tok.match(/([+-]?\d+)\s*(?:Intellect|Int)\b/i);
          if (m) result.intellect = parseInt(m[1], 10);
        }
        if (!result.spirit) {
          const m = tok.match(/([+-]?\d+)\s*(?:Spirit|Spi)\b/i);
          if (m) result.spirit = parseInt(m[1], 10);
        }
        if (!result.crit) {
          const m = tok.match(/\+(\d+(?:\.\d+)?)\s*Crit\b/i);
          if (m) result.crit = parseFloat(m[1]);
        }
        if (!result.hit) {
          const m = tok.match(/\+(\d+(?:\.\d+)?)\s*Hit\b/i);
          if (m) result.hit = parseFloat(m[1]);
        }
        if (!result.mp5) {
          const m = tok.match(/\+(\d+)\s*(?:MP5|mana per 5 sec)\b/i);
          if (m) result.mp5 = parseInt(m[1], 10);
        }
        if (!result.armor) {
          const m = tok.match(/([+-]?[\d,]+)\s*Armor\b/i);
          if (m) result.armor = parseInt(m[1].replace(/,/g, ''), 10);
        }
        if (!result.baseBlock) {
          const m = tok.match(/([+-]?\d+)\s*Block\b/i);
          if (m) result.baseBlock = parseInt(m[1], 10);
        }
        const equipBlkM = tok.match(/increases the block value of your shield by\s+(\d+)/i);
        if (equipBlkM) {
          result.blockValueBonus += parseInt(equipBlkM[1], 10);
        }
        if (!result.spellDamage) {
          const m = tok.match(/\+(\d+)\s*(?:Spell Power|SP|Spell Damage)\b/i);
          if (m) {
            result.spellDamage = parseInt(m[1], 10);
            if (!result.healing) result.healing = result.spellDamage;
          }
        }
        const equipHealM = tok.match(/increases healing done by (?:(?:magical )?spells and effects by up to|(?:up to))\s+(\d+)/i);
        if (equipHealM) {
          result.healing += parseInt(equipHealM[1], 10);
        } else if (!result.healing) {
          const m = tok.match(/\+(\d+)\s*Healing\b/i);
          if (m) result.healing = parseInt(m[1], 10);
        }
        const rapM = tok.match(/\+(\d+)\s*RAP\b/i);
        if (rapM) linesRangedAp += parseInt(rapM[1], 10);
        const apM = tok.match(/(?:\+|(?:increases attack power by\s+))(\d+)\s*(?:Attack Power|AP)\b/i);
        if (apM && !rapM) linesApBase += parseInt(apM[1], 10);
      });
    }

    // 2.4 Fallback to Alt `value` String (for abbreviated alts missing dps/speed)
    const valStr = typeof item.value === 'string' ? item.value : '';
    if (valStr) {
      if (!result.dps) {
        const m = valStr.match(/([\d.]+)\s*DPS/i);
        if (m) result.dps = parseFloat(m[1]);
      }
      if (!result.speed) {
        const m = valStr.match(/([\d.]+)s\b/i);
        if (m) result.speed = parseFloat(m[1]);
      }
    }

    // 2.5 Aggregate Composite Attack Power and Block Values
    result.generalAttackPower = linesApBase + linesApCreature;
    result.feralAttackPower = linesFeralAp;
    result.rangedAttackPower = linesRangedAp;

    // Total combined AP includes generic AP, creature-specific AP, and shapeshift/ranged bonuses
    const maxBonusAp = Math.max(result.feralAttackPower, result.rangedAttackPower);
    result.effectiveAttackPower = result.generalAttackPower + maxBonusAp;
    result.attackPower = result.effectiveAttackPower;

    // Total shield block combines base shield block + equip block bonus
    result.totalBlockValue = result.baseBlock + result.blockValueBonus;
    result.block = result.totalBlockValue;

    // 2.6 Resolve reqLevel: check levelBracket and iLvl heuristic fallback
    if (!result.reqLevel || result.reqLevel <= 0) {
      if (item.levelBracket) {
        const br = parseBracketRange(item.levelBracket);
        if (br) result.reqLevel = br.min;
      }
    }
    if (result.iLvl >= 20 && (!result.reqLevel || result.reqLevel <= 1)) {
      result.reqLevel = Math.max(1, result.iLvl - 5);
    }
    if (!result.reqLevel || result.reqLevel <= 0) {
      result.reqLevel = 1;
    }

    return result;
  }

  /**
   * 3. Filter State Management
   */
  function getState() {
    return { ...filterState };
  }

  function getFilterState() {
    return getState();
  }

  function setState(newState) {
    if (newState && typeof newState === 'object') {
      filterState = { ...filterState, ...newState };
    }
  }

  function setFilter(field, value) {
    if (Object.prototype.hasOwnProperty.call(DEFAULT_FILTER_STATE, field)) {
      filterState[field] = value;
    }
  }

  function resetFilters() {
    const keepOpen = filterState.isDrawerOpen;
    filterState = { ...DEFAULT_FILTER_STATE, isDrawerOpen: keepOpen };
  }

  /**
   * Calculates number of active filter criteria restricting the roadmap
   */
  function getActiveFilterCount() {
    let count = 0;
    const s = filterState;

    if (typeof s.minLevel === 'number' && s.minLevel > 1) count++;
    if (typeof s.maxLevel === 'number' && s.maxLevel < 60) count++;
    if (typeof s.minDps === 'number' && s.minDps > 0) count++;
    if (typeof s.speedVal === 'number' && s.speedVal > 0) count++;

    if (typeof s.minStr === 'number' && s.minStr > 0) count++;
    if (typeof s.minAgi === 'number' && s.minAgi > 0) count++;
    if (typeof s.minSta === 'number' && s.minSta > 0) count++;
    if (typeof s.minInt === 'number' && s.minInt > 0) count++;
    if (typeof s.minSpi === 'number' && s.minSpi > 0) count++;

    if (typeof s.minAp === 'number' && s.minAp > 0) count++;
    if (typeof s.minCrit === 'number' && s.minCrit > 0) count++;
    if (typeof s.minHit === 'number' && s.minHit > 0) count++;
    if (typeof s.minSpellDmg === 'number' && s.minSpellDmg > 0) count++;
    if (typeof s.minHealing === 'number' && s.minHealing > 0) count++;
    if (typeof s.minMp5 === 'number' && s.minMp5 > 0) count++;

    if (typeof s.minArmor === 'number' && s.minArmor > 0) count++;
    if (typeof s.minBlock === 'number' && s.minBlock > 0) count++;

    return count;
  }

  /**
   * Parses a bracket string (e.g. "1–2", "21-24", "55–60") into min and max numbers.
   */
  function parseBracketRange(bracketStr) {
    if (!bracketStr || typeof bracketStr !== 'string') return null;
    const match = bracketStr.match(/(\d+)\s*[-–—]\s*(\d+)/);
    if (match) {
      return {
        min: parseInt(match[1], 10),
        max: parseInt(match[2], 10)
      };
    }
    const single = bracketStr.match(/(\d+)/);
    if (single) {
      const val = parseInt(single[1], 10);
      return { min: val, max: val };
    }
    return null;
  }

  /**
   * Checks whether a level bracket overlaps with active minLevel / maxLevel criteria.
   */
  function bracketMatchesFilter(bracketStr, customState) {
    const s = customState || filterState;
    const range = parseBracketRange(bracketStr);
    if (!range) return true;

    if (typeof s.minLevel === 'number' && s.minLevel > 1) {
      if (range.max < s.minLevel) return false;
    }
    if (typeof s.maxLevel === 'number' && s.maxLevel < 60) {
      if (range.min > s.maxLevel) return false;
    }
    return true;
  }

  /**
   * 4. Multi-Criteria Logical AND Matching Engine
   * Evaluates all active filter criteria simultaneously.
   */
  function itemMatchesFilter(item, customState) {
    if (!item) return false;
    const s = customState || filterState;

    // If no active criteria, automatically match
    let hasActive = false;
    if (typeof s.minLevel === 'number' && s.minLevel > 1) hasActive = true;
    else if (typeof s.maxLevel === 'number' && s.maxLevel < 60) hasActive = true;
    else if (typeof s.minDps === 'number' && s.minDps > 0) hasActive = true;
    else if (typeof s.speedVal === 'number' && s.speedVal > 0) hasActive = true;
    else if (typeof s.minStr === 'number' && s.minStr > 0) hasActive = true;
    else if (typeof s.minAgi === 'number' && s.minAgi > 0) hasActive = true;
    else if (typeof s.minSta === 'number' && s.minSta > 0) hasActive = true;
    else if (typeof s.minInt === 'number' && s.minInt > 0) hasActive = true;
    else if (typeof s.minSpi === 'number' && s.minSpi > 0) hasActive = true;
    else if (typeof s.minAp === 'number' && s.minAp > 0) hasActive = true;
    else if (typeof s.minCrit === 'number' && s.minCrit > 0) hasActive = true;
    else if (typeof s.minHit === 'number' && s.minHit > 0) hasActive = true;
    else if (typeof s.minSpellDmg === 'number' && s.minSpellDmg > 0) hasActive = true;
    else if (typeof s.minHealing === 'number' && s.minHealing > 0) hasActive = true;
    else if (typeof s.minMp5 === 'number' && s.minMp5 > 0) hasActive = true;
    else if (typeof s.minArmor === 'number' && s.minArmor > 0) hasActive = true;
    else if (typeof s.minBlock === 'number' && s.minBlock > 0) hasActive = true;

    if (!hasActive) return true;

    // Macro bracket check if item has a levelBracket
    if (item.levelBracket && !bracketMatchesFilter(item.levelBracket, s)) {
      return false;
    }

    const stats = parseItemStats(item);
    if (!stats) return false;

    // Level Range
    if (typeof s.minLevel === 'number' && s.minLevel > 1) {
      if ((stats.reqLevel || 1) < s.minLevel) return false;
    }
    if (typeof s.maxLevel === 'number' && s.maxLevel < 60) {
      if ((stats.reqLevel || 1) > s.maxLevel) return false;
    }

    // Weapon DPS
    if (typeof s.minDps === 'number' && s.minDps > 0) {
      if ((stats.dps || 0) < s.minDps) return false;
    }

    // Weapon Swing Speed (with direction operator)
    if (typeof s.speedVal === 'number' && s.speedVal > 0) {
      if (!stats.speed || stats.speed <= 0) return false;
      if (s.speedOp === '<=') {
        if (stats.speed > s.speedVal) return false;
      } else {
        if (stats.speed < s.speedVal) return false;
      }
    }

    // Core Attributes
    if (typeof s.minStr === 'number' && s.minStr > 0) {
      if ((stats.strength || 0) < s.minStr) return false;
    }
    if (typeof s.minAgi === 'number' && s.minAgi > 0) {
      if ((stats.agility || 0) < s.minAgi) return false;
    }
    if (typeof s.minSta === 'number' && s.minSta > 0) {
      if ((stats.stamina || 0) < s.minSta) return false;
    }
    if (typeof s.minInt === 'number' && s.minInt > 0) {
      if ((stats.intellect || 0) < s.minInt) return false;
    }
    if (typeof s.minSpi === 'number' && s.minSpi > 0) {
      if ((stats.spirit || 0) < s.minSpi) return false;
    }

    // Combat & Caster Stats
    if (typeof s.minAp === 'number' && s.minAp > 0) {
      const ap = stats.attackPower || stats.effectiveAttackPower || 0;
      if (ap < s.minAp) return false;
    }
    if (typeof s.minCrit === 'number' && s.minCrit > 0) {
      if ((stats.crit || 0) < s.minCrit) return false;
    }
    if (typeof s.minHit === 'number' && s.minHit > 0) {
      if ((stats.hit || 0) < s.minHit) return false;
    }
    if (typeof s.minSpellDmg === 'number' && s.minSpellDmg > 0) {
      if ((stats.spellDamage || 0) < s.minSpellDmg) return false;
    }
    if (typeof s.minHealing === 'number' && s.minHealing > 0) {
      if ((stats.healing || 0) < s.minHealing) return false;
    }
    if (typeof s.minMp5 === 'number' && s.minMp5 > 0) {
      if ((stats.mp5 || 0) < s.minMp5) return false;
    }

    // Defensive & Shield Stats
    if (typeof s.minArmor === 'number' && s.minArmor > 0) {
      if ((stats.armor || 0) < s.minArmor) return false;
    }
    if (typeof s.minBlock === 'number' && s.minBlock > 0) {
      const block = stats.totalBlockValue || stats.block || 0;
      if (block < s.minBlock) return false;
    }

    return true;
  }

  function itemMatchesFilters(item, customState) {
    return itemMatchesFilter(item, customState);
  }

  /**
   * 5. Step Resolution & Alt Promotion Helper
   * Evaluates primary item and alts against all active filters, promoting matching alts if primary fails.
   */
  function filterLevelStep(step, effectiveFaction, effectiveSource, effectiveSlot, itemMatchesAllFn) {
    if (!step) return { isVisible: false };
    if (step.levelBracket && !bracketMatchesFilter(step.levelBracket)) {
      return { isVisible: false };
    }

    const checkMatches = (item) => {
      const basicMatch = typeof itemMatchesAllFn === 'function'
        ? itemMatchesAllFn(item, effectiveFaction, effectiveSource, effectiveSlot)
        : true;
      if (!basicMatch) return false;
      return itemMatchesFilter(item);
    };

    let displayStep = { ...step };
    let displayAlts = Array.isArray(step.alts) ? step.alts.slice() : [];

    const primaryMatches = checkMatches(displayStep);

    let matchIdx = -1;
    if (!primaryMatches) {
      matchIdx = displayAlts.findIndex(alt => checkMatches(alt));
    }

    let isPromoted = false;

    if (matchIdx !== -1) {
      const altMatch = displayAlts[matchIdx];
      const valStr = altMatch.value || '';
      const dpsMatch = altMatch.dps || valStr.match(/([\d.]+\s*DPS)/i)?.[1] || '';
      const spdMatch = altMatch.speed || valStr.match(/([\d.]+s)/i)?.[1]?.replace('s', '') || '';

      const demotedStep = {
        name: step.name,
        itemId: step.itemId,
        icon: step.icon,
        weaponType: step.weaponType,
        speed: step.speed,
        dps: step.dps,
        stats: step.stats,
        armor: step.armor,
        block: step.block,
        lines: step.lines,
        source: step.source,
        faction: step.faction || 'both',
        quality: step.quality,
        iLvl: step.iLvl,
        reqLevel: step.reqLevel,
        value: `${step.dps || ''}, ${step.speed ? step.speed + 's' : ''} - ${step.source?.title || ''}`
      };

      const altSourceObj = (typeof altMatch.source === 'object' && altMatch.source !== null)
        ? altMatch.source
        : {
            kind: 'drop',
            title: typeof altMatch.source === 'string' ? altMatch.source : (altMatch.name || 'Leveling Item'),
            detail: typeof altMatch.value === 'string' ? altMatch.value : 'Leveling Drop / Reward'
          };

      displayStep = {
        ...step,
        itemId: altMatch.itemId || null,
        name: altMatch.name,
        icon: altMatch.icon || step.icon,
        weaponType: altMatch.weaponType || step.weaponType,
        speed: spdMatch || altMatch.speed || step.speed,
        dps: dpsMatch || (altMatch.dps ? `${altMatch.dps} DPS` : step.dps),
        stats: altMatch.stats || step.stats,
        armor: altMatch.armor || step.armor,
        block: altMatch.block || step.block,
        lines: altMatch.lines || null,
        source: altSourceObj,
        faction: altMatch.faction || effectiveFaction,
        quality: altMatch.quality || step.quality,
        iLvl: altMatch.iLvl || step.iLvl,
        reqLevel: altMatch.reqLevel || step.reqLevel
      };

      displayAlts = displayAlts.filter((_, i) => i !== matchIdx);
      if (primaryMatches) {
        displayAlts.push(demotedStep);
      }
      isPromoted = true;
    } else if (!primaryMatches) {
      return { isVisible: false };
    }

    displayAlts = displayAlts.filter(alt => checkMatches(alt));

    return {
      isVisible: true,
      displayStep,
      displayAlts,
      isPromoted
    };
  }

  /**
   * 6. Filter Drawer UI Renderer
   */
  function renderDrawerHtml() {
    const s = filterState;
    const activeCount = getActiveFilterCount();
    const isOpen = Boolean(s.isDrawerOpen);

    const valStr = (v) => (v !== null && v !== undefined ? String(v) : '');

    return `
      <div class="progression-filter-drawer-wrapper">
        <div class="progression-filter-drawer-header">
          <button type="button" class="btn-advanced-filters-toggle ${isOpen ? 'is-active' : ''}" id="btn-toggle-advanced-filters" aria-expanded="${isOpen}" aria-controls="progression-advanced-filter-drawer">
            <span class="toggle-icon">⚙️</span>
            <span>Advanced Stat Filters</span>
            <span class="active-filter-badge ${activeCount > 0 ? 'active' : ''}" id="advanced-filter-count-badge">${activeCount > 0 ? activeCount + ' Active' : '0 Active'}</span>
          </button>
          <button type="button" class="btn-reset-filters ${activeCount === 0 ? 'is-disabled' : ''}" id="btn-reset-advanced-filters" aria-label="Reset all progression filters">
            <span>↺</span> Reset All Filters
          </button>
        </div>

        <div id="progression-advanced-filter-drawer" class="progression-advanced-filter-drawer" ${isOpen ? '' : 'hidden'}>
          <div class="filter-drawer-grid">
            <!-- Section 1: Level & Scaling -->
            <div class="filter-category-section">
              <h4 class="filter-category-title"><span class="cat-icon">📊</span> Level &amp; Scaling</h4>
              <div class="filter-fields-row">
                <div class="filter-field-group">
                  <label for="prog-filter-min-level" class="filter-label">Min Level</label>
                  <input type="number" id="prog-filter-min-level" name="minLevel" min="1" max="60" placeholder="1" value="${safeEscape(valStr(s.minLevel))}" aria-label="Minimum required player level" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-max-level" class="filter-label">Max Level</label>
                  <input type="number" id="prog-filter-max-level" name="maxLevel" min="1" max="60" placeholder="60" value="${safeEscape(valStr(s.maxLevel))}" aria-label="Maximum required player level" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-min-dps" class="filter-label">Min Weapon DPS</label>
                  <input type="number" id="prog-filter-min-dps" name="minDps" min="0" step="0.1" placeholder="0.0" value="${safeEscape(valStr(s.minDps))}" aria-label="Minimum weapon damage per second" class="prog-filter-input" />
                </div>
              </div>
            </div>

            <!-- Section 2: Weapon Swing Speed -->
            <div class="filter-category-section">
              <div class="filter-category-header-with-btn">
                <h4 class="filter-category-title"><span class="cat-icon">⏱️</span> Weapon Swing Speed</h4>
                <button type="button" class="speed-benchmark-btn" id="btn-speed-benchmarks" aria-label="Weapon speed benchmarks guide" aria-expanded="false" aria-controls="speed-benchmark-popover">ℹ️ Benchmarks</button>
              </div>

              <!-- Speed Benchmark Popover -->
              <div class="speed-benchmark-popover" id="speed-benchmark-popover" role="tooltip" hidden>
                <div class="popover-header">
                  <span class="popover-icon">⚔️</span>
                  <strong>Weapon Speed Benchmarks</strong>
                </div>
                <div class="benchmark-entry fast">
                  <span class="benchmark-badge">⚡ Fast (1.20–1.80s)</span>
                  <p>Daggers &amp; fast 1H weapons. Optimal for Rogues, off-hand poison application, fast weapon procs, and wand weaving.</p>
                </div>
                <div class="benchmark-entry standard">
                  <span class="benchmark-badge">⚖️ Standard (1.90–2.80s)</span>
                  <p>Balanced 1H swords/maces/axes. Standard general leveling pace, tank threat, and reliable sustained DPS.</p>
                </div>
                <div class="benchmark-entry slow">
                  <span class="benchmark-badge">💥 Slow (2.90–4.00s)</span>
                  <p>Heavy 2H weapons. Maximum top-end weapon damage for Warrior Mortal Strike, Overpower, Shaman Windfury, and instant attack scaling.</p>
                </div>
              </div>

              <div class="filter-fields-row">
                <div class="filter-field-group speed-group">
                  <label for="prog-filter-speed-op" class="filter-label">Speed Operator</label>
                  <select id="prog-filter-speed-op" name="speedOp" aria-label="Weapon swing speed comparison operator" class="prog-filter-select">
                    <option value=">=" ${s.speedOp === '>=' ? 'selected' : ''}>≥ (Slower / At least)</option>
                    <option value="<=" ${s.speedOp === '<=' ? 'selected' : ''}>≤ (Faster / At most)</option>
                  </select>
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-speed-val" class="filter-label">Speed (Seconds)</label>
                  <input type="number" id="prog-filter-speed-val" name="speedVal" min="1.00" max="4.50" step="0.10" placeholder="e.g. 3.50" value="${safeEscape(valStr(s.speedVal))}" aria-label="Weapon swing speed in seconds" class="prog-filter-input speed-input" />
                </div>
              </div>
            </div>

            <!-- Section 3: Core Attributes -->
            <div class="filter-category-section">
              <h4 class="filter-category-title"><span class="cat-icon">💪</span> Core Attributes</h4>
              <div class="filter-fields-row">
                <div class="filter-field-group">
                  <label for="prog-filter-min-str" class="filter-label">Min Strength</label>
                  <input type="number" id="prog-filter-min-str" name="minStr" min="0" placeholder="0" value="${safeEscape(valStr(s.minStr))}" aria-label="Minimum Strength bonus" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-min-agi" class="filter-label">Min Agility</label>
                  <input type="number" id="prog-filter-min-agi" name="minAgi" min="0" placeholder="0" value="${safeEscape(valStr(s.minAgi))}" aria-label="Minimum Agility bonus" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-min-sta" class="filter-label">Min Stamina</label>
                  <input type="number" id="prog-filter-min-sta" name="minSta" min="0" placeholder="0" value="${safeEscape(valStr(s.minSta))}" aria-label="Minimum Stamina bonus" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-min-int" class="filter-label">Min Intellect</label>
                  <input type="number" id="prog-filter-min-int" name="minInt" min="0" placeholder="0" value="${safeEscape(valStr(s.minInt))}" aria-label="Minimum Intellect bonus" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-min-spi" class="filter-label">Min Spirit</label>
                  <input type="number" id="prog-filter-min-spi" name="minSpi" min="0" placeholder="0" value="${safeEscape(valStr(s.minSpi))}" aria-label="Minimum Spirit bonus" class="prog-filter-input" />
                </div>
              </div>
            </div>

            <!-- Section 4: Combat & Caster Stats -->
            <div class="filter-category-section">
              <h4 class="filter-category-title"><span class="cat-icon">⚔️</span> Combat &amp; Caster Stats</h4>
              <div class="filter-fields-row">
                <div class="filter-field-group">
                  <label for="prog-filter-min-ap" class="filter-label">Min Attack Power</label>
                  <input type="number" id="prog-filter-min-ap" name="minAp" min="0" placeholder="0" value="${safeEscape(valStr(s.minAp))}" aria-label="Minimum Attack Power bonus" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-min-crit" class="filter-label">Min Crit %</label>
                  <input type="number" id="prog-filter-min-crit" name="minCrit" min="0" step="0.5" placeholder="0" value="${safeEscape(valStr(s.minCrit))}" aria-label="Minimum Critical Strike percentage" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-min-hit" class="filter-label">Min Hit %</label>
                  <input type="number" id="prog-filter-min-hit" name="minHit" min="0" step="0.5" placeholder="0" value="${safeEscape(valStr(s.minHit))}" aria-label="Minimum Hit percentage" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-min-spell-dmg" class="filter-label">Min Spell Power / Dmg</label>
                  <input type="number" id="prog-filter-min-spell-dmg" name="minSpellDmg" min="0" placeholder="0" value="${safeEscape(valStr(s.minSpellDmg))}" aria-label="Minimum Spell Damage or Power bonus" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-min-healing" class="filter-label">Min Healing</label>
                  <input type="number" id="prog-filter-min-healing" name="minHealing" min="0" placeholder="0" value="${safeEscape(valStr(s.minHealing))}" aria-label="Minimum Healing bonus" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-min-mp5" class="filter-label">Min MP5</label>
                  <input type="number" id="prog-filter-min-mp5" name="minMp5" min="0" placeholder="0" value="${safeEscape(valStr(s.minMp5))}" aria-label="Minimum Mana per 5 seconds bonus" class="prog-filter-input" />
                </div>
              </div>
            </div>

            <!-- Section 5: Defensive & Shield Stats -->
            <div class="filter-category-section">
              <h4 class="filter-category-title"><span class="cat-icon">🛡️</span> Defensive &amp; Shield Stats</h4>
              <div class="filter-fields-row">
                <div class="filter-field-group">
                  <label for="prog-filter-min-armor" class="filter-label">Min Armor</label>
                  <input type="number" id="prog-filter-min-armor" name="minArmor" min="0" placeholder="0" value="${safeEscape(valStr(s.minArmor))}" aria-label="Minimum Armor value" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-min-block" class="filter-label">Min Block Value</label>
                  <input type="number" id="prog-filter-min-block" name="minBlock" min="0" placeholder="0" value="${safeEscape(valStr(s.minBlock))}" aria-label="Minimum Shield Block Value" class="prog-filter-input" />
                </div>
              </div>
            </div>
          </div>

          <!-- Drawer Footer -->
          <div class="filter-drawer-footer">
            <div class="filter-status-info">
              <span class="filter-status-text" id="prog-filter-status-text">${activeCount} active filter${activeCount === 1 ? '' : 's'}</span>
            </div>
            <div class="filter-action-buttons">
              <button type="button" class="btn-reset-filters ${activeCount === 0 ? 'is-disabled' : ''}" id="btn-reset-advanced-filters-footer" aria-label="Reset all progression filters">
                <span>↺</span> Reset All Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderFilterDrawerHtml() {
    return renderDrawerHtml();
  }

  /**
   * 7. 0-Match Empty State Renderer
   */
  function renderEmptyStateHtml() {
    return `
      <div class="progression-empty-state filter-empty-state" role="status" aria-live="polite">
        <div class="empty-state-icon">🔍</div>
        <h4>No Progression Items Match Your Active Filters</h4>
        <p>No weapons, wands, shields, or off-hands in this progression roadmap satisfy all active filter criteria.</p>
        <div class="empty-state-actions">
          <button type="button" class="btn-reset-filters empty-reset-btn" id="btn-empty-reset-filters" aria-label="Reset all progression filters">
            <span>↺</span> Reset All Filters
          </button>
        </div>
      </div>
    `;
  }

  /**
   * 8. Event Listener Binder
   * Wires inputs, selects, toggles, reset buttons, and speed benchmark popover.
   * Focus preservation: calls onUpdateCallback(true) for input changes so parent can re-render only the timeline cards.
   */
  function setupEventListeners(container, onUpdateCallback) {
    const root = container || (typeof document !== 'undefined' ? document : null);
    if (!root) return;

    // Helper: update active badge and status labels
    const syncBadgeAndStatus = () => {
      const activeCount = getActiveFilterCount();
      const badge = root.querySelector('#advanced-filter-count-badge');
      if (badge) {
        badge.textContent = activeCount > 0 ? `${activeCount} Active` : '0 Active';
        if (activeCount > 0) badge.classList.add('active');
        else badge.classList.remove('active');
      }

      const statusText = root.querySelector('#prog-filter-status-text');
      if (statusText) {
        statusText.textContent = `${activeCount} active filter${activeCount === 1 ? '' : 's'}`;
      }

      const resetBtns = root.querySelectorAll('#btn-reset-advanced-filters, #btn-reset-advanced-filters-footer');
      resetBtns.forEach(btn => {
        if (activeCount === 0) btn.classList.add('is-disabled');
        else btn.classList.remove('is-disabled');
      });
    };

    // 8.1 Toggle Drawer expansion/collapse
    const toggleBtn = root.querySelector('#btn-toggle-advanced-filters');
    const drawerEl = root.querySelector('#progression-advanced-filter-drawer');

    if (toggleBtn && drawerEl) {
      toggleBtn.onclick = (e) => {
        e.preventDefault();
        const currentlyOpen = filterState.isDrawerOpen;
        const nextOpen = !currentlyOpen;
        filterState.isDrawerOpen = nextOpen;

        toggleBtn.setAttribute('aria-expanded', String(nextOpen));
        if (nextOpen) {
          toggleBtn.classList.add('is-active');
          drawerEl.removeAttribute('hidden');
        } else {
          toggleBtn.classList.remove('is-active');
          drawerEl.setAttribute('hidden', '');
        }
      };
    }

    // 8.2 Speed Benchmark Popover
    const benchBtn = root.querySelector('#btn-speed-benchmarks');
    const benchPopover = root.querySelector('#speed-benchmark-popover');

    if (benchBtn && benchPopover) {
      const showPopover = () => {
        benchPopover.removeAttribute('hidden');
        benchBtn.setAttribute('aria-expanded', 'true');
      };
      const hidePopover = () => {
        benchPopover.setAttribute('hidden', '');
        benchBtn.setAttribute('aria-expanded', 'false');
      };

      benchBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (benchPopover.hasAttribute('hidden')) showPopover();
        else hidePopover();
      };

      benchBtn.onmouseenter = () => showPopover();
      benchBtn.onmouseleave = (e) => {
        // Debounce hide if not moving into popover
        if (!benchPopover.contains(e.relatedTarget)) {
          hidePopover();
        }
      };

      benchPopover.onmouseleave = () => hidePopover();

      // Dismiss on Escape key
      const keyHandler = (e) => {
        if (e.key === 'Escape' && !benchPopover.hasAttribute('hidden')) {
          hidePopover();
        }
      };
      root.addEventListener('keydown', keyHandler);
    }

    // 8.3 Reset All Filters buttons
    const triggerReset = (e) => {
      if (e) e.preventDefault();
      resetFilters();

      // Clear all drawer input values
      const inputs = root.querySelectorAll('.prog-filter-input');
      inputs.forEach(input => { input.value = ''; });

      const opSelect = root.querySelector('#prog-filter-speed-op');
      if (opSelect) opSelect.value = '>=';

      syncBadgeAndStatus();

      if (typeof onUpdateCallback === 'function') {
        onUpdateCallback(false);
      }
    };

    const resetBtn1 = root.querySelector('#btn-reset-advanced-filters');
    if (resetBtn1) resetBtn1.onclick = triggerReset;

    const resetBtn2 = root.querySelector('#btn-reset-advanced-filters-footer');
    if (resetBtn2) resetBtn2.onclick = triggerReset;

    const emptyResetBtn = root.querySelector('#btn-empty-reset-filters');
    if (emptyResetBtn) emptyResetBtn.onclick = triggerReset;

    // 8.4 Form Inputs & Selects Handling
    const filterInputs = root.querySelectorAll('.prog-filter-input, .prog-filter-select');
    filterInputs.forEach(input => {
      const handleInput = () => {
        const name = input.name || (input.getAttribute && input.getAttribute('name'));
        if (!name || !Object.prototype.hasOwnProperty.call(filterState, name)) return;

        if (name === 'speedOp') {
          filterState.speedOp = input.value === '<=' ? '<=' : '>=';
        } else {
          const raw = String(input.value || '').trim();
          if (raw === '') {
            filterState[name] = null;
          } else {
            const num = (name === 'minDps' || name === 'speedVal' || name === 'minCrit' || name === 'minHit')
              ? parseFloat(raw)
              : parseInt(raw, 10);
            filterState[name] = isNaN(num) ? null : num;
          }
        }

        syncBadgeAndStatus();

        if (typeof onUpdateCallback === 'function') {
          onUpdateCallback(true);
        }
      };

      input.oninput = handleInput;
      input.onchange = handleInput;
    });
  }

  // 9. Attach to window
  const moduleApi = {
    DEFAULT_FILTER_STATE,
    getState,
    getFilterState,
    setState,
    setFilter,
    resetFilters,
    getActiveFilterCount,
    parseBracketRange,
    bracketMatchesFilter,
    parseItemStats,
    itemMatchesFilter,
    itemMatchesFilters,
    filterLevelStep,
    renderDrawerHtml,
    renderFilterDrawerHtml,
    renderEmptyStateHtml,
    setupEventListeners
  };

  if (typeof window !== 'undefined') {
    window.WOW_PROGRESSION_FILTER = moduleApi;
  }
  if (typeof globalThis !== 'undefined') {
    globalThis.WOW_PROGRESSION_FILTER = moduleApi;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = moduleApi;
  }
})();
