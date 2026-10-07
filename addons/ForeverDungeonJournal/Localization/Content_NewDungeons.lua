local ADDON_NAME, FDJ = ...
FDJ = FDJ or _G.ForeverDungeonJournal_NS

-- Translations for the dungeons added in 1.3.8+ (Gnomeregan, Razorfen Kraul,
-- Scarlet Monastery: Graveyard, City of Dalaran, Excavation Site) and their
-- quests, plus whole place names used in quest giver / turn-in lines.
-- Merged into each language table without overwriting existing entries.

FDJ.ContentLocales = FDJ.ContentLocales or {}
local DATA = {}
DATA.deDE = {
    dungeons = {
        ["Gnomeregan"] = { name = "Gnomeregan", location = "Dun Morogh", description = "Die verstrahlte unterirdische Stadt der Gnome, überrannt von Troggs und den Truppen von Robogenieur Thermaplugg." },
        ["Razorfen Kraul"] = { name = "Kral der Klingenhauer", location = "Brachland", description = "Ein weitläufiges Dornenlabyrinth, bewohnt von den Stacheleber des Krals der Klingenhauer." },
        ["Scarlet Monastery: Graveyard"] = { name = "Scharlachrotes Kloster: Friedhof", location = "Tirisfal", description = "Der Friedhofsflügel des Scharlachroten Klosters, heimgesucht von ruhelosen Toten und scharlachroten Verteidigern." },
        ["City of Dalaran"] = { name = "Stadt Dalaran", location = "Alteracgebirge", description = "Die wiederhergestellte Magierstadt Dalaran ist in WoW Forever ein neuer Dungeon für fünf Spieler. Betretet sie durch die Kanalisation und die Schattenseite und kämpft euch durch die Straßen bis zur Violetten Zitadelle." },
        ["Excavation Site: Wetlands"] = { name = "Ausgrabungsstätte: Sumpfland", location = "Sumpfland", description = "Eine in der Zeit gefangene Titanen-Ausgrabungsstätte oberhalb von Whelgars Ausgrabungsstätte, deren Titanenkonstrukte niemandem mehr gehorchen. Bereiche: Verlorene Marsch, Pirscherdickicht, Stätte des Wächters und Verlorene Grabungsstätte." },
    },
    quests = {
        [2930001] = { name = "Weiße Lochkarte", objective = "Tötet Gegner im äußeren Bereich von Gnomeregan, bis eine weiße Lochkarte erbeutet wird.", pickup = "Höhlentiefplünderer, Höhlentiefeindringlinge, verstrahlte Eindringlinge und verwirrte Aussätzige außerhalb der Instanz", turnin = "Behaltet die Karte für Matrixlochkartograph 3005-A", description = "Zufälliger Fund; meist erhaltet ihr sie schon beim ersten Säubern des Außenbereichs." },
        [2930002] = { name = "Gelbe Lochkarte (Lochkartograph 3005-A)", objective = "Benutzt Matrixlochkartograph 3005-A mit der weißen Lochkarte, um eine gelbe Lochkarte zu erhalten.", pickup = "Matrixlochkartograph 3005-A, Werkstattbereich des Zugdepots, außerhalb der Instanz", turnin = "Ihr erhaltet eine gelbe Lochkarte", description = "Die einzigen Lochkartographen außerhalb der Instanz: auf der erhöhten Plattform im Zugdepot und am Werkstatteingang (Hintertür)." },
        [2930003] = { name = "Blaue Lochkarte (Lochkartograph 3005-B)", objective = "Benutzt Matrixlochkartograph 3005-B mit der gelben Lochkarte, um eine blaue Lochkarte zu erhalten.", pickup = "Matrixlochkartograph 3005-B, Schlafsaal (direkt hinter der Reinen Zone), in der Instanz", turnin = "Ihr erhaltet eine blaue Lochkarte", description = "In der Instanz, im Schlafsaal." },
        [2930004] = { name = "Rote Lochkarte (Lochkartograph 3005-C)", objective = "Benutzt Matrixlochkartograph 3005-C mit der blauen Lochkarte, um eine rote Lochkarte zu erhalten.", pickup = "Matrixlochkartograph 3005-C, obere Plattform der Startrampe bei Elektrokutor 6000", turnin = "Ihr erhaltet eine rote Lochkarte", description = "Auf der Plattform von Elektrokutor 6000." },
        [2930005] = { name = "Prismatische Lochkarte (Lochkartograph 3005-D)", objective = "Benutzt Matrixlochkartograph 3005-D mit der roten Lochkarte, um die prismatische Lochkarte zu erhalten, und bringt sie zu Meistermechaniker Gussrohr in Eisenschmiede.", pickup = "Matrixlochkartograph 3005-D, Westseite der unteren Ebene der Ingenieurslabore", turnin = "Meistermechaniker Gussrohr, Tüftlerstadt, Eisenschmiede", description = "Fahrt mit dem Aufzug nach unten; das Terminal steht im ersten Gang rechts." },
        [2922] = { name = "Rettet Techbots Gehirn!", objective = "Bringt Techbots Speicherkern zu Tüftlermeister Funkenschmied in Eisenschmiede." },
        [2926] = { name = "Gnogaine", objective = "Benutzt die leere bleierne Sammelphiole an verstrahlten Eindringlingen oder Plünderern und bringt die volle Phiole zu Ozzie Togglevolt zurück." },
        [2962] = { name = "Gegen grünes Leuchten hilft nur mehr grünes Leuchten", objective = "Bringt hochwirksamen radioaktiven Fallout und die schwere bleierne Sammelphiole zu Ozzie. Der Fallout zerfällt schnell." },
        [2928] = { name = "Gyrobohrmatische Exkavatoren", objective = "Bringt 24 robomechanische Innereien zu Shoni in Sturmwind." },
        [2924] = { name = "Essenzielle Artefakte", objective = "Bringt 12 essenzielle Artefakte zu Klockmort Schraubspanner in Eisenschmiede." },
        [2930] = { name = "Datenrettung", objective = "Bringt eine prismatische Lochkarte zu Meistermechaniker Gussrohr in Eisenschmiede." },
        [2929] = { name = "Der große Verrat", objective = "Tötet Robogenieur Thermaplugg und kehrt zu Hochtüftler Mekkadrill zurück." },
        [2843] = { name = "Gnomer-weeeeeg!", objective = "Wartet, bis Scooty den Goblintransponder kalibriert hat." },
        [2841] = { name = "Bohrturmkriege", objective = "Beschafft die Bohrturmpläne und Thermapluggs Safekombination und bringt sie zu Nogg in Orgrimmar." },
        [2904] = { name = "Ein feines Durcheinander", objective = "Eskortiert Kernobee zum Ausgang des Uhrwerkgangs und erstattet dann Scooty in Beutebucht Bericht." },
        [2951] = { name = "Der Glitzermatic 5200!", objective = "Legt einen schmutzverkrusteten Gegenstand in den Glitzermatic 5200 und werft drei Silbermünzen ein, um die Maschine zu starten." },
        [2945] = { name = "Schmutzverkrusteter Ring", objective = "Findet einen Weg, den Schmutz vom schmutzverkrusteten Ring zu entfernen (benutzt den Glitzermatic 5200)." },
        [1221] = { name = "Blaublattknollen", objective = "Ruft mit der Kiste mit Löchern eine Schnüffelnasenratte und lasst sie mit dem Kommandostab 6 Blaublattknollen finden. Bringt sie mit Stab und Kiste zu Mebok Mizzyrix zurück." },
        [1144] = { name = "Willix der Importeur", objective = "Eskortiert Willix den Importeur aus dem Kral der Klingenhauer." },
        [1142] = { name = "Die Sterblichkeit schwindet", objective = "Findet Treshalas Anhänger und bringt ihn zu Treshala Fallowbrook in Darnassus." },
        [1101] = { name = "Die Vettel des Krals", objective = "Bringt Klingenflankes Medaillon zu Falfindel Wegwahrer in Thalanaar." },
        [1102] = { name = "Ein rachsüchtiges Schicksal", objective = "Bringt Klingenflankes Herz zu Auld Steinspitz in Donnerfels." },
        [1109] = { name = "Guano, guano!", objective = "Bringt 1 Haufen Kralguano von den Fledermäusen des Krals zu Großapotheker Faranell." },
        [6522] = { name = "Eine unheilige Allianz", objective = "Bringt die kleine Schriftrolle zu Varimathras in Unterstadt." },
        [1051] = { name = "Vorrels Rache", objective = "Bringt Vorrel Sengutz' Ehering (von Nancy Vishas) zu Monika Sengutz in Tarrens Mühle." },
        [1113] = { name = "Herzen des Eifers", objective = "Bringt 20 Herzen des Eifers aus dem Scharlachroten Kloster zu Großapotheker Faranell." },
    },
    places = {
        ["Ironforge"] = "Eisenschmiede",
        ["Kharanos"] = "Kharanos",
        ["Dun Morogh"] = "Dun Morogh",
        ["Stormwind City"] = "Sturmwind",
        ["Stormwind"] = "Sturmwind",
        ["Booty Bay"] = "Beutebucht",
        ["Stranglethorn Vale"] = "Schlingendorntal",
        ["Orgrimmar"] = "Orgrimmar",
        ["inside Gnomeregan"] = "in Gnomeregan",
        ["Ratchet"] = "Ratschet",
        ["The Barrens"] = "Brachland",
        ["inside Razorfen Kraul"] = "im Kral der Klingenhauer",
        ["Darnassus"] = "Darnassus",
        ["Thalanaar"] = "Thalanaar",
        ["Feralas"] = "Feralas",
        ["Thunder Bluff"] = "Donnerfels",
        ["Undercity"] = "Unterstadt",
        ["Royal Quarter"] = "Königsviertel",
        ["inside the Graveyard"] = "auf dem Friedhof",
        ["Tarren Mill"] = "Tarrens Mühle",
        ["Hillsbrad Foothills"] = "Vorgebirge des Hügellands",
        ["Dwarven District"] = "Zwergendistrikt",
        ["the Dwarven District"] = "Zwergendistrikt",
    },
}
DATA.frFR = {
    dungeons = {
        ["Gnomeregan"] = { name = "Gnomeregan", location = "Dun Morogh", description = "La cité souterraine irradiée des gnomes, envahie par les troggs et les forces du mekgénieur Thermojoncteur." },
        ["Razorfen Kraul"] = { name = "Kraal de Tranchebauge", location = "Les Tarides", description = "Un vaste labyrinthe de ronces occupé par les huran du Kraal de Tranchebauge." },
        ["Scarlet Monastery: Graveyard"] = { name = "Monastère écarlate : Cimetière", location = "Clairières de Tirisfal", description = "L'aile du cimetière du Monastère écarlate, hantée par des morts sans repos et des défenseurs écarlates." },
        ["City of Dalaran"] = { name = "Cité de Dalaran", location = "Montagnes d'Alterac", description = "La cité des mages restaurée de Dalaran est devenue un nouveau donjon à cinq joueurs dans WoW Forever. Entrez par les égouts et les Entrailles, puis frayez-vous un chemin dans les rues jusqu'à la Citadelle pourpre." },
        ["Excavation Site: Wetlands"] = { name = "Site de fouilles : Les Paluns", location = "Les Paluns", description = "Un site de fouilles titan figé dans le temps au-dessus du site de Whelgar, où des assemblages titans n'obéissent plus à personne. Zones : Marais perdu, Fourré des traqueurs, Site du gardien et Site de fouilles perdu." },
    },
    quests = {
        [2930001] = { name = "Carte perforée blanche", objective = "Tuez des monstres dans la zone extérieure de Gnomeregan jusqu'à obtenir une carte perforée blanche.", pickup = "Pillards des Cavernes, envahisseurs des Cavernes, envahisseurs irradiés et lépreux désorientés, hors de l'instance", turnin = "Gardez la carte pour la Matrice de perforation 3005-A", description = "Butin aléatoire ; on l'obtient en général dès le premier nettoyage de la zone extérieure." },
        [2930002] = { name = "Carte perforée jaune (perforatrice 3005-A)", objective = "Utilisez la Matrice de perforation 3005-A avec la carte blanche pour obtenir une carte perforée jaune.", pickup = "Matrice de perforation 3005-A, atelier du dépôt de trains, hors de l'instance", turnin = "Vous obtenez une carte perforée jaune", description = "Les seules perforatrices hors de l'instance : sur la plate-forme surélevée du dépôt et près de l'entrée de l'atelier (porte arrière)." },
        [2930003] = { name = "Carte perforée bleue (perforatrice 3005-B)", objective = "Utilisez la Matrice de perforation 3005-B avec la carte jaune pour obtenir une carte perforée bleue.", pickup = "Matrice de perforation 3005-B, le Dortoir (juste après la Zone propre), dans l'instance", turnin = "Vous obtenez une carte perforée bleue", description = "Dans l'instance, au Dortoir." },
        [2930004] = { name = "Carte perforée rouge (perforatrice 3005-C)", objective = "Utilisez la Matrice de perforation 3005-C avec la carte bleue pour obtenir une carte perforée rouge.", pickup = "Matrice de perforation 3005-C, plate-forme supérieure de la Baie de lancement avec l'Électrocuteur 6000", turnin = "Vous obtenez une carte perforée rouge", description = "Sur la plate-forme de l'Électrocuteur 6000." },
        [2930005] = { name = "Carte perforée prismatique (perforatrice 3005-D)", objective = "Utilisez la Matrice de perforation 3005-D avec la carte rouge pour obtenir la carte perforée prismatique, puis apportez-la au maître mécanicien Tuyautuyère à Forgefer.", pickup = "Matrice de perforation 3005-D, côté ouest du niveau inférieur des Laboratoires d'ingénierie", turnin = "Maître mécanicien Tuyautuyère, Brikabrok, Forgefer", description = "Prenez l'ascenseur vers le bas ; le terminal est dans le premier passage à droite." },
        [2922] = { name = "Sauvez le cerveau de Technobot !", objective = "Apportez le noyau de mémoire de Technobot au maître bricoleur Mégamécanique à Forgefer." },
        [2926] = { name = "Gnogaine", objective = "Utilisez la fiole de collecte plombée vide sur des envahisseurs ou pillards irradiés, puis rapportez la fiole pleine à Ozzie Gueule-de-ressort." },
        [2962] = { name = "Le seul remède, c'est plus de lueur verte", objective = "Rapportez à Ozzie des retombées radioactives très puissantes et la lourde fiole de collecte plombée. Les retombées se dégradent vite." },
        [2928] = { name = "Excavateurs gyroforeurs", objective = "Apportez 24 entrailles robomécaniques à Shoni à Hurlevent." },
        [2924] = { name = "Artificiels essentiels", objective = "Apportez 12 artificiels essentiels à Klockmort Serrécrou à Forgefer." },
        [2930] = { name = "Sauvetage de données", objective = "Apportez une carte perforée prismatique au maître mécanicien Tuyautuyère à Forgefer." },
        [2929] = { name = "La grande trahison", objective = "Tuez le mekgénieur Thermojoncteur et retournez voir le Grand Bricoleur Mekkanivelle." },
        [2843] = { name = "Gnomer-partiiii !", objective = "Attendez que Scooty calibre le transpondeur gobelin." },
        [2841] = { name = "La guerre des derricks", objective = "Récupérez les plans du derrick et la combinaison du coffre de Thermojoncteur et apportez-les à Nogg à Orgrimmar." },
        [2904] = { name = "Un beau gâchis", objective = "Escortez Kernobee jusqu'à la sortie du Couloir mécanique, puis faites votre rapport à Scooty à Baie-du-Butin." },
        [2951] = { name = "L'Étincelomatic 5200 !", objective = "Placez un objet couvert de crasse dans l'Étincelomatic 5200 avec trois pièces d'argent pour lancer la machine." },
        [2945] = { name = "Anneau couvert de crasse", objective = "Trouvez un moyen de nettoyer l'anneau couvert de crasse (utilisez l'Étincelomatic 5200)." },
        [1221] = { name = "Tubercules de bleufeuille", objective = "Utilisez la caisse percée pour invoquer un rat fouisseur et le bâton de commandement pour lui faire trouver 6 tubercules de bleufeuille. Rapportez-les, avec le bâton et la caisse, à Mebok Mizzyrix." },
        [1144] = { name = "Willix l'Importateur", objective = "Escortez Willix l'Importateur hors du Kraal de Tranchebauge." },
        [1142] = { name = "La mortalité décline", objective = "Trouvez le pendentif de Treshala et rapportez-le à Treshala Fallowbrook à Darnassus." },
        [1101] = { name = "La mégère du Kraal", objective = "Apportez le médaillon de Tranchecôte à Falfindel Waywarder à Thalanaar." },
        [1102] = { name = "Une vengeance funeste", objective = "Apportez le cœur de Tranchecôte à Auld Pierre-Haute aux Pitons-du-Tonnerre." },
        [1109] = { name = "Guano, guano !", objective = "Apportez 1 tas de guano du Kraal des chauves-souris du Kraal au grand apothicaire Faranell." },
        [6522] = { name = "Une alliance impie", objective = "Apportez le petit parchemin à Varimathras à Fossoyeuse." },
        [1051] = { name = "La vengeance de Vorrel", objective = "Rapportez l'alliance de Vorrel Sengutz (prise sur Nancy Vishas) à Monika Sengutz à Moulin-de-Tarren." },
        [1113] = { name = "Cœurs de zèle", objective = "Apportez 20 cœurs de zèle du Monastère écarlate au grand apothicaire Faranell." },
    },
    places = {
        ["Ironforge"] = "Forgefer",
        ["Kharanos"] = "Kharanos",
        ["Dun Morogh"] = "Dun Morogh",
        ["Stormwind City"] = "Hurlevent",
        ["Stormwind"] = "Hurlevent",
        ["Booty Bay"] = "Baie-du-Butin",
        ["Stranglethorn Vale"] = "Vallée de Strangleronce",
        ["Orgrimmar"] = "Orgrimmar",
        ["inside Gnomeregan"] = "dans Gnomeregan",
        ["Ratchet"] = "Cabestan",
        ["The Barrens"] = "Les Tarides",
        ["inside Razorfen Kraul"] = "dans le Kraal de Tranchebauge",
        ["Darnassus"] = "Darnassus",
        ["Thalanaar"] = "Thalanaar",
        ["Feralas"] = "Féralas",
        ["Thunder Bluff"] = "Les Pitons-du-Tonnerre",
        ["Undercity"] = "Fossoyeuse",
        ["Royal Quarter"] = "Quartier royal",
        ["inside the Graveyard"] = "dans le Cimetière",
        ["Tarren Mill"] = "Moulin-de-Tarren",
        ["Hillsbrad Foothills"] = "Contreforts de Hautebrande",
        ["Dwarven District"] = "Quartier des Nains",
        ["the Dwarven District"] = "Quartier des Nains",
    },
}
DATA.esES = {
    dungeons = {
        ["Gnomeregan"] = { name = "Gnomeregan", location = "Dun Morogh", description = "La ciudad subterránea irradiada de los gnomos, invadida por troggs y las fuerzas del mekigeniero Termochufe." },
        ["Razorfen Kraul"] = { name = "Horado Rajacieno", location = "Los Baldíos", description = "Un enorme laberinto de espinas ocupado por los jabaespín del Horado Rajacieno." },
        ["Scarlet Monastery: Graveyard"] = { name = "Monasterio Escarlata: Cementerio", location = "Claros de Tirisfal", description = "El ala del cementerio del Monasterio Escarlata, embrujada por muertos inquietos y defensores escarlata." },
        ["City of Dalaran"] = { name = "Ciudad de Dalaran", location = "Montañas de Alterac", description = "La restaurada ciudad de los magos, Dalaran, es una nueva mazmorra para cinco jugadores en WoW Forever. Entra por las cloacas y la Ciénaga, y abre paso por las calles hasta la Ciudadela Violeta." },
        ["Excavation Site: Wetlands"] = { name = "Excavación: Los Humedales", location = "Los Humedales", description = "Una excavación titánica atrapada en el tiempo sobre la Excavación de Whelgar, donde los ensamblajes titánicos ya no obedecen a nadie. Zonas: Marjal Perdido, Espesura del Acechador, Lugar del Guardián y Excavación Perdida." },
    },
    quests = {
        [2930001] = { name = "Tarjeta perforada blanca", objective = "Mata enemigos en la zona exterior de Gnomeregan hasta que caiga una tarjeta perforada blanca.", pickup = "Saqueadores, invasores de las Profundidades, invasores irradiados y leprosos aturdidos, fuera de la instancia", turnin = "Guarda la tarjeta para la Perforadora matricial 3005-A", description = "Botín aleatorio; normalmente la consigues en la primera limpieza de la zona exterior." },
        [2930002] = { name = "Tarjeta perforada amarilla (perforadora 3005-A)", objective = "Usa la Perforadora matricial 3005-A con la tarjeta blanca para obtener una tarjeta perforada amarilla.", pickup = "Perforadora matricial 3005-A, zona del taller de la estación de tren, fuera de la instancia", turnin = "Recibes una tarjeta perforada amarilla", description = "Las únicas perforadoras fuera de la instancia: en la plataforma elevada de la estación y junto a la entrada del taller (puerta trasera)." },
        [2930003] = { name = "Tarjeta perforada azul (perforadora 3005-B)", objective = "Usa la Perforadora matricial 3005-B con la tarjeta amarilla para obtener una tarjeta perforada azul.", pickup = "Perforadora matricial 3005-B, el Dormitorio (justo después de la Zona Limpia), dentro de la instancia", turnin = "Recibes una tarjeta perforada azul", description = "Dentro de la instancia, en el Dormitorio." },
        [2930004] = { name = "Tarjeta perforada roja (perforadora 3005-C)", objective = "Usa la Perforadora matricial 3005-C con la tarjeta azul para obtener una tarjeta perforada roja.", pickup = "Perforadora matricial 3005-C, plataforma superior de la Bahía de Lanzamiento con Electrocutor 6000", turnin = "Recibes una tarjeta perforada roja", description = "En la plataforma de Electrocutor 6000." },
        [2930005] = { name = "Tarjeta perforada prismática (perforadora 3005-D)", objective = "Usa la Perforadora matricial 3005-D con la tarjeta roja para obtener la tarjeta perforada prismática y llévala al maestro mecánico Tubosoldado en Forjaz.", pickup = "Perforadora matricial 3005-D, lado oeste del nivel inferior de los Laboratorios de Ingeniería", turnin = "Maestro mecánico Tubosoldado, Ciudad Manitas, Forjaz", description = "Baja en el ascensor; el terminal está en el primer pasillo a la derecha." },
        [2922] = { name = "¡Salvad el cerebro de Técnibot!", objective = "Lleva el núcleo de memoria de Técnibot al maestro manitas Sobrechispa en Forjaz." },
        [2926] = { name = "Gnogaína", objective = "Usa el vial de recolección emplomado vacío con invasores o saqueadores irradiados y devuelve el vial lleno a Ozzie Togglevolt." },
        [2962] = { name = "La única cura es más brillo verde", objective = "Lleva a Ozzie radiación de alta potencia y el vial de recolección emplomado pesado. La radiación se degrada rápido." },
        [2928] = { name = "Excavadoras girotaladradoras", objective = "Lleva 24 entrañas robomecánicas a Shoni en Ventormenta." },
        [2924] = { name = "Artificiales esenciales", objective = "Lleva 12 artificiales esenciales a Klockmort Llavinglesa en Forjaz." },
        [2930] = { name = "Rescate de datos", objective = "Lleva una tarjeta perforada prismática al maestro mecánico Tubosoldado en Forjaz." },
        [2929] = { name = "La gran traición", objective = "Mata al mekigeniero Termochufe y vuelve con el Manitas Mayor Mekkatorque." },
        [2843] = { name = "¡Gnomer-ahí vaaaa!", objective = "Espera a que Scooty calibre el transpondedor goblin." },
        [2841] = { name = "La guerra de las torres", objective = "Consigue los planos de la torre y la combinación de la caja fuerte de Termochufe y llévalos a Nogg en Orgrimmar." },
        [2904] = { name = "Un buen lío", objective = "Escolta a Kernobee hasta la salida del Pasaje del Engranaje y después informa a Scooty en Bahía del Botín." },
        [2951] = { name = "¡El Destellomático 5200!", objective = "Introduce un objeto mugriento en el Destellomático 5200 junto con tres monedas de plata para poner en marcha la máquina." },
        [2945] = { name = "Anillo mugriento", objective = "Encuentra la forma de limpiar el anillo mugriento (usa el Destellomático 5200)." },
        [1221] = { name = "Tubérculos de hojazul", objective = "Usa la caja agujereada para invocar a una rata hocicona y el bastón de mando para que encuentre 6 tubérculos de hojazul. Llévalos, junto al bastón y la caja, a Mebok Mizzyrix." },
        [1144] = { name = "Willix el Importador", objective = "Escolta a Willix el Importador fuera del Horado Rajacieno." },
        [1142] = { name = "La mortalidad mengua", objective = "Encuentra el colgante de Treshala y devuélveselo a Treshala Fallowbrook en Darnassus." },
        [1101] = { name = "La vieja del Horado", objective = "Lleva el medallón de Flancodecuchillo a Falfindel Waywarder en Thalanaar." },
        [1102] = { name = "Un destino vengativo", objective = "Lleva el corazón de Flancodecuchillo a Auld Piedra Pétrea en Cima del Trueno." },
        [1109] = { name = "¡Guano, guano!", objective = "Lleva 1 montón de guano del Horado de los murciélagos del Horado al maestro boticario Faranell." },
        [6522] = { name = "Una alianza impía", objective = "Lleva el pergamino pequeño a Varimathras en Entrañas." },
        [1051] = { name = "La venganza de Vorrel", objective = "Devuelve el anillo de boda de Vorrel Sengutz (de Nancy Vishas) a Monika Sengutz en Molino Tarren." },
        [1113] = { name = "Corazones de fervor", objective = "Lleva 20 corazones de fervor del Monasterio Escarlata al maestro boticario Faranell." },
    },
    places = {
        ["Ironforge"] = "Forjaz",
        ["Kharanos"] = "Kharanos",
        ["Dun Morogh"] = "Dun Morogh",
        ["Stormwind City"] = "Ventormenta",
        ["Stormwind"] = "Ventormenta",
        ["Booty Bay"] = "Bahía del Botín",
        ["Stranglethorn Vale"] = "Vega de Tuercespina",
        ["Orgrimmar"] = "Orgrimmar",
        ["inside Gnomeregan"] = "dentro de Gnomeregan",
        ["Ratchet"] = "Trinquete",
        ["The Barrens"] = "Los Baldíos",
        ["inside Razorfen Kraul"] = "dentro del Horado Rajacieno",
        ["Darnassus"] = "Darnassus",
        ["Thalanaar"] = "Thalanaar",
        ["Feralas"] = "Feralas",
        ["Thunder Bluff"] = "Cima del Trueno",
        ["Undercity"] = "Entrañas",
        ["Royal Quarter"] = "Barrio Real",
        ["inside the Graveyard"] = "dentro del Cementerio",
        ["Tarren Mill"] = "Molino Tarren",
        ["Hillsbrad Foothills"] = "Laderas de Trabalomas",
        ["Dwarven District"] = "Distrito de los Enanos",
        ["the Dwarven District"] = "Distrito de los Enanos",
    },
}
DATA.itIT = {
    dungeons = {
        ["Gnomeregan"] = { name = "Gnomeregan", location = "Dun Morogh", description = "La città sotterranea irradiata degli gnomi, invasa dai trogg e dalle forze del Meccagegnere Termospina." },
        ["Razorfen Kraul"] = { name = "Kraul di Lamaspina", location = "Savane", description = "Un vasto labirinto di rovi occupato dai cinghialidi del Kraul di Lamaspina." },
        ["Scarlet Monastery: Graveyard"] = { name = "Monastero Scarlatto: Cimitero", location = "Radure di Tirisfal", description = "L'ala del cimitero del Monastero Scarlatto, infestata da morti inquieti e difensori scarlatti." },
        ["City of Dalaran"] = { name = "Città di Dalaran", location = "Montagne d'Alterac", description = "La restaurata città dei maghi di Dalaran è diventata una nuova spedizione per cinque giocatori in WoW Forever. Entra dalle fogne e dal Sottoventre, poi fatti strada per le vie fino alla Cittadella Violacea." },
        ["Excavation Site: Wetlands"] = { name = "Sito di scavo: Paludi", location = "Paludi", description = "Un sito di scavo dei Titani intrappolato nel tempo sopra lo Scavo di Whelgar, dove i costrutti titanici non obbediscono più a nessuno. Aree: Palude Perduta, Boscaglia dei Predatori, Sito del Guardiano e Scavo Perduto." },
    },
    quests = {
        [2930001] = { name = "Scheda perforata bianca", objective = "Uccidi nemici nell'area esterna di Gnomeregan finché non ottieni una scheda perforata bianca.", pickup = "Predoni e invasori delle Caverne, invasori irradiati e lebbrosi confusi, fuori dall'istanza", turnin = "Conserva la scheda per la Perforatrice a Matrice 3005-A", description = "Bottino casuale; di solito la ottieni già alla prima pulizia dell'area esterna." },
        [2930002] = { name = "Scheda perforata gialla (perforatrice 3005-A)", objective = "Usa la Perforatrice a Matrice 3005-A con la scheda bianca per ottenere una scheda perforata gialla.", pickup = "Perforatrice a Matrice 3005-A, area dell'officina del deposito treni, fuori dall'istanza", turnin = "Ricevi una scheda perforata gialla", description = "Le uniche perforatrici fuori dall'istanza: sulla piattaforma rialzata del deposito e vicino all'ingresso dell'officina (porta sul retro)." },
        [2930003] = { name = "Scheda perforata blu (perforatrice 3005-B)", objective = "Usa la Perforatrice a Matrice 3005-B con la scheda gialla per ottenere una scheda perforata blu.", pickup = "Perforatrice a Matrice 3005-B, il Dormitorio (subito dopo la Zona Pulita), dentro l'istanza", turnin = "Ricevi una scheda perforata blu", description = "Dentro l'istanza, nel Dormitorio." },
        [2930004] = { name = "Scheda perforata rossa (perforatrice 3005-C)", objective = "Usa la Perforatrice a Matrice 3005-C con la scheda blu per ottenere una scheda perforata rossa.", pickup = "Perforatrice a Matrice 3005-C, piattaforma superiore della Baia di Lancio con Elettrocutore 6000", turnin = "Ricevi una scheda perforata rossa", description = "Sulla piattaforma di Elettrocutore 6000." },
        [2930005] = { name = "Scheda perforata prismatica (perforatrice 3005-D)", objective = "Usa la Perforatrice a Matrice 3005-D con la scheda rossa per ottenere la scheda perforata prismatica, poi portala al Maestro Meccanico Tubofuso a Forgiardente.", pickup = "Perforatrice a Matrice 3005-D, lato ovest del livello inferiore dei Laboratori d'Ingegneria", turnin = "Maestro Meccanico Tubofuso, Città dei Gingilli, Forgiardente", description = "Scendi con l'ascensore; il terminale è nel primo passaggio a destra." },
        [2922] = { name = "Salvate il cervello di Techbot!", objective = "Porta il nucleo di memoria di Techbot al Maestro Inventore Scintillatutto a Forgiardente." },
        [2926] = { name = "Gnogaina", objective = "Usa la fiala di raccolta piombata vuota su invasori o predoni irradiati e riporta la fiala piena a Ozzie Togglevolt." },
        [2962] = { name = "L'unica cura è più bagliore verde", objective = "Porta a Ozzie ricaduta radioattiva ad alta potenza e la fiala di raccolta piombata pesante. La ricaduta si degrada in fretta." },
        [2928] = { name = "Escavatori girotrapananti", objective = "Porta 24 interiora robomeccaniche a Shoni a Roccavento." },
        [2924] = { name = "Artificiali essenziali", objective = "Porta 12 artificiali essenziali a Klockmort Chiavinglese a Forgiardente." },
        [2930] = { name = "Recupero dati", objective = "Porta una scheda perforata prismatica al Maestro Meccanico Tubofuso a Forgiardente." },
        [2929] = { name = "Il grande tradimento", objective = "Uccidi il Meccagegnere Termospina e torna dall'Alto Inventore Mekkatorque." },
        [2843] = { name = "Gnomer-andaaaato!", objective = "Aspetta che Scooty calibri il trasponditore goblin." },
        [2841] = { name = "Guerre di trivelle", objective = "Recupera i progetti della trivella e la combinazione della cassaforte di Termospina e portali a Nogg a Orgrimmar." },
        [2904] = { name = "Un bel pasticcio", objective = "Scorta Kernobee fino all'uscita del Passaggio a Orologeria, poi fai rapporto a Scooty a Baia del Bottino." },
        [2951] = { name = "Lo Scintillomatic 5200!", objective = "Inserisci un oggetto incrostato di sporcizia nello Scintillomatic 5200 con tre monete d'argento per avviare la macchina." },
        [2945] = { name = "Anello incrostato di sporcizia", objective = "Trova un modo per pulire l'anello incrostato di sporcizia (usa lo Scintillomatic 5200)." },
        [1221] = { name = "Tuberi di Foglia Azzurra", objective = "Usa la cassa bucherellata per evocare un ratto fiutatore e il bastone di comando per fargli trovare 6 tuberi di Foglia Azzurra. Riportali, con bastone e cassa, a Mebok Mizzyrix." },
        [1144] = { name = "Willix l'Importatore", objective = "Scorta Willix l'Importatore fuori dal Kraul di Lamaspina." },
        [1142] = { name = "La mortalità svanisce", objective = "Trova il ciondolo di Treshala e riportalo a Treshala Fallowbrook a Darnassus." },
        [1101] = { name = "La megera del Kraul", objective = "Porta il medaglione di Lamafianco a Falfindel Waywarder a Thalanaar." },
        [1102] = { name = "Un destino vendicativo", objective = "Porta il cuore di Lamafianco ad Auld Pietralta a Picco del Tuono." },
        [1109] = { name = "Guano, guano!", objective = "Porta 1 mucchio di guano del Kraul dei pipistrelli del Kraul al Gran Speziale Faranell." },
        [6522] = { name = "Un'alleanza empia", objective = "Porta la piccola pergamena a Varimathras a Sepulcra." },
        [1051] = { name = "La vendetta di Vorrel", objective = "Riporta la fede nuziale di Vorrel Sengutz (da Nancy Vishas) a Monika Sengutz a Mulino di Tarren." },
        [1113] = { name = "Cuori dello zelo", objective = "Porta 20 cuori dello zelo dal Monastero Scarlatto al Gran Speziale Faranell." },
    },
    places = {
        ["Ironforge"] = "Forgiardente",
        ["Kharanos"] = "Kharanos",
        ["Dun Morogh"] = "Dun Morogh",
        ["Stormwind City"] = "Roccavento",
        ["Stormwind"] = "Roccavento",
        ["Booty Bay"] = "Baia del Bottino",
        ["Stranglethorn Vale"] = "Valle di Rovotorto",
        ["Orgrimmar"] = "Orgrimmar",
        ["inside Gnomeregan"] = "dentro Gnomeregan",
        ["Ratchet"] = "Porto Paranco",
        ["The Barrens"] = "Savane",
        ["inside Razorfen Kraul"] = "dentro il Kraul di Lamaspina",
        ["Darnassus"] = "Darnassus",
        ["Thalanaar"] = "Thalanaar",
        ["Feralas"] = "Feralas",
        ["Thunder Bluff"] = "Picco del Tuono",
        ["Undercity"] = "Sepulcra",
        ["Royal Quarter"] = "Quartiere Reale",
        ["inside the Graveyard"] = "dentro il Cimitero",
        ["Tarren Mill"] = "Mulino di Tarren",
        ["Hillsbrad Foothills"] = "Colli di Monteverde",
        ["Dwarven District"] = "Distretto dei Nani",
        ["the Dwarven District"] = "Distretto dei Nani",
    },
}
DATA.ptBR = {
    dungeons = {
        ["Gnomeregan"] = { name = "Gnomeregan", location = "Dun Morogh", description = "A cidade subterrânea irradiada dos gnomos, tomada por troggs e pelas forças do Mekgenheiro Termaplugue." },
        ["Razorfen Kraul"] = { name = "Urzal dos Mortos", location = "Sertões", description = "Um enorme labirinto de espinhos ocupado pelos javali do Urzal dos Mortos." },
        ["Scarlet Monastery: Graveyard"] = { name = "Monastério Escarlate: Cemitério", location = "Clareiras de Tirisfal", description = "A ala do cemitério do Monastério Escarlate, assombrada por mortos inquietos e defensores escarlates." },
        ["City of Dalaran"] = { name = "Cidade de Dalaran", location = "Montanhas de Alterac", description = "A restaurada cidade dos magos, Dalaran, tornou-se uma nova masmorra para cinco jogadores no WoW Forever. Entre pelos esgotos e pelo Ventre, depois abra caminho pelas ruas até a Cidadela Violeta." },
        ["Excavation Site: Wetlands"] = { name = "Sítio de Escavação: Pantanal", location = "Pantanal", description = "Um sítio de escavação titânico preso no tempo acima da Escavação de Whelgar, onde os constructos titânicos não obedecem mais a ninguém. Áreas: Pântano Perdido, Mata dos Espreitadores, Local do Guardião e Escavação Perdida." },
    },
    quests = {
        [2930001] = { name = "Cartão Perfurado Branco", objective = "Mate inimigos na área externa de Gnomeregan até cair um cartão perfurado branco.", pickup = "Saqueadores e invasores das Cavernas, invasores irradiados e leprosos atordoados, fora da instância", turnin = "Guarde o cartão para a Perfuradora Matricial 3005-A", description = "Saque aleatório; normalmente você o consegue na primeira limpeza da área externa." },
        [2930002] = { name = "Cartão Perfurado Amarelo (perfuradora 3005-A)", objective = "Use a Perfuradora Matricial 3005-A com o cartão branco para obter um cartão perfurado amarelo.", pickup = "Perfuradora Matricial 3005-A, área da oficina do depósito de trens, fora da instância", turnin = "Você recebe um cartão perfurado amarelo", description = "As únicas perfuradoras fora da instância: na plataforma elevada do depósito e junto à entrada da oficina (porta dos fundos)." },
        [2930003] = { name = "Cartão Perfurado Azul (perfuradora 3005-B)", objective = "Use a Perfuradora Matricial 3005-B com o cartão amarelo para obter um cartão perfurado azul.", pickup = "Perfuradora Matricial 3005-B, o Dormitório (logo após a Zona Limpa), dentro da instância", turnin = "Você recebe um cartão perfurado azul", description = "Dentro da instância, no Dormitório." },
        [2930004] = { name = "Cartão Perfurado Vermelho (perfuradora 3005-C)", objective = "Use a Perfuradora Matricial 3005-C com o cartão azul para obter um cartão perfurado vermelho.", pickup = "Perfuradora Matricial 3005-C, plataforma superior da Baía de Lançamento com o Eletrocutor 6000", turnin = "Você recebe um cartão perfurado vermelho", description = "Na plataforma do Eletrocutor 6000." },
        [2930005] = { name = "Cartão Perfurado Prismático (perfuradora 3005-D)", objective = "Use a Perfuradora Matricial 3005-D com o cartão vermelho para obter o cartão perfurado prismático e leve-o ao Mestre Mecânico Canocasta em Altaforja.", pickup = "Perfuradora Matricial 3005-D, lado oeste do nível inferior dos Laboratórios de Engenharia", turnin = "Mestre Mecânico Canocasta, Beco da Gambiarra, Altaforja", description = "Desça de elevador; o terminal fica na primeira passagem à direita." },
        [2922] = { name = "Salve o Cérebro do Tecbô!", objective = "Leve o núcleo de memória do Tecbô ao Mestre Engenhoqueiro Faiscador em Altaforja." },
        [2926] = { name = "Gnogaína", objective = "Use o frasco de coleta plumbífero vazio em invasores ou saqueadores irradiados e leve o frasco cheio de volta a Ozzie Togglevolt." },
        [2962] = { name = "A única cura é mais brilho verde", objective = "Leve a Ozzie precipitação radioativa de alta potência e o frasco de coleta plumbífero pesado. A precipitação se desfaz rápido." },
        [2928] = { name = "Escavadeiras Girofurantes", objective = "Leve 24 entranhas robomecânicas a Shoni em Ventobravo." },
        [2924] = { name = "Artificiais Essenciais", objective = "Leve 12 artificiais essenciais a Klockmort Chaveinglesa em Altaforja." },
        [2930] = { name = "Resgate de Dados", objective = "Leve um cartão perfurado prismático ao Mestre Mecânico Canocasta em Altaforja." },
        [2929] = { name = "A Grande Traição", objective = "Mate o Mekgenheiro Termaplugue e volte ao Grão-Engenhoqueiro Mekkatorque." },
        [2843] = { name = "Gnomer-fooooi!", objective = "Espere Scooty calibrar o transponder goblin." },
        [2841] = { name = "Guerra das Plataformas", objective = "Recupere as plantas da plataforma e a combinação do cofre de Termaplugue e leve-as a Nogg em Orgrimmar." },
        [2904] = { name = "Uma Bela Bagunça", objective = "Escolte Kernobee até a saída da Passagem das Engrenagens e depois relate a Scooty na Angra do Butim." },
        [2951] = { name = "A Brilhomática 5200!", objective = "Coloque um objeto encardido na Brilhomática 5200 com três moedas de prata para ligar a máquina." },
        [2945] = { name = "Anel Encardido", objective = "Descubra um jeito de limpar o anel encardido (use a Brilhomática 5200)." },
        [1221] = { name = "Tubérculos de Folha-azul", objective = "Use o caixote furado para invocar um rato fuçador e o bastão de comando para fazê-lo achar 6 tubérculos de folha-azul. Leve-os, com o bastão e o caixote, a Mebok Mizzyrix." },
        [1144] = { name = "Willix, o Importador", objective = "Escolte Willix, o Importador, para fora do Urzal dos Mortos." },
        [1142] = { name = "A Mortalidade Míngua", objective = "Encontre o pingente de Treshala e devolva-o a Treshala Fallowbrook em Darnassus." },
        [1101] = { name = "A Bruxa do Urzal", objective = "Leve o medalhão de Navalhaflanco a Falfindel Waywarder em Thalanaar." },
        [1102] = { name = "Um Destino Vingativo", objective = "Leve o coração de Navalhaflanco a Auld Pedralta em Penhasco do Trovão." },
        [1109] = { name = "Guano, Guano!", objective = "Leve 1 monte de guano do Urzal dos morcegos do Urzal ao Boticário-mor Faranell." },
        [6522] = { name = "Uma Aliança Profana", objective = "Leve o pergaminho pequeno a Varimathras em Cidade Baixa." },
        [1051] = { name = "A Vingança de Vorrel", objective = "Devolva a aliança de casamento de Vorrel Sengutz (de Nancy Vishas) a Monika Sengutz em Serraria Tarren." },
        [1113] = { name = "Corações do Zelo", objective = "Leve 20 corações do zelo do Monastério Escarlate ao Boticário-mor Faranell." },
    },
    places = {
        ["Ironforge"] = "Altaforja",
        ["Kharanos"] = "Kharanos",
        ["Dun Morogh"] = "Dun Morogh",
        ["Stormwind City"] = "Ventobravo",
        ["Stormwind"] = "Ventobravo",
        ["Booty Bay"] = "Angra do Butim",
        ["Stranglethorn Vale"] = "Selva do Espinhaço",
        ["Orgrimmar"] = "Orgrimmar",
        ["inside Gnomeregan"] = "dentro de Gnomeregan",
        ["Ratchet"] = "Vila Catraca",
        ["The Barrens"] = "Sertões",
        ["inside Razorfen Kraul"] = "dentro do Urzal dos Mortos",
        ["Darnassus"] = "Darnassus",
        ["Thalanaar"] = "Thalanaar",
        ["Feralas"] = "Feralas",
        ["Thunder Bluff"] = "Penhasco do Trovão",
        ["Undercity"] = "Cidade Baixa",
        ["Royal Quarter"] = "Bairro Real",
        ["inside the Graveyard"] = "dentro do Cemitério",
        ["Tarren Mill"] = "Serraria Tarren",
        ["Hillsbrad Foothills"] = "Contraforte de Eira dos Montes",
        ["Dwarven District"] = "Distrito dos Anões",
        ["the Dwarven District"] = "Distrito dos Anões",
    },
}
DATA.ruRU = {
    dungeons = {
        ["Gnomeregan"] = { name = "Гномреган", location = "Дун Морог", description = "Облучённый подземный город гномов, захваченный троггами и войсками анжинера Термоштепселя." },
        ["Razorfen Kraul"] = { name = "Лабиринты Иглошкурых", location = "Степи", description = "Огромный терновый лабиринт, занятый свинобразами Лабиринтов Иглошкурых." },
        ["Scarlet Monastery: Graveyard"] = { name = "Монастырь Алого ордена: Кладбище", location = "Тирисфальские леса", description = "Кладбище Монастыря Алого ордена, где бродят неупокоенные мертвецы и защитники Алого ордена." },
        ["City of Dalaran"] = { name = "Город Даларан", location = "Альтеракские горы", description = "Восстановленный город магов Даларан стал новым подземельем для пяти игроков в WoW Forever. Войдите через канализацию и Клоаку, затем пробейтесь по улицам к Аметистовой цитадели." },
        ["Excavation Site: Wetlands"] = { name = "Раскопки: Болотина", location = "Болотина", description = "Застывшие во времени раскопки титанов над раскопками Вельгара, где конструкты титанов больше никому не подчиняются. Области: Затерянная топь, Чаща охотников, Место стража и Затерянные раскопки." },
    },
    quests = {
        [2930001] = { name = "Белая перфокарта", objective = "Убивайте противников во внешней части Гномрегана, пока не выпадет белая перфокарта.", pickup = "Грабители и захватчики глубин, облучённые захватчики и одурманенные прокажённые снаружи подземелья", turnin = "Сохраните карту для матричного перфоратора 3005-A", description = "Случайная добыча; обычно выпадает при первой зачистке внешней зоны." },
        [2930002] = { name = "Жёлтая перфокарта (перфоратор 3005-A)", objective = "Используйте матричный перфоратор 3005-A с белой перфокартой, чтобы получить жёлтую.", pickup = "Матричный перфоратор 3005-A, мастерская железнодорожного депо, снаружи подземелья", turnin = "Вы получаете жёлтую перфокарту", description = "Единственные перфораторы снаружи подземелья: на возвышенной платформе депо и у входа в мастерскую (чёрный ход)." },
        [2930003] = { name = "Синяя перфокарта (перфоратор 3005-B)", objective = "Используйте матричный перфоратор 3005-B с жёлтой перфокартой, чтобы получить синюю.", pickup = "Матричный перфоратор 3005-B, Спальный корпус (сразу за Чистой зоной), в подземелье", turnin = "Вы получаете синюю перфокарту", description = "В подземелье, в Спальном корпусе." },
        [2930004] = { name = "Красная перфокарта (перфоратор 3005-C)", objective = "Используйте матричный перфоратор 3005-C с синей перфокартой, чтобы получить красную.", pickup = "Матричный перфоратор 3005-C, верхняя платформа Пусковой площадки с Электрошокером 6000", turnin = "Вы получаете красную перфокарту", description = "На платформе Электрошокера 6000." },
        [2930005] = { name = "Призматическая перфокарта (перфоратор 3005-D)", objective = "Используйте матричный перфоратор 3005-D с красной перфокартой, чтобы получить призматическую, и отнесите её старшему механику Литотрубу в Стальгорн.", pickup = "Матричный перфоратор 3005-D, западная часть нижнего уровня Инженерных лабораторий", turnin = "Старший механик Литотруб, Город Механиков, Стальгорн", description = "Спуститесь на лифте; терминал в первом проходе справа." },
        [2922] = { name = "Спасите мозг Техбота!", objective = "Принесите ядро памяти Техбота мастеру-механику Искросвёрлу в Стальгорн." },
        [2926] = { name = "Гноген", objective = "Используйте пустой свинцовый флакон на облучённых захватчиках или грабителях и отнесите полный флакон Оззи Шестерёнкину." },
        [2962] = { name = "Зелёное свечение лечат зелёным свечением", objective = "Принесите Оззи мощные радиоактивные осадки и тяжёлый свинцовый флакон. Осадки быстро распадаются." },
        [2928] = { name = "Гиробуровые экскаваторы", objective = "Принесите 24 робомеханические потроха Шони в Штормград." },
        [2924] = { name = "Необходимые артефакты", objective = "Принесите 12 необходимых артефактов Клокморту Гаечнику в Стальгорн." },
        [2930] = { name = "Спасение данных", objective = "Принесите призматическую перфокарту старшему механику Литотрубу в Стальгорн." },
        [2929] = { name = "Великое предательство", objective = "Убейте анжинера Термоштепселя и вернитесь к Главному Механику Меккаторку." },
        [2843] = { name = "Гномре-уходиииим!", objective = "Подождите, пока Скути настроит гоблинский транспондер." },
        [2841] = { name = "Буровые войны", objective = "Добудьте чертежи буровой установки и комбинацию сейфа Термоштепселя и отнесите их Ноггу в Оргриммар." },
        [2904] = { name = "Ну и бардак", objective = "Сопроводите Керноби до выхода из Часового прохода, затем доложите Скути в Пиратской Бухте." },
        [2951] = { name = "Искромат 5200!", objective = "Поместите покрытый грязью предмет в Искромат 5200 и бросьте три серебряные монеты, чтобы запустить машину." },
        [2945] = { name = "Покрытое грязью кольцо", objective = "Найдите способ очистить покрытое грязью кольцо (используйте Искромат 5200)." },
        [1221] = { name = "Клубни синелиста", objective = "С помощью ящика с отверстиями призовите крысу-нюхача, а жезлом управления заставьте её найти 6 клубней синелиста. Принесите их вместе с жезлом и ящиком Мебоку Миззириксу." },
        [1144] = { name = "Импортёр Уилликс", objective = "Выведите импортёра Уилликса из Лабиринтов Иглошкурых." },
        [1142] = { name = "Угасание смертности", objective = "Найдите кулон Трешалы и верните его Трешале Фаллоубрук в Дарнас." },
        [1101] = { name = "Старуха из Лабиринтов", objective = "Принесите медальон Бритвобокой Фалфинделу Путнику в Таланаар." },
        [1102] = { name = "Мстительная судьба", objective = "Принесите сердце Бритвобокой Ольду Камневерху в Громовой Утёс." },
        [1109] = { name = "Гуано, гуано!", objective = "Принесите 1 кучку гуано из Лабиринтов от летучих мышей главному аптекарю Фаранеллу." },
        [6522] = { name = "Нечестивый союз", objective = "Отнесите маленький свиток Каримтрасу в Подгород." },
        [1051] = { name = "Месть Воррела", objective = "Верните обручальное кольцо Воррела Сенгуца (от Нэнси Вишас) Монике Сенгуц в Мельницу Таррен." },
        [1113] = { name = "Сердца рвения", objective = "Принесите 20 сердец рвения из Монастыря Алого ордена главному аптекарю Фаранеллу." },
    },
    places = {
        ["Ironforge"] = "Стальгорн",
        ["Kharanos"] = "Каранос",
        ["Dun Morogh"] = "Дун Морог",
        ["Stormwind City"] = "Штормград",
        ["Stormwind"] = "Штормград",
        ["Booty Bay"] = "Пиратская Бухта",
        ["Stranglethorn Vale"] = "Тернистая долина",
        ["Orgrimmar"] = "Оргриммар",
        ["inside Gnomeregan"] = "в Гномрегане",
        ["Ratchet"] = "Кабестан",
        ["The Barrens"] = "Степи",
        ["inside Razorfen Kraul"] = "в Лабиринтах Иглошкурых",
        ["Darnassus"] = "Дарнас",
        ["Thalanaar"] = "Таланаар",
        ["Feralas"] = "Фералас",
        ["Thunder Bluff"] = "Громовой Утёс",
        ["Undercity"] = "Подгород",
        ["Royal Quarter"] = "Королевский квартал",
        ["inside the Graveyard"] = "на Кладбище",
        ["Tarren Mill"] = "Мельница Таррен",
        ["Hillsbrad Foothills"] = "Предгорья Хилсбрада",
        ["Dwarven District"] = "Квартал дворфов",
        ["the Dwarven District"] = "Квартал дворфов",
    },
}
DATA.koKR = {
    dungeons = {
        ["Gnomeregan"] = { name = "놈리건", location = "던 모로", description = "방사능에 오염된 노움의 지하 도시로, 트로그와 텔마플러그의 병력에 점령당했습니다." },
        ["Razorfen Kraul"] = { name = "가시덩굴 우리", location = "불모의 땅", description = "가시덩굴 우리의 멧돼지인간이 차지한 거대한 가시 미로입니다." },
        ["Scarlet Monastery: Graveyard"] = { name = "붉은십자군 수도원: 묘지", location = "티리스팔 숲", description = "안식을 얻지 못한 망자와 붉은십자군 수호병이 출몰하는 붉은십자군 수도원의 묘지 구역입니다." },
        ["City of Dalaran"] = { name = "달라란 도시", location = "알터랙 산맥", description = "복원된 마법사의 도시 달라란이 WoW Forever의 새로운 5인 던전이 되었습니다. 하수도와 마법의 지하실을 통해 들어가 거리를 뚫고 보랏빛 성채까지 가세요." },
        ["Excavation Site: Wetlands"] = { name = "발굴지: 저습지", location = "저습지", description = "웰가르 발굴지 위에 시간 속에 갇힌 티탄 발굴지로, 티탄 피조물이 더 이상 누구에게도 복종하지 않습니다. 구역: 잃어버린 늪, 추적자의 덤불, 수호자의 터, 잃어버린 발굴지." },
    },
    quests = {
        [2930001] = { name = "흰색 천공 카드", objective = "놈리건 외곽 지역의 적을 처치해 흰색 천공 카드를 얻으세요.", pickup = "인스턴스 밖의 동굴 약탈자, 동굴 침략자, 방사능 오염 침략자, 정신 나간 나병 노움", turnin = "카드를 매트릭스 천공기 3005-A용으로 보관하세요", description = "무작위 전리품입니다. 보통 외곽 지역을 처음 정리할 때 얻습니다." },
        [2930002] = { name = "노란색 천공 카드 (천공기 3005-A)", objective = "흰색 천공 카드로 매트릭스 천공기 3005-A를 사용해 노란색 천공 카드를 얻으세요.", pickup = "매트릭스 천공기 3005-A, 기차 정거장의 작업장 구역, 인스턴스 밖", turnin = "노란색 천공 카드를 받습니다", description = "인스턴스 밖에 있는 유일한 천공기입니다. 정거장의 높은 단상과 작업장(뒷문) 입구 옆에 있습니다." },
        [2930003] = { name = "파란색 천공 카드 (천공기 3005-B)", objective = "노란색 천공 카드로 매트릭스 천공기 3005-B를 사용해 파란색 천공 카드를 얻으세요.", pickup = "매트릭스 천공기 3005-B, 숙소 (청정 구역 바로 다음), 인스턴스 안", turnin = "파란색 천공 카드를 받습니다", description = "인스턴스 안, 숙소에 있습니다." },
        [2930004] = { name = "빨간색 천공 카드 (천공기 3005-C)", objective = "파란색 천공 카드로 매트릭스 천공기 3005-C를 사용해 빨간색 천공 카드를 얻으세요.", pickup = "매트릭스 천공기 3005-C, 발사 기지 위쪽 단상 (일렉트로커셔너 6000)", turnin = "빨간색 천공 카드를 받습니다", description = "일렉트로커셔너 6000의 단상에 있습니다." },
        [2930005] = { name = "프리즘 천공 카드 (천공기 3005-D)", objective = "빨간색 천공 카드로 매트릭스 천공기 3005-D를 사용해 프리즘 천공 카드를 얻은 뒤, 아이언포지의 기계공 대가 캐스트파이프에게 가져가세요.", pickup = "매트릭스 천공기 3005-D, 기계공학 연구실 아래층 서쪽", turnin = "기계공 대가 캐스트파이프, 땜장이 마을, 아이언포지", description = "승강기로 내려가면 오른쪽 첫 번째 통로에 단말기가 있습니다." },
        [2922] = { name = "테크봇의 두뇌를 구하라!", objective = "테크봇의 기억 핵을 아이언포지의 땜장이 대가 오버스파크에게 가져가세요." },
        [2926] = { name = "노가인", objective = "빈 납 채집 약병을 방사능에 오염된 침략자나 약탈자에게 사용한 뒤, 가득 찬 약병을 오지 토글볼트에게 가져가세요." },
        [2962] = { name = "녹색 광채엔 녹색 광채뿐", objective = "고농도 방사능 낙진과 무거운 납 채집 약병을 오지에게 가져가세요. 낙진은 금방 붕괴합니다." },
        [2928] = { name = "자이로드릴 굴착기", objective = "로봇 기계 내장 24개를 스톰윈드의 쇼니에게 가져가세요." },
        [2924] = { name = "필수 인공물", objective = "필수 인공물 12개를 아이언포지의 클락모트 스패너스팬에게 가져가세요." },
        [2930] = { name = "데이터 구출", objective = "프리즘 천공 카드를 아이언포지의 기계공 대가 캐스트파이프에게 가져가세요." },
        [2929] = { name = "크나큰 배신", objective = "텔마플러그를 처치하고 고위 땜장이 멕카토크에게 돌아가세요." },
        [2843] = { name = "놈리건 탈출!", objective = "스쿠티가 고블린 전송기를 조정할 때까지 기다리세요." },
        [2841] = { name = "시추기 전쟁", objective = "시추기 설계도와 텔마플러그의 금고 비밀번호를 찾아 오그리마의 노그에게 가져가세요." },
        [2904] = { name = "엉망진창", objective = "커노비를 시계태엽 통로 출구까지 호위한 뒤 무법항의 스쿠티에게 보고하세요." },
        [2951] = { name = "반짝반짝 5200!", objective = "때 묻은 물건을 반짝반짝 5200에 넣고 은화 세 개를 넣어 기계를 작동하세요." },
        [2945] = { name = "때 묻은 반지", objective = "때 묻은 반지의 때를 벗길 방법을 찾으세요 (반짝반짝 5200을 사용하세요)." },
        [1221] = { name = "푸른잎 덩이줄기", objective = "구멍 난 상자로 킁킁코 쥐를 소환하고 명령 지팡이로 푸른잎 덩이줄기 6개를 찾게 하세요. 덩이줄기와 지팡이, 상자를 메보크 미지릭스에게 가져가세요." },
        [1144] = { name = "수입업자 윌릭스", objective = "수입업자 윌릭스를 가시덩굴 우리 밖으로 호위하세요." },
        [1142] = { name = "사라지는 죽음", objective = "트레샬라의 목걸이를 찾아 다르나서스의 트레샬라 팰로우브룩에게 돌려주세요." },
        [1101] = { name = "우리의 마녀", objective = "칼날갈기의 메달을 탈라나르의 팔핀델 웨이워더에게 가져가세요." },
        [1102] = { name = "복수의 운명", objective = "칼날갈기의 심장을 썬더 블러프의 아울드 스톤스파이어에게 가져가세요." },
        [1109] = { name = "박쥐 배설물!", objective = "가시덩굴 박쥐에게서 얻은 배설물 1개를 연금술사장 파라넬에게 가져가세요." },
        [6522] = { name = "불경한 동맹", objective = "작은 두루마리를 언더시티의 바리마트라스에게 가져가세요." },
        [1051] = { name = "보렐의 복수", objective = "보렐 센구츠의 결혼반지(낸시 비샤스에게서)를 타렌 밀의 모니카 센구츠에게 돌려주세요." },
        [1113] = { name = "열정의 심장", objective = "붉은십자군 수도원에서 열정의 심장 20개를 모아 연금술사장 파라넬에게 가져가세요." },
    },
    places = {
        ["Ironforge"] = "아이언포지",
        ["Kharanos"] = "카라노스",
        ["Dun Morogh"] = "던 모로",
        ["Stormwind City"] = "스톰윈드",
        ["Stormwind"] = "스톰윈드",
        ["Booty Bay"] = "무법항",
        ["Stranglethorn Vale"] = "가시덤불 골짜기",
        ["Orgrimmar"] = "오그리마",
        ["inside Gnomeregan"] = "놈리건 내부",
        ["Ratchet"] = "톱니항",
        ["The Barrens"] = "불모의 땅",
        ["inside Razorfen Kraul"] = "가시덩굴 우리 내부",
        ["Darnassus"] = "다르나서스",
        ["Thalanaar"] = "탈라나르",
        ["Feralas"] = "페랄라스",
        ["Thunder Bluff"] = "썬더 블러프",
        ["Undercity"] = "언더시티",
        ["Royal Quarter"] = "왕실 지구",
        ["inside the Graveyard"] = "묘지 내부",
        ["Tarren Mill"] = "타렌 밀",
        ["Hillsbrad Foothills"] = "힐스브래드 구릉지",
        ["Dwarven District"] = "드워프 지구",
        ["the Dwarven District"] = "드워프 지구",
    },
}
DATA.zhCN = {
    dungeons = {
        ["Gnomeregan"] = { name = "诺莫瑞根", location = "丹莫罗", description = "被辐射污染的侏儒地下城市，被穴居人和麦克尼尔·瑟玛普拉格的部队占领。" },
        ["Razorfen Kraul"] = { name = "剃刀沼泽", location = "贫瘠之地", description = "剃刀沼泽的野猪人盘踞的一座巨大荆棘迷宫。" },
        ["Scarlet Monastery: Graveyard"] = { name = "血色修道院：墓地", location = "提瑞斯法林地", description = "血色修道院的墓地区，游荡着不得安息的亡者和血色十字军的守卫。" },
        ["City of Dalaran"] = { name = "达拉然城", location = "奥特兰克山脉", description = "重建的法师之城达拉然成为了 WoW Forever 中新的五人地下城。从下水道和达拉然下水道进入，然后沿街道一路杀到紫罗兰城堡。" },
        ["Excavation Site: Wetlands"] = { name = "挖掘场：湿地", location = "湿地", description = "惠尔格挖掘场上方一处被困在时间中的泰坦挖掘场，那里的泰坦造物已不再服从任何人。区域：失落沼泽、潜伏者灌木林、守护者之地和失落挖掘场。" },
    },
    quests = {
        [2930001] = { name = "白色打孔卡", objective = "在诺莫瑞根外围区域击杀敌人，直到获得一张白色打孔卡。", pickup = "副本外的深洞掠夺者、深洞入侵者、受辐射的入侵者和昏乱的麻风侏儒", turnin = "保留这张卡，用于矩阵式打孔计算机3005-A", description = "随机掉落；通常第一次清理外围区域时就能拿到。" },
        [2930002] = { name = "黄色打孔卡（打孔机3005-A）", objective = "带着白色打孔卡使用矩阵式打孔计算机3005-A，获得黄色打孔卡。", pickup = "矩阵式打孔计算机3005-A，列车车站的车间区域，副本外", turnin = "你获得一张黄色打孔卡", description = "副本外仅有的打孔机：在车站的高台上，以及车间（后门）入口旁。" },
        [2930003] = { name = "蓝色打孔卡（打孔机3005-B）", objective = "带着黄色打孔卡使用矩阵式打孔计算机3005-B，获得蓝色打孔卡。", pickup = "矩阵式打孔计算机3005-B，宿舍（紧挨着洁净区），副本内", turnin = "你获得一张蓝色打孔卡", description = "在副本内的宿舍。" },
        [2930004] = { name = "红色打孔卡（打孔机3005-C）", objective = "带着蓝色打孔卡使用矩阵式打孔计算机3005-C，获得红色打孔卡。", pickup = "矩阵式打孔计算机3005-C，发射台上层平台（电刑器6000所在处）", turnin = "你获得一张红色打孔卡", description = "在电刑器6000的平台上。" },
        [2930005] = { name = "棱彩打孔卡（打孔机3005-D）", objective = "带着红色打孔卡使用矩阵式打孔计算机3005-D，获得棱彩打孔卡，然后交给铁炉堡的机械大师卡斯派普。", pickup = "矩阵式打孔计算机3005-D，工程实验室下层西侧", turnin = "机械大师卡斯派普，侏儒区，铁炉堡", description = "乘电梯下去，终端在右侧第一条通道里。" },
        [2922] = { name = "拯救尖端机器人的大脑！", objective = "把尖端机器人的记忆核心交给铁炉堡的工匠大师欧沃斯巴克。" },
        [2926] = { name = "诺恩", objective = "对受辐射的侵略者或掠夺者使用空的铅瓶，然后把装满的铅瓶交给奥齐·托格维尔。" },
        [2962] = { name = "以毒攻毒", objective = "把高能放射性尘埃和沉重的铅瓶交给奥齐。放射性尘埃会很快衰变。" },
        [2928] = { name = "陀螺挖掘机", objective = "把24个机械内脏交给暴风城的舒尼。" },
        [2924] = { name = "基础模组", objective = "把12个基础模组交给铁炉堡的克劳克莫特·斯班纳斯潘。" },
        [2930] = { name = "数据救援", objective = "把一张棱彩打孔卡交给铁炉堡的机械大师卡斯派普。" },
        [2929] = { name = "大叛徒", objective = "杀死麦克尼尔·瑟玛普拉格，然后回到大工匠梅卡托克那里。" },
        [2843] = { name = "诺莫瑞根撤离！", objective = "等待斯库提校准地精传送器。" },
        [2841] = { name = "钻塔之战", objective = "取回钻塔设计图和瑟玛普拉格的保险箱密码，交给奥格瑞玛的诺格。" },
        [2904] = { name = "一团糟", objective = "护送克努比到发条小径的出口，然后向藏宝海湾的斯库提报告。" },
        [2951] = { name = "闪光机5200！", objective = "把一件满是污垢的物品放进闪光机5200，并投入三枚银币启动机器。" },
        [2945] = { name = "满是污垢的戒指", objective = "想办法清除满是污垢的戒指上的污垢（使用闪光机5200）。" },
        [1221] = { name = "蓝叶薯", objective = "用带孔的箱子召唤一只嗅嗅鼠，用指挥棒让它找到6个蓝叶薯。把它们和指挥棒、箱子一起交给麦伯克·米希瑞克斯。" },
        [1144] = { name = "进口商威利克斯", objective = "护送进口商威利克斯离开剃刀沼泽。" },
        [1142] = { name = "消逝的凡人", objective = "找到特蕾莎拉的坠饰，交给达纳苏斯的特蕾莎拉·弗伦布鲁克。" },
        [1101] = { name = "沼泽的老巫婆", objective = "把卡尔加·刺肋的徽章交给萨兰纳尔的法芬德尔·维沃德。" },
        [1102] = { name = "复仇的命运", objective = "把卡尔加·刺肋的心脏交给雷霆崖的奥尔德·石塔。" },
        [1109] = { name = "鸟粪！", objective = "从沼泽蝙蝠身上取得1堆蝙蝠粪，交给首席药剂师法拉尼尔。" },
        [6522] = { name = "邪恶的联盟", objective = "把小卷轴交给幽暗城的瓦里玛萨斯。" },
        [1051] = { name = "沃瑞尔的复仇", objective = "把沃瑞尔·森古兹的结婚戒指（从南希·维沙斯处取得）交给塔伦米尔的莫妮卡·森古兹。" },
        [1113] = { name = "狂热之心", objective = "从血色修道院收集20颗狂热之心，交给首席药剂师法拉尼尔。" },
    },
    places = {
        ["Ironforge"] = "铁炉堡",
        ["Kharanos"] = "卡拉诺斯",
        ["Dun Morogh"] = "丹莫罗",
        ["Stormwind City"] = "暴风城",
        ["Stormwind"] = "暴风城",
        ["Booty Bay"] = "藏宝海湾",
        ["Stranglethorn Vale"] = "荆棘谷",
        ["Orgrimmar"] = "奥格瑞玛",
        ["inside Gnomeregan"] = "诺莫瑞根内",
        ["Ratchet"] = "棘齿城",
        ["The Barrens"] = "贫瘠之地",
        ["inside Razorfen Kraul"] = "剃刀沼泽内",
        ["Darnassus"] = "达纳苏斯",
        ["Thalanaar"] = "萨兰纳尔",
        ["Feralas"] = "菲拉斯",
        ["Thunder Bluff"] = "雷霆崖",
        ["Undercity"] = "幽暗城",
        ["Royal Quarter"] = "皇家区",
        ["inside the Graveyard"] = "墓地内",
        ["Tarren Mill"] = "塔伦米尔",
        ["Hillsbrad Foothills"] = "希尔斯布莱德丘陵",
        ["Dwarven District"] = "矮人区",
        ["the Dwarven District"] = "矮人区",
    },
}
DATA.zhTW = {
    dungeons = {
        ["Gnomeregan"] = { name = "諾姆瑞根", location = "丹莫洛", description = "被輻射汙染的侏儒地城市，被穴居人和麥克尼爾·瑟瑪普拉格的部隊佔領。" },
        ["Razorfen Kraul"] = { name = "剃刀沼澤", location = "貧瘠之地", description = "剃刀沼澤的野豬人盤踞的一座巨大荊棘迷宮。" },
        ["Scarlet Monastery: Graveyard"] = { name = "血色修道院：墓地", location = "提里斯法林地", description = "血色修道院的墓地區，遊蕩著不得安息的亡者和血色十字軍的守衛。" },
        ["City of Dalaran"] = { name = "達拉然城", location = "奧特蘭克山脈", description = "重建的法師之城達拉然成為了 WoW Forever 中新的五人地城。從下水道和達拉然下水道進入，然後沿街道一路殺到紫羅蘭城堡。" },
        ["Excavation Site: Wetlands"] = { name = "挖掘場：濕地", location = "濕地", description = "惠爾格挖掘場上方一處被困在時間中的泰坦挖掘場，那裡的泰坦造物已不再服從任何人。區域：失落沼澤、潛伏者灌木林、守護者之地和失落挖掘場。" },
    },
    quests = {
        [2930001] = { name = "白色打孔卡", objective = "在諾姆瑞根外圍區域擊殺敵人，直到獲得一張白色打孔卡。", pickup = "副本外的深洞掠奪者、深洞入侵者、受輻射的入侵者和昏亂的麻風侏儒", turnin = "保留這張卡，用於矩陣式打孔計算機3005-A", description = "隨機掉落；通常第一次清理外圍區域時就能拿到。" },
        [2930002] = { name = "黃色打孔卡（打孔機3005-A）", objective = "帶著白色打孔卡使用矩陣式打孔計算機3005-A，獲得黃色打孔卡。", pickup = "矩陣式打孔計算機3005-A，列車車站的車間區域，副本外", turnin = "你獲得一張黃色打孔卡", description = "副本外僅有的打孔機：在車站的高臺上，以及車間（後門）入口旁。" },
        [2930003] = { name = "藍色打孔卡（打孔機3005-B）", objective = "帶著黃色打孔卡使用矩陣式打孔計算機3005-B，獲得藍色打孔卡。", pickup = "矩陣式打孔計算機3005-B，宿舍（緊挨著潔淨區），副本內", turnin = "你獲得一張藍色打孔卡", description = "在副本內的宿舍。" },
        [2930004] = { name = "紅色打孔卡（打孔機3005-C）", objective = "帶著藍色打孔卡使用矩陣式打孔計算機3005-C，獲得紅色打孔卡。", pickup = "矩陣式打孔計算機3005-C，發射臺上層平臺（電刑器6000所在處）", turnin = "你獲得一張紅色打孔卡", description = "在電刑器6000的平臺上。" },
        [2930005] = { name = "稜彩打孔卡（打孔機3005-D）", objective = "帶著紅色打孔卡使用矩陣式打孔計算機3005-D，獲得稜彩打孔卡，然後交給鐵爐堡的機械大師卡斯派普。", pickup = "矩陣式打孔計算機3005-D，工程實驗室下層西側", turnin = "機械大師卡斯派普，侏儒區，鐵爐堡", description = "乘電梯下去，終端在右側第一條通道里。" },
        [2922] = { name = "拯救尖端機器人的大腦！", objective = "把尖端機器人的記憶核心交給鐵爐堡的工匠大師歐沃斯巴克。" },
        [2926] = { name = "諾恩", objective = "對受輻射的侵略者或掠奪者使用空的鉛瓶，然後把裝滿的鉛瓶交給奧齊·託格維爾。" },
        [2962] = { name = "以毒攻毒", objective = "把高能放射性塵埃和沉重的鉛瓶交給奧齊。放射性塵埃會很快衰變。" },
        [2928] = { name = "陀螺挖掘機", objective = "把24個機械內臟交給暴風城的舒尼。" },
        [2924] = { name = "基礎模組", objective = "把12個基礎模組交給鐵爐堡的克勞克莫特·斯班納斯潘。" },
        [2930] = { name = "資料救援", objective = "把一張稜彩打孔卡交給鐵爐堡的機械大師卡斯派普。" },
        [2929] = { name = "大叛徒", objective = "殺死麥克尼爾·瑟瑪普拉格，然後回到大工匠梅卡托克那裡。" },
        [2843] = { name = "諾姆瑞根撤離！", objective = "等待斯庫提校準地精傳送器。" },
        [2841] = { name = "鑽塔之戰", objective = "取回鑽塔設計圖和瑟瑪普拉格的保險箱密碼，交給奧格瑪的諾格。" },
        [2904] = { name = "一團糟", objective = "護送克努比到發條小徑的出口，然後向藏寶海灣的斯庫提報告。" },
        [2951] = { name = "閃光機5200！", objective = "把一件滿是汙垢的物品放進閃光機5200，並投入三枚銀幣啟動機器。" },
        [2945] = { name = "滿是汙垢的戒指", objective = "想辦法清除滿是汙垢的戒指上的汙垢（使用閃光機5200）。" },
        [1221] = { name = "藍葉薯", objective = "用帶孔的箱子召喚一隻嗅嗅鼠，用指揮棒讓它找到6個藍葉薯。把它們和指揮棒、箱子一起交給麥伯克·米希瑞克斯。" },
        [1144] = { name = "進口商威利克斯", objective = "護送進口商威利克斯離開剃刀沼澤。" },
        [1142] = { name = "消逝的凡人", objective = "找到特蕾莎拉的墜飾，交給達納蘇斯的特蕾莎拉·弗倫布魯克。" },
        [1101] = { name = "沼澤的老巫婆", objective = "把卡爾加·刺肋的徽章交給薩蘭納爾的法芬德爾·維沃德。" },
        [1102] = { name = "復仇的命運", objective = "把卡爾加·刺肋的心臟交給雷霆崖的奧爾德·石塔。" },
        [1109] = { name = "鳥糞！", objective = "從沼澤蝙蝠身上取得1堆蝙蝠糞，交給首席藥劑師法拉尼爾。" },
        [6522] = { name = "邪惡的聯盟", objective = "把小卷軸交給幽暗城的瓦里瑪薩斯。" },
        [1051] = { name = "沃瑞爾的復仇", objective = "把沃瑞爾·森古茲的結婚戒指（從南希·維沙斯處取得）交給塔倫米爾的莫妮卡·森古茲。" },
        [1113] = { name = "狂熱之心", objective = "從血色修道院收集20顆狂熱之心，交給首席藥劑師法拉尼爾。" },
    },
    places = {
        ["Ironforge"] = "鐵爐堡",
        ["Kharanos"] = "卡拉諾斯",
        ["Dun Morogh"] = "丹莫洛",
        ["Stormwind City"] = "暴風城",
        ["Stormwind"] = "暴風城",
        ["Booty Bay"] = "藏寶海灣",
        ["Stranglethorn Vale"] = "荊棘谷",
        ["Orgrimmar"] = "奧格瑪",
        ["inside Gnomeregan"] = "諾姆瑞根內",
        ["Ratchet"] = "棘齒城",
        ["The Barrens"] = "貧瘠之地",
        ["inside Razorfen Kraul"] = "剃刀沼澤內",
        ["Darnassus"] = "達納蘇斯",
        ["Thalanaar"] = "薩蘭納爾",
        ["Feralas"] = "菲拉斯",
        ["Thunder Bluff"] = "雷霆崖",
        ["Undercity"] = "幽暗城",
        ["Royal Quarter"] = "皇家區",
        ["inside the Graveyard"] = "墓地內",
        ["Tarren Mill"] = "塔倫米爾",
        ["Hillsbrad Foothills"] = "希爾斯布萊德丘陵",
        ["Dwarven District"] = "矮人區",
        ["the Dwarven District"] = "矮人區",
    },
}

