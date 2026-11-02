/**
 * World of Warcraft: Forever - Factions & Reputation Dataset
 * Datamined from WoW Forever Client (Build 1.60.1.70707)
 * Ingested from ForeverDB open data under GPL-3.0 attribution
 */
(function () {
  'use strict';

  window.WOW_REPUTATION_DATA = {
  "meta": {
    "totalFactions": 54,
    "newFactionsCount": 14,
    "ranks": [
      "Hated",
      "Hostile",
      "Unfriendly",
      "Neutral",
      "Friendly",
      "Honored",
      "Revered",
      "Exalted"
    ],
    "build": "1.60.1.70707",
    "updatedAt": "2026-11-02"
  },
  "factions": [
    {
      "id": 69,
      "name": "Darnassus",
      "desc": "The Alliance capital is populated by Night Elves and is located in the island of Teldrassil.  Ruled by the Priestess of the Moon, Tyrande Whisperwind.",
      "category": "Alliance",
      "side": "Alliance",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 54,
      "name": "Gnomeregan Exiles",
      "desc": "The former denizens of Gnomeregan, now living in exile in Ironforge and in league with the Alliance.",
      "category": "Alliance",
      "side": "Alliance",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 47,
      "name": "Ironforge",
      "desc": "This Alliance capital is the pride of the Dun Morogh dwarves.  Home to King Magni.",
      "category": "Alliance",
      "side": "Alliance",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 72,
      "name": "Stormwind",
      "desc": "One of the last bastions of human power, this Alliance capital is ruled by the child king, Anduin Wrynn.",
      "category": "Alliance",
      "side": "Alliance",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 890,
      "name": "Silverwing Sentinels",
      "desc": "Staunch defenders of Ashenvale, locked in battle against the Warsong Outriders in Warsong Gulch.",
      "category": "Alliance Forces",
      "side": "Alliance",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 730,
      "name": "Stormpike Guard",
      "desc": "The Stormpike Dwarves have set up residence in Alterac Valley, where they're locked in battle with the Frostwolf Orcs.",
      "category": "Alliance Forces",
      "side": "Alliance",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 509,
      "name": "The League of Arathor",
      "desc": "The League of Arathor seeks to reclaim lost land of Arathi Basin for their benefactors in Stormwind.",
      "category": "Alliance Forces",
      "side": "Alliance",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [
        {
          "name": "Samuel Hawke",
          "zone": "Arathi Highlands",
          "x": 46,
          "y": 45.2,
          "side": "Alliance"
        }
      ],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2799,
      "name": "Theramore Expeditionary Force",
      "desc": "Loyal partisans for their city, the Theramore Expeditionary Force battles the Darkspear Raiders for control of the so-called Darkspear Islands.",
      "category": "Alliance Forces",
      "side": "Alliance",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 530,
      "name": "Darkspear Trolls",
      "desc": "This tribe of exiled trolls has joined forces with Thrall and the Horde.  They now call Durotar their home, which they share with their orc allies.",
      "category": "Horde",
      "side": "Horde",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 76,
      "name": "Orgrimmar",
      "desc": "Founded by Thrall, this Horde capital city is home to many of the proud orc clans of Durotar.",
      "category": "Horde",
      "side": "Horde",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 81,
      "name": "Thunder Bluff",
      "desc": "Cairne Bloodhoof leads his people, the Proud Tauren, from this mighty Horde capital.",
      "category": "Horde",
      "side": "Horde",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 68,
      "name": "Undercity",
      "desc": "Led by Sylvanas Windrunner, the Forsaken have joined a tenuous alliance with the Horde and established this capital in the vast depths under the Ruins of Lordaeron.",
      "category": "Horde",
      "side": "Horde",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2798,
      "name": "Darkspear Raiders",
      "desc": "Loyal to the troll nation, the Darkspear Raiders battle the Theramore Expeditionary Force for control of their ancestral Darkspear Islands.",
      "category": "Horde Forces",
      "side": "Horde",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [
        {
          "name": "Creeg Bothunk",
          "zone": "The Barrens",
          "x": 65,
          "y": 34.6,
          "side": "Horde"
        }
      ],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 729,
      "name": "Frostwolf Clan",
      "desc": "The Frostwolf Clan seeks to drive out the dwarves of the Stormpike Expedition from Alterac Valley.",
      "category": "Horde Forces",
      "side": "Horde",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 510,
      "name": "The Defilers",
      "desc": "The Defilers seek to claim Arathi Basin's valuable resources for the Horde.",
      "category": "Horde Forces",
      "side": "Horde",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [
        {
          "name": "Rutherford Twing",
          "zone": "Arathi Highlands",
          "x": 73.4,
          "y": 29.7,
          "side": "Horde"
        }
      ],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 889,
      "name": "Warsong Outriders",
      "desc": "Fierce orcs of the Warsong Clan, locked in battle against the Silverwing Sentinels in Warsong Gulch.",
      "category": "Horde Forces",
      "side": "Horde",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 21,
      "name": "Booty Bay",
      "desc": "This booming coastal city is run by Baron Revilgaz of the Blackwater Raiders.  Mortal enemies of the Bloodsail Buccaneers and part of the Steamwheedle Cartel.",
      "category": "Steamwheedle Cartel",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 577,
      "name": "Everlook",
      "desc": "This trading post is run by the goblins of the Steamwheedle Cartel and it sits in the crossroads of Winterspring's main trade routes.",
      "category": "Steamwheedle Cartel",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 369,
      "name": "Gadgetzan",
      "desc": "Capital of the Steamwheedle Cartel and home to goblinhood's finest engineers, alchemists and merchants.",
      "category": "Steamwheedle Cartel",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2827,
      "name": "Powderfuse",
      "desc": "A strong arm of the Steamwheedle Cartel, this port is home to seafaring sailors and back-alley dealers spanning the eastern sea trading routes.",
      "category": "Steamwheedle Cartel",
      "side": "Neutral",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 470,
      "name": "Ratchet",
      "desc": "Part of the Steamwheedle Cartel, this goblin city provides a neutral haven for those that wish to trade goods and services in the Barrens.",
      "category": "Steamwheedle Cartel",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [
        {
          "name": "Winklespark",
          "zone": "The Barrens",
          "x": 62.5,
          "y": 37.6,
          "side": "Horde"
        }
      ],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 469,
      "name": "Alliance",
      "desc": "",
      "category": "Classic Era",
      "side": "Alliance",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 529,
      "name": "Argent Dawn",
      "desc": "An organization focused on protecting Azeroth from the threat of the Scourge.  Strongholds of the Argent Dawn can be found in the Eastern and Western Plaguelands.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [
        {
          "name": "Argent Quartermaster Lightspark",
          "zone": "Alterac Mountains",
          "x": 78.9,
          "y": 28.6
        },
        {
          "name": "Quartermaster Miranda Breechlock",
          "zone": "Eastern Plaguelands",
          "x": 71.8,
          "y": 50.2
        },
        {
          "name": "Argent Quartermaster Hasana",
          "zone": "Tirisfal Glades",
          "x": 83.3,
          "y": 68.1
        }
      ],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2586,
      "name": "Azeroth Commerce Authority",
      "desc": "Originally commissioned to facilitate trade across the Eastern Kingdoms, the ACA now maintains supply routes to Alliance forces worldwide.",
      "category": "Classic Era",
      "side": "Alliance",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [
        {
          "name": "Tamelyn Aldridge",
          "zone": "Redridge Mountains",
          "x": 10.7,
          "y": 71.3,
          "side": "Alliance"
        }
      ],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2747,
      "name": "Barkskin Burrow",
      "desc": "The Barkskin are among the few furbolg tribes untouched by corruption, and dedicate themselves to safeguarding their spiritual heritage to bring harmony back to Hyjal.",
      "category": "WoW Forever",
      "side": "Neutral",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 87,
      "name": "Bloodsail Buccaneers",
      "desc": "These bloodthirsty corsairs are the bane of many a merchant in the high seas.  Sworn enemies of Booty Bay.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2782,
      "name": "Bolder'ok Clan",
      "desc": "Exiled for betraying their false prophets, these former members of the Twilight's Hammer seek to forge their own path.",
      "category": "WoW Forever",
      "side": "Horde",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 910,
      "name": "Brood of Nozdormu",
      "desc": "The descendants of the Bronze Dragonflight are the guardians of time and care little for the mortal races.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2826,
      "name": "Brotherhood of the Horse",
      "desc": "Outcast members of Stormwind's cavalry, these former riders started anew in the unexplored lands along the eastern coast, establishing their home, new relationships, and trade routes.",
      "category": "WoW Forever",
      "side": "Alliance",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 609,
      "name": "Cenarion Circle",
      "desc": "The druids of Cenarion Circle are guardians of nature and make their home in tranquil Moonglade.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [
        {
          "name": "Kania",
          "zone": "Silithus",
          "x": 52,
          "y": 39.7
        },
        {
          "name": "Mishta",
          "zone": "Silithus",
          "x": 49.9,
          "y": 36.3
        }
      ],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2719,
      "name": "Cenarion Scouts",
      "desc": "The Cenarion Scouts are young nature enthusiasts dedicated to exploring and protecting the wilds of Azeroth.",
      "category": "WoW Forever",
      "side": "Neutral",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 909,
      "name": "Darkmoon Faire",
      "desc": "A traveling fair that showcases the weird and the extraordinary.  Often spotted in Elwynn Forest and Mulgore.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2587,
      "name": "Durotar Supply and Logistics",
      "desc": "The Horde's robust supply network fuels its rapid expansion across Kalimdor and beyond.",
      "category": "Classic Era",
      "side": "Horde",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [
        {
          "name": "Gishah",
          "zone": "The Barrens",
          "x": 49.4,
          "y": 29.4,
          "side": "Horde"
        }
      ],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2787,
      "name": "Earthen Ring",
      "desc": "The Earthen Ring is a loose collective of Horde-aligned shamans and druids who seek to maintain and nurture the balance of nature on Azeroth.",
      "category": "WoW Forever",
      "side": "Horde",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [
        {
          "name": "Sutara Plainstalker",
          "zone": "Mulgore",
          "x": 34.5,
          "y": 23,
          "side": "Horde"
        }
      ],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2641,
      "name": "Emerald Wardens",
      "desc": "A hastily-organized group of Druids, working with both the Alliance and the Horde to stop the Nightmare Incursions.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 92,
      "name": "Gelkis Clan Centaur",
      "desc": "These centaur have made their home in the southern region of Desolace.  Mortal enemies of the Magram Centaur.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2765,
      "name": "Guardians of Hyjal",
      "desc": "Charged with the protection and preservation of Mount Hyjal, this splinter faction of the Cenarion Circle welcomes any who are willing to push back the forces of evil.",
      "category": "WoW Forever",
      "side": "Neutral",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2779,
      "name": "High Order",
      "desc": "The High Order are the Skyborne descendants of the Highborne magisters of Eldre'Thalas. Having spent the past 10,000 years in the realm of Skywall, members of the High Order seek to reclaim the ancient arcane knowledge of their forebears.",
      "category": "WoW Forever",
      "side": "Alliance",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 67,
      "name": "Horde",
      "desc": "",
      "category": "Classic Era",
      "side": "Horde",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 749,
      "name": "Hydraxian Waterlords",
      "desc": "These elementals have made their home on the islands east of Azshara.  Sworn enemies of the armies of Ragnaros.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2740,
      "name": "Kirin Tor",
      "desc": "An elite cadre of the most powerful wizards in the world and the ruling conclave of magi that leads the magical nation of Dalaran.",
      "category": "WoW Forever",
      "side": "Alliance",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 93,
      "name": "Magram Clan Centaur",
      "desc": "These centaur have made their home in the eastern region of Desolace.  Mortal enemies of the Gelkis Centaur.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2758,
      "name": "Nightclaw Druids",
      "desc": "The secretive druids of the Shadowgale Forest. They operate independently, apart from any other faction on Zephras Isle.",
      "category": "WoW Forever",
      "side": "Neutral",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 630,
      "name": "Ravasaur Trainers",
      "desc": "The ravasaurs of Un'Goro Crater are incredibly deadly, but a few individuals have learned how to tame them.",
      "category": "Classic Era",
      "side": "Horde",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 349,
      "name": "Ravenholdt",
      "desc": "This guild of thieves and assassins welcomes only those of extraordinary prowess into its fold.  Sworn rivals of the Syndicate.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 809,
      "name": "Shen'dralar",
      "desc": "A remnant of the once powerful elves living in Dire Maul, yet still wise and knowledgeable about great secrets.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 70,
      "name": "Syndicate",
      "desc": "A primarily human criminal organization that operates mostly out of the Alterac Mountains and Hillsbrad Foothills.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2819,
      "name": "The Watchers",
      "desc": "An order of powerful jailers and marshals of night elf society. They stand vigilant to ensure that no threat can ever escape their extensive underground network of prisons.",
      "category": "WoW Forever",
      "side": "Neutral",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 59,
      "name": "Thorium Brotherhood",
      "desc": "The dwarves of the Thorium Brotherhood epitomize excellence in craftsmanship and are bent on unlocking the secrets of Blackrock Mountain.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 576,
      "name": "Timbermaw Hold",
      "desc": "As one of the last uncorrupted furbolg tribes, the Timbermaw seek to preserve their spiritual ways and end the suffering of their brethren.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [
        {
          "name": "Meilosh",
          "zone": "Moonglade",
          "x": 32.7,
          "y": 95.2
        }
      ],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 471,
      "name": "Wildhammer Clan",
      "desc": "Though not a part of the Alliance, the dwarves of Aerie Peak have opened their doors to it and hold the Horde as enemies.",
      "category": "Classic Era",
      "side": "Alliance",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 2778,
      "name": "Windshapers",
      "desc": "The Windshapers are shamanistic spiritual leaders of the Skyborne people on Zephras Isle. They honor the elements and seek to gain a better understanding of the nature of the elemental plane to protect the shen'dorei way of life within Skywall.",
      "category": "WoW Forever",
      "side": "Horde",
      "isNewInForever": true,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 589,
      "name": "Wintersaber Trainers",
      "desc": "This small group of reclusive night elves raises and trains wintersabers in the Winterspring area.",
      "category": "Classic Era",
      "side": "Alliance",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [],
      "rewardsCount": 0,
      "rewards": []
    },
    {
      "id": 270,
      "name": "Zandalar Tribe",
      "desc": "These trolls have come to Yojamba Isle in an effort to recruit help against the resurrected Blood God and his Atal'ai Priests in Zul'Gurub.",
      "category": "Classic Era",
      "side": "Neutral",
      "isNewInForever": false,
      "minLevel": 1,
      "quartermasters": [
        {
          "name": "Rin'wosho the Trader",
          "zone": "Stranglethorn Vale",
          "x": 15.1,
          "y": 16
        }
      ],
      "rewardsCount": 0,
      "rewards": []
    }
  ]
};
})();
