/**
 * World of Warcraft: Forever - Pending Classes Deep Dive Placeholders
 * All 9 classes (Hunter, Shaman, Mage, Paladin, Warrior, Warlock, Priest, Druid, Rogue) are now LIVE!
 */

if (typeof window !== 'undefined' && window.WOW_FOREVER_DATA) {
  if (!window.WOW_FOREVER_DATA.classDeepDives) window.WOW_FOREVER_DATA.classDeepDives = {};
  const pending = {};
  Object.keys(pending).forEach(k => {
    window.WOW_FOREVER_DATA.classDeepDives[k] = pending[k];
  });
}
