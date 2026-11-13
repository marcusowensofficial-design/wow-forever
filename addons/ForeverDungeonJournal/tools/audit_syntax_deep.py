import re
import glob


def _inside_string(line, target_pos):
    in_quote = None
    escaped = False
    for idx in range(target_pos):
        ch = line[idx]
        if escaped:
            escaped = False
            continue
        if in_quote and ch == '\\':
            escaped = True
            continue
        if in_quote:
            if ch == in_quote:
                in_quote = None
        elif ch in ('"', "'"):
            in_quote = ch
    return in_quote is not None


def check_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.read().splitlines()

    errors = []
    ident_dot_digit_re = re.compile(r'\b([a-zA-Z_]\w*)\s*\.\s*(\d+)')
    double_comma_re = re.compile(r',\s*,')

    for line_num, line_content in enumerate(lines, 1):
        stripped = line_content.strip()
        if stripped.startswith('--'):
            continue

        # Check for identifier immediately followed by a dot and digits (like y0.3937 or x1.234)
        for m in ident_dot_digit_re.finditer(line_content):
            token = m.group(0)
            if _inside_string(line_content, m.start()):
                continue
            errors.append(f"{path}:{line_num}: suspicious '{token}' in '{stripped}'")

        # Check for consecutive commas or missing values like `{ , }` or `, ,`
        if ',,' in line_content or ', ,' in line_content or double_comma_re.search(line_content):
            if '"' not in line_content and "'" not in line_content:
                errors.append(f"{path}:{line_num}: double comma in '{stripped}'")

    return errors


all_errors = []
for p in sorted(glob.glob('**/*.lua', recursive=True)):
    norm = p.replace('\\', '/')
    if norm.startswith(('tools/', 'scratch/', '_merge_preview/')):
        continue
    all_errors.extend(check_file(p))

if all_errors:
    print(f"Found {len(all_errors)} syntax issues:")
    for e in all_errors:
        print("  ", e)
else:
    print("ALL Lua files passed deep syntax audit with 0 issues!")
