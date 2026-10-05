local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- Korean content localization (dungeon names and descriptions). Quests,
-- bosses and route steps fall back to English until translated.
FDJ.ContentLocales = FDJ.ContentLocales or {}
FDJ.ContentLocales.koKR = FDJ.ContentLocales.koKR or {}

FDJ.ContentLocales.koKR.dungeons = {
    ["Hall of Thanes"] = {
        ["name"] = "영주의 전당",
        ["location"] = "아이언포지 지하, 던 모로",
        ["description"] = "누군가 아이언포지 지하의 드워프 왕실 묘실에 침입했습니다.",
    },
    ["Ragefire Chasm"] = {
        ["name"] = "성난불길 협곡",
        ["location"] = "어둠의 틈, 오그리마",
        ["description"] = "트로그와 불타는 칼날 교단원들이 오그리마 지하의 불타는 동굴에 들끓고 있습니다.",
    },
    ["Ruins of Lordaeron"] = {
        ["name"] = "로데론의 폐허",
        ["location"] = "폐허가 된 로데론 도시",
        ["description"] = "스컬지 군대가 여전히 폐허가 된 수도를 떠돌고, 도시 안에서는 한 강령술사가 힘을 키우고 있습니다.",
    },
    ["The Deadmines"] = {
        ["name"] = "죽음의 폐광",
        ["location"] = "서부 몰락지대",
        ["description"] = "데피아즈단이 폐광 깊은 곳에서 전투선을 건조하고 있습니다.",
    },
    ["Wailing Caverns"] = {
        ["name"] = "통곡의 동굴",
        ["location"] = "불모의 땅",
        ["description"] = "불모의 땅 깊은 곳에서 송곳니 드루이드들이 잠든 나라렉스를 지키고, 뒤틀린 짐승들이 동굴을 배회합니다.",
    },
    ["Shadowfang Keep"] = {
        ["name"] = "그림자송곳니 성채",
        ["location"] = "은빛소나무 숲",
        ["description"] = "대마법사 아루갈과 그의 늑대인간 추종자들이 성채를 장악하고 있습니다.",
    },
    ["Blackfathom Deeps"] = {
        ["name"] = "검은심연 나락",
        ["location"] = "조람 해안, 잿빛 골짜기",
        ["description"] = "나가, 멀록, 그리고 아쿠마이를 섬기는 황혼의 망치단이 점령한 물에 잠긴 나이트 엘프 유적입니다.",
    },
    ["The Stockade"] = {
        ["name"] = "스톰윈드 지하감옥",
        ["location"] = "스톰윈드",
        ["description"] = "폭동을 일으킨 데피아즈 죄수들이 스톰윈드의 감옥을 장악했습니다.",
    },
}

FDJ.ContentLocales.koKR.slotParts = {
    ["Chest"] = "가슴", ["Leather"] = "가죽", ["Wrist"] = "손목", ["Cloth"] = "천",
    ["Back"] = "등", ["Waist"] = "허리", ["Mail"] = "사슬", ["Hands"] = "손",
    ["Feet"] = "발", ["Legs"] = "다리", ["Neck"] = "목", ["Finger"] = "손가락",
    ["Trinket"] = "장신구", ["Bag"] = "가방", ["One-Hand"] = "한손", ["Main Hand"] = "주장비",
    ["Off Hand"] = "보조장비", ["Two-Hand"] = "양손", ["Dagger"] = "단검", ["Sword"] = "도검",
    ["Axe"] = "도끼", ["Mace"] = "둔기", ["Staff"] = "지팡이", ["Shield"] = "방패",
    ["Polearm"] = "장창", ["Ranged"] = "원거리", ["Wand"] = "마법봉", ["Thrown"] = "투척 무기",
    ["Engineering"] = "기계공학", ["Quest Item"] = "퀘스트 아이템", ["Head"] = "머리", ["Shoulder"] = "어깨",
    ["Bow"] = "활", ["Crossbow"] = "석궁", ["Fist Weapon"] = "장착 무기",
    ["Leatherworking Recipe"] = "가죽세공 도안", ["Held In Off-hand"] = "보조장비 착용",
}
