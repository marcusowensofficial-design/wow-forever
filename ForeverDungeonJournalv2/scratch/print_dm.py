with open('Data/Dungeons.lua', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('["The Deadmines"]')
print(text[pos:pos+2500])
