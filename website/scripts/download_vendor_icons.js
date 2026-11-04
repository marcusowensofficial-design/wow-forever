import fs from 'node:fs';
import path from 'node:path';

async function main() {
  const data = JSON.parse(fs.readFileSync('data/forever_vendors.json', 'utf8'));
  const targetDir = path.resolve('images/icons/vendors');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Extract all unique icon IDs from items and currencies
  const iconSet = new Set();
  for (const [id, item] of Object.entries(data.items)) {
    if (item[1]) iconSet.add(item[1]);
  }
  for (const [id, cur] of Object.entries(data.currencies)) {
    if (cur.ic) iconSet.add(cur.ic);
  }
  // Include standard questionmark fallback
  iconSet.add(134400);

  const iconList = Array.from(iconSet);
  console.log(`Found ${iconList.length} unique icons to download into images/icons/vendors/...`);

  const batchSize = 15;
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < iconList.length; i += batchSize) {
    const chunk = iconList.slice(i, i + batchSize);
    await Promise.all(chunk.map(async (iconId) => {
      const filePath = path.join(targetDir, `${iconId}.webp`);
      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 100) {
        skipped++;
        return;
      }

      const url = `https://foreverdb.net/icons/${iconId}.webp`;
      try {
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        if (!res.ok) {
          console.warn(`Icon ${iconId} returned status ${res.status}`);
          failed++;
          return;
        }
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        downloaded++;
      } catch (err) {
        console.error(`Failed to download icon ${iconId}:`, err.message);
        failed++;
      }
    }));
  }

  console.log(`Finished: ${downloaded} downloaded, ${skipped} already existed, ${failed} failed.`);
  const savedFiles = fs.readdirSync(targetDir).filter(f => f.endsWith('.webp'));
  console.log(`Total local icons in images/icons/vendors/: ${savedFiles.length}`);
}

main().catch(console.error);