for lang, data in pairs(DATA) do
    local target = FDJ.ContentLocales[lang] or {}
    FDJ.ContentLocales[lang] = target
    for _, field in ipairs({ "dungeons", "quests", "places" }) do
        target[field] = target[field] or {}
        for key, value in pairs(data[field]) do
            if target[field][key] == nil then target[field][key] = value end
        end
    end
end

-- Excavation Site: Wetlands quests: whole-string translations (names,
-- objectives, notes, NPC/place lines). Merged without overwriting.
local EXC = {}
EXC.deDE = {
    ["Open the Maw"] = "Das Maul öffnen",
    ["Changing Tastes"] = "Geschmackswandel",
    ["Elder Knowledge"] = "Uraltes Wissen",
    ["Highland Hides"] = "Hochlandhäute",
    ["Songblade Search"] = "Songblades Suche",
    ["Horrors in the Highland"] = "Schrecken im Hochland",
    ["Heartwoven"] = "Herzgeflecht",
    ["Lost Relic Carry"] = "Verlorener Relikttransport",
    ["Lost in the Thicket Things"] = "Verloren im Dickicht",
    ["Bring the Dragonmaw Dispatch to the Deathstalker Agent just outside Excavation Site: Wetlands."] = "Bringt die Dragonmaw Dispatch zum Deathstalker Agent direkt vor der Ausgrabungsstätte: Sumpfland.",
    ["The Deathstalker Agent waits at the new dig camp right outside the portal. He takes the Dragonmaw Dispatch off your hands; where the Dispatch drops has not been confirmed yet."] = "Der Deathstalker Agent wartet im neuen Grabungslager direkt vor dem Portal. Er nimmt euch die Dragonmaw Dispatch ab; wo sie zu finden ist, wurde noch nicht bestätigt.",
    ["Enter the Excavation Sites in the Wetlands and bring back 4 Thicket Raptor Meat."] = "Betretet die Ausgrabungsstätten im Sumpfland und bringt 4 Thicket Raptor Meat zurück.",
    ["Thicket Raptor Meat comes from the Thicket raptors (Thicket Lurker, Thicket Hunter, Thicket Matriarch) in Stalker's Thicket, the area of Shadetooth."] = "Thicket Raptor Meat stammt von den Dickichtraptoren (Thicket Lurker, Thicket Hunter, Thicket Matriarch) im Pirscherdickicht, dem Gebiet von Shadetooth.",
    ["Titan Relic (dropped by Relic Guardian)"] = "Titan Relic (gedroppt von Relic Guardian)",
    ["Take the Titan Relic to the Elder Rise in Thunder Bluff and look for someone who can tell you more about it."] = "Bringt das Titan Relic zur Ältestenhöhe in Donnerfels und sucht jemanden, der euch mehr darüber erzählen kann.",
    ["Someone on the Elder Rise, Thunder Bluff"] = "Jemand auf der Ältestenhöhe, Donnerfels",
    ["Objective not confirmed yet."] = "Ziel noch nicht bestätigt.",
    ["Not confirmed yet"] = "Noch nicht bestätigt",
    ["Complete Daily Delivery first."] = "Schließt zuerst Daily Delivery ab.",
    ["Look for Dorin Songblade's brother, Daewyn, in Whelgar's Excavation Site."] = "Sucht Dorin Songblades Bruder Daewyn in Whelgars Ausgrabungsstätte.",
    ["Kill a Highland Horror within Excavation Sites and bring its root core to Rethiel the Greenwarden in the Wetlands."] = "Tötet einen Highland Horror in den Ausgrabungsstätten und bringt seinen Wurzelkern zu Rethiel the Greenwarden im Sumpfland.",
    ["Return to Caitlin Grassman in Menethil Harbor."] = "Kehrt zu Caitlin Grassman in Menethil zurück.",
    ["Follow-up of Lost in the Thicket Things."] = "Folgequest von Verloren im Dickicht.",
    ["Find Ardin Grassman in the Excavation Sites. Learn what happened to Ardin Grassman."] = "Findet Ardin Grassman in den Ausgrabungsstätten. Erfahrt, was mit Ardin Grassman geschehen ist.",
    ["Required before Heartwoven."] = "Voraussetzung für Herzgeflecht.",
    ["Start Lost in the Thicket Things here"] = "Hier beginnt Verloren im Dickicht",
    ["Menethil Harbor"] = "Menethil",
    ["Redridge Mountains"] = "Rotkammgebirge",
    ["Wetlands"] = "Sumpfland",
    ["inside Excavation Site: Wetlands"] = "in der Ausgrabungsstätte: Sumpfland",
    ["just outside Excavation Site: Wetlands"] = "direkt vor der Ausgrabungsstätte: Sumpfland",
    ["outside Excavation Site: Wetlands"] = "vor der Ausgrabungsstätte: Sumpfland",
}
EXC.frFR = {
    ["Open the Maw"] = "Ouvrir la Gueule",
    ["Changing Tastes"] = "Changement de goûts",
    ["Elder Knowledge"] = "Savoir ancestral",
    ["Highland Hides"] = "Peaux des hautes terres",
    ["Songblade Search"] = "Recherche de Songblade",
    ["Horrors in the Highland"] = "Horreurs des hautes terres",
    ["Heartwoven"] = "Cœur tressé",
    ["Lost Relic Carry"] = "Transport de relique perdue",
    ["Lost in the Thicket Things"] = "Perdu dans les fourrés",
    ["Bring the Dragonmaw Dispatch to the Deathstalker Agent just outside Excavation Site: Wetlands."] = "Apportez la Dragonmaw Dispatch au Deathstalker Agent, juste à l'extérieur du site de fouilles : Les Paluns.",
    ["The Deathstalker Agent waits at the new dig camp right outside the portal. He takes the Dragonmaw Dispatch off your hands; where the Dispatch drops has not been confirmed yet."] = "Le Deathstalker Agent attend au nouveau camp de fouilles, juste devant le portail. Il récupère la Dragonmaw Dispatch ; l'endroit où l'obtenir n'est pas encore confirmé.",
    ["Enter the Excavation Sites in the Wetlands and bring back 4 Thicket Raptor Meat."] = "Entrez dans les sites de fouilles des Paluns et rapportez 4 Thicket Raptor Meat.",
    ["Thicket Raptor Meat comes from the Thicket raptors (Thicket Lurker, Thicket Hunter, Thicket Matriarch) in Stalker's Thicket, the area of Shadetooth."] = "Thicket Raptor Meat provient des raptors du fourré (Thicket Lurker, Thicket Hunter, Thicket Matriarch) dans le Fourré des traqueurs, la zone de Shadetooth.",
    ["Titan Relic (dropped by Relic Guardian)"] = "Titan Relic (obtenue sur Relic Guardian)",
    ["Take the Titan Relic to the Elder Rise in Thunder Bluff and look for someone who can tell you more about it."] = "Apportez la Titan Relic à l'Éminence des Anciens aux Pitons-du-Tonnerre et trouvez quelqu'un qui pourra vous en dire plus.",
    ["Someone on the Elder Rise, Thunder Bluff"] = "Quelqu'un à l'Éminence des Anciens, Les Pitons-du-Tonnerre",
    ["Objective not confirmed yet."] = "Objectif pas encore confirmé.",
    ["Not confirmed yet"] = "Pas encore confirmé",
    ["Complete Daily Delivery first."] = "Terminez d'abord Daily Delivery.",
    ["Look for Dorin Songblade's brother, Daewyn, in Whelgar's Excavation Site."] = "Cherchez Daewyn, le frère de Dorin Songblade, au site de fouilles de Whelgar.",
    ["Kill a Highland Horror within Excavation Sites and bring its root core to Rethiel the Greenwarden in the Wetlands."] = "Tuez un Highland Horror dans les sites de fouilles et rapportez son noyau racine à Rethiel the Greenwarden aux Paluns.",
    ["Return to Caitlin Grassman in Menethil Harbor."] = "Retournez voir Caitlin Grassman à Havre-de-Menethil.",
    ["Follow-up of Lost in the Thicket Things."] = "Suite de Perdu dans les fourrés.",
    ["Find Ardin Grassman in the Excavation Sites. Learn what happened to Ardin Grassman."] = "Trouvez Ardin Grassman dans les sites de fouilles. Apprenez ce qui lui est arrivé.",
    ["Required before Heartwoven."] = "Prérequis de Cœur tressé.",
    ["Start Lost in the Thicket Things here"] = "C'est ici que commence Perdu dans les fourrés",
    ["Menethil Harbor"] = "Havre-de-Menethil",
    ["Redridge Mountains"] = "Les Carmines",
    ["Wetlands"] = "Les Paluns",
    ["inside Excavation Site: Wetlands"] = "dans le site de fouilles : Les Paluns",
    ["just outside Excavation Site: Wetlands"] = "juste à l'extérieur du site de fouilles : Les Paluns",
    ["outside Excavation Site: Wetlands"] = "à l'extérieur du site de fouilles : Les Paluns",
}
EXC.esES = {
    ["Open the Maw"] = "Abrir las Fauces",
    ["Changing Tastes"] = "Cambio de gustos",
    ["Elder Knowledge"] = "Conocimiento ancestral",
    ["Highland Hides"] = "Pieles de las Tierras Altas",
    ["Songblade Search"] = "Búsqueda de Songblade",
    ["Horrors in the Highland"] = "Horrores de las Tierras Altas",
    ["Heartwoven"] = "Corazón entretejido",
    ["Lost Relic Carry"] = "Transporte de reliquia perdida",
    ["Lost in the Thicket Things"] = "Perdido en la espesura",
    ["Bring the Dragonmaw Dispatch to the Deathstalker Agent just outside Excavation Site: Wetlands."] = "Lleva el Dragonmaw Dispatch al Deathstalker Agent, justo a las afueras de la Excavación: Los Humedales.",
    ["The Deathstalker Agent waits at the new dig camp right outside the portal. He takes the Dragonmaw Dispatch off your hands; where the Dispatch drops has not been confirmed yet."] = "El Deathstalker Agent espera en el nuevo campamento de excavación, justo a la entrada del portal. Él se encarga del Dragonmaw Dispatch; aún no está confirmado dónde se consigue.",
    ["Enter the Excavation Sites in the Wetlands and bring back 4 Thicket Raptor Meat."] = "Entra en las excavaciones de Los Humedales y trae 4 Thicket Raptor Meat.",
    ["Thicket Raptor Meat comes from the Thicket raptors (Thicket Lurker, Thicket Hunter, Thicket Matriarch) in Stalker's Thicket, the area of Shadetooth."] = "Thicket Raptor Meat se consigue de los raptores del matorral (Thicket Lurker, Thicket Hunter, Thicket Matriarch) en la Espesura del Acechador, la zona de Shadetooth.",
    ["Titan Relic (dropped by Relic Guardian)"] = "Titan Relic (la suelta Relic Guardian)",
    ["Take the Titan Relic to the Elder Rise in Thunder Bluff and look for someone who can tell you more about it."] = "Lleva la Titan Relic al Alto de los Ancianos en Cima del Trueno y busca a alguien que pueda contarte más sobre ella.",
    ["Someone on the Elder Rise, Thunder Bluff"] = "Alguien en el Alto de los Ancianos, Cima del Trueno",
    ["Objective not confirmed yet."] = "Objetivo aún sin confirmar.",
    ["Not confirmed yet"] = "Aún sin confirmar",
    ["Complete Daily Delivery first."] = "Completa primero Daily Delivery.",
    ["Look for Dorin Songblade's brother, Daewyn, in Whelgar's Excavation Site."] = "Busca a Daewyn, el hermano de Dorin Songblade, en la Excavación de Whelgar.",
    ["Kill a Highland Horror within Excavation Sites and bring its root core to Rethiel the Greenwarden in the Wetlands."] = "Mata a un Highland Horror en las excavaciones y lleva su núcleo de raíz a Rethiel the Greenwarden en Los Humedales.",
    ["Return to Caitlin Grassman in Menethil Harbor."] = "Regresa con Caitlin Grassman en el Puerto de Menethil.",
    ["Follow-up of Lost in the Thicket Things."] = "Continuación de Perdido en la espesura.",
    ["Find Ardin Grassman in the Excavation Sites. Learn what happened to Ardin Grassman."] = "Encuentra a Ardin Grassman en las excavaciones. Averigua qué le ha pasado.",
    ["Required before Heartwoven."] = "Requisito previo de Corazón entretejido.",
    ["Start Lost in the Thicket Things here"] = "Aquí empieza Perdido en la espesura",
    ["Menethil Harbor"] = "Puerto de Menethil",
    ["Redridge Mountains"] = "Montañas Crestagrana",
    ["Wetlands"] = "Los Humedales",
    ["inside Excavation Site: Wetlands"] = "dentro de la Excavación: Los Humedales",
    ["just outside Excavation Site: Wetlands"] = "justo a las afueras de la Excavación: Los Humedales",
    ["outside Excavation Site: Wetlands"] = "a las afueras de la Excavación: Los Humedales",
}
EXC.itIT = {
    ["Open the Maw"] = "Aprire le Fauci",
    ["Changing Tastes"] = "Cambio di gusti",
    ["Elder Knowledge"] = "Conoscenza antica",
    ["Highland Hides"] = "Pelli degli Altipiani",
    ["Songblade Search"] = "Ricerca di Songblade",
    ["Horrors in the Highland"] = "Orrori degli Altipiani",
    ["Heartwoven"] = "Cuore intrecciato",
    ["Lost Relic Carry"] = "Trasporto di reliquia perduta",
    ["Lost in the Thicket Things"] = "Perso nel Boschetto",
    ["Bring the Dragonmaw Dispatch to the Deathstalker Agent just outside Excavation Site: Wetlands."] = "Porta il Dragonmaw Dispatch al Deathstalker Agent, appena fuori dal Sito di scavo: Paludi.",
    ["The Deathstalker Agent waits at the new dig camp right outside the portal. He takes the Dragonmaw Dispatch off your hands; where the Dispatch drops has not been confirmed yet."] = "Il Deathstalker Agent aspetta nel nuovo accampamento di scavo, proprio fuori dal portale. Prende il Dragonmaw Dispatch; dove si ottiene non è ancora confermato.",
    ["Enter the Excavation Sites in the Wetlands and bring back 4 Thicket Raptor Meat."] = "Entra nei siti di scavo delle Paludi e riporta 4 Thicket Raptor Meat.",
    ["Thicket Raptor Meat comes from the Thicket raptors (Thicket Lurker, Thicket Hunter, Thicket Matriarch) in Stalker's Thicket, the area of Shadetooth."] = "Thicket Raptor Meat proviene dai raptor del boschetto (Thicket Lurker, Thicket Hunter, Thicket Matriarch) nel Boschetto dei Predatori, l'area di Shadetooth.",
    ["Titan Relic (dropped by Relic Guardian)"] = "Titan Relic (rilasciata da Relic Guardian)",
    ["Take the Titan Relic to the Elder Rise in Thunder Bluff and look for someone who can tell you more about it."] = "Porta la Titan Relic all'Altura degli Anziani a Picco del Tuono e cerca qualcuno che possa dirti di più.",
    ["Someone on the Elder Rise, Thunder Bluff"] = "Qualcuno all'Altura degli Anziani, Picco del Tuono",
    ["Objective not confirmed yet."] = "Obiettivo non ancora confermato.",
    ["Not confirmed yet"] = "Non ancora confermato",
    ["Complete Daily Delivery first."] = "Completa prima Daily Delivery.",
    ["Look for Dorin Songblade's brother, Daewyn, in Whelgar's Excavation Site."] = "Cerca Daewyn, il fratello di Dorin Songblade, nello Scavo di Whelgar.",
    ["Kill a Highland Horror within Excavation Sites and bring its root core to Rethiel the Greenwarden in the Wetlands."] = "Uccidi un Highland Horror nei siti di scavo e porta il suo nucleo di radici a Rethiel the Greenwarden nelle Paludi.",
    ["Return to Caitlin Grassman in Menethil Harbor."] = "Torna da Caitlin Grassman a Porto di Menethil.",
    ["Follow-up of Lost in the Thicket Things."] = "Seguito di Perso nel Boschetto.",
    ["Find Ardin Grassman in the Excavation Sites. Learn what happened to Ardin Grassman."] = "Trova Ardin Grassman nei siti di scavo. Scopri che cosa gli è successo.",
    ["Required before Heartwoven."] = "Da completare prima di Cuore intrecciato.",
    ["Start Lost in the Thicket Things here"] = "Qui inizia Perso nel Boschetto",
    ["Menethil Harbor"] = "Porto di Menethil",
    ["Redridge Mountains"] = "Redridge Mountains",
    ["Wetlands"] = "Paludi",
    ["inside Excavation Site: Wetlands"] = "dentro il Sito di scavo: Paludi",
    ["just outside Excavation Site: Wetlands"] = "appena fuori dal Sito di scavo: Paludi",
    ["outside Excavation Site: Wetlands"] = "fuori dal Sito di scavo: Paludi",
}
EXC.ptBR = {
    ["Open the Maw"] = "Abrir as Fauces",
    ["Changing Tastes"] = "Mudança de Gosto",
    ["Elder Knowledge"] = "Conhecimento Ancestral",
    ["Highland Hides"] = "Couros das Terras Altas",
    ["Songblade Search"] = "Busca por Songblade",
    ["Horrors in the Highland"] = "Horrores das Terras Altas",
    ["Heartwoven"] = "Coração Trançado",
    ["Lost Relic Carry"] = "Transporte de Relíquia Perdida",
    ["Lost in the Thicket Things"] = "Perdido no Matagal",
    ["Bring the Dragonmaw Dispatch to the Deathstalker Agent just outside Excavation Site: Wetlands."] = "Leve o Dragonmaw Dispatch ao Deathstalker Agent, logo fora do Sítio de Escavação: Pantanal.",
    ["The Deathstalker Agent waits at the new dig camp right outside the portal. He takes the Dragonmaw Dispatch off your hands; where the Dispatch drops has not been confirmed yet."] = "O Deathstalker Agent espera no novo acampamento de escavação, logo na saída do portal. Ele recebe o Dragonmaw Dispatch; onde conseguir o item ainda não foi confirmado.",
    ["Enter the Excavation Sites in the Wetlands and bring back 4 Thicket Raptor Meat."] = "Entre nos sítios de escavação do Pantanal e traga 4 Thicket Raptor Meat.",
    ["Thicket Raptor Meat comes from the Thicket raptors (Thicket Lurker, Thicket Hunter, Thicket Matriarch) in Stalker's Thicket, the area of Shadetooth."] = "Thicket Raptor Meat vem dos raptores do matagal (Thicket Lurker, Thicket Hunter, Thicket Matriarch) no Matagal dos Espreitadores, a área de Shadetooth.",
    ["Titan Relic (dropped by Relic Guardian)"] = "Titan Relic (dropada por Relic Guardian)",
    ["Take the Titan Relic to the Elder Rise in Thunder Bluff and look for someone who can tell you more about it."] = "Leve a Titan Relic ao Alto dos Anciões em Penhasco do Trovão e procure alguém que possa lhe contar mais sobre ela.",
    ["Someone on the Elder Rise, Thunder Bluff"] = "Alguém no Alto dos Anciões, Penhasco do Trovão",
    ["Objective not confirmed yet."] = "Objetivo ainda não confirmado.",
    ["Not confirmed yet"] = "Ainda não confirmado",
    ["Complete Daily Delivery first."] = "Conclua Daily Delivery primeiro.",
    ["Look for Dorin Songblade's brother, Daewyn, in Whelgar's Excavation Site."] = "Procure Daewyn, irmão de Dorin Songblade, na Escavação de Whelgar.",
    ["Kill a Highland Horror within Excavation Sites and bring its root core to Rethiel the Greenwarden in the Wetlands."] = "Mate um Highland Horror nos sítios de escavação e leve o núcleo de raiz dele a Rethiel the Greenwarden no Pantanal.",
    ["Return to Caitlin Grassman in Menethil Harbor."] = "Volte para Caitlin Grassman em Porto Menethil.",
    ["Follow-up of Lost in the Thicket Things."] = "Continuação de Perdido no Matagal.",
    ["Find Ardin Grassman in the Excavation Sites. Learn what happened to Ardin Grassman."] = "Encontre Ardin Grassman nos sítios de escavação. Descubra o que aconteceu com ele.",
    ["Required before Heartwoven."] = "Requisito antes de Coração Trançado.",
    ["Start Lost in the Thicket Things here"] = "Comece Perdido no Matagal aqui",
    ["Menethil Harbor"] = "Porto Menethil",
    ["Redridge Mountains"] = "Redridge Mountains",
    ["Wetlands"] = "Pantanal",
    ["inside Excavation Site: Wetlands"] = "dentro do Sítio de Escavação: Pantanal",
    ["just outside Excavation Site: Wetlands"] = "logo fora do Sítio de Escavação: Pantanal",
    ["outside Excavation Site: Wetlands"] = "fora do Sítio de Escavação: Pantanal",
}
EXC.ruRU = {
    ["Open the Maw"] = "Раскрыть Пасть",
    ["Changing Tastes"] = "Перемена вкусов",
    ["Elder Knowledge"] = "Древнее знание",
    ["Highland Hides"] = "Шкуры нагорья",
    ["Songblade Search"] = "Поиски Songblade",
    ["Horrors in the Highland"] = "Ужасы нагорья",
    ["Heartwoven"] = "Сплетённое сердце",
    ["Lost Relic Carry"] = "Перевозка утерянной реликвии",
    ["Lost in the Thicket Things"] = "Затерянные в зарослях",
    ["Bring the Dragonmaw Dispatch to the Deathstalker Agent just outside Excavation Site: Wetlands."] = "Отнесите Dragonmaw Dispatch к Deathstalker Agent прямо у входа в раскопки: Болотина.",
    ["The Deathstalker Agent waits at the new dig camp right outside the portal. He takes the Dragonmaw Dispatch off your hands; where the Dispatch drops has not been confirmed yet."] = "Deathstalker Agent ждёт в новом лагере раскопок прямо у портала. Он заберёт у вас Dragonmaw Dispatch; где его добыть, пока не подтверждено.",
    ["Enter the Excavation Sites in the Wetlands and bring back 4 Thicket Raptor Meat."] = "Войдите в раскопки в Болотине и принесите 4 Thicket Raptor Meat.",
    ["Thicket Raptor Meat comes from the Thicket raptors (Thicket Lurker, Thicket Hunter, Thicket Matriarch) in Stalker's Thicket, the area of Shadetooth."] = "Thicket Raptor Meat выпадает из рапторов зарослей (Thicket Lurker, Thicket Hunter, Thicket Matriarch) в Чаще охотников — области Shadetooth.",
    ["Titan Relic (dropped by Relic Guardian)"] = "Titan Relic (выпадает из Relic Guardian)",
    ["Take the Titan Relic to the Elder Rise in Thunder Bluff and look for someone who can tell you more about it."] = "Отнесите Titan Relic на Возвышенность старейшин в Громовом Утёсе и найдите того, кто расскажет о ней больше.",
    ["Someone on the Elder Rise, Thunder Bluff"] = "Кто-то на Возвышенности старейшин, Громовой Утёс",
    ["Objective not confirmed yet."] = "Задача пока не подтверждена.",
    ["Not confirmed yet"] = "Пока не подтверждено",
    ["Complete Daily Delivery first."] = "Сначала выполните Daily Delivery.",
    ["Look for Dorin Songblade's brother, Daewyn, in Whelgar's Excavation Site."] = "Найдите Daewyn, брата Dorin Songblade, на раскопках Вельгара.",
    ["Kill a Highland Horror within Excavation Sites and bring its root core to Rethiel the Greenwarden in the Wetlands."] = "Убейте Highland Horror на раскопках и принесите его корневое ядро Rethiel the Greenwarden в Болотину.",
    ["Return to Caitlin Grassman in Menethil Harbor."] = "Вернитесь к Caitlin Grassman в Гавань Менетил.",
    ["Follow-up of Lost in the Thicket Things."] = "Продолжение задания «Затерянные в зарослях».",
    ["Find Ardin Grassman in the Excavation Sites. Learn what happened to Ardin Grassman."] = "Найдите Ardin Grassman на раскопках. Узнайте, что с ним случилось.",
    ["Required before Heartwoven."] = "Необходимо выполнить перед «Сплетённое сердце».",
    ["Start Lost in the Thicket Things here"] = "Здесь начинается «Затерянные в зарослях»",
    ["Menethil Harbor"] = "Гавань Менетил",
    ["Redridge Mountains"] = "Красногорье",
    ["Wetlands"] = "Болотина",
    ["inside Excavation Site: Wetlands"] = "внутри раскопок: Болотина",
    ["just outside Excavation Site: Wetlands"] = "прямо у входа в раскопки: Болотина",
    ["outside Excavation Site: Wetlands"] = "у входа в раскопки: Болотина",
}
EXC.koKR = {
    ["Open the Maw"] = "아가리 열기",
    ["Changing Tastes"] = "바뀌는 입맛",
    ["Elder Knowledge"] = "원로의 지식",
    ["Highland Hides"] = "고지대 가죽",
    ["Songblade Search"] = "송블레이드 수색",
    ["Horrors in the Highland"] = "고지대의 공포",
    ["Heartwoven"] = "마음으로 엮다",
    ["Lost Relic Carry"] = "분실된 유물 운반",
    ["Lost in the Thicket Things"] = "덤불 속에서 길을 잃다",
    ["Bring the Dragonmaw Dispatch to the Deathstalker Agent just outside Excavation Site: Wetlands."] = "발굴지: 저습지 바로 바깥에 있는 Deathstalker Agent에게 Dragonmaw Dispatch를 가져가세요.",
    ["The Deathstalker Agent waits at the new dig camp right outside the portal. He takes the Dragonmaw Dispatch off your hands; where the Dispatch drops has not been confirmed yet."] = "Deathstalker Agent는 포털 바로 바깥의 새 발굴 야영지에 있습니다. Dragonmaw Dispatch를 받아 가며, 입수처는 아직 확인되지 않았습니다.",
    ["Enter the Excavation Sites in the Wetlands and bring back 4 Thicket Raptor Meat."] = "저습지의 발굴지에 들어가 Thicket Raptor Meat 4개를 가져오세요.",
    ["Thicket Raptor Meat comes from the Thicket raptors (Thicket Lurker, Thicket Hunter, Thicket Matriarch) in Stalker's Thicket, the area of Shadetooth."] = "Thicket Raptor Meat는 추적자의 덤불에 있는 덤불 랩터(Thicket Lurker, Thicket Hunter, Thicket Matriarch)에게서 얻습니다. Shadetooth가 있는 구역입니다.",
    ["Titan Relic (dropped by Relic Guardian)"] = "Titan Relic (Relic Guardian이 떨어뜨림)",
    ["Take the Titan Relic to the Elder Rise in Thunder Bluff and look for someone who can tell you more about it."] = "Titan Relic을 썬더 블러프의 원로의 언덕으로 가져가 이에 대해 더 알려줄 사람을 찾으세요.",
    ["Someone on the Elder Rise, Thunder Bluff"] = "썬더 블러프 원로의 언덕에 있는 누군가",
    ["Objective not confirmed yet."] = "목표가 아직 확인되지 않았습니다.",
    ["Not confirmed yet"] = "아직 확인되지 않음",
    ["Complete Daily Delivery first."] = "먼저 Daily Delivery를 완료하세요.",
    ["Look for Dorin Songblade's brother, Daewyn, in Whelgar's Excavation Site."] = "웰가르 발굴지에서 Dorin Songblade의 동생 Daewyn을 찾으세요.",
    ["Kill a Highland Horror within Excavation Sites and bring its root core to Rethiel the Greenwarden in the Wetlands."] = "발굴지에서 Highland Horror를 처치하고 그 뿌리 핵을 저습지의 Rethiel the Greenwarden에게 가져가세요.",
    ["Return to Caitlin Grassman in Menethil Harbor."] = "메네실 항구의 Caitlin Grassman에게 돌아가세요.",
    ["Follow-up of Lost in the Thicket Things."] = "'덤불 속에서 길을 잃다'의 후속 퀘스트입니다.",
    ["Find Ardin Grassman in the Excavation Sites. Learn what happened to Ardin Grassman."] = "발굴지에서 Ardin Grassman을 찾으세요. Ardin Grassman에게 무슨 일이 있었는지 알아보세요.",
    ["Required before Heartwoven."] = "'마음으로 엮다' 전에 완료해야 합니다.",
    ["Start Lost in the Thicket Things here"] = "여기서 '덤불 속에서 길을 잃다'를 시작합니다",
    ["Menethil Harbor"] = "메네실 항구",
    ["Redridge Mountains"] = "붉은마루 산맥",
    ["Wetlands"] = "저습지",
    ["inside Excavation Site: Wetlands"] = "발굴지: 저습지 내부",
    ["just outside Excavation Site: Wetlands"] = "발굴지: 저습지 바로 바깥",
    ["outside Excavation Site: Wetlands"] = "발굴지: 저습지 바깥",
}
EXC.zhCN = {
    ["Open the Maw"] = "打开巨口",
    ["Changing Tastes"] = "口味之变",
    ["Elder Knowledge"] = "长者的知识",
    ["Highland Hides"] = "高地兽皮",
    ["Songblade Search"] = "寻找Songblade",
    ["Horrors in the Highland"] = "高地惊魂",
    ["Heartwoven"] = "心编",
    ["Lost Relic Carry"] = "遗失遗物运送",
    ["Lost in the Thicket Things"] = "迷失于灌丛",
    ["Bring the Dragonmaw Dispatch to the Deathstalker Agent just outside Excavation Site: Wetlands."] = "把Dragonmaw Dispatch交给挖掘场：湿地外面的Deathstalker Agent。",
    ["The Deathstalker Agent waits at the new dig camp right outside the portal. He takes the Dragonmaw Dispatch off your hands; where the Dispatch drops has not been confirmed yet."] = "Deathstalker Agent在传送门外的新挖掘营地等候。他会接收Dragonmaw Dispatch；获取方式尚未确认。",
    ["Enter the Excavation Sites in the Wetlands and bring back 4 Thicket Raptor Meat."] = "进入湿地的挖掘场，带回4个Thicket Raptor Meat。",
    ["Thicket Raptor Meat comes from the Thicket raptors (Thicket Lurker, Thicket Hunter, Thicket Matriarch) in Stalker's Thicket, the area of Shadetooth."] = "Thicket Raptor Meat来自潜伏者灌木林（Shadetooth所在区域）的灌丛迅猛龙（Thicket Lurker、Thicket Hunter、Thicket Matriarch）。",
    ["Titan Relic (dropped by Relic Guardian)"] = "Titan Relic（由Relic Guardian掉落）",
    ["Take the Titan Relic to the Elder Rise in Thunder Bluff and look for someone who can tell you more about it."] = "把Titan Relic带到雷霆崖的长者高地，找一个能告诉你更多相关信息的人。",
    ["Someone on the Elder Rise, Thunder Bluff"] = "雷霆崖长者高地上的某人",
    ["Objective not confirmed yet."] = "目标尚未确认。",
    ["Not confirmed yet"] = "尚未确认",
    ["Complete Daily Delivery first."] = "请先完成Daily Delivery。",
    ["Look for Dorin Songblade's brother, Daewyn, in Whelgar's Excavation Site."] = "在惠尔格挖掘场寻找Dorin Songblade的兄弟Daewyn。",
    ["Kill a Highland Horror within Excavation Sites and bring its root core to Rethiel the Greenwarden in the Wetlands."] = "在挖掘场击杀一只Highland Horror，把它的根核交给湿地的Rethiel the Greenwarden。",
    ["Return to Caitlin Grassman in Menethil Harbor."] = "回到米奈希尔港的Caitlin Grassman那里。",
    ["Follow-up of Lost in the Thicket Things."] = "“迷失于灌丛”的后续任务。",
    ["Find Ardin Grassman in the Excavation Sites. Learn what happened to Ardin Grassman."] = "在挖掘场找到Ardin Grassman，查明Ardin Grassman出了什么事。",
    ["Required before Heartwoven."] = "是“心编”的前置任务。",
    ["Start Lost in the Thicket Things here"] = "在此开始“迷失于灌丛”",
    ["Menethil Harbor"] = "米奈希尔港",
    ["Redridge Mountains"] = "赤脊山",
    ["Wetlands"] = "湿地",
    ["inside Excavation Site: Wetlands"] = "挖掘场：湿地内部",
    ["just outside Excavation Site: Wetlands"] = "挖掘场：湿地正外方",
    ["outside Excavation Site: Wetlands"] = "挖掘场：湿地外面",
}
EXC.zhTW = {
    ["Open the Maw"] = "開啟巨口",
    ["Changing Tastes"] = "口味之變",
    ["Elder Knowledge"] = "長者的知識",
    ["Highland Hides"] = "高地獸皮",
    ["Songblade Search"] = "尋找Songblade",
    ["Horrors in the Highland"] = "高地驚魂",
    ["Heartwoven"] = "心編",
    ["Lost Relic Carry"] = "遺失遺物運送",
    ["Lost in the Thicket Things"] = "迷失於灌叢",
    ["Bring the Dragonmaw Dispatch to the Deathstalker Agent just outside Excavation Site: Wetlands."] = "把Dragonmaw Dispatch交給挖掘場：濕地外面的Deathstalker Agent。",
    ["The Deathstalker Agent waits at the new dig camp right outside the portal. He takes the Dragonmaw Dispatch off your hands; where the Dispatch drops has not been confirmed yet."] = "Deathstalker Agent在傳送門外的新挖掘營地等候。他會接收Dragonmaw Dispatch；獲取方式尚未確認。",
    ["Enter the Excavation Sites in the Wetlands and bring back 4 Thicket Raptor Meat."] = "進入濕地的挖掘場，帶回4個Thicket Raptor Meat。",
    ["Thicket Raptor Meat comes from the Thicket raptors (Thicket Lurker, Thicket Hunter, Thicket Matriarch) in Stalker's Thicket, the area of Shadetooth."] = "Thicket Raptor Meat來自潛伏者灌木林（Shadetooth所在區域）的灌叢迅猛龍（Thicket Lurker、Thicket Hunter、Thicket Matriarch）。",
    ["Titan Relic (dropped by Relic Guardian)"] = "Titan Relic（由Relic Guardian掉落）",
    ["Take the Titan Relic to the Elder Rise in Thunder Bluff and look for someone who can tell you more about it."] = "把Titan Relic帶到雷霆崖的長者高地，找一個能告訴你更多相關資訊的人。",
    ["Someone on the Elder Rise, Thunder Bluff"] = "雷霆崖長者高地上的某人",
    ["Objective not confirmed yet."] = "目標尚未確認。",
    ["Not confirmed yet"] = "尚未確認",
    ["Complete Daily Delivery first."] = "請先完成Daily Delivery。",
    ["Look for Dorin Songblade's brother, Daewyn, in Whelgar's Excavation Site."] = "在惠爾格挖掘場尋找Dorin Songblade的兄弟Daewyn。",
    ["Kill a Highland Horror within Excavation Sites and bring its root core to Rethiel the Greenwarden in the Wetlands."] = "在挖掘場擊殺一隻Highland Horror，把它的根核交給濕地的Rethiel the Greenwarden。",
    ["Return to Caitlin Grassman in Menethil Harbor."] = "回到米奈希爾港的Caitlin Grassman那裡。",
    ["Follow-up of Lost in the Thicket Things."] = "“迷失於灌叢”的後續任務。",
    ["Find Ardin Grassman in the Excavation Sites. Learn what happened to Ardin Grassman."] = "在挖掘場找到Ardin Grassman，查明Ardin Grassman出了什麼事。",
    ["Required before Heartwoven."] = "是“心編”的前置任務。",
    ["Start Lost in the Thicket Things here"] = "在此開始“迷失於灌叢”",
    ["Menethil Harbor"] = "米奈希爾港",
    ["Redridge Mountains"] = "赤脊山",
    ["Wetlands"] = "濕地",
    ["inside Excavation Site: Wetlands"] = "挖掘場：濕地內部",
    ["just outside Excavation Site: Wetlands"] = "挖掘場：濕地正外方",
    ["outside Excavation Site: Wetlands"] = "挖掘場：濕地外面",
}
for lang, strings in pairs(EXC) do
    local target = FDJ.ContentLocales[lang] or {}
    FDJ.ContentLocales[lang] = target
    target.places = target.places or {}
    for key, value in pairs(strings) do
        if target.places[key] == nil then target.places[key] = value end
    end
