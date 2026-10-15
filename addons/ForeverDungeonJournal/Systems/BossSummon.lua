-- Bosses that have to be summoned with an item (boss.summonItem = itemID).
-- The boss page shows "Summoned by: [item]" under the boss name; hovering it
-- shows the item and how to get it.
local FDJ = _G.ForeverDungeonJournal_NS
if not FDJ then return end

local LABEL = {
    enUS = "Summoned by:", deDE = "Beschworen mit:", frFR = "Invoqué avec :",
    esES = "Invocado con:", itIT = "Evocato con:", ptBR = "Invocado com:",
    ruRU = "Призывается с помощью:", koKR = "소환 아이템:", zhCN = "召唤物品：", zhTW = "召喚物品：",
}
local HOWTO_TITLE = {
    enUS = "How to get it", deDE = "So bekommt ihr es", frFR = "Comment l'obtenir",
    esES = "Cómo conseguirlo", itIT = "Come ottenerlo", ptBR = "Como obter",
    ruRU = "Как получить", koKR = "획득 방법", zhCN = "获取方法", zhTW = "取得方法",
}

-- How to get each summoning item, per language.
local HOWTO = {
    [275989] = { -- Tome of Dalaran
        enUS = {
            "1. Loot the Black Tome from the table behind Archmage Arugal at the end of Shadowfang Keep.",
            "2. Use the Black Tome next to the Ambermill Leyline Focus (the floating blue crystal in the Ambermill town hall, Silverpine Forest 63.4, 64.3). It turns into the Tome of Dalaran.",
            "3. Bring the Tome of Dalaran into the City of Dalaran to summon Lyn the Ignored.",
        },
        deDE = {
            "1. Nehmt den Schwarzen Foliant vom Tisch hinter Erzmagier Arugal am Ende der Burg Schattenfang.",
            "2. Benutzt ihn neben dem Leylinienfokus von Ambermühle (der schwebende blaue Kristall im Rathaus von Ambermühle, Silberwald 63.4, 64.3). Er wird zum Foliant von Dalaran.",
            "3. Bringt den Foliant von Dalaran in die Stadt Dalaran, um Lyn the Ignored zu beschwören.",
        },
        frFR = {
            "1. Récupérez le Tome noir sur la table derrière l'archimage Arugal, au fond du donjon d'Ombrecroc.",
            "2. Utilisez-le près du focalisateur tellurique d'Amberdine (le cristal bleu flottant dans l'hôtel de ville d'Amberdine, forêt des Pins-Argentés 63.4, 64.3). Il devient le Tome de Dalaran.",
            "3. Apportez le Tome de Dalaran dans la Cité de Dalaran pour invoquer Lyn the Ignored.",
        },
        esES = {
            "1. Coge el Tomo negro de la mesa detrás del archimago Arugal, al final del Castillo de Colmillo Oscuro.",
            "2. Úsalo junto al foco de línea ley de Molino Ámbar (el cristal azul flotante en el ayuntamiento de Molino Ámbar, Bosque de Argénteos 63.4, 64.3). Se convierte en el Tomo de Dalaran.",
            "3. Lleva el Tomo de Dalaran a la Ciudad de Dalaran para invocar a Lyn the Ignored.",
        },
        itIT = {
            "1. Prendi il Tomo Nero dal tavolo dietro l'Arcimago Arugal, alla fine della Rocca di Zannascura.",
            "2. Usalo vicino al Focus di Linea Magica di Mulino d'Ambra (il cristallo blu fluttuante nel municipio di Mulino d'Ambra, Selva Pinargento 63.4, 64.3). Diventa il Tomo di Dalaran.",
            "3. Porta il Tomo di Dalaran nella Città di Dalaran per evocare Lyn the Ignored.",
        },
        ptBR = {
            "1. Pegue o Tomo Negro na mesa atrás do Arquimago Arugal, no fim da Bastilha da Presa Negra.",
            "2. Use-o perto do Foco da Linha Ley de Moinho Âmbar (o cristal azul flutuante na prefeitura de Moinho Âmbar, Floresta de Pinhaprata 63.4, 64.3). Ele vira o Tomo de Dalaran.",
            "3. Leve o Tomo de Dalaran para a Cidade de Dalaran para invocar Lyn the Ignored.",
        },
        ruRU = {
            "1. Заберите Чёрный фолиант со стола за верховным магом Аругалом в конце Крепости Темного Клыка.",
            "2. Используйте его рядом с фокусом лей-линии Янтарной мельницы (парящий синий кристалл в ратуше Янтарной мельницы, Серебряный бор 63.4, 64.3). Он превратится в Фолиант Даларана.",
            "3. Принесите Фолиант Даларана в город Даларан, чтобы призвать Lyn the Ignored.",
        },
        koKR = {
            "1. 그림자송곳니 성채 끝, 대마법사 아루갈 뒤의 탁자에서 검은 고서를 획득하세요.",
            "2. 호박색 방앗간 마을회관의 떠 있는 파란 수정(은빛소나무 숲 63.4, 64.3) 옆에서 사용하면 달라란의 고서가 됩니다.",
            "3. 달라란의 고서를 달라란 도시로 가져가 Lyn the Ignored를 소환하세요.",
        },
        zhCN = {
            "1. 在影牙城堡尽头、大法师阿鲁高身后的桌子上拾取黑色典籍。",
            "2. 在安伯米尔镇公所的漂浮蓝色水晶（银松森林 63.4, 64.3）旁使用它，它会变成达拉然典籍。",
            "3. 把达拉然典籍带进达拉然城来召唤 Lyn the Ignored。",
        },
        zhTW = {
            "1. 在影牙城堡盡頭、大法師阿魯高身後的桌上拾取黑色典籍。",
            "2. 在安伯米爾鎮公所的漂浮藍色水晶（銀松森林 63.4, 64.3）旁使用它，它會變成達拉然典籍。",
            "3. 把達拉然典籍帶進達拉然城來召喚 Lyn the Ignored。",
        },
    },
}
local FALLBACK_NAMES = { [275989] = "Tome of Dalaran" }

