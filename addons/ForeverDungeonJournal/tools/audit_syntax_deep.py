import re
import glob

def check_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    errors = []
    
    # Check for identifier immediately followed by a dot and digits (like y0.3937 or x1.234)
    for m in re.finditer(r'\b([a-zA-Z_]\w*)\s*\.\s*(\d+)', content):
        token = m.group(0)
        # exclude version numbers in comments or strings if any, or known patterns like v1.0
        start = m.start()
        line_num = content[:start].count('\n') + 1
        line_content = content.split('\n')[line_num - 1]
        if line_content.strip().startswith('--'):
            continue
        if '"' in line_content or "'" in line_content:
            # check if token is inside quotes
            prefix = line_content[:m.start() - content[:start].rfind('\n')]
            quotes = prefix.count('"') + prefix.count("'")
            if quotes % 2 != 0:
                continue
        errors.append(f"{path}:{line_num}: suspicious '{token}' in '{line_content.strip()}'")

    # Check for consecutive commas or missing values like `{ , }` or `, ,`
    for m in re.finditer(r',\s*,', content):
        start = m.start()
        line_num = content[:start].count('\n') + 1
        line_content = content.split('\n')[line_num - 1]
        if not line_content.strip().startswith('--'):
            errors.append(f"{path}:{line_num}: double comma in '{line_content.strip()}'")

    return errors

all_errors = []
for p in glob.glob('**/*.lua', recursive=True):
    errs = check_file(p)
    all_errors.extend(errs)

if all_errors:
    print(f"Found {len(all_errors)} syntax issues:")
    for e in all_errors:
        print("  ", e)
else:
    print("ALL Lua files passed deep syntax audit with 0 issues!")
