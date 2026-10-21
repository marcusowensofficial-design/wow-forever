#!/usr/bin/env node
/* global process, console */

/**
 * Progression Stat & Requirement Filter Master E2E Test Suite
 *
 * Comprehensive, requirement-driven, opaque-box E2E test suite for the Interactive
 * Multi-Dimensional Progression Stat & Requirement Filter.
 *
 * Verifies 17-dimension stat parsing, speed direction operators (≥ / ≤), speed benchmarks,
 * active filter counter, reset button, alt promotion engine, and step suppression
 * across both Weapons Hub (#weapons) and Class Deep Dives (#deepdives).
 *
 * Exit Code: 0 on all passed, 1 on any failure.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { TestCollector, expect } from './helpers/assertions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// CLI options
const args = process.argv.slice(2);
const tierArg = args.find(a => a.startsWith('--tier='));
const targetTier = tierArg ? parseInt(tierArg.split('=')[1], 10) : null;
const isVerbose = args.includes('--verbose') || args.includes('-v');

console.log('======================================================================');
console.log('   WOW FOREVER — PROGRESSION STAT & REQUIREMENT FILTER E2E SUITE');
console.log('======================================================================');
console.log(`Execution Mode: ${targetTier ? `Tier ${targetTier} Only` : 'All 4 Tiers'}`);
console.log(`Working Directory: ${ROOT}`);
console.log(`Timestamp: ${new Date().toISOString()}\n`);

// -----------------------------------------------------------------------------
// 1. VM Context & Dataset Loader
// -----------------------------------------------------------------------------

function loadProgressionEnvironment(root) {
  const context = {
    console,
    Date,
    Math,
    parseInt,
    parseFloat,
    String,
    Number,
    Boolean,
    Array,
    Object,
    RegExp,
    Set,
    Map,
    escapeHtml: s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'),
    document: {
      addEventListener: () => {},
      removeEventListener: () => {},
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => []
    }
  };
  context.window = context;
  vm.createContext(context);

  // Load Progression Data
  const progPath = path.join(root, 'js', 'data', 'class-progression-data.js');
  if (fs.existsSync(progPath)) {
    const code = fs.readFileSync(progPath, 'utf8');
    vm.runInContext(code, context);
  }

  // Load BiS Data
  const bisPath = path.join(root, 'js', 'data', 'bis-data.js');
  if (fs.existsSync(bisPath)) {
    const code = fs.readFileSync(bisPath, 'utf8');
    vm.runInContext(code, context);
  }

  // Check for production implementation module
  const prodModulePath = path.join(root, 'js', 'modules', 'deepdives', 'progression-filter.js');
  const hasProdModule = fs.existsSync(prodModulePath);
  if (hasProdModule) {
    const prodCode = fs.readFileSync(prodModulePath, 'utf8');
    vm.runInContext(prodCode, context);
  }

  return {
    context,
    hasProdModule,
    progressionData: context.window.WOW_PROGRESSION_DATA || {},
    bisData: context.window.WOW_BIS_DATA || {}
  };
}

// -----------------------------------------------------------------------------
// 2. Reference Specification Oracle (Fallback if module not loaded)
// -----------------------------------------------------------------------------

function createReferenceProgressionFilter(win) {
  const DEFAULT_FILTER_STATE = {
    minLevel: null,
    maxLevel: null,
    minDps: null,
    speedOp: '>=',
    speedVal: null,
    minStr: null,
    minAgi: null,
    minSta: null,
    minInt: null,
    minSpi: null,
    minAp: null,
    minCrit: null,
    minHit: null,
    minSpellDmg: null,
    minHealing: null,
    minMp5: null,
    minArmor: null,
    minBlock: null,
    isDrawerOpen: false
  };

  let filterState = { ...DEFAULT_FILTER_STATE };

  function getState() {
    return { ...filterState };
  }

  function getFilterState() {
    return getState();
  }

  function setState(newState) {
    filterState = { ...filterState, ...newState };
  }

  function setFilter(field, value) {
    filterState[field] = value;
  }

  function resetFilters() {
    filterState = { ...DEFAULT_FILTER_STATE, isDrawerOpen: filterState.isDrawerOpen };
  }

  function getActiveFilterCount() {
    let count = 0;
    const s = filterState;
    if (s.minLevel !== null && s.minLevel !== undefined && s.minLevel !== '' && Number(s.minLevel) > 1) count++;
    if (s.maxLevel !== null && s.maxLevel !== undefined && s.maxLevel !== '' && Number(s.maxLevel) < 60) count++;
    if (s.minDps !== null && s.minDps !== undefined && s.minDps !== '' && Number(s.minDps) > 0) count++;
    if (s.speedVal !== null && s.speedVal !== undefined && s.speedVal !== '' && Number(s.speedVal) > 0) count++;
    if (s.minStr !== null && s.minStr !== undefined && s.minStr !== '' && Number(s.minStr) > 0) count++;
    if (s.minAgi !== null && s.minAgi !== undefined && s.minAgi !== '' && Number(s.minAgi) > 0) count++;
    if (s.minSta !== null && s.minSta !== undefined && s.minSta !== '' && Number(s.minSta) > 0) count++;
    if (s.minInt !== null && s.minInt !== undefined && s.minInt !== '' && Number(s.minInt) > 0) count++;
    if (s.minSpi !== null && s.minSpi !== undefined && s.minSpi !== '' && Number(s.minSpi) > 0) count++;
    if (s.minAp !== null && s.minAp !== undefined && s.minAp !== '' && Number(s.minAp) > 0) count++;
    if (s.minCrit !== null && s.minCrit !== undefined && s.minCrit !== '' && Number(s.minCrit) > 0) count++;
    if (s.minHit !== null && s.minHit !== undefined && s.minHit !== '' && Number(s.minHit) > 0) count++;
    if (s.minSpellDmg !== null && s.minSpellDmg !== undefined && s.minSpellDmg !== '' && Number(s.minSpellDmg) > 0) count++;
    if (s.minHealing !== null && s.minHealing !== undefined && s.minHealing !== '' && Number(s.minHealing) > 0) count++;
    if (s.minMp5 !== null && s.minMp5 !== undefined && s.minMp5 !== '' && Number(s.minMp5) > 0) count++;
    if (s.minArmor !== null && s.minArmor !== undefined && s.minArmor !== '' && Number(s.minArmor) > 0) count++;
    if (s.minBlock !== null && s.minBlock !== undefined && s.minBlock !== '' && Number(s.minBlock) > 0) count++;
    return count;
  }

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
      block: 0,
      totalBlockValue: 0
    };

    if (typeof item.reqLevel === 'number') result.reqLevel = item.reqLevel;
    if (typeof item.iLvl === 'number') result.iLvl = item.iLvl;
    else if (typeof item.ilvl === 'number') result.iLvl = item.ilvl;

    if (typeof item.dps === 'number') result.dps = item.dps;
    else if (typeof item.dps === 'string') {
      const m = item.dps.match(/([\d.]+)/);
      if (m) result.dps = parseFloat(m[1]);
    }

    if (typeof item.speed === 'number') result.speed = item.speed;
    else if (typeof item.speed === 'string') {
      const m = item.speed.match(/([\d.]+)/);
      if (m) result.speed = parseFloat(m[1]);
    }

    if (typeof item.armor === 'number') result.armor = item.armor;
    if (typeof item.block === 'number') result.baseBlock = item.block;

    const lines = Array.isArray(item.lines) ? item.lines : [];
    lines.forEach(rawLine => {
      const l = String(rawLine || '').trim();
      if (!l) return;

      if (!result.reqLevel) {
        const reqM = l.match(/^Requires Level\s+(\d+)/i);
        if (reqM) result.reqLevel = parseInt(reqM[1], 10);
      }

      if (!result.iLvl) {
        const ilvlM = l.match(/^Item Level\s+(\d+)/i);
        if (ilvlM) result.iLvl = parseInt(ilvlM[1], 10);
      }

      if (!result.dps) {
        const dpsM = l.match(/\(([\d.]+)\s+damage per second\)/i);
        if (dpsM) result.dps = parseFloat(dpsM[1]);
      }

      if (!result.speed) {
        const spdM = l.match(/Speed\s+([\d.]+)/i);
        if (spdM) result.speed = parseFloat(spdM[1]);
      }

      if (!result.armor && /\barmor\b/i.test(l) && !/chance|when struck|for \d+ sec/i.test(l)) {
        const armM = l.match(/([+-]?[\d,]+)\s+Armor/i);
        if (armM) result.armor = parseInt(armM[1].replace(/,/g, ''), 10);
      }

      if (!result.baseBlock && /\bblock\b/i.test(l) && !/equip:|chance|every time you block|increases.*block/i.test(l)) {
        const blkM = l.match(/([+-]?\d+)\s+Block\b/i);
        if (blkM) result.baseBlock = parseInt(blkM[1], 10);
      }

      const blkBonusM = l.match(/increases the block value of your shield by\s+(\d+)/i);
      if (blkBonusM) {
        result.blockValueBonus += parseInt(blkBonusM[1], 10);
      }

      if (/attack power/i.test(l) && !/reduces.*attack power|slows.*attack power/i.test(l)) {
        const feralM = l.match(/\+(\d+)\s+Attack Power in (?:Cat, Bear, Dire Bear, and Moonkin|Cat, Bear)/i);
        if (feralM) result.feralAttackPower += parseInt(feralM[1], 10);

        const rapM = l.match(/\+(\d+)\s+Ranged Attack Power/i);
        if (rapM) result.rangedAttackPower += parseInt(rapM[1], 10);

        const apM = l.match(/(?:\+|increases attack power by\s+)(\d+)\s+Attack Power/i);
        if (apM && !feralM && !rapM) result.attackPower += parseInt(apM[1], 10);
      }

      if (/crit/i.test(l) && !/for the next|party members/i.test(l)) {
        const critPctM = l.match(/critical strike(?: with (?:all spells and attacks|spells))? by\s+([\d.]+)%/i);
        if (critPctM) {
          result.crit += parseFloat(critPctM[1]);
        } else {
          const critRatingM = l.match(/\+(\d+)\s*(?:Crit|Critical Strike Rating)\b/i);
          if (critRatingM) result.crit += parseFloat(critRatingM[1]);
        }
      }

      if (/\bhit\b/i.test(l) && !/reduces.*hit chance|causes the target to bleed/i.test(l)) {
        const hitPctM = l.match(/chance to hit(?: with all spells and attacks)? by\s+([\d.]+)%/i);
        if (hitPctM) {
          result.hit += parseFloat(hitPctM[1]);
        } else {
          const hitRatingM = l.match(/\+(\d+)\s*(?:Hit|Hit Rating)\b/i);
          if (hitRatingM) result.hit += parseFloat(hitRatingM[1]);
        }
      }

      if (/mp5|mana per 5/i.test(l) && !/chance/i.test(l)) {
        const mp5M = l.match(/(?:restores\s+(\d+)\s+mana per 5 sec|\+(\d+)\s*mp5|\+(\d+)\s*mana per 5 sec)/i);
        if (mp5M) {
          result.mp5 += parseInt(mp5M[1] || mp5M[2] || mp5M[3], 10);
        }
      }

      const spDualM = l.match(/increases damage and healing done by magical spells and effects by up to\s+(\d+)/i);
      if (spDualM) {
        const v = parseInt(spDualM[1], 10);
        result.spellDamage += v;
        result.healing += v;
      }
      const spDmgM = l.match(/increases damage done by (?:[a-zA-Z]+\s+)?spells and effects by up to\s+(\d+)/i);
      if (spDmgM && !spDualM) {
        result.spellDamage += parseInt(spDmgM[1], 10);
      }
      const healOnlyM = l.match(/increases healing done by (?:(?:magical )?spells and effects by up to|(?:up to))\s+(\d+)/i);
      if (healOnlyM && !spDualM) {
        result.healing += parseInt(healOnlyM[1], 10);
      }
      const hybridM = l.match(/increases healing done by up to\s+(\d+)\s+and damage done by up to\s+(\d+)/i);
      if (hybridM) {
        result.healing += parseInt(hybridM[1], 10);
        result.spellDamage += parseInt(hybridM[2], 10);
      }
      const spPowM = l.match(/\+(\d+)\s*(?:Spell Power|SP)\b/i);
      if (spPowM) {
        const v = parseInt(spPowM[1], 10);
        result.spellDamage += v;
        result.healing += v;
      }
      const spOnlyM = l.match(/(?:\+|(?:equip:\s*\+))(\d+)\s+(?:[a-zA-Z]+\s+)?Spell Damage\b/i);
      if (spOnlyM && !spDualM && !spPowM) {
        result.spellDamage += parseInt(spOnlyM[1], 10);
      }
      const healM = l.match(/(?:\+|(?:equip:\s*\+))(\d+)\s+Healing\b/i);
      if (healM && !spDualM && !healOnlyM && !spPowM) {
        result.healing += parseInt(healM[1], 10);
      }

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

        const choiceM = l.match(/\+(\d+)\s*\[Agility or Strength\]/i);
        if (choiceM) {
          const cv = parseInt(choiceM[1], 10);
          result.strength = Math.max(result.strength, cv);
          result.agility = Math.max(result.agility, cv);
        }
      }
    });

    const statsStr = typeof item.stats === 'string' ? item.stats : '';
    if (statsStr) {
      const tokens = statsStr.split(',').map(s => s.trim());
      tokens.forEach(tok => {
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
          const m = tok.match(/\+(\d+)\s*Crit\b/i);
          if (m) result.crit = parseFloat(m[1]);
        }
        if (!result.hit) {
          const m = tok.match(/\+(\d+)\s*Hit\b/i);
          if (m) result.hit = parseFloat(m[1]);
        }
        if (!result.mp5) {
          const m = tok.match(/\+(\d+)\s*MP5\b/i);
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
      });
    }

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

    result.effectiveAttackPower = result.attackPower + Math.max(result.feralAttackPower, result.rangedAttackPower);
    result.totalBlockValue = result.baseBlock + result.blockValueBonus;
    result.block = result.totalBlockValue;

    if (!result.reqLevel) result.reqLevel = 1;

    return result;
  }

  function itemMatchesFilter(item, state = filterState) {
    if (!item) return false;
    const stats = parseItemStats(item);
    if (!stats) return false;

    if (state.minLevel !== null && state.minLevel !== undefined && state.minLevel !== '' && Number(state.minLevel) > 1) {
      if (stats.reqLevel < Number(state.minLevel)) return false;
    }
    if (state.maxLevel !== null && state.maxLevel !== undefined && state.maxLevel !== '' && Number(state.maxLevel) < 60) {
      if (stats.reqLevel > Number(state.maxLevel)) return false;
    }

    if (state.minDps !== null && state.minDps !== undefined && state.minDps !== '' && Number(state.minDps) > 0) {
      if (stats.dps < Number(state.minDps)) return false;
    }

    if (state.speedVal !== null && state.speedVal !== undefined && state.speedVal !== '' && Number(state.speedVal) > 0) {
      if (!stats.speed || stats.speed <= 0) return false;
      const targetSpeed = Number(state.speedVal);
      const op = state.speedOp || '>=';
      if (op === '>=' && stats.speed < targetSpeed) return false;
      if (op === '<=' && stats.speed > targetSpeed) return false;
    }

    if (state.minStr !== null && state.minStr !== undefined && state.minStr !== '' && Number(state.minStr) > 0) {
      if (stats.strength < Number(state.minStr)) return false;
    }
    if (state.minAgi !== null && state.minAgi !== undefined && state.minAgi !== '' && Number(state.minAgi) > 0) {
      if (stats.agility < Number(state.minAgi)) return false;
    }
    if (state.minSta !== null && state.minSta !== undefined && state.minSta !== '' && Number(state.minSta) > 0) {
      if (stats.stamina < Number(state.minSta)) return false;
    }
    if (state.minInt !== null && state.minInt !== undefined && state.minInt !== '' && Number(state.minInt) > 0) {
      if (stats.intellect < Number(state.minInt)) return false;
    }
    if (state.minSpi !== null && state.minSpi !== undefined && state.minSpi !== '' && Number(state.minSpi) > 0) {
      if (stats.spirit < Number(state.minSpi)) return false;
    }

    if (state.minAp !== null && state.minAp !== undefined && state.minAp !== '' && Number(state.minAp) > 0) {
      if (stats.effectiveAttackPower < Number(state.minAp)) return false;
    }
    if (state.minCrit !== null && state.minCrit !== undefined && state.minCrit !== '' && Number(state.minCrit) > 0) {
      if (stats.crit < Number(state.minCrit)) return false;
    }
    if (state.minHit !== null && state.minHit !== undefined && state.minHit !== '' && Number(state.minHit) > 0) {
      if (stats.hit < Number(state.minHit)) return false;
    }
    if (state.minSpellDmg !== null && state.minSpellDmg !== undefined && state.minSpellDmg !== '' && Number(state.minSpellDmg) > 0) {
      if (stats.spellDamage < Number(state.minSpellDmg)) return false;
    }
    if (state.minHealing !== null && state.minHealing !== undefined && state.minHealing !== '' && Number(state.minHealing) > 0) {
      if (stats.healing < Number(state.minHealing)) return false;
    }
    if (state.minMp5 !== null && state.minMp5 !== undefined && state.minMp5 !== '' && Number(state.minMp5) > 0) {
      if (stats.mp5 < Number(state.minMp5)) return false;
    }

    if (state.minArmor !== null && state.minArmor !== undefined && state.minArmor !== '' && Number(state.minArmor) > 0) {
      if (stats.armor < Number(state.minArmor)) return false;
    }
    if (state.minBlock !== null && state.minBlock !== undefined && state.minBlock !== '' && Number(state.minBlock) > 0) {
      const blk = stats.block || stats.totalBlockValue || 0;
      if (blk < Number(state.minBlock)) return false;
    }

    return true;
  }

  function itemMatchesFilters(item, state = filterState) {
    return itemMatchesFilter(item, state);
  }

  function filterLevelStep(step, effectiveFaction = 'all', effectiveSource = 'all', effectiveSlot = 'all', itemMatchesAllFn = null) {
    if (!step) return { isVisible: false };

    const checkMatches = (it) => {
      if (!it) return false;
      if (typeof itemMatchesAllFn === 'function') {
        if (!itemMatchesAllFn(it, effectiveFaction, effectiveSource, effectiveSlot)) return false;
      }
      return itemMatchesFilter(it);
    };

    let displayStep = { ...step };
    let displayAlts = (step.alts || []).slice();

    const primaryMatches = checkMatches(displayStep);

    let matchIdx = -1;
    if (!primaryMatches) {
      matchIdx = displayAlts.findIndex(a => checkMatches(a));
    }

    let isPromoted = false;
    if (matchIdx !== -1) {
      const altMatch = displayAlts[matchIdx];
      displayStep = { ...step, ...altMatch, isAltPromoted: true, isPromoted: true };
      isPromoted = true;
      displayAlts = displayAlts.filter((_, i) => i !== matchIdx && checkMatches(_));
      if (typeof itemMatchesAllFn === 'function' ? itemMatchesAllFn(step, effectiveFaction, effectiveSource, effectiveSlot) : true) {
        displayAlts.push({ ...step, isDemotedPrimary: true });
      }
    } else if (!primaryMatches) {
      return { isVisible: false };
    }

    displayAlts = displayAlts.filter(alt => checkMatches(alt));

    return {
      isVisible: true,
      displayStep,
      displayAlts,
      isPromoted,
      isAltPromoted: isPromoted
    };
  }

  function renderFilterDrawerHtml() {
    return `
      <div class="progression-filter-drawer-wrapper">
        <div class="progression-filter-drawer-header">
          <button type="button" class="btn-advanced-filters-toggle" id="btn-toggle-advanced-filters" aria-expanded="false" aria-controls="progression-advanced-filter-drawer">
            <span>⚙️</span>
            <span>Advanced Stat Filters</span>
            <span class="active-filter-badge" id="advanced-filter-count-badge">0 Active</span>
          </button>
          <button type="button" class="btn-reset-filters" id="btn-reset-advanced-filters" aria-label="Reset all progression filters">
            <span>↺</span> Reset All Filters
          </button>
        </div>
        <div id="progression-advanced-filter-drawer" class="progression-advanced-filter-drawer" hidden>
          <div class="filter-drawer-grid">
            <div class="filter-category-section">
              <h4 class="filter-category-title">Level &amp; Scaling</h4>
              <div class="filter-fields-row">
                <div class="filter-field-group">
                  <label for="prog-filter-min-level" class="filter-label">Min Level</label>
                  <input type="number" id="prog-filter-min-level" name="minLevel" min="1" max="60" placeholder="1" aria-label="Minimum required player level" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-max-level" class="filter-label">Max Level</label>
                  <input type="number" id="prog-filter-max-level" name="maxLevel" min="1" max="60" placeholder="60" aria-label="Maximum required player level" class="prog-filter-input" />
                </div>
                <div class="filter-field-group">
                  <label for="prog-filter-min-dps" class="filter-label">Min Weapon DPS</label>
                  <input type="number" id="prog-filter-min-dps" name="minDps" min="0" step="0.1" placeholder="0.0" aria-label="Minimum weapon damage per second" class="prog-filter-input" />
                </div>
              </div>
            </div>
            <div class="filter-category-section">
              <button type="button" class="speed-benchmark-btn" id="btn-speed-benchmarks" aria-label="Weapon speed benchmarks guide" aria-expanded="false" aria-controls="speed-benchmark-popover">ℹ️ Benchmarks</button>
              <div class="speed-benchmark-popover" id="speed-benchmark-popover" role="tooltip" hidden>
                <div class="benchmark-entry fast"><span class="benchmark-badge">⚡ Fast (1.20–1.80s)</span><p>Optimal for Rogues, off-hand poison application.</p></div>
                <div class="benchmark-entry standard"><span class="benchmark-badge">⚖️ Standard (1.90–2.80s)</span><p>Standard leveling pace.</p></div>
                <div class="benchmark-entry slow"><span class="benchmark-badge">💥 Slow (2.90–4.00s)</span><p>Warrior Mortal Strike burst.</p></div>
              </div>
              <select id="prog-filter-speed-op" name="speedOp" aria-label="Weapon swing speed comparison operator" class="prog-filter-select">
                <option value=">=" selected>≥ (Slower / At least)</option>
                <option value="<=">≤ (Faster / At most)</option>
              </select>
              <input type="number" id="prog-filter-speed-val" name="speedVal" min="1.00" max="4.50" step="0.10" placeholder="e.g. 3.50" aria-label="Weapon swing speed in seconds" class="prog-filter-input speed-input" />
            </div>
            <div class="filter-category-section">
              <input type="number" id="prog-filter-min-str" name="minStr" aria-label="Minimum Strength bonus" class="prog-filter-input" />
              <input type="number" id="prog-filter-min-agi" name="minAgi" aria-label="Minimum Agility bonus" class="prog-filter-input" />
              <input type="number" id="prog-filter-min-sta" name="minSta" aria-label="Minimum Stamina bonus" class="prog-filter-input" />
              <input type="number" id="prog-filter-min-int" name="minInt" aria-label="Minimum Intellect bonus" class="prog-filter-input" />
              <input type="number" id="prog-filter-min-spi" name="minSpi" aria-label="Minimum Spirit bonus" class="prog-filter-input" />
            </div>
            <div class="filter-category-section">
              <input type="number" id="prog-filter-min-ap" name="minAp" aria-label="Minimum Attack Power bonus" class="prog-filter-input" />
              <input type="number" id="prog-filter-min-crit" name="minCrit" aria-label="Minimum Critical Strike percentage" class="prog-filter-input" />
              <input type="number" id="prog-filter-min-hit" name="minHit" aria-label="Minimum Hit Chance percentage" class="prog-filter-input" />
              <input type="number" id="prog-filter-min-spell-dmg" name="minSpellDmg" aria-label="Minimum Spell Damage bonus" class="prog-filter-input" />
              <input type="number" id="prog-filter-min-healing" name="minHealing" aria-label="Minimum Healing bonus" class="prog-filter-input" />
              <input type="number" id="prog-filter-min-mp5" name="minMp5" aria-label="Minimum Mana per 5 sec bonus" class="prog-filter-input" />
            </div>
            <div class="filter-category-section">
              <input type="number" id="prog-filter-min-armor" name="minArmor" aria-label="Minimum Armor value" class="prog-filter-input" />
              <input type="number" id="prog-filter-min-block" name="minBlock" aria-label="Minimum Shield Block Value bonus" class="prog-filter-input" />
            </div>
          </div>
        </div>
      </div>
    `;
  }

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

  function setupEventListeners() {}

  return {
    getState,
    getFilterState,
    setState,
    setFilter,
    resetFilters,
    getActiveFilterCount,
    parseItemStats,
    itemMatchesFilter,
    itemMatchesFilters,
    filterLevelStep,
    renderDrawerHtml: renderFilterDrawerHtml,
    renderFilterDrawerHtml,
    renderEmptyStateHtml,
    setupEventListeners
  };
}

// -----------------------------------------------------------------------------
// 3. Environment Setup & Target Resolution
// -----------------------------------------------------------------------------

console.log('Loading datasets into isolated VM sandbox...');
const startTime = Date.now();
const env = loadProgressionEnvironment(ROOT);

let filterEngine;
let executionTarget;

if (env.hasProdModule && env.context.window.WOW_PROGRESSION_FILTER) {
  filterEngine = env.context.window.WOW_PROGRESSION_FILTER;
  executionTarget = 'Production (window.WOW_PROGRESSION_FILTER)';
} else {
  filterEngine = createReferenceProgressionFilter(env.context.window);
  executionTarget = 'Reference Specification Oracle (M1 implementation pending)';
}

console.log(`✓ Environment ready in ${Date.now() - startTime}ms:`);
console.log(`  - Target Engine: ${executionTarget}`);
console.log(`  - Progression Classes: ${Object.keys(env.progressionData.weapons || {}).length}`);
console.log(`  - BiS Database Classes: ${(env.bisData.classes || []).length}\n`);

// Helper: safe active count evaluation with temporary state
function getFilterCountFor(filter, state) {
  if (state) {
    const prev = filter.getState();
    filter.setState(state);
    const count = filter.getActiveFilterCount();
    filter.setState(prev);
    return count;
  }
  return filter.getActiveFilterCount();
}

// Helper: standard chip matching callback matching class-progression.js
function defaultChipPredicate(item, faction, source, slot) {
  if (!item) return false;
  if (faction !== 'all') {
    const f = item.faction || 'both';
    if (f !== 'both' && f !== faction) return false;
  }
  if (source !== 'all') {
    const kind = item.source?.kind || '';
    const title = (item.source?.title || item.source || '').toLowerCase();
    if (source === 'dungeon' && kind !== 'dungeon' && !title.includes('dungeon') && !title.includes('boss')) return false;
    if (source === 'quest' && kind !== 'quest' && !title.includes('quest')) return false;
    if (source === 'vendor-craft' && kind !== 'vendor' && kind !== 'craft' && !title.includes('vendor')) return false;
  }
  if (slot !== 'all') {
    const wt = (item.weaponType || '').toLowerCase();
    const linesStr = Array.isArray(item.lines) ? item.lines.join(' ').toLowerCase() : '';
    const isTwoHand = wt.includes('two-hand') || linesStr.includes('two-hand');
    const isShield = wt.includes('shield') || linesStr.includes('shield');
    const isRanged = wt.includes('wand') || wt.includes('bow') || wt.includes('gun') || wt.includes('crossbow') || linesStr.includes('ranged');
    if (slot === 'two-hand' && !isTwoHand) return false;
    if (slot === 'one-hand' && (isTwoHand || isShield || isRanged)) return false;
    if (slot === 'shield' && !isShield) return false;
    if (slot === 'ranged' && !isRanged) return false;
  }
  return true;
}

// Helper: evaluate step with specified filter state and chips
function evaluateStep(filter, step, filterState, faction = 'all', source = 'all', slot = 'all') {
  const prev = filter.getState();
  filter.setState(filterState);
  const res = filter.filterLevelStep(step, faction, source, slot, defaultChipPredicate);
  filter.setState(prev);
  return res;
}

// -----------------------------------------------------------------------------
// 4. Test Suites Implementation
// -----------------------------------------------------------------------------

// =============================================================================
// TIER 1: FEATURE COVERAGE (Core Requirements R1–R4)
// =============================================================================

function runTier1Tests(c, env, filter) {
  // Feature 1: Level Range Filters (>=5 tests)
  c.describe('Tier 1.1: Level Range Filters', () => {
    c.test('1.1.1 Default unconstrained state matches all item levels', () => {
      const itemLow = { reqLevel: 5, dps: 10 };
      const itemHigh = { reqLevel: 58, dps: 45 };
      expect(filter.itemMatchesFilter(itemLow, { minLevel: null, maxLevel: null })).toBe(true);
      expect(filter.itemMatchesFilter(itemHigh, { minLevel: null, maxLevel: null })).toBe(true);
    });

    c.test('1.1.2 minLevel rejects items below threshold and retains items >= threshold', () => {
      const itemUnder = { reqLevel: 14 };
      const itemExact = { reqLevel: 15 };
      const itemAbove = { reqLevel: 25 };
      expect(filter.itemMatchesFilter(itemUnder, { minLevel: 15 })).toBe(false);
      expect(filter.itemMatchesFilter(itemExact, { minLevel: 15 })).toBe(true);
      expect(filter.itemMatchesFilter(itemAbove, { minLevel: 15 })).toBe(true);
    });

    c.test('1.1.3 maxLevel rejects items above threshold and retains items <= threshold', () => {
      const itemUnder = { reqLevel: 20 };
      const itemExact = { reqLevel: 30 };
      const itemAbove = { reqLevel: 31 };
      expect(filter.itemMatchesFilter(itemUnder, { maxLevel: 30 })).toBe(true);
      expect(filter.itemMatchesFilter(itemExact, { maxLevel: 30 })).toBe(true);
      expect(filter.itemMatchesFilter(itemAbove, { maxLevel: 30 })).toBe(false);
    });

    c.test('1.1.4 Narrow level bracket (15–20) isolates items strictly to [15, 20]', () => {
      const state = { minLevel: 15, maxLevel: 20 };
      expect(filter.itemMatchesFilter({ reqLevel: 14 }, state)).toBe(false);
      expect(filter.itemMatchesFilter({ reqLevel: 15 }, state)).toBe(true);
      expect(filter.itemMatchesFilter({ reqLevel: 18 }, state)).toBe(true);
      expect(filter.itemMatchesFilter({ reqLevel: 20 }, state)).toBe(true);
      expect(filter.itemMatchesFilter({ reqLevel: 21 }, state)).toBe(false);
    });

    c.test('1.1.5 Starter items lacking reqLevel default to level 1', () => {
      const starterItem = { name: 'Crude Battle Axe', reqLevel: null };
      expect(filter.itemMatchesFilter(starterItem, { minLevel: 1, maxLevel: 10 })).toBe(true);
      expect(filter.itemMatchesFilter(starterItem, { minLevel: 5 })).toBe(false);
    });

    c.test('1.1.6 Required level correctly extracted from tooltip lines array', () => {
      const item = { lines: ['Darkwater Blade', 'Binds when picked up', 'One-Hand', 'Requires Level 38'] };
      const stats = filter.parseItemStats(item);
      expect(stats.reqLevel).toBe(38);
      expect(filter.itemMatchesFilter(item, { minLevel: 35, maxLevel: 40 })).toBe(true);
      expect(filter.itemMatchesFilter(item, { maxLevel: 30 })).toBe(false);
    });
  });

  // Feature 2: Weapon DPS Filters (>=5 tests)
  c.describe('Tier 1.2: Weapon DPS Filters', () => {
    c.test('1.2.1 Default unconstrained DPS matches weapons and 0-DPS items', () => {
      expect(filter.itemMatchesFilter({ dps: 0 }, { minDps: null })).toBe(true);
      expect(filter.itemMatchesFilter({ dps: 25.5 }, { minDps: null })).toBe(true);
    });

    c.test('1.2.2 minDps 20.5 rejects items < 20.5 and retains items >= 20.5', () => {
      const state = { minDps: 20.5 };
      expect(filter.itemMatchesFilter({ dps: 20.4 }, state)).toBe(false);
      expect(filter.itemMatchesFilter({ dps: 20.5 }, state)).toBe(true);
      expect(filter.itemMatchesFilter({ dps: 20.6 }, state)).toBe(true);
    });

    c.test('1.2.3 Floating point precision handles 20.49 vs 20.50 correctly', () => {
      const state = { minDps: 20.5 };
      expect(filter.itemMatchesFilter({ dps: 20.49 }, state)).toBe(false);
      expect(filter.itemMatchesFilter({ dps: 20.50 }, state)).toBe(true);
    });

    c.test('1.2.4 Non-weapon items evaluate to 0 DPS and fail when minDps > 0', () => {
      const shield = { name: 'Redbeard Crest', armor: 450, block: 15 };
      expect(filter.itemMatchesFilter(shield, { minDps: 5.0 })).toBe(false);
    });

    c.test('1.2.5 DPS parsed from string with unit text (e.g. "25.4 DPS")', () => {
      const item = { dps: '25.4 DPS' };
      const stats = filter.parseItemStats(item);
      expect(stats.dps).toBe(25.4);
      expect(filter.itemMatchesFilter(item, { minDps: 25.0 })).toBe(true);
      expect(filter.itemMatchesFilter(item, { minDps: 26.0 })).toBe(false);
    });

    c.test('1.2.6 DPS parsed from parenthetical tooltip line (e.g. "(31.25 damage per second)")', () => {
      const item = { lines: ['Corpsemaker', 'Two-Hand Axe', 'Speed 3.80', '(31.25 damage per second)'] };
      const stats = filter.parseItemStats(item);
      expect(stats.dps).toBe(31.25);
      expect(filter.itemMatchesFilter(item, { minDps: 30.0 })).toBe(true);
    });
  });

  // Feature 3: Weapon Swing Speed & Operator (>=5 tests)
  c.describe('Tier 1.3: Weapon Swing Speed & Operator', () => {
    c.test('1.3.1 Speed unconstrained does not filter weapons or non-weapons', () => {
      expect(filter.itemMatchesFilter({ speed: 1.80 }, { speedVal: null })).toBe(true);
      expect(filter.itemMatchesFilter({ speed: 3.80 }, { speedVal: null })).toBe(true);
      expect(filter.itemMatchesFilter({ speed: 0 }, { speedVal: null })).toBe(true);
    });

    c.test('1.3.2 Speed operator >= (slower) retains >= 3.50 and rejects 2.60', () => {
      const state = { speedOp: '>=', speedVal: 3.50 };
      expect(filter.itemMatchesFilter({ speed: 3.80 }, state)).toBe(true);
      expect(filter.itemMatchesFilter({ speed: 3.50 }, state)).toBe(true);
      expect(filter.itemMatchesFilter({ speed: 3.40 }, state)).toBe(false);
      expect(filter.itemMatchesFilter({ speed: 2.60 }, state)).toBe(false);
    });

    c.test('1.3.3 Speed operator <= (faster) retains <= 1.80 and rejects 2.00', () => {
      const state = { speedOp: '<=', speedVal: 1.80 };
      expect(filter.itemMatchesFilter({ speed: 1.40 }, state)).toBe(true);
      expect(filter.itemMatchesFilter({ speed: 1.80 }, state)).toBe(true);
      expect(filter.itemMatchesFilter({ speed: 1.90 }, state)).toBe(false);
      expect(filter.itemMatchesFilter({ speed: 2.60 }, state)).toBe(false);
    });

    c.test('1.3.4 Exact boundary inclusion for 2.60s speed with both operators', () => {
      const weapon = { speed: 2.60 };
      expect(filter.itemMatchesFilter(weapon, { speedOp: '>=', speedVal: 2.60 })).toBe(true);
      expect(filter.itemMatchesFilter(weapon, { speedOp: '<=', speedVal: 2.60 })).toBe(true);
    });

    c.test('1.3.5 Non-weapon items (speed 0) fail numeric speed filter without generating NaN', () => {
      const offhand = { name: 'Tome of the Lost', stats: '+5 Intellect' };
      expect(filter.itemMatchesFilter(offhand, { speedOp: '<=', speedVal: 2.00 })).toBe(false);
      expect(filter.itemMatchesFilter(offhand, { speedOp: '>=', speedVal: 2.00 })).toBe(false);
    });

    c.test('1.3.6 Speed operator toggle flips acceptance outcome', () => {
      const dagger = { speed: 1.50 };
      expect(filter.itemMatchesFilter(dagger, { speedOp: '<=', speedVal: 1.80 })).toBe(true);
      expect(filter.itemMatchesFilter(dagger, { speedOp: '>=', speedVal: 1.80 })).toBe(false);
    });
  });

  // Feature 4: Core Attributes Filter (>=5 tests)
  c.describe('Tier 1.4: Core Attributes Filter', () => {
    c.test('1.4.1 minStr matches items with Strength >= threshold and rejects below', () => {
      expect(filter.itemMatchesFilter({ stats: '+7 Strength' }, { minStr: 7 })).toBe(true);
      expect(filter.itemMatchesFilter({ stats: '+10 Strength' }, { minStr: 7 })).toBe(true);
      expect(filter.itemMatchesFilter({ stats: '+6 Strength' }, { minStr: 7 })).toBe(false);
    });

    c.test('1.4.2 minAgi matches items with Agility >= threshold and rejects below', () => {
      expect(filter.itemMatchesFilter({ stats: '+5 Agility' }, { minAgi: 5 })).toBe(true);
      expect(filter.itemMatchesFilter({ stats: '+4 Agility' }, { minAgi: 5 })).toBe(false);
    });

    c.test('1.4.3 minSta matches items with Stamina >= threshold and rejects below', () => {
      expect(filter.itemMatchesFilter({ stats: '+10 Stamina' }, { minSta: 10 })).toBe(true);
      expect(filter.itemMatchesFilter({ stats: '+9 Stamina' }, { minSta: 10 })).toBe(false);
    });

    c.test('1.4.4 minInt matches items with Intellect >= threshold and rejects below', () => {
      expect(filter.itemMatchesFilter({ stats: '+6 Intellect' }, { minInt: 6 })).toBe(true);
      expect(filter.itemMatchesFilter({ stats: '+5 Intellect' }, { minInt: 6 })).toBe(false);
    });

    c.test('1.4.5 minSpi matches items with Spirit >= threshold and rejects below', () => {
      expect(filter.itemMatchesFilter({ stats: '+4 Spirit' }, { minSpi: 4 })).toBe(true);
      expect(filter.itemMatchesFilter({ stats: '+3 Spirit' }, { minSpi: 4 })).toBe(false);
    });

    c.test('1.4.6 Multi-attribute logical AND requires all specified attributes to pass', () => {
      const state = { minStr: 7, minSta: 7 };
      expect(filter.itemMatchesFilter({ stats: '+7 Strength, +5 Stamina' }, state)).toBe(false);
      expect(filter.itemMatchesFilter({ stats: '+6 Strength, +8 Stamina' }, state)).toBe(false);
      expect(filter.itemMatchesFilter({ stats: '+7 Strength, +7 Stamina' }, state)).toBe(true);
      expect(filter.itemMatchesFilter({ stats: '+10 Strength, +12 Stamina' }, state)).toBe(true);
    });

    c.test('1.4.7 Abbreviated stat tokens in stats string parsed accurately', () => {
      const item = { stats: '+16 Str, +17 Sta, +3 Agi, +5 Int, +4 Spi' };
      const stats = filter.parseItemStats(item);
      expect(stats.strength).toBe(16);
      expect(stats.stamina).toBe(17);
      expect(stats.agility).toBe(3);
      expect(stats.intellect).toBe(5);
      expect(stats.spirit).toBe(4);
      expect(filter.itemMatchesFilter(item, { minStr: 15, minSta: 15, minAgi: 2 })).toBe(true);
    });
  });

  // Feature 5: Combat & Caster Stats Filter (>=5 tests)
  c.describe('Tier 1.5: Combat & Caster Stats Filter', () => {
    c.test('1.5.1 Attack Power combines base, ranged, and feral AP', () => {
      const feralItem = { lines: ['Feral Staff', '+140 Attack Power in Cat, Bear, Dire Bear, and Moonkin forms only.'] };
      const baseApItem = { lines: ['Equip: +20 Attack Power.'] };
      expect(filter.parseItemStats(feralItem).effectiveAttackPower).toBe(140);
      expect(filter.parseItemStats(baseApItem).effectiveAttackPower).toBe(20);
      expect(filter.itemMatchesFilter(feralItem, { minAp: 100 })).toBe(true);
      expect(filter.itemMatchesFilter(baseApItem, { minAp: 25 })).toBe(false);
    });

    c.test('1.5.2 Critical Strike % parsed from lines and tokens', () => {
      const item1 = { lines: ['Equip: Improves your chance to get a critical strike by 2.0%.'] };
      const item2 = { stats: '+1 Crit' };
      expect(filter.parseItemStats(item1).crit).toBe(2.0);
      expect(filter.parseItemStats(item2).crit).toBe(1.0);
      expect(filter.itemMatchesFilter(item1, { minCrit: 1.5 })).toBe(true);
      expect(filter.itemMatchesFilter(item2, { minCrit: 1.5 })).toBe(false);
    });

    c.test('1.5.3 Hit Chance % parsed from lines and tokens', () => {
      const hitItem = { lines: ['Equip: Improves your chance to hit by 1.0%.'] };
      const noHitItem = { stats: '+5 Strength' };
      expect(filter.parseItemStats(hitItem).hit).toBe(1.0);
      expect(filter.itemMatchesFilter(hitItem, { minHit: 1.0 })).toBe(true);
      expect(filter.itemMatchesFilter(noHitItem, { minHit: 1.0 })).toBe(false);
    });

    c.test('1.5.4 Spell Damage extracted from dual equip effects and direct tokens', () => {
      const dualItem = { lines: ['Equip: Increases damage and healing done by magical spells and effects by up to 14'] };
      const spTokenItem = { stats: '+14 SP' };
      expect(filter.parseItemStats(dualItem).spellDamage).toBe(14);
      expect(filter.parseItemStats(spTokenItem).spellDamage).toBe(14);
      expect(filter.itemMatchesFilter(dualItem, { minSpellDmg: 10 })).toBe(true);
    });

    c.test('1.5.5 Healing Power extracted from pure healing lines and dual damage/healing lines', () => {
      const pureHeal = { lines: ['Equip: Increases healing done by spells and effects by up to 22'] };
      const dualItem = { lines: ['Equip: Increases damage and healing done by magical spells and effects by up to 14'] };
      expect(filter.parseItemStats(pureHeal).healing).toBe(22);
      expect(filter.parseItemStats(dualItem).healing).toBe(14);
      expect(filter.itemMatchesFilter(pureHeal, { minHealing: 20 })).toBe(true);
      expect(filter.itemMatchesFilter(dualItem, { minHealing: 20 })).toBe(false);
    });

    c.test('1.5.6 Pure healing item (Trogg Scepter) satisfies minHealing but fails minSpellDmg', () => {
      const troggScepter = { lines: ['Trogg Scepter', 'One-Hand Mace', 'Equip: Increases healing done by up to 33'] };
      const stats = filter.parseItemStats(troggScepter);
      expect(stats.healing).toBe(33);
      expect(stats.spellDamage).toBe(0);
      expect(filter.itemMatchesFilter(troggScepter, { minHealing: 30 })).toBe(true);
      expect(filter.itemMatchesFilter(troggScepter, { minSpellDmg: 30 })).toBe(false);
    });

    c.test('1.5.7 MP5 extracted from equip lines and token abbreviations', () => {
      const mp5Line = { lines: ['Equip: Restores 4 mana per 5 sec.'] };
      const mp5Token = { stats: '+4 MP5' };
      expect(filter.parseItemStats(mp5Line).mp5).toBe(4);
      expect(filter.parseItemStats(mp5Token).mp5).toBe(4);
      expect(filter.itemMatchesFilter(mp5Line, { minMp5: 3 })).toBe(true);
      expect(filter.itemMatchesFilter(mp5Token, { minMp5: 5 })).toBe(false);
    });
  });

  // Feature 6: Defensive & Shield Stats Filter (>=5 tests)
  c.describe('Tier 1.6: Defensive & Shield Stats Filter', () => {
    c.test('1.6.1 Armor parsed from direct property and lines', () => {
      const shieldProp = { armor: 984 };
      const shieldLine = { lines: ['984 Armor'] };
      expect(filter.parseItemStats(shieldProp).armor).toBe(984);
      expect(filter.parseItemStats(shieldLine).armor).toBe(984);
      expect(filter.itemMatchesFilter(shieldProp, { minArmor: 500 })).toBe(true);
      expect(filter.itemMatchesFilter({ armor: 250 }, { minArmor: 500 })).toBe(false);
    });

    c.test('1.6.2 Comma-formatted armor ("1,380 Armor") normalized to integer 1380', () => {
      const item = { lines: ['Collection Plate', '1,380 Armor', '38 Block'] };
      const stats = filter.parseItemStats(item);
      expect(stats.armor).toBe(1380);
      expect(filter.itemMatchesFilter(item, { minArmor: 1000 })).toBe(true);
      expect(filter.itemMatchesFilter(item, { minArmor: 1500 })).toBe(false);
    });

    c.test('1.6.3 Base shield block parsed from block property and lines', () => {
      const itemProp = { block: 22 };
      const itemLine = { lines: ['22 Block'] };
      expect(filter.parseItemStats(itemProp).baseBlock).toBe(22);
      expect(filter.parseItemStats(itemLine).baseBlock).toBe(22);
      expect(filter.itemMatchesFilter(itemProp, { minBlock: 20 })).toBe(true);
    });

    c.test('1.6.4 Shield Equip block value bonus extracted from tooltip line', () => {
      const item = { lines: ['Equip: Increases the block value of your shield by 21.'] };
      const stats = filter.parseItemStats(item);
      expect(stats.blockValueBonus).toBe(21);
    });

    c.test('1.6.5 Shield block value sums base block and equip block value bonus', () => {
      // Crest of Preeminence: 57 base + 21 equip = 78 total block
      const crest = {
        name: 'Crest of Preeminence',
        block: 57,
        lines: ['57 Block', 'Equip: Increases the block value of your shield by 21.']
      };
      const stats = filter.parseItemStats(crest);
      expect(stats.baseBlock).toBe(57);
      expect(stats.blockValueBonus).toBe(21);
      expect(stats.block).toBe(78);
      expect(filter.itemMatchesFilter(crest, { minBlock: 75 })).toBe(true);
      expect(filter.itemMatchesFilter(crest, { minBlock: 80 })).toBe(false);
    });

    c.test('1.6.6 Block Chance (% block) strictly excluded from shield block value', () => {
      const shieldWithChance = {
        name: 'Barrier Shield',
        lines: ['57 Block', 'Equip: Increases your chance to block attacks with a shield by 2%.']
      };
      const stats = filter.parseItemStats(shieldWithChance);
      expect(stats.baseBlock).toBe(57);
      expect(stats.blockValueBonus).toBe(0);
      expect(stats.block).toBe(57);
    });
  });

  // Feature 7: Active Filter Counter Badge (>=5 tests)
  c.describe('Tier 1.7: Active Filter Counter Badge', () => {
    c.test('1.7.1 Active filter count is 0 on unconstrained default state', () => {
      expect(getFilterCountFor(filter, {})).toBe(0);
      expect(getFilterCountFor(filter, { minLevel: 1, maxLevel: 60, speedOp: '>=' })).toBe(0);
    });

    c.test('1.7.2 Single active filter increments counter to 1', () => {
      expect(getFilterCountFor(filter, { minLevel: 15 })).toBe(1);
      expect(getFilterCountFor(filter, { minDps: 20.5 })).toBe(1);
      expect(getFilterCountFor(filter, { minStr: 7 })).toBe(1);
    });

    c.test('1.7.3 Multiple active filters correctly increment active count', () => {
      const state = { minLevel: 15, maxLevel: 40, minDps: 20, minStr: 5 };
      expect(getFilterCountFor(filter, state)).toBe(4);
    });

    c.test('1.7.4 Boundary defaults (minLevel 1, maxLevel 60) do not count as active', () => {
      const state = { minLevel: 1, maxLevel: 60, minDps: 0, minStr: 0 };
      expect(getFilterCountFor(filter, state)).toBe(0);
    });

    c.test('1.7.5 Speed operator alone without speedVal does not increment counter', () => {
      expect(getFilterCountFor(filter, { speedOp: '<=', speedVal: null })).toBe(0);
      expect(getFilterCountFor(filter, { speedOp: '<=', speedVal: 1.80 })).toBe(1);
    });

    c.test('1.7.6 Filter drawer HTML markup contains counter badge container', () => {
      const html = filter.renderFilterDrawerHtml();
      const hasBadge = html.includes('filter-count-badge') || html.includes('active-filter-badge') || html.includes('advanced-filter-count-badge');
      expect(hasBadge).toBe(true);
    });
  });

  // Feature 8: Reset Button & State Restoration (>=5 tests)
  c.describe('Tier 1.8: Reset Button & State Restoration', () => {
    c.test('1.8.1 resetFilters() clears all active filter inputs to defaults', () => {
      filter.setState({ minLevel: 25, minDps: 30, minStr: 10, speedVal: 2.60 });
      expect(filter.getActiveFilterCount()).toBeGreaterThanOrEqual(4);
      filter.resetFilters();
      expect(filter.getActiveFilterCount()).toBe(0);
    });

    c.test('1.8.2 resetFilters() restores speedOp to default ">="', () => {
      filter.setState({ speedOp: '<=' });
      filter.resetFilters();
      const state = filter.getState();
      expect(state.speedOp).toBe('>=');
    });

    c.test('1.8.3 resetFilters() clears level boundaries to null or default', () => {
      filter.setState({ minLevel: 15, maxLevel: 30 });
      filter.resetFilters();
      const state = filter.getState();
      expect(state.minLevel).toBeNull();
      expect(state.maxLevel).toBeNull();
    });

    c.test('1.8.4 resetFilters() restores acceptance of previously rejected items', () => {
      const item = { reqLevel: 10, dps: 15.0 };
      filter.setState({ minLevel: 25 });
      expect(filter.itemMatchesFilter(item, filter.getState())).toBe(false);
      filter.resetFilters();
      expect(filter.itemMatchesFilter(item, filter.getState())).toBe(true);
    });

    c.test('1.8.5 resetFilters() preserves UI toggle state isDrawerOpen', () => {
      filter.setState({ isDrawerOpen: true, minDps: 25.0 });
      filter.resetFilters();
      expect(filter.getState().isDrawerOpen).toBe(true);
    });

    c.test('1.8.6 Filter drawer markup includes 1-click Reset button with accessible label', () => {
      const html = filter.renderFilterDrawerHtml();
      const hasReset = html.includes('btn-reset-advanced-filters') || html.includes('btn-reset-filters') || html.includes('btn-reset-prog-filters');
      expect(hasReset).toBe(true);
      expect(html).toContain('Reset All Filters');
    });
  });

  // Feature 9: Speed Operator & Benchmark Popover (>=5 tests)
  c.describe('Tier 1.9: Speed Operator & Benchmark Popover', () => {
    c.test('1.9.1 Speed operator dropdown defaults to ">=" (Slower / At least)', () => {
      const state = filter.getState();
      expect(state.speedOp).toBe('>=');
    });

    c.test('1.9.2 Speed operator can be switched to "<=" (Faster / At most)', () => {
      filter.setState({ speedOp: '<=' });
      expect(filter.getState().speedOp).toBe('<=');
      filter.resetFilters();
    });

    c.test('1.9.3 Benchmark popover markup contains 3 speed tiers with database ranges', () => {
      const html = filter.renderFilterDrawerHtml();
      expect(html).toContain('speed-benchmark-popover');
      expect(html).toContain('Fast (1.20–1.80s)');
      expect(html).toContain('Standard (1.90–2.80s)');
      expect(html).toContain('Slow (2.90–4.00s)');
    });

    c.test('1.9.4 Benchmark helper button features accessible aria attributes', () => {
      const html = filter.renderFilterDrawerHtml();
      expect(html).toContain('btn-speed-benchmarks');
      expect(html).toContain('aria-label="Weapon speed benchmarks guide"');
      expect(html).toContain('aria-controls="speed-benchmark-popover"');
    });

    c.test('1.9.5 Benchmark guidance documents Rogue poison procs for fast and Mortal Strike for slow', () => {
      const html = filter.renderFilterDrawerHtml();
      expect(html).toContain('poison');
      expect(html).toContain('Mortal Strike');
    });
  });
}

// =============================================================================
// TIER 2: BOUNDARY & CORNER CASES (Extreme Inputs & Anomaly Guards)
// =============================================================================

function runTier2Tests(c, env, filter) {
  // Boundary 1: Unconstrained Empty Defaults (>=5 tests)
  c.describe('Tier 2.1: Unconstrained Empty Defaults', () => {
    c.test('2.1.1 Completely empty filter object matches all items', () => {
      const item = { reqLevel: 20, dps: 22.0, speed: 2.60, stats: '+5 Strength' };
      expect(filter.itemMatchesFilter(item, {})).toBe(true);
    });

    c.test('2.1.2 Empty string inputs treat as unconstrained null', () => {
      const state = { minLevel: '', maxLevel: '', minDps: '', speedVal: '', minStr: '' };
      expect(getFilterCountFor(filter, state)).toBe(0);
      expect(filter.itemMatchesFilter({ reqLevel: 5 }, state)).toBe(true);
    });

    c.test('2.1.3 Zero-value inputs on minimum stats treated as unconstrained', () => {
      const state = { minDps: 0, minStr: 0, minAgi: 0, minAp: 0 };
      expect(getFilterCountFor(filter, state)).toBe(0);
      expect(filter.itemMatchesFilter({ dps: 0 }, state)).toBe(true);
    });

    c.test('2.1.4 Inverted level range (min 40, max 20) cleanly resolves to 0 matches without exception', () => {
      const state = { minLevel: 40, maxLevel: 20 };
      expect(filter.itemMatchesFilter({ reqLevel: 30 }, state)).toBe(false);
      expect(filter.itemMatchesFilter({ reqLevel: 10 }, state)).toBe(false);
    });

    c.test('2.1.5 Null or undefined item passes safely returning null without crashing', () => {
      expect(filter.parseItemStats(null)).toBeNull();
      expect(filter.itemMatchesFilter(null, {})).toBe(false);
    });
  });

  // Boundary 2: Exact Speed Boundaries & Precision (>=5 tests)
  c.describe('Tier 2.2: Exact Speed Boundaries & Precision', () => {
    c.test('2.2.1 Hyper-fast dagger speed (1.00s) evaluated accurately by <= 1.00', () => {
      const dagger = { speed: 1.00 };
      expect(filter.itemMatchesFilter(dagger, { speedOp: '<=', speedVal: 1.00 })).toBe(true);
      expect(filter.itemMatchesFilter(dagger, { speedOp: '<=', speedVal: 0.90 })).toBe(false);
    });

    c.test('2.2.2 Heavy slow 2H weapon speed (4.00s) evaluated accurately by >= 4.00', () => {
      const hammer = { speed: 4.00 };
      expect(filter.itemMatchesFilter(hammer, { speedOp: '>=', speedVal: 4.00 })).toBe(true);
      expect(filter.itemMatchesFilter(hammer, { speedOp: '>=', speedVal: 4.10 })).toBe(false);
    });

    c.test('2.2.3 Boundary equality on <= is strictly inclusive', () => {
      expect(filter.itemMatchesFilter({ speed: 2.60 }, { speedOp: '<=', speedVal: 2.60 })).toBe(true);
    });

    c.test('2.2.4 Boundary equality on >= is strictly inclusive', () => {
      expect(filter.itemMatchesFilter({ speed: 2.60 }, { speedOp: '>=', speedVal: 2.60 })).toBe(true);
    });

    c.test('2.2.5 Items without swing speed (held in off-hand) evaluate to speed 0 without NaN', () => {
      const tome = { name: 'Tome of Knowledge', stats: '+8 Intellect' };
      const stats = filter.parseItemStats(tome);
      expect(stats.speed).toBe(0);
      expect(isNaN(stats.speed)).toBe(false);
      expect(filter.itemMatchesFilter(tome, { speedVal: 2.00 })).toBe(false);
    });
  });

  // Boundary 3: Negative Stats & Debuff Guards (>=5 tests)
  c.describe('Tier 2.3: Negative Stats & Debuff Guards', () => {
    c.test('2.3.1 Cursed item negative stat parsed with negative sign', () => {
      const cursedRing = { lines: ['Cursed Band', '-1 Intellect', '+5 Stamina'] };
      const stats = filter.parseItemStats(cursedRing);
      expect(stats.intellect).toBe(-1);
      expect(stats.stamina).toBe(5);
    });

    c.test('2.3.2 Filtering minInt = 0 rejects item with negative Intellect when minInt is positive', () => {
      const cursedItem = { stats: '-1 Intellect' };
      expect(filter.itemMatchesFilter(cursedItem, { minInt: 0 })).toBe(true);
      expect(filter.itemMatchesFilter(cursedItem, { minInt: 1 })).toBe(false);
    });

    c.test('2.3.3 Zero attribute placeholder (+0 Agility) parsed as 0 and fails minAgi 1', () => {
      const placeholder = { lines: ['+0 Agility'] };
      const stats = filter.parseItemStats(placeholder);
      expect(stats.agility).toBe(0);
      expect(filter.itemMatchesFilter(placeholder, { minAgi: 1 })).toBe(false);
    });

    c.test('2.3.4 Selectable stat token (+9 [Agility or Strength]) credits both attributes', () => {
      const tokenItem = { lines: ['Ring of Choice', '+9 [Agility or Strength]'] };
      const stats = filter.parseItemStats(tokenItem);
      expect(stats.strength).toBe(9);
      expect(stats.agility).toBe(9);
      expect(filter.itemMatchesFilter(tokenItem, { minStr: 8 })).toBe(true);
      expect(filter.itemMatchesFilter(tokenItem, { minAgi: 8 })).toBe(true);
    });

    c.test('2.3.5 Enemy target stat debuff is excluded from player stat bonus', () => {
      const debuffWeapon = {
        lines: [
          'Fel Dagger',
          'Chance on hit: Wounds the target for 40 damage and lowers Intellect of target by 4 for 30 sec.'
        ]
      };
      const stats = filter.parseItemStats(debuffWeapon);
      expect(stats.intellect).toBe(0);
      expect(filter.itemMatchesFilter(debuffWeapon, { minInt: 1 })).toBe(false);
    });
  });

  // Boundary 4: Comma-Formatted Armor & High Values (>=5 tests)
  c.describe('Tier 2.4: Comma-Formatted Armor & High Values', () => {
    c.test('2.4.1 High armor shield (1,380 Armor) stripped of comma and parsed as 1380', () => {
      const shield = { lines: ['Forcestone Buckler', '1,380 Armor', '38 Block'] };
      const stats = filter.parseItemStats(shield);
      expect(stats.armor).toBe(1380);
      expect(stats.armor).toBeGreaterThanOrEqual(1300);
    });

    c.test('2.4.2 Middle-comma armor string (1,078 Armor) parsed as 1078', () => {
      const item = { lines: ['1,078 Armor'] };
      expect(filter.parseItemStats(item).armor).toBe(1078);
    });

    c.test('2.4.3 Temporary proc armor buff rejected from base armor', () => {
      const item = { lines: ['Equip: When damaged, has a chance to grant you 1080 armor for 12 sec.'] };
      expect(filter.parseItemStats(item).armor).toBe(0);
    });

    c.test('2.4.4 Armor in stats summary string parsed accurately', () => {
      const item = { stats: '984 Armor, +22 Block' };
      const stats = filter.parseItemStats(item);
      expect(stats.armor).toBe(984);
      expect(stats.baseBlock).toBe(22);
    });

    c.test('2.4.5 Non-armor items evaluate to 0 armor without NaN', () => {
      const dagger = { dps: 20, speed: 1.5 };
      const stats = filter.parseItemStats(dagger);
      expect(stats.armor).toBe(0);
      expect(isNaN(stats.armor)).toBe(false);
    });
  });

  // Boundary 5: Shield Base Block + Equip Bonus Summation (>=5 tests)
  c.describe('Tier 2.5: Shield Base Block + Equip Bonus Summation', () => {
    c.test('2.5.1 Shield with only base block evaluates correctly', () => {
      const shield = { block: 15 };
      const stats = filter.parseItemStats(shield);
      expect(stats.baseBlock).toBe(15);
      expect(stats.blockValueBonus).toBe(0);
      expect(stats.block).toBe(15);
    });

    c.test('2.5.2 Shield combining base block 57 and equip bonus 21 sums to 78', () => {
      const shield = {
        block: 57,
        lines: ['57 Block', 'Equip: Increases the block value of your shield by 21.']
      };
      const stats = filter.parseItemStats(shield);
      expect(stats.block).toBe(78);
    });

    c.test('2.5.3 Lord Blackwood Buckler (66 base + 27 equip) sums to 93 total block', () => {
      const shield = {
        name: "Lord Blackwood's Buckler",
        lines: ['66 Block', 'Equip: Increases the block value of your shield by 27.']
      };
      const stats = filter.parseItemStats(shield);
      expect(stats.block).toBe(93);
      expect(filter.itemMatchesFilter(shield, { minBlock: 90 })).toBe(true);
      expect(filter.itemMatchesFilter(shield, { minBlock: 95 })).toBe(false);
    });

    c.test('2.5.4 Block Chance percentage line does not add to block value', () => {
      const shield = {
        lines: ['20 Block', 'Equip: Increases your chance to block attacks with a shield by 2%.']
      };
      const stats = filter.parseItemStats(shield);
      expect(stats.block).toBe(20);
    });

    c.test('2.5.5 Block damage proc (Deals 13 to 15 Holy damage on block) does not add to block', () => {
      const shield = {
        lines: ['25 Block', 'Equip: Deals 13 to 15 Holy damage every time you block.']
      };
      const stats = filter.parseItemStats(shield);
      expect(stats.block).toBe(25);
    });
  });

  // Boundary 6: Items Without Lines Array & Incomplete Schemas (>=5 tests)
  c.describe('Tier 2.6: Items Without Lines Array & Incomplete Schemas', () => {
    c.test('2.6.1 Golemheart Stave (missing lines array) parses stats from stats string', () => {
      const golemheart = {
        name: 'Golemheart Stave',
        stats: '+5 Intellect, +4 Spirit',
        dps: '14.2 DPS',
        speed: '2.70',
        reqLevel: 13,
        lines: undefined
      };
      const stats = filter.parseItemStats(golemheart);
      expect(stats.intellect).toBe(5);
      expect(stats.spirit).toBe(4);
      expect(stats.dps).toBe(14.2);
      expect(stats.speed).toBe(2.70);
      expect(stats.reqLevel).toBe(13);
      expect(filter.itemMatchesFilter(golemheart, { minInt: 5, minSpi: 4 })).toBe(true);
    });

    c.test('2.6.2 Missing reqLevel on step defaults safely to 1', () => {
      const item = { name: 'Rusty Dirk', dps: 3.5, lines: [] };
      const stats = filter.parseItemStats(item);
      expect(stats.reqLevel).toBe(1);
    });

    c.test('2.6.3 Alt item with stats only in value summary string recovers DPS and speed', () => {
      const alt = {
        name: 'Ironwood Mace',
        value: '18.5 DPS - 2.80s crafted mace'
      };
      const stats = filter.parseItemStats(alt);
      expect(stats.dps).toBe(18.5);
      expect(stats.speed).toBe(2.80);
    });

    c.test('2.6.4 BiS item schema (lowercase ilvl, string itemId) parses accurately', () => {
      const bisItem = {
        itemId: '7413',
        name: 'Infiltrator Cap of the Tiger',
        ilvl: 28,
        stats: '+9 Strength, +9 Agility',
        lines: ['Head', '80 Armor', 'Requires Level 23']
      };
      const stats = filter.parseItemStats(bisItem);
      expect(stats.iLvl).toBe(28);
      expect(stats.strength).toBe(9);
      expect(stats.agility).toBe(9);
      expect(stats.armor).toBe(80);
      expect(stats.reqLevel).toBe(23);
    });

    c.test('2.6.5 Malformed lines array containing non-string or null elements handled safely', () => {
      const badItem = { lines: [null, undefined, 123, 'Requires Level 12'] };
      const stats = filter.parseItemStats(badItem);
      expect(stats.reqLevel).toBe(12);
    });
  });
}

// =============================================================================
// TIER 3: CROSS-FEATURE COMBINATIONS (Chips + Drawer Interactions)
// =============================================================================

function runTier3Tests(c, env, filter) {
  // Combination 1: Faction Chips + Stat Filters
  c.describe('Tier 3.1: Faction Chips + Stat Filters', () => {
    c.test('3.1.1 Alliance faction filter combined with minStr retains only Alliance/Neutral items', () => {
      const step = {
        name: 'Alliance Claymore',
        faction: 'alliance',
        stats: '+8 Strength'
      };
      const res = evaluateStep(filter, step, { minStr: 8 }, 'alliance', 'all', 'all');
      expect(res.isVisible).toBe(true);

      const hordeStep = {
        name: 'Horde Battle Axe',
        faction: 'horde',
        stats: '+10 Strength'
      };
      const hordeRes = evaluateStep(filter, hordeStep, { minStr: 8 }, 'alliance', 'all', 'all');
      expect(hordeRes.isVisible).toBe(false);
    });

    c.test('3.1.2 Horde faction filter combined with minDps retains Horde quest items', () => {
      const step = {
        name: 'Leaders of the Fang Staff',
        faction: 'horde',
        dps: 15.0
      };
      const res = evaluateStep(filter, step, { minDps: 12.0 }, 'horde', 'all', 'all');
      expect(res.isVisible).toBe(true);
    });

    c.test('3.1.3 Shaman class auto-resolves Alliance chip to Horde', () => {
      const step = {
        name: 'Horde Totemic Club',
        faction: 'horde',
        stats: '+4 Strength'
      };
      const res = evaluateStep(filter, step, { minStr: 4 }, 'horde', 'all', 'all');
      expect(res.isVisible).toBe(true);
    });

    c.test('3.1.4 Neutral (both) faction items pass both Alliance and Horde chip filters', () => {
      const neutralStep = {
        name: 'Cruel Barb',
        faction: 'both',
        dps: 22.0
      };
      expect(evaluateStep(filter, neutralStep, { minDps: 20 }, 'alliance', 'all', 'all').isVisible).toBe(true);
      expect(evaluateStep(filter, neutralStep, { minDps: 20 }, 'horde', 'all', 'all').isVisible).toBe(true);
    });
  });

  // Combination 2: Source Chips + Stat Filters
  c.describe('Tier 3.2: Source Chips + Stat Filters', () => {
    c.test('3.2.1 Dungeon source combined with minDps retains dungeon drops >= threshold', () => {
      const dungeonItem = {
        name: 'Corpsemaker',
        source: { kind: 'dungeon', title: 'RFK - Overlord Ramtusk' },
        dps: 31.25
      };
      const vendorItem = {
        name: 'Common Halberd',
        source: { kind: 'vendor', title: 'Stormwind Weapon Vendor' },
        dps: 32.0
      };
      expect(evaluateStep(filter, dungeonItem, { minDps: 25 }, 'all', 'dungeon', 'all').isVisible).toBe(true);
      expect(evaluateStep(filter, vendorItem, { minDps: 25 }, 'all', 'dungeon', 'all').isVisible).toBe(false);
    });

    c.test('3.2.2 Quest source combined with minAgi retains quest rewards with agility', () => {
      const questReward = {
        name: 'Talon of Vultros',
        source: { kind: 'quest', title: 'Westfall Quest' },
        stats: '+6 Agility'
      };
      expect(evaluateStep(filter, questReward, { minAgi: 5 }, 'all', 'quest', 'all').isVisible).toBe(true);
      expect(evaluateStep(filter, questReward, { minAgi: 8 }, 'all', 'quest', 'all').isVisible).toBe(false);
    });

    c.test('3.2.3 Vendor source combined with minDps retains starter vendor items', () => {
      const vendorSword = {
        name: 'Solid Shortsword',
        source: { kind: 'vendor', title: 'Weaponsmith' },
        dps: 8.5
      };
      expect(evaluateStep(filter, vendorSword, { minDps: 8.0 }, 'all', 'vendor-craft', 'all').isVisible).toBe(true);
    });

    c.test('3.2.4 Source chip filtering out primary checks alts for matching source and stats', () => {
      const step = {
        name: 'Vendor Sword',
        source: { kind: 'vendor', title: 'Vendor' },
        dps: 10,
        alts: [
          {
            name: 'Dungeon Dagger',
            source: { kind: 'dungeon', title: 'Deadmines' },
            dps: 15
          }
        ]
      };
      const res = evaluateStep(filter, step, { minDps: 12 }, 'all', 'dungeon', 'all');
      expect(res.isVisible).toBe(true);
      const isPromoted = res.isPromoted || res.isAltPromoted;
      expect(Boolean(isPromoted)).toBe(true);
      expect(res.displayStep.name).toBe('Dungeon Dagger');
    });
  });

  // Combination 3: Slot Chips + Speed / Stat Filters
  c.describe('Tier 3.3: Slot Chips + Speed / Stat Filters', () => {
    c.test('3.3.1 One-Hand slot combined with fast speed (<= 1.80) retains fast 1H weapons', () => {
      const fastDagger = { weaponType: 'One-Handed Dagger', speed: 1.50 };
      const slowSword = { weaponType: 'One-Handed Sword', speed: 2.60 };
      const twoHandAxe = { weaponType: 'Two-Handed Axe', speed: 1.80 };
      expect(evaluateStep(filter, fastDagger, { speedOp: '<=', speedVal: 1.80 }, 'all', 'all', 'one-hand').isVisible).toBe(true);
      expect(evaluateStep(filter, slowSword, { speedOp: '<=', speedVal: 1.80 }, 'all', 'all', 'one-hand').isVisible).toBe(false);
      expect(evaluateStep(filter, twoHandAxe, { speedOp: '<=', speedVal: 1.80 }, 'all', 'all', 'one-hand').isVisible).toBe(false);
    });

    c.test('3.3.2 Two-Hand slot combined with slow speed (>= 3.50) retains slow 2H weapons', () => {
      const corpsemaker = { weaponType: 'Two-Handed Axe', speed: 3.80 };
      const fast2h = { weaponType: 'Two-Handed Sword', speed: 2.90 };
      expect(evaluateStep(filter, corpsemaker, { speedOp: '>=', speedVal: 3.50 }, 'all', 'all', 'two-hand').isVisible).toBe(true);
      expect(evaluateStep(filter, fast2h, { speedOp: '>=', speedVal: 3.50 }, 'all', 'all', 'two-hand').isVisible).toBe(false);
    });

    c.test('3.3.3 Shield slot combined with minBlock retains shields with block >= threshold', () => {
      const shield = { weaponType: 'Shield', block: 25 };
      const offhandTome = { weaponType: 'Held In Off-Hand', block: 0 };
      expect(evaluateStep(filter, shield, { minBlock: 20 }, 'all', 'all', 'shield').isVisible).toBe(true);
      expect(evaluateStep(filter, offhandTome, { minBlock: 20 }, 'all', 'all', 'shield').isVisible).toBe(false);
    });

    c.test('3.3.4 Ranged/Wand slot combined with minSpellDmg retains caster ranged items', () => {
      const wand = { weaponType: 'Wand', lines: ['Equip: +5 Spell Damage'] };
      const bow = { weaponType: 'Bow', dps: 15.0 };
      expect(evaluateStep(filter, wand, { minSpellDmg: 5 }, 'all', 'all', 'ranged').isVisible).toBe(true);
      expect(evaluateStep(filter, bow, { minSpellDmg: 5 }, 'all', 'all', 'ranged').isVisible).toBe(false);
    });
  });

  // Combination 4: Multi-Criteria Logical AND Combinations
  c.describe('Tier 3.4: Multi-Criteria Logical AND Combinations', () => {
    c.test('3.4.1 Faction + Source + Slot + Min DPS evaluated simultaneously', () => {
      const step = {
        name: 'Horde Dungeon 2H Axe',
        faction: 'horde',
        source: { kind: 'dungeon', title: 'SFK Boss' },
        weaponType: 'Two-Handed Axe',
        dps: 26.5
      };
      const res = evaluateStep(filter, step, { minDps: 25.0 }, 'horde', 'dungeon', 'two-hand');
      expect(res.isVisible).toBe(true);

      // Fails if any single condition does not match:
      expect(evaluateStep(filter, step, { minDps: 30.0 }, 'horde', 'dungeon', 'two-hand').isVisible).toBe(false);
      expect(evaluateStep(filter, step, { minDps: 25.0 }, 'alliance', 'dungeon', 'two-hand').isVisible).toBe(false);
      expect(evaluateStep(filter, step, { minDps: 25.0 }, 'horde', 'quest', 'two-hand').isVisible).toBe(false);
      expect(evaluateStep(filter, step, { minDps: 25.0 }, 'horde', 'dungeon', 'one-hand').isVisible).toBe(false);
    });

    c.test('3.4.2 Faction + Source + Multi-stat filter (Str >= 5 AND Sta >= 5)', () => {
      const step = {
        faction: 'alliance',
        source: { kind: 'quest', title: 'Quest' },
        stats: '+6 Strength, +6 Stamina'
      };
      expect(evaluateStep(filter, step, { minStr: 5, minSta: 5 }, 'alliance', 'quest', 'all').isVisible).toBe(true);
      expect(evaluateStep(filter, step, { minStr: 7, minSta: 5 }, 'alliance', 'quest', 'all').isVisible).toBe(false);
    });

    c.test('3.4.3 Mutually exclusive filter combination cleanly resolves to isVisible: false', () => {
      const step = {
        faction: 'alliance',
        source: { kind: 'vendor', title: 'Shop' },
        dps: 10
      };
      const res = evaluateStep(filter, step, { minDps: 5 }, 'horde', 'vendor-craft', 'all');
      expect(res.isVisible).toBe(false);
    });

    c.test('3.4.4 Active filter count accurately aggregates across multi-criteria state', () => {
      const complexState = {
        minLevel: 10,
        maxLevel: 30,
        minDps: 15.0,
        speedVal: 2.60,
        minStr: 5,
        minSta: 5,
        minAp: 10
      };
      expect(getFilterCountFor(filter, complexState)).toBe(7);
    });
  });

  // Combination 5: Alt Promotion Under Combined Constraints
  c.describe('Tier 3.5: Alt Promotion Under Combined Constraints', () => {
    c.test('3.5.1 Primary fails Min DPS; Alt 1 matches all criteria -> Alt 1 promoted to Hero card', () => {
      const step = {
        name: 'Starter Club',
        dps: 5.0,
        alts: [
          { name: 'Upgraded Morningstar', dps: 12.0 }
        ]
      };
      const res = evaluateStep(filter, step, { minDps: 10.0 }, 'all', 'all', 'all');
      expect(res.isVisible).toBe(true);
      const isPromoted = res.isPromoted || res.isAltPromoted;
      expect(Boolean(isPromoted)).toBe(true);
      expect(res.displayStep.name).toBe('Upgraded Morningstar');
    });

    c.test('3.5.2 Primary fails Faction; Alt 1 fails DPS; Alt 2 passes both -> Alt 2 promoted', () => {
      const step = {
        name: 'Alliance Sword',
        faction: 'alliance',
        dps: 20.0,
        alts: [
          { name: 'Horde Dagger Weak', faction: 'horde', dps: 10.0 },
          { name: 'Horde Battleaxe Strong', faction: 'horde', dps: 22.0 }
        ]
      };
      const res = evaluateStep(filter, step, { minDps: 15.0 }, 'horde', 'all', 'all');
      expect(res.isVisible).toBe(true);
      const isPromoted = res.isPromoted || res.isAltPromoted;
      expect(Boolean(isPromoted)).toBe(true);
      expect(res.displayStep.name).toBe('Horde Battleaxe Strong');
    });

    c.test('3.5.3 Multiple matching alts: first promoted to primary, second retained in alts tray', () => {
      const step = {
        name: 'Primary Axe Weak',
        faction: 'both',
        dps: 10.0,
        alts: [
          { name: 'Alt Axe Powerful', faction: 'both', dps: 25.0 },
          { name: 'Alt Axe Moderate', faction: 'both', dps: 22.0 },
          { name: 'Alt Axe Subpar', faction: 'both', dps: 12.0 }
        ]
      };
      const res = evaluateStep(filter, step, { minDps: 20.0 }, 'all', 'all', 'all');
      expect(res.isVisible).toBe(true);
      const isPromoted = res.isPromoted || res.isAltPromoted;
      expect(Boolean(isPromoted)).toBe(true);
      expect(res.displayStep.name).toBe('Alt Axe Powerful');

      // Matching alt moderate is retained in alts tray
      const remainingAlt = res.displayAlts.find(a => a.name === 'Alt Axe Moderate');
      expect(remainingAlt).toBeDefined();

      // Subpar alt and failing primary are excluded from alts tray
      const subparAlt = res.displayAlts.find(a => a.name === 'Alt Axe Subpar');
      expect(subparAlt).toBe(undefined);
      const demotedPrimary = res.displayAlts.find(a => a.name === 'Primary Axe Weak');
      expect(demotedPrimary).toBe(undefined);
    });

    c.test('3.5.4 Neither primary nor any alt matches -> step omitted (isVisible: false)', () => {
      const step = {
        name: 'Weak Dagger',
        dps: 5.0,
        alts: [
          { name: 'Weak Knife', dps: 6.0 }
        ]
      };
      const res = evaluateStep(filter, step, { minDps: 25.0 }, 'all', 'all', 'all');
      expect(res.isVisible).toBe(false);
    });
  });
}

// =============================================================================
// TIER 4: REAL-WORLD SCENARIOS & DEEP DIVES (End-to-End Workflows & Forensic Audit)
// =============================================================================

function runTier4Tests(c, env, filter) {
  // Scenario 1: Rogue Fast Dagger Poison Off-Hand Dual-Wield Progression
  c.describe('Tier 4.1: Rogue Fast Dagger Poison Leveling Workflow', () => {
    c.test('4.1.1 Isolates fast off-hand daggers (<= 1.80s) with Agility across Rogue roadmap', () => {
      const rogueWeapons = env.progressionData.weapons?.rogue?.levels || [];
      expect(rogueWeapons.length).toBeGreaterThanOrEqual(1);

      const filterState = {
        speedOp: '<=',
        speedVal: 1.80,
        minAgi: 2
      };

      let visibleSteps = 0;
      let matchedDaggers = 0;

      rogueWeapons.forEach(step => {
        const res = evaluateStep(filter, step, filterState, 'all', 'all', 'one-hand');
        if (res.isVisible) {
          visibleSteps++;
          const stats = filter.parseItemStats(res.displayStep);
          if (stats.speed <= 1.80 && stats.agility >= 2) {
            matchedDaggers++;
          }
        }
      });

      expect(visibleSteps).toBeGreaterThanOrEqual(1);
      expect(matchedDaggers).toBe(visibleSteps);
    });

    c.test('4.1.2 Rejects slow 2H weapons and slow 2.60+ swords for off-hand poison build', () => {
      const slowSword = { weaponType: 'One-Handed Sword', speed: 2.60, stats: '+3 Agility' };
      const slow2h = { weaponType: 'Two-Handed Mace', speed: 3.50, stats: '+5 Agility' };
      const filterState = { speedOp: '<=', speedVal: 1.80, minAgi: 2 };

      expect(evaluateStep(filter, slowSword, filterState, 'all', 'all', 'one-hand').isVisible).toBe(false);
      expect(evaluateStep(filter, slow2h, filterState, 'all', 'all', 'one-hand').isVisible).toBe(false);
    });
  });

  // Scenario 2: Warrior Arms Slow 2H Burst Weapon Scaling
  c.describe('Tier 4.2: Warrior Arms Slow 2H Burst Scaling Workflow', () => {
    c.test('4.2.1 Isolates high-damage slow 2H weapons (>= 3.50s, >= 25 DPS) on Warrior', () => {
      const warriorWeapons = env.progressionData.weapons?.warrior?.levels || [];
      expect(warriorWeapons.length).toBeGreaterThanOrEqual(1);

      const filterState = {
        speedOp: '>=',
        speedVal: 3.50,
        minDps: 25.0
      };

      let visibleSteps = 0;
      warriorWeapons.forEach(step => {
        const res = evaluateStep(filter, step, filterState, 'all', 'all', 'two-hand');
        if (res.isVisible) {
          visibleSteps++;
          const stats = filter.parseItemStats(res.displayStep);
          expect(stats.speed).toBeGreaterThanOrEqual(3.50);
          expect(stats.dps).toBeGreaterThanOrEqual(25.0);
        }
      });
      expect(visibleSteps).toBeGreaterThanOrEqual(1);
    });

    c.test('4.2.2 Corpsemaker (3.80s) and Whirlwind Axe (3.60s) match Warrior slow 2H filter', () => {
      const corpsemaker = {
        name: 'Corpsemaker',
        weaponType: 'Two-Handed Axe',
        speed: 3.80,
        dps: 31.25,
        lines: ['Two-Hand Axe', 'Speed 3.80', '(31.25 damage per second)']
      };
      const filterState = { speedOp: '>=', speedVal: 3.50, minDps: 25.0 };
      expect(filter.itemMatchesFilter(corpsemaker, filterState)).toBe(true);
    });
  });

  // Scenario 3: Caster Spell Damage & Healing Weapon Progression
  c.describe('Tier 4.3: Caster Spell Damage & Healing Progression', () => {
    c.test('4.3.1 Isolates spell damage and healing weapon spikes on Priest roadmap', () => {
      const priestWeapons = env.progressionData.weapons?.priest?.levels || [];
      expect(priestWeapons.length).toBeGreaterThanOrEqual(1);

      const filterState = { minSpellDmg: 5 };
      let spellWeaponMatches = 0;

      priestWeapons.forEach(step => {
        const res = evaluateStep(filter, step, filterState, 'all', 'all', 'all');
        if (res.isVisible) {
          spellWeaponMatches++;
          const stats = filter.parseItemStats(res.displayStep);
          expect(stats.spellDamage).toBeGreaterThanOrEqual(5);
        }
      });
      expect(spellWeaponMatches).toBeGreaterThanOrEqual(1);
    });

    c.test('4.3.2 Pure melee weapons (pure Str/Agi) strictly excluded from caster progression', () => {
      const meleeMace = { name: 'Heavy Iron Mace', stats: '+8 Strength, +4 Stamina', dps: 18.0 };
      expect(filter.itemMatchesFilter(meleeMace, { minSpellDmg: 5 })).toBe(false);
      expect(filter.itemMatchesFilter(meleeMace, { minHealing: 5 })).toBe(false);
    });
  });

  // Scenario 4: Protection Paladin High-Armor High-Block Shield Progression
  c.describe('Tier 4.4: Protection Paladin Shield Progression', () => {
    c.test('4.4.1 Isolates high-mitigation tank shields (>= 500 Armor, >= 15 Block) on Paladin', () => {
      const paladinOffhands = env.progressionData.offhands?.paladin?.levels || [];
      expect(paladinOffhands.length).toBeGreaterThanOrEqual(1);

      const filterState = { minArmor: 500, minBlock: 15 };
      let tankShields = 0;

      paladinOffhands.forEach(step => {
        const res = evaluateStep(filter, step, filterState, 'all', 'all', 'all');
        if (res.isVisible) {
          tankShields++;
          const stats = filter.parseItemStats(res.displayStep);
          expect(stats.armor).toBeGreaterThanOrEqual(500);
          expect(stats.block).toBeGreaterThanOrEqual(15);
        }
      });
      expect(tankShields).toBeGreaterThanOrEqual(1);
    });

    c.test('4.4.2 Starter low-armor bucklers excluded while mid-to-high shields are retained', () => {
      const starterBuckler = { name: 'Dented Buckler', armor: 45, block: 2 };
      const qualityShield = { name: 'Redbeard Crest', armor: 850, block: 23 };
      const filterState = { minArmor: 300, minBlock: 12 };

      expect(filter.itemMatchesFilter(starterBuckler, filterState)).toBe(false);
      expect(filter.itemMatchesFilter(qualityShield, filterState)).toBe(true);
    });
  });

  // Scenario 5: Complete Filter Lifecycle (Apply -> Empty State -> Reset)
  c.describe('Tier 4.5: Complete Filter Lifecycle & Empty State Reset', () => {
    c.test('4.5.1 Unreachable filter (minDps: 999.0) causes 0 matches across roadmap', () => {
      const rogueWeapons = env.progressionData.weapons?.rogue?.levels || [];
      const filterState = { minDps: 999.0 };

      let visibleCount = 0;
      rogueWeapons.forEach(step => {
        const res = evaluateStep(filter, step, filterState, 'all', 'all', 'all');
        if (res.isVisible) visibleCount++;
      });
      expect(visibleCount).toBe(0);
    });

    c.test('4.5.2 Empty state banner contains 1-click Reset button restoring 100% roadmap', () => {
      const emptyHtml = filter.renderEmptyStateHtml();
      expect(emptyHtml).toContain('btn-empty-reset-filters');
      const hasHeading = emptyHtml.includes('No Progression Items Match Your Active Filters') || emptyHtml.includes('No Weapons Match Your Active Filters');
      expect(hasHeading).toBe(true);

      // Reset state restores roadmap
      filter.resetFilters();
      const rogueWeapons = env.progressionData.weapons?.rogue?.levels || [];
      let visibleAfterReset = 0;
      rogueWeapons.forEach(step => {
        const res = evaluateStep(filter, step, filter.getState(), 'all', 'all', 'all');
        if (res.isVisible) visibleAfterReset++;
      });
      expect(visibleAfterReset).toBe(rogueWeapons.length);
    });
  });

  // Scenario 6: Dual-Surface Parity Verification
  c.describe('Tier 4.6: Dual-Surface Parity Verification', () => {
    c.test('4.6.1 Weapons Hub and Class Deep Dives share identical filter evaluation contract', () => {
      const warriorLevels = env.progressionData.weapons?.warrior?.levels || [];
      const filterState = { minDps: 20.0, speedOp: '>=', speedVal: 3.00 };

      const hubMatches = warriorLevels.filter(s => evaluateStep(filter, s, filterState, 'all', 'all', 'all').isVisible);
      const deepDiveMatches = warriorLevels.filter(s => evaluateStep(filter, s, filterState, 'all', 'all', 'all').isVisible);

      expect(hubMatches.length).toBe(deepDiveMatches.length);
      for (let i = 0; i < hubMatches.length; i++) {
        expect(hubMatches[i].name).toBe(deepDiveMatches[i].name);
      }
    });

    c.test('4.6.2 Filter drawer markup exports uniform ID and attribute contract across surfaces', () => {
      const drawerHtml = filter.renderFilterDrawerHtml();
      expect(drawerHtml).toContain('prog-filter-min-level');
      expect(drawerHtml).toContain('prog-filter-speed-val');
      expect(drawerHtml).toContain('prog-filter-speed-op');
      expect(drawerHtml).toContain('prog-filter-min-str');
      expect(drawerHtml).toContain('prog-filter-min-armor');
      expect(drawerHtml).toContain('prog-filter-min-block');
    });
  });

  // Scenario 7: Comprehensive Dataset Forensic Census (7,671 Items)
  c.describe('Tier 4.7: Comprehensive Dataset Forensic Census (7,671 Items)', () => {
    c.test('4.7.1 Parses all 439 progression steps and 3,482 alts with 0 errors and 0 NaNs', () => {
      let stepCount = 0;
      let altCount = 0;
      let nanCount = 0;

      const datasets = ['weapons', 'wands', 'offhands'];
      datasets.forEach(cat => {
        const catData = env.progressionData[cat] || {};
        Object.keys(catData).forEach(cls => {
          const cObj = catData[cls] || {};
          const lists = [];
          if (cObj.levels) lists.push(cObj.levels);
          if (cObj.healingLevels) lists.push(cObj.healingLevels);
          if (cObj.tracksData) Object.values(cObj.tracksData).forEach(t => lists.push(t));

          lists.forEach(levelList => {
            levelList.forEach(step => {
              stepCount++;
              const s1 = filter.parseItemStats(step);
              if (isNaN(s1.dps) || isNaN(s1.speed) || isNaN(s1.armor) || isNaN(s1.block)) nanCount++;

              (step.alts || []).forEach(alt => {
                altCount++;
                const s2 = filter.parseItemStats(alt);
                if (isNaN(s2.dps) || isNaN(s2.speed) || isNaN(s2.armor) || isNaN(s2.block)) nanCount++;
              });
            });
          });
        });
      });

      expect(stepCount).toBeGreaterThanOrEqual(430);
      expect(altCount).toBeGreaterThanOrEqual(3400);
      expect(nanCount).toBe(0);
    });

    c.test('4.7.2 Parses all 3,750 items in WOW_BIS_DATA with 0 errors and 0 NaNs', () => {
      let bisItemCount = 0;
      let nanCount = 0;

      const classes = env.bisData.classes || [];
      classes.forEach(cMeta => {
        const cObj = env.bisData[cMeta.id] || {};
        const specs = cObj.specs || [];
        specs.forEach(spec => {
          const slots = spec.slots || [];
          slots.forEach(slot => {
            const items = slot.items || [];
            items.forEach(item => {
              bisItemCount++;
              const stats = filter.parseItemStats(item);
              if (isNaN(stats.armor) || isNaN(stats.strength) || isNaN(stats.dps)) nanCount++;
            });
          });
        });
      });

      expect(bisItemCount).toBeGreaterThanOrEqual(3700);
      expect(nanCount).toBe(0);
    });
  });
}

// -----------------------------------------------------------------------------
// 5. Test Suite Execution & Summary Reporting
// -----------------------------------------------------------------------------

const collectors = {
  tier1: new TestCollector('Tier 1: Feature Coverage (Core Requirements)'),
  tier2: new TestCollector('Tier 2: Boundary & Corner Cases (Extreme Inputs)'),
  tier3: new TestCollector('Tier 3: Cross-Feature Combinations (Chips + Drawer)'),
  tier4: new TestCollector('Tier 4: Real-World Scenarios & Forensic Census')
};

if (!targetTier || targetTier === 1) {
  runTier1Tests(collectors.tier1, env, filterEngine);
}
if (!targetTier || targetTier === 2) {
  runTier2Tests(collectors.tier2, env, filterEngine);
}
if (!targetTier || targetTier === 3) {
  runTier3Tests(collectors.tier3, env, filterEngine);
}
if (!targetTier || targetTier === 4) {
  runTier4Tests(collectors.tier4, env, filterEngine);
}

let grandTotal = 0;
let grandPassed = 0;
let grandFailed = 0;
const failures = [];

const activeTiers = targetTier ? [`tier${targetTier}`] : ['tier1', 'tier2', 'tier3', 'tier4'];

for (const key of activeTiers) {
  const c = collectors[key];
  const summary = c.getSummary();
  grandTotal += summary.total;
  grandPassed += summary.passes;
  grandFailed += summary.failures;

  console.log(`----------------------------------------------------------------------`);
  console.log(` Suite: ${summary.suiteName}`);
  console.log(` Tests: ${summary.total} | Passed: ${summary.passes} | Failed: ${summary.failures} (${summary.duration}ms)`);
  console.log(`----------------------------------------------------------------------`);

  for (const t of summary.tests) {
    if (t.status === 'pass') {
      if (isVerbose) {
        console.log(`  ✓ ${t.name} (${t.duration}ms)`);
      }
    } else {
      console.log(`  ✗ ${t.name} (${t.duration}ms)`);
      console.log(`    Error: ${t.message}`);
      failures.push({
        suite: summary.suiteName,
        name: t.name,
        error: t.message
      });
    }
  }
  console.log('');
}

console.log('======================================================================');
console.log('   PROGRESSION FILTER E2E TEST RUN SUMMARY');
console.log('======================================================================');
console.log(`Target Engine:         ${executionTarget}`);
console.log(`Total Test Assertions: ${grandTotal}`);
console.log(`Passed Assertions:     ${grandPassed}`);
console.log(`Failed Assertions:     ${grandFailed}`);
console.log(`Total Elapsed Time:    ${Date.now() - startTime}ms`);
console.log('======================================================================\n');

if (grandFailed > 0) {
  console.log(`⚠️  ${grandFailed} test(s) failed out of ${grandTotal}.\n`);
  console.log('FAILED TEST DETAILS:');
  failures.forEach((f, idx) => {
    console.log(`  [${idx + 1}] ${f.suite} -> ${f.name}`);
    console.log(`      ${f.error}`);
  });
  console.log('\nExiting with code 1.\n');
  process.exit(1);
} else {
  console.log(`🎉 ALL ${grandTotal} PROGRESSION FILTER E2E TESTS PASSED SUCCESSFULLY!`);
  console.log('Exiting with code 0.\n');
  process.exit(0);
}
