local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS
local DB = FDJ.DB or {}

-- Travel help for dungeons whose approach is unusually long or confusing for
-- one faction. The English route is the canonical fallback; localized versions
-- are selected at render time so changing the journal language updates this
-- page immediately without a reload.
local routes = {
    ["Ruins of Lordaeron"] = {
        faction = "Alliance",
        locales = {
            enUS = {
                title = "Alliance Route to Ruins of Lordaeron",
                subtitle = "Alliance route",
                steps = {
                    {
                        title = "Go to Stormwind Harbor",
                        text = "Head to Stormwind Harbor and take the boat to Auberdine. Once you arrive, go to the opposite side of the Auberdine docks and board the ship to Menethil Harbor. Do not get off at Menethil Harbor, stay on the same ship and it will continue to Southshore in Hillsbrad Foothills.",
                        map = { mapID = 1453, x = 0.228, y = 0.560, label = "Auberdine Ship, Stormwind Harbor", detail = "The Auberdine ship leaves from the southernmost dock, Dock 1, in Stormwind Harbor." },
                    },
                    { title = "Follow the road from Southshore", text = "Leave Southshore and follow the road toward Hillsbrad Fields. From there, continue north toward Dalaran." },
                    { title = "Pass around Dalaran", text = "Continue north and go around Dalaran until you reach Lordamere Lake. You do not need to enter Dalaran." },
                    { title = "Swim north through Lordamere Lake", text = "Swim north across Lordamere Lake, passing from the Silverpine area into Tirisfal Glades." },
                    { title = "Follow the road to Undercity", text = "Once you reach Tirisfal Glades, follow the road toward Undercity. Once you enter Undercity, turn left and go upstairs, there's the dungeon entrance." },
                },
            },
            deDE = {
                title = "Allianz-Route zu den Ruinen von Lordaeron",
                subtitle = "Allianz-Route",
                steps = {
                    {
                        title = "Zum Hafen von Sturmwind",
                        text = "Gehe zum Hafen von Sturmwind und nimm das Schiff nach Auberdine. Dort angekommen, geh auf die gegenüberliegende Seite der Auberdine-Docks und steig auf das Schiff nach Menethil. Steig in Menethil nicht aus, bleib auf demselben Schiff, es fährt weiter nach Süderstade im Vorgebirge des Hügellands.",
                        map = { mapID = 1453, x = 0.228, y = 0.560, label = "Schiff nach Auberdine, Hafen von Sturmwind", detail = "Das Schiff nach Auberdine legt am südlichsten Steg, Dock 1, im Hafen von Sturmwind ab." },
                    },
                    { title = "Folge der Straße von Süderstade", text = "Verlasse Süderstade und folge der Straße in Richtung Hügellandhöfe. Von dort aus geh weiter nach Norden in Richtung Dalaran." },
                    { title = "Um Dalaran herum", text = "Gehe weiter nach Norden und um Dalaran herum, bis du den Lordameresee erreichst. Du musst Dalaran nicht betreten." },
                    { title = "Durch den Lordameresee nach Norden schwimmen", text = "Schwimme nach Norden durch den Lordameresee, vom Silberwald aus bis in die Tirisfalglades." },
                    { title = "Folge der Straße nach Unterstadt", text = "Sobald du die Tirisfalglades erreichst, folge der Straße in Richtung Unterstadt. Wenn du Unterstadt betrittst, geh nach links und die Treppe hinauf, dort befindet sich der Dungeoneingang." },
                },
            },
            frFR = {
                title = "Itinéraire Alliance vers les Ruines de Lordaeron",
                subtitle = "Itinéraire Alliance",
                steps = {
                    {
                        title = "Allez au port de Hurlevent",
                        text = "Allez au port de Hurlevent et prenez le bateau pour Auberdine. À votre arrivée, rendez-vous de l'autre côté des quais d'Auberdine et montez à bord du navire pour le port de Menethil. Ne descendez pas à Menethil, restez sur le même navire, il continuera jusqu'à Southshore dans les contreforts de Hautebrande.",
                        map = { mapID = 1453, x = 0.228, y = 0.560, label = "Bateau pour Auberdine, port de Hurlevent", detail = "Le bateau pour Auberdine part du quai le plus au sud, quai 1, au port de Hurlevent." },
                    },
                    { title = "Suivez la route depuis Southshore", text = "Quittez Southshore et suivez la route vers les champs de Hautebrande. De là, continuez vers le nord en direction de Dalaran." },
                    { title = "Contournez Dalaran", text = "Continuez vers le nord et contournez Dalaran jusqu'au lac Lordamere. Il n'est pas nécessaire d'entrer dans Dalaran." },
                    { title = "Nagez vers le nord dans le lac Lordamere", text = "Traversez le lac Lordamere vers le nord, depuis la région de la forêt des Pins argentés jusqu'aux Clairières de Tirisfal." },
                    { title = "Suivez la route vers Fossoyeuse", text = "Une fois dans les Clairières de Tirisfal, suivez la route vers Fossoyeuse. En entrant dans Fossoyeuse, tournez à gauche et montez les escaliers, l'entrée du donjon se trouve là." },
                },
            },
            esES = {
                title = "Ruta de la Alianza a las Ruinas de Lordaeron",
                subtitle = "Ruta de la Alianza",
                steps = {
                    {
                        title = "Ve al Puerto de Ventormenta",
                        text = "Ve al Puerto de Ventormenta y toma el barco a Auberdine. Al llegar, ve al lado opuesto de los muelles de Auberdine y sube al barco hacia el Puerto de Menethil. No bajes en Menethil, quédate en el mismo barco, continuará hasta Costasur en las Laderas de Trabalomas.",
                        map = { mapID = 1453, x = 0.228, y = 0.560, label = "Barco a Auberdine, Puerto de Ventormenta", detail = "El barco a Auberdine sale del muelle más al sur, muelle 1, del Puerto de Ventormenta." },
                    },
                    { title = "Sigue el camino desde Costasur", text = "Sal de Costasur y sigue el camino hacia los Campos de Trabalomas. Desde allí, continúa hacia el norte en dirección a Dalaran." },
                    { title = "Rodea Dalaran", text = "Continúa hacia el norte y rodea Dalaran hasta llegar al Lago Lordamere. No necesitas entrar en Dalaran." },
                    { title = "Nada al norte por el Lago Lordamere", text = "Nada hacia el norte por el Lago Lordamere, pasando desde la zona del Bosque de Argénteos hasta los Claros de Tirisfal." },
                    { title = "Sigue el camino hacia Entrañas", text = "Cuando llegues a los Claros de Tirisfal, sigue el camino hacia Entrañas. Cuando entres en Entrañas, gira a la izquierda y sube las escaleras, allí está la entrada de la mazmorra." },
                },
            },
            itIT = {
                title = "Percorso dell'Alleanza verso le Rovine di Lordaeron",
                subtitle = "Percorso Alleanza",
                steps = {
                    {
                        title = "Vai al Porto di Roccavento",
                        text = "Vai al Porto di Roccavento e prendi la nave per Auberdine. Una volta arrivato, vai sul lato opposto dei moli di Auberdine e sali sulla nave diretta al Porto di Menethil. Non scendere a Menethil, resta sulla stessa nave, proseguirà fino a Southshore nelle Alture di Colletorto.",
                        map = { mapID = 1453, x = 0.228, y = 0.560, label = "Nave per Auberdine, Porto di Roccavento", detail = "La nave per Auberdine parte dal molo più a sud, Molo 1, del Porto di Roccavento." },
                    },
                    { title = "Segui la strada da Southshore", text = "Lascia Southshore e segui la strada verso i Campi di Hillsbrad. Da lì, continua verso nord in direzione di Dalaran." },
                    { title = "Passa attorno a Dalaran", text = "Continua verso nord e passa attorno a Dalaran finché non raggiungi il Lago Lordamere. Non è necessario entrare a Dalaran." },
                    { title = "Nuota verso nord nel Lago Lordamere", text = "Nuota verso nord attraverso il Lago Lordamere, passando dalla zona di Selva Pinargento alle Radure di Tirisfal." },
                    { title = "Segui la strada verso Sepulcra", text = "Quando raggiungi le Radure di Tirisfal, segui la strada verso Sepulcra. Una volta entrato a Sepulcra, gira a sinistra e sali le scale, lì si trova l'ingresso della spedizione." },
                },
            },
            ptBR = {
                title = "Rota da Aliança até as Ruínas de Lordaeron",
                subtitle = "Rota da Aliança",
                steps = {
                    {
                        title = "Vá ao Porto de Ventobravo",
                        text = "Vá ao Porto de Ventobravo e pegue o navio para Auberdine. Ao chegar, vá para o lado oposto das docas de Auberdine e embarque no navio para o Porto de Menethil. Não desça em Menethil, permaneça no mesmo navio, ele seguirá até Costa Sul, no Contraforte de Eira dos Montes.",
                        map = { mapID = 1453, x = 0.228, y = 0.560, label = "Navio para Auberdine, Porto de Ventobravo", detail = "O navio para Auberdine parte do cais mais ao sul, Cais 1, no Porto de Ventobravo." },
                    },
                    { title = "Siga a estrada saindo de Costa Sul", text = "Saia de Costa Sul e siga a estrada em direção aos Campos de Eira dos Montes. De lá, continue para o norte em direção a Dalaran." },
                    { title = "Contorne Dalaran", text = "Continue para o norte e contorne Dalaran até chegar ao Lago Lordamere. Não é necessário entrar em Dalaran." },
                    { title = "Nade para o norte pelo Lago Lordamere", text = "Nade para o norte pelo Lago Lordamere, passando da região da Floresta de Pinhaprata até as Clareiras de Tirisfal." },
                    { title = "Siga a estrada até a Cidade Baixa", text = "Ao chegar às Clareiras de Tirisfal, siga a estrada em direção à Cidade Baixa. Ao entrar na Cidade Baixa, vire à esquerda e suba as escadas, a entrada da masmorra fica ali." },
                },
            },
            ruRU = {
                title = "Маршрут Альянса к Руинам Лордерона",
                subtitle = "Маршрут Альянса",
                steps = {
                    {
                        title = "Отправляйтесь в гавань Штормграда",
                        text = "Отправляйтесь в гавань Штормграда и сядьте на корабль до Аубердина. Прибыв в Аубердин, перейдите на противоположную сторону пристани и сядьте на корабль до гавани Менетилов. В Менетиле не выходите, оставайтесь на том же корабле, он продолжит путь до Южнобережья в Предгорьях Хилсбрада.",
                        map = { mapID = 1453, x = 0.228, y = 0.560, label = "Корабль в Аубердин, гавань Штормграда", detail = "Корабль в Аубердин отправляется от самого южного причала, причал 1, в гавани Штормграда." },
                    },
                    { title = "Следуйте по дороге из Южнобережья", text = "Покиньте Южнобережье и следуйте по дороге к Хилсбрадским полям. Оттуда продолжайте двигаться на север в сторону Даларана." },
                    { title = "Обойдите Даларан", text = "Продолжайте двигаться на север и обойдите Даларан, пока не достигнете озера Лордамер. Заходить в Даларан не нужно." },
                    { title = "Плывите на север через озеро Лордамер", text = "Плывите на север через озеро Лордамер, из Серебряного бора в Тирисфальские леса." },
                    { title = "Следуйте по дороге в Подгород", text = "Добравшись до Тирисфальских лесов, следуйте по дороге к Подгороду. Войдя в Подгород, поверните налево и поднимитесь по лестнице, там находится вход в подземелье." },
                },
            },
        },
    },
}

for dungeonName, route in pairs(routes) do
    if DB[dungeonName] then
        DB[dungeonName].routeGuide = route
    end
end
