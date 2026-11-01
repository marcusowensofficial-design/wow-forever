import fs from 'node:fs';

function luaTableToJson(luaStr) {
  // Tokenize and parse Lua table representation
  // We can write a simple recursive descent parser for Lua literals (nil, true, false, numbers, strings, tables)
  let pos = 0;
  const str = luaStr.trim();

  function skipWhitespace() {
    while (pos < str.length && /\s/.test(str[pos])) pos++;
  }

  function parseValue() {
    skipWhitespace();
    if (pos >= str.length) return null;

    if (str[pos] === '{') {
      return parseTable();
    }
    if (str[pos] === '"') {
      return parseString();
    }
    if (str.startsWith('true', pos)) {
      pos += 4;
      return true;
    }
    if (str.startsWith('false', pos)) {
      pos += 5;
      return false;
    }
    if (str.startsWith('nil', pos)) {
      pos += 3;
      return null;
    }
    // Number or identifier
    const numMatch = str.slice(pos).match(/^-?\d+(\.\d+)?/);
    if (numMatch) {
      pos += numMatch[0].length;
      return Number(numMatch[0]);
    }

    // Bare identifier as string (rare in values, but could happen)
    const idMatch = str.slice(pos).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (idMatch) {
      pos += idMatch[0].length;
      return idMatch[0];
    }

    throw new Error(`Unexpected character at pos ${pos}: ${str.slice(pos, pos + 30)}`);
  }

  function parseString() {
    pos++; // skip opening "
    let res = '';
    while (pos < str.length) {
      const char = str[pos];
      if (char === '\\') {
        pos++;
        const next = str[pos];
        if (next === '"') res += '"';
        else if (next === '\\') res += '\\';
        else if (next === 'n') res += '\n';
        else if (next === 't') res += '\t';
        else res += next;
        pos++;
      } else if (char === '"') {
        pos++; // skip closing "
        return res;
      } else {
        res += char;
        pos++;
      }
    }
    return res;
  }

  function parseTable() {
    pos++; // skip '{'
    skipWhitespace();

    const isArray = [];
    const isObject = {};
    let hasKeys = false;
    let hasValues = false;

    while (pos < str.length && str[pos] !== '}') {
      skipWhitespace();
      if (str[pos] === '}') break;

      // Check if key= or [key]=
      let key = null;
      if (str[pos] === '[') {
        // [key]=
        pos++; // skip '['
        skipWhitespace();
        if (str[pos] === '"') {
          key = parseString();
        } else {
          // number or identifier key
          const kMatch = str.slice(pos).match(/^([a-zA-Z0-9_-]+)/);
          if (kMatch) {
            key = kMatch[0];
            pos += key.length;
          }
        }
        skipWhitespace();
        if (str[pos] === ']') pos++;
        skipWhitespace();
        if (str[pos] === '=') pos++;
      } else {
        const keyMatch = str.slice(pos).match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=/);
        if (keyMatch) {
          key = keyMatch[1];
          pos += keyMatch[0].length;
        }
      }

      if (key !== null) {
        hasKeys = true;
        const val = parseValue();
        isObject[key] = val;
      } else {
        hasValues = true;
        const val = parseValue();
        isArray.push(val);
      }

      skipWhitespace();
      if (str[pos] === ',' || str[pos] === ';') {
        pos++;
        skipWhitespace();
      }
    }

    if (str[pos] === '}') pos++; // skip '}'

    if (hasKeys && !hasValues) return isObject;
    if (hasValues && !hasKeys) return isArray;
    if (hasKeys && hasValues) {
      // Mixed table: merge array entries into numeric keys or object
      isArray.forEach((v, idx) => {
        isObject[idx + 1] = v;
      });
      return isObject;
    }
    return [];
  }

  return parseValue();
}

// Test on Camp.lua
const campText = fs.readFileSync('scratch/Camp.lua', 'utf8');
const campMatch = campText.match(/ns\.camp\s*=\s*(\{[\s\S]+\})/);
const campData = luaTableToJson(campMatch[1]);
console.log('Camp parsed count:', campData.length);
console.log('Camp item 0:', campData[0]);

// Test on Coach profile
const coachText = fs.readFileSync('scratch/Coach.lua', 'utf8');
const pMatch = coachText.match(/ns\.coachData\.profiles\["druid-balance"\]\s*=\s*(\{[\s\S]+?\})\r?\n/);
const druidProfile = luaTableToJson(pMatch[1]);
console.log('Druid profile parsed:', druidProfile.spec, druidProfile.className);
console.log('Druid brackets count:', druidProfile.brackets.length);
console.log('Druid bracket 0 priority count:', druidProfile.brackets[0].priority.length);
console.log('Druid bracket 0 sim:', druidProfile.brackets[0].sim);
