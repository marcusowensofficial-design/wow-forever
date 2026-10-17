#!/usr/bin/env node

/**
 * validate-addons.mjs
 * Unified integrity and syntax validation engine for the WoW Forever Addon Suite.
 * Validates TOC headers (Interface 16001, Camelot tags), file references,
 * XML well-formedness, and Lua block/bracket balancing.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../..');
const ADDONS_DIR = path.resolve(REPO_ROOT, 'addons');

const ADDON_FOLDERS = [
  'ForeverPlates',
  'Foreverplatescastbars',
  'ForeverLiquid',
  'ForeverDungeonJournal',
  'ForeverBlessings',
  'EchoTwist'
];

let totalChecks = 0;
const errors = [];

function check(title, fn) {
  totalChecks++;
  try {
    fn();
    console.log(`  ✓ ${title}`);
  } catch (err) {
    errors.push({ title, message: err.message });
    console.error(`  ✗ ${title}: ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// Lua Lexer & Block Validator (Ported & optimized from validate_lua.py)
// ---------------------------------------------------------------------------

function stripCommentsAndStrings(content) {
  let i = 0;
  const n = content.length;
  const result = [];
  let line = 1;
  let col = 1;

  while (i < n) {
    const char = content[i];

    // Check long comment --[[ ... ]] or short comment -- ...
    if (content.slice(i, i + 2) === '--') {
      i += 2;
      col += 2;
      const longMatch = content.slice(i).match(/^\[(=*)\[/);
      if (longMatch) {
        const eqLen = longMatch[1].length;
        const endPat = ']' + '='.repeat(eqLen) + ']';
        const endIdx = content.indexOf(endPat, i + longMatch[0].length);
        if (endIdx === -1) {
          throw new Error(`Unfinished long comment starting at line ${line}, col ${col}`);
        }
        const commentText = content.slice(i - 2, endIdx + endPat.length);
        const newlines = (commentText.match(/\n/g) || []).length;
        result.push('\n'.repeat(newlines));
        line += newlines;
        i = endIdx + endPat.length;
        col = 1;
      } else {
        const eol = content.indexOf('\n', i);
        if (eol === -1) break;
        result.push('\n');
        line++;
        col = 1;
        i = eol + 1;
      }
      continue;
    }

    // Check long string [=[ ... ]=]
    const longStrMatch = content.slice(i).match(/^\[(=*)\[/);
    if (longStrMatch && (i === 0 || ' \t\n\r,=({['.includes(content[i - 1]))) {
      const eqLen = longStrMatch[1].length;
      const endPat = ']' + '='.repeat(eqLen) + ']';
      i += longStrMatch[0].length;
      const endIdx = content.indexOf(endPat, i);
      if (endIdx === -1) {
        throw new Error(`Unfinished long string starting at line ${line}, col ${col}`);
      }
      const strText = content.slice(i, endIdx);
      const newlines = (strText.match(/\n/g) || []).length;
      result.push(' "" ' + '\n'.repeat(newlines));
      line += newlines;
      i = endIdx + endPat.length;
      continue;
    }

    // Single or double quote strings
    if (char === '"' || char === "'") {
      const quote = char;
      const startLine = line;
      const startCol = col;
      i++;
      col++;
      let escaped = false;
      let terminated = false;

      while (i < n) {
        const c = content[i];
        if (escaped) {
          escaped = false;
          i++;
          col++;
          continue;
        }
        if (c === '\\') {
          escaped = true;
          i++;
          col++;
          continue;
        }
        if (c === '\n') {
          throw new Error(`Unescaped newline in string literal at line ${startLine}, col ${startCol}`);
        }
        if (c === quote) {
          i++;
          col++;
          result.push(' "" ');
          terminated = true;
          break;
        }
        i++;
        col++;
      }

      if (!terminated) {
        throw new Error(`Unterminated string literal starting at line ${startLine}, col ${startCol}`);
      }
      continue;
    }

    if (char === '\n') {
      line++;
      col = 1;
      result.push('\n');
      i++;
      continue;
    }

    result.push(char);
    i++;
    col++;
  }

  return result.join('');
}

function validateLuaFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const cleanCode = stripCommentsAndStrings(content);

  // 1. Bracket balancing
  const bracketPairs = { ')': '(', '}': '{', ']': '[' };
  const opens = '({[';
  const closes = ')}]';
  const stack = [];

  const lines = cleanCode.split('\n');
  for (let lIdx = 0; lIdx < lines.length; lIdx++) {
    const line = lines[lIdx];
    for (let cIdx = 0; cIdx < line.length; cIdx++) {
      const ch = line[cIdx];
      if (opens.includes(ch)) {
        stack.push({ ch, line: lIdx + 1, col: cIdx + 1 });
      } else if (closes.includes(ch)) {
        if (stack.length === 0) {
          throw new Error(`Unmatched closing bracket '${ch}' at line ${lIdx + 1}, col ${cIdx + 1}`);
        }
        const top = stack.pop();
        if (top.ch !== bracketPairs[ch]) {
          throw new Error(`Mismatched bracket: opened '${top.ch}' at line ${top.line}:${top.col}, closed with '${ch}' at line ${lIdx + 1}:${cIdx + 1}`);
        }
      }
    }
  }

  if (stack.length > 0) {
    const top = stack[stack.length - 1];
    throw new Error(`Unclosed bracket '${top.ch}' from line ${top.line}, col ${top.col}`);
  }

  // 2. Control block balancing
  const blockStack = [];
  const wordsRe = /\b(function|if|then|elseif|else|do|while|for|repeat|until|end)\b/g;

  for (let lIdx = 0; lIdx < lines.length; lIdx++) {
    const line = lines[lIdx];
    let m;
    while ((m = wordsRe.exec(line)) !== null) {
      const word = m[1];
      const pos = m.index + 1;
      const lineNum = lIdx + 1;

      if (word === 'function') {
        blockStack.push({ word: 'function', line: lineNum, pos });
      } else if (word === 'if') {
        blockStack.push({ word: 'if', line: lineNum, pos });
      } else if (word === 'then') {
        if (blockStack.length === 0) {
          throw new Error(`'then' without 'if' or 'elseif' at line ${lineNum}:${pos}`);
        }
        const top = blockStack[blockStack.length - 1];
        if (top.word === 'if' || top.word === 'elseif') {
          top.word = 'if_block';
        } else {
          throw new Error(`'then' following non-if block '${top.word}' at line ${lineNum}:${pos}`);
        }
      } else if (word === 'elseif') {
        if (blockStack.length === 0 || blockStack[blockStack.length - 1].word !== 'if_block') {
          throw new Error(`'elseif' without preceding 'if' at line ${lineNum}:${pos}`);
        }
        blockStack[blockStack.length - 1].word = 'elseif';
      } else if (word === 'else') {
        if (blockStack.length === 0 || !['if_block', 'elseif'].includes(blockStack[blockStack.length - 1].word)) {
          throw new Error(`'else' without preceding 'if' at line ${lineNum}:${pos}`);
        }
        blockStack[blockStack.length - 1].word = 'if_block';
      } else if (word === 'while' || word === 'for') {
        blockStack.push({ word: 'loop', line: lineNum, pos });
      } else if (word === 'do') {
        if (blockStack.length > 0 && blockStack[blockStack.length - 1].word === 'loop') {
          blockStack[blockStack.length - 1].word = 'do_block';
        } else {
          blockStack.push({ word: 'do_block', line: lineNum, pos });
        }
      } else if (word === 'repeat') {
        blockStack.push({ word: 'repeat', line: lineNum, pos });
      } else if (word === 'until') {
        if (blockStack.length === 0) {
          throw new Error(`'until' without 'repeat' at line ${lineNum}:${pos}`);
        }
        const top = blockStack.pop();
        if (top.word !== 'repeat') {
          throw new Error(`'until' closed '${top.word}' instead of 'repeat' at line ${lineNum}:${pos}`);
        }
      } else if (word === 'end') {
        if (blockStack.length === 0) {
          throw new Error(`'end' with no open block at line ${lineNum}:${pos}`);
        }
        const top = blockStack.pop();
        if (!['function', 'if_block', 'do_block'].includes(top.word)) {
          throw new Error(`'end' closed '${top.word}' at line ${lineNum}:${pos}`);
        }
      }
    }
  }

  if (blockStack.length > 0) {
    const top = blockStack[0];
    throw new Error(`Unclosed block '${top.word}' opened at line ${top.line}:${top.pos}`);
  }

  // 3. Deep syntax checks: double commas
  for (let lIdx = 0; lIdx < lines.length; lIdx++) {
    const line = lines[lIdx];
    if (/,\s*,/.test(line)) {
      throw new Error(`Consecutive double comma at line ${lIdx + 1}: ${line.trim()}`);
    }
  }
}

// ---------------------------------------------------------------------------
// XML Basic Validator
// ---------------------------------------------------------------------------

function validateXmlFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Simple XML tag balancer ignoring comments
  const clean = content.replace(/<!--[\s\S]*?-->/g, '');
  const tagRe = /<(\/)?([a-zA-Z0-9_:]+)([^>]*)>/g;
  const tagStack = [];
  let m;

  while ((m = tagRe.exec(clean)) !== null) {
    const isClosing = Boolean(m[1]);
    const tagName = m[2];
    const rest = m[3];
    const isSelfClosing = rest.trim().endsWith('/') || rest.trim() === '/';

    if (isSelfClosing) continue;

    if (isClosing) {
      if (tagStack.length === 0) {
        throw new Error(`Unmatched XML closing tag </${tagName}>`);
      }
      const top = tagStack.pop();
      if (top !== tagName) {
        throw new Error(`Mismatched XML tag: opened <${top}>, closed with </${tagName}>`);
      }
    } else {
      tagStack.push(tagName);
    }
  }

  if (tagStack.length > 0) {
    throw new Error(`Unclosed XML tag <${tagStack[tagStack.length - 1]}>`);
  }
}

// ---------------------------------------------------------------------------
// Addon Suite Runner
// ---------------------------------------------------------------------------

export function validateAllAddons() {
  console.log('⚔️  WoW Forever Addon Suite Validation Runner');
  console.log(`Addons Directory: ${ADDONS_DIR}\n`);

  for (const folder of ADDON_FOLDERS) {
    const addonPath = path.join(ADDONS_DIR, folder);

    check(`[${folder}] Addon directory exists`, () => {
      if (!fs.existsSync(addonPath)) {
        throw new Error(`Directory not found: ${addonPath}`);
      }
    });

    if (!fs.existsSync(addonPath)) continue;

    // Check TOC files
    const standardToc = path.join(addonPath, `${folder}.toc`);
    const camelotToc = path.join(addonPath, `${folder}_Camelot.toc`);

    check(`[${folder}] TOC manifests exist (${folder}.toc & ${folder}_Camelot.toc)`, () => {
      if (!fs.existsSync(standardToc)) throw new Error(`Missing ${folder}.toc`);
      if (!fs.existsSync(camelotToc)) throw new Error(`Missing ${folder}_Camelot.toc`);
    });

    const tocsToCheck = [standardToc, camelotToc].filter(p => fs.existsSync(p));
    const declaredFiles = new Set();

    for (const tocPath of tocsToCheck) {
      const tocName = path.basename(tocPath);
      const tocContent = fs.readFileSync(tocPath, 'utf8');

      check(`[${folder}] ${tocName} has valid Interface: 16001`, () => {
        if (!/##\s*Interface:\s*16001/m.test(tocContent)) {
          throw new Error(`${tocName} missing '## Interface: 16001'`);
        }
      });

      check(`[${folder}] ${tocName} declares Camelot compatibility`, () => {
        if (!/##\s*AllowLoadGameType:\s*camelot/im.test(tocContent)) {
          throw new Error(`${tocName} missing '## AllowLoadGameType: camelot'`);
        }
      });

      // Parse declared file paths in TOC
      const lines = tocContent.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const filePathPart = trimmed.split('[')[0].trim();
        if (filePathPart) {
          declaredFiles.add(filePathPart);
        }
      }
    }

    // Verify all declared files in TOC exist on disk
    check(`[${folder}] All files declared in TOC exist on disk (${declaredFiles.size} files)`, () => {
      const missing = [];
      for (const relFile of declaredFiles) {
        const targetPath = path.join(addonPath, relFile.replace(/\\/g, '/'));
        if (!fs.existsSync(targetPath)) {
          missing.push(relFile);
        }
      }
      if (missing.length > 0) {
        throw new Error(`TOC references non-existent files: ${missing.join(', ')}`);
      }
    });

    // Validate all Lua and XML files inside this addon
    function scanAndValidate(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name === '.git' || entry.name === 'tools' || entry.name === 'scratch' || entry.name === 'media-scratch') {
          continue;
        }
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanAndValidate(fullPath);
        } else if (entry.isFile()) {
          const relPath = path.relative(addonPath, fullPath);
          if (entry.name.endsWith('.lua')) {
            check(`[${folder}] Lua syntax & balance: ${relPath}`, () => {
              validateLuaFile(fullPath);
            });
          } else if (entry.name.endsWith('.xml')) {
            check(`[${folder}] XML well-formedness: ${relPath}`, () => {
              validateXmlFile(fullPath);
            });
          }
        }
      }
    }

    scanAndValidate(addonPath);
  }

  console.log('\n=======================================');
  console.log(`Ran ${totalChecks} addon checks. Failures: ${errors.length}`);
  console.log('=======================================\n');

  if (errors.length > 0) {
    console.error(`✗ Addon validation failed with ${errors.length} issue(s).`);
    return false;
  }

  console.log('✓ All 6 WoW Forever addons passed integrity, TOC, XML, and Lua syntax audits!\n');
  return true;
}

// CLI entrypoint
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const success = validateAllAddons();
  process.exit(success ? 0 : 1);
}
