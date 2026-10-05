import re

with open(r'C:\Users\marco\.gemini\antigravity-ide\brain\8bad2bec-d6aa-491a-8bd2-060b03da152f\.system_generated\steps\258\content.md', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('id="quests"')
if idx != -1:
    loot_idx = text.find('id="loot"')
    sub = text[idx:loot_idx if loot_idx != -1 else idx+30000]
    sub = re.sub(r'<script.*?</script>', '', sub, flags=re.DOTALL)
    sub = re.sub(r'<style.*?</style>', '', sub, flags=re.DOTALL)
    # capture links with href
    sub = re.sub(r'<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)</a>', r'[\2](\1)', sub)
    sub = re.sub(r'</?(?:tr|div|li|p|h\d|ul|ol)[^>]*>', '\n', sub)
    sub = re.sub(r'<[^>]+>', ' ', sub)
    lines = [line.strip() for line in sub.split('\n') if line.strip()]
    print(f"Total lines in quests section: {len(lines)}")
    print('\n'.join(lines))
