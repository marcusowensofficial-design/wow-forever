-- Forever runs the modern (12.x) API, where these legacy globals no longer exist.
-- Fall back to their C_ namespace equivalents so the code paths below still work.
local GetItemInfo = GetItemInfo or (C_Item and C_Item.GetItemInfo)
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
    [9240] = { -- Sacred Mallet (Gahz'rilla)
        enUS = {
            "1. Defeat Qiaga the Keeper atop the Altar of Zul in the Hinterlands (49, 68) to loot the Unfired Sacred Mallet.",
            "2. Bring the mallet to the altar atop Jintha'Alor in the Hinterlands (59, 79) and use it to craft the Sacred Mallet.",
            "3. Strike the Gong of Zul'Farrak inside Zul'Farrak to summon Gahz'rilla.",
        },
        deDE = {
            "1. Besiegt Qiaga die Bewahrerin auf dem Altar von Zul im Hinterland (49, 68), um den Ungebrannten heiligen Hammer zu erbeuten.",
            "2. Bringt den Hammer zum Altar auf der Spitze von Jintha'Alor im Hinterland (59, 79) und benutzt ihn, um den Heiligen Hammer herzustellen.",
            "3. Schlagt den Gong von Zul'Farrak in Zul'Farrak, um Gahz'rilla zu beschwören.",
        },
        frFR = {
            "1. Battez Qiaga la Gardienne au sommet de l'autel de Zul dans les Hinterlands (49, 68) pour récupérer le Maillet sacré cru.",
            "2. Apportez le maillet à l'autel au sommet de Jintha'Alor dans les Hinterlands (59, 79) et utilisez-le pour forger le Maillet sacré.",
            "3. Frappez le gong de Zul'Farrak à l'intérieur de Zul'Farrak pour invoquer Gahz'rilla.",
        },
        esES = {
            "1. Derrota a Qiaga la Guardiana en lo alto del Altar de Zul en las Tierras del Interior (49, 68) para despojar el Mazo sagrado sin forjar.",
            "2. Lleva el mazo al altar en lo alto de Jintha'Alor en las Tierras del Interior (59, 79) y úsalo para crear el Mazo sagrado.",
            "3. Golpea el gong de Zul'Farrak dentro de Zul'Farrak para invocar a Gahz'rilla.",
        },
        itIT = {
            "1. Sconfiggi Qiaga la Custode in cima all'Altare di Zul nelle Entroterre (49, 68) per ottenere il Maglio Sacro Grezzo.",
            "2. Porta il maglio all'altare in cima a Jintha'Alor nelle Entroterre (59, 79) e usalo per creare il Maglio Sacro.",
            "3. Suona il Gong di Zul'Farrak dentro Zul'Farrak per evocare Gahz'rilla.",
        },
        ptBR = {
            "1. Derrote Qiaga, a Guardiã, no topo do Altar de Zul nas Terras Agrestes (49, 68) para saquear o Malho Sagrado Bruto.",
            "2. Leve o malho ao altar no topo de Jintha'Alor nas Terras Agrestes (59, 79) e use-o para criar o Malho Sagrado.",
            "3. Bata no Gongo de Zul'Farrak dentro de Zul'Farrak para invocar Gahz'rilla.",
        },
        ruRU = {
            "1. Победите Киагу Хранительницу на вершине Алтаря Зул во Внутренних землях (49, 68), чтобы добыть Необожженный священный молот.",
            "2. Отнесите молот к алтарю на вершине Джинта'Алора во Внутренних землях (59, 79) и используйте его, чтобы создать Священный молот.",
            "3. Ударьте в гонг Зул'Фаррака внутри Зул'Фаррака, чтобы призвать Газ'риллу.",
        },
        koKR = {
            "1. 동부 내륙지 줄의 제단(49, 68) 정상에서 문지기 키아가를 처치해 달구지 않은 신성한 망치를 획득하세요.",
            "2. 망치를 동부 내륙지 진타알로 정상(59, 79)의 제단으로 가져가 사용해 신성한 망치를 만드세요.",
            "3. 줄파락 내부에서 줄파락의 징을 울려 가즈릴라를 소환하세요.",
        },
        zhCN = {
            "1. 在辛特兰祖尔祭坛顶部（49, 68）击败看守者琪亚伽，拾取未淬火的神圣之锤。",
            "2. 将锤子带到辛特兰辛萨罗顶部（59, 79）的祭坛并点击使用，制成神圣之锤。",
            "3. 在祖尔法拉克内敲响祖尔法拉克之锣即可召唤加兹瑞拉。",
        },
        zhTW = {
            "1. 在辛特蘭祖爾祭壇頂部（49, 68）擊敗看守者琪亞伽，拾取未焠火的神聖之錘。",
            "2. 將錘子帶到辛特蘭辛薩羅頂部（59, 79）的祭壇並使用，製成神聖之錘。",
            "3. 在祖爾法拉克內敲響祖爾法拉克之鑼即可召喚加茲瑞拉。",
        },
    },
    [10465] = { -- Egg of Hakkar (Avatar of Hakkar)
        enUS = {
            "1. Complete the Screeching Spirits quest chain in Feralas and Tanaris with Yeh'kinya at Steamwheedle Port.",
            "2. Receive the Egg of Hakkar from Yeh'kinya for the quest 'The God Hakkar'.",
            "3. Activate the Egg of Hakkar inside the Hall of Masks in Sunken Temple and extinguish the Eternal Flames to summon the Avatar of Hakkar.",
        },
        deDE = {
            "1. Schließt die Questreihe 'Kreischende Geister' in Feralas und Tanaris bei Yeh'kinya in Dampfdruckpier ab.",
            "2. Erhaltet das Ei von Hakkar von Yeh'kinya für die Quest 'Der Gott Hakkar'.",
            "3. Aktiviert das Ei von Hakkar in der Halle der Masken im Versunkenen Tempel und löscht die Ewigen Flammen, um den Avatar von Hakkar zu beschwören.",
        },
        frFR = {
            "1. Terminez la suite de quêtes des Esprits hurleurs en Féralas et Tanaris auprès de Yeh'kinya à Port Gentepression.",
            "2. Recevez l'Œuf d'Hakkar de Yeh'kinya pour la quête 'Le dieu Hakkar'.",
            "3. Activez l'Œuf d'Hakkar dans la salle des Masques du Temple englouti et éteignez les Flammes éternelles pour invoquer l'Avatar d'Hakkar.",
        },
        esES = {
            "1. Completa la cadena de misiones 'Espíritus chillones' en Feralas y Tanaris con Yeh'kinya en Puerto Bonvapor.",
            "2. Recibe el Huevo de Hakkar de Yeh'kinya para la misión 'El dios Hakkar'.",
            "3. Activa el Huevo de Hakkar dentro de la Sala de las Máscaras en el Templo Sumergido y apaga las Llamas Eternas para invocar al Avatar de Hakkar.",
        },
        itIT = {
            "1. Completa la serie di missioni 'Spiriti Stridenti' a Feralas e Tanaris da Yeh'kinya a Porto Spruguglio.",
            "2. Ricevi l'Uovo di Hakkar da Yeh'kinya per la missione 'Il dio Hakkar'.",
            "3. Attiva l'Uovo di Hakkar nella Sala delle Maschere del Tempio Sommerso e spegni le Fiamme Eterne per evocare l'Avatar di Hakkar.",
        },
        ptBR = {
            "1. Complete a série de missões 'Espíritos Guinchantes' em Feralas e Tanaris com Yeh'kinya em Porto Bondebico.",
            "2. Receba o Ovo de Hakkar de Yeh'kinya para a missão 'O Deus Hakkar'.",
            "3. Ative o Ovo de Hakkar no Salão das Máscaras no Templo Submerso e apague as Chamas Eternas para invocar o Avatar de Hakkar.",
        },
        ruRU = {
            "1. Завершите цепочку заданий «Визжащие духи» в Фераласе и Танарисе у Йе'киньи в Порту Хитрой Шестеренки.",
            "2. Получите Яйцо Хаккара у Йе'киньи для задания «Бог Хаккар».",
            "3. Активируйте Яйцо Хаккара в Зале Масок Затонувшего храма и погасите Вечные огни, чтобы призвать Аватару Хаккара.",
        },
        koKR = {
            "1. 스팀휘들 항구의 예킨야에게서 페랄라스와 타나리스의 '비명소리 영혼' 연계 퀘스트를 완료하세요.",
            "2. '신 학카르' 퀘스트로 예킨야에게서 학카르의 알을 받으세요.",
            "3. 가라앉은 사원의 가면의 전당에서 학카르의 알을 사용하고 영원의 불꽃을 꺼 학카르의 화신을 소환하세요.",
        },
        zhCN = {
            "1. 在菲拉斯和塔纳利斯完成热砂港叶基亚的“尖啸者的灵魂”任务线。",
            "2. 从叶基亚处接取任务“神灵哈卡”并获得哈卡之卵。",
            "3. 在沉没的神庙面具大厅中使用哈卡之卵，熄灭永恒烈焰即可召唤哈卡的化身。",
        },
        zhTW = {
            "1. 在菲拉斯與塔納利斯完成熱砂港葉基亞的「尖嘯者的靈魂」任務線。",
            "2. 從葉基亞處接取任務「神靈哈卡」並獲得哈卡之卵。",
            "3. 在沉沒的神廟面具大廳中使用哈卡之卵並熄滅永恆烈焰，即可召喚哈卡的化身。",
        },
    },
    [13544] = { -- Blood of Innocents (Kirtonos the Herald)
        enUS = {
            "1. Complete Eva Sarkhoff's quest outside Scholomance ('Doctor Theolen Krastinov, the Butcher').",
            "2. Defeat Doctor Theolen Krastinov inside Scholomance and loot the Blood of Innocents.",
            "3. Return to Eva Sarkhoff to receive the Brazier of Beckoning, then light it on the balcony to summon Kirtonos the Herald.",
        },
        deDE = {
            "1. Schließt Eva Sarkhoffs Quest außerhalb von Scholomance ('Doktor Theolen Krastinov, der Schlächter') ab.",
            "2. Besiegt Doktor Theolen Krastinov in Scholomance und erbeutet das Blut der Unschuldigen.",
            "3. Kehrt zu Eva Sarkhoff zurück, um das Kohlenbecken der Herbeirufung zu erhalten, und entzündet es auf dem Balkon, um Kirtonos den Herold zu beschwören.",
        },
        frFR = {
            "1. Terminez la quête d'Eva Sarkhoff devant la Scholomance ('Docteur Theolen Krastinov, le boucher').",
            "2. Battez le docteur Theolen Krastinov à l'intérieur de la Scholomance et récupérez le Sang des innocents.",
            "3. Retournez voir Eva Sarkhoff pour obtenir le Brasero d'invocation, puis allumez-le sur le balcon pour invoquer Kirtonos le Héraut.",
        },
        esES = {
            "1. Completa la misión de Eva Sarkhoff a las afueras de Scholomance ('Doctor Theolen Krastinov, el Carnicero').",
            "2. Derrota al doctor Theolen Krastinov dentro de Scholomance y despoja la Sangre de inocentes.",
            "3. Vuelve con Eva Sarkhoff para recibir el Blandón de llamada y enciéndelo en el balcón para invocar a Kirtonos el Heraldo.",
        },
        itIT = {
            "1. Completa la missione di Eva Sarkhoff fuori da Scholomance ('Il Dottor Theolen Krastinov, il Macellaio').",
            "2. Sconfiggi il Dottor Theolen Krastinov dentro Scholomance e ottieni il Sangue degli Innocenti.",
            "3. Torna da Eva Sarkhoff per ricevere il Braciere dell'Invocazione, poi accendilo sul balcone per evocare Kirtonos l'Araldo.",
        },
        ptBR = {
            "1. Complete a missão de Eva Sarkhoff fora de Scolomântia ('Doutor Theolen Krastinov, o Açougueiro').",
            "2. Derrote o Doutor Theolen Krastinov dentro de Scolomântia e saqueie o Sangue dos Inocentes.",
            "3. Retorne a Eva Sarkhoff para receber o Braseiro de Convocação e acenda-o na sacada para invocar Kirtonos, o Arauto.",
        },
        ruRU = {
            "1. Выполните задание Евы Саркхофф у входа в Некроситет («Доктор Теолен Крастинов, мясник»).",
            "2. Победите доктора Теоленом Крастинова внутри Некроситета и добудьте Кровь невинных.",
            "3. Вернитесь к Еве Саркхофф за Жаровней призыва и зажгите ее на балконе, чтобы призвать Киртоноса Вестника.",
        },
        koKR = {
            "1. 스칼로맨스 밖의 에바 사크호프에게서 '도살자 텔렌 크라스티노프 박사' 퀘스트를 완료하세요.",
            "2. 스칼로맨스 내부에서 텔렌 크라스티노프 박사를 처치하고 순수한 피를 획득하세요.",
            "3. 에바 사크호프에게 돌아가 부름의 화로를 받은 뒤, 발코니에서 불을 붙여 사자 키르토노스를 소환하세요.",
        },
        zhCN = {
            "1. 在通灵学院外完成艾瓦·萨克霍夫的任务（“屠夫瑟尔林·卡斯迪诺夫教授”）。",
            "2. 在通灵学院内击败瑟尔林·卡斯迪诺夫教授并拾取无辜者之血。",
            "3. 返回艾瓦·萨克霍夫处获得召唤火盆，随后在露台点燃它即可召唤传令官基尔图诺斯。",
        },
        zhTW = {
            "1. 在通靈學院外完成艾瓦·薩克霍夫的任務（「屠夫瑟爾林·卡斯迪諾夫教授」）。",
            "2. 在通靈學院內擊敗瑟爾林·卡斯迪諾夫教授並拾取無辜者之血。",
            "3. 返回艾瓦·薩克霍夫處取得召喚火盆，隨後在露台點燃它即可召喚傳令官基爾圖諾斯。",
        },
    },
}
local FALLBACK_NAMES = { [275989] = "Tome of Dalaran", [9240] = "Sacred Mallet", [10465] = "Egg of Hakkar", [13544] = "Blood of Innocents" }

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