end

-- Excavation Site / City of Dalaran quest strings added later: whole-string
-- translations (names, objectives, notes, place parts). Merged without overwriting.
local EXC2 = {}
EXC2.deDE = {
    ["Defeat 2 Dragonmaw Saboteurs and 4 Dragonmaw Warders, recover the Dragonmaw Dispatch, and report to the Deathstalker Agent outside the dungeon."] = "Besiegt 2 Dragonmaw Saboteurs und 4 Dragonmaw Warders, beschafft die Dragonmaw Dispatch und meldet euch beim Deathstalker Agent außerhalb des Dungeons.",
    ["Related lead-in: Dragonmaw Rumors. The Dragonmaw Dispatch is recovered from the Dragonmaw forces inside the dungeon."] = "Vorquest: Dragonmaw Rumors. Die Dragonmaw Dispatch erbeutet ihr von den Dragonmaw-Truppen im Dungeon.",
    ["Continues with Earthen Echo, which sends you to Muln Earthfury in northwest Mulgore."] = "Führt weiter zu Irdenes Echo, das euch zu Muln Earthfury im Nordwesten von Mulgore schickt.",
    ["Collect 4 Thicket Raptor Hides and take them to James Halloran in Menethil Harbor."] = "Sammelt 4 Thicket Raptor Hides und bringt sie zu James Halloran in Menethil.",
    ["Find Daewyn inside the dungeon. Fallen in the Fen sends you back to Dorin Songblade in Lakeshire."] = "Findet Daewyn im Dungeon. Gefallen im Moor schickt euch zurück zu Dorin Songblade in Seenhain.",
    ["Take the Reed-woven Heart back to Caitlin Grassman in Menethil Harbor."] = "Bringt das Reed-woven Heart zu Caitlin Grassman in Menethil zurück.",
    ["Prehistoric Prism"] = "Urzeitliches Prisma",
    ["Deliver the Titan Relic to High Explorer Magellas in the Hall of Explorers."] = "Bringt das Titan Relic zu High Explorer Magellas in der Halle der Forscher.",
    ["Earthen Echo"] = "Irdenes Echo",
    ["Deliver the Titan Relic to Muln Earthfury on Skywatcher Plateau in northwest Mulgore."] = "Bringt das Titan Relic zu Muln Earthfury auf dem Skywatcher Plateau im Nordwesten von Mulgore.",
    ["Fallen in the Fen"] = "Gefallen im Moor",
    ["Report Daewyn's fate to Dorin Songblade in Lakeshire."] = "Meldet Daewyns Schicksal Dorin Songblade in Seenhain.",
    ["A Green Sample"] = "Eine grüne Probe",
    ["Retrieve a Fel Infused Blossom from Dalaran's central garden."] = "Besorgt eine Fel Infused Blossom aus dem zentralen Garten von Dalaran.",
    ["Quest data is recorded in the beta; dungeon access may be unavailable."] = "Die Questdaten sind in der Beta aufgezeichnet; der Zugang zum Dungeon ist möglicherweise nicht verfügbar.",
    ["Power Overwhelming"] = "Überwältigende Macht",
    ["Slay Arcanic Enigma, the Mana Elemental in the City of Dalaran, and return to High Sorcerer Andromath in Stormwind City."] = "Tötet Arcanic Enigma, das Manaelementar in der Stadt Dalaran, und kehrt zu High Sorcerer Andromath in Sturmwind zurück.",
    ["Opportunistic Education"] = "Berechnende Bildung",
    ["Recover The Founding of Dalaran and deliver it to Rexxie Copperclutch."] = "Beschafft The Founding of Dalaran und liefert es bei Rexxie Copperclutch ab.",
    ["Source of Power"] = "Quelle der Macht",
    ["Collect 6 Cracked Sentry Cores from the constructs in Dalaran."] = "Sammelt 6 Cracked Sentry Cores von den Konstrukten in Dalaran.",
    ["The Grave Knight"] = "Der Grabritter",
    ["Defeat Atrexis the Grave Knight in the Dalaran Underbelly."] = "Besiegt Atrexis the Grave Knight in der Schattenseite von Dalaran.",
    ["Deliver the Titan Relic to Prospector Whelgar at the Wetlands excavation site."] = "Bringt das Titan Relic zu Prospector Whelgar an der Ausgrabungsstätte im Sumpfland.",
    ["After Elder Knowledge"] = "Nach Uraltes Wissen",
    ["Mulgore"] = "Mulgore",
    ["Whelgar's Excavation Site"] = "Whelgars Ausgrabungsstätte",
    ["Hall of Explorers"] = "Halle der Forscher",
    ["Lakeshire"] = "Seenhain",
    ["Elder Rise"] = "Ältestenhöhe",
    ["near the Dalaran sewer entrance"] = "nahe dem Kanalisationseingang von Dalaran",
    ["Dalaran sewer entrance"] = "Kanalisationseingang von Dalaran",
}
EXC2.frFR = {
    ["Defeat 2 Dragonmaw Saboteurs and 4 Dragonmaw Warders, recover the Dragonmaw Dispatch, and report to the Deathstalker Agent outside the dungeon."] = "Vainquez 2 Dragonmaw Saboteurs et 4 Dragonmaw Warders, récupérez la Dragonmaw Dispatch et faites votre rapport au Deathstalker Agent à l'extérieur du donjon.",
    ["Related lead-in: Dragonmaw Rumors. The Dragonmaw Dispatch is recovered from the Dragonmaw forces inside the dungeon."] = "Quête préalable : Dragonmaw Rumors. La Dragonmaw Dispatch se récupère sur les forces Dragonmaw à l'intérieur du donjon.",
    ["Continues with Earthen Echo, which sends you to Muln Earthfury in northwest Mulgore."] = "Se poursuit avec Écho terrestre, qui vous envoie voir Muln Earthfury au nord-ouest de Mulgore.",
    ["Collect 4 Thicket Raptor Hides and take them to James Halloran in Menethil Harbor."] = "Récoltez 4 Thicket Raptor Hides et apportez-les à James Halloran à Havre-de-Menethil.",
    ["Find Daewyn inside the dungeon. Fallen in the Fen sends you back to Dorin Songblade in Lakeshire."] = "Trouvez Daewyn dans le donjon. Tombé dans le marécage vous renvoie à Dorin Songblade à Lakeshire.",
    ["Take the Reed-woven Heart back to Caitlin Grassman in Menethil Harbor."] = "Rapportez le Reed-woven Heart à Caitlin Grassman à Havre-de-Menethil.",
    ["Prehistoric Prism"] = "Prisme préhistorique",
    ["Deliver the Titan Relic to High Explorer Magellas in the Hall of Explorers."] = "Apportez la Titan Relic à High Explorer Magellas dans le Hall des explorateurs.",
    ["Earthen Echo"] = "Écho terrestre",
    ["Deliver the Titan Relic to Muln Earthfury on Skywatcher Plateau in northwest Mulgore."] = "Apportez la Titan Relic à Muln Earthfury sur le Skywatcher Plateau, au nord-ouest de Mulgore.",
    ["Fallen in the Fen"] = "Tombé dans le marécage",
    ["Report Daewyn's fate to Dorin Songblade in Lakeshire."] = "Annoncez le sort de Daewyn à Dorin Songblade à Lakeshire.",
    ["A Green Sample"] = "Un échantillon vert",
    ["Retrieve a Fel Infused Blossom from Dalaran's central garden."] = "Récupérez une Fel Infused Blossom dans le jardin central de Dalaran.",
    ["Quest data is recorded in the beta; dungeon access may be unavailable."] = "Les données de la quête sont enregistrées dans la bêta ; l'accès au donjon peut être indisponible.",
    ["Power Overwhelming"] = "Pouvoir écrasant",
    ["Slay Arcanic Enigma, the Mana Elemental in the City of Dalaran, and return to High Sorcerer Andromath in Stormwind City."] = "Tuez Arcanic Enigma, l'élémentaire de mana de la Cité de Dalaran, et retournez voir High Sorcerer Andromath à Hurlevent.",
    ["Opportunistic Education"] = "Éducation opportuniste",
    ["Recover The Founding of Dalaran and deliver it to Rexxie Copperclutch."] = "Récupérez The Founding of Dalaran et remettez-le à Rexxie Copperclutch.",
    ["Source of Power"] = "Source de pouvoir",
    ["Collect 6 Cracked Sentry Cores from the constructs in Dalaran."] = "Récoltez 6 Cracked Sentry Cores sur les assemblages de Dalaran.",
    ["The Grave Knight"] = "Le chevalier du tombeau",
    ["Defeat Atrexis the Grave Knight in the Dalaran Underbelly."] = "Vainquez Atrexis the Grave Knight dans les Entrailles de Dalaran.",
    ["Deliver the Titan Relic to Prospector Whelgar at the Wetlands excavation site."] = "Apportez la Titan Relic à Prospector Whelgar au site de fouilles des Paluns.",
    ["After Elder Knowledge"] = "Après Savoir ancestral",
    ["Mulgore"] = "Mulgore",
    ["Whelgar's Excavation Site"] = "Site de fouilles de Whelgar",
    ["Hall of Explorers"] = "Hall des explorateurs",
    ["Lakeshire"] = "Lakeshire",
    ["Elder Rise"] = "Éminence des Anciens",
    ["near the Dalaran sewer entrance"] = "près de l'entrée des égouts de Dalaran",
    ["Dalaran sewer entrance"] = "entrée des égouts de Dalaran",
}
EXC2.esES = {
    ["Defeat 2 Dragonmaw Saboteurs and 4 Dragonmaw Warders, recover the Dragonmaw Dispatch, and report to the Deathstalker Agent outside the dungeon."] = "Derrota a 2 Dragonmaw Saboteurs y a 4 Dragonmaw Warders, recupera el Dragonmaw Dispatch e informa al Deathstalker Agent fuera de la mazmorra.",
    ["Related lead-in: Dragonmaw Rumors. The Dragonmaw Dispatch is recovered from the Dragonmaw forces inside the dungeon."] = "Antecedente: Dragonmaw Rumors. El Dragonmaw Dispatch se recupera de las fuerzas Dragonmaw dentro de la mazmorra.",
    ["Continues with Earthen Echo, which sends you to Muln Earthfury in northwest Mulgore."] = "Continúa con Eco terrenal, que te envía a Muln Earthfury en el noroeste de Mulgore.",
    ["Collect 4 Thicket Raptor Hides and take them to James Halloran in Menethil Harbor."] = "Reúne 4 Thicket Raptor Hides y llévaselas a James Halloran en el Puerto de Menethil.",
    ["Find Daewyn inside the dungeon. Fallen in the Fen sends you back to Dorin Songblade in Lakeshire."] = "Encuentra a Daewyn dentro de la mazmorra. Caído en el pantano te devuelve a Dorin Songblade en Villa del Lago.",
    ["Take the Reed-woven Heart back to Caitlin Grassman in Menethil Harbor."] = "Lleva el Reed-woven Heart de vuelta a Caitlin Grassman en el Puerto de Menethil.",
    ["Prehistoric Prism"] = "Prisma prehistórico",
    ["Deliver the Titan Relic to High Explorer Magellas in the Hall of Explorers."] = "Lleva la Titan Relic a High Explorer Magellas en la Sala de los Exploradores.",
    ["Earthen Echo"] = "Eco terrenal",
    ["Deliver the Titan Relic to Muln Earthfury on Skywatcher Plateau in northwest Mulgore."] = "Lleva la Titan Relic a Muln Earthfury en Skywatcher Plateau, al noroeste de Mulgore.",
    ["Fallen in the Fen"] = "Caído en el pantano",
    ["Report Daewyn's fate to Dorin Songblade in Lakeshire."] = "Informa a Dorin Songblade en Villa del Lago del destino de Daewyn.",
    ["A Green Sample"] = "Una muestra verde",
    ["Retrieve a Fel Infused Blossom from Dalaran's central garden."] = "Recupera una Fel Infused Blossom del jardín central de Dalaran.",
    ["Quest data is recorded in the beta; dungeon access may be unavailable."] = "Los datos de la misión están registrados en la beta; es posible que no se pueda acceder a la mazmorra.",
    ["Power Overwhelming"] = "Poder abrumador",
    ["Slay Arcanic Enigma, the Mana Elemental in the City of Dalaran, and return to High Sorcerer Andromath in Stormwind City."] = "Mata a Arcanic Enigma, el elemental de maná de la Ciudad de Dalaran, y vuelve con High Sorcerer Andromath en Ventormenta.",
    ["Opportunistic Education"] = "Educación oportunista",
    ["Recover The Founding of Dalaran and deliver it to Rexxie Copperclutch."] = "Recupera The Founding of Dalaran y entrégaselo a Rexxie Copperclutch.",
    ["Source of Power"] = "Fuente de poder",
    ["Collect 6 Cracked Sentry Cores from the constructs in Dalaran."] = "Reúne 6 Cracked Sentry Cores de los constructos de Dalaran.",
    ["The Grave Knight"] = "El caballero de la tumba",
    ["Defeat Atrexis the Grave Knight in the Dalaran Underbelly."] = "Derrota a Atrexis the Grave Knight en los Bajos de Dalaran.",
    ["Deliver the Titan Relic to Prospector Whelgar at the Wetlands excavation site."] = "Lleva la Titan Relic a Prospector Whelgar en la excavación de Los Humedales.",
    ["After Elder Knowledge"] = "Tras Conocimiento ancestral",
    ["Mulgore"] = "Mulgore",
    ["Whelgar's Excavation Site"] = "Excavación de Whelgar",
    ["Hall of Explorers"] = "Sala de los Exploradores",
    ["Lakeshire"] = "Villa del Lago",
    ["Elder Rise"] = "Alto de los Ancianos",
    ["near the Dalaran sewer entrance"] = "cerca de la entrada de las cloacas de Dalaran",
    ["Dalaran sewer entrance"] = "entrada de las cloacas de Dalaran",
}
EXC2.itIT = {
    ["Defeat 2 Dragonmaw Saboteurs and 4 Dragonmaw Warders, recover the Dragonmaw Dispatch, and report to the Deathstalker Agent outside the dungeon."] = "Sconfiggi 2 Dragonmaw Saboteurs e 4 Dragonmaw Warders, recupera il Dragonmaw Dispatch e riferisci al Deathstalker Agent fuori dalla spedizione.",
    ["Related lead-in: Dragonmaw Rumors. The Dragonmaw Dispatch is recovered from the Dragonmaw forces inside the dungeon."] = "Missione preliminare: Dragonmaw Rumors. Il Dragonmaw Dispatch si recupera dalle forze Dragonmaw dentro la spedizione.",
    ["Continues with Earthen Echo, which sends you to Muln Earthfury in northwest Mulgore."] = "Prosegue con Eco della Terra, che ti manda da Muln Earthfury a nord-ovest di Mulgore.",
    ["Collect 4 Thicket Raptor Hides and take them to James Halloran in Menethil Harbor."] = "Raccogli 4 Thicket Raptor Hides e portale a James Halloran a Porto di Menethil.",
    ["Find Daewyn inside the dungeon. Fallen in the Fen sends you back to Dorin Songblade in Lakeshire."] = "Trova Daewyn dentro la spedizione. Caduto nella Palude ti rimanda da Dorin Songblade a Lakeshire.",
    ["Take the Reed-woven Heart back to Caitlin Grassman in Menethil Harbor."] = "Riporta il Reed-woven Heart a Caitlin Grassman a Porto di Menethil.",
    ["Prehistoric Prism"] = "Prisma preistorico",
    ["Deliver the Titan Relic to High Explorer Magellas in the Hall of Explorers."] = "Porta la Titan Relic a High Explorer Magellas nella Sala degli Esploratori.",
    ["Earthen Echo"] = "Eco della Terra",
    ["Deliver the Titan Relic to Muln Earthfury on Skywatcher Plateau in northwest Mulgore."] = "Porta la Titan Relic a Muln Earthfury sul Skywatcher Plateau, a nord-ovest di Mulgore.",
    ["Fallen in the Fen"] = "Caduto nella Palude",
    ["Report Daewyn's fate to Dorin Songblade in Lakeshire."] = "Riferisci la sorte di Daewyn a Dorin Songblade a Lakeshire.",
    ["A Green Sample"] = "Un campione verde",
    ["Retrieve a Fel Infused Blossom from Dalaran's central garden."] = "Recupera una Fel Infused Blossom dal giardino centrale di Dalaran.",
    ["Quest data is recorded in the beta; dungeon access may be unavailable."] = "I dati della missione sono registrati nella beta; l'accesso alla spedizione potrebbe non essere disponibile.",
    ["Power Overwhelming"] = "Potere travolgente",
    ["Slay Arcanic Enigma, the Mana Elemental in the City of Dalaran, and return to High Sorcerer Andromath in Stormwind City."] = "Uccidi Arcanic Enigma, l'elementale di mana nella Città di Dalaran, e torna da High Sorcerer Andromath a Roccavento.",
    ["Opportunistic Education"] = "Istruzione opportunistica",
    ["Recover The Founding of Dalaran and deliver it to Rexxie Copperclutch."] = "Recupera The Founding of Dalaran e consegnalo a Rexxie Copperclutch.",
    ["Source of Power"] = "Fonte di potere",
    ["Collect 6 Cracked Sentry Cores from the constructs in Dalaran."] = "Raccogli 6 Cracked Sentry Cores dai costrutti di Dalaran.",
    ["The Grave Knight"] = "Il Cavaliere Tombale",
    ["Defeat Atrexis the Grave Knight in the Dalaran Underbelly."] = "Sconfiggi Atrexis the Grave Knight nei Bassifondi di Dalaran.",
    ["Deliver the Titan Relic to Prospector Whelgar at the Wetlands excavation site."] = "Porta la Titan Relic a Prospector Whelgar al sito di scavo delle Paludi.",
    ["After Elder Knowledge"] = "Dopo Conoscenza antica",
    ["Mulgore"] = "Mulgore",
    ["Whelgar's Excavation Site"] = "Scavo di Whelgar",
    ["Hall of Explorers"] = "Sala degli Esploratori",
    ["Lakeshire"] = "Lakeshire",
    ["Elder Rise"] = "Altura degli Anziani",
    ["near the Dalaran sewer entrance"] = "vicino all'ingresso delle fogne di Dalaran",
    ["Dalaran sewer entrance"] = "ingresso delle fogne di Dalaran",
}
EXC2.ptBR = {
    ["Defeat 2 Dragonmaw Saboteurs and 4 Dragonmaw Warders, recover the Dragonmaw Dispatch, and report to the Deathstalker Agent outside the dungeon."] = "Derrote 2 Dragonmaw Saboteurs e 4 Dragonmaw Warders, recupere o Dragonmaw Dispatch e relate ao Deathstalker Agent fora da masmorra.",
    ["Related lead-in: Dragonmaw Rumors. The Dragonmaw Dispatch is recovered from the Dragonmaw forces inside the dungeon."] = "Missão anterior: Dragonmaw Rumors. O Dragonmaw Dispatch é recuperado das forças Dragonmaw dentro da masmorra.",
    ["Continues with Earthen Echo, which sends you to Muln Earthfury in northwest Mulgore."] = "Continua com Eco Terreno, que o envia a Muln Earthfury no noroeste de Mulgore.",
    ["Collect 4 Thicket Raptor Hides and take them to James Halloran in Menethil Harbor."] = "Colete 4 Thicket Raptor Hides e leve-os a James Halloran em Porto Menethil.",
    ["Find Daewyn inside the dungeon. Fallen in the Fen sends you back to Dorin Songblade in Lakeshire."] = "Encontre Daewyn dentro da masmorra. Caído no Charco o envia de volta a Dorin Songblade em Lakeshire.",
    ["Take the Reed-woven Heart back to Caitlin Grassman in Menethil Harbor."] = "Leve o Reed-woven Heart de volta a Caitlin Grassman em Porto Menethil.",
    ["Prehistoric Prism"] = "Prisma Pré-histórico",
    ["Deliver the Titan Relic to High Explorer Magellas in the Hall of Explorers."] = "Leve a Titan Relic a High Explorer Magellas no Salão dos Exploradores.",
    ["Earthen Echo"] = "Eco Terreno",
    ["Deliver the Titan Relic to Muln Earthfury on Skywatcher Plateau in northwest Mulgore."] = "Leve a Titan Relic a Muln Earthfury no Skywatcher Plateau, no noroeste de Mulgore.",
    ["Fallen in the Fen"] = "Caído no Charco",
    ["Report Daewyn's fate to Dorin Songblade in Lakeshire."] = "Informe a Dorin Songblade em Lakeshire o destino de Daewyn.",
    ["A Green Sample"] = "Uma Amostra Verde",
    ["Retrieve a Fel Infused Blossom from Dalaran's central garden."] = "Recupere uma Fel Infused Blossom do jardim central de Dalaran.",
    ["Quest data is recorded in the beta; dungeon access may be unavailable."] = "Os dados da missão estão registrados no beta; o acesso à masmorra pode estar indisponível.",
    ["Power Overwhelming"] = "Poder Esmagador",
    ["Slay Arcanic Enigma, the Mana Elemental in the City of Dalaran, and return to High Sorcerer Andromath in Stormwind City."] = "Mate Arcanic Enigma, o elemental de mana na Cidade de Dalaran, e volte a High Sorcerer Andromath em Ventobravo.",
    ["Opportunistic Education"] = "Educação Oportunista",
    ["Recover The Founding of Dalaran and deliver it to Rexxie Copperclutch."] = "Recupere The Founding of Dalaran e entregue a Rexxie Copperclutch.",
    ["Source of Power"] = "Fonte de Poder",
    ["Collect 6 Cracked Sentry Cores from the constructs in Dalaran."] = "Colete 6 Cracked Sentry Cores dos constructos de Dalaran.",
    ["The Grave Knight"] = "O Cavaleiro Sepulcral",
    ["Defeat Atrexis the Grave Knight in the Dalaran Underbelly."] = "Derrote Atrexis the Grave Knight nos Subterrâneos de Dalaran.",
    ["Deliver the Titan Relic to Prospector Whelgar at the Wetlands excavation site."] = "Leve a Titan Relic a Prospector Whelgar no sítio de escavação do Pantanal.",
    ["After Elder Knowledge"] = "Após Conhecimento Ancestral",
    ["Mulgore"] = "Mulgore",
    ["Whelgar's Excavation Site"] = "Escavação de Whelgar",
    ["Hall of Explorers"] = "Salão dos Exploradores",
    ["Lakeshire"] = "Lakeshire",
    ["Elder Rise"] = "Alto dos Anciões",
    ["near the Dalaran sewer entrance"] = "perto da entrada dos esgotos de Dalaran",
    ["Dalaran sewer entrance"] = "entrada dos esgotos de Dalaran",
}
EXC2.ruRU = {
    ["Defeat 2 Dragonmaw Saboteurs and 4 Dragonmaw Warders, recover the Dragonmaw Dispatch, and report to the Deathstalker Agent outside the dungeon."] = "Победите 2 Dragonmaw Saboteurs и 4 Dragonmaw Warders, добудьте Dragonmaw Dispatch и доложите Deathstalker Agent снаружи подземелья.",
    ["Related lead-in: Dragonmaw Rumors. The Dragonmaw Dispatch is recovered from the Dragonmaw forces inside the dungeon."] = "Предыдущее задание: Dragonmaw Rumors. Dragonmaw Dispatch добывается у сил Dragonmaw внутри подземелья.",
    ["Continues with Earthen Echo, which sends you to Muln Earthfury in northwest Mulgore."] = "Продолжается заданием «Эхо земли», которое отправит вас к Muln Earthfury на северо-запад Мулгора.",
    ["Collect 4 Thicket Raptor Hides and take them to James Halloran in Menethil Harbor."] = "Соберите 4 Thicket Raptor Hides и отнесите их James Halloran в Гавань Менетил.",
    ["Find Daewyn inside the dungeon. Fallen in the Fen sends you back to Dorin Songblade in Lakeshire."] = "Найдите Daewyn в подземелье. «Павший в трясине» отправит вас обратно к Dorin Songblade в Lakeshire.",
    ["Take the Reed-woven Heart back to Caitlin Grassman in Menethil Harbor."] = "Верните Reed-woven Heart Caitlin Grassman в Гавань Менетил.",
    ["Prehistoric Prism"] = "Доисторическая призма",
    ["Deliver the Titan Relic to High Explorer Magellas in the Hall of Explorers."] = "Отнесите Titan Relic к High Explorer Magellas в Зал исследователей.",
    ["Earthen Echo"] = "Эхо земли",
    ["Deliver the Titan Relic to Muln Earthfury on Skywatcher Plateau in northwest Mulgore."] = "Отнесите Titan Relic к Muln Earthfury на Skywatcher Plateau на северо-западе Мулгора.",
    ["Fallen in the Fen"] = "Павший в трясине",
    ["Report Daewyn's fate to Dorin Songblade in Lakeshire."] = "Сообщите Dorin Songblade в Lakeshire о судьбе Daewyn.",
    ["A Green Sample"] = "Зелёный образец",
    ["Retrieve a Fel Infused Blossom from Dalaran's central garden."] = "Добудьте Fel Infused Blossom в центральном саду Даларана.",
    ["Quest data is recorded in the beta; dungeon access may be unavailable."] = "Данные задания записаны в бете; доступ в подземелье может быть недоступен.",
    ["Power Overwhelming"] = "Всесокрушающая сила",
    ["Slay Arcanic Enigma, the Mana Elemental in the City of Dalaran, and return to High Sorcerer Andromath in Stormwind City."] = "Убейте Arcanic Enigma, элементаля маны в городе Даларан, и вернитесь к High Sorcerer Andromath в Штормград.",
    ["Opportunistic Education"] = "Выгодное образование",
    ["Recover The Founding of Dalaran and deliver it to Rexxie Copperclutch."] = "Добудьте The Founding of Dalaran и отдайте Rexxie Copperclutch.",
    ["Source of Power"] = "Источник силы",
    ["Collect 6 Cracked Sentry Cores from the constructs in Dalaran."] = "Соберите 6 Cracked Sentry Cores с созданий в Даларане.",
    ["The Grave Knight"] = "Рыцарь могил",
    ["Defeat Atrexis the Grave Knight in the Dalaran Underbelly."] = "Победите Atrexis the Grave Knight в Клоаке Даларана.",
    ["Deliver the Titan Relic to Prospector Whelgar at the Wetlands excavation site."] = "Отнесите Titan Relic к Prospector Whelgar на раскопки в Болотине.",
    ["After Elder Knowledge"] = "После «Древнее знание»",
    ["Mulgore"] = "Мулгор",
    ["Whelgar's Excavation Site"] = "Раскопки Вельгара",
    ["Hall of Explorers"] = "Зал исследователей",
    ["Lakeshire"] = "Lakeshire",
    ["Elder Rise"] = "Возвышенность старейшин",
    ["near the Dalaran sewer entrance"] = "рядом с входом в канализацию Даларана",
    ["Dalaran sewer entrance"] = "вход в канализацию Даларана",
}
EXC2.koKR = {
    ["Defeat 2 Dragonmaw Saboteurs and 4 Dragonmaw Warders, recover the Dragonmaw Dispatch, and report to the Deathstalker Agent outside the dungeon."] = "Dragonmaw Saboteurs 2마리와 Dragonmaw Warders 4마리를 처치하고 Dragonmaw Dispatch를 회수한 뒤 던전 밖의 Deathstalker Agent에게 보고하세요.",
    ["Related lead-in: Dragonmaw Rumors. The Dragonmaw Dispatch is recovered from the Dragonmaw forces inside the dungeon."] = "선행 퀘스트: Dragonmaw Rumors. Dragonmaw Dispatch는 던전 안의 Dragonmaw 병력에게서 얻습니다.",
    ["Continues with Earthen Echo, which sends you to Muln Earthfury in northwest Mulgore."] = "'대지의 메아리'로 이어지며, 멀고어 북서부의 Muln Earthfury에게 가게 됩니다.",
    ["Collect 4 Thicket Raptor Hides and take them to James Halloran in Menethil Harbor."] = "Thicket Raptor Hides 4개를 모아 메네실 항구의 James Halloran에게 가져가세요.",
    ["Find Daewyn inside the dungeon. Fallen in the Fen sends you back to Dorin Songblade in Lakeshire."] = "던전 안에서 Daewyn을 찾으세요. '늪지에 쓰러지다'가 호숫가 마을의 Dorin Songblade에게 돌려보냅니다.",
    ["Take the Reed-woven Heart back to Caitlin Grassman in Menethil Harbor."] = "Reed-woven Heart를 메네실 항구의 Caitlin Grassman에게 가져가세요.",
    ["Prehistoric Prism"] = "선사시대의 프리즘",
    ["Deliver the Titan Relic to High Explorer Magellas in the Hall of Explorers."] = "Titan Relic을 탐험가의 전당의 High Explorer Magellas에게 가져가세요.",
    ["Earthen Echo"] = "대지의 메아리",
    ["Deliver the Titan Relic to Muln Earthfury on Skywatcher Plateau in northwest Mulgore."] = "Titan Relic을 멀고어 북서부 Skywatcher Plateau의 Muln Earthfury에게 가져가세요.",
    ["Fallen in the Fen"] = "늪지에 쓰러지다",
    ["Report Daewyn's fate to Dorin Songblade in Lakeshire."] = "Daewyn의 운명을 호숫가 마을의 Dorin Songblade에게 알리세요.",
    ["A Green Sample"] = "녹색 표본",
    ["Retrieve a Fel Infused Blossom from Dalaran's central garden."] = "달라란 중앙 정원에서 Fel Infused Blossom을 구해 오세요.",
    ["Quest data is recorded in the beta; dungeon access may be unavailable."] = "퀘스트 정보는 베타에 기록되어 있으며, 던전에 입장하지 못할 수 있습니다.",
    ["Power Overwhelming"] = "압도적인 힘",
    ["Slay Arcanic Enigma, the Mana Elemental in the City of Dalaran, and return to High Sorcerer Andromath in Stormwind City."] = "달라란 도시의 마나 정령 Arcanic Enigma를 처치하고 스톰윈드의 High Sorcerer Andromath에게 돌아가세요.",
    ["Opportunistic Education"] = "기회주의적 교육",
    ["Recover The Founding of Dalaran and deliver it to Rexxie Copperclutch."] = "The Founding of Dalaran을 회수해 Rexxie Copperclutch에게 전달하세요.",
    ["Source of Power"] = "힘의 근원",
    ["Collect 6 Cracked Sentry Cores from the constructs in Dalaran."] = "달라란의 피조물에게서 Cracked Sentry Cores 6개를 모으세요.",
    ["The Grave Knight"] = "무덤 기사",
    ["Defeat Atrexis the Grave Knight in the Dalaran Underbelly."] = "달라란 지하에서 Atrexis the Grave Knight를 처치하세요.",
    ["Deliver the Titan Relic to Prospector Whelgar at the Wetlands excavation site."] = "Titan Relic을 저습지의 발굴지에 있는 Prospector Whelgar에게 가져가세요.",
    ["After Elder Knowledge"] = "'원로의 지식' 이후",
    ["Mulgore"] = "멀고어",
    ["Whelgar's Excavation Site"] = "웰가르 발굴지",
    ["Hall of Explorers"] = "탐험가의 전당",
    ["Lakeshire"] = "호숫가 마을",
    ["Elder Rise"] = "원로의 언덕",
    ["near the Dalaran sewer entrance"] = "달라란 하수도 입구 근처",
    ["Dalaran sewer entrance"] = "달라란 하수도 입구",
}
EXC2.zhCN = {
    ["Defeat 2 Dragonmaw Saboteurs and 4 Dragonmaw Warders, recover the Dragonmaw Dispatch, and report to the Deathstalker Agent outside the dungeon."] = "击败2个Dragonmaw Saboteurs和4个Dragonmaw Warders，取回Dragonmaw Dispatch，并向副本外的Deathstalker Agent复命。",
    ["Related lead-in: Dragonmaw Rumors. The Dragonmaw Dispatch is recovered from the Dragonmaw forces inside the dungeon."] = "前置任务：Dragonmaw Rumors。Dragonmaw Dispatch从副本内的Dragonmaw部队身上取得。",
    ["Continues with Earthen Echo, which sends you to Muln Earthfury in northwest Mulgore."] = "后续任务“大地回响”，会把你送往莫高雷西北部的Muln Earthfury。",
    ["Collect 4 Thicket Raptor Hides and take them to James Halloran in Menethil Harbor."] = "收集4个Thicket Raptor Hides，交给米奈希尔港的James Halloran。",
    ["Find Daewyn inside the dungeon. Fallen in the Fen sends you back to Dorin Songblade in Lakeshire."] = "在副本内找到Daewyn。“陨落沼泽”会让你回到湖畔镇的Dorin Songblade那里。",
    ["Take the Reed-woven Heart back to Caitlin Grassman in Menethil Harbor."] = "把Reed-woven Heart带回米奈希尔港的Caitlin Grassman。",
    ["Prehistoric Prism"] = "史前棱镜",
    ["Deliver the Titan Relic to High Explorer Magellas in the Hall of Explorers."] = "把Titan Relic带到探险者大厅的High Explorer Magellas那里。",
    ["Earthen Echo"] = "大地回响",
    ["Deliver the Titan Relic to Muln Earthfury on Skywatcher Plateau in northwest Mulgore."] = "把Titan Relic带到莫高雷西北部Skywatcher Plateau的Muln Earthfury那里。",
    ["Fallen in the Fen"] = "陨落沼泽",
    ["Report Daewyn's fate to Dorin Songblade in Lakeshire."] = "把Daewyn的下落告诉湖畔镇的Dorin Songblade。",
    ["A Green Sample"] = "绿色样本",
    ["Retrieve a Fel Infused Blossom from Dalaran's central garden."] = "从达拉然的中央花园取得一朵Fel Infused Blossom。",
    ["Quest data is recorded in the beta; dungeon access may be unavailable."] = "任务数据已记录在测试服中；副本可能暂时无法进入。",
    ["Power Overwhelming"] = "势不可挡的力量",
    ["Slay Arcanic Enigma, the Mana Elemental in the City of Dalaran, and return to High Sorcerer Andromath in Stormwind City."] = "击杀达拉然城中的法力元素Arcanic Enigma，然后回到暴风城的High Sorcerer Andromath那里。",
    ["Opportunistic Education"] = "投机教育",
    ["Recover The Founding of Dalaran and deliver it to Rexxie Copperclutch."] = "取回The Founding of Dalaran，交给Rexxie Copperclutch。",
    ["Source of Power"] = "力量之源",
    ["Collect 6 Cracked Sentry Cores from the constructs in Dalaran."] = "从达拉然的构造体身上收集6个Cracked Sentry Cores。",
    ["The Grave Knight"] = "墓穴骑士",
    ["Defeat Atrexis the Grave Knight in the Dalaran Underbelly."] = "在达拉然地下区击败Atrexis the Grave Knight。",
    ["Deliver the Titan Relic to Prospector Whelgar at the Wetlands excavation site."] = "把Titan Relic带到湿地挖掘场的Prospector Whelgar那里。",
    ["After Elder Knowledge"] = "完成“长者的知识”之后",
    ["Mulgore"] = "莫高雷",
    ["Whelgar's Excavation Site"] = "惠尔格挖掘场",
    ["Hall of Explorers"] = "探险者大厅",
    ["Lakeshire"] = "湖畔镇",
    ["Elder Rise"] = "长者高地",
    ["near the Dalaran sewer entrance"] = "达拉然下水道入口附近",
    ["Dalaran sewer entrance"] = "达拉然下水道入口",
}
EXC2.zhTW = {
    ["Defeat 2 Dragonmaw Saboteurs and 4 Dragonmaw Warders, recover the Dragonmaw Dispatch, and report to the Deathstalker Agent outside the dungeon."] = "擊敗2個Dragonmaw Saboteurs和4個Dragonmaw Warders，取回Dragonmaw Dispatch，並向副本外的Deathstalker Agent覆命。",
    ["Related lead-in: Dragonmaw Rumors. The Dragonmaw Dispatch is recovered from the Dragonmaw forces inside the dungeon."] = "前置任務：Dragonmaw Rumors。Dragonmaw Dispatch從副本內的Dragonmaw部隊身上取得。",
    ["Continues with Earthen Echo, which sends you to Muln Earthfury in northwest Mulgore."] = "後續任務“大地迴響”，會把你送往莫高雷西北部的Muln Earthfury。",
    ["Collect 4 Thicket Raptor Hides and take them to James Halloran in Menethil Harbor."] = "收集4個Thicket Raptor Hides，交給米奈希爾港的James Halloran。",
    ["Find Daewyn inside the dungeon. Fallen in the Fen sends you back to Dorin Songblade in Lakeshire."] = "在副本內找到Daewyn。“隕落沼澤”會讓你回到湖畔鎮的Dorin Songblade那裡。",
    ["Take the Reed-woven Heart back to Caitlin Grassman in Menethil Harbor."] = "把Reed-woven Heart帶回米奈希爾港的Caitlin Grassman。",
    ["Prehistoric Prism"] = "史前稜鏡",
    ["Deliver the Titan Relic to High Explorer Magellas in the Hall of Explorers."] = "把Titan Relic帶到探險者大廳的High Explorer Magellas那裡。",
    ["Earthen Echo"] = "大地迴響",
    ["Deliver the Titan Relic to Muln Earthfury on Skywatcher Plateau in northwest Mulgore."] = "把Titan Relic帶到莫高雷西北部Skywatcher Plateau的Muln Earthfury那裡。",
    ["Fallen in the Fen"] = "隕落沼澤",
    ["Report Daewyn's fate to Dorin Songblade in Lakeshire."] = "把Daewyn的下落告訴湖畔鎮的Dorin Songblade。",
    ["A Green Sample"] = "綠色樣本",
    ["Retrieve a Fel Infused Blossom from Dalaran's central garden."] = "從達拉然的中央花園取得一朵Fel Infused Blossom。",
    ["Quest data is recorded in the beta; dungeon access may be unavailable."] = "任務資料已記錄在測試服中；副本可能暫時無法進入。",
    ["Power Overwhelming"] = "勢不可擋的力量",
    ["Slay Arcanic Enigma, the Mana Elemental in the City of Dalaran, and return to High Sorcerer Andromath in Stormwind City."] = "擊殺達拉然城中的法力元素Arcanic Enigma，然後回到暴風城的High Sorcerer Andromath那裡。",
    ["Opportunistic Education"] = "投機教育",
    ["Recover The Founding of Dalaran and deliver it to Rexxie Copperclutch."] = "取回The Founding of Dalaran，交給Rexxie Copperclutch。",
    ["Source of Power"] = "力量之源",
    ["Collect 6 Cracked Sentry Cores from the constructs in Dalaran."] = "從達拉然的構造體身上收集6個Cracked Sentry Cores。",
    ["The Grave Knight"] = "墓穴騎士",
    ["Defeat Atrexis the Grave Knight in the Dalaran Underbelly."] = "在達拉然地下區擊敗Atrexis the Grave Knight。",
    ["Deliver the Titan Relic to Prospector Whelgar at the Wetlands excavation site."] = "把Titan Relic帶到濕地挖掘場的Prospector Whelgar那裡。",
    ["After Elder Knowledge"] = "完成“長者的知識”之後",
    ["Mulgore"] = "莫高雷",
    ["Whelgar's Excavation Site"] = "惠爾格挖掘場",
    ["Hall of Explorers"] = "探險者大廳",
    ["Lakeshire"] = "湖畔鎮",
    ["Elder Rise"] = "長者高地",
    ["near the Dalaran sewer entrance"] = "達拉然下水道入口附近",
    ["Dalaran sewer entrance"] = "達拉然下水道入口",
}
for lang, strings in pairs(EXC2) do
    local target = FDJ.ContentLocales[lang] or {}
    FDJ.ContentLocales[lang] = target
    target.places = target.places or {}
    for key, value in pairs(strings) do
        if target.places[key] == nil then target.places[key] = value end
    end
