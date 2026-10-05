local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- Simplified Chinese content localization (dungeon names and descriptions,
-- item slots). Quests and boss names fall back to English until translated.
FDJ.ContentLocales = FDJ.ContentLocales or {}
FDJ.ContentLocales.zhCN = FDJ.ContentLocales.zhCN or {}

FDJ.ContentLocales.zhCN.dungeons = {
    ["Hall of Thanes"] = {
        ["name"] = "领主之厅",
        ["location"] = "铁炉堡地下，丹莫罗",
        ["description"] = "有人闯入了铁炉堡地下的矮人王室墓室。",
    },
    ["Ragefire Chasm"] = {
        ["name"] = "怒焰裂谷",
        ["location"] = "暗影裂口，奥格瑞玛",
        ["description"] = "穴居人和燃刃教徒盘踞在奥格瑞玛地下炽热的洞穴中。",
    },
    ["Ruins of Lordaeron"] = {
        ["name"] = "洛丹伦废墟",
        ["location"] = "被毁的洛丹伦城",
        ["description"] = "天灾军团仍在这座废弃的都城中游荡，而一名死灵法师正在城中积蓄力量。",
    },
    ["The Deadmines"] = {
        ["name"] = "死亡矿井",
        ["location"] = "月溪镇，西部荒野",
        ["description"] = "迪菲亚兄弟会正在月溪镇下方的矿井中建造一艘战舰。",
    },
    ["Wailing Caverns"] = {
        ["name"] = "哀嚎洞穴",
        ["location"] = "北贫瘠之地",
        ["description"] = "在贫瘠之地深处，尖牙德鲁伊守护着沉睡的纳拉雷克斯，扭曲的野兽在洞穴中游荡。",
    },
    ["Shadowfang Keep"] = {
        ["name"] = "影牙城堡",
        ["location"] = "银松森林",
        ["description"] = "大法师阿鲁高和他的狼人追随者占据了这座城堡。",
    },
    ["Blackfathom Deeps"] = {
        ["name"] = "黑暗深渊",
        ["location"] = "佐拉姆海岸，灰谷",
        ["description"] = "佐拉姆海岸一座被淹没的暗夜精灵遗迹，被纳迦、鱼人和效忠阿库麦尔的暮光之锤教徒占据。",
    },
    ["The Stockade"] = {
        ["name"] = "暴风城监狱",
        ["location"] = "暴风城",
        ["description"] = "暴乱的迪菲亚囚犯占领了暴风城的监狱。",
    },
}

FDJ.ContentLocales.zhCN.slotParts = {
    ["Chest"] = "胸部", ["Leather"] = "皮甲", ["Wrist"] = "手腕", ["Cloth"] = "布甲",
    ["Back"] = "背部", ["Waist"] = "腰部", ["Mail"] = "锁甲", ["Hands"] = "手",
    ["Feet"] = "脚", ["Legs"] = "腿部", ["Neck"] = "颈部", ["Finger"] = "手指",
    ["Trinket"] = "饰品", ["Bag"] = "背包", ["One-Hand"] = "单手", ["Main Hand"] = "主手",
    ["Off Hand"] = "副手", ["Two-Hand"] = "双手", ["Dagger"] = "匕首", ["Sword"] = "剑",
    ["Axe"] = "斧", ["Mace"] = "锤", ["Staff"] = "法杖", ["Shield"] = "盾牌",
    ["Polearm"] = "长柄武器", ["Ranged"] = "远程", ["Wand"] = "魔杖", ["Thrown"] = "投掷武器",
    ["Engineering"] = "工程学", ["Quest Item"] = "任务物品", ["Head"] = "头部", ["Shoulder"] = "肩部",
    ["Bow"] = "弓", ["Crossbow"] = "弩", ["Fist Weapon"] = "拳套",
    ["Leatherworking Recipe"] = "制皮配方", ["Held In Off-hand"] = "副手物品",
}
