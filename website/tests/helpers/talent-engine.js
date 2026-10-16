/**
 * Pure-logic Talent Engine & Legality Validator
 * Enforces authoritative Vanilla/Camelot talent rules without UI/DOM dependencies:
 * - Tier Gating: spending in row R requires >= 5 * (R - 1) points already in tree
 * - Prerequisite Satisfaction: req talent must be allocated to full maxRank
 * - MaxRank Bounds: cannot exceed maxRank
 * - Total Budget Cap: level 30 baseline 21 points, perk cap 26 points
 * - Canonical Serialization: nodes sorted by (row ASC, col ASC) per tree
 */

export function getTreeTalentsSorted(talents, treeIndex) {
  return talents
    .filter(t => t.tree === treeIndex)
    .sort((a, b) => a.row - b.row || a.col - b.col);
}

export function parseBuildUrl(talents, buildUrl) {
  const points = {};
  if (!buildUrl || typeof buildUrl !== 'string') return points;

  let cleanStr = buildUrl;
  const match = buildUrl.match(/[?&]build=([^&]+)/);
  if (match) {
    cleanStr = decodeURIComponent(match[1]);
  } else if (cleanStr.includes('#')) {
    cleanStr = cleanStr.split('#')[1];
  }

  const treeParts = cleanStr.split('-');
  for (let treeIdx = 0; treeIdx < 3; treeIdx++) {
    const part = treeParts[treeIdx] || '';
    const sortedTalents = getTreeTalentsSorted(talents, treeIdx);
    for (let i = 0; i < part.length && i < sortedTalents.length; i++) {
      const val = parseInt(part[i], 10);
      if (!isNaN(val) && val > 0) {
        const talent = sortedTalents[i];
        points[talent.id] = Math.min(val, talent.maxRank);
      }
    }
  }
  return points;
}

export function serializeBuild(talents, points) {
  const parts = [];
  for (let treeIdx = 0; treeIdx < 3; treeIdx++) {
    const sortedTalents = getTreeTalentsSorted(talents, treeIdx);
    let str = '';
    for (const t of sortedTalents) {
      const pts = points[t.id] || 0;
      str += pts.toString();
    }
    // Trim trailing zeros
    str = str.replace(/0+$/, '');
    parts.push(str);
  }
  return parts.join('-');
}

export function getTreePoints(talents, points, treeIndex) {
  let sum = 0;
  for (const t of talents) {
    if (t.tree === treeIndex) {
      sum += (points[t.id] || 0);
    }
  }
  return sum;
}

export function getTotalPoints(points) {
  let sum = 0;
  for (const id in points) {
    sum += (points[id] || 0);
  }
  return sum;
}

export function canAllocatePoint(talents, points, talentId, maxBudget = 26) {
  const talent = talents.find(t => t.id === talentId);
  if (!talent) return { allowed: false, reason: `Talent ID ${talentId} not found` };

  const currentRank = points[talent.id] || 0;
  if (currentRank >= talent.maxRank) {
    return { allowed: false, reason: `Already at maxRank (${talent.maxRank})` };
  }

  const total = getTotalPoints(points);
  if (total >= maxBudget) {
    return { allowed: false, reason: `Exceeds max talent budget of ${maxBudget} points` };
  }

  // Tier Gating check
  const treePts = getTreePoints(talents, points, talent.tree);
  const requiredTreePts = (talent.row - 1) * 5;
  if (treePts < requiredTreePts) {
    return {
      allowed: false,
      reason: `Tier gating unmet: row ${talent.row} requires ${requiredTreePts} points in tree, currently have ${treePts}`
    };
  }

  // Prerequisite check
  if (talent.req !== null && talent.req !== undefined) {
    const reqTalent = talents.find(t => t.id === talent.req);
    if (!reqTalent) {
      return { allowed: false, reason: `Prerequisite talent ID ${talent.req} not found` };
    }
    const reqRank = points[reqTalent.id] || 0;
    if (reqRank < reqTalent.maxRank) {
      return {
        allowed: false,
        reason: `Prerequisite "${reqTalent.name}" not maxed (${reqRank}/${reqTalent.maxRank})`
      };
    }
  }

  return { allowed: true };
}

