import os
import glob
import re
import datetime

ADDON_DIR = r"C:\Program Files (x86)\World of Warcraft\_classic_beta_\Interface\AddOns\ForeverPlates"
WTF_DIR = r"C:\Program Files (x86)\World of Warcraft\_classic_beta_\WTF\Account"
SCRATCH_DIR = r"C:\Users\marco\.gemini\antigravity-ide\brain\36284d52-bbf1-4a6d-b958-208348cf5443\scratch"

def find_latest_saved_variables():
    pattern = os.path.join(WTF_DIR, "*", "SavedVariables", "ForeverPlates.lua")
    files = glob.glob(pattern)
    if not files:
        # Fallback to ForeverPlates_Camelot.lua
        pattern2 = os.path.join(WTF_DIR, "*", "SavedVariables", "ForeverPlates_Camelot.lua")
        files = glob.glob(pattern2)
    if not files:
        return None
    files.sort(key=lambda f: os.path.getmtime(f), reverse=True)
    return files[0]

def sync():
    sv_file = find_latest_saved_variables()
    if not sv_file:
        print(f"[ERROR] No SavedVariables file found in {WTF_DIR}")
        return False
    
    print(f"Found SavedVariables at: {sv_file}")
    with open(sv_file, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Extract the table contents between ForeverPlatesDB = { and matching }
    match = re.search(r"ForeverPlatesDB\s*=\s*\{(.*?)\}\s*(?:$|\n)", content, re.DOTALL)
    if not match:
        print("[ERROR] Could not parse ForeverPlatesDB table from SavedVariables file.")
        return False

    inner_content = match.group(1).strip()
    
    # Ensure ["lockHealthBarColor"] = true is included
    if '"lockHealthBarColor"' not in inner_content:
        inner_content += '\n\t["lockHealthBarColor"] = true,'

    # Ensure ["alwaysShowSelectionHighlight"] = true is included
    if '"alwaysShowSelectionHighlight"' not in inner_content:
        inner_content += '\n\t["alwaysShowSelectionHighlight"] = true,'

    # Ensure ["outlineThickness"] = 1 is included
    if '"outlineThickness"' not in inner_content:
        inner_content += '\n\t["outlineThickness"] = 1,'

    # Ensure ["_isBetaSnapshot"] = true is included
    if '"_isBetaSnapshot"' not in inner_content:
        inner_content += '\n\t["_isBetaSnapshot"] = true,'

    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    output = f"""--[[
    ForeverPlates_Restore.lua
    Forever Beta Compatibility Persistence Layer

    Automatically synced from SavedVariables:
    Source: {sv_file}
    Synced: {timestamp}

    This file restores the user's snapshot before core.lua or gui.lua load,
    bypassing the WoW Forever Beta SavedVariables loading bug.
--]]

if type(ForeverPlatesDB) ~= "table" or not next(ForeverPlatesDB) then
\tForeverPlatesDB = {{
{inner_content}
\t}}
end
"""

    # Write to AddOn directory
    target_path = os.path.join(ADDON_DIR, "ForeverPlates_Restore.lua")
    with open(target_path, "w", encoding="utf-8") as f:
        f.write(output)
    print(f"Successfully wrote {target_path} ({os.path.getsize(target_path)} bytes)")

    # Also update scratch copy
    scratch_path = os.path.join(SCRATCH_DIR, "ForeverPlates_Restore.lua")
    with open(scratch_path, "w", encoding="utf-8") as f:
        f.write(output)
    print(f"Successfully updated scratch copy: {scratch_path}")
    return True

if __name__ == "__main__":
    sync()