end

-- Item source lines shown at the bottom of item tooltips (quest start items,
-- required and provided items). Whole-string translations.
local ITEM_SOURCES = {}
ITEM_SOURCES.deDE = {
    ["Dropped by: Dark Iron Agents"] = "Fallen gelassen von: Dark Iron Agents",
    ["Dropped by: Dark Iron Spies in Dun Morogh"] = "Fallen gelassen von: Dark Iron Spies in Dun Morogh",
    ["Dropped by: Goblin Woodcarver, The Deadmines"] = "Fallen gelassen von: Goblin Woodcarver, Die Todesminen",
    ["Dropped by: Mutanus the Devourer"] = "Fallen gelassen von: Mutanus der Verschlinger",
    ["Dropped by: Relic Guardian"] = "Fallen gelassen von: Relic Guardian",
    ["Dropped by: The Baron"] = "Fallen gelassen von: The Baron",
    ["Dropped by: undead enemies inside Ruins of Lordaeron"] = "Fallen gelassen von: Untoten in den Ruinen von Lordaeron",
    ["Drops from Blackfathom Tide Priestess in the entrance tunnels leading to Blackfathom Deeps."] = "Wird von Blackfathom Tide Priestess in den Eingangstunneln zu den Tiefschwarzen Grotten fallen gelassen.",
    ["Drops from Charlga Razorflank in Razorfen Kraul"] = "Wird von Charlga Klingenflanke im Kral der Klingenhauer fallen gelassen",
    ["Found in a Pitted Iron Chest underwater in the Pool of Ask'ar, in the northern alcove just past Ghamoo-ra's turtle room."] = "In einer Pitted Iron Chest unter Wasser im Teich von Ask'ar, in der nördlichen Nische direkt hinter Ghamoo-ras Schildkrötenraum.",
    ["Found in the graveyard inside Ruins of Lordaeron"] = "Auf dem Friedhof in den Ruinen von Lordaeron zu finden",
    ["Found in: Jordan's Hammer, Shadowfang Keep courtyard"] = "Zu finden in: Jordan's Hammer, Hof von Burg Schattenfang",
    ["From Matrix Punchograph 3005-A"] = "Aus Matrixlochkartograph 3005-A",
    ["From Matrix Punchograph 3005-B"] = "Aus Matrixlochkartograph 3005-B",
    ["From Matrix Punchograph 3005-C"] = "Aus Matrixlochkartograph 3005-C",
    ["From Matrix Punchograph 3005-D"] = "Aus Matrixlochkartograph 3005-D",
    ["Given by Jordan Stilwell when you accept the quest"] = "Wird von Jordan Stilwell bei Annahme der Quest übergeben",
    ["Looted from Edwin VanCleef"] = "Erbeutet von Edwin van Cleef",
    ["Random drop from mobs outside the Gnomeregan instance"] = "Zufälliger Drop von Gegnern außerhalb der Instanz Gnomeregan",
    ["Reported random spawn inside Ruins of Lordaeron; check towers, side rooms and the Bjork area"] = "Gemeldeter zufälliger Fundort in den Ruinen von Lordaeron; Türme, Nebenräume und den Bereich von Bjork prüfen",
    ["Reward from the quest Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan"] = "Belohnung der Quest Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan",
    ["Reward from the quest Seeking the Kor Gem: Thundris Windweaver, Auberdine, Darkshore. The Corrupted Kor Gem he asks for drops from Blackfathom Tide Priestesses and Oracles at the Blackfathom Deeps entrance and from Blackfathom Sea Witches inside."] = "Belohnung der Quest Seeking the Kor Gem: Thundris Windweaver, Auberdine, Dunkelküste. Den verlangten Corrupted Kor Gem lassen Blackfathom Tide Priestesses und Oracles am Eingang der Tiefschwarzen Grotten sowie Blackfathom Sea Witches im Inneren fallen.",
}
ITEM_SOURCES.frFR = {
    ["Dropped by: Dark Iron Agents"] = "Butin de : Dark Iron Agents",
    ["Dropped by: Dark Iron Spies in Dun Morogh"] = "Butin de : Dark Iron Spies à Dun Morogh",
    ["Dropped by: Goblin Woodcarver, The Deadmines"] = "Butin de : Goblin Woodcarver, Les Mortemines",
    ["Dropped by: Mutanus the Devourer"] = "Butin de : Mutanus le Dévoreur",
    ["Dropped by: Relic Guardian"] = "Butin de : Relic Guardian",
    ["Dropped by: The Baron"] = "Butin de : The Baron",
    ["Dropped by: undead enemies inside Ruins of Lordaeron"] = "Butin de : ennemis morts-vivants dans les Ruines de Lordaeron",
    ["Drops from Blackfathom Tide Priestess in the entrance tunnels leading to Blackfathom Deeps."] = "Butin de Blackfathom Tide Priestess dans les tunnels d'entrée menant aux Profondeurs de Brassenoire.",
    ["Drops from Charlga Razorflank in Razorfen Kraul"] = "Butin de Charlga Trancheflanc à Kraal de Tranchebauge",
    ["Found in a Pitted Iron Chest underwater in the Pool of Ask'ar, in the northern alcove just past Ghamoo-ra's turtle room."] = "Dans un Pitted Iron Chest sous l'eau dans le bassin d'Ask'ar, dans l'alcôve nord juste après la salle de la tortue Ghamoo-ra.",
    ["Found in the graveyard inside Ruins of Lordaeron"] = "Se trouve dans le cimetière des Ruines de Lordaeron",
    ["Found in: Jordan's Hammer, Shadowfang Keep courtyard"] = "Se trouve dans : Jordan's Hammer, cour du Donjon d'Ombrecroc",
    ["From Matrix Punchograph 3005-A"] = "Obtenu du Matrix Punchograph 3005-A",
    ["From Matrix Punchograph 3005-B"] = "Obtenu du Matrix Punchograph 3005-B",
    ["From Matrix Punchograph 3005-C"] = "Obtenu du Matrix Punchograph 3005-C",
    ["From Matrix Punchograph 3005-D"] = "Obtenu du Matrix Punchograph 3005-D",
    ["Given by Jordan Stilwell when you accept the quest"] = "Remis par Jordan Stilwell à l'acceptation de la quête",
    ["Looted from Edwin VanCleef"] = "Ramassé sur Edwin VanCleef",
    ["Random drop from mobs outside the Gnomeregan instance"] = "Butin aléatoire des monstres à l'extérieur de l'instance de Gnomeregan",
    ["Reported random spawn inside Ruins of Lordaeron; check towers, side rooms and the Bjork area"] = "Apparition aléatoire signalée dans les Ruines de Lordaeron ; vérifiez les tours, les salles latérales et la zone de Bjork",
    ["Reward from the quest Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan"] = "Récompense de la quête Bailor's Ore Shipment : Bailor Stonehand, Thelsamar, Loch Modan",
    ["Reward from the quest Seeking the Kor Gem: Thundris Windweaver, Auberdine, Darkshore. The Corrupted Kor Gem he asks for drops from Blackfathom Tide Priestesses and Oracles at the Blackfathom Deeps entrance and from Blackfathom Sea Witches inside."] = "Récompense de la quête Seeking the Kor Gem : Thundris Windweaver, Auberdine, Sombrivage. La Corrupted Kor Gem demandée tombe sur les Blackfathom Tide Priestesses et Oracles à l'entrée des Profondeurs de Brassenoire et sur les Blackfathom Sea Witches à l'intérieur.",
}
ITEM_SOURCES.esES = {
    ["Dropped by: Dark Iron Agents"] = "Lo suelta: Dark Iron Agents",
    ["Dropped by: Dark Iron Spies in Dun Morogh"] = "Lo suelta: Dark Iron Spies en Dun Morogh",
    ["Dropped by: Goblin Woodcarver, The Deadmines"] = "Lo suelta: Goblin Woodcarver, Las Minas de la Muerte",
    ["Dropped by: Mutanus the Devourer"] = "Lo suelta: Mutanus el Devorador",
    ["Dropped by: Relic Guardian"] = "Lo suelta: Relic Guardian",
    ["Dropped by: The Baron"] = "Lo suelta: The Baron",
    ["Dropped by: undead enemies inside Ruins of Lordaeron"] = "Lo sueltan: enemigos no-muertos dentro de las Ruinas de Lordaeron",
    ["Drops from Blackfathom Tide Priestess in the entrance tunnels leading to Blackfathom Deeps."] = "Lo suelta Blackfathom Tide Priestess en los túneles de entrada a las Cavernas de Brazanegra.",
    ["Drops from Charlga Razorflank in Razorfen Kraul"] = "Lo suelta Charlga Filonavaja en Horado Rajacieno",
    ["Found in a Pitted Iron Chest underwater in the Pool of Ask'ar, in the northern alcove just past Ghamoo-ra's turtle room."] = "En un Pitted Iron Chest bajo el agua en el estanque de Ask'ar, en el hueco norte justo después de la sala de la tortuga Ghamoo-ra.",
    ["Found in the graveyard inside Ruins of Lordaeron"] = "Se encuentra en el cementerio dentro de las Ruinas de Lordaeron",
    ["Found in: Jordan's Hammer, Shadowfang Keep courtyard"] = "Se encuentra en: Jordan's Hammer, patio del Castillo de Colmillo Oscuro",
    ["From Matrix Punchograph 3005-A"] = "Del Matrix Punchograph 3005-A",
    ["From Matrix Punchograph 3005-B"] = "Del Matrix Punchograph 3005-B",
    ["From Matrix Punchograph 3005-C"] = "Del Matrix Punchograph 3005-C",
    ["From Matrix Punchograph 3005-D"] = "Del Matrix Punchograph 3005-D",
    ["Given by Jordan Stilwell when you accept the quest"] = "Te lo da Jordan Stilwell al aceptar la misión",
    ["Looted from Edwin VanCleef"] = "Se despoja de Edwin VanCleef",
    ["Random drop from mobs outside the Gnomeregan instance"] = "Botín aleatorio de enemigos fuera de la estancia de Gnomeregan",
    ["Reported random spawn inside Ruins of Lordaeron; check towers, side rooms and the Bjork area"] = "Aparición aleatoria notificada dentro de las Ruinas de Lordaeron; revisa torres, salas laterales y la zona de Bjork",
    ["Reward from the quest Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan"] = "Recompensa de la misión Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan",
    ["Reward from the quest Seeking the Kor Gem: Thundris Windweaver, Auberdine, Darkshore. The Corrupted Kor Gem he asks for drops from Blackfathom Tide Priestesses and Oracles at the Blackfathom Deeps entrance and from Blackfathom Sea Witches inside."] = "Recompensa de la misión Seeking the Kor Gem: Thundris Windweaver, Auberdine, Costa Oscura. La Corrupted Kor Gem que pide la sueltan las Blackfathom Tide Priestesses y Oracles en la entrada de las Cavernas de Brazanegra y las Blackfathom Sea Witches en el interior.",
}
ITEM_SOURCES.itIT = {
    ["Dropped by: Dark Iron Agents"] = "Bottino di: Dark Iron Agents",
    ["Dropped by: Dark Iron Spies in Dun Morogh"] = "Bottino di: Dark Iron Spies a Dun Morogh",
    ["Dropped by: Goblin Woodcarver, The Deadmines"] = "Bottino di: Goblin Woodcarver, Miniere della Morte",
    ["Dropped by: Mutanus the Devourer"] = "Bottino di: Mutanus the Devourer",
    ["Dropped by: Relic Guardian"] = "Bottino di: Relic Guardian",
    ["Dropped by: The Baron"] = "Bottino di: The Baron",
    ["Dropped by: undead enemies inside Ruins of Lordaeron"] = "Bottino di: nemici non morti nelle Rovine di Lordaeron",
    ["Drops from Blackfathom Tide Priestess in the entrance tunnels leading to Blackfathom Deeps."] = "Bottino di Blackfathom Tide Priestess nei tunnel d'ingresso verso gli Abissi di Fondocupo.",
    ["Drops from Charlga Razorflank in Razorfen Kraul"] = "Bottino di Charlga Razorflank a Razorfen Kraul",
    ["Found in a Pitted Iron Chest underwater in the Pool of Ask'ar, in the northern alcove just past Ghamoo-ra's turtle room."] = "In un Pitted Iron Chest sott'acqua nella Pozza di Ask'ar, nella nicchia nord subito dopo la sala della tartaruga Ghamoo-ra.",
    ["Found in the graveyard inside Ruins of Lordaeron"] = "Si trova nel cimitero dentro le Rovine di Lordaeron",
    ["Found in: Jordan's Hammer, Shadowfang Keep courtyard"] = "Si trova in: Jordan's Hammer, cortile della Fortezza di Zannascura",
    ["From Matrix Punchograph 3005-A"] = "Dal Matrix Punchograph 3005-A",
    ["From Matrix Punchograph 3005-B"] = "Dal Matrix Punchograph 3005-B",
    ["From Matrix Punchograph 3005-C"] = "Dal Matrix Punchograph 3005-C",
    ["From Matrix Punchograph 3005-D"] = "Dal Matrix Punchograph 3005-D",
    ["Given by Jordan Stilwell when you accept the quest"] = "Consegnato da Jordan Stilwell quando accetti la missione",
    ["Looted from Edwin VanCleef"] = "Saccheggiato da Edwin VanCleef",
    ["Random drop from mobs outside the Gnomeregan instance"] = "Bottino casuale dei nemici fuori dall'istanza di Gnomeregan",
    ["Reported random spawn inside Ruins of Lordaeron; check towers, side rooms and the Bjork area"] = "Comparsa casuale segnalata nelle Rovine di Lordaeron; controlla torri, stanze laterali e la zona di Bjork",
    ["Reward from the quest Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan"] = "Ricompensa della missione Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan",
    ["Reward from the quest Seeking the Kor Gem: Thundris Windweaver, Auberdine, Darkshore. The Corrupted Kor Gem he asks for drops from Blackfathom Tide Priestesses and Oracles at the Blackfathom Deeps entrance and from Blackfathom Sea Witches inside."] = "Ricompensa della missione Seeking the Kor Gem: Thundris Windweaver, Auberdine, Rivafosca. La Corrupted Kor Gem richiesta è bottino di Blackfathom Tide Priestess e Oracle all'ingresso degli Abissi di Fondocupo e di Blackfathom Sea Witch all'interno.",
}
ITEM_SOURCES.ptBR = {
    ["Dropped by: Dark Iron Agents"] = "Saqueado de: Dark Iron Agents",
    ["Dropped by: Dark Iron Spies in Dun Morogh"] = "Saqueado de: Dark Iron Spies em Dun Morogh",
    ["Dropped by: Goblin Woodcarver, The Deadmines"] = "Saqueado de: Goblin Woodcarver, Minas Mortas",
    ["Dropped by: Mutanus the Devourer"] = "Saqueado de: Mutanus, o Devorador",
    ["Dropped by: Relic Guardian"] = "Saqueado de: Relic Guardian",
    ["Dropped by: The Baron"] = "Saqueado de: The Baron",
    ["Dropped by: undead enemies inside Ruins of Lordaeron"] = "Saqueado de: inimigos mortos-vivos nas Ruínas de Lordaeron",
    ["Drops from Blackfathom Tide Priestess in the entrance tunnels leading to Blackfathom Deeps."] = "Saqueado de Blackfathom Tide Priestess nos túneis de entrada das Profundezas Negras.",
    ["Drops from Charlga Razorflank in Razorfen Kraul"] = "Saqueado de Charlga Flanco-navalha no Urzal dos Tuscos",
    ["Found in a Pitted Iron Chest underwater in the Pool of Ask'ar, in the northern alcove just past Ghamoo-ra's turtle room."] = "Em um Pitted Iron Chest debaixo d'água na Poça de Ask'ar, no nicho norte logo após a sala da tartaruga Ghamoo-ra.",
    ["Found in the graveyard inside Ruins of Lordaeron"] = "Encontrado no cemitério dentro das Ruínas de Lordaeron",
    ["Found in: Jordan's Hammer, Shadowfang Keep courtyard"] = "Encontrado em: Jordan's Hammer, pátio da Bastilha da Presa Negra",
    ["From Matrix Punchograph 3005-A"] = "Do Matrix Punchograph 3005-A",
    ["From Matrix Punchograph 3005-B"] = "Do Matrix Punchograph 3005-B",
    ["From Matrix Punchograph 3005-C"] = "Do Matrix Punchograph 3005-C",
    ["From Matrix Punchograph 3005-D"] = "Do Matrix Punchograph 3005-D",
    ["Given by Jordan Stilwell when you accept the quest"] = "Entregue por Jordan Stilwell ao aceitar a missão",
    ["Looted from Edwin VanCleef"] = "Saqueado de Edwin VanCleef",
    ["Random drop from mobs outside the Gnomeregan instance"] = "Saque aleatório de inimigos fora da instância de Gnomeregan",
    ["Reported random spawn inside Ruins of Lordaeron; check towers, side rooms and the Bjork area"] = "Surgimento aleatório relatado nas Ruínas de Lordaeron; verifique torres, salas laterais e a área de Bjork",
    ["Reward from the quest Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan"] = "Recompensa da missão Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan",
    ["Reward from the quest Seeking the Kor Gem: Thundris Windweaver, Auberdine, Darkshore. The Corrupted Kor Gem he asks for drops from Blackfathom Tide Priestesses and Oracles at the Blackfathom Deeps entrance and from Blackfathom Sea Witches inside."] = "Recompensa da missão Seeking the Kor Gem: Thundris Windweaver, Auberdine, Costa Negra. A Corrupted Kor Gem pedida cai de Blackfathom Tide Priestesses e Oracles na entrada das Profundezas Negras e de Blackfathom Sea Witches lá dentro.",
}
ITEM_SOURCES.ruRU = {
    ["Dropped by: Dark Iron Agents"] = "Добывается с: Dark Iron Agents",
    ["Dropped by: Dark Iron Spies in Dun Morogh"] = "Добывается с: Dark Iron Spies в Дун Мороге",
    ["Dropped by: Goblin Woodcarver, The Deadmines"] = "Добывается с: Goblin Woodcarver, Мертвые копи",
    ["Dropped by: Mutanus the Devourer"] = "Добывается с: Мутанус Пожиратель",
    ["Dropped by: Relic Guardian"] = "Добывается с: Relic Guardian",
    ["Dropped by: The Baron"] = "Добывается с: The Baron",
    ["Dropped by: undead enemies inside Ruins of Lordaeron"] = "Добывается с: нежити в Руинах Лордерона",
    ["Drops from Blackfathom Tide Priestess in the entrance tunnels leading to Blackfathom Deeps."] = "Добывается с Blackfathom Tide Priestess в туннелях у входа в Непроглядную Пучину.",
    ["Drops from Charlga Razorflank in Razorfen Kraul"] = "Добывается с Чарлги Остробок в Лабиринтах Иглошкурых",
    ["Found in a Pitted Iron Chest underwater in the Pool of Ask'ar, in the northern alcove just past Ghamoo-ra's turtle room."] = "В Pitted Iron Chest под водой в бассейне Аск'ара, в северной нише сразу за залом черепахи Гхаму-ра.",
    ["Found in the graveyard inside Ruins of Lordaeron"] = "Находится на кладбище в Руинах Лордерона",
    ["Found in: Jordan's Hammer, Shadowfang Keep courtyard"] = "Находится в: Jordan's Hammer, двор крепости Темного Клыка",
    ["From Matrix Punchograph 3005-A"] = "Из Matrix Punchograph 3005-A",
    ["From Matrix Punchograph 3005-B"] = "Из Matrix Punchograph 3005-B",
    ["From Matrix Punchograph 3005-C"] = "Из Matrix Punchograph 3005-C",
    ["From Matrix Punchograph 3005-D"] = "Из Matrix Punchograph 3005-D",
    ["Given by Jordan Stilwell when you accept the quest"] = "Выдается Jordan Stilwell при принятии задания",
    ["Looted from Edwin VanCleef"] = "Добывается с Эдвина ван Клифа",
    ["Random drop from mobs outside the Gnomeregan instance"] = "Случайная добыча с существ снаружи подземелья Гномреган",
    ["Reported random spawn inside Ruins of Lordaeron; check towers, side rooms and the Bjork area"] = "По сообщениям, появляется в случайном месте в Руинах Лордерона; проверьте башни, боковые комнаты и зону Бьорка",
    ["Reward from the quest Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan"] = "Награда за задание Bailor's Ore Shipment: Bailor Stonehand, Телсамар, Лок Модан",
    ["Reward from the quest Seeking the Kor Gem: Thundris Windweaver, Auberdine, Darkshore. The Corrupted Kor Gem he asks for drops from Blackfathom Tide Priestesses and Oracles at the Blackfathom Deeps entrance and from Blackfathom Sea Witches inside."] = "Награда за задание Seeking the Kor Gem: Thundris Windweaver, Аубердин, Темные берега. Нужный Corrupted Kor Gem падает с Blackfathom Tide Priestess и Oracle у входа в Непроглядную Пучину и с Blackfathom Sea Witch внутри.",
}
ITEM_SOURCES.koKR = {
    ["Dropped by: Dark Iron Agents"] = "드롭: Dark Iron Agents",
    ["Dropped by: Dark Iron Spies in Dun Morogh"] = "드롭: 던 모로의 Dark Iron Spies",
    ["Dropped by: Goblin Woodcarver, The Deadmines"] = "드롭: Goblin Woodcarver, 죽음의 폐광",
    ["Dropped by: Mutanus the Devourer"] = "드롭: 걸신들린 무타누스",
    ["Dropped by: Relic Guardian"] = "드롭: Relic Guardian",
    ["Dropped by: The Baron"] = "드롭: The Baron",
    ["Dropped by: undead enemies inside Ruins of Lordaeron"] = "드롭: 로데론의 폐허 안의 언데드",
    ["Drops from Blackfathom Tide Priestess in the entrance tunnels leading to Blackfathom Deeps."] = "검은심연 나락으로 이어지는 입구 통로의 Blackfathom Tide Priestess가 드롭합니다.",
    ["Drops from Charlga Razorflank in Razorfen Kraul"] = "가시덩굴 우리의 서슬깃 차를가가 드롭",
    ["Found in a Pitted Iron Chest underwater in the Pool of Ask'ar, in the northern alcove just past Ghamoo-ra's turtle room."] = "아스카르의 웅덩이 물속, 가무라의 거북이 방 바로 뒤 북쪽 구석의 Pitted Iron Chest에서 획득.",
    ["Found in the graveyard inside Ruins of Lordaeron"] = "로데론의 폐허 안 묘지에서 발견",
    ["Found in: Jordan's Hammer, Shadowfang Keep courtyard"] = "발견 위치: Jordan's Hammer, 그림자송곳니 성채 안뜰",
    ["From Matrix Punchograph 3005-A"] = "Matrix Punchograph 3005-A에서 획득",
    ["From Matrix Punchograph 3005-B"] = "Matrix Punchograph 3005-B에서 획득",
    ["From Matrix Punchograph 3005-C"] = "Matrix Punchograph 3005-C에서 획득",
    ["From Matrix Punchograph 3005-D"] = "Matrix Punchograph 3005-D에서 획득",
    ["Given by Jordan Stilwell when you accept the quest"] = "퀘스트를 수락하면 Jordan Stilwell이 줍니다",
    ["Looted from Edwin VanCleef"] = "에드윈 밴클리프에게서 획득",
    ["Random drop from mobs outside the Gnomeregan instance"] = "놈리건 인스턴스 밖의 몬스터에게서 무작위 드롭",
    ["Reported random spawn inside Ruins of Lordaeron; check towers, side rooms and the Bjork area"] = "로데론의 폐허 안에서 무작위로 나타난다고 보고됨; 탑, 옆방, 비요크 구역을 확인하세요",
    ["Reward from the quest Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan"] = "퀘스트 Bailor's Ore Shipment 보상: Bailor Stonehand, 텔사마, 모단 호수",
    ["Reward from the quest Seeking the Kor Gem: Thundris Windweaver, Auberdine, Darkshore. The Corrupted Kor Gem he asks for drops from Blackfathom Tide Priestesses and Oracles at the Blackfathom Deeps entrance and from Blackfathom Sea Witches inside."] = "퀘스트 Seeking the Kor Gem 보상: Thundris Windweaver, 아우버다인, 어둠의 해안. 필요한 Corrupted Kor Gem은 검은심연 나락 입구의 Blackfathom Tide Priestess와 Oracle, 내부의 Blackfathom Sea Witch가 드롭합니다.",
}
ITEM_SOURCES.zhCN = {
    ["Dropped by: Dark Iron Agents"] = "掉落自：Dark Iron Agents",
    ["Dropped by: Dark Iron Spies in Dun Morogh"] = "掉落自：丹莫罗的Dark Iron Spies",
    ["Dropped by: Goblin Woodcarver, The Deadmines"] = "掉落自：Goblin Woodcarver，死亡矿井",
    ["Dropped by: Mutanus the Devourer"] = "掉落自：吞噬者穆坦努斯",
    ["Dropped by: Relic Guardian"] = "掉落自：Relic Guardian",
    ["Dropped by: The Baron"] = "掉落自：The Baron",
    ["Dropped by: undead enemies inside Ruins of Lordaeron"] = "掉落自：洛丹伦废墟内的亡灵敌人",
    ["Drops from Blackfathom Tide Priestess in the entrance tunnels leading to Blackfathom Deeps."] = "由通往黑暗深渊的入口通道中的Blackfathom Tide Priestess掉落。",
    ["Drops from Charlga Razorflank in Razorfen Kraul"] = "由剃刀沼泽的卡尔加·刺肋掉落",
    ["Found in a Pitted Iron Chest underwater in the Pool of Ask'ar, in the northern alcove just past Ghamoo-ra's turtle room."] = "在阿斯卡之池水下的Pitted Iron Chest中，位于加摩拉乌龟房间后面的北侧凹室。",
    ["Found in the graveyard inside Ruins of Lordaeron"] = "位于洛丹伦废墟内的墓地",
    ["Found in: Jordan's Hammer, Shadowfang Keep courtyard"] = "位于：Jordan's Hammer，影牙城堡庭院",
    ["From Matrix Punchograph 3005-A"] = "来自Matrix Punchograph 3005-A",
    ["From Matrix Punchograph 3005-B"] = "来自Matrix Punchograph 3005-B",
    ["From Matrix Punchograph 3005-C"] = "来自Matrix Punchograph 3005-C",
    ["From Matrix Punchograph 3005-D"] = "来自Matrix Punchograph 3005-D",
    ["Given by Jordan Stilwell when you accept the quest"] = "接受任务时由Jordan Stilwell给予",
    ["Looted from Edwin VanCleef"] = "从艾德温·范克里夫身上拾取",
    ["Random drop from mobs outside the Gnomeregan instance"] = "诺莫瑞根副本外的怪物随机掉落",
    ["Reported random spawn inside Ruins of Lordaeron; check towers, side rooms and the Bjork area"] = "据报告在洛丹伦废墟内随机刷新；请检查塔楼、侧室和比约克区域",
    ["Reward from the quest Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan"] = "任务Bailor's Ore Shipment的奖励：Bailor Stonehand，塞尔萨玛，洛克莫丹",
    ["Reward from the quest Seeking the Kor Gem: Thundris Windweaver, Auberdine, Darkshore. The Corrupted Kor Gem he asks for drops from Blackfathom Tide Priestesses and Oracles at the Blackfathom Deeps entrance and from Blackfathom Sea Witches inside."] = "任务Seeking the Kor Gem的奖励：Thundris Windweaver，奥伯丁，黑海岸。所需的Corrupted Kor Gem由黑暗深渊入口处的Blackfathom Tide Priestess和Oracle以及副本内的Blackfathom Sea Witch掉落。",
}
ITEM_SOURCES.zhTW = {
    ["Dropped by: Dark Iron Agents"] = "掉落自：Dark Iron Agents",
    ["Dropped by: Dark Iron Spies in Dun Morogh"] = "掉落自：丹莫洛的Dark Iron Spies",
    ["Dropped by: Goblin Woodcarver, The Deadmines"] = "掉落自：Goblin Woodcarver，死亡礦坑",
    ["Dropped by: Mutanus the Devourer"] = "掉落自：吞噬者穆坦努斯",
    ["Dropped by: Relic Guardian"] = "掉落自：Relic Guardian",
    ["Dropped by: The Baron"] = "掉落自：The Baron",
    ["Dropped by: undead enemies inside Ruins of Lordaeron"] = "掉落自：羅德隆廢墟內的不死敵人",
    ["Drops from Blackfathom Tide Priestess in the entrance tunnels leading to Blackfathom Deeps."] = "由通往黑暗深淵的入口通道中的Blackfathom Tide Priestess掉落。",
    ["Drops from Charlga Razorflank in Razorfen Kraul"] = "由剃刀沼澤的卡爾加·刺肋掉落",
    ["Found in a Pitted Iron Chest underwater in the Pool of Ask'ar, in the northern alcove just past Ghamoo-ra's turtle room."] = "在阿斯卡之池水下的Pitted Iron Chest中，位於加摩拉烏龜房間後面的北側凹室。",
    ["Found in the graveyard inside Ruins of Lordaeron"] = "位於羅德隆廢墟內的墓地",
    ["Found in: Jordan's Hammer, Shadowfang Keep courtyard"] = "位於：Jordan's Hammer，影牙城堡庭院",
    ["From Matrix Punchograph 3005-A"] = "來自Matrix Punchograph 3005-A",
    ["From Matrix Punchograph 3005-B"] = "來自Matrix Punchograph 3005-B",
    ["From Matrix Punchograph 3005-C"] = "來自Matrix Punchograph 3005-C",
    ["From Matrix Punchograph 3005-D"] = "來自Matrix Punchograph 3005-D",
    ["Given by Jordan Stilwell when you accept the quest"] = "接受任務時由Jordan Stilwell給予",
    ["Looted from Edwin VanCleef"] = "從艾德溫·范克里夫身上拾取",
    ["Random drop from mobs outside the Gnomeregan instance"] = "諾姆瑞根副本外的怪物隨機掉落",
    ["Reported random spawn inside Ruins of Lordaeron; check towers, side rooms and the Bjork area"] = "據回報在羅德隆廢墟內隨機出現；請檢查塔樓、側室和比約克區域",
    ["Reward from the quest Bailor's Ore Shipment: Bailor Stonehand, Thelsamar, Loch Modan"] = "任務Bailor's Ore Shipment的獎勵：Bailor Stonehand，塞爾薩瑪，洛克莫丹",
    ["Reward from the quest Seeking the Kor Gem: Thundris Windweaver, Auberdine, Darkshore. The Corrupted Kor Gem he asks for drops from Blackfathom Tide Priestesses and Oracles at the Blackfathom Deeps entrance and from Blackfathom Sea Witches inside."] = "任務Seeking the Kor Gem的獎勵：Thundris Windweaver，奧伯丁，黑海岸。所需的Corrupted Kor Gem由黑暗深淵入口處的Blackfathom Tide Priestess和Oracle以及副本內的Blackfathom Sea Witch掉落。",
}
for lang, strings in pairs(ITEM_SOURCES) do
    local target = FDJ.ContentLocales[lang] or {}
    FDJ.ContentLocales[lang] = target
    target.places = target.places or {}
    for key, value in pairs(strings) do target.places[key] = value end
