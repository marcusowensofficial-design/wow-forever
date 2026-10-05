local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- Traditional Chinese (Taiwan) content, converted from zhCN with zhTW terms.
FDJ.ContentLocales = FDJ.ContentLocales or {}
FDJ.ContentLocales.zhTW = FDJ.ContentLocales.zhTW or {}

FDJ.ContentLocales.zhTW.dungeons = {
    ["Hall of Thanes"] = {
        ["name"] = "領主之廳",
        ["location"] = "鐵爐堡地下，丹莫洛",
        ["description"] = "有人闖入了鐵爐堡地下的矮人王室墓室。",
    },
    ["Ragefire Chasm"] = {
        ["name"] = "怒焰裂谷",
        ["location"] = "暗影裂口，奧格瑪",
        ["description"] = "穴居人和燃刃教徒盤踞在奧格瑪地下熾熱的洞穴中。",
    },
    ["Ruins of Lordaeron"] = {
        ["name"] = "洛丹倫廢墟",
        ["location"] = "被毀的洛丹倫城",
        ["description"] = "天災軍團仍在這座廢棄的都城中游蕩，而一名死靈法師正在城中積蓄力量。",
    },
    ["The Deadmines"] = {
        ["name"] = "死亡礦坑",
        ["location"] = "月溪鎮，西部荒野",
        ["description"] = "迪菲亞兄弟會正在月溪鎮下方的礦井中建造一艘戰艦。",
    },
    ["Wailing Caverns"] = {
        ["name"] = "哀嚎洞穴",
        ["location"] = "北貧瘠之地",
        ["description"] = "在貧瘠之地深處，尖牙德魯伊守護著沉睡的納拉雷克斯，扭曲的野獸在洞穴中游蕩。",
    },
    ["Shadowfang Keep"] = {
        ["name"] = "影牙城堡",
        ["location"] = "銀松森林",
        ["description"] = "大法師阿魯高和他的狼人追隨者佔據了這座城堡。",
    },
    ["Blackfathom Deeps"] = {
        ["name"] = "黑暗深淵",
        ["location"] = "佐拉姆海岸，灰谷",
        ["description"] = "佐拉姆海岸一座被淹沒的暗夜精靈遺蹟，被納迦、魚人和效忠阿庫麥爾的暮光之錘教徒佔據。",
    },
    ["The Stockade"] = {
        ["name"] = "暴風城監獄",
        ["location"] = "暴風城",
        ["description"] = "暴亂的迪菲亞囚犯佔領了暴風城的監獄。",
    },
}

FDJ.ContentLocales.zhTW.slotParts = {
    ["Chest"] = "胸部", ["Leather"] = "皮甲", ["Wrist"] = "手腕", ["Cloth"] = "布甲",
    ["Back"] = "背部", ["Waist"] = "腰部", ["Mail"] = "鎖甲", ["Hands"] = "手",
    ["Feet"] = "腳", ["Legs"] = "腿部", ["Neck"] = "頸部", ["Finger"] = "手指",
    ["Trinket"] = "飾品", ["Bag"] = "揹包", ["One-Hand"] = "單手", ["Main Hand"] = "主手",
    ["Off Hand"] = "副手", ["Two-Hand"] = "雙手", ["Dagger"] = "匕首", ["Sword"] = "劍",
    ["Axe"] = "斧", ["Mace"] = "錘", ["Staff"] = "法杖", ["Shield"] = "盾牌",
    ["Polearm"] = "長柄武器", ["Ranged"] = "遠端", ["Wand"] = "魔杖", ["Thrown"] = "投擲武器",
    ["Engineering"] = "工程學", ["Quest Item"] = "任務物品", ["Head"] = "頭部", ["Shoulder"] = "肩部",
    ["Bow"] = "弓", ["Crossbow"] = "弩", ["Fist Weapon"] = "拳套",
    ["Leatherworking Recipe"] = "制皮配方", ["Held In Off-hand"] = "副手物品",
}
