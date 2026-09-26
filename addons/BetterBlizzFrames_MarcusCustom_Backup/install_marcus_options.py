"""
Marcus Custom Options - Auto Installer / Re-applier for BetterBlizzFrames
Use this script whenever BetterBlizzFrames is updated by CurseForge, WoWUp, or Battle.net.
"""
import os
import shutil

WOW_DIR = r"C:\Program Files (x86)\World of Warcraft\_classic_beta_\Interface\AddOns\BetterBlizzFrames"
BACKUP_DIR = os.path.dirname(os.path.abspath(__file__))

FILES = [
    'BetterBlizzFrames.toc',
    'BetterBlizzFrames_Camelot.toc',
    'forever/BetterBlizzFrames.lua',
    'forever/gui.lua',
    'forever/modules/healthbarColor.lua',
    'forever/modules/noPortrait.lua',
    'forever/modules/marcusOptions.lua',
    'forever/modules/auras.lua',
    'retail/BetterBlizzFrames.lua',
    'retail/gui.lua',
    'retail/modules/healthbarColor.lua',
    'retail/modules/noPortrait.lua',
    'retail/modules/marcusOptions.lua',
    'retail/modules/auras.lua',
]

def install():
    if not os.path.exists(WOW_DIR):
        print(f"Error: BetterBlizzFrames directory not found at: {WOW_DIR}")
        return

    print("Restoring Marcus Custom Options to BetterBlizzFrames...")
    for rel in FILES:
        src = os.path.join(BACKUP_DIR, rel.replace('/', os.sep))
        dst = os.path.join(WOW_DIR, rel.replace('/', os.sep))
        if os.path.exists(src):
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copy2(src, dst)
            print(f"  [OK] Copied {rel}")
        else:
            print(f"  [MISSING] Source file not found: {src}")

    print("\n Marcus Custom Options restored successfully!")

if __name__ == "__main__":
    install()