end

-- The Test of Righteousness chain: official quest names, objectives and NPC
-- names from the Wowhead Forever tooltips (Italian has no official text).
local PALADIN = {}
PALADIN.koKR = { quests = {
    [1651] = { name = "용맹의 고서", objective = "데피아즈단의 공격으로부터 대프니 스틸웰을 보호하십시오. 둘 중 하나라도 죽으면 실패하게 됩니다. 성공한 후에 대프니 스틸웰과 다시 대화해야 합니다." },
    [1652] = { name = "용맹의 고서", objective = "스톰윈드에 있는 두소리안 랄과 대화하십시오." },
    [1653] = { name = "정의의 시험", objective = "아이언포지에 있는 조던 스틸웰과 대화해야 합니다." },
    [1654] = { name = "정의의 시험", objective = "조던의 쪽지를 참고해 흰돌참나무 재목, 조던의 제련된 광석 상자, 조던의 대장장이 망치, 그리고 코르석을 찾아 아이언포지에 있는 조던 스틸웰에게 가져가야 합니다." },
    [1806] = { name = "정의의 시험", objective = "조던 스틸웰이 무기를 다 만들 때까지 기다려야 합니다." },
}, places = {
    ["Jordan Stilwell"] = "조던 스틸웰",
    ["Daphne Stilwell"] = "대프니 스틸웰",
    ["Duthorian Rall"] = "두소리안 랄",
} }
PALADIN.frFR = { quests = {
    [1651] = { name = "Le Tome de la bravoure", objective = "Défendez Daphne Stilwell contre les attaques des Défias. Aucun de vous deux ne doit mourir, si vous voulez réussir la quête. Quand vous aurez réussi, reparlez à Daphne Stilwell." },
    [1652] = { name = "Le Tome de la bravoure", objective = "Parler à Duthorian Rall à Stormwind." },
    [1653] = { name = "Le test de droiture", objective = "Parler à Jordan Stilwell à Ironforge" },
    [1654] = { name = "Le test de droiture", objective = "Utiliser les Notes sur les armes de Jordan, trouver du Bois de chêne de blanchepierre, la Cargaison de Minerai raffiné de Bailor, le Marteau de forge de Jordan et une Gemme de Kor, puis revenir voir Jordan Stilwell à Ironforge." },
    [1806] = { name = "Le test de droiture", objective = "Attendre que Jordan Stilwell finisse de forger votre arme." },
}, places = {
} }
PALADIN.deDE = { quests = {
    [1651] = { name = "Der Foliant der Ehre", objective = "Verteidigt Daphne Stilwell vor dem Angriff der Defias. Keiner Eurer Geister darf aus seinen irdischen Fesseln befreit werden, wenn Ihr erfolgreich sein wollt. Sprecht erneut mit Daphne Stilwell, wenn Ihr erfolgreich wart." },
    [1652] = { name = "Der Foliant der Ehre", objective = "Sprecht mit Duthorian Rall in Stormwind." },
    [1653] = { name = "Die Prüfung der Rechtschaffenheit", objective = "Sprecht mit Jordan Stilwell in Ironforge." },
    [1654] = { name = "Die Prüfung der Rechtschaffenheit", objective = "Sucht mit Jordans Waffennotizen etwas Weißsteineichenholz, Bailors aufbereitete Erzlieferung, Jordans Schmiedehammer und einen Kor-Edelstein und bringt alles zusammen zu Jordan Stilwell in Ironforge." },
    [1806] = { name = "Die Prüfung der Rechtschaffenheit", objective = "Wartet, bis Jordan Stilwell eine Waffe für Euch geschmiedet hat." },
}, places = {
} }
PALADIN.zhCN = { quests = {
    [1651] = { name = "勇气之书", objective = "在迪菲亚兄弟会进攻时保护达芙妮·斯迪威尔的安全。如果你想成功的话，你和达芙妮都不能死在他们的剑下。" },
    [1652] = { name = "勇气之书", objective = "与暴风城的达索瑞恩·拉尔谈一谈。" },
    [1653] = { name = "正义试炼", objective = "去和铁炉堡的乔丹·斯迪威尔谈一谈。" },
    [1654] = { name = "正义试炼", objective = "按照乔丹的武器材料单上的说明去寻找一些白石橡木、精炼矿石、乔丹的铁锤和一块科尔宝石，然后回到铁炉堡去见乔丹·斯迪威尔。" },
    [1806] = { name = "正义试炼", objective = "等待乔丹·斯迪威尔为你铸造武器。" },
}, places = {
    ["Jordan Stilwell"] = "乔丹·斯迪威尔",
    ["Daphne Stilwell"] = "达芙妮·斯迪威尔",
    ["Duthorian Rall"] = "达索瑞恩·拉尔",
} }
PALADIN.esES = { quests = {
    [1651] = { name = "Libro del valor", objective = "Defiende a Daphne Fontana del ataque de los Defias. Si quieres tener éxito, vuestros espíritus no pueden salir de sus espirales mortales. Cuando lo hayas conseguido, vuelve a hablar con Daphne Fontana." },
    [1652] = { name = "Libro del valor", objective = "Habla con Duthorian Rall en Ventormenta." },
    [1653] = { name = "La prueba de rectitud", objective = "Habla con Jordan Fontana en Forjaz." },
    [1654] = { name = "La prueba de rectitud", objective = "Consulta la lista y llévale a Jordan Fontana de Forjaz lo siquiente: madera de roble de Piedrablanca, envío de oro refinado de Bailor, el martillo de herrero de Jordan y una gema Kor." },
    [1806] = { name = "La prueba de rectitud", objective = "Espera mientras Jordan Fontana te forja un arma." },
}, places = {
    ["Jordan Stilwell"] = "Jordan Fontana",
    ["Daphne Stilwell"] = "Daphne Fontana",
} }
PALADIN.ruRU = { quests = {
    [1651] = { name = "Фолиант Отваги", objective = "Защитите Дафну Стилвелл от нападения Братства Справедливости. Проследите, чтобы ни ее, ни ваша душа в случае смерти не покинули свои тела, иначе испытание не будет засчитано. После победы поговорите с Дафной Стилвелл." },
    [1652] = { name = "Фолиант Отваги", objective = "Поговорите с Даторианом Раллом в Штормграде." },
    [1653] = { name = "Испытание доблести", objective = "Поговорите с Джорданом Стилвеллом в Стальгорне." },
    [1654] = { name = "Испытание доблести", objective = "Возьмите список Джордана, добудьте немного древесины белокаменного дуба, партию очищенной руды Бэйлора, кузнечный молот Джордана и самоцвет Кора и отдайте их Джордану Стилвеллу в Стальгорне." },
    [1806] = { name = "Испытание доблести", objective = "Подождите, пока Джордан Стилвелл не закончит изготовление оружия." },
}, places = {
    ["Jordan Stilwell"] = "Джордан Стилвелл",
    ["Daphne Stilwell"] = "Дафна Стилвелл",
    ["Duthorian Rall"] = "Даториан Ралл",
} }
PALADIN.ptBR = { quests = {
    [1651] = { name = "Tomo da Bravura", objective = "Proteja Dafne Calmafonte do ataque dos Défias. Para obter êxito, seus espíritos não podem ser despidos do lodo mortal. Quando você conseguir, fale novamente com Dafne Calmafonte." },
    [1652] = { name = "Tomo da Bravura", objective = "Fale com Benedito Brião em Ventobravo." },
    [1653] = { name = "A prova da retidão", objective = "Fale com Jardel Calmafonte em Altaforja." },
    [1654] = { name = "A prova da retidão", objective = "Usando as Anotações do Jardel sobre Armas, encontre Madeira de Carvalho de Pedralva, o Carregamento de Minério Refinado do Bailor, o Martelo de Ferreiro de Jardel e uma Gema Kor. Depois, entregue tudo a Jardel Calmafonte em Altaforja." },
    [1806] = { name = "A prova da retidão", objective = "Espere que Jardel Calmafonte termine de forjar uma arma para você." },
}, places = {
    ["Jordan Stilwell"] = "Jardel Calmafonte",
    ["Daphne Stilwell"] = "Dafne Calmafonte",
    ["Duthorian Rall"] = "Benedito Brião",
} }
PALADIN.zhTW = { quests = {
    [1651] = { name = "勇氣之書", objective = "在迪菲亞兄弟會進攻時保護達芙妮·斯迪威爾的安全。如果你想成功的話，你和達芙妮都不能死在他們的劍下。" },
    [1652] = { name = "勇氣之書", objective = "與暴風城的達索瑞恩·拉爾談話。" },
    [1653] = { name = "正義試煉", objective = "去和鐵爐堡的喬丹·斯迪威爾談話。" },
    [1654] = { name = "正義試煉", objective = "按照喬丹的武器材料單上的說明去尋找一些白石橡木、精煉礦石、喬丹的鐵錘和一塊科爾寶石，然後回到鐵爐堡去見喬丹·斯迪威爾。" },
    [1806] = { name = "正義試煉", objective = "等待喬丹·斯迪威爾為你鑄造武器。" },
}, places = {
    ["Jordan Stilwell"] = "喬丹·斯迪威爾",
    ["Daphne Stilwell"] = "達芙妮·斯迪威爾",
    ["Duthorian Rall"] = "達索瑞恩·拉爾",
} }
for lang, data in pairs(PALADIN) do
    local target = FDJ.ContentLocales[lang] or {}
    FDJ.ContentLocales[lang] = target
    target.quests = target.quests or {}
    target.places = target.places or {}
    for id, entry in pairs(data.quests) do target.quests[id] = entry end
    for key, value in pairs(data.places) do target.places[key] = value end
