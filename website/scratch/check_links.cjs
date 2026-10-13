const fs = require('fs');
const prof = fs.readFileSync('./js/data/professions-data.js', 'utf8');
console.log('professions-data matches:', prof.match(/https?:\/\/[^\s"']*foreverchanges[^\s"']*/g));
const tools = fs.readFileSync('./js/data/tools-data.js', 'utf8');
console.log('tools-data matches:', [...new Set(tools.match(/https?:\/\/[^\s"']*foreverchanges[^\s"']*/g))]);
