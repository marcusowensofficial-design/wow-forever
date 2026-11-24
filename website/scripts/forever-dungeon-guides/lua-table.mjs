/**
 * Minimal reader for the Lua data tables in addons/ForeverDungeonJournal/Data.
 * Handles what those files use: nested tables, strings, numbers, booleans, nil and comments.
 * Anything else (function calls, constants) becomes null instead of failing.
 */

/** Parses the table assigned by `marker`, e.g. 'FDJ.DB["Alcaz Prison"] =' . */
export function readLuaTable(source, marker) {
  const at = source.indexOf(marker);
  if (at < 0) return null;
  return parseValue(source, skip(source, at + marker.length)).value;
}

function skip(s, i) {
  for (;;) {
    while (i < s.length && /\s/.test(s[i])) i++;
    if (s.startsWith('--[[', i)) { i = s.indexOf(']]', i) + 2; continue; }
    if (s.startsWith('--', i)) { const n = s.indexOf('\n', i); i = n < 0 ? s.length : n + 1; continue; }
    return i;
  }
}

function parseString(s, i) {
  const quote = s[i++];
  let out = '';
  while (s[i] !== quote) {
    if (s[i] === '\\') {
      const c = s[++i];
      const dec = s.slice(i).match(/^\d{1,3}/);
      if (dec) { out += String.fromCharCode(Number(dec[0])); i += dec[0].length; continue; }
      out += c === 'n' ? '\n' : c === 't' ? '\t' : c;
      i++;
    } else out += s[i++];
  }
  return { value: out, end: i + 1 };
}

function parseValue(s, i) {
  const c = s[i];
  if (c === '{') return parseTable(s, i);
  if (c === '"' || c === "'") return parseString(s, i);
  const num = s.slice(i, i + 40).match(/^-?\d+(\.\d+)?/);
  if (num) return { value: Number(num[0]), end: i + num[0].length };
  const word = s.slice(i, i + 200).match(/^[A-Za-z_][\w.]*/);
  if (!word) throw new Error(`Unexpected Lua near: ${s.slice(i, i + 60)}`);
  let end = i + word[0].length;
  const value = word[0] === 'true' ? true : word[0] === 'false' ? false : null;
  if (s[end] === '(') { let d = 0; do { if (s[end] === '(') d++; if (s[end] === ')') d--; end++; } while (d); }
  return { value, end };
}

/** Pure arrays come back as arrays; anything with a key comes back as an object. */
function parseTable(s, i) {
  const list = [];
  const map = {};
  let keyed = false;
  i = skip(s, i + 1);
  while (s[i] !== '}') {
    let key = null;
    const named = s.slice(i, i + 120).match(/^([A-Za-z_]\w*)\s*=(?!=)/);
    if (named) { key = named[1]; i = skip(s, i + named[0].length); }
    else if (s[i] === '[') {
      const k = parseValue(s, skip(s, i + 1));
      i = skip(s, k.end);            // at ]
      i = skip(s, i + 1);            // at =
      i = skip(s, i + 1);
      key = String(k.value);
    }
    let v = parseValue(s, i);
    i = skip(s, v.end);
    while (s.startsWith('..', i)) {   // string concatenation
      const r = parseValue(s, skip(s, i + 2));
      v = { value: `${v.value ?? ''}${r.value ?? ''}`, end: r.end };
      i = skip(s, r.end);
    }
    if (key === null) list.push(v.value); else { map[key] = v.value; keyed = true; }
    if (s[i] === ',' || s[i] === ';') i = skip(s, i + 1);
  }
  return { value: keyed ? (list.length ? { ...map, list } : map) : list, end: i + 1 };
}
