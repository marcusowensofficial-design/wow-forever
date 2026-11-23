/**
 * World of Warcraft: Forever - User Submitted Talent Builds
 *
 * Site-wide community builds displayed under each class in the Talent Calculator
 * ("User Submitted Builds" button next to the 3 specialization presets).
 *
 * How to publish a new build submitted by you or a friend:
 *   1. Open the Talent Calculator -> "User Submitted Builds" -> "Submit a Build"
 *      and click "Copy Site Entry", OR paste an object manually under the class key below.
 *   2. Required fields: id, name, author, capMode ('lvl60' | 'lvl30_perk' | 'lvl30_base'), buildUrl.
 *      Optional: spec (auto-detected from the primary talent tree, e.g. 'Frost', 'Fire', 'Arcane'), notes.
 *   3. Run `node scripts/validate.js` to verify talent legality before deploying.
 */
if (typeof window !== 'undefined') {
  window.WOW_USER_SUBMITTED_BUILDS = {
    warrior: [],
    paladin: [],
    hunter: [],
    rogue: [],
    priest: [],
    shaman: [],
    mage: [
      {
        id: 'marcus-60-frost-mage-build',
        name: 'Marcus 60 frost mage build',
        author: 'Marcus',
        spec: 'Frost',
        capMode: 'lvl60',
        buildUrl: '/talents/mage?b=0500052--053530033121311251&l=30&tl=5',
        submittedAt: '2026-11-23',
        notes: '12/0/39 Arcane/Frost — Improved Channeling, Clearcasting & Missile Barrage paired with Deep Frost (Ice Shards, Shatter, Fingers of Frost, Winter\'s Chill, Ice Barrier).'
      },
      {
        id: 'marcus-60-frost-cone-of-cold-variant',
        name: 'Marcus level 60 frost build cone of cold variant',
        author: 'Marcus',
        spec: 'Frost',
        capMode: 'lvl60',
        buildUrl: '/talents/mage?b=0500032--053530033121331251&l=30&tl=5',
        submittedAt: '2026-11-23',
        notes: '10/0/41 Arcane/Frost — Shifts 2 points from Arcane Concentration (3/5) to max Improved Cone of Cold (3/3) for stronger AoE/shatter burst.'
      }
    ],
    warlock: [],
    druid: []
  };
}