local button, companionLabel

local function L(key, ...)
    if FDJ.L then return FDJ.L(key, ...) end
    return key
end

local function QuestTitleFromData(page, questID)
    if FDJ.LocalizeQuestField then
        local locName = FDJ.LocalizeQuestField(questID, "name", nil)
        if type(locName) == "string" and locName ~= "" then return locName end
    end
    local dung = page and FDJ.DB and FDJ.DB[page]
    if dung and dung.quests then
        for _, q in ipairs(dung.quests) do
            if q.id == questID and type(q.name) == "string" then
                return q.name
            end
        end
    end
    local stepDetails = FDJ.QUEST_PREREQ_DETAILS and FDJ.QUEST_PREREQ_DETAILS[questID]
    if stepDetails and type(stepDetails.name) == "string" then
        return stepDetails.name
    end
    return "Quest #" .. tostring(questID)
end

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
        if not GameTooltip then return end
        if self.spawnQuest then
            GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
            GameTooltip:SetText(self.spawnTitle or "", 1, 0.82, 0)
            if self.spawnQuest.page then
                local pageName = FDJ.LocalizeDungeonName and FDJ.LocalizeDungeonName(self.spawnQuest.page) or self.spawnQuest.page
                GameTooltip:AddLine(pageName, 1, 1, 1, true)
            end
            GameTooltip:Show()
            return
        end
        if not self.itemID then return end
        GameTooltip:SetOwner(self, "ANCHOR_RIGHT")
        local _, link = ItemData(self.itemID)
        local ok = pcall(GameTooltip.SetHyperlink, GameTooltip, link or ("item:" .. self.itemID))
        if ok then
            if FDJ.AddUnseenItemHint then FDJ.AddUnseenItemHint(GameTooltip) end
        else
            GameTooltip:AddLine(ItemData(self.itemID), 0, 0.44, 0.87)
        end
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
        if self.spawnQuest and FDJ.OpenQuestPage then
            FDJ.OpenQuestPage(self.spawnQuest.page, self.spawnQuest.quest)
            return
        end
        -- Shift-click links the item in chat, like any item button.
        if self.itemID then
            local _, link = ItemData(self.itemID)
            if FDJ.HandleModifiedItemClick and FDJ.HandleModifiedItemClick(link, self.itemID) then
                return
            end
        end
    end)
    return b