local function Lang()
    local lang = FDJ.GetLanguage and FDJ.GetLanguage() or "enUS"
    return lang
end

local function Pick(t)
    if type(t) ~= "table" then return nil end
    return t[Lang()] or t.enUS
end

local function ItemData(id)
    local name, link, quality, icon
    local getInfo = (C_Item and C_Item.GetItemInfo) or GetItemInfo
    if getInfo then
        local ok, n, l, q, _, _, _, _, _, _, tex = pcall(getInfo, id)
        if ok then name, link, quality, icon = n, l, q, tex end
    end
    if not icon and C_Item and C_Item.GetItemIconByID then
        local ok, tex = pcall(C_Item.GetItemIconByID, id)
        if ok then icon = tex end
    end
    if not name and C_Item and C_Item.RequestLoadItemDataByID then
        pcall(C_Item.RequestLoadItemDataByID, id)
    end
    return name or FALLBACK_NAMES[id] or ("Item " .. id), link, quality, icon or "Interface\\Icons\\INV_Misc_Book_04"
end

local button

local function Create(frame)
    local anchor = frame.selectedBossName
    local parent = anchor and anchor:GetParent()
    if not parent then return nil end
    local b = CreateFrame("Button", nil, parent)
    b:SetHeight(18)
    b.label = b:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    b.label:SetPoint("LEFT", b, "LEFT", 0, 0)
    -- Yellow with a soft light outline so it reads on every journal theme.
    b.label:SetTextColor(1.00, 0.82, 0.00)
    b.label:SetShadowColor(1, 1, 1, 0.55)
    b.label:SetShadowOffset(1, -1)
    b.icon = b:CreateTexture(nil, "OVERLAY")
    b.icon:SetSize(16, 16)
    b.icon:SetPoint("LEFT", b.label, "RIGHT", 5, 0)
    b.name = b:CreateFontString(nil, "OVERLAY", "GameFontNormal")
    b.name:SetPoint("LEFT", b.icon, "RIGHT", 4, 0)
    b.name:SetShadowColor(1, 1, 1, 0.55)
    b.name:SetShadowOffset(1, -1)
    b:SetScript("OnEnter", function(self)
        if not GameTooltip or not self.itemID then return end
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        local _, link = ItemData(self.itemID)
        local ok = pcall(GameTooltip.SetHyperlink, GameTooltip, link or ("item:" .. self.itemID))
        if not ok then GameTooltip:AddLine(ItemData(self.itemID), 0, 0.44, 0.87) end
        local steps = Pick(HOWTO[self.itemID])
        if steps then
            GameTooltip:AddLine(" ")
            GameTooltip:AddLine(Pick(HOWTO_TITLE), 1, 0.82, 0)
            for _, line in ipairs(steps) do GameTooltip:AddLine(line, 1, 1, 1, true) end
        end
        GameTooltip:Show()
    end)
    b:SetScript("OnLeave", function() if GameTooltip then GameTooltip:Hide() end end)
    b:SetScript("OnClick", function(self)
        -- Shift-click links the item in chat, like any item button.
        if IsModifiedClick and IsModifiedClick("CHATLINK") and self.itemID then
            local _, link = ItemData(self.itemID)
            if link and ChatEdit_InsertLink then ChatEdit_InsertLink(link) end
        end
    end)
    return b
end

function FDJ.UpdateBossSummon(frame, boss)
    local id = boss and tonumber(boss.summonItem)
    if not id then
        if button then button:Hide() end
        return
    end
    button = button or Create(frame)
    if not button then return end
    local name, _, _, icon = ItemData(id)
    button.itemID = id
    button.label:SetText(Pick(LABEL))
    button.icon:SetTexture(icon)
    button.name:SetText(name)
    button.name:SetTextColor(1.00, 0.82, 0.00)
    button:ClearAllPoints()
    local below = (frame.selectedBossType and frame.selectedBossType:IsShown()) and frame.selectedBossType or frame.selectedBossName
    button:SetPoint("TOPLEFT", below, "BOTTOMLEFT", 0, -4)
    button:SetWidth((button.label:GetStringWidth() or 60) + 25 + (button.name:GetStringWidth() or 100))
    button:Show()
end
