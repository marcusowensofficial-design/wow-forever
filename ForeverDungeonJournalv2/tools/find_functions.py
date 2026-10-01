import re

with open("Core/Journal.lua", "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if line.startswith("function ") or "function(" in line or ":SetScript(" in line or "function FDJ" in line or "local function" in line:
        if "function" in line and not line.strip().startswith("--"):
            print(f"{idx+1}: {line.strip()[:80]}")