end

-- An Unholy Alliance: the final step (6521) is the journal entry; it shares
-- its name with part 1 (6522).
local UNHOLY = {
    deDE = { "Bringt Botschafter Malcins Kopf zu Varimathras in Unterstadt.", "Diese Quest wird im Gebiet AUSSERHALB der Hügel der Klingenhauer abgeschlossen." },
    frFR = { "Apportez la tête de l'ambassadeur Malcin à Varimathras à Fossoyeuse.", "Cette quête se termine dans la zone À L’EXTÉRIEUR de Souilles de Tranchebauge." },
    esES = { "Lleva la cabeza del embajador Malcin a Varimathras en Entrañas.", "Esta misión se completa en la zona FUERA de Zahúrda Rajacieno." },
    itIT = { "Porta la testa dell'ambasciatore Malcin a Varimathras a Sepulcra.", "Questa missione si completa nell'area FUORI da Razorfen Downs." },
    ptBR = { "Leve a cabeça do Embaixador Malcin a Varimathras em Cidade Baixa.", "Esta missão é concluída na área FORA de Urzal dos Mortos." },
    ruRU = { "Принесите голову посла Малкина Вариматасу в Подгород.", "Это задание выполняется в области СНАРУЖИ Курганов Иглошкурых." },
    koKR = { "사절 말킨의 머리를 언더시티의 바리마트라스에게 가져가세요.", "이 퀘스트는 가시덩굴 구릉 바깥 지역에서 완료됩니다." },
    zhCN = { "把大使玛尔金的头颅交给幽暗城的瓦里玛萨斯。", "此任务在剃刀高地外部区域完成。" },
    zhTW = { "把大使瑪爾金的頭顱交給幽暗城的瓦里瑪薩斯。", "此任務在剃刀高地外部區域完成。" },
}
for lang, data in pairs(UNHOLY) do
    local content = FDJ.ContentLocales[lang]
    if content then
        content.quests = content.quests or {}
        content.places = content.places or {}
        local part1 = content.quests[6522]
        content.quests[6521] = { name = part1 and part1.name, objective = data[1] }
        content.places["This quest is completed in the area OUTSIDE Razorfen Downs."] = data[2]
    end
end

-- Scarlet Monastery: Library: name per language; location reused from the Graveyard.
local LIBRARY_NAMES = {
    deDE = "Scharlachrotes Kloster: Bibliothek",
    frFR = "Monastère écarlate : Bibliothèque",
    esES = "Monasterio Escarlata: Biblioteca",
    itIT = "Monastero Scarlatto: Biblioteca",
    ptBR = "Monastério Escarlate: Biblioteca",
    ruRU = "Монастырь Алого ордена: Библиотека",
    koKR = "붉은십자군 수도원: 도서관",
    zhCN = "血色修道院：图书馆",
    zhTW = "血色修道院：圖書館",
}
for lang, name in pairs(LIBRARY_NAMES) do
    local content = FDJ.ContentLocales[lang]
    if content and content.dungeons then
        local gy = content.dungeons["Scarlet Monastery: Graveyard"]
        content.dungeons["Scarlet Monastery: Library"] = { name = name, location = gy and gy.location }
    end
end

-- Scarlet Monastery (Graveyard additions + Library): quest names, objectives
-- and NPC names are the official texts from the Wowhead Forever tooltips.
-- Italian, "Past Due" (new in Forever, no official text yet) and the journal's
-- own notes are translated by hand.
local SM = {}
SM.deDE = {
  q = {
    [1049] = { "Kompendium der Gefallenen", "Holt das 'Kompendium der Gefallenen' aus dem Kloster in Tirisfal und bringt es zu Sage Truthseeker in Thunder Bluff." },
    [1050] = { "Mythologie der Titanen", "Holt die 'Mythologie der Titanen' aus dem Kloster und bringt die der Bibliothekarin Mae Paledust in Ironforge." },
    [1149] = { "Test des Glaubens", "Wenn Ihr festen Glaubens seid, dann springt von den Planken über Tausend Nadeln." },
    [1150] = { "Test der Belastbarkeit", "Bringt Grenkas Klaue zu Dorn Plainstalker in Tausend Nadeln." },
    [1151] = { "Test der Kraft", "Bringt Fragmente von Rok'Alim zu Dorn Plainstalker in Tausend Nadeln." },
    [1152] = { "Test der Lehre", "Sucht Braug Dimspirit in der Nähe des Eingangs zum Steinkrallenpfad im Steinkrallengebirge." },
    [1154] = { "Test der Lehre", "Sucht das 'Vermächtnis der Aspekte' und bringt es zu Braug Dimspirit in der Nähe des Eingangs zum Steinkrallenpfad im Steinkrallengebirge zurück." },
    [1159] = { "Test der Lehre", "Sucht Parqual Fintallas in Undercity." },
    [1160] = { "Test der Lehre", "Sucht Die Anfänge der Bedrohung durch die Untoten und bringt es zu Parqual Fintallas in Undercity." },
    [6627] = { "Test der Lehre", "Beantwortet Braug Dimspirits Frage richtig und sprecht dann erneut mit ihm. Er wird immer noch im Steinkrallengebirge sein, wenn Ihr bereit seid." },
    [96800] = { "Überfällig", "Holt das Buch 'Die verlorene Magie der Runenmeister' aus dem Scharlachroten Kloster." },
  },
  npc = { "Arkanist Doan", "Hundemeister Loksey", "Bibliothekarin Mae Paledust", "Sage Truthseeker", "Parqual Fintallas", "Dorn Plainstalker", "Braug Dimspirit", "Apothekermeister Faranell", "Vorrel Sengutz", "Monika Sengutz" },
  zone = { "Tausend Nadeln", "Steinkrallengebirge", "Steinkrallenpfad", "Apothekarium" },
  t = { "%s in %s", "Nahe dem Eingang zum Steinkrallenpfad", "Starte %s hier", "Voraussetzung für %s.", "Neu in Forever. Das Buch befindet sich bei Arkanist Doan.", "Nur Orcs, Tauren und Trolle; Untote können diese Quest nicht annehmen.",
    "Trash im Scharlachroten Kloster (Set des Scharlachroten Kreuzzugs)", "Trash im Scharlachroten Kloster (sehr selten)", "Endboss, in der Gruft der Ehre.", "Endboss, im Athenaeum. Doans Geldkassette hinter ihm enthält den Scharlachroten Schlüssel.",
    "In der Kammer der Buße. Lässt Vorrels Ehering für %s fallen.", "Im Kreuzgang des Jägers.", "Seltener Gegner.", "Trash-Beute",
    "Der Bibliotheksflügel des Scharlachroten Klosters mit den Zwingern des Hundemeisters und dem Athenaeum von Arkanist Doan." },
}
SM.frFR = {
  q = {
    [1049] = { "Compendium des Déchus", "Trouver le « Compendium des Déchus » au Monastère dans les Clairières de Tirisfal et retourner voir le Sage Truthseeker à Thunder Bluff." },
    [1050] = { "Mythologie des Titans", "Reprendre « la Mythologie des Titans » au Monastère et le rapporter au Bibliothécaire Mae Paledust à Ironforge." },
    [1149] = { "L'épreuve de la Foi", "Si vous avez la Foi, sautez des planches qui dominent les Mille pointes." },
    [1150] = { "L’épreuve de l’Endurance", "Apporter la Griffe de Grenka au traqueur des plaines Dorn, aux Mille pointes." },
    [1151] = { "L'épreuve de la Force", "Apporter des Fragments de Rok'Alim au traqueur des plaines Dorn dans les Mille pointes." },
    [1152] = { "L'épreuve de la Connaissance", "Trouver Braug Dimspirit près de l’entrée de la Perce des Serres dans les Serres-Rocheuses." },
    [1154] = { "L'épreuve de la Connaissance", "Trouver l’Héritage des Aspects et l’apporter à Braug Dimspirit, à côté de l’entrée de la Perce des Serres, dans les Serres-Rocheuses." },
    [1159] = { "L'épreuve de la Connaissance", "Trouver Parqual Fintallas à Undercity." },
    [1160] = { "L'épreuve de la Connaissance", "Trouver « Les commencements de la menace des morts-vivants » et le rapporter à Parqual Fintallas à Undercity." },
    [6627] = { "L'épreuve de la Connaissance", "Réussir à répondre à la question de Braug Dimspirit, puis lui reparler. Il se trouve dans les Serres-Rocheuses." },
    [96800] = { "Retard de prêt", "Récupérer le livre « La magie perdue des maîtres des runes » au Monastère écarlate." },
  },
  npc = { "Arcaniste Doan", "Maître-chien Loksey", "Bibliothécaire Mae Paledust", "Sage Truthseeker", "Parqual Fintallas", "Traqueur des plaines Dorn", "Braug Dimspirit", "Maître apothicaire Faranell", "Vorrel Sengutz", "Monika Sengutz" },
  zone = { "Mille pointes", "Serres-Rocheuses", "Perce des Serres", "Apothicarium" },
  t = { "%s aux %s", "Près de l'entrée de la Perce des Serres", "Commencez %s ici", "Requis avant %s.", "Nouveau dans Forever. Le livre est détenu par l'Arcaniste Doan.", "Orcs, Taurens et Trolls uniquement ; les Morts-vivants ne peuvent pas prendre cette quête.",
    "Trash du Monastère écarlate (ensemble de la Croisade écarlate)", "Trash du Monastère écarlate (très rare)", "Boss final, dans la Tombe de l'Honneur.", "Boss final, dans l'Athenaeum. Le coffre de Doan derrière lui contient la Clé écarlate.",
    "Dans la Chambre de l'Expiation. Donne l'alliance de Vorrel pour %s.", "Dans le Cloître du Veneur.", "Apparition rare.", "Butin des trashs",
    "L'aile de la bibliothèque du Monastère écarlate, avec les chenils du Maître-chien et l'athenaeum de l'Arcaniste Doan." },
}
SM.esES = {
  q = {
    [1049] = { "El Compendio de los Caídos", "Recupera el Compendio de los Caídos del Monasterio que se encuentra en los Claros de Tirisfal y regresa ante Sabio Buscaverdad, que está en Cima del Trueno." },
    [1050] = { "Mitología de los Titanes", "Coge Mitología de los Titanes en el monasterio y llévaselo a la bibliotecaria Mae Palipolvo a Forjaz." },
    [1149] = { "Prueba de fe", "Si tienes fe, salta desde las tablas que dominan Las Mil Agujas." },
    [1150] = { "Prueba de resistencia", "Llévale la garra de Grenka a Dorn Acechaprados, que está en Las Mil Agujas." },
    [1151] = { "Prueba de fuerza", "Llévale fragmentos de Rok'Alim a Dorn Acechaprados, que está en Las Mil Agujas." },
    [1152] = { "Prueba de conocimiento", "Encuentra a Braug Espiritoscuro cerca de la entrada de El Paso del Espolón en Sierra Espolón." },
    [1154] = { "Prueba de conocimiento", "Encuentra el Legado de los Aspectos y devuélveselo a Braug Espiritoscuro que se encuentra cerca de la entrada de El Paso del Espolón en Sierra Espolón." },
    [1159] = { "Prueba de conocimiento", "Encuentra a Parqual Fintallas en Entrañas." },
    [1160] = { "Prueba de conocimiento", "Encuentra la Guía básica para no-muertos y devuélvesela a Parqual Fintallas, que está en Entrañas." },
    [6627] = { "Prueba de conocimiento", "Responde la pregunta de Braug Espiritoscuro con acierto y después habla con él de nuevo. Se quedará en Sierra Espolón hasta que estés preparado." },
    [96800] = { "Fuera de plazo", "Recupera el libro La magia perdida de los maestros de runas del Monasterio Escarlata." },
  },
  npc = { "Arcanista Doan", "Domador de jaurías Loksey", "Bibliotecaria Mae Palipolvo", "Sabio Buscaverdad", "Parqual Fintallas", "Dorn Acechallanos", "Braug Espiritoscuro", "Maestro boticario Faranell", "Vorrel Sengutz", "Monika Sengutz" },
  zone = { "Las Mil Agujas", "Sierra Espolón", "El Paso del Espolón", "Apothecarium" },
  t = { "%s en %s", "Cerca de la entrada de El Paso del Espolón", "Empieza %s aquí", "Necesaria antes de %s.", "Nueva en Forever. El libro lo tiene el Arcanista Doan.", "Solo orcos, tauren y trols; los no-muertos no pueden aceptar esta misión.",
    "Enemigos menores del Monasterio Escarlata (conjunto de la Cruzada Escarlata)", "Enemigos menores del Monasterio Escarlata (muy raro)", "Jefe final, en la Tumba del Honor.", "Jefe final, en el Athenaeum. La caja fuerte de Doan, detrás de él, contiene la Llave Escarlata.",
    "En la Cámara de Expiación. Suelta la alianza de Vorrel para %s.", "En el Claustro del Cazador.", "Aparición rara.", "Botín de enemigos menores",
    "El ala de la biblioteca del Monasterio Escarlata, con las perreras del Domador de jaurías y el athenaeum del Arcanista Doan." },
}
SM.itIT = {
  q = {
    [1049] = { "Compendio dei Caduti", "Recupera il Compendio dei Caduti dal Monastero nelle Radure di Tirisfal e torna dal Saggio Truthseeker a Thunder Bluff." },
    [1050] = { "Mitologia dei Titani", "Recupera Mitologia dei Titani dal Monastero e portalo alla Bibliotecaria Mae Paledust a Ironforge." },
    [1149] = { "Prova di Fede", "Se hai fede, salta dalle assi che sovrastano le Mille Guglie." },
    [1150] = { "Prova di Resistenza", "Porta l'Artiglio di Grenka a Dorn Plainstalker nelle Mille Guglie." },
    [1151] = { "Prova di Forza", "Porta i Frammenti di Rok'Alim a Dorn Plainstalker nelle Mille Guglie." },
    [1152] = { "Prova di Conoscenza", "Trova Braug Dimspirit vicino all'ingresso del Passo Talondeep sulle Montagne Stonetalon." },
    [1154] = { "Prova di Conoscenza", "Trova l'Eredità degli Aspetti e riportala a Braug Dimspirit vicino all'ingresso del Passo Talondeep sulle Montagne Stonetalon." },
    [1159] = { "Prova di Conoscenza", "Trova Parqual Fintallas a Undercity." },
    [1160] = { "Prova di Conoscenza", "Trova Le origini della minaccia dei non morti e riportalo a Parqual Fintallas a Undercity." },
    [6627] = { "Prova di Conoscenza", "Rispondi correttamente alla domanda di Braug Dimspirit e poi parlagli di nuovo." },
    [96800] = { "Prestito scaduto", "Recupera il libro La magia perduta dei Maestri delle Rune dal Monastero Scarlatto." },
  },
  npc = { "Arcanista Doan", "Mastro Segugiaio Loksey", "Bibliotecaria Mae Paledust", "Saggio Truthseeker", "Parqual Fintallas", "Dorn Plainstalker", "Braug Dimspirit", "Mastro Speziale Faranell", "Vorrel Sengutz", "Monika Sengutz" },
  zone = { "Mille Guglie", "Montagne Stonetalon", "Passo Talondeep", "Apothecarium" },
  t = { "%s nelle %s", "Vicino all'ingresso del Passo Talondeep", "Inizia %s qui", "Necessaria prima di %s.", "Nuova in Forever. Il libro è in possesso dell'Arcanista Doan.", "Solo Orchi, Tauren e Troll; i Non Morti non possono accettare questa missione.",
    "Nemici minori del Monastero Scarlatto (set della Crociata Scarlatta)", "Nemici minori del Monastero Scarlatto (molto raro)", "Boss finale, nella Tomba dell'Onore.", "Boss finale, nell'Athenaeum. Il forziere di Doan dietro di lui contiene la Chiave Scarlatta.",
    "Nella Camera dell'Espiazione. Lascia la fede nuziale di Vorrel per %s.", "Nel Chiostro del Cacciatore.", "Comparsa rara.", "Bottino dei nemici minori",
    "L'ala della biblioteca del Monastero Scarlatto, con i canili del Mastro Segugiaio e l'athenaeum dell'Arcanista Doan." },
}
SM.ptBR = {
  q = {
    [1049] = { "O Compêndio dos Caídos", "Recupere o Compêndio dos Caídos no Monastério nas Clareiras de Tirisfal e volte a falar com o Sábio Devoto da Verdade no Penhasco do Trovão." },
    [1050] = { "Mitologia dos Titãs", "Recupere o livro Mitologia dos Titãs no Monastério e leve-o para a Bibliotecária Maé Palidopó em Altaforja." },
    [1149] = { "Teste da Fé", "Se tiver fé, pule lá de cima das tábuas, no topo de Mil Agulhas." },
    [1150] = { "Teste de resistência", "Leve a Garra da Grenka para Dorn Espreitaprados em Mil Agulhas." },
    [1151] = { "Teste de força", "Leve os Fragmentos de Rok'Alim para Dorn Espreitaprados em Mil Agulhas." },
    [1152] = { "Teste de saber", "Encontre Braug Espírito Turvo perto da entrada do Túnel Garracava, na Cordilheira das Torres de Pedra." },
    [1154] = { "Teste de saber", "Encontre o Legado dos Aspectos e leve-o para Braug Espírito Turvo perto da entrada do Túnel Garracava, na Cordilheira das Torres de Pedra." },
    [1159] = { "Teste de saber", "Encontre Pasqual Fintallas na Cidade Baixa." },
    [1160] = { "Teste de saber", "Encontre o Início da Ameaça dos Mortos-vivos e leve para Pasqual Fintallas na Cidade Baixa." },
    [6627] = { "Teste de saber", "Responda à pergunta de Braug Espírito Turvo corretamente, depois fale com ele novamente. Ele estará na Cordilheira das Torres de Pedra." },
    [96800] = { "Prazo vencido", "Recupere o livro A Magia Perdida dos Mestres das Runas no Monastério Escarlate." },
  },
  npc = { "Arcanista Doan", "Mestre de Matilha Lobato", "Bibliotecária Maé Palidopó", "Sábio Devoto da Verdade", "Pasqual Fintallas", "Dorn Espreitaprados", "Braug Espírito Turvo", "Mestre-boticário Faranello", "Vorrel Sentripaz", "Monika Sentripaz" },
  zone = { "Mil Agulhas", "Cordilheira das Torres de Pedra", "Túnel Garracava", "Boticarium" },
  t = { "%s em %s", "Perto da entrada do Túnel Garracava", "Comece %s aqui", "Necessária antes de %s.", "Nova no Forever. O livro está com o Arcanista Doan.", "Somente Orcs, Taurens e Trolls; Mortos-vivos não podem aceitar esta missão.",
    "Inimigos comuns do Monastério Escarlate (conjunto da Cruzada Escarlate)", "Inimigos comuns do Monastério Escarlate (muito raro)", "Chefe final, na Tumba da Honra.", "Chefe final, no Athenaeum. O cofre de Doan atrás dele contém a Chave Escarlate.",
    "Na Câmara da Expiação. Dropa a aliança de Vorrel para %s.", "No Claustro do Caçador.", "Aparição rara.", "Saque de inimigos comuns",
    "A ala da biblioteca do Monastério Escarlate, com os canis do Mestre de Matilha e o athenaeum do Arcanista Doan." },
}
SM.ruRU = {
  q = {
    [1049] = { "\"Компендиум павших\"", "Добудьте \"Компендиум павших\" из монастыря в Тирисфальских лесах и возвращайтесь к Ведуну Искателю Истины в Громовой Утес." },
    [1050] = { "\"Мифология Титанов\"", "Добудьте \"Мифологию Титанов\" из монастыря и принесите ее библиотекарю Мае Белокожке в Стальгорн." },
    [1149] = { "Испытание веры", "Если ваша вера сильна, прыгните с досок над Тысячью Игл." },
    [1150] = { "Испытание выносливости", "Принесите коготь Гренки Дорну Вольному Ловчему в Тысячу Игл." },
    [1151] = { "Испытание силы", "Принесите фрагменты Рок'Алима Дорну Вольному Ловчему в Тысячу Игл." },
    [1152] = { "Испытание знаний", "Найдите Брауга Тусклый Дух возле входа в Туннель Когтя в Когтистых горах." },
    [1154] = { "Испытание знаний", "Найдите книгу \"Наследие Аспектов\" и вернитесь к Браугу Тусклому Духу ко входу в Туннель Когтя." },
    [1159] = { "Испытание знаний", "Найдите Парквела Финталласа в Подгороде." },
    [1160] = { "Испытание знаний", "Найдите книгу \"Истоки угрозы нежити\" и отнесите ее Парквелу Финталласу в Подгород." },
    [6627] = { "Испытание знаний", "Дайте верный ответ на вопрос Брауга Тусклого Духа и поговорите с ним еще раз. Брауга можно в любое время найти в Когтистых горах." },
    [96800] = { "Просроченная книга", "Добудьте книгу \"Утраченная магия мастеров рун\" из монастыря Алого ордена." },
  },
  npc = { "Чародей Доан", "Псарь Локси", "Библиотекарь Мая Белокожка", "Ведун Искатель Истины", "Парквел Финталлас", "Дорн Вольный Ловчий", "Брауг Тусклый Дух", "Мастер аптекарь Фаранелл", "Воррел Сенгутц", "Моника Сенгутц" },
  zone = { "Тысяча Игл", "Когтистые горы", "Туннель Когтя", "Район Фармацевтов" },
  t = { "%s — %s", "Возле входа в Туннель Когтя", "Начните %s здесь", "Требуется перед заданием %s.", "Новое в Forever. Книга находится у Чародея Доана.", "Только орки, таурены и тролли; нежить не может взять это задание.",
    "Обычные противники монастыря Алого ордена (комплект Алого ордена)", "Обычные противники монастыря Алого ордена (очень редко)", "Последний босс, в Гробнице Чести.", "Последний босс, в Читальне. В сейфе Доана позади него лежит Алый ключ.",
    "В Зале Искупления. С него падает обручальное кольцо Воррела для задания %s.", "В Обители Охотника.", "Редкий противник.", "Добыча с обычных противников",
    "Библиотечное крыло монастыря Алого ордена: псарни Псаря и читальня Чародея Доана." },
}
SM.koKR = {
  q = {
    [1049] = { "타락의 개요", "티리스팔 숲의 붉은십자군 수도원에서 타락의 개요를 찾아 썬더 블러프에 있는 현자 트루스시커에게 가져가야 합니다." },
    [1050] = { "티탄 신화", "수도원에서 티탄 신화라는 책을 찾아 아이언포지에 있는 사서 메이 페일더스트에게 가져가야 합니다." },
    [1149] = { "믿음의 시험", "믿음이 있다면 버섯구름 봉우리가 내려다보이는 높은 곳에서 판자 아래로 뛰어내리십시오." },
    [1150] = { "인내의 시험", "버섯구름 봉우리에 있는 도른 플레인스토커에게 그렌카의 발톱을 가져가야 합니다." },
    [1151] = { "용기의 시험", "버섯구름 봉우리에 있는 도른 플레인스토커에게 로크알림의 파편을 가져가야 합니다." },
    [1152] = { "지혜의 시험", "돌발톱 산맥에 있는 돌발톱 토굴길 입구 근처에서 브라우그 딤스피릿을 찾아야 합니다." },
    [1154] = { "지혜의 시험", "고대의 유산을 찾아 돌발톱 산맥에 있는 돌발톱 토굴길 입구 근처에서 브라우그 딤스피릿에게 가져가야 합니다." },
    [1159] = { "지혜의 시험", "언더시티에서 파쿠알 핀탈라스를 찾아야 합니다." },
    [1160] = { "지혜의 시험", "언데드 위협의 기원을 찾아 언더시티에 있는 파쿠알 핀탈라스에게 가져가야 합니다." },
    [6627] = { "지혜의 시험", "브라우그 딤스피릿의 질문에 대한 정답을 맞춘 다음 그에게 다시 말을 걸어야 합니다. 준비가 될 때까지 브라우그 딤스피릿은 돌발톱 산맥에 있을 것입니다." },
    [96800] = { "연체된 책", "붉은십자군 수도원에서 룬마스터의 잃어버린 마법이라는 책을 되찾아야 합니다." },
  },
  npc = { "신비술사 도안", "사냥개조련사 록시", "사서 메이 페일더스트", "현자 트루스시커", "파쿠알 핀탈라스", "도른 플레인스토커", "브라우그 딤스피릿", "수석 연금술사 파라넬", "보렐 센구츠", "모니카 센구츠" },
  zone = { "버섯구름 봉우리", "돌발톱 산맥", "돌발톱 토굴길", "연금술 실험실" },
  t = { "%2$s의 %1$s", "돌발톱 토굴길 입구 근처", "여기서 %s 시작", "%s 전에 필요합니다.", "Forever에서 새로 추가됨. 책은 신비술사 도안이 가지고 있습니다.", "오크, 타우렌, 트롤 전용. 언데드는 이 퀘스트를 받을 수 없습니다.",
    "붉은십자군 수도원 일반 몬스터 (붉은십자군 세트)", "붉은십자군 수도원 일반 몬스터 (매우 희귀)", "최종 우두머리, 명예의 무덤.", "최종 우두머리, 도서관 안쪽. 뒤에 있는 도안의 금고에 붉은십자군 열쇠가 들어 있습니다.",
    "속죄의 방. %s에 필요한 보렐의 결혼 반지를 드롭합니다.", "사냥꾼의 회랑.", "희귀 출현.", "일반 몬스터 전리품",
    "붉은십자군 수도원의 도서관 구역. 사냥개조련사의 사육장과 신비술사 도안의 서고가 있습니다." },
}
SM.zhCN = {
  q = {
    [1049] = { "堕落者纲要", "从血色修道院里找到《堕落者纲要》，把它交给雷霆崖的圣者图希克。" },
    [1050] = { "泰坦神话", "从修道院拿回《泰坦神话》，把它交给铁炉堡的图书馆员麦伊·苍尘。" },
    [1149] = { "信仰的试炼", "如果你有坚定的信仰，就从那个可以俯瞰千针石林的木板跳下去。" },
    [1150] = { "耐力的试炼", "把格林卡的爪子交给千针石林的多恩·平原行者。" },
    [1151] = { "力量的试炼", "把罗卡里姆的碎片交给千针石林的多恩·平原行者。" },
    [1152] = { "知识试炼", "找到连接石爪山和灰谷的石爪小径里的布劳格·幽魂。" },
    [1154] = { "知识试炼", "找到《巨龙的遗产》，把它还给位于灰谷和石爪山之间的石爪小径里的布劳格·幽魂。" },
    [1159] = { "知识试炼", "找到幽暗城的帕科瓦·芬塔拉斯。" },
    [1160] = { "知识试炼", "找到《亡灵的起源》，把它交给幽暗城的帕科瓦·芬塔拉斯。" },
    [6627] = { "知识试炼", "成功回答布劳格·幽魂的问题，然后和他再次对话。他会一直在石爪山等你回答问题。" },
    [96800] = { "逾期未还", "从血色修道院取回《符文大师失落的魔法》一书。" },
  },
  npc = { "奥法师杜安", "驯犬者洛克希", "图书馆员麦伊·苍尘", "圣者图希克", "帕科瓦·芬塔拉斯", "多恩·平原行者", "布劳格·幽魂", "大药剂师法拉尼尔", "沃瑞尔·森加斯", "莫尼卡·森加斯" },
  zone = { "千针石林", "石爪山脉", "石爪小径", "炼金房" },
  t = { "%2$s的%1$s", "石爪小径入口附近", "在这里开始%s", "%s的前置任务。", "Forever 新增。这本书在奥法师杜安手里。", "仅限兽人、牛头人和巨魔；亡灵无法接取此任务。",
    "血色修道院小怪（血色十字军套装）", "血色修道院小怪（非常稀有）", "最终首领，位于荣耀之墓。", "最终首领，位于图书馆深处。他身后的杜安的保险箱里有血色十字军钥匙。",
    "位于忏悔室。掉落%s所需的沃瑞尔的结婚戒指。", "位于猎手回廊。", "稀有刷新。", "小怪掉落",
    "血色修道院的图书馆区域，有驯犬者的犬舍和奥法师杜安的藏书室。" },
}
SM.zhTW = {
  q = {
    [1049] = { "墮落者綱要", "從血色修道院裡找到《墮落者綱要》，把它交給雷霆崖的聖者圖希克。" },
    [1050] = { "泰坦神話", "從修道院拿回《泰坦神話》，把它交給鐵爐堡的圖書館員麥伊·蒼塵。" },
    [1149] = { "信仰的試煉", "如果你有堅定的信仰，就從那個可以俯瞰千針石林的木板跳下去。" },
    [1150] = { "耐力的試煉", "把格林卡的爪子交給千針石林的多恩·平原行者。" },
    [1151] = { "力量的試煉", "把羅卡里姆的碎片交給千針石林的多恩·平原行者。" },
    [1152] = { "知識試煉", "找到連接石爪山和梣谷的石爪小徑裡的布勞格·幽魂。" },
    [1154] = { "知識試煉", "找到《巨龍的遺產》，把它還給位於梣谷和石爪山之間的石爪小徑裡的布勞格·幽魂。" },
    [1159] = { "知識試煉", "找到幽暗城的帕科瓦·芬塔拉斯。" },
    [1160] = { "知識試煉", "找到《亡靈的起源》，把它交給幽暗城的帕科瓦·芬塔拉斯。" },
    [6627] = { "知識試煉", "成功回答布勞格·幽魂的問題，然後和他再次對話。他會一直在石爪山等你回答問題。" },
    [96800] = { "逾期未還", "從血色修道院取回《符文大師失落的魔法》一書。" },
  },
  npc = { "奧法師杜安", "馴犬者洛克希", "圖書館員麥伊·蒼塵", "聖者圖希克", "帕科瓦·芬塔拉斯", "多恩·平原行者", "布勞格·幽魂", "大藥劑師法拉尼爾", "沃瑞爾·森加斯", "莫妮卡·森加斯" },
  zone = { "千針石林", "石爪山脈", "石爪小徑", "鍊金房" },
  t = { "%2$s的%1$s", "石爪小徑入口附近", "在這裡開始%s", "%s的前置任務。", "Forever 新增。這本書在奧法師杜安手上。", "僅限獸人、牛頭人和食人妖；不死族無法接取此任務。",
    "血色修道院小怪（血色十字軍套裝）", "血色修道院小怪（非常稀有）", "最終首領，位於榮耀之墓。", "最終首領，位於圖書館深處。他身後的杜安的保險箱裡有血色十字軍鑰匙。",
    "位於懺悔室。掉落%s所需的沃瑞爾的結婚戒指。", "位於獵手迴廊。", "稀有重生。", "小怪掉落",
    "血色修道院的圖書館區域，有馴犬者的犬舍和奧法師杜安的藏書室。" },
}

local SM_NPCS = { "Arcanist Doan", "Houndmaster Loksey", "Librarian Mae Paledust", "Sage Truthseeker", "Parqual Fintallas", "Dorn Plainstalker", "Braug Dimspirit", "Master Apothecary Faranell", "Vorrel Sengutz", "Monika Sengutz" }
local SM_ZONES = { "Thousand Needles", "Stonetalon Mountains", "Talondeep Path", "Apothecarium" }
for lang, data in pairs(SM) do
    local content = FDJ.ContentLocales[lang] or {}
    FDJ.ContentLocales[lang] = content
    content.quests = content.quests or {}
    content.places = content.places or {}
    content.bosses = content.bosses or {}
    content.dungeons = content.dungeons or {}
    local places = content.places
    local function put(key, value) if places[key] == nil then places[key] = value end end
    for id, entry in pairs(data.q) do
        if content.quests[id] == nil then content.quests[id] = { name = entry[1], objective = entry[2] } end
    end
    for i, english in ipairs(SM_NPCS) do put(english, data.npc[i]) end
    for i, english in ipairs(SM_ZONES) do put(english, data.zone[i]) end
    if content.bosses["Arcanist Doan"] == nil then content.bosses["Arcanist Doan"] = data.npc[1] end
    if content.bosses["Houndmaster Loksey"] == nil then content.bosses["Houndmaster Loksey"] = data.npc[2] end
    if content.bosses["Trash Drops"] == nil then content.bosses["Trash Drops"] = data.t[14] end

    local function QuestName(id, english)
        local q = content.quests[id]
        return (q and q.name) or english
    end
    local t = data.t
    -- Lua 5.1 has no positional format arguments, so swap them by hand.
    local where = t[1]
    if where:find("%1$s", 1, true) then
        where = where:gsub("%%1%$s", (data.npc[6]:gsub("%%", "%%%%"))):gsub("%%2%$s", (data.zone[1]:gsub("%%", "%%%%")))
    else
        where = string.format(where, data.npc[6], data.zone[1])
    end
    put("Dorn Plainstalker in Thousand Needles", where)
    put("Near the entrance to Talondeep Path", t[2])
    put("Start Going, Going, Guano! here", string.format(t[3], QuestName(1109, "Going, Going, Guano!")))
    put("Required before Hearts of Zeal.", string.format(t[4], QuestName(1113, "Hearts of Zeal")))
    put("New in Forever. The book is held by Arcanist Doan.", t[5])
    put("Orc, Tauren and Troll only; Undead cannot take this quest.", t[6])
    put("Scarlet Monastery trash (Chain of the Scarlet Crusade)", t[7])
    put("Scarlet Monastery trash (very rare)", t[8])
    put("Final boss, in Honor's Tomb.", t[9])
    put("Final boss, in the Athenaeum. Doan's Strongbox behind him holds The Scarlet Key.", t[10])
    put("In the Chamber of Atonement. Drops Vorrel's Wedding Ring for Vorrel's Revenge.", string.format(t[11], QuestName(1051, "Vorrel's Revenge")))
    put("In the Huntsman's Cloister.", t[12])
    put("Rare spawn.", t[13])
    local library = content.dungeons["Scarlet Monastery: Library"]
    if library and not library.description then library.description = t[15] end
end

-- Test of Lore answer hint used only on step 6 (quest 6627).
local TEST_OF_LORE_ANSWER = {
    deDE = "ANTWORT: Neltharion",
    frFR = "RÉPONSE : Neltharion",
    esES = "RESPUESTA: Neltharion",
    itIT = "RISPOSTA: Neltharion",
    ptBR = "RESPOSTA: Neltharion",
    ruRU = "ОТВЕТ: Нелтарион",
    koKR = "정답: 넬타리온",
    zhCN = "答案：奈萨里奥",
    zhTW = "答案：奈薩里奧",
}
for lang, warning in pairs(TEST_OF_LORE_ANSWER) do
    local content = FDJ.ContentLocales[lang]
    if content and content.quests then
        if content.quests[6627] then content.quests[6627].warning = warning end
    end
end

-- Final Passage (1394): the Test of Lore chain ends here; official texts from
-- the Wowhead Forever tooltips (Italian and the journal notes by hand).
local FINAL_PASSAGE = {
    deDE = { "Letzte Überfahrt", "Diese Quest wird im Gebiet AUSSERHALB der Hügel der Klingenhauer abgeschlossen." },
    frFR = { "Le dernier voyage", "Cette quête se termine dans la zone À L’EXTÉRIEUR de Souilles de Tranchebauge." },
    esES = { "La recta final", "Esta misión se completa en la zona FUERA de Zahúrda Rajacieno." },
    itIT = { "Passaggio finale", "Questa missione si completa nell'area FUORI da Razorfen Downs." },
    ptBR = { "Passagem final", "Esta missão é concluída na área FORA de Urzal dos Mortos." },
    ruRU = { "Финальное испытание", "Это задание выполняется в области СНАРУЖИ Курганов Иглошкурых." },
    koKR = { "최후의 시험", "이 퀘스트는 가시덩굴 구릉 바깥 지역에서 완료됩니다." },
    zhCN = { "通过试炼", "此任务在剃刀高地外部区域完成。" },
    zhTW = { "最後的旅程", "此任務在剃刀高地外部區域完成。" },
}
for lang, t in pairs(FINAL_PASSAGE) do
    local content = FDJ.ContentLocales[lang]
    if content then
        content.quests = content.quests or {}
        content.places = content.places or {}
        content.quests[1394] = { name = t[1], objective = t[2] }
        local lore = content.quests[1160]
        content.quests[6628] = { name = lore and lore.name, objective = t[3] }
        content.places["This is a long chain that has a step in the Library"] = t[4]
        content.places["The book is inside Scarlet Monastery: Library."] = t[5]
        content.places["Parqual Fintallas in Undercity"] = t[6]
    end
end