export function canRefundPoint(talents, points, talentId) {
  const talent = talents.find(t => t.id === talentId);
  if (!talent) return { allowed: false, reason: `Talent ID ${talentId} not found` };

  const currentRank = points[talent.id] || 0;
  if (currentRank <= 0) {
    return { allowed: false, reason: `No points invested in ${talent.name}` };
  }

  // Check 1: Is this talent a prerequisite for any allocated talent?
  for (const other of talents) {
    if (other.req === talent.id && (points[other.id] || 0) > 0) {
      return {
        allowed: false,
        reason: `Cannot refund: "${other.name}" depends on "${talent.name}"`
      };
    }
  }

  // Check 2: Would refunding violate tier gates for higher row talents in this tree?
  // If we remove 1 point, tree points become treePts - 1.
  // For any row R > talent.row where talents have points invested, the points invested
  // in rows <= R - 1 must be >= 5 * (R - 1).
  const simulatedPoints = { ...points, [talent.id]: currentRank - 1 };
  const treeTalents = talents.filter(t => t.tree === talent.tree);

  let cumulativePoints = 0;
  for (let r = 1; r <= 7; r++) {
    const rowTalents = treeTalents.filter(t => t.row === r);
    const rowPoints = rowTalents.reduce((sum, t) => sum + (simulatedPoints[t.id] || 0), 0);

    // If higher rows have points, cumulative points up to this row must satisfy the gate of next row
    const higherRowPoints = treeTalents
      .filter(t => t.row > r)
      .reduce((sum, t) => sum + (simulatedPoints[t.id] || 0), 0);

    cumulativePoints += rowPoints;

    if (higherRowPoints > 0 && cumulativePoints < r * 5) {
      return {
        allowed: false,
        reason: `Cannot refund: higher row talents require at least ${r * 5} points invested in rows 1-${r}`
      };
    }
  }

  return { allowed: true };
}

/**
 * Validates full legality of a static points allocation
 */
export function validateBuildLegality(talents, points, maxBudget = 26) {
  const errors = [];
  const total = getTotalPoints(points);
  if (total > maxBudget) {
    errors.push(`Total points (${total}) exceeds budget cap (${maxBudget})`);
  }

  // Validate each tree
  for (let treeIdx = 0; treeIdx < 3; treeIdx++) {
    const treeTalents = talents.filter(t => t.tree === treeIdx);

    // Check prerequisites
    for (const t of treeTalents) {
      const allocated = points[t.id] || 0;
      if (allocated > t.maxRank) {
        errors.push(`Talent "${t.name}" allocated ${allocated} points, exceeds maxRank ${t.maxRank}`);
      }
      if (allocated > 0 && t.req) {
        const reqTalent = talents.find(r => r.id === t.req);
        if (!reqTalent) {
          errors.push(`Talent "${t.name}" references non-existent prerequisite ID ${t.req}`);
        } else {
          const reqAlloc = points[reqTalent.id] || 0;
          if (reqAlloc < reqTalent.maxRank) {
            errors.push(`Talent "${t.name}" requires maxed "${reqTalent.name}" (${reqAlloc}/${reqTalent.maxRank})`);
          }
        }
      }
    }

    // Check tier gating:
    // In Vanilla, total points spent in rows 1..(R-1) must be >= 5 * (R-1) to spend points in row R.
    let pointsInLowerRows = 0;
    for (let r = 1; r <= 7; r++) {
      const rowTalents = treeTalents.filter(t => t.row === r);
      const rowAlloc = rowTalents.reduce((sum, t) => sum + (points[t.id] || 0), 0);

      if (rowAlloc > 0) {
        const reqPoints = (r - 1) * 5;
        if (pointsInLowerRows < reqPoints) {
          errors.push(
            `Tree ${treeIdx} Row ${r} has ${rowAlloc} points allocated, but only ${pointsInLowerRows} points in prior rows (requires ${reqPoints})`
          );
        }
      }
      pointsInLowerRows += rowAlloc;
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
