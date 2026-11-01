import fs from 'node:fs';

const coach = fs.readFileSync('scratch/Coach.lua', 'utf8');
const lines = coach.split('\n');
const profileKeys = [];
for (const line of lines) {
  const m = line.match(/^ns\.coachData\.profiles\["([^"]+)"\]\s*=/);
  if (m) profileKeys.push(m[1]);
}
console.log('Profile keys count:', profileKeys.length);
console.log('Profile keys:', profileKeys);
