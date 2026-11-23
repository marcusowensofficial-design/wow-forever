/**
 * World of Warcraft: Forever - Structured Disenchant Yields
 * The same brackets as WOW_DISENCHANT_TABLE (professions-reference-data.js), with item ids so
 * expected values can be priced from the AH. Each yield entry is [itemId, chance, min, max]:
 * `chance` is the probability (0-1) of that material, `min`-`max` how many you get.
 *   q: 2 uncommon (green), 3 rare (blue), 4 epic (purple)
 *   armor applies to armor, jewelry, off-hands and shields; weapon to weapons.
 * The last bracket of each quality runs to max 999 so higher item levels still match.
 */
window.WOW_DISENCHANT_YIELDS = (function () {
  const D = { strange: 10940, soul: 11083, vision: 11137, dream: 11176, illusion: 16204 };
  const E = {
    lMagic: 10938, gMagic: 10939, lAstral: 10998, gAstral: 11082, lMystic: 11134,
    gMystic: 11135, lNether: 11174, gNether: 11175, lEternal: 16202, gEternal: 16203
  };
  const S = {
    sGlimmer: 10978, lGlimmer: 11084, sGlow: 11138, lGlow: 11139, sRadiant: 11177,
    lRadiant: 11178, sBrilliant: 14343, lBrilliant: 14344, nexus: 20725
  };

  // Green bracket: armor favors dust, weapons favor essence (the two chances swap).
  function green(min, max, skill, dust, dMin, dMax, ess, eMin, eMax, dustPct, essPct, shard, shardPct) {
    const sh = shard ? [[shard, shardPct, 1, 1]] : [];
    return {
      q: 2, min, max, skill,
      armor: [[dust, dustPct, dMin, dMax], [ess, essPct, eMin, eMax], ...sh],
      weapon: [[dust, essPct, dMin, dMax], [ess, dustPct, eMin, eMax], ...sh]
    };
  }
  function same(q, min, max, skill, yields) {
    return { q, min, max, skill, armor: yields, weapon: yields };
  }

  const brackets = [
    green(5, 15, 1, D.strange, 1, 2, E.lMagic, 1, 2, 0.8, 0.2, 0, 0),
    green(16, 20, 25, D.strange, 2, 3, E.gMagic, 1, 2, 0.75, 0.2, S.sGlimmer, 0.05),
    green(21, 25, 25, D.strange, 4, 6, E.lAstral, 1, 2, 0.75, 0.15, S.sGlimmer, 0.1),
    green(26, 30, 50, D.soul, 1, 2, E.gAstral, 1, 2, 0.75, 0.2, S.lGlimmer, 0.05),
    green(31, 35, 75, D.soul, 2, 5, E.lMystic, 1, 2, 0.75, 0.2, S.sGlow, 0.05),
    green(36, 40, 100, D.vision, 1, 2, E.gMystic, 1, 2, 0.75, 0.2, S.lGlow, 0.05),
    green(41, 45, 125, D.vision, 2, 5, E.lNether, 1, 2, 0.75, 0.2, S.sRadiant, 0.05),
    green(46, 50, 150, D.dream, 1, 2, E.gNether, 1, 2, 0.75, 0.2, S.lRadiant, 0.05),
    green(51, 55, 175, D.dream, 2, 5, E.lEternal, 1, 2, 0.75, 0.2, S.sBrilliant, 0.05),
    green(56, 60, 200, D.illusion, 1, 2, E.gEternal, 1, 2, 0.75, 0.2, S.lBrilliant, 0.05),
    green(61, 999, 225, D.illusion, 2, 5, E.gEternal, 2, 3, 0.75, 0.2, S.lBrilliant, 0.05),

    same(3, 16, 25, 25, [[S.sGlimmer, 1, 1, 1]]),
    same(3, 26, 30, 50, [[S.lGlimmer, 1, 1, 1]]),
    same(3, 31, 35, 75, [[S.sGlow, 1, 1, 1]]),
    same(3, 36, 40, 100, [[S.lGlow, 1, 1, 1]]),
    same(3, 41, 45, 125, [[S.sRadiant, 1, 1, 1]]),
    same(3, 46, 50, 150, [[S.lRadiant, 1, 1, 1]]),
    same(3, 51, 55, 175, [[S.sBrilliant, 1, 1, 1]]),
    same(3, 56, 999, 200, [[S.lBrilliant, 0.995, 1, 1], [S.nexus, 0.005, 1, 1]]),

    // Epics 40-55 give 2-4 shards, by tier (the reference table lists these as one row).
    same(4, 40, 45, 125, [[S.sRadiant, 1, 2, 4]]),
    same(4, 46, 50, 125, [[S.lRadiant, 1, 2, 4]]),
    same(4, 51, 55, 125, [[S.sBrilliant, 1, 2, 4]]),
    // Classic: 56-60 epics give exactly 1 Nexus Crystal, 61+ give 1-2.
    same(4, 56, 60, 225, [[S.nexus, 1, 1, 1]]),
    same(4, 61, 999, 225, [[S.nexus, 1, 1, 2]])
  ];

  const materials = {};
  for (const [k, id] of Object.entries({ ...D, ...E, ...S })) materials[id] = k;

  return { brackets, materials };
})();