end

function FDJ.UpdateBossSummon(frame, boss)
    local below = (frame.selectedBossType and frame.selectedBossType:IsShown()) and frame.selectedBossType or frame.selectedBossName
    local id = boss and tonumber(boss.summonItem)
    local sq = (not id) and boss and type(boss.spawnQuest) == "table" and tonumber(boss.spawnQuest.quest) and boss.spawnQuest or nil

    if id then
        button = button or Create(frame)
        if button then
            local name, _, _, icon = ItemData(id)
            button.itemID = id
            button.spawnQuest = nil
            button.spawnTitle = nil
            button.label:SetText(Pick(LABEL))
            button.icon:SetTexture(icon)
            button.name:SetText(name)
            button.name:SetTextColor(1.00, 0.82, 0.00)
            button:ClearAllPoints()
            button:SetPoint("TOPLEFT", below, "BOTTOMLEFT", 0, -4)
            button:SetWidth((button.label:GetStringWidth() or 60) + 25 + (button.name:GetStringWidth() or 100))
            button:Show()
            below = button
        end
    elseif sq then
        button = button or Create(frame)
        if button then
            local title = QuestTitleFromData(sq.page, sq.quest)
            button.itemID = nil
            button.spawnQuest = sq
            button.spawnTitle = title
            local spawnLabel = L("SPAWNED_BY_QUEST")
            if spawnLabel == "SPAWNED_BY_QUEST" then spawnLabel = "Spawned by quest:" end
            button.label:SetText(spawnLabel)
            button.icon:SetTexture("Interface\\GossipFrame\\AvailableQuestIcon")
            button.name:SetText(title)
            button.name:SetTextColor(1.00, 0.82, 0.00)
            button:ClearAllPoints()
            button:SetPoint("TOPLEFT", below, "BOTTOMLEFT", 0, -4)
            button:SetWidth((button.label:GetStringWidth() or 80) + 25 + (button.name:GetStringWidth() or 120))
            button:Show()
            below = button
        end
    elseif button then
        button.itemID = nil
        button.spawnQuest = nil
        button.spawnTitle = nil
        button:Hide()
    end

    if boss and type(boss.killWith) == "table" and #boss.killWith > 0 then
        local names = {}
        for _, companion in ipairs(boss.killWith) do
            local cname = type(companion) == "table" and (companion[1] or companion.name) or tostring(companion)
            if cname and cname ~= "" then
                names[#names + 1] = FDJ.LocalizeFreeText and FDJ.LocalizeFreeText(cname) or cname
            end
        end
        if #names > 0 then
            if not companionLabel then
                local parent = frame.selectedBossName and frame.selectedBossName:GetParent()
                if parent then
                    companionLabel = parent:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
                    companionLabel:SetJustifyH("LEFT")
                    companionLabel:SetTextColor(0.95, 0.86, 0.62)
                    companionLabel:SetShadowColor(0, 0, 0, 0.85)
                    companionLabel:SetShadowOffset(1, -1)
                end
            end
            if companionLabel then
                local fmt = L("FIGHTS_WITH")
                if fmt == "FIGHTS_WITH" then fmt = "Fought alongside: %s" end
                companionLabel:SetText(string.format(fmt, table.concat(names, ", ")))
                companionLabel:ClearAllPoints()
                companionLabel:SetPoint("TOPLEFT", below, "BOTTOMLEFT", 0, -3)
                companionLabel:Show()
                return
            end
        end
    end
    if companionLabel then
        companionLabel:SetText("")
        companionLabel:Hide()
    end
end
