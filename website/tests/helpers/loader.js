/* global console */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

/**
 * Loads all browser-targeted datasets into an isolated Node.js VM context.
 *
 * @param {string} [rootDir] Optional explicit root directory path
 * @returns {object} Loaded datasets and environment state
 */
export function loadAllData(rootDir = null) {
  const root = rootDir || path.resolve(import.meta.dirname, '..', '..');

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
    escapeHtml: s => String(s || ''),
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

  // 1. Core Data
  const corePath = path.join(root, 'js', 'data', 'core-data.js');
  if (fs.existsSync(corePath)) {
    const coreCode = fs.readFileSync(corePath, 'utf8');
    vm.runInContext(coreCode, context);
  }

  // 2. Races and Classes
  const racesPath = path.join(root, 'js', 'data', 'races-classes.js');
  if (fs.existsSync(racesPath)) {
    const racesCode = fs.readFileSync(racesPath, 'utf8');
    vm.runInContext(racesCode, context);
  }

  // 3. Talents Data
  const talentsPath = path.join(root, 'js', 'data', 'talents-data.js');
  if (fs.existsSync(talentsPath)) {
    const talentsCode = fs.readFileSync(talentsPath, 'utf8');
    vm.runInContext(talentsCode, context);
  }

  // 4. Changes Data
  const changesPath = path.join(root, 'js', 'data', 'changes-data.js');
  if (fs.existsSync(changesPath)) {
    const changesCode = fs.readFileSync(changesPath, 'utf8');
    vm.runInContext(changesCode, context);
  }

  // 5. Deepdives
  const deepdiveDir = path.join(root, 'js', 'data', 'deepdives');
  if (fs.existsSync(deepdiveDir)) {
    const classFiles = fs.readdirSync(deepdiveDir).filter(f => f.endsWith('.js'));
    for (const f of classFiles) {
      const ddCode = fs.readFileSync(path.join(deepdiveDir, f), 'utf8');
      vm.runInContext(ddCode, context);
    }
  }

  // 6. JSON Changes Data
  const jsonPath = path.join(root, 'data', 'forever_changes.json');
  let changesJson = null;
  if (fs.existsSync(jsonPath)) {
    changesJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  }

  // 7. Raw Static Files for Integrity Checks
  const indexHtmlPath = path.join(root, 'index.html');
  const indexHtml = fs.existsSync(indexHtmlPath) ? fs.readFileSync(indexHtmlPath, 'utf8') : '';

  const toolsDataPath = path.join(root, 'js', 'data', 'tools-data.js');
  const toolsDataRaw = fs.existsSync(toolsDataPath) ? fs.readFileSync(toolsDataPath, 'utf8') : '';

  return {
    root,
    context,
    coreData: context.WOW_FOREVER_DATA || {},
    racesData: context.WOW_FOREVER_DATA?.allRacesData || [],
    newClassCombos: context.WOW_FOREVER_DATA?.newClassCombos || [],
    talentsData: context.WOW_TALENTS_DATA || {},
    changesData: context.WOW_CHANGES_DATA || {},
    changesJson,
    deepdives: context.WOW_FOREVER_DATA?.classDeepDives || {},
    indexHtml,
    toolsDataRaw
  };
}