-- Quest-chain/local warning translations added in 1.5.0.
-- These are needed when the journal language is forced independently of the WoW client locale.
local QUEST_CHAIN_150 = {
    deDE = {
        [95663] = { name = "Gerüchte über den Drachenmalclan", objective = "Reist ins Sumpfland und trefft den Todespirscher-Agenten in den Hügeln oberhalb des Drachenmal-Lagers.", pickup = "Zaruk, Hammerfall, Arathihochland", turnin = "Todespirscher-Agent, Hügel oberhalb des Drachenmal-Lagers, Sumpfland", description = "Erforderlich vor Das Maul öffnen." },
        [2947] = { name = "Die Rückkehr des Rings", objective = "Bringt den glänzenden Goldring zu Talvash del Kissel in Eisenschmiede.", pickup = "Der Glitzermatic 5200, in Gnomeregan", turnin = "Talvash del Kissel, Mystikerviertel, Eisenschmiede", description = "Allianz-Schritt, erforderlich vor Gnomenverbesserung." },
        [2948] = { name = "Gnomenverbesserung", objective = "Bringt Talvash del Kissel in Eisenschmiede den glänzenden Goldring, einen Silberbarren, einen Moosachat und 30 Silbermünzen." },
        [2949] = { name = "Die Rückkehr des Rings", objective = "Bringt den glänzenden Goldring zu Nogg in Orgrimmar.", pickup = "Der Glitzermatic 5200, in Gnomeregan", turnin = "Nogg, Tal der Ehre, Orgrimmar", description = "Horde-Schritt, erforderlich vor Noggs Ringreparatur." },
        [2950] = { name = "Noggs Ringreparatur", objective = "Bringt Nogg in Orgrimmar den glänzenden Goldring, einen Silberbarren, einen Moosachat und 30 Silbermünzen." },
        warning = "Untote können diese Quest nicht annehmen",
        mapStart = "Dragonmaw Rumors hier beginnen",
    },
    frFR = {
        [95663] = { name = "Rumeurs des Gueules-de-dragon", objective = "Rendez-vous dans les Paluns et rencontrez l'agent des nécrotraqueurs dans les collines au-dessus du camp Gueule-de-dragon.", pickup = "Zaruk, Trépas-d'Orgrim, Hautes-terres d'Arathi", turnin = "Agent des nécrotraqueurs, collines au-dessus du camp Gueule-de-dragon, Les Paluns", description = "Requis avant Ouvrir la Gueule." },
        [2947] = { name = "Le retour de l'anneau", objective = "Apportez l'anneau d'or brillant à Talvash del Kissel à Forgefer.", pickup = "Le Brille-o-Matic 5200, dans Gnomeregan", turnin = "Talvash del Kissel, Garde mystique, Forgefer", description = "Étape Alliance requise avant Amélioration gnome." },
        [2948] = { name = "Amélioration gnome", objective = "Apportez l'anneau d'or brillant, une barre d'argent, une agate mousse et 30 pièces d'argent à Talvash del Kissel à Forgefer." },
        [2949] = { name = "Le retour de l'anneau", objective = "Apportez l'anneau d'or brillant à Nogg à Orgrimmar.", pickup = "Le Brille-o-Matic 5200, dans Gnomeregan", turnin = "Nogg, Vallée de l'Honneur, Orgrimmar", description = "Étape Horde requise avant La bague de Nogg." },
        [2950] = { name = "La bague de Nogg", objective = "Apportez l'anneau d'or brillant, une barre d'argent, une agate mousse et 30 pièces d'argent à Nogg à Orgrimmar." },
        warning = "Les morts-vivants ne peuvent pas accepter cette quête",
        mapStart = "Commencer Dragonmaw Rumors ici",
    },
    esES = {
        [95663] = { name = "Rumores Faucedraco", objective = "Viaja a Los Humedales y reúnete con el agente Mortacechador en las colinas sobre el campamento Faucedraco.", pickup = "Zaruk, Sentencia, Tierras Altas de Arathi", turnin = "Agente Mortacechador, colinas sobre el campamento Faucedraco, Los Humedales", description = "Necesaria antes de Abrir las Fauces." },
        [2947] = { name = "El regreso del anillo", objective = "Lleva el anillo de oro brillante a Talvash del Kissel en Forjaz.", pickup = "El Destellamatic 5200, dentro de Gnomeregan", turnin = "Talvash del Kissel, La Sala Mística, Forjaz", description = "Paso de la Alianza necesario antes de Mejora gnómica." },
        [2948] = { name = "Mejora gnómica", objective = "Lleva el anillo de oro brillante, una barra de plata, un ágata musgosa y 30 monedas de plata a Talvash del Kissel en Forjaz." },
        [2949] = { name = "El regreso del anillo", objective = "Lleva el anillo de oro brillante a Nogg en Orgrimmar.", pickup = "El Destellamatic 5200, dentro de Gnomeregan", turnin = "Nogg, Valle del Honor, Orgrimmar", description = "Paso de la Horda necesario antes de Rehacer el anillo de Nogg." },
        [2950] = { name = "Rehacer el anillo de Nogg", objective = "Lleva el anillo de oro brillante, una barra de plata, un ágata musgosa y 30 monedas de plata a Nogg en Orgrimmar." },
        warning = "Los no-muertos no pueden aceptar esta misión",
        mapStart = "Empieza Dragonmaw Rumors aquí",
    },
    itIT = {
        [95663] = { name = "Voci sui Fauci di Drago", objective = "Raggiungi le Paludi Grigie e incontra l'Agente degli Inseguitori Oscuri sulle colline sopra l'accampamento dei Fauci di Drago.", pickup = "Zaruk, Hammerfall, Altopiani d'Arathi", turnin = "Agente degli Inseguitori Oscuri, colline sopra l'accampamento dei Fauci di Drago, Paludi Grigie", description = "Richiesta prima di Aprire le Fauci." },
        [2947] = { name = "Il ritorno dell'anello", objective = "Porta l'Anello d'Oro Brillante a Talvash del Kissel a Forgiardente.", pickup = "Lo Sparklematic 5200, dentro Gnomeregan", turnin = "Talvash del Kissel, Distretto Mistico, Forgiardente", description = "Passaggio dell'Alleanza richiesto prima di Miglioramento gnomesco." },
        [2948] = { name = "Miglioramento gnomesco", objective = "Porta l'Anello d'Oro Brillante, una Lingotto d'Argento, un'Agata Muschiata e 30 monete d'argento a Talvash del Kissel a Forgiardente." },
        [2949] = { name = "Il ritorno dell'anello", objective = "Porta l'Anello d'Oro Brillante a Nogg a Orgrimmar.", pickup = "Lo Sparklematic 5200, dentro Gnomeregan", turnin = "Nogg, Valle dell'Onore, Orgrimmar", description = "Passaggio dell'Orda richiesto prima di Rifare l'anello di Nogg." },
        [2950] = { name = "Rifare l'anello di Nogg", objective = "Porta l'Anello d'Oro Brillante, una Lingotto d'Argento, un'Agata Muschiata e 30 monete d'argento a Nogg a Orgrimmar." },
        warning = "I Non Morti non possono accettare questa missione",
        mapStart = "Inizia Dragonmaw Rumors qui",
    },
    ptBR = {
        [95663] = { name = "Rumores dos Presas do Dragão", objective = "Viaje até os Pantanais e encontre o Agente dos Sicários da Morte nas colinas acima do acampamento Presa do Dragão.", pickup = "Zaruk, Ruína do Martelo, Terras Altas de Arathi", turnin = "Agente dos Sicários da Morte, colinas acima do acampamento Presa do Dragão, Pantanais", description = "Necessária antes de Abrir as Fauces." },
        [2947] = { name = "O retorno do anel", objective = "Leve o Anel de Ouro Brilhante até Talvash del Kissel em Altaforja.", pickup = "O Brastematic 5200, dentro de Gnomeregan", turnin = "Talvash del Kissel, Distrito Místico, Altaforja", description = "Etapa da Aliança necessária antes de Aprimoramento gnômico." },
        [2948] = { name = "Aprimoramento gnômico", objective = "Leve o Anel de Ouro Brilhante, uma Barra de Prata, uma Ágata Musgosa e 30 moedas de prata até Talvash del Kissel em Altaforja." },
        [2949] = { name = "O retorno do anel", objective = "Leve o Anel de Ouro Brilhante até Nogg em Orgrimmar.", pickup = "O Brastematic 5200, dentro de Gnomeregan", turnin = "Nogg, Vale da Honra, Orgrimmar", description = "Etapa da Horda necessária antes de Refazer o anel de Nogg." },
        [2950] = { name = "Refazer o anel de Nogg", objective = "Leve o Anel de Ouro Brilhante, uma Barra de Prata, uma Ágata Musgosa e 30 moedas de prata até Nogg em Orgrimmar." },
        warning = "Mortos-vivos não podem aceitar esta missão",
        mapStart = "Comece Dragonmaw Rumors aqui",
    },
    ruRU = {
        [95663] = { name = "Слухи о клане Драконьей Пасти", objective = "Отправляйтесь в Болотину и встретьтесь с агентом Стражей Смерти на холмах над лагерем Драконьей Пасти.", pickup = "Зарук, Павший Молот, Нагорье Арати", turnin = "Агент Стражей Смерти, холмы над лагерем Драконьей Пасти, Болотина", description = "Требуется перед заданием «Раскрыть Пасть»." },
        [2947] = { name = "Возвращение кольца", objective = "Отнесите сверкающее золотое кольцо Талвашу дель Кисселю в Стальгорн.", pickup = "Искристый очиститель 5200, в Гномрегане", turnin = "Талваш дель Киссель, Палаты Магии, Стальгорн", description = "Шаг Альянса, необходимый перед заданием «Улучшение гномов»." },
        [2948] = { name = "Улучшение гномов", objective = "Принесите Талвашу дель Кисселю в Стальгорн сверкающее золотое кольцо, серебряный слиток, моховой агат и 30 серебряных монет." },
        [2949] = { name = "Возвращение кольца", objective = "Отнесите сверкающее золотое кольцо Ноггу в Оргриммар.", pickup = "Искристый очиститель 5200, в Гномрегане", turnin = "Ногг, Аллея Чести, Оргриммар", description = "Шаг Орды, необходимый перед заданием «Новое кольцо Ногга»." },
        [2950] = { name = "Новое кольцо Ногга", objective = "Принесите Ноггу в Оргриммар сверкающее золотое кольцо, серебряный слиток, моховой агат и 30 серебряных монет." },
        warning = "Нежить не может взять это задание",
        mapStart = "Начать Dragonmaw Rumors здесь",
    },
    koKR = {
        [95663] = { name = "용아귀 소문", objective = "저습지로 가서 용아귀 야영지 위쪽 언덕에 있는 죽음의 추적자 요원을 만나십시오.", pickup = "자루크, 해머폴, 아라시 고원", turnin = "죽음의 추적자 요원, 용아귀 야영지 위쪽 언덕, 저습지", description = "아가리 열기 전에 필요한 퀘스트입니다." },
        [2947] = { name = "반지의 귀환", objective = "빛나는 금반지를 아이언포지의 탈바쉬 델 키젤에게 가져가십시오.", pickup = "반짝이는 5200, 놈리건 내부", turnin = "탈바쉬 델 키젤, 신비의 전당, 아이언포지", description = "놈 개선 전에 필요한 얼라이언스 단계입니다." },
        [2948] = { name = "놈 개선", objective = "빛나는 금반지, 은괴, 이끼 마노, 은화 30개를 아이언포지의 탈바쉬 델 키젤에게 가져가십시오." },
        [2949] = { name = "반지의 귀환", objective = "빛나는 금반지를 오그리마의 노그에게 가져가십시오.", pickup = "반짝이는 5200, 놈리건 내부", turnin = "노그, 명예의 골짜기, 오그리마", description = "노그의 반지 다시 만들기 전에 필요한 호드 단계입니다." },
        [2950] = { name = "노그의 반지 다시 만들기", objective = "빛나는 금반지, 은괴, 이끼 마노, 은화 30개를 오그리마의 노그에게 가져가십시오." },
        warning = "언데드는 이 퀘스트를 받을 수 없습니다",
        mapStart = "여기서 Dragonmaw Rumors 시작",
    },
    zhCN = {
        [95663] = { name = "龙喉传闻", objective = "前往湿地，在龙喉营地上方的山丘与亡灵哨兵探员会面。", pickup = "扎鲁克，落锤镇，阿拉希高地", turnin = "亡灵哨兵探员，龙喉营地上方的山丘，湿地", description = "完成此任务后才能接取“打开巨口”。" },
        [2947] = { name = "戒指归来", objective = "把闪亮的金戒指带给铁炉堡的塔瓦斯德·基瑟尔。", pickup = "超级清洁器5200型，诺莫瑞根内", turnin = "塔瓦斯德·基瑟尔，秘法区，铁炉堡", description = "联盟步骤，完成后才能接取“侏儒的改进”。" },
        [2948] = { name = "侏儒的改进", objective = "把闪亮的金戒指、一块银锭、一颗绿玛瑙和30枚银币带给铁炉堡的塔瓦斯德·基瑟尔。" },
        [2949] = { name = "戒指归来", objective = "把闪亮的金戒指带给奥格瑞玛的诺格。", pickup = "超级清洁器5200型，诺莫瑞根内", turnin = "诺格，荣誉谷，奥格瑞玛", description = "部落步骤，完成后才能接取“诺格的戒指重制”。" },
        [2950] = { name = "诺格的戒指重制", objective = "把闪亮的金戒指、一块银锭、一颗绿玛瑙和30枚银币带给奥格瑞玛的诺格。" },
        warning = "亡灵无法接取此任务",
        mapStart = "在这里开始 Dragonmaw Rumors",
    },
    zhTW = {
        [95663] = { name = "龍喉傳聞", objective = "前往濕地，在龍喉營地上方的山丘與亡靈哨兵探員會面。", pickup = "札魯克，落錘鎮，阿拉希高地", turnin = "亡靈哨兵探員，龍喉營地上方的山丘，濕地", description = "完成此任務後才能接取「開啟巨口」。" },
        [2947] = { name = "戒指歸來", objective = "把閃亮的金戒指帶給鐵爐堡的塔瓦斯德·基瑟爾。", pickup = "超級清潔器5200型，諾姆瑞根內", turnin = "塔瓦斯德·基瑟爾，秘法區，鐵爐堡", description = "聯盟步驟，完成後才能接取「地精改良」。" },
        [2948] = { name = "地精改良", objective = "把閃亮的金戒指、一塊銀錠、一顆綠瑪瑙和30枚銀幣帶給鐵爐堡的塔瓦斯德·基瑟爾。" },
        [2949] = { name = "戒指歸來", objective = "把閃亮的金戒指帶給奧格瑪的諾格。", pickup = "超級清潔器5200型，諾姆瑞根內", turnin = "諾格，榮譽谷，奧格瑪", description = "部落步驟，完成後才能接取「諾格的戒指重製」。" },
        [2950] = { name = "諾格的戒指重製", objective = "把閃亮的金戒指、一塊銀錠、一顆綠瑪瑙和30枚銀幣帶給奧格瑪的諾格。" },
        warning = "不死族無法接取此任務",
        mapStart = "在這裡開始 Dragonmaw Rumors",
    },
}

for lang, data in pairs(QUEST_CHAIN_150) do
    local content = FDJ.ContentLocales[lang]
    if content then
        content.quests = content.quests or {}
        content.places = content.places or {}
        for id, entry in pairs(data) do
            if type(id) == "number" then
                local target = content.quests[id] or {}
                content.quests[id] = target
                for field, value in pairs(entry) do target[field] = value end
            end
        end
        content.places["Undead cannot take this quest"] = data.warning
        content.places["Start Dragonmaw Rumors here"] = data.mapStart
    end
end


-- Horrors in the Highland prerequisite chain localization (1.5.0).
local HIGHLAND_CHAIN_150 = {
    deDE = {
        [463] = { name = "Der grüne Wächter", objective = "Findet Rethiel den Grünen Wächter im Sumpfland.", pickup = "Erster Maat Fitzsimmons, Hafen von Menethil, Sumpfland", turnin = "Rethiel der Grüne Wächter, Der Grüne Gürtel, Sumpfland", description = "Erster erforderlicher Schritt vor Schrecken im Hochland." },
        [276] = { name = "Stampfende Pfoten", objective = "Tötet 15 Mooshide-Gnolle und 10 Mooshide-Mischlinge und kehrt dann zu Rethiel dem Grünen Wächter zurück.", pickup = "Rethiel der Grüne Wächter, Der Grüne Gürtel, Sumpfland", turnin = "Rethiel der Grüne Wächter, Der Grüne Gürtel, Sumpfland", description = "Zweiter erforderlicher Schritt vor Schrecken im Hochland." },
        [277] = { name = "Feuertabu", objective = "Bringt Rethiel dem Grünen Wächter 9 grobe Feuersteine.", pickup = "Rethiel der Grüne Wächter, Der Grüne Gürtel, Sumpfland", turnin = "Rethiel der Grüne Wächter, Der Grüne Gürtel, Sumpfland", description = "Dritter erforderlicher Schritt vor Schrecken im Hochland." },
        [275] = { name = "Blasen im Land", objective = "Tötet 12 Sumpfkriecher und kehrt dann zu Rethiel dem Grünen Wächter zurück.", pickup = "Rethiel der Grüne Wächter, Der Grüne Gürtel, Sumpfland", turnin = "Rethiel der Grüne Wächter, Der Grüne Gürtel, Sumpfland", description = "Letzter erforderlicher Schritt vor Schrecken im Hochland." },
        map = { "Hier beginnt Der grüne Wächter", "Hier mit Stampfende Pfoten fortfahren", "Hier mit Feuertabu fortfahren", "Hier mit Blasen im Land fortfahren" },
    },
    frFR = {
        [463] = { name = "Le Gardien vert", objective = "Trouvez Rethiel le Gardien vert dans les Paluns.", pickup = "Second Fitzsimmons, Port de Menethil, Les Paluns", turnin = "Rethiel le Gardien vert, La Ceinture verte, Les Paluns", description = "Première étape requise avant Horreurs des hautes terres." },
        [276] = { name = "Pattes écrasantes", objective = "Tuez 15 gnolls Mosshide et 10 bâtards Mosshide, puis retournez voir Rethiel le Gardien vert.", pickup = "Rethiel le Gardien vert, La Ceinture verte, Les Paluns", turnin = "Rethiel le Gardien vert, La Ceinture verte, Les Paluns", description = "Deuxième étape requise avant Horreurs des hautes terres." },
        [277] = { name = "Tabou du feu", objective = "Apportez 9 silex grossiers à Rethiel le Gardien vert.", pickup = "Rethiel le Gardien vert, La Ceinture verte, Les Paluns", turnin = "Rethiel le Gardien vert, La Ceinture verte, Les Paluns", description = "Troisième étape requise avant Horreurs des hautes terres." },
        [275] = { name = "Des pustules sur la terre", objective = "Tuez 12 rampants des marais, puis retournez voir Rethiel le Gardien vert.", pickup = "Rethiel le Gardien vert, La Ceinture verte, Les Paluns", turnin = "Rethiel le Gardien vert, La Ceinture verte, Les Paluns", description = "Dernière étape requise avant Horreurs des hautes terres." },
        map = { "Commencer Le Gardien vert ici", "Continuer avec Pattes écrasantes ici", "Continuer avec Tabou du feu ici", "Continuer avec Des pustules sur la terre ici" },
    },
    esES = {
        [463] = { name = "El Guardaverde", objective = "Encuentra a Rethiel el Guardaverde en Los Humedales.", pickup = "Primer oficial Fitzsimmons, Puerto de Menethil, Los Humedales", turnin = "Rethiel el Guardaverde, El Cinturón Verde, Los Humedales", description = "Primer paso necesario antes de Horrores de las Tierras Altas." },
        [276] = { name = "Patas pisoteadoras", objective = "Mata a 15 gnolls Pellejomusgo y 10 mestizos Pellejomusgo y vuelve con Rethiel el Guardaverde.", pickup = "Rethiel el Guardaverde, El Cinturón Verde, Los Humedales", turnin = "Rethiel el Guardaverde, El Cinturón Verde, Los Humedales", description = "Segundo paso necesario antes de Horrores de las Tierras Altas." },
        [277] = { name = "Tabú del fuego", objective = "Lleva 9 pedernales rudimentarios a Rethiel el Guardaverde.", pickup = "Rethiel el Guardaverde, El Cinturón Verde, Los Humedales", turnin = "Rethiel el Guardaverde, El Cinturón Verde, Los Humedales", description = "Tercer paso necesario antes de Horrores de las Tierras Altas." },
        [275] = { name = "Ampollas en la tierra", objective = "Mata a 12 reptadores del pantano y vuelve con Rethiel el Guardaverde.", pickup = "Rethiel el Guardaverde, El Cinturón Verde, Los Humedales", turnin = "Rethiel el Guardaverde, El Cinturón Verde, Los Humedales", description = "Último paso necesario antes de Horrores de las Tierras Altas." },
        map = { "Empieza El Guardaverde aquí", "Continúa con Patas pisoteadoras aquí", "Continúa con Tabú del fuego aquí", "Continúa con Ampollas en la tierra aquí" },
    },
    itIT = {
        [463] = { name = "Il Guardiano Verde", objective = "Trova Rethiel il Guardiano Verde nelle Paludi Grigie.", pickup = "Primo Ufficiale Fitzsimmons, Porto di Menethil, Paludi Grigie", turnin = "Rethiel il Guardiano Verde, Cintura Verde, Paludi Grigie", description = "Primo passaggio richiesto prima di Orrori degli Altipiani." },
        [276] = { name = "Zampe calpestanti", objective = "Uccidi 15 Gnoll Muschiopelle e 10 Meticci Muschiopelle, poi torna da Rethiel il Guardiano Verde.", pickup = "Rethiel il Guardiano Verde, Cintura Verde, Paludi Grigie", turnin = "Rethiel il Guardiano Verde, Cintura Verde, Paludi Grigie", description = "Secondo passaggio richiesto prima di Orrori degli Altipiani." },
        [277] = { name = "Tabù del fuoco", objective = "Porta 9 selci grezze a Rethiel il Guardiano Verde.", pickup = "Rethiel il Guardiano Verde, Cintura Verde, Paludi Grigie", turnin = "Rethiel il Guardiano Verde, Cintura Verde, Paludi Grigie", description = "Terzo passaggio richiesto prima di Orrori degli Altipiani." },
        [275] = { name = "Piaghe sulla terra", objective = "Uccidi 12 Striscianti della Palude, poi torna da Rethiel il Guardiano Verde.", pickup = "Rethiel il Guardiano Verde, Cintura Verde, Paludi Grigie", turnin = "Rethiel il Guardiano Verde, Cintura Verde, Paludi Grigie", description = "Ultimo passaggio richiesto prima di Orrori degli Altipiani." },
        map = { "Inizia Il Guardiano Verde qui", "Continua con Zampe calpestanti qui", "Continua con Tabù del fuoco qui", "Continua con Piaghe sulla terra qui" },
    },
    ptBR = {
        [463] = { name = "O Guardião Verde", objective = "Encontre Rethiel, o Guardião Verde, nos Pantanais.", pickup = "Imediato Fitzsimmons, Porto de Menethil, Pantanais", turnin = "Rethiel, o Guardião Verde, Cinturão Verde, Pantanais", description = "Primeira etapa necessária antes de Horrores das Terras Altas." },
        [276] = { name = "Patas pisoteantes", objective = "Mate 15 gnolls Couro de Musgo e 10 vira-latas Couro de Musgo e volte a Rethiel, o Guardião Verde.", pickup = "Rethiel, o Guardião Verde, Cinturão Verde, Pantanais", turnin = "Rethiel, o Guardião Verde, Cinturão Verde, Pantanais", description = "Segunda etapa necessária antes de Horrores das Terras Altas." },
        [277] = { name = "Tabu do fogo", objective = "Leve 9 pederneiras brutas a Rethiel, o Guardião Verde.", pickup = "Rethiel, o Guardião Verde, Cinturão Verde, Pantanais", turnin = "Rethiel, o Guardião Verde, Cinturão Verde, Pantanais", description = "Terceira etapa necessária antes de Horrores das Terras Altas." },
        [275] = { name = "Bolhas na terra", objective = "Mate 12 rastejantes do pântano e volte a Rethiel, o Guardião Verde.", pickup = "Rethiel, o Guardião Verde, Cinturão Verde, Pantanais", turnin = "Rethiel, o Guardião Verde, Cinturão Verde, Pantanais", description = "Etapa final necessária antes de Horrores das Terras Altas." },
        map = { "Comece O Guardião Verde aqui", "Continue com Patas pisoteantes aqui", "Continue com Tabu do fogo aqui", "Continue com Bolhas na terra aqui" },
    },
    ruRU = {
        [463] = { name = "Страж Природы", objective = "Найдите Ретиля Стража Природы в Болотине.", pickup = "Первый помощник Фитцсиммонс, гавань Менетилов, Болотина", turnin = "Ретиль Страж Природы, Зеленый Пояс, Болотина", description = "Первый обязательный этап перед заданием «Ужасы нагорья»." },
        [276] = { name = "Топотунья", objective = "Убейте 15 гноллов Мохошкуров и 10 дворняг Мохошкуров, затем вернитесь к Ретилю Стражу Природы.", pickup = "Ретиль Страж Природы, Зеленый Пояс, Болотина", turnin = "Ретиль Страж Природы, Зеленый Пояс, Болотина", description = "Второй обязательный этап перед заданием «Ужасы нагорья»." },
        [277] = { name = "Табу огня", objective = "Принесите Ретилю Стражу Природы 9 грубых кремней.", pickup = "Ретиль Страж Природы, Зеленый Пояс, Болотина", turnin = "Ретиль Страж Природы, Зеленый Пояс, Болотина", description = "Третий обязательный этап перед заданием «Ужасы нагорья»." },
        [275] = { name = "Нарывы на земле", objective = "Убейте 12 болотных ползунов, затем вернитесь к Ретилю Стражу Природы.", pickup = "Ретиль Страж Природы, Зеленый Пояс, Болотина", turnin = "Ретиль Страж Природы, Зеленый Пояс, Болотина", description = "Последний обязательный этап перед заданием «Ужасы нагорья»." },
        map = { "Начать «Страж Природы» здесь", "Продолжить «Топотунья» здесь", "Продолжить «Табу огня» здесь", "Продолжить «Нарывы на земле» здесь" },
    },
    koKR = {
        [463] = { name = "녹색감시자", objective = "저습지에서 녹색감시자 레시엘을 찾으십시오.", pickup = "일등항해사 피츠시몬스, 메네실 항구, 저습지", turnin = "녹색감시자 레시엘, 녹색 지대, 저습지", description = "고지대의 공포 전에 필요한 첫 번째 단계입니다." },
        [276] = { name = "짓밟는 발", objective = "이끼가죽 놀 15마리와 이끼가죽 싸움꾼 10마리를 처치한 뒤 녹색감시자 레시엘에게 돌아가십시오.", pickup = "녹색감시자 레시엘, 녹색 지대, 저습지", turnin = "녹색감시자 레시엘, 녹색 지대, 저습지", description = "고지대의 공포 전에 필요한 두 번째 단계입니다." },
        [277] = { name = "불의 금기", objective = "녹색감시자 레시엘에게 조잡한 부싯돌 9개를 가져가십시오.", pickup = "녹색감시자 레시엘, 녹색 지대, 저습지", turnin = "녹색감시자 레시엘, 녹색 지대, 저습지", description = "고지대의 공포 전에 필요한 세 번째 단계입니다." },
        [275] = { name = "대지의 물집", objective = "늪지대 덩굴손 12마리를 처치한 뒤 녹색감시자 레시엘에게 돌아가십시오.", pickup = "녹색감시자 레시엘, 녹색 지대, 저습지", turnin = "녹색감시자 레시엘, 녹색 지대, 저습지", description = "고지대의 공포 전에 필요한 마지막 단계입니다." },
        map = { "여기서 녹색감시자 시작", "여기서 짓밟는 발 계속", "여기서 불의 금기 계속", "여기서 대지의 물집 계속" },
    },
    zhCN = {
        [463] = { name = "绿色守卫者", objective = "在湿地找到绿色守卫者雷希耶尔。", pickup = "大副菲兹莫斯，米奈希尔港，湿地", turnin = "绿色守卫者雷希耶尔，绿色地带，湿地", description = "“高地惊魂”之前的第一个必需步骤。" },
        [276] = { name = "践踏之爪", objective = "消灭15个藓皮豺狼人和10个藓皮混血者，然后返回绿色守卫者雷希耶尔处。", pickup = "绿色守卫者雷希耶尔，绿色地带，湿地", turnin = "绿色守卫者雷希耶尔，绿色地带，湿地", description = "“高地惊魂”之前的第二个必需步骤。" },
        [277] = { name = "火焰禁忌", objective = "给绿色守卫者雷希耶尔带去9块粗糙燧石。", pickup = "绿色守卫者雷希耶尔，绿色地带，湿地", turnin = "绿色守卫者雷希耶尔，绿色地带，湿地", description = "“高地惊魂”之前的第三个必需步骤。" },
        [275] = { name = "大地上的脓疱", objective = "消灭12只沼泽爬行者，然后返回绿色守卫者雷希耶尔处。", pickup = "绿色守卫者雷希耶尔，绿色地带，湿地", turnin = "绿色守卫者雷希耶尔，绿色地带，湿地", description = "“高地惊魂”之前的最后一个必需步骤。" },
        map = { "在这里开始绿色守卫者", "在这里继续践踏之爪", "在这里继续火焰禁忌", "在这里继续大地上的脓疱" },
    },
    zhTW = {
        [463] = { name = "綠色守衛者", objective = "在濕地找到綠色守衛者雷希耶爾。", pickup = "大副菲茲莫斯，米奈希爾港，濕地", turnin = "綠色守衛者雷希耶爾，綠色地帶，濕地", description = "「高地驚魂」之前的第一個必要步驟。" },
        [276] = { name = "踐踏之爪", objective = "消滅15個苔蘚皮豺狼人和10個苔蘚皮混血者，然後返回綠色守衛者雷希耶爾處。", pickup = "綠色守衛者雷希耶爾，綠色地帶，濕地", turnin = "綠色守衛者雷希耶爾，綠色地帶，濕地", description = "「高地驚魂」之前的第二個必要步驟。" },
        [277] = { name = "火焰禁忌", objective = "給綠色守衛者雷希耶爾帶去9塊粗糙燧石。", pickup = "綠色守衛者雷希耶爾，綠色地帶，濕地", turnin = "綠色守衛者雷希耶爾，綠色地帶，濕地", description = "「高地驚魂」之前的第三個必要步驟。" },
        [275] = { name = "大地上的膿疱", objective = "消滅12隻沼澤爬行者，然後返回綠色守衛者雷希耶爾處。", pickup = "綠色守衛者雷希耶爾，綠色地帶，濕地", turnin = "綠色守衛者雷希耶爾，綠色地帶，濕地", description = "「高地驚魂」之前的最後一個必要步驟。" },
        map = { "在這裡開始綠色守衛者", "在這裡繼續踐踏之爪", "在這裡繼續火焰禁忌", "在這裡繼續大地上的膿疱" },
    },
}

for lang, data in pairs(HIGHLAND_CHAIN_150) do
    local content = FDJ.ContentLocales[lang]
    if content then
        content.quests = content.quests or {}
        content.places = content.places or {}
        for _, id in ipairs({463, 276, 277, 275}) do
            local target = content.quests[id] or {}
            content.quests[id] = target
            for field, value in pairs(data[id]) do target[field] = value end
        end
        content.places["Start The Greenwarden here"] = data.map[1]
        content.places["Continue with Tramping Paws here"] = data.map[2]
        content.places["Continue with Fire Taboo here"] = data.map[3]
        content.places["Continue with Blisters on The Land here"] = data.map[4]
    end
end

-- Highland Hides prerequisite added for 1.5.0: Young Crocolisk Skins.
local HIGHLAND_HIDES_PREREQ_150 = {
    deDE = { "Junge Krokiliskenhäute", "Diese Quest wird im Gebiet AUSSERHALB der Hügel der Klingenhauer abgeschlossen." },
    frFR = { "Peaux de jeunes crocilisques", "Cette quête se termine dans la zone À L’EXTÉRIEUR de Souilles de Tranchebauge." },
    esES = { "Pieles de crocolisco joven", "Esta misión se completa en la zona FUERA de Zahúrda Rajacieno." },
    itIT = { "Pelli di giovane crocolisco", "Questa missione si completa nell'area FUORI da Razorfen Downs." },
    ptBR = { "Peles de crocolisco jovem", "Esta missão é concluída na área FORA de Urzal dos Mortos." },
    ruRU = { "Шкуры молодых кроколисков", "Это задание выполняется в области СНАРУЖИ Курганов Иглошкурых." },
    koKR = { "새끼 악어 가죽", "이 퀘스트는 가시덩굴 구릉 바깥 지역에서 완료됩니다." },
    zhCN = { "幼年鳄鱼的皮", "此任务在剃刀高地外部区域完成。" },
    zhTW = { "幼年鱷魚的皮", "此任務在剃刀高地外部區域完成。" },
}

for lang, data in pairs(HIGHLAND_HIDES_PREREQ_150) do
    local content = FDJ.ContentLocales[lang]
    if content then
        content.quests = content.quests or {}
        content.places = content.places or {}
        local target = content.quests[484] or {}
        content.quests[484] = target
        target.name = data.name
        target.objective = data.objective
        target.pickup = data.pickup
        target.turnin = data.turnin
        target.description = data.description
        content.places["Start Young Crocolisk Skins here"] = data.map
    end
end


-- Rig Wars pickup-order warning (1.5.2).
local RIG_WARS_WARNING_EN = "Accept Rig Wars before Chief Engineer Scooty. If Rig Wars disappears, abandon Chief Engineer Scooty and it will reappear."
local RIG_WARS_WARNING_TEMPLATE_EN = "Accept %s before %s. If %s disappears, abandon %s and it will reappear."
local RIG_WARS_WARNING_TEMPLATES_151 = {
    deDE = "Nimm %s vor %s an. Falls %s verschwindet, brich %s ab; dann erscheint die Quest wieder.",
    frFR = "Acceptez %s avant %s. Si %s disparaît, abandonnez %s et la quête réapparaîtra.",
    esES = "Acepta %s antes de %s. Si %s desaparece, abandona %s y la misión volverá a aparecer.",
    itIT = "Accetta %s prima di %s. Se %s scompare, abbandona %s e la missione ricomparirà.",
    ptBR = "Aceite %s antes de %s. Se %s desaparecer, abandone %s e a missão reaparecerá.",
    ruRU = "Сначала возьмите %s, затем %s. Если %s исчезнет, отмените %s — задание появится снова.",
    koKR = "%s 퀘스트를 %s보다 먼저 받으세요. %s 퀘스트가 사라지면 %s 퀘스트를 포기하면 다시 나타납니다.",
    zhCN = "先接取%s，再接%s。如果%s消失，放弃%s后该任务会重新出现。",
    zhTW = "先接取%s，再接%s。如果%s消失，放棄%s後該任務會重新出現。",
}
local RIG_WARS_WARNING_151 = {
    deDE = "Nimm Rig Wars vor Chief Engineer Scooty an. Falls Rig Wars verschwindet, brich Chief Engineer Scooty ab; dann erscheint Rig Wars wieder.",
    frFR = "Acceptez Rig Wars avant Chief Engineer Scooty. Si Rig Wars disparaît, abandonnez Chief Engineer Scooty et Rig Wars réapparaîtra.",
    esES = "Acepta Rig Wars antes de Chief Engineer Scooty. Si Rig Wars desaparece, abandona Chief Engineer Scooty y Rig Wars volverá a aparecer.",
    itIT = "Accetta Rig Wars prima di Chief Engineer Scooty. Se Rig Wars scompare, abbandona Chief Engineer Scooty e Rig Wars ricomparirà.",
    ptBR = "Aceite Rig Wars antes de Chief Engineer Scooty. Se Rig Wars desaparecer, abandone Chief Engineer Scooty e Rig Wars reaparecerá.",
    ruRU = "Сначала возьмите Rig Wars, затем Chief Engineer Scooty. Если Rig Wars исчезнет, отмените Chief Engineer Scooty — Rig Wars появится снова.",
    koKR = "Chief Engineer Scooty보다 먼저 Rig Wars를 받으세요. Rig Wars가 사라지면 Chief Engineer Scooty를 포기하면 Rig Wars가 다시 나타납니다.",
    zhCN = "先接取 Rig Wars，再接 Chief Engineer Scooty。如果 Rig Wars 消失，放弃 Chief Engineer Scooty 后，Rig Wars 会重新出现。",
    zhTW = "先接取 Rig Wars，再接 Chief Engineer Scooty。如果 Rig Wars 消失，放棄 Chief Engineer Scooty 後，Rig Wars 會重新出現。",
}
for lang, translated in pairs(RIG_WARS_WARNING_151) do
    local content = FDJ.ContentLocales[lang]
    if content then
        content.places = content.places or {}
        content.places[RIG_WARS_WARNING_EN] = translated
        local template = RIG_WARS_WARNING_TEMPLATES_151[lang]
        if template then
            content.places[RIG_WARS_WARNING_TEMPLATE_EN] = template
        end
    end
end


-- Blackfathom Deeps: Baron Aquanis (6922), added in 1.5.2.
-- This is an item-start quest inside BFD, not a formal quest-chain entry.
local BARON_AQUANIS_6922 = {
    deDE = {
        name = "Baron Aquanis",
        objective = "Bringt die seltsame Wasserkugel zu Je'neu Sancrea im Zoram'gar-Außenposten im Eschental.",
        warning = "Baron Aquanis erscheint, wenn ihr den Tiefenkern aus der Quest 'Inmitten der Ruinen' plündert.",
        pickup = "Seltsame Wasserkugel, Beute von Baron Aquanis in der Tiefschwarzen Grotte",
        turnin = "Je'neu Sancrea, Zoram'gar-Außenposten, Eschental",
        source = "Beute von Baron Aquanis in der Tiefschwarzen Grotte.",
    },
    frFR = {
        name = "Baron Aquanis",
        objective = "Apportez le Globe d'eau étrange à Je'neu Sancrea à l'avant-poste de Zoram'gar, en Orneval.",
        warning = "Le Baron Aquanis apparaît lorsque vous récupérez le Noyau des profondeurs pour la quête 'Parmi les ruines'.",
        pickup = "Globe d'eau étrange, obtenu sur le Baron Aquanis dans les Profondeurs de Brassenoire",
        turnin = "Je'neu Sancrea, avant-poste de Zoram'gar, Orneval",
        source = "Obtenu sur le Baron Aquanis dans les Profondeurs de Brassenoire.",
    },
    esES = {
        name = "Barón Aquanis",
        objective = "Lleva el Globo de agua extraño a Je'neu Sancrea en el Puesto de Zoram'gar, Vallefresno.",
        warning = "El Barón Aquanis aparece al saquear el Núcleo de las profundidades de la misión 'Entre las ruinas'.",
        pickup = "Globo de agua extraño, botín del Barón Aquanis dentro de Cavernas de Brazanegra",
        turnin = "Je'neu Sancrea, Puesto de Zoram'gar, Vallefresno",
        source = "Botín del Barón Aquanis dentro de Cavernas de Brazanegra.",
    },
    itIT = {
        name = "Barone Aquanis",
        objective = "Porta il Globo d'Acqua Strano a Je'neu Sancrea all'Avamposto di Zoram'gar, Valtetra.",
        warning = "Il Barone Aquanis compare quando raccogli il Nucleo degli Abissi per la missione 'Tra le Rovine'.",
        pickup = "Globo d'Acqua Strano, bottino del Barone Aquanis nelle Profondità di Fondocupo",
        turnin = "Je'neu Sancrea, Avamposto di Zoram'gar, Valtetra",
        source = "Bottino del Barone Aquanis nelle Profondità di Fondocupo.",
    },
    ptBR = {
        name = "Barão Aquanis",
        objective = "Leve o Globo de Água Estranho a Je'neu Sancrea no Posto Avançado de Zoram'gar, Vale Gris.",
        warning = "O Barão Aquanis aparece ao saquear o Núcleo das Profundezas da missão 'Entre as Ruínas'.",
        pickup = "Globo de Água Estranho, saque do Barão Aquanis dentro de Profundezas Negras",
        turnin = "Je'neu Sancrea, Posto Avançado de Zoram'gar, Vale Gris",
        source = "Saque do Barão Aquanis dentro de Profundezas Negras.",
    },
    ruRU = {
        name = "Барон Акванис",
        objective = "Отнесите странную водяную сферу Джен'ю Санкри в заставу Зорам'гар, Ясеневый лес.",
        warning = "Барон Акванис появляется, когда вы забираете Ядро глубин для задания 'Среди руин'.",
        pickup = "Странная водяная сфера, добывается с барона Акваниса в Непроглядной Пучине",
        turnin = "Джен'ю Санкри, застава Зорам'гар, Ясеневый лес",
        source = "Добывается с барона Акваниса в Непроглядной Пучине.",
    },
    koKR = {
        name = "군주 아쿠아니스",
        objective = "잿빛 골짜기 조람가르 전초기지의 제뉴 산크리에게 이상한 물구슬을 가져가십시오.",
        warning = "군주 아쿠아니스는 '폐허 사이로' 퀘스트의 심연의 핵을 획득하면 생성됩니다.",
        pickup = "이상한 물구슬, 검은심연 나락의 군주 아쿠아니스에게서 획득",
        turnin = "제뉴 산크리, 조람가르 전초기지, 잿빛 골짜기",
        source = "검은심연 나락의 군주 아쿠아니스에게서 획득합니다.",
    },
    zhCN = {
        name = "阿奎尼斯男爵",
        objective = "把奇怪的水球交给灰谷佐拉姆加前哨站的耶努萨克雷。",
        warning = "拾取'废墟之间'任务的深渊之核后，阿奎尼斯男爵会出现。",
        pickup = "奇怪的水球，由黑暗深渊中的阿奎尼斯男爵掉落",
        turnin = "耶努萨克雷，佐拉姆加前哨站，灰谷",
        source = "由黑暗深渊中的阿奎尼斯男爵掉落。",
    },
    zhTW = {
        name = "阿奎尼斯男爵",
        objective = "把奇怪的水球交給梣谷佐拉姆加前哨站的耶努薩克雷。",
        warning = "拾取'廢墟之間'任務的深淵之核後，阿奎尼斯男爵會出現。",
        pickup = "奇怪的水球，由黑暗深淵中的阿奎尼斯男爵掉落",
        turnin = "耶努薩克雷，佐拉姆加前哨站，梣谷",
        source = "由黑暗深淵中的阿奎尼斯男爵掉落。",
    },
}

