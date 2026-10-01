with open("Data/Dungeons.lua", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if line.startswith("    [") or line.startswith("\t[") or line.startswith("FDJ.DB["):
        print(f"Line {i+1}: {line.strip()[:60]}")
