# Friends' market scans

Drop ForeverMarket scans from friends here, then merge them all into the website's prices.

1. Each friend runs a full scan at the Auction House with ForeverMarket (`/fm scan`), then logs out or types `/reload` so the game writes the file.
2. They send you their file:
   `World of Warcraft\_forever_\WTF\Account\<ACCOUNT>\SavedVariables\ForeverMarket.lua`
3. Rename it so you can tell them apart (for example `alex.lua`) and put it in this folder.
4. From the `website` folder, run:

   ```
   node scripts/sync-market-scan.mjs --wtf --dir market-scans
   npm run stamp:data
   ```

   `--wtf` includes your own scan as well. For each item, the most recent sighting sets the current price, and price histories are combined day by day (the lowest price each day wins).

The `.lua` files in this folder are not committed to git (see `.gitignore`). Only this README is.