for lang, data in pairs(BARON_AQUANIS_6922) do
    local content = FDJ.ContentLocales[lang]
    if content then
        content.quests = content.quests or {}
        content.places = content.places or {}
        local q = content.quests[6922] or {}
        content.quests[6922] = q
        q.name = data.name
        q.objective = data.objective
        q.warning = data.warning
        q.pickup = data.pickup
        q.turnin = data.turnin
        content.places["Drops from Baron Aquanis inside Blackfathom Deeps."] = data.source
    end
end


-- Blackfathom Deeps optional breadcrumb presentation (1.5.2).
-- Trouble in the Deeps stays available as a hidden detail page, opened from
-- The Essence of Aku'Mai Notes, but is not presented as a required chain step.
local BFD_TROUBLE_OPTIONAL_151 = {
    deDE = { "OPTIONAL, nicht erforderlich", "Diese Quest wird im Gebiet AUSSERHALB der Hügel der Klingenhauer abgeschlossen." },
    frFR = { "FACULTATIF, non requis", "Cette quête se termine dans la zone À L’EXTÉRIEUR de Souilles de Tranchebauge." },
    esES = { "OPCIONAL, no es necesaria", "Esta misión se completa en la zona FUERA de Zahúrda Rajacieno." },
    itIT = { "OPZIONALE, non richiesta", "Questa missione si completa nell'area FUORI da Razorfen Downs." },
    ptBR = { "OPCIONAL, não é obrigatória", "Esta missão é concluída na área FORA de Urzal dos Mortos." },
    ruRU = { "НЕОБЯЗАТЕЛЬНО, не требуется", "Это задание выполняется в области СНАРУЖИ Курганов Иглошкурых." },
    koKR = { "선택 사항, 필요하지 않음", "이 퀘스트는 가시덩굴 구릉 바깥 지역에서 완료됩니다." },
    zhCN = { "可选，并非必需", "此任务在剃刀高地外部区域完成。" },
    zhTW = { "可選，並非必需", "此任務在剃刀高地外部區域完成。" },
}
for lang, data in pairs(BFD_TROUBLE_OPTIONAL_151) do
    local content = FDJ.ContentLocales[lang]
    if content then
        content.quests = content.quests or {}
        local trouble = content.quests[6562] or {}
        content.quests[6562] = trouble
        trouble.warning = data.warning

        local essence = content.quests[6563] or {}
        content.quests[6563] = essence
        essence.note = data.essenceNote
    end
end


-- City of Dalaran quest additions (1.5.2): Alliance Heart of Disruption chain
-- and the both-factions Starving Arcane quest.
local DALARAN_QUESTS_92432_92457_92458 = {
    deDE = {
        [92432] = { name = "Eine alarmierende Bitte", objective = "Meldet Euch beim Abbild von Erzmagierin Modera in der Nähe von Dalaran.", turnin = "Abbild von Erzmagierin Modera, Lordameresee nahe Dalaran", description = "Einführungsquest, die zu 'Das Herz der Störung' führt." },
        [92457] = { name = "Verhungernder Arkaner", objective = "Besiegt 8 suchende Fragmente, 8 gesättigte Fragmente und 8 Manaechos in Dalaran für Erzmagierin Modera vor Dalaran.", pickup = "Erzmagierin Modera, vor Dalaran am Lordameresee", turnin = "Erzmagierin Modera, vor Dalaran am Lordameresee" },
        [92458] = { name = "Das Herz der Störung", objective = "Holt den Arkanpartikel für das Abbild von Erzmagierin Modera in der Nähe von Dalaran.", pickup = "Abbild von Erzmagierin Modera, Lordameresee nahe Dalaran", turnin = "Abbild von Erzmagierin Modera, Lordameresee nahe Dalaran" },
    },
    frFR = {
        [92432] = { name = "Une requête alarmante", objective = "Faites votre rapport à l'image de l'archimage Modera près de Dalaran.", turnin = "Image de l'archimage Modera, lac Lordamere près de Dalaran", description = "Quête d'introduction menant à Cœur de la perturbation." },
        [92457] = { name = "Arcane affamé", objective = "Vainquez 8 Vestiges chercheurs, 8 Vestiges saturés et 8 Échos de mana dans Dalaran pour l'archimage Modera, à l'extérieur de la ville.", pickup = "Archimage Modera, à l'extérieur de Dalaran près du lac Lordamere", turnin = "Archimage Modera, à l'extérieur de Dalaran près du lac Lordamere" },
        [92458] = { name = "Cœur de la perturbation", objective = "Récupérez la granule arcanique pour l'image de l'archimage Modera près de Dalaran.", pickup = "Image de l'archimage Modera, lac Lordamere près de Dalaran", turnin = "Image de l'archimage Modera, lac Lordamere près de Dalaran" },
    },
    esES = {
        [92432] = { name = "Una petición alarmante", objective = "Preséntate ante la imagen de la archimaga Modera cerca de Dalaran.", turnin = "Imagen de la archimaga Modera, lago Lordamere cerca de Dalaran", description = "Misión introductoria que conduce a Corazón de la disrupción." },
        [92457] = { name = "Arcano hambriento", objective = "Derrota a 8 Remanentes buscadores, 8 Remanentes saturados y 8 Ecos de maná dentro de Dalaran para la archimaga Modera, fuera de la ciudad.", pickup = "Archimaga Modera, fuera de Dalaran junto al lago Lordamere", turnin = "Archimaga Modera, fuera de Dalaran junto al lago Lordamere" },
        [92458] = { name = "Corazón de la disrupción", objective = "Consigue la Mota arcana para la imagen de la archimaga Modera cerca de Dalaran.", pickup = "Imagen de la archimaga Modera, lago Lordamere cerca de Dalaran", turnin = "Imagen de la archimaga Modera, lago Lordamere cerca de Dalaran" },
    },
    itIT = {
        [92432] = { name = "Una richiesta allarmante", objective = "Fai rapporto all'immagine dell'Arcimaga Modera vicino a Dalaran.", turnin = "Immagine dell'Arcimaga Modera, Lago Lordamere vicino a Dalaran", description = "Missione introduttiva che porta a Cuore della perturbazione." },
        [92457] = { name = "Arcano affamato", objective = "Sconfiggi 8 Resti Cercatori, 8 Resti Saturi e 8 Echi di Mana dentro Dalaran per l'Arcimaga Modera fuori dalla città.", pickup = "Arcimaga Modera, fuori Dalaran presso il Lago Lordamere", turnin = "Arcimaga Modera, fuori Dalaran presso il Lago Lordamere" },
        [92458] = { name = "Cuore della perturbazione", objective = "Recupera la Particella Arcana per l'immagine dell'Arcimaga Modera vicino a Dalaran.", pickup = "Immagine dell'Arcimaga Modera, Lago Lordamere vicino a Dalaran", turnin = "Immagine dell'Arcimaga Modera, Lago Lordamere vicino a Dalaran" },
    },
    ptBR = {
        [92432] = { name = "Um pedido alarmante", objective = "Apresente-se à imagem da Arquimaga Modera perto de Dalaran.", turnin = "Imagem da Arquimaga Modera, Lago Lordamere perto de Dalaran", description = "Missão introdutória que leva a Coração da Perturbação." },
        [92457] = { name = "Arcano faminto", objective = "Derrote 8 Remanescentes Buscadores, 8 Remanescentes Saturados e 8 Ecos de Mana dentro de Dalaran para a Arquimaga Modera, fora da cidade.", pickup = "Arquimaga Modera, fora de Dalaran junto ao Lago Lordamere", turnin = "Arquimaga Modera, fora de Dalaran junto ao Lago Lordamere" },
        [92458] = { name = "Coração da Perturbação", objective = "Obtenha a Partícula Arcana para a imagem da Arquimaga Modera perto de Dalaran.", pickup = "Imagem da Arquimaga Modera, Lago Lordamere perto de Dalaran", turnin = "Imagem da Arquimaga Modera, Lago Lordamere perto de Dalaran" },
    },
    ruRU = {
        [92432] = { name = "Тревожная просьба", objective = "Доложите образу верховного мага Модеры возле Даларана.", turnin = "Образ верховного мага Модеры, озеро Лордамер возле Даларана", description = "Вводное задание, ведущее к заданию «Сердце нарушения»." },
        [92457] = { name = "Голодная тайная магия", objective = "Победите 8 ищущих остатков, 8 насыщенных остатков и 8 отголосков маны в Даларане для верховного мага Модеры за пределами города.", pickup = "Верховный маг Модера, возле Даларана у озера Лордамер", turnin = "Верховный маг Модера, возле Даларана у озера Лордамер" },
        [92458] = { name = "Сердце нарушения", objective = "Добудьте частицу тайной магии для образа верховного мага Модеры возле Даларана.", pickup = "Образ верховного мага Модеры, озеро Лордамер возле Даларана", turnin = "Образ верховного мага Модеры, озеро Лордамер возле Даларана" },
    },
    koKR = {
        [92432] = { name = "긴급한 요청", objective = "달라란 근처의 대마법사 모데라의 환영에게 보고하십시오.", turnin = "대마법사 모데라의 환영, 달라란 근처 로다미어 호수", description = "혼란의 심장으로 이어지는 도입 퀘스트입니다." },
        [92457] = { name = "굶주린 비전 마력", objective = "달라란 내부에서 탐색하는 잔재 8마리, 포화된 잔재 8마리, 마나의 메아리 8마리를 처치하고 달라란 밖의 대마법사 모데라에게 돌아가십시오.", pickup = "대마법사 모데라, 달라란 밖 로다미어 호수 근처", turnin = "대마법사 모데라, 달라란 밖 로다미어 호수 근처" },
        [92458] = { name = "혼란의 심장", objective = "달라란 근처의 대마법사 모데라의 환영을 위해 비전 티끌을 가져오십시오.", pickup = "대마법사 모데라의 환영, 달라란 근처 로다미어 호수", turnin = "대마법사 모데라의 환영, 달라란 근처 로다미어 호수" },
    },
    zhCN = {
        [92432] = { name = "紧急请求", objective = "向达拉然附近的大法师茉德拉的影像报告。", turnin = "大法师茉德拉的影像，达拉然附近的洛丹米尔湖", description = "通往“扰乱之心”的引导任务。" },
        [92457] = { name = "饥饿的奥术", objective = "在达拉然城内击败8个搜寻残片、8个饱和残片和8个法力回响，然后向城外的大法师茉德拉复命。", pickup = "大法师茉德拉，达拉然城外洛丹米尔湖附近", turnin = "大法师茉德拉，达拉然城外洛丹米尔湖附近" },
        [92458] = { name = "扰乱之心", objective = "为达拉然附近的大法师茉德拉的影像取得奥术微粒。", pickup = "大法师茉德拉的影像，达拉然附近的洛丹米尔湖", turnin = "大法师茉德拉的影像，达拉然附近的洛丹米尔湖" },
    },
    zhTW = {
        [92432] = { name = "緊急請求", objective = "向達拉然附近的大法師莫德拉的影像報告。", turnin = "大法師莫德拉的影像，達拉然附近的羅德米爾湖", description = "通往「擾亂之心」的引導任務。" },
        [92457] = { name = "飢餓的秘法", objective = "在達拉然城內擊敗8個搜尋殘片、8個飽和殘片和8個法力迴響，然後向城外的大法師莫德拉覆命。", pickup = "大法師莫德拉，達拉然城外羅德米爾湖附近", turnin = "大法師莫德拉，達拉然城外羅德米爾湖附近" },
        [92458] = { name = "擾亂之心", objective = "為達拉然附近的大法師莫德拉的影像取得秘法微粒。", pickup = "大法師莫德拉的影像，達拉然附近的羅德米爾湖", turnin = "大法師莫德拉的影像，達拉然附近的羅德米爾湖" },
    },
}

for lang, quests in pairs(DALARAN_QUESTS_92432_92457_92458) do
    local content = FDJ.ContentLocales[lang]
    if content then
        content.quests = content.quests or {}
        for questID, data in pairs(quests) do
            local q = content.quests[questID] or {}
            content.quests[questID] = q
            for field, value in pairs(data) do q[field] = value end
        end
    end
end


-- City of Dalaran Horde attunement chain (1.5.2).
-- The Forever beta does not currently expose localized text for every new
-- attunement quest through Wowhead, so these addon-language strings keep the
-- Journal consistent when its language selector differs from the game client.
FDJ.ContentLocales.deDE.quests[544] = { name = "Einbruch ins Gefängnis", objective = "Findet die vier abtrünnigen Verlassenen im Internierungslager von Lordamere, holt ihre Blutsteinartefakte zurück und kehrt zu Magus Wordeen Voidglare zurück.", pickup = "Magus Wordeen Voidglare, Tarrens Mühle, Vorgebirge von Hillsbrad", turnin = "Magus Wordeen Voidglare, Tarrens Mühle, Vorgebirge von Hillsbrad", note = "Nehmt gleichzeitig 'Schlüssel zur Stadt' bei Magus Wordeen Voidglare an." }
FDJ.ContentLocales.deDE.quests[93680] = { name = "Schlüssel zur Stadt", objective = "Beschafft den schmutzigen Schlüssel für Magus Wordeen Voidglare in Tarrens Mühle.", pickup = "Magus Wordeen Voidglare, Tarrens Mühle, Vorgebirge von Hillsbrad", turnin = "Magus Wordeen Voidglare, Tarrens Mühle, Vorgebirge von Hillsbrad", note = "Diese Quest kann gleichzeitig mit 'Einbruch ins Gefängnis' angenommen werden." }
FDJ.ContentLocales.deDE.quests[545] = { name = "Patrouillen von Dalaran", objective = "Tötet 6 Beschwörer von Dalaran und 12 Elementarsklaven und kehrt zu Magus Wordeen Voidglare in Tarrens Mühle zurück.", pickup = "Magus Wordeen Voidglare, Tarrens Mühle, Vorgebirge von Hillsbrad", turnin = "Magus Wordeen Voidglare, Tarrens Mühle, Vorgebirge von Hillsbrad", description = "Verfügbar nach Abschluss von 'Einbruch ins Gefängnis'." }
FDJ.ContentLocales.deDE.quests[92434] = { name = "Blut auf den Straßen", objective = "Findet am Lordameresee einen Weg nach Dalaran hinein.", pickup = "Magus Wordeen Voidglare, Tarrens Mühle, Vorgebirge von Hillsbrad", turnin = "Abbild von Erzmagierin Modera, Lordameresee nahe Dalaran", note = "Benötigt die Dalaran-Quests von Magus Wordeen Voidglare. 'Steinmarken' und 'Armschienen der Bindung' von Keeper Bel'varil sind optional und für die Einstimmung nicht erforderlich." }
FDJ.ContentLocales.deDE.quests[96984] = { name = "Das Herz der Störung", objective = "Sammelt den Arkanpartikel in Dalaran für Magus Wordeen Voidglare in Tarrens Mühle.", pickup = "Abbild von Erzmagierin Modera, Lordameresee nahe Dalaran", turnin = "Magus Wordeen Voidglare, Tarrens Mühle, Vorgebirge von Hillsbrad", note = "Horde-Einstimmung für Dalaran. 'Steinmarken' und 'Armschienen der Bindung' können nebenbei erledigt werden, sind aber nicht erforderlich." }

FDJ.ContentLocales.frFR.quests[544] = { name = "Évasion de prison", objective = "Trouvez les quatre traîtres Réprouvés au camp d'internement de Lordamere, récupérez leurs artefacts de pierre de sang et retournez voir Magus Wordeen Voidglare.", pickup = "Magus Wordeen Voidglare, Moulin-de-Tarren, Contreforts de Hautebrande", turnin = "Magus Wordeen Voidglare, Moulin-de-Tarren, Contreforts de Hautebrande", note = "Prenez aussi 'Clé de la ville' auprès de Magus Wordeen Voidglare." }
FDJ.ContentLocales.frFR.quests[93680] = { name = "Clé de la ville", objective = "Obtenez la clé crasseuse pour Magus Wordeen Voidglare au Moulin-de-Tarren.", pickup = "Magus Wordeen Voidglare, Moulin-de-Tarren, Contreforts de Hautebrande", turnin = "Magus Wordeen Voidglare, Moulin-de-Tarren, Contreforts de Hautebrande", note = "Cette quête peut être acceptée en même temps qu'Évasion de prison." }
FDJ.ContentLocales.frFR.quests[545] = { name = "Patrouilles de Dalaran", objective = "Tuez 6 invocateurs de Dalaran et 12 esclaves élémentaires, puis retournez voir Magus Wordeen Voidglare au Moulin-de-Tarren.", pickup = "Magus Wordeen Voidglare, Moulin-de-Tarren, Contreforts de Hautebrande", turnin = "Magus Wordeen Voidglare, Moulin-de-Tarren, Contreforts de Hautebrande", description = "Disponible après Évasion de prison." }
FDJ.ContentLocales.frFR.quests[92434] = { name = "Du sang dans les rues", objective = "Trouvez un moyen d'entrer dans Dalaran le long du lac Lordamere.", pickup = "Magus Wordeen Voidglare, Moulin-de-Tarren, Contreforts de Hautebrande", turnin = "Image de l'archimage Modera, lac Lordamere près de Dalaran", note = "Nécessite les quêtes de Dalaran de Magus Wordeen Voidglare. Jetons de pierre et Bracelets de lien de Keeper Bel'varil sont facultatifs et ne sont pas requis pour l'accès." }
FDJ.ContentLocales.frFR.quests[96984] = { name = "Cœur de la perturbation", objective = "Récupérez la granule arcanique dans Dalaran pour Magus Wordeen Voidglare au Moulin-de-Tarren.", pickup = "Image de l'archimage Modera, lac Lordamere près de Dalaran", turnin = "Magus Wordeen Voidglare, Moulin-de-Tarren, Contreforts de Hautebrande", note = "Accès Horde à Dalaran. Jetons de pierre et Bracelets de lien peuvent être faits en parallèle mais ne sont pas requis." }

FDJ.ContentLocales.esES.quests[544] = { name = "Fuga de la prisión", objective = "Encuentra a los cuatro traidores Renegados en el Campo de Internamiento de Lordamere, recupera sus artefactos de piedra de sangre y vuelve con Magus Wordeen Voidglare.", pickup = "Magus Wordeen Voidglare, Molino Tarren, Laderas de Trabalomas", turnin = "Magus Wordeen Voidglare, Molino Tarren, Laderas de Trabalomas", note = "Acepta también 'Llave de la ciudad' de Magus Wordeen Voidglare." }
FDJ.ContentLocales.esES.quests[93680] = { name = "Llave de la ciudad", objective = "Consigue la Llave mugrienta para Magus Wordeen Voidglare en Molino Tarren.", pickup = "Magus Wordeen Voidglare, Molino Tarren, Laderas de Trabalomas", turnin = "Magus Wordeen Voidglare, Molino Tarren, Laderas de Trabalomas", note = "Esta misión puede aceptarse al mismo tiempo que Fuga de la prisión." }
FDJ.ContentLocales.esES.quests[545] = { name = "Patrullas de Dalaran", objective = "Mata a 6 Invocadores de Dalaran y 12 Esclavos elementales y vuelve con Magus Wordeen Voidglare en Molino Tarren.", pickup = "Magus Wordeen Voidglare, Molino Tarren, Laderas de Trabalomas", turnin = "Magus Wordeen Voidglare, Molino Tarren, Laderas de Trabalomas", description = "Disponible después de completar Fuga de la prisión." }
FDJ.ContentLocales.esES.quests[92434] = { name = "Sangre en las calles", objective = "Encuentra una forma de entrar en Dalaran por el lago Lordamere.", pickup = "Magus Wordeen Voidglare, Molino Tarren, Laderas de Trabalomas", turnin = "Imagen de la archimaga Modera, lago Lordamere cerca de Dalaran", note = "Requiere las misiones de Dalaran de Magus Wordeen Voidglare. Fichas de piedra y Brazales de vinculación de Keeper Bel'varil son opcionales y no son necesarios para la armonización." }
FDJ.ContentLocales.esES.quests[96984] = { name = "Corazón de la perturbación", objective = "Recoge la Mota arcana en Dalaran para Magus Wordeen Voidglare en Molino Tarren.", pickup = "Imagen de la archimaga Modera, lago Lordamere cerca de Dalaran", turnin = "Magus Wordeen Voidglare, Molino Tarren, Laderas de Trabalomas", note = "Armonización de la Horda para Dalaran. Fichas de piedra y Brazales de vinculación pueden hacerse en paralelo, pero no son necesarios." }

FDJ.ContentLocales.itIT.quests[544] = { name = "Evasione dalla prigione", objective = "Trova i quattro traditori Reietti al Campo d'Internamento di Lordamere, recupera i loro artefatti di Pietrasangue e torna da Magus Wordeen Voidglare.", pickup = "Magus Wordeen Voidglare, Mulino di Tarren, Alture di Colletorto", turnin = "Magus Wordeen Voidglare, Mulino di Tarren, Alture di Colletorto", note = "Prendi anche 'Chiave della città' da Magus Wordeen Voidglare." }
FDJ.ContentLocales.itIT.quests[93680] = { name = "Chiave della città", objective = "Recupera la Chiave sudicia per Magus Wordeen Voidglare a Mulino di Tarren.", pickup = "Magus Wordeen Voidglare, Mulino di Tarren, Alture di Colletorto", turnin = "Magus Wordeen Voidglare, Mulino di Tarren, Alture di Colletorto", note = "Questa missione può essere accettata insieme a Evasione dalla prigione." }
FDJ.ContentLocales.itIT.quests[545] = { name = "Pattuglie di Dalaran", objective = "Uccidi 6 Evocatori di Dalaran e 12 Schiavi Elementali, poi torna da Magus Wordeen Voidglare a Mulino di Tarren.", pickup = "Magus Wordeen Voidglare, Mulino di Tarren, Alture di Colletorto", turnin = "Magus Wordeen Voidglare, Mulino di Tarren, Alture di Colletorto", description = "Disponibile dopo aver completato Evasione dalla prigione." }
FDJ.ContentLocales.itIT.quests[92434] = { name = "Sangue nelle strade", objective = "Trova un modo per entrare a Dalaran lungo il Lago Lordamere.", pickup = "Magus Wordeen Voidglare, Mulino di Tarren, Alture di Colletorto", turnin = "Immagine dell'Arcimaga Modera, Lago Lordamere vicino a Dalaran", note = "Richiede le missioni di Dalaran di Magus Wordeen Voidglare. Gettoni di Pietra e Bracciali del Vincolo di Keeper Bel'varil sono opzionali e non richiesti per l'accesso." }
FDJ.ContentLocales.itIT.quests[96984] = { name = "Cuore della perturbazione", objective = "Raccogli la Particella Arcana a Dalaran per Magus Wordeen Voidglare a Mulino di Tarren.", pickup = "Immagine dell'Arcimaga Modera, Lago Lordamere vicino a Dalaran", turnin = "Magus Wordeen Voidglare, Mulino di Tarren, Alture di Colletorto", note = "Accesso dell'Orda a Dalaran. Gettoni di Pietra e Bracciali del Vincolo possono essere fatti in parallelo, ma non sono richiesti." }

FDJ.ContentLocales.ptBR.quests[544] = { name = "Invasão da prisão", objective = "Encontre os quatro traidores Renegados no Campo de Internamento de Lordamere, recupere os artefatos de Pedra de Sangue e volte a Magus Wordeen Voidglare.", pickup = "Magus Wordeen Voidglare, Moinho Tarren, Contraforte de Eira dos Montes", turnin = "Magus Wordeen Voidglare, Moinho Tarren, Contraforte de Eira dos Montes", note = "Pegue também 'Chave da cidade' com Magus Wordeen Voidglare." }
FDJ.ContentLocales.ptBR.quests[93680] = { name = "Chave da cidade", objective = "Consiga a Chave Suja para Magus Wordeen Voidglare no Moinho Tarren.", pickup = "Magus Wordeen Voidglare, Moinho Tarren, Contraforte de Eira dos Montes", turnin = "Magus Wordeen Voidglare, Moinho Tarren, Contraforte de Eira dos Montes", note = "Esta missão pode ser aceita junto com Invasão da prisão." }
FDJ.ContentLocales.ptBR.quests[545] = { name = "Patrulhas de Dalaran", objective = "Mate 6 Invocadores de Dalaran e 12 Escravos Elementais e volte a Magus Wordeen Voidglare no Moinho Tarren.", pickup = "Magus Wordeen Voidglare, Moinho Tarren, Contraforte de Eira dos Montes", turnin = "Magus Wordeen Voidglare, Moinho Tarren, Contraforte de Eira dos Montes", description = "Disponível após concluir Invasão da prisão." }
FDJ.ContentLocales.ptBR.quests[92434] = { name = "Sangue nas ruas", objective = "Encontre uma forma de entrar em Dalaran pelo Lago Lordamere.", pickup = "Magus Wordeen Voidglare, Moinho Tarren, Contraforte de Eira dos Montes", turnin = "Imagem da Arquimaga Modera, Lago Lordamere perto de Dalaran", note = "Requer as missões de Dalaran de Magus Wordeen Voidglare. Fichas de Pedra e Braçadeiras de Vinculação de Keeper Bel'varil são opcionais e não são necessárias para a harmonização." }
FDJ.ContentLocales.ptBR.quests[96984] = { name = "Coração da Perturbação", objective = "Colete a Partícula Arcana em Dalaran para Magus Wordeen Voidglare no Moinho Tarren.", pickup = "Imagem da Arquimaga Modera, Lago Lordamere perto de Dalaran", turnin = "Magus Wordeen Voidglare, Moinho Tarren, Contraforte de Eira dos Montes", note = "Harmonização da Horda para Dalaran. Fichas de Pedra e Braçadeiras de Vinculação podem ser feitas em paralelo, mas não são necessárias." }

FDJ.ContentLocales.ruRU.quests[544] = { name = "Побег из тюрьмы", objective = "Найдите четырех предателей Отрекшихся в лагере для интернированных Лордамер, заберите их артефакты Кровавого камня и вернитесь к магу Вордину Пустогляду.", pickup = "Маг Вордин Пустогляд, Мельница Таррен, Предгорья Хилсбрада", turnin = "Маг Вордин Пустогляд, Мельница Таррен, Предгорья Хилсбрада", note = "Одновременно возьмите у мага Вордина Пустогляда задание «Ключ от города»." }
FDJ.ContentLocales.ruRU.quests[93680] = { name = "Ключ от города", objective = "Добудьте грязный ключ для мага Вордина Пустогляда на Мельнице Таррен.", pickup = "Маг Вордин Пустогляд, Мельница Таррен, Предгорья Хилсбрада", turnin = "Маг Вордин Пустогляд, Мельница Таррен, Предгорья Хилсбрада", note = "Это задание можно взять одновременно с «Побегом из тюрьмы»." }
FDJ.ContentLocales.ruRU.quests[545] = { name = "Патрули Даларана", objective = "Убейте 6 призывателей Даларана и 12 порабощенных элементалей, затем вернитесь к магу Вордину Пустогляду на Мельницу Таррен.", pickup = "Маг Вордин Пустогляд, Мельница Таррен, Предгорья Хилсбрада", turnin = "Маг Вордин Пустогляд, Мельница Таррен, Предгорья Хилсбрада", description = "Доступно после выполнения «Побега из тюрьмы»." }
FDJ.ContentLocales.ruRU.quests[92434] = { name = "Кровь на улицах", objective = "Найдите путь в Даларан со стороны озера Лордамер.", pickup = "Маг Вордин Пустогляд, Мельница Таррен, Предгорья Хилсбрада", turnin = "Образ верховного мага Модеры, озеро Лордамер возле Даларана", note = "Требует задания Даларана от мага Вордина Пустогляда. «Каменные жетоны» и «Наручи подчинения» от Keeper Bel'varil необязательны и не нужны для доступа." }
FDJ.ContentLocales.ruRU.quests[96984] = { name = "Сердце нарушения", objective = "Добудьте частицу тайной магии в Даларане для мага Вордина Пустогляда на Мельнице Таррен.", pickup = "Образ верховного мага Модеры, озеро Лордамер возле Даларана", turnin = "Маг Вордин Пустогляд, Мельница Таррен, Предгорья Хилсбрада", note = "Ордынская цепочка доступа в Даларан. Каменные жетоны и Наручи подчинения можно выполнить параллельно, но они не обязательны." }

FDJ.ContentLocales.koKR.quests[544] = { name = "감옥 침입", objective = "로다미어 수용소에서 포세이큰 배신자 네 명을 찾아 혈석 유물을 되찾고 타렌 밀의 마구스 워딘 보이드글레어에게 돌아가세요.", pickup = "마구스 워딘 보이드글레어, 타렌 밀, 힐스브래드 구릉지", turnin = "마구스 워딘 보이드글레어, 타렌 밀, 힐스브래드 구릉지", note = "마구스 워딘 보이드글레어에게서 '도시의 열쇠'도 함께 받으세요." }
FDJ.ContentLocales.koKR.quests[93680] = { name = "도시의 열쇠", objective = "타렌 밀의 마구스 워딘 보이드글레어를 위해 때 묻은 열쇠를 구하세요.", pickup = "마구스 워딘 보이드글레어, 타렌 밀, 힐스브래드 구릉지", turnin = "마구스 워딘 보이드글레어, 타렌 밀, 힐스브래드 구릉지", note = "감옥 침입과 동시에 받을 수 있습니다." }
FDJ.ContentLocales.koKR.quests[545] = { name = "달라란 순찰대", objective = "달라란 소환사 6명과 정령 노예 12마리를 처치하고 타렌 밀의 마구스 워딘 보이드글레어에게 돌아가세요.", pickup = "마구스 워딘 보이드글레어, 타렌 밀, 힐스브래드 구릉지", turnin = "마구스 워딘 보이드글레어, 타렌 밀, 힐스브래드 구릉지", description = "감옥 침입 완료 후 이용할 수 있습니다." }
FDJ.ContentLocales.koKR.quests[92434] = { name = "거리의 피", objective = "로다미어 호수를 따라 달라란으로 들어갈 방법을 찾으세요.", pickup = "마구스 워딘 보이드글레어, 타렌 밀, 힐스브래드 구릉지", turnin = "대마법사 모데라의 환영, 달라란 근처 로다미어 호수", note = "마구스 워딘 보이드글레어의 달라란 퀘스트가 필요합니다. Keeper Bel'varil의 돌 토큰과 속박의 팔보호구는 선택 사항이며 입장에 필요하지 않습니다." }
FDJ.ContentLocales.koKR.quests[96984] = { name = "혼란의 심장", objective = "타렌 밀의 마구스 워딘 보이드글레어를 위해 달라란에서 비전 티끌을 수집하세요.", pickup = "대마법사 모데라의 환영, 달라란 근처 로다미어 호수", turnin = "마구스 워딘 보이드글레어, 타렌 밀, 힐스브래드 구릉지", note = "호드 달라란 입장 연계입니다. 돌 토큰과 속박의 팔보호구는 함께 진행할 수 있지만 필수는 아닙니다." }

FDJ.ContentLocales.zhCN.quests[544] = { name = "越狱行动", objective = "在洛丹米尔收容所找到四名被遗忘者叛徒，夺回他们的血石神器，然后返回塔伦米尔的法师沃迪恩·虚空之眼处。", pickup = "法师沃迪恩·虚空之眼，塔伦米尔，希尔斯布莱德丘陵", turnin = "法师沃迪恩·虚空之眼，塔伦米尔，希尔斯布莱德丘陵", note = "同时从法师沃迪恩·虚空之眼处接取“城市钥匙”。" }
FDJ.ContentLocales.zhCN.quests[93680] = { name = "城市钥匙", objective = "为塔伦米尔的法师沃迪恩·虚空之眼取得肮脏的钥匙。", pickup = "法师沃迪恩·虚空之眼，塔伦米尔，希尔斯布莱德丘陵", turnin = "法师沃迪恩·虚空之眼，塔伦米尔，希尔斯布莱德丘陵", note = "此任务可与“越狱行动”同时接取。" }
FDJ.ContentLocales.zhCN.quests[545] = { name = "达拉然巡逻队", objective = "击杀6名达拉然召唤师和12个元素奴仆，然后返回塔伦米尔的法师沃迪恩·虚空之眼处。", pickup = "法师沃迪恩·虚空之眼，塔伦米尔，希尔斯布莱德丘陵", turnin = "法师沃迪恩·虚空之眼，塔伦米尔，希尔斯布莱德丘陵", description = "完成“越狱行动”后可接取。" }
FDJ.ContentLocales.zhCN.quests[92434] = { name = "街头之血", objective = "沿洛丹米尔湖寻找进入达拉然的方法。", pickup = "法师沃迪恩·虚空之眼，塔伦米尔，希尔斯布莱德丘陵", turnin = "大法师茉德拉的影像，达拉然附近的洛丹米尔湖", note = "需要完成法师沃迪恩·虚空之眼的达拉然任务。Keeper Bel'varil的石质徽记和束缚护腕为可选任务，不是入场前置。" }
FDJ.ContentLocales.zhCN.quests[96984] = { name = "扰乱之心", objective = "在达拉然收集奥术微粒并交给塔伦米尔的法师沃迪恩·虚空之眼。", pickup = "大法师茉德拉的影像，达拉然附近的洛丹米尔湖", turnin = "法师沃迪恩·虚空之眼，塔伦米尔，希尔斯布莱德丘陵", note = "部落达拉然入场任务链。石质徽记和束缚护腕可以顺路完成，但并非必需。" }

FDJ.ContentLocales.zhTW.quests[544] = { name = "越獄行動", objective = "在羅德米爾收容所找到四名被遺忘者叛徒，奪回他們的血石神器，然後返回塔倫米爾的法師沃迪恩·虛空之眼處。", pickup = "法師沃迪恩·虛空之眼，塔倫米爾，希爾斯布萊德丘陵", turnin = "法師沃迪恩·虛空之眼，塔倫米爾，希爾斯布萊德丘陵", note = "同時從法師沃迪恩·虛空之眼處接取「城市鑰匙」。" }
FDJ.ContentLocales.zhTW.quests[93680] = { name = "城市鑰匙", objective = "為塔倫米爾的法師沃迪恩·虛空之眼取得骯髒的鑰匙。", pickup = "法師沃迪恩·虛空之眼，塔倫米爾，希爾斯布萊德丘陵", turnin = "法師沃迪恩·虛空之眼，塔倫米爾，希爾斯布萊德丘陵", note = "此任務可與「越獄行動」同時接取。" }
FDJ.ContentLocales.zhTW.quests[545] = { name = "達拉然巡邏隊", objective = "擊殺6名達拉然召喚師和12個元素奴僕，然後返回塔倫米爾的法師沃迪恩·虛空之眼處。", pickup = "法師沃迪恩·虛空之眼，塔倫米爾，希爾斯布萊德丘陵", turnin = "法師沃迪恩·虛空之眼，塔倫米爾，希爾斯布萊德丘陵", description = "完成「越獄行動」後可接取。" }
FDJ.ContentLocales.zhTW.quests[92434] = { name = "街頭之血", objective = "沿羅德米爾湖尋找進入達拉然的方法。", pickup = "法師沃迪恩·虛空之眼，塔倫米爾，希爾斯布萊德丘陵", turnin = "大法師莫德拉的影像，達拉然附近的羅德米爾湖", note = "需要完成法師沃迪恩·虛空之眼的達拉然任務。Keeper Bel'varil的石質徽記和束縛護腕為可選任務，不是入場前置。" }
FDJ.ContentLocales.zhTW.quests[96984] = { name = "擾亂之心", objective = "在達拉然收集秘法微粒並交給塔倫米爾的法師沃迪恩·虛空之眼。", pickup = "大法師莫德拉的影像，達拉然附近的羅德米爾湖", turnin = "法師沃迪恩·虛空之眼，塔倫米爾，希爾斯布萊德丘陵", note = "部落達拉然入場任務鏈。石質徽記和束縛護腕可以順路完成，但並非必需。" }
