/**
 * WoW Forever Flight Master Network & Taxi Nodes Dataset (82 Nodes, 7 Forever Nodes)
 * Pure Data Layer — Loaded under index.html Data Layer
 */
(function () {
    'use strict';

    window.WOW_TRAVEL_DATA = {
      nodes: [
  {
    "id": 1,
    "name": "Northshire Abbey",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1453,
    "zone": "Stormwind City",
    "coords": {
      "x": 99.2,
      "y": 77.1
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": []
  },
  {
    "id": 2,
    "name": "Stormwind",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1453,
    "zone": "Stormwind City",
    "coords": {
      "x": 71.6,
      "y": 72.3
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 4,
        "toName": "Sentinel Hill",
        "toZone": "Westfall",
        "toSide": "Alliance",
        "yards": 2329,
        "copper": 110,
        "timeText": "1m 13s",
        "costText": "1s 10c"
      },
      {
        "toId": 5,
        "toName": "Lakeshire",
        "toZone": "Redridge Mountains",
        "toSide": "Alliance",
        "yards": 3380,
        "copper": 210,
        "timeText": "1m 46s",
        "costText": "2s 10c"
      },
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 7757,
        "copper": 50,
        "timeText": "4m 2s",
        "costText": "50c"
      },
      {
        "toId": 12,
        "toName": "Darkshire",
        "toZone": "Duskwood",
        "toSide": "Alliance",
        "yards": 3480,
        "copper": 330,
        "timeText": "1m 49s",
        "costText": "3s 30c"
      },
      {
        "toId": 19,
        "toName": "Booty Bay",
        "toZone": "Stranglethorn Vale",
        "toSide": "Alliance",
        "yards": 7318,
        "copper": 630,
        "timeText": "3m 49s",
        "costText": "6s 30c"
      },
      {
        "toId": 45,
        "toName": "Nethergarde Keep",
        "toZone": "Swamp of Sorrows",
        "toSide": "Alliance",
        "yards": 5282,
        "copper": 830,
        "timeText": "2m 45s",
        "costText": "8s 30c"
      },
      {
        "toId": 71,
        "toName": "Morgan's Vigil",
        "toZone": "Burning Steppes",
        "toSide": "Alliance",
        "yards": 4706,
        "copper": 830,
        "timeText": "2m 27s",
        "costText": "8s 30c"
      }
    ]
  },
  {
    "id": 3,
    "name": "Programmer Isle",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 0,
    "zone": "Eastern Kingdoms",
    "coords": {
      "x": 0,
      "y": 0
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": []
  },
  {
    "id": 4,
    "name": "Sentinel Hill",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1436,
    "zone": "Westfall",
    "coords": {
      "x": 56.6,
      "y": 52.7
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 2443,
        "copper": 110,
        "timeText": "1m 16s",
        "costText": "1s 10c"
      },
      {
        "toId": 5,
        "toName": "Lakeshire",
        "toZone": "Redridge Mountains",
        "toSide": "Alliance",
        "yards": 3890,
        "copper": 210,
        "timeText": "2m 2s",
        "costText": "2s 10c"
      },
      {
        "toId": 12,
        "toName": "Darkshire",
        "toZone": "Duskwood",
        "toSide": "Alliance",
        "yards": 2897,
        "copper": 330,
        "timeText": "1m 31s",
        "costText": "3s 30c"
      },
      {
        "toId": 19,
        "toName": "Booty Bay",
        "toZone": "Stranglethorn Vale",
        "toSide": "Alliance",
        "yards": 5561,
        "copper": 630,
        "timeText": "2m 54s",
        "costText": "6s 30c"
      }
    ]
  },
  {
    "id": 5,
    "name": "Lakeshire",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1433,
    "zone": "Redridge Mountains",
    "coords": {
      "x": 25.3,
      "y": 59
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 3374,
        "copper": 210,
        "timeText": "1m 45s",
        "costText": "2s 10c"
      },
      {
        "toId": 4,
        "toName": "Sentinel Hill",
        "toZone": "Westfall",
        "toSide": "Alliance",
        "yards": 4003,
        "copper": 110,
        "timeText": "2m 5s",
        "costText": "1s 10c"
      },
      {
        "toId": 12,
        "toName": "Darkshire",
        "toZone": "Duskwood",
        "toSide": "Alliance",
        "yards": 1812,
        "copper": 330,
        "timeText": "0m 57s",
        "costText": "3s 30c"
      },
      {
        "toId": 71,
        "toName": "Morgan's Vigil",
        "toZone": "Burning Steppes",
        "toSide": "Alliance",
        "yards": 1825,
        "copper": 830,
        "timeText": "0m 57s",
        "costText": "8s 30c"
      },
      {
        "toId": 3276,
        "toName": "Farholde Keep",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Alliance",
        "yards": 3962,
        "copper": 630,
        "timeText": "2m 4s",
        "costText": "6s 30c"
      }
    ]
  },
  {
    "id": 6,
    "name": "Ironforge",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1455,
    "zone": "Ironforge",
    "coords": {
      "x": 55.9,
      "y": 47.9
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 6310,
        "copper": 50,
        "timeText": "3m 17s",
        "costText": "50c"
      },
      {
        "toId": 7,
        "toName": "Menethil Harbor",
        "toZone": "Wetlands",
        "toSide": "Alliance",
        "yards": 3861,
        "copper": 330,
        "timeText": "2m 1s",
        "costText": "3s 30c"
      },
      {
        "toId": 8,
        "toName": "Thelsamar",
        "toZone": "Loch Modan",
        "toSide": "Alliance",
        "yards": 3037,
        "copper": 110,
        "timeText": "1m 35s",
        "costText": "1s 10c"
      },
      {
        "toId": 14,
        "toName": "Southshore",
        "toZone": "Hillsbrad Foothills",
        "toSide": "Alliance",
        "yards": 7938,
        "copper": 330,
        "timeText": "4m 8s",
        "costText": "3s 30c"
      },
      {
        "toId": 16,
        "toName": "Refuge Pointe",
        "toZone": "Arathi Highlands",
        "toSide": "Alliance",
        "yards": 7585,
        "copper": 530,
        "timeText": "3m 57s",
        "costText": "5s 30c"
      },
      {
        "toId": 43,
        "toName": "Aerie Peak",
        "toZone": "The Hinterlands",
        "toSide": "Alliance",
        "yards": 8941,
        "copper": 730,
        "timeText": "4m 39s",
        "costText": "7s 30c"
      },
      {
        "toId": 66,
        "toName": "Chillwind Camp",
        "toZone": "Alterac Mountains",
        "toSide": "Alliance",
        "yards": 8816,
        "copper": 1020,
        "timeText": "4m 36s",
        "costText": "10s 20c"
      },
      {
        "toId": 67,
        "toName": "Light's Hope Chapel",
        "toZone": "Eastern Plaguelands",
        "toSide": "Alliance",
        "yards": 10440,
        "copper": 1020,
        "timeText": "5m 26s",
        "costText": "10s 20c"
      },
      {
        "toId": 74,
        "toName": "Thorium Point",
        "toZone": "Searing Gorge",
        "toSide": "Alliance",
        "yards": 2594,
        "copper": 830,
        "timeText": "1m 21s",
        "costText": "8s 30c"
      }
    ]
  },
  {
    "id": 7,
    "name": "Menethil Harbor",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1437,
    "zone": "Wetlands",
    "coords": {
      "x": 9.5,
      "y": 59.7
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 2658,
        "copper": 330,
        "timeText": "1m 23s",
        "costText": "3s 30c"
      },
      {
        "toId": 8,
        "toName": "Thelsamar",
        "toZone": "Loch Modan",
        "toSide": "Alliance",
        "yards": 4877,
        "copper": 110,
        "timeText": "2m 32s",
        "costText": "1s 10c"
      },
      {
        "toId": 14,
        "toName": "Southshore",
        "toZone": "Hillsbrad Foothills",
        "toSide": "Alliance",
        "yards": 3215,
        "copper": 330,
        "timeText": "1m 40s",
        "costText": "3s 30c"
      },
      {
        "toId": 16,
        "toName": "Refuge Pointe",
        "toZone": "Arathi Highlands",
        "toSide": "Alliance",
        "yards": 3388,
        "copper": 530,
        "timeText": "1m 46s",
        "costText": "5s 30c"
      }
    ]
  },
  {
    "id": 8,
    "name": "Thelsamar",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1432,
    "zone": "Loch Modan",
    "coords": {
      "x": 33.9,
      "y": 50.8
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 3266,
        "copper": 110,
        "timeText": "1m 42s",
        "costText": "1s 10c"
      },
      {
        "toId": 7,
        "toName": "Menethil Harbor",
        "toZone": "Wetlands",
        "toSide": "Alliance",
        "yards": 4564,
        "copper": 330,
        "timeText": "2m 23s",
        "costText": "3s 30c"
      },
      {
        "toId": 16,
        "toName": "Refuge Pointe",
        "toZone": "Arathi Highlands",
        "toSide": "Alliance",
        "yards": 4902,
        "copper": 530,
        "timeText": "2m 33s",
        "costText": "5s 30c"
      },
      {
        "toId": 3276,
        "toName": "Farholde Keep",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Alliance",
        "yards": 5531,
        "copper": 630,
        "timeText": "2m 53s",
        "costText": "6s 30c"
      }
    ]
  },
  {
    "id": 9,
    "name": "Booty Bay",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1434,
    "zone": "Stranglethorn Vale",
    "coords": {
      "x": 30.1,
      "y": 72.9
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": []
  },
  {
    "id": 10,
    "name": "The Sepulcher",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1421,
    "zone": "Silverpine Forest",
    "coords": {
      "x": 45.6,
      "y": 42.4
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 11,
        "toName": "Undercity",
        "toZone": "Undercity",
        "toSide": "Horde",
        "yards": 3345,
        "copper": 110,
        "timeText": "1m 45s",
        "costText": "1s 10c"
      },
      {
        "toId": 13,
        "toName": "Tarren Mill",
        "toZone": "Alterac Mountains",
        "toSide": "Horde",
        "yards": 2868,
        "copper": 330,
        "timeText": "1m 30s",
        "costText": "3s 30c"
      }
    ]
  },
  {
    "id": 11,
    "name": "Undercity",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1458,
    "zone": "Undercity",
    "coords": {
      "x": 63.1,
      "y": 48.3
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 10,
        "toName": "The Sepulcher",
        "toZone": "Silverpine Forest",
        "toSide": "Horde",
        "yards": 3180,
        "copper": 110,
        "timeText": "1m 39s",
        "costText": "1s 10c"
      },
      {
        "toId": 13,
        "toName": "Tarren Mill",
        "toZone": "Alterac Mountains",
        "toSide": "Horde",
        "yards": 4222,
        "copper": 330,
        "timeText": "2m 12s",
        "costText": "3s 30c"
      },
      {
        "toId": 17,
        "toName": "Hammerfall",
        "toZone": "Arathi Highlands",
        "toSide": "Horde",
        "yards": 9014,
        "copper": 530,
        "timeText": "4m 42s",
        "costText": "5s 30c"
      },
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 14837,
        "copper": 630,
        "timeText": "7m 44s",
        "costText": "6s 30c"
      },
      {
        "toId": 68,
        "toName": "Light's Hope Chapel",
        "toZone": "Eastern Plaguelands",
        "toSide": "Horde",
        "yards": 7849,
        "copper": 1020,
        "timeText": "4m 5s",
        "costText": "10s 20c"
      },
      {
        "toId": 76,
        "toName": "Revantusk Village",
        "toZone": "The Hinterlands",
        "toSide": "Horde",
        "yards": 8530,
        "copper": 730,
        "timeText": "4m 27s",
        "costText": "7s 30c"
      }
    ]
  },
  {
    "id": 12,
    "name": "Darkshire",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1431,
    "zone": "Duskwood",
    "coords": {
      "x": 77.6,
      "y": 44.4
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 2629,
        "copper": 330,
        "timeText": "1m 22s",
        "costText": "3s 30c"
      },
      {
        "toId": 4,
        "toName": "Sentinel Hill",
        "toZone": "Westfall",
        "toSide": "Alliance",
        "yards": 2794,
        "copper": 110,
        "timeText": "1m 27s",
        "costText": "1s 10c"
      },
      {
        "toId": 5,
        "toName": "Lakeshire",
        "toZone": "Redridge Mountains",
        "toSide": "Alliance",
        "yards": 1787,
        "copper": 210,
        "timeText": "0m 56s",
        "costText": "2s 10c"
      },
      {
        "toId": 19,
        "toName": "Booty Bay",
        "toZone": "Stranglethorn Vale",
        "toSide": "Alliance",
        "yards": 5135,
        "copper": 630,
        "timeText": "2m 40s",
        "costText": "6s 30c"
      },
      {
        "toId": 45,
        "toName": "Nethergarde Keep",
        "toZone": "Swamp of Sorrows",
        "toSide": "Alliance",
        "yards": 2903,
        "copper": 830,
        "timeText": "1m 31s",
        "costText": "8s 30c"
      }
    ]
  },
  {
    "id": 13,
    "name": "Tarren Mill",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1416,
    "zone": "Alterac Mountains",
    "coords": {
      "x": 58.7,
      "y": 80.4
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 10,
        "toName": "The Sepulcher",
        "toZone": "Silverpine Forest",
        "toSide": "Horde",
        "yards": 2989,
        "copper": 110,
        "timeText": "1m 33s",
        "costText": "1s 10c"
      },
      {
        "toId": 11,
        "toName": "Undercity",
        "toZone": "Undercity",
        "toSide": "Horde",
        "yards": 4172,
        "copper": 330,
        "timeText": "2m 10s",
        "costText": "3s 30c"
      },
      {
        "toId": 17,
        "toName": "Hammerfall",
        "toZone": "Arathi Highlands",
        "toSide": "Horde",
        "yards": 3532,
        "copper": 530,
        "timeText": "1m 50s",
        "costText": "5s 30c"
      },
      {
        "toId": 76,
        "toName": "Revantusk Village",
        "toZone": "The Hinterlands",
        "toSide": "Horde",
        "yards": 5840,
        "copper": 730,
        "timeText": "3m 3s",
        "costText": "7s 30c"
      }
    ]
  },
  {
    "id": 14,
    "name": "Southshore",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1424,
    "zone": "Hillsbrad Foothills",
    "coords": {
      "x": 49.4,
      "y": 52.1
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 6174,
        "copper": 330,
        "timeText": "3m 13s",
        "costText": "3s 30c"
      },
      {
        "toId": 7,
        "toName": "Menethil Harbor",
        "toZone": "Wetlands",
        "toSide": "Alliance",
        "yards": 3304,
        "copper": 330,
        "timeText": "1m 43s",
        "costText": "3s 30c"
      },
      {
        "toId": 16,
        "toName": "Refuge Pointe",
        "toZone": "Arathi Highlands",
        "toSide": "Alliance",
        "yards": 2214,
        "copper": 530,
        "timeText": "1m 9s",
        "costText": "5s 30c"
      },
      {
        "toId": 43,
        "toName": "Aerie Peak",
        "toZone": "The Hinterlands",
        "toSide": "Alliance",
        "yards": 2139,
        "copper": 730,
        "timeText": "1m 7s",
        "costText": "7s 30c"
      },
      {
        "toId": 66,
        "toName": "Chillwind Camp",
        "toZone": "Alterac Mountains",
        "toSide": "Alliance",
        "yards": 2418,
        "copper": 830,
        "timeText": "1m 16s",
        "costText": "8s 30c"
      }
    ]
  },
  {
    "id": 15,
    "name": "Eastern Plaguelands",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 71.8,
      "y": 50.2
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": []
  },
  {
    "id": 16,
    "name": "Refuge Pointe",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1417,
    "zone": "Arathi Highlands",
    "coords": {
      "x": 45.8,
      "y": 46.1
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 8109,
        "copper": 530,
        "timeText": "4m 13s",
        "costText": "5s 30c"
      },
      {
        "toId": 7,
        "toName": "Menethil Harbor",
        "toZone": "Wetlands",
        "toSide": "Alliance",
        "yards": 3776,
        "copper": 330,
        "timeText": "1m 58s",
        "costText": "3s 30c"
      },
      {
        "toId": 8,
        "toName": "Thelsamar",
        "toZone": "Loch Modan",
        "toSide": "Alliance",
        "yards": 5113,
        "copper": 110,
        "timeText": "2m 40s",
        "costText": "1s 10c"
      },
      {
        "toId": 14,
        "toName": "Southshore",
        "toZone": "Hillsbrad Foothills",
        "toSide": "Alliance",
        "yards": 2596,
        "copper": 330,
        "timeText": "1m 21s",
        "costText": "3s 30c"
      },
      {
        "toId": 43,
        "toName": "Aerie Peak",
        "toZone": "The Hinterlands",
        "toSide": "Alliance",
        "yards": 2152,
        "copper": 730,
        "timeText": "1m 7s",
        "costText": "7s 30c"
      }
    ]
  },
  {
    "id": 17,
    "name": "Hammerfall",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1417,
    "zone": "Arathi Highlands",
    "coords": {
      "x": 73.1,
      "y": 32.6
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 11,
        "toName": "Undercity",
        "toZone": "Undercity",
        "toSide": "Horde",
        "yards": 7763,
        "copper": 530,
        "timeText": "4m 3s",
        "costText": "5s 30c"
      },
      {
        "toId": 13,
        "toName": "Tarren Mill",
        "toZone": "Alterac Mountains",
        "toSide": "Horde",
        "yards": 3493,
        "copper": 330,
        "timeText": "1m 49s",
        "costText": "3s 30c"
      },
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 7760,
        "copper": 630,
        "timeText": "4m 3s",
        "costText": "6s 30c"
      },
      {
        "toId": 76,
        "toName": "Revantusk Village",
        "toZone": "The Hinterlands",
        "toSide": "Horde",
        "yards": 2705,
        "copper": 730,
        "timeText": "1m 25s",
        "costText": "7s 30c"
      },
      {
        "toId": 3203,
        "toName": "Rog'mar",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Horde",
        "yards": 9767,
        "copper": 830,
        "timeText": "5m 5s",
        "costText": "8s 30c"
      }
    ]
  },
  {
    "id": 18,
    "name": "Booty Bay",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1434,
    "zone": "Stranglethorn Vale",
    "coords": {
      "x": 26.8,
      "y": 77
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 20,
        "toName": "Grom'gol",
        "toZone": "Stranglethorn Vale",
        "toSide": "Horde",
        "yards": 3047,
        "copper": 630,
        "timeText": "1m 35s",
        "costText": "6s 30c"
      },
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 12190,
        "copper": 630,
        "timeText": "6m 21s",
        "costText": "6s 30c"
      },
      {
        "toId": 56,
        "toName": "Stonard",
        "toZone": "Swamp of Sorrows",
        "toSide": "Horde",
        "yards": 7986,
        "copper": 630,
        "timeText": "4m 10s",
        "costText": "6s 30c"
      }
    ]
  },
  {
    "id": 19,
    "name": "Booty Bay",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1434,
    "zone": "Stranglethorn Vale",
    "coords": {
      "x": 27.5,
      "y": 77.7
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 6585,
        "copper": 630,
        "timeText": "3m 26s",
        "costText": "6s 30c"
      },
      {
        "toId": 4,
        "toName": "Sentinel Hill",
        "toZone": "Westfall",
        "toSide": "Alliance",
        "yards": 5439,
        "copper": 530,
        "timeText": "2m 50s",
        "costText": "5s 30c"
      },
      {
        "toId": 12,
        "toName": "Darkshire",
        "toZone": "Duskwood",
        "toSide": "Alliance",
        "yards": 5242,
        "copper": 330,
        "timeText": "2m 44s",
        "costText": "3s 30c"
      }
    ]
  },
  {
    "id": 20,
    "name": "Grom'gol",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1434,
    "zone": "Stranglethorn Vale",
    "coords": {
      "x": 32.5,
      "y": 29.3
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 18,
        "toName": "Booty Bay",
        "toZone": "Stranglethorn Vale",
        "toSide": "Horde",
        "yards": 2422,
        "copper": 630,
        "timeText": "1m 16s",
        "costText": "6s 30c"
      },
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 9802,
        "copper": 630,
        "timeText": "5m 6s",
        "costText": "6s 30c"
      },
      {
        "toId": 56,
        "toName": "Stonard",
        "toZone": "Swamp of Sorrows",
        "toSide": "Horde",
        "yards": 6151,
        "copper": 630,
        "timeText": "3m 12s",
        "costText": "6s 30c"
      }
    ]
  },
  {
    "id": 21,
    "name": "Kargath",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1418,
    "zone": "Badlands",
    "coords": {
      "x": 4.1,
      "y": 44.9
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 11,
        "toName": "Undercity",
        "toZone": "Undercity",
        "toSide": "Horde",
        "yards": 14918,
        "copper": 630,
        "timeText": "7m 46s",
        "costText": "6s 30c"
      },
      {
        "toId": 17,
        "toName": "Hammerfall",
        "toZone": "Arathi Highlands",
        "toSide": "Horde",
        "yards": 7881,
        "copper": 630,
        "timeText": "4m 6s",
        "costText": "6s 30c"
      },
      {
        "toId": 18,
        "toName": "Booty Bay",
        "toZone": "Stranglethorn Vale",
        "toSide": "Horde",
        "yards": 12493,
        "copper": 630,
        "timeText": "6m 30s",
        "costText": "6s 30c"
      },
      {
        "toId": 20,
        "toName": "Grom'gol",
        "toZone": "Stranglethorn Vale",
        "toSide": "Horde",
        "yards": 9376,
        "copper": 530,
        "timeText": "4m 53s",
        "costText": "5s 30c"
      },
      {
        "toId": 56,
        "toName": "Stonard",
        "toZone": "Swamp of Sorrows",
        "toSide": "Horde",
        "yards": 8424,
        "copper": 710,
        "timeText": "4m 23s",
        "costText": "7s 10c"
      },
      {
        "toId": 70,
        "toName": "Flame Crest",
        "toZone": "Burning Steppes",
        "toSide": "Horde",
        "yards": 2593,
        "copper": 830,
        "timeText": "1m 21s",
        "costText": "8s 30c"
      },
      {
        "toId": 75,
        "toName": "Thorium Point",
        "toZone": "Searing Gorge",
        "toSide": "Horde",
        "yards": 1682,
        "copper": 830,
        "timeText": "0m 53s",
        "costText": "8s 30c"
      },
      {
        "toId": 3203,
        "toName": "Rog'mar",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Horde",
        "yards": 3821,
        "copper": 630,
        "timeText": "1m 59s",
        "costText": "6s 30c"
      }
    ]
  },
  {
    "id": 22,
    "name": "Thunder Bluff",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1456,
    "zone": "Thunder Bluff",
    "coords": {
      "x": 46.7,
      "y": 49.9
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 6213,
        "copper": 50,
        "timeText": "3m 14s",
        "costText": "50c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 4752,
        "copper": 110,
        "timeText": "2m 29s",
        "costText": "1s 10c"
      },
      {
        "toId": 29,
        "toName": "Sun Rock Retreat",
        "toZone": "Stonetalon Mountains",
        "toSide": "Horde",
        "yards": 5439,
        "copper": 210,
        "timeText": "2m 50s",
        "costText": "2s 10c"
      },
      {
        "toId": 30,
        "toName": "Freewind Post",
        "toZone": "Thousand Needles",
        "toSide": "Horde",
        "yards": 6113,
        "copper": 430,
        "timeText": "3m 11s",
        "costText": "4s 30c"
      },
      {
        "toId": 38,
        "toName": "Shadowprey Village",
        "toZone": "Desolace",
        "toSide": "Horde",
        "yards": 4752,
        "copper": 530,
        "timeText": "2m 29s",
        "costText": "5s 30c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 8693,
        "copper": 730,
        "timeText": "4m 32s",
        "costText": "7s 30c"
      },
      {
        "toId": 42,
        "toName": "Camp Mojache",
        "toZone": "Feralas",
        "toSide": "Horde",
        "yards": 7563,
        "copper": 730,
        "timeText": "3m 56s",
        "costText": "7s 30c"
      },
      {
        "toId": 44,
        "toName": "Valormok",
        "toZone": "Azshara",
        "toSide": "Horde",
        "yards": 8070,
        "copper": 830,
        "timeText": "4m 12s",
        "costText": "8s 30c"
      },
      {
        "toId": 55,
        "toName": "Brackenwall Village",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 7149,
        "copper": 630,
        "timeText": "3m 43s",
        "costText": "6s 30c"
      },
      {
        "toId": 77,
        "toName": "Camp Taurajo",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 2599,
        "copper": 110,
        "timeText": "1m 21s",
        "costText": "1s 10c"
      }
    ]
  },
  {
    "id": 23,
    "name": "Orgrimmar",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1454,
    "zone": "Orgrimmar",
    "coords": {
      "x": 45.3,
      "y": 63.7
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 6745,
        "copper": 50,
        "timeText": "3m 31s",
        "costText": "50c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 3304,
        "copper": 110,
        "timeText": "1m 43s",
        "costText": "1s 10c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 12500,
        "copper": 730,
        "timeText": "6m 31s",
        "costText": "7s 30c"
      },
      {
        "toId": 44,
        "toName": "Valormok",
        "toZone": "Azshara",
        "toSide": "Horde",
        "yards": 2965,
        "copper": 830,
        "timeText": "1m 33s",
        "costText": "8s 30c"
      },
      {
        "toId": 48,
        "toName": "Bloodvenom Post",
        "toZone": "Felwood",
        "toSide": "Horde",
        "yards": 7558,
        "copper": 830,
        "timeText": "3m 56s",
        "costText": "8s 30c"
      },
      {
        "toId": 53,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Horde",
        "yards": 9582,
        "copper": 1020,
        "timeText": "4m 59s",
        "costText": "10s 20c"
      },
      {
        "toId": 55,
        "toName": "Brackenwall Village",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 6853,
        "copper": 630,
        "timeText": "3m 34s",
        "costText": "6s 30c"
      },
      {
        "toId": 61,
        "toName": "Splintertree Post",
        "toZone": "Ashenvale",
        "toSide": "Horde",
        "yards": 2680,
        "copper": 530,
        "timeText": "1m 24s",
        "costText": "5s 30c"
      }
    ]
  },
  {
    "id": 25,
    "name": "Crossroads",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1413,
    "zone": "The Barrens",
    "coords": {
      "x": 51.5,
      "y": 30.4
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 5461,
        "copper": 110,
        "timeText": "2m 51s",
        "costText": "1s 10c"
      },
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 4252,
        "copper": 110,
        "timeText": "2m 13s",
        "costText": "1s 10c"
      },
      {
        "toId": 29,
        "toName": "Sun Rock Retreat",
        "toZone": "Stonetalon Mountains",
        "toSide": "Horde",
        "yards": 4495,
        "copper": 210,
        "timeText": "2m 20s",
        "costText": "2s 10c"
      },
      {
        "toId": 30,
        "toName": "Freewind Post",
        "toZone": "Thousand Needles",
        "toSide": "Horde",
        "yards": 5532,
        "copper": 430,
        "timeText": "2m 53s",
        "costText": "4s 30c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 9093,
        "copper": 730,
        "timeText": "4m 44s",
        "costText": "7s 30c"
      },
      {
        "toId": 42,
        "toName": "Camp Mojache",
        "toZone": "Feralas",
        "toSide": "Horde",
        "yards": 7547,
        "copper": 730,
        "timeText": "3m 56s",
        "costText": "7s 30c"
      },
      {
        "toId": 44,
        "toName": "Valormok",
        "toZone": "Azshara",
        "toSide": "Horde",
        "yards": 5051,
        "copper": 830,
        "timeText": "2m 38s",
        "costText": "8s 30c"
      },
      {
        "toId": 48,
        "toName": "Bloodvenom Post",
        "toZone": "Felwood",
        "toSide": "Horde",
        "yards": 7603,
        "copper": 930,
        "timeText": "3m 58s",
        "costText": "9s 30c"
      },
      {
        "toId": 55,
        "toName": "Brackenwall Village",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 4878,
        "copper": 630,
        "timeText": "2m 32s",
        "costText": "6s 30c"
      },
      {
        "toId": 58,
        "toName": "Zoram'gar Outpost",
        "toZone": "Ashenvale",
        "toSide": "Horde",
        "yards": 6902,
        "copper": 330,
        "timeText": "3m 36s",
        "costText": "3s 30c"
      },
      {
        "toId": 61,
        "toName": "Splintertree Post",
        "toZone": "Ashenvale",
        "toSide": "Horde",
        "yards": 4871,
        "copper": 530,
        "timeText": "2m 32s",
        "costText": "5s 30c"
      },
      {
        "toId": 77,
        "toName": "Camp Taurajo",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 2705,
        "copper": 110,
        "timeText": "1m 25s",
        "costText": "1s 10c"
      },
      {
        "toId": 80,
        "toName": "Ratchet",
        "toZone": "Durotar",
        "toSide": "Neutral",
        "yards": 1545,
        "copper": 110,
        "timeText": "0m 48s",
        "costText": "1s 10c"
      }
    ]
  },
  {
    "id": 26,
    "name": "Auberdine",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1439,
    "zone": "Darkshore",
    "coords": {
      "x": 36.4,
      "y": 45.6
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 27,
        "toName": "Rut'theran Village",
        "toZone": "Teldrassil",
        "toSide": "Alliance",
        "yards": 2525,
        "copper": 0,
        "timeText": "1m 19s",
        "costText": "0c"
      },
      {
        "toId": 28,
        "toName": "Astranaar",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 5270,
        "copper": 330,
        "timeText": "2m 45s",
        "costText": "3s 30c"
      },
      {
        "toId": 32,
        "toName": "Theramore",
        "toZone": "Dustwallow Marsh",
        "toSide": "Alliance",
        "yards": 20225,
        "copper": 630,
        "timeText": "10m 32s",
        "costText": "6s 30c"
      },
      {
        "toId": 33,
        "toName": "Stonetalon Peak",
        "toZone": "Stonetalon Mountains",
        "toSide": "Alliance",
        "yards": 5432,
        "copper": 330,
        "timeText": "2m 50s",
        "costText": "3s 30c"
      },
      {
        "toId": 37,
        "toName": "Nijel's Point",
        "toZone": "Desolace",
        "toSide": "Alliance",
        "yards": 8723,
        "copper": 530,
        "timeText": "4m 33s",
        "costText": "5s 30c"
      },
      {
        "toId": 41,
        "toName": "Feathermoon",
        "toZone": "Feralas",
        "toSide": "Alliance",
        "yards": 14168,
        "copper": 730,
        "timeText": "7m 23s",
        "costText": "7s 30c"
      },
      {
        "toId": 49,
        "toName": "Moonglade",
        "toZone": "Moonglade",
        "toSide": "Alliance",
        "yards": 4525,
        "copper": 830,
        "timeText": "2m 21s",
        "costText": "8s 30c"
      },
      {
        "toId": 64,
        "toName": "Talrendis Point",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 8981,
        "copper": 730,
        "timeText": "4m 41s",
        "costText": "7s 30c"
      },
      {
        "toId": 65,
        "toName": "Talonbranch Glade",
        "toZone": "Mount Hyjal",
        "toSide": "Alliance",
        "yards": 5682,
        "copper": 730,
        "timeText": "2m 58s",
        "costText": "7s 30c"
      }
    ]
  },
  {
    "id": 27,
    "name": "Rut'theran Village",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1438,
    "zone": "Teldrassil",
    "coords": {
      "x": 58.4,
      "y": 93.9
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 2551,
        "copper": 0,
        "timeText": "1m 20s",
        "costText": "0c"
      }
    ]
  },
  {
    "id": 28,
    "name": "Astranaar",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1440,
    "zone": "Ashenvale",
    "coords": {
      "x": 34.5,
      "y": 48
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 4426,
        "copper": 330,
        "timeText": "2m 18s",
        "costText": "3s 30c"
      },
      {
        "toId": 33,
        "toName": "Stonetalon Peak",
        "toZone": "Stonetalon Mountains",
        "toSide": "Alliance",
        "yards": 4599,
        "copper": 330,
        "timeText": "2m 24s",
        "costText": "3s 30c"
      },
      {
        "toId": 64,
        "toName": "Talrendis Point",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 4428,
        "copper": 730,
        "timeText": "2m 18s",
        "costText": "7s 30c"
      }
    ]
  },
  {
    "id": 29,
    "name": "Sun Rock Retreat",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1442,
    "zone": "Stonetalon Mountains",
    "coords": {
      "x": 45.2,
      "y": 59.9
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 5227,
        "copper": 210,
        "timeText": "2m 43s",
        "costText": "2s 10c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 4477,
        "copper": 210,
        "timeText": "2m 20s",
        "costText": "2s 10c"
      },
      {
        "toId": 38,
        "toName": "Shadowprey Village",
        "toZone": "Desolace",
        "toSide": "Horde",
        "yards": 4297,
        "copper": 530,
        "timeText": "2m 14s",
        "costText": "5s 30c"
      }
    ]
  },
  {
    "id": 30,
    "name": "Freewind Post",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1441,
    "zone": "Thousand Needles",
    "coords": {
      "x": 45,
      "y": 49.1
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 6764,
        "copper": 430,
        "timeText": "3m 31s",
        "costText": "4s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 5810,
        "copper": 430,
        "timeText": "3m 2s",
        "costText": "4s 30c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 2782,
        "copper": 730,
        "timeText": "1m 27s",
        "costText": "7s 30c"
      },
      {
        "toId": 42,
        "toName": "Camp Mojache",
        "toZone": "Feralas",
        "toSide": "Horde",
        "yards": 3685,
        "copper": 730,
        "timeText": "1m 55s",
        "costText": "7s 30c"
      },
      {
        "toId": 77,
        "toName": "Camp Taurajo",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 4111,
        "copper": 430,
        "timeText": "2m 8s",
        "costText": "4s 30c"
      }
    ]
  },
  {
    "id": 31,
    "name": "Thalanaar",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1441,
    "zone": "Thousand Needles",
    "coords": {
      "x": 7.8,
      "y": 17.9
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 32,
        "toName": "Theramore",
        "toZone": "Dustwallow Marsh",
        "toSide": "Alliance",
        "yards": 4780,
        "copper": 730,
        "timeText": "2m 29s",
        "costText": "7s 30c"
      },
      {
        "toId": 39,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Alliance",
        "yards": 5122,
        "copper": 730,
        "timeText": "2m 40s",
        "costText": "7s 30c"
      },
      {
        "toId": 41,
        "toName": "Feathermoon",
        "toZone": "Feralas",
        "toSide": "Alliance",
        "yards": 5335,
        "copper": 630,
        "timeText": "2m 47s",
        "costText": "6s 30c"
      }
    ]
  },
  {
    "id": 32,
    "name": "Theramore",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1445,
    "zone": "Dustwallow Marsh",
    "coords": {
      "x": 67.5,
      "y": 51.2
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 18633,
        "copper": 630,
        "timeText": "9m 42s",
        "costText": "6s 30c"
      },
      {
        "toId": 31,
        "toName": "Thalanaar",
        "toZone": "Thousand Needles",
        "toSide": "Alliance",
        "yards": 4887,
        "copper": 430,
        "timeText": "2m 33s",
        "costText": "4s 30c"
      },
      {
        "toId": 37,
        "toName": "Nijel's Point",
        "toZone": "Desolace",
        "toSide": "Alliance",
        "yards": 10017,
        "copper": 530,
        "timeText": "5m 13s",
        "costText": "5s 30c"
      },
      {
        "toId": 39,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Alliance",
        "yards": 4694,
        "copper": 730,
        "timeText": "2m 27s",
        "costText": "7s 30c"
      },
      {
        "toId": 64,
        "toName": "Talrendis Point",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 7052,
        "copper": 730,
        "timeText": "3m 40s",
        "costText": "7s 30c"
      },
      {
        "toId": 80,
        "toName": "Ratchet",
        "toZone": "Durotar",
        "toSide": "Neutral",
        "yards": 3446,
        "copper": 110,
        "timeText": "1m 48s",
        "costText": "1s 10c"
      }
    ]
  },
  {
    "id": 33,
    "name": "Stonetalon Peak",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1442,
    "zone": "Stonetalon Mountains",
    "coords": {
      "x": 36.5,
      "y": 7.2
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 5304,
        "copper": 330,
        "timeText": "2m 46s",
        "costText": "3s 30c"
      },
      {
        "toId": 28,
        "toName": "Astranaar",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 4613,
        "copper": 330,
        "timeText": "2m 24s",
        "costText": "3s 30c"
      },
      {
        "toId": 37,
        "toName": "Nijel's Point",
        "toZone": "Desolace",
        "toSide": "Alliance",
        "yards": 3803,
        "copper": 530,
        "timeText": "1m 59s",
        "costText": "5s 30c"
      }
    ]
  },
  {
    "id": 37,
    "name": "Nijel's Point",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1443,
    "zone": "Desolace",
    "coords": {
      "x": 64.7,
      "y": 10.4
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 8458,
        "copper": 530,
        "timeText": "4m 24s",
        "costText": "5s 30c"
      },
      {
        "toId": 32,
        "toName": "Theramore",
        "toZone": "Dustwallow Marsh",
        "toSide": "Alliance",
        "yards": 9202,
        "copper": 530,
        "timeText": "4m 48s",
        "costText": "5s 30c"
      },
      {
        "toId": 33,
        "toName": "Stonetalon Peak",
        "toZone": "Stonetalon Mountains",
        "toSide": "Alliance",
        "yards": 3581,
        "copper": 330,
        "timeText": "1m 52s",
        "costText": "3s 30c"
      },
      {
        "toId": 41,
        "toName": "Feathermoon",
        "toZone": "Feralas",
        "toSide": "Alliance",
        "yards": 6949,
        "copper": 730,
        "timeText": "3m 37s",
        "costText": "7s 30c"
      }
    ]
  },
  {
    "id": 38,
    "name": "Shadowprey Village",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1443,
    "zone": "Desolace",
    "coords": {
      "x": 21.6,
      "y": 74
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 5331,
        "copper": 530,
        "timeText": "2m 47s",
        "costText": "5s 30c"
      },
      {
        "toId": 29,
        "toName": "Sun Rock Retreat",
        "toZone": "Stonetalon Mountains",
        "toSide": "Horde",
        "yards": 5966,
        "copper": 210,
        "timeText": "3m 6s",
        "costText": "2s 10c"
      },
      {
        "toId": 42,
        "toName": "Camp Mojache",
        "toZone": "Feralas",
        "toSide": "Horde",
        "yards": 5873,
        "copper": 730,
        "timeText": "3m 4s",
        "costText": "7s 30c"
      }
    ]
  },
  {
    "id": 39,
    "name": "Gadgetzan",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1446,
    "zone": "Tanaris",
    "coords": {
      "x": 51,
      "y": 29.3
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 31,
        "toName": "Thalanaar",
        "toZone": "Thousand Needles",
        "toSide": "Alliance",
        "yards": 5304,
        "copper": 430,
        "timeText": "2m 46s",
        "costText": "4s 30c"
      },
      {
        "toId": 32,
        "toName": "Theramore",
        "toZone": "Dustwallow Marsh",
        "toSide": "Alliance",
        "yards": 4606,
        "copper": 630,
        "timeText": "2m 24s",
        "costText": "6s 30c"
      },
      {
        "toId": 73,
        "toName": "Cenarion Hold",
        "toZone": "Silithus",
        "toSide": "Alliance",
        "yards": 5907,
        "copper": 1020,
        "timeText": "3m 5s",
        "costText": "10s 20c"
      },
      {
        "toId": 79,
        "toName": "Marshal's Refuge",
        "toZone": "Un'Goro Crater",
        "toSide": "Neutral",
        "yards": 3115,
        "copper": 830,
        "timeText": "1m 37s",
        "costText": "8s 30c"
      }
    ]
  },
  {
    "id": 40,
    "name": "Gadgetzan",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1446,
    "zone": "Tanaris",
    "coords": {
      "x": 51.6,
      "y": 25.5
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 9107,
        "copper": 730,
        "timeText": "4m 45s",
        "costText": "7s 30c"
      },
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 10495,
        "copper": 730,
        "timeText": "5m 28s",
        "costText": "7s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 9008,
        "copper": 730,
        "timeText": "4m 42s",
        "costText": "7s 30c"
      },
      {
        "toId": 30,
        "toName": "Freewind Post",
        "toZone": "Thousand Needles",
        "toSide": "Horde",
        "yards": 2602,
        "copper": 430,
        "timeText": "1m 21s",
        "costText": "4s 30c"
      },
      {
        "toId": 42,
        "toName": "Camp Mojache",
        "toZone": "Feralas",
        "toSide": "Horde",
        "yards": 5973,
        "copper": 630,
        "timeText": "3m 7s",
        "costText": "6s 30c"
      },
      {
        "toId": 55,
        "toName": "Brackenwall Village",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 6647,
        "copper": 630,
        "timeText": "3m 28s",
        "costText": "6s 30c"
      },
      {
        "toId": 72,
        "toName": "Cenarion Hold",
        "toZone": "Silithus",
        "toSide": "Horde",
        "yards": 6976,
        "copper": 1020,
        "timeText": "3m 38s",
        "costText": "10s 20c"
      },
      {
        "toId": 79,
        "toName": "Marshal's Refuge",
        "toZone": "Un'Goro Crater",
        "toSide": "Neutral",
        "yards": 3218,
        "copper": 830,
        "timeText": "1m 41s",
        "costText": "8s 30c"
      }
    ]
  },
  {
    "id": 41,
    "name": "Feathermoon",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1444,
    "zone": "Feralas",
    "coords": {
      "x": 30.3,
      "y": 43.3
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 14014,
        "copper": 730,
        "timeText": "7m 18s",
        "costText": "7s 30c"
      },
      {
        "toId": 31,
        "toName": "Thalanaar",
        "toZone": "Thousand Needles",
        "toSide": "Alliance",
        "yards": 4635,
        "copper": 430,
        "timeText": "2m 25s",
        "costText": "4s 30c"
      },
      {
        "toId": 37,
        "toName": "Nijel's Point",
        "toZone": "Desolace",
        "toSide": "Alliance",
        "yards": 6797,
        "copper": 730,
        "timeText": "3m 32s",
        "costText": "7s 30c"
      },
      {
        "toId": 73,
        "toName": "Cenarion Hold",
        "toZone": "Silithus",
        "toSide": "Alliance",
        "yards": 4774,
        "copper": 1030,
        "timeText": "2m 29s",
        "costText": "10s 30c"
      }
    ]
  },
  {
    "id": 42,
    "name": "Camp Mojache",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1444,
    "zone": "Feralas",
    "coords": {
      "x": 75.4,
      "y": 44.3
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 7777,
        "copper": 730,
        "timeText": "4m 3s",
        "costText": "7s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 7915,
        "copper": 730,
        "timeText": "4m 7s",
        "costText": "7s 30c"
      },
      {
        "toId": 30,
        "toName": "Freewind Post",
        "toZone": "Thousand Needles",
        "toSide": "Horde",
        "yards": 3215,
        "copper": 430,
        "timeText": "1m 40s",
        "costText": "4s 30c"
      },
      {
        "toId": 38,
        "toName": "Shadowprey Village",
        "toZone": "Desolace",
        "toSide": "Horde",
        "yards": 6016,
        "copper": 730,
        "timeText": "3m 8s",
        "costText": "7s 30c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 6024,
        "copper": 630,
        "timeText": "3m 8s",
        "costText": "6s 30c"
      },
      {
        "toId": 72,
        "toName": "Cenarion Hold",
        "toZone": "Silithus",
        "toSide": "Horde",
        "yards": 3897,
        "copper": 1030,
        "timeText": "2m 2s",
        "costText": "10s 30c"
      }
    ]
  },
  {
    "id": 43,
    "name": "Aerie Peak",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1425,
    "zone": "The Hinterlands",
    "coords": {
      "x": 11.1,
      "y": 46.1
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 7658,
        "copper": 730,
        "timeText": "3m 59s",
        "costText": "7s 30c"
      },
      {
        "toId": 14,
        "toName": "Southshore",
        "toZone": "Hillsbrad Foothills",
        "toSide": "Alliance",
        "yards": 2039,
        "copper": 330,
        "timeText": "1m 4s",
        "costText": "3s 30c"
      },
      {
        "toId": 16,
        "toName": "Refuge Pointe",
        "toZone": "Arathi Highlands",
        "toSide": "Alliance",
        "yards": 2267,
        "copper": 530,
        "timeText": "1m 11s",
        "costText": "5s 30c"
      },
      {
        "toId": 66,
        "toName": "Chillwind Camp",
        "toZone": "Alterac Mountains",
        "toSide": "Alliance",
        "yards": 1590,
        "copper": 1020,
        "timeText": "0m 50s",
        "costText": "10s 20c"
      },
      {
        "toId": 67,
        "toName": "Light's Hope Chapel",
        "toZone": "Eastern Plaguelands",
        "toSide": "Alliance",
        "yards": 4922,
        "copper": 1020,
        "timeText": "2m 34s",
        "costText": "10s 20c"
      }
    ]
  },
  {
    "id": 44,
    "name": "Valormok",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1447,
    "zone": "Azshara",
    "coords": {
      "x": 22,
      "y": 49.7
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 7700,
        "copper": 830,
        "timeText": "4m 1s",
        "costText": "8s 30c"
      },
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 3622,
        "copper": 830,
        "timeText": "1m 53s",
        "costText": "8s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 5163,
        "copper": 830,
        "timeText": "2m 41s",
        "costText": "8s 30c"
      },
      {
        "toId": 48,
        "toName": "Bloodvenom Post",
        "toZone": "Felwood",
        "toSide": "Horde",
        "yards": 6955,
        "copper": 930,
        "timeText": "3m 37s",
        "costText": "9s 30c"
      },
      {
        "toId": 53,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Horde",
        "yards": 3905,
        "copper": 1020,
        "timeText": "2m 2s",
        "costText": "10s 20c"
      },
      {
        "toId": 61,
        "toName": "Splintertree Post",
        "toZone": "Ashenvale",
        "toSide": "Horde",
        "yards": 2795,
        "copper": 530,
        "timeText": "1m 27s",
        "costText": "5s 30c"
      }
    ]
  },
  {
    "id": 45,
    "name": "Nethergarde Keep",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1435,
    "zone": "Swamp of Sorrows",
    "coords": {
      "x": 52.9,
      "y": 97.5
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 5672,
        "copper": 830,
        "timeText": "2m 57s",
        "costText": "8s 30c"
      },
      {
        "toId": 12,
        "toName": "Darkshire",
        "toZone": "Duskwood",
        "toSide": "Alliance",
        "yards": 2748,
        "copper": 330,
        "timeText": "1m 26s",
        "costText": "3s 30c"
      },
      {
        "toId": 71,
        "toName": "Morgan's Vigil",
        "toZone": "Burning Steppes",
        "toSide": "Alliance",
        "yards": 6251,
        "copper": 830,
        "timeText": "3m 15s",
        "costText": "8s 30c"
      }
    ]
  },
  {
    "id": 48,
    "name": "Bloodvenom Post",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1448,
    "zone": "Felwood",
    "coords": {
      "x": 34.4,
      "y": 53.9
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 7747,
        "copper": 930,
        "timeText": "4m 2s",
        "costText": "9s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 7227,
        "copper": 930,
        "timeText": "3m 46s",
        "costText": "9s 30c"
      },
      {
        "toId": 44,
        "toName": "Valormok",
        "toZone": "Azshara",
        "toSide": "Horde",
        "yards": 7221,
        "copper": 830,
        "timeText": "3m 46s",
        "costText": "8s 30c"
      },
      {
        "toId": 53,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Horde",
        "yards": 5700,
        "copper": 1020,
        "timeText": "2m 58s",
        "costText": "10s 20c"
      },
      {
        "toId": 69,
        "toName": "Moonglade",
        "toZone": "Moonglade",
        "toSide": "Horde",
        "yards": 4947,
        "copper": 830,
        "timeText": "2m 35s",
        "costText": "8s 30c"
      }
    ]
  },
  {
    "id": 49,
    "name": "Moonglade",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1450,
    "zone": "Moonglade",
    "coords": {
      "x": 47.9,
      "y": 67.1
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 4247,
        "copper": 830,
        "timeText": "2m 13s",
        "costText": "8s 30c"
      },
      {
        "toId": 52,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Alliance",
        "yards": 3900,
        "copper": 1020,
        "timeText": "2m 2s",
        "costText": "10s 20c"
      },
      {
        "toId": 65,
        "toName": "Talonbranch Glade",
        "toZone": "Mount Hyjal",
        "toSide": "Alliance",
        "yards": 1840,
        "copper": 730,
        "timeText": "0m 58s",
        "costText": "7s 30c"
      }
    ]
  },
  {
    "id": 52,
    "name": "Everlook",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1452,
    "zone": "Winterspring",
    "coords": {
      "x": 62.3,
      "y": 36.6
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 49,
        "toName": "Moonglade",
        "toZone": "Moonglade",
        "toSide": "Alliance",
        "yards": 3639,
        "copper": 830,
        "timeText": "1m 54s",
        "costText": "8s 30c"
      },
      {
        "toId": 64,
        "toName": "Talrendis Point",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 5265,
        "copper": 730,
        "timeText": "2m 45s",
        "costText": "7s 30c"
      },
      {
        "toId": 65,
        "toName": "Talonbranch Glade",
        "toZone": "Mount Hyjal",
        "toSide": "Alliance",
        "yards": 3670,
        "copper": 730,
        "timeText": "1m 55s",
        "costText": "7s 30c"
      },
      {
        "toId": 3242,
        "toName": "Tainted Foothills",
        "toZone": "Mount Hyjal",
        "toSide": "Neutral",
        "yards": 4057,
        "copper": 330,
        "timeText": "2m 7s",
        "costText": "3s 30c"
      }
    ]
  },
  {
    "id": 53,
    "name": "Everlook",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1452,
    "zone": "Winterspring",
    "coords": {
      "x": 60.5,
      "y": 36.3
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 9115,
        "copper": 1020,
        "timeText": "4m 45s",
        "costText": "10s 20c"
      },
      {
        "toId": 44,
        "toName": "Valormok",
        "toZone": "Azshara",
        "toSide": "Horde",
        "yards": 4078,
        "copper": 830,
        "timeText": "2m 7s",
        "costText": "8s 30c"
      },
      {
        "toId": 48,
        "toName": "Bloodvenom Post",
        "toZone": "Felwood",
        "toSide": "Horde",
        "yards": 5853,
        "copper": 930,
        "timeText": "3m 3s",
        "costText": "9s 30c"
      },
      {
        "toId": 69,
        "toName": "Moonglade",
        "toZone": "Moonglade",
        "toSide": "Horde",
        "yards": 4016,
        "copper": 830,
        "timeText": "2m 6s",
        "costText": "8s 30c"
      },
      {
        "toId": 3242,
        "toName": "Tainted Foothills",
        "toZone": "Mount Hyjal",
        "toSide": "Neutral",
        "yards": 4078,
        "copper": 330,
        "timeText": "2m 7s",
        "costText": "3s 30c"
      }
    ]
  },
  {
    "id": 55,
    "name": "Brackenwall Village",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1413,
    "zone": "The Barrens",
    "coords": {
      "x": 53.9,
      "y": 70.5
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 6729,
        "copper": 630,
        "timeText": "3m 30s",
        "costText": "6s 30c"
      },
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 6496,
        "copper": 630,
        "timeText": "3m 23s",
        "costText": "6s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 4848,
        "copper": 630,
        "timeText": "2m 32s",
        "costText": "6s 30c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 6660,
        "copper": 730,
        "timeText": "3m 28s",
        "costText": "7s 30c"
      }
    ]
  },
  {
    "id": 56,
    "name": "Stonard",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1435,
    "zone": "Swamp of Sorrows",
    "coords": {
      "x": 46.1,
      "y": 54.7
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 18,
        "toName": "Booty Bay",
        "toZone": "Stranglethorn Vale",
        "toSide": "Horde",
        "yards": 7798,
        "copper": 630,
        "timeText": "4m 4s",
        "costText": "6s 30c"
      },
      {
        "toId": 20,
        "toName": "Grom'gol",
        "toZone": "Stranglethorn Vale",
        "toSide": "Horde",
        "yards": 5646,
        "copper": 630,
        "timeText": "2m 56s",
        "costText": "6s 30c"
      },
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 8555,
        "copper": 630,
        "timeText": "4m 27s",
        "costText": "6s 30c"
      },
      {
        "toId": 70,
        "toName": "Flame Crest",
        "toZone": "Burning Steppes",
        "toSide": "Horde",
        "yards": 5916,
        "copper": 830,
        "timeText": "3m 5s",
        "costText": "8s 30c"
      },
      {
        "toId": 3203,
        "toName": "Rog'mar",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Horde",
        "yards": 5085,
        "copper": 630,
        "timeText": "2m 39s",
        "costText": "6s 30c"
      }
    ]
  },
  {
    "id": 57,
    "name": "Fishing Village",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1438,
    "zone": "Teldrassil",
    "coords": {
      "x": 55.4,
      "y": 92.2
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": []
  },
  {
    "id": 58,
    "name": "Zoram'gar Outpost",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1440,
    "zone": "Ashenvale",
    "coords": {
      "x": 12.2,
      "y": 33.8
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 6827,
        "copper": 110,
        "timeText": "3m 33s",
        "costText": "1s 10c"
      },
      {
        "toId": 61,
        "toName": "Splintertree Post",
        "toZone": "Ashenvale",
        "toSide": "Horde",
        "yards": 5013,
        "copper": 530,
        "timeText": "2m 37s",
        "costText": "5s 30c"
      }
    ]
  },
  {
    "id": 61,
    "name": "Splintertree Post",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1440,
    "zone": "Ashenvale",
    "coords": {
      "x": 73.3,
      "y": 61.7
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 2869,
        "copper": 530,
        "timeText": "1m 30s",
        "costText": "5s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 4806,
        "copper": 530,
        "timeText": "2m 30s",
        "costText": "5s 30c"
      },
      {
        "toId": 44,
        "toName": "Valormok",
        "toZone": "Azshara",
        "toSide": "Horde",
        "yards": 2870,
        "copper": 830,
        "timeText": "1m 30s",
        "costText": "8s 30c"
      },
      {
        "toId": 58,
        "toName": "Zoram'gar Outpost",
        "toZone": "Ashenvale",
        "toSide": "Horde",
        "yards": 4995,
        "copper": 330,
        "timeText": "2m 36s",
        "costText": "3s 30c"
      }
    ]
  },
  {
    "id": 62,
    "name": "Nighthaven",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1450,
    "zone": "Moonglade",
    "coords": {
      "x": 44.3,
      "y": 45.3
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 27,
        "toName": "Rut'theran Village",
        "toZone": "Teldrassil",
        "toSide": "Alliance",
        "yards": 4559,
        "copper": 0,
        "timeText": "2m 22s",
        "costText": "0c"
      }
    ]
  },
  {
    "id": 63,
    "name": "Nighthaven",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1450,
    "zone": "Moonglade",
    "coords": {
      "x": 44.3,
      "y": 45.7
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 16313,
        "copper": 0,
        "timeText": "8m 30s",
        "costText": "0c"
      }
    ]
  },
  {
    "id": 64,
    "name": "Talrendis Point",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1440,
    "zone": "Ashenvale",
    "coords": {
      "x": 96.8,
      "y": 50.8
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 9038,
        "copper": 730,
        "timeText": "4m 42s",
        "costText": "7s 30c"
      },
      {
        "toId": 28,
        "toName": "Astranaar",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 4578,
        "copper": 330,
        "timeText": "2m 23s",
        "costText": "3s 30c"
      },
      {
        "toId": 32,
        "toName": "Theramore",
        "toZone": "Dustwallow Marsh",
        "toSide": "Alliance",
        "yards": 7242,
        "copper": 630,
        "timeText": "3m 46s",
        "costText": "6s 30c"
      },
      {
        "toId": 52,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Alliance",
        "yards": 5355,
        "copper": 1030,
        "timeText": "2m 47s",
        "costText": "10s 30c"
      },
      {
        "toId": 65,
        "toName": "Talonbranch Glade",
        "toZone": "Mount Hyjal",
        "toSide": "Alliance",
        "yards": 8502,
        "copper": 730,
        "timeText": "4m 26s",
        "costText": "7s 30c"
      },
      {
        "toId": 80,
        "toName": "Ratchet",
        "toZone": "Durotar",
        "toSide": "Neutral",
        "yards": 4062,
        "copper": 110,
        "timeText": "2m 7s",
        "costText": "1s 10c"
      }
    ]
  },
  {
    "id": 65,
    "name": "Talonbranch Glade",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 2482,
    "zone": "Mount Hyjal",
    "coords": {
      "x": 29.6,
      "y": 4.2
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 5622,
        "copper": 730,
        "timeText": "2m 56s",
        "costText": "7s 30c"
      },
      {
        "toId": 49,
        "toName": "Moonglade",
        "toZone": "Moonglade",
        "toSide": "Alliance",
        "yards": 2005,
        "copper": 1020,
        "timeText": "1m 3s",
        "costText": "10s 20c"
      },
      {
        "toId": 52,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Alliance",
        "yards": 3601,
        "copper": 1020,
        "timeText": "1m 53s",
        "costText": "10s 20c"
      },
      {
        "toId": 64,
        "toName": "Talrendis Point",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 8465,
        "copper": 730,
        "timeText": "4m 25s",
        "costText": "7s 30c"
      }
    ]
  },
  {
    "id": 66,
    "name": "Chillwind Camp",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1416,
    "zone": "Alterac Mountains",
    "coords": {
      "x": 79.1,
      "y": 30.5
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 7782,
        "copper": 1020,
        "timeText": "4m 3s",
        "costText": "10s 20c"
      },
      {
        "toId": 14,
        "toName": "Southshore",
        "toZone": "Hillsbrad Foothills",
        "toSide": "Alliance",
        "yards": 2559,
        "copper": 330,
        "timeText": "1m 20s",
        "costText": "3s 30c"
      },
      {
        "toId": 43,
        "toName": "Aerie Peak",
        "toZone": "The Hinterlands",
        "toSide": "Alliance",
        "yards": 1958,
        "copper": 730,
        "timeText": "1m 1s",
        "costText": "7s 30c"
      },
      {
        "toId": 67,
        "toName": "Light's Hope Chapel",
        "toZone": "Eastern Plaguelands",
        "toSide": "Alliance",
        "yards": 4390,
        "copper": 1020,
        "timeText": "2m 17s",
        "costText": "10s 20c"
      }
    ]
  },
  {
    "id": 67,
    "name": "Light's Hope Chapel",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 71.7,
      "y": 49.6
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 11024,
        "copper": 1020,
        "timeText": "5m 45s",
        "costText": "10s 20c"
      },
      {
        "toId": 43,
        "toName": "Aerie Peak",
        "toZone": "The Hinterlands",
        "toSide": "Alliance",
        "yards": 4871,
        "copper": 730,
        "timeText": "2m 32s",
        "costText": "7s 30c"
      },
      {
        "toId": 66,
        "toName": "Chillwind Camp",
        "toZone": "Alterac Mountains",
        "toSide": "Alliance",
        "yards": 4484,
        "copper": 1020,
        "timeText": "2m 20s",
        "costText": "10s 20c"
      }
    ]
  },
  {
    "id": 68,
    "name": "Light's Hope Chapel",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 70.4,
      "y": 47.6
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 11,
        "toName": "Undercity",
        "toZone": "Undercity",
        "toSide": "Horde",
        "yards": 7837,
        "copper": 1020,
        "timeText": "4m 5s",
        "costText": "10s 20c"
      },
      {
        "toId": 76,
        "toName": "Revantusk Village",
        "toZone": "The Hinterlands",
        "toSide": "Horde",
        "yards": 4232,
        "copper": 730,
        "timeText": "2m 12s",
        "costText": "7s 30c"
      }
    ]
  },
  {
    "id": 69,
    "name": "Moonglade",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1450,
    "zone": "Moonglade",
    "coords": {
      "x": 32.2,
      "y": 66.3
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 48,
        "toName": "Bloodvenom Post",
        "toZone": "Felwood",
        "toSide": "Horde",
        "yards": 4713,
        "copper": 930,
        "timeText": "2m 27s",
        "costText": "9s 30c"
      },
      {
        "toId": 53,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Horde",
        "yards": 4256,
        "copper": 1020,
        "timeText": "2m 13s",
        "costText": "10s 20c"
      }
    ]
  },
  {
    "id": 70,
    "name": "Flame Crest",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1428,
    "zone": "Burning Steppes",
    "coords": {
      "x": 65.6,
      "y": 24.2
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 2994,
        "copper": 830,
        "timeText": "1m 34s",
        "costText": "8s 30c"
      },
      {
        "toId": 56,
        "toName": "Stonard",
        "toZone": "Swamp of Sorrows",
        "toSide": "Horde",
        "yards": 6376,
        "copper": 830,
        "timeText": "3m 19s",
        "costText": "8s 30c"
      },
      {
        "toId": 75,
        "toName": "Thorium Point",
        "toZone": "Searing Gorge",
        "toSide": "Horde",
        "yards": 2154,
        "copper": 830,
        "timeText": "1m 7s",
        "costText": "8s 30c"
      },
      {
        "toId": 3203,
        "toName": "Rog'mar",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Horde",
        "yards": 4113,
        "copper": 630,
        "timeText": "2m 9s",
        "costText": "6s 30c"
      }
    ]
  },
  {
    "id": 71,
    "name": "Morgan's Vigil",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1428,
    "zone": "Burning Steppes",
    "coords": {
      "x": 84.4,
      "y": 68.3
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 4528,
        "copper": 830,
        "timeText": "2m 22s",
        "costText": "8s 30c"
      },
      {
        "toId": 5,
        "toName": "Lakeshire",
        "toZone": "Redridge Mountains",
        "toSide": "Alliance",
        "yards": 1884,
        "copper": 210,
        "timeText": "0m 59s",
        "costText": "2s 10c"
      },
      {
        "toId": 45,
        "toName": "Nethergarde Keep",
        "toZone": "Swamp of Sorrows",
        "toSide": "Alliance",
        "yards": 6288,
        "copper": 830,
        "timeText": "3m 17s",
        "costText": "8s 30c"
      },
      {
        "toId": 74,
        "toName": "Thorium Point",
        "toZone": "Searing Gorge",
        "toSide": "Alliance",
        "yards": 3090,
        "copper": 830,
        "timeText": "1m 37s",
        "costText": "8s 30c"
      },
      {
        "toId": 3276,
        "toName": "Farholde Keep",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Alliance",
        "yards": 3936,
        "copper": 630,
        "timeText": "2m 3s",
        "costText": "6s 30c"
      }
    ]
  },
  {
    "id": 72,
    "name": "Cenarion Hold",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1451,
    "zone": "Silithus",
    "coords": {
      "x": 48.8,
      "y": 36.7
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 7224,
        "copper": 730,
        "timeText": "3m 46s",
        "costText": "7s 30c"
      },
      {
        "toId": 42,
        "toName": "Camp Mojache",
        "toZone": "Feralas",
        "toSide": "Horde",
        "yards": 3895,
        "copper": 730,
        "timeText": "2m 2s",
        "costText": "7s 30c"
      },
      {
        "toId": 79,
        "toName": "Marshal's Refuge",
        "toZone": "Un'Goro Crater",
        "toSide": "Neutral",
        "yards": 2896,
        "copper": 830,
        "timeText": "1m 31s",
        "costText": "8s 30c"
      }
    ]
  },
  {
    "id": 73,
    "name": "Cenarion Hold",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1451,
    "zone": "Silithus",
    "coords": {
      "x": 50.7,
      "y": 34.6
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 39,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Alliance",
        "yards": 5652,
        "copper": 730,
        "timeText": "2m 57s",
        "costText": "7s 30c"
      },
      {
        "toId": 41,
        "toName": "Feathermoon",
        "toZone": "Feralas",
        "toSide": "Alliance",
        "yards": 5239,
        "copper": 730,
        "timeText": "2m 44s",
        "costText": "7s 30c"
      },
      {
        "toId": 79,
        "toName": "Marshal's Refuge",
        "toZone": "Un'Goro Crater",
        "toSide": "Neutral",
        "yards": 2745,
        "copper": 830,
        "timeText": "1m 26s",
        "costText": "8s 30c"
      }
    ]
  },
  {
    "id": 74,
    "name": "Thorium Point",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1427,
    "zone": "Searing Gorge",
    "coords": {
      "x": 37.9,
      "y": 30.4
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 2802,
        "copper": 830,
        "timeText": "1m 28s",
        "costText": "8s 30c"
      },
      {
        "toId": 71,
        "toName": "Morgan's Vigil",
        "toZone": "Burning Steppes",
        "toSide": "Alliance",
        "yards": 2865,
        "copper": 830,
        "timeText": "1m 30s",
        "costText": "8s 30c"
      }
    ]
  },
  {
    "id": 75,
    "name": "Thorium Point",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1427,
    "zone": "Searing Gorge",
    "coords": {
      "x": 34.8,
      "y": 30.6
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 2090,
        "copper": 630,
        "timeText": "1m 5s",
        "costText": "6s 30c"
      },
      {
        "toId": 70,
        "toName": "Flame Crest",
        "toZone": "Burning Steppes",
        "toSide": "Horde",
        "yards": 2297,
        "copper": 830,
        "timeText": "1m 12s",
        "costText": "8s 30c"
      }
    ]
  },
  {
    "id": 76,
    "name": "Revantusk Village",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1425,
    "zone": "The Hinterlands",
    "coords": {
      "x": 81.7,
      "y": 81.9
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 11,
        "toName": "Undercity",
        "toZone": "Undercity",
        "toSide": "Horde",
        "yards": 8538,
        "copper": 730,
        "timeText": "4m 27s",
        "costText": "7s 30c"
      },
      {
        "toId": 13,
        "toName": "Tarren Mill",
        "toZone": "Alterac Mountains",
        "toSide": "Horde",
        "yards": 4767,
        "copper": 330,
        "timeText": "2m 29s",
        "costText": "3s 30c"
      },
      {
        "toId": 17,
        "toName": "Hammerfall",
        "toZone": "Arathi Highlands",
        "toSide": "Horde",
        "yards": 2785,
        "copper": 530,
        "timeText": "1m 27s",
        "costText": "5s 30c"
      },
      {
        "toId": 68,
        "toName": "Light's Hope Chapel",
        "toZone": "Eastern Plaguelands",
        "toSide": "Horde",
        "yards": 4159,
        "copper": 1030,
        "timeText": "2m 10s",
        "costText": "10s 30c"
      }
    ]
  },
  {
    "id": 77,
    "name": "Camp Taurajo",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1413,
    "zone": "The Barrens",
    "coords": {
      "x": 44.5,
      "y": 59.1
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 3410,
        "copper": 110,
        "timeText": "1m 47s",
        "costText": "1s 10c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 2380,
        "copper": 110,
        "timeText": "1m 14s",
        "costText": "1s 10c"
      },
      {
        "toId": 30,
        "toName": "Freewind Post",
        "toZone": "Thousand Needles",
        "toSide": "Horde",
        "yards": 3750,
        "copper": 430,
        "timeText": "1m 57s",
        "costText": "4s 30c"
      }
    ]
  },
  {
    "id": 79,
    "name": "Marshal's Refuge",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1449,
    "zone": "Un'Goro Crater",
    "coords": {
      "x": 45.3,
      "y": 6
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 39,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Alliance",
        "yards": 3100,
        "copper": 730,
        "timeText": "1m 37s",
        "costText": "7s 30c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 3396,
        "copper": 730,
        "timeText": "1m 46s",
        "costText": "7s 30c"
      },
      {
        "toId": 72,
        "toName": "Cenarion Hold",
        "toZone": "Silithus",
        "toSide": "Horde",
        "yards": 3003,
        "copper": 1030,
        "timeText": "1m 34s",
        "costText": "10s 30c"
      },
      {
        "toId": 73,
        "toName": "Cenarion Hold",
        "toZone": "Silithus",
        "toSide": "Alliance",
        "yards": 2823,
        "copper": 1030,
        "timeText": "1m 28s",
        "costText": "10s 30c"
      }
    ]
  },
  {
    "id": 80,
    "name": "Ratchet",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1411,
    "zone": "Durotar",
    "coords": {
      "x": 34.2,
      "y": 76.7
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 2041,
        "copper": 110,
        "timeText": "1m 4s",
        "costText": "1s 10c"
      },
      {
        "toId": 32,
        "toName": "Theramore",
        "toZone": "Dustwallow Marsh",
        "toSide": "Alliance",
        "yards": 3149,
        "copper": 630,
        "timeText": "1m 38s",
        "costText": "6s 30c"
      },
      {
        "toId": 64,
        "toName": "Talrendis Point",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 3960,
        "copper": 730,
        "timeText": "2m 4s",
        "costText": "7s 30c"
      }
    ]
  },
  {
    "id": 84,
    "name": "Plaguewood Tower",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 18.5,
      "y": 24.2
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 85,
        "toName": "Northpass Tower",
        "toZone": "Eastern Plaguelands",
        "toSide": "Neutral",
        "yards": 1478,
        "copper": 0,
        "timeText": "0m 46s",
        "costText": "0c"
      },
      {
        "toId": 85,
        "toName": "Northpass Tower",
        "toZone": "Eastern Plaguelands",
        "toSide": "Neutral",
        "yards": 1478,
        "copper": 0,
        "timeText": "0m 46s",
        "costText": "0c"
      },
      {
        "toId": 86,
        "toName": "Eastwall Tower",
        "toZone": "Eastern Plaguelands",
        "toSide": "Neutral",
        "yards": 1897,
        "copper": 0,
        "timeText": "0m 59s",
        "costText": "0c"
      },
      {
        "toId": 87,
        "toName": "Crown Guard Tower",
        "toZone": "Eastern Plaguelands",
        "toSide": "Neutral",
        "yards": 1539,
        "copper": 0,
        "timeText": "0m 48s",
        "costText": "0c"
      }
    ]
  },
  {
    "id": 85,
    "name": "Northpass Tower",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 47.2,
      "y": 20.3
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": false,
    "connections": []
  },
  {
    "id": 86,
    "name": "Eastwall Tower",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 57.8,
      "y": 41.6
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": false,
    "connections": []
  },
  {
    "id": 87,
    "name": "Crown Guard Tower",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 32.6,
      "y": 64
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": false,
    "connections": []
  },
  {
    "id": 559,
    "name": "Summit of Eternity",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 2482,
    "zone": "Mount Hyjal",
    "coords": {
      "x": 68.6,
      "y": 44.1
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": true,
    "connections": [
      {
        "toId": 3242,
        "toName": "Tainted Foothills",
        "toZone": "Mount Hyjal",
        "toSide": "Neutral",
        "yards": 1866,
        "copper": 510,
        "timeText": "0m 58s",
        "costText": "5s 10c"
      }
    ]
  },
  {
    "id": 3203,
    "name": "Rog'mar",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 2548,
    "zone": "Blasted Lands / Coast",
    "coords": {
      "x": 59.6,
      "y": 45.1
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": true,
    "connections": [
      {
        "toId": 17,
        "toName": "Hammerfall",
        "toZone": "Arathi Highlands",
        "toSide": "Horde",
        "yards": 9845,
        "copper": 830,
        "timeText": "5m 8s",
        "costText": "8s 30c"
      },
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 3607,
        "copper": 630,
        "timeText": "1m 53s",
        "costText": "6s 30c"
      },
      {
        "toId": 56,
        "toName": "Stonard",
        "toZone": "Swamp of Sorrows",
        "toSide": "Horde",
        "yards": 4624,
        "copper": 630,
        "timeText": "2m 25s",
        "costText": "6s 30c"
      },
      {
        "toId": 70,
        "toName": "Flame Crest",
        "toZone": "Burning Steppes",
        "toSide": "Horde",
        "yards": 3993,
        "copper": 630,
        "timeText": "2m 5s",
        "costText": "6s 30c"
      }
    ]
  },
  {
    "id": 3205,
    "name": "Tidegear Coast",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1426,
    "zone": "Dun Morogh",
    "coords": {
      "x": 19,
      "y": 15.2
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": true,
    "connections": []
  },
  {
    "id": 3242,
    "name": "Tainted Foothills",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 2482,
    "zone": "Mount Hyjal",
    "coords": {
      "x": 55.1,
      "y": 82.5
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": true,
    "connections": [
      {
        "toId": 52,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Alliance",
        "yards": 3745,
        "copper": 1020,
        "timeText": "1m 57s",
        "costText": "10s 20c"
      },
      {
        "toId": 53,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Horde",
        "yards": 3967,
        "copper": 1020,
        "timeText": "2m 4s",
        "costText": "10s 20c"
      },
      {
        "toId": 559,
        "toName": "Summit of Eternity",
        "toZone": "Mount Hyjal",
        "toSide": "Neutral",
        "yards": 1849,
        "copper": 510,
        "timeText": "0m 58s",
        "costText": "5s 10c"
      }
    ]
  },
  {
    "id": 3274,
    "name": "Powderfuse Port",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 2548,
    "zone": "Blasted Lands / Coast",
    "coords": {
      "x": 79,
      "y": 52.3
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": true,
    "connections": []
  },
  {
    "id": 3275,
    "name": "Powderfuse Port",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 2548,
    "zone": "Blasted Lands / Coast",
    "coords": {
      "x": 76.8,
      "y": 53
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": true,
    "connections": []
  },
  {
    "id": 3276,
    "name": "Farholde Keep",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 2548,
    "zone": "Blasted Lands / Coast",
    "coords": {
      "x": 60.6,
      "y": 81.6
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": true,
    "connections": [
      {
        "toId": 5,
        "toName": "Lakeshire",
        "toZone": "Redridge Mountains",
        "toSide": "Alliance",
        "yards": 3917,
        "copper": 630,
        "timeText": "2m 2s",
        "costText": "6s 30c"
      },
      {
        "toId": 8,
        "toName": "Thelsamar",
        "toZone": "Loch Modan",
        "toSide": "Alliance",
        "yards": 5193,
        "copper": 630,
        "timeText": "2m 42s",
        "costText": "6s 30c"
      },
      {
        "toId": 71,
        "toName": "Morgan's Vigil",
        "toZone": "Burning Steppes",
        "toSide": "Alliance",
        "yards": 3676,
        "copper": 630,
        "timeText": "1m 55s",
        "costText": "6s 30c"
      }
    ]
  }
],
      nodeMap: {
  "1": {
    "id": 1,
    "name": "Northshire Abbey",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1453,
    "zone": "Stormwind City",
    "coords": {
      "x": 99.2,
      "y": 77.1
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": []
  },
  "2": {
    "id": 2,
    "name": "Stormwind",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1453,
    "zone": "Stormwind City",
    "coords": {
      "x": 71.6,
      "y": 72.3
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 4,
        "toName": "Sentinel Hill",
        "toZone": "Westfall",
        "toSide": "Alliance",
        "yards": 2329,
        "copper": 110,
        "timeText": "1m 13s",
        "costText": "1s 10c"
      },
      {
        "toId": 5,
        "toName": "Lakeshire",
        "toZone": "Redridge Mountains",
        "toSide": "Alliance",
        "yards": 3380,
        "copper": 210,
        "timeText": "1m 46s",
        "costText": "2s 10c"
      },
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 7757,
        "copper": 50,
        "timeText": "4m 2s",
        "costText": "50c"
      },
      {
        "toId": 12,
        "toName": "Darkshire",
        "toZone": "Duskwood",
        "toSide": "Alliance",
        "yards": 3480,
        "copper": 330,
        "timeText": "1m 49s",
        "costText": "3s 30c"
      },
      {
        "toId": 19,
        "toName": "Booty Bay",
        "toZone": "Stranglethorn Vale",
        "toSide": "Alliance",
        "yards": 7318,
        "copper": 630,
        "timeText": "3m 49s",
        "costText": "6s 30c"
      },
      {
        "toId": 45,
        "toName": "Nethergarde Keep",
        "toZone": "Swamp of Sorrows",
        "toSide": "Alliance",
        "yards": 5282,
        "copper": 830,
        "timeText": "2m 45s",
        "costText": "8s 30c"
      },
      {
        "toId": 71,
        "toName": "Morgan's Vigil",
        "toZone": "Burning Steppes",
        "toSide": "Alliance",
        "yards": 4706,
        "copper": 830,
        "timeText": "2m 27s",
        "costText": "8s 30c"
      }
    ]
  },
  "3": {
    "id": 3,
    "name": "Programmer Isle",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 0,
    "zone": "Eastern Kingdoms",
    "coords": {
      "x": 0,
      "y": 0
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": []
  },
  "4": {
    "id": 4,
    "name": "Sentinel Hill",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1436,
    "zone": "Westfall",
    "coords": {
      "x": 56.6,
      "y": 52.7
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 2443,
        "copper": 110,
        "timeText": "1m 16s",
        "costText": "1s 10c"
      },
      {
        "toId": 5,
        "toName": "Lakeshire",
        "toZone": "Redridge Mountains",
        "toSide": "Alliance",
        "yards": 3890,
        "copper": 210,
        "timeText": "2m 2s",
        "costText": "2s 10c"
      },
      {
        "toId": 12,
        "toName": "Darkshire",
        "toZone": "Duskwood",
        "toSide": "Alliance",
        "yards": 2897,
        "copper": 330,
        "timeText": "1m 31s",
        "costText": "3s 30c"
      },
      {
        "toId": 19,
        "toName": "Booty Bay",
        "toZone": "Stranglethorn Vale",
        "toSide": "Alliance",
        "yards": 5561,
        "copper": 630,
        "timeText": "2m 54s",
        "costText": "6s 30c"
      }
    ]
  },
  "5": {
    "id": 5,
    "name": "Lakeshire",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1433,
    "zone": "Redridge Mountains",
    "coords": {
      "x": 25.3,
      "y": 59
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 3374,
        "copper": 210,
        "timeText": "1m 45s",
        "costText": "2s 10c"
      },
      {
        "toId": 4,
        "toName": "Sentinel Hill",
        "toZone": "Westfall",
        "toSide": "Alliance",
        "yards": 4003,
        "copper": 110,
        "timeText": "2m 5s",
        "costText": "1s 10c"
      },
      {
        "toId": 12,
        "toName": "Darkshire",
        "toZone": "Duskwood",
        "toSide": "Alliance",
        "yards": 1812,
        "copper": 330,
        "timeText": "0m 57s",
        "costText": "3s 30c"
      },
      {
        "toId": 71,
        "toName": "Morgan's Vigil",
        "toZone": "Burning Steppes",
        "toSide": "Alliance",
        "yards": 1825,
        "copper": 830,
        "timeText": "0m 57s",
        "costText": "8s 30c"
      },
      {
        "toId": 3276,
        "toName": "Farholde Keep",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Alliance",
        "yards": 3962,
        "copper": 630,
        "timeText": "2m 4s",
        "costText": "6s 30c"
      }
    ]
  },
  "6": {
    "id": 6,
    "name": "Ironforge",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1455,
    "zone": "Ironforge",
    "coords": {
      "x": 55.9,
      "y": 47.9
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 6310,
        "copper": 50,
        "timeText": "3m 17s",
        "costText": "50c"
      },
      {
        "toId": 7,
        "toName": "Menethil Harbor",
        "toZone": "Wetlands",
        "toSide": "Alliance",
        "yards": 3861,
        "copper": 330,
        "timeText": "2m 1s",
        "costText": "3s 30c"
      },
      {
        "toId": 8,
        "toName": "Thelsamar",
        "toZone": "Loch Modan",
        "toSide": "Alliance",
        "yards": 3037,
        "copper": 110,
        "timeText": "1m 35s",
        "costText": "1s 10c"
      },
      {
        "toId": 14,
        "toName": "Southshore",
        "toZone": "Hillsbrad Foothills",
        "toSide": "Alliance",
        "yards": 7938,
        "copper": 330,
        "timeText": "4m 8s",
        "costText": "3s 30c"
      },
      {
        "toId": 16,
        "toName": "Refuge Pointe",
        "toZone": "Arathi Highlands",
        "toSide": "Alliance",
        "yards": 7585,
        "copper": 530,
        "timeText": "3m 57s",
        "costText": "5s 30c"
      },
      {
        "toId": 43,
        "toName": "Aerie Peak",
        "toZone": "The Hinterlands",
        "toSide": "Alliance",
        "yards": 8941,
        "copper": 730,
        "timeText": "4m 39s",
        "costText": "7s 30c"
      },
      {
        "toId": 66,
        "toName": "Chillwind Camp",
        "toZone": "Alterac Mountains",
        "toSide": "Alliance",
        "yards": 8816,
        "copper": 1020,
        "timeText": "4m 36s",
        "costText": "10s 20c"
      },
      {
        "toId": 67,
        "toName": "Light's Hope Chapel",
        "toZone": "Eastern Plaguelands",
        "toSide": "Alliance",
        "yards": 10440,
        "copper": 1020,
        "timeText": "5m 26s",
        "costText": "10s 20c"
      },
      {
        "toId": 74,
        "toName": "Thorium Point",
        "toZone": "Searing Gorge",
        "toSide": "Alliance",
        "yards": 2594,
        "copper": 830,
        "timeText": "1m 21s",
        "costText": "8s 30c"
      }
    ]
  },
  "7": {
    "id": 7,
    "name": "Menethil Harbor",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1437,
    "zone": "Wetlands",
    "coords": {
      "x": 9.5,
      "y": 59.7
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 2658,
        "copper": 330,
        "timeText": "1m 23s",
        "costText": "3s 30c"
      },
      {
        "toId": 8,
        "toName": "Thelsamar",
        "toZone": "Loch Modan",
        "toSide": "Alliance",
        "yards": 4877,
        "copper": 110,
        "timeText": "2m 32s",
        "costText": "1s 10c"
      },
      {
        "toId": 14,
        "toName": "Southshore",
        "toZone": "Hillsbrad Foothills",
        "toSide": "Alliance",
        "yards": 3215,
        "copper": 330,
        "timeText": "1m 40s",
        "costText": "3s 30c"
      },
      {
        "toId": 16,
        "toName": "Refuge Pointe",
        "toZone": "Arathi Highlands",
        "toSide": "Alliance",
        "yards": 3388,
        "copper": 530,
        "timeText": "1m 46s",
        "costText": "5s 30c"
      }
    ]
  },
  "8": {
    "id": 8,
    "name": "Thelsamar",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1432,
    "zone": "Loch Modan",
    "coords": {
      "x": 33.9,
      "y": 50.8
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 3266,
        "copper": 110,
        "timeText": "1m 42s",
        "costText": "1s 10c"
      },
      {
        "toId": 7,
        "toName": "Menethil Harbor",
        "toZone": "Wetlands",
        "toSide": "Alliance",
        "yards": 4564,
        "copper": 330,
        "timeText": "2m 23s",
        "costText": "3s 30c"
      },
      {
        "toId": 16,
        "toName": "Refuge Pointe",
        "toZone": "Arathi Highlands",
        "toSide": "Alliance",
        "yards": 4902,
        "copper": 530,
        "timeText": "2m 33s",
        "costText": "5s 30c"
      },
      {
        "toId": 3276,
        "toName": "Farholde Keep",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Alliance",
        "yards": 5531,
        "copper": 630,
        "timeText": "2m 53s",
        "costText": "6s 30c"
      }
    ]
  },
  "9": {
    "id": 9,
    "name": "Booty Bay",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1434,
    "zone": "Stranglethorn Vale",
    "coords": {
      "x": 30.1,
      "y": 72.9
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": []
  },
  "10": {
    "id": 10,
    "name": "The Sepulcher",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1421,
    "zone": "Silverpine Forest",
    "coords": {
      "x": 45.6,
      "y": 42.4
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 11,
        "toName": "Undercity",
        "toZone": "Undercity",
        "toSide": "Horde",
        "yards": 3345,
        "copper": 110,
        "timeText": "1m 45s",
        "costText": "1s 10c"
      },
      {
        "toId": 13,
        "toName": "Tarren Mill",
        "toZone": "Alterac Mountains",
        "toSide": "Horde",
        "yards": 2868,
        "copper": 330,
        "timeText": "1m 30s",
        "costText": "3s 30c"
      }
    ]
  },
  "11": {
    "id": 11,
    "name": "Undercity",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1458,
    "zone": "Undercity",
    "coords": {
      "x": 63.1,
      "y": 48.3
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 10,
        "toName": "The Sepulcher",
        "toZone": "Silverpine Forest",
        "toSide": "Horde",
        "yards": 3180,
        "copper": 110,
        "timeText": "1m 39s",
        "costText": "1s 10c"
      },
      {
        "toId": 13,
        "toName": "Tarren Mill",
        "toZone": "Alterac Mountains",
        "toSide": "Horde",
        "yards": 4222,
        "copper": 330,
        "timeText": "2m 12s",
        "costText": "3s 30c"
      },
      {
        "toId": 17,
        "toName": "Hammerfall",
        "toZone": "Arathi Highlands",
        "toSide": "Horde",
        "yards": 9014,
        "copper": 530,
        "timeText": "4m 42s",
        "costText": "5s 30c"
      },
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 14837,
        "copper": 630,
        "timeText": "7m 44s",
        "costText": "6s 30c"
      },
      {
        "toId": 68,
        "toName": "Light's Hope Chapel",
        "toZone": "Eastern Plaguelands",
        "toSide": "Horde",
        "yards": 7849,
        "copper": 1020,
        "timeText": "4m 5s",
        "costText": "10s 20c"
      },
      {
        "toId": 76,
        "toName": "Revantusk Village",
        "toZone": "The Hinterlands",
        "toSide": "Horde",
        "yards": 8530,
        "copper": 730,
        "timeText": "4m 27s",
        "costText": "7s 30c"
      }
    ]
  },
  "12": {
    "id": 12,
    "name": "Darkshire",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1431,
    "zone": "Duskwood",
    "coords": {
      "x": 77.6,
      "y": 44.4
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 2629,
        "copper": 330,
        "timeText": "1m 22s",
        "costText": "3s 30c"
      },
      {
        "toId": 4,
        "toName": "Sentinel Hill",
        "toZone": "Westfall",
        "toSide": "Alliance",
        "yards": 2794,
        "copper": 110,
        "timeText": "1m 27s",
        "costText": "1s 10c"
      },
      {
        "toId": 5,
        "toName": "Lakeshire",
        "toZone": "Redridge Mountains",
        "toSide": "Alliance",
        "yards": 1787,
        "copper": 210,
        "timeText": "0m 56s",
        "costText": "2s 10c"
      },
      {
        "toId": 19,
        "toName": "Booty Bay",
        "toZone": "Stranglethorn Vale",
        "toSide": "Alliance",
        "yards": 5135,
        "copper": 630,
        "timeText": "2m 40s",
        "costText": "6s 30c"
      },
      {
        "toId": 45,
        "toName": "Nethergarde Keep",
        "toZone": "Swamp of Sorrows",
        "toSide": "Alliance",
        "yards": 2903,
        "copper": 830,
        "timeText": "1m 31s",
        "costText": "8s 30c"
      }
    ]
  },
  "13": {
    "id": 13,
    "name": "Tarren Mill",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1416,
    "zone": "Alterac Mountains",
    "coords": {
      "x": 58.7,
      "y": 80.4
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 10,
        "toName": "The Sepulcher",
        "toZone": "Silverpine Forest",
        "toSide": "Horde",
        "yards": 2989,
        "copper": 110,
        "timeText": "1m 33s",
        "costText": "1s 10c"
      },
      {
        "toId": 11,
        "toName": "Undercity",
        "toZone": "Undercity",
        "toSide": "Horde",
        "yards": 4172,
        "copper": 330,
        "timeText": "2m 10s",
        "costText": "3s 30c"
      },
      {
        "toId": 17,
        "toName": "Hammerfall",
        "toZone": "Arathi Highlands",
        "toSide": "Horde",
        "yards": 3532,
        "copper": 530,
        "timeText": "1m 50s",
        "costText": "5s 30c"
      },
      {
        "toId": 76,
        "toName": "Revantusk Village",
        "toZone": "The Hinterlands",
        "toSide": "Horde",
        "yards": 5840,
        "copper": 730,
        "timeText": "3m 3s",
        "costText": "7s 30c"
      }
    ]
  },
  "14": {
    "id": 14,
    "name": "Southshore",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1424,
    "zone": "Hillsbrad Foothills",
    "coords": {
      "x": 49.4,
      "y": 52.1
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 6174,
        "copper": 330,
        "timeText": "3m 13s",
        "costText": "3s 30c"
      },
      {
        "toId": 7,
        "toName": "Menethil Harbor",
        "toZone": "Wetlands",
        "toSide": "Alliance",
        "yards": 3304,
        "copper": 330,
        "timeText": "1m 43s",
        "costText": "3s 30c"
      },
      {
        "toId": 16,
        "toName": "Refuge Pointe",
        "toZone": "Arathi Highlands",
        "toSide": "Alliance",
        "yards": 2214,
        "copper": 530,
        "timeText": "1m 9s",
        "costText": "5s 30c"
      },
      {
        "toId": 43,
        "toName": "Aerie Peak",
        "toZone": "The Hinterlands",
        "toSide": "Alliance",
        "yards": 2139,
        "copper": 730,
        "timeText": "1m 7s",
        "costText": "7s 30c"
      },
      {
        "toId": 66,
        "toName": "Chillwind Camp",
        "toZone": "Alterac Mountains",
        "toSide": "Alliance",
        "yards": 2418,
        "copper": 830,
        "timeText": "1m 16s",
        "costText": "8s 30c"
      }
    ]
  },
  "15": {
    "id": 15,
    "name": "Eastern Plaguelands",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 71.8,
      "y": 50.2
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": []
  },
  "16": {
    "id": 16,
    "name": "Refuge Pointe",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1417,
    "zone": "Arathi Highlands",
    "coords": {
      "x": 45.8,
      "y": 46.1
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 8109,
        "copper": 530,
        "timeText": "4m 13s",
        "costText": "5s 30c"
      },
      {
        "toId": 7,
        "toName": "Menethil Harbor",
        "toZone": "Wetlands",
        "toSide": "Alliance",
        "yards": 3776,
        "copper": 330,
        "timeText": "1m 58s",
        "costText": "3s 30c"
      },
      {
        "toId": 8,
        "toName": "Thelsamar",
        "toZone": "Loch Modan",
        "toSide": "Alliance",
        "yards": 5113,
        "copper": 110,
        "timeText": "2m 40s",
        "costText": "1s 10c"
      },
      {
        "toId": 14,
        "toName": "Southshore",
        "toZone": "Hillsbrad Foothills",
        "toSide": "Alliance",
        "yards": 2596,
        "copper": 330,
        "timeText": "1m 21s",
        "costText": "3s 30c"
      },
      {
        "toId": 43,
        "toName": "Aerie Peak",
        "toZone": "The Hinterlands",
        "toSide": "Alliance",
        "yards": 2152,
        "copper": 730,
        "timeText": "1m 7s",
        "costText": "7s 30c"
      }
    ]
  },
  "17": {
    "id": 17,
    "name": "Hammerfall",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1417,
    "zone": "Arathi Highlands",
    "coords": {
      "x": 73.1,
      "y": 32.6
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 11,
        "toName": "Undercity",
        "toZone": "Undercity",
        "toSide": "Horde",
        "yards": 7763,
        "copper": 530,
        "timeText": "4m 3s",
        "costText": "5s 30c"
      },
      {
        "toId": 13,
        "toName": "Tarren Mill",
        "toZone": "Alterac Mountains",
        "toSide": "Horde",
        "yards": 3493,
        "copper": 330,
        "timeText": "1m 49s",
        "costText": "3s 30c"
      },
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 7760,
        "copper": 630,
        "timeText": "4m 3s",
        "costText": "6s 30c"
      },
      {
        "toId": 76,
        "toName": "Revantusk Village",
        "toZone": "The Hinterlands",
        "toSide": "Horde",
        "yards": 2705,
        "copper": 730,
        "timeText": "1m 25s",
        "costText": "7s 30c"
      },
      {
        "toId": 3203,
        "toName": "Rog'mar",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Horde",
        "yards": 9767,
        "copper": 830,
        "timeText": "5m 5s",
        "costText": "8s 30c"
      }
    ]
  },
  "18": {
    "id": 18,
    "name": "Booty Bay",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1434,
    "zone": "Stranglethorn Vale",
    "coords": {
      "x": 26.8,
      "y": 77
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 20,
        "toName": "Grom'gol",
        "toZone": "Stranglethorn Vale",
        "toSide": "Horde",
        "yards": 3047,
        "copper": 630,
        "timeText": "1m 35s",
        "costText": "6s 30c"
      },
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 12190,
        "copper": 630,
        "timeText": "6m 21s",
        "costText": "6s 30c"
      },
      {
        "toId": 56,
        "toName": "Stonard",
        "toZone": "Swamp of Sorrows",
        "toSide": "Horde",
        "yards": 7986,
        "copper": 630,
        "timeText": "4m 10s",
        "costText": "6s 30c"
      }
    ]
  },
  "19": {
    "id": 19,
    "name": "Booty Bay",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1434,
    "zone": "Stranglethorn Vale",
    "coords": {
      "x": 27.5,
      "y": 77.7
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 6585,
        "copper": 630,
        "timeText": "3m 26s",
        "costText": "6s 30c"
      },
      {
        "toId": 4,
        "toName": "Sentinel Hill",
        "toZone": "Westfall",
        "toSide": "Alliance",
        "yards": 5439,
        "copper": 530,
        "timeText": "2m 50s",
        "costText": "5s 30c"
      },
      {
        "toId": 12,
        "toName": "Darkshire",
        "toZone": "Duskwood",
        "toSide": "Alliance",
        "yards": 5242,
        "copper": 330,
        "timeText": "2m 44s",
        "costText": "3s 30c"
      }
    ]
  },
  "20": {
    "id": 20,
    "name": "Grom'gol",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1434,
    "zone": "Stranglethorn Vale",
    "coords": {
      "x": 32.5,
      "y": 29.3
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 18,
        "toName": "Booty Bay",
        "toZone": "Stranglethorn Vale",
        "toSide": "Horde",
        "yards": 2422,
        "copper": 630,
        "timeText": "1m 16s",
        "costText": "6s 30c"
      },
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 9802,
        "copper": 630,
        "timeText": "5m 6s",
        "costText": "6s 30c"
      },
      {
        "toId": 56,
        "toName": "Stonard",
        "toZone": "Swamp of Sorrows",
        "toSide": "Horde",
        "yards": 6151,
        "copper": 630,
        "timeText": "3m 12s",
        "costText": "6s 30c"
      }
    ]
  },
  "21": {
    "id": 21,
    "name": "Kargath",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1418,
    "zone": "Badlands",
    "coords": {
      "x": 4.1,
      "y": 44.9
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 11,
        "toName": "Undercity",
        "toZone": "Undercity",
        "toSide": "Horde",
        "yards": 14918,
        "copper": 630,
        "timeText": "7m 46s",
        "costText": "6s 30c"
      },
      {
        "toId": 17,
        "toName": "Hammerfall",
        "toZone": "Arathi Highlands",
        "toSide": "Horde",
        "yards": 7881,
        "copper": 630,
        "timeText": "4m 6s",
        "costText": "6s 30c"
      },
      {
        "toId": 18,
        "toName": "Booty Bay",
        "toZone": "Stranglethorn Vale",
        "toSide": "Horde",
        "yards": 12493,
        "copper": 630,
        "timeText": "6m 30s",
        "costText": "6s 30c"
      },
      {
        "toId": 20,
        "toName": "Grom'gol",
        "toZone": "Stranglethorn Vale",
        "toSide": "Horde",
        "yards": 9376,
        "copper": 530,
        "timeText": "4m 53s",
        "costText": "5s 30c"
      },
      {
        "toId": 56,
        "toName": "Stonard",
        "toZone": "Swamp of Sorrows",
        "toSide": "Horde",
        "yards": 8424,
        "copper": 710,
        "timeText": "4m 23s",
        "costText": "7s 10c"
      },
      {
        "toId": 70,
        "toName": "Flame Crest",
        "toZone": "Burning Steppes",
        "toSide": "Horde",
        "yards": 2593,
        "copper": 830,
        "timeText": "1m 21s",
        "costText": "8s 30c"
      },
      {
        "toId": 75,
        "toName": "Thorium Point",
        "toZone": "Searing Gorge",
        "toSide": "Horde",
        "yards": 1682,
        "copper": 830,
        "timeText": "0m 53s",
        "costText": "8s 30c"
      },
      {
        "toId": 3203,
        "toName": "Rog'mar",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Horde",
        "yards": 3821,
        "copper": 630,
        "timeText": "1m 59s",
        "costText": "6s 30c"
      }
    ]
  },
  "22": {
    "id": 22,
    "name": "Thunder Bluff",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1456,
    "zone": "Thunder Bluff",
    "coords": {
      "x": 46.7,
      "y": 49.9
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 6213,
        "copper": 50,
        "timeText": "3m 14s",
        "costText": "50c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 4752,
        "copper": 110,
        "timeText": "2m 29s",
        "costText": "1s 10c"
      },
      {
        "toId": 29,
        "toName": "Sun Rock Retreat",
        "toZone": "Stonetalon Mountains",
        "toSide": "Horde",
        "yards": 5439,
        "copper": 210,
        "timeText": "2m 50s",
        "costText": "2s 10c"
      },
      {
        "toId": 30,
        "toName": "Freewind Post",
        "toZone": "Thousand Needles",
        "toSide": "Horde",
        "yards": 6113,
        "copper": 430,
        "timeText": "3m 11s",
        "costText": "4s 30c"
      },
      {
        "toId": 38,
        "toName": "Shadowprey Village",
        "toZone": "Desolace",
        "toSide": "Horde",
        "yards": 4752,
        "copper": 530,
        "timeText": "2m 29s",
        "costText": "5s 30c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 8693,
        "copper": 730,
        "timeText": "4m 32s",
        "costText": "7s 30c"
      },
      {
        "toId": 42,
        "toName": "Camp Mojache",
        "toZone": "Feralas",
        "toSide": "Horde",
        "yards": 7563,
        "copper": 730,
        "timeText": "3m 56s",
        "costText": "7s 30c"
      },
      {
        "toId": 44,
        "toName": "Valormok",
        "toZone": "Azshara",
        "toSide": "Horde",
        "yards": 8070,
        "copper": 830,
        "timeText": "4m 12s",
        "costText": "8s 30c"
      },
      {
        "toId": 55,
        "toName": "Brackenwall Village",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 7149,
        "copper": 630,
        "timeText": "3m 43s",
        "costText": "6s 30c"
      },
      {
        "toId": 77,
        "toName": "Camp Taurajo",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 2599,
        "copper": 110,
        "timeText": "1m 21s",
        "costText": "1s 10c"
      }
    ]
  },
  "23": {
    "id": 23,
    "name": "Orgrimmar",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1454,
    "zone": "Orgrimmar",
    "coords": {
      "x": 45.3,
      "y": 63.7
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 6745,
        "copper": 50,
        "timeText": "3m 31s",
        "costText": "50c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 3304,
        "copper": 110,
        "timeText": "1m 43s",
        "costText": "1s 10c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 12500,
        "copper": 730,
        "timeText": "6m 31s",
        "costText": "7s 30c"
      },
      {
        "toId": 44,
        "toName": "Valormok",
        "toZone": "Azshara",
        "toSide": "Horde",
        "yards": 2965,
        "copper": 830,
        "timeText": "1m 33s",
        "costText": "8s 30c"
      },
      {
        "toId": 48,
        "toName": "Bloodvenom Post",
        "toZone": "Felwood",
        "toSide": "Horde",
        "yards": 7558,
        "copper": 830,
        "timeText": "3m 56s",
        "costText": "8s 30c"
      },
      {
        "toId": 53,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Horde",
        "yards": 9582,
        "copper": 1020,
        "timeText": "4m 59s",
        "costText": "10s 20c"
      },
      {
        "toId": 55,
        "toName": "Brackenwall Village",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 6853,
        "copper": 630,
        "timeText": "3m 34s",
        "costText": "6s 30c"
      },
      {
        "toId": 61,
        "toName": "Splintertree Post",
        "toZone": "Ashenvale",
        "toSide": "Horde",
        "yards": 2680,
        "copper": 530,
        "timeText": "1m 24s",
        "costText": "5s 30c"
      }
    ]
  },
  "25": {
    "id": 25,
    "name": "Crossroads",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1413,
    "zone": "The Barrens",
    "coords": {
      "x": 51.5,
      "y": 30.4
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 5461,
        "copper": 110,
        "timeText": "2m 51s",
        "costText": "1s 10c"
      },
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 4252,
        "copper": 110,
        "timeText": "2m 13s",
        "costText": "1s 10c"
      },
      {
        "toId": 29,
        "toName": "Sun Rock Retreat",
        "toZone": "Stonetalon Mountains",
        "toSide": "Horde",
        "yards": 4495,
        "copper": 210,
        "timeText": "2m 20s",
        "costText": "2s 10c"
      },
      {
        "toId": 30,
        "toName": "Freewind Post",
        "toZone": "Thousand Needles",
        "toSide": "Horde",
        "yards": 5532,
        "copper": 430,
        "timeText": "2m 53s",
        "costText": "4s 30c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 9093,
        "copper": 730,
        "timeText": "4m 44s",
        "costText": "7s 30c"
      },
      {
        "toId": 42,
        "toName": "Camp Mojache",
        "toZone": "Feralas",
        "toSide": "Horde",
        "yards": 7547,
        "copper": 730,
        "timeText": "3m 56s",
        "costText": "7s 30c"
      },
      {
        "toId": 44,
        "toName": "Valormok",
        "toZone": "Azshara",
        "toSide": "Horde",
        "yards": 5051,
        "copper": 830,
        "timeText": "2m 38s",
        "costText": "8s 30c"
      },
      {
        "toId": 48,
        "toName": "Bloodvenom Post",
        "toZone": "Felwood",
        "toSide": "Horde",
        "yards": 7603,
        "copper": 930,
        "timeText": "3m 58s",
        "costText": "9s 30c"
      },
      {
        "toId": 55,
        "toName": "Brackenwall Village",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 4878,
        "copper": 630,
        "timeText": "2m 32s",
        "costText": "6s 30c"
      },
      {
        "toId": 58,
        "toName": "Zoram'gar Outpost",
        "toZone": "Ashenvale",
        "toSide": "Horde",
        "yards": 6902,
        "copper": 330,
        "timeText": "3m 36s",
        "costText": "3s 30c"
      },
      {
        "toId": 61,
        "toName": "Splintertree Post",
        "toZone": "Ashenvale",
        "toSide": "Horde",
        "yards": 4871,
        "copper": 530,
        "timeText": "2m 32s",
        "costText": "5s 30c"
      },
      {
        "toId": 77,
        "toName": "Camp Taurajo",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 2705,
        "copper": 110,
        "timeText": "1m 25s",
        "costText": "1s 10c"
      },
      {
        "toId": 80,
        "toName": "Ratchet",
        "toZone": "Durotar",
        "toSide": "Neutral",
        "yards": 1545,
        "copper": 110,
        "timeText": "0m 48s",
        "costText": "1s 10c"
      }
    ]
  },
  "26": {
    "id": 26,
    "name": "Auberdine",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1439,
    "zone": "Darkshore",
    "coords": {
      "x": 36.4,
      "y": 45.6
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 27,
        "toName": "Rut'theran Village",
        "toZone": "Teldrassil",
        "toSide": "Alliance",
        "yards": 2525,
        "copper": 0,
        "timeText": "1m 19s",
        "costText": "0c"
      },
      {
        "toId": 28,
        "toName": "Astranaar",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 5270,
        "copper": 330,
        "timeText": "2m 45s",
        "costText": "3s 30c"
      },
      {
        "toId": 32,
        "toName": "Theramore",
        "toZone": "Dustwallow Marsh",
        "toSide": "Alliance",
        "yards": 20225,
        "copper": 630,
        "timeText": "10m 32s",
        "costText": "6s 30c"
      },
      {
        "toId": 33,
        "toName": "Stonetalon Peak",
        "toZone": "Stonetalon Mountains",
        "toSide": "Alliance",
        "yards": 5432,
        "copper": 330,
        "timeText": "2m 50s",
        "costText": "3s 30c"
      },
      {
        "toId": 37,
        "toName": "Nijel's Point",
        "toZone": "Desolace",
        "toSide": "Alliance",
        "yards": 8723,
        "copper": 530,
        "timeText": "4m 33s",
        "costText": "5s 30c"
      },
      {
        "toId": 41,
        "toName": "Feathermoon",
        "toZone": "Feralas",
        "toSide": "Alliance",
        "yards": 14168,
        "copper": 730,
        "timeText": "7m 23s",
        "costText": "7s 30c"
      },
      {
        "toId": 49,
        "toName": "Moonglade",
        "toZone": "Moonglade",
        "toSide": "Alliance",
        "yards": 4525,
        "copper": 830,
        "timeText": "2m 21s",
        "costText": "8s 30c"
      },
      {
        "toId": 64,
        "toName": "Talrendis Point",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 8981,
        "copper": 730,
        "timeText": "4m 41s",
        "costText": "7s 30c"
      },
      {
        "toId": 65,
        "toName": "Talonbranch Glade",
        "toZone": "Mount Hyjal",
        "toSide": "Alliance",
        "yards": 5682,
        "copper": 730,
        "timeText": "2m 58s",
        "costText": "7s 30c"
      }
    ]
  },
  "27": {
    "id": 27,
    "name": "Rut'theran Village",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1438,
    "zone": "Teldrassil",
    "coords": {
      "x": 58.4,
      "y": 93.9
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 2551,
        "copper": 0,
        "timeText": "1m 20s",
        "costText": "0c"
      }
    ]
  },
  "28": {
    "id": 28,
    "name": "Astranaar",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1440,
    "zone": "Ashenvale",
    "coords": {
      "x": 34.5,
      "y": 48
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 4426,
        "copper": 330,
        "timeText": "2m 18s",
        "costText": "3s 30c"
      },
      {
        "toId": 33,
        "toName": "Stonetalon Peak",
        "toZone": "Stonetalon Mountains",
        "toSide": "Alliance",
        "yards": 4599,
        "copper": 330,
        "timeText": "2m 24s",
        "costText": "3s 30c"
      },
      {
        "toId": 64,
        "toName": "Talrendis Point",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 4428,
        "copper": 730,
        "timeText": "2m 18s",
        "costText": "7s 30c"
      }
    ]
  },
  "29": {
    "id": 29,
    "name": "Sun Rock Retreat",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1442,
    "zone": "Stonetalon Mountains",
    "coords": {
      "x": 45.2,
      "y": 59.9
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 5227,
        "copper": 210,
        "timeText": "2m 43s",
        "costText": "2s 10c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 4477,
        "copper": 210,
        "timeText": "2m 20s",
        "costText": "2s 10c"
      },
      {
        "toId": 38,
        "toName": "Shadowprey Village",
        "toZone": "Desolace",
        "toSide": "Horde",
        "yards": 4297,
        "copper": 530,
        "timeText": "2m 14s",
        "costText": "5s 30c"
      }
    ]
  },
  "30": {
    "id": 30,
    "name": "Freewind Post",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1441,
    "zone": "Thousand Needles",
    "coords": {
      "x": 45,
      "y": 49.1
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 6764,
        "copper": 430,
        "timeText": "3m 31s",
        "costText": "4s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 5810,
        "copper": 430,
        "timeText": "3m 2s",
        "costText": "4s 30c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 2782,
        "copper": 730,
        "timeText": "1m 27s",
        "costText": "7s 30c"
      },
      {
        "toId": 42,
        "toName": "Camp Mojache",
        "toZone": "Feralas",
        "toSide": "Horde",
        "yards": 3685,
        "copper": 730,
        "timeText": "1m 55s",
        "costText": "7s 30c"
      },
      {
        "toId": 77,
        "toName": "Camp Taurajo",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 4111,
        "copper": 430,
        "timeText": "2m 8s",
        "costText": "4s 30c"
      }
    ]
  },
  "31": {
    "id": 31,
    "name": "Thalanaar",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1441,
    "zone": "Thousand Needles",
    "coords": {
      "x": 7.8,
      "y": 17.9
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 32,
        "toName": "Theramore",
        "toZone": "Dustwallow Marsh",
        "toSide": "Alliance",
        "yards": 4780,
        "copper": 730,
        "timeText": "2m 29s",
        "costText": "7s 30c"
      },
      {
        "toId": 39,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Alliance",
        "yards": 5122,
        "copper": 730,
        "timeText": "2m 40s",
        "costText": "7s 30c"
      },
      {
        "toId": 41,
        "toName": "Feathermoon",
        "toZone": "Feralas",
        "toSide": "Alliance",
        "yards": 5335,
        "copper": 630,
        "timeText": "2m 47s",
        "costText": "6s 30c"
      }
    ]
  },
  "32": {
    "id": 32,
    "name": "Theramore",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1445,
    "zone": "Dustwallow Marsh",
    "coords": {
      "x": 67.5,
      "y": 51.2
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 18633,
        "copper": 630,
        "timeText": "9m 42s",
        "costText": "6s 30c"
      },
      {
        "toId": 31,
        "toName": "Thalanaar",
        "toZone": "Thousand Needles",
        "toSide": "Alliance",
        "yards": 4887,
        "copper": 430,
        "timeText": "2m 33s",
        "costText": "4s 30c"
      },
      {
        "toId": 37,
        "toName": "Nijel's Point",
        "toZone": "Desolace",
        "toSide": "Alliance",
        "yards": 10017,
        "copper": 530,
        "timeText": "5m 13s",
        "costText": "5s 30c"
      },
      {
        "toId": 39,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Alliance",
        "yards": 4694,
        "copper": 730,
        "timeText": "2m 27s",
        "costText": "7s 30c"
      },
      {
        "toId": 64,
        "toName": "Talrendis Point",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 7052,
        "copper": 730,
        "timeText": "3m 40s",
        "costText": "7s 30c"
      },
      {
        "toId": 80,
        "toName": "Ratchet",
        "toZone": "Durotar",
        "toSide": "Neutral",
        "yards": 3446,
        "copper": 110,
        "timeText": "1m 48s",
        "costText": "1s 10c"
      }
    ]
  },
  "33": {
    "id": 33,
    "name": "Stonetalon Peak",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1442,
    "zone": "Stonetalon Mountains",
    "coords": {
      "x": 36.5,
      "y": 7.2
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 5304,
        "copper": 330,
        "timeText": "2m 46s",
        "costText": "3s 30c"
      },
      {
        "toId": 28,
        "toName": "Astranaar",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 4613,
        "copper": 330,
        "timeText": "2m 24s",
        "costText": "3s 30c"
      },
      {
        "toId": 37,
        "toName": "Nijel's Point",
        "toZone": "Desolace",
        "toSide": "Alliance",
        "yards": 3803,
        "copper": 530,
        "timeText": "1m 59s",
        "costText": "5s 30c"
      }
    ]
  },
  "37": {
    "id": 37,
    "name": "Nijel's Point",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1443,
    "zone": "Desolace",
    "coords": {
      "x": 64.7,
      "y": 10.4
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 8458,
        "copper": 530,
        "timeText": "4m 24s",
        "costText": "5s 30c"
      },
      {
        "toId": 32,
        "toName": "Theramore",
        "toZone": "Dustwallow Marsh",
        "toSide": "Alliance",
        "yards": 9202,
        "copper": 530,
        "timeText": "4m 48s",
        "costText": "5s 30c"
      },
      {
        "toId": 33,
        "toName": "Stonetalon Peak",
        "toZone": "Stonetalon Mountains",
        "toSide": "Alliance",
        "yards": 3581,
        "copper": 330,
        "timeText": "1m 52s",
        "costText": "3s 30c"
      },
      {
        "toId": 41,
        "toName": "Feathermoon",
        "toZone": "Feralas",
        "toSide": "Alliance",
        "yards": 6949,
        "copper": 730,
        "timeText": "3m 37s",
        "costText": "7s 30c"
      }
    ]
  },
  "38": {
    "id": 38,
    "name": "Shadowprey Village",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1443,
    "zone": "Desolace",
    "coords": {
      "x": 21.6,
      "y": 74
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 5331,
        "copper": 530,
        "timeText": "2m 47s",
        "costText": "5s 30c"
      },
      {
        "toId": 29,
        "toName": "Sun Rock Retreat",
        "toZone": "Stonetalon Mountains",
        "toSide": "Horde",
        "yards": 5966,
        "copper": 210,
        "timeText": "3m 6s",
        "costText": "2s 10c"
      },
      {
        "toId": 42,
        "toName": "Camp Mojache",
        "toZone": "Feralas",
        "toSide": "Horde",
        "yards": 5873,
        "copper": 730,
        "timeText": "3m 4s",
        "costText": "7s 30c"
      }
    ]
  },
  "39": {
    "id": 39,
    "name": "Gadgetzan",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1446,
    "zone": "Tanaris",
    "coords": {
      "x": 51,
      "y": 29.3
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 31,
        "toName": "Thalanaar",
        "toZone": "Thousand Needles",
        "toSide": "Alliance",
        "yards": 5304,
        "copper": 430,
        "timeText": "2m 46s",
        "costText": "4s 30c"
      },
      {
        "toId": 32,
        "toName": "Theramore",
        "toZone": "Dustwallow Marsh",
        "toSide": "Alliance",
        "yards": 4606,
        "copper": 630,
        "timeText": "2m 24s",
        "costText": "6s 30c"
      },
      {
        "toId": 73,
        "toName": "Cenarion Hold",
        "toZone": "Silithus",
        "toSide": "Alliance",
        "yards": 5907,
        "copper": 1020,
        "timeText": "3m 5s",
        "costText": "10s 20c"
      },
      {
        "toId": 79,
        "toName": "Marshal's Refuge",
        "toZone": "Un'Goro Crater",
        "toSide": "Neutral",
        "yards": 3115,
        "copper": 830,
        "timeText": "1m 37s",
        "costText": "8s 30c"
      }
    ]
  },
  "40": {
    "id": 40,
    "name": "Gadgetzan",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1446,
    "zone": "Tanaris",
    "coords": {
      "x": 51.6,
      "y": 25.5
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 9107,
        "copper": 730,
        "timeText": "4m 45s",
        "costText": "7s 30c"
      },
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 10495,
        "copper": 730,
        "timeText": "5m 28s",
        "costText": "7s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 9008,
        "copper": 730,
        "timeText": "4m 42s",
        "costText": "7s 30c"
      },
      {
        "toId": 30,
        "toName": "Freewind Post",
        "toZone": "Thousand Needles",
        "toSide": "Horde",
        "yards": 2602,
        "copper": 430,
        "timeText": "1m 21s",
        "costText": "4s 30c"
      },
      {
        "toId": 42,
        "toName": "Camp Mojache",
        "toZone": "Feralas",
        "toSide": "Horde",
        "yards": 5973,
        "copper": 630,
        "timeText": "3m 7s",
        "costText": "6s 30c"
      },
      {
        "toId": 55,
        "toName": "Brackenwall Village",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 6647,
        "copper": 630,
        "timeText": "3m 28s",
        "costText": "6s 30c"
      },
      {
        "toId": 72,
        "toName": "Cenarion Hold",
        "toZone": "Silithus",
        "toSide": "Horde",
        "yards": 6976,
        "copper": 1020,
        "timeText": "3m 38s",
        "costText": "10s 20c"
      },
      {
        "toId": 79,
        "toName": "Marshal's Refuge",
        "toZone": "Un'Goro Crater",
        "toSide": "Neutral",
        "yards": 3218,
        "copper": 830,
        "timeText": "1m 41s",
        "costText": "8s 30c"
      }
    ]
  },
  "41": {
    "id": 41,
    "name": "Feathermoon",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1444,
    "zone": "Feralas",
    "coords": {
      "x": 30.3,
      "y": 43.3
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 14014,
        "copper": 730,
        "timeText": "7m 18s",
        "costText": "7s 30c"
      },
      {
        "toId": 31,
        "toName": "Thalanaar",
        "toZone": "Thousand Needles",
        "toSide": "Alliance",
        "yards": 4635,
        "copper": 430,
        "timeText": "2m 25s",
        "costText": "4s 30c"
      },
      {
        "toId": 37,
        "toName": "Nijel's Point",
        "toZone": "Desolace",
        "toSide": "Alliance",
        "yards": 6797,
        "copper": 730,
        "timeText": "3m 32s",
        "costText": "7s 30c"
      },
      {
        "toId": 73,
        "toName": "Cenarion Hold",
        "toZone": "Silithus",
        "toSide": "Alliance",
        "yards": 4774,
        "copper": 1030,
        "timeText": "2m 29s",
        "costText": "10s 30c"
      }
    ]
  },
  "42": {
    "id": 42,
    "name": "Camp Mojache",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1444,
    "zone": "Feralas",
    "coords": {
      "x": 75.4,
      "y": 44.3
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 7777,
        "copper": 730,
        "timeText": "4m 3s",
        "costText": "7s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 7915,
        "copper": 730,
        "timeText": "4m 7s",
        "costText": "7s 30c"
      },
      {
        "toId": 30,
        "toName": "Freewind Post",
        "toZone": "Thousand Needles",
        "toSide": "Horde",
        "yards": 3215,
        "copper": 430,
        "timeText": "1m 40s",
        "costText": "4s 30c"
      },
      {
        "toId": 38,
        "toName": "Shadowprey Village",
        "toZone": "Desolace",
        "toSide": "Horde",
        "yards": 6016,
        "copper": 730,
        "timeText": "3m 8s",
        "costText": "7s 30c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 6024,
        "copper": 630,
        "timeText": "3m 8s",
        "costText": "6s 30c"
      },
      {
        "toId": 72,
        "toName": "Cenarion Hold",
        "toZone": "Silithus",
        "toSide": "Horde",
        "yards": 3897,
        "copper": 1030,
        "timeText": "2m 2s",
        "costText": "10s 30c"
      }
    ]
  },
  "43": {
    "id": 43,
    "name": "Aerie Peak",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1425,
    "zone": "The Hinterlands",
    "coords": {
      "x": 11.1,
      "y": 46.1
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 7658,
        "copper": 730,
        "timeText": "3m 59s",
        "costText": "7s 30c"
      },
      {
        "toId": 14,
        "toName": "Southshore",
        "toZone": "Hillsbrad Foothills",
        "toSide": "Alliance",
        "yards": 2039,
        "copper": 330,
        "timeText": "1m 4s",
        "costText": "3s 30c"
      },
      {
        "toId": 16,
        "toName": "Refuge Pointe",
        "toZone": "Arathi Highlands",
        "toSide": "Alliance",
        "yards": 2267,
        "copper": 530,
        "timeText": "1m 11s",
        "costText": "5s 30c"
      },
      {
        "toId": 66,
        "toName": "Chillwind Camp",
        "toZone": "Alterac Mountains",
        "toSide": "Alliance",
        "yards": 1590,
        "copper": 1020,
        "timeText": "0m 50s",
        "costText": "10s 20c"
      },
      {
        "toId": 67,
        "toName": "Light's Hope Chapel",
        "toZone": "Eastern Plaguelands",
        "toSide": "Alliance",
        "yards": 4922,
        "copper": 1020,
        "timeText": "2m 34s",
        "costText": "10s 20c"
      }
    ]
  },
  "44": {
    "id": 44,
    "name": "Valormok",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1447,
    "zone": "Azshara",
    "coords": {
      "x": 22,
      "y": 49.7
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 7700,
        "copper": 830,
        "timeText": "4m 1s",
        "costText": "8s 30c"
      },
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 3622,
        "copper": 830,
        "timeText": "1m 53s",
        "costText": "8s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 5163,
        "copper": 830,
        "timeText": "2m 41s",
        "costText": "8s 30c"
      },
      {
        "toId": 48,
        "toName": "Bloodvenom Post",
        "toZone": "Felwood",
        "toSide": "Horde",
        "yards": 6955,
        "copper": 930,
        "timeText": "3m 37s",
        "costText": "9s 30c"
      },
      {
        "toId": 53,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Horde",
        "yards": 3905,
        "copper": 1020,
        "timeText": "2m 2s",
        "costText": "10s 20c"
      },
      {
        "toId": 61,
        "toName": "Splintertree Post",
        "toZone": "Ashenvale",
        "toSide": "Horde",
        "yards": 2795,
        "copper": 530,
        "timeText": "1m 27s",
        "costText": "5s 30c"
      }
    ]
  },
  "45": {
    "id": 45,
    "name": "Nethergarde Keep",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1435,
    "zone": "Swamp of Sorrows",
    "coords": {
      "x": 52.9,
      "y": 97.5
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 5672,
        "copper": 830,
        "timeText": "2m 57s",
        "costText": "8s 30c"
      },
      {
        "toId": 12,
        "toName": "Darkshire",
        "toZone": "Duskwood",
        "toSide": "Alliance",
        "yards": 2748,
        "copper": 330,
        "timeText": "1m 26s",
        "costText": "3s 30c"
      },
      {
        "toId": 71,
        "toName": "Morgan's Vigil",
        "toZone": "Burning Steppes",
        "toSide": "Alliance",
        "yards": 6251,
        "copper": 830,
        "timeText": "3m 15s",
        "costText": "8s 30c"
      }
    ]
  },
  "48": {
    "id": 48,
    "name": "Bloodvenom Post",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1448,
    "zone": "Felwood",
    "coords": {
      "x": 34.4,
      "y": 53.9
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 7747,
        "copper": 930,
        "timeText": "4m 2s",
        "costText": "9s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 7227,
        "copper": 930,
        "timeText": "3m 46s",
        "costText": "9s 30c"
      },
      {
        "toId": 44,
        "toName": "Valormok",
        "toZone": "Azshara",
        "toSide": "Horde",
        "yards": 7221,
        "copper": 830,
        "timeText": "3m 46s",
        "costText": "8s 30c"
      },
      {
        "toId": 53,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Horde",
        "yards": 5700,
        "copper": 1020,
        "timeText": "2m 58s",
        "costText": "10s 20c"
      },
      {
        "toId": 69,
        "toName": "Moonglade",
        "toZone": "Moonglade",
        "toSide": "Horde",
        "yards": 4947,
        "copper": 830,
        "timeText": "2m 35s",
        "costText": "8s 30c"
      }
    ]
  },
  "49": {
    "id": 49,
    "name": "Moonglade",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1450,
    "zone": "Moonglade",
    "coords": {
      "x": 47.9,
      "y": 67.1
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 4247,
        "copper": 830,
        "timeText": "2m 13s",
        "costText": "8s 30c"
      },
      {
        "toId": 52,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Alliance",
        "yards": 3900,
        "copper": 1020,
        "timeText": "2m 2s",
        "costText": "10s 20c"
      },
      {
        "toId": 65,
        "toName": "Talonbranch Glade",
        "toZone": "Mount Hyjal",
        "toSide": "Alliance",
        "yards": 1840,
        "copper": 730,
        "timeText": "0m 58s",
        "costText": "7s 30c"
      }
    ]
  },
  "52": {
    "id": 52,
    "name": "Everlook",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1452,
    "zone": "Winterspring",
    "coords": {
      "x": 62.3,
      "y": 36.6
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 49,
        "toName": "Moonglade",
        "toZone": "Moonglade",
        "toSide": "Alliance",
        "yards": 3639,
        "copper": 830,
        "timeText": "1m 54s",
        "costText": "8s 30c"
      },
      {
        "toId": 64,
        "toName": "Talrendis Point",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 5265,
        "copper": 730,
        "timeText": "2m 45s",
        "costText": "7s 30c"
      },
      {
        "toId": 65,
        "toName": "Talonbranch Glade",
        "toZone": "Mount Hyjal",
        "toSide": "Alliance",
        "yards": 3670,
        "copper": 730,
        "timeText": "1m 55s",
        "costText": "7s 30c"
      },
      {
        "toId": 3242,
        "toName": "Tainted Foothills",
        "toZone": "Mount Hyjal",
        "toSide": "Neutral",
        "yards": 4057,
        "copper": 330,
        "timeText": "2m 7s",
        "costText": "3s 30c"
      }
    ]
  },
  "53": {
    "id": 53,
    "name": "Everlook",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1452,
    "zone": "Winterspring",
    "coords": {
      "x": 60.5,
      "y": 36.3
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 9115,
        "copper": 1020,
        "timeText": "4m 45s",
        "costText": "10s 20c"
      },
      {
        "toId": 44,
        "toName": "Valormok",
        "toZone": "Azshara",
        "toSide": "Horde",
        "yards": 4078,
        "copper": 830,
        "timeText": "2m 7s",
        "costText": "8s 30c"
      },
      {
        "toId": 48,
        "toName": "Bloodvenom Post",
        "toZone": "Felwood",
        "toSide": "Horde",
        "yards": 5853,
        "copper": 930,
        "timeText": "3m 3s",
        "costText": "9s 30c"
      },
      {
        "toId": 69,
        "toName": "Moonglade",
        "toZone": "Moonglade",
        "toSide": "Horde",
        "yards": 4016,
        "copper": 830,
        "timeText": "2m 6s",
        "costText": "8s 30c"
      },
      {
        "toId": 3242,
        "toName": "Tainted Foothills",
        "toZone": "Mount Hyjal",
        "toSide": "Neutral",
        "yards": 4078,
        "copper": 330,
        "timeText": "2m 7s",
        "costText": "3s 30c"
      }
    ]
  },
  "55": {
    "id": 55,
    "name": "Brackenwall Village",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1413,
    "zone": "The Barrens",
    "coords": {
      "x": 53.9,
      "y": 70.5
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 6729,
        "copper": 630,
        "timeText": "3m 30s",
        "costText": "6s 30c"
      },
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 6496,
        "copper": 630,
        "timeText": "3m 23s",
        "costText": "6s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 4848,
        "copper": 630,
        "timeText": "2m 32s",
        "costText": "6s 30c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 6660,
        "copper": 730,
        "timeText": "3m 28s",
        "costText": "7s 30c"
      }
    ]
  },
  "56": {
    "id": 56,
    "name": "Stonard",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1435,
    "zone": "Swamp of Sorrows",
    "coords": {
      "x": 46.1,
      "y": 54.7
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 18,
        "toName": "Booty Bay",
        "toZone": "Stranglethorn Vale",
        "toSide": "Horde",
        "yards": 7798,
        "copper": 630,
        "timeText": "4m 4s",
        "costText": "6s 30c"
      },
      {
        "toId": 20,
        "toName": "Grom'gol",
        "toZone": "Stranglethorn Vale",
        "toSide": "Horde",
        "yards": 5646,
        "copper": 630,
        "timeText": "2m 56s",
        "costText": "6s 30c"
      },
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 8555,
        "copper": 630,
        "timeText": "4m 27s",
        "costText": "6s 30c"
      },
      {
        "toId": 70,
        "toName": "Flame Crest",
        "toZone": "Burning Steppes",
        "toSide": "Horde",
        "yards": 5916,
        "copper": 830,
        "timeText": "3m 5s",
        "costText": "8s 30c"
      },
      {
        "toId": 3203,
        "toName": "Rog'mar",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Horde",
        "yards": 5085,
        "copper": 630,
        "timeText": "2m 39s",
        "costText": "6s 30c"
      }
    ]
  },
  "57": {
    "id": 57,
    "name": "Fishing Village",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1438,
    "zone": "Teldrassil",
    "coords": {
      "x": 55.4,
      "y": 92.2
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": []
  },
  "58": {
    "id": 58,
    "name": "Zoram'gar Outpost",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1440,
    "zone": "Ashenvale",
    "coords": {
      "x": 12.2,
      "y": 33.8
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 6827,
        "copper": 110,
        "timeText": "3m 33s",
        "costText": "1s 10c"
      },
      {
        "toId": 61,
        "toName": "Splintertree Post",
        "toZone": "Ashenvale",
        "toSide": "Horde",
        "yards": 5013,
        "copper": 530,
        "timeText": "2m 37s",
        "costText": "5s 30c"
      }
    ]
  },
  "61": {
    "id": 61,
    "name": "Splintertree Post",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1440,
    "zone": "Ashenvale",
    "coords": {
      "x": 73.3,
      "y": 61.7
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 23,
        "toName": "Orgrimmar",
        "toZone": "Orgrimmar",
        "toSide": "Horde",
        "yards": 2869,
        "copper": 530,
        "timeText": "1m 30s",
        "costText": "5s 30c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 4806,
        "copper": 530,
        "timeText": "2m 30s",
        "costText": "5s 30c"
      },
      {
        "toId": 44,
        "toName": "Valormok",
        "toZone": "Azshara",
        "toSide": "Horde",
        "yards": 2870,
        "copper": 830,
        "timeText": "1m 30s",
        "costText": "8s 30c"
      },
      {
        "toId": 58,
        "toName": "Zoram'gar Outpost",
        "toZone": "Ashenvale",
        "toSide": "Horde",
        "yards": 4995,
        "copper": 330,
        "timeText": "2m 36s",
        "costText": "3s 30c"
      }
    ]
  },
  "62": {
    "id": 62,
    "name": "Nighthaven",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1450,
    "zone": "Moonglade",
    "coords": {
      "x": 44.3,
      "y": 45.3
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 27,
        "toName": "Rut'theran Village",
        "toZone": "Teldrassil",
        "toSide": "Alliance",
        "yards": 4559,
        "copper": 0,
        "timeText": "2m 22s",
        "costText": "0c"
      }
    ]
  },
  "63": {
    "id": 63,
    "name": "Nighthaven",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1450,
    "zone": "Moonglade",
    "coords": {
      "x": 44.3,
      "y": 45.7
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 16313,
        "copper": 0,
        "timeText": "8m 30s",
        "costText": "0c"
      }
    ]
  },
  "64": {
    "id": 64,
    "name": "Talrendis Point",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1440,
    "zone": "Ashenvale",
    "coords": {
      "x": 96.8,
      "y": 50.8
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 9038,
        "copper": 730,
        "timeText": "4m 42s",
        "costText": "7s 30c"
      },
      {
        "toId": 28,
        "toName": "Astranaar",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 4578,
        "copper": 330,
        "timeText": "2m 23s",
        "costText": "3s 30c"
      },
      {
        "toId": 32,
        "toName": "Theramore",
        "toZone": "Dustwallow Marsh",
        "toSide": "Alliance",
        "yards": 7242,
        "copper": 630,
        "timeText": "3m 46s",
        "costText": "6s 30c"
      },
      {
        "toId": 52,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Alliance",
        "yards": 5355,
        "copper": 1030,
        "timeText": "2m 47s",
        "costText": "10s 30c"
      },
      {
        "toId": 65,
        "toName": "Talonbranch Glade",
        "toZone": "Mount Hyjal",
        "toSide": "Alliance",
        "yards": 8502,
        "copper": 730,
        "timeText": "4m 26s",
        "costText": "7s 30c"
      },
      {
        "toId": 80,
        "toName": "Ratchet",
        "toZone": "Durotar",
        "toSide": "Neutral",
        "yards": 4062,
        "copper": 110,
        "timeText": "2m 7s",
        "costText": "1s 10c"
      }
    ]
  },
  "65": {
    "id": 65,
    "name": "Talonbranch Glade",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 2482,
    "zone": "Mount Hyjal",
    "coords": {
      "x": 29.6,
      "y": 4.2
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 26,
        "toName": "Auberdine",
        "toZone": "Darkshore",
        "toSide": "Alliance",
        "yards": 5622,
        "copper": 730,
        "timeText": "2m 56s",
        "costText": "7s 30c"
      },
      {
        "toId": 49,
        "toName": "Moonglade",
        "toZone": "Moonglade",
        "toSide": "Alliance",
        "yards": 2005,
        "copper": 1020,
        "timeText": "1m 3s",
        "costText": "10s 20c"
      },
      {
        "toId": 52,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Alliance",
        "yards": 3601,
        "copper": 1020,
        "timeText": "1m 53s",
        "costText": "10s 20c"
      },
      {
        "toId": 64,
        "toName": "Talrendis Point",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 8465,
        "copper": 730,
        "timeText": "4m 25s",
        "costText": "7s 30c"
      }
    ]
  },
  "66": {
    "id": 66,
    "name": "Chillwind Camp",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1416,
    "zone": "Alterac Mountains",
    "coords": {
      "x": 79.1,
      "y": 30.5
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 7782,
        "copper": 1020,
        "timeText": "4m 3s",
        "costText": "10s 20c"
      },
      {
        "toId": 14,
        "toName": "Southshore",
        "toZone": "Hillsbrad Foothills",
        "toSide": "Alliance",
        "yards": 2559,
        "copper": 330,
        "timeText": "1m 20s",
        "costText": "3s 30c"
      },
      {
        "toId": 43,
        "toName": "Aerie Peak",
        "toZone": "The Hinterlands",
        "toSide": "Alliance",
        "yards": 1958,
        "copper": 730,
        "timeText": "1m 1s",
        "costText": "7s 30c"
      },
      {
        "toId": 67,
        "toName": "Light's Hope Chapel",
        "toZone": "Eastern Plaguelands",
        "toSide": "Alliance",
        "yards": 4390,
        "copper": 1020,
        "timeText": "2m 17s",
        "costText": "10s 20c"
      }
    ]
  },
  "67": {
    "id": 67,
    "name": "Light's Hope Chapel",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 71.7,
      "y": 49.6
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 11024,
        "copper": 1020,
        "timeText": "5m 45s",
        "costText": "10s 20c"
      },
      {
        "toId": 43,
        "toName": "Aerie Peak",
        "toZone": "The Hinterlands",
        "toSide": "Alliance",
        "yards": 4871,
        "copper": 730,
        "timeText": "2m 32s",
        "costText": "7s 30c"
      },
      {
        "toId": 66,
        "toName": "Chillwind Camp",
        "toZone": "Alterac Mountains",
        "toSide": "Alliance",
        "yards": 4484,
        "copper": 1020,
        "timeText": "2m 20s",
        "costText": "10s 20c"
      }
    ]
  },
  "68": {
    "id": 68,
    "name": "Light's Hope Chapel",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 70.4,
      "y": 47.6
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 11,
        "toName": "Undercity",
        "toZone": "Undercity",
        "toSide": "Horde",
        "yards": 7837,
        "copper": 1020,
        "timeText": "4m 5s",
        "costText": "10s 20c"
      },
      {
        "toId": 76,
        "toName": "Revantusk Village",
        "toZone": "The Hinterlands",
        "toSide": "Horde",
        "yards": 4232,
        "copper": 730,
        "timeText": "2m 12s",
        "costText": "7s 30c"
      }
    ]
  },
  "69": {
    "id": 69,
    "name": "Moonglade",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1450,
    "zone": "Moonglade",
    "coords": {
      "x": 32.2,
      "y": 66.3
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 48,
        "toName": "Bloodvenom Post",
        "toZone": "Felwood",
        "toSide": "Horde",
        "yards": 4713,
        "copper": 930,
        "timeText": "2m 27s",
        "costText": "9s 30c"
      },
      {
        "toId": 53,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Horde",
        "yards": 4256,
        "copper": 1020,
        "timeText": "2m 13s",
        "costText": "10s 20c"
      }
    ]
  },
  "70": {
    "id": 70,
    "name": "Flame Crest",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1428,
    "zone": "Burning Steppes",
    "coords": {
      "x": 65.6,
      "y": 24.2
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 2994,
        "copper": 830,
        "timeText": "1m 34s",
        "costText": "8s 30c"
      },
      {
        "toId": 56,
        "toName": "Stonard",
        "toZone": "Swamp of Sorrows",
        "toSide": "Horde",
        "yards": 6376,
        "copper": 830,
        "timeText": "3m 19s",
        "costText": "8s 30c"
      },
      {
        "toId": 75,
        "toName": "Thorium Point",
        "toZone": "Searing Gorge",
        "toSide": "Horde",
        "yards": 2154,
        "copper": 830,
        "timeText": "1m 7s",
        "costText": "8s 30c"
      },
      {
        "toId": 3203,
        "toName": "Rog'mar",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Horde",
        "yards": 4113,
        "copper": 630,
        "timeText": "2m 9s",
        "costText": "6s 30c"
      }
    ]
  },
  "71": {
    "id": 71,
    "name": "Morgan's Vigil",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1428,
    "zone": "Burning Steppes",
    "coords": {
      "x": 84.4,
      "y": 68.3
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 2,
        "toName": "Stormwind",
        "toZone": "Stormwind City",
        "toSide": "Alliance",
        "yards": 4528,
        "copper": 830,
        "timeText": "2m 22s",
        "costText": "8s 30c"
      },
      {
        "toId": 5,
        "toName": "Lakeshire",
        "toZone": "Redridge Mountains",
        "toSide": "Alliance",
        "yards": 1884,
        "copper": 210,
        "timeText": "0m 59s",
        "costText": "2s 10c"
      },
      {
        "toId": 45,
        "toName": "Nethergarde Keep",
        "toZone": "Swamp of Sorrows",
        "toSide": "Alliance",
        "yards": 6288,
        "copper": 830,
        "timeText": "3m 17s",
        "costText": "8s 30c"
      },
      {
        "toId": 74,
        "toName": "Thorium Point",
        "toZone": "Searing Gorge",
        "toSide": "Alliance",
        "yards": 3090,
        "copper": 830,
        "timeText": "1m 37s",
        "costText": "8s 30c"
      },
      {
        "toId": 3276,
        "toName": "Farholde Keep",
        "toZone": "Blasted Lands / Coast",
        "toSide": "Alliance",
        "yards": 3936,
        "copper": 630,
        "timeText": "2m 3s",
        "costText": "6s 30c"
      }
    ]
  },
  "72": {
    "id": 72,
    "name": "Cenarion Hold",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1451,
    "zone": "Silithus",
    "coords": {
      "x": 48.8,
      "y": 36.7
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 7224,
        "copper": 730,
        "timeText": "3m 46s",
        "costText": "7s 30c"
      },
      {
        "toId": 42,
        "toName": "Camp Mojache",
        "toZone": "Feralas",
        "toSide": "Horde",
        "yards": 3895,
        "copper": 730,
        "timeText": "2m 2s",
        "costText": "7s 30c"
      },
      {
        "toId": 79,
        "toName": "Marshal's Refuge",
        "toZone": "Un'Goro Crater",
        "toSide": "Neutral",
        "yards": 2896,
        "copper": 830,
        "timeText": "1m 31s",
        "costText": "8s 30c"
      }
    ]
  },
  "73": {
    "id": 73,
    "name": "Cenarion Hold",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1451,
    "zone": "Silithus",
    "coords": {
      "x": 50.7,
      "y": 34.6
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 39,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Alliance",
        "yards": 5652,
        "copper": 730,
        "timeText": "2m 57s",
        "costText": "7s 30c"
      },
      {
        "toId": 41,
        "toName": "Feathermoon",
        "toZone": "Feralas",
        "toSide": "Alliance",
        "yards": 5239,
        "copper": 730,
        "timeText": "2m 44s",
        "costText": "7s 30c"
      },
      {
        "toId": 79,
        "toName": "Marshal's Refuge",
        "toZone": "Un'Goro Crater",
        "toSide": "Neutral",
        "yards": 2745,
        "copper": 830,
        "timeText": "1m 26s",
        "costText": "8s 30c"
      }
    ]
  },
  "74": {
    "id": 74,
    "name": "Thorium Point",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1427,
    "zone": "Searing Gorge",
    "coords": {
      "x": 37.9,
      "y": 30.4
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 6,
        "toName": "Ironforge",
        "toZone": "Ironforge",
        "toSide": "Alliance",
        "yards": 2802,
        "copper": 830,
        "timeText": "1m 28s",
        "costText": "8s 30c"
      },
      {
        "toId": 71,
        "toName": "Morgan's Vigil",
        "toZone": "Burning Steppes",
        "toSide": "Alliance",
        "yards": 2865,
        "copper": 830,
        "timeText": "1m 30s",
        "costText": "8s 30c"
      }
    ]
  },
  "75": {
    "id": 75,
    "name": "Thorium Point",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1427,
    "zone": "Searing Gorge",
    "coords": {
      "x": 34.8,
      "y": 30.6
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 2090,
        "copper": 630,
        "timeText": "1m 5s",
        "costText": "6s 30c"
      },
      {
        "toId": 70,
        "toName": "Flame Crest",
        "toZone": "Burning Steppes",
        "toSide": "Horde",
        "yards": 2297,
        "copper": 830,
        "timeText": "1m 12s",
        "costText": "8s 30c"
      }
    ]
  },
  "76": {
    "id": 76,
    "name": "Revantusk Village",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1425,
    "zone": "The Hinterlands",
    "coords": {
      "x": 81.7,
      "y": 81.9
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 11,
        "toName": "Undercity",
        "toZone": "Undercity",
        "toSide": "Horde",
        "yards": 8538,
        "copper": 730,
        "timeText": "4m 27s",
        "costText": "7s 30c"
      },
      {
        "toId": 13,
        "toName": "Tarren Mill",
        "toZone": "Alterac Mountains",
        "toSide": "Horde",
        "yards": 4767,
        "copper": 330,
        "timeText": "2m 29s",
        "costText": "3s 30c"
      },
      {
        "toId": 17,
        "toName": "Hammerfall",
        "toZone": "Arathi Highlands",
        "toSide": "Horde",
        "yards": 2785,
        "copper": 530,
        "timeText": "1m 27s",
        "costText": "5s 30c"
      },
      {
        "toId": 68,
        "toName": "Light's Hope Chapel",
        "toZone": "Eastern Plaguelands",
        "toSide": "Horde",
        "yards": 4159,
        "copper": 1030,
        "timeText": "2m 10s",
        "costText": "10s 30c"
      }
    ]
  },
  "77": {
    "id": 77,
    "name": "Camp Taurajo",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1413,
    "zone": "The Barrens",
    "coords": {
      "x": 44.5,
      "y": 59.1
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 22,
        "toName": "Thunder Bluff",
        "toZone": "Thunder Bluff",
        "toSide": "Horde",
        "yards": 3410,
        "copper": 110,
        "timeText": "1m 47s",
        "costText": "1s 10c"
      },
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 2380,
        "copper": 110,
        "timeText": "1m 14s",
        "costText": "1s 10c"
      },
      {
        "toId": 30,
        "toName": "Freewind Post",
        "toZone": "Thousand Needles",
        "toSide": "Horde",
        "yards": 3750,
        "copper": 430,
        "timeText": "1m 57s",
        "costText": "4s 30c"
      }
    ]
  },
  "79": {
    "id": 79,
    "name": "Marshal's Refuge",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1449,
    "zone": "Un'Goro Crater",
    "coords": {
      "x": 45.3,
      "y": 6
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 39,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Alliance",
        "yards": 3100,
        "copper": 730,
        "timeText": "1m 37s",
        "costText": "7s 30c"
      },
      {
        "toId": 40,
        "toName": "Gadgetzan",
        "toZone": "Tanaris",
        "toSide": "Horde",
        "yards": 3396,
        "copper": 730,
        "timeText": "1m 46s",
        "costText": "7s 30c"
      },
      {
        "toId": 72,
        "toName": "Cenarion Hold",
        "toZone": "Silithus",
        "toSide": "Horde",
        "yards": 3003,
        "copper": 1030,
        "timeText": "1m 34s",
        "costText": "10s 30c"
      },
      {
        "toId": 73,
        "toName": "Cenarion Hold",
        "toZone": "Silithus",
        "toSide": "Alliance",
        "yards": 2823,
        "copper": 1030,
        "timeText": "1m 28s",
        "costText": "10s 30c"
      }
    ]
  },
  "80": {
    "id": 80,
    "name": "Ratchet",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 1411,
    "zone": "Durotar",
    "coords": {
      "x": 34.2,
      "y": 76.7
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 25,
        "toName": "Crossroads",
        "toZone": "The Barrens",
        "toSide": "Horde",
        "yards": 2041,
        "copper": 110,
        "timeText": "1m 4s",
        "costText": "1s 10c"
      },
      {
        "toId": 32,
        "toName": "Theramore",
        "toZone": "Dustwallow Marsh",
        "toSide": "Alliance",
        "yards": 3149,
        "copper": 630,
        "timeText": "1m 38s",
        "costText": "6s 30c"
      },
      {
        "toId": 64,
        "toName": "Talrendis Point",
        "toZone": "Ashenvale",
        "toSide": "Alliance",
        "yards": 3960,
        "copper": 730,
        "timeText": "2m 4s",
        "costText": "7s 30c"
      }
    ]
  },
  "84": {
    "id": 84,
    "name": "Plaguewood Tower",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 18.5,
      "y": 24.2
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": false,
    "connections": [
      {
        "toId": 85,
        "toName": "Northpass Tower",
        "toZone": "Eastern Plaguelands",
        "toSide": "Neutral",
        "yards": 1478,
        "copper": 0,
        "timeText": "0m 46s",
        "costText": "0c"
      },
      {
        "toId": 85,
        "toName": "Northpass Tower",
        "toZone": "Eastern Plaguelands",
        "toSide": "Neutral",
        "yards": 1478,
        "copper": 0,
        "timeText": "0m 46s",
        "costText": "0c"
      },
      {
        "toId": 86,
        "toName": "Eastwall Tower",
        "toZone": "Eastern Plaguelands",
        "toSide": "Neutral",
        "yards": 1897,
        "copper": 0,
        "timeText": "0m 59s",
        "costText": "0c"
      },
      {
        "toId": 87,
        "toName": "Crown Guard Tower",
        "toZone": "Eastern Plaguelands",
        "toSide": "Neutral",
        "yards": 1539,
        "copper": 0,
        "timeText": "0m 48s",
        "costText": "0c"
      }
    ]
  },
  "85": {
    "id": 85,
    "name": "Northpass Tower",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 47.2,
      "y": 20.3
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": false,
    "connections": []
  },
  "86": {
    "id": 86,
    "name": "Eastwall Tower",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 57.8,
      "y": 41.6
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": false,
    "connections": []
  },
  "87": {
    "id": 87,
    "name": "Crown Guard Tower",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1423,
    "zone": "Eastern Plaguelands",
    "coords": {
      "x": 32.6,
      "y": 64
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": false,
    "connections": []
  },
  "559": {
    "id": 559,
    "name": "Summit of Eternity",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 2482,
    "zone": "Mount Hyjal",
    "coords": {
      "x": 68.6,
      "y": 44.1
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": true,
    "connections": [
      {
        "toId": 3242,
        "toName": "Tainted Foothills",
        "toZone": "Mount Hyjal",
        "toSide": "Neutral",
        "yards": 1866,
        "copper": 510,
        "timeText": "0m 58s",
        "costText": "5s 10c"
      }
    ]
  },
  "3203": {
    "id": 3203,
    "name": "Rog'mar",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 2548,
    "zone": "Blasted Lands / Coast",
    "coords": {
      "x": 59.6,
      "y": 45.1
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": true,
    "connections": [
      {
        "toId": 17,
        "toName": "Hammerfall",
        "toZone": "Arathi Highlands",
        "toSide": "Horde",
        "yards": 9845,
        "copper": 830,
        "timeText": "5m 8s",
        "costText": "8s 30c"
      },
      {
        "toId": 21,
        "toName": "Kargath",
        "toZone": "Badlands",
        "toSide": "Horde",
        "yards": 3607,
        "copper": 630,
        "timeText": "1m 53s",
        "costText": "6s 30c"
      },
      {
        "toId": 56,
        "toName": "Stonard",
        "toZone": "Swamp of Sorrows",
        "toSide": "Horde",
        "yards": 4624,
        "copper": 630,
        "timeText": "2m 25s",
        "costText": "6s 30c"
      },
      {
        "toId": 70,
        "toName": "Flame Crest",
        "toZone": "Burning Steppes",
        "toSide": "Horde",
        "yards": 3993,
        "copper": 630,
        "timeText": "2m 5s",
        "costText": "6s 30c"
      }
    ]
  },
  "3205": {
    "id": 3205,
    "name": "Tidegear Coast",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 1426,
    "zone": "Dun Morogh",
    "coords": {
      "x": 19,
      "y": 15.2
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": true,
    "connections": []
  },
  "3242": {
    "id": 3242,
    "name": "Tainted Foothills",
    "continent": 1,
    "continentName": "Kalimdor",
    "uiMap": 2482,
    "zone": "Mount Hyjal",
    "coords": {
      "x": 55.1,
      "y": 82.5
    },
    "side": "Neutral",
    "sideKey": "n",
    "isNewInForever": true,
    "connections": [
      {
        "toId": 52,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Alliance",
        "yards": 3745,
        "copper": 1020,
        "timeText": "1m 57s",
        "costText": "10s 20c"
      },
      {
        "toId": 53,
        "toName": "Everlook",
        "toZone": "Winterspring",
        "toSide": "Horde",
        "yards": 3967,
        "copper": 1020,
        "timeText": "2m 4s",
        "costText": "10s 20c"
      },
      {
        "toId": 559,
        "toName": "Summit of Eternity",
        "toZone": "Mount Hyjal",
        "toSide": "Neutral",
        "yards": 1849,
        "copper": 510,
        "timeText": "0m 58s",
        "costText": "5s 10c"
      }
    ]
  },
  "3274": {
    "id": 3274,
    "name": "Powderfuse Port",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 2548,
    "zone": "Blasted Lands / Coast",
    "coords": {
      "x": 79,
      "y": 52.3
    },
    "side": "Horde",
    "sideKey": "h",
    "isNewInForever": true,
    "connections": []
  },
  "3275": {
    "id": 3275,
    "name": "Powderfuse Port",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 2548,
    "zone": "Blasted Lands / Coast",
    "coords": {
      "x": 76.8,
      "y": 53
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": true,
    "connections": []
  },
  "3276": {
    "id": 3276,
    "name": "Farholde Keep",
    "continent": 0,
    "continentName": "Eastern Kingdoms",
    "uiMap": 2548,
    "zone": "Blasted Lands / Coast",
    "coords": {
      "x": 60.6,
      "y": 81.6
    },
    "side": "Alliance",
    "sideKey": "a",
    "isNewInForever": true,
    "connections": [
      {
        "toId": 5,
        "toName": "Lakeshire",
        "toZone": "Redridge Mountains",
        "toSide": "Alliance",
        "yards": 3917,
        "copper": 630,
        "timeText": "2m 2s",
        "costText": "6s 30c"
      },
      {
        "toId": 8,
        "toName": "Thelsamar",
        "toZone": "Loch Modan",
        "toSide": "Alliance",
        "yards": 5193,
        "copper": 630,
        "timeText": "2m 42s",
        "costText": "6s 30c"
      },
      {
        "toId": 71,
        "toName": "Morgan's Vigil",
        "toZone": "Burning Steppes",
        "toSide": "Alliance",
        "yards": 3676,
        "copper": 630,
        "timeText": "1m 55s",
        "costText": "6s 30c"
      }
    ]
  }
}
    };
})();
