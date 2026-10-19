window.WOW_PROGRESSION_DATA = {
  "macros": {
    "hunter": [
      {
        "id": "hunter-macro-1",
        "title": "Mark and send pet",
        "desc": "Mark your target and send your pet at it with one button.",
        "category": "Pet & Utility",
        "code": "#showtooltip Hunter's Mark /petattack /cast Hunter's Mark"
      },
      {
        "id": "hunter-macro-2",
        "title": "Mend your pet",
        "desc": "Heal your pet while keeping your enemy selected.",
        "category": "Pet & Utility",
        "code": "#showtooltip Mend Pet /cast [@pet,exists,nodead] Mend Pet"
      },
      {
        "id": "hunter-macro-3",
        "title": "Send your pet at your mouseover",
        "desc": "Your pet attacks the enemy under your mouse without changing your target; with nothing hovered it goes for your target.",
        "category": "Pet & Utility",
        "code": "/petattack [@mouseover,harm,nodead][]"
      },
      {
        "id": "hunter-macro-4",
        "title": "Pet attack, Shift to recall",
        "desc": "Send your pet at your target. Hold Shift to make it passive and bring it back; recalling never sends another attack command in the same press.",
        "category": "Pet & Utility",
        "code": "/petattack [nomod:shift,harm,nodead] /petpassive [mod:shift] /petfollow [mod:shift]"
      },
      {
        "id": "hunter-macro-5",
        "title": "Call, revive or mend your pet",
        "desc": "Mends a healthy pet, calls it if it isn't out and revives it if it's dead.",
        "category": "Pet & Utility",
        "code": "#showtooltip /cast [@pet,dead][mod:shift] Revive Pet; [nopet] Call Pet; Mend Pet"
      },
      {
        "id": "hunter-macro-6",
        "title": "Feed your pet outside combat",
        "desc": "Casts Feed Pet and hands over the food, only when your pet is out and you're out of combat.",
        "category": "Pet & Utility",
        "code": "#showtooltip Feed Pet /cast [pet,nocombat] Feed Pet /use [pet,nocombat] Chunk of Boar Meat"
      },
      {
        "id": "hunter-macro-7",
        "title": "Aspect of the Hawk after Cheetah",
        "desc": "Drops Aspect of the Cheetah and puts Hawk on, without toggling Hawk off if it's already up.",
        "category": "General",
        "code": "#showtooltip Aspect of the Hawk /cancelaura Aspect of the Cheetah /cast !Aspect of the Hawk"
      },
      {
        "id": "hunter-macro-8",
        "title": "Cheetah, or Pack on right-click",
        "desc": "Left-click for Aspect of the Cheetah and right-click for Aspect of the Pack when the group needs to move.",
        "category": "General",
        "code": "#showtooltip Aspect of the Cheetah /cast [button:2] !Aspect of the Pack; !Aspect of the Cheetah"
      },
      {
        "id": "hunter-macro-9",
        "title": "Tracking on one button",
        "desc": "Switch tracking with modifier keys instead of opening the spellbook.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift] Track Beasts; [mod:ctrl] Track Undead; [mod:alt] Track Hidden; Track Humanoids"
      },
      {
        "id": "hunter-macro-10",
        "title": "Feign Death that lets combat drop",
        "desc": "Tells your pet to stand down and stops your shooting first, then feigns only if you're in combat.",
        "category": "General",
        "code": "#showtooltip Feign Death /petpassive /petfollow /stopattack /stopcasting /cast [combat] Feign Death"
      },
      {
        "id": "hunter-macro-11",
        "title": "Cancel Cheetah or Pack",
        "desc": "Remove either running aspect immediately without spending mana on another aspect. Useful before incoming damage can daze you or your group.",
        "category": "General",
        "code": "/cancelaura Aspect of the Cheetah /cancelaura Aspect of the Pack"
      },
      {
        "id": "hunter-macro-12",
        "title": "Chain Eagle Eye viewpoints",
        "desc": "Open Eagle Eye's targeting circle without cancelling the existing viewpoint. Choose the next spot with a click; movement or Escape ends scouting.",
        "category": "General",
        "code": "#showtooltip Eagle Eye /cast !Eagle Eye"
      },
      {
        "id": "hunter-macro-13",
        "title": "Intimidation and pet attack",
        "desc": "Send your pet; its next successful attack stuns the enemy.",
        "category": "Pet & Utility",
        "code": "#showtooltip Intimidation /petattack /cast Intimidation"
      },
      {
        "id": "hunter-macro-14",
        "title": "Call your pet back",
        "desc": "Stop its attack and bring it back before it pulls more enemies.",
        "category": "Pet & Utility",
        "code": "/petpassive /petfollow"
      },
      {
        "id": "hunter-macro-15",
        "title": "Arcane Shot or Summon Hawk",
        "desc": "Fires Arcane Shot, or sends a hawk at your target or mouseover; both use one cooldown, so you pick one per window.",
        "category": "Combat & Rotations",
        "code": "#showtooltip /cast [mod:ctrl,@mouseover,harm,nodead] Summon Hawk; [mod:shift] Summon Hawk; Arcane Shot /cast !Auto Shot"
      },
      {
        "id": "hunter-macro-16",
        "title": "Bestial Wrath with a trinket",
        "desc": "Sends your pet in, uses the trinket in your first slot and rages your pet.",
        "category": "General",
        "code": "#showtooltip Bestial Wrath /petattack /use 13 /cast [mod:shift] Rapid Fire /cast Bestial Wrath"
      },
      {
        "id": "hunter-macro-17",
        "title": "Growl on when solo, off in a group",
        "desc": "Sets your pet's Growl autocast for the situation: on when you're alone, off in a party or raid.",
        "category": "General",
        "code": "/petautocastoff [group] Growl /petautocaston [nogroup] Growl"
      },
      {
        "id": "hunter-macro-18",
        "title": "Pet stance on one key",
        "desc": "Change your pet's stance without opening the pet bar.",
        "category": "Pet & Utility",
        "code": "/petdefensive [nomod] /petpassive [mod:shift] /petaggressive [mod:ctrl]"
      },
      {
        "id": "hunter-macro-19",
        "title": "Beast Lore, then Tame Beast",
        "desc": "The first press reads the beast's diet and damage, the second starts taming; a new target starts over.",
        "category": "Pet & Utility",
        "code": "#showtooltip /castsequence reset=target Beast Lore, Tame Beast"
      },
      {
        "id": "hunter-macro-20",
        "title": "Tranquilizing Shot on your mouseover",
        "desc": "Removes a Frenzy effect from the enemy creature under your mouse, or from your target if you aren't hovering one.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Tranquilizing Shot /cast [@mouseover,harm,nodead][] Tranquilizing Shot"
      },
      {
        "id": "hunter-macro-21",
        "title": "Park your pet and scout",
        "desc": "Tells your pet to stay, then lets you see through its eyes for 2 minutes.",
        "category": "Pet & Utility",
        "code": "#showtooltip Eyes of the Beast /petstay /cast Eyes of the Beast"
      },
      {
        "id": "hunter-macro-22",
        "title": "Concussive Shot pull with your pet",
        "desc": "Slows the enemy, sends your pet in and keeps Auto Shot running.",
        "category": "Pet & Utility",
        "code": "#showtooltip Concussive Shot /petattack /cast Concussive Shot /cast !Auto Shot"
      },
      {
        "id": "hunter-macro-23",
        "title": "Scare Beast on target or mouseover",
        "desc": "Scares a beast for up to 10 seconds; hold Shift to scare the beast under your mouse.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Scare Beast /cast [mod:shift,@mouseover,harm,nodead] Scare Beast; Scare Beast"
      },
      {
        "id": "hunter-macro-24",
        "title": "Send your pet with Dash, Dive or Charge",
        "desc": "Send your pet at a hostile mouseover or your target, then request its movement ability. The pet uses whichever listed ability it has learned.",
        "category": "Pet & Utility",
        "code": "/petattack [@mouseover,harm,nodead][harm,nodead] /cast [@pettarget,harm,nodead] Charge /cast Dash /cast Dive"
      },
      {
        "id": "hunter-macro-25",
        "title": "Start Auto Shot",
        "desc": "Find an enemy if you have no valid target, then start shooting.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Auto Shot /targetenemy [noexists][dead][help] /cast !Auto Shot"
      },
      {
        "id": "hunter-macro-26",
        "title": "Aimed Shot and pet attack",
        "desc": "Send your pet when you begin the Aimed Shot cast.",
        "category": "Pet & Utility",
        "code": "#showtooltip Aimed Shot /petattack /cast Aimed Shot"
      },
      {
        "id": "hunter-macro-27",
        "title": "Aimed Shot or Multi-Shot on one key",
        "desc": "Aimed Shot and Multi-Shot share a 6 second cooldown in Forever, so this gives you one or the other each window.",
        "category": "Combat & Rotations",
        "code": "#showtooltip /cast [mod:shift] Multi-Shot; [mod:ctrl,@mouseover,harm,nodead] Multi-Shot; Aimed Shot /cast !Auto Shot"
      },
      {
        "id": "hunter-macro-28",
        "title": "Sniper Shot and Auto Shot",
        "desc": "Cast Sniper Shot at your target or Shift-mouseover and keep Auto Shot on. The October 1 update sets a 45-yard range and +10 yards for your next three Shots.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Sniper Shot /cast [mod:shift,@mouseover,harm,nodead][] Sniper Shot /cast !Auto Shot"
      },
      {
        "id": "hunter-macro-29",
        "title": "Rapid Fire with both trinkets",
        "desc": "Uses both trinkets and Rapid Fire together, and makes sure Auto Shot is running.",
        "category": "General",
        "code": "#showtooltip Rapid Fire /use 13 /use 14 /cast Rapid Fire /cast !Auto Shot"
      },
      {
        "id": "hunter-macro-30",
        "title": "Drop or call your pet for Lone Wolf",
        "desc": "Calls your pet or dismisses it so you can fight petless for Lone Wolf's 20% damage; dismissing costs the pet 50 happiness.",
        "category": "Pet & Utility",
        "code": "#showtooltip /cast [mod:shift] Revive Pet; [nopet] Call Pet; Dismiss Pet"
      },
      {
        "id": "hunter-macro-31",
        "title": "Serpent Sting on target or mouseover",
        "desc": "Puts Serpent Sting on your target, or on the enemy under your mouse with Shift, and keeps Auto Shot on.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Serpent Sting /cast [mod:shift,@mouseover,harm,nodead] Serpent Sting; Serpent Sting /cast !Auto Shot"
      },
      {
        "id": "hunter-macro-32",
        "title": "Distracting Shot on your mouseover",
        "desc": "Pull a loose enemy off a groupmate by hovering it, or hit your target if nothing is hovered.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Distracting Shot /cast [@mouseover,harm,nodead][] Distracting Shot"
      },
      {
        "id": "hunter-macro-33",
        "title": "Mark, Serpent Sting, Arcane Shot opener",
        "desc": "Press up to three times for mark, sting and Arcane Shot while your pet attacks and Auto Shot stays on; a new target or 8 seconds resets it.",
        "category": "Combat & Rotations",
        "code": "#showtooltip /targetenemy [noexists][dead][help] /castsequence reset=target/8 Hunter's Mark, Serpent Sting, Arcane Shot /petattack /cast !Auto Shot"
      },
      {
        "id": "hunter-macro-34",
        "title": "Back to shooting after melee",
        "desc": "Stops your melee swings, finds an enemy if you lost your target and turns Auto Shot back on.",
        "category": "General",
        "code": "#showtooltip Auto Shot /stopattack /targetenemy [noexists][dead][help] /cast !Auto Shot"
      },
      {
        "id": "hunter-macro-35",
        "title": "Lacerate and melee attack",
        "desc": "Puts Lacerate's 21 second bleed on your target and keeps your melee swings going.",
        "category": "General",
        "code": "#showtooltip Lacerate /startattack /cast Lacerate"
      },
      {
        "id": "hunter-macro-36",
        "title": "Strider Kick",
        "desc": "Kick in melee and run 30% faster for 3 seconds; it has an 8 second cooldown.",
        "category": "General",
        "code": "#showtooltip Strider Kick /startattack /cast Strider Kick"
      },
      {
        "id": "hunter-macro-37",
        "title": "Raptor Strike with Mongoose Bite",
        "desc": "Queues Raptor Strike, starts your swings and casts Mongoose Bite when it's usable; Shift casts Counterattack after a parry instead.",
        "category": "Combat & Rotations",
        "code": "#showtooltip /stopcasting /cast Raptor Strike /startattack /cast [mod:shift] Counterattack; Mongoose Bite"
      },
      {
        "id": "hunter-macro-38",
        "title": "Mark it for Expose Prey",
        "desc": "Marks your target so Expose Prey can light up Mongoose Bite, sends your pet and starts your swings once you're in range.",
        "category": "General",
        "code": "#showtooltip Hunter's Mark /petattack /startattack /cast Hunter's Mark"
      },
      {
        "id": "hunter-macro-39",
        "title": "Wing Clip and Raptor Strike",
        "desc": "Slows your target in melee, queues Raptor Strike and keeps your swings going.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Wing Clip /startattack /cast Raptor Strike /cast Wing Clip"
      },
      {
        "id": "hunter-macro-40",
        "title": "Immolation or Explosive Trap",
        "desc": "Drop Immolation Trap, or Explosive Trap with Shift, at your feet during combat. Fire traps share a 30 sec cooldown, separate from Frost traps.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift] Explosive Trap; Immolation Trap"
      },
      {
        "id": "hunter-macro-41",
        "title": "Aspects for melee",
        "desc": "Puts on Monkey for dodge or Beast for melee attack power on one key, with Hawk and Cheetah on the other modifiers.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift] !Aspect of the Beast; [mod:ctrl] !Aspect of the Hawk; [mod:alt] !Aspect of the Cheetah; !Aspect of the Monkey"
      },
      {
        "id": "hunter-macro-42",
        "title": "Deterrence with Aspect of the Monkey",
        "desc": "Pops Deterrence and adds Monkey's dodge on top when enemies are on you in melee.",
        "category": "General",
        "code": "#showtooltip Deterrence /cast Deterrence /cast !Aspect of the Monkey"
      },
      {
        "id": "hunter-macro-43",
        "title": "Scatter Shot with your pet called off",
        "desc": "Sends your pet away so it can't break the disorient, then Scatters your target, or your mouseover with Shift.",
        "category": "Pet & Utility",
        "code": "#showtooltip Scatter Shot /petstay [@pettarget,harm] /petpassive [@pettarget,harm] /cast [mod:shift,@mouseover,harm,nodead] Scatter Shot; Scatter Shot"
      },
      {
        "id": "hunter-macro-44",
        "title": "Scatter Shot, then Freezing Trap",
        "desc": "Press once to Scatter Shot and again to drop Freezing Trap under the enemy at your feet; it resets after 6 seconds.",
        "category": "Combat & Rotations",
        "code": "#showtooltip /petpassive [@pettarget,harm] /castsequence reset=6 Scatter Shot, Freezing Trap"
      },
      {
        "id": "hunter-macro-45",
        "title": "Freezing Trap or Frost Trap",
        "desc": "Drops Freezing Trap after calling off your pet and your shots, or Frost Trap with Shift while you keep fighting. Traps work during combat at your feet; Frost traps share a 30 sec cooldown, separate from Fire traps.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Frost Trap; Freezing Trap /stopcasting /stopattack [nomod] /petstay [nomod,@pettarget,harm] /petpassive [nomod,@pettarget,harm] /cast [mod:shift] Frost Trap; Freezing Trap"
      },
      {
        "id": "hunter-macro-46",
        "title": "Trap, then Feign Death",
        "desc": "Drops a trap and feigns in the same press so chasers run over it; your pet stands down first.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Frost Trap; Freezing Trap /petpassive /petfollow /stopattack /stopcasting /cast [mod:shift] Frost Trap; Freezing Trap /cast [combat] Feign Death"
      },
      {
        "id": "hunter-macro-47",
        "title": "Concussive Shot or Wing Clip",
        "desc": "Slows your target at range with Concussive Shot, your mouseover with Shift, or with Wing Clip in melee on Ctrl.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Concussive Shot /cast [mod:shift,@mouseover,harm,nodead] Concussive Shot; [mod:ctrl] Wing Clip; Concussive Shot"
      },
      {
        "id": "hunter-macro-48",
        "title": "Black Arrow on target or mouseover",
        "desc": "Slows the enemy by 70% and drains its mana; Shift sends it at your mouseover.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Black Arrow /cast [mod:shift,@mouseover,harm,nodead][] Black Arrow"
      },
      {
        "id": "hunter-macro-49",
        "title": "Viper Sting on healers and casters",
        "desc": "Drains mana from your target, or your mouseover with Shift; Ctrl uses Scorpid Sting, which lowers their chance to hit in Forever.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Viper Sting /cast [mod:shift,@mouseover,harm,nodead] Viper Sting; [mod:ctrl] Scorpid Sting; Viper Sting"
      },
      {
        "id": "hunter-macro-50",
        "title": "Hunter's Mark on target or mouseover",
        "desc": "Marks the enemy you hover with Shift; the beta tooltip says you can always see a marked target, even if it stealths.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Hunter's Mark /cast [mod:shift,@mouseover,harm,nodead][] Hunter's Mark"
      },
      {
        "id": "hunter-macro-51",
        "title": "Pet control on one key",
        "desc": "Send your pet at your target or mouseover, call it back or park it, all on one key.",
        "category": "Pet & Utility",
        "code": "/petattack [mod:shift,@mouseover,harm,nodead][nomod] /petpassive [mod:ctrl] /petfollow [mod:ctrl] /petstay [mod:alt]"
      },
      {
        "id": "hunter-macro-52",
        "title": "Bestial Wrath and Intimidation",
        "desc": "Sends your pet in, rages it and stuns the target with Intimidation, or your mouseover with Shift.",
        "category": "General",
        "code": "#showtooltip Intimidation /petattack [mod:shift,@mouseover,harm,nodead][] /cast Bestial Wrath /cast [mod:shift,@mouseover,harm,nodead][] Intimidation"
      },
      {
        "id": "hunter-macro-53",
        "title": "Flare or Enchanted Flare",
        "desc": "Puts a Flare down where you click to expose hidden enemies; Shift uses Enchanted Flare, which also holds off magical darkness.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift] Enchanted Flare; Flare"
      },
      {
        "id": "hunter-macro-54",
        "title": "Aspect swap on modifier keys",
        "desc": "Hawk by default, dropping Cheetah first, with Cheetah, Monkey and Pack on modifier keys for running or defending.",
        "category": "General",
        "code": "#showtooltip /cancelaura [nomod] Aspect of the Cheetah /cast [mod:shift] !Aspect of the Cheetah; [mod:ctrl] !Aspect of the Monkey; [mod:alt] !Aspect of the Pack; !Aspect of the Hawk"
      },
      {
        "id": "hunter-macro-55",
        "title": "Strider Kick on target or mouseover",
        "desc": "Kicks your target and starts your swings, or kicks the enemy under your mouse with Shift, and speeds you up either way.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Strider Kick /startattack [nomod] /cast [mod:shift,@mouseover,harm,nodead][] Strider Kick"
      },
      {
        "id": "hunter-macro-56",
        "title": "Wing Clip with melee reactions",
        "desc": "Queues Raptor Strike and slows your target with Wing Clip, or answers a parry with Counterattack (Shift) or a dodge with Mongoose Bite (Ctrl).",
        "category": "General",
        "code": "#showtooltip /startattack /cast Raptor Strike /cast [mod:shift] Counterattack; [mod:ctrl] Mongoose Bite; Wing Clip"
      }
    ],
    "shaman": [
      {
        "id": "shaman-macro-1",
        "title": "Immediate mouseover Earth Shock",
        "desc": "Cancel your current cast to shock an enemy under your cursor while keeping your main target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Earth Shock /stopcasting /cast [@mouseover,harm,nodead][] Earth Shock"
      },
      {
        "id": "shaman-macro-2",
        "title": "Place or recall your totems",
        "desc": "Press for your saved totem set; hold Shift to recall it. Set up the totem bar first.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Totemic Recall; Call of the Elements /cast [mod:shift] Totemic Recall; Call of the Elements"
      },
      {
        "id": "shaman-macro-3",
        "title": "All three totem sets and recall on one key",
        "desc": "Once you have the later Call spells, one key drops any of your three totem sets or takes them all back.",
        "category": "General",
        "code": "#showtooltip [mod:ctrl] Call of the Ancestors; [mod:alt] Call of the Spirits; [mod:shift] Totemic Recall; Call of the Elements /cast [mod:ctrl] Call of the Ancestors; [mod:alt] Call of the Spirits; [mod:shift] Totemic Recall; Call of the Elements"
      },
      {
        "id": "shaman-macro-4",
        "title": "Lightning Shield or Water Shield",
        "desc": "Press for Lightning Shield and hold Shift for Water Shield. Only one Elemental Shield stays on you at a time.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Water Shield; Lightning Shield /cast [mod:shift] Water Shield; Lightning Shield"
      },
      {
        "id": "shaman-macro-5",
        "title": "Ghost Wolf on and off",
        "desc": "One press turns you into a Ghost Wolf and the next press turns you back.",
        "category": "General",
        "code": "#showtooltip Ghost Wolf /cast Ghost Wolf"
      },
      {
        "id": "shaman-macro-6",
        "title": "Mouseover Purge",
        "desc": "Strip magic buffs from the enemy under your cursor, or from your target if you aren't pointing at anyone.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Purge /cast [@mouseover,harm,nodead][] Purge"
      },
      {
        "id": "shaman-macro-7",
        "title": "Earth, Flame and Frost Shock on one key",
        "desc": "Press for Earth Shock, hold Shift for Flame Shock and Ctrl for Frost Shock.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Flame Shock; [mod:ctrl] Frost Shock; Earth Shock /cast [mod:shift] Flame Shock; [mod:ctrl] Frost Shock; Earth Shock"
      },
      {
        "id": "shaman-macro-8",
        "title": "Cure poison or disease on a friend or yourself",
        "desc": "Cure Poison on your mouseover, your target or you, and hold Shift for Cure Disease on the same picks.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Cure Disease; Cure Poison /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Cure Disease; [@mouseover,help,nodead][help,nodead][@player] Cure Poison"
      },
      {
        "id": "shaman-macro-9",
        "title": "Reincarnation cooldown on your bar",
        "desc": "This puts Reincarnation's cooldown on a button so you can see whether you would come back after a death.",
        "category": "General",
        "code": "#showtooltip Reincarnation"
      },
      {
        "id": "shaman-macro-10",
        "title": "Heal yourself without losing your target",
        "desc": "Healing Wave on yourself while your enemy stays targeted, or hold Shift for the faster Lesser Healing Wave.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip [mod:shift] Lesser Healing Wave; Healing Wave /cast [mod:shift,@player] Lesser Healing Wave; [@player] Healing Wave"
      },
      {
        "id": "shaman-macro-11",
        "title": "Water Walking, Shift for Water Breathing",
        "desc": "Water Walking on a friendly mouseover, target or yourself; hold Shift for Water Breathing. Handy for crossing water and underwater quests.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Water Breathing; [@mouseover,help,nodead][help,nodead][@player] Water Walking"
      },
      {
        "id": "shaman-macro-12",
        "title": "Lightning Bolt or Chain Lightning",
        "desc": "Hold Shift for Chain Lightning; press normally for Lightning Bolt.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Chain Lightning; Lightning Bolt /cast [mod:shift] Chain Lightning; Lightning Bolt"
      },
      {
        "id": "shaman-macro-13",
        "title": "Mouseover Flame Shock",
        "desc": "Apply the damage-over-time shock without changing your main target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Flame Shock /cast [@mouseover,harm,nodead][] Flame Shock"
      },
      {
        "id": "shaman-macro-14",
        "title": "Flame Shock, then Lava Burst",
        "desc": "The first press puts Flame Shock on your target and the next press casts Lava Burst, which hits 20% harder while Flame Shock is on the target.",
        "category": "General",
        "code": "#showtooltip /castsequence reset=combat/target Flame Shock, Lava Burst"
      },
      {
        "id": "shaman-macro-15",
        "title": "Fire Nova with a Fire totem on the same key",
        "desc": "Fire Nova hits enemies within 10 yards of your active Fire totem, so Shift drops Searing Totem and Ctrl drops Magma Totem first.",
        "category": "General",
        "code": "#showtooltip Fire Nova /cast [mod:shift] Searing Totem; [mod:ctrl] Magma Totem; Fire Nova"
      },
      {
        "id": "shaman-macro-16",
        "title": "Searing Totem, Flame Shock, Lightning Bolt opener",
        "desc": "Three presses open a pull: Searing Totem, then Flame Shock, then Lightning Bolt. Use your normal bolt key after that.",
        "category": "General",
        "code": "#showtooltip /castsequence reset=combat/20 Searing Totem, Flame Shock, Lightning Bolt"
      },
      {
        "id": "shaman-macro-17",
        "title": "Stoneclaw Totem or Earthbind Totem",
        "desc": "Stoneclaw Totem pulls attackers within 8 yards onto itself for 15 seconds, and Shift drops Earthbind Totem to slow them instead.",
        "category": "General",
        "code": "#showtooltip Stoneclaw Totem /cast [mod:shift] Earthbind Totem; Stoneclaw Totem"
      },
      {
        "id": "shaman-macro-18",
        "title": "Trinkets, racial and Lightning Bolt",
        "desc": "Use both trinkets and your Orc or Troll racial as you start a Lightning Bolt.",
        "category": "General",
        "code": "#showtooltip Lightning Bolt /use 13 /use 14 /cast Berserking /cast Blood Fury /cast Lightning Bolt"
      },
      {
        "id": "shaman-macro-19",
        "title": "Lightning Bolt at what your tank is hitting",
        "desc": "Bolts your enemy target, or the target of your friendly target when you have the tank selected.",
        "category": "General",
        "code": "#showtooltip Lightning Bolt /cast [harm,nodead][@targettarget,harm,nodead] Lightning Bolt"
      },
      {
        "id": "shaman-macro-20",
        "title": "Choose your weapon imbue",
        "desc": "Press for Windfury Weapon, or hold Shift for Flametongue, Ctrl for Frostbrand or Alt for Rockbiter. The /use 16 line clicks your main hand.",
        "category": "General",
        "code": "#showtooltip [mod:alt] Rockbiter Weapon; [mod:ctrl] Frostbrand Weapon; [mod:shift] Flametongue Weapon; Windfury Weapon /cast [mod:alt] Rockbiter Weapon; [mod:ctrl] Frostbrand Weapon; [mod:shift] Flametongue Weapon; Windfury Weapon /use 16"
      },
      {
        "id": "shaman-macro-21",
        "title": "Stormstrike and auto attack",
        "desc": "Begin swinging when you use your Enhancement strike.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Stormstrike /startattack /cast Stormstrike"
      },
      {
        "id": "shaman-macro-22",
        "title": "Stormstrike, then Earth Shock",
        "desc": "Stormstrike first, then Earth Shock on the next press. The next eligible spell gets 20% more damage within 12 seconds.",
        "category": "Combat & Rotations",
        "code": "#showtooltip /startattack /castsequence reset=combat/target/12 Stormstrike, Earth Shock"
      },
      {
        "id": "shaman-macro-23",
        "title": "Spend Stormstrike on a shock or a bolt",
        "desc": "After Stormstrike, press for Earth Shock, Shift for Lightning Bolt or Ctrl for Chain Lightning. The next of these gets 20% more damage within 12 seconds.",
        "category": "Combat & Rotations",
        "code": "#showtooltip [mod:shift] Lightning Bolt; [mod:ctrl] Chain Lightning; Earth Shock /cast [mod:shift] Lightning Bolt; [mod:ctrl] Chain Lightning; Earth Shock"
      },
      {
        "id": "shaman-macro-24",
        "title": "Lightning Bolt and keep swinging",
        "desc": "Starts your melee swings and casts Lightning Bolt, so Maelstrom Weapon stacks from your hits shorten the cast.",
        "category": "General",
        "code": "#showtooltip Lightning Bolt /startattack /cast Lightning Bolt"
      },
      {
        "id": "shaman-macro-25",
        "title": "Trinkets, Rage of the Farseer and Stormstrike",
        "desc": "Use both trinkets, Rage of the Farseer and your Orc or Troll racial together, then open with Stormstrike.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Rage of the Farseer /startattack /use 13 /use 14 /cast Rage of the Farseer /cast Berserking /cast Blood Fury /cast Stormstrike"
      },
      {
        "id": "shaman-macro-26",
        "title": "Flame Shock, then Earth Shock",
        "desc": "Flame Shock on the first press, Earth Shock on the next, and your swings start with the first press.",
        "category": "General",
        "code": "#showtooltip /startattack [harm] /castsequence reset=combat/target/12 Flame Shock, Earth Shock"
      },
      {
        "id": "shaman-macro-27",
        "title": "Strength of Earth, Windfury and Mana Spring in order",
        "desc": "One totem per press, and the order starts again after 60 seconds or when combat ends.",
        "category": "General",
        "code": "#showtooltip /castsequence reset=combat/60 Strength of Earth Totem, Windfury Totem, Mana Spring Totem"
      },
      {
        "id": "shaman-macro-28",
        "title": "Stoneskin, Windwall or Stoneclaw Totem",
        "desc": "Stoneskin Totem cuts Physical damage taken, Shift drops Windwall Totem against ranged attackers and Ctrl drops Stoneclaw Totem to pull enemies onto it.",
        "category": "General",
        "code": "#showtooltip Stoneskin Totem /cast [mod:shift] Windwall Totem; [mod:ctrl] Stoneclaw Totem; Stoneskin Totem"
      },
      {
        "id": "shaman-macro-29",
        "title": "Find a target, attack and Earth Shock",
        "desc": "Keep a living enemy selected, or select a nearby enemy when you have no hostile target. Start swinging even if Earth Shock is on cooldown or you lack mana.",
        "category": "General",
        "code": "#showtooltip Earth Shock /targetenemy [noharm][dead] /startattack /cast Earth Shock"
      },
      {
        "id": "shaman-macro-30",
        "title": "Mouseover Healing Wave",
        "desc": "Heal a friendly mouseover, your target, or yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Healing Wave /cast [@mouseover,help,nodead][help,nodead][@player] Healing Wave"
      },
      {
        "id": "shaman-macro-31",
        "title": "Mouseover Riptide",
        "desc": "Use Forever’s new Restoration talent on a party frame under your cursor.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Riptide /cast [@mouseover,help,nodead][help,nodead][@player] Riptide"
      },
      {
        "id": "shaman-macro-32",
        "title": "Lesser Healing Wave on mouseover, target or target's target",
        "desc": "The fast heal for the friend under your cursor, your friendly target, whoever your enemy target is hitting, or you.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Lesser Healing Wave /cast [@mouseover,help,nodead][help,nodead][@targettarget,help,nodead][@player] Lesser Healing Wave"
      },
      {
        "id": "shaman-macro-33",
        "title": "Mouseover Chain Heal",
        "desc": "Chain Heal on your mouseover, your target or yourself. In a party it only jumps to other party members.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Chain Heal /cast [@mouseover,help,nodead][help,nodead][@player] Chain Heal"
      },
      {
        "id": "shaman-macro-34",
        "title": "Riptide, then Chain Heal on the same friend",
        "desc": "Riptide on the first press and Chain Heal on the next, which lands 25% stronger on a Riptide target, so keep your cursor on the same friend.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip /castsequence [@mouseover,help,nodead][help,nodead] reset=10 Riptide, Chain Heal"
      },
      {
        "id": "shaman-macro-35",
        "title": "Top up with a lower Healing Wave rank",
        "desc": "Press for your top Healing Wave rank, or hold Shift for the cheaper rank 4 when a small top-up is enough.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Healing Wave /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Healing Wave(Rank 4); [@mouseover,help,nodead][help,nodead][@player] Healing Wave"
      },
      {
        "id": "shaman-macro-36",
        "title": "Nature's Swiftness into an instant heal",
        "desc": "Nature's Swiftness makes your next heal instant, so this casts Healing Wave, or Chain Heal with Shift, on your mouseover, target or you.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Healing Wave /cast Nature's Swiftness /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Chain Heal; [@mouseover,help,nodead][help,nodead][@player] Healing Wave"
      },
      {
        "id": "shaman-macro-37",
        "title": "Healing Stream, Mana Spring or Mana Tide Totem",
        "desc": "Healing Stream Totem heals the group, Shift drops Mana Spring Totem and Ctrl drops Mana Tide Totem when mana runs low.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Healing Stream Totem /cast [mod:shift] Mana Spring Totem; [mod:ctrl] Mana Tide Totem; Healing Stream Totem"
      },
      {
        "id": "shaman-macro-38",
        "title": "Poison Cleansing, Disease Cleansing or Tremor Totem",
        "desc": "Poison Cleansing Totem, or Shift for Disease Cleansing Totem and Ctrl for Tremor Totem, which removes Fear, Charm and Sleep.",
        "category": "General",
        "code": "#showtooltip Poison Cleansing Totem /cast [mod:shift] Disease Cleansing Totem; [mod:ctrl] Tremor Totem; Poison Cleansing Totem"
      },
      {
        "id": "shaman-macro-39",
        "title": "Healing Wave on friends, Lightning Bolt on enemies",
        "desc": "Heals a friendly target, bolts an enemy, heals you if nothing is selected, and Alt heals you whatever you have targeted.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip /cast [mod:alt,@player] Healing Wave; [help,nodead] Healing Wave; [harm,nodead] Lightning Bolt; [@player] Healing Wave"
      },
      {
        "id": "shaman-macro-40",
        "title": "Resurrect a mouseover or target",
        "desc": "Resurrects the dead player under your cursor, or your dead target, once you're out of combat.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Ancestral Spirit /cast [@mouseover,help,dead,nocombat][help,dead,nocombat] Ancestral Spirit"
      },
      {
        "id": "shaman-macro-41",
        "title": "Interrupt with rank 1 Earth Shock",
        "desc": "Dismounts, stops your cast and interrupts with rank 1 Earth Shock: your target, your mouseover with Shift or your last target with Ctrl.",
        "category": "General",
        "code": "#showtooltip Earth Shock /dismount /stopcasting /targetlasttarget [mod:ctrl] /cast [mod:shift,@mouseover,harm,nodead][] Earth Shock(Rank 1) /targetlasttarget [mod:ctrl]"
      },
      {
        "id": "shaman-macro-42",
        "title": "Slow a runner with Frost Shock",
        "desc": "Frost Shock slows your target by 50%; Shift slows your mouseover and Ctrl casts the cheap rank 1 on your target.",
        "category": "General",
        "code": "#showtooltip Frost Shock /cast [mod:shift,@mouseover,harm,nodead] Frost Shock; [mod:ctrl] Frost Shock(Rank 1); Frost Shock"
      },
      {
        "id": "shaman-macro-43",
        "title": "Grounding, Tremor, Earthbind and Stoneclaw on one key",
        "desc": "Grounding Totem redirects one harmful spell aimed at a nearby party member, and Shift, Ctrl and Alt drop Tremor, Earthbind and Stoneclaw instead.",
        "category": "General",
        "code": "#showtooltip Grounding Totem /cast [mod:shift] Tremor Totem; [mod:ctrl] Earthbind Totem; [mod:alt] Stoneclaw Totem; Grounding Totem"
      },
      {
        "id": "shaman-macro-44",
        "title": "Purge enemies and cure friends on one key",
        "desc": "Purges an enemy, cures poison on a friend, and Shift cures disease on a friend, using your mouseover first and your target second.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead] Cure Disease; [@mouseover,help,nodead][help,nodead] Cure Poison; [@mouseover,harm,nodead][harm,nodead] Purge"
      },
      {
        "id": "shaman-macro-45",
        "title": "Fast heal that drops the wolf",
        "desc": "Leaves Ghost Wolf and casts Lesser Healing Wave on your mouseover or target, or on you when you hold Alt or have nobody picked.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Lesser Healing Wave /cancelform [form] /cast [mod:alt,@player][@mouseover,help,nodead][help,nodead][@player] Lesser Healing Wave"
      },
      {
        "id": "shaman-macro-46",
        "title": "Nature's Swiftness into an instant nuke",
        "desc": "Nature's Swiftness makes the next spell instant: Lightning Bolt on your enemy, Chain Lightning with Shift or Healing Wave on you with Alt.",
        "category": "General",
        "code": "#showtooltip Nature's Swiftness /cast Nature's Swiftness /cast [mod:alt,@player] Healing Wave; [mod:shift,harm,nodead] Chain Lightning; [harm,nodead] Lightning Bolt"
      },
      {
        "id": "shaman-macro-47",
        "title": "Stormstrike, Earth Shock and Frost Shock in melee",
        "desc": "Stormstrike to open, Shift for the Earth Shock that gets its 20% bonus and Ctrl for a Frost Shock slow; each one starts your swings.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Stormstrike /startattack /cast [mod:shift] Earth Shock; [mod:ctrl] Frost Shock; Stormstrike"
      },
      {
        "id": "shaman-macro-48",
        "title": "Lava Burst with Flame Shock on the same key",
        "desc": "Lava Burst hits 20% harder against a Flame Shock, so Ctrl puts Flame Shock on your target and Shift puts it on your mouseover.",
        "category": "General",
        "code": "#showtooltip Lava Burst /cast [mod:shift,@mouseover,harm,nodead][mod:ctrl] Flame Shock; Lava Burst"
      },
      {
        "id": "shaman-macro-49",
        "title": "Ghost Wolf on and off, or shock out of it",
        "desc": "Press to switch Ghost Wolf on or off; hold Shift to leave the wolf and Frost Shock your target in one press.",
        "category": "General",
        "code": "#showtooltip Ghost Wolf /cancelform [form,mod:shift] /cast [mod:shift,harm,nodead] Frost Shock; [nomod,noform] Ghost Wolf /cancelform [form,nomod]"
      },
      {
        "id": "shaman-macro-50",
        "title": "Trinkets and racial defense on one key",
        "desc": "Uses your racial escape and both trinkets together when you're stunned or in trouble.",
        "category": "General",
        "code": "#showtooltip /cast War Stomp /cast Stoneform /cast Shatter Curse /use 13 /use 14"
      },
      {
        "id": "shaman-macro-51",
        "title": "Bolt or Chain Lightning on target or mouseover",
        "desc": "Lightning Bolt on your target, Shift for your mouseover, and Ctrl or Alt for Chain Lightning on your target or mouseover.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Lightning Bolt /cast [mod:shift,@mouseover,harm,nodead] Lightning Bolt; [mod:ctrl] Chain Lightning; [mod:alt,@mouseover,harm,nodead] Chain Lightning; Lightning Bolt"
      },
      {
        "id": "shaman-macro-52",
        "title": "Riptide, or Chain Heal on the same friend",
        "desc": "Riptide on your mouseover, target or you, and Shift casts Chain Heal on the same friend, which lands 25% stronger on a Riptide target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Riptide /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead] Chain Heal; [@mouseover,help,nodead][help,nodead][@player] Riptide"
      },
      {
        "id": "shaman-macro-53",
        "title": "Flame Shock on target, mouseover or last target",
        "desc": "Flame Shock your target, your mouseover with Shift or your last target with Ctrl, then swap back, to spread damage over time in a fight.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Flame Shock /targetlasttarget [mod:ctrl] /cast [mod:shift,@mouseover,harm,nodead][] Flame Shock /targetlasttarget [mod:ctrl]"
      }
    ],
    "mage": [
      {
        "id": "mage-macro-1",
        "title": "Counterspell without waiting on your cast",
        "desc": "Drops whatever you’re casting and Counterspells your target right away.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Counterspell /stopcasting /cast Counterspell"
      },
      {
        "id": "mage-macro-2",
        "title": "Polymorph the mouseover or your target",
        "desc": "Polymorphs the enemy under your cursor and leaves your target alone. With no enemy under the cursor it polymorphs your target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Polymorph /cast [@mouseover,harm,nodead][] Polymorph"
      },
      {
        "id": "mage-macro-3",
        "title": "Arcane Intellect on a friend or yourself",
        "desc": "Buffs the friendly unit under your cursor, else your friendly target, else you. Hold Alt to buff yourself no matter what.",
        "category": "General",
        "code": "#showtooltip Arcane Intellect /cast [mod:alt,@player][@mouseover,help,nodead][help,nodead][@player] Arcane Intellect"
      },
      {
        "id": "mage-macro-4",
        "title": "Dampen or Amplify Magic on a friend",
        "desc": "Dampen Magic on the friend under your cursor, your friendly target or yourself. Shift swaps to Amplify Magic.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Amplify Magic; Dampen Magic /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Amplify Magic; [@mouseover,help,nodead][help,nodead][@player] Dampen Magic"
      },
      {
        "id": "mage-macro-5",
        "title": "Remove Lesser Curse on a friend or yourself",
        "desc": "Decurses your mouseover, friendly target or you. Shift decurses you straight away.",
        "category": "General",
        "code": "#showtooltip Remove Lesser Curse /cast [mod:shift,@player][@mouseover,help,nodead][help,nodead][@player] Remove Lesser Curse"
      },
      {
        "id": "mage-macro-6",
        "title": "Conjure water, or food with Shift",
        "desc": "One button conjures your top rank of water. Hold Shift for food instead.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Conjure Food; Conjure Water /cast [mod:shift] Conjure Food; Conjure Water"
      },
      {
        "id": "mage-macro-7",
        "title": "Use whichever mana gem you have",
        "desc": "Tries Mana Ruby, Citrine, Jade and Agate in that order. Press it when you need mana.",
        "category": "General",
        "code": "#showtooltip /use Mana Ruby /use Mana Citrine /use Mana Jade /use Mana Agate"
      },
      {
        "id": "mage-macro-8",
        "title": "Ice Armor, Mage Armor or Frost Armor",
        "desc": "Ice Armor by default, Shift for Mage Armor and Ctrl for Frost Armor. Only one armor can be up at a time.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Mage Armor; [mod:ctrl] Frost Armor; Ice Armor /cast [mod:shift] Mage Armor; [mod:ctrl] Frost Armor; Ice Armor"
      },
      {
        "id": "mage-macro-9",
        "title": "Alliance teleports on one key",
        "desc": "Teleports you to Stormwind. Shift goes to Ironforge, Ctrl to Darnassus and Alt to Dalaran.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift] Teleport: Ironforge; [mod:ctrl] Teleport: Darnassus; [mod:alt] Teleport: Dalaran; Teleport: Stormwind"
      },
      {
        "id": "mage-macro-10",
        "title": "Horde teleports on one key",
        "desc": "Teleports you to Orgrimmar. Shift goes to Undercity, Ctrl to Thunder Bluff and Alt to Dalaran.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift] Teleport: Undercity; [mod:ctrl] Teleport: Thunder Bluff; [mod:alt] Teleport: Dalaran; Teleport: Orgrimmar"
      },
      {
        "id": "mage-macro-11",
        "title": "Alliance portals on one key",
        "desc": "Opens a portal to Stormwind. Shift makes it Ironforge and Ctrl makes it Darnassus.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift] Portal: Ironforge; [mod:ctrl] Portal: Darnassus; Portal: Stormwind"
      },
      {
        "id": "mage-macro-12",
        "title": "Horde portals on one key",
        "desc": "Opens a portal to Orgrimmar. Shift makes it Undercity and Ctrl makes it Thunder Bluff.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift] Portal: Undercity; [mod:ctrl] Portal: Thunder Bluff; Portal: Orgrimmar"
      },
      {
        "id": "mage-macro-13",
        "title": "Slow Fall, Shift to cancel",
        "desc": "Dismount and cast Slow Fall on yourself. Hold Shift to remove the effect when you're back on the ground.",
        "category": "General",
        "code": "#showtooltip Slow Fall /dismount [nomod:shift] /cancelaura [mod:shift] Slow Fall /cast [nomod:shift,@player] Slow Fall"
      },
      {
        "id": "mage-macro-14",
        "title": "Intellect, Shift for Arcane Brilliance",
        "desc": "Buff one friend with Arcane Intellect, or hold Shift for Arcane Brilliance. Both choose your friendly mouseover, target or yourself.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Arcane Brilliance; [@mouseover,help,nodead][help,nodead][@player] Arcane Intellect"
      },
      {
        "id": "mage-macro-15",
        "title": "Protect Arcane Missiles channel",
        "desc": "Repeated presses won’t restart a channel you’re already in.",
        "category": "General",
        "code": "#showtooltip Arcane Missiles /cast [nochanneling:Arcane Missiles] Arcane Missiles"
      },
      {
        "id": "mage-macro-16",
        "title": "Arcane Blast, with Missiles and Frostbolt on modifiers",
        "desc": "Arcane Blast on the button, Shift for Arcane Missiles and Ctrl for a cheaper Frostbolt when the stack gets expensive. Nothing fires while you’re channeling Missiles.",
        "category": "General",
        "code": "#showtooltip Arcane Blast /cast [mod:shift,nochanneling:Arcane Missiles] Arcane Missiles; [mod:ctrl,nochanneling:Arcane Missiles] Frostbolt; [nochanneling:Arcane Missiles] Arcane Blast"
      },
      {
        "id": "mage-macro-17",
        "title": "Three Blasts, then Missiles",
        "desc": "Each press moves along the sequence: three Arcane Blasts, then Arcane Missiles to spend the stack. It starts over after 10 seconds or a new target.",
        "category": "General",
        "code": "#showtooltip Arcane Blast /castsequence [nochanneling:Arcane Missiles] reset=10/target Arcane Blast, Arcane Blast, Arcane Blast, Arcane Missiles"
      },
      {
        "id": "mage-macro-18",
        "title": "Grab the nearest enemy and Arcane Blast",
        "desc": "Clears a dead or friendly target, picks the nearest enemy if you have none, then opens with Arcane Blast.",
        "category": "General",
        "code": "#showtooltip Arcane Blast /cleartarget [dead][help] /targetenemy [noexists] /cast [harm,nochanneling:Arcane Missiles] Arcane Blast"
      },
      {
        "id": "mage-macro-19",
        "title": "Trinkets and Arcane Power, then Blast",
        "desc": "Pops both trinkets and Arcane Power, then starts an Arcane Blast. Arcane Power makes your spells cost 30% more mana for 15 sec.",
        "category": "General",
        "code": "#showtooltip Arcane Blast /use 13 /use 14 /cast Arcane Power /cast [nochanneling:Arcane Missiles] Arcane Blast"
      },
      {
        "id": "mage-macro-20",
        "title": "Arcane Blast, with a mana gem on Shift",
        "desc": "Arcane Blast on the button. Hold Shift to use a mana gem first; the gem is instant, so the cast still starts on the same press.",
        "category": "General",
        "code": "#showtooltip Arcane Blast /use [mod:shift] Mana Ruby /use [mod:shift] Mana Citrine /use [mod:shift] Mana Jade /use [mod:shift] Mana Agate /cast [nochanneling:Arcane Missiles] Arcane Blast"
      },
      {
        "id": "mage-macro-21",
        "title": "Arcane Explosion, rank 1 out of combat",
        "desc": "Top rank once you’re in a fight and rank 1 before it, so an opening pull costs less mana.",
        "category": "General",
        "code": "#showtooltip Arcane Explosion /cast [combat] Arcane Explosion; Arcane Explosion(Rank 1)"
      },
      {
        "id": "mage-macro-22",
        "title": "Conjure any mana gem on one key",
        "desc": "Conjures a Mana Ruby by default. Shift makes a Citrine, Ctrl a Jade and Alt an Agate.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift] Conjure Mana Citrine; [mod:ctrl] Conjure Mana Jade; [mod:alt] Conjure Mana Agate; Conjure Mana Ruby"
      },
      {
        "id": "mage-macro-23",
        "title": "Wand that doesn’t toggle off",
        "desc": "Starts your wand and keeps it going if you press the button again.",
        "category": "General",
        "code": "#showtooltip Shoot /cast !Shoot"
      },
      {
        "id": "mage-macro-24",
        "title": "Evocation, Shift to stop",
        "desc": "Start Evocation without cutting it short on repeated presses. Hold Shift to stop the channel when you need to move or cast something else.",
        "category": "General",
        "code": "#showtooltip Evocation /stopcasting [mod:shift] /stopmacro [mod:shift] /cast [nochanneling:Evocation] Evocation"
      },
      {
        "id": "mage-macro-25",
        "title": "Fireball or Scorch",
        "desc": "Hold Shift for Scorch when you need a shorter cast.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Scorch; Fireball /cast [mod:shift] Scorch; Fireball"
      },
      {
        "id": "mage-macro-26",
        "title": "Immediate Fire Blast",
        "desc": "Cancels your current cast for an instant Fire Blast.",
        "category": "General",
        "code": "#showtooltip Fire Blast /stopcasting /cast Fire Blast"
      },
      {
        "id": "mage-macro-27",
        "title": "Grab the nearest enemy and Fireball",
        "desc": "Clears a dead or friendly target, picks the nearest enemy if you have none, then casts Fireball at it.",
        "category": "General",
        "code": "#showtooltip Fireball /cleartarget [dead][help] /targetenemy [noexists] /cast [harm] Fireball"
      },
      {
        "id": "mage-macro-28",
        "title": "Pyroblast to open, Fireball after",
        "desc": "Out of combat the button casts Pyroblast as a long-range opener. Once you’re in the fight it casts Fireball.",
        "category": "General",
        "code": "#showtooltip [nocombat] Pyroblast; Fireball /cast [nocombat] Pyroblast; Fireball"
      },
      {
        "id": "mage-macro-29",
        "title": "Fireball, with Pyroblast and Fire Blast on modifiers",
        "desc": "Fireball on the button. Shift casts Pyroblast once Heating Up has shortened it, and Ctrl casts an instant Fire Blast while you move.",
        "category": "General",
        "code": "#showtooltip Fireball /cast [mod:shift] Pyroblast; [mod:ctrl] Fire Blast; Fireball"
      },
      {
        "id": "mage-macro-30",
        "title": "Trinkets and Combustion, then Fireball",
        "desc": "Uses both trinkets, pops Combustion and starts a Fireball. Hold Shift for Scorch instead. The October 1 beta update returned Combustion to three charges.",
        "category": "General",
        "code": "#showtooltip Combustion /use 13 /use 14 /cast Combustion /cast [mod:shift] Scorch; Fireball"
      },
      {
        "id": "mage-macro-31",
        "title": "Flamestrike, rank 1 on Shift",
        "desc": "Casts your top Flamestrike, or rank 1 with Shift to save mana, then you click the ground. Forever allows only one active Flamestrike per mage.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Flamestrike /cast [mod:shift] Flamestrike(Rank 1); Flamestrike"
      },
      {
        "id": "mage-macro-32",
        "title": "Fireball, with Frostfire Bolt for kiting",
        "desc": "Fireball on the button. Shift casts Frostfire Bolt, which slows the target by 40% and can help build Heating Up.",
        "category": "General",
        "code": "#showtooltip Fireball /cast [mod:shift] Frostfire Bolt; Fireball"
      },
      {
        "id": "mage-macro-33",
        "title": "Immediate Blast Wave",
        "desc": "Cancels your current cast and blasts everything close, dazing it for 6 sec.",
        "category": "General",
        "code": "#showtooltip Blast Wave /stopcasting /cast Blast Wave"
      },
      {
        "id": "mage-macro-34",
        "title": "Quick slow or full Frostbolt",
        "desc": "Hold Shift to cast rank 1 for a cheaper slow; press normally for your highest rank.",
        "category": "General",
        "code": "#showtooltip Frostbolt /cast [mod:shift] Frostbolt(Rank 1); Frostbolt"
      },
      {
        "id": "mage-macro-35",
        "title": "Immediate Frost Nova",
        "desc": "Cancels your current cast to freeze enemies in melee range.",
        "category": "General",
        "code": "#showtooltip Frost Nova /stopcasting /cast Frost Nova"
      },
      {
        "id": "mage-macro-36",
        "title": "Grab the nearest enemy and Frostbolt",
        "desc": "Clears a dead or friendly target, picks the nearest enemy if you have none, then casts Frostbolt at it.",
        "category": "General",
        "code": "#showtooltip Frostbolt /cleartarget [dead][help] /targetenemy [noexists] /cast [harm] Frostbolt"
      },
      {
        "id": "mage-macro-37",
        "title": "Frost Nova, then Ice Lance",
        "desc": "The first press freezes nearby enemies. A second press within 6 seconds throws Ice Lance at the frozen target. Give Ice Lance its own key too, since this one waits on Nova’s cooldown.",
        "category": "General",
        "code": "#showtooltip Frost Nova /stopcasting /castsequence reset=6/target Frost Nova, Ice Lance"
      },
      {
        "id": "mage-macro-38",
        "title": "Ice Lance, Fire Blast and Cone of Cold on one key",
        "desc": "Ice Lance on the button. Shift casts Fire Blast when the target has broken free, and Ctrl casts a Cone of Cold slow.",
        "category": "General",
        "code": "#showtooltip Ice Lance /stopcasting /cast [mod:shift] Fire Blast; [mod:ctrl] Cone of Cold; Ice Lance"
      },
      {
        "id": "mage-macro-39",
        "title": "Blizzard, rank 1 on Shift",
        "desc": "Casts your top Blizzard, or rank 1 with Shift to save mana, then you click the ground.",
        "category": "General",
        "code": "#showtooltip Blizzard /cast [mod:shift] Blizzard(Rank 1); Blizzard"
      },
      {
        "id": "mage-macro-40",
        "title": "Frostbolt, with trinkets on Shift",
        "desc": "Frostbolt on the button. Hold Shift to use both trinkets as you cast.",
        "category": "General",
        "code": "#showtooltip Frostbolt /use [mod:shift] 13 /use [mod:shift] 14 /cast Frostbolt"
      },
      {
        "id": "mage-macro-41",
        "title": "Ice Armor, then Arcane Intellect",
        "desc": "Press once for Ice Armor and again within 10 seconds for Arcane Intellect, both on yourself.",
        "category": "General",
        "code": "#showtooltip /castsequence [@player] reset=10 Ice Armor, Arcane Intellect"
      },
      {
        "id": "mage-macro-42",
        "title": "Counterspell your target, mouseover or a follow-up",
        "desc": "Cancels your cast and Ice Block, then Counterspells your target. Shift hits the mouseover and Ctrl starts a Frostbolt right after.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Counterspell /stopcasting /cancelaura Ice Block /cast [mod:shift,@mouseover,harm,nodead][] Counterspell /cast [mod:ctrl] Frostbolt"
      },
      {
        "id": "mage-macro-43",
        "title": "Polymorph the mouseover or target, rank 1 on Shift",
        "desc": "Cancels your cast and polymorphs the enemy under your cursor, or your target. Shift casts rank 1, which costs less mana and lasts a shorter time.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Polymorph /stopcasting /cast [mod:shift,@mouseover,harm,nodead][mod:shift,harm,nodead] Polymorph(Rank 1); [@mouseover,harm,nodead][harm,nodead] Polymorph"
      },
      {
        "id": "mage-macro-44",
        "title": "Sheep a second enemy and jump back",
        "desc": "Tab to a second enemy, press this to sheep it, and you’re back on your first target right away.",
        "category": "General",
        "code": "#showtooltip Polymorph /stopcasting /cast [harm,nodead] Polymorph /targetlasttarget"
      },
      {
        "id": "mage-macro-45",
        "title": "Presence of Mind plus an instant spell",
        "desc": "Uses Presence of Mind and casts one spell instantly. Arcane Blast by default, Shift for Pyroblast, Ctrl for Polymorph and Alt for Frostbolt.",
        "category": "General",
        "code": "#showtooltip Presence of Mind /stopcasting /cast Presence of Mind /cast [mod:shift] Pyroblast; [mod:ctrl] Polymorph; [mod:alt] Frostbolt; Arcane Blast"
      },
      {
        "id": "mage-macro-46",
        "title": "Trinkets, Arcane Power and Presence of Mind burst",
        "desc": "Uses both trinkets, Arcane Power and Presence of Mind, then casts an instant Pyroblast. Hold Shift for Frostbolt if you don’t have Pyroblast.",
        "category": "General",
        "code": "#showtooltip Pyroblast /stopcasting /use 13 /use 14 /cast Arcane Power /cast Presence of Mind /cast [mod:shift] Frostbolt; Pyroblast"
      },
      {
        "id": "mage-macro-47",
        "title": "Frost Nova, Cone of Cold and Blast Wave peel",
        "desc": "Dismounts, cancels your cast and Ice Block, then casts Frost Nova rank 1, which costs less and hits for far less (damage can break the freeze). Shift is Cone of Cold and Ctrl is Blast Wave.",
        "category": "General",
        "code": "#showtooltip Frost Nova /stopcasting /dismount /cancelaura Ice Block /cast [mod:shift] Cone of Cold; [mod:ctrl] Blast Wave; Frost Nova(Rank 1)"
      },
      {
        "id": "mage-macro-48",
        "title": "Blink, racial escape, trinkets and Free Action Potion",
        "desc": "Dismounts, cancels your cast and Blinks. Shift uses your racial escape instead, Ctrl adds both trinkets to the Blink and Alt adds a Free Action Potion.",
        "category": "General",
        "code": "#showtooltip Blink /stopcasting /dismount /use [mod:ctrl] 13 /use [mod:ctrl] 14 /use [mod:alt] Free Action Potion /cast [mod:shift] Will to Survive /cast [mod:shift] Escape Artist /cast [mod:shift] Will of the Forsaken /cast [nomod:shift] Blink"
      },
      {
        "id": "mage-macro-49",
        "title": "Ice Block toggle with Cold Snap on Shift",
        "desc": "Casts Ice Block, and a second press drops it early. Shift casts Cold Snap to finish your Frost cooldowns, so the next press can Block again.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Cold Snap; Ice Block /stopcasting /cancelaura Ice Block /cast [mod:shift] Cold Snap; Ice Block"
      },
      {
        "id": "mage-macro-50",
        "title": "Mana Shield, Ice Barrier and both Wards on one key",
        "desc": "Cancels your cast and shields up. Mana Shield on the button, Shift for Ice Barrier, Ctrl for Frost Ward and Alt for Fire Ward.",
        "category": "General",
        "code": "#showtooltip /stopcasting /cast [mod:shift] Ice Barrier; [mod:ctrl] Frost Ward; [mod:alt] Fire Ward; Mana Shield"
      },
      {
        "id": "mage-macro-51",
        "title": "Frostbolt the mouseover to slow it",
        "desc": "Frostbolts the enemy under your cursor, or your target if none is there. Shift casts rank 1, which is cheaper and gives a shorter slow.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Frostbolt /cast [mod:shift,@mouseover,harm,nodead][mod:shift] Frostbolt(Rank 1); [@mouseover,harm,nodead][] Frostbolt"
      },
      {
        "id": "mage-macro-52",
        "title": "Fire Blast or Ice Lance on the mouseover",
        "desc": "Cancels your cast for an instant Fire Blast on the enemy under your cursor, or your target. Shift throws Ice Lance instead.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Fire Blast /stopcasting /cast [mod:shift,@mouseover,harm,nodead][mod:shift] Ice Lance; [@mouseover,harm,nodead][] Fire Blast"
      },
      {
        "id": "mage-macro-53",
        "title": "Swap schools after a Counterspell lockout",
        "desc": "Frostbolt on the button. If an enemy Counterspell locks Frost, Shift casts Fireball and Ctrl casts Arcane Missiles.",
        "category": "General",
        "code": "#showtooltip Frostbolt /cast [mod:shift] Fireball; [mod:ctrl] Arcane Missiles; Frostbolt"
      },
      {
        "id": "mage-macro-54",
        "title": "Decurse a friend or Counterspell an enemy under the cursor",
        "desc": "Cancels your cast, then decurses the friend under your cursor or Counterspells the enemy there. With nothing under the cursor it uses your target. Shift decurses you.",
        "category": "General",
        "code": "#showtooltip /stopcasting /cast [mod:shift,@player][@mouseover,help,nodead] Remove Lesser Curse; [@mouseover,harm,nodead] Counterspell; [help,nodead] Remove Lesser Curse; [harm,nodead] Counterspell"
      },
      {
        "id": "mage-macro-55",
        "title": "Trinkets on one key",
        "desc": "Uses your top trinket, Shift uses the bottom one and Ctrl uses both.",
        "category": "General",
        "code": "#showtooltip /use [nomod][mod:ctrl] 13 /use [mod:shift][mod:ctrl] 14"
      }
    ],
    "paladin": [
      {
        "id": "paladin-macro-1",
        "title": "Holy Strike and auto attack",
        "desc": "Use Forever’s baseline strike without leaving auto attack off.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Holy Strike /startattack /cast Holy Strike"
      },
      {
        "id": "paladin-macro-2",
        "title": "Mouseover Blessing of Protection",
        "desc": "Protect a friendly mouseover, your friendly target, or whoever your enemy target is attacking. Hold Alt for Divine Protection on yourself. Both apply Forbearance.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip [mod:alt] Divine Protection; Blessing of Protection /cast [mod:alt] Divine Protection; [@mouseover,help,nodead][help,nodead][@targettarget,help,nodead] Blessing of Protection"
      },
      {
        "id": "paladin-macro-3",
        "title": "Blessings on one button",
        "desc": "Blessing of Might on your mouseover or friendly target. Hold Shift for Wisdom or Ctrl for Kings.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift,@mouseover,help,nodead][mod:shift] Blessing of Wisdom; [mod:ctrl,@mouseover,help,nodead][mod:ctrl] Blessing of Kings; [@mouseover,help,nodead][] Blessing of Might"
      },
      {
        "id": "paladin-macro-4",
        "title": "Auras on one button",
        "desc": "Devotion Aura on a normal press. Hold Shift for Concentration Aura or Ctrl for Retribution Aura.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Concentration Aura; [mod:ctrl] Retribution Aura; Devotion Aura /cast [mod:shift] Concentration Aura; [mod:ctrl] Retribution Aura; Devotion Aura"
      },
      {
        "id": "paladin-macro-5",
        "title": "Resistance auras on one button",
        "desc": "Fire Resistance Aura on a normal press. Hold Shift for Frost or Ctrl for Shadow when a fight calls for it.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Frost Resistance Aura; [mod:ctrl] Shadow Resistance Aura; Fire Resistance Aura /cast [mod:shift] Frost Resistance Aura; [mod:ctrl] Shadow Resistance Aura; Fire Resistance Aura"
      },
      {
        "id": "paladin-macro-6",
        "title": "Mouseover Lay on Hands",
        "desc": "Lay on Hands on your mouseover, then your friendly target, then yourself. It heals for your max health and drains the rest of your mana.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Lay on Hands /cast [@mouseover,help,nodead][help,nodead][@player] Lay on Hands"
      },
      {
        "id": "paladin-macro-7",
        "title": "Divine Shield, and drop it early",
        "desc": "Press to bubble. Press again to drop it once you're safe. The same press also cancels Divine Protection and Blessing of Protection, which stop you attacking.",
        "category": "General",
        "code": "#showtooltip Divine Shield /cancelaura Divine Shield /cancelaura Divine Protection /cancelaura Blessing of Protection /cast Divine Shield"
      },
      {
        "id": "paladin-macro-8",
        "title": "Mouseover Redemption",
        "desc": "Resurrect the dead player under your cursor, or your dead target. It's a 10 second cast and you can't use it in combat.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Redemption /cast [@mouseover,help,dead][help,dead] Redemption"
      },
      {
        "id": "paladin-macro-9",
        "title": "Exorcism or Turn Undead",
        "desc": "Exorcism on an Undead or Demon target. Hold Shift for Turn Undead to send an Undead enemy running.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Turn Undead; Exorcism /cast [mod:shift,harm,nodead] Turn Undead; [harm,nodead] Exorcism"
      },
      {
        "id": "paladin-macro-10",
        "title": "Mouseover Holy Light",
        "desc": "Heal a friendly mouseover first, then your target, then yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Holy Light /cast [@mouseover,help,nodead][help,nodead][@player] Holy Light"
      },
      {
        "id": "paladin-macro-11",
        "title": "Mouseover Flash of Light",
        "desc": "Keep your enemy target while healing a party frame under your cursor.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Flash of Light /cast [@mouseover,help,nodead][help,nodead][@player] Flash of Light"
      },
      {
        "id": "paladin-macro-12",
        "title": "Holy Light ranks on Shift and Ctrl",
        "desc": "Heal your mouseover or friendly target with your top rank, or a cheaper one with Shift (rank 7) or Ctrl (rank 5).",
        "category": "General",
        "code": "#showtooltip Holy Light /cast [mod:shift,@mouseover,help,nodead][mod:shift] Holy Light(Rank 7); [mod:ctrl,@mouseover,help,nodead][mod:ctrl] Holy Light(Rank 5); [@mouseover,help,nodead][] Holy Light"
      },
      {
        "id": "paladin-macro-13",
        "title": "Flash of Light ranks on Shift and Ctrl",
        "desc": "Top up your mouseover or friendly target with your top rank, or a cheaper one with Shift (rank 5) or Ctrl (rank 3).",
        "category": "General",
        "code": "#showtooltip Flash of Light /cast [mod:shift,@mouseover,help,nodead][mod:shift] Flash of Light(Rank 5); [mod:ctrl,@mouseover,help,nodead][mod:ctrl] Flash of Light(Rank 3); [@mouseover,help,nodead][] Flash of Light"
      },
      {
        "id": "paladin-macro-14",
        "title": "Heal whoever the enemy is fighting",
        "desc": "With an enemy targeted, Flash of Light goes to your mouseover, then your friendly target, then whoever that enemy is attacking. Hold Shift for Holy Light.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip [mod:shift] Holy Light; Flash of Light /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@targettarget,help,nodead] Holy Light; [@mouseover,help,nodead][help,nodead][@targettarget,help,nodead] Flash of Light"
      },
      {
        "id": "paladin-macro-15",
        "title": "Holy Shock on a friend or an enemy",
        "desc": "Holy Shock your mouseover, then your target, then yourself. It heals an ally and damages an enemy. Hold Alt to shock yourself.",
        "category": "General",
        "code": "#showtooltip Holy Shock /cast [mod:alt,@player][@mouseover,exists,nodead][exists,nodead][@player] Holy Shock"
      },
      {
        "id": "paladin-macro-16",
        "title": "Light's Vigil, then Holy Shock",
        "desc": "Mark your mouseover or target with Light's Vigil, then hold Shift and press to Holy Shock the same target for the bonus effect.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Holy Shock; Light's Vigil /cast [mod:shift,@mouseover,exists,nodead][mod:shift,exists,nodead] Holy Shock; [@mouseover,exists,nodead][exists,nodead][@player] Light's Vigil"
      },
      {
        "id": "paladin-macro-17",
        "title": "Divine Favor into a heal",
        "desc": "Pop Divine Favor and heal in one press so the heal is a sure critical. Holy Light by default, Flash of Light with Shift.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip [mod:shift] Flash of Light; Holy Light /cast Divine Favor /cast [mod:shift,@mouseover,help,nodead][mod:shift] Flash of Light; [@mouseover,help,nodead][help,nodead][@player] Holy Light"
      },
      {
        "id": "paladin-macro-18",
        "title": "Mouseover Purify",
        "desc": "Remove a disease and a poison from your mouseover, then your friendly target, then yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Purify /cast [@mouseover,help,nodead][help,nodead][@player] Purify"
      },
      {
        "id": "paladin-macro-19",
        "title": "Mouseover Cleanse",
        "desc": "Cleanse a poison, a disease and a magic effect from your mouseover, then your friendly target, then yourself. Hold Alt to cleanse yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Cleanse /cast [mod:alt,@player][@mouseover,help,nodead][help,nodead][@player] Cleanse"
      },
      {
        "id": "paladin-macro-20",
        "title": "Seal of Wisdom, Seal of Light or Judgement",
        "desc": "Hold Shift for Seal of Wisdom or Ctrl for Seal of Light, then press normally to judge. Judgement no longer uses the Seal up, so you don't recast it.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Seal of Wisdom; [mod:ctrl] Seal of Light; Judgement /cast [mod:shift] Seal of Wisdom; [mod:ctrl] Seal of Light; Judgement"
      },
      {
        "id": "paladin-macro-21",
        "title": "Salvation, Shift for Greater Salvation",
        "desc": "Give Salvation to a friendly mouseover or target. Hold Shift for the greater blessing on that class in the group. Choose a damage dealer or healer, not your tank.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead] Greater Blessing of Salvation; [@mouseover,help,nodead][help,nodead] Blessing of Salvation"
      },
      {
        "id": "paladin-macro-22",
        "title": "Seal of Fury or Judgement",
        "desc": "Hold Shift to apply Seal of Fury. A normal press judges, and with the Seal up that Judgement taunts your target for 4 seconds.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Seal of Fury; Judgement /cast [mod:shift] Seal of Fury; Judgement"
      },
      {
        "id": "paladin-macro-23",
        "title": "Consecration and Righteous Fury",
        "desc": "Hold Shift to turn on Righteous Fury before a pull. Press normally for Consecration.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Righteous Fury; Consecration /cast [mod:shift] Righteous Fury; Consecration"
      },
      {
        "id": "paladin-macro-24",
        "title": "Holy Shield and Judgement",
        "desc": "One press judges (Judgement is off the global cooldown) and raises Holy Shield.",
        "category": "General",
        "code": "#showtooltip Holy Shield /startattack /cast Judgement /cast Holy Shield"
      },
      {
        "id": "paladin-macro-25",
        "title": "Hammer of the Righteous or Holy Strike",
        "desc": "Hammer of the Righteous hits your target and up to 3 nearby enemies on a 6 second cooldown. Hold Shift for Holy Strike.",
        "category": "Combat & Rotations",
        "code": "#showtooltip [mod:shift] Holy Strike; Hammer of the Righteous /startattack /cast [mod:shift] Holy Strike; Hammer of the Righteous"
      },
      {
        "id": "paladin-macro-26",
        "title": "Judgement or Swift Judgement",
        "desc": "Press to judge. Hold Shift for Swift Judgement, which finishes Judgement's cooldown and makes the next one free, then press again.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Swift Judgement; Judgement /cast [mod:shift] Swift Judgement; Judgement"
      },
      {
        "id": "paladin-macro-27",
        "title": "Templar's Bulwark or Divine Protection",
        "desc": "Templar's Bulwark puts an absorb equal to your max health on you for 8 seconds. Hold Shift for Divine Protection instead. Both apply Forbearance.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Divine Protection; Templar's Bulwark /cast [mod:shift] Divine Protection; Templar's Bulwark"
      },
      {
        "id": "paladin-macro-28",
        "title": "Righteous Fury on, Shift to drop it",
        "desc": "Press to turn on Righteous Fury before a pull. Hold Shift to cancel it when you switch to damage or healing.",
        "category": "General",
        "code": "#showtooltip Righteous Fury /cast [nomod:shift] Righteous Fury /stopmacro [nomod:shift] /cancelaura Righteous Fury"
      },
      {
        "id": "paladin-macro-29",
        "title": "Judge the mob under your cursor",
        "desc": "Judge your mouseover enemy, or your target if you aren't pointing at one. With Seal of Fury up, that Judgement taunts for 4 seconds.",
        "category": "General",
        "code": "#showtooltip Judgement /cast [@mouseover,harm,nodead][harm,nodead] Judgement"
      },
      {
        "id": "paladin-macro-30",
        "title": "Blessing of Sacrifice on a party member",
        "desc": "Put Blessing of Sacrifice on your mouseover or friendly target so part of each hit lands on you. It only works on party members.",
        "category": "General",
        "code": "#showtooltip Blessing of Sacrifice /cast [@mouseover,help,nodead][help,nodead] Blessing of Sacrifice"
      },
      {
        "id": "paladin-macro-31",
        "title": "Seal of Fury, Righteousness or Justice",
        "desc": "Seal of Fury by default. Shift picks Seal of Righteousness, and Ctrl picks Seal of Justice, whose Judgement stops the enemy fleeing.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Seal of Righteousness; [mod:ctrl] Seal of Justice; Seal of Fury /cast [mod:shift] Seal of Righteousness; [mod:ctrl] Seal of Justice; Seal of Fury"
      },
      {
        "id": "paladin-macro-32",
        "title": "Seal of Command or Judgement",
        "desc": "Hold Shift to apply Seal of Command, then press normally to judge. Judgement no longer uses the Seal up, so one Seal covers many Judgements.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Seal of Command; Judgement /cast [mod:shift] Seal of Command; Judgement"
      },
      {
        "id": "paladin-macro-33",
        "title": "Hammer of Wrath or Holy Strike",
        "desc": "Hold Shift for the ranged finisher on a target at 20% health or less. A normal press uses Holy Strike.",
        "category": "Combat & Rotations",
        "code": "#showtooltip [mod:shift] Hammer of Wrath; Holy Strike /startattack /cast [mod:shift] Hammer of Wrath; Holy Strike"
      },
      {
        "id": "paladin-macro-34",
        "title": "Judgement and Holy Strike",
        "desc": "Judgement is off the global cooldown, so one press judges and Holy Strikes. With Sacred Arbiter, Holy Strike also refreshes your Judgements.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Holy Strike /startattack /cast Judgement /cast Holy Strike"
      },
      {
        "id": "paladin-macro-35",
        "title": "Swap Seals for Twist of Light",
        "desc": "Each press swaps between Seal of Command and Seal of Righteousness. Twist of Light stores an Echo of the Seal you replaced, and your next swing applies it.",
        "category": "General",
        "code": "#showtooltip /castsequence reset=combat Seal of Command, Seal of Righteousness /startattack"
      },
      {
        "id": "paladin-macro-36",
        "title": "Opener: Crusader, Judgement, Command",
        "desc": "Three presses: Seal of the Crusader, Judgement, then Seal of Command. It starts over 10 seconds after your last press.",
        "category": "General",
        "code": "#showtooltip /castsequence reset=10 Seal of the Crusader, Judgement, Seal of Command /startattack"
      },
      {
        "id": "paladin-macro-37",
        "title": "Judgement, or Consecration on Shift",
        "desc": "Judge on a normal press with auto attack on. Hold Shift for Consecration when enemies are standing around you.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Consecration; Judgement /startattack /cast [mod:shift] Consecration; Judgement"
      },
      {
        "id": "paladin-macro-38",
        "title": "Judgement, with trinkets on Shift",
        "desc": "Judge on a normal press. Hold Shift to use both trinkets first, with Judgement right after.",
        "category": "General",
        "code": "#showtooltip Judgement /use [mod:shift] 13 /use [mod:shift] 14 /cast Judgement"
      },
      {
        "id": "paladin-macro-39",
        "title": "Seal of Righteousness, Command or the Crusader",
        "desc": "Seal of Righteousness by default. Shift picks Seal of Command, and Ctrl picks Seal of the Crusader.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Seal of Command; [mod:ctrl] Seal of the Crusader; Seal of Righteousness /cast [mod:shift] Seal of Command; [mod:ctrl] Seal of the Crusader; Seal of Righteousness"
      },
      {
        "id": "paladin-macro-40",
        "title": "Exorcism with Judgement",
        "desc": "Request Exorcism and Judgement on your target. Exorcism still needs an Undead or Demon; Judgement needs an active seal and a target in range.",
        "category": "General",
        "code": "#showtooltip Exorcism /cast [harm,nodead] Exorcism /cast [harm,nodead] Judgement"
      },
      {
        "id": "paladin-macro-41",
        "title": "Hammer of Justice on target or mouseover",
        "desc": "Drops your cast and your mount, then stuns your target. Hold Shift to stun the enemy under your cursor instead.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Hammer of Justice /dismount /stopcasting /cast [mod:shift,@mouseover,harm,nodead][harm,nodead] Hammer of Justice"
      },
      {
        "id": "paladin-macro-42",
        "title": "Stun, then judge the stunned target",
        "desc": "Hammer of Justice on a normal press, then hold Shift to judge while they're stunned. Seal of Command's Judgement hits roughly twice as hard on a stunned or incapacitated target.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Judgement; Hammer of Justice /cast [mod:shift,harm,nodead] Judgement; [harm,nodead] Hammer of Justice"
      },
      {
        "id": "paladin-macro-43",
        "title": "Repentance on target, mouseover or their target",
        "desc": "Incapacitate a Humanoid for up to 6 seconds. Shift picks your mouseover, and Alt picks your target's target if it's an enemy.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Repentance /cast [mod:shift,@mouseover,harm,nodead][mod:alt,@targettarget,harm,nodead][harm,nodead] Repentance"
      },
      {
        "id": "paladin-macro-44",
        "title": "Blessing of Freedom on a friend or yourself",
        "desc": "Free your mouseover, then your friendly target, then yourself. Hold Alt to free yourself. It gives 10 seconds of immunity to movement impairing effects.",
        "category": "General",
        "code": "#showtooltip Blessing of Freedom /cast [mod:alt,@player][@mouseover,help,nodead][help,nodead][@player] Blessing of Freedom"
      },
      {
        "id": "paladin-macro-45",
        "title": "Voice of Truth into a heal",
        "desc": "Voice of Truth makes you immune to silence and interrupts for 6 seconds, then the heal goes out. Holy Light by default, Flash of Light with Shift.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip [mod:shift] Flash of Light; Holy Light /cast Voice of Truth /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead] Flash of Light; [@mouseover,help,nodead][help,nodead][@player] Holy Light"
      },
      {
        "id": "paladin-macro-46",
        "title": "Lay on Hands: you, or a friend with Shift or Ctrl",
        "desc": "Cancels your cast (even if Lay on Hands is on cooldown), then lays hands on you. Shift picks your friendly mouseover and Ctrl your friendly target.",
        "category": "General",
        "code": "#showtooltip Lay on Hands /stopcasting /cast [mod:shift,@mouseover,help,nodead][mod:ctrl,help,nodead][@player] Lay on Hands"
      },
      {
        "id": "paladin-macro-47",
        "title": "Hammer of Wrath on target or mouseover",
        "desc": "Finish an enemy at 20% health or less from range. Hold Shift to pick the one under your cursor.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Hammer of Wrath /cast [mod:shift,@mouseover,harm,nodead][harm,nodead] Hammer of Wrath"
      },
      {
        "id": "paladin-macro-48",
        "title": "Racial escape for Human, Dwarf or Undead",
        "desc": "One button for whichever racial you have. Will to Survive removes stuns, Stoneform removes bleeds, poisons and diseases, and Will of the Forsaken removes charm, fear and sleep.",
        "category": "General",
        "code": "#showtooltip /cast Will to Survive /cast Stoneform /cast Will of the Forsaken"
      },
      {
        "id": "paladin-macro-49",
        "title": "Target the nearest enemy and attack",
        "desc": "Picks the nearest enemy if you don't have a live enemy target, then starts auto attack. Shift always jumps to the nearest enemy, and Alt goes back to your last enemy target.",
        "category": "General",
        "code": "#showtooltip Attack /targetlastenemy [mod:alt] /targetenemy [mod:shift][noharm][dead] /startattack [harm,nodead]"
      },
      {
        "id": "paladin-macro-50",
        "title": "Seal of Command, Justice, Light or Wisdom",
        "desc": "Seal of Command by default. Shift picks Justice, which can stun on a hit. Ctrl picks Light and Alt picks Wisdom.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Seal of Justice; [mod:ctrl] Seal of Light; [mod:alt] Seal of Wisdom; Seal of Command /cast [mod:shift] Seal of Justice; [mod:ctrl] Seal of Light; [mod:alt] Seal of Wisdom; Seal of Command"
      },
      {
        "id": "paladin-macro-51",
        "title": "Trinket, then Freedom on yourself",
        "desc": "Uses the trinket in your first slot, then Blessing of Freedom on you. Hold Shift to skip the trinket.",
        "category": "General",
        "code": "#showtooltip Blessing of Freedom /use [nomod:shift] 13 /cast [@player] Blessing of Freedom"
      },
      {
        "id": "paladin-macro-52",
        "title": "Assist a friend and attack",
        "desc": "Takes your friendly target's target and starts attacking it. Hold Shift to assist the friend under your cursor instead.",
        "category": "General",
        "code": "#showtooltip Attack /assist [mod:shift,@mouseover,help,nodead][help,nodead] /startattack [harm,nodead]"
      },
      {
        "id": "paladin-macro-53",
        "title": "Divine Favor into Holy Shock",
        "desc": "Pop Divine Favor and Holy Shock in one press so the shock is a sure critical. It heals your mouseover, target or yourself, and Shift sends it at an enemy.",
        "category": "General",
        "code": "#showtooltip Holy Shock /cast Divine Favor /cast [mod:shift,@mouseover,harm,nodead][mod:shift,harm,nodead][@mouseover,help,nodead][help,nodead][@player] Holy Shock"
      }
    ],
    "warrior": [
      {
        "id": "warrior-macro-1",
        "title": "Charge and start attacking",
        "desc": "Get off your mount, start swinging and Charge in one press.",
        "category": "General",
        "code": "#showtooltip Charge /dismount /startattack /cast Charge"
      },
      {
        "id": "warrior-macro-2",
        "title": "Charge out of combat, Intercept in it",
        "desc": "Charge from Battle Stance out of combat and Intercept from Berserker Stance in combat. If you're in the wrong stance the press swaps first, then press again.",
        "category": "General",
        "code": "#show [combat] Intercept; Charge /startattack /cast [nocombat,stance:1] Charge; [combat,stance:3] Intercept; [nocombat,nostance:1] Battle Stance; [combat,nostance:3] Berserker Stance"
      },
      {
        "id": "warrior-macro-3",
        "title": "Victory Rush after a kill",
        "desc": "Use the new follow-up strike within 20 seconds of defeating a non-trivial enemy; it also heals you for 10% of your maximum health.",
        "category": "General",
        "code": "#showtooltip Victory Rush /startattack /cast Victory Rush"
      },
      {
        "id": "warrior-macro-4",
        "title": "Berserker Rage with a stance swap",
        "desc": "Swap into Berserker Stance if you aren't in it and use Berserker Rage, which makes you immune to Fear and Incapacitate for 10 sec.",
        "category": "General",
        "code": "#showtooltip Berserker Rage /cast [nostance:3] Berserker Stance /cast Berserker Rage"
      },
      {
        "id": "warrior-macro-5",
        "title": "Execute your target or mouseover",
        "desc": "Start attacking and Execute a target under 20% health, or your mouseover with Shift. From Defensive Stance it swaps to Battle Stance first.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Execute /startattack /cast [stance:2] Battle Stance /cast [mod:shift,@mouseover,harm,nodead] Execute; Execute"
      },
      {
        "id": "warrior-macro-6",
        "title": "Heroic Strike or Cleave",
        "desc": "Start attacking and queue Heroic Strike on your next swing, or Cleave with Shift when a second enemy is close by.",
        "category": "Combat & Rotations",
        "code": "#showtooltip [mod:shift] Cleave; Heroic Strike /startattack /cast [mod:shift] Cleave; Heroic Strike"
      },
      {
        "id": "warrior-macro-7",
        "title": "Use both trinkets",
        "desc": "Use your top and bottom trinkets together.",
        "category": "General",
        "code": "#showtooltip /use 13 /use 14"
      },
      {
        "id": "warrior-macro-8",
        "title": "Bloodrage and a Rage Potion",
        "desc": "Bloodrage and a Rage Potion together, so the potion's 20 to 40 Rage lands on top of Bloodrage's.",
        "category": "General",
        "code": "#showtooltip Bloodrage /cast Bloodrage /use Rage Potion"
      },
      {
        "id": "warrior-macro-9",
        "title": "Battle Shout, Shift for Demoralizing Shout",
        "desc": "Refresh Battle Shout, or hold Shift to weaken nearby enemies with Demoralizing Shout. You choose which shout to spend Rage on.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Demoralizing Shout; Battle Shout /cast [mod:shift] Demoralizing Shout; Battle Shout"
      },
      {
        "id": "warrior-macro-10",
        "title": "Overpower stance",
        "desc": "Swap to Battle Stance if you aren't in it, then Overpower after a dodge or when Bloodthrill opens the window. If you swap, press again to cast.",
        "category": "General",
        "code": "#showtooltip Overpower /startattack /cast [nostance:1] Battle Stance /cast Overpower"
      },
      {
        "id": "warrior-macro-11",
        "title": "Spearing Strike",
        "desc": "Start swinging and use Spearing Strike, which hits Giants, Dragonkin and mounted enemies harder and dismounts riders.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Spearing Strike /startattack /cast Spearing Strike"
      },
      {
        "id": "warrior-macro-12",
        "title": "Victory Rush, Overpower, Mortal Strike",
        "desc": "One button for whatever is ready: Victory Rush after a kill, Overpower when Bloodthrill or a dodge opens it, then Mortal Strike.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Mortal Strike /startattack /cast [nostance:1] Battle Stance /cast Victory Rush /cast Overpower /cast Mortal Strike"
      },
      {
        "id": "warrior-macro-13",
        "title": "Mortal Strike, Hamstring on Shift",
        "desc": "Start attacking and use Mortal Strike, or Hamstring with Shift to slow a runner.",
        "category": "Combat & Rotations",
        "code": "#showtooltip [mod:shift] Hamstring; Mortal Strike /startattack /cast [mod:shift] Hamstring; Mortal Strike"
      },
      {
        "id": "warrior-macro-14",
        "title": "Rend your target or mouseover",
        "desc": "Start attacking and Rend your target, or your mouseover with Shift. Bloodthrill only works on enemies that have your Rend on them.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Rend /startattack /cast [mod:shift,@mouseover,harm,nodead] Rend; Rend"
      },
      {
        "id": "warrior-macro-15",
        "title": "Sweeping Strikes with a stance swap",
        "desc": "Swap to Battle Stance if you need to and start Sweeping Strikes, so your next 5 melee attacks hit a second enemy.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Sweeping Strikes /cast [nostance:1] Battle Stance /cast Sweeping Strikes"
      },
      {
        "id": "warrior-macro-16",
        "title": "Charge, then Hamstring",
        "desc": "Charge when you're out of combat, and once you're fighting the same key Hamstrings.",
        "category": "General",
        "code": "#showtooltip [nocombat] Charge; Hamstring /startattack /cast [nocombat] Charge /cast Hamstring"
      },
      {
        "id": "warrior-macro-17",
        "title": "Retaliation with a stance swap",
        "desc": "Swap to Battle Stance if needed and use Retaliation: up to 30 melee counterattacks over 15 sec. Its 15 minute cooldown is independent of Shield Wall and Recklessness.",
        "category": "General",
        "code": "#showtooltip Retaliation /cast [nostance:1] Battle Stance /cast Retaliation"
      },
      {
        "id": "warrior-macro-18",
        "title": "Swap to your two-hander",
        "desc": "Equip your two-hander and drop into Battle Stance. Put your own weapon's name where it says Two-Hander Name.",
        "category": "General",
        "code": "#showtooltip Battle Stance /equip Two-Hander Name /cast [nostance:1] Battle Stance"
      },
      {
        "id": "warrior-macro-19",
        "title": "Bloodthirst and auto attack",
        "desc": "Start your swings and use Bloodthirst, which now also gives 10% movement speed for 10 sec. Hold Shift to queue Heroic Strike as well.",
        "category": "General",
        "code": "#showtooltip Bloodthirst /startattack /cast Bloodthirst /cast [mod:shift] Heroic Strike"
      },
      {
        "id": "warrior-macro-20",
        "title": "Whirlwind stance",
        "desc": "Enter Berserker Stance if you need to and use Whirlwind. If it only swaps stance, press again.",
        "category": "General",
        "code": "#showtooltip Whirlwind /cast [nostance:3] Berserker Stance /cast Whirlwind"
      },
      {
        "id": "warrior-macro-21",
        "title": "Execute, Bloodthirst, Whirlwind",
        "desc": "One button for whatever is ready: Execute under 20% health, then Bloodthirst, then Whirlwind.",
        "category": "General",
        "code": "#showtooltip Bloodthirst /startattack /cast [nostance:3] Berserker Stance /cast Execute /cast Bloodthirst /cast Whirlwind"
      },
      {
        "id": "warrior-macro-22",
        "title": "Whirlwind into Cleave",
        "desc": "Whirlwind now strikes with both weapons without a talent. Raging Blows cuts Whirlwind and Cleave costs by 3 Rage in the October 2 update.",
        "category": "General",
        "code": "#showtooltip Whirlwind /startattack /cast [nostance:3] Berserker Stance /cast Whirlwind /cast Cleave"
      },
      {
        "id": "warrior-macro-23",
        "title": "Death Wish then Recklessness",
        "desc": "First press starts Death Wish, the next starts Recklessness, and both trinkets fire each time. Death Wish now makes you take 5% more damage.",
        "category": "General",
        "code": "#showtooltip /castsequence reset=30 Death Wish, Recklessness /use 13 /use 14"
      },
      {
        "id": "warrior-macro-24",
        "title": "Recklessness from any stance",
        "desc": "Use Recklessness from Berserker Stance; otherwise the first press swaps stance. Its cooldown is independent of Shield Wall and Retaliation.",
        "category": "General",
        "code": "#showtooltip Recklessness /cast [stance:3] Recklessness; Berserker Stance"
      },
      {
        "id": "warrior-macro-25",
        "title": "Bloodrage and Berserker Rage",
        "desc": "Start a pull with Bloodrage and Berserker Rage together. Improved Berserker Rage adds Rage the moment you use it.",
        "category": "General",
        "code": "#showtooltip Berserker Rage /cast [nostance:3] Berserker Stance /cast Bloodrage /cast Berserker Rage"
      },
      {
        "id": "warrior-macro-26",
        "title": "Mouseover Pummel",
        "desc": "Start attacking and Pummel the enemy under your cursor, or your target, from Berserker Stance.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Pummel /startattack /cast [nostance:3] Berserker Stance /cast [@mouseover,harm,nodead][] Pummel"
      },
      {
        "id": "warrior-macro-27",
        "title": "Mouseover Taunt",
        "desc": "Taunt the enemy under your cursor without dropping your current target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Taunt /cast [@mouseover,harm,nodead][] Taunt"
      },
      {
        "id": "warrior-macro-28",
        "title": "Mouseover Shield Bash",
        "desc": "Interrupt a nearby caster under your cursor, or your target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Shield Bash /cast [@mouseover,harm,nodead][] Shield Bash"
      },
      {
        "id": "warrior-macro-29",
        "title": "Mouseover Sunder Armor",
        "desc": "Sunder your mouseover or target for armor reduction and threat. It remains usable for threat under a stronger Expose Armor.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Sunder Armor /startattack /cast [@mouseover,harm,nodead][] Sunder Armor"
      },
      {
        "id": "warrior-macro-30",
        "title": "Revenge, Shield Block on Shift",
        "desc": "Revenge when a block, dodge or parry lets you. Hold Shift to Shield Block first, which now blocks up to 2 attacks over 7 sec.",
        "category": "General",
        "code": "#showtooltip Revenge /startattack /cast [mod:shift,equipped:Shields] Shield Block /cast Revenge"
      },
      {
        "id": "warrior-macro-31",
        "title": "Shield Slam, Revenge, Sunder Armor",
        "desc": "Shield Slam when it's ready, then Revenge after a block, dodge or parry, then Sunder Armor.",
        "category": "General",
        "code": "#showtooltip Shield Slam /startattack /cast Shield Slam /cast Revenge /cast Sunder Armor"
      },
      {
        "id": "warrior-macro-32",
        "title": "Thunder Clap from Defensive Stance",
        "desc": "In the beta Thunder Clap works from Defensive Stance, so tanks don't have to swap to Battle Stance. Pressed from Berserker Stance it swaps you to Battle Stance instead.",
        "category": "General",
        "code": "#showtooltip Thunder Clap /startattack /cast [nostance:3] Thunder Clap; Battle Stance"
      },
      {
        "id": "warrior-macro-33",
        "title": "Shield Wall, Last Stand on Shift",
        "desc": "Swap to Defensive Stance if needed and use Shield Wall (60% less damage for 12 sec). Shift adds Last Stand. Shield Wall's 15 minute cooldown is independent of Retaliation and Recklessness.",
        "category": "General",
        "code": "#showtooltip Shield Wall /cast [mod:shift] Last Stand /cast [nostance:2] Defensive Stance /cast Shield Wall"
      },
      {
        "id": "warrior-macro-34",
        "title": "Charge and Bloodrage from Defensive Stance",
        "desc": "Charge without leaving Defensive Stance, then Bloodrage as you land. Charge goes first because Bloodrage counts as being in combat.",
        "category": "General",
        "code": "#showtooltip Charge /dismount /cast [nocombat] Charge /cast [nocombat] Bloodrage"
      },
      {
        "id": "warrior-macro-35",
        "title": "Swap to sword and board",
        "desc": "Put your one-hander and shield on and drop into Defensive Stance. Put your own weapon and shield names in place of One-Hand Name and Shield Name.",
        "category": "General",
        "code": "#showtooltip Defensive Stance /equipslot [noequipped:Shields] 16 One-Hand Name /equip [noequipped:Shields] Shield Name /cast [nostance:2] Defensive Stance"
      },
      {
        "id": "warrior-macro-36",
        "title": "Battle Stance into mouseover Mocking Blow",
        "desc": "Switch to Battle Stance, then Mocking Blow a hostile mouseover or target. Press again after the stance cooldown if needed. Its brief forced attack is different from Taunt's threat match.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Mocking Blow /cast [nostance:1] Battle Stance /cast [stance:1,@mouseover,harm,nodead][stance:1,harm,nodead] Mocking Blow"
      },
      {
        "id": "warrior-macro-37",
        "title": "Sunder Armor without Salvation",
        "desc": "Remove either Salvation blessing, start attacking and Sunder Armor. Keep this on your tanking bar: a damage dealer usually wants to keep Salvation.",
        "category": "General",
        "code": "#showtooltip Sunder Armor /cancelaura Blessing of Salvation /cancelaura Greater Blessing of Salvation /startattack /cast Sunder Armor"
      },
      {
        "id": "warrior-macro-38",
        "title": "One-button interrupt",
        "desc": "Shield Bash with a shield in Battle or Defensive Stance, Pummel in Berserker Stance. Without a shield it swaps you to Berserker Stance first. It also stops your own Slam.",
        "category": "General",
        "code": "#showtooltip /stopcasting /cast [mod:shift,@mouseover,harm,nodead,equipped:Shields,stance:1/2] Shield Bash; [mod:shift,@mouseover,harm,nodead,stance:3] Pummel; [equipped:Shields,stance:1/2] Shield Bash; [stance:3] Pummel; Berserker Stance"
      },
      {
        "id": "warrior-macro-39",
        "title": "Intercept your target or mouseover",
        "desc": "Swap to Berserker Stance if needed and Intercept for a 3 sec stun. Hold Shift to pick your mouseover.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Intercept /cast [nostance:3] Berserker Stance /cast [mod:shift,@mouseover,harm,nodead] Intercept; Intercept"
      },
      {
        "id": "warrior-macro-40",
        "title": "Hamstring, Piercing Howl on Ctrl",
        "desc": "Slow your target, or your mouseover with Shift. Ctrl dazes everything close to you with Piercing Howl instead.",
        "category": "General",
        "code": "#showtooltip Hamstring /startattack /cast [mod:ctrl] Piercing Howl; [mod:shift,@mouseover,harm,nodead] Hamstring; Hamstring"
      },
      {
        "id": "warrior-macro-41",
        "title": "Concussion Blow target or mouseover",
        "desc": "Stun your target for 5 sec, or your mouseover with Shift. It doesn't use the global cooldown, so you can follow it with another attack.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Concussion Blow /cast [mod:shift,@mouseover,harm,nodead] Concussion Blow; Concussion Blow"
      },
      {
        "id": "warrior-macro-42",
        "title": "Intimidating Shout without swinging",
        "desc": "Stop your auto attack so you don't hit the enemies you just scared, then Intimidating Shout your target, or your mouseover with Shift.",
        "category": "General",
        "code": "#showtooltip Intimidating Shout /stopattack /cast [mod:shift,@mouseover,harm,nodead] Intimidating Shout; Intimidating Shout"
      },
      {
        "id": "warrior-macro-43",
        "title": "Disarm from Defensive Stance",
        "desc": "Swap into Defensive Stance if you aren't in it and Disarm your target for 10 sec, or your mouseover with Shift.",
        "category": "General",
        "code": "#showtooltip Disarm /cast [nostance:2] Defensive Stance /cast [mod:shift,@mouseover,harm,nodead] Disarm; Disarm"
      },
      {
        "id": "warrior-macro-44",
        "title": "Spearing Strike a rider",
        "desc": "Spearing Strike your target, or your mouseover with Shift, to knock a mounted enemy off their mount.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Spearing Strike /startattack /cast [mod:shift,@mouseover,harm,nodead] Spearing Strike; Spearing Strike"
      },
      {
        "id": "warrior-macro-45",
        "title": "Mortal Strike a healer",
        "desc": "Mortal Strike your target, or your mouseover with Shift, to cut that enemy's healing by 50% for 10 sec.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Mortal Strike /startattack /cast [mod:shift,@mouseover,harm,nodead] Mortal Strike; Mortal Strike"
      },
      {
        "id": "warrior-macro-46",
        "title": "Nearest enemy, or back to your last one",
        "desc": "Pick the nearest enemy if you don't have a live one and start attacking. Hold Shift to go back to your previous enemy instead.",
        "category": "General",
        "code": "#showtooltip Attack /targetlastenemy [mod:shift] /targetenemy [nomod,noharm][nomod,dead] /startattack"
      },
      {
        "id": "warrior-macro-47",
        "title": "Berserker Rage, trinket on Ctrl",
        "desc": "Berserker Rage against Fear and Incapacitate, swapping to Berserker Stance first if needed. Hold Ctrl to use your top trinket instead.",
        "category": "General",
        "code": "#showtooltip Berserker Rage /cast [nomod:ctrl,nostance:3] Berserker Stance /cast [nomod:ctrl] Berserker Rage /use [mod:ctrl] 13"
      },
      {
        "id": "warrior-macro-48",
        "title": "Will to Survive, trinket on Ctrl",
        "desc": "Human racial that removes all Stun effects. Hold Ctrl to use your top trinket instead and keep the racial for later.",
        "category": "General",
        "code": "#showtooltip Will to Survive /cast [nomod:ctrl] Will to Survive /use [mod:ctrl] 13"
      },
      {
        "id": "warrior-macro-49",
        "title": "All three stances on one key",
        "desc": "Battle Stance on a plain press, Defensive with Shift and Berserker with Ctrl. Stances have a 1 sec cooldown and you keep up to 10 Rage when you swap.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Defensive Stance; [mod:ctrl] Berserker Stance; Battle Stance /cast [mod:shift] Defensive Stance; [mod:ctrl] Berserker Stance; Battle Stance"
      },
      {
        "id": "warrior-macro-50",
        "title": "The big cooldown for your stance",
        "desc": "Retaliation in Battle Stance, Shield Wall (15 min cooldown now) in Defensive Stance with a shield, Recklessness in Berserker Stance. In Defensive Stance without a shield it swaps you to Battle Stance.",
        "category": "General",
        "code": "#showtooltip /cast [stance:1] Retaliation; [stance:2,equipped:Shields] Shield Wall; [stance:2,noequipped:Shields] Battle Stance; [stance:3] Recklessness"
      },
      {
        "id": "warrior-macro-51",
        "title": "Shield Wall with a shield swap",
        "desc": "Equip your one-hander and shield if you don't have a shield on, swap into Defensive Stance and use Shield Wall. Put your own item names in.",
        "category": "General",
        "code": "#showtooltip Shield Wall /equipslot [noequipped:Shields] 16 One-Hand Name /equip [noequipped:Shields] Shield Name /cast [nostance:2] Defensive Stance /cast Shield Wall"
      }
    ],
    "warlock": [
      {
        "id": "warlock-macro-1",
        "title": "Mouseover Fear",
        "desc": "Fear another enemy without losing your main target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Fear /cast [@mouseover,harm,nodead][] Fear"
      },
      {
        "id": "warlock-macro-2",
        "title": "Call your demon back",
        "desc": "Stop its attack and bring it back before it breaks crowd control or pulls another enemy.",
        "category": "General",
        "code": "/petpassive /petfollow"
      },
      {
        "id": "warlock-macro-3",
        "title": "Summon a demon with modifier keys",
        "desc": "Summon your Voidwalker, or hold a modifier to call a different demon instead.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift] Summon Imp; [mod:ctrl] Summon Succubus; [mod:alt] Summon Felhunter; Summon Voidwalker"
      },
      {
        "id": "warlock-macro-4",
        "title": "Pick your curse with a modifier key",
        "desc": "Curse your mouseover or target with Curse of the Elements, or hold a modifier for Weakness, Recklessness or Tongues.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift,@mouseover,harm,nodead][mod:shift] Curse of Weakness; [mod:ctrl,@mouseover,harm,nodead][mod:ctrl] Curse of Recklessness; [mod:alt] Curse of Tongues; [@mouseover,harm,nodead][] Curse of the Elements"
      },
      {
        "id": "warlock-macro-5",
        "title": "Dot sequence for leveling",
        "desc": "Send your demon in, then press repeatedly to run Immolate, Bane of Agony and Corruption and finish with your wand.",
        "category": "General",
        "code": "#showtooltip /petattack [harm,nodead] /castsequence reset=target Immolate, Bane of Agony, Corruption, !Shoot"
      },
      {
        "id": "warlock-macro-6",
        "title": "Wand without toggling it off",
        "desc": "Start your wand and keep pressing the button without switching Shoot off again.",
        "category": "General",
        "code": "#showtooltip 18 /cast !Shoot"
      },
      {
        "id": "warlock-macro-7",
        "title": "Use your Healthstone",
        "desc": "Use whichever Healthstone you're carrying, and hold Shift to start Drain Life in the same press.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip /use Major Healthstone /use Greater Healthstone /use Healthstone /use Lesser Healthstone /use Minor Healthstone /cast [mod:shift] Drain Life"
      },
      {
        "id": "warlock-macro-8",
        "title": "Soulstone your mouseover or target",
        "desc": "Use your Soulstone on the friendly player under your cursor, or on your target if nothing's hovered.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip /use [@mouseover,help,nodead][] Major Soulstone /use [@mouseover,help,nodead][] Greater Soulstone /use [@mouseover,help,nodead][] Soulstone /use [@mouseover,help,nodead][] Lesser Soulstone /use [@mouseover,help,nodead][] Minor Soulstone"
      },
      {
        "id": "warlock-macro-9",
        "title": "Create your stones with one button",
        "desc": "Create a Healthstone, or hold a modifier to create a Soulstone, Spellstone or Firestone instead.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift] Create Soulstone; [mod:ctrl] Create Spellstone; [mod:alt] Create Firestone; Create Healthstone"
      },
      {
        "id": "warlock-macro-10",
        "title": "Announce Ritual of Summoning",
        "desc": "Tell your party who you're summoning, then start the ritual on your target.",
        "category": "General",
        "code": "#showtooltip Ritual of Summoning /party Summoning %t, please click the portal /cast Ritual of Summoning"
      },
      {
        "id": "warlock-macro-11",
        "title": "Demon Armor, Shift for Shadow Ward",
        "desc": "Refresh Demon Armor, or hold Shift for Shadow Ward before incoming Shadow damage. Each press casts only the spell you choose.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Shadow Ward; Demon Armor /cast [mod:shift] Shadow Ward; Demon Armor"
      },
      {
        "id": "warlock-macro-12",
        "title": "Mouseover Bane of Agony",
        "desc": "Apply Forever’s renamed damage-over-time spell to a mouseover or your target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Bane of Agony /cast [@mouseover,harm,nodead][] Bane of Agony"
      },
      {
        "id": "warlock-macro-13",
        "title": "Mouseover Corruption",
        "desc": "Spread Corruption without switching away from your main target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Corruption /cast [@mouseover,harm,nodead][] Corruption"
      },
      {
        "id": "warlock-macro-14",
        "title": "Mouseover Siphon Life",
        "desc": "Put Siphon Life on your mouseover without changing target, or on your target if nothing's hovered.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Siphon Life /cast [@mouseover,harm,nodead][] Siphon Life"
      },
      {
        "id": "warlock-macro-15",
        "title": "Corruption, Bane of Agony, Siphon Life, Wrack",
        "desc": "Send your demon in and press repeatedly to lay your dots one after another and finish with Wrack.",
        "category": "General",
        "code": "#showtooltip /petattack [harm,nodead] /castsequence reset=target Corruption, Bane of Agony, Siphon Life, Wrack"
      },
      {
        "id": "warlock-macro-16",
        "title": "Amplify Curse into Bane of Agony",
        "desc": "Pop Amplify Curse and start Bane of Agony in one press, which Forever's Amplify Curse now boosts by 50%.",
        "category": "General",
        "code": "#showtooltip Bane of Agony /cast Amplify Curse /cast Bane of Agony"
      },
      {
        "id": "warlock-macro-17",
        "title": "One button for your channels",
        "desc": "Start Drain Life, Drain Soul or Wrack from one button without restarting a channel you're already in, and use Alt for Life Tap.",
        "category": "General",
        "code": "#showtooltip /cast [mod:alt] Life Tap; [nochanneling,mod:ctrl] Wrack; [nochanneling,mod:shift] Drain Soul; [nochanneling] Drain Life"
      },
      {
        "id": "warlock-macro-18",
        "title": "Mouseover Drain Soul",
        "desc": "Drain Soul your mouseover or target for a shot at a Soul Shard, without restarting a channel you're already in.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Drain Soul /cast [nochanneling,@mouseover,harm,nodead][nochanneling] Drain Soul"
      },
      {
        "id": "warlock-macro-19",
        "title": "Send your demon, then open with a dot",
        "desc": "Send your demon at the target and open with Corruption, or with Bane of Agony or Immolate on a modifier.",
        "category": "General",
        "code": "#showtooltip /petattack [harm,nodead] /cast [mod:shift] Bane of Agony; [mod:ctrl] Immolate; Corruption"
      },
      {
        "id": "warlock-macro-20",
        "title": "Health Funnel, Shift to stop",
        "desc": "Channel into your living demon. Repeated presses won't restart Health Funnel; hold Shift to stop once your pet is healthy.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Health Funnel /stopcasting [mod:shift] /stopmacro [mod:shift] /cast [@pet,exists,nodead,nochanneling:Health Funnel] Health Funnel"
      },
      {
        "id": "warlock-macro-21",
        "title": "Mouseover Subjugate Demon",
        "desc": "Use Forever’s renamed demon control spell on a mouseover.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Subjugate Demon /cast [@mouseover,harm,nodead][] Subjugate Demon"
      },
      {
        "id": "warlock-macro-22",
        "title": "Fel Domination and summon",
        "desc": "Fire Fel Domination and start the summon in the same press: Voidwalker, or a modifier for another demon.",
        "category": "General",
        "code": "#showtooltip /cast Fel Domination /cast [mod:shift] Summon Imp; [mod:ctrl] Summon Succubus; [mod:alt] Summon Felhunter; Summon Voidwalker"
      },
      {
        "id": "warlock-macro-23",
        "title": "Sacrifice, then summon a different demon",
        "desc": "Sacrifice your demon for its 2 hour effect and summon another one straight away.",
        "category": "General",
        "code": "#showtooltip Demonic Sacrifice /cast Demonic Sacrifice /cast [mod:shift] Summon Imp; [mod:ctrl] Summon Voidwalker; [mod:alt] Summon Succubus; Summon Felhunter"
      },
      {
        "id": "warlock-macro-24",
        "title": "Summon your Succubus or Incubus",
        "desc": "Summon your Succubus, or hold Shift for the Incubus, which is its own summon in Forever.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift] Summon Incubus; Summon Succubus"
      },
      {
        "id": "warlock-macro-25",
        "title": "Mouseover Banish",
        "desc": "Banish a demon or elemental under your cursor without leaving your main target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Banish /cast [@mouseover,harm,nodead][] Banish"
      },
      {
        "id": "warlock-macro-26",
        "title": "Summon your Voidwalker or call it back",
        "desc": "Summon the Voidwalker when it's missing or dead, otherwise send it back to your side.",
        "category": "General",
        "code": "#showtooltip Summon Voidwalker /cast [nopet][@pet,dead] Summon Voidwalker /petfollow [pet]"
      },
      {
        "id": "warlock-macro-27",
        "title": "Unending Breath and Detect Invisibility",
        "desc": "Give Unending Breath to your mouseover, friendly target or yourself, and hold Shift for Detect Invisibility instead.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift,@mouseover,help,nodead][mod:shift,help][mod:shift,@player] Detect Invisibility; [@mouseover,help,nodead][help][@player] Unending Breath"
      },
      {
        "id": "warlock-macro-28",
        "title": "Voidwalker Torment on your mouseover or target",
        "desc": "Taunt your mouseover with the Voidwalker, or the enemy you're targeting.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Torment /cast [@mouseover,harm,nodead][] Torment"
      },
      {
        "id": "warlock-macro-29",
        "title": "Shadow Bolt and pet attack",
        "desc": "Send your demon at the enemy as you begin Shadow Bolt.",
        "category": "Pet & Utility",
        "code": "#showtooltip Shadow Bolt /petattack /cast Shadow Bolt"
      },
      {
        "id": "warlock-macro-30",
        "title": "Mouseover Immolate",
        "desc": "Apply Immolate to another enemy without changing targets.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Immolate /cast [@mouseover,harm,nodead][] Immolate"
      },
      {
        "id": "warlock-macro-31",
        "title": "Mouseover Conflagrate",
        "desc": "Conflagrate a mouseover that's carrying your Immolate, or your target if nothing's hovered.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Conflagrate /cast [@mouseover,harm,nodead][] Conflagrate"
      },
      {
        "id": "warlock-macro-32",
        "title": "Immolate, then Incinerate",
        "desc": "Send your demon in and press repeatedly: Immolate first, then five Incinerates that hit harder while Immolate is on the target.",
        "category": "General",
        "code": "#showtooltip /petattack [harm,nodead] /castsequence reset=target Immolate, Incinerate, Incinerate, Incinerate, Incinerate, Incinerate"
      },
      {
        "id": "warlock-macro-33",
        "title": "Mouseover Shadowburn",
        "desc": "Finish a mouseover with Shadowburn, and you get a Soul Shard back if it dies within 8 seconds.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Shadowburn /cast [@mouseover,harm,nodead][] Shadowburn"
      },
      {
        "id": "warlock-macro-34",
        "title": "Hellfire on and off",
        "desc": "Start Hellfire and press again to stop it, since it burns you as well as nearby enemies. It can critically strike after the October 1 update.",
        "category": "General",
        "code": "#showtooltip Hellfire /stopcasting [channeling:Hellfire] /stopmacro [channeling:Hellfire] /cast Hellfire"
      },
      {
        "id": "warlock-macro-35",
        "title": "Mouseover Bane of Havoc",
        "desc": "Put Bane of Havoc on the enemy under your cursor, or on your target, so 15% of your damage to other targets also hits it.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Bane of Havoc /cast [@mouseover,harm,nodead][] Bane of Havoc"
      },
      {
        "id": "warlock-macro-36",
        "title": "Pick your nuke with a modifier key",
        "desc": "Cast Shadow Bolt, or hold a modifier for Incinerate, Conflagrate or Shadowburn.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift] Incinerate; [mod:ctrl] Conflagrate; [mod:alt] Shadowburn; Shadow Bolt"
      },
      {
        "id": "warlock-macro-37",
        "title": "Shadow Bolt with an Imp Firebolt command",
        "desc": "Cast Shadow Bolt at your target and request Firebolt at your Imp's current enemy. This doesn't send the Imp to a new target or bypass its mana, cast time or cooldown.",
        "category": "General",
        "code": "#showtooltip Shadow Bolt /cast [harm,nodead] Shadow Bolt /cast [@pettarget,harm,nodead] Firebolt"
      },
      {
        "id": "warlock-macro-38",
        "title": "Drop your cast and Fear",
        "desc": "Cancel whatever you're casting, hop off your mount and Fear your target, or your mouseover with Shift.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Fear /dismount /stopcasting /cast [mod:shift,@mouseover,harm,nodead][] Fear"
      },
      {
        "id": "warlock-macro-39",
        "title": "Death Coil or Howl of Terror",
        "desc": "Cancel your cast and Death Coil your target, or your mouseover with Shift, or Howl of Terror with Ctrl.",
        "category": "General",
        "code": "#showtooltip /stopcasting /cast [mod:ctrl] Howl of Terror; [mod:shift,@mouseover,harm,nodead][] Death Coil"
      },
      {
        "id": "warlock-macro-40",
        "title": "Curse of Tongues, Exhaustion, Weakness or Elements",
        "desc": "Curse your mouseover or target with Tongues, or hold a modifier for Exhaustion, Weakness or the Elements.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift,@mouseover,harm,nodead][mod:shift] Curse of Exhaustion; [mod:ctrl,@mouseover,harm,nodead][mod:ctrl] Curse of Weakness; [mod:alt] Curse of the Elements; [@mouseover,harm,nodead][] Curse of Tongues"
      },
      {
        "id": "warlock-macro-41",
        "title": "Spread dots with one button",
        "desc": "Put Corruption on your mouseover or target, or hold a modifier for Bane of Agony or Siphon Life.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift,@mouseover,harm,nodead][mod:shift] Bane of Agony; [mod:ctrl,@mouseover,harm,nodead][mod:ctrl] Siphon Life; [@mouseover,harm,nodead][] Corruption"
      },
      {
        "id": "warlock-macro-42",
        "title": "Drain Life, Drain Mana or Life Tap",
        "desc": "Drain Life your target without restarting the channel, or hold a modifier for a mouseover, Drain Mana or Life Tap.",
        "category": "General",
        "code": "#showtooltip /cast [mod:alt] Life Tap; [nochanneling,mod:ctrl] Drain Mana; [nochanneling,mod:shift,@mouseover,harm,nodead][nochanneling] Drain Life"
      },
      {
        "id": "warlock-macro-43",
        "title": "Trinkets, racial and a nuke",
        "desc": "Use both trinkets and your Orc or Troll racial, then cast Shadow Bolt, or a modifier for Conflagrate or Shadowburn.",
        "category": "General",
        "code": "#showtooltip /use 13 /use 14 /cast Blood Fury /cast Berserking /cast [mod:shift] Conflagrate; [mod:ctrl] Shadowburn; Shadow Bolt"
      },
      {
        "id": "warlock-macro-44",
        "title": "Pet attack, recall and passive on one key",
        "desc": "Send your demon at your target, or your mouseover with Shift, call it back with Ctrl or set it to passive with Alt.",
        "category": "Pet & Utility",
        "code": "/petattack [mod:shift,@mouseover,harm,nodead][nomod:ctrl,nomod:alt,harm,nodead] /petfollow [mod:ctrl] /petpassive [mod:alt]"
      },
      {
        "id": "warlock-macro-45",
        "title": "Drop your cast and Shadow Ward",
        "desc": "Cancel your cast and put up Shadow Ward when a shadow caster starts on you.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Shadow Ward /stopcasting /cast Shadow Ward"
      },
      {
        "id": "warlock-macro-46",
        "title": "Assist, then curse or Bane",
        "desc": "Assist the friendly player you're targeting and open with Bane of Agony on their target, or a curse on a modifier.",
        "category": "General",
        "code": "#showtooltip /assist [help,nodead] /cast [harm,nodead,mod:shift] Curse of Tongues; [harm,nodead,mod:ctrl] Curse of Exhaustion; [harm,nodead] Bane of Agony"
      },
      {
        "id": "warlock-macro-47",
        "title": "Death Coil or Fear your last target",
        "desc": "Cancel your cast, Death Coil your previous target and swing back to your current one, or hold Shift to Fear the previous target instead.",
        "category": "General",
        "code": "#showtooltip /stopcasting /targetlasttarget /cast [mod:shift] Fear; Death Coil /targetlasttarget"
      },
      {
        "id": "warlock-macro-48",
        "title": "Break free with your racial",
        "desc": "Press to use whichever of these racials your warlock has: Will to Survive, Will of the Forsaken, Escape Artist or Shatter Curse.",
        "category": "General",
        "code": "#showtooltip /cast Will to Survive /cast Will of the Forsaken /cast Escape Artist /cast Shatter Curse"
      },
      {
        "id": "warlock-macro-49",
        "title": "Felhunter Spell Lock on your mouseover or target",
        "desc": "Send the Felhunter's Spell Lock at your mouseover with Shift, or at whatever it's already fighting.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Spell Lock /cast [mod:shift,@mouseover,harm,nodead][@pettarget,harm,nodead][] Spell Lock"
      },
      {
        "id": "warlock-macro-50",
        "title": "Felhunter Devour Magic on yourself or a friend",
        "desc": "Devour Magic your mouseover or target, or yourself with Shift.",
        "category": "General",
        "code": "#showtooltip Devour Magic /cast [mod:shift,@player][@mouseover,exists,nodead][] Devour Magic"
      },
      {
        "id": "warlock-macro-51",
        "title": "Succubus Seduction on your mouseover or target",
        "desc": "Send the Succubus at your mouseover with Shift, or at the enemy it's already fighting.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Seduction /cast [mod:shift,@mouseover,harm,nodead][@pettarget,harm,nodead][] Seduction"
      },
      {
        "id": "warlock-macro-52",
        "title": "Your demon's key ability on one button",
        "desc": "Press for Fire Shield, Sacrifice, Spell Lock or Seduction, whichever your current demon has.",
        "category": "General",
        "code": "#showtooltip /cast [pet:imp] Fire Shield; [pet:voidwalker] Sacrifice; [pet:felhunter] Spell Lock; [pet:succubus] Seduction"
      },
      {
        "id": "warlock-macro-53",
        "title": "Sacrifice, Fel Domination and re-summon",
        "desc": "In a fight, sacrifice the Voidwalker for its shield and bring a new one back fast.",
        "category": "General",
        "code": "#showtooltip Sacrifice /stopmacro [nocombat][nopet:voidwalker] /cast Sacrifice /cast Fel Domination /cast Summon Voidwalker"
      }
    ],
    "priest": [
      {
        "id": "priest-macro-1",
        "title": "Mouseover Dispel Magic",
        "desc": "Dispel a friendly or hostile mouseover, or your selected target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Dispel Magic /cast [@mouseover,exists,nodead][] Dispel Magic"
      },
      {
        "id": "priest-macro-2",
        "title": "Mouseover Fortitude",
        "desc": "Buff a friendly unit under your cursor without retargeting.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Power Word: Fortitude /cast [@mouseover,help,nodead][help,nodead][@player] Power Word: Fortitude"
      },
      {
        "id": "priest-macro-3",
        "title": "Mouseover Fear Ward",
        "desc": "Ward the friend under your cursor against Fear, or your target, or yourself if neither is a friend.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Fear Ward /cast [@mouseover,help,nodead][help,nodead][@player] Fear Ward"
      },
      {
        "id": "priest-macro-4",
        "title": "Mouseover Shackle Undead",
        "desc": "Shackle an undead enemy under your cursor, or your target, without switching what you're attacking.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Shackle Undead /cast [@mouseover,harm,nodead][harm,nodead] Shackle Undead"
      },
      {
        "id": "priest-macro-5",
        "title": "Wand that stays on",
        "desc": "Start wanding. Pressing it again keeps the wand firing instead of switching it off.",
        "category": "General",
        "code": "#showtooltip Shoot /cast !Shoot"
      },
      {
        "id": "priest-macro-6",
        "title": "Mouseover Resurrection",
        "desc": "Resurrect the dead player under your cursor, or your dead target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Resurrection /cast [@mouseover,help,dead][help,dead] Resurrection"
      },
      {
        "id": "priest-macro-7",
        "title": "Dismount and Levitate",
        "desc": "Get off your mount and Levitate yourself. Hold Shift to cancel Levitate.",
        "category": "General",
        "code": "#showtooltip Levitate /dismount /cancelaura [mod:shift] Levitate /cast [nomod] Levitate"
      },
      {
        "id": "priest-macro-8",
        "title": "Self buffs in order",
        "desc": "Buff yourself one spell per press: Inner Fire, then Power Word: Fortitude, then Divine Spirit.",
        "category": "General",
        "code": "#showtooltip /castsequence [@player] reset=15 Inner Fire, Power Word: Fortitude, Divine Spirit"
      },
      {
        "id": "priest-macro-9",
        "title": "Lesser Heal on friends, Smite on enemies",
        "desc": "Heal a friendly mouseover first. Otherwise, Smite a hostile target, heal a friendly target, or heal yourself with no valid target. Useful from level 1.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip /cast [@mouseover,help,nodead] Lesser Heal; [harm,nodead] Smite; [help,nodead][@player] Lesser Heal"
      },
      {
        "id": "priest-macro-10",
        "title": "Mouseover Power Word: Shield",
        "desc": "Shield a friendly mouseover, your target, or yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Power Word: Shield /cast [@mouseover,help,nodead][help,nodead][@player] Power Word: Shield"
      },
      {
        "id": "priest-macro-11",
        "title": "Power Word: Shield with Shift and Alt",
        "desc": "Shield your mouseover, target or yourself. Shift shields your target's target, Alt shields you.",
        "category": "General",
        "code": "#showtooltip Power Word: Shield /cast [mod:alt,@player][mod:shift,@targettarget,help,nodead][@mouseover,help,nodead][help,nodead][@player] Power Word: Shield"
      },
      {
        "id": "priest-macro-12",
        "title": "Power Word: Shield, Rank 6 with Shift",
        "desc": "Shield your mouseover, target or yourself. Hold Shift for Rank 6 when a lighter, cheaper shield will do.",
        "category": "General",
        "code": "#showtooltip Power Word: Shield /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Power Word: Shield(Rank 6); [@mouseover,help,nodead][help,nodead][@player] Power Word: Shield"
      },
      {
        "id": "priest-macro-13",
        "title": "Penance for heals, Shift for damage",
        "desc": "Heal a friendly mouseover, target or yourself; hold Shift to damage your hostile target. Repeated presses let your current Penance channel finish.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Penance /stopmacro [channeling:Penance] /cast [mod:shift,harm,nodead][@mouseover,help,nodead][help,nodead][@player] Penance"
      },
      {
        "id": "priest-macro-14",
        "title": "Inner Focus into Greater Heal",
        "desc": "Pop Inner Focus and start a free Greater Heal on your mouseover, target or yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Greater Heal /cast Inner Focus /cast [@mouseover,help,nodead][help,nodead][@player] Greater Heal"
      },
      {
        "id": "priest-macro-15",
        "title": "Power Infusion on a friend or you",
        "desc": "Put Power Infusion on the friend under your cursor, then your target, then yourself. Alt always picks you.",
        "category": "General",
        "code": "#showtooltip Power Infusion /cast [mod:alt,@player][@mouseover,help,nodead][help,nodead][@player] Power Infusion"
      },
      {
        "id": "priest-macro-16",
        "title": "Mouseover Mana Burn",
        "desc": "Burn another enemy’s mana while keeping your selected target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Mana Burn /cast [@mouseover,harm,nodead][] Mana Burn"
      },
      {
        "id": "priest-macro-17",
        "title": "Mouseover Contingency Plan",
        "desc": "Ward a friend under your cursor, your target or yourself. When their Health drops below 35% they get a shield and a heal over time. Its shield and heal-over-time can coexist with Power Word: Shield and Renew.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Contingency Plan /cast [@mouseover,help,nodead][help,nodead][@player] Contingency Plan"
      },
      {
        "id": "priest-macro-18",
        "title": "Divine Grace on a hurt friend",
        "desc": "Heal a friend below half health right away and clear their Weakened Soul so you can shield them again.",
        "category": "General",
        "code": "#showtooltip Divine Grace /cast [@mouseover,help,nodead][help,nodead] Divine Grace"
      },
      {
        "id": "priest-macro-19",
        "title": "Mouseover Divine Spirit",
        "desc": "Buff the friend under your cursor with Divine Spirit, or your target, or yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Divine Spirit /cast [@mouseover,help,nodead][help,nodead][@player] Divine Spirit"
      },
      {
        "id": "priest-macro-20",
        "title": "Mouseover Prayer of Fortitude",
        "desc": "Cast Prayer of Fortitude on the friend under your cursor, your target or yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Prayer of Fortitude /cast [@mouseover,help,nodead][help,nodead][@player] Prayer of Fortitude"
      },
      {
        "id": "priest-macro-21",
        "title": "Mouseover Flash Heal",
        "desc": "Heal a party frame under your cursor, then your target, then yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Flash Heal /cast [@mouseover,help,nodead][help,nodead][@player] Flash Heal"
      },
      {
        "id": "priest-macro-22",
        "title": "Holy Fire or Smite",
        "desc": "Hold Shift for Smite; press normally for Holy Fire.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Smite; Holy Fire /cast [mod:shift] Smite; Holy Fire"
      },
      {
        "id": "priest-macro-23",
        "title": "Greater Heal, Rank 1 with Shift",
        "desc": "Greater Heal your mouseover, target or yourself. Hold Shift for Rank 1 when the damage is small.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Greater Heal /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Greater Heal(Rank 1); [@mouseover,help,nodead][help,nodead][@player] Greater Heal"
      },
      {
        "id": "priest-macro-24",
        "title": "Mouseover Renew, Rank 5 with Shift",
        "desc": "Renew your mouseover, target or yourself. Hold Shift for Rank 5 to save Mana. Blizzard confirms Renew from different Priests can stay active on the same target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Renew /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Renew(Rank 5); [@mouseover,help,nodead][help,nodead][@player] Renew"
      },
      {
        "id": "priest-macro-25",
        "title": "Prayer of Healing on a chosen group",
        "desc": "Cast Prayer of Healing on the friend under your cursor to heal their party, including pets, so you pick which party gets it.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Prayer of Healing /cast [@mouseover,help,nodead][help,nodead][@player] Prayer of Healing"
      },
      {
        "id": "priest-macro-26",
        "title": "Mouseover Binding Heal",
        "desc": "Heal the friend under your cursor, or your target, and yourself with one cast.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Binding Heal /cast [@mouseover,help,nodead][help,nodead] Binding Heal"
      },
      {
        "id": "priest-macro-27",
        "title": "Mouseover Prayer of Mending",
        "desc": "Put Prayer of Mending on your mouseover, target or yourself. Damage or non-periodic healing triggers its heal and a jump to a nearby party or raid member.",
        "category": "Pet & Utility",
        "code": "#showtooltip Prayer of Mending /cast [@mouseover,help,nodead][help,nodead][@player] Prayer of Mending"
      },
      {
        "id": "priest-macro-28",
        "title": "Abolish Disease, Cure Disease with Shift",
        "desc": "Abolish Disease on your mouseover, target or yourself. Hold Shift for a one-off Cure Disease.",
        "category": "General",
        "code": "#showtooltip Abolish Disease /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Cure Disease; [@mouseover,help,nodead][help,nodead][@player] Abolish Disease"
      },
      {
        "id": "priest-macro-29",
        "title": "Holy Fire pull, then wand",
        "desc": "Open with Holy Fire on the first press, then press again to start wanding.",
        "category": "General",
        "code": "#showtooltip Holy Fire /castsequence reset=target/combat Holy Fire, !Shoot"
      },
      {
        "id": "priest-macro-30",
        "title": "Alternate two heals for Litany of Light",
        "desc": "Alternate Flash Heal and Greater Heal on one button so each cast differs from the last, which is what Litany of Light rewards.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Flash Heal /castsequence [@mouseover,help,nodead][help,nodead][@player] reset=4 Flash Heal, Greater Heal"
      },
      {
        "id": "priest-macro-31",
        "title": "Smite your tank's target",
        "desc": "Smite your hostile target, or the enemy your friendly target is attacking. Leave your tank selected while dealing damage between heals; it won't interrupt a channel.",
        "category": "General",
        "code": "#showtooltip Smite /stopmacro [channeling] /cast [harm,nodead][@targettarget,harm,nodead] Smite"
      },
      {
        "id": "priest-macro-32",
        "title": "Mouseover Shadow Word: Pain",
        "desc": "Apply your damage-over-time spell to a mouseover without switching target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Shadow Word: Pain /cast [@mouseover,harm,nodead][] Shadow Word: Pain"
      },
      {
        "id": "priest-macro-33",
        "title": "Mouseover Shadow Word: Death",
        "desc": "Use Forever’s finisher on a mouseover or your target. If it fails to kill, you take 10% of your max health as damage.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Shadow Word: Death /cast [@mouseover,harm,nodead][] Shadow Word: Death"
      },
      {
        "id": "priest-macro-34",
        "title": "Shadowform on, Shift to drop it",
        "desc": "Enter Shadowform when you're not in it. Hold Shift to drop it.",
        "category": "General",
        "code": "#showtooltip Shadowform /cancelaura [mod:shift] Shadowform /cast [nomod,noform:1] Shadowform"
      },
      {
        "id": "priest-macro-35",
        "title": "Drop Shadowform and Flash Heal",
        "desc": "Drop Shadowform and Flash Heal your mouseover, target or yourself in one press. Recast Shadowform afterwards.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Flash Heal /cancelaura Shadowform /cast [@mouseover,help,nodead][help,nodead][@player] Flash Heal"
      },
      {
        "id": "priest-macro-36",
        "title": "Mind Flay that won't restart",
        "desc": "Spam Mind Flay without restarting the channel every time you press it.",
        "category": "General",
        "code": "#showtooltip Mind Flay /cast [nochanneling:Mind Flay] Mind Flay"
      },
      {
        "id": "priest-macro-37",
        "title": "Mind Blast, Shift for Mind Flay",
        "desc": "Press for Mind Blast. Hold Shift for Mind Flay, which won't restart while you're already channeling it.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Mind Flay; Mind Blast /cast [mod:shift,nochanneling:Mind Flay] Mind Flay; [nomod] Mind Blast"
      },
      {
        "id": "priest-macro-38",
        "title": "Mouseover Devouring Plague",
        "desc": "Put Devouring Plague on your mouseover or target. The damage it does heals you.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Devouring Plague /cast [@mouseover,harm,nodead][harm,nodead] Devouring Plague"
      },
      {
        "id": "priest-macro-39",
        "title": "Mouseover Vampiric Embrace",
        "desc": "Afflict your mouseover or target so your Shadow damage heals your party.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Vampiric Embrace /cast [@mouseover,harm,nodead][harm,nodead] Vampiric Embrace"
      },
      {
        "id": "priest-macro-40",
        "title": "Mouseover Starshards",
        "desc": "Rain Starshards on your mouseover or target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Starshards /cast [@mouseover,harm,nodead][harm,nodead] Starshards"
      },
      {
        "id": "priest-macro-41",
        "title": "Shadow Word: Pain, then wand",
        "desc": "The first press applies Shadow Word: Pain. Each press after that starts or keeps up the wand.",
        "category": "General",
        "code": "#showtooltip Shadow Word: Pain /castsequence reset=target/combat Shadow Word: Pain, !Shoot"
      },
      {
        "id": "priest-macro-42",
        "title": "Silence your target or mouseover",
        "desc": "Cancel your current cast and Silence your target. Hold Shift for your mouseover.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Silence /stopcasting /cast [mod:shift,@mouseover,harm,nodead][harm,nodead] Silence"
      },
      {
        "id": "priest-macro-43",
        "title": "Psychic Scream, Shift for Fade",
        "desc": "Cancel your current cast, then Psychic Scream the enemies around you. Hold Shift for Fade instead. Blizzard's 30 September guide says Fade's threat reduction is doubled.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Fade; Psychic Scream /stopcasting /cast [mod:shift] Fade; Psychic Scream"
      },
      {
        "id": "priest-macro-44",
        "title": "Mind Control, Shift for Shackle Undead",
        "desc": "Mind Control the enemy under your cursor, or your target. Hold Shift to Shackle Undead instead.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Shackle Undead; Mind Control /cast [mod:shift,@mouseover,harm,nodead][mod:shift,harm,nodead] Shackle Undead; [@mouseover,harm,nodead][harm,nodead] Mind Control"
      },
      {
        "id": "priest-macro-45",
        "title": "Dispel Magic on four aims",
        "desc": "One Dispel Magic button: target by default, mouseover with Shift, you with Ctrl, your target's target with Alt.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Dispel Magic /cast [mod:ctrl,@player][mod:shift,@mouseover,exists,nodead][mod:alt,@targettarget,help,nodead][] Dispel Magic"
      },
      {
        "id": "priest-macro-46",
        "title": "Trinket and shield",
        "desc": "Cancel your cast, use your top trinket and shield yourself. Hold Shift to shield your mouseover ally with no trinket.",
        "category": "General",
        "code": "#showtooltip Power Word: Shield /stopcasting /use [nomod] 13 /cast [mod:shift,@mouseover,help,nodead][@player] Power Word: Shield"
      },
      {
        "id": "priest-macro-47",
        "title": "Stop and Flash Heal",
        "desc": "Cancel your cast and Flash Heal your mouseover, target or yourself. Hold Shift to heal yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Flash Heal /stopcasting /cast [mod:shift,@player][@mouseover,help,nodead][help,nodead][@player] Flash Heal"
      },
      {
        "id": "priest-macro-48",
        "title": "Shadow Word: Pain, Shift for Devouring Plague",
        "desc": "Shadow Word: Pain on your mouseover or target. Hold Shift for Devouring Plague on the same aim.",
        "category": "General",
        "code": "#showtooltip Shadow Word: Pain /cast [mod:shift,@mouseover,harm,nodead][mod:shift,harm,nodead] Devouring Plague; [@mouseover,harm,nodead][harm,nodead] Shadow Word: Pain"
      },
      {
        "id": "priest-macro-49",
        "title": "Hex of Weakness on target or mouseover",
        "desc": "Put Hex of Weakness on your target, which lowers its melee attack power and the healing it receives. Hold Shift for your mouseover.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Hex of Weakness /cast [mod:shift,@mouseover,harm,nodead][harm,nodead] Hex of Weakness"
      },
      {
        "id": "priest-macro-50",
        "title": "Chastise target or mouseover",
        "desc": "Chastise your target to immobilize them for 2 seconds. Hold Shift for your mouseover.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Chastise /cast [mod:shift,@mouseover,harm,nodead][harm,nodead] Chastise"
      },
      {
        "id": "priest-macro-51",
        "title": "Stop and Confounding Flash",
        "desc": "Cancel your cast and confuse every enemy within 8 yards for 3 seconds. Any damage breaks it.",
        "category": "General",
        "code": "#showtooltip Confounding Flash /stopcasting /cast Confounding Flash"
      },
      {
        "id": "priest-macro-52",
        "title": "Desperate Prayer, Shift for a shield",
        "desc": "Cancel your cast and use Desperate Prayer. Hold Shift to shield yourself instead.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Power Word: Shield; Desperate Prayer /stopcasting /cast [mod:shift,@player] Power Word: Shield; Desperate Prayer"
      },
      {
        "id": "priest-macro-53",
        "title": "Shadow Protection, Shift for the group",
        "desc": "Give Shadow resistance to your mouseover, target or yourself. Hold Shift for Prayer of Shadow Protection.",
        "category": "General",
        "code": "#showtooltip Shadow Protection /cast [mod:shift,@player] Prayer of Shadow Protection; [@mouseover,help,nodead][help,nodead][@player] Shadow Protection"
      },
      {
        "id": "priest-macro-54",
        "title": "Nearest enemy, then Shadow Word: Pain",
        "desc": "Pick up the nearest enemy if you have no living hostile target, then put Shadow Word: Pain on it.",
        "category": "General",
        "code": "#showtooltip Shadow Word: Pain /targetenemy [noharm][dead] /cast Shadow Word: Pain"
      },
      {
        "id": "priest-macro-55",
        "title": "Mind Flay slow on target or mouseover",
        "desc": "Mind Flay your target without restarting the channel. Hold Shift to slow your mouseover instead.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Mind Flay /cast [mod:shift,@mouseover,harm,nodead,nochanneling:Mind Flay][nochanneling:Mind Flay,harm,nodead] Mind Flay"
      }
    ],
    "druid": [
      {
        "id": "druid-macro-1",
        "title": "Mouseover Rebirth",
        "desc": "Resurrect a dead friendly mouseover, or your selected dead ally.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Rebirth /cast [@mouseover,help,dead][help,dead][] Rebirth"
      },
      {
        "id": "druid-macro-2",
        "title": "Mouseover Remove Curse",
        "desc": "Cleanse a friendly mouseover, your target, or yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Remove Curse /cast [@mouseover,help,nodead][help,nodead][@player] Remove Curse"
      },
      {
        "id": "druid-macro-3",
        "title": "Mouseover Cure Poison or Abolish Poison",
        "desc": "Cure a poison on the friendly under your cursor, your target or yourself, or hold Shift for Abolish Poison. You leave your form first.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Cure Poison /cancelform /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Abolish Poison; [@mouseover,help,nodead][help,nodead][@player] Cure Poison"
      },
      {
        "id": "druid-macro-4",
        "title": "Rebirth in combat, Revive outside it",
        "desc": "Rebirth the dead player under your cursor or your target while you're in combat, and Revive them when you're not.",
        "category": "General",
        "code": "#showtooltip [combat] Rebirth; Revive /cast [@mouseover,help,dead,combat][help,dead,combat] Rebirth /cast [@mouseover,help,dead,nocombat][help,dead,nocombat] Revive"
      },
      {
        "id": "druid-macro-5",
        "title": "Mouseover Innervate",
        "desc": "Leave your form and Innervate the friendly under your cursor, your target or yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Innervate /cancelform /cast [@mouseover,help,nodead][help,nodead][@player] Innervate"
      },
      {
        "id": "druid-macro-6",
        "title": "Mouseover Mark of the Wild or Thorns",
        "desc": "Buff the friendly under your cursor, your target or yourself with Mark of the Wild, or with Thorns while you hold Shift. You leave your form first.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip [mod:shift] Thorns; Mark of the Wild /cancelform /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Thorns; [@mouseover,help,nodead][help,nodead][@player] Mark of the Wild"
      },
      {
        "id": "druid-macro-7",
        "title": "Cat Form or Bear Form on one key",
        "desc": "Dismount and go into Cat Form, or into Bear Form while you hold Shift; swap in Dire Bear Form once you learn it at 40.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Bear Form; Cat Form /dismount /cast [mod:shift] Bear Form; Cat Form"
      },
      {
        "id": "druid-macro-8",
        "title": "Travel, Aquatic or Cat Form on one key",
        "desc": "Aquatic Form when you're swimming, Travel Form outdoors and Cat Form anywhere else, dismounting you first.",
        "category": "General",
        "code": "#showtooltip /dismount /cast [swimming] Aquatic Form; [outdoors] Travel Form; Cat Form"
      },
      {
        "id": "druid-macro-9",
        "title": "Heal from any form",
        "desc": "Leave your form and cast Healing Touch on the friendly under your cursor, or on yourself; hold Shift for Regrowth instead.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Healing Touch /cancelform /cast [mod:shift,@mouseover,help,nodead][mod:shift,@player] Regrowth; [@mouseover,help,nodead][@player] Healing Touch"
      },
      {
        "id": "druid-macro-10",
        "title": "Drop your form and dismount",
        "desc": "Stop your cast, leave your shapeshift and get off your mount in one press.",
        "category": "General",
        "code": "/stopcasting /cancelform /dismount"
      },
      {
        "id": "druid-macro-11",
        "title": "Barkskin, Shift for Nature's Grasp",
        "desc": "Use Barkskin in your current form, or hold Shift for Nature's Grasp. Neither branch cancels your form in Forever.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Nature's Grasp; Barkskin /cast [mod:shift] Nature's Grasp; Barkskin"
      },
      {
        "id": "druid-macro-12",
        "title": "Mouseover Moonfire",
        "desc": "Apply Moonfire to another enemy while keeping your main target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Moonfire /cast [@mouseover,harm,nodead][] Moonfire"
      },
      {
        "id": "druid-macro-13",
        "title": "Starfire or Wrath",
        "desc": "Hold Shift for Wrath; press normally for Starfire.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Wrath; Starfire /cast [mod:shift] Wrath; Starfire"
      },
      {
        "id": "druid-macro-14",
        "title": "Mouseover Insect Swarm",
        "desc": "Swarm the enemy under your cursor, or your target when there isn't one.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Insect Swarm /cast [@mouseover,harm,nodead][] Insect Swarm"
      },
      {
        "id": "druid-macro-15",
        "title": "Moonfire, then Insect Swarm",
        "desc": "Press it twice to put Moonfire and then Insect Swarm on your target; the sequence starts over when you change target.",
        "category": "General",
        "code": "#showtooltip Moonfire /castsequence reset=target Moonfire, Insect Swarm"
      },
      {
        "id": "druid-macro-16",
        "title": "Wrath, then two Starfires",
        "desc": "Runs Wrath and two Starfires in a row, the way the Eclipse talent describes it.",
        "category": "General",
        "code": "#showtooltip Starfire /castsequence reset=target/12 Wrath, Starfire, Starfire"
      },
      {
        "id": "druid-macro-17",
        "title": "Mouseover Entangling Roots",
        "desc": "Root the enemy under your cursor, or your target; you can only keep one enemy rooted at a time unless you take Overgrowth.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Entangling Roots /cast [@mouseover,harm,nodead][] Entangling Roots"
      },
      {
        "id": "druid-macro-18",
        "title": "Mouseover Hibernate",
        "desc": "Put the beast or dragonkin under your cursor to sleep, or your target if there's no mouseover; damage wakes it.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Hibernate /cast [@mouseover,harm,nodead][] Hibernate"
      },
      {
        "id": "druid-macro-19",
        "title": "Mouseover Faerie Fire",
        "desc": "Faerie Fire the enemy under your cursor, or your target; while it's on, the enemy can't stealth or turn invisible. Bear, Cat and Dire Bear casts cost no resources and have a 6 sec cooldown.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Faerie Fire /cast [@mouseover,harm,nodead][] Faerie Fire"
      },
      {
        "id": "druid-macro-20",
        "title": "Hurricane without restarting it",
        "desc": "Nothing happens while you're already channeling, so mashing the key can't cut your own Hurricane short; click the ground as usual.",
        "category": "General",
        "code": "#showtooltip Hurricane /stopmacro [channeling] /cast Hurricane"
      },
      {
        "id": "druid-macro-21",
        "title": "Primal Bite and auto attack",
        "desc": "Use Forever’s renamed Feral talent while keeping auto attack on.",
        "category": "General",
        "code": "#showtooltip Primal Bite /startattack /cast Primal Bite"
      },
      {
        "id": "druid-macro-22",
        "title": "Mouseover Growl",
        "desc": "Taunt an enemy under your cursor without dropping your current target.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Growl /cast [@mouseover,harm,nodead][] Growl"
      },
      {
        "id": "druid-macro-23",
        "title": "Powershift into Cat Form",
        "desc": "Leave and re-enter Cat, one step per press. Furor can regenerate Energy outside Cat. The October 1 beta update also added Shifting Power as a separate Energy option.",
        "category": "General",
        "code": "#showtooltip Cat Form /cancelform [noform:3] /cast [form:3] Cat Form /cast [noform:3] !Cat Form"
      },
      {
        "id": "druid-macro-24",
        "title": "Dismount, Cat Form and Prowl",
        "desc": "Dismount and enter Cat Form if needed, then press again after the global cooldown to Prowl. Repeated presses while hidden leave you in Stealth.",
        "category": "General",
        "code": "#showtooltip Prowl /dismount /cast [noform:3] Cat Form /cast [form:3,nostealth,nocombat] Prowl"
      },
      {
        "id": "druid-macro-25",
        "title": "Ravage from stealth, Shred otherwise",
        "desc": "Ravage while you're Prowling and Shred once you're not; auto attack only starts after the opener. Both need you behind the target.",
        "category": "General",
        "code": "#showtooltip [stealth] Ravage; Shred /startattack [nostealth] /cast [stealth] Ravage; Shred"
      },
      {
        "id": "druid-macro-26",
        "title": "Ferocious Bite, Shift for Rip",
        "desc": "Spend your combo points on Ferocious Bite, or hold Shift for Rip.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Rip; Ferocious Bite /cast [mod:shift] Rip; Ferocious Bite"
      },
      {
        "id": "druid-macro-27",
        "title": "Berserk into Primal Bite or Shred",
        "desc": "Berserk, then Primal Bite in Bear Form or Shred in Cat Form, all on one press.",
        "category": "General",
        "code": "#showtooltip Berserk /cast Berserk /cast [form:1] Primal Bite; [form:3] Shred"
      },
      {
        "id": "druid-macro-28",
        "title": "Mouseover Lacerate",
        "desc": "Stack Lacerate on the enemy under your cursor, or your target, and keep auto attack going.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Lacerate /startattack /cast [@mouseover,harm,nodead][] Lacerate"
      },
      {
        "id": "druid-macro-29",
        "title": "Enrage into Frenzied Regeneration",
        "desc": "Enrage for its instant 10 Rage, then Frenzied Regeneration to turn that Rage into health. With enough Rage over its duration, Frenzied Regeneration can restore your full maximum health.",
        "category": "General",
        "code": "#showtooltip Frenzied Regeneration /cast [form:1] Enrage /cast Frenzied Regeneration"
      },
      {
        "id": "druid-macro-30",
        "title": "Swipe, Shift for Demoralizing Roar",
        "desc": "Swipe with auto attack running, or hold Shift for Demoralizing Roar.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Demoralizing Roar; Swipe /startattack /cast [mod:shift] Demoralizing Roar; Swipe"
      },
      {
        "id": "druid-macro-31",
        "title": "Cat leap into Shred",
        "desc": "Leap behind your target with Cat Feral Charge, then press for Shred. The Cat leap has a 30 sec cooldown and does not interrupt or root; check the Cat spell name on your action bar if this cast fails.",
        "category": "General",
        "code": "#showtooltip Feral Charge /startattack /cast [form:3,harm] Feral Charge /cast [form:3,harm] Shred"
      },
      {
        "id": "druid-macro-32",
        "title": "Mouseover Rejuvenation",
        "desc": "Heal the party frame under your cursor, your target, or yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Rejuvenation /cast [@mouseover,help,nodead][help,nodead][@player] Rejuvenation"
      },
      {
        "id": "druid-macro-33",
        "title": "Mouseover Wild Growth",
        "desc": "Heal your friendly mouseover’s or target’s nearby party and pets in seven declining ticks, with a 6 sec cooldown. In a raid, the target chooses which party is healed.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Wild Growth /cast [@mouseover,help,nodead][help,nodead][@player] Wild Growth"
      },
      {
        "id": "druid-macro-34",
        "title": "Mouseover Regrowth, or your target's target",
        "desc": "Regrowth the friendly under your cursor, your target, whoever your enemy target is fighting, or yourself.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Regrowth /cast [@mouseover,help,nodead][help,nodead][@targettarget,help,nodead][@player] Regrowth"
      },
      {
        "id": "druid-macro-35",
        "title": "Healing Touch, Shift for a lower rank",
        "desc": "Cast your top rank of Healing Touch on a mouseover, your target or yourself, or hold Shift for Rank 3 when a smaller heal will do; change the number to suit your level.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Healing Touch /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Healing Touch(Rank 3); [@mouseover,help,nodead][help,nodead][@player] Healing Touch"
      },
      {
        "id": "druid-macro-36",
        "title": "Mouseover Swiftmend",
        "desc": "Swiftmend your friendly mouseover, target or yourself. Rejuvenation or Regrowth keeps running afterward, as Blizzard confirmed September 30.",
        "category": "Pet & Utility",
        "code": "#showtooltip Swiftmend /cast [@mouseover,help,nodead][help,nodead][@player] Swiftmend"
      },
      {
        "id": "druid-macro-37",
        "title": "Nature's Swiftness into a heal",
        "desc": "Leave your form, pop Nature's Swiftness and make your next heal instant: Healing Touch, or Regrowth while you hold Shift.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Nature's Swiftness /cancelform /cast Nature's Swiftness /cast [mod:shift,@mouseover,help,nodead][mod:shift,help,nodead][mod:shift,@player] Regrowth; [@mouseover,help,nodead][help,nodead][@player] Healing Touch"
      },
      {
        "id": "druid-macro-38",
        "title": "Rejuvenation, then Swiftmend",
        "desc": "Rejuvenation on the first press and Swiftmend on the second, on your friendly target or yourself. Swiftmend leaves Rejuvenation running.",
        "category": "Pet & Utility",
        "code": "#showtooltip /castsequence [help,nodead][@player] reset=target/6 Rejuvenation, Swiftmend"
      },
      {
        "id": "druid-macro-39",
        "title": "Rejuvenation by party slot",
        "desc": "Rejuvenate yourself, or hold Shift, Ctrl or Alt for party members 1, 2 or 3 without touching a frame.",
        "category": "General",
        "code": "#showtooltip Rejuvenation /cast [mod:shift,@party1,help,nodead][mod:ctrl,@party2,help,nodead][mod:alt,@party3,help,nodead][@player] Rejuvenation"
      },
      {
        "id": "druid-macro-40",
        "title": "Tranquility, Shift to stop",
        "desc": "Leave your form and channel Tranquility. Repeated presses leave the channel running; hold Shift to stop it early.",
        "category": "General",
        "code": "#showtooltip Tranquility /stopcasting [mod:shift] /stopmacro [mod:shift] /cancelform /cast [nochanneling:Tranquility] Tranquility"
      },
      {
        "id": "druid-macro-41",
        "title": "Bash, shifting into Bear Form first",
        "desc": "Bash your target, or your mouseover with Shift; if you're not in a bear it puts you in Dire Bear Form first, so the second press lands the stun. Tauren can add War Stomp on Ctrl.",
        "category": "General",
        "code": "#showtooltip Bash /cast [mod:ctrl] War Stomp; [mod:shift,form:1,@mouseover,harm,nodead] Bash; [form:1] Bash; !Dire Bear Form"
      },
      {
        "id": "druid-macro-42",
        "title": "Enrage, charge and Bash",
        "desc": "In Bear Form it Enrages for the Rage (your armor drops for 10 seconds), charges and Bashes; press again if the Bash was short on Rage. From any other form the first press only changes your form.",
        "category": "General",
        "code": "#showtooltip Feral Charge /cast [noform:1] !Dire Bear Form /cast [form:1] Enrage /cast [form:1,mod:shift,@mouseover,harm,nodead][form:1,harm] Feral Charge /cast [form:1,mod:shift,@mouseover,harm,nodead][form:1,harm] Bash"
      },
      {
        "id": "druid-macro-43",
        "title": "Pounce from stealth, Shift for Ravage",
        "desc": "Stun with Pounce from Prowl, or open with Ravage while you hold Shift; out of stealth it falls back to Rake. Both openers need you behind the target.",
        "category": "General",
        "code": "#showtooltip [stealth,mod:shift] Ravage; [stealth] Pounce; Rake /startattack [nostealth] /cast [stealth,mod:shift] Ravage; [stealth] Pounce; Rake"
      },
      {
        "id": "druid-macro-44",
        "title": "Prowl, Dash or Shadowmeld on one key",
        "desc": "Go into Cat Form if you need to, then Prowl, or Dash with Shift held; Night Elves get Shadowmeld on Ctrl.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Dash; [mod:ctrl] Shadowmeld; Prowl /cast [mod:ctrl] Shadowmeld /cast [noform:3,nomod][noform:3,mod:shift] !Cat Form /cast [mod:shift] Dash; [nomod] !Prowl"
      },
      {
        "id": "druid-macro-45",
        "title": "PvP trinket and Bear Form",
        "desc": "Stop your cast, use your top trinket in combat and drop into Dire Bear Form, or Cat Form with Shift.",
        "category": "PvP",
        "code": "#showtooltip [mod:shift] Cat Form; Dire Bear Form /stopcasting /use [combat] 13 /cast [mod:shift,noform:3] !Cat Form; [nomod,noform:1] !Dire Bear Form"
      },
      {
        "id": "druid-macro-46",
        "title": "Roots, Shift for Travel Form, Ctrl for Hibernate",
        "desc": "Root your mouseover or target, run off in Travel Form with Shift, or put a beast to sleep with Ctrl (a hunter's pet counts). Entangling Roots works indoors as well as outdoors.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Travel Form; [mod:ctrl] Hibernate; Entangling Roots /cancelform [noform:5,nomod][noform:5,mod:ctrl] /cast [mod:shift] Travel Form; [mod:ctrl,@mouseover,harm,nodead] Hibernate; [@mouseover,harm,nodead][] Entangling Roots"
      },
      {
        "id": "druid-macro-47",
        "title": "Instant heal or instant root",
        "desc": "Nature's Swiftness into Healing Touch on a mouseover or yourself, or into an instant Entangling Roots on your target while you hold Shift.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Nature's Swiftness /cancelform [mod:shift,noform:5][nomod] /cast [mod:shift,harm][nomod] Nature's Swiftness /cast [mod:shift,harm] Entangling Roots; [nomod,@mouseover,help,nodead][nomod,@player] Healing Touch"
      },
      {
        "id": "druid-macro-48",
        "title": "Defensive button by modifier",
        "desc": "Barkskin on a plain press, Nature's Grasp with Ctrl, or Enrage into Frenzied Regeneration with Shift in Bear Form. Barkskin and Nature's Grasp both work while shapeshifted.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Frenzied Regeneration; [mod:ctrl] Nature's Grasp; Barkskin /cast [mod:shift,form:1] Enrage /cast [mod:shift,form:1] Frenzied Regeneration; [mod:ctrl] Nature's Grasp; [nomod] Barkskin"
      },
      {
        "id": "druid-macro-49",
        "title": "Faerie Fire your target or mouseover",
        "desc": "Faerie Fire your target, or your mouseover with Shift, to prevent stealth and invisibility. Stay in Bear, Cat, Dire Bear or Moonkin Form; Bear, Cat and Dire Bear casts cost no resources and have a 6 sec cooldown.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Faerie Fire /cancelform [form:2/4] /cast [mod:shift,@mouseover,harm,nodead][harm] Faerie Fire"
      },
      {
        "id": "druid-macro-50",
        "title": "Change form to break a root or snare",
        "desc": "Changing form frees you from movement impairing effects, so this always changes it: Cat to Bear, anything else to Cat, Travel Form outdoors with Shift, Aquatic Form with Ctrl.",
        "category": "General",
        "code": "#showtooltip /cast [mod:shift,outdoors] Travel Form; [mod:ctrl] Aquatic Form; [form:3] Dire Bear Form; Cat Form"
      },
      {
        "id": "druid-macro-51",
        "title": "Instant heals on the move",
        "desc": "Rejuvenation on a plain press, Swiftmend with Shift or Wild Growth with Ctrl, all instant, on your mouseover or yourself. You leave your form first.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Rejuvenation /cancelform /cast [mod:shift,@mouseover,help,nodead][mod:shift,@player] Swiftmend; [mod:ctrl,@mouseover,help,nodead][mod:ctrl,@player] Wild Growth; [@mouseover,help,nodead][@player] Rejuvenation"
      },
      {
        "id": "druid-macro-52",
        "title": "Drop your cast for an instant",
        "desc": "Stop the cast you're on and fire Moonfire at your target; Shift for your mouseover, Ctrl for Insect Swarm, Alt for Faerie Fire.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Moonfire /stopcasting /cast [mod:ctrl] Insect Swarm; [mod:alt] Faerie Fire; [mod:shift,@mouseover,harm,nodead] Moonfire; Moonfire"
      },
      {
        "id": "druid-macro-53",
        "title": "Cleanse yourself or a friend",
        "desc": "Remove Curse on a mouseover or yourself, Abolish Poison with Shift, and Ctrl or Alt to force either onto yourself. You leave your form first.",
        "category": "General",
        "code": "#showtooltip Remove Curse /cancelform /cast [mod:ctrl,@player] Remove Curse; [mod:alt,@player] Abolish Poison; [mod:shift,@mouseover,help,nodead][mod:shift,@player] Abolish Poison; [@mouseover,help,nodead][@player] Remove Curse"
      }
    ],
    "rogue": [
      {
        "id": "rogue-macro-1",
        "title": "Mouseover Kick",
        "desc": "Interrupt the caster under your cursor, or your current target when the cursor is on nothing.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Kick /cast [@mouseover,harm,nodead][] Kick"
      },
      {
        "id": "rogue-macro-2",
        "title": "Mouseover Sap",
        "desc": "Sap the enemy under your cursor and keep your main target selected.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Sap /cast [@mouseover,harm,nodead][] Sap"
      },
      {
        "id": "rogue-macro-3",
        "title": "Stealth that won't switch itself off",
        "desc": "Dismount if you need to and slip into Stealth; pressing it again while hidden does nothing instead of dropping you out.",
        "category": "General",
        "code": "#showtooltip Stealth /dismount /cast [nostealth,nocombat] Stealth"
      },
      {
        "id": "rogue-macro-4",
        "title": "Mouseover Pick Pocket",
        "desc": "Pick the pocket of the enemy under your cursor, or your target when the cursor is on nothing.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Pick Pocket /cast [@mouseover,harm,nodead][] Pick Pocket"
      },
      {
        "id": "rogue-macro-5",
        "title": "Pick Pocket, then open from Stealth",
        "desc": "One key for the whole opener: it enters Stealth if you're visible, then Pick Pocket and Cheap Shot on your target.",
        "category": "General",
        "code": "#showtooltip [stealth,mod:shift] Garrote; [stealth,mod:ctrl] Ambush; Cheap Shot /cast [stealth] Pick Pocket /cast [nostealth] Stealth; [mod:shift] Garrote; [mod:ctrl] Ambush; Cheap Shot"
      },
      {
        "id": "rogue-macro-6",
        "title": "Evasion and Sprint together",
        "desc": "Press once in a bad fight to raise your dodge and pick up speed at the same time.",
        "category": "General",
        "code": "#showtooltip Evasion /cast Evasion /cast Sprint"
      },
      {
        "id": "rogue-macro-7",
        "title": "Use both trinkets",
        "desc": "Fire the trinkets in both trinket slots with one press.",
        "category": "General",
        "code": "#showtooltip /use 13 /use 14"
      },
      {
        "id": "rogue-macro-8",
        "title": "Apply a poison from one key",
        "desc": "Coat your main hand with Instant Poison, or your off hand with Alt; put in the full name of the rank you carry, such as Instant Poison II.",
        "category": "General",
        "code": "#showtooltip /use [mod:shift] Deadly Poison; Instant Poison /use [mod:alt] 17; 16 /click StaticPopup1Button1"
      },
      {
        "id": "rogue-macro-9",
        "title": "Sharpen your weapons from one key",
        "desc": "Put a Heavy Sharpening Stone on your main hand, or your off hand with Alt; Shift uses a Heavy Weightstone for blunt weapons.",
        "category": "General",
        "code": "#showtooltip /use [mod:shift] Heavy Weightstone; Heavy Sharpening Stone /use [mod:alt] 17; 16 /click StaticPopup1Button1"
      },
      {
        "id": "rogue-macro-10",
        "title": "Stealth out of combat, Vanish in it",
        "desc": "Out of combat this puts you in Stealth; in combat it stops your swings and Vanishes so the next auto attack doesn't pull you out.",
        "category": "General",
        "code": "#showtooltip [nocombat] Stealth; Vanish /stopattack [combat] /cast [nocombat] !Stealth; Vanish"
      },
      {
        "id": "rogue-macro-11",
        "title": "Rupture and auto attack",
        "desc": "Rupture your target and keep auto attack swinging.",
        "category": "General",
        "code": "#showtooltip Rupture /startattack /cast Rupture"
      },
      {
        "id": "rogue-macro-12",
        "title": "Mutilate and auto attack",
        "desc": "Mutilate and keep auto attack going in the same press.",
        "category": "General",
        "code": "#showtooltip Mutilate /startattack /cast Mutilate"
      },
      {
        "id": "rogue-macro-13",
        "title": "One key for your finishers",
        "desc": "Spend combo points on Eviscerate; the modifiers switch to Rupture or Expose Armor. Coordinate Expose Armor with the Warrior; Blizzard confirms Sunder Armor can still be used under stronger Expose Armor.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Rupture; [mod:ctrl] Expose Armor; Eviscerate /startattack /cast [mod:shift] Rupture; [mod:ctrl] Expose Armor; Eviscerate"
      },
      {
        "id": "rogue-macro-14",
        "title": "Slice and Dice, or Venom with Shift",
        "desc": "Keep both upkeep finishers on one key: Slice and Dice on a plain press, Venom with Shift.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Venom; Slice and Dice /cast [mod:shift] Venom; Slice and Dice"
      },
      {
        "id": "rogue-macro-15",
        "title": "Cold Blood into Eviscerate or Mutilate",
        "desc": "Pop Cold Blood and strike in the same press; Cold Blood now covers Mutilate as well as Eviscerate.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Mutilate; Eviscerate /cast Cold Blood /cast [mod:shift] Mutilate; Eviscerate"
      },
      {
        "id": "rogue-macro-16",
        "title": "Ambush from Stealth, then Mutilate",
        "desc": "Ambush while you're hidden and Mutilate once the fight is on; Shift swaps Mutilate for Backstab.",
        "category": "General",
        "code": "#showtooltip [stealth] Ambush; [mod:shift] Backstab; Mutilate /cast [stealth] Ambush; [mod:shift] Backstab; Mutilate /startattack [nostealth]"
      },
      {
        "id": "rogue-macro-17",
        "title": "Sinister Strike, or Backstab with Shift",
        "desc": "Build combo points with Sinister Strike, and hold Shift for Backstab when you're behind the target with a dagger in hand.",
        "category": "Combat & Rotations",
        "code": "#showtooltip [mod:shift] Backstab; Sinister Strike /startattack /cast [mod:shift] Backstab; Sinister Strike"
      },
      {
        "id": "rogue-macro-18",
        "title": "Garrote from Stealth, Rupture in the fight",
        "desc": "Garrote while you're hidden; once the fight is on, the same key is Rupture with auto attack.",
        "category": "General",
        "code": "#showtooltip [stealth] Garrote; Rupture /cast [stealth] Garrote; Rupture /startattack [nostealth]"
      },
      {
        "id": "rogue-macro-19",
        "title": "Three Mutilates, then Eviscerate",
        "desc": "Press repeatedly: three Mutilates for a full set of points, then Eviscerate, then it starts over.",
        "category": "General",
        "code": "#showtooltip Mutilate /startattack /castsequence reset=8/target Mutilate, Mutilate, Mutilate, Eviscerate"
      },
      {
        "id": "rogue-macro-20",
        "title": "Mutilate, then Slice and Dice to start a long fight",
        "desc": "Mutilate for two points and Slice and Dice on the next press; after that, go back to your normal keys.",
        "category": "General",
        "code": "#showtooltip Mutilate /startattack /castsequence reset=8/target Mutilate, Slice and Dice"
      },
      {
        "id": "rogue-macro-21",
        "title": "Riposte, then Sinister Strike",
        "desc": "Riposte when a parry lights it, with Sinister Strike in the same press since the beta data has Riposte off the global cooldown; otherwise plain Sinister Strike.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Sinister Strike /startattack /cast Riposte /cast Sinister Strike"
      },
      {
        "id": "rogue-macro-22",
        "title": "Blade Flurry, Shift to cancel it",
        "desc": "Start Blade Flurry and auto attack, or hold Shift to drop the buff when the extra strikes could hit a Sapped enemy.",
        "category": "General",
        "code": "#showtooltip Blade Flurry /cancelaura [mod:shift] Blade Flurry /startattack [nomod] /cast [nomod] Blade Flurry"
      },
      {
        "id": "rogue-macro-23",
        "title": "Trinkets, Adrenaline Rush, then Blade Flurry",
        "desc": "The first press uses your trinkets and Adrenaline Rush; press again within 20 seconds to add Blade Flurry.",
        "category": "General",
        "code": "#showtooltip Adrenaline Rush /use 13 /use 14 /castsequence reset=20 Adrenaline Rush, Blade Flurry"
      },
      {
        "id": "rogue-macro-24",
        "title": "Your core attacks on one key",
        "desc": "Auto attack and Sinister Strike on a plain press, with the modifiers switching to your finishers and Feint.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Slice and Dice; [mod:ctrl] Eviscerate; [mod:alt] Feint; Sinister Strike /startattack /cast [mod:shift] Slice and Dice; [mod:ctrl] Eviscerate; [mod:alt] Feint; Sinister Strike"
      },
      {
        "id": "rogue-macro-25",
        "title": "Garrote from Stealth, Sinister Strike after",
        "desc": "Open with Garrote while you're hidden; from then on the same key is Sinister Strike with auto attack.",
        "category": "Combat & Rotations",
        "code": "#showtooltip [stealth] Garrote; Sinister Strike /cast [stealth] Garrote; Sinister Strike /startattack [nostealth]"
      },
      {
        "id": "rogue-macro-26",
        "title": "Backstab when you can, Sinister Strike when you can't",
        "desc": "Backstab whenever you're behind the target with a dagger in hand; otherwise, or if you're short of its 60 Energy, the press is Sinister Strike.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Backstab /startattack [nostealth] /cast Backstab /cast Sinister Strike"
      },
      {
        "id": "rogue-macro-27",
        "title": "Two Sinister Strikes, then Slice and Dice",
        "desc": "Start a long fight by pressing this three times: two Sinister Strikes, then Slice and Dice.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Slice and Dice /startattack /castsequence reset=8/target Sinister Strike, Sinister Strike, Slice and Dice"
      },
      {
        "id": "rogue-macro-28",
        "title": "Five Sinister Strikes, then Eviscerate",
        "desc": "Press repeatedly on a mob you want dead fast: five Sinister Strikes, then Eviscerate, then it starts over.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Sinister Strike /startattack /castsequence reset=8/target Sinister Strike, Sinister Strike, Sinister Strike, Sinister Strike, Sinister Strike, Eviscerate"
      },
      {
        "id": "rogue-macro-29",
        "title": "Slice and Dice, with a Frenzy Potion on Shift",
        "desc": "Slice and Dice on a plain press; hold Shift to drink a Lesser Frenzy Potion first before a hard fight.",
        "category": "General",
        "code": "#showtooltip Slice and Dice /use [mod:shift] Lesser Frenzy Potion /cast Slice and Dice"
      },
      {
        "id": "rogue-macro-30",
        "title": "Equip your weapons for Sinister Strike",
        "desc": "Replace both weapon names with yours. Swap back from your opening dagger to your chosen main hand and off hand, then Sinister Strike. Press again after the swap's global cooldown if needed.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Sinister Strike /equipslot 16 Main-Hand Name /equipslot 17 Off-Hand Name /startattack /cast Sinister Strike"
      },
      {
        "id": "rogue-macro-31",
        "title": "Hemorrhage and auto attack",
        "desc": "Hemorrhage and keep swinging; in Forever it boosts your own Rupture instead of adding Physical damage.",
        "category": "General",
        "code": "#showtooltip Hemorrhage /startattack /cast Hemorrhage"
      },
      {
        "id": "rogue-macro-32",
        "title": "Cheap Shot from Stealth",
        "desc": "Press once to enter Stealth and again to Cheap Shot your target.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Cheap Shot /cast [nostealth] Stealth; Cheap Shot"
      },
      {
        "id": "rogue-macro-33",
        "title": "Ambush when Cutthroat allows it, else Backstab",
        "desc": "Ambush from Stealth, or in the open right after a Cutthroat proc; every other press is a Backstab.",
        "category": "General",
        "code": "#showtooltip Ambush /cast Ambush /cast Backstab /startattack [nostealth]"
      },
      {
        "id": "rogue-macro-34",
        "title": "Premeditation, Cheap Shot, then Kidney Shot",
        "desc": "From Stealth this adds Premeditation's two points and Cheap Shot; press again once you're in the fight for Kidney Shot.",
        "category": "Combat & Rotations",
        "code": "#showtooltip [stealth] Cheap Shot; Kidney Shot /cast [stealth] Premeditation /cast [stealth] Cheap Shot; Kidney Shot"
      },
      {
        "id": "rogue-macro-35",
        "title": "Target and Sap the nearest enemy",
        "desc": "Stops your swings, picks the nearest enemy if you have no hostile target and Saps it; press again once you're in range.",
        "category": "General",
        "code": "#showtooltip Sap /stopattack /targetenemy [noharm][dead] /cast [harm,nodead] Sap"
      },
      {
        "id": "rogue-macro-36",
        "title": "Ghostly Strike when ready, else Backstab",
        "desc": "Ghostly Strike every time it comes off its 20 second cooldown and Backstab in between.",
        "category": "Combat & Rotations",
        "code": "#showtooltip Ghostly Strike /startattack [nostealth] /cast Ghostly Strike /cast Backstab"
      },
      {
        "id": "rogue-macro-37",
        "title": "Hemorrhage, Rupture and Backstab on one key",
        "desc": "One key for the Rupture loop: Hemorrhage on a plain press, Rupture with Shift and Backstab with Ctrl.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Rupture; [mod:ctrl] Backstab; Hemorrhage /startattack /cast [mod:shift] Rupture; [mod:ctrl] Backstab; Hemorrhage"
      },
      {
        "id": "rogue-macro-38",
        "title": "Burn your escapes, then Preparation",
        "desc": "Evasion and Sprint go off and Preparation resets them; hold Shift to Vanish and stop swinging instead of Evasion.",
        "category": "General",
        "code": "#showtooltip Preparation /stopattack [mod:shift] /cast [mod:shift] Vanish; Evasion /cast Sprint /cast Preparation"
      },
      {
        "id": "rogue-macro-39",
        "title": "Pick Pocket, then Sap from Stealth",
        "desc": "Pick the pocket of the enemy under your cursor (or your target) and Sap it in the same press.",
        "category": "General",
        "code": "#showtooltip Sap /cast [stealth,@mouseover,harm,nodead][stealth] Pick Pocket /cast [@mouseover,harm,nodead][] Sap"
      },
      {
        "id": "rogue-macro-40",
        "title": "Equip a dagger for Ambush or Backstab",
        "desc": "Replace both weapon names with yours. Equip the dagger for Ambush, or Backstab with Shift. A combat weapon swap may need another press after the global cooldown.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Backstab; Ambush /equipslot 16 Dagger Name /equipslot 17 Off-Hand Name /cast [mod:shift] Backstab; Ambush /startattack [nostealth]"
      },
      {
        "id": "rogue-macro-41",
        "title": "Kick or Gouge on target or mouseover",
        "desc": "Kick your target on a plain press; Shift moves it to your mouseover, and Ctrl or Alt swap in Gouge.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip [mod:ctrl] Gouge; Kick /cast [mod:shift,@mouseover,harm,nodead] Kick; [mod:alt,@mouseover,harm,nodead] Gouge; [mod:ctrl] Gouge; Kick"
      },
      {
        "id": "rogue-macro-42",
        "title": "Kick, then Gouge while Kick recharges",
        "desc": "Kick on the first press and Gouge on the next while Kick is still on cooldown, against your mouseover or your target.",
        "category": "General",
        "code": "#showtooltip Kick /cast [@mouseover,harm,nodead][] Kick /cast [@mouseover,harm,nodead][] Gouge"
      },
      {
        "id": "rogue-macro-43",
        "title": "Cheap Shot from Stealth, Kidney Shot in the fight",
        "desc": "Open with Cheap Shot while hidden and use Kidney Shot once the fight is on; Shift aims either one at your mouseover.",
        "category": "Combat & Rotations",
        "code": "#showtooltip [stealth] Cheap Shot; Kidney Shot /cast [stealth,mod:shift,@mouseover,harm,nodead] Cheap Shot; [stealth] Cheap Shot; [mod:shift,@mouseover,harm,nodead] Kidney Shot; Kidney Shot"
      },
      {
        "id": "rogue-macro-44",
        "title": "Blind and Sap on target or mouseover",
        "desc": "Blind your target, with Shift for your mouseover; Ctrl and Alt Sap the mouseover or the target instead.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Blind /cast [mod:shift,@mouseover,harm,nodead] Blind; [mod:ctrl,@mouseover,harm,nodead] Sap; [mod:alt] Sap; Blind"
      },
      {
        "id": "rogue-macro-45",
        "title": "Vanish and Sprint away",
        "desc": "Stop swinging, Vanish and Sprint to break contact; Shift is Sprint alone and Ctrl is Evasion alone.",
        "category": "General",
        "code": "#showtooltip Vanish /stopattack [nomod] /cast [nomod] Vanish /cast [nomod] Sprint /cast [mod:shift] Sprint; [mod:ctrl] Evasion"
      },
      {
        "id": "rogue-macro-46",
        "title": "Dismount, Stealth and Sprint",
        "desc": "Get off your mount, slip into Stealth and Sprint in one press to close the gap while hidden.",
        "category": "General",
        "code": "#showtooltip Sprint /dismount /cast [nostealth] Stealth /cast Sprint"
      },
      {
        "id": "rogue-macro-47",
        "title": "Racial break, or a trinket with Shift or Ctrl",
        "desc": "Press for the racial that shakes off an effect for your race; Shift and Ctrl use the top and bottom trinkets.",
        "category": "General",
        "code": "#showtooltip /cast [nomod] Will to Survive /cast [nomod] Will of the Forsaken /cast [nomod] Escape Artist /cast [nomod] Stoneform /use [mod:shift] 13; [mod:ctrl] 14"
      },
      {
        "id": "rogue-macro-48",
        "title": "Burst window: trinkets, Cold Blood and racial",
        "desc": "Fire both trinkets, Cold Blood and your Orc or Troll racial together, then follow with your biggest attack.",
        "category": "General",
        "code": "#showtooltip /use 13 /use 14 /cast Cold Blood /cast Blood Fury /cast Berserking"
      },
      {
        "id": "rogue-macro-49",
        "title": "Free Action Potion and Sprint",
        "desc": "Drink a Free Action Potion and Sprint before you're caught; Shift drinks a Swiftness Potion on its own instead.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Swiftness Potion; Free Action Potion /use [mod:shift] Swiftness Potion; Free Action Potion /cast [nomod] Sprint"
      },
      {
        "id": "rogue-macro-50",
        "title": "Throw at your target or mouseover",
        "desc": "Throw a weapon at your target, or at whoever is under your cursor with Shift.",
        "category": "Mouseover & Healing",
        "code": "#showtooltip Throw /cast [mod:shift,@mouseover,harm,nodead] Throw; Throw"
      },
      {
        "id": "rogue-macro-51",
        "title": "Cold Blood into Ambush or Backstab",
        "desc": "Cold Blood, then Ambush from Stealth for a 100% crit chance opener; hold Shift for Backstab when you're already visible.",
        "category": "General",
        "code": "#showtooltip [mod:shift] Backstab; Ambush /cast Cold Blood /cast [mod:shift] Backstab; Ambush"
      },
      {
        "id": "rogue-macro-52",
        "title": "Poisons for fighting players",
        "desc": "Crippling Poison on a plain press, Wound Poison with Shift for healers and Mind-numbing Poison with Ctrl for casters; Alt picks the off hand.",
        "category": "General",
        "code": "#showtooltip /use [mod:shift] Wound Poison; [mod:ctrl] Mind-numbing Poison; Crippling Poison /use [mod:alt] 17; 16 /click StaticPopup1Button1"
      }
    ]
  },
  "weapons": {
    "warrior": {
      "classId": "warrior",
      "tracks": [
        {
          "id": "primary",
          "name": "Two-Handed Path (Arms / Fury)"
        }
      ],
      "levels": [
        {
          "levelBracket": "1–2",
          "itemId": 2488,
          "name": "Battered Battle Axe",
          "icon": "inv_axe_05",
          "weaponType": "Two-Handed Axe",
          "speed": "2.70",
          "dps": "4.4 DPS",
          "source": {
            "kind": "vendor",
            "title": "Starting Zone Vendor",
            "detail": "Purchasable white 2H axe for early levels."
          },
          "alts": [
            {
              "name": "Club",
              "itemId": 2130,
              "value": "1.8 DPS - Starter vendor mace",
              "faction": "both",
              "dps": "1.8 DPS",
              "quality": "q1",
              "iLvl": 6,
              "reqLevel": 1,
              "stats": "",
              "icon": "inv_axe_10",
              "weaponType": "One-Handed Mace"
            },
            {
              "name": "Worn Shortsword",
              "itemId": 25,
              "value": "1.7 DPS - Starter 1H sword",
              "faction": "both",
              "dps": "1.7 DPS",
              "quality": "q2",
              "iLvl": 6,
              "reqLevel": 1,
              "stats": "",
              "icon": "inv_sword_04",
              "weaponType": "One-Handed Sword"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 3,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "3–4",
          "itemId": 2493,
          "name": "Wooden Mallet",
          "icon": "inv_hammer_16",
          "weaponType": "Two-handed mace",
          "speed": "2.60",
          "dps": "5.0 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Sold in starter hub towns (Kharanos, Goldshire, Razor Hill)"
          },
          "alts": [
            {
              "name": "Large Club",
              "itemId": 2480,
              "value": "3.8 DPS - Early vendor 2H mace",
              "faction": "both",
              "dps": "2.78 DPS",
              "speed": "1.80",
              "weaponType": "One-handed mace",
              "quality": "q1",
              "iLvl": 7,
              "reqLevel": 2,
              "stats": "",
              "icon": "inv_torch_unlit"
            },
            {
              "name": "Copper Axe",
              "itemId": 2845,
              "value": "3.8 DPS - Crafted Blacksmithing (skill 20)",
              "faction": "both",
              "dps": "3.75 DPS",
              "speed": "2.40",
              "weaponType": "One-handed axe",
              "quality": "q1",
              "iLvl": 9,
              "reqLevel": 4,
              "stats": "",
              "icon": "inv_axe_23"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 9,
          "reqLevel": 4,
          "stats": ""
        },
        {
          "levelBracket": "5–6",
          "itemId": 7955,
          "name": "Copper Claymore",
          "icon": "inv_sword_21",
          "weaponType": "Two-handed sword",
          "speed": "3.30",
          "dps": "7.7 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (25)",
            "detail": "Crafted or bought cheaply on the Auction House"
          },
          "alts": [
            {
              "name": "Copper Battle Axe",
              "itemId": 3488,
              "value": "9.0 DPS, 3.50s - Crafted Blacksmithing (30)",
              "faction": "both",
              "dps": "9 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed axe",
              "quality": "q2",
              "iLvl": 13,
              "reqLevel": 8,
              "stats": "",
              "icon": "inv_throwingaxe_02"
            },
            {
              "name": "Rough Boomstick",
              "itemId": 4362,
              "value": "4.1 DPS - Engineering ranged pulling gun",
              "faction": "both",
              "dps": "4.13 DPS",
              "speed": "2.30",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 10,
              "reqLevel": 5,
              "stats": "+1 Stamina",
              "icon": "inv_weapon_rifle_02"
            },
            {
              "name": "Goblin Smasher",
              "itemId": 4964,
              "value": "8.2 DPS, 3.10s - Mulgore Quest: Supervisor Fizsprocket",
              "faction": "horde",
              "dps": "8.23 DPS",
              "speed": "3.10",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 5,
              "stats": "",
              "icon": "inv_hammer_15"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 11,
          "reqLevel": 6,
          "stats": "+1 Strength, +1 Stamina"
        },
        {
          "levelBracket": "7–8",
          "itemId": 248005,
          "name": "Northshire Hammer",
          "icon": "inv_hammer_16",
          "weaponType": "Two-handed mace",
          "speed": "2.70",
          "dps": "8.3 DPS",
          "source": {
            "kind": "quest",
            "title": "Rare Books / Kobold Camp",
            "detail": "Early quest in Elwynn Forest / Dun Morogh"
          },
          "alts": [
            {
              "name": "Battleguard Captain's Sticker",
              "itemId": 284286,
              "value": "8.92 DPS, 3.70s - Captain Flat Tusk in Barrens (+3 Str)",
              "faction": "both",
              "dps": "8.92 DPS",
              "speed": "3.70",
              "weaponType": "Two-Handed Axe",
              "quality": "q2",
              "iLvl": 13,
              "reqLevel": 8,
              "stats": "+3 Strength",
              "icon": "inv_axe_04"
            },
            {
              "name": "Copper Battle Axe",
              "itemId": 3488,
              "value": "9.0 DPS, 3.50s - Heavy burst swing",
              "faction": "both",
              "dps": "9 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed axe",
              "quality": "q2",
              "iLvl": 13,
              "reqLevel": 8,
              "stats": "",
              "icon": "inv_throwingaxe_02"
            },
            {
              "name": "Staff of the Dor'Danil",
              "itemId": 15396,
              "value": "8.5 DPS - Teldrassil quest reward",
              "faction": "alliance",
              "dps": "8.5 DPS",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 6,
              "stats": "",
              "icon": "inv_staff_08"
            },
            {
              "name": "Riptear's Cleaver",
              "itemId": 286742,
              "value": "8.9 DPS, 3.30s - Durotar Quest: Rear Guard Patrol",
              "faction": "horde",
              "dps": "8.94 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed axe",
              "quality": "q2",
              "iLvl": 13,
              "reqLevel": 6,
              "stats": "",
              "icon": "inv_throwingaxe_02"
            },
            {
              "name": "Bonecracker",
              "itemId": 3440,
              "value": "9.1 DPS, 3.20s - Tirisfal Quest: The Family Crypt",
              "faction": "horde",
              "dps": "9.06 DPS",
              "speed": "3.20",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 13,
              "reqLevel": 7,
              "stats": "",
              "icon": "inv_mace_04"
            },
            {
              "name": "Helm Splitter",
              "itemId": 286755,
              "value": "6.88 DPS, 2.40s - 1H Sword (+1 Str)",
              "faction": "both",
              "dps": "6.88 DPS",
              "speed": "2.40",
              "weaponType": "One-Handed Sword",
              "quality": "q2",
              "iLvl": 13,
              "reqLevel": 8,
              "stats": "+1 Strength",
              "icon": "inv_sword_04"
            }
          ],
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 12,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "9–10",
          "itemId": 1197,
          "name": "Giant Mace",
          "icon": "inv_mace_02",
          "weaponType": "Two-handed mace",
          "speed": "3.50",
          "dps": "9.0 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Sold in Redridge, Loch Modan, Crossroads, and Auberdine"
          },
          "alts": [
            {
              "name": "Ironforge Greathammer",
              "itemId": 279895,
              "value": "15.97 DPS, 3.10s - Old Ironforge Incursion quest (Alliance)",
              "faction": "alliance",
              "dps": "15.97 DPS",
              "speed": "3.10",
              "weaponType": "Two-Handed Mace",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "",
              "icon": "inv_hammer_21"
            },
            {
              "name": "Hammerbone",
              "itemId": 270018,
              "value": "20.44 DPS, 3.40s - Leaders of the Fang quest in Wailing Caverns (Horde)",
              "faction": "horde",
              "dps": "20.44 DPS",
              "speed": "3.40",
              "weaponType": "Two-Handed Mace",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 10,
              "stats": "+7 Strength, +10 Spirit",
              "icon": "inv_hammer_15"
            },
            {
              "name": "Trogg Scepter",
              "itemId": 272996,
              "value": "8.1 DPS, 2.40s - Ragefire Chasm: Oggleflint",
              "faction": "both",
              "dps": "8.13 DPS",
              "speed": "2.40",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 18,
              "stats": "+4 Spirit, Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tMace",
                "13 - 26 Damage\tSpeed 2.40",
                "(8.1 damage per second)",
                "+4 Spirit",
                "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
                "Requires Level 13"
              ],
              "reqLevel": 13,
              "icon": "inv_misc_bone_10"
            },
            {
              "name": "Thick War Axe",
              "itemId": 3489,
              "value": "8.6 DPS - 1H Axe from Blacksmithing (45)",
              "faction": "both",
              "dps": "8.6 DPS",
              "speed": "2.50",
              "weaponType": "One-handed axe",
              "quality": "q2",
              "iLvl": 17,
              "reqLevel": 12,
              "stats": "",
              "icon": "inv_throwingaxe_01"
            },
            {
              "name": "Thun'grim's Axe",
              "itemId": 7326,
              "value": "7.8 DPS, 2.70s - Horde Warrior Quest: Forged Steel",
              "faction": "horde",
              "dps": "7.78 DPS",
              "speed": "2.70",
              "weaponType": "One-handed axe",
              "quality": "q2",
              "iLvl": 15,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_axe_01"
            },
            {
              "name": "Thun'grim's Sword",
              "itemId": 7329,
              "value": "7.8 DPS, 2.60s - Horde Warrior Quest: Forged Steel",
              "faction": "horde",
              "dps": "7.8 DPS",
              "speed": "2.60",
              "quality": "q2",
              "iLvl": 14,
              "reqLevel": 8,
              "stats": "",
              "icon": "inv_sword_04",
              "weaponType": "One-Handed Sword"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 15,
          "reqLevel": 10,
          "stats": ""
        },
        {
          "levelBracket": "11–12",
          "itemId": 6214,
          "name": "Heavy Copper Maul",
          "icon": "inv_hammer_18",
          "weaponType": "Two-handed mace",
          "speed": "3.30",
          "dps": "10.8 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (40)",
            "detail": "Guaranteed crafted spike, trainer taught at 40"
          },
          "alts": [
            {
              "name": "Woodchopper",
              "itemId": 2520,
              "value": "10.5 DPS - Vendor 2H Axe",
              "faction": "both",
              "dps": "10.5 DPS",
              "quality": "q2",
              "iLvl": 16,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_axe_02"
            },
            {
              "name": "Trogg Scepter",
              "itemId": 272996,
              "value": "8.1 DPS - RFC: Oggleflint",
              "faction": "both",
              "dps": "8.13 DPS",
              "speed": "2.40",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 18,
              "stats": "+4 Spirit, Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tMace",
                "13 - 26 Damage\tSpeed 2.40",
                "(8.1 damage per second)",
                "+4 Spirit",
                "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
                "Requires Level 13"
              ],
              "reqLevel": 13,
              "icon": "inv_misc_bone_10"
            },
            {
              "name": "Axe of Orgrimmar",
              "itemId": 15424,
              "value": "16.1 DPS, 3.30s, +6 Sta, +6 Spi - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "16.06 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed axe",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Sta, +6 Spi",
              "icon": "inv_axe_06"
            },
            {
              "name": "Ironforge Greathammer",
              "itemId": 279895,
              "weaponType": "Two-handed mace",
              "speed": "3.30",
              "dps": "16.0 DPS",
              "value": "16.0 DPS, 3.30s - Ironforge Quest",
              "faction": "alliance",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "",
              "icon": "inv_hammer_21"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 16,
          "reqLevel": 11,
          "stats": "+4 Strength"
        },
        {
          "levelBracket": "13–14",
          "itemId": 279895,
          "name": "Ironforge Greathammer",
          "icon": "inv_hammer_21",
          "weaponType": "Two-handed mace",
          "speed": "3.10",
          "dps": "16.0 DPS",
          "source": {
            "kind": "quest",
            "title": "Old Ironforge Incursion",
            "detail": "Dungeon quest, The Hall of Thanes, level 16"
          },
          "alts": [
            {
              "name": "Durgen's Crescent Axe",
              "itemId": 270256,
              "value": "15.5 DPS, 2.40s, +5 Str, +2 Sta - Hall of Thanes: Durgen",
              "faction": "both",
              "dps": "12.29 DPS",
              "speed": "2.40",
              "weaponType": "One-handed axe",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "+5 Str, +2 Sta",
              "icon": "inv_axe_05"
            },
            {
              "name": "Heavy Copper Broadsword",
              "itemId": 3487,
              "value": "12.6 DPS - Crafted Blacksmithing (skill 65)",
              "faction": "both",
              "dps": "12.58 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed sword",
              "quality": "q2",
              "iLvl": 19,
              "reqLevel": 14,
              "stats": "",
              "icon": "inv_sword_14"
            },
            {
              "name": "Axe of Orgrimmar",
              "itemId": 15424,
              "value": "16.1 DPS, 3.30s, +6 Sta, +6 Spi - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "16.06 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed axe",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Sta, +6 Spi",
              "icon": "inv_axe_06"
            },
            {
              "name": "Bone Knuckles",
              "itemId": 272998,
              "weaponType": "Fist Weapon",
              "speed": "2.00",
              "dps": "12.3 DPS",
              "value": "12.3 DPS, 2.00s - RFC Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "",
              "icon": "ability_whirlwind"
            }
          ],
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 18,
          "reqLevel": 9,
          "stats": ""
        },
        {
          "levelBracket": "15–16",
          "itemId": 5187,
          "name": "Rhahk'Zor's Hammer",
          "icon": "inv_hammer_04",
          "weaponType": "Two-handed mace",
          "speed": "3.20",
          "dps": "18.4 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Rhahk'Zor",
            "detail": "First boss in The Deadmines, levels 18–23"
          },
          "alts": [
            {
              "name": "Monstrous Cleaver",
              "itemId": 279864,
              "value": "15.2 DPS, 3.30s - Dalaran Dungeon",
              "faction": "both",
              "dps": "15.2 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed sword",
              "quality": "q2",
              "iLvl": 23,
              "reqLevel": 16,
              "stats": "",
              "icon": "inv_sword_23"
            },
            {
              "name": "Meathook Slicer",
              "itemId": 271204,
              "value": "13.2 DPS - Ruins of Lordaeron: The Baron",
              "faction": "both",
              "dps": "13.61 DPS",
              "speed": "1.80",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 20,
              "reqLevel": 15,
              "stats": "",
              "icon": "inv_weapon_shortblade_02"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 21,
          "reqLevel": 16,
          "stats": "+8 Stamina, +8 Spell Power"
        },
        {
          "levelBracket": "17–18",
          "itemId": 271217,
          "name": "Corpse Chopper",
          "icon": "inv_axe_09",
          "weaponType": "Two-handed axe",
          "speed": "3.20",
          "dps": "17.4 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Bjork",
            "detail": "Ruins of Lordaeron, levels 15–20 (+7 Str, +4 Sta)"
          },
          "alts": [
            {
              "name": "Smite's Mighty Hammer",
              "itemId": 7230,
              "value": "19.7 DPS, 3.50s - The Deadmines: Mr. Smite",
              "faction": "both",
              "dps": "19.71 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 23,
              "reqLevel": 18,
              "stats": "",
              "icon": "inv_hammer_09"
            },
            {
              "name": "Haunting Blade",
              "itemId": 6641,
              "value": "18.2 DPS, 3.00s, +6 Str, +5 Sta - Ruins of Lordaeron: Captain",
              "faction": "both",
              "dps": "22.37 DPS",
              "speed": "3.80",
              "weaponType": "Two-handed sword",
              "quality": "q3",
              "iLvl": 27,
              "stats": "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tSword",
                "68 - 102 Damage\tSpeed 3.80",
                "(22.4 damage per second)",
                "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
                "Requires Level 22"
              ],
              "reqLevel": 22,
              "icon": "inv_sword_27"
            },
            {
              "name": "Vileblood Scimitar",
              "itemId": 271218,
              "value": "15.0 DPS, 2.20s - Ruins of Lordaeron: Viktor the Vile",
              "faction": "both",
              "dps": "14.62 DPS",
              "speed": "2.60",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 22,
              "reqLevel": 17,
              "stats": "",
              "icon": "inv_sword_01"
            },
            {
              "name": "Sword of the Fallen",
              "itemId": 286977,
              "weaponType": "Two-handed sword",
              "speed": "3.50",
              "dps": "19.7 DPS",
              "value": "19.7 DPS, 3.50s - Rare Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 23,
              "reqLevel": 18,
              "stats": "",
              "icon": "inv_sword_14"
            },
            {
              "name": "Cruel Barb",
              "itemId": 5191,
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 19,
              "dps": "15.4 DPS",
              "speed": "2.80",
              "stats": "+12 Attack Power",
              "icon": "inv_sword_18",
              "value": "The Deadmines — Edwin VanCleef (Top 1H / DW Leveling Weapon)"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 21,
          "reqLevel": 16,
          "stats": "+7 Str, +4 Sta"
        },
        {
          "levelBracket": "19–20",
          "itemId": 251533,
          "name": "Forsaken Greataxe",
          "icon": "inv_axe_24",
          "weaponType": "Two-handed axe",
          "speed": "3.40",
          "dps": "20.5 DPS",
          "source": {
            "kind": "quest",
            "title": "The Wrath of Rath'mael",
            "detail": "Ruins of Lordaeron dungeon quest (+8 Str, +5 Sta)"
          },
          "alts": [
            {
              "name": "Bronze Warhammer",
              "itemId": 7956,
              "value": "17.4 DPS - Blacksmithing (90)",
              "faction": "both",
              "dps": "16.86 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+6 Strength, +6 Stamina",
              "icon": "inv_hammer_18"
            },
            {
              "name": "Taskmaster Axe",
              "itemId": 5194,
              "value": "17.3 DPS, 2.70s - The Deadmines: Sneed",
              "faction": "both",
              "dps": "14.63 DPS",
              "speed": "2.70",
              "weaponType": "Two-handed axe",
              "quality": "q3",
              "iLvl": 23,
              "stats": "+8 Stamina, +8 Spirit, Equip: Increases healing done by up to 45 and damage done by up to 15 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tAxe",
                "31 - 48 Damage\tSpeed 2.70",
                "(14.6 damage per second)",
                "+8 Stamina",
                "+8 Spirit",
                "Equip: Increases healing done by up to 45 and damage done by up to 15 for all magical spells and effects.",
                "Requires Level 18"
              ],
              "reqLevel": 18,
              "icon": "inv_throwingaxe_06"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 24,
          "reqLevel": 15,
          "stats": "+8 Str, +5 Sta"
        },
        {
          "levelBracket": "21–22",
          "itemId": 6905,
          "name": "Reef Axe",
          "icon": "inv_weapon_halberd_06",
          "weaponType": "Two-handed axe",
          "speed": "3.30",
          "dps": "22.4 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Gelihast",
            "detail": "Blackfathom Deeps, levels 20–27 (+10 Str, +4 Agi)"
          },
          "alts": [
            {
              "name": "Wolfsbane",
              "itemId": 267369,
              "value": "25.59 DPS, 3.40s - Old Fire-Eye in Hillsbrad (Horde)",
              "faction": "horde",
              "dps": "25.59 DPS",
              "speed": "3.40",
              "weaponType": "Two-Handed Sword",
              "quality": "q3",
              "iLvl": 31,
              "reqLevel": 20,
              "stats": "+9 Stamina, +10 Intellect",
              "icon": "inv_sword_25"
            },
            {
              "name": "The Skyblade",
              "itemId": 286540,
              "value": "22.36 DPS, 3.60s (56-105 dmg) (+10 Str, +8 Sta) - Rare 2H Sword",
              "faction": "both",
              "dps": "22.36 DPS",
              "speed": "3.60",
              "weaponType": "Two-Handed Sword",
              "quality": "q3",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "+10 Strength, +8 Stamina",
              "icon": "inv_sword_20"
            },
            {
              "name": "Strike of the Hydra",
              "itemId": 6909,
              "value": "25.6 DPS, 3.30s - BFD: Aku'mai",
              "faction": "both",
              "dps": "25.61 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed sword",
              "quality": "q3",
              "iLvl": 31,
              "reqLevel": 26,
              "stats": "",
              "icon": "inv_sword_42"
            },
            {
              "name": "Taurenbane's Family Cleaver",
              "itemId": 285328,
              "value": "22.9 DPS, 3.40s, +9 Sta, +32 AP - Barrens Rare: Hagg Taurenbane",
              "faction": "both",
              "dps": "22.94 DPS",
              "speed": "3.40",
              "weaponType": "Two-handed axe",
              "quality": "q3",
              "iLvl": 28,
              "stats": "+9 Stamina, Equip: +32 Attack Power against Humanoids.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tAxe",
                "62 - 94 Damage\tSpeed 3.40",
                "(22.9 damage per second)",
                "+9 Stamina",
                "Equip: +32 Attack Power against Humanoids.",
                "Requires Level 23"
              ],
              "reqLevel": 23,
              "icon": "inv_axe_04"
            },
            {
              "name": "Bronze Battle Axe",
              "itemId": 7958,
              "value": "18.8 DPS - Crafted Blacksmithing (105)",
              "faction": "both",
              "dps": "18.33 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed axe",
              "quality": "q2",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "+10 Strength",
              "icon": "inv_axe_21"
            },
            {
              "name": "Alliance Outrunner's Sword",
              "itemId": 285346,
              "weaponType": "One-handed sword",
              "speed": "2.10",
              "dps": "17.1 DPS",
              "value": "17.1 DPS, 2.10s - Alliance Outrunner Drop",
              "faction": "alliance",
              "quality": "q3",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "",
              "icon": "inv_sword_20"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 27,
          "reqLevel": 22,
          "stats": "+10 Str, +4 Agi"
        },
        {
          "levelBracket": "23–24",
          "itemId": 285328,
          "name": "Taurenbane's Family Cleaver",
          "icon": "inv_axe_04",
          "weaponType": "Two-handed axe",
          "speed": "3.40",
          "dps": "22.9 DPS",
          "source": {
            "kind": "drop",
            "title": "Hagg Taurenbane",
            "detail": "Barrens Rare Elite (+9 Sta, +32 AP vs Humanoids)"
          },
          "alts": [
            {
              "name": "Trusty Sword",
              "itemId": 281313,
              "value": "26.67 DPS, 3.30s (+12 Sta, +12 Spi) - Stopping the Cycle quest",
              "faction": "alliance",
              "dps": "26.67 DPS",
              "speed": "3.30",
              "weaponType": "Two-Handed Sword",
              "quality": "q3",
              "iLvl": 32,
              "reqLevel": 24,
              "stats": "+12 Stamina, +12 Spirit",
              "icon": "inv_sword_04"
            },
            {
              "name": "Strike of the Hydra",
              "itemId": 6909,
              "value": "25.6 DPS, 3.30s - BFD: Aku'mai",
              "faction": "both",
              "dps": "25.61 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed sword",
              "quality": "q3",
              "iLvl": 31,
              "reqLevel": 26,
              "stats": "",
              "icon": "inv_sword_42"
            },
            {
              "name": "Heavy Mithril Axe",
              "itemId": 7941,
              "value": "20.5 DPS - Blacksmithing (130)",
              "faction": "both",
              "dps": "28.82 DPS",
              "speed": "3.40",
              "weaponType": "Two-handed sword",
              "quality": "q2",
              "iLvl": 40,
              "reqLevel": 35,
              "stats": "+14 Critical Strike Rating",
              "icon": "inv_sword_05"
            },
            {
              "name": "The Skyblade",
              "itemId": 286540,
              "weaponType": "Two-handed sword",
              "speed": "3.60",
              "dps": "22.4 DPS",
              "value": "22.4 DPS, 3.60s - Ashenvale Rare",
              "faction": "both",
              "quality": "q3",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "",
              "icon": "inv_sword_20"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 28,
          "stats": "+9 Stamina, Equip: +32 Attack Power against Humanoids.",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tAxe",
            "62 - 94 Damage\tSpeed 3.40",
            "(22.9 damage per second)",
            "+9 Stamina",
            "Equip: +32 Attack Power against Humanoids.",
            "Requires Level 23"
          ],
          "reqLevel": 23
        },
        {
          "levelBracket": "25–26",
          "itemId": 271766,
          "name": "Heavehammer",
          "icon": "inv_hammer_09",
          "weaponType": "Two-handed mace",
          "speed": "3.30",
          "dps": "27.7 DPS",
          "source": {
            "kind": "quest",
            "title": "Lost Relic Carry / Elder Knowledge",
            "detail": "Excavation Site 4 dungeon quest (+60 Armor, +32 AP)"
          },
          "alts": [
            {
              "name": "Defender of Dalaran",
              "itemId": 279841,
              "value": "31.21 DPS, 3.30s - Heart of Disruption quest in City of Dalaran",
              "faction": "alliance",
              "dps": "31.21 DPS",
              "speed": "3.30",
              "weaponType": "Two-Handed Mace",
              "quality": "q3",
              "iLvl": 36,
              "reqLevel": 24,
              "stats": "+9 Strength, +13 Stamina, +9 Intellect",
              "icon": "inv_hammer_20"
            },
            {
              "name": "Trusty Sword",
              "itemId": 281313,
              "value": "26.7 DPS, 3.20s - Redridge Quest",
              "faction": "both",
              "dps": "26.7 DPS",
              "speed": "3.20",
              "weaponType": "Two-handed sword",
              "quality": "q3",
              "iLvl": 32,
              "stats": "+12 Stamina, +12 Spirit",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tSword",
                "70 - 106 Damage\tSpeed 3.30",
                "(26.7 damage per second)",
                "+12 Stamina",
                "+12 Spirit"
              ],
              "reqLevel": 24,
              "icon": "inv_sword_04"
            },
            {
              "name": "Dendweller's Hammer",
              "itemId": 284459,
              "value": "25.6 DPS, 3.30s - Level 26 Mace",
              "faction": "both",
              "dps": "25.61 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 31,
              "stats": "+12 Stamina, +100 Armor",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "67 - 102 Damage\tSpeed 3.30",
                "(25.6 damage per second)",
                "+12 Stamina",
                "+100 Armor",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_hammer_09"
            },
            {
              "name": "Solid Iron Maul",
              "itemId": 3851,
              "value": "22.8 DPS - Blacksmithing (135)",
              "faction": "both",
              "dps": "15.57 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 31,
              "stats": "+12 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 24.",
              "lines": [
                "Binds when equipped",
                "Two-Hand\tMace",
                "43 - 66 Damage\tSpeed 3.50",
                "(15.6 damage per second)",
                "+12 Stamina",
                "Equip: Increases damage and healing done by magical spells and effects by up to 24.",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_hammer_07"
            },
            {
              "name": "Ruby-Adorned Blade",
              "itemId": 277246,
              "value": "23.91 DPS, 2.30s - 1H Sword (The Eye of Bhossca quest)",
              "faction": "both",
              "dps": "23.91 DPS",
              "speed": "2.30",
              "weaponType": "One-Handed Sword",
              "quality": "q3",
              "iLvl": 36,
              "reqLevel": 25,
              "stats": "+3 Agility, +8 Stamina",
              "icon": "inv_sword_07"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 33,
          "stats": "+60 Armor, Equip: +32 Attack Power.",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tMace",
            "73 - 110 Damage\tSpeed 3.30",
            "(27.7 damage per second)",
            "+60 Armor",
            "Equip: +32 Attack Power."
          ],
          "reqLevel": 24
        },
        {
          "levelBracket": "27–28",
          "itemId": 273046,
          "name": "Guardian's Dualblade",
          "icon": "inv_throwingaxe_05",
          "weaponType": "Two-handed axe",
          "speed": "3.40",
          "dps": "24.6 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Unstable Sentinel",
            "detail": "City of Dalaran dungeon (+11 Str, +8 Sta)"
          },
          "alts": [
            {
              "name": "Felbough Arm",
              "itemId": 273037,
              "value": "28.8 DPS, 3.00s, +10 Agi, +10 Hit - City of Dalaran: Fel Ancient",
              "faction": "both",
              "dps": "28.83 DPS",
              "speed": "3.00",
              "weaponType": "Polearm",
              "quality": "q3",
              "iLvl": 34,
              "stats": "+10 Agility, +9 Nature Resistance, Equip: +10 Hit Rating",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tPolearm",
                "69 - 104 Damage\tSpeed 3.00",
                "(28.8 damage per second)",
                "+10 Agility",
                "+9 Nature Resistance",
                "Requires Level 29",
                "Equip: +10 Hit Rating",
                "Sell Price: 1g 2s 92c"
              ],
              "reqLevel": 29,
              "icon": "inv_spear_08"
            },
            {
              "name": "Defender of Dalaran",
              "itemId": 279841,
              "value": "31.2 DPS, 3.30s - City of Dalaran Quest: Heart of Disruption",
              "faction": "both",
              "dps": "31.21 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 36,
              "stats": "+9 Strength, +13 Stamina, +9 Intellect",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "82 - 124 Damage\tSpeed 3.30",
                "(31.2 damage per second)",
                "+9 Strength",
                "+13 Stamina",
                "+9 Intellect"
              ],
              "reqLevel": 24,
              "icon": "inv_hammer_20"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 33,
          "reqLevel": 28,
          "stats": "+11 Str, +8 Sta"
        },
        {
          "levelBracket": "29–30",
          "itemId": 6687,
          "name": "Corpsemaker",
          "icon": "inv_axe_11",
          "weaponType": "Two-handed axe",
          "speed": "3.80",
          "dps": "28.9 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Razorfen Kraul — Overlord Ramtusk",
            "detail": "Devastating 3.80 speed axe (+15 Strength, +8 Stamina)."
          },
          "alts": [
            {
              "name": "Whirlwind Warhammer",
              "itemId": 6976,
              "value": "35.6 DPS, 3.60s - Mace alternative from class quest",
              "faction": "both",
              "dps": "35.74 DPS",
              "speed": "3.40",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 40,
              "stats": "+16 Strength, +15 Stamina",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "97 - 146 Damage\tSpeed 3.40",
                "(35.7 damage per second)",
                "+16 Strength",
                "+15 Stamina",
                "Classes: Warrior"
              ],
              "reqLevel": 30,
              "icon": "inv_hammer_08"
            },
            {
              "name": "Whirlwind Sword",
              "itemId": 6977,
              "value": "35.6 DPS, 3.60s - Sword alternative from class quest",
              "faction": "both",
              "dps": "35.52 DPS",
              "speed": "2.90",
              "weaponType": "Two-handed sword",
              "quality": "q3",
              "iLvl": 40,
              "stats": "+16 Strength, +15 Stamina",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tSword",
                "82 - 124 Damage\tSpeed 2.90",
                "(35.5 damage per second)",
                "+16 Strength",
                "+15 Stamina",
                "Classes: Warrior"
              ],
              "reqLevel": 30,
              "icon": "inv_sword_15"
            },
            {
              "name": "Dark Hearted Hammer",
              "itemId": 270071,
              "value": "28.9 DPS, 3.80s, +12 Str, +8 Sta - STV Quest: Colonel Kurzen",
              "faction": "both",
              "dps": "28.95 DPS",
              "speed": "3.80",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 40,
              "stats": "+12 Strength, +8 Stamina",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "88 - 132 Damage\tSpeed 3.80",
                "(28.9 damage per second)",
                "+12 Strength",
                "+8 Stamina"
              ],
              "reqLevel": 30,
              "icon": "inv_hammer_16"
            },
            {
              "name": "Master Hunter's Spellsword",
              "itemId": 270085,
              "value": "32.5 DPS, 2.40s - STV Quest: Big Game Hunter",
              "faction": "both",
              "dps": "32.5 DPS",
              "speed": "2.40",
              "weaponType": "Two-handed sword",
              "quality": "q2",
              "iLvl": 43,
              "stats": "+12 Strength, Equip: Increases damage and healing done by magical spells and effects by up to 14.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tSword",
                "62 - 94 Damage\tSpeed 2.40",
                "(32.5 damage per second)",
                "+12 Strength",
                "Equip: Increases damage and healing done by magical spells and effects by up to 14."
              ],
              "reqLevel": 28,
              "icon": "inv_sword_42"
            },
            {
              "name": "Corpsemaker",
              "itemId": 6687,
              "value": "28.9 DPS, 3.80s - RFK: Overlord Ramtusk",
              "faction": "both",
              "dps": "28.95 DPS",
              "speed": "3.80",
              "weaponType": "Two-handed axe",
              "quality": "q3",
              "iLvl": 34,
              "stats": "+15 Strength, +8 Stamina",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tAxe",
                "88 - 132 Damage\tSpeed 3.80",
                "(28.9 damage per second)",
                "+15 Strength",
                "+8 Stamina",
                "Requires Level 29"
              ],
              "reqLevel": 29,
              "icon": "inv_weapon_halbard_01"
            },
            {
              "name": "Rage of the Storm",
              "itemId": 280604,
              "weaponType": "Two-handed mace",
              "speed": "3.20",
              "dps": "35.6 DPS",
              "value": "35.6 DPS, 3.20s - Custom Boss Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 40,
              "stats": "+12 Intellect, +15 Stamina, Equip: Increases the damage dealt by your Stormstrike ability by 10%.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "91 - 137 Damage\tSpeed 3.20",
                "(35.6 damage per second)",
                "+12 Intellect",
                "+15 Stamina",
                "Equip: Increases the damage dealt by your Stormstrike ability by 10%."
              ],
              "reqLevel": 30,
              "icon": "inv_mace_42"
            },
            {
              "name": "Bonebiter",
              "itemId": 6830,
              "value": "38.8 DPS, 3.40s (105–159 dmg) - In the Name of the Light quest (+10 Str, +10 Sta, +5 Agi) (Alliance)",
              "faction": "alliance",
              "dps": "38.8 DPS",
              "speed": "3.40",
              "weaponType": "Two-handed axe",
              "quality": "q3",
              "iLvl": 44,
              "reqLevel": 34,
              "stats": "+10 Strength, +10 Stamina, +5 Agility",
              "icon": "inv_axe_04",
              "source": {
                "kind": "quest",
                "title": "In the Name of the Light",
                "detail": "Scarlet Monastery dungeon quest reward for Alliance. Highest physical top-end weapon until Maraudon."
              }
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 34,
          "stats": "+15 Strength, +8 Stamina",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tAxe",
            "102 - 154 Damage\tSpeed 3.60",
            "(35.6 damage per second)",
            "+16 Strength",
            "+15 Stamina",
            "Classes: Warrior"
          ],
          "reqLevel": 29
        },
        {
          "levelBracket": "31–36",
          "itemId": 6975,
          "name": "Whirlwind Axe",
          "icon": "inv_axe_11",
          "weaponType": "Two-handed axe",
          "speed": "3.60",
          "dps": "35.6 DPS",
          "source": {
            "kind": "quest",
            "title": "Warrior Class Quest — The Whirlwind Weapon",
            "detail": "Top warrior leveling spike in Classic WoW history (+15 Strength, +14 Stamina, 35.6 DPS)."
          },
          "alts": [
            {
              "name": "Whirlwind Axe",
              "itemId": 6975,
              "value": "35.6 DPS, 3.60s - Class quest spike remains dominant",
              "faction": "both",
              "dps": "35.56 DPS",
              "speed": "3.60",
              "weaponType": "Two-handed axe",
              "quality": "q3",
              "iLvl": 40,
              "stats": "+16 Strength, +15 Stamina",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tAxe",
                "102 - 154 Damage\tSpeed 3.60",
                "(35.6 damage per second)",
                "+16 Strength",
                "+15 Stamina",
                "Classes: Warrior"
              ],
              "reqLevel": 30,
              "icon": "inv_axe_12"
            },
            {
              "name": "Manual Crowd Pummeler",
              "itemId": 9449,
              "value": "31.5 DPS, 2.00s - Gnomeregan: Crowd Pummeler 9-60",
              "faction": "both",
              "dps": "29 DPS",
              "speed": "2.00",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 34,
              "stats": "+16 Strength, +5 Agility, Use: Increases your attack speed by 50% for 30 sec. (3 Min Cooldown)",
              "lines": [
                "Binds when picked up",
                "Unique",
                "Two-Hand\tMace",
                "46 - 70 Damage\tSpeed 2.00",
                "(29 damage per second)",
                "+16 Strength",
                "+5 Agility",
                "Use: Increases your attack speed by 50% for 30 sec. (3 Min Cooldown)",
                "3 Charges",
                "Requires Level 29"
              ],
              "reqLevel": 29,
              "icon": "inv_mace_14"
            },
            {
              "name": "Mighty Iron Hammer",
              "itemId": 3492,
              "value": "25.0 DPS - Blacksmithing (145)",
              "faction": "both",
              "dps": "15.54 DPS",
              "speed": "2.80",
              "weaponType": "One-handed mace",
              "quality": "q2",
              "iLvl": 30,
              "reqLevel": 25,
              "stats": "",
              "icon": "inv_hammer_04"
            },
            {
              "name": "Abandoned Ferocity",
              "itemId": 271801,
              "value": "37.19 DPS, 3.20s - Khan Jehn in Maraudon (Horde)",
              "faction": "horde",
              "dps": "37.19 DPS",
              "speed": "3.20",
              "weaponType": "Two-Handed Axe",
              "quality": "q3",
              "iLvl": 42,
              "reqLevel": 35,
              "stats": "+10 Strength, +4 Agility, +12 Stamina",
              "icon": "inv_axe_17"
            },
            {
              "name": "Scavenged Magram Armament",
              "itemId": 271800,
              "value": "37.17 DPS, 3.00s - Polearm (Khan Jehn in Maraudon)",
              "faction": "both",
              "dps": "37.17 DPS",
              "speed": "3.00",
              "weaponType": "Polearm",
              "quality": "q3",
              "iLvl": 42,
              "reqLevel": 35,
              "stats": "+5 Agility, +14 Stamina",
              "icon": "inv_spear_05"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 40,
          "stats": "+15 Strength, +14 Stamina",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tAxe",
            "88 - 132 Damage\tSpeed 3.80",
            "(28.9 damage per second)",
            "+15 Strength",
            "+8 Stamina",
            "Requires Level 29"
          ],
          "reqLevel": 30
        },
        {
          "levelBracket": "37–40",
          "itemId": 7717,
          "name": "Ravager",
          "icon": "inv_axe_04",
          "weaponType": "Two-handed axe",
          "speed": "3.50",
          "dps": "37.3 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Herod",
            "detail": "Scarlet Monastery Armory, levels 35–45 (Whirlwind proc devastates AoE)"
          },
          "alts": [
            {
              "name": "Mograine's Might",
              "itemId": 7723,
              "value": "38.9 DPS, 3.50s, +16 Str, +17 Sta - SM Cath: Mograine",
              "faction": "both",
              "dps": "38.82 DPS",
              "speed": "3.40",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 44,
              "reqLevel": 39,
              "stats": "+16 Str, +17 Sta",
              "icon": "inv_hammer_04"
            },
            {
              "name": "Bonebiter",
              "itemId": 6830,
              "value": "38.8 DPS, 3.40s - Alliance Quest: In the Name of the Light",
              "faction": "alliance",
              "dps": "38.82 DPS",
              "speed": "3.40",
              "weaponType": "Two-handed axe",
              "quality": "q3",
              "iLvl": 44,
              "reqLevel": 34,
              "stats": "",
              "icon": "inv_misc_bowl_01"
            },
            {
              "name": "Sword of Serenity",
              "itemId": 6829,
              "value": "30.0 DPS, 2.20s, +9 Sta, +4 Spi - Alliance SM Quest: In the Name of the Light",
              "faction": "alliance",
              "dps": "30 DPS",
              "speed": "2.20",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 44,
              "reqLevel": 34,
              "stats": "+9 Sta, +4 Spi",
              "icon": "inv_sword_05"
            },
            {
              "name": "Sword of Omen",
              "itemId": 6802,
              "value": "29.7 DPS, 2.20s, +9 Str, +4 Sta, +3 Agi - Horde SM Quest: Into The Scarlet Monastery",
              "faction": "horde",
              "dps": "29.7 DPS",
              "speed": "2.20",
              "quality": "q3",
              "iLvl": 42,
              "reqLevel": 36,
              "stats": "+9 Str, +4 Sta, +3 Agi",
              "icon": "inv_sword_24"
            },
            {
              "name": "Vanquisher's Sword",
              "itemId": 10823,
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 44,
              "reqLevel": 39,
              "dps": "30.4 DPS",
              "speed": "2.20",
              "stats": "+28 Attack Power",
              "icon": "inv_sword_24",
              "value": "Razorfen Downs Quest: Bring the End"
            },
            {
              "name": "Ardent Custodian",
              "itemId": 869,
              "weaponType": "Two-handed mace",
              "quality": "q4",
              "iLvl": 43,
              "reqLevel": 38,
              "dps": "30.6 DPS",
              "speed": "2.70",
              "stats": "+100 Armor, Chance on hit: Increases attack speed by 5% for 10 sec",
              "icon": "inv_hammer_05",
              "value": "World Drop Epic Mace"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 42,
          "reqLevel": 37,
          "stats": ""
        },
        {
          "levelBracket": "41–44",
          "itemId": 13018,
          "name": "Executioner's Cleaver",
          "icon": "inv_axe_04",
          "weaponType": "Two-handed axe",
          "speed": "3.80",
          "dps": "42.5 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop BoE",
            "detail": "Slow 3.80s swing speed maximizes Mortal Strike weapon coefficient"
          },
          "alts": [
            {
              "name": "Stoneslayer",
              "itemId": 9413,
              "value": "40.5 DPS, 3.90s - Uldaman: Archaedas",
              "faction": "both",
              "dps": "40.5 DPS",
              "speed": "3.90",
              "quality": "q3",
              "iLvl": 46,
              "reqLevel": 40,
              "stats": "",
              "icon": "inv_sword_04"
            },
            {
              "name": "The Pacifier",
              "itemId": 6327,
              "value": "40.0 DPS - World Drop BoE Mace",
              "faction": "both",
              "dps": "36.63 DPS",
              "speed": "4.00",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 41,
              "reqLevel": 36,
              "stats": "+20 Strength, +8 Stamina",
              "icon": "inv_sword_01"
            },
            {
              "name": "Gul'gash's Greathammer",
              "itemId": 281648,
              "weaponType": "Two-handed mace",
              "speed": "3.60",
              "dps": "42.8 DPS",
              "value": "42.8 DPS, 3.60s - Feralas Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 49,
              "reqLevel": 44,
              "stats": "",
              "icon": "inv_hammer_16"
            },
            {
              "name": "Sul'thraze the Lasher",
              "itemId": 9372,
              "weaponType": "Two-handed sword",
              "quality": "q4",
              "iLvl": 50,
              "reqLevel": 44,
              "dps": "38.5 DPS",
              "speed": "2.60",
              "stats": "Chance on hit: Blasts target with a shadow bolt for 90 to 210 Shadow damage and slows attack speed by 50%",
              "icon": "inv_sword_40",
              "value": "Zul'Farrak — Formed by combining Sang'thraze & Jang'thraze"
            },
            {
              "name": "Kang the Decapitator",
              "itemId": 2291,
              "weaponType": "Two-handed axe",
              "quality": "q4",
              "iLvl": 49,
              "reqLevel": 44,
              "dps": "42.6 DPS",
              "speed": "3.60",
              "stats": "Chance on hit: Wounds target for 8 Bleed damage each sec for 30 sec",
              "icon": "inv_axe_09",
              "value": "World Drop Epic Axe"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 48,
          "reqLevel": 43,
          "stats": "+10 Hit Rating"
        },
        {
          "levelBracket": "45–50",
          "itemId": 17730,
          "name": "Gatorbite Axe",
          "icon": "inv_axe_04",
          "weaponType": "Two-handed axe",
          "speed": "3.40",
          "dps": "45.8 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Rotgrip",
            "detail": "Maraudon, levels 46–55 (+14 Str, +1% Crit)"
          },
          "alts": [
            {
              "name": "Princess Theradras' Scepter",
              "itemId": 17766,
              "value": "47.1 DPS, 3.40s - Maraudon: Princess Theradras",
              "faction": "both",
              "dps": "46.47 DPS",
              "speed": "3.40",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 54,
              "reqLevel": 49,
              "stats": "",
              "icon": "inv_hammer_08"
            },
            {
              "name": "Warmonger",
              "itemId": 13052,
              "value": "44.6 DPS, 3.50s, +3% Hit - World drop 2H sword",
              "faction": "both",
              "dps": "45 DPS",
              "speed": "3.00",
              "weaponType": "Two-handed sword",
              "quality": "q3",
              "iLvl": 52,
              "reqLevel": 47,
              "stats": "+3% Hit",
              "icon": "inv_sword_04"
            },
            {
              "name": "Thrash Blade",
              "itemId": 17705,
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 50,
              "reqLevel": 45,
              "dps": "34.6 DPS",
              "speed": "2.70",
              "stats": "Chance on hit: Grants 1 extra attack",
              "icon": "inv_sword_18",
              "value": "Maraudon Quest: Corruption of Earth and Seed"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 53,
          "reqLevel": 48,
          "stats": "+14 Str, +1% Crit"
        },
        {
          "levelBracket": "51–54",
          "itemId": 11608,
          "name": "Dark Iron Pulverizer",
          "icon": "inv_hammer_08",
          "weaponType": "Two-handed mace",
          "speed": "3.70",
          "dps": "47.4 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (265)",
            "detail": "Crafted (Plan drops in Blackrock Depths) - 8 sec stun proc!"
          },
          "alts": [
            {
              "name": "Ice Barbed Spear",
              "itemId": 19106,
              "weaponType": "Polearm",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 51,
              "dps": "53.9 DPS",
              "speed": "3.60",
              "stats": "+21 Agility, +13 Stamina",
              "icon": "inv_spear_06",
              "value": "Alterac Valley Quest: The Hero of the Stormpike / Korrak (Massive 53.9 DPS spike!)"
            },
            {
              "name": "Dreadforge Retaliator",
              "itemId": 11931,
              "value": "49.3 DPS, 3.70s - BRD: Emperor Dagran Thaurissan",
              "faction": "both",
              "dps": "49.3 DPS",
              "speed": "3.70",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 50,
              "stats": "",
              "icon": "inv_axe_11"
            },
            {
              "name": "Enchanted Battlehammer",
              "itemId": 12776,
              "value": "48.3 DPS, 3.50s - Crafted Blacksmithing (280)",
              "faction": "both",
              "dps": "48.29 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 51,
              "stats": "+4 Arcane Resistance, +21 Parry Rating, +20 Hit Rating",
              "icon": "inv_hammer_04"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 55,
          "reqLevel": 50,
          "stats": ""
        },
        {
          "levelBracket": "55–60",
          "itemId": 12784,
          "name": "Arcanite Reaper",
          "icon": "inv_axe_09",
          "weaponType": "Two-handed axe",
          "speed": "3.80",
          "dps": "53.8 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (275)",
            "detail": "Legendary physical spike (+62 AP, slow 3.80s Mortal Strikes)"
          },
          "alts": [
            {
              "name": "Blackhand Doomsaw",
              "itemId": 12583,
              "value": "55.4 DPS, 3.50s, 420 bleed proc - LBRS: Warmaster Voone",
              "faction": "both",
              "dps": "55.4 DPS",
              "speed": "3.50",
              "quality": "q3",
              "iLvl": 60,
              "reqLevel": 54,
              "stats": "",
              "icon": "inv_weapon_halberd_01"
            },
            {
              "name": "Blackblade of Shahram",
              "itemId": 12592,
              "value": "53.6 DPS, 3.50s - UBRS: General Drakkisath",
              "faction": "both",
              "dps": "53.6 DPS",
              "speed": "3.50",
              "quality": "q3",
              "iLvl": 60,
              "reqLevel": 54,
              "stats": "",
              "icon": "inv_sword_34"
            },
            {
              "name": "The Unstoppable Force",
              "itemId": 19323,
              "value": "61.4 DPS, 3.80s, Stun proc - Alterac Valley Exalted",
              "faction": "both",
              "dps": "56.53 DPS",
              "speed": "3.60",
              "weaponType": "Two-handed mace",
              "quality": "q4",
              "iLvl": 60,
              "reqLevel": 55,
              "stats": "+18 Strength, +17 Stamina, +28 Critical Strike Rating",
              "icon": "inv_hammer_09"
            },
            {
              "name": "Dreadforge Retaliator",
              "itemId": 11931,
              "value": "49.3 DPS - BRD Emperor",
              "faction": "both",
              "dps": "49.3 DPS",
              "quality": "q3",
              "iLvl": 60,
              "reqLevel": 54,
              "stats": "",
              "icon": "inv_axe_11"
            },
            {
              "name": "Icesworn Decapitator",
              "itemId": 284257,
              "weaponType": "Two-handed axe",
              "speed": "3.60",
              "dps": "50.6 DPS",
              "value": "50.6 DPS, 3.60s - Winterspring Rare",
              "faction": "both",
              "quality": "q3",
              "iLvl": 59,
              "reqLevel": 54,
              "stats": "",
              "icon": "inv_axe_69"
            },
            {
              "name": "Ironfoe",
              "itemId": 11684,
              "weaponType": "One-handed mace",
              "quality": "q4",
              "iLvl": 60,
              "reqLevel": 55,
              "dps": "42.9 DPS",
              "speed": "2.40",
              "stats": "Chance on hit: Grants 2 extra attacks on next swing",
              "icon": "inv_hammer_03",
              "value": "Blackrock Depths — Emperor Dagran Thaurissan"
            },
            {
              "name": "Dal'Rend's Sacred Charge",
              "itemId": 12940,
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 63,
              "reqLevel": 58,
              "dps": "41.7 DPS",
              "speed": "2.80",
              "stats": "+4 Strength, +1% Critical Strike (Dal'Rend Main Hand)",
              "icon": "inv_sword_43",
              "value": "Upper Blackrock Spire — Warchief Rend Blackhand"
            },
            {
              "name": "The Untamed Blade",
              "itemId": 19334,
              "weaponType": "Two-handed sword",
              "quality": "q4",
              "iLvl": 77,
              "reqLevel": 60,
              "dps": "64.1 DPS",
              "speed": "3.40",
              "stats": "+22 Stamina, Chance on hit: +300 Strength for 8 sec",
              "icon": "inv_sword_40",
              "value": "Blackwing Lair — Razorgore the Untamed"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 63,
          "reqLevel": 58,
          "stats": "+62 AP, slow 3.80s Mortal Strikes"
        }
      ]
    },
    "paladin": {
      "classId": "paladin",
      "tracks": [
        {
          "id": "primary",
          "name": "Two-Handed Path (Retribution / Leveling)"
        }
      ],
      "levels": [
        {
          "levelBracket": "1–2",
          "itemId": 5579,
          "name": "Militia Warhammer",
          "icon": "inv_hammer_15",
          "weaponType": "Two-handed mace",
          "speed": "2.70",
          "dps": "2.6 DPS",
          "source": {
            "kind": "quest",
            "title": "Brotherhood of Thieves",
            "detail": "Northshire starter quest reward"
          },
          "alts": [
            {
              "name": "Club",
              "itemId": 2130,
              "value": "1.8 DPS - Starter vendor mace",
              "faction": "both",
              "dps": "1.8 DPS",
              "quality": "q1",
              "iLvl": 6,
              "reqLevel": 1,
              "stats": "",
              "icon": "inv_axe_10",
              "weaponType": "One-Handed Mace"
            },
            {
              "name": "Worn Shortsword",
              "itemId": 25,
              "value": "1.7 DPS - Starter sword",
              "faction": "both",
              "dps": "1.7 DPS",
              "quality": "q2",
              "iLvl": 6,
              "reqLevel": 1,
              "stats": "",
              "icon": "inv_sword_04",
              "weaponType": "One-Handed Sword"
            }
          ],
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 6,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "3–4",
          "itemId": 2493,
          "name": "Wooden Mallet",
          "icon": "inv_hammer_16",
          "weaponType": "Two-handed mace",
          "speed": "2.60",
          "dps": "5.0 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Purchased in starter hubs (Goldshire, Kharanos)"
          },
          "alts": [
            {
              "name": "Large Club",
              "itemId": 2480,
              "value": "3.8 DPS - Starter vendor 2H mace",
              "faction": "both",
              "dps": "2.78 DPS",
              "speed": "1.80",
              "weaponType": "One-handed mace",
              "quality": "q1",
              "iLvl": 7,
              "reqLevel": 2,
              "stats": "",
              "icon": "inv_torch_unlit"
            },
            {
              "name": "Copper Shortsword",
              "itemId": 2847,
              "value": "4.0 DPS - Blacksmithing (20)",
              "faction": "both",
              "dps": "5.4 DPS",
              "speed": "2.50",
              "weaponType": "One-handed sword",
              "quality": "q2",
              "iLvl": 10,
              "reqLevel": 4,
              "stats": "+1 Strength",
              "icon": "inv_sword_26"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 9,
          "reqLevel": 4,
          "stats": ""
        },
        {
          "levelBracket": "5–6",
          "itemId": 7955,
          "name": "Copper Claymore",
          "icon": "inv_sword_21",
          "weaponType": "Two-handed sword",
          "speed": "3.30",
          "dps": "7.7 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (25)",
            "detail": "Crafted 2H Sword with heavy Seal of Command scaling"
          },
          "alts": [
            {
              "name": "Large Club",
              "itemId": 2480,
              "value": "3.8 DPS - Vendor 2H mace",
              "faction": "both",
              "dps": "2.78 DPS",
              "speed": "1.80",
              "weaponType": "One-handed mace",
              "quality": "q1",
              "iLvl": 7,
              "reqLevel": 2,
              "stats": "",
              "icon": "inv_torch_unlit"
            },
            {
              "name": "Copper Mace",
              "itemId": 2844,
              "value": "3.8 DPS - Blacksmithing (15)",
              "faction": "both",
              "dps": "3.85 DPS",
              "speed": "2.60",
              "weaponType": "One-handed mace",
              "quality": "q1",
              "iLvl": 9,
              "reqLevel": 4,
              "stats": "",
              "icon": "inv_mace_01"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 11,
          "reqLevel": 6,
          "stats": "+1 Strength, +1 Stamina"
        },
        {
          "levelBracket": "7–8",
          "itemId": 248005,
          "name": "Northshire Hammer",
          "icon": "inv_hammer_16",
          "weaponType": "Two-handed mace",
          "speed": "2.70",
          "dps": "8.3 DPS",
          "source": {
            "kind": "quest",
            "title": "Rare Books / Kobold Camp",
            "detail": "Early quest reward in Elwynn Forest"
          },
          "alts": [
            {
              "name": "Giant Mace",
              "itemId": 1197,
              "value": "9.0 DPS, 3.50s - Town vendor 2H mace",
              "faction": "both",
              "dps": "9 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q1",
              "iLvl": 15,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_mace_02"
            },
            {
              "name": "Copper Claymore",
              "itemId": 7955,
              "value": "7.7 DPS - Blacksmithing (25)",
              "faction": "both",
              "dps": "7.73 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed sword",
              "quality": "q2",
              "iLvl": 11,
              "reqLevel": 6,
              "stats": "+1 Strength, +1 Stamina",
              "icon": "inv_sword_21"
            }
          ],
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 12,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "9–10",
          "itemId": 1197,
          "name": "Giant Mace",
          "icon": "inv_mace_02",
          "weaponType": "Two-handed mace",
          "speed": "3.50",
          "dps": "9.0 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Loch Modan, Redridge, and Westfall vendors"
          },
          "alts": [
            {
              "name": "Ironforge Greathammer",
              "itemId": 279895,
              "value": "15.97 DPS, 3.10s - Old Ironforge Incursion quest",
              "faction": "alliance",
              "dps": "15.97 DPS",
              "speed": "3.10",
              "weaponType": "Two-Handed Mace",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "",
              "icon": "inv_hammer_21"
            },
            {
              "name": "Trogg Scepter",
              "itemId": 272996,
              "value": "8.1 DPS, 2.40s - RFC: Oggleflint 1H mace",
              "faction": "both",
              "dps": "8.13 DPS",
              "speed": "2.40",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 18,
              "stats": "+4 Spirit, Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tMace",
                "13 - 26 Damage\tSpeed 2.40",
                "(8.1 damage per second)",
                "+4 Spirit",
                "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
                "Requires Level 13"
              ],
              "reqLevel": 13,
              "icon": "inv_misc_bone_10"
            },
            {
              "name": "Heavy Copper Broadsword",
              "itemId": 3487,
              "value": "12.6 DPS, 3.00s - Blacksmithing (65)",
              "faction": "both",
              "dps": "12.58 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed sword",
              "quality": "q2",
              "iLvl": 19,
              "reqLevel": 14,
              "stats": "",
              "icon": "inv_sword_14"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 15,
          "reqLevel": 10,
          "stats": ""
        },
        {
          "levelBracket": "11–12",
          "itemId": 6214,
          "name": "Heavy Copper Maul",
          "icon": "inv_hammer_18",
          "weaponType": "Two-handed mace",
          "speed": "3.30",
          "dps": "10.8 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (40)",
            "detail": "Guaranteed crafted 2H mace upgrade"
          },
          "alts": [
            {
              "name": "Giant Mace",
              "itemId": 1197,
              "value": "9.0 DPS - Slow 3.50s swing",
              "faction": "both",
              "dps": "9 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q1",
              "iLvl": 15,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_mace_02"
            },
            {
              "name": "Heavy Copper Broadsword",
              "itemId": 3487,
              "value": "12.6 DPS - Blacksmithing (65)",
              "faction": "both",
              "dps": "12.58 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed sword",
              "quality": "q2",
              "iLvl": 19,
              "reqLevel": 14,
              "stats": "",
              "icon": "inv_sword_14"
            },
            {
              "name": "Ironforge Greathammer",
              "itemId": 279895,
              "weaponType": "Two-handed mace",
              "speed": "3.30",
              "dps": "16.0 DPS",
              "value": "16.0 DPS, 3.30s - Ironforge Quest",
              "faction": "alliance",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "",
              "icon": "inv_hammer_21"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 16,
          "reqLevel": 11,
          "stats": "+4 Strength"
        },
        {
          "levelBracket": "13–14",
          "itemId": 279895,
          "name": "Ironforge Greathammer",
          "icon": "inv_hammer_21",
          "weaponType": "Two-handed mace",
          "speed": "3.10",
          "dps": "16.0 DPS",
          "source": {
            "kind": "quest",
            "title": "Old Ironforge Incursion",
            "detail": "The Hall of Thanes dungeon quest, level 16"
          },
          "alts": [
            {
              "name": "Heavy Copper Broadsword",
              "itemId": 3487,
              "value": "12.6 DPS - Blacksmithing (65)",
              "faction": "both",
              "dps": "12.58 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed sword",
              "quality": "q2",
              "iLvl": 19,
              "reqLevel": 14,
              "stats": "",
              "icon": "inv_sword_14"
            },
            {
              "name": "Bronze Mace",
              "itemId": 2848,
              "value": "10.5 DPS - Blacksmithing (75)",
              "faction": "both",
              "dps": "11.15 DPS",
              "speed": "2.60",
              "weaponType": "One-handed mace",
              "quality": "q2",
              "iLvl": 22,
              "reqLevel": 17,
              "stats": "+3 Stamina",
              "icon": "inv_mace_08"
            }
          ],
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 18,
          "reqLevel": 9,
          "stats": ""
        },
        {
          "levelBracket": "15–16",
          "itemId": 5187,
          "name": "Rhahk'Zor's Hammer",
          "icon": "inv_hammer_04",
          "weaponType": "Two-handed mace",
          "speed": "3.20",
          "dps": "18.4 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Rhahk'Zor",
            "detail": "The Deadmines first boss (+11 Str)"
          },
          "alts": [
            {
              "name": "Haunting Blade",
              "itemId": 6641,
              "value": "18.2 DPS, 3.00s, +6 Str, +5 Sta - Ruins of Lordaeron: Captain",
              "faction": "both",
              "dps": "22.37 DPS",
              "speed": "3.80",
              "weaponType": "Two-handed sword",
              "quality": "q3",
              "iLvl": 27,
              "stats": "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tSword",
                "68 - 102 Damage\tSpeed 3.80",
                "(22.4 damage per second)",
                "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
                "Requires Level 22"
              ],
              "reqLevel": 22,
              "icon": "inv_sword_27"
            },
            {
              "name": "Monstrous Cleaver",
              "itemId": 279864,
              "value": "15.2 DPS, 3.30s - Dalaran Dungeon",
              "faction": "both",
              "dps": "15.2 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed sword",
              "quality": "q2",
              "iLvl": 23,
              "reqLevel": 16,
              "stats": "",
              "icon": "inv_sword_23"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 21,
          "reqLevel": 16,
          "stats": "+11 Str"
        },
        {
          "levelBracket": "17–18",
          "itemId": 7230,
          "name": "Smite's Mighty Hammer",
          "icon": "inv_hammer_09",
          "weaponType": "Two-handed mace",
          "speed": "3.50",
          "dps": "19.7 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Mr. Smite",
            "detail": "The Deadmines (+11 Str, +4 Agi, slow 3.50s)"
          },
          "alts": [
            {
              "name": "Haunting Blade",
              "itemId": 6641,
              "value": "18.2 DPS, 3.00s - Ruins of Lordaeron: Captain",
              "faction": "both",
              "dps": "22.37 DPS",
              "speed": "3.80",
              "weaponType": "Two-handed sword",
              "quality": "q3",
              "iLvl": 27,
              "stats": "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tSword",
                "68 - 102 Damage\tSpeed 3.80",
                "(22.4 damage per second)",
                "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
                "Requires Level 22"
              ],
              "reqLevel": 22,
              "icon": "inv_sword_27"
            },
            {
              "name": "Bronze Warhammer",
              "itemId": 7956,
              "value": "17.4 DPS, 3.30s - Blacksmithing (90)",
              "faction": "both",
              "dps": "16.86 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+6 Strength, +6 Stamina",
              "icon": "inv_hammer_18"
            },
            {
              "name": "Sword of the Fallen",
              "itemId": 286977,
              "weaponType": "Two-handed sword",
              "speed": "3.50",
              "dps": "19.7 DPS",
              "value": "19.7 DPS, 3.50s - Rare Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 23,
              "reqLevel": 18,
              "stats": "",
              "icon": "inv_sword_14"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 23,
          "reqLevel": 18,
          "stats": "+11 Str, +4 Agi, slow 3.50s"
        },
        {
          "levelBracket": "19–20",
          "itemId": 6953,
          "name": "Verigan's Fist",
          "icon": "inv_hammer_05",
          "weaponType": "Two-handed mace",
          "speed": "3.20",
          "dps": "25.6 DPS",
          "source": {
            "kind": "quest",
            "title": "The Test of Righteousness",
            "detail": "Iconic Paladin class quest (+6 Str, +12 Sta, +7 Int, +6 Spi)"
          },
          "alts": [
            {
              "name": "Bronze Warhammer",
              "itemId": 7956,
              "value": "17.4 DPS - Blacksmithing (90)",
              "faction": "both",
              "dps": "16.86 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+6 Strength, +6 Stamina",
              "icon": "inv_hammer_18"
            },
            {
              "name": "Bronze Greatsword",
              "itemId": 7957,
              "value": "18.8 DPS - Blacksmithing (105)",
              "faction": "both",
              "dps": "17.5 DPS",
              "speed": "3.40",
              "weaponType": "Two-handed sword",
              "quality": "q2",
              "iLvl": 26,
              "reqLevel": 21,
              "stats": "+6 Stamina, +7 Spell Power",
              "icon": "inv_sword_20"
            }
          ],
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 31,
          "reqLevel": 20,
          "stats": "+6 Str, +12 Sta, +7 Int, +6 Spi"
        },
        {
          "levelBracket": "21–24",
          "itemId": 6953,
          "name": "Verigan's Fist",
          "icon": "inv_hammer_05",
          "weaponType": "Two-handed mace",
          "speed": "3.20",
          "dps": "25.6 DPS",
          "source": {
            "kind": "quest",
            "title": "The Test of Righteousness",
            "detail": "Exceptional stats carry through level 30"
          },
          "alts": [
            {
              "name": "Strike of the Hydra",
              "itemId": 6909,
              "value": "25.6 DPS, 3.30s - BFD: Aku'mai",
              "faction": "both",
              "dps": "25.61 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed sword",
              "quality": "q3",
              "iLvl": 31,
              "reqLevel": 26,
              "stats": "",
              "icon": "inv_sword_42"
            },
            {
              "name": "Solid Iron Maul",
              "itemId": 3851,
              "value": "22.8 DPS - Blacksmithing (135)",
              "faction": "both",
              "dps": "15.57 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 31,
              "stats": "+12 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 24.",
              "lines": [
                "Binds when equipped",
                "Two-Hand\tMace",
                "43 - 66 Damage\tSpeed 3.50",
                "(15.6 damage per second)",
                "+12 Stamina",
                "Equip: Increases damage and healing done by magical spells and effects by up to 24.",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_hammer_07"
            },
            {
              "name": "The Skyblade",
              "itemId": 286540,
              "weaponType": "Two-handed sword",
              "speed": "3.60",
              "dps": "22.4 DPS",
              "value": "22.4 DPS, 3.60s - Ashenvale Rare",
              "faction": "both",
              "quality": "q3",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "",
              "icon": "inv_sword_20"
            }
          ],
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 31,
          "reqLevel": 20,
          "stats": "+5 Stamina, +10 Spirit"
        },
        {
          "levelBracket": "25–28",
          "itemId": 271766,
          "name": "Heavehammer",
          "icon": "inv_hammer_09",
          "weaponType": "Two-handed mace",
          "speed": "3.30",
          "dps": "27.7 DPS",
          "source": {
            "kind": "quest",
            "title": "Lost Relic Carry",
            "detail": "Excavation Site 4 dungeon quest (+60 Armor, +32 AP)"
          },
          "alts": [
            {
              "name": "Trusty Sword",
              "itemId": 281313,
              "value": "26.7 DPS, 3.20s - Redridge Quest",
              "faction": "both",
              "dps": "26.7 DPS",
              "speed": "3.20",
              "weaponType": "Two-handed sword",
              "quality": "q3",
              "iLvl": 32,
              "stats": "+12 Stamina, +12 Spirit",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tSword",
                "70 - 106 Damage\tSpeed 3.30",
                "(26.7 damage per second)",
                "+12 Stamina",
                "+12 Spirit"
              ],
              "reqLevel": 24,
              "icon": "inv_sword_04"
            },
            {
              "name": "Dendweller's Hammer",
              "itemId": 284459,
              "value": "25.6 DPS, 3.30s - Level 26 Mace",
              "faction": "both",
              "dps": "25.61 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 31,
              "stats": "+12 Stamina, +100 Armor",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "67 - 102 Damage\tSpeed 3.30",
                "(25.6 damage per second)",
                "+12 Stamina",
                "+100 Armor",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_hammer_09"
            },
            {
              "name": "Hardened Iron Shortsword",
              "itemId": 3849,
              "value": "19.5 DPS - Blacksmithing (130)",
              "faction": "both",
              "dps": "16.67 DPS",
              "speed": "1.80",
              "weaponType": "One-handed sword",
              "quality": "q2",
              "iLvl": 32,
              "reqLevel": 27,
              "stats": "",
              "icon": "inv_sword_20"
            },
            {
              "name": "Defender of Dalaran",
              "itemId": 279841,
              "weaponType": "Two-handed mace",
              "speed": "3.30",
              "dps": "31.2 DPS",
              "value": "31.2 DPS, 3.30s - Dalaran Dungeon",
              "faction": "both",
              "quality": "q3",
              "iLvl": 36,
              "stats": "+9 Strength, +13 Stamina, +9 Intellect",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "82 - 124 Damage\tSpeed 3.30",
                "(31.2 damage per second)",
                "+9 Strength",
                "+13 Stamina",
                "+9 Intellect"
              ],
              "reqLevel": 24,
              "icon": "inv_hammer_20"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 33,
          "stats": "+60 Armor, Equip: +32 Attack Power.",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tMace",
            "73 - 110 Damage\tSpeed 3.30",
            "(27.7 damage per second)",
            "+60 Armor",
            "Equip: +32 Attack Power."
          ],
          "reqLevel": 24
        },
        {
          "levelBracket": "29–30",
          "itemId": 267369,
          "name": "Wolfsbane",
          "icon": "inv_sword_25",
          "weaponType": "Two-handed sword",
          "speed": "3.40",
          "dps": "25.6 DPS",
          "source": {
            "kind": "quest",
            "title": "Paladin Class Chain",
            "detail": "Sear target with blazing Holystorm vortex (+10 Int, +9 Sta, 3x dmg to Wolves/Worgen)"
          },
          "alts": [
            {
              "name": "Defender of Dalaran",
              "itemId": 279841,
              "value": "31.2 DPS, 3.30s, +9 Str, +13 Sta, +9 Int - City of Dalaran Quest: Heart of Disruption",
              "faction": "both",
              "dps": "31.21 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 36,
              "stats": "+9 Strength, +13 Stamina, +9 Intellect",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "82 - 124 Damage\tSpeed 3.30",
                "(31.2 damage per second)",
                "+9 Strength",
                "+13 Stamina",
                "+9 Intellect"
              ],
              "reqLevel": 24,
              "icon": "inv_hammer_20"
            },
            {
              "name": "Dark Hearted Hammer",
              "itemId": 270071,
              "value": "28.9 DPS, 3.80s, +12 Str, +8 Sta - STV Quest: Colonel Kurzen",
              "faction": "both",
              "dps": "28.95 DPS",
              "speed": "3.80",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 40,
              "stats": "+12 Strength, +8 Stamina",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "88 - 132 Damage\tSpeed 3.80",
                "(28.9 damage per second)",
                "+12 Strength",
                "+8 Stamina"
              ],
              "reqLevel": 30,
              "icon": "inv_hammer_16"
            },
            {
              "name": "Master Hunter's Spellsword",
              "itemId": 270085,
              "value": "32.5 DPS, 2.40s - STV Quest: Big Game Hunter",
              "faction": "both",
              "dps": "32.5 DPS",
              "speed": "2.40",
              "weaponType": "Two-handed sword",
              "quality": "q2",
              "iLvl": 43,
              "stats": "+12 Strength, Equip: Increases damage and healing done by magical spells and effects by up to 14.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tSword",
                "62 - 94 Damage\tSpeed 2.40",
                "(32.5 damage per second)",
                "+12 Strength",
                "Equip: Increases damage and healing done by magical spells and effects by up to 14."
              ],
              "reqLevel": 28,
              "icon": "inv_sword_42"
            },
            {
              "name": "Rage of the Storm",
              "itemId": 280604,
              "weaponType": "Two-handed mace",
              "speed": "3.20",
              "dps": "35.6 DPS",
              "value": "35.6 DPS, 3.20s - Custom Boss Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 40,
              "stats": "+12 Intellect, +15 Stamina, Equip: Increases the damage dealt by your Stormstrike ability by 10%.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "91 - 137 Damage\tSpeed 3.20",
                "(35.6 damage per second)",
                "+12 Intellect",
                "+15 Stamina",
                "Equip: Increases the damage dealt by your Stormstrike ability by 10%."
              ],
              "reqLevel": 30,
              "icon": "inv_mace_42"
            }
          ],
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 31,
          "stats": "+10 Int, +9 Sta, 3x dmg to Wolves/Worgen",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tSword",
            "69 - 105 Damage\tSpeed 3.40",
            "(25.6 damage per second)",
            "+10 Intellect",
            "+9 Stamina",
            "Chance on hit: Sear the target with a vortex of blazing wind, dealing 39 to 59 Holystorm damage. Deals 3 times as much damage to Wolves and Worgen.",
            "Classes: Paladin"
          ],
          "reqLevel": 20
        },
        {
          "levelBracket": "31–35",
          "itemId": 9449,
          "name": "Manual Crowd Pummeler",
          "icon": "inv_mace_14",
          "weaponType": "Two-handed mace",
          "speed": "2.00",
          "dps": "31.5 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Crowd Pummeler 9-60",
            "detail": "Gnomeregan (+50% attack speed on-use for 30 sec)"
          },
          "alts": [
            {
              "name": "Cobalt Crusher",
              "itemId": 6741,
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 37,
              "reqLevel": 32,
              "dps": "27.4 DPS",
              "speed": "3.40",
              "stats": "+11 Strength, +10 Stamina",
              "icon": "inv_hammer_04",
              "value": "+11 Strength, +10 Stamina - Gnomeregan Drop"
            },
            {
              "name": "Cobalt Crusher",
              "itemId": 6741,
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 37,
              "reqLevel": 32,
              "dps": "27.4 DPS",
              "speed": "3.40",
              "stats": "+11 Strength, +10 Stamina",
              "icon": "inv_hammer_04",
              "value": "+11 Strength, +10 Stamina - Gnomeregan Drop"
            },
            {
              "name": "Moonsteel Broadsword",
              "itemId": 3853,
              "value": "27.8 DPS - Crafted Blacksmithing (160)",
              "faction": "both",
              "dps": "24.71 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed sword",
              "quality": "q2",
              "iLvl": 36,
              "reqLevel": 31,
              "stats": "+4 Strength, +12 Spell Power",
              "icon": "inv_sword_25"
            },
            {
              "name": "Silver Spade",
              "itemId": 4128,
              "value": "27.2 DPS - Redridge quest",
              "faction": "alliance",
              "dps": "30.14 DPS",
              "speed": "3.70",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 41,
              "stats": "+4 Stamina, +15 Spirit",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "89 - 134 Damage\tSpeed 3.70",
                "(30.1 damage per second)",
                "+4 Stamina",
                "+15 Spirit"
              ],
              "reqLevel": 30,
              "icon": "inv_misc_shovel_01"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 34,
          "stats": "+16 Strength, +5 Agility, Use: Increases your attack speed by 50% for 30 sec. (3 Min Cooldown)",
          "lines": [
            "Binds when picked up",
            "Unique",
            "Two-Hand\tMace",
            "46 - 70 Damage\tSpeed 2.00",
            "(29 damage per second)",
            "+16 Strength",
            "+5 Agility",
            "Use: Increases your attack speed by 50% for 30 sec. (3 Min Cooldown)",
            "3 Charges",
            "Requires Level 29"
          ],
          "reqLevel": 29
        },
        {
          "levelBracket": "36–40",
          "itemId": 7723,
          "name": "Mograine's Might",
          "icon": "inv_hammer_04",
          "weaponType": "Two-handed mace",
          "speed": "3.50",
          "dps": "38.9 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Scarlet Commander Mograine",
            "detail": "Scarlet Monastery Cathedral (+16 Str, +17 Sta)"
          },
          "alts": [
            {
              "name": "Sword of Serenity",
              "itemId": 6829,
              "value": "33.0 DPS, 2.80s, +9 Sta, +15 Spi - Alliance Quest: In the Name of the Light",
              "faction": "alliance",
              "dps": "30 DPS",
              "speed": "2.20",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 44,
              "reqLevel": 34,
              "stats": "+9 Sta, +15 Spi",
              "icon": "inv_sword_05"
            },
            {
              "name": "Archeus",
              "itemId": 2000,
              "value": "30.8 DPS, 3.40s - Duskwood Morbent Fel quest",
              "faction": "alliance",
              "dps": "23.94 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed sword",
              "quality": "q2",
              "iLvl": 35,
              "reqLevel": 28,
              "stats": "",
              "icon": "inv_sword_08"
            },
            {
              "name": "Ardent Custodian",
              "itemId": 869,
              "weaponType": "Two-handed mace",
              "quality": "q4",
              "iLvl": 43,
              "reqLevel": 38,
              "dps": "30.6 DPS",
              "speed": "2.70",
              "stats": "+100 Armor, Chance on hit: Increases attack speed by 5% for 10 sec",
              "icon": "inv_hammer_05",
              "value": "World Drop Epic Mace"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 44,
          "reqLevel": 39,
          "stats": "+16 Str, +17 Sta"
        },
        {
          "levelBracket": "41–45",
          "itemId": 9413,
          "name": "Stoneslayer",
          "icon": "inv_sword_04",
          "weaponType": "Two-handed sword",
          "speed": "3.90",
          "dps": "40.5 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Archaedas",
            "detail": "Uldaman boss (+5 Str, +13 Sta)"
          },
          "alts": [
            {
              "name": "The Pacifier",
              "itemId": 6327,
              "value": "40.0 DPS - BoE 2H Mace",
              "faction": "both",
              "dps": "36.63 DPS",
              "speed": "4.00",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 41,
              "reqLevel": 36,
              "stats": "+20 Strength, +8 Stamina",
              "icon": "inv_sword_01"
            },
            {
              "name": "Grisly Sack of Skulls",
              "itemId": 1959,
              "value": "40.3 DPS - World Drop",
              "faction": "both",
              "dps": "40.3 DPS",
              "quality": "q3",
              "iLvl": 46,
              "reqLevel": 40,
              "stats": "",
              "icon": "inv_misc_bag_10"
            },
            {
              "name": "Gul'gash's Greathammer",
              "itemId": 281648,
              "weaponType": "Two-handed mace",
              "speed": "3.60",
              "dps": "42.8 DPS",
              "value": "42.8 DPS, 3.60s - Feralas Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 49,
              "reqLevel": 44,
              "stats": "",
              "icon": "inv_hammer_16"
            },
            {
              "name": "Sul'thraze the Lasher",
              "itemId": 9372,
              "weaponType": "Two-handed sword",
              "quality": "q4",
              "iLvl": 50,
              "reqLevel": 44,
              "dps": "38.5 DPS",
              "speed": "2.60",
              "stats": "Chance on hit: Blasts target with a shadow bolt for 90 to 210 Shadow damage and slows attack speed by 50%",
              "icon": "inv_sword_40",
              "value": "Zul'Farrak — Formed by combining Sang'thraze & Jang'thraze"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 46,
          "reqLevel": 40,
          "stats": "+5 Str, +13 Sta"
        },
        {
          "levelBracket": "46–50",
          "itemId": 17766,
          "name": "Princess Theradras' Scepter",
          "icon": "inv_hammer_08",
          "weaponType": "Two-handed mace",
          "speed": "3.40",
          "dps": "47.1 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Princess Theradras",
            "detail": "Maraudon final boss (+11 Str, +10 Sta)"
          },
          "alts": [
            {
              "name": "Blade of the Titans",
              "itemId": 13043,
              "value": "44.6 DPS, +12 Str, +12 Sta - World Drop 2H sword",
              "faction": "both",
              "dps": "44.6 DPS",
              "quality": "q3",
              "iLvl": 51,
              "reqLevel": 45,
              "stats": "+12 Str, +12 Sta",
              "icon": "inv_sword_33",
              "weaponType": "Two-Handed Sword"
            },
            {
              "name": "Warmonger",
              "itemId": 13052,
              "value": "44.6 DPS, 3.50s, +3% Hit - World drop 2H sword",
              "faction": "both",
              "dps": "45 DPS",
              "speed": "3.00",
              "weaponType": "Two-handed sword",
              "quality": "q3",
              "iLvl": 52,
              "reqLevel": 47,
              "stats": "+3% Hit",
              "icon": "inv_sword_04"
            },
            {
              "name": "Lightforged Blade",
              "itemId": 20504,
              "weaponType": "Two-handed sword",
              "quality": "q3",
              "iLvl": 55,
              "reqLevel": 50,
              "dps": "41.3 DPS",
              "speed": "3.30",
              "stats": "+16 Strength, +15 Stamina, +10 Spirit",
              "icon": "inv_sword_39",
              "value": "Paladin Level 50 Class Quest Reward"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 54,
          "reqLevel": 49,
          "stats": "+11 Str, +10 Sta"
        },
        {
          "levelBracket": "51–55",
          "itemId": 11608,
          "name": "Dark Iron Pulverizer",
          "icon": "inv_hammer_08",
          "weaponType": "Two-handed mace",
          "speed": "3.70",
          "dps": "47.4 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (265)",
            "detail": "Plan drops in Blackrock Depths - 8s Stun proc"
          },
          "alts": [
            {
              "name": "Dreadforge Retaliator",
              "itemId": 11931,
              "value": "49.3 DPS, 3.70s - BRD: Emperor Dagran Thaurissan",
              "faction": "both",
              "dps": "49.3 DPS",
              "speed": "3.70",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 50,
              "stats": "",
              "icon": "inv_axe_11"
            },
            {
              "name": "Enchanted Battlehammer",
              "itemId": 12776,
              "value": "48.3 DPS, 3.50s - Crafted Blacksmithing (280)",
              "faction": "both",
              "dps": "48.29 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 51,
              "stats": "+4 Arcane Resistance, +21 Parry Rating, +20 Hit Rating",
              "icon": "inv_hammer_04"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 55,
          "reqLevel": 50,
          "stats": ""
        },
        {
          "levelBracket": "56–60",
          "itemId": 18717,
          "name": "Hammer of the Grand Crusader",
          "icon": "inv_hammer_04",
          "weaponType": "Two-handed mace",
          "speed": "3.10",
          "dps": "53.9 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Grand Crusader Dathrohan",
            "detail": "Stratholme Scarlet Bastion (+12 Str, +21 Sta)"
          },
          "alts": [
            {
              "name": "Blackblade of Shahram",
              "itemId": 12592,
              "value": "53.6 DPS, 3.50s - UBRS: General Drakkisath",
              "faction": "both",
              "dps": "53.6 DPS",
              "speed": "3.50",
              "quality": "q3",
              "iLvl": 61,
              "reqLevel": 55,
              "stats": "",
              "icon": "inv_sword_34"
            },
            {
              "name": "The Unstoppable Force",
              "itemId": 19323,
              "value": "61.4 DPS, 3.80s, Stun proc - Alterac Valley Exalted",
              "faction": "both",
              "dps": "56.53 DPS",
              "speed": "3.60",
              "weaponType": "Two-handed mace",
              "quality": "q4",
              "iLvl": 60,
              "reqLevel": 55,
              "stats": "+18 Strength, +17 Stamina, +28 Critical Strike Rating",
              "icon": "inv_hammer_09"
            },
            {
              "name": "Dreadforge Retaliator",
              "itemId": 11931,
              "value": "49.3 DPS - BRD Emperor",
              "faction": "both",
              "dps": "49.3 DPS",
              "quality": "q3",
              "iLvl": 61,
              "reqLevel": 55,
              "stats": "",
              "icon": "inv_axe_11"
            },
            {
              "name": "The Untamed Blade",
              "itemId": 19334,
              "weaponType": "Two-handed sword",
              "quality": "q4",
              "iLvl": 77,
              "reqLevel": 60,
              "dps": "64.1 DPS",
              "speed": "3.40",
              "stats": "+22 Stamina, Chance on hit: +300 Strength for 8 sec",
              "icon": "inv_sword_40",
              "value": "Blackwing Lair — Razorgore the Untamed"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 61,
          "reqLevel": 55,
          "stats": "+12 Str, +21 Sta"
        }
      ]
    },
    "hunter": {
      "classId": "hunter",
      "tracks": [
        {
          "id": "primary",
          "name": "Ranged Progression (Bows / Guns / Crossbows)"
        }
      ],
      "levels": [
        {
          "levelBracket": "1–2",
          "itemId": 2505,
          "name": "Polished Shortbow",
          "icon": "inv_weapon_bow_02",
          "weaponType": "Bow",
          "speed": "1.80",
          "dps": "1.8 DPS",
          "source": {
            "kind": "vendor",
            "title": "Bow Vendor",
            "detail": "Purchased in starting areas"
          },
          "alts": [
            {
              "name": "Hornwood Recurve Bow",
              "itemId": 2506,
              "value": "2.4 DPS - Starter vendor",
              "faction": "both",
              "dps": "2.38 DPS",
              "speed": "2.10",
              "weaponType": "Bow",
              "quality": "q1",
              "iLvl": 8,
              "reqLevel": 3,
              "stats": "",
              "icon": "inv_weapon_bow_11"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 6,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "3–4",
          "itemId": 2506,
          "name": "Hornwood Recurve Bow",
          "icon": "inv_weapon_bow_11",
          "weaponType": "Bow",
          "speed": "2.00",
          "dps": "2.4 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Sold by town weapon vendors"
          },
          "alts": [
            {
              "name": "Rough Boomstick",
              "itemId": 4362,
              "value": "4.1 DPS, 2.30s - Crafted Engineering (30)",
              "faction": "both",
              "dps": "4.13 DPS",
              "speed": "2.30",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 10,
              "reqLevel": 5,
              "stats": "+1 Stamina",
              "icon": "inv_weapon_rifle_02"
            },
            {
              "name": "Kolkar Bow",
              "itemId": 286729,
              "value": "2.7 DPS, 2.80s - Durotar Quest: Lost in the Shadows",
              "faction": "horde",
              "dps": "2.68 DPS",
              "speed": "2.80",
              "weaponType": "Bow",
              "quality": "q1",
              "iLvl": 8,
              "reqLevel": 4,
              "stats": "",
              "icon": "inv_weapon_bow_12"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 8,
          "reqLevel": 3,
          "stats": ""
        },
        {
          "levelBracket": "5–6",
          "itemId": 4362,
          "name": "Rough Boomstick",
          "icon": "inv_weapon_rifle_02",
          "weaponType": "Gun",
          "speed": "2.30",
          "dps": "4.1 DPS",
          "source": {
            "kind": "craft",
            "title": "Engineering (30)",
            "detail": "Crafted gun, substantial auto-shot increase"
          },
          "alts": [
            {
              "name": "Hornwood Recurve Bow",
              "itemId": 2506,
              "value": "2.4 DPS - Vendor fallback",
              "faction": "both",
              "dps": "2.38 DPS",
              "speed": "2.10",
              "weaponType": "Bow",
              "quality": "q1",
              "iLvl": 8,
              "reqLevel": 3,
              "stats": "",
              "icon": "inv_weapon_bow_11"
            },
            {
              "name": "Kolkar Bow",
              "itemId": 286729,
              "value": "2.7 DPS - Durotar Quest: Lost in the Shadows",
              "faction": "horde",
              "dps": "2.68 DPS",
              "speed": "2.80",
              "weaponType": "Bow",
              "quality": "q1",
              "iLvl": 8,
              "reqLevel": 4,
              "stats": "",
              "icon": "inv_weapon_bow_12"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 10,
          "reqLevel": 5,
          "stats": "+1 Stamina"
        },
        {
          "levelBracket": "7–8",
          "itemId": 276685,
          "name": "Militia Bow",
          "icon": "inv_weapon_bow_02",
          "weaponType": "Bow",
          "speed": "2.10",
          "dps": "5.7 DPS",
          "source": {
            "kind": "quest",
            "title": "Rare Books / Kobold Camp",
            "detail": "Early quest reward in starting zones"
          },
          "alts": [
            {
              "name": "Bristlebark Bow",
              "itemId": 286748,
              "value": "5.00 DPS, 2.60s (+1 Agi) - Uncommon Bow",
              "faction": "both",
              "dps": "5.00 DPS",
              "speed": "2.60",
              "weaponType": "Bow",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "+1 Agility",
              "icon": "inv_weapon_bow_03"
            },
            {
              "name": "Snarlsnout Shooter",
              "itemId": 286753,
              "value": "5.00 DPS, 2.50s (+1 Str) - Uncommon Gun",
              "faction": "both",
              "dps": "5.00 DPS",
              "speed": "2.50",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "+1 Strength",
              "icon": "inv_weapon_rifle_05"
            },
            {
              "name": "Reinforced Bow",
              "itemId": 3026,
              "value": "4.4 DPS, 2.20s - Vendor bow",
              "faction": "both",
              "dps": "5.77 DPS",
              "speed": "2.60",
              "weaponType": "Bow",
              "quality": "q1",
              "iLvl": 16,
              "reqLevel": 11,
              "stats": "",
              "icon": "inv_weapon_bow_01"
            },
            {
              "name": "Skorn's Rifle",
              "itemId": 3079,
              "value": "5.0 DPS, 1.90s - Mulgore Quest: The Demon Scarred Cloak",
              "faction": "horde",
              "dps": "5 DPS",
              "speed": "1.90",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 6,
              "stats": "+1 Agility",
              "icon": "inv_weapon_rifle_01"
            }
          ],
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 14,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "9–10",
          "itemId": 2505,
          "name": "Fine Shortbow",
          "icon": "inv_weapon_bow_08",
          "weaponType": "Bow",
          "speed": "1.70",
          "dps": "7.6 DPS",
          "source": {
            "kind": "vendor",
            "title": "Bow Vendor / Quest",
            "detail": "Early green leveling bow."
          },
          "alts": [
            {
              "name": "Misplaced Shooter",
              "itemId": 277255,
              "value": "4.82 DPS, 2.80s (+1 Str, +1 Sta) - Leonid's Letter",
              "faction": "horde",
              "dps": "4.82 DPS",
              "speed": "2.80",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 10,
              "stats": "+1 Strength, +1 Stamina",
              "icon": "inv_weapon_rifle_07"
            },
            {
              "name": "Calibrated Blunderbuss",
              "itemId": 279894,
              "value": "9.57 DPS, 2.30s (+3 Sta) - Old Ironforge Incursion",
              "faction": "alliance",
              "dps": "9.57 DPS",
              "speed": "2.30",
              "weaponType": "Gun",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+3 Stamina",
              "icon": "inv_weapon_rifle_01"
            },
            {
              "name": "Fine Shortbow",
              "itemId": 11303,
              "value": "6.2 DPS - Fast 1.70s swing",
              "faction": "both",
              "dps": "6.18 DPS",
              "speed": "1.70",
              "weaponType": "Bow",
              "quality": "q2",
              "iLvl": 16,
              "reqLevel": 11,
              "stats": "+1 Agility",
              "icon": "inv_weapon_bow_05"
            },
            {
              "name": "Rough Boomstick",
              "itemId": 4362,
              "value": "4.1 DPS - Engineering (30)",
              "faction": "both",
              "dps": "4.13 DPS",
              "speed": "2.30",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 10,
              "reqLevel": 5,
              "stats": "+1 Stamina",
              "icon": "inv_weapon_rifle_02"
            },
            {
              "name": "Orcish Battle Bow",
              "itemId": 5346,
              "value": "5.5 DPS, 1.90s - Durotar Quest: Centaur Bracers",
              "faction": "horde",
              "dps": "5.53 DPS",
              "speed": "1.90",
              "weaponType": "Bow",
              "quality": "q2",
              "iLvl": 14,
              "reqLevel": 9,
              "stats": "+1 Strength",
              "icon": "inv_weapon_bow_08"
            },
            {
              "name": "Snarlsnout Shooter",
              "itemId": 286753,
              "value": "5.0 DPS, 2.50s - Barrens Rare",
              "faction": "both",
              "dps": "5 DPS",
              "speed": "2.50",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "",
              "icon": "inv_weapon_rifle_05"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 14,
          "reqLevel": 9,
          "stats": "+2 Agility"
        },
        {
          "levelBracket": "11–12",
          "itemId": 2506,
          "name": "Reinforced Bow",
          "icon": "inv_weapon_bow_08",
          "weaponType": "Bow",
          "speed": "2.10",
          "dps": "9.3 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Vendor",
            "detail": "Level 11 bow upgrade."
          },
          "alts": [
            {
              "name": "Hunter's Boomstick",
              "itemId": 2511,
              "value": "8.57 DPS, 2.10s - Dun Morogh Quest: The Grizzled Den",
              "faction": "alliance",
              "dps": "8.57 DPS",
              "speed": "2.10",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 13,
              "reqLevel": 7,
              "stats": "+1 Agility",
              "icon": "inv_weapon_rifle_01"
            },
            {
              "name": "Deadly Blunderbuss",
              "itemId": 4369,
              "value": "8.3 DPS, 2.60s - Engineering (105)",
              "faction": "both",
              "dps": "8.27 DPS",
              "speed": "2.60",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 21,
              "reqLevel": 16,
              "stats": "+2 Agility",
              "icon": "inv_weapon_rifle_07"
            },
            {
              "name": "Orcish Battle Bow",
              "itemId": 5346,
              "value": "5.5 DPS - Durotar Quest: Centaur Bracers",
              "faction": "horde",
              "dps": "5.53 DPS",
              "speed": "1.90",
              "weaponType": "Bow",
              "quality": "q2",
              "iLvl": 14,
              "reqLevel": 9,
              "stats": "+1 Strength",
              "icon": "inv_weapon_bow_08"
            },
            {
              "name": "Bristlebark Bow",
              "itemId": 286748,
              "value": "5.0 DPS, 2.60s - Barrens Drop",
              "faction": "both",
              "dps": "5 DPS",
              "speed": "2.60",
              "weaponType": "Bow",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "",
              "icon": "inv_weapon_bow_03"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 16,
          "reqLevel": 11,
          "stats": "+3 Agility"
        },
        {
          "levelBracket": "13–14",
          "itemId": 279894,
          "name": "Calibrated Blunderbuss",
          "icon": "inv_weapon_rifle_01",
          "weaponType": "Gun",
          "speed": "2.40",
          "dps": "9.6 DPS",
          "source": {
            "kind": "quest",
            "title": "Old Ironforge Incursion",
            "detail": "Hall of Thanes dungeon quest reward"
          },
          "alts": [
            {
              "name": "Barbaric Crossbow",
              "itemId": 272999,
              "value": "9.50 DPS, 2.00s - Oggleflint in Ragefire Chasm",
              "faction": "both",
              "dps": "9.50 DPS",
              "speed": "2.00",
              "weaponType": "Crossbow",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "",
              "icon": "inv_weapon_crossbow_02"
            },
            {
              "name": "Deadly Blunderbuss",
              "itemId": 4369,
              "value": "8.3 DPS, 2.60s - Engineering (105)",
              "faction": "both",
              "dps": "8.27 DPS",
              "speed": "2.60",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 21,
              "reqLevel": 16,
              "stats": "+2 Agility",
              "icon": "inv_weapon_rifle_07"
            },
            {
              "name": "Laminated Recurve Bow",
              "itemId": 2507,
              "value": "7.8 DPS - Town vendor fallback",
              "faction": "both",
              "dps": "9.17 DPS",
              "speed": "2.40",
              "weaponType": "Bow",
              "quality": "q1",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "",
              "icon": "inv_weapon_bow_01"
            },
            {
              "name": "Walton's Second-Favorite Gun",
              "itemId": 269742,
              "value": "7.95 DPS, 2.20s (+2 Agi) - Unwelcome Guests",
              "faction": "horde",
              "dps": "7.95 DPS",
              "speed": "2.20",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 20,
              "reqLevel": 14,
              "stats": "+2 Agility",
              "icon": "inv_weapon_rifle_05"
            }
          ],
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 18,
          "reqLevel": 9,
          "stats": ""
        },
        {
          "levelBracket": "15–18",
          "itemId": 4362,
          "name": "Deadly Blunderbuss",
          "icon": "inv_weapon_rifle_01",
          "weaponType": "Gun",
          "speed": "2.60",
          "dps": "13.8 DPS",
          "source": {
            "kind": "crafting",
            "title": "Engineering (105)",
            "detail": "High-damage early leveling gun."
          },
          "alts": [
            {
              "name": "Lovingly Crafted Boomstick",
              "itemId": 4372,
              "value": "9.7 DPS, 1.80s - Engineering (120)",
              "faction": "both",
              "dps": "9.72 DPS",
              "speed": "1.80",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 24,
              "reqLevel": 19,
              "stats": "+3 Spirit",
              "icon": "inv_weapon_rifle_01"
            },
            {
              "name": "Deadly Blunderbuss",
              "itemId": 4369,
              "value": "8.3 DPS - Engineering (105)",
              "faction": "both",
              "dps": "8.27 DPS",
              "speed": "2.60",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 21,
              "reqLevel": 16,
              "stats": "+2 Agility",
              "icon": "inv_weapon_rifle_07"
            },
            {
              "name": "Barbaric Crossbow",
              "itemId": 272999,
              "weaponType": "Crossbow",
              "speed": "2.00",
              "dps": "9.5 DPS",
              "value": "9.5 DPS, 2.00s - RFC Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "",
              "icon": "inv_weapon_crossbow_02"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 21,
          "reqLevel": 16,
          "stats": "+2 Agility, +2 Stamina"
        },
        {
          "levelBracket": "19–20",
          "itemId": 6469,
          "name": "Venomstrike",
          "icon": "inv_weapon_bow_10",
          "weaponType": "Bow",
          "speed": "2.40",
          "dps": "12.1 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Lord Serpentis",
            "detail": "Remains top-tier through level 22"
          },
          "alts": [
            {
              "name": "Silver-plated Shotgun",
              "itemId": 4379,
              "value": "10.4 DPS, 2.40s - Engineering (125)",
              "faction": "both",
              "dps": "10.37 DPS",
              "speed": "2.70",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 26,
              "reqLevel": 21,
              "stats": "+3 Stamina",
              "icon": "inv_weapon_rifle_07"
            },
            {
              "name": "Reinforced Bow",
              "itemId": 3026,
              "value": "4.4 DPS - Vendor fallback",
              "faction": "both",
              "dps": "5.77 DPS",
              "speed": "2.60",
              "weaponType": "Bow",
              "quality": "q1",
              "iLvl": 16,
              "reqLevel": 11,
              "stats": "",
              "icon": "inv_weapon_bow_01"
            },
            {
              "name": "Wingblade",
              "itemId": 6504,
              "value": "15.7 DPS, 2.20s - Leaders of the Fang quest in Wailing Caverns (+5 Agi, +2 Sta) (Horde)",
              "faction": "horde",
              "dps": "15.7 DPS",
              "speed": "2.20",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 10,
              "stats": "+5 Agility, +2 Stamina",
              "icon": "inv_sword_16",
              "source": {
                "kind": "quest",
                "title": "Leaders of the Fang",
                "detail": "Dungeon quest reward in Wailing Caverns (Horde). Outstanding fast/balanced sword."
              }
            },
            {
              "name": "Crescent Staff",
              "itemId": 6505,
              "value": "+26 Spell Power, +7 Agi, +7 Sta - Leaders of the Fang quest in Wailing Caverns (Horde)",
              "faction": "horde",
              "dps": "15.2 DPS",
              "speed": "2.90",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 10,
              "stats": "+26 Spell Power, +7 Agility, +7 Stamina",
              "icon": "inv_staff_04",
              "source": {
                "kind": "quest",
                "title": "Leaders of the Fang",
                "detail": "Major dungeon quest reward in Wailing Caverns (Horde). Elite spell power boost."
              }
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 24,
          "reqLevel": 19,
          "stats": ""
        },
        {
          "levelBracket": "21–22",
          "itemId": 3078,
          "name": "Naga Heartpiercer",
          "icon": "inv_weapon_bow_04",
          "weaponType": "Bow",
          "speed": "2.40",
          "dps": "13.3 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Lady Sarevess",
            "detail": "Blackfathom Deeps"
          },
          "alts": [
            {
              "name": "Fallenroot Longbow",
              "itemId": 273843,
              "value": "13.86 DPS, 2.20s - Lorgus Jett in BFD",
              "faction": "both",
              "dps": "13.86 DPS",
              "speed": "2.20",
              "weaponType": "Bow",
              "quality": "q3",
              "iLvl": 28,
              "reqLevel": 23,
              "stats": "+2 Agility, +4 Stamina",
              "icon": "inv_weapon_bow_03"
            },
            {
              "name": "Alliance Outrunner Bow",
              "itemId": 285347,
              "value": "13.33 DPS, 2.40s - Outrunner Quest",
              "faction": "alliance",
              "dps": "13.33 DPS",
              "speed": "2.40",
              "weaponType": "Bow",
              "quality": "q3",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "+4 Agility, +3 Spirit",
              "icon": "inv_weapon_bow_05"
            },
            {
              "name": "Moonsight Rifle",
              "itemId": 4383,
              "value": "13.8 DPS, 2.40s, +3 Hit - Engineering (145)",
              "faction": "both",
              "dps": "11.76 DPS",
              "speed": "1.70",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 29,
              "reqLevel": 24,
              "stats": "+3 Hit",
              "icon": "inv_weapon_rifle_06"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 27,
          "reqLevel": 22,
          "stats": ""
        },
        {
          "levelBracket": "23–24",
          "itemId": 273843,
          "name": "Fallenroot Longbow",
          "icon": "inv_weapon_bow_03",
          "weaponType": "Bow",
          "speed": "2.20",
          "dps": "13.9 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Lorgus Jett",
            "detail": "Blackfathom Deeps (+2 Agi, +4 Sta)"
          },
          "alts": [
            {
              "name": "BKP 2700 \"Enforcer\"",
              "itemId": 3024,
              "value": "14.2 DPS, 2.70s - Engineering (155)",
              "faction": "both",
              "dps": "14.2 DPS",
              "speed": "2.70",
              "quality": "q3",
              "iLvl": 28,
              "reqLevel": 22,
              "stats": "",
              "icon": "spell_nature_polymorph",
              "weaponType": "Gun"
            },
            {
              "name": "Concealed Hand Crossbow",
              "itemId": 273829,
              "value": "15.3 DPS - The Stockade: Bazil Thredd",
              "faction": "both",
              "dps": "15.25 DPS",
              "speed": "2.00",
              "weaponType": "Crossbow",
              "quality": "q3",
              "iLvl": 31,
              "reqLevel": 26,
              "stats": "",
              "icon": "inv_weapon_crossbow_02"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 28,
          "stats": "+2 Agility, +4 Stamina",
          "lines": [
            "Binds when picked up",
            "Ranged\tBow",
            "21 - 40 Damage\tSpeed 2.20",
            "(13.9 damage per second)",
            "+2 Agility",
            "+4 Stamina",
            "Requires Level 23"
          ],
          "reqLevel": 23
        },
        {
          "levelBracket": "25–26",
          "itemId": 273033,
          "name": "Gravespike Repeater",
          "icon": "inv_weapon_crossbow_06",
          "weaponType": "Crossbow",
          "speed": "2.30",
          "dps": "15.4 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Atrexis the Grave Knight",
            "detail": "City of Dalaran dungeon (+8 AP, +9 AP vs Humanoids)"
          },
          "alts": [
            {
              "name": "Golemsight Long Gun",
              "itemId": 273029,
              "value": "16.60 DPS, 2.50s (+6 Agi) - Relic Guardian in Excavation Site",
              "faction": "both",
              "dps": "16.60 DPS",
              "speed": "2.50",
              "weaponType": "Gun",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+6 Agility",
              "icon": "inv_musket_02"
            },
            {
              "name": "Dun Garok Rifle",
              "itemId": 282710,
              "value": "14.81 DPS, 2.60s (+3 Agi, +3 Spi) - Hillsbrad",
              "faction": "both",
              "dps": "14.81 DPS",
              "speed": "2.60",
              "weaponType": "Gun",
              "quality": "q3",
              "iLvl": 30,
              "reqLevel": 25,
              "stats": "+3 Agility, +3 Spirit",
              "icon": "inv_weapon_rifle_03"
            },
            {
              "name": "Concealed Hand Crossbow",
              "itemId": 273829,
              "value": "15.3 DPS - The Stockade: Bazil Thredd",
              "faction": "both",
              "dps": "15.25 DPS",
              "speed": "2.00",
              "weaponType": "Crossbow",
              "quality": "q3",
              "iLvl": 31,
              "reqLevel": 26,
              "stats": "",
              "icon": "inv_weapon_crossbow_02"
            },
            {
              "name": "Fallenroot Longbow",
              "itemId": 273843,
              "value": "13.9 DPS - Blackfathom Deeps",
              "faction": "both",
              "dps": "13.86 DPS",
              "speed": "2.20",
              "weaponType": "Bow",
              "quality": "q3",
              "iLvl": 28,
              "stats": "+2 Agility, +4 Stamina",
              "lines": [
                "Binds when picked up",
                "Ranged\tBow",
                "21 - 40 Damage\tSpeed 2.20",
                "(13.9 damage per second)",
                "+2 Agility",
                "+4 Stamina",
                "Requires Level 23"
              ],
              "reqLevel": 23,
              "icon": "inv_weapon_bow_03"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 31,
          "stats": "Equip: +8 Attack Power, Equip: +9 Attack Power Vs Humanoids",
          "lines": [
            "Binds when picked up",
            "Ranged\tCrossbow",
            "28 - 43 Damage\tSpeed 2.30",
            "(15.4 damage per second)",
            "Requires Level 26",
            "Equip: +8 Attack Power",
            "Equip: +9 Attack Power Vs Humanoids",
            "Sell Price: 45s 74c"
          ],
          "reqLevel": 26
        },
        {
          "levelBracket": "27–28",
          "itemId": 273029,
          "name": "Golemsight Long Gun",
          "icon": "inv_musket_02",
          "weaponType": "Gun",
          "speed": "2.50",
          "dps": "16.6 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Relic Guardian",
            "detail": "Excavation Site: Wetlands (+6 Agility, Req Level 28)"
          },
          "alts": [
            {
              "name": "Gravespike Repeater",
              "itemId": 273033,
              "value": "15.4 DPS, 2.30s - City of Dalaran: Atrexis",
              "faction": "both",
              "dps": "15.43 DPS",
              "speed": "2.30",
              "weaponType": "Crossbow",
              "quality": "q3",
              "iLvl": 31,
              "stats": "Equip: +8 Attack Power, Equip: +9 Attack Power Vs Humanoids",
              "lines": [
                "Binds when picked up",
                "Ranged\tCrossbow",
                "28 - 43 Damage\tSpeed 2.30",
                "(15.4 damage per second)",
                "Requires Level 26",
                "Equip: +8 Attack Power",
                "Equip: +9 Attack Power Vs Humanoids",
                "Sell Price: 45s 74c"
              ],
              "reqLevel": 26,
              "icon": "inv_weapon_crossbow_06"
            },
            {
              "name": "Glass Shooter",
              "itemId": 9456,
              "value": "18.5 DPS, 2.90s - Gnomeregan: Dark Iron Ambassador",
              "faction": "both",
              "dps": "17.93 DPS",
              "speed": "2.90",
              "weaponType": "Gun",
              "quality": "q3",
              "iLvl": 35,
              "stats": "Equip: +12 Attack Power.",
              "lines": [
                "Binds when picked up",
                "Ranged\tGun",
                "36 - 68 Damage\tSpeed 2.90",
                "(17.9 damage per second)",
                "Equip: +12 Attack Power.",
                "Requires Level 30"
              ],
              "reqLevel": 30,
              "icon": "inv_weapon_rifle_02"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 33,
          "stats": "+6 Agility",
          "lines": [
            "Binds when picked up",
            "Ranged\tGun",
            "29 - 54 Damage\tSpeed 2.50",
            "(16.6 damage per second)",
            "+6 Agility",
            "Requires Level 28"
          ],
          "reqLevel": 28
        },
        {
          "levelBracket": "29–30",
          "itemId": 17687,
          "name": "Master Hunter's Rifle",
          "icon": "inv_weapon_rifle_06",
          "weaponType": "Gun",
          "speed": "2.60",
          "dps": "20.9 DPS",
          "source": {
            "kind": "quest",
            "title": "Big Game Hunter",
            "detail": "Stranglethorn Vale Nesingwary chain reward (+14 RAP)"
          },
          "alts": [
            {
              "name": "Master Hunter's Bow",
              "itemId": 17686,
              "value": "20.9 DPS - Bow reward choice from Big Game Hunter",
              "faction": "both",
              "dps": "19.38 DPS",
              "speed": "2.40",
              "weaponType": "Bow",
              "quality": "q2",
              "iLvl": 43,
              "stats": "+6 Agility",
              "lines": [
                "Binds when picked up",
                "Ranged\tBow",
                "32 - 61 Damage\tSpeed 2.40",
                "(19.4 damage per second)",
                "+6 Agility"
              ],
              "reqLevel": 28,
              "icon": "inv_weapon_bow_04"
            },
            {
              "name": "Quilboar Blaster",
              "itemId": 274084,
              "value": "18.6 DPS, 2.80s, +4 Agi, +4 Spi - RFK Quest: The Crone of the Kraul",
              "faction": "both",
              "dps": "18.57 DPS",
              "speed": "2.80",
              "weaponType": "Gun",
              "quality": "q3",
              "iLvl": 36,
              "stats": "+4 Agility, +4 Spirit",
              "lines": [
                "Binds when picked up",
                "Ranged\tGun",
                "36 - 68 Damage\tSpeed 2.80",
                "(18.6 damage per second)",
                "+4 Agility",
                "+4 Spirit"
              ],
              "reqLevel": 29,
              "icon": "inv_weapon_rifle_05"
            },
            {
              "name": "Booty Bay Bruiser's Buckshot",
              "itemId": 274748,
              "value": "18.0 DPS, 2.80s, +3 Sta, +9 AP - Booty Bay Honored vendor gun",
              "faction": "both",
              "dps": "18.04 DPS",
              "speed": "2.80",
              "weaponType": "Gun",
              "quality": "q3",
              "iLvl": 35,
              "stats": "+3 Stamina, Equip: +9 Attack Power.",
              "lines": [
                "Binds when picked up",
                "Ranged\tGun",
                "35 - 66 Damage\tSpeed 2.80",
                "(18.0 damage per second)",
                "+3 Stamina",
                "Equip: +9 Attack Power.",
                "Requires Level 30",
                "Requires Booty Bay - Honored"
              ],
              "reqLevel": 30,
              "icon": "inv_weapon_rifle_02"
            },
            {
              "name": "Glass Shooter",
              "itemId": 9456,
              "value": "18.5 DPS - Gnomeregan: Dark Iron Ambassador",
              "faction": "both",
              "dps": "17.93 DPS",
              "speed": "2.90",
              "weaponType": "Gun",
              "quality": "q3",
              "iLvl": 35,
              "stats": "Equip: +12 Attack Power.",
              "lines": [
                "Binds when picked up",
                "Ranged\tGun",
                "36 - 68 Damage\tSpeed 2.90",
                "(17.9 damage per second)",
                "Equip: +12 Attack Power.",
                "Requires Level 30"
              ],
              "reqLevel": 30,
              "icon": "inv_weapon_rifle_02"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 43,
          "stats": "+4 Strength, +4 Agility",
          "lines": [
            "Binds when picked up",
            "Ranged\tGun",
            "35 - 66 Damage\tSpeed 2.60",
            "(19.4 damage per second)",
            "+4 Strength",
            "+4 Agility"
          ],
          "reqLevel": 28
        },
        {
          "levelBracket": "31–34",
          "itemId": 274293,
          "name": "Spellsever Crossbow",
          "icon": "inv_weapon_crossbow_07",
          "weaponType": "Crossbow",
          "speed": "2.40",
          "dps": "20.8 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Arcanist Doan",
            "detail": "Scarlet Monastery Library"
          },
          "alts": [
            {
              "name": "Master Hunter's Rifle",
              "itemId": 17687,
              "value": "20.9 DPS - Big Game Hunter quest gun",
              "faction": "both",
              "dps": "19.42 DPS",
              "speed": "2.60",
              "weaponType": "Gun",
              "quality": "q2",
              "iLvl": 43,
              "stats": "+4 Strength, +4 Agility",
              "lines": [
                "Binds when picked up",
                "Ranged\tGun",
                "35 - 66 Damage\tSpeed 2.60",
                "(19.4 damage per second)",
                "+4 Strength",
                "+4 Agility"
              ],
              "reqLevel": 28,
              "icon": "inv_weapon_rifle_06"
            },
            {
              "name": "Crystalpine Stinger",
              "itemId": 13037,
              "value": "21.0 DPS, 2.60s - World drop BoE bow",
              "faction": "both",
              "dps": "15.89 DPS",
              "speed": "2.80",
              "weaponType": "Crossbow",
              "quality": "q3",
              "iLvl": 32,
              "stats": "+4 Agility, +4 Intellect",
              "lines": [
                "Binds when equipped",
                "Ranged\tCrossbow",
                "35 - 54 Damage\tSpeed 2.80",
                "(15.9 damage per second)",
                "+4 Agility",
                "+4 Intellect",
                "Requires Level 27"
              ],
              "reqLevel": 27,
              "icon": "inv_weapon_crossbow_04"
            },
            {
              "name": "Mithril Blunderbuss",
              "itemId": 10508,
              "value": "17.9 DPS - Engineering (175)",
              "faction": "both",
              "dps": "17.9 DPS",
              "quality": "q3",
              "iLvl": 36,
              "reqLevel": 30,
              "stats": "",
              "icon": "inv_weapon_rifle_07",
              "weaponType": "Gun"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 39,
          "reqLevel": 34,
          "stats": ""
        },
        {
          "levelBracket": "35–38",
          "itemId": 17687,
          "name": "Master Hunter's Rifle",
          "icon": "inv_weapon_rifle_06",
          "weaponType": "Gun",
          "speed": "2.60",
          "dps": "20.9 DPS",
          "source": {
            "kind": "quest",
            "title": "Big Game Hunter",
            "detail": "Outstanding weapon coefficient carries through 40"
          },
          "alts": [
            {
              "name": "Bow of Searing Arrows",
              "itemId": 2825,
              "weaponType": "Bow",
              "quality": "q4",
              "iLvl": 42,
              "reqLevel": 37,
              "dps": "28.3 DPS",
              "speed": "2.70",
              "stats": "Chance on hit: Shoots a Searing Arrow for 60 Fire damage",
              "icon": "inv_weapon_bow_08",
              "value": "World Drop Epic Bow"
            },
            {
              "name": "Chesterfall Musket",
              "itemId": 7729,
              "value": "20.9 DPS, 2.50s - SM Graveyard rare trash drop",
              "faction": "both",
              "dps": "16.52 DPS",
              "speed": "2.30",
              "weaponType": "Gun",
              "quality": "q3",
              "iLvl": 33,
              "stats": "+6 Stamina",
              "lines": [
                "Binds when equipped",
                "Ranged\tGun",
                "26 - 50 Damage\tSpeed 2.30",
                "(16.5 damage per second)",
                "+6 Stamina",
                "Requires Level 28"
              ],
              "reqLevel": 28,
              "icon": "inv_weapon_rifle_06"
            },
            {
              "name": "Blasting Hackbut",
              "itemId": 6798,
              "value": "21.0 DPS - Horde Quest: Questioning Reethe",
              "faction": "horde",
              "dps": "21.0 DPS",
              "quality": "q2",
              "iLvl": 37,
              "stats": "+3 Agility, +4 Stamina",
              "lines": [
                "Binds when picked up",
                "Ranged\tGun",
                "30 - 56 Damage\tSpeed 2.80",
                "(15.4 damage per second)",
                "+3 Agility",
                "+4 Stamina"
              ],
              "reqLevel": 34,
              "icon": "inv_weapon_rifle_04",
              "weaponType": "Gun"
            },
            {
              "name": "Mithril Blunderbuss",
              "itemId": 10508,
              "value": "17.9 DPS - Engineering (175)",
              "faction": "both",
              "dps": "17.9 DPS",
              "quality": "q3",
              "iLvl": 40,
              "reqLevel": 34,
              "stats": "",
              "icon": "inv_weapon_rifle_07",
              "weaponType": "Gun"
            },
            {
              "name": "Siegebreaker's Blaster",
              "itemId": 282561,
              "weaponType": "Gun",
              "speed": "2.60",
              "dps": "22.3 DPS",
              "value": "22.3 DPS, 2.60s - Custom Gun Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 42,
              "reqLevel": 37,
              "stats": "",
              "icon": "inv_weapon_rifle_04"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 43,
          "stats": "+4 Strength, +4 Agility",
          "lines": [
            "Binds when picked up",
            "Ranged\tGun",
            "35 - 66 Damage\tSpeed 2.60",
            "(19.4 damage per second)",
            "+4 Strength",
            "+4 Agility"
          ],
          "reqLevel": 28
        },
        {
          "levelBracket": "39–42",
          "itemId": 10510,
          "name": "Mithril Heavy-bore Rifle",
          "icon": "inv_weapon_rifle_07",
          "weaponType": "Gun",
          "speed": "2.90",
          "dps": "23.4 DPS",
          "source": {
            "kind": "craft",
            "title": "Engineering (200)",
            "detail": "High top-end damage for Aimed Shot (+6 Agi)"
          },
          "alts": [
            {
              "name": "Shrapnel Blaster",
              "itemId": 4127,
              "value": "22.8 DPS - Alliance Quest: Colonel Kurzen",
              "faction": "alliance",
              "dps": "22.8 DPS",
              "quality": "q2",
              "iLvl": 40,
              "stats": "+4 Agility, +3 Intellect",
              "lines": [
                "Binds when picked up",
                "Ranged\tGun",
                "23 - 43 Damage\tSpeed 1.90",
                "(17.4 damage per second)",
                "+4 Agility",
                "+3 Intellect"
              ],
              "reqLevel": 38,
              "icon": "inv_weapon_rifle_02",
              "weaponType": "Gun"
            },
            {
              "name": "Ironweaver",
              "itemId": 13137,
              "value": "23.2 DPS - World drop BoE crossbow",
              "faction": "both",
              "dps": "17.31 DPS",
              "speed": "2.60",
              "weaponType": "Gun",
              "quality": "q3",
              "iLvl": 34,
              "stats": "+4 Stamina, Equip: Increased Defense +3.",
              "lines": [
                "Binds when equipped",
                "Ranged\tGun",
                "31 - 59 Damage\tSpeed 2.60",
                "(17.3 damage per second)",
                "+4 Stamina",
                "Equip: Increased Defense +3.",
                "Requires Level 29"
              ],
              "reqLevel": 29,
              "icon": "inv_weapon_rifle_08"
            },
            {
              "name": "Truthseeker's Bow",
              "itemId": 277254,
              "weaponType": "Bow",
              "speed": "2.80",
              "dps": "23.8 DPS",
              "value": "23.8 DPS, 2.80s - Tanaris Quest",
              "faction": "both",
              "quality": "q3",
              "iLvl": 45,
              "reqLevel": 40,
              "stats": "",
              "icon": "inv_weapon_bow_01"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 44,
          "reqLevel": 38,
          "stats": "+6 Agi"
        },
        {
          "levelBracket": "43–46",
          "itemId": 277254,
          "name": "Truthseeker's Bow",
          "icon": "inv_weapon_bow_01",
          "weaponType": "Bow",
          "speed": "2.50",
          "dps": "23.8 DPS",
          "source": {
            "kind": "quest",
            "title": "Greater Friend of the Library",
            "detail": "Custom WoW Forever Library completion reward"
          },
          "alts": [
            {
              "name": "Gryphonwing Bow",
              "itemId": 10633,
              "value": "24.5 DPS, 2.60s - Hinterlands quest reward",
              "faction": "both",
              "dps": "24.5 DPS",
              "speed": "2.60",
              "quality": "q3",
              "iLvl": 48,
              "reqLevel": 42,
              "stats": "",
              "icon": "inv_weapon_bow_07"
            },
            {
              "name": "Riphook",
              "itemId": 13038,
              "value": "25.0 DPS - World drop BoE bow",
              "faction": "both",
              "dps": "21.25 DPS",
              "speed": "2.00",
              "weaponType": "Crossbow",
              "quality": "q3",
              "iLvl": 40,
              "reqLevel": 35,
              "stats": "",
              "icon": "inv_weapon_crossbow_04"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 45,
          "reqLevel": 40,
          "stats": ""
        },
        {
          "levelBracket": "47–52",
          "itemId": 17717,
          "name": "Megashot Rifle",
          "icon": "inv_weapon_rifle_05",
          "weaponType": "Gun",
          "speed": "2.90",
          "dps": "27.4 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Tinkerer Gizlock",
            "detail": "Maraudon (+8 Agi, heavy Aimed Shot burst)"
          },
          "alts": [
            {
              "name": "Thorium Rifle",
              "itemId": 15995,
              "value": "28.0 DPS, 2.50s, +17 RAP - Engineering (235)",
              "faction": "both",
              "dps": "28.0 DPS",
              "speed": "2.50",
              "quality": "q3",
              "iLvl": 52,
              "reqLevel": 46,
              "stats": "",
              "icon": "inv_weapon_rifle_04",
              "weaponType": "Gun"
            },
            {
              "name": "Dark Iron Rifle",
              "itemId": 16004,
              "value": "29.5 DPS - Engineering (255)",
              "faction": "both",
              "dps": "28.33 DPS",
              "speed": "2.70",
              "weaponType": "Gun",
              "quality": "q3",
              "iLvl": 55,
              "reqLevel": 50,
              "stats": "",
              "icon": "inv_weapon_rifle_08"
            },
            {
              "name": "Hurricane",
              "itemId": 2824,
              "weaponType": "Bow",
              "quality": "q4",
              "iLvl": 53,
              "reqLevel": 48,
              "dps": "34.4 DPS",
              "speed": "1.60",
              "stats": "Chance on hit: Shoots a Frostbolt for 30 Frost damage",
              "icon": "inv_weapon_bow_06",
              "value": "World Drop Epic Bow (1.60 Ultra-Fast Speed)"
            },
            {
              "name": "Bloodseeker",
              "itemId": 19107,
              "weaponType": "Crossbow",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 51,
              "dps": "41.5 DPS",
              "speed": "3.30",
              "stats": "+8 Strength, +7 Agility",
              "icon": "inv_weapon_crossbow_07",
              "value": "Alterac Valley Quest: The Hero of the Stormpike / Korrak"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 52,
          "reqLevel": 46,
          "stats": "+8 Agi, heavy Aimed Shot burst"
        },
        {
          "levelBracket": "53–60",
          "itemId": 12651,
          "name": "Blackcrow",
          "icon": "inv_weapon_crossbow_04",
          "weaponType": "Crossbow",
          "speed": "3.20",
          "dps": "30.3 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Shadow Hunter Vosh'gajin",
            "detail": "Lower Blackrock Spire (+3 Hit)"
          },
          "alts": [
            {
              "name": "Rhok'delar, Longbow of the Ancient Keepers",
              "itemId": 18713,
              "weaponType": "Bow",
              "quality": "q4",
              "iLvl": 75,
              "reqLevel": 60,
              "dps": "44.0 DPS",
              "speed": "2.90",
              "stats": "+17 Ranged Attack Power, +1% Critical Strike",
              "icon": "inv_weapon_bow_01",
              "value": "Hunter Epic Class Quest — Ancient Petrified Leaf"
            },
            {
              "name": "Ancient Bone Bow",
              "itemId": 18680,
              "value": "31.4 DPS, 2.80s, +11 Agi - Scholomance: Rattlegore",
              "faction": "both",
              "dps": "31.4 DPS",
              "speed": "2.80",
              "quality": "q3",
              "iLvl": 58,
              "reqLevel": 52,
              "stats": "+11 Agi",
              "icon": "inv_weapon_bow_08"
            },
            {
              "name": "Flawless Arcanite Rifle",
              "itemId": 16007,
              "value": "31.0 DPS, +10 RAP - Engineering (275)",
              "faction": "both",
              "dps": "31.17 DPS",
              "speed": "3.00",
              "weaponType": "Gun",
              "quality": "q3",
              "iLvl": 61,
              "reqLevel": 56,
              "stats": "+9 Stamina",
              "icon": "inv_weapon_rifle_03"
            },
            {
              "name": "Core Marksman Rifle",
              "itemId": 18282,
              "value": "35.0 DPS - Molten Core",
              "faction": "both",
              "dps": "36.8 DPS",
              "speed": "2.50",
              "weaponType": "Gun",
              "quality": "q4",
              "iLvl": 65,
              "reqLevel": 60,
              "stats": "+10 Hit Rating",
              "icon": "inv_weapon_rifle_05"
            },
            {
              "name": "Reaver's Repeater",
              "itemId": 282029,
              "weaponType": "Gun",
              "speed": "2.70",
              "dps": "27.0 DPS",
              "value": "27.0 DPS, 2.70s - Custom Gun Drop",
              "faction": "both",
              "quality": "q2",
              "iLvl": 58,
              "reqLevel": 53,
              "stats": "",
              "icon": "inv_weapon_rifle_07"
            },
            {
              "name": "Dwarven Hand Cannon",
              "itemId": 2099,
              "weaponType": "Gun",
              "quality": "q4",
              "iLvl": 58,
              "reqLevel": 53,
              "dps": "39.5 DPS",
              "speed": "2.90",
              "stats": "Chance on hit: Shoots a Ball of Fire for 140 to 180 Fire damage",
              "icon": "inv_weapon_rifle_01",
              "value": "World Drop Epic Gun"
            },
            {
              "name": "Carapace Spine Crossbow",
              "itemId": 18738,
              "weaponType": "Crossbow",
              "quality": "q3",
              "iLvl": 61,
              "reqLevel": 56,
              "dps": "41.5 DPS",
              "speed": "3.30",
              "stats": "+9 Agility, +4 Stamina",
              "icon": "inv_weapon_crossbow_01",
              "value": "Stratholme — Nerub'enkan"
            },
            {
              "name": "Lok'delar, Stave of the Ancient Keepers",
              "itemId": 20487,
              "weaponType": "Staff",
              "quality": "q4",
              "iLvl": 75,
              "reqLevel": 60,
              "dps": "53.9 DPS",
              "speed": "3.20",
              "stats": "+15 Stamina, +10 Intellect, +2% Critical Strike, +10 Nature Res",
              "icon": "inv_staff_01",
              "value": "Hunter Epic Class Quest (BiS Hunter Melee Stat-Stick)"
            },
            {
              "name": "Barbarous Blade",
              "itemId": 18520,
              "weaponType": "Two-handed sword",
              "quality": "q3",
              "iLvl": 61,
              "reqLevel": 56,
              "dps": "50.8 DPS",
              "speed": "3.20",
              "stats": "+60 Attack Power, +1% Critical Strike",
              "icon": "inv_sword_39",
              "value": "Dire Maul North — King Gordok"
            },
            {
              "name": "Ice Barbed Spear",
              "itemId": 19106,
              "weaponType": "Polearm",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 51,
              "dps": "53.9 DPS",
              "speed": "3.60",
              "stats": "+21 Agility, +13 Stamina (Incredible Hunter Stat-Stick)",
              "icon": "inv_spear_06",
              "value": "Alterac Valley Quest: The Hero of the Stormpike"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 59,
          "reqLevel": 54,
          "stats": "+3 Hit"
        }
      ]
    },
    "rogue": {
      "classId": "rogue",
      "tracks": [
        {
          "id": "primary",
          "name": "One-Handed & Daggers (Combat / Subtlety)"
        }
      ],
      "levels": [
        {
          "levelBracket": "1–2",
          "itemId": 2092,
          "name": "Worn Dagger",
          "icon": "inv_weapon_shortblade_05",
          "weaponType": "Dagger",
          "speed": "1.50",
          "dps": "1.6 DPS",
          "source": {
            "kind": "vendor",
            "title": "Starter Dagger",
            "detail": "Equipped by all starter rogues"
          },
          "alts": [
            {
              "name": "Small Knife",
              "itemId": 2484,
              "value": "1.8 DPS - Starter vendor dagger",
              "faction": "both",
              "dps": "3.33 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q1",
              "iLvl": 8,
              "reqLevel": 3,
              "stats": "",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Worn Shortsword",
              "itemId": 25,
              "value": "1.7 DPS - Starter sword",
              "faction": "both",
              "dps": "1.7 DPS",
              "quality": "q2",
              "iLvl": 6,
              "reqLevel": 1,
              "stats": "",
              "icon": "inv_sword_04",
              "weaponType": "One-Handed Sword"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 6,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "3–4",
          "itemId": 2484,
          "name": "Small Knife",
          "icon": "inv_weapon_shortblade_05",
          "weaponType": "Dagger",
          "speed": "1.40",
          "dps": "1.8 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Purchased in starting hub towns"
          },
          "alts": [
            {
              "name": "Carving Knife",
              "itemId": 2140,
              "value": "2.5 DPS, 1.70s - Starter Vendor Dagger",
              "faction": "both",
              "dps": "2.5 DPS",
              "speed": "1.70",
              "weaponType": "Dagger",
              "quality": "q1",
              "iLvl": 8,
              "reqLevel": 3,
              "stats": "",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Copper Shortsword",
              "itemId": 2847,
              "value": "4.0 DPS - Blacksmithing (20)",
              "faction": "both",
              "dps": "5.4 DPS",
              "speed": "2.50",
              "weaponType": "One-handed sword",
              "quality": "q2",
              "iLvl": 10,
              "reqLevel": 4,
              "stats": "+1 Strength",
              "icon": "inv_sword_26"
            },
            {
              "name": "Forsaken Shortsword",
              "itemId": 3267,
              "value": "3.0 DPS, 2.10s - Tirisfal Quest: The Scarlet Crusade",
              "faction": "horde",
              "dps": "3.0 DPS",
              "speed": "2.10",
              "quality": "q2",
              "iLvl": 8,
              "reqLevel": 2,
              "stats": "",
              "icon": "inv_sword_04",
              "weaponType": "One-Handed Sword"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 8,
          "reqLevel": 3,
          "stats": ""
        },
        {
          "levelBracket": "5–6",
          "itemId": 7166,
          "name": "Copper Dagger",
          "icon": "inv_weapon_shortblade_14",
          "weaponType": "Dagger",
          "speed": "1.60",
          "dps": "5.9 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (25)",
            "detail": "Crafted spike or auction house purchase"
          },
          "alts": [
            {
              "name": "Copper Shortsword",
              "itemId": 2847,
              "value": "4.0 DPS - Blacksmithing (20)",
              "faction": "both",
              "dps": "5.4 DPS",
              "speed": "2.50",
              "weaponType": "One-handed sword",
              "quality": "q2",
              "iLvl": 10,
              "reqLevel": 4,
              "stats": "+1 Strength",
              "icon": "inv_sword_26"
            },
            {
              "name": "Stiletto",
              "itemId": 2494,
              "value": "4.8 DPS - Fast 1.50s vendor dagger",
              "faction": "both",
              "dps": "3.33 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q1",
              "iLvl": 8,
              "reqLevel": 3,
              "stats": "",
              "icon": "inv_throwingaxe_03"
            },
            {
              "name": "Forsaken Shortsword",
              "itemId": 3267,
              "value": "3.0 DPS - Tirisfal Quest: The Scarlet Crusade",
              "faction": "horde",
              "dps": "3.0 DPS",
              "quality": "q2",
              "iLvl": 10,
              "reqLevel": 4,
              "stats": "",
              "icon": "inv_sword_04",
              "weaponType": "One-Handed Sword"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 11,
          "reqLevel": 6,
          "stats": "+1 Agility"
        },
        {
          "levelBracket": "7–8",
          "itemId": 248007,
          "name": "Militia Shortblade",
          "icon": "inv_weapon_shortblade_15",
          "weaponType": "One-handed sword",
          "speed": "1.80",
          "dps": "6.5 DPS",
          "source": {
            "kind": "quest",
            "title": "Rare Books / Kobold Camp",
            "detail": "Early quest reward in starting zones"
          },
          "alts": [
            {
              "name": "Pristine Orcish Dagger",
              "itemId": 286730,
              "value": "6.25 DPS, 2.40s - Horde Starter Dagger",
              "faction": "horde",
              "dps": "6.25 DPS",
              "speed": "2.40",
              "weaponType": "Dagger",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 10,
              "stats": "+1 Agility",
              "icon": "inv_weapon_shortblade_14"
            },
            {
              "name": "Helm Splitter",
              "itemId": 286755,
              "value": "6.88 DPS, 2.40s (+1 Str) - Uncommon 1H Sword",
              "faction": "both",
              "dps": "6.88 DPS",
              "speed": "2.40",
              "weaponType": "One-Handed Sword",
              "quality": "q2",
              "iLvl": 13,
              "reqLevel": 8,
              "stats": "+1 Strength",
              "icon": "inv_sword_04"
            },
            {
              "name": "Scrappy Dagger",
              "itemId": 250601,
              "value": "5.5 DPS - Early quest",
              "faction": "both",
              "dps": "5.5 DPS",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 6,
              "stats": "",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Stiletto",
              "itemId": 2494,
              "value": "4.8 DPS - Fast vendor dagger",
              "faction": "both",
              "dps": "3.33 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q1",
              "iLvl": 8,
              "reqLevel": 3,
              "stats": "",
              "icon": "inv_throwingaxe_03"
            }
          ],
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 12,
          "reqLevel": 6,
          "stats": ""
        },
        {
          "levelBracket": "9–10",
          "itemId": 7298,
          "name": "Blade of Cunning",
          "icon": "inv_weapon_shortblade_26",
          "weaponType": "Dagger",
          "speed": "1.60",
          "dps": "6.8 DPS",
          "source": {
            "kind": "quest",
            "title": "Snatch and Grab",
            "detail": "Level 10 Rogue class quest reward (+2 Agi)"
          },
          "alts": [
            {
              "name": "Thief's Blade",
              "itemId": 5192,
              "value": "7.2 DPS, 1.70s - Vendor dagger",
              "faction": "both",
              "dps": "14.41 DPS",
              "speed": "1.70",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 22,
              "reqLevel": 17,
              "stats": "+4 Agility",
              "icon": "inv_wand_06"
            },
            {
              "name": "Cutlass",
              "itemId": 851,
              "value": "7.7 DPS, 2.00s - 1H vendor sword",
              "faction": "both",
              "dps": "6.82 DPS",
              "speed": "2.20",
              "weaponType": "One-handed sword",
              "quality": "q1",
              "iLvl": 15,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_mace_11"
            },
            {
              "name": "Pristine Orcish Dagger",
              "itemId": 286730,
              "value": "6.25 DPS - Durotar Quest: Threat from Below",
              "faction": "horde",
              "dps": "6.25 DPS",
              "speed": "2.40",
              "weaponType": "Dagger",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_weapon_shortblade_14"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 13,
          "reqLevel": 10,
          "stats": "+2 Agi"
        },
        {
          "levelBracket": "11–12",
          "itemId": 2207,
          "name": "Jambiya",
          "icon": "inv_sword_32",
          "weaponType": "Dagger",
          "speed": "1.60",
          "dps": "8.4 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Sold in Redridge, Loch Modan, Crossroads, and Auberdine"
          },
          "alts": [
            {
              "name": "Cutlass",
              "itemId": 851,
              "value": "7.7 DPS, 2.00s - 1H vendor sword",
              "faction": "both",
              "dps": "6.82 DPS",
              "speed": "2.20",
              "weaponType": "One-handed sword",
              "quality": "q1",
              "iLvl": 15,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_mace_11"
            },
            {
              "name": "Trogg Scepter",
              "itemId": 272996,
              "value": "8.1 DPS, 2.40s - RFC: Oggleflint 1H mace",
              "faction": "both",
              "dps": "8.13 DPS",
              "speed": "2.40",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 18,
              "stats": "+4 Spirit, Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tMace",
                "13 - 26 Damage\tSpeed 2.40",
                "(8.1 damage per second)",
                "+4 Spirit",
                "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
                "Requires Level 13"
              ],
              "reqLevel": 13,
              "icon": "inv_misc_bone_10"
            },
            {
              "name": "Deathstalker Shortsword",
              "itemId": 3455,
              "value": "7.5 DPS, 2.20s - Silverpine Quest: Escorting Erland",
              "faction": "horde",
              "dps": "7.5 DPS",
              "speed": "2.20",
              "quality": "q2",
              "iLvl": 16,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_sword_15",
              "weaponType": "One-Handed Sword"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 16,
          "reqLevel": 11,
          "stats": ""
        },
        {
          "levelBracket": "13–14",
          "itemId": 271095,
          "name": "Fang of Magmatus",
          "icon": "inv_weapon_shortblade_05",
          "weaponType": "Main Hand Dagger",
          "speed": "1.60",
          "dps": "11.8 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Magmatus",
            "detail": "Hall of Thanes dungeon, levels 13–18 (+2 Agi, +2 Fire SP)"
          },
          "alts": [
            {
              "name": "Poniard",
              "itemId": 2208,
              "value": "9.6 DPS - Vendor fast dagger",
              "faction": "both",
              "dps": "8.46 DPS",
              "speed": "1.30",
              "weaponType": "Dagger",
              "quality": "q1",
              "iLvl": 19,
              "reqLevel": 14,
              "stats": "",
              "icon": "inv_sword_12"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Bone Knuckles",
              "itemId": 272998,
              "weaponType": "Fist Weapon",
              "speed": "2.00",
              "dps": "12.3 DPS",
              "value": "12.3 DPS, 2.00s - RFC Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "",
              "icon": "ability_whirlwind"
            },
            {
              "name": "Searing Dagger",
              "itemId": 273003,
              "weaponType": "Dagger",
              "speed": "1.60",
              "dps": "8.1 DPS",
              "value": "8.1 DPS, 1.60s - RFC Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "",
              "icon": "inv_weapon_shortblade_03"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 18,
          "reqLevel": 13,
          "stats": "+2 Agi, +2 Fire SP"
        },
        {
          "levelBracket": "15–16",
          "itemId": 271204,
          "name": "Meathook Slicer",
          "icon": "inv_weapon_shortblade_02",
          "weaponType": "Dagger",
          "speed": "1.50",
          "dps": "13.2 DPS",
          "source": {
            "kind": "dungeon",
            "title": "The Baron",
            "detail": "Ruins of Lordaeron, levels 15–20 (+3 Agi, +2 Sta)"
          },
          "alts": [
            {
              "name": "Vileblood Scimitar",
              "itemId": 271218,
              "value": "14.62 DPS, 2.60s - Viktor the Vile in Ruins of Lordaeron",
              "faction": "both",
              "dps": "14.62 DPS",
              "speed": "2.60",
              "weaponType": "One-Handed Sword",
              "quality": "q3",
              "iLvl": 22,
              "reqLevel": 17,
              "stats": "+5 Spirit",
              "icon": "inv_sword_01"
            },
            {
              "name": "Plaguefang",
              "itemId": 279876,
              "value": "12.38 DPS, 2.10s - The New Plague quest in Ruins of Lordaeron",
              "faction": "horde",
              "dps": "12.38 DPS",
              "speed": "2.10",
              "weaponType": "One-Handed Sword",
              "quality": "q2",
              "iLvl": 24,
              "reqLevel": 16,
              "stats": "",
              "icon": "inv_sword_05"
            },
            {
              "name": "Tail Spike",
              "itemId": 6448,
              "value": "11.9 DPS, 1.50s - Wailing Caverns: Skum",
              "faction": "both",
              "dps": "13.89 DPS",
              "speed": "1.80",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 21,
              "reqLevel": 16,
              "stats": "+3 Strength, +3 Agility",
              "icon": "inv_weapon_shortblade_10"
            },
            {
              "name": "Big Bronze Knife",
              "itemId": 3848,
              "value": "11.6 DPS - Blacksmithing (75)",
              "faction": "both",
              "dps": "10 DPS",
              "speed": "1.90",
              "weaponType": "Dagger",
              "quality": "q2",
              "iLvl": 20,
              "reqLevel": 15,
              "stats": "",
              "icon": "inv_weapon_shortblade_04"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 20,
          "reqLevel": 15,
          "stats": "+3 Agi, +2 Sta"
        },
        {
          "levelBracket": "17–18",
          "itemId": 271218,
          "name": "Vileblood Scimitar",
          "icon": "inv_sword_01",
          "weaponType": "One-handed sword",
          "speed": "2.20",
          "dps": "15.0 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Viktor the Vile",
            "detail": "Ruins of Lordaeron (+4 Str, +3 Sta)"
          },
          "alts": [
            {
              "name": "Cruel Barb",
              "itemId": 5191,
              "value": "16.8 DPS, 2.80s - The Deadmines: Edwin VanCleef",
              "faction": "both",
              "dps": "15.54 DPS",
              "speed": "2.80",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 19,
              "stats": "",
              "icon": "inv_sword_04"
            },
            {
              "name": "Pearl-handled Dagger",
              "itemId": 5540,
              "value": "14.2 DPS, 1.70s - BFD: Gelihast",
              "faction": "both",
              "dps": "11.47 DPS",
              "speed": "1.70",
              "weaponType": "Dagger",
              "quality": "q2",
              "iLvl": 23,
              "reqLevel": 18,
              "stats": "",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Whipfang's Skinsearer",
              "itemId": 284386,
              "weaponType": "Dagger",
              "speed": "1.70",
              "dps": "15.6 DPS",
              "value": "15.6 DPS, 1.70s - Barrens Rare",
              "faction": "both",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 19,
              "stats": "",
              "icon": "inv_weapon_shortblade_24"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 22,
          "reqLevel": 17,
          "stats": "+4 Str, +3 Sta"
        },
        {
          "levelBracket": "19–20",
          "itemId": 279876,
          "name": "Plaguefang",
          "icon": "inv_sword_05",
          "weaponType": "One-handed sword",
          "speed": "1.60",
          "dps": "16.2 DPS",
          "source": {
            "kind": "quest",
            "title": "The New Plague",
            "detail": "Ruins of Lordaeron quest (+4 Agi, +3 Sta)"
          },
          "alts": [
            {
              "name": "Cruel Barb",
              "itemId": 5191,
              "value": "16.8 DPS, 2.80s - Deadmines: Edwin VanCleef",
              "faction": "both",
              "dps": "15.54 DPS",
              "speed": "2.80",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 19,
              "stats": "",
              "icon": "inv_sword_04"
            },
            {
              "name": "Wingblade",
              "itemId": 6504,
              "value": "15.8 DPS, 2.20s - WC Quest: Leaders of the Fang",
              "faction": "horde",
              "dps": "15.68 DPS",
              "speed": "2.20",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_sword_16"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 24,
          "reqLevel": 16,
          "stats": "+4 Agi, +3 Sta"
        },
        {
          "levelBracket": "21–22",
          "itemId": 3490,
          "name": "Deadly Bronze Poniard",
          "icon": "inv_weapon_shortblade_05",
          "weaponType": "Dagger",
          "speed": "1.60",
          "dps": "12.8 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (100)",
            "detail": "Crafted fast off-hand poison applicator"
          },
          "alts": [
            {
              "name": "Subdued Dragon's Fang",
              "itemId": 281314,
              "value": "20.6 DPS, 1.70s, +7 Agi - Wetlands Quest: Stopping the Cycle",
              "faction": "both",
              "dps": "20.59 DPS",
              "speed": "1.70",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 32,
              "stats": "+7 Agility, +2 Stamina",
              "lines": [
                "Binds when picked up",
                "One-Hand\tDagger",
                "24 - 46 Damage\tSpeed 1.70",
                "(20.6 damage per second)",
                "+7 Agility",
                "+2 Stamina"
              ],
              "reqLevel": 24,
              "icon": "inv_weapon_shortblade_01"
            },
            {
              "name": "Bronze Shortsword",
              "itemId": 2850,
              "value": "12.4 DPS - Blacksmithing (105)",
              "faction": "both",
              "dps": "12.2 DPS",
              "speed": "2.50",
              "weaponType": "One-handed sword",
              "quality": "q2",
              "iLvl": 24,
              "reqLevel": 19,
              "stats": "+3 Agility",
              "icon": "inv_sword_04"
            },
            {
              "name": "Blade of Silverlaine",
              "itemId": 273637,
              "weaponType": "One-handed sword",
              "speed": "2.30",
              "dps": "10.9 DPS",
              "value": "10.9 DPS, 2.30s - SFK Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 26,
              "reqLevel": 21,
              "stats": "",
              "icon": "inv_sword_05"
            },
            {
              "name": "Alliance Outrunner's Sword",
              "itemId": 285346,
              "weaponType": "One-handed sword",
              "speed": "2.10",
              "dps": "17.1 DPS",
              "value": "17.1 DPS, 2.10s - Alliance Drop",
              "faction": "alliance",
              "quality": "q3",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "",
              "icon": "inv_sword_20"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 25,
          "reqLevel": 20,
          "stats": ""
        },
        {
          "levelBracket": "23–24",
          "itemId": 6220,
          "name": "Meteor Shard",
          "icon": "inv_weapon_shortblade_25",
          "weaponType": "Dagger",
          "speed": "1.80",
          "dps": "17.8 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Archmage Arugal",
            "detail": "Shadowfang Keep (35 Fire damage proc)"
          },
          "alts": [
            {
              "name": "Ruby-Adorned Blade",
              "itemId": 277246,
              "value": "23.91 DPS, 2.30s - The Eye of Bhossca quest",
              "faction": "both",
              "dps": "23.91 DPS",
              "speed": "2.30",
              "weaponType": "One-Handed Sword",
              "quality": "q3",
              "iLvl": 36,
              "reqLevel": 25,
              "stats": "+3 Agility, +8 Stamina",
              "icon": "inv_sword_07"
            },
            {
              "name": "Serrated Raptor Claw",
              "itemId": 280805,
              "value": "17.19 DPS, 1.60s (+3 Agi) - Changing Tastes quest",
              "faction": "horde",
              "dps": "17.19 DPS",
              "speed": "1.60",
              "weaponType": "Dagger",
              "quality": "q2",
              "iLvl": 33,
              "reqLevel": 24,
              "stats": "+3 Agility",
              "icon": "inv_weapon_shortblade_16"
            },
            {
              "name": "Subdued Dragon's Fang",
              "itemId": 281314,
              "value": "20.59 DPS, 1.70s (+7 Agi, +2 Sta) - Stopping the Cycle quest",
              "faction": "alliance",
              "dps": "20.59 DPS",
              "speed": "1.70",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 32,
              "reqLevel": 24,
              "stats": "+7 Agility, +2 Stamina",
              "icon": "inv_weapon_shortblade_01"
            },
            {
              "name": "Odo's Claw",
              "itemId": 6323,
              "value": "17.0 DPS, 1.50s - SFK: Odo the Blindwatcher",
              "faction": "both",
              "dps": "16.67 DPS",
              "speed": "2.40",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 26,
              "reqLevel": 21,
              "stats": "+2 Strength, +3 Stamina",
              "icon": "inv_misc_monsterclaw_04"
            },
            {
              "name": "Iridescent Hammer",
              "itemId": 5541,
              "value": "15.6 DPS - BFD: Lady Sarevess",
              "faction": "both",
              "dps": "14.58 DPS",
              "speed": "2.40",
              "weaponType": "One-handed mace",
              "quality": "q2",
              "iLvl": 28,
              "reqLevel": 23,
              "stats": "",
              "icon": "inv_hammer_05"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 28,
          "reqLevel": 23,
          "stats": "+3 Fire Resistance"
        },
        {
          "levelBracket": "25–26",
          "itemId": 277246,
          "name": "Ruby-Adorned Blade",
          "icon": "inv_sword_07",
          "weaponType": "One-handed sword",
          "speed": "2.30",
          "dps": "23.9 DPS",
          "source": {
            "kind": "quest",
            "title": "The Eye of Bhossca",
            "detail": "Level 25 Rogue class quest in Scarlet Monastery (+3 Agi, +8 Sta, Rogue only!)"
          },
          "alts": [
            {
              "name": "Subdued Dragon's Fang",
              "itemId": 281314,
              "value": "20.6 DPS, 1.70s - Redridge Quest",
              "faction": "both",
              "dps": "20.6 DPS",
              "speed": "1.70",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 32,
              "stats": "+7 Agility, +2 Stamina",
              "lines": [
                "Binds when picked up",
                "One-Hand\tDagger",
                "24 - 46 Damage\tSpeed 1.70",
                "(20.6 damage per second)",
                "+7 Agility",
                "+2 Stamina"
              ],
              "reqLevel": 24,
              "icon": "inv_weapon_shortblade_01"
            },
            {
              "name": "Serrated Raptor Claw",
              "itemId": 280805,
              "value": "18.0 DPS, 1.60s - Quest: Changing Tastes",
              "faction": "both",
              "dps": "17.19 DPS",
              "speed": "1.60",
              "weaponType": "Dagger",
              "quality": "q2",
              "iLvl": 33,
              "reqLevel": 24,
              "stats": "",
              "icon": "inv_weapon_shortblade_16"
            },
            {
              "name": "Iron Fists",
              "itemId": 250604,
              "value": "17.5 DPS - Crafted fist weapon",
              "faction": "both",
              "dps": "16.25 DPS",
              "speed": "2.40",
              "weaponType": "Fist Weapon",
              "quality": "q2",
              "iLvl": 31,
              "reqLevel": 26,
              "stats": "",
              "icon": "inv_gauntlets_11"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 36,
          "stats": "+3 Agility, +8 Stamina",
          "lines": [
            "Binds when picked up",
            "One-Hand\tSword",
            "38 - 72 Damage\tSpeed 2.30",
            "(23.9 damage per second)",
            "+3 Agility",
            "+8 Stamina",
            "Classes: Rogue"
          ],
          "reqLevel": 25
        },
        {
          "levelBracket": "27–28",
          "itemId": 273053,
          "name": "Tendonscraper Dagger",
          "icon": "inv_misc_bone_06",
          "weaponType": "Main Hand Dagger",
          "speed": "1.60",
          "dps": "14.4 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Lyn the Ignored",
            "detail": "City of Dalaran (+5 Sta, +36 Spell Power)"
          },
          "alts": [
            {
              "name": "City Guard's Tarnished Blade",
              "itemId": 286996,
              "value": "22.40 DPS, 2.50s - Level 29 1H Sword",
              "faction": "both",
              "dps": "22.40 DPS",
              "speed": "2.50",
              "weaponType": "One-Handed Sword",
              "quality": "q3",
              "iLvl": 34,
              "reqLevel": 29,
              "stats": "+6 Stamina",
              "icon": "inv_sword_23"
            },
            {
              "name": "Toxic Revenger",
              "itemId": 9453,
              "value": "18.8 DPS, 2.20s - Gnomeregan: Viscous Fallout",
              "faction": "both",
              "dps": "20.53 DPS",
              "speed": "1.90",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 32,
              "stats": "Chance on hit: Deals 14 Nature damage every 3 sec to any enemy in an 8 yard radius around the caster for 12 sec.",
              "lines": [
                "Binds when picked up",
                "Unique-Equipped",
                "One-Hand\tDagger",
                "27 - 51 Damage\tSpeed 1.90",
                "(20.5 damage per second)",
                "Chance on hit: Deals 14 Nature damage every 3 sec to any enemy in an 8 yard radius around the caster for 12 sec.",
                "Requires Level 27"
              ],
              "reqLevel": 27,
              "icon": "inv_weapon_shortblade_02"
            },
            {
              "name": "Hardened Iron Shortsword",
              "itemId": 3849,
              "value": "19.5 DPS - Blacksmithing (130)",
              "faction": "both",
              "dps": "16.67 DPS",
              "speed": "1.80",
              "weaponType": "One-handed sword",
              "quality": "q2",
              "iLvl": 32,
              "reqLevel": 27,
              "stats": "",
              "icon": "inv_sword_20"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 33,
          "stats": "+5 Stamina, Equip: +8 Health Regeneration, Equip: +36 Spell Power",
          "lines": [
            "Binds when picked up",
            "Main Hand\tDagger",
            "16 - 30 Damage\tSpeed 1.60",
            "(14.4 damage per second)",
            "+5 Stamina",
            "Requires Level 28",
            "Equip: +8 Health Regeneration",
            "Equip: +36 Spell Power",
            "Sell Price: 73s 79c"
          ],
          "reqLevel": 28
        },
        {
          "levelBracket": "29–30",
          "itemId": 6681,
          "name": "Thornspike",
          "icon": "inv_weapon_shortblade_08",
          "weaponType": "Dagger",
          "speed": "2.00",
          "dps": "20.2 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Aggem Thorncurse",
            "detail": "Razorfen Kraul (+8 Attack Power)"
          },
          "alts": [
            {
              "name": "Swinetusk Shank",
              "itemId": 6691,
              "value": "18.5 DPS, 1.50s - RFK: Agathelos",
              "faction": "both",
              "dps": "15.33 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 35,
              "stats": "+6 Stamina, +4 Spirit, Equip: Increases damage and healing done by magical spells and effects by up to 40.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tDagger",
                "16 - 30 Damage\tSpeed 1.50",
                "(15.3 damage per second)",
                "+6 Stamina",
                "+4 Spirit",
                "Equip: Increases damage and healing done by magical spells and effects by up to 40.",
                "Requires Level 30"
              ],
              "reqLevel": 30,
              "icon": "inv_misc_bone_06"
            },
            {
              "name": "Zealot Blade",
              "itemId": 13033,
              "value": "20.4 DPS, 1.90s - World drop BoE sword",
              "faction": "both",
              "dps": "22.14 DPS",
              "speed": "2.80",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 34,
              "stats": "+5 Intellect, +6 Spirit",
              "lines": [
                "Binds when equipped",
                "One-Hand\tSword",
                "43 - 81 Damage\tSpeed 2.80",
                "(22.1 damage per second)",
                "+5 Intellect",
                "+6 Spirit",
                "Requires Level 29"
              ],
              "reqLevel": 29,
              "icon": "inv_sword_15"
            },
            {
              "name": "Swine Fists",
              "itemId": 6693,
              "weaponType": "Fist Weapon",
              "speed": "2.10",
              "dps": "20.3 DPS",
              "value": "20.3 DPS, 2.10s - RFK Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 34,
              "reqLevel": 28,
              "stats": "",
              "icon": "inv_misc_monsterclaw_02"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 32,
          "stats": "+8 Attack Power",
          "lines": [
            "Binds when picked up",
            "One-Hand\tDagger",
            "24 - 46 Damage\tSpeed 1.70",
            "(20.6 damage per second)",
            "Chance on hit: Hurl spikes at the target, dealing 45 Physical damage and jumping to 1 additional nearby enemy. Each jump reduces the damage by 50%.",
            "Requires Level 27"
          ],
          "reqLevel": 27
        },
        {
          "levelBracket": "31–34",
          "itemId": 4977,
          "name": "Sword of Hammerfall",
          "icon": "inv_sword_40",
          "weaponType": "One-handed sword",
          "speed": "2.60",
          "dps": "28.5 DPS",
          "source": {
            "kind": "quest",
            "title": "The Real Threat / Sword of Serenity",
            "detail": "Major quest reward (+9 Str, +4 Sta)"
          },
          "alts": [
            {
              "name": "Ironspine's Fist",
              "itemId": 7687,
              "value": "24.7 DPS, 2.70s - SM Graveyard: Ironspine",
              "faction": "both",
              "dps": "22.92 DPS",
              "speed": "2.40",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 35,
              "stats": "+7 Strength",
              "lines": [
                "Binds when picked up",
                "One-Hand\tMace",
                "38 - 72 Damage\tSpeed 2.40",
                "(22.9 damage per second)",
                "+7 Strength",
                "Requires Level 30"
              ],
              "reqLevel": 30,
              "icon": "inv_hammer_19"
            },
            {
              "name": "Bloody Brass Knuckles",
              "itemId": 7683,
              "value": "25.0 DPS, 2.30s - SM Graveyard: Azshir",
              "faction": "both",
              "dps": "21.88 DPS",
              "speed": "1.60",
              "weaponType": "Fist Weapon",
              "quality": "q3",
              "iLvl": 34,
              "stats": "Equip: +12 Attack Power., Equip: +15 Attack Power against Humanoids.",
              "lines": [
                "Binds when picked up",
                "One-Hand\tFist Weapon",
                "24 - 46 Damage\tSpeed 1.60",
                "(21.9 damage per second)",
                "Equip: +12 Attack Power.",
                "Equip: +15 Attack Power against Humanoids.",
                "Requires Level 29"
              ],
              "reqLevel": 29,
              "icon": "inv_gauntlets_11"
            }
          ],
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 41,
          "stats": "+4 Strength, +5 Stamina",
          "lines": [
            "Binds when picked up",
            "Main Hand\tSword",
            "37 - 69 Damage\tSpeed 2.30",
            "(23.0 damage per second)",
            "+4 Strength",
            "+5 Stamina"
          ],
          "reqLevel": 30
        },
        {
          "levelBracket": "35–38",
          "itemId": 6831,
          "name": "Black Menace",
          "icon": "inv_sword_13",
          "weaponType": "Dagger",
          "speed": "2.40",
          "dps": "29.7 DPS",
          "source": {
            "kind": "quest",
            "title": "In the Name of the Light / Compendium",
            "detail": "SM quest reward (+7 Agi, +3 Str)"
          },
          "alts": [
            {
              "name": "The Butcher",
              "itemId": 8226,
              "value": "28.6 DPS, 2.80s - World drop BoE sword",
              "faction": "both",
              "dps": "19.64 DPS",
              "speed": "2.80",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 31,
              "stats": "",
              "lines": [
                "Binds when picked up",
                "Main hand\tOne-Hand",
                "Requires Level 25"
              ],
              "reqLevel": 25,
              "icon": "inv_sword_18"
            },
            {
              "name": "Silent Hunter",
              "itemId": 9520,
              "value": "27.2 DPS, 1.70s - Maraudon/Quest",
              "faction": "both",
              "dps": "23.06 DPS",
              "speed": "1.80",
              "weaponType": "Dagger",
              "quality": "q2",
              "iLvl": 41,
              "stats": "+7 Agility",
              "lines": [
                "Binds when picked up",
                "One-Hand\tDagger",
                "29 - 54 Damage\tSpeed 1.80",
                "(23.1 damage per second)",
                "+7 Agility"
              ],
              "reqLevel": 30,
              "icon": "inv_weapon_shortblade_18"
            },
            {
              "name": "Mithril Shortsword",
              "itemId": 250607,
              "value": "26.5 DPS - Blacksmithing (170)",
              "faction": "both",
              "dps": "26.5 DPS",
              "quality": "q3",
              "iLvl": 40,
              "reqLevel": 34,
              "stats": "",
              "icon": "inv_weapon_shortblade_05",
              "weaponType": "Dagger"
            },
            {
              "name": "Sword of Omen",
              "itemId": 6802,
              "value": "29.7 DPS, 2.20s, +9 Str, +4 Sta, +3 Agi - Horde SM Quest: Into The Scarlet Monastery",
              "faction": "horde",
              "dps": "29.7 DPS",
              "speed": "2.20",
              "quality": "q3",
              "iLvl": 40,
              "reqLevel": 34,
              "stats": "+9 Str, +4 Sta, +3 Agi",
              "icon": "inv_sword_24"
            },
            {
              "name": "Sword of Serenity",
              "itemId": 6829,
              "value": "30.0 DPS, 2.20s, +9 Sta, +4 Spi - Alliance SM Quest: In the Name of the Light",
              "faction": "alliance",
              "dps": "30 DPS",
              "speed": "2.20",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 44,
              "reqLevel": 34,
              "stats": "+9 Sta, +4 Spi",
              "icon": "inv_sword_05"
            }
          ],
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 44,
          "reqLevel": 34,
          "stats": "+7 Agi, +3 Str"
        },
        {
          "levelBracket": "39–44",
          "itemId": 9467,
          "name": "Gahz'rilla Fang",
          "icon": "inv_misc_monsterfang_01",
          "weaponType": "Dagger",
          "speed": "1.90",
          "dps": "32.2 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Gahz'rilla",
            "detail": "Zul'Farrak (+10 Attack Power)"
          },
          "alts": [
            {
              "name": "Coldrage Dagger",
              "itemId": 10761,
              "value": "32.3 DPS, 1.50s - RFD: Amnennar",
              "faction": "both",
              "dps": "29 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 43,
              "reqLevel": 38,
              "stats": "+3 Frost Resistance",
              "icon": "inv_sword_34"
            },
            {
              "name": "Vanquisher's Sword",
              "itemId": 10823,
              "value": "30.4 DPS, 2.20s - RFD Quest: Bring the End",
              "faction": "both",
              "dps": "30 DPS",
              "speed": "2.20",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 44,
              "reqLevel": 39,
              "stats": "+22 Attack Power",
              "icon": "inv_sword_07"
            },
            {
              "name": "Sword of Omen",
              "itemId": 6802,
              "value": "29.7 DPS - Horde SM Quest mirror",
              "faction": "horde",
              "dps": "29.7 DPS",
              "quality": "q3",
              "iLvl": 44,
              "reqLevel": 38,
              "stats": "",
              "icon": "inv_sword_24"
            },
            {
              "name": "Sword of Serenity",
              "itemId": 6829,
              "value": "30.0 DPS - Alliance SM Quest mirror",
              "faction": "alliance",
              "dps": "30 DPS",
              "speed": "2.20",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 44,
              "reqLevel": 34,
              "stats": "",
              "icon": "inv_sword_05"
            },
            {
              "name": "Gut Ripper",
              "itemId": 2165,
              "weaponType": "Dagger",
              "quality": "q4",
              "iLvl": 45,
              "reqLevel": 40,
              "dps": "31.9 DPS",
              "speed": "1.80",
              "stats": "Chance on hit: Wounds target for 100 Bleed damage",
              "icon": "inv_weapon_shortblade_12",
              "value": "World Drop Epic Dagger"
            },
            {
              "name": "Bloodrazor",
              "itemId": 809,
              "weaponType": "One-handed sword",
              "quality": "q4",
              "iLvl": 50,
              "reqLevel": 45,
              "dps": "33.6 DPS",
              "speed": "2.70",
              "stats": "Chance on hit: 120 Bleed damage over 30s",
              "icon": "inv_sword_21",
              "value": "World Drop Epic Sword"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 48,
          "reqLevel": 43,
          "stats": "+10 Attack Power"
        },
        {
          "levelBracket": "45–50",
          "itemId": 17705,
          "name": "Thrash Blade",
          "icon": "inv_sword_36",
          "weaponType": "One-handed sword",
          "speed": "2.70",
          "dps": "35.9 DPS",
          "source": {
            "kind": "quest",
            "title": "Corruption of Earth and Seed",
            "detail": "Maraudon quest reward (Extra swing proc on hit)"
          },
          "alts": [
            {
              "name": "Barman Shanker",
              "itemId": 12791,
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 55,
              "reqLevel": 50,
              "dps": "38.3 DPS",
              "speed": "2.00",
              "stats": "2.00 Slow Speed (Devastating Ambush / Backstab crits)",
              "icon": "inv_weapon_shortblade_19",
              "value": "Blackrock Depths — Plugger Spazzring (Grim Guzzler)"
            },
            {
              "name": "Lifeforce Dirk",
              "itemId": 10750,
              "value": "35.9 DPS, 1.50s - Sunken Temple Quest: The God Hakkar",
              "faction": "both",
              "dps": "35.94 DPS",
              "speed": "1.60",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 54,
              "reqLevel": 40,
              "stats": "",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Shadowblade",
              "itemId": 2163,
              "weaponType": "Dagger",
              "quality": "q4",
              "iLvl": 53,
              "reqLevel": 48,
              "dps": "38.3 DPS",
              "speed": "1.80",
              "stats": "Chance on hit: Blasts target for 110 to 140 Shadow damage",
              "icon": "inv_weapon_shortblade_09",
              "value": "World Drop Epic Dagger"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 53,
          "reqLevel": 45,
          "stats": ""
        },
        {
          "levelBracket": "51–56",
          "itemId": 17705,
          "name": "Thrash Blade",
          "icon": "inv_sword_36",
          "weaponType": "One-handed sword",
          "speed": "2.70",
          "dps": "35.9 DPS",
          "source": {
            "kind": "quest",
            "title": "Corruption of Earth and Seed",
            "detail": "Extra attack engine remains top-tier through 60"
          },
          "alts": [
            {
              "name": "Krol Blade",
              "itemId": 2244,
              "weaponType": "One-handed sword",
              "quality": "q4",
              "iLvl": 56,
              "reqLevel": 51,
              "dps": "43.3 DPS",
              "speed": "2.80",
              "stats": "+7 Strength, +5 Stamina, +1% Critical Strike",
              "icon": "inv_sword_27",
              "value": "World Drop Epic Sword (Top Pre-Raid Main Hand)"
            },
            {
              "name": "Bold Dirk",
              "itemId": 250616,
              "value": "35.3 DPS - Blacksmithing (270)",
              "faction": "both",
              "dps": "33.89 DPS",
              "speed": "1.80",
              "weaponType": "Dagger",
              "quality": "q2",
              "iLvl": 57,
              "reqLevel": 52,
              "stats": "",
              "icon": "inv_weapon_shortblade_01"
            },
            {
              "name": "Julie's Dagger",
              "itemId": 6660,
              "value": "35.3 DPS, 1.30s - World drop BoE",
              "faction": "both",
              "dps": "36.54 DPS",
              "speed": "1.30",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 55,
              "reqLevel": 50,
              "stats": "",
              "icon": "inv_weapon_shortblade_07"
            },
            {
              "name": "Dal'Rend's Sacred Charge",
              "itemId": 12940,
              "value": "41.4 DPS, 2.80s - UBRS: Rend Blackhand",
              "faction": "both",
              "dps": "41.4 DPS",
              "speed": "2.80",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 50,
              "stats": "",
              "icon": "inv_sword_43"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 53,
          "reqLevel": 45,
          "stats": ""
        },
        {
          "levelBracket": "57–60",
          "itemId": 12783,
          "name": "Heartseeker",
          "icon": "inv_sword_17",
          "weaponType": "Dagger",
          "speed": "1.70",
          "dps": "41.3 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (290)",
            "detail": "Crafted Dagger (+4 Str, +9 Agi, +1% Crit)"
          },
          "alts": [
            {
              "name": "Felstriker",
              "itemId": 12590,
              "value": "41.1 DPS, 1.70s, 3s 100% crit proc - UBRS: Rend Blackhand",
              "faction": "both",
              "dps": "41.1 DPS",
              "speed": "1.70",
              "quality": "q4",
              "iLvl": 62,
              "reqLevel": 56,
              "stats": "Chance on hit: All attacks are guaranteed critical strikes for 3 sec",
              "icon": "inv_weapon_shortblade_25",
              "weaponType": "Dagger"
            },
            {
              "name": "Mirah's Song",
              "itemId": 15806,
              "value": "38.8 DPS, 1.80s, +9 Str, +9 Agi - Scholomance Quest: Kirtonos",
              "faction": "both",
              "dps": "40 DPS",
              "speed": "1.80",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 61,
              "reqLevel": 55,
              "stats": "+9 Str, +9 Agi",
              "icon": "inv_sword_39"
            },
            {
              "name": "Dal'Rend's Tribal Guardian",
              "itemId": 12939,
              "value": "39.6 DPS - UBRS Rend",
              "faction": "both",
              "dps": "39.6 DPS",
              "quality": "q3",
              "iLvl": 62,
              "reqLevel": 56,
              "stats": "",
              "icon": "inv_sword_40"
            },
            {
              "name": "Blade of Senseless Slaughter",
              "itemId": 284101,
              "weaponType": "One-handed sword",
              "speed": "2.70",
              "dps": "40.7 DPS",
              "value": "40.7 DPS, 2.70s - Late Game Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 62,
              "reqLevel": 57,
              "stats": "",
              "icon": "inv_sword_12"
            }
          ],
          "faction": "both",
          "quality": "q4",
          "iLvl": 63,
          "reqLevel": 58,
          "stats": "+4 Str, +9 Agi, +1% Crit"
        }
      ]
    },
    "shaman": {
      "classId": "shaman",
      "tracks": [
        {
          "id": "primary",
          "name": "Enhancement & Elemental (Two-Hand & Staves)"
        }
      ],
      "levels": [
        {
          "levelBracket": "1–2",
          "itemId": 2132,
          "name": "Short Staff",
          "icon": "inv_staff_02",
          "weaponType": "Staff",
          "speed": "2.20",
          "dps": "2.0 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Sold in starting zones (Valley of Trials, Camp Narache)"
          },
          "alts": [
            {
              "name": "Club",
              "itemId": 2130,
              "value": "1.8 DPS - Starter vendor mace",
              "faction": "both",
              "dps": "1.8 DPS",
              "quality": "q1",
              "iLvl": 6,
              "reqLevel": 1,
              "stats": "",
              "icon": "inv_axe_10",
              "weaponType": "One-Handed Mace"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 4,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "3–4",
          "itemId": 2495,
          "name": "Walking Stick",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.50",
          "dps": "4.2 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Sold in Razor Hill, Bloodhoof Village"
          },
          "alts": [
            {
              "name": "Copper Axe",
              "itemId": 2845,
              "value": "3.8 DPS - Blacksmithing (20)",
              "faction": "both",
              "dps": "3.75 DPS",
              "speed": "2.40",
              "weaponType": "One-handed axe",
              "quality": "q1",
              "iLvl": 9,
              "reqLevel": 4,
              "stats": "",
              "icon": "inv_axe_23"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 8,
          "reqLevel": 3,
          "stats": ""
        },
        {
          "levelBracket": "5–6",
          "itemId": 2844,
          "name": "Copper Mace",
          "icon": "inv_mace_01",
          "weaponType": "One-handed mace",
          "speed": "2.40",
          "dps": "4.2 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Level 5 two-handed axe."
          },
          "alts": [
            {
              "name": "Copper Mace",
              "itemId": 2844,
              "value": "3.8 DPS - Blacksmithing (15)",
              "faction": "both",
              "dps": "3.85 DPS",
              "speed": "2.60",
              "weaponType": "One-handed mace",
              "quality": "q1",
              "iLvl": 9,
              "reqLevel": 4,
              "stats": "",
              "icon": "inv_mace_01"
            },
            {
              "name": "Large Club",
              "itemId": 2480,
              "value": "3.8 DPS - Vendor 2H mace",
              "faction": "both",
              "dps": "2.78 DPS",
              "speed": "1.80",
              "weaponType": "One-handed mace",
              "quality": "q1",
              "iLvl": 7,
              "reqLevel": 2,
              "stats": "",
              "icon": "inv_torch_unlit"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 8,
          "reqLevel": 3,
          "stats": "Starter 1H Mace + Shield combo"
        },
        {
          "levelBracket": "7–8",
          "itemId": 281274,
          "name": "Makeshift Stormcaller",
          "icon": "inv_staff_13",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "7.5 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (30)",
            "detail": "Slow 3.50s swing speed maximizes Rockbiter AP bonuses"
          },
          "alts": [
            {
              "name": "Staff of the Dor'Danil",
              "itemId": 15396,
              "value": "8.5 DPS - Early quest staff",
              "faction": "both",
              "dps": "8.5 DPS",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 6,
              "stats": "",
              "icon": "inv_staff_08"
            },
            {
              "name": "Large Club",
              "itemId": 2480,
              "value": "3.8 DPS - Vendor 2H mace",
              "faction": "both",
              "dps": "2.78 DPS",
              "speed": "1.80",
              "weaponType": "One-handed mace",
              "quality": "q1",
              "iLvl": 7,
              "reqLevel": 2,
              "stats": "",
              "icon": "inv_torch_unlit"
            },
            {
              "name": "Makeshift Stormcaller",
              "itemId": 281274,
              "value": "5.8 DPS, 3.30s - Durotar Shaman Quest: Stormy Potential",
              "faction": "horde",
              "dps": "5.76 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q2",
              "iLvl": 11,
              "reqLevel": 7,
              "stats": "",
              "icon": "inv_staff_14"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 12,
          "reqLevel": 7,
          "stats": "+2 Intellect, +2 Spirit"
        },
        {
          "levelBracket": "9–10",
          "itemId": 7326,
          "name": "Thun'grim's Axe",
          "icon": "inv_axe_05",
          "weaponType": "One-handed axe",
          "speed": "2.10",
          "dps": "8.1 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Sold in Crossroads, Bloodhoof Village"
          },
          "alts": [
            {
              "name": "Trogg Scepter",
              "itemId": 272996,
              "value": "8.1 DPS, 2.40s - RFC Oggleflint",
              "faction": "both",
              "dps": "8.1 DPS",
              "speed": "2.40",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 18,
              "stats": "+4 Spirit, Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tMace",
                "13 - 26 Damage\tSpeed 2.40",
                "(8.1 damage per second)",
                "+4 Spirit",
                "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
                "Requires Level 13"
              ],
              "reqLevel": 13,
              "icon": "inv_misc_bone_10"
            },
            {
              "name": "Thick War Axe",
              "itemId": 3489,
              "value": "8.6 DPS - Blacksmithing (45)",
              "faction": "both",
              "dps": "8.6 DPS",
              "speed": "2.50",
              "weaponType": "One-handed axe",
              "quality": "q2",
              "iLvl": 17,
              "reqLevel": 12,
              "stats": "",
              "icon": "inv_throwingaxe_01"
            },
            {
              "name": "Thun'grim's Axe",
              "itemId": 7326,
              "value": "7.8 DPS, 2.70s - Horde Quest: Forged Steel",
              "faction": "horde",
              "dps": "7.78 DPS",
              "speed": "2.70",
              "weaponType": "One-handed axe",
              "quality": "q2",
              "iLvl": 15,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_axe_01"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 15,
          "reqLevel": 10,
          "stats": "+2 Strength, +1 Stamina - Shaman Class Quest"
        },
        {
          "levelBracket": "11–12",
          "itemId": 15445,
          "name": "Hammer of Orgrimmar",
          "icon": "inv_mace_02",
          "weaponType": "One-handed mace",
          "speed": "2.30",
          "dps": "9.5 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (40)",
            "detail": "Guaranteed crafted spike, slow 3.30s"
          },
          "alts": [
            {
              "name": "Trogg Scepter",
              "itemId": 272996,
              "value": "8.1 DPS - RFC: Oggleflint",
              "faction": "both",
              "dps": "8.13 DPS",
              "speed": "2.40",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 18,
              "stats": "+4 Spirit, Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tMace",
                "13 - 26 Damage\tSpeed 2.40",
                "(8.1 damage per second)",
                "+4 Spirit",
                "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
                "Requires Level 13"
              ],
              "reqLevel": 13,
              "icon": "inv_misc_bone_10"
            },
            {
              "name": "Woodchopper",
              "itemId": 2520,
              "value": "10.5 DPS - Vendor 2H axe",
              "faction": "both",
              "dps": "10.5 DPS",
              "quality": "q2",
              "iLvl": 16,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_axe_02"
            },
            {
              "name": "Hammer of Orgrimmar",
              "itemId": 15445,
              "value": "12.4 DPS, 2.90s, +3 Str, +3 Spi - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "12.41 DPS",
              "speed": "2.90",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+3 Str, +3 Spi",
              "icon": "inv_mace_01"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 16,
          "reqLevel": 11,
          "stats": "+3 Strength, +2 Stamina - Quest Reward"
        },
        {
          "levelBracket": "13–14",
          "itemId": 270228,
          "name": "Golemheart Stave",
          "icon": "inv_staff_10",
          "weaponType": "Staff",
          "speed": "2.60",
          "dps": "14.2 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Plunder",
            "detail": "Hall of Thanes dungeon (+5 Int, +4 Spirit)"
          },
          "alts": [
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Durgen's Crescent Axe",
              "itemId": 270256,
              "value": "15.5 DPS, 2.40s, +5 Str, +2 Sta - Hall of Thanes: Durgen",
              "faction": "both",
              "dps": "12.29 DPS",
              "speed": "2.40",
              "weaponType": "One-handed axe",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "+5 Str, +2 Sta",
              "icon": "inv_axe_05"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Fang of Magmatus",
              "itemId": 271095,
              "weaponType": "Dagger",
              "speed": "1.70",
              "dps": "7.9 DPS",
              "value": "7.9 DPS, 1.70s - RFC Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Bone Knuckles",
              "itemId": 272998,
              "weaponType": "Fist Weapon",
              "speed": "2.00",
              "dps": "12.3 DPS",
              "value": "12.3 DPS, 2.00s - RFC Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "",
              "icon": "ability_whirlwind"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 18,
          "reqLevel": 13,
          "stats": "+5 Int, +4 Spirit"
        },
        {
          "levelBracket": "15–16",
          "itemId": 251534,
          "name": "Gnarled Necromancer's Staff",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "3.00",
          "dps": "12.8 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Bjork",
            "detail": "Ruins of Lordaeron, levels 15–20 (+7 Str, +4 Sta)"
          },
          "alts": [
            {
              "name": "Gnarled Necromancer's Staff",
              "itemId": 251534,
              "value": "15.18 DPS, 2.80s (+12 Spell Power) - The Wrath of Rath'mael in Ruins of Lordaeron",
              "faction": "horde",
              "dps": "15.18 DPS",
              "speed": "2.80",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 15,
              "stats": "+10 Spirit",
              "icon": "inv_staff_16"
            },
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Scepter of the Abandoned",
              "itemId": 271216,
              "value": "14.0 DPS, +4 Sta, +4 Int - Ruins of Lordaeron: The Abandoned",
              "faction": "both",
              "dps": "9.62 DPS",
              "speed": "2.60",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 22,
              "reqLevel": 17,
              "stats": "+4 Sta, +4 Int",
              "icon": "inv_mace_01"
            },
            {
              "name": "Segmented Spider Leg",
              "itemId": 271203,
              "value": "14.8 DPS, +5 Int, +4 Sta - Ruins of Lordaeron: Witherfang",
              "faction": "both",
              "dps": "17.5 DPS",
              "speed": "3.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 20,
              "reqLevel": 15,
              "stats": "+5 Int, +4 Sta",
              "icon": "inv_staff_13"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "The Stitcher",
              "itemId": 279874,
              "weaponType": "One-handed mace",
              "speed": "2.40",
              "dps": "8.1 DPS",
              "value": "8.1 DPS, 2.40s - Dalaran Dungeon",
              "faction": "both",
              "quality": "q2",
              "iLvl": 24,
              "reqLevel": 15,
              "stats": "",
              "icon": "inv_mace_08"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 20,
          "reqLevel": 15,
          "stats": "+4 Intellect, +3 Spirit"
        },
        {
          "levelBracket": "17–18",
          "itemId": 271215,
          "name": "Coldspire Staff",
          "icon": "inv_staff_16",
          "weaponType": "Staff",
          "speed": "3.10",
          "dps": "16.5 DPS",
          "source": {
            "kind": "quest",
            "title": "The Wrath of Rath'mael",
            "detail": "Ruins of Lordaeron dungeon quest (+8 Str, +5 Sta)"
          },
          "alts": [
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Coldspire Staff",
              "itemId": 271215,
              "value": "16.8 DPS, +7 Int, +5 Spi - Ruins of Lordaeron: Rath'mael",
              "faction": "both",
              "dps": "15.14 DPS",
              "speed": "3.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 19,
              "stats": "+7 Int, +5 Spi",
              "icon": "inv_staff_08"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 24,
          "reqLevel": 19,
          "stats": "+6 Intellect, +6 Spirit"
        },
        {
          "levelBracket": "19–20",
          "itemId": 6505,
          "name": "Crescent Staff",
          "icon": "inv_staff_04",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "15.3 DPS",
          "source": {
            "kind": "quest",
            "title": "Leaders of the Fang",
            "detail": "Leaders of the Fang quest reward in Wailing Caverns. Outstanding early 2H weapon for melee or casting."
          },
          "alts": [
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            }
          ],
          "faction": "horde",
          "quality": "q3",
          "iLvl": 24,
          "stats": "+26 Spell Power, +7 Agility, +7 Stamina",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "35 - 53 Damage\tSpeed 2.90",
            "(15.2 damage per second)",
            "+7 Agility",
            "+7 Stamina",
            "+7 Intellect",
            "Equip: Increases damage and healing done by magical spells and effects by up to 26."
          ],
          "reqLevel": 10
        },
        {
          "levelBracket": "21–22",
          "itemId": 6905,
          "name": "Reef Axe",
          "icon": "inv_weapon_halberd_06",
          "weaponType": "Two-handed axe",
          "speed": "3.30",
          "dps": "22.4 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Gelihast",
            "detail": "Blackfathom Deeps (+10 Str, +4 Agi)"
          },
          "alts": [
            {
              "name": "Bronze Battle Axe",
              "itemId": 7958,
              "value": "18.8 DPS - Blacksmithing (105)",
              "faction": "both",
              "dps": "18.33 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed axe",
              "quality": "q2",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "+10 Strength",
              "icon": "inv_axe_21"
            },
            {
              "name": "Iridescent Hammer",
              "itemId": 5541,
              "value": "15.6 DPS - BFD: Lady Sarevess",
              "faction": "both",
              "dps": "14.58 DPS",
              "speed": "2.40",
              "weaponType": "One-handed mace",
              "quality": "q2",
              "iLvl": 28,
              "reqLevel": 23,
              "stats": "",
              "icon": "inv_hammer_05"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 27,
          "reqLevel": 22,
          "stats": "+10 Str, +4 Agi"
        },
        {
          "levelBracket": "23–24",
          "itemId": 285328,
          "name": "Taurenbane's Family Cleaver",
          "icon": "inv_axe_04",
          "weaponType": "Two-handed axe",
          "speed": "3.40",
          "dps": "22.9 DPS",
          "source": {
            "kind": "drop",
            "title": "Hagg Taurenbane",
            "detail": "Barrens Rare Elite (+9 Sta, +32 AP vs Humanoids)"
          },
          "alts": [
            {
              "name": "Staff of the Friar",
              "itemId": 3415,
              "value": "17.5 DPS, +12 Int, +6 Spi - SM Graveyard: Interrogator Vishas",
              "faction": "both",
              "dps": "15.96 DPS",
              "speed": "2.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 26,
              "stats": "+3 Intellect, +4 Stamina, +12 Spirit, Equip: Increases healing done by up to 52 and damage done by up to 17 for all magical spells and effects.",
              "lines": [
                "Binds when equipped",
                "Two-Hand\tStaff",
                "33 - 50 Damage\tSpeed 2.60",
                "(16.0 damage per second)",
                "+3 Intellect",
                "+4 Stamina",
                "+12 Spirit",
                "Equip: Increases healing done by up to 52 and damage done by up to 17 for all magical spells and effects.",
                "Requires Level 21"
              ],
              "reqLevel": 21,
              "icon": "inv_staff_32"
            },
            {
              "name": "Rod of the Sleepwalker",
              "itemId": 1155,
              "value": "17.7 DPS, +11 Int, +10 Spi - BFD: Kelris",
              "faction": "both",
              "dps": "17.68 DPS",
              "speed": "2.80",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 29,
              "reqLevel": 24,
              "stats": "+11 Int, +10 Spi",
              "icon": "inv_staff_06"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 28,
          "stats": "+9 Stamina, Equip: +32 Attack Power against Humanoids.",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tAxe",
            "62 - 94 Damage\tSpeed 3.40",
            "(22.9 damage per second)",
            "+9 Stamina",
            "Equip: +32 Attack Power against Humanoids.",
            "Requires Level 23"
          ],
          "reqLevel": 23
        },
        {
          "levelBracket": "25–26",
          "itemId": 271766,
          "name": "Heavehammer",
          "icon": "inv_hammer_09",
          "weaponType": "Two-handed mace",
          "speed": "3.30",
          "dps": "27.7 DPS",
          "source": {
            "kind": "quest",
            "title": "Elder Knowledge / Lost Relic Carry",
            "detail": "Excavation Site 4 dungeon quest (+60 Armor, +32 AP)"
          },
          "alts": [
            {
              "name": "Healer's Staff",
              "itemId": 271767,
              "value": "20.77 DPS, 2.60s (+16 Healing) - Excavation Site: Wetlands",
              "faction": "both",
              "dps": "20.77 DPS",
              "speed": "2.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 24,
              "stats": "+12 Stamina",
              "icon": "inv_staff_10"
            },
            {
              "name": "Striking Staff",
              "itemId": 279844,
              "value": "31.29 DPS, 3.10s (+14 Spell Power) - Heart of Disruption in City of Dalaran",
              "faction": "horde",
              "dps": "31.29 DPS",
              "speed": "3.10",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 36,
              "reqLevel": 24,
              "stats": "+9 Strength, +6 Stamina, +14 Intellect",
              "icon": "inv_staff_10"
            },
            {
              "name": "Solid Iron Maul",
              "itemId": 3851,
              "value": "22.8 DPS - Blacksmithing (135)",
              "faction": "both",
              "dps": "15.57 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 31,
              "stats": "+12 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 24.",
              "lines": [
                "Binds when equipped",
                "Two-Hand\tMace",
                "43 - 66 Damage\tSpeed 3.50",
                "(15.6 damage per second)",
                "+12 Stamina",
                "Equip: Increases damage and healing done by magical spells and effects by up to 24.",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_hammer_07"
            },
            {
              "name": "Mighty Iron Hammer",
              "itemId": 3492,
              "value": "25.0 DPS - Blacksmithing (145)",
              "faction": "both",
              "dps": "15.54 DPS",
              "speed": "2.80",
              "weaponType": "One-handed mace",
              "quality": "q2",
              "iLvl": 30,
              "reqLevel": 25,
              "stats": "",
              "icon": "inv_hammer_04"
            },
            {
              "name": "Dendweller's Hammer",
              "itemId": 284459,
              "value": "25.6 DPS, 3.30s - Level 26 Mace",
              "faction": "both",
              "dps": "25.61 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 31,
              "stats": "+12 Stamina, +100 Armor",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "67 - 102 Damage\tSpeed 3.30",
                "(25.6 damage per second)",
                "+12 Stamina",
                "+100 Armor",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_hammer_09"
            },
            {
              "name": "Defender of Dalaran",
              "itemId": 279841,
              "weaponType": "Two-handed mace",
              "speed": "3.30",
              "dps": "31.2 DPS",
              "value": "31.2 DPS, 3.30s - Dalaran Dungeon",
              "faction": "both",
              "quality": "q3",
              "iLvl": 36,
              "stats": "+9 Strength, +13 Stamina, +9 Intellect",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "82 - 124 Damage\tSpeed 3.30",
                "(31.2 damage per second)",
                "+9 Strength",
                "+13 Stamina",
                "+9 Intellect"
              ],
              "reqLevel": 24,
              "icon": "inv_hammer_20"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 33,
          "stats": "+60 Armor, Equip: +32 Attack Power.",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tMace",
            "73 - 110 Damage\tSpeed 3.30",
            "(27.7 damage per second)",
            "+60 Armor",
            "Equip: +32 Attack Power."
          ],
          "reqLevel": 24
        },
        {
          "levelBracket": "27–28",
          "itemId": 273046,
          "name": "Guardian's Dualblade",
          "icon": "inv_throwingaxe_05",
          "weaponType": "Two-handed axe",
          "speed": "3.40",
          "dps": "24.6 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Unstable Sentinel",
            "detail": "City of Dalaran dungeon (+11 Str, +8 Sta)"
          },
          "alts": [
            {
              "name": "Striking Staff",
              "itemId": 279844,
              "value": "31.3 DPS, 3.10s, +9 Str, +6 Sta, +14 Int - City of Dalaran Quest: Heart of Disruption",
              "faction": "both",
              "dps": "31.29 DPS",
              "speed": "3.10",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 36,
              "stats": "+9 Strength, +6 Stamina, +14 Intellect",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "77 - 117 Damage\tSpeed 3.10",
                "(31.3 damage per second)",
                "+9 Strength",
                "+6 Stamina",
                "+14 Intellect"
              ],
              "reqLevel": 24,
              "icon": "inv_staff_10"
            },
            {
              "name": "Healer's Staff",
              "itemId": 271767,
              "value": "20.8 DPS, +67 Healing, 5 MP5 - Excavation Site 4 quest",
              "faction": "both",
              "dps": "20.77 DPS",
              "speed": "2.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 33,
              "stats": "+12 Stamina, Equip: Increases healing done by up to 67 and damage done by up to 22 for all magical spells and effects., Equip: Restores 5 Mana per 5 sec.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "43 - 65 Damage\tSpeed 2.60",
                "(20.8 damage per second)",
                "+12 Stamina",
                "Equip: Increases healing done by up to 67 and damage done by up to 22 for all magical spells and effects.",
                "Equip: Restores 5 Mana per 5 sec."
              ],
              "reqLevel": 24,
              "icon": "inv_staff_10"
            },
            {
              "name": "Death Speaker Scepter",
              "itemId": 2816,
              "value": "+68 Healing, +28 Shadow SP, 12 HP5 - Razorfen Kraul (Death Speaker Jargba)",
              "faction": "both",
              "dps": "18.5 DPS",
              "speed": "2.20",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+68 Healing, +28 Shadow Spell Power, 12 Health per 5 sec",
              "icon": "inv_mace_07",
              "source": {
                "kind": "dungeon",
                "title": "Razorfen Kraul",
                "detail": "Dropped by Death Speaker Jargba. Invaluable 1H mace for Priests, Shamans, and Paladins."
              }
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 33,
          "reqLevel": 28,
          "stats": "+11 Str, +8 Sta"
        },
        {
          "levelBracket": "29–30",
          "itemId": 280604,
          "name": "Rage of the Storm",
          "icon": "inv_mace_42",
          "weaponType": "Two-handed mace",
          "speed": "3.20",
          "dps": "35.6 DPS",
          "source": {
            "kind": "quest",
            "title": "The Tempest's Weapons",
            "detail": "Level 30 Shaman class chain reward (+12 Int, +15 Sta, +10% Stormstrike damage)"
          },
          "alts": [
            {
              "name": "Lightning's Grasp",
              "itemId": 280607,
              "value": "18.2 DPS, 2.40s - Custom Boss Drop",
              "faction": "both",
              "dps": "18.2 DPS",
              "speed": "2.40",
              "weaponType": "Fist Weapon",
              "quality": "q3",
              "iLvl": 40,
              "stats": "+6 Intellect, Equip: Increases damage and healing done by magical spells and effects by up to 46., Equip: Increases the critical strike chance of your Lightning Bolt spell by 1%.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tFist Weapon",
                "28 - 52 Damage\tSpeed 2.20",
                "(18.2 damage per second)",
                "+6 Intellect",
                "Equip: Increases damage and healing done by magical spells and effects by up to 46.",
                "Equip: Increases the critical strike chance of your Lightning Bolt spell by 1%."
              ],
              "reqLevel": 30,
              "icon": "inv_weapon_hand_09"
            },
            {
              "name": "Tidebringer's Claw",
              "itemId": 280605,
              "value": "18.1 DPS, 2.40s - Custom Boss Drop",
              "faction": "both",
              "dps": "18.1 DPS",
              "speed": "2.40",
              "weaponType": "Fist Weapon",
              "quality": "q3",
              "iLvl": 40,
              "stats": "+5 Stamina, Equip: Increases healing done by up to 86 and damage done by up to 28 for all magical spells and effects., Equip: Increases the critical strike chance of your Healing Wave and Lesser Healing Wave spells by 2%.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tFist Weapon",
                "30 - 57 Damage\tSpeed 2.40",
                "(18.1 damage per second)",
                "+5 Stamina",
                "Equip: Increases healing done by up to 86 and damage done by up to 28 for all magical spells and effects.",
                "Equip: Increases the critical strike chance of your Healing Wave and Lesser Healing Wave spells by 2%."
              ],
              "reqLevel": 30,
              "icon": "inv_weapon_hand_15"
            },
            {
              "name": "Corpsemaker",
              "itemId": 6687,
              "value": "28.9 DPS, 3.80s - RFK: Overlord Ramtusk",
              "faction": "both",
              "dps": "28.95 DPS",
              "speed": "3.80",
              "weaponType": "Two-handed axe",
              "quality": "q3",
              "iLvl": 34,
              "stats": "+15 Strength, +8 Stamina",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tAxe",
                "88 - 132 Damage\tSpeed 3.80",
                "(28.9 damage per second)",
                "+15 Strength",
                "+8 Stamina",
                "Requires Level 29"
              ],
              "reqLevel": 29,
              "icon": "inv_weapon_halbard_01"
            },
            {
              "name": "Striking Staff",
              "itemId": 279844,
              "value": "31.3 DPS - Dalaran quest",
              "faction": "both",
              "dps": "31.29 DPS",
              "speed": "3.10",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 36,
              "stats": "+9 Strength, +6 Stamina, +14 Intellect",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "77 - 117 Damage\tSpeed 3.10",
                "(31.3 damage per second)",
                "+9 Strength",
                "+6 Stamina",
                "+14 Intellect"
              ],
              "reqLevel": 24,
              "icon": "inv_staff_10"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 40,
          "stats": "+12 Intellect, +15 Stamina, Equip: Increases the damage dealt by your Stormstrike ability by 10%.",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tMace",
            "91 - 137 Damage\tSpeed 3.20",
            "(35.6 damage per second)",
            "+12 Intellect",
            "+15 Stamina",
            "Equip: Increases the damage dealt by your Stormstrike ability by 10%."
          ],
          "reqLevel": 30
        },
        {
          "levelBracket": "31–36",
          "itemId": 6687,
          "name": "Corpsemaker",
          "icon": "inv_weapon_halbard_01",
          "weaponType": "Two-handed axe",
          "speed": "3.80",
          "dps": "28.9 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Overlord Ramtusk",
            "detail": "Razorfen Kraul (+15 Str, +8 Sta)"
          },
          "alts": [
            {
              "name": "Rage of the Storm",
              "itemId": 280604,
              "value": "35.6 DPS - Tempest quest weapon dominates into late 30s",
              "faction": "both",
              "dps": "35.63 DPS",
              "speed": "3.20",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 40,
              "stats": "+12 Intellect, +15 Stamina, Equip: Increases the damage dealt by your Stormstrike ability by 10%.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "91 - 137 Damage\tSpeed 3.20",
                "(35.6 damage per second)",
                "+12 Intellect",
                "+15 Stamina",
                "Equip: Increases the damage dealt by your Stormstrike ability by 10%."
              ],
              "reqLevel": 30,
              "icon": "inv_mace_42"
            },
            {
              "name": "Manual Crowd Pummeler",
              "itemId": 9449,
              "value": "31.5 DPS, 2.00s - Gnomeregan",
              "faction": "both",
              "dps": "29 DPS",
              "speed": "2.00",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 34,
              "stats": "+16 Strength, +5 Agility, Use: Increases your attack speed by 50% for 30 sec. (3 Min Cooldown)",
              "lines": [
                "Binds when picked up",
                "Unique",
                "Two-Hand\tMace",
                "46 - 70 Damage\tSpeed 2.00",
                "(29 damage per second)",
                "+16 Strength",
                "+5 Agility",
                "Use: Increases your attack speed by 50% for 30 sec. (3 Min Cooldown)",
                "3 Charges",
                "Requires Level 29"
              ],
              "reqLevel": 29,
              "icon": "inv_mace_14"
            },
            {
              "name": "Massive Iron Axe",
              "itemId": 3855,
              "value": "31.4 DPS - Blacksmithing (185)",
              "faction": "both",
              "dps": "25.57 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed axe",
              "quality": "q2",
              "iLvl": 37,
              "reqLevel": 32,
              "stats": "",
              "icon": "inv_throwingaxe_05"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 34,
          "stats": "+15 Strength, +8 Stamina",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tAxe",
            "88 - 132 Damage\tSpeed 3.80",
            "(28.9 damage per second)",
            "+15 Strength",
            "+8 Stamina",
            "Requires Level 29"
          ],
          "reqLevel": 29
        },
        {
          "levelBracket": "37–40",
          "itemId": 7717,
          "name": "Ravager",
          "icon": "inv_axe_04",
          "weaponType": "Two-handed axe",
          "speed": "3.50",
          "dps": "37.3 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Herod",
            "detail": "Scarlet Monastery Armory (Bladestorm proc procures multiple Windfuries!)"
          },
          "alts": [
            {
              "name": "Mograine's Might",
              "itemId": 7723,
              "value": "38.9 DPS, 3.50s - SM Cath: Mograine",
              "faction": "both",
              "dps": "38.82 DPS",
              "speed": "3.40",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 44,
              "reqLevel": 39,
              "stats": "+8 Strength, +14 Stamina, +16 Intellect",
              "icon": "inv_hammer_04"
            },
            {
              "name": "Illusionary Rod",
              "itemId": 7713,
              "value": "25.7 DPS, +15 Int, +10 Spi - SM Library: Arcanist Doan",
              "faction": "both",
              "dps": "25.74 DPS",
              "speed": "3.40",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 39,
              "reqLevel": 34,
              "stats": "+15 Int, +10 Spi",
              "icon": "inv_staff_08"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 42,
          "reqLevel": 37,
          "stats": ""
        },
        {
          "levelBracket": "41–46",
          "itemId": 9477,
          "name": "The Chief's Enforcer",
          "icon": "inv_mace_01",
          "weaponType": "Two-Handed Mace",
          "speed": "3.40",
          "dps": "36.2 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Zul'Farrak",
            "detail": "Chief Ukorz Sandscalp in ZF (+15 Str, +15 Sta, +10 Spi)"
          },
          "alts": [
            {
              "name": "Princess Theradras' Scepter",
              "itemId": 17766,
              "value": "47.1 DPS, 3.40s - Maraudon: Princess Theradras",
              "faction": "both",
              "dps": "46.47 DPS",
              "speed": "3.40",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 54,
              "reqLevel": 49,
              "stats": "",
              "icon": "inv_hammer_08"
            },
            {
              "name": "Executioner's Cleaver",
              "itemId": 13018,
              "value": "42.5 DPS - BoE 2H Axe",
              "faction": "both",
              "dps": "41.84 DPS",
              "speed": "3.80",
              "weaponType": "Two-handed axe",
              "quality": "q3",
              "iLvl": 48,
              "reqLevel": 43,
              "stats": "+10 Hit Rating",
              "icon": "inv_axe_04"
            },
            {
              "name": "Gul'gash's Greathammer",
              "itemId": 281648,
              "weaponType": "Two-handed mace",
              "speed": "3.60",
              "dps": "42.8 DPS",
              "value": "42.8 DPS, 3.60s - Feralas Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 49,
              "reqLevel": 44,
              "stats": "",
              "icon": "inv_hammer_16"
            },
            {
              "name": "Kang the Decapitator",
              "itemId": 2291,
              "weaponType": "Two-handed axe",
              "quality": "q4",
              "iLvl": 49,
              "reqLevel": 44,
              "dps": "42.6 DPS",
              "speed": "3.60",
              "stats": "Chance on hit: Wounds target for 8 Bleed damage each sec for 30 sec",
              "icon": "inv_axe_09",
              "value": "World Drop Epic Axe"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 50,
          "reqLevel": 45,
          "stats": "+15 Str, +15 Sta, +10 Spi"
        },
        {
          "levelBracket": "47–52",
          "itemId": 11608,
          "name": "Dark Iron Pulverizer",
          "icon": "inv_hammer_08",
          "weaponType": "Two-handed mace",
          "speed": "3.70",
          "dps": "47.4 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (265)",
            "detail": "Plan drops in Blackrock Depths - 8s stun proc"
          },
          "alts": [
            {
              "name": "Dreadforge Retaliator",
              "itemId": 11931,
              "value": "49.3 DPS, 3.70s - BRD: Emperor Dagran Thaurissan",
              "faction": "both",
              "dps": "49.3 DPS",
              "speed": "3.70",
              "quality": "q3",
              "iLvl": 52,
              "reqLevel": 46,
              "stats": "",
              "icon": "inv_axe_11"
            },
            {
              "name": "Enchanted Battlehammer",
              "itemId": 12776,
              "value": "48.3 DPS - Blacksmithing (280)",
              "faction": "both",
              "dps": "48.29 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 51,
              "stats": "+4 Arcane Resistance, +21 Parry Rating, +20 Hit Rating",
              "icon": "inv_hammer_04"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 55,
          "reqLevel": 50,
          "stats": ""
        },
        {
          "levelBracket": "53–60",
          "itemId": 12784,
          "name": "Arcanite Reaper",
          "icon": "inv_axe_09",
          "weaponType": "Two-handed axe",
          "speed": "3.80",
          "dps": "53.8 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (275)",
            "detail": "Slow 3.80s swing speed yields monster Windfury procs"
          },
          "alts": [
            {
              "name": "The Unstoppable Force",
              "itemId": 19323,
              "value": "61.4 DPS, 3.80s, Stun proc - Alterac Valley Exalted",
              "faction": "both",
              "dps": "61.5 DPS",
              "speed": "3.80",
              "weaponType": "Two-handed mace",
              "quality": "q4",
              "iLvl": 60,
              "reqLevel": 60,
              "stats": "+19 Strength, +15 Stamina, +1% Crit, Chance on hit: Stun target for 1 sec",
              "icon": "inv_hammer_09"
            },
            {
              "name": "Wisepaw Totem",
              "itemId": 274420,
              "value": "36.9 DPS - Mount Hyjal caster staff",
              "faction": "both",
              "dps": "36.88 DPS",
              "speed": "3.20",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 58,
              "reqLevel": 53,
              "stats": "",
              "icon": "inv_staff_51"
            },
            {
              "name": "Fist of the Damned",
              "itemId": 10804,
              "value": "39.4 DPS - Stratholme",
              "faction": "both",
              "dps": "39.4 DPS",
              "quality": "q3",
              "iLvl": 58,
              "reqLevel": 52,
              "stats": "",
              "icon": "inv_mace_01",
              "weaponType": "One-Handed Mace"
            },
            {
              "name": "Icesworn Decapitator",
              "itemId": 284257,
              "weaponType": "Two-handed axe",
              "speed": "3.60",
              "dps": "50.6 DPS",
              "value": "50.6 DPS, 3.60s - Winterspring Rare",
              "faction": "both",
              "quality": "q3",
              "iLvl": 59,
              "reqLevel": 54,
              "stats": "",
              "icon": "inv_axe_69"
            },
            {
              "name": "Hand of Edward the Odd",
              "itemId": 2243,
              "weaponType": "One-handed mace",
              "quality": "q4",
              "iLvl": 62,
              "reqLevel": 57,
              "dps": "43.2 DPS",
              "speed": "2.60",
              "stats": "+13 Spirit, Chance on hit: Next spell cast is instant",
              "icon": "inv_mace_11",
              "value": "World Drop Epic Mace (Instant Cast Proc)"
            },
            {
              "name": "Earthshaker",
              "itemId": 17073,
              "weaponType": "Two-handed mace",
              "quality": "q4",
              "iLvl": 66,
              "reqLevel": 60,
              "dps": "61.5 DPS",
              "speed": "3.50",
              "stats": "Chance on hit: Knockdown all nearby enemies in 5 yds for 3 sec",
              "icon": "inv_hammer_08",
              "value": "Molten Core — Magmadar"
            },
            {
              "name": "Aurastone Hammer",
              "itemId": 17105,
              "weaponType": "One-handed mace",
              "quality": "q4",
              "iLvl": 66,
              "reqLevel": 60,
              "dps": "44.2 DPS",
              "speed": "2.70",
              "stats": "+10 Intellect, +5 Stamina, +25 Spell Power & Healing",
              "icon": "inv_hammer_18",
              "value": "Molten Core — Garr"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 63,
          "reqLevel": 58,
          "stats": ""
        }
      ]
    },
    "mage": {
      "classId": "mage",
      "tracks": [
        {
          "id": "primary",
          "name": "Staves & Spellblades (Frost / Fire / Arcane)"
        }
      ],
      "levels": [
        {
          "levelBracket": "1–2",
          "itemId": 1159,
          "name": "Militia Quarterstaff",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.80",
          "dps": "2.0 DPS",
          "source": {
            "kind": "vendor",
            "title": "Starter Weapon Vendor",
            "detail": "Sold by starter vendors in Northshire, Coldridge, and Valley of Trials."
          },
          "alts": [
            {
              "name": "Walking Stick",
              "itemId": 2495,
              "value": "4.2 DPS - Starter vendor staff",
              "faction": "both",
              "dps": "4.2 DPS",
              "speed": "2.50",
              "weaponType": "Staff",
              "quality": "q1",
              "iLvl": 8,
              "reqLevel": 3,
              "stats": "",
              "icon": "inv_staff_08"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 4,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "3–4",
          "itemId": 2495,
          "name": "Walking Stick",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.50",
          "dps": "4.2 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Purchased in starter hub towns"
          },
          "alts": [],
          "faction": "both",
          "quality": "q1",
          "iLvl": 8,
          "reqLevel": 3,
          "stats": ""
        },
        {
          "levelBracket": "5–6",
          "itemId": 3446,
          "name": "Darkwood Staff",
          "icon": "inv_staff_16",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "4.8 DPS",
          "source": {
            "kind": "drop",
            "title": "Darkwood Staff",
            "detail": "World drop in Level 8-15 zones (Westfall, Darkshore, Silverpine)."
          },
          "alts": [],
          "faction": "both",
          "quality": "q2",
          "iLvl": 11,
          "reqLevel": 6,
          "stats": "+2 Intellect"
        },
        {
          "levelBracket": "7–8",
          "itemId": 248008,
          "name": "Apprentice's Spellstaff",
          "icon": "inv_staff_18",
          "weaponType": "Staff",
          "speed": "2.40",
          "dps": "6.4 DPS",
          "source": {
            "kind": "quest",
            "title": "Rare Books / Kobold Camp",
            "detail": "Early quest in starting zones"
          },
          "alts": [
            {
              "name": "Staff of the Dor'Danil",
              "itemId": 15396,
              "value": "8.5 DPS - Teldrassil quest",
              "faction": "alliance",
              "dps": "8.5 DPS",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 6,
              "stats": "",
              "icon": "inv_staff_08"
            },
            {
              "name": "Darkwood Staff",
              "itemId": 3446,
              "value": "6.7 DPS, 3.20s - Tirisfal Quest: The Family Crypt",
              "faction": "horde",
              "dps": "6.72 DPS",
              "speed": "3.20",
              "weaponType": "Staff",
              "quality": "q2",
              "iLvl": 13,
              "reqLevel": 7,
              "stats": "+6 Spell Power",
              "icon": "inv_staff_16"
            },
            {
              "name": "Deepblaze",
              "itemId": 279896,
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 14,
              "reqLevel": 9,
              "dps": "7.8 DPS",
              "speed": "1.80",
              "icon": "inv_wand_02",
              "value": "Datamined Starter Wand"
            }
          ],
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 12,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "9–10",
          "itemId": 6682,
          "name": "Staff of the Dor'Danil",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.80",
          "dps": "7.7 DPS",
          "source": {
            "kind": "quest",
            "title": "The Relics of Wakening",
            "detail": "Quest reward from Teldrassil / Darkshore barrows."
          },
          "alts": [],
          "faction": "both",
          "quality": "q2",
          "iLvl": 15,
          "reqLevel": 10,
          "stats": "+2 Intellect, +2 Spirit"
        },
        {
          "levelBracket": "11–12",
          "itemId": 15397,
          "name": "Oakthrush Staff",
          "icon": "inv_jewelry_ring_01",
          "weaponType": "Staff",
          "speed": "2.70",
          "dps": "9.6 DPS",
          "source": {
            "kind": "quest",
            "title": "The Fate of Oakthrush",
            "detail": "Quest reward in Darkshore / Silverpine Forest."
          },
          "alts": [
            {
              "name": "Pagan Rod",
              "itemId": 15974,
              "value": "8.6 DPS - Vendor wand",
              "faction": "both",
              "dps": "8.6 DPS",
              "quality": "q2",
              "iLvl": 16,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_staff_11",
              "weaponType": "Held In Off-hand"
            },
            {
              "name": "Cauldron Stirrer",
              "itemId": 5340,
              "value": "7.4 DPS, 3.10s - Barrens Quest: Apothecary Zamah",
              "faction": "horde",
              "dps": "7.42 DPS",
              "speed": "3.10",
              "weaponType": "Staff",
              "quality": "q2",
              "iLvl": 15,
              "reqLevel": 10,
              "stats": "+8 Spell Power",
              "icon": "inv_staff_08"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 17,
          "reqLevel": 12,
          "stats": "+3 Intellect, +3 Spirit"
        },
        {
          "levelBracket": "13–14",
          "itemId": 270228,
          "name": "Golemheart Stave",
          "icon": "inv_staff_10",
          "weaponType": "Staff",
          "speed": "2.60",
          "dps": "14.2 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Plunder",
            "detail": "Hall of Thanes dungeon (+5 Int, +4 Spirit)"
          },
          "alts": [
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Fang of Magmatus",
              "itemId": 271095,
              "value": "11.8 DPS, 1.60s, +2 Agi, +2 Fire SP - Hall of Thanes: Magmatus",
              "faction": "both",
              "dps": "7.94 DPS",
              "speed": "1.70",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "+2 Agi, +2 Fire SP",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Searing Dagger",
              "itemId": 273003,
              "weaponType": "Dagger",
              "speed": "1.60",
              "dps": "8.1 DPS",
              "value": "8.1 DPS, 1.60s - RFC Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "",
              "icon": "inv_weapon_shortblade_03"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 18,
          "reqLevel": 13,
          "stats": "+5 Int, +4 Spirit"
        },
        {
          "levelBracket": "15–16",
          "itemId": 5201,
          "name": "Emberstone Staff",
          "icon": "inv_staff_13",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "14.2 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Captain Greenskin",
            "detail": "The Deadmines (+5 Int, +5 Spi)"
          },
          "alts": [
            {
              "name": "Gnarled Necromancer's Staff",
              "itemId": 251534,
              "value": "15.18 DPS, 2.80s (+12 Spell Power) - The Wrath of Rath'mael in Ruins of Lordaeron",
              "faction": "horde",
              "dps": "15.18 DPS",
              "speed": "2.80",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 15,
              "stats": "+10 Spirit",
              "icon": "inv_staff_16"
            },
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Segmented Spider Leg",
              "itemId": 271203,
              "value": "14.8 DPS, +5 Int, +4 Sta - Ruins of Lordaeron: Witherfang",
              "faction": "both",
              "dps": "17.5 DPS",
              "speed": "3.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 20,
              "reqLevel": 15,
              "stats": "+5 Int, +4 Sta",
              "icon": "inv_staff_13"
            },
            {
              "name": "Meathook Slicer",
              "itemId": 271204,
              "value": "13.2 DPS - Ruins of Lordaeron: The Baron",
              "faction": "both",
              "dps": "13.61 DPS",
              "speed": "1.80",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 20,
              "reqLevel": 15,
              "stats": "",
              "icon": "inv_weapon_shortblade_02"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 22,
          "reqLevel": 17,
          "stats": "+5 Int, +5 Spi"
        },
        {
          "levelBracket": "17–18",
          "itemId": 271215,
          "name": "Coldspire Staff",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.80",
          "dps": "16.8 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Rath'mael",
            "detail": "Ruins of Lordaeron (+7 Int, +5 Spi, +6 Frost Spell Dmg)"
          },
          "alts": [
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Staff of Westfall",
              "itemId": 2042,
              "value": "15.2 DPS, +5 Int, +11 Spi - Deadmines Quest: The Defias Brotherhood",
              "faction": "alliance",
              "dps": "15.17 DPS",
              "speed": "3.00",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "stats": "+5 Int, +11 Spi",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "36 - 55 Damage\tSpeed 3.00",
                "(15.2 damage per second)",
                "+5 Intellect",
                "+6 Spirit",
                "Equip: Increases healing done by up to 48 and damage done by up to 16 for all magical spells and effects.",
                "Equip: Movement speed increased by 2% in Elwynn Forest, Westfall, Redridge Mountains, and the Deadmines."
              ],
              "reqLevel": 14,
              "icon": "inv_staff_10"
            },
            {
              "name": "Vileblood Scimitar",
              "itemId": 271218,
              "value": "15.0 DPS, 2.20s - Ruins of Lordaeron: Viktor the Vile",
              "faction": "both",
              "dps": "14.62 DPS",
              "speed": "2.60",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 22,
              "reqLevel": 17,
              "stats": "",
              "icon": "inv_sword_01"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 24,
          "reqLevel": 19,
          "stats": "+7 Int, +5 Spi, +6 Frost Spell Dmg"
        },
        {
          "levelBracket": "19–20",
          "itemId": 2042,
          "name": "Staff of Westfall",
          "icon": "inv_staff_10",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "15.2 DPS",
          "source": {
            "kind": "quest",
            "title": "The Defias Brotherhood",
            "detail": "Deadmines quest reward (+5 Int, +11 Spi)"
          },
          "alts": [
            {
              "name": "Crescent Staff",
              "itemId": 6505,
              "value": "+26 Spell Power, +7 Agi, +7 Sta - Leaders of the Fang quest in Wailing Caverns (Horde)",
              "faction": "horde",
              "dps": "15.2 DPS",
              "speed": "2.90",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 10,
              "stats": "+26 Spell Power, +7 Agility, +7 Stamina",
              "icon": "inv_staff_04",
              "source": {
                "kind": "quest",
                "title": "Leaders of the Fang",
                "detail": "Major dungeon quest reward in Wailing Caverns (Horde). Elite spell power boost."
              }
            },
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Odo's Ley Staff",
              "itemId": 6318,
              "value": "16.0 DPS - SFK: Odo the Blindwatcher",
              "faction": "both",
              "dps": "16.03 DPS",
              "speed": "2.90",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 26,
              "stats": "+5 Stamina, +12 Spirit, Equip: Increases healing done by up to 52 and damage done by up to 17 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "37 - 56 Damage\tSpeed 2.90",
                "(16.0 damage per second)",
                "+5 Stamina",
                "+12 Spirit",
                "Equip: Increases healing done by up to 52 and damage done by up to 17 for all magical spells and effects.",
                "Requires Level 21"
              ],
              "reqLevel": 21,
              "icon": "inv_staff_27"
            },
            {
              "name": "Glimmering Staff",
              "itemId": 249392,
              "value": "18.4 DPS, 2.20s, Req Level 25 - Enchanting (140)",
              "faction": "both",
              "dps": "18.41 DPS",
              "speed": "2.20",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 30,
              "stats": "+11 Intellect, +11 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 34.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "32 - 49 Damage\tSpeed 2.20",
                "(18.4 damage per second)",
                "+11 Intellect",
                "+11 Stamina",
                "Equip: Increases damage and healing done by magical spells and effects by up to 34.",
                "Requires Level 25"
              ],
              "reqLevel": 25,
              "icon": "inv_staff_19"
            },
            {
              "name": "Witching Stave",
              "itemId": 1484,
              "value": "+27 Shadow Spell Power, +6 Sta, +5 Int - Level 17 Rare Drop",
              "faction": "both",
              "dps": "14.0 DPS",
              "speed": "3.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 22,
              "reqLevel": 17,
              "stats": "+27 Shadow Spell Power, +6 Stamina, +5 Intellect",
              "icon": "inv_wand_04"
            }
          ],
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 24,
          "stats": "+5 Int, +11 Spi",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "36 - 55 Damage\tSpeed 3.00",
            "(15.2 damage per second)",
            "+5 Intellect",
            "+6 Spirit",
            "Equip: Increases healing done by up to 48 and damage done by up to 16 for all magical spells and effects.",
            "Equip: Movement speed increased by 2% in Elwynn Forest, Westfall, Redridge Mountains, and the Deadmines."
          ],
          "reqLevel": 14
        },
        {
          "levelBracket": "21–24",
          "itemId": 276631,
          "name": "Coldflame Saber",
          "icon": "inv_sword_05",
          "weaponType": "Main Hand Sword",
          "speed": "2.00",
          "dps": "12.3 DPS",
          "source": {
            "kind": "quest",
            "title": "Scroll of the Saber & Blade of Silverlaine",
            "detail": "Custom WoW Forever Mage class quest weapon (+7 Int, +32 Spell Power, 98 Fire dmg on frozen targets, Req Level 21)"
          },
          "alts": [
            {
              "name": "Rod of the Sleepwalker",
              "itemId": 1155,
              "value": "17.7 DPS, +11 Int, +10 Spi - BFD: Twilight Lord Kelris",
              "faction": "both",
              "dps": "17.68 DPS",
              "speed": "2.80",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 29,
              "reqLevel": 24,
              "stats": "+11 Int, +10 Spi",
              "icon": "inv_staff_06"
            },
            {
              "name": "Meteor Shard",
              "itemId": 6220,
              "value": "17.8 DPS, 1.80s - SFK: Archmage Arugal",
              "faction": "both",
              "dps": "17.78 DPS",
              "speed": "1.80",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 28,
              "reqLevel": 23,
              "stats": "+3 Fire Resistance",
              "icon": "inv_weapon_shortblade_25"
            },
            {
              "name": "Alliance Outrunner Staff",
              "itemId": 285350,
              "weaponType": "Staff",
              "speed": "2.50",
              "dps": "16.2 DPS",
              "value": "16.2 DPS, 2.50s - Alliance Drop",
              "faction": "alliance",
              "quality": "q3",
              "iLvl": 26,
              "reqLevel": 21,
              "stats": "",
              "icon": "inv_staff_11"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 29,
          "stats": "+7 Intellect, Equip: Increases damage and healing done by magical spells and effects by up to 32., Equip: Melee attacks deal 98 additional Fire damage against Frozen targets.",
          "lines": [
            "Binds when picked up",
            "Main Hand\tSword",
            "17 - 32 Damage\tSpeed 2.00",
            "(12.3 damage per second)",
            "+7 Intellect",
            "Equip: Increases damage and healing done by magical spells and effects by up to 32.",
            "Equip: Melee attacks deal 98 additional Fire damage against Frozen targets.",
            "Classes: Mage",
            "Requires Level 21"
          ],
          "reqLevel": 21
        },
        {
          "levelBracket": "25–26",
          "itemId": 276631,
          "name": "Coldflame Saber",
          "icon": "inv_sword_05",
          "weaponType": "One-handed sword",
          "speed": "2.00",
          "dps": "12.25 DPS",
          "source": {
            "kind": "quest",
            "title": "Scroll of the Saber & Blade of Silverlaine",
            "detail": "Custom WoW Forever Mage class quest weapon (+7 Int, +32 Spell Power, 98 Fire dmg on frozen targets)"
          },
          "alts": [
            {
              "name": "Healer's Staff",
              "itemId": 271767,
              "value": "20.77 DPS, 2.60s (+16 Healing) - Excavation Site: Wetlands",
              "faction": "both",
              "dps": "20.77 DPS",
              "speed": "2.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 24,
              "stats": "+12 Stamina",
              "icon": "inv_staff_10"
            },
            {
              "name": "Striking Staff",
              "itemId": 279844,
              "value": "31.29 DPS, 3.10s (+14 Spell Power) - Heart of Disruption in City of Dalaran",
              "faction": "horde",
              "dps": "31.29 DPS",
              "speed": "3.10",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 36,
              "reqLevel": 24,
              "stats": "+9 Strength, +6 Stamina, +14 Intellect",
              "icon": "inv_staff_10"
            },
            {
              "name": "Death Prophet Spine",
              "itemId": 274158,
              "value": "18.9 DPS, 2.80s, +11 Sta, +34 SP, 5 MP5 - RFK: Aggem Thorncurse",
              "faction": "both",
              "dps": "18.93 DPS",
              "speed": "2.80",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 31,
              "stats": "+11 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 34., Equip: Restores 5 Mana per 5 sec.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "42 - 64 Damage\tSpeed 2.80",
                "(18.9 damage per second)",
                "+11 Stamina",
                "Equip: Increases damage and healing done by magical spells and effects by up to 34.",
                "Equip: Restores 5 Mana per 5 sec.",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_staff_17"
            },
            {
              "name": "Debt Collector",
              "itemId": 273827,
              "value": "13.0 DPS, 2.30s, +34 SP, Req Level 26 - Stockade: Bazil Thredd",
              "faction": "both",
              "dps": "13.04 DPS",
              "speed": "2.30",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 31,
              "stats": "Equip: Increases damage and healing done by magical spells and effects by up to 34., Equip: Grants 6 health and 2 mana every 5 sec for 15 sec when one of your spells is resisted.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tSword",
                "21 - 39 Damage\tSpeed 2.30",
                "(13.0 damage per second)",
                "Equip: Increases damage and healing done by magical spells and effects by up to 34.",
                "Equip: Grants 6 health and 2 mana every 5 sec for 15 sec when one of your spells is resisted.",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_sword_24"
            },
            {
              "name": "Fallen Dragon's Scepter",
              "itemId": 281312,
              "weaponType": "Staff",
              "speed": "3.00",
              "dps": "19.9 DPS",
              "value": "19.9 DPS, 3.00s - Redridge Quest",
              "faction": "both",
              "quality": "q3",
              "iLvl": 32,
              "stats": "+11 Intellect, +13 Spirit, Equip: Increases damage and healing done by magical spells and effects by up to 36.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "54 - 81 Damage\tSpeed 3.40",
                "(19.9 damage per second)",
                "+11 Intellect",
                "+13 Spirit",
                "Equip: Increases damage and healing done by magical spells and effects by up to 36."
              ],
              "reqLevel": 24,
              "icon": "inv_staff_08"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 29,
          "stats": "+7 Intellect, Equip: Increases damage and healing done by magical spells and effects by up to 32., Equip: Melee attacks deal 98 additional Fire damage against Frozen targets.",
          "lines": [
            "Binds when picked up",
            "Main Hand\tSword",
            "17 - 32 Damage\tSpeed 2.00",
            "(12.3 damage per second)",
            "+7 Intellect",
            "Equip: Increases damage and healing done by magical spells and effects by up to 32.",
            "Equip: Melee attacks deal 98 additional Fire damage against Frozen targets.",
            "Classes: Mage",
            "Requires Level 21"
          ],
          "reqLevel": 21
        },
        {
          "levelBracket": "27–28",
          "itemId": 273040,
          "name": "Spine of the Devourer",
          "icon": "inv_staff_07",
          "weaponType": "Staff",
          "speed": "3.60",
          "dps": "20.7 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Mana Devourer",
            "detail": "City of Dalaran (+14 Sta, +36 Spell Power)"
          },
          "alts": [
            {
              "name": "Tendonscraper Dagger",
              "itemId": 273053,
              "value": "14.4 DPS, +36 SP - City of Dalaran: Lyn the Ignored",
              "faction": "both",
              "dps": "14.38 DPS",
              "speed": "1.60",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 33,
              "stats": "+5 Stamina, Equip: +8 Health Regeneration, Equip: +36 Spell Power",
              "lines": [
                "Binds when picked up",
                "Main Hand\tDagger",
                "16 - 30 Damage\tSpeed 1.60",
                "(14.4 damage per second)",
                "+5 Stamina",
                "Requires Level 28",
                "Equip: +8 Health Regeneration",
                "Equip: +36 Spell Power",
                "Sell Price: 73s 79c"
              ],
              "reqLevel": 28,
              "icon": "inv_misc_bone_06"
            },
            {
              "name": "Wand of Mana Concentration",
              "itemId": 273043,
              "weaponType": "Wand",
              "quality": "q3",
              "iLvl": 32,
              "reqLevel": 27,
              "dps": "24.5 DPS",
              "speed": "1.60",
              "icon": "inv_wand_04",
              "value": "Datamined Dungeon Wand (+5 Intellect)"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 33,
          "stats": "+14 Stamina, Equip: +3 Spell Penetration, Equip: +36 Spell Power",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "59 - 90 Damage\tSpeed 3.60",
            "(20.7 damage per second)",
            "+14 Stamina",
            "Requires Level 28",
            "Equip: +3 Spell Penetration",
            "Equip: +36 Spell Power",
            "Sell Price: 85s 58c"
          ],
          "reqLevel": 28
        },
        {
          "levelBracket": "29–30",
          "itemId": 279844,
          "name": "Striking Staff",
          "icon": "inv_staff_10",
          "weaponType": "Staff",
          "speed": "3.10",
          "dps": "31.3 DPS",
          "source": {
            "kind": "quest",
            "title": "Heart of Disruption",
            "detail": "City of Dalaran dungeon quest (+9 Str, +6 Sta, +14 Int)"
          },
          "alts": [
            {
              "name": "Coldflame Saber",
              "itemId": 276631,
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 31,
              "reqLevel": 26,
              "dps": "19.8 DPS",
              "speed": "2.10",
              "stats": "+7 Intellect, +8 Spell Power",
              "icon": "inv_sword_04",
              "value": "Dungeon Boss Drop (Top Level 30 Caster 1H Sword)"
            },
            {
              "name": "Fallen Dragon's Scepter",
              "itemId": 281312,
              "value": "19.9 DPS, 3.40s, +11 Int, +13 Spi, +36 SP - Wetlands Quest: Stopping the Cycle",
              "faction": "both",
              "dps": "19.85 DPS",
              "speed": "3.40",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 32,
              "stats": "+11 Intellect, +13 Spirit, Equip: Increases damage and healing done by magical spells and effects by up to 36.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "54 - 81 Damage\tSpeed 3.40",
                "(19.9 damage per second)",
                "+11 Intellect",
                "+13 Spirit",
                "Equip: Increases damage and healing done by magical spells and effects by up to 36."
              ],
              "reqLevel": 24,
              "icon": "inv_staff_08"
            },
            {
              "name": "Mindslicer",
              "itemId": 270069,
              "value": "15.3 DPS, +7 Int, +34 SP - Arathi: Call to Arms",
              "faction": "both",
              "dps": "15.26 DPS",
              "speed": "1.90",
              "weaponType": "Dagger",
              "quality": "q2",
              "iLvl": 41,
              "stats": "+7 Intellect, Equip: Increases damage and healing done by magical spells and effects by up to 34.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tDagger",
                "20 - 38 Damage\tSpeed 1.90",
                "(15.3 damage per second)",
                "+7 Intellect",
                "Equip: Increases damage and healing done by magical spells and effects by up to 34."
              ],
              "reqLevel": 30,
              "icon": "inv_weapon_shortblade_15"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 36,
          "stats": "+9 Strength, +6 Stamina, +14 Intellect",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "77 - 117 Damage\tSpeed 3.10",
            "(31.3 damage per second)",
            "+9 Strength",
            "+6 Stamina",
            "+14 Intellect"
          ],
          "reqLevel": 24
        },
        {
          "levelBracket": "31–35",
          "itemId": 7713,
          "name": "Illusionary Rod",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "25.7 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Arcanist Doan",
            "detail": "Scarlet Monastery Library (+15 Int, +10 Spi)"
          },
          "alts": [
            {
              "name": "Hypnotic Blade",
              "itemId": 7714,
              "value": "26.8 DPS, +9 SP, +8 Int - SM Library: Arcanist Doan",
              "faction": "both",
              "dps": "17.5 DPS",
              "speed": "1.40",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 39,
              "reqLevel": 34,
              "stats": "+9 SP, +8 Int",
              "icon": "inv_weapon_shortblade_07"
            },
            {
              "name": "Narpas Sword",
              "itemId": 217497,
              "value": "+48 Spell Power, +10 Hit Rating - Level 34 Mage 1H Sword",
              "faction": "both",
              "dps": "26.5 DPS",
              "speed": "2.10",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 42,
              "reqLevel": 34,
              "stats": "+48 Spell Power, +10 Hit Rating",
              "icon": "inv_weapon_shortblade_79",
              "source": {
                "kind": "dungeon",
                "title": "Dungeon Drop",
                "detail": "Specialized caster 1H sword for Mages."
              }
            },
            {
              "name": "Staff of Jordan",
              "itemId": 873,
              "value": "+60 Spell Power, +11 Int, +11 Spi - Level 35 Epic World Drop",
              "faction": "both",
              "dps": "29.9 DPS",
              "speed": "3.70",
              "weaponType": "Staff",
              "quality": "q4",
              "iLvl": 40,
              "reqLevel": 35,
              "stats": "+60 Spell Power, +11 Intellect, +11 Spirit",
              "icon": "inv_staff_13"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 39,
          "reqLevel": 34,
          "stats": "+15 Int, +10 Spi"
        },
        {
          "levelBracket": "36–40",
          "itemId": 7713,
          "name": "Illusionary Rod",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "25.7 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Arcanist Doan",
            "detail": "Strong stats carry through the late 30s (Continue wielding Illusionary Rod / Hypnotic Blade / Narpas Sword: spell power out-scales late 30s quest rewards)"
          },
          "alts": [
            {
              "name": "Staff of Jordan",
              "itemId": 873,
              "value": "31.0 DPS, +26 Spell Power - World drop BoE staff",
              "faction": "both",
              "dps": "29.86 DPS",
              "speed": "3.70",
              "weaponType": "Staff",
              "quality": "q4",
              "iLvl": 40,
              "reqLevel": 35,
              "stats": "+26 Spell Power",
              "icon": "inv_staff_13"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 39,
          "reqLevel": 34,
          "stats": "+10 Stamina, +6 Intellect, +7 Spirit, +14 Critical Strike Rating, +44 Spell Power"
        },
        {
          "levelBracket": "41–46",
          "itemId": 9527,
          "name": "Spellshifter Rod",
          "icon": "inv_wand_11",
          "weaponType": "Staff",
          "speed": "3.00",
          "dps": "31.1 DPS",
          "source": {
            "kind": "quest",
            "title": "Tiara of the Deep",
            "detail": "Custom quest reward (+16 Int, +10 Spi)"
          },
          "alts": [
            {
              "name": "Zum'rah's Vexing Cane",
              "itemId": 18082,
              "value": "32.3 DPS, +10 Int, +21 SP - ZF: Witch Doctor Zum'rah",
              "faction": "both",
              "dps": "31.11 DPS",
              "speed": "2.70",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 48,
              "reqLevel": 43,
              "stats": "+10 Int, +21 SP",
              "icon": "inv_staff_01"
            },
            {
              "name": "Emerald Watcher's Dreamstaff",
              "itemId": 282007,
              "weaponType": "Staff",
              "speed": "3.00",
              "dps": "31.7 DPS",
              "value": "31.7 DPS, 3.00s - Custom Staff Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 49,
              "reqLevel": 44,
              "stats": "",
              "icon": "inv_staff_17"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 48,
          "reqLevel": 40,
          "stats": "+16 Int, +10 Spi"
        },
        {
          "levelBracket": "47–52",
          "itemId": 11750,
          "name": "Kindling Stave",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "34.1 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Pyromancer Loregrain",
            "detail": "Blackrock Depths (+12 Int, +20 Spi)"
          },
          "alts": [
            {
              "name": "Spire of the Stoneshaper",
              "itemId": 12532,
              "value": "Blackrock Depths — High Interrogator Gerstahn",
              "faction": "both",
              "dps": "33.8 DPS",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 51,
              "stats": "+15 Intellect, +10 Stamina, +14 Spell Power",
              "icon": "inv_staff_29",
              "weaponType": "Staff"
            },
            {
              "name": "Inventor's Focal Sword",
              "itemId": 17719,
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 53,
              "reqLevel": 48,
              "dps": "35.4 DPS",
              "speed": "2.20",
              "stats": "+6 Intellect, Equip: Improves your chance to get a critical strike with spells by 1%.",
              "icon": "inv_sword_04",
              "value": "Maraudon — Tinkerer Gizlock (+1% Spell Critical Strike)"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 53,
          "reqLevel": 48,
          "stats": "+12 Int, +20 Spi"
        },
        {
          "levelBracket": "53–60",
          "itemId": 274420,
          "name": "Wisepaw Totem",
          "icon": "inv_staff_51",
          "weaponType": "Staff",
          "speed": "3.20",
          "dps": "36.9 DPS",
          "source": {
            "kind": "vendor",
            "title": "Dala Fairmaw",
            "detail": "Mount Hyjal vendor (+Spell Power & Healing)"
          },
          "alts": [
            {
              "name": "Rod of the Ogre Magi",
              "itemId": 18534,
              "value": "Dire Maul North — Tribute Chest",
              "faction": "both",
              "dps": "36.0 DPS",
              "quality": "q3",
              "iLvl": 63,
              "reqLevel": 58,
              "stats": "+11 Intellect, +14 Stamina, +7 Spirit, +23 Spell Power, +1% Spell Crit",
              "icon": "inv_staff_13",
              "weaponType": "Staff"
            },
            {
              "name": "Witchblade",
              "itemId": 13968,
              "value": "37.2 DPS, 1.80s, +14 SP - Scholomance: Darkmaster Gandling",
              "faction": "both",
              "dps": "37.2 DPS",
              "speed": "1.80",
              "quality": "q3",
              "iLvl": 58,
              "reqLevel": 52,
              "stats": "+14 SP",
              "icon": "inv_weapon_shortblade_16"
            },
            {
              "name": "Sageblade",
              "itemId": 22378,
              "weaponType": "One-handed sword",
              "quality": "q4",
              "iLvl": 65,
              "reqLevel": 60,
              "dps": "41.2 DPS",
              "speed": "2.00",
              "stats": "+14 Intellect, +27 Spell Power, +1% Spell Crit",
              "icon": "inv_sword_39",
              "value": "Blacksmithing (Top Pre-Raid Caster 1H Sword)"
            },
            {
              "name": "Azuresong Mageblade",
              "itemId": 17103,
              "weaponType": "One-handed sword",
              "quality": "q4",
              "iLvl": 66,
              "reqLevel": 60,
              "dps": "41.2 DPS",
              "speed": "1.80",
              "stats": "+7 Intellect, +12 Stamina, +40 Spell Power, +1% Spell Crit",
              "icon": "inv_sword_39",
              "value": "Molten Core — Golemagg the Incinerator"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 58,
          "reqLevel": 53,
          "stats": ""
        }
      ]
    },
    "warlock": {
      "classId": "warlock",
      "tracks": [
        {
          "id": "primary",
          "name": "Staves & Spellblades (Affliction / Demonology / Destruction)"
        }
      ],
      "levels": [
        {
          "levelBracket": "1–2",
          "itemId": 1159,
          "name": "Militia Quarterstaff",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.60",
          "dps": "2.7 DPS",
          "source": {
            "kind": "quest",
            "title": "Brotherhood of Thieves",
            "detail": "Early starting quest reward"
          },
          "alts": [
            {
              "name": "Walking Stick",
              "itemId": 2495,
              "value": "4.2 DPS - Starter vendor staff",
              "faction": "both",
              "dps": "4.2 DPS",
              "speed": "2.50",
              "weaponType": "Staff",
              "quality": "q1",
              "iLvl": 8,
              "reqLevel": 3,
              "stats": "",
              "icon": "inv_staff_08"
            }
          ],
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 6,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "3–4",
          "itemId": 2495,
          "name": "Walking Stick",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.50",
          "dps": "4.2 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Sold in starter hub towns"
          },
          "alts": [],
          "faction": "both",
          "quality": "q1",
          "iLvl": 8,
          "reqLevel": 3,
          "stats": ""
        },
        {
          "levelBracket": "5–6",
          "itemId": 3446,
          "name": "Darkwood Staff",
          "icon": "inv_staff_16",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "4.8 DPS",
          "source": {
            "kind": "drop",
            "title": "Darkwood Staff",
            "detail": "World drop in Level 8-15 zones."
          },
          "alts": [],
          "faction": "both",
          "quality": "q2",
          "iLvl": 11,
          "reqLevel": 6,
          "stats": "+2 Stamina, +1 Intellect"
        },
        {
          "levelBracket": "7–8",
          "itemId": 248008,
          "name": "Apprentice's Spellstaff",
          "icon": "inv_staff_18",
          "weaponType": "Staff",
          "speed": "2.40",
          "dps": "6.4 DPS",
          "source": {
            "kind": "quest",
            "title": "Rare Books / Kobold Camp",
            "detail": "Starting zone quest reward"
          },
          "alts": [
            {
              "name": "Staff of the Dor'Danil",
              "itemId": 15396,
              "value": "8.5 DPS - Early quest",
              "faction": "both",
              "dps": "8.5 DPS",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 6,
              "stats": "",
              "icon": "inv_staff_08"
            },
            {
              "name": "Darkwood Staff",
              "itemId": 3446,
              "value": "6.7 DPS, 3.20s - Tirisfal Quest: The Family Crypt",
              "faction": "horde",
              "dps": "6.72 DPS",
              "speed": "3.20",
              "weaponType": "Staff",
              "quality": "q2",
              "iLvl": 13,
              "reqLevel": 7,
              "stats": "+6 Spell Power",
              "icon": "inv_staff_16"
            },
            {
              "name": "Deepblaze",
              "itemId": 279896,
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 14,
              "reqLevel": 9,
              "dps": "7.8 DPS",
              "speed": "1.80",
              "icon": "inv_wand_02",
              "value": "Datamined Starter Wand"
            }
          ],
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 12,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "9–10",
          "itemId": 6682,
          "name": "Staff of the Dor'Danil",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.80",
          "dps": "7.7 DPS",
          "source": {
            "kind": "quest",
            "title": "The Relics of Wakening",
            "detail": "Early quest reward in Teldrassil / Darkshore."
          },
          "alts": [],
          "faction": "both",
          "quality": "q2",
          "iLvl": 15,
          "reqLevel": 10,
          "stats": "+2 Intellect, +2 Spirit"
        },
        {
          "levelBracket": "11–12",
          "itemId": 5340,
          "name": "Cauldron Stirrer",
          "icon": "inv_weapon_shortblade_10",
          "weaponType": "Staff",
          "speed": "2.60",
          "dps": "8.8 DPS",
          "source": {
            "kind": "quest",
            "title": "The Decisive Action",
            "detail": "Quest reward in Westfall / Silverpine."
          },
          "alts": [
            {
              "name": "Pagan Rod",
              "itemId": 15974,
              "value": "8.6 DPS - Vendor wand",
              "faction": "both",
              "dps": "8.6 DPS",
              "quality": "q2",
              "iLvl": 16,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_staff_11",
              "weaponType": "Held In Off-hand"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 16,
          "reqLevel": 11,
          "stats": "+3 Stamina, +2 Intellect"
        },
        {
          "levelBracket": "13–14",
          "itemId": 270228,
          "name": "Golemheart Stave",
          "icon": "inv_staff_10",
          "weaponType": "Staff",
          "speed": "2.60",
          "dps": "14.2 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Plunder",
            "detail": "Hall of Thanes dungeon (+5 Int, +4 Spirit)"
          },
          "alts": [
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Fang of Magmatus",
              "itemId": 271095,
              "value": "11.8 DPS, 1.60s, +2 Agi, +2 Fire SP - Hall of Thanes: Magmatus",
              "faction": "both",
              "dps": "7.94 DPS",
              "speed": "1.70",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "+2 Agi, +2 Fire SP",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Searing Dagger",
              "itemId": 273003,
              "weaponType": "Dagger",
              "speed": "1.60",
              "dps": "8.1 DPS",
              "value": "8.1 DPS, 1.60s - RFC Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "",
              "icon": "inv_weapon_shortblade_03"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 18,
          "reqLevel": 13,
          "stats": "+5 Int, +4 Spirit"
        },
        {
          "levelBracket": "15–16",
          "itemId": 271203,
          "name": "Segmented Spider Leg",
          "icon": "inv_staff_13",
          "weaponType": "Staff",
          "speed": "2.70",
          "dps": "14.8 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Witherfang",
            "detail": "Ruins of Lordaeron, levels 15–20 (+5 Int, +4 Sta)"
          },
          "alts": [
            {
              "name": "Gnarled Necromancer's Staff",
              "itemId": 251534,
              "value": "15.18 DPS, 2.80s (+12 Spell Power) - The Wrath of Rath'mael in Ruins of Lordaeron",
              "faction": "horde",
              "dps": "15.18 DPS",
              "speed": "2.80",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 15,
              "stats": "+10 Spirit",
              "icon": "inv_staff_16"
            },
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Emberstone Staff",
              "itemId": 5201,
              "value": "14.2 DPS, +5 Int, +5 Spi - Deadmines: Captain Greenskin",
              "faction": "both",
              "dps": "14.17 DPS",
              "speed": "3.00",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 22,
              "reqLevel": 17,
              "stats": "+5 Int, +5 Spi",
              "icon": "inv_staff_13"
            },
            {
              "name": "Meathook Slicer",
              "itemId": 271204,
              "value": "13.2 DPS - Ruins of Lordaeron: The Baron",
              "faction": "both",
              "dps": "13.61 DPS",
              "speed": "1.80",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 20,
              "reqLevel": 15,
              "stats": "",
              "icon": "inv_weapon_shortblade_02"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 20,
          "reqLevel": 15,
          "stats": "+5 Int, +4 Sta"
        },
        {
          "levelBracket": "17–18",
          "itemId": 271215,
          "name": "Coldspire Staff",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.80",
          "dps": "16.8 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Rath'mael",
            "detail": "Ruins of Lordaeron (+7 Int, +5 Spi, +6 Frost Dmg)"
          },
          "alts": [
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Staff of Westfall",
              "itemId": 2042,
              "value": "15.2 DPS, +5 Int, +11 Spi - Deadmines Quest: The Defias Brotherhood",
              "faction": "alliance",
              "dps": "15.17 DPS",
              "speed": "3.00",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "stats": "+5 Int, +11 Spi",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "36 - 55 Damage\tSpeed 3.00",
                "(15.2 damage per second)",
                "+5 Intellect",
                "+6 Spirit",
                "Equip: Increases healing done by up to 48 and damage done by up to 16 for all magical spells and effects.",
                "Equip: Movement speed increased by 2% in Elwynn Forest, Westfall, Redridge Mountains, and the Deadmines."
              ],
              "reqLevel": 14,
              "icon": "inv_staff_10"
            },
            {
              "name": "Vileblood Scimitar",
              "itemId": 271218,
              "value": "15.0 DPS, 2.20s - Ruins of Lordaeron: Viktor",
              "faction": "both",
              "dps": "14.62 DPS",
              "speed": "2.60",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 22,
              "reqLevel": 17,
              "stats": "",
              "icon": "inv_sword_01"
            },
            {
              "name": "Witching Stave",
              "itemId": 1484,
              "value": "+27 Shadow Spell Power, +6 Sta, +5 Int - Level 17 Rare Drop",
              "faction": "both",
              "dps": "14.0 DPS",
              "speed": "3.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 22,
              "reqLevel": 17,
              "stats": "+27 Shadow Spell Power, +6 Stamina, +5 Intellect",
              "icon": "inv_wand_04"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 24,
          "reqLevel": 19,
          "stats": "+7 Int, +5 Spi, +6 Frost Dmg"
        },
        {
          "levelBracket": "19–20",
          "itemId": 6318,
          "name": "Odo's Ley Staff",
          "icon": "inv_staff_27",
          "weaponType": "Staff",
          "speed": "2.70",
          "dps": "16.0 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Odo the Blindwatcher",
            "detail": "Shadowfang Keep (+4 Int, +5 Spi)"
          },
          "alts": [
            {
              "name": "Crescent Staff",
              "itemId": 6505,
              "value": "+26 Spell Power, +7 Agi, +7 Sta - Leaders of the Fang quest in Wailing Caverns (Horde)",
              "faction": "horde",
              "dps": "15.2 DPS",
              "speed": "2.90",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 10,
              "stats": "+26 Spell Power, +7 Agility, +7 Stamina",
              "icon": "inv_staff_04",
              "source": {
                "kind": "quest",
                "title": "Leaders of the Fang",
                "detail": "Major dungeon quest reward in Wailing Caverns (Horde). Elite spell power boost."
              }
            },
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Staff of Westfall",
              "itemId": 2042,
              "value": "15.2 DPS - Deadmines Quest",
              "faction": "alliance",
              "dps": "15.17 DPS",
              "speed": "3.00",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "stats": "+6 Spirit, +48 Healing, +16 Spell Damage",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "36 - 55 Damage\tSpeed 3.00",
                "(15.2 damage per second)",
                "+5 Intellect",
                "+6 Spirit",
                "Equip: Increases healing done by up to 48 and damage done by up to 16 for all magical spells and effects.",
                "Equip: Movement speed increased by 2% in Elwynn Forest, Westfall, Redridge Mountains, and the Deadmines."
              ],
              "reqLevel": 14,
              "icon": "inv_staff_10"
            },
            {
              "name": "Glimmering Staff",
              "itemId": 249392,
              "value": "18.4 DPS, 2.20s, Req Level 25 - Enchanting (140)",
              "faction": "both",
              "dps": "18.41 DPS",
              "speed": "2.20",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 30,
              "stats": "+11 Intellect, +11 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 34.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "32 - 49 Damage\tSpeed 2.20",
                "(18.4 damage per second)",
                "+11 Intellect",
                "+11 Stamina",
                "Equip: Increases damage and healing done by magical spells and effects by up to 34.",
                "Requires Level 25"
              ],
              "reqLevel": 25,
              "icon": "inv_staff_19"
            },
            {
              "name": "Staff of Soran'ruk",
              "itemId": 15109,
              "value": "+34 Fire/Shadow Spell Power, +14 Sta - Warlock Quest",
              "faction": "both",
              "dps": "15.7 DPS",
              "speed": "2.90",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+34 Fire/Shadow Spell Power, +14 Stamina",
              "icon": "inv_staff_09",
              "source": {
                "kind": "quest",
                "title": "The Staff of Soran'ruk",
                "detail": "Warlock level 20 class quest reward from BFD / Shadowfang Keep."
              }
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 26,
          "stats": "+5 Stamina, +12 Spirit, Equip: Increases healing done by up to 52 and damage done by up to 17 for all magical spells and effects.",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "37 - 56 Damage\tSpeed 2.90",
            "(16.0 damage per second)",
            "+5 Stamina",
            "+12 Spirit",
            "Equip: Increases healing done by up to 52 and damage done by up to 17 for all magical spells and effects.",
            "Requires Level 21"
          ],
          "reqLevel": 21
        },
        {
          "levelBracket": "21–24",
          "itemId": 15109,
          "name": "Staff of Soran'ruk",
          "icon": "inv_staff_09",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "15.7 DPS",
          "source": {
            "kind": "quest",
            "title": "The Staff of Soran'ruk",
            "detail": "Warlock level 20 class quest in BFD/SFK. Game-changing +34 spell power spike."
          },
          "alts": [
            {
              "name": "Rod of the Sleepwalker",
              "itemId": 1155,
              "value": "17.7 DPS, +11 Int, +10 Spi - BFD: Twilight Lord Kelris",
              "faction": "both",
              "dps": "17.68 DPS",
              "speed": "2.80",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 29,
              "reqLevel": 24,
              "stats": "+11 Int, +10 Spi",
              "icon": "inv_staff_06"
            },
            {
              "name": "Meteor Shard",
              "itemId": 6220,
              "value": "17.8 DPS - SFK: Archmage Arugal",
              "faction": "both",
              "dps": "17.78 DPS",
              "speed": "1.80",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 28,
              "reqLevel": 23,
              "stats": "+3 Fire Resistance",
              "icon": "inv_weapon_shortblade_25"
            },
            {
              "name": "Alliance Outrunner Staff",
              "itemId": 285350,
              "weaponType": "Staff",
              "speed": "2.50",
              "dps": "16.2 DPS",
              "value": "16.2 DPS, 2.50s - Alliance Drop",
              "faction": "alliance",
              "quality": "q3",
              "iLvl": 26,
              "reqLevel": 21,
              "stats": "",
              "icon": "inv_staff_11"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 25,
          "stats": "+34 Fire/Shadow Spell Power, +14 Stamina",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "36 - 55 Damage\tSpeed 2.90",
            "(15.7 damage per second)",
            "+14 Stamina",
            "Equip: Increases damage done by Fire spells and effects by up to 34.",
            "Equip: Increases damage done by Shadow spells and effects by up to 34.",
            "Classes: Warlock"
          ],
          "reqLevel": 20
        },
        {
          "levelBracket": "25–26",
          "itemId": 274158,
          "name": "Death Prophet Spine",
          "icon": "inv_staff_17",
          "weaponType": "Staff",
          "speed": "2.80",
          "dps": "18.93 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Razorfen Kraul",
            "detail": "Drop from Death Speaker Jargba in RFK."
          },
          "alts": [
            {
              "name": "Healer's Staff",
              "itemId": 271767,
              "value": "20.77 DPS, 2.60s (+16 Healing) - Excavation Site: Wetlands",
              "faction": "both",
              "dps": "20.77 DPS",
              "speed": "2.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 24,
              "stats": "+12 Stamina",
              "icon": "inv_staff_10"
            },
            {
              "name": "Striking Staff",
              "itemId": 279844,
              "value": "31.29 DPS, 3.10s (+14 Spell Power) - Heart of Disruption in City of Dalaran",
              "faction": "horde",
              "dps": "31.29 DPS",
              "speed": "3.10",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 36,
              "reqLevel": 24,
              "stats": "+9 Strength, +6 Stamina, +14 Intellect",
              "icon": "inv_staff_10"
            },
            {
              "name": "Debt Collector",
              "itemId": 273827,
              "value": "13.0 DPS, 2.30s, +34 SP, Req Level 26 - Stockade: Bazil Thredd",
              "faction": "both",
              "dps": "13.04 DPS",
              "speed": "2.30",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 31,
              "stats": "Equip: Increases damage and healing done by magical spells and effects by up to 34., Equip: Grants 6 health and 2 mana every 5 sec for 15 sec when one of your spells is resisted.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tSword",
                "21 - 39 Damage\tSpeed 2.30",
                "(13.0 damage per second)",
                "Equip: Increases damage and healing done by magical spells and effects by up to 34.",
                "Equip: Grants 6 health and 2 mana every 5 sec for 15 sec when one of your spells is resisted.",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_sword_24"
            },
            {
              "name": "Fallen Dragon's Scepter",
              "itemId": 281312,
              "weaponType": "Staff",
              "speed": "3.00",
              "dps": "19.9 DPS",
              "value": "19.9 DPS, 3.00s - Redridge Quest",
              "faction": "both",
              "quality": "q3",
              "iLvl": 32,
              "stats": "+11 Intellect, +13 Spirit, Equip: Increases damage and healing done by magical spells and effects by up to 36.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "54 - 81 Damage\tSpeed 3.40",
                "(19.9 damage per second)",
                "+11 Intellect",
                "+13 Spirit",
                "Equip: Increases damage and healing done by magical spells and effects by up to 36."
              ],
              "reqLevel": 24,
              "icon": "inv_staff_08"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 30,
          "stats": "+11 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 34., Equip: Restores 5 Mana per 5 sec.",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "42 - 64 Damage\tSpeed 2.80",
            "(18.9 damage per second)",
            "+11 Stamina",
            "Equip: Increases damage and healing done by magical spells and effects by up to 34.",
            "Equip: Restores 5 Mana per 5 sec.",
            "Requires Level 26"
          ],
          "reqLevel": 26
        },
        {
          "levelBracket": "27–28",
          "itemId": 273040,
          "name": "Spine of the Devourer",
          "icon": "inv_staff_07",
          "weaponType": "Staff",
          "speed": "3.60",
          "dps": "20.7 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Mana Devourer",
            "detail": "City of Dalaran (+14 Sta, +36 Spell Power)"
          },
          "alts": [
            {
              "name": "Tendonscraper Dagger",
              "itemId": 273053,
              "value": "14.4 DPS, +36 SP - City of Dalaran: Lyn the Ignored",
              "faction": "both",
              "dps": "14.38 DPS",
              "speed": "1.60",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 33,
              "stats": "+5 Stamina, Equip: +8 Health Regeneration, Equip: +36 Spell Power",
              "lines": [
                "Binds when picked up",
                "Main Hand\tDagger",
                "16 - 30 Damage\tSpeed 1.60",
                "(14.4 damage per second)",
                "+5 Stamina",
                "Requires Level 28",
                "Equip: +8 Health Regeneration",
                "Equip: +36 Spell Power",
                "Sell Price: 73s 79c"
              ],
              "reqLevel": 28,
              "icon": "inv_misc_bone_06"
            },
            {
              "name": "Wand of Mana Concentration",
              "itemId": 273043,
              "weaponType": "Wand",
              "quality": "q3",
              "iLvl": 32,
              "reqLevel": 27,
              "dps": "24.5 DPS",
              "speed": "1.60",
              "icon": "inv_wand_04",
              "value": "Datamined Dungeon Wand (+5 Intellect)"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 33,
          "stats": "+14 Stamina, Equip: +3 Spell Penetration, Equip: +36 Spell Power",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "59 - 90 Damage\tSpeed 3.60",
            "(20.7 damage per second)",
            "+14 Stamina",
            "Requires Level 28",
            "Equip: +3 Spell Penetration",
            "Equip: +36 Spell Power",
            "Sell Price: 85s 58c"
          ],
          "reqLevel": 28
        },
        {
          "levelBracket": "29–30",
          "itemId": 281312,
          "name": "Fallen Dragon's Scepter",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "3.40",
          "dps": "19.85 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Gnomeregan / RFK",
            "detail": "Dungeon boss drop."
          },
          "alts": [
            {
              "name": "Coldflame Saber",
              "itemId": 276631,
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 31,
              "reqLevel": 26,
              "dps": "19.8 DPS",
              "speed": "2.10",
              "stats": "+7 Intellect, +8 Spell Power",
              "icon": "inv_sword_04",
              "value": "Dungeon Boss Drop (Top Level 30 Caster 1H Sword)"
            },
            {
              "name": "Mindslicer",
              "itemId": 270069,
              "value": "15.3 DPS, +7 Int, +34 SP - Arathi: Call to Arms",
              "faction": "both",
              "dps": "15.26 DPS",
              "speed": "1.90",
              "weaponType": "Dagger",
              "quality": "q2",
              "iLvl": 41,
              "stats": "+7 Intellect, Equip: Increases damage and healing done by magical spells and effects by up to 34.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tDagger",
                "20 - 38 Damage\tSpeed 1.90",
                "(15.3 damage per second)",
                "+7 Intellect",
                "Equip: Increases damage and healing done by magical spells and effects by up to 34."
              ],
              "reqLevel": 30,
              "icon": "inv_weapon_shortblade_15"
            },
            {
              "name": "Debt Collector",
              "itemId": 273827,
              "value": "13.0 DPS, 2.30s, +34 SP - Stockade: Bazil Thredd",
              "faction": "both",
              "dps": "13.04 DPS",
              "speed": "2.30",
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 31,
              "stats": "Equip: Increases damage and healing done by magical spells and effects by up to 34., Equip: Grants 6 health and 2 mana every 5 sec for 15 sec when one of your spells is resisted.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tSword",
                "21 - 39 Damage\tSpeed 2.30",
                "(13.0 damage per second)",
                "Equip: Increases damage and healing done by magical spells and effects by up to 34.",
                "Equip: Grants 6 health and 2 mana every 5 sec for 15 sec when one of your spells is resisted.",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_sword_24"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 35,
          "stats": "+11 Intellect, +13 Spirit, Equip: Increases damage and healing done by magical spells and effects by up to 36.",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "54 - 81 Damage\tSpeed 3.40",
            "(19.9 damage per second)",
            "+11 Intellect",
            "+13 Spirit",
            "Equip: Increases damage and healing done by magical spells and effects by up to 36.",
            "Requires Level 24"
          ],
          "reqLevel": 24
        },
        {
          "levelBracket": "31–35",
          "itemId": 7713,
          "name": "Illusionary Rod",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "25.7 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Arcanist Doan",
            "detail": "Scarlet Monastery Library (+15 Int, +10 Spi)"
          },
          "alts": [
            {
              "name": "Hypnotic Blade",
              "itemId": 7714,
              "value": "26.8 DPS, +9 SP, +8 Int - SM Library: Arcanist Doan",
              "faction": "both",
              "dps": "17.5 DPS",
              "speed": "1.40",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 39,
              "reqLevel": 34,
              "stats": "+9 SP, +8 Int",
              "icon": "inv_weapon_shortblade_07"
            },
            {
              "name": "Staff of Jordan",
              "itemId": 873,
              "value": "+60 Spell Power, +11 Int, +11 Spi - Level 35 Epic World Drop",
              "faction": "both",
              "dps": "29.9 DPS",
              "speed": "3.70",
              "weaponType": "Staff",
              "quality": "q4",
              "iLvl": 40,
              "reqLevel": 35,
              "stats": "+60 Spell Power, +11 Intellect, +11 Spirit",
              "icon": "inv_staff_13"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 39,
          "reqLevel": 34,
          "stats": "+15 Int, +10 Spi"
        },
        {
          "levelBracket": "36–40",
          "itemId": 7713,
          "name": "Illusionary Rod",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "25.7 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Arcanist Doan",
            "detail": "Outstanding caster stats carry through 40"
          },
          "alts": [
            {
              "name": "Staff of Jordan",
              "itemId": 873,
              "value": "31.0 DPS, +26 Spell Power - World drop BoE staff",
              "faction": "both",
              "dps": "29.86 DPS",
              "speed": "3.70",
              "weaponType": "Staff",
              "quality": "q4",
              "iLvl": 40,
              "reqLevel": 35,
              "stats": "+26 Spell Power",
              "icon": "inv_staff_13"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 39,
          "reqLevel": 34,
          "stats": "+10 Stamina, +6 Intellect, +7 Spirit, +14 Critical Strike Rating, +44 Spell Power"
        },
        {
          "levelBracket": "41–46",
          "itemId": 9527,
          "name": "Spellshifter Rod",
          "icon": "inv_wand_11",
          "weaponType": "Staff",
          "speed": "3.00",
          "dps": "31.1 DPS",
          "source": {
            "kind": "quest",
            "title": "Tiara of the Deep",
            "detail": "Custom quest reward (+16 Int, +10 Spi)"
          },
          "alts": [
            {
              "name": "Zum'rah's Vexing Cane",
              "itemId": 18082,
              "value": "32.3 DPS, +10 Int, +21 SP - ZF: Witch Doctor Zum'rah",
              "faction": "both",
              "dps": "31.11 DPS",
              "speed": "2.70",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 48,
              "reqLevel": 43,
              "stats": "+10 Int, +21 SP",
              "icon": "inv_staff_01"
            },
            {
              "name": "Emerald Watcher's Dreamstaff",
              "itemId": 282007,
              "weaponType": "Staff",
              "speed": "3.00",
              "dps": "31.7 DPS",
              "value": "31.7 DPS, 3.00s - Custom Staff Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 49,
              "reqLevel": 44,
              "stats": "",
              "icon": "inv_staff_17"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 48,
          "reqLevel": 40,
          "stats": "+16 Int, +10 Spi"
        },
        {
          "levelBracket": "47–50",
          "itemId": 20536,
          "name": "Soul Harvester",
          "icon": "inv_sword_48",
          "weaponType": "Staff",
          "speed": "3.30",
          "dps": "33.5 DPS",
          "source": {
            "kind": "quest",
            "title": "The Temple of Atal'Hakkar (Warlock Quest)",
            "detail": "Class quest in Sunken Temple. Best-in-slot leveling staff in the game for Warlocks."
          },
          "alts": [
            {
              "name": "Kindling Stave",
              "itemId": 11750,
              "value": "34.1 DPS - BRD: Pyromancer Loregrain",
              "faction": "both",
              "dps": "34.14 DPS",
              "speed": "2.90",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 53,
              "reqLevel": 48,
              "stats": "+14 Critical Strike Rating, +60 Spell Power",
              "icon": "inv_staff_08"
            },
            {
              "name": "Inventor's Focal Sword",
              "itemId": 17719,
              "weaponType": "One-handed sword",
              "quality": "q3",
              "iLvl": 53,
              "reqLevel": 48,
              "dps": "35.4 DPS",
              "speed": "2.20",
              "stats": "+6 Intellect, Equip: Improves your chance to get a critical strike with spells by 1%.",
              "icon": "inv_sword_04",
              "value": "Maraudon — Tinkerer Gizlock (+1% Spell Critical Strike)"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 52,
          "reqLevel": 50,
          "stats": "+73 Shadow Spell Power, +19 Stamina, +16 Intellect, +10 Hit Rating"
        },
        {
          "levelBracket": "51–60",
          "itemId": 20536,
          "name": "Soul Harvester",
          "icon": "inv_sword_48",
          "weaponType": "Staff",
          "speed": "3.30",
          "dps": "33.5 DPS",
          "source": {
            "kind": "quest",
            "title": "Trolls of a Feather",
            "detail": "Legendary warlock class scythe"
          },
          "alts": [
            {
              "name": "Wisepaw Totem",
              "itemId": 274420,
              "value": "36.9 DPS - Mount Hyjal vendor",
              "faction": "both",
              "dps": "36.88 DPS",
              "speed": "3.20",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 58,
              "reqLevel": 53,
              "stats": "",
              "icon": "inv_staff_51"
            },
            {
              "name": "Rod of the Ogre Magi",
              "itemId": 18534,
              "value": "Dire Maul North — Tribute Chest",
              "faction": "both",
              "dps": "36.0 DPS",
              "quality": "q3",
              "iLvl": 63,
              "reqLevel": 58,
              "stats": "+11 Intellect, +14 Stamina, +7 Spirit, +23 Spell Power, +1% Spell Crit",
              "icon": "inv_staff_13",
              "weaponType": "Staff"
            },
            {
              "name": "Witchblade",
              "itemId": 13968,
              "value": "37.2 DPS, 1.80s, +14 SP - Scholomance: Darkmaster Gandling",
              "faction": "both",
              "dps": "37.2 DPS",
              "speed": "1.80",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 50,
              "stats": "+14 SP",
              "icon": "inv_weapon_shortblade_16"
            },
            {
              "name": "Sageblade",
              "itemId": 22378,
              "weaponType": "One-handed sword",
              "quality": "q4",
              "iLvl": 65,
              "reqLevel": 60,
              "dps": "41.2 DPS",
              "speed": "2.00",
              "stats": "+14 Intellect, +27 Spell Power, +1% Spell Crit",
              "icon": "inv_sword_39",
              "value": "Blacksmithing (Top Pre-Raid Caster 1H Sword)"
            },
            {
              "name": "Azuresong Mageblade",
              "itemId": 17103,
              "weaponType": "One-handed sword",
              "quality": "q4",
              "iLvl": 66,
              "reqLevel": 60,
              "dps": "41.2 DPS",
              "speed": "1.80",
              "stats": "+7 Intellect, +12 Stamina, +40 Spell Power, +1% Spell Crit",
              "icon": "inv_sword_39",
              "value": "Molten Core — Golemagg the Incinerator"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 52,
          "reqLevel": 50,
          "stats": "+19 Stamina, +16 Intellect, +10 Hit Rating, +73 Shadow Spell Power"
        }
      ]
    },
    "priest": {
      "classId": "priest",
      "tracks": [
        {
          "id": "primary",
          "name": "Staves & Maces (Discipline / Holy / Shadow)"
        }
      ],
      "levels": [
        {
          "levelBracket": "1–2",
          "itemId": 2495,
          "name": "Acolyte's Staff",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.80",
          "dps": "2.0 DPS",
          "source": {
            "kind": "vendor",
            "title": "Starter Weapon Vendor",
            "detail": "Purchased from starter weapon vendors."
          },
          "alts": [],
          "faction": "both",
          "quality": "q1",
          "iLvl": 4,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "3–4",
          "itemId": 2495,
          "name": "Walking Stick",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.50",
          "dps": "4.2 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Purchased in starter hub towns"
          },
          "alts": [],
          "faction": "both",
          "quality": "q1",
          "iLvl": 8,
          "reqLevel": 3,
          "stats": ""
        },
        {
          "levelBracket": "5–6",
          "itemId": 3446,
          "name": "Darkwood Staff",
          "icon": "inv_staff_16",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "4.8 DPS",
          "source": {
            "kind": "drop",
            "title": "Darkwood Staff",
            "detail": "Level 8-15 zone drops across Eastern Kingdoms & Kalimdor."
          },
          "alts": [],
          "faction": "both",
          "quality": "q2",
          "iLvl": 11,
          "reqLevel": 6,
          "stats": "+2 Spirit, +1 Intellect"
        },
        {
          "levelBracket": "7–8",
          "itemId": 248008,
          "name": "Apprentice's Spellstaff",
          "icon": "inv_staff_18",
          "weaponType": "Staff",
          "speed": "2.40",
          "dps": "6.4 DPS",
          "source": {
            "kind": "quest",
            "title": "Rare Books / Kobold Camp",
            "detail": "Early starting quest reward"
          },
          "alts": [
            {
              "name": "Staff of the Dor'Danil",
              "itemId": 15396,
              "value": "8.5 DPS - Early quest",
              "faction": "both",
              "dps": "8.5 DPS",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 6,
              "stats": "",
              "icon": "inv_staff_08"
            },
            {
              "name": "Darkwood Staff",
              "itemId": 3446,
              "value": "6.7 DPS, 3.20s - Tirisfal Quest: The Family Crypt",
              "faction": "horde",
              "dps": "6.72 DPS",
              "speed": "3.20",
              "weaponType": "Staff",
              "quality": "q2",
              "iLvl": 13,
              "reqLevel": 7,
              "stats": "+6 Spell Power",
              "icon": "inv_staff_16"
            },
            {
              "name": "Deepblaze",
              "itemId": 279896,
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 14,
              "reqLevel": 9,
              "dps": "7.8 DPS",
              "speed": "1.80",
              "icon": "inv_wand_02",
              "value": "Datamined Starter Wand"
            }
          ],
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 12,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "9–10",
          "itemId": 6682,
          "name": "Staff of the Dor'Danil",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.80",
          "dps": "7.7 DPS",
          "source": {
            "kind": "quest",
            "title": "The Relics of Wakening",
            "detail": "Quest reward from Teldrassil / Darkshore."
          },
          "alts": [],
          "faction": "both",
          "quality": "q2",
          "iLvl": 15,
          "reqLevel": 10,
          "stats": "+2 Intellect, +2 Spirit"
        },
        {
          "levelBracket": "11–12",
          "itemId": 272996,
          "name": "Trogg Scepter",
          "icon": "inv_misc_bone_10",
          "weaponType": "One-handed mace",
          "speed": "2.10",
          "dps": "8.6 DPS",
          "source": {
            "kind": "drop",
            "title": "Loch Modan / Barrens Drops",
            "detail": "Drop from Troggs in Loch Modan or Quillboars in the Barrens."
          },
          "alts": [
            {
              "name": "Pagan Rod",
              "itemId": 15974,
              "value": "8.6 DPS - Vendor wand",
              "faction": "both",
              "dps": "8.6 DPS",
              "quality": "q2",
              "iLvl": 16,
              "reqLevel": 10,
              "stats": "",
              "icon": "inv_staff_11",
              "weaponType": "Held In Off-hand"
            },
            {
              "name": "Cauldron Stirrer",
              "itemId": 5340,
              "value": "7.4 DPS, 3.10s - Barrens Quest: Apothecary Zamah",
              "faction": "horde",
              "dps": "7.42 DPS",
              "speed": "3.10",
              "weaponType": "Staff",
              "quality": "q2",
              "iLvl": 15,
              "reqLevel": 10,
              "stats": "+8 Spell Power",
              "icon": "inv_staff_08"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 17,
          "reqLevel": 12,
          "stats": "+2 Spirit, +2 Stamina"
        },
        {
          "levelBracket": "13–14",
          "itemId": 270228,
          "name": "Golemheart Stave",
          "icon": "inv_staff_10",
          "weaponType": "Staff",
          "speed": "2.60",
          "dps": "14.2 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Plunder",
            "detail": "Hall of Thanes dungeon (+5 Int, +4 Spirit)"
          },
          "alts": [
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Trogg Scepter",
              "itemId": 272996,
              "value": "8.1 DPS, 2.40s - RFC: Oggleflint 1H mace",
              "faction": "both",
              "dps": "8.13 DPS",
              "speed": "2.40",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 18,
              "stats": "+4 Spirit, Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tMace",
                "13 - 26 Damage\tSpeed 2.40",
                "(8.1 damage per second)",
                "+4 Spirit",
                "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
                "Requires Level 13"
              ],
              "reqLevel": 13,
              "icon": "inv_misc_bone_10"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 18,
          "reqLevel": 13,
          "stats": "+5 Int, +4 Spirit"
        },
        {
          "levelBracket": "15–16",
          "itemId": 271216,
          "name": "Scepter of the Abandoned",
          "icon": "inv_mace_01",
          "weaponType": "One-handed mace",
          "speed": "2.20",
          "dps": "14.0 DPS",
          "source": {
            "kind": "dungeon",
            "title": "The Abandoned",
            "detail": "Ruins of Lordaeron (+4 Sta, +4 Int)"
          },
          "alts": [
            {
              "name": "Gnarled Necromancer's Staff",
              "itemId": 251534,
              "value": "15.18 DPS, 2.80s (+12 Spell Power) - The Wrath of Rath'mael in Ruins of Lordaeron",
              "faction": "horde",
              "dps": "15.18 DPS",
              "speed": "2.80",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 15,
              "stats": "+10 Spirit",
              "icon": "inv_staff_16"
            },
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Segmented Spider Leg",
              "itemId": 271203,
              "value": "14.8 DPS, +5 Int, +4 Sta - Ruins of Lordaeron: Witherfang",
              "faction": "both",
              "dps": "17.5 DPS",
              "speed": "3.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 20,
              "reqLevel": 15,
              "stats": "+5 Int, +4 Sta",
              "icon": "inv_staff_13"
            },
            {
              "name": "Emberstone Staff",
              "itemId": 5201,
              "value": "14.2 DPS - Deadmines: Captain Greenskin",
              "faction": "both",
              "dps": "14.17 DPS",
              "speed": "3.00",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 22,
              "reqLevel": 17,
              "stats": "+8 Stamina, +8 Fire Resistance, +24 Spell Power",
              "icon": "inv_staff_13"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 22,
          "reqLevel": 17,
          "stats": "+4 Sta, +4 Int"
        },
        {
          "levelBracket": "17–18",
          "itemId": 271215,
          "name": "Coldspire Staff",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.80",
          "dps": "16.8 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Rath'mael",
            "detail": "Ruins of Lordaeron (+7 Int, +5 Spi, +6 Frost Dmg)"
          },
          "alts": [
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Staff of Westfall",
              "itemId": 2042,
              "value": "15.2 DPS, +5 Int, +11 Spi - Deadmines Quest: The Defias Brotherhood",
              "faction": "alliance",
              "dps": "15.17 DPS",
              "speed": "3.00",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "stats": "+5 Int, +11 Spi",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "36 - 55 Damage\tSpeed 3.00",
                "(15.2 damage per second)",
                "+5 Intellect",
                "+6 Spirit",
                "Equip: Increases healing done by up to 48 and damage done by up to 16 for all magical spells and effects.",
                "Equip: Movement speed increased by 2% in Elwynn Forest, Westfall, Redridge Mountains, and the Deadmines."
              ],
              "reqLevel": 14,
              "icon": "inv_staff_10"
            },
            {
              "name": "Living Root",
              "itemId": 6631,
              "value": "14.7 DPS - WC: Verdan the Everliving",
              "faction": "both",
              "dps": "14.66 DPS",
              "speed": "2.90",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 23,
              "reqLevel": 18,
              "stats": "+5 Spirit, +9 Nature Resistance, +45 Healing, +15 Spell Damage",
              "icon": "inv_staff_25"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Witching Stave",
              "itemId": 1484,
              "value": "+27 Shadow Spell Power, +6 Sta, +5 Int - Level 17 Rare Drop",
              "faction": "both",
              "dps": "14.0 DPS",
              "speed": "3.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 22,
              "reqLevel": 17,
              "stats": "+27 Shadow Spell Power, +6 Stamina, +5 Intellect",
              "icon": "inv_wand_04"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 24,
          "reqLevel": 19,
          "stats": "+7 Int, +5 Spi, +6 Frost Dmg"
        },
        {
          "levelBracket": "19–20",
          "itemId": 2042,
          "name": "Staff of Westfall",
          "icon": "inv_staff_10",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "15.2 DPS",
          "source": {
            "kind": "quest",
            "title": "The Defias Brotherhood",
            "detail": "Deadmines quest reward (+5 Int, +11 Spi)"
          },
          "alts": [
            {
              "name": "Crescent Staff",
              "itemId": 6505,
              "value": "+26 Spell Power, +7 Agi, +7 Sta - Leaders of the Fang quest in Wailing Caverns (Horde)",
              "faction": "horde",
              "dps": "15.2 DPS",
              "speed": "2.90",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 10,
              "stats": "+26 Spell Power, +7 Agility, +7 Stamina",
              "icon": "inv_staff_04",
              "source": {
                "kind": "quest",
                "title": "Leaders of the Fang",
                "detail": "Major dungeon quest reward in Wailing Caverns (Horde). Elite spell power boost."
              }
            },
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Odo's Ley Staff",
              "itemId": 6318,
              "value": "16.0 DPS - SFK: Odo the Blindwatcher",
              "faction": "both",
              "dps": "16.03 DPS",
              "speed": "2.90",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 26,
              "stats": "+5 Stamina, +12 Spirit, Equip: Increases healing done by up to 52 and damage done by up to 17 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "37 - 56 Damage\tSpeed 2.90",
                "(16.0 damage per second)",
                "+5 Stamina",
                "+12 Spirit",
                "Equip: Increases healing done by up to 52 and damage done by up to 17 for all magical spells and effects.",
                "Requires Level 21"
              ],
              "reqLevel": 21,
              "icon": "inv_staff_27"
            },
            {
              "name": "Glimmering Staff",
              "itemId": 249392,
              "value": "18.4 DPS, 2.20s, Req Level 25 - Enchanting (140)",
              "faction": "both",
              "dps": "18.41 DPS",
              "speed": "2.20",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 30,
              "stats": "+11 Intellect, +11 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 34.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "32 - 49 Damage\tSpeed 2.20",
                "(18.4 damage per second)",
                "+11 Intellect",
                "+11 Stamina",
                "Equip: Increases damage and healing done by magical spells and effects by up to 34.",
                "Requires Level 25"
              ],
              "reqLevel": 25,
              "icon": "inv_staff_19"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            }
          ],
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 24,
          "stats": "+5 Int, +11 Spi",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "36 - 55 Damage\tSpeed 3.00",
            "(15.2 damage per second)",
            "+5 Intellect",
            "+6 Spirit",
            "Equip: Increases healing done by up to 48 and damage done by up to 16 for all magical spells and effects.",
            "Equip: Movement speed increased by 2% in Elwynn Forest, Westfall, Redridge Mountains, and the Deadmines."
          ],
          "reqLevel": 14
        },
        {
          "levelBracket": "21–24",
          "itemId": 1155,
          "name": "Rod of the Sleepwalker",
          "icon": "inv_shirt_green_01",
          "weaponType": "Staff",
          "speed": "2.80",
          "dps": "18.57 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Blackfathom Deeps",
            "detail": "Drop from Twilight Lord Kelris in BFD."
          },
          "alts": [
            {
              "name": "Staff of the Friar",
              "itemId": 3415,
              "weaponType": "Staff",
              "quality": "q2",
              "iLvl": 26,
              "reqLevel": 21,
              "dps": "17.4 DPS",
              "speed": "2.90",
              "stats": "+7 Intellect, +7 Spirit",
              "icon": "inv_staff_13",
              "value": "World Drop BoE (Top Early Priest Staff)"
            },
            {
              "name": "Alliance Outrunner Staff",
              "itemId": 285350,
              "weaponType": "Staff",
              "speed": "2.50",
              "dps": "16.2 DPS",
              "value": "16.2 DPS, 2.50s - Alliance Drop",
              "faction": "alliance",
              "quality": "q3",
              "iLvl": 26,
              "reqLevel": 21,
              "stats": "",
              "icon": "inv_staff_11"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 29,
          "stats": "+11 Intellect, +10 Spirit",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "41 - 63 Damage\tSpeed 2.80",
            "(18.6 damage per second)",
            "+11 Intellect",
            "+10 Spirit",
            "Requires Level 24"
          ],
          "reqLevel": 24
        },
        {
          "levelBracket": "25–26",
          "itemId": 274158,
          "name": "Death Prophet Spine",
          "icon": "inv_staff_17",
          "weaponType": "Staff",
          "speed": "2.80",
          "dps": "18.93 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Razorfen Kraul",
            "detail": "Drop from Death Speaker Jargba in RFK."
          },
          "alts": [
            {
              "name": "Healer's Staff",
              "itemId": 271767,
              "value": "20.77 DPS, 2.60s (+16 Healing) - Excavation Site: Wetlands",
              "faction": "both",
              "dps": "20.77 DPS",
              "speed": "2.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 24,
              "stats": "+12 Stamina",
              "icon": "inv_staff_10"
            },
            {
              "name": "Striking Staff",
              "itemId": 279844,
              "value": "31.29 DPS, 3.10s (+14 Spell Power) - Heart of Disruption in City of Dalaran",
              "faction": "horde",
              "dps": "31.29 DPS",
              "speed": "3.10",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 36,
              "reqLevel": 24,
              "stats": "+9 Strength, +6 Stamina, +14 Intellect",
              "icon": "inv_staff_10"
            },
            {
              "name": "Crested Scepter",
              "itemId": 3414,
              "value": "17.5 DPS - SM Graveyard: Fallen Champion",
              "faction": "both",
              "dps": "12.12 DPS",
              "speed": "2.60",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 29,
              "stats": "+2 Intellect, +6 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 32.",
              "lines": [
                "Binds when equipped",
                "Main Hand\tMace",
                "22 - 41 Damage\tSpeed 2.60",
                "(12.1 damage per second)",
                "+2 Intellect",
                "+6 Stamina",
                "Equip: Increases damage and healing done by magical spells and effects by up to 32.",
                "Requires Level 24"
              ],
              "reqLevel": 24,
              "icon": "inv_mace_08"
            },
            {
              "name": "Fallen Dragon's Scepter",
              "itemId": 281312,
              "weaponType": "Staff",
              "speed": "3.00",
              "dps": "19.9 DPS",
              "value": "19.9 DPS, 3.00s - Redridge Quest",
              "faction": "both",
              "quality": "q3",
              "iLvl": 32,
              "stats": "+11 Intellect, +13 Spirit, Equip: Increases damage and healing done by magical spells and effects by up to 36.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "54 - 81 Damage\tSpeed 3.40",
                "(19.9 damage per second)",
                "+11 Intellect",
                "+13 Spirit",
                "Equip: Increases damage and healing done by magical spells and effects by up to 36."
              ],
              "reqLevel": 24,
              "icon": "inv_staff_08"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 30,
          "stats": "+11 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 34., Equip: Restores 5 Mana per 5 sec.",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "42 - 64 Damage\tSpeed 2.80",
            "(18.9 damage per second)",
            "+11 Stamina",
            "Equip: Increases damage and healing done by magical spells and effects by up to 34.",
            "Equip: Restores 5 Mana per 5 sec.",
            "Requires Level 26"
          ],
          "reqLevel": 26
        },
        {
          "levelBracket": "27–28",
          "itemId": 273040,
          "name": "Spine of the Devourer",
          "icon": "inv_staff_07",
          "weaponType": "Staff",
          "speed": "3.60",
          "dps": "20.28 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Razorfen Kraul",
            "detail": "Drop from boss encounters in Razorfen Kraul."
          },
          "alts": [
            {
              "name": "Death Speaker Scepter",
              "itemId": 2816,
              "value": "+68 Healing, +28 Shadow SP, 12 HP5 - Razorfen Kraul (Death Speaker Jargba)",
              "faction": "both",
              "dps": "18.5 DPS",
              "speed": "2.20",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+68 Healing, +28 Shadow Spell Power, 12 Health per 5 sec",
              "icon": "inv_mace_07",
              "source": {
                "kind": "dungeon",
                "title": "Razorfen Kraul",
                "detail": "Dropped by Death Speaker Jargba. Invaluable 1H mace for Priests, Shamans, and Paladins."
              }
            },
            {
              "name": "Tendonscraper Dagger",
              "itemId": 273053,
              "value": "14.4 DPS, +36 SP - City of Dalaran: Lyn the Ignored",
              "faction": "both",
              "dps": "14.38 DPS",
              "speed": "1.60",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 33,
              "stats": "+5 Stamina, Equip: +8 Health Regeneration, Equip: +36 Spell Power",
              "lines": [
                "Binds when picked up",
                "Main Hand\tDagger",
                "16 - 30 Damage\tSpeed 1.60",
                "(14.4 damage per second)",
                "+5 Stamina",
                "Requires Level 28",
                "Equip: +8 Health Regeneration",
                "Equip: +36 Spell Power",
                "Sell Price: 73s 79c"
              ],
              "reqLevel": 28,
              "icon": "inv_misc_bone_06"
            },
            {
              "name": "Wand of Mana Concentration",
              "itemId": 273043,
              "weaponType": "Wand",
              "quality": "q3",
              "iLvl": 32,
              "reqLevel": 27,
              "dps": "24.5 DPS",
              "speed": "1.60",
              "icon": "inv_wand_04",
              "value": "Datamined Dungeon Wand (+5 Intellect)"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 32,
          "stats": "+14 Stamina, Equip: +3 Spell Penetration, Equip: +36 Spell Power",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "58 - 88 Damage\tSpeed 3.60",
            "(20.3 damage per second)",
            "+14 Stamina",
            "Equip: +3 Spell Penetration",
            "Equip: +36 Spell Power",
            "Requires Level 27"
          ],
          "reqLevel": 27
        },
        {
          "levelBracket": "29–30",
          "itemId": 271767,
          "name": "Healer's Staff",
          "icon": "inv_staff_10",
          "weaponType": "Staff",
          "speed": "2.60",
          "dps": "20.8 DPS",
          "source": {
            "kind": "quest",
            "title": "Lost Relic Carry / Elder Knowledge",
            "detail": "Excavation Site 4 dungeon quest (+12 Sta, +67 Healing, 5 MP5)"
          },
          "alts": [
            {
              "name": "Fallen Dragon's Scepter",
              "itemId": 281312,
              "value": "19.9 DPS, 3.40s, +11 Int, +13 Spi, +36 SP - Wetlands Quest: Stopping the Cycle",
              "faction": "both",
              "dps": "19.85 DPS",
              "speed": "3.40",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 32,
              "stats": "+11 Intellect, +13 Spirit, Equip: Increases damage and healing done by magical spells and effects by up to 36.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "54 - 81 Damage\tSpeed 3.40",
                "(19.9 damage per second)",
                "+11 Intellect",
                "+13 Spirit",
                "Equip: Increases damage and healing done by magical spells and effects by up to 36."
              ],
              "reqLevel": 24,
              "icon": "inv_staff_08"
            },
            {
              "name": "Madman's Blade",
              "itemId": 270070,
              "value": "14.7 DPS, 1.90s, +7 Spi, +32 SP - STV Quest: Colonel Kurzen",
              "faction": "both",
              "dps": "14.7 DPS",
              "speed": "1.90",
              "quality": "q2",
              "iLvl": 40,
              "stats": "+7 Spirit, Equip: Increases damage and healing done by magical spells and effects by up to 32.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tDagger",
                "19 - 37 Damage\tSpeed 1.90",
                "(14.7 damage per second)",
                "+7 Spirit",
                "Equip: Increases damage and healing done by magical spells and effects by up to 32."
              ],
              "reqLevel": 28,
              "icon": "inv_weapon_shortblade_15",
              "weaponType": "Dagger"
            },
            {
              "name": "Mindslicer",
              "itemId": 270069,
              "value": "15.3 DPS, +7 Int, +34 SP - Arathi: Call to Arms",
              "faction": "both",
              "dps": "15.26 DPS",
              "speed": "1.90",
              "weaponType": "Dagger",
              "quality": "q2",
              "iLvl": 41,
              "stats": "+7 Intellect, Equip: Increases damage and healing done by magical spells and effects by up to 34.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tDagger",
                "20 - 38 Damage\tSpeed 1.90",
                "(15.3 damage per second)",
                "+7 Intellect",
                "Equip: Increases damage and healing done by magical spells and effects by up to 34."
              ],
              "reqLevel": 30,
              "icon": "inv_weapon_shortblade_15"
            },
            {
              "name": "Wind Spirit Staff",
              "itemId": 6689,
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 34,
              "reqLevel": 29,
              "dps": "25.3 DPS",
              "speed": "3.00",
              "stats": "+13 Spirit, +10 Intellect",
              "icon": "inv_staff_12",
              "value": "Razorfen Kraul — Agathelos the Raging"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 33,
          "stats": "+12 Stamina, Equip: Increases healing done by up to 67 and damage done by up to 22 for all magical spells and effects., Equip: Restores 5 Mana per 5 sec.",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "43 - 65 Damage\tSpeed 2.60",
            "(20.8 damage per second)",
            "+12 Stamina",
            "Equip: Increases healing done by up to 67 and damage done by up to 22 for all magical spells and effects.",
            "Equip: Restores 5 Mana per 5 sec."
          ],
          "reqLevel": 24
        },
        {
          "levelBracket": "31–35",
          "itemId": 7713,
          "name": "Illusionary Rod",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "25.7 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Arcanist Doan",
            "detail": "Scarlet Monastery Library (+15 Int, +10 Spi)"
          },
          "alts": [
            {
              "name": "Hypnotic Blade",
              "itemId": 7714,
              "value": "17.5 DPS, 1.40s - Arcanist Doan in SM Library (+44 Spell Power, +8 Int, +3 Spi)",
              "faction": "both",
              "dps": "17.5 DPS",
              "speed": "1.40",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 39,
              "reqLevel": 34,
              "stats": "+44 Spell Power, +8 Intellect, +3 Spirit",
              "icon": "inv_weapon_shortblade_07",
              "source": {
                "kind": "dungeon",
                "title": "Scarlet Monastery (Library)",
                "detail": "Dropped by Arcanist Doan in SM Library. Best 1H spell dagger in Phase 2."
              }
            },
            {
              "name": "Staff of Jordan",
              "itemId": 873,
              "value": "+60 Spell Power, +11 Int, +11 Spi - Level 35 Epic World Drop",
              "faction": "both",
              "dps": "29.9 DPS",
              "speed": "3.70",
              "weaponType": "Staff",
              "quality": "q4",
              "iLvl": 40,
              "reqLevel": 35,
              "stats": "+60 Spell Power, +11 Intellect, +11 Spirit",
              "icon": "inv_staff_13"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 39,
          "reqLevel": 34,
          "stats": "+15 Int, +10 Spi"
        },
        {
          "levelBracket": "36–40",
          "itemId": 7713,
          "name": "Illusionary Rod",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "25.7 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Arcanist Doan",
            "detail": "Reliable high spirit caster weapon"
          },
          "alts": [
            {
              "name": "Staff of Jordan",
              "itemId": 873,
              "value": "31.0 DPS, +26 Spell Power - World drop BoE staff",
              "faction": "both",
              "dps": "29.86 DPS",
              "speed": "3.70",
              "weaponType": "Staff",
              "quality": "q4",
              "iLvl": 40,
              "reqLevel": 35,
              "stats": "+26 Spell Power",
              "icon": "inv_staff_13"
            },
            {
              "name": "Hand of Righteousness",
              "itemId": 7721,
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 44,
              "reqLevel": 39,
              "dps": "27.4 DPS",
              "speed": "2.00",
              "stats": "+8 Intellect, +14 Spell Power & Healing",
              "icon": "inv_mace_01",
              "value": "Scarlet Monastery Cathedral — High Inquisitor Whitemane"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 39,
          "reqLevel": 34,
          "stats": "+10 Stamina, +6 Intellect, +7 Spirit, +14 Critical Strike Rating, +44 Spell Power"
        },
        {
          "levelBracket": "41–46",
          "itemId": 9527,
          "name": "Spellshifter Rod",
          "icon": "inv_wand_11",
          "weaponType": "Staff",
          "speed": "3.00",
          "dps": "31.1 DPS",
          "source": {
            "kind": "quest",
            "title": "Tiara of the Deep",
            "detail": "Custom quest reward (+16 Int, +10 Spi)"
          },
          "alts": [
            {
              "name": "Zum'rah's Vexing Cane",
              "itemId": 18082,
              "value": "32.3 DPS, +10 Int, +21 SP - ZF: Witch Doctor Zum'rah",
              "faction": "both",
              "dps": "31.11 DPS",
              "speed": "2.70",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 48,
              "reqLevel": 43,
              "stats": "+10 Int, +21 SP",
              "icon": "inv_staff_01"
            },
            {
              "name": "Emerald Watcher's Dreamstaff",
              "itemId": 282007,
              "weaponType": "Staff",
              "speed": "3.00",
              "dps": "31.7 DPS",
              "value": "31.7 DPS, 3.00s - Custom Staff Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 49,
              "reqLevel": 44,
              "stats": "",
              "icon": "inv_staff_17"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 48,
          "reqLevel": 40,
          "stats": "+16 Int, +10 Spi"
        },
        {
          "levelBracket": "47–52",
          "itemId": 11750,
          "name": "Kindling Stave",
          "icon": "inv_staff_08",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "34.1 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Pyromancer Loregrain",
            "detail": "Blackrock Depths (+12 Int, +20 Spi)"
          },
          "alts": [
            {
              "name": "Spire of the Stoneshaper",
              "itemId": 11802,
              "value": "33.8 DPS - BRD: Lord Incendius",
              "faction": "both",
              "dps": "33.8 DPS",
              "quality": "q3",
              "iLvl": 52,
              "reqLevel": 46,
              "stats": "",
              "icon": "inv_staff_29"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 53,
          "reqLevel": 48,
          "stats": "+12 Int, +20 Spi"
        },
        {
          "levelBracket": "53–60",
          "itemId": 274420,
          "name": "Wisepaw Totem",
          "icon": "inv_staff_51",
          "weaponType": "Staff",
          "speed": "3.20",
          "dps": "36.9 DPS",
          "source": {
            "kind": "vendor",
            "title": "Dala Fairmaw",
            "detail": "Mount Hyjal vendor (+Spell Power & Healing)"
          },
          "alts": [
            {
              "name": "Anathema",
              "itemId": 18609,
              "weaponType": "Staff",
              "quality": "q4",
              "iLvl": 75,
              "reqLevel": 60,
              "dps": "55.6 DPS",
              "speed": "3.00",
              "stats": "+31 Stamina, +20 Intellect, +69 Shadow Spell Power, +2% Spell Crit",
              "icon": "inv_staff_33",
              "value": "Priest Epic Quest — The Eye of Shadow / The Balance of Light and Shadow"
            },
            {
              "name": "Benediction",
              "itemId": 18608,
              "value": "43.4 DPS, +31 Int, +12 Sta, +12 Spi, +106 Healing - Legendary Priest Quest Staff!",
              "faction": "both",
              "dps": "40.67 DPS",
              "speed": "3.00",
              "weaponType": "Staff",
              "quality": "q4",
              "iLvl": 75,
              "reqLevel": 60,
              "stats": "+31 Int, +12 Sta, +12 Spi, +106 Healing",
              "icon": "inv_staff_30"
            },
            {
              "name": "Rod of the Ogre Magi",
              "itemId": 18534,
              "value": "36.0 DPS, +14 Int, +11 Spi, +23 SP, 1% Spell Crit - DM North Tribute Run",
              "faction": "both",
              "dps": "36.0 DPS",
              "quality": "q3",
              "iLvl": 58,
              "reqLevel": 52,
              "stats": "+14 Int, +11 Spi, +23 SP, 1% Spell Crit",
              "icon": "inv_staff_13"
            },
            {
              "name": "Guiding Stave of Wisdom",
              "itemId": 11932,
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 59,
              "reqLevel": 54,
              "dps": "48.9 DPS",
              "speed": "3.10",
              "stats": "+22 Intellect, +10 Spirit, +14 Spell Power & Healing",
              "icon": "inv_staff_29",
              "value": "Blackrock Depths — Emperor Dagran Thaurissan"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 58,
          "reqLevel": 53,
          "stats": ""
        }
      ]
    },
    "druid": {
      "classId": "druid",
      "tracks": [
        {
          "id": "primary",
          "name": "Feral & Balance (Staves & Two-Handed Maces)"
        }
      ],
      "levels": [
        {
          "levelBracket": "1–2",
          "itemId": 2132,
          "name": "Short Staff",
          "icon": "inv_staff_02",
          "weaponType": "Staff",
          "speed": "2.20",
          "dps": "2.0 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Purchased in starting zones (Shadowglen, Camp Narache)"
          },
          "alts": [
            {
              "name": "Club",
              "itemId": 2130,
              "value": "1.8 DPS - Starter vendor mace",
              "faction": "both",
              "dps": "1.8 DPS",
              "quality": "q1",
              "iLvl": 6,
              "reqLevel": 1,
              "stats": "",
              "icon": "inv_axe_10",
              "weaponType": "One-Handed Mace"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 4,
          "reqLevel": 1,
          "stats": ""
        },
        {
          "levelBracket": "3–4",
          "itemId": 2493,
          "name": "Wooden Mallet",
          "icon": "inv_hammer_16",
          "weaponType": "Two-handed mace",
          "speed": "2.60",
          "dps": "5.0 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Sold in Dolanaar, Bloodhoof Village"
          },
          "alts": [
            {
              "name": "Walking Stick",
              "itemId": 2495,
              "value": "4.2 DPS - Vendor staff",
              "faction": "both",
              "dps": "4.2 DPS",
              "speed": "2.50",
              "weaponType": "Staff",
              "quality": "q1",
              "iLvl": 8,
              "reqLevel": 3,
              "stats": "",
              "icon": "inv_staff_08"
            },
            {
              "name": "Large Club",
              "itemId": 2480,
              "value": "3.8 DPS - Vendor 2H mace",
              "faction": "both",
              "dps": "2.78 DPS",
              "speed": "1.80",
              "weaponType": "One-handed mace",
              "quality": "q1",
              "iLvl": 7,
              "reqLevel": 2,
              "stats": "",
              "icon": "inv_torch_unlit"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 9,
          "reqLevel": 4,
          "stats": ""
        },
        {
          "levelBracket": "5–6",
          "itemId": 2480,
          "name": "Large Club",
          "icon": "inv_torch_unlit",
          "weaponType": "Two-handed mace",
          "speed": "2.70",
          "dps": "3.8 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Town weapon vendors"
          },
          "alts": [
            {
              "name": "Copper Mace",
              "itemId": 2844,
              "value": "3.8 DPS - Blacksmithing (15)",
              "faction": "both",
              "dps": "3.85 DPS",
              "speed": "2.60",
              "weaponType": "One-handed mace",
              "quality": "q1",
              "iLvl": 9,
              "reqLevel": 4,
              "stats": "",
              "icon": "inv_mace_01"
            },
            {
              "name": "Walking Stick",
              "itemId": 2495,
              "value": "4.2 DPS - Vendor staff",
              "faction": "both",
              "dps": "4.2 DPS",
              "speed": "2.50",
              "weaponType": "Staff",
              "quality": "q1",
              "iLvl": 8,
              "reqLevel": 3,
              "stats": "",
              "icon": "inv_staff_08"
            },
            {
              "name": "Goblin Smasher",
              "itemId": 4964,
              "value": "8.2 DPS, 3.10s - Mulgore Quest: Supervisor Fizsprocket",
              "faction": "horde",
              "dps": "8.23 DPS",
              "speed": "3.10",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 5,
              "stats": "",
              "icon": "inv_hammer_15"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 7,
          "reqLevel": 2,
          "stats": ""
        },
        {
          "levelBracket": "7–8",
          "itemId": 9603,
          "name": "Gritroot Staff",
          "icon": "inv_staff_22",
          "weaponType": "Staff",
          "speed": "2.50",
          "dps": "5.4 DPS",
          "source": {
            "kind": "quest",
            "title": "The Relics of Wakening",
            "detail": "Teldrassil early quest reward"
          },
          "alts": [
            {
              "name": "Staff of the Dor'Danil",
              "itemId": 15396,
              "value": "8.5 DPS - Teldrassil quest",
              "faction": "alliance",
              "dps": "8.5 DPS",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 6,
              "stats": "",
              "icon": "inv_staff_08"
            },
            {
              "name": "Apprentice's Spellstaff",
              "itemId": 248008,
              "value": "6.4 DPS - Early quest",
              "faction": "both",
              "dps": "6.36 DPS",
              "speed": "2.20",
              "weaponType": "Staff",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 1,
              "stats": "",
              "icon": "inv_staff_18"
            },
            {
              "name": "Bonecracker",
              "itemId": 3440,
              "value": "9.1 DPS, 3.20s - Tirisfal Quest: The Family Crypt",
              "faction": "horde",
              "dps": "9.06 DPS",
              "speed": "3.20",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 13,
              "reqLevel": 7,
              "stats": "",
              "icon": "inv_mace_04"
            },
            {
              "name": "Darkwood Staff",
              "itemId": 3446,
              "value": "6.7 DPS, 3.20s - Tirisfal Quest: The Family Crypt",
              "faction": "horde",
              "dps": "6.72 DPS",
              "speed": "3.20",
              "weaponType": "Staff",
              "quality": "q2",
              "iLvl": 13,
              "reqLevel": 7,
              "stats": "+6 Spell Power",
              "icon": "inv_staff_16"
            }
          ],
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 10,
          "reqLevel": 4,
          "stats": "+2 Spell Power"
        },
        {
          "levelBracket": "9–10",
          "itemId": 1197,
          "name": "Giant Mace",
          "icon": "inv_mace_02",
          "weaponType": "Two-handed mace",
          "speed": "3.50",
          "dps": "9.0 DPS",
          "source": {
            "kind": "vendor",
            "title": "Weapon Vendor",
            "detail": "Sold in Auberdine, Bloodhoof, Crossroads"
          },
          "alts": [
            {
              "name": "Staff of the Dor'Danil",
              "itemId": 15396,
              "value": "8.5 DPS - Early quest",
              "faction": "both",
              "dps": "8.5 DPS",
              "quality": "q2",
              "iLvl": 14,
              "reqLevel": 8,
              "stats": "",
              "icon": "inv_staff_08"
            },
            {
              "name": "Trogg Scepter",
              "itemId": 272996,
              "value": "8.1 DPS, 2.40s - RFC: Oggleflint 1H mace",
              "faction": "both",
              "dps": "8.13 DPS",
              "speed": "2.40",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 18,
              "stats": "+4 Spirit, Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tMace",
                "13 - 26 Damage\tSpeed 2.40",
                "(8.1 damage per second)",
                "+4 Spirit",
                "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
                "Requires Level 13"
              ],
              "reqLevel": 13,
              "icon": "inv_misc_bone_10"
            },
            {
              "name": "Cauldron Stirrer",
              "itemId": 5340,
              "value": "7.4 DPS, 3.10s - Barrens Quest: Apothecary Zamah",
              "faction": "horde",
              "dps": "7.42 DPS",
              "speed": "3.10",
              "weaponType": "Staff",
              "quality": "q2",
              "iLvl": 15,
              "reqLevel": 10,
              "stats": "+8 Spell Power",
              "icon": "inv_staff_08"
            },
            {
              "name": "Ironforge Greathammer",
              "itemId": 279895,
              "weaponType": "Two-handed mace",
              "speed": "3.30",
              "dps": "16.0 DPS",
              "value": "16.0 DPS, 3.30s - Ironforge Quest",
              "faction": "alliance",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "",
              "icon": "inv_hammer_21"
            }
          ],
          "faction": "both",
          "quality": "q1",
          "iLvl": 15,
          "reqLevel": 10,
          "stats": ""
        },
        {
          "levelBracket": "11–12",
          "itemId": 6214,
          "name": "Heavy Copper Maul",
          "icon": "inv_hammer_18",
          "weaponType": "Two-handed mace",
          "speed": "3.30",
          "dps": "10.8 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (40)",
            "detail": "Guaranteed crafted spike for early Bear Form auto-attacks"
          },
          "alts": [
            {
              "name": "Oakthrush Staff",
              "itemId": 15397,
              "value": "10.9 DPS - Ashenvale quest",
              "faction": "both",
              "dps": "7.14 DPS",
              "speed": "2.80",
              "weaponType": "Staff",
              "quality": "q2",
              "iLvl": 14,
              "reqLevel": 12,
              "stats": "+6 Spell Power",
              "icon": "inv_staff_08"
            },
            {
              "name": "Trogg Scepter",
              "itemId": 272996,
              "value": "8.1 DPS - RFC: Oggleflint",
              "faction": "both",
              "dps": "8.13 DPS",
              "speed": "2.40",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 18,
              "stats": "+4 Spirit, Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
              "lines": [
                "Binds when picked up",
                "Main Hand\tMace",
                "13 - 26 Damage\tSpeed 2.40",
                "(8.1 damage per second)",
                "+4 Spirit",
                "Equip: Increases healing done by up to 33 and damage done by up to 11 for all magical spells and effects.",
                "Requires Level 13"
              ],
              "reqLevel": 13,
              "icon": "inv_misc_bone_10"
            },
            {
              "name": "Hammer of Orgrimmar",
              "itemId": 15445,
              "value": "12.4 DPS, 2.90s, +3 Str, +3 Spi - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "12.41 DPS",
              "speed": "2.90",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+3 Str, +3 Spi",
              "icon": "inv_mace_01"
            },
            {
              "name": "Ironforge Greathammer",
              "itemId": 279895,
              "weaponType": "Two-handed mace",
              "speed": "3.30",
              "dps": "16.0 DPS",
              "value": "16.0 DPS, 3.30s - Ironforge Quest",
              "faction": "alliance",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "",
              "icon": "inv_hammer_21"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 16,
          "reqLevel": 11,
          "stats": "+4 Strength"
        },
        {
          "levelBracket": "13–14",
          "itemId": 270228,
          "name": "Golemheart Stave",
          "icon": "inv_staff_10",
          "weaponType": "Staff",
          "speed": "2.60",
          "dps": "14.2 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Plunder",
            "detail": "Hall of Thanes dungeon (+5 Int, +4 Spirit)"
          },
          "alts": [
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde Caster / Feral)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Ironforge Greathammer",
              "itemId": 279895,
              "value": "16.0 DPS - Hall of Thanes dungeon quest",
              "faction": "alliance",
              "dps": "15.97 DPS",
              "speed": "3.10",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "",
              "icon": "inv_hammer_21"
            },
            {
              "name": "Oakthrush Staff",
              "itemId": 15397,
              "value": "10.9 DPS - Ashenvale quest",
              "faction": "both",
              "dps": "7.14 DPS",
              "speed": "2.80",
              "weaponType": "Staff",
              "quality": "q2",
              "iLvl": 14,
              "reqLevel": 12,
              "stats": "+6 Spell Power",
              "icon": "inv_staff_08"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "Fang of Magmatus",
              "itemId": 271095,
              "weaponType": "Dagger",
              "speed": "1.70",
              "dps": "7.9 DPS",
              "value": "7.9 DPS, 1.70s - RFC Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 13,
              "stats": "",
              "icon": "inv_weapon_shortblade_05"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 18,
          "reqLevel": 13,
          "stats": "+5 Int, +4 Spirit"
        },
        {
          "levelBracket": "15–16",
          "itemId": 6223,
          "name": "Cauldron Stirrer",
          "icon": "inv_staff_10",
          "weaponType": "Staff",
          "speed": "2.80",
          "dps": "15.0 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Shadowfang Keep",
            "detail": "Kitchen boss in SFK (+4 Sta, +3 Spi)"
          },
          "alts": [
            {
              "name": "Gnarled Necromancer's Staff",
              "itemId": 251534,
              "value": "15.18 DPS, 2.80s (+12 Spell Power) - The Wrath of Rath'mael in Ruins of Lordaeron",
              "faction": "horde",
              "dps": "15.18 DPS",
              "speed": "2.80",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 15,
              "stats": "+10 Spirit",
              "icon": "inv_staff_16"
            },
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC: Hidden Enemies (Horde Caster / Feral)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Segmented Spider Leg",
              "itemId": 271203,
              "value": "14.8 DPS, +5 Int, +4 Sta - Ruins of Lordaeron: Witherfang",
              "faction": "both",
              "dps": "17.5 DPS",
              "speed": "3.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 20,
              "reqLevel": 15,
              "stats": "+5 Int, +4 Sta",
              "icon": "inv_staff_13"
            },
            {
              "name": "Scepter of the Abandoned",
              "itemId": 271216,
              "value": "14.0 DPS - Ruins of Lordaeron: The Abandoned",
              "faction": "both",
              "dps": "9.62 DPS",
              "speed": "2.60",
              "weaponType": "One-handed mace",
              "quality": "q3",
              "iLvl": 22,
              "reqLevel": 17,
              "stats": "",
              "icon": "inv_mace_01"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            },
            {
              "name": "The Stitcher",
              "itemId": 279874,
              "weaponType": "One-handed mace",
              "speed": "2.40",
              "dps": "8.1 DPS",
              "value": "8.1 DPS, 2.40s - Dalaran Dungeon",
              "faction": "both",
              "quality": "q2",
              "iLvl": 24,
              "reqLevel": 15,
              "stats": "",
              "icon": "inv_mace_08"
            }
          ],
          "faction": "both",
          "quality": "q2",
          "iLvl": 20,
          "reqLevel": 15,
          "stats": "+4 Sta, +3 Spi"
        },
        {
          "levelBracket": "17–18",
          "itemId": 7230,
          "name": "Smite's Mighty Hammer",
          "icon": "inv_hammer_09",
          "weaponType": "Two-handed mace",
          "speed": "3.50",
          "dps": "19.7 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Mr. Smite",
            "detail": "The Deadmines (+11 Str, +4 Agi)"
          },
          "alts": [
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC quest (great hybrid stats)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Coldspire Staff",
              "itemId": 271215,
              "value": "16.8 DPS, +7 Int, +5 Spi - Ruins of Lordaeron: Rath'mael",
              "faction": "both",
              "dps": "15.14 DPS",
              "speed": "3.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "reqLevel": 19,
              "stats": "+7 Int, +5 Spi",
              "icon": "inv_staff_08"
            },
            {
              "name": "Staff of Westfall",
              "itemId": 2042,
              "value": "15.2 DPS - Deadmines quest",
              "faction": "alliance",
              "dps": "15.17 DPS",
              "speed": "3.00",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "stats": "+6 Spirit, +48 Healing, +16 Spell Damage",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "36 - 55 Damage\tSpeed 3.00",
                "(15.2 damage per second)",
                "+5 Intellect",
                "+6 Spirit",
                "Equip: Increases healing done by up to 48 and damage done by up to 16 for all magical spells and effects.",
                "Equip: Movement speed increased by 2% in Elwynn Forest, Westfall, Redridge Mountains, and the Deadmines."
              ],
              "reqLevel": 14,
              "icon": "inv_staff_10"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 23,
          "reqLevel": 18,
          "stats": "+11 Str, +4 Agi"
        },
        {
          "levelBracket": "19–20",
          "itemId": 6505,
          "name": "Crescent Staff",
          "icon": "inv_staff_04",
          "weaponType": "Staff",
          "speed": "2.90",
          "dps": "15.3 DPS",
          "source": {
            "kind": "quest",
            "title": "Leaders of the Fang",
            "detail": "Major quest reward from Leaders of the Fang in Wailing Caverns (Horde). Elite stat stick for both Feral and Balance."
          },
          "alts": [
            {
              "name": "Staff of Orgrimmar",
              "itemId": 15444,
              "value": "11.8 DPS, +6 Int, +6 Agi, +18 Spell Dmg - RFC quest (great hybrid stats)",
              "faction": "horde",
              "dps": "11.82 DPS",
              "speed": "3.30",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+6 Int, +6 Agi, +18 Spell Dmg",
              "icon": "inv_staff_goldfeathered_01"
            },
            {
              "name": "Bronze Warhammer",
              "itemId": 7956,
              "value": "17.4 DPS - Blacksmithing (90)",
              "faction": "both",
              "dps": "16.86 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+6 Strength, +6 Stamina",
              "icon": "inv_hammer_18"
            },
            {
              "name": "Staff of Westfall",
              "itemId": 2042,
              "value": "15.2 DPS - Deadmines quest",
              "faction": "alliance",
              "dps": "15.17 DPS",
              "speed": "3.00",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 24,
              "stats": "+6 Spirit, +48 Healing, +16 Spell Damage",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "36 - 55 Damage\tSpeed 3.00",
                "(15.2 damage per second)",
                "+5 Intellect",
                "+6 Spirit",
                "Equip: Increases healing done by up to 48 and damage done by up to 16 for all magical spells and effects.",
                "Equip: Movement speed increased by 2% in Elwynn Forest, Westfall, Redridge Mountains, and the Deadmines."
              ],
              "reqLevel": 14,
              "icon": "inv_staff_10"
            },
            {
              "name": "Kris of Orgrimmar",
              "itemId": 15443,
              "value": "8.0 DPS, 1.50s, +4 Sta, +33 Healing, +11 Spell Damage - RFC Quest: Hidden Enemies",
              "faction": "horde",
              "dps": "8 DPS",
              "speed": "1.50",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 18,
              "reqLevel": 9,
              "stats": "+4 Sta, +33 Healing, +11 Spell Damage",
              "icon": "inv_weapon_shortblade_05"
            }
          ],
          "faction": "horde",
          "quality": "q3",
          "iLvl": 24,
          "stats": "+26 Spell Power, +7 Agility, +7 Stamina",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "35 - 53 Damage\tSpeed 2.90",
            "(15.2 damage per second)",
            "+7 Agility",
            "+7 Stamina",
            "+7 Intellect",
            "Equip: Increases damage and healing done by magical spells and effects by up to 26."
          ],
          "reqLevel": 10
        },
        {
          "levelBracket": "21–22",
          "itemId": 6318,
          "name": "Odo's Ley Staff",
          "icon": "inv_staff_27",
          "weaponType": "Staff",
          "speed": "2.70",
          "dps": "16.0 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Odo the Blindwatcher",
            "detail": "Shadowfang Keep (+4 Int, +5 Spi)"
          },
          "alts": [
            {
              "name": "Glimmering Staff",
              "itemId": 249392,
              "value": "18.4 DPS, 2.20s, Req Level 25 - Enchanting (140)",
              "faction": "both",
              "dps": "18.41 DPS",
              "speed": "2.20",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 30,
              "stats": "+11 Intellect, +11 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 34.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "32 - 49 Damage\tSpeed 2.20",
                "(18.4 damage per second)",
                "+11 Intellect",
                "+11 Stamina",
                "Equip: Increases damage and healing done by magical spells and effects by up to 34.",
                "Requires Level 25"
              ],
              "reqLevel": 25,
              "icon": "inv_staff_19"
            },
            {
              "name": "Subdued Dragon's Fang",
              "itemId": 281314,
              "value": "20.6 DPS, 1.70s, +7 Agi - Wetlands: Stopping the Cycle",
              "faction": "both",
              "dps": "20.59 DPS",
              "speed": "1.70",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 32,
              "stats": "+7 Agility, +2 Stamina",
              "lines": [
                "Binds when picked up",
                "One-Hand\tDagger",
                "24 - 46 Damage\tSpeed 1.70",
                "(20.6 damage per second)",
                "+7 Agility",
                "+2 Stamina"
              ],
              "reqLevel": 24,
              "icon": "inv_weapon_shortblade_01"
            },
            {
              "name": "Alliance Outrunner Staff",
              "itemId": 285350,
              "weaponType": "Staff",
              "speed": "2.50",
              "dps": "16.2 DPS",
              "value": "16.2 DPS, 2.50s - Alliance Drop",
              "faction": "alliance",
              "quality": "q3",
              "iLvl": 26,
              "reqLevel": 21,
              "stats": "",
              "icon": "inv_staff_11"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 26,
          "stats": "+5 Stamina, +12 Spirit, Equip: Increases healing done by up to 52 and damage done by up to 17 for all magical spells and effects.",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tStaff",
            "37 - 56 Damage\tSpeed 2.90",
            "(16.0 damage per second)",
            "+5 Stamina",
            "+12 Spirit",
            "Equip: Increases healing done by up to 52 and damage done by up to 17 for all magical spells and effects.",
            "Requires Level 21"
          ],
          "reqLevel": 21
        },
        {
          "levelBracket": "23–24",
          "itemId": 1155,
          "name": "Rod of the Sleepwalker",
          "icon": "inv_staff_06",
          "weaponType": "Staff",
          "speed": "2.70",
          "dps": "17.7 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Twilight Lord Kelris",
            "detail": "Blackfathom Deeps (+11 Int, +10 Spi)"
          },
          "alts": [
            {
              "name": "Staff of the Friar",
              "itemId": 3415,
              "value": "17.5 DPS - SM Graveyard: Interrogator Vishas",
              "faction": "both",
              "dps": "15.96 DPS",
              "speed": "2.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 26,
              "stats": "+3 Intellect, +4 Stamina, +12 Spirit, Equip: Increases healing done by up to 52 and damage done by up to 17 for all magical spells and effects.",
              "lines": [
                "Binds when equipped",
                "Two-Hand\tStaff",
                "33 - 50 Damage\tSpeed 2.60",
                "(16.0 damage per second)",
                "+3 Intellect",
                "+4 Stamina",
                "+12 Spirit",
                "Equip: Increases healing done by up to 52 and damage done by up to 17 for all magical spells and effects.",
                "Requires Level 21"
              ],
              "reqLevel": 21,
              "icon": "inv_staff_32"
            },
            {
              "name": "Subdued Dragon's Fang",
              "itemId": 281314,
              "value": "20.6 DPS, 1.70s, +7 Agi - Wetlands: Stopping the Cycle",
              "faction": "both",
              "dps": "20.59 DPS",
              "speed": "1.70",
              "weaponType": "Dagger",
              "quality": "q3",
              "iLvl": 32,
              "stats": "+7 Agility, +2 Stamina",
              "lines": [
                "Binds when picked up",
                "One-Hand\tDagger",
                "24 - 46 Damage\tSpeed 1.70",
                "(20.6 damage per second)",
                "+7 Agility",
                "+2 Stamina"
              ],
              "reqLevel": 24,
              "icon": "inv_weapon_shortblade_01"
            },
            {
              "name": "Striking Staff",
              "itemId": 279844,
              "weaponType": "Staff",
              "speed": "3.30",
              "dps": "31.3 DPS",
              "value": "31.3 DPS, 3.30s - Dalaran Dungeon",
              "faction": "both",
              "quality": "q3",
              "iLvl": 36,
              "stats": "+9 Strength, +6 Stamina, +14 Intellect",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "77 - 117 Damage\tSpeed 3.10",
                "(31.3 damage per second)",
                "+9 Strength",
                "+6 Stamina",
                "+14 Intellect"
              ],
              "reqLevel": 24,
              "icon": "inv_staff_10"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 29,
          "reqLevel": 24,
          "stats": "+11 Int, +10 Spi"
        },
        {
          "levelBracket": "25–26",
          "itemId": 271766,
          "name": "Heavehammer",
          "icon": "inv_hammer_09",
          "weaponType": "Two-handed mace",
          "speed": "3.30",
          "dps": "27.7 DPS",
          "source": {
            "kind": "quest",
            "title": "Lost Relic Carry / Elder Knowledge",
            "detail": "Excavation Site 4 dungeon quest (+60 Armor, +32 AP)"
          },
          "alts": [
            {
              "name": "Healer's Staff",
              "itemId": 271767,
              "value": "20.77 DPS, 2.60s (+16 Healing) - Excavation Site: Wetlands",
              "faction": "both",
              "dps": "20.77 DPS",
              "speed": "2.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 24,
              "stats": "+12 Stamina",
              "icon": "inv_staff_10"
            },
            {
              "name": "Striking Staff",
              "itemId": 279844,
              "value": "31.29 DPS, 3.10s (+14 Spell Power) - Heart of Disruption in City of Dalaran",
              "faction": "horde",
              "dps": "31.29 DPS",
              "speed": "3.10",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 36,
              "reqLevel": 24,
              "stats": "+9 Strength, +6 Stamina, +14 Intellect",
              "icon": "inv_staff_10"
            },
            {
              "name": "Dendweller's Hammer",
              "itemId": 284459,
              "value": "25.6 DPS, 3.30s - Level 26 Mace",
              "faction": "both",
              "dps": "25.61 DPS",
              "speed": "3.30",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 31,
              "stats": "+12 Stamina, +100 Armor",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "67 - 102 Damage\tSpeed 3.30",
                "(25.6 damage per second)",
                "+12 Stamina",
                "+100 Armor",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_hammer_09"
            },
            {
              "name": "Solid Iron Maul",
              "itemId": 3851,
              "value": "22.8 DPS - Blacksmithing (135)",
              "faction": "both",
              "dps": "15.57 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 31,
              "stats": "+12 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 24.",
              "lines": [
                "Binds when equipped",
                "Two-Hand\tMace",
                "43 - 66 Damage\tSpeed 3.50",
                "(15.6 damage per second)",
                "+12 Stamina",
                "Equip: Increases damage and healing done by magical spells and effects by up to 24.",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_hammer_07"
            },
            {
              "name": "Death Prophet Spine",
              "itemId": 274158,
              "value": "18.9 DPS, +34 SP, 5 MP5 - RFK: Aggem Thorncurse",
              "faction": "both",
              "dps": "18.93 DPS",
              "speed": "2.80",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 31,
              "stats": "+11 Stamina, Equip: Increases damage and healing done by magical spells and effects by up to 34., Equip: Restores 5 Mana per 5 sec.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "42 - 64 Damage\tSpeed 2.80",
                "(18.9 damage per second)",
                "+11 Stamina",
                "Equip: Increases damage and healing done by magical spells and effects by up to 34.",
                "Equip: Restores 5 Mana per 5 sec.",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_staff_17"
            },
            {
              "name": "Defender of Dalaran",
              "itemId": 279841,
              "weaponType": "Two-handed mace",
              "speed": "3.30",
              "dps": "31.2 DPS",
              "value": "31.2 DPS, 3.30s - Dalaran Dungeon",
              "faction": "both",
              "quality": "q3",
              "iLvl": 36,
              "stats": "+9 Strength, +13 Stamina, +9 Intellect",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "82 - 124 Damage\tSpeed 3.30",
                "(31.2 damage per second)",
                "+9 Strength",
                "+13 Stamina",
                "+9 Intellect"
              ],
              "reqLevel": 24,
              "icon": "inv_hammer_20"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 33,
          "stats": "+60 Armor, Equip: +32 Attack Power.",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tMace",
            "73 - 110 Damage\tSpeed 3.30",
            "(27.7 damage per second)",
            "+60 Armor",
            "Equip: +32 Attack Power."
          ],
          "reqLevel": 24
        },
        {
          "levelBracket": "27–28",
          "itemId": 279841,
          "name": "Defender of Dalaran",
          "icon": "inv_hammer_20",
          "weaponType": "Two-handed mace",
          "speed": "3.30",
          "dps": "31.2 DPS",
          "source": {
            "kind": "quest",
            "title": "Heart of Disruption",
            "detail": "City of Dalaran quest reward (+9 Str, +13 Sta, +9 Int)"
          },
          "alts": [
            {
              "name": "Striking Staff",
              "itemId": 279844,
              "value": "31.3 DPS, 3.10s, +9 Str, +6 Sta, +14 Int - City of Dalaran Quest: Heart of Disruption",
              "faction": "both",
              "dps": "31.29 DPS",
              "speed": "3.10",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 36,
              "stats": "+9 Strength, +6 Stamina, +14 Intellect",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "77 - 117 Damage\tSpeed 3.10",
                "(31.3 damage per second)",
                "+9 Strength",
                "+6 Stamina",
                "+14 Intellect"
              ],
              "reqLevel": 24,
              "icon": "inv_staff_10"
            },
            {
              "name": "Spine of the Devourer",
              "itemId": 273040,
              "value": "20.7 DPS, +36 SP - City of Dalaran: Mana Devourer",
              "faction": "both",
              "dps": "20.69 DPS",
              "speed": "3.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 33,
              "stats": "+14 Stamina, Equip: +3 Spell Penetration, Equip: +36 Spell Power",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "59 - 90 Damage\tSpeed 3.60",
                "(20.7 damage per second)",
                "+14 Stamina",
                "Requires Level 28",
                "Equip: +3 Spell Penetration",
                "Equip: +36 Spell Power",
                "Sell Price: 85s 58c"
              ],
              "reqLevel": 28,
              "icon": "inv_staff_07"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 36,
          "stats": "+9 Strength, +13 Stamina, +9 Intellect",
          "lines": [
            "Binds when picked up",
            "Two-Hand\tMace",
            "82 - 124 Damage\tSpeed 3.30",
            "(31.2 damage per second)",
            "+9 Strength",
            "+13 Stamina",
            "+9 Intellect"
          ],
          "reqLevel": 24
        },
        {
          "levelBracket": "29–30",
          "itemId": 9449,
          "name": "Manual Crowd Pummeler",
          "icon": "inv_mace_14",
          "weaponType": "Two-handed mace",
          "speed": "2.00",
          "dps": "31.5 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Crowd Pummeler 9-60",
            "detail": "Gnomeregan (+50% attack speed on-use for 30s - BiS Feral Cat & Bear weapon!)"
          },
          "alts": [
            {
              "name": "Healer's Staff",
              "itemId": 271767,
              "value": "20.8 DPS, 2.60s, +12 Sta, +67 Healing, 5 MP5 - Excavation Site 4 quest",
              "faction": "both",
              "dps": "20.77 DPS",
              "speed": "2.60",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 33,
              "stats": "+12 Stamina, Equip: Increases healing done by up to 67 and damage done by up to 22 for all magical spells and effects., Equip: Restores 5 Mana per 5 sec.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "43 - 65 Damage\tSpeed 2.60",
                "(20.8 damage per second)",
                "+12 Stamina",
                "Equip: Increases healing done by up to 67 and damage done by up to 22 for all magical spells and effects.",
                "Equip: Restores 5 Mana per 5 sec."
              ],
              "reqLevel": 24,
              "icon": "inv_staff_10"
            },
            {
              "name": "Dark Hearted Hammer",
              "itemId": 270071,
              "value": "28.9 DPS, 3.80s, +12 Str, +8 Sta - STV Quest: Colonel Kurzen",
              "faction": "both",
              "dps": "28.95 DPS",
              "speed": "3.80",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 40,
              "stats": "+12 Strength, +8 Stamina",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "88 - 132 Damage\tSpeed 3.80",
                "(28.9 damage per second)",
                "+12 Strength",
                "+8 Stamina"
              ],
              "reqLevel": 30,
              "icon": "inv_hammer_16"
            },
            {
              "name": "Fallen Dragon's Scepter",
              "itemId": 281312,
              "value": "19.9 DPS, 3.40s, +11 Int, +13 Spi, +36 SP - Wetlands Quest: Stopping the Cycle",
              "faction": "both",
              "dps": "19.85 DPS",
              "speed": "3.40",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 32,
              "stats": "+11 Intellect, +13 Spirit, Equip: Increases damage and healing done by magical spells and effects by up to 36.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tStaff",
                "54 - 81 Damage\tSpeed 3.40",
                "(19.9 damage per second)",
                "+11 Intellect",
                "+13 Spirit",
                "Equip: Increases damage and healing done by magical spells and effects by up to 36."
              ],
              "reqLevel": 24,
              "icon": "inv_staff_08"
            },
            {
              "name": "Rage of the Storm",
              "itemId": 280604,
              "weaponType": "Two-handed mace",
              "speed": "3.20",
              "dps": "35.6 DPS",
              "value": "35.6 DPS, 3.20s - Custom Boss Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 40,
              "stats": "+12 Intellect, +15 Stamina, Equip: Increases the damage dealt by your Stormstrike ability by 10%.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "91 - 137 Damage\tSpeed 3.20",
                "(35.6 damage per second)",
                "+12 Intellect",
                "+15 Stamina",
                "Equip: Increases the damage dealt by your Stormstrike ability by 10%."
              ],
              "reqLevel": 30,
              "icon": "inv_mace_42"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 34,
          "stats": "+16 Strength, +5 Agility, Use: Increases your attack speed by 50% for 30 sec. (3 Min Cooldown)",
          "lines": [
            "Binds when picked up",
            "Unique",
            "Two-Hand\tMace",
            "46 - 70 Damage\tSpeed 2.00",
            "(29 damage per second)",
            "+16 Strength",
            "+5 Agility",
            "Use: Increases your attack speed by 50% for 30 sec. (3 Min Cooldown)",
            "3 Charges",
            "Requires Level 29"
          ],
          "reqLevel": 29
        },
        {
          "levelBracket": "31–35",
          "itemId": 9449,
          "name": "Manual Crowd Pummeler",
          "icon": "inv_mace_14",
          "weaponType": "Two-handed mace",
          "speed": "2.00",
          "dps": "31.5 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Crowd Pummeler 9-60",
            "detail": "The 50% haste active makes this legendary for all druids"
          },
          "alts": [
            {
              "name": "Illusionary Rod",
              "itemId": 7713,
              "value": "25.7 DPS, +15 Int, +10 Spi - SM Library: Arcanist Doan",
              "faction": "both",
              "dps": "25.74 DPS",
              "speed": "3.40",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 39,
              "reqLevel": 34,
              "stats": "+15 Int, +10 Spi",
              "icon": "inv_staff_08"
            },
            {
              "name": "Rock Pulverizer",
              "itemId": 4983,
              "value": "28.4 DPS, 3.20s - Badlands Quest: Murdaloc",
              "faction": "both",
              "dps": "31.22 DPS",
              "speed": "3.70",
              "weaponType": "Two-handed mace",
              "quality": "q2",
              "iLvl": 42,
              "stats": "Equip: +34 Attack Power.",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "92 - 139 Damage\tSpeed 3.70",
                "(31.2 damage per second)",
                "Equip: +34 Attack Power."
              ],
              "reqLevel": 30,
              "icon": "inv_hammer_17"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 34,
          "stats": "+16 Strength, +5 Agility, Use: Increases your attack speed by 50% for 30 sec. (3 Min Cooldown)",
          "lines": [
            "Binds when picked up",
            "Unique",
            "Two-Hand\tMace",
            "46 - 70 Damage\tSpeed 2.00",
            "(29 damage per second)",
            "+16 Strength",
            "+5 Agility",
            "Use: Increases your attack speed by 50% for 30 sec. (3 Min Cooldown)",
            "3 Charges",
            "Requires Level 29"
          ],
          "reqLevel": 29
        },
        {
          "levelBracket": "36–40",
          "itemId": 7723,
          "name": "Mograine's Might",
          "icon": "inv_hammer_04",
          "weaponType": "Two-handed mace",
          "speed": "3.50",
          "dps": "38.9 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Scarlet Commander Mograine",
            "detail": "Scarlet Monastery Cathedral (+16 Str, +17 Sta)"
          },
          "alts": [
            {
              "name": "Staff of Jordan",
              "itemId": 873,
              "value": "31.0 DPS, +26 Spell Power - World drop BoE staff",
              "faction": "both",
              "dps": "29.86 DPS",
              "speed": "3.70",
              "weaponType": "Staff",
              "quality": "q4",
              "iLvl": 40,
              "reqLevel": 35,
              "stats": "+26 Spell Power",
              "icon": "inv_staff_13"
            },
            {
              "name": "Dendweller's Hammer",
              "itemId": 284459,
              "weaponType": "Two-handed mace",
              "speed": "3.30",
              "dps": "25.6 DPS",
              "value": "25.6 DPS, 3.30s - Custom 2H Mace Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 31,
              "stats": "+12 Stamina, +100 Armor",
              "lines": [
                "Binds when picked up",
                "Two-Hand\tMace",
                "67 - 102 Damage\tSpeed 3.30",
                "(25.6 damage per second)",
                "+12 Stamina",
                "+100 Armor",
                "Requires Level 26"
              ],
              "reqLevel": 26,
              "icon": "inv_hammer_09"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 44,
          "reqLevel": 39,
          "stats": "+16 Str, +17 Sta"
        },
        {
          "levelBracket": "41–46",
          "itemId": 18082,
          "name": "Zum'rah's Vexing Cane",
          "icon": "inv_staff_01",
          "weaponType": "Staff",
          "speed": "2.70",
          "dps": "31.1 DPS",
          "source": {
            "kind": "dungeon",
            "title": "Zul'Farrak",
            "detail": "Witch Doctor Zum'rah (+10 Int, +21 SP)"
          },
          "alts": [
            {
              "name": "Spellshifter Rod",
              "itemId": 9527,
              "value": "31.1 DPS - Quest: Tiara of the Deep",
              "faction": "both",
              "dps": "31.11 DPS",
              "speed": "2.70",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 48,
              "reqLevel": 40,
              "stats": "+9 Stamina, +23 Intellect, +54 Spell Power",
              "icon": "inv_wand_11"
            },
            {
              "name": "Grisly Sack of Skulls",
              "itemId": 1959,
              "value": "40.3 DPS - World Drop",
              "faction": "both",
              "dps": "40.3 DPS",
              "quality": "q3",
              "iLvl": 46,
              "reqLevel": 40,
              "stats": "",
              "icon": "inv_misc_bag_10"
            },
            {
              "name": "Gul'gash's Greathammer",
              "itemId": 281648,
              "weaponType": "Two-handed mace",
              "speed": "3.60",
              "dps": "42.8 DPS",
              "value": "42.8 DPS, 3.60s - Feralas Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 49,
              "reqLevel": 44,
              "stats": "",
              "icon": "inv_hammer_16"
            },
            {
              "name": "Emerald Watcher's Dreamstaff",
              "itemId": 282007,
              "weaponType": "Staff",
              "speed": "3.00",
              "dps": "31.7 DPS",
              "value": "31.7 DPS, 3.00s - Custom Staff Drop",
              "faction": "both",
              "quality": "q3",
              "iLvl": 49,
              "reqLevel": 44,
              "stats": "",
              "icon": "inv_staff_17"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 48,
          "reqLevel": 43,
          "stats": "+10 Int, +21 SP"
        },
        {
          "levelBracket": "47–52",
          "itemId": 11608,
          "name": "Dark Iron Pulverizer",
          "icon": "inv_hammer_08",
          "weaponType": "Two-handed mace",
          "speed": "3.70",
          "dps": "47.4 DPS",
          "source": {
            "kind": "craft",
            "title": "Blacksmithing (265)",
            "detail": "Plan drops in Blackrock Depths - 8s stun proc"
          },
          "alts": [
            {
              "name": "Kindling Stave",
              "itemId": 11750,
              "value": "34.1 DPS - BRD: Pyromancer Loregrain",
              "faction": "both",
              "dps": "34.14 DPS",
              "speed": "2.90",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 53,
              "reqLevel": 48,
              "stats": "+14 Critical Strike Rating, +60 Spell Power",
              "icon": "inv_staff_08"
            },
            {
              "name": "Enchanted Battlehammer",
              "itemId": 12776,
              "value": "48.3 DPS - Blacksmithing (280)",
              "faction": "both",
              "dps": "48.29 DPS",
              "speed": "3.50",
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 51,
              "stats": "+4 Arcane Resistance, +21 Parry Rating, +20 Hit Rating",
              "icon": "inv_hammer_04"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 55,
          "reqLevel": 50,
          "stats": ""
        },
        {
          "levelBracket": "53–60",
          "itemId": 943,
          "name": "Warden Staff",
          "icon": "inv_staff_10",
          "weaponType": "Staff",
          "speed": "2.40",
          "dps": "38.3 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop BoE",
            "detail": "Undisputed BiS Feral Bear Tanking weapon forever (+260 Armor, +10 Defense)"
          },
          "alts": [
            {
              "name": "Wisepaw Totem",
              "itemId": 274420,
              "value": "36.9 DPS - Mount Hyjal caster staff",
              "faction": "both",
              "dps": "36.88 DPS",
              "speed": "3.20",
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 58,
              "reqLevel": 53,
              "stats": "",
              "icon": "inv_staff_51"
            },
            {
              "name": "Hammer of the Grand Crusader",
              "itemId": 18717,
              "value": "53.9 DPS - Stratholme 2H Mace",
              "faction": "both",
              "dps": "53.9 DPS",
              "quality": "q3",
              "iLvl": 58,
              "reqLevel": 52,
              "stats": "",
              "icon": "inv_hammer_04"
            },
            {
              "name": "Rod of the Ogre Magi",
              "itemId": 18534,
              "value": "36.0 DPS - DM North Tribute Run",
              "faction": "both",
              "dps": "36.0 DPS",
              "quality": "q3",
              "iLvl": 58,
              "reqLevel": 52,
              "stats": "",
              "icon": "inv_staff_13"
            },
            {
              "name": "Unyielding Maul",
              "itemId": 18420,
              "weaponType": "Two-handed mace",
              "quality": "q3",
              "iLvl": 62,
              "reqLevel": 57,
              "dps": "50.8 DPS",
              "speed": "3.20",
              "stats": "+250 Armor, +12 Stamina — #1 Pre-Raid Bear Tank Weapon",
              "icon": "inv_hammer_05",
              "value": "Dire Maul North — Guard Slip'kik / King Gordok"
            },
            {
              "name": "Guiding Stave of Wisdom",
              "itemId": 11932,
              "weaponType": "Staff",
              "quality": "q3",
              "iLvl": 59,
              "reqLevel": 54,
              "dps": "48.9 DPS",
              "speed": "3.10",
              "stats": "+22 Intellect, +10 Spirit, +14 Spell Power & Healing",
              "icon": "inv_staff_29",
              "value": "Blackrock Depths — Emperor Dagran Thaurissan"
            },
            {
              "name": "Aurastone Hammer",
              "itemId": 17105,
              "weaponType": "One-handed mace",
              "quality": "q4",
              "iLvl": 66,
              "reqLevel": 60,
              "dps": "44.2 DPS",
              "speed": "2.70",
              "stats": "+10 Intellect, +5 Stamina, +25 Spell Power & Healing",
              "icon": "inv_hammer_18",
              "value": "Molten Core — Garr"
            }
          ],
          "faction": "both",
          "quality": "q3",
          "iLvl": 58,
          "reqLevel": 52,
          "stats": "+260 Armor, +10 Defense"
        }
      ]
    }
  },
  "wands": {
    "mage": {
      "role": "Caster",
      "levels": [
        {
          "levelBracket": "1–4",
          "itemId": 247789,
          "name": "Novice's Practice Wand",
          "icon": "inv_weapon_shortblade_09",
          "weaponType": "Wand",
          "speed": "1.50",
          "dps": "4.0 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Vendor or starting quest wand enabling early wanding rotation without mana drain."
          },
          "faction": "both",
          "quality": "q1",
          "iLvl": 6,
          "reqLevel": 1,
          "stats": "Starter Level 1 Wand",
          "alts": [
            {
              "name": "Dowsing Rod",
              "itemId": 263428,
              "value": "4.17 DPS, 1.20s - A Magical Affront quest (Alliance)",
              "faction": "alliance",
              "dps": "4.17 DPS",
              "speed": "1.20",
              "weaponType": "Wand",
              "quality": "q1",
              "iLvl": 6,
              "reqLevel": 4,
              "stats": "",
              "icon": "inv_wand_05"
            }
          ]
        },
        {
          "levelBracket": "5–6",
          "itemId": 286743,
          "name": "Riptear's Spare Arm",
          "icon": "inv_wand_01",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "9.41 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Rear Guard Patrol quest reward in Durotar (Horde). Enormous level 6 wand upgrade."
          },
          "faction": "horde",
          "quality": "q2",
          "iLvl": 13,
          "reqLevel": 6,
          "stats": "Shadow Damage (11–21)",
          "alts": [
            {
              "name": "Lesser Magic Wand",
              "itemId": 11287,
              "value": "11.3 DPS, 1.50s - Crafted by Enchanters (Skill 10)",
              "faction": "both",
              "dps": "11.3 DPS",
              "speed": "1.50",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 15,
              "reqLevel": 5,
              "stats": "",
              "icon": "inv_wand_01"
            },
            {
              "name": "Wisesight Wand",
              "itemId": 286750,
              "value": "8.82 DPS, 1.70s (+1 Int) - Nightscreech drop",
              "faction": "both",
              "dps": "8.82 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "+1 Intellect",
              "icon": "inv_wand_01"
            }
          ]
        },
        {
          "levelBracket": "7–10",
          "itemId": 279896,
          "name": "Deepblaze",
          "icon": "inv_wand_11",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "18.53 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Old Ironforge Incursion quest reward (Alliance). Exceptional 18.5 DPS at level 9."
          },
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 18,
          "reqLevel": 9,
          "stats": "Fire Damage (22–41), +3 Fire Res",
          "alts": [
            {
              "name": "Wisesight Wand",
              "itemId": 286750,
              "value": "8.82 DPS, 1.70s (+1 Int) - Matriarch / drop",
              "faction": "both",
              "dps": "8.82 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "+1 Intellect",
              "icon": "inv_wand_01"
            },
            {
              "name": "Windbough Wand",
              "itemId": 263430,
              "value": "7.19 DPS, 1.60s - Boughs in the Wind quest",
              "faction": "alliance",
              "dps": "7.19 DPS",
              "speed": "1.60",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 10,
              "reqLevel": 10,
              "stats": "+1 Intellect",
              "icon": "inv_wand_1h_skybornec60_b_01"
            }
          ]
        },
        {
          "levelBracket": "11–14",
          "itemId": 11288,
          "name": "Greater Magic Wand",
          "icon": "inv_staff_02",
          "weaponType": "Wand",
          "speed": "1.30",
          "dps": "17.5 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Crafted by Enchanters (Skill 75). Standard leveling powerhouse wand for both factions."
          },
          "faction": "both",
          "quality": "q2",
          "iLvl": 23,
          "reqLevel": 13,
          "stats": "Arcane Damage (20–37)",
          "alts": [
            {
              "name": "Moongazer's Wand",
              "itemId": 284193,
              "value": "14.41 DPS, 1.70s - Lady Moongazer drop",
              "faction": "both",
              "dps": "14.41 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 19,
              "reqLevel": 14,
              "stats": "",
              "icon": "inv_staff_06"
            },
            {
              "name": "Whelpfire Wand",
              "itemId": 281925,
              "value": "15.26 DPS, 1.90s - Snarlflare in Redridge",
              "faction": "both",
              "dps": "15.26 DPS",
              "speed": "1.90",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 20,
              "reqLevel": 15,
              "stats": "",
              "icon": "inv_wand_11"
            }
          ]
        },
        {
          "levelBracket": "15–20",
          "itemId": 281925,
          "name": "Whelpfire Wand",
          "icon": "inv_wand_11",
          "weaponType": "Wand",
          "speed": "1.90",
          "dps": "15.26 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Snarlflare in Redridge Mountains. High single-shot top-end damage for wand weaving."
          },
          "faction": "both",
          "quality": "q2",
          "iLvl": 20,
          "reqLevel": 15,
          "stats": "Fire Damage (24–45)",
          "alts": [
            {
              "name": "Snapped Branch Wand",
              "itemId": 284574,
              "value": "21.18 DPS, 1.70s - Level 22 World Drop",
              "faction": "both",
              "dps": "21.18 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "+3 Nature Resistance",
              "icon": "inv_staff_02"
            },
            {
              "name": "Greater Magic Wand",
              "itemId": 11288,
              "value": "17.5 DPS, 1.30s - Continue using if unavailable",
              "faction": "both",
              "dps": "17.5 DPS",
              "speed": "1.80",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 23,
              "reqLevel": 13,
              "stats": "",
              "icon": "inv_staff_02"
            }
          ]
        },
        {
          "levelBracket": "21–25",
          "itemId": 279847,
          "name": "Unstable Power Core",
          "icon": "inv_wand_02",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "29.71 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Source of Power quest reward in City of Dalaran (Horde). Huge 29.7 DPS spike."
          },
          "faction": "horde",
          "quality": "q3",
          "iLvl": 36,
          "reqLevel": 24,
          "stats": "Arcane Damage (40–74)",
          "alts": [
            {
              "name": "Gravestone Scepter",
              "itemId": 7001,
              "weaponType": "Wand",
              "speed": "1.50",
              "dps": "29.0 DPS",
              "value": "29.0 DPS, 1.50s (+6 Shadow SP) - BFD: Blackfathom Villainy",
              "faction": "both",
              "quality": "q3",
              "iLvl": 29,
              "reqLevel": 24,
              "stats": "+3 Spirit, Equip: Increases damage done by Shadow spells and effects by up to 6.",
              "lines": [
                "Binds when picked up",
                "Ranged\tWand",
                "30 - 57 Shadow Damage\tSpeed 1.50",
                "(29.0 damage per second)",
                "+3 Spirit",
                "Equip: Increases damage done by Shadow spells and effects by up to 6.",
                "Requires Level 24"
              ],
              "icon": "inv_wand_02",
              "source": {
                "kind": "quest",
                "title": "Blackfathom Villainy",
                "detail": "Blackfathom Deeps quest reward. The premier leveling wand for casters level 24-35."
              }
            },
            {
              "name": "Lesser Mystic Wand",
              "itemId": 11289,
              "value": "23.2 DPS, 1.40s - Crafted by Enchanters (Skill 155)",
              "faction": "both",
              "dps": "25.4 DPS",
              "speed": "1.30",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 31,
              "reqLevel": 26,
              "stats": "",
              "icon": "inv_wand_02"
            },
            {
              "name": "Wand of Mana Concentration",
              "itemId": 273043,
              "value": "31.18 DPS, 1.70s - Arcanic Enigma in City of Dalaran",
              "faction": "both",
              "dps": "31.18 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q3",
              "iLvl": 32,
              "reqLevel": 27,
              "stats": "+4 Intellect",
              "icon": "inv_wand_06"
            },
            {
              "name": "Snapped Branch Wand",
              "itemId": 284574,
              "value": "21.18 DPS, 1.70s - Level 22 World Drop",
              "faction": "both",
              "dps": "21.18 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "+3 Nature Resistance",
              "icon": "inv_staff_02"
            }
          ]
        },
        {
          "levelBracket": "26–30",
          "itemId": 273043,
          "name": "Wand of Mana Concentration",
          "icon": "inv_wand_06",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "31.18 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Arcanic Enigma in City of Dalaran. Premier level 27 caster wand with bonus spell power."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 32,
          "reqLevel": 27,
          "stats": "Arcane Damage (42–78), +3 Int, +5 Spell Power",
          "alts": [
            {
              "name": "Master Hunter's Wand",
              "itemId": 270084,
              "value": "34.67 DPS, 1.50s - Big Game Hunter quest in STV",
              "faction": "both",
              "dps": "34.67 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 43,
              "reqLevel": 28,
              "stats": "",
              "icon": "inv_wand_07"
            },
            {
              "name": "Greater Mystic Wand",
              "itemId": 217287,
              "value": "29.0 DPS, 2.00s - Crafted by Enchanters (Skill 175)",
              "faction": "both",
              "dps": "29.00 DPS",
              "speed": "2.00",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 35,
              "reqLevel": 30,
              "stats": "",
              "icon": "inv_wand_07"
            },
            {
              "name": "Nether Force Wand",
              "itemId": 11263,
              "quality": "q3",
              "iLvl": 35,
              "reqLevel": 30,
              "speed": "1.80",
              "dps": "27.5 DPS",
              "stats": "+5 Arcane Spell Power",
              "icon": "inv_wand_01",
              "value": "Mage Level 30 Quest: Rituals of Power"
            },
            {
              "name": "Icefury Wand",
              "itemId": 7514,
              "quality": "q3",
              "iLvl": 35,
              "reqLevel": 30,
              "speed": "1.70",
              "dps": "29.1 DPS",
              "stats": "+5 Frost Spell Power",
              "icon": "inv_wand_06",
              "value": "Mage Level 30 Quest: Rituals of Power"
            }
          ]
        },
        {
          "levelBracket": "31–36",
          "itemId": 270084,
          "name": "Master Hunter's Wand",
          "icon": "inv_wand_07",
          "weaponType": "Wand",
          "speed": "1.50",
          "dps": "34.67 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Big Game Hunter quest reward in Stranglethorn Vale. Exceptional 34.7 DPS at level 28+."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 43,
          "reqLevel": 28,
          "stats": "Nature Damage (44–82)",
          "alts": [
            {
              "name": "Greater Mystic Wand",
              "itemId": 217287,
              "value": "29.0 DPS, 2.00s - Enchanter crafted (Req lvl 30)",
              "faction": "both",
              "dps": "29.00 DPS",
              "speed": "2.00",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 35,
              "reqLevel": 30,
              "stats": "",
              "icon": "inv_wand_07"
            },
            {
              "name": "Twisted Nether Wand",
              "itemId": 249144,
              "value": "34.0 DPS, 1.50s - Crafted by Enchanters (Req lvl 37)",
              "faction": "both",
              "dps": "34.00 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 42,
              "reqLevel": 37,
              "stats": "",
              "icon": "inv_wand_03"
            }
          ]
        },
        {
          "levelBracket": "37–42",
          "itemId": 274425,
          "name": "White Obsidian Wand",
          "icon": "inv_wand_07",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "41.47 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Level 39 Rare Dungeon Drop. Crushing 41.5 DPS wanding output."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 44,
          "reqLevel": 39,
          "stats": "Shadow Damage (55–102)",
          "alts": [
            {
              "name": "Dudd's Second-Favorite Wand",
              "itemId": 277256,
              "value": "35.67 DPS, 1.50s - Partial Mystical Notes quest",
              "faction": "both",
              "dps": "35.67 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 45,
              "reqLevel": 40,
              "stats": "+5 Intellect",
              "icon": "inv_wand_01"
            },
            {
              "name": "Twisted Nether Wand",
              "itemId": 249144,
              "value": "34.0 DPS, 1.50s - Crafted by Enchanters (Req lvl 37)",
              "faction": "both",
              "dps": "34.00 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 42,
              "reqLevel": 37,
              "stats": "",
              "icon": "inv_wand_03"
            }
          ]
        },
        {
          "levelBracket": "43–48",
          "itemId": 274655,
          "name": "Peacekeeper Wand",
          "icon": "inv_wand_14",
          "weaponType": "Wand",
          "speed": "1.90",
          "dps": "45.53 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Level 43 Rare Dungeon Drop. Invaluable mana-free damage while grinding mid-40s."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 48,
          "reqLevel": 43,
          "stats": "Arcane Damage (68–125)",
          "alts": [
            {
              "name": "Dreambough Wand",
              "itemId": 249234,
              "value": "39.17 DPS, 1.80s - Crafted by Enchanters (Skill 225)",
              "faction": "both",
              "dps": "39.17 DPS",
              "speed": "1.80",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 48,
              "reqLevel": 43,
              "stats": "",
              "icon": "inv_wand_04"
            },
            {
              "name": "Lesser Eternal Wand",
              "itemId": 249232,
              "value": "45.75 DPS, 2.00s - Crafted by Enchanters (Req lvl 49)",
              "faction": "both",
              "dps": "45.75 DPS",
              "speed": "2.00",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 54,
              "reqLevel": 49,
              "stats": "",
              "icon": "inv_wand_05"
            }
          ]
        },
        {
          "levelBracket": "49–54",
          "itemId": 249232,
          "name": "Lesser Eternal Wand",
          "icon": "inv_wand_05",
          "weaponType": "Wand",
          "speed": "2.00",
          "dps": "45.75 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Crafted by Enchanters (Skill 260). High consistency, easily acquired pre-raid."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 54,
          "reqLevel": 49,
          "stats": "Arcane Damage (73–137)",
          "alts": [
            {
              "name": "Wail of Death",
              "itemId": 281600,
              "value": "54.17 DPS, 1.80s - Rare World Drop (Req lvl 56)",
              "faction": "both",
              "dps": "54.17 DPS",
              "speed": "1.80",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 61,
              "reqLevel": 56,
              "stats": "+6 Stamina, +4 Spirit",
              "icon": "inv_wand_12"
            }
          ]
        },
        {
          "levelBracket": "55–60",
          "itemId": 281600,
          "name": "Wail of Death",
          "icon": "inv_wand_12",
          "weaponType": "Wand",
          "speed": "1.80",
          "dps": "54.17 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Level 56 Rare Wand. Outstanding finisher wand before entering Level 60 raid content."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 61,
          "reqLevel": 56,
          "stats": "Shadow Damage (85–159)",
          "alts": [
            {
              "name": "Brilliant Wand",
              "itemId": 249385,
              "value": "59.58 DPS, 1.20s - Fast high-DPS wand",
              "faction": "both",
              "dps": "59.58 DPS",
              "speed": "1.20",
              "weaponType": "Wand",
              "quality": "q3",
              "iLvl": 60,
              "reqLevel": 55,
              "stats": "+7 Intellect",
              "icon": "inv_wand_07"
            },
            {
              "name": "Greater Eternal Wand",
              "itemId": 249237,
              "value": "53.33 DPS, 1.50s - Crafted by Enchanters (Skill 285)",
              "faction": "both",
              "dps": "53.33 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 60,
              "reqLevel": 55,
              "stats": "",
              "icon": "inv_wand_14"
            },
            {
              "name": "Torch of Light",
              "itemId": 279246,
              "value": "76.76 DPS, 1.70s - Best-in-Slot Level 60 Wand",
              "faction": "both",
              "dps": "76.76 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q4",
              "iLvl": 65,
              "reqLevel": 60,
              "stats": "+11 Spirit",
              "icon": "inv_torch_lit"
            },
            {
              "name": "Bonecreeper Stylus",
              "itemId": 13938,
              "quality": "q3",
              "iLvl": 62,
              "reqLevel": 57,
              "speed": "1.30",
              "dps": "63.5 DPS",
              "stats": "+4 Intellect, +11 Spell Power",
              "icon": "inv_wand_05",
              "value": "Scholomance — Darkmaster Gandling"
            }
          ]
        }
      ]
    },
    "priest": {
      "role": "Caster",
      "levels": [
        {
          "levelBracket": "1–4",
          "itemId": 247789,
          "name": "Novice's Practice Wand",
          "icon": "inv_weapon_shortblade_09",
          "weaponType": "Wand",
          "speed": "1.50",
          "dps": "4.0 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Vendor or starting quest wand enabling early wanding rotation without mana drain."
          },
          "faction": "both",
          "quality": "q1",
          "iLvl": 6,
          "reqLevel": 1,
          "stats": "Starter Level 1 Wand",
          "alts": [
            {
              "name": "Dowsing Rod",
              "itemId": 263428,
              "value": "4.17 DPS, 1.20s - A Magical Affront quest (Alliance)",
              "faction": "alliance",
              "dps": "4.17 DPS",
              "speed": "1.20",
              "weaponType": "Wand",
              "quality": "q1",
              "iLvl": 6,
              "reqLevel": 4,
              "stats": "",
              "icon": "inv_wand_05"
            }
          ]
        },
        {
          "levelBracket": "5–6",
          "itemId": 286743,
          "name": "Riptear's Spare Arm",
          "icon": "inv_wand_01",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "9.41 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Rear Guard Patrol quest reward in Durotar (Horde). Enormous level 6 wand upgrade."
          },
          "faction": "horde",
          "quality": "q2",
          "iLvl": 13,
          "reqLevel": 6,
          "stats": "Shadow Damage (11–21)",
          "alts": [
            {
              "name": "Lesser Magic Wand",
              "itemId": 11287,
              "value": "11.3 DPS, 1.50s - Crafted by Enchanters (Skill 10)",
              "faction": "both",
              "dps": "11.3 DPS",
              "speed": "1.50",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 15,
              "reqLevel": 5,
              "stats": "",
              "icon": "inv_wand_01"
            },
            {
              "name": "Wisesight Wand",
              "itemId": 286750,
              "value": "8.82 DPS, 1.70s (+1 Int) - Nightscreech drop",
              "faction": "both",
              "dps": "8.82 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "+1 Intellect",
              "icon": "inv_wand_01"
            }
          ]
        },
        {
          "levelBracket": "7–10",
          "itemId": 279896,
          "name": "Deepblaze",
          "icon": "inv_wand_11",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "18.53 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Old Ironforge Incursion quest reward (Alliance). Exceptional 18.5 DPS at level 9."
          },
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 18,
          "reqLevel": 9,
          "stats": "Fire Damage (22–41), +3 Fire Res",
          "alts": [
            {
              "name": "Wisesight Wand",
              "itemId": 286750,
              "value": "8.82 DPS, 1.70s (+1 Int) - Matriarch / drop",
              "faction": "both",
              "dps": "8.82 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "+1 Intellect",
              "icon": "inv_wand_01"
            },
            {
              "name": "Windbough Wand",
              "itemId": 263430,
              "value": "7.19 DPS, 1.60s - Boughs in the Wind quest",
              "faction": "alliance",
              "dps": "7.19 DPS",
              "speed": "1.60",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 10,
              "reqLevel": 10,
              "stats": "+1 Intellect",
              "icon": "inv_wand_1h_skybornec60_b_01"
            }
          ]
        },
        {
          "levelBracket": "11–14",
          "itemId": 11288,
          "name": "Greater Magic Wand",
          "icon": "inv_staff_02",
          "weaponType": "Wand",
          "speed": "1.30",
          "dps": "17.5 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Crafted by Enchanters (Skill 75). Standard leveling powerhouse wand for both factions."
          },
          "faction": "both",
          "quality": "q2",
          "iLvl": 23,
          "reqLevel": 13,
          "stats": "Arcane Damage (20–37)",
          "alts": [
            {
              "name": "Moongazer's Wand",
              "itemId": 284193,
              "value": "14.41 DPS, 1.70s - Lady Moongazer drop",
              "faction": "both",
              "dps": "14.41 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 19,
              "reqLevel": 14,
              "stats": "",
              "icon": "inv_staff_06"
            },
            {
              "name": "Whelpfire Wand",
              "itemId": 281925,
              "value": "15.26 DPS, 1.90s - Snarlflare in Redridge",
              "faction": "both",
              "dps": "15.26 DPS",
              "speed": "1.90",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 20,
              "reqLevel": 15,
              "stats": "",
              "icon": "inv_wand_11"
            }
          ]
        },
        {
          "levelBracket": "15–20",
          "itemId": 281925,
          "name": "Whelpfire Wand",
          "icon": "inv_wand_11",
          "weaponType": "Wand",
          "speed": "1.90",
          "dps": "15.26 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Snarlflare in Redridge Mountains. High single-shot top-end damage for wand weaving."
          },
          "faction": "both",
          "quality": "q2",
          "iLvl": 20,
          "reqLevel": 15,
          "stats": "Fire Damage (24–45)",
          "alts": [
            {
              "name": "Snapped Branch Wand",
              "itemId": 284574,
              "value": "21.18 DPS, 1.70s - Level 22 World Drop",
              "faction": "both",
              "dps": "21.18 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "+3 Nature Resistance",
              "icon": "inv_staff_02"
            },
            {
              "name": "Greater Magic Wand",
              "itemId": 11288,
              "value": "17.5 DPS, 1.30s - Continue using if unavailable",
              "faction": "both",
              "dps": "17.5 DPS",
              "speed": "1.80",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 23,
              "reqLevel": 13,
              "stats": "",
              "icon": "inv_staff_02"
            }
          ]
        },
        {
          "levelBracket": "21–25",
          "itemId": 279847,
          "name": "Unstable Power Core",
          "icon": "inv_wand_02",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "29.71 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Source of Power quest reward in City of Dalaran (Horde). Huge 29.7 DPS spike."
          },
          "faction": "horde",
          "quality": "q3",
          "iLvl": 36,
          "reqLevel": 24,
          "stats": "Arcane Damage (40–74)",
          "alts": [
            {
              "name": "Gravestone Scepter",
              "itemId": 7001,
              "weaponType": "Wand",
              "speed": "1.50",
              "dps": "29.0 DPS",
              "value": "29.0 DPS, 1.50s (+6 Shadow SP) - BFD: Blackfathom Villainy",
              "faction": "both",
              "quality": "q3",
              "iLvl": 29,
              "reqLevel": 24,
              "stats": "+3 Spirit, Equip: Increases damage done by Shadow spells and effects by up to 6.",
              "lines": [
                "Binds when picked up",
                "Ranged\tWand",
                "30 - 57 Shadow Damage\tSpeed 1.50",
                "(29.0 damage per second)",
                "+3 Spirit",
                "Equip: Increases damage done by Shadow spells and effects by up to 6.",
                "Requires Level 24"
              ],
              "icon": "inv_wand_02",
              "source": {
                "kind": "quest",
                "title": "Blackfathom Villainy",
                "detail": "Blackfathom Deeps quest reward. The premier leveling wand for casters level 24-35."
              }
            },
            {
              "name": "Lesser Mystic Wand",
              "itemId": 11289,
              "value": "23.2 DPS, 1.40s - Crafted by Enchanters (Skill 155)",
              "faction": "both",
              "dps": "25.4 DPS",
              "speed": "1.30",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 31,
              "reqLevel": 26,
              "stats": "",
              "icon": "inv_wand_02"
            },
            {
              "name": "Wand of Mana Concentration",
              "itemId": 273043,
              "value": "31.18 DPS, 1.70s - Arcanic Enigma in City of Dalaran",
              "faction": "both",
              "dps": "31.18 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q3",
              "iLvl": 32,
              "reqLevel": 27,
              "stats": "+4 Intellect",
              "icon": "inv_wand_06"
            },
            {
              "name": "Snapped Branch Wand",
              "itemId": 284574,
              "value": "21.18 DPS, 1.70s - Level 22 World Drop",
              "faction": "both",
              "dps": "21.18 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "+3 Nature Resistance",
              "icon": "inv_staff_02"
            }
          ]
        },
        {
          "levelBracket": "26–30",
          "itemId": 273043,
          "name": "Wand of Mana Concentration",
          "icon": "inv_wand_06",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "31.18 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Arcanic Enigma in City of Dalaran. Premier level 27 caster wand with bonus spell power."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 32,
          "reqLevel": 27,
          "stats": "Arcane Damage (42–78), +3 Int, +5 Spell Power",
          "alts": [
            {
              "name": "Master Hunter's Wand",
              "itemId": 270084,
              "value": "34.67 DPS, 1.50s - Big Game Hunter quest in STV",
              "faction": "both",
              "dps": "34.67 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 43,
              "reqLevel": 28,
              "stats": "",
              "icon": "inv_wand_07"
            },
            {
              "name": "Greater Mystic Wand",
              "itemId": 217287,
              "value": "29.0 DPS, 2.00s - Crafted by Enchanters (Skill 175)",
              "faction": "both",
              "dps": "29.00 DPS",
              "speed": "2.00",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 35,
              "reqLevel": 30,
              "stats": "",
              "icon": "inv_wand_07"
            }
          ]
        },
        {
          "levelBracket": "31–36",
          "itemId": 270084,
          "name": "Master Hunter's Wand",
          "icon": "inv_wand_07",
          "weaponType": "Wand",
          "speed": "1.50",
          "dps": "34.67 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Big Game Hunter quest reward in Stranglethorn Vale. Exceptional 34.7 DPS at level 28+."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 43,
          "reqLevel": 28,
          "stats": "Nature Damage (44–82)",
          "alts": [
            {
              "name": "Greater Mystic Wand",
              "itemId": 217287,
              "value": "29.0 DPS, 2.00s - Enchanter crafted (Req lvl 30)",
              "faction": "both",
              "dps": "29.00 DPS",
              "speed": "2.00",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 35,
              "reqLevel": 30,
              "stats": "",
              "icon": "inv_wand_07"
            },
            {
              "name": "Twisted Nether Wand",
              "itemId": 249144,
              "value": "34.0 DPS, 1.50s - Crafted by Enchanters (Req lvl 37)",
              "faction": "both",
              "dps": "34.00 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 42,
              "reqLevel": 37,
              "stats": "",
              "icon": "inv_wand_03"
            }
          ]
        },
        {
          "levelBracket": "37–42",
          "itemId": 274425,
          "name": "White Obsidian Wand",
          "icon": "inv_wand_07",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "41.47 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Level 39 Rare Dungeon Drop. Crushing 41.5 DPS wanding output."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 44,
          "reqLevel": 39,
          "stats": "Shadow Damage (55–102)",
          "alts": [
            {
              "name": "Dudd's Second-Favorite Wand",
              "itemId": 277256,
              "value": "35.67 DPS, 1.50s - Partial Mystical Notes quest",
              "faction": "both",
              "dps": "35.67 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 45,
              "reqLevel": 40,
              "stats": "+5 Intellect",
              "icon": "inv_wand_01"
            },
            {
              "name": "Twisted Nether Wand",
              "itemId": 249144,
              "value": "34.0 DPS, 1.50s - Crafted by Enchanters (Req lvl 37)",
              "faction": "both",
              "dps": "34.00 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 42,
              "reqLevel": 37,
              "stats": "",
              "icon": "inv_wand_03"
            }
          ]
        },
        {
          "levelBracket": "43–48",
          "itemId": 274655,
          "name": "Peacekeeper Wand",
          "icon": "inv_wand_14",
          "weaponType": "Wand",
          "speed": "1.90",
          "dps": "45.53 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Level 43 Rare Dungeon Drop. Invaluable mana-free damage while grinding mid-40s."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 48,
          "reqLevel": 43,
          "stats": "Arcane Damage (68–125)",
          "alts": [
            {
              "name": "Dreambough Wand",
              "itemId": 249234,
              "value": "39.17 DPS, 1.80s - Crafted by Enchanters (Skill 225)",
              "faction": "both",
              "dps": "39.17 DPS",
              "speed": "1.80",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 48,
              "reqLevel": 43,
              "stats": "",
              "icon": "inv_wand_04"
            },
            {
              "name": "Lesser Eternal Wand",
              "itemId": 249232,
              "value": "45.75 DPS, 2.00s - Crafted by Enchanters (Req lvl 49)",
              "faction": "both",
              "dps": "45.75 DPS",
              "speed": "2.00",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 54,
              "reqLevel": 49,
              "stats": "",
              "icon": "inv_wand_05"
            }
          ]
        },
        {
          "levelBracket": "49–54",
          "itemId": 249232,
          "name": "Lesser Eternal Wand",
          "icon": "inv_wand_05",
          "weaponType": "Wand",
          "speed": "2.00",
          "dps": "45.75 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Crafted by Enchanters (Skill 260). High consistency, easily acquired pre-raid."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 54,
          "reqLevel": 49,
          "stats": "Arcane Damage (73–137)",
          "alts": [
            {
              "name": "Wail of Death",
              "itemId": 281600,
              "value": "54.17 DPS, 1.80s - Rare World Drop (Req lvl 56)",
              "faction": "both",
              "dps": "54.17 DPS",
              "speed": "1.80",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 61,
              "reqLevel": 56,
              "stats": "+6 Stamina, +4 Spirit",
              "icon": "inv_wand_12"
            }
          ]
        },
        {
          "levelBracket": "55–60",
          "itemId": 281600,
          "name": "Wail of Death",
          "icon": "inv_wand_12",
          "weaponType": "Wand",
          "speed": "1.80",
          "dps": "54.17 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Level 56 Rare Wand. Outstanding finisher wand before entering Level 60 raid content."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 61,
          "reqLevel": 56,
          "stats": "Shadow Damage (85–159)",
          "alts": [
            {
              "name": "Brilliant Wand",
              "itemId": 249385,
              "value": "59.58 DPS, 1.20s - Fast high-DPS wand",
              "faction": "both",
              "dps": "59.58 DPS",
              "speed": "1.20",
              "weaponType": "Wand",
              "quality": "q3",
              "iLvl": 60,
              "reqLevel": 55,
              "stats": "+7 Intellect",
              "icon": "inv_wand_07"
            },
            {
              "name": "Greater Eternal Wand",
              "itemId": 249237,
              "value": "53.33 DPS, 1.50s - Crafted by Enchanters (Skill 285)",
              "faction": "both",
              "dps": "53.33 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 60,
              "reqLevel": 55,
              "stats": "",
              "icon": "inv_wand_14"
            },
            {
              "name": "Torch of Light",
              "itemId": 279246,
              "value": "76.76 DPS, 1.70s - Best-in-Slot Level 60 Wand",
              "faction": "both",
              "dps": "76.76 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q4",
              "iLvl": 65,
              "reqLevel": 60,
              "stats": "+11 Spirit",
              "icon": "inv_torch_lit"
            },
            {
              "name": "Bonecreeper Stylus",
              "itemId": 13938,
              "quality": "q3",
              "iLvl": 62,
              "reqLevel": 57,
              "speed": "1.30",
              "dps": "63.5 DPS",
              "stats": "+4 Intellect, +11 Spell Power",
              "icon": "inv_wand_05",
              "value": "Scholomance — Darkmaster Gandling"
            }
          ]
        }
      ]
    },
    "warlock": {
      "role": "Caster",
      "levels": [
        {
          "levelBracket": "1–4",
          "itemId": 247789,
          "name": "Novice's Practice Wand",
          "icon": "inv_weapon_shortblade_09",
          "weaponType": "Wand",
          "speed": "1.50",
          "dps": "4.0 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Vendor or starting quest wand enabling early wanding rotation without mana drain."
          },
          "faction": "both",
          "quality": "q1",
          "iLvl": 6,
          "reqLevel": 1,
          "stats": "Starter Level 1 Wand",
          "alts": [
            {
              "name": "Dowsing Rod",
              "itemId": 263428,
              "value": "4.17 DPS, 1.20s - A Magical Affront quest (Alliance)",
              "faction": "alliance",
              "dps": "4.17 DPS",
              "speed": "1.20",
              "weaponType": "Wand",
              "quality": "q1",
              "iLvl": 6,
              "reqLevel": 4,
              "stats": "",
              "icon": "inv_wand_05"
            }
          ]
        },
        {
          "levelBracket": "5–6",
          "itemId": 286743,
          "name": "Riptear's Spare Arm",
          "icon": "inv_wand_01",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "9.41 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Rear Guard Patrol quest reward in Durotar (Horde). Enormous level 6 wand upgrade."
          },
          "faction": "horde",
          "quality": "q2",
          "iLvl": 13,
          "reqLevel": 6,
          "stats": "Shadow Damage (11–21)",
          "alts": [
            {
              "name": "Lesser Magic Wand",
              "itemId": 11287,
              "value": "11.3 DPS, 1.50s - Crafted by Enchanters (Skill 10)",
              "faction": "both",
              "dps": "11.3 DPS",
              "speed": "1.50",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 15,
              "reqLevel": 5,
              "stats": "",
              "icon": "inv_wand_01"
            },
            {
              "name": "Wisesight Wand",
              "itemId": 286750,
              "value": "8.82 DPS, 1.70s (+1 Int) - Nightscreech drop",
              "faction": "both",
              "dps": "8.82 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "+1 Intellect",
              "icon": "inv_wand_01"
            }
          ]
        },
        {
          "levelBracket": "7–10",
          "itemId": 279896,
          "name": "Deepblaze",
          "icon": "inv_wand_11",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "18.53 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Old Ironforge Incursion quest reward (Alliance). Exceptional 18.5 DPS at level 9."
          },
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 18,
          "reqLevel": 9,
          "stats": "Fire Damage (22–41), +3 Fire Res",
          "alts": [
            {
              "name": "Wisesight Wand",
              "itemId": 286750,
              "value": "8.82 DPS, 1.70s (+1 Int) - Matriarch / drop",
              "faction": "both",
              "dps": "8.82 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "+1 Intellect",
              "icon": "inv_wand_01"
            },
            {
              "name": "Windbough Wand",
              "itemId": 263430,
              "value": "7.19 DPS, 1.60s - Boughs in the Wind quest",
              "faction": "alliance",
              "dps": "7.19 DPS",
              "speed": "1.60",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 10,
              "reqLevel": 10,
              "stats": "+1 Intellect",
              "icon": "inv_wand_1h_skybornec60_b_01"
            }
          ]
        },
        {
          "levelBracket": "11–14",
          "itemId": 11288,
          "name": "Greater Magic Wand",
          "icon": "inv_staff_02",
          "weaponType": "Wand",
          "speed": "1.30",
          "dps": "17.5 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Crafted by Enchanters (Skill 75). Standard leveling powerhouse wand for both factions."
          },
          "faction": "both",
          "quality": "q2",
          "iLvl": 23,
          "reqLevel": 13,
          "stats": "Arcane Damage (20–37)",
          "alts": [
            {
              "name": "Moongazer's Wand",
              "itemId": 284193,
              "value": "14.41 DPS, 1.70s - Lady Moongazer drop",
              "faction": "both",
              "dps": "14.41 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 19,
              "reqLevel": 14,
              "stats": "",
              "icon": "inv_staff_06"
            },
            {
              "name": "Whelpfire Wand",
              "itemId": 281925,
              "value": "15.26 DPS, 1.90s - Snarlflare in Redridge",
              "faction": "both",
              "dps": "15.26 DPS",
              "speed": "1.90",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 20,
              "reqLevel": 15,
              "stats": "",
              "icon": "inv_wand_11"
            }
          ]
        },
        {
          "levelBracket": "15–20",
          "itemId": 281925,
          "name": "Whelpfire Wand",
          "icon": "inv_wand_11",
          "weaponType": "Wand",
          "speed": "1.90",
          "dps": "15.26 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Snarlflare in Redridge Mountains. High single-shot top-end damage for wand weaving."
          },
          "faction": "both",
          "quality": "q2",
          "iLvl": 20,
          "reqLevel": 15,
          "stats": "Fire Damage (24–45)",
          "alts": [
            {
              "name": "Snapped Branch Wand",
              "itemId": 284574,
              "value": "21.18 DPS, 1.70s - Level 22 World Drop",
              "faction": "both",
              "dps": "21.18 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "+3 Nature Resistance",
              "icon": "inv_staff_02"
            },
            {
              "name": "Greater Magic Wand",
              "itemId": 11288,
              "value": "17.5 DPS, 1.30s - Continue using if unavailable",
              "faction": "both",
              "dps": "17.5 DPS",
              "speed": "1.80",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 23,
              "reqLevel": 13,
              "stats": "",
              "icon": "inv_staff_02"
            }
          ]
        },
        {
          "levelBracket": "21–25",
          "itemId": 279847,
          "name": "Unstable Power Core",
          "icon": "inv_wand_02",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "29.71 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Source of Power quest reward in City of Dalaran (Horde). Huge 29.7 DPS spike."
          },
          "faction": "horde",
          "quality": "q3",
          "iLvl": 36,
          "reqLevel": 24,
          "stats": "Arcane Damage (40–74)",
          "alts": [
            {
              "name": "Gravestone Scepter",
              "itemId": 7001,
              "weaponType": "Wand",
              "speed": "1.50",
              "dps": "29.0 DPS",
              "value": "29.0 DPS, 1.50s (+6 Shadow SP) - BFD: Blackfathom Villainy",
              "faction": "both",
              "quality": "q3",
              "iLvl": 29,
              "reqLevel": 24,
              "stats": "+3 Spirit, Equip: Increases damage done by Shadow spells and effects by up to 6.",
              "lines": [
                "Binds when picked up",
                "Ranged\tWand",
                "30 - 57 Shadow Damage\tSpeed 1.50",
                "(29.0 damage per second)",
                "+3 Spirit",
                "Equip: Increases damage done by Shadow spells and effects by up to 6.",
                "Requires Level 24"
              ],
              "icon": "inv_wand_02",
              "source": {
                "kind": "quest",
                "title": "Blackfathom Villainy",
                "detail": "Blackfathom Deeps quest reward. The premier leveling wand for casters level 24-35."
              }
            },
            {
              "name": "Lesser Mystic Wand",
              "itemId": 11289,
              "value": "23.2 DPS, 1.40s - Crafted by Enchanters (Skill 155)",
              "faction": "both",
              "dps": "25.4 DPS",
              "speed": "1.30",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 31,
              "reqLevel": 26,
              "stats": "",
              "icon": "inv_wand_02"
            },
            {
              "name": "Wand of Mana Concentration",
              "itemId": 273043,
              "value": "31.18 DPS, 1.70s - Arcanic Enigma in City of Dalaran",
              "faction": "both",
              "dps": "31.18 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q3",
              "iLvl": 32,
              "reqLevel": 27,
              "stats": "+4 Intellect",
              "icon": "inv_wand_06"
            },
            {
              "name": "Snapped Branch Wand",
              "itemId": 284574,
              "value": "21.18 DPS, 1.70s - Level 22 World Drop",
              "faction": "both",
              "dps": "21.18 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 27,
              "reqLevel": 22,
              "stats": "+3 Nature Resistance",
              "icon": "inv_staff_02"
            }
          ]
        },
        {
          "levelBracket": "26–30",
          "itemId": 273043,
          "name": "Wand of Mana Concentration",
          "icon": "inv_wand_06",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "31.18 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Arcanic Enigma in City of Dalaran. Premier level 27 caster wand with bonus spell power."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 32,
          "reqLevel": 27,
          "stats": "Arcane Damage (42–78), +3 Int, +5 Spell Power",
          "alts": [
            {
              "name": "Master Hunter's Wand",
              "itemId": 270084,
              "value": "34.67 DPS, 1.50s - Big Game Hunter quest in STV",
              "faction": "both",
              "dps": "34.67 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 43,
              "reqLevel": 28,
              "stats": "",
              "icon": "inv_wand_07"
            },
            {
              "name": "Greater Mystic Wand",
              "itemId": 217287,
              "value": "29.0 DPS, 2.00s - Crafted by Enchanters (Skill 175)",
              "faction": "both",
              "dps": "29.00 DPS",
              "speed": "2.00",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 35,
              "reqLevel": 30,
              "stats": "",
              "icon": "inv_wand_07"
            }
          ]
        },
        {
          "levelBracket": "31–36",
          "itemId": 270084,
          "name": "Master Hunter's Wand",
          "icon": "inv_wand_07",
          "weaponType": "Wand",
          "speed": "1.50",
          "dps": "34.67 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Big Game Hunter quest reward in Stranglethorn Vale. Exceptional 34.7 DPS at level 28+."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 43,
          "reqLevel": 28,
          "stats": "Nature Damage (44–82)",
          "alts": [
            {
              "name": "Greater Mystic Wand",
              "itemId": 217287,
              "value": "29.0 DPS, 2.00s - Enchanter crafted (Req lvl 30)",
              "faction": "both",
              "dps": "29.00 DPS",
              "speed": "2.00",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 35,
              "reqLevel": 30,
              "stats": "",
              "icon": "inv_wand_07"
            },
            {
              "name": "Twisted Nether Wand",
              "itemId": 249144,
              "value": "34.0 DPS, 1.50s - Crafted by Enchanters (Req lvl 37)",
              "faction": "both",
              "dps": "34.00 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 42,
              "reqLevel": 37,
              "stats": "",
              "icon": "inv_wand_03"
            }
          ]
        },
        {
          "levelBracket": "37–42",
          "itemId": 274425,
          "name": "White Obsidian Wand",
          "icon": "inv_wand_07",
          "weaponType": "Wand",
          "speed": "1.70",
          "dps": "41.47 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Level 39 Rare Dungeon Drop. Crushing 41.5 DPS wanding output."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 44,
          "reqLevel": 39,
          "stats": "Shadow Damage (55–102)",
          "alts": [
            {
              "name": "Dudd's Second-Favorite Wand",
              "itemId": 277256,
              "value": "35.67 DPS, 1.50s - Partial Mystical Notes quest",
              "faction": "both",
              "dps": "35.67 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 45,
              "reqLevel": 40,
              "stats": "+5 Intellect",
              "icon": "inv_wand_01"
            },
            {
              "name": "Twisted Nether Wand",
              "itemId": 249144,
              "value": "34.0 DPS, 1.50s - Crafted by Enchanters (Req lvl 37)",
              "faction": "both",
              "dps": "34.00 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 42,
              "reqLevel": 37,
              "stats": "",
              "icon": "inv_wand_03"
            }
          ]
        },
        {
          "levelBracket": "43–48",
          "itemId": 274655,
          "name": "Peacekeeper Wand",
          "icon": "inv_wand_14",
          "weaponType": "Wand",
          "speed": "1.90",
          "dps": "45.53 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Level 43 Rare Dungeon Drop. Invaluable mana-free damage while grinding mid-40s."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 48,
          "reqLevel": 43,
          "stats": "Arcane Damage (68–125)",
          "alts": [
            {
              "name": "Dreambough Wand",
              "itemId": 249234,
              "value": "39.17 DPS, 1.80s - Crafted by Enchanters (Skill 225)",
              "faction": "both",
              "dps": "39.17 DPS",
              "speed": "1.80",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 48,
              "reqLevel": 43,
              "stats": "",
              "icon": "inv_wand_04"
            },
            {
              "name": "Lesser Eternal Wand",
              "itemId": 249232,
              "value": "45.75 DPS, 2.00s - Crafted by Enchanters (Req lvl 49)",
              "faction": "both",
              "dps": "45.75 DPS",
              "speed": "2.00",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 54,
              "reqLevel": 49,
              "stats": "",
              "icon": "inv_wand_05"
            }
          ]
        },
        {
          "levelBracket": "49–54",
          "itemId": 249232,
          "name": "Lesser Eternal Wand",
          "icon": "inv_wand_05",
          "weaponType": "Wand",
          "speed": "2.00",
          "dps": "45.75 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Crafted by Enchanters (Skill 260). High consistency, easily acquired pre-raid."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 54,
          "reqLevel": 49,
          "stats": "Arcane Damage (73–137)",
          "alts": [
            {
              "name": "Wail of Death",
              "itemId": 281600,
              "value": "54.17 DPS, 1.80s - Rare World Drop (Req lvl 56)",
              "faction": "both",
              "dps": "54.17 DPS",
              "speed": "1.80",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 61,
              "reqLevel": 56,
              "stats": "+6 Stamina, +4 Spirit",
              "icon": "inv_wand_12"
            }
          ]
        },
        {
          "levelBracket": "55–60",
          "itemId": 281600,
          "name": "Wail of Death",
          "icon": "inv_wand_12",
          "weaponType": "Wand",
          "speed": "1.80",
          "dps": "54.17 DPS",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Level 56 Rare Wand. Outstanding finisher wand before entering Level 60 raid content."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 61,
          "reqLevel": 56,
          "stats": "Shadow Damage (85–159)",
          "alts": [
            {
              "name": "Brilliant Wand",
              "itemId": 249385,
              "value": "59.58 DPS, 1.20s - Fast high-DPS wand",
              "faction": "both",
              "dps": "59.58 DPS",
              "speed": "1.20",
              "weaponType": "Wand",
              "quality": "q3",
              "iLvl": 60,
              "reqLevel": 55,
              "stats": "+7 Intellect",
              "icon": "inv_wand_07"
            },
            {
              "name": "Greater Eternal Wand",
              "itemId": 249237,
              "value": "53.33 DPS, 1.50s - Crafted by Enchanters (Skill 285)",
              "faction": "both",
              "dps": "53.33 DPS",
              "speed": "1.50",
              "weaponType": "Wand",
              "quality": "q2",
              "iLvl": 60,
              "reqLevel": 55,
              "stats": "",
              "icon": "inv_wand_14"
            },
            {
              "name": "Torch of Light",
              "itemId": 279246,
              "value": "76.76 DPS, 1.70s - Best-in-Slot Level 60 Wand",
              "faction": "both",
              "dps": "76.76 DPS",
              "speed": "1.70",
              "weaponType": "Wand",
              "quality": "q4",
              "iLvl": 65,
              "reqLevel": 60,
              "stats": "+11 Spirit",
              "icon": "inv_torch_lit"
            },
            {
              "name": "Bonecreeper Stylus",
              "itemId": 13938,
              "quality": "q3",
              "iLvl": 62,
              "reqLevel": 57,
              "speed": "1.30",
              "dps": "63.5 DPS",
              "stats": "+4 Intellect, +11 Spell Power",
              "icon": "inv_wand_05",
              "value": "Scholomance — Darkmaster Gandling"
            }
          ]
        }
      ]
    }
  },
  "offhands": {
    "mage": {
      "role": "Caster",
      "levels": [
        {
          "levelBracket": "1–9",
          "itemId": 287090,
          "name": "Letter Opener",
          "icon": "inv_weapon_shortblade_20",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Basic starter off-hand item for early stat-stick pairing."
          },
          "faction": "both",
          "quality": "q1",
          "iLvl": 17,
          "reqLevel": 2,
          "stats": "Starter Off-hand",
          "alts": []
        },
        {
          "levelBracket": "10–16",
          "itemId": 279898,
          "name": "Dwarven Tome",
          "icon": "inv_misc_book_07",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Important Heirlooms quest reward in Loch Modan (Alliance). First true caster spell power off-hand."
          },
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 17,
          "reqLevel": 10,
          "stats": "+1 Spirit, +3 Spell Power & Healing",
          "alts": [
            {
              "name": "Tear of Grief",
              "itemId": 5611,
              "value": "+3 Stamina, +2 Intellect - Horde Quest",
              "faction": "horde",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 16,
              "reqLevel": 11,
              "stats": "",
              "icon": "inv_jewelry_talisman_08"
            },
            {
              "name": "Disciple's Stein",
              "itemId": 15932,
              "value": "+2 Intellect, +1 Spirit - Level 7 Drop",
              "faction": "both",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "",
              "icon": "inv_drink_04"
            }
          ]
        },
        {
          "levelBracket": "17–20",
          "itemId": 273137,
          "name": "Skum's Bucket",
          "icon": "inv_misc_1h_bucket_c_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Skum in Wailing Caverns. Superb mana pool booster for low-level dungeons."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 22,
          "reqLevel": 17,
          "stats": "+5 Intellect, +3 Stamina",
          "alts": [
            {
              "name": "Expended Apothecary Vial",
              "itemId": 281294,
              "value": "+4 Intellect, +3 Stamina - Valuable Vantages quest",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q2",
              "iLvl": 25,
              "reqLevel": 19,
              "stats": "+3 Intellect, +3 Spirit",
              "icon": "inv_potion_12"
            },
            {
              "name": "Mathystra Channeling Orb",
              "itemId": 281291,
              "value": "+4 Intellect, +3 Spirit - Baron Marinous",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 21,
              "reqLevel": 17,
              "stats": "+3 Stamina, +5 Intellect",
              "icon": "inv_misc_orb_01"
            },
            {
              "name": "Defective Samophlange",
              "itemId": 274743,
              "value": "+4 Stamina, +3 Intellect - Winklespark in Barrens",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+5 Intellect, +5 Spirit",
              "icon": "inv_gizmo_06"
            }
          ]
        },
        {
          "levelBracket": "21–25",
          "itemId": 281306,
          "name": "Flamescarred Spellbook",
          "icon": "inv_misc_book_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Old Habits quest reward (Alliance). Excellent balanced mana recovery off-hand."
          },
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 31,
          "reqLevel": 23,
          "stats": "+5 Intellect, +5 Spirit",
          "alts": [
            {
              "name": "Alliance Outrunner Healing Rod",
              "itemId": 285348,
              "value": "+6 Healing, +3 Stamina - Hannah Bladeleaf",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 26,
              "reqLevel": 21,
              "stats": "",
              "icon": "inv_wand_04"
            },
            {
              "name": "Orb of Mystic Insight",
              "itemId": 249394,
              "value": "+7 Intellect, +5 Spirit - Crafted / Enchanting",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 30,
              "reqLevel": 25,
              "stats": "+6 Intellect",
              "icon": "inv_misc_orb_blue"
            },
            {
              "name": "Orb of Souls",
              "itemId": 249395,
              "value": "+8 Shadow Spell Power, +6 Stamina - Crafted / Enchanting",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 30,
              "reqLevel": 25,
              "stats": "+6 Spirit",
              "icon": "inv_misc_orb_04"
            }
          ]
        },
        {
          "levelBracket": "26–29",
          "itemId": 273027,
          "name": "Raptor's Gaze",
          "icon": "inv_misc_orb_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Shadetooth in Excavation Site: Wetlands. Invaluable dungeon spell power off-hand."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 31,
          "reqLevel": 26,
          "stats": "+4 Stamina, +4 Intellect, +8 Spell Power",
          "alts": [
            {
              "name": "Arcane Infused Rod",
              "itemId": 279838,
              "value": "+6 Intellect, +5 Stamina - Starving Arcane quest",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q2",
              "iLvl": 36,
              "reqLevel": 24,
              "stats": "",
              "icon": "inv_wand_04"
            },
            {
              "name": "Insurgent's Manifesto",
              "itemId": 271935,
              "value": "+8 Stamina, +4 Intellect, +8 Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+8 Stamina, +4 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Tome of the Darkspear Prophecy",
              "itemId": 272090,
              "value": "+8 Stamina, +4 Intellect, +8 Spell Power - Creeg Bothunk",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+8 Stamina, +4 Intellect",
              "icon": "inv_misc_book_06"
            }
          ]
        },
        {
          "levelBracket": "30–34",
          "itemId": 273052,
          "name": "Ponderous Orb",
          "icon": "inv_misc_orb_04",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Shade of the Archmage in City of Dalaran. Premier caster off-hand throughout the 30s."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 35,
          "reqLevel": 30,
          "stats": "+8 Intellect, +6 Spirit, +11 Spell Power",
          "alts": [
            {
              "name": "Salve and Salvation",
              "itemId": 276898,
              "value": "+9 Spirit, +50 Armor - Past Due quest",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 38,
              "reqLevel": 30,
              "stats": "+9 Spirit, +50 Armor",
              "icon": "inv_misc_book_01"
            },
            {
              "name": "Heart of Alterac",
              "itemId": 283254,
              "value": "+7 Stamina, +5 Intellect - Stone Fury in Alterac",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q2",
              "iLvl": 39,
              "reqLevel": 34,
              "stats": "+7 Stamina, +5 Intellect",
              "icon": "inv_misc_orb_05"
            }
          ]
        },
        {
          "levelBracket": "35–39",
          "itemId": 271805,
          "name": "Thrice-Damned Effigy",
          "icon": "inv_misc_orb_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Khan Jehn in Maraudon (Horde). Elite caster off-hand for mid-level leveling."
          },
          "faction": "horde",
          "quality": "q3",
          "iLvl": 42,
          "reqLevel": 35,
          "stats": "+4 Intellect, +7 Spirit, +2 Stamina, +10 Spell Power",
          "alts": [
            {
              "name": "Insurgent's Manifesto",
              "itemId": 271935,
              "value": "+12 Stamina, +5 Intellect, +12 Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 43,
              "reqLevel": 38,
              "stats": "+12 Stamina, +5 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Tome of the Darkspear Prophecy",
              "itemId": 272090,
              "value": "+12 Stamina, +5 Intellect, +12 Spell Power",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 43,
              "reqLevel": 38,
              "stats": "+12 Stamina, +5 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Orb of the Forgotten Seer",
              "itemId": 7685,
              "value": "+12 Intellect, +5 Spirit - Scarlet Monastery Library",
              "faction": "both",
              "weaponType": "Weapon",
              "quality": "q3",
              "iLvl": 37,
              "reqLevel": 32,
              "stats": "",
              "icon": "inv_misc_orb_01"
            }
          ]
        },
        {
          "levelBracket": "40–44",
          "itemId": 277260,
          "name": "Researcher's Night Light",
          "icon": "inv_lantern_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Greater Friend of the Library quest reward. Heavy durability and spell power boost."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 45,
          "reqLevel": 40,
          "stats": "+12 Stamina, +12 Spell Power",
          "alts": [
            {
              "name": "Fermented Restoration Potion",
              "itemId": 277259,
              "value": "+12 Stamina, +5 Spirit, +16 Healing",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 45,
              "reqLevel": 40,
              "stats": "+12 Stamina, +5 Spirit",
              "icon": "inv_potion_19"
            },
            {
              "name": "Spirit of Aquementas",
              "itemId": 11904,
              "value": "+20 Spell Power - Un'Goro Crater quest chain",
              "faction": "both",
              "weaponType": "Weapon",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 47,
              "stats": "",
              "icon": "inv_wand_05"
            }
          ]
        },
        {
          "levelBracket": "45–52",
          "itemId": 249455,
          "name": "Truesilver Conduit",
          "icon": "inv_misc_orb_blue",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Crafted by Enchanters / Tradeskills. Reliable high spell power off-hand leading into late game."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 50,
          "reqLevel": 45,
          "stats": "+8 Stamina, +8 Intellect, +14 Spell Power",
          "alts": [
            {
              "name": "Twisting Essence Jar",
              "itemId": 249456,
              "value": "+8 Stamina, +8 Spirit, +18 Healing",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 50,
              "reqLevel": 45,
              "stats": "+8 Stamina, +8 Spirit",
              "icon": "inv_10_misc_dragonorb_color1"
            },
            {
              "name": "Insurgent's Manifesto",
              "itemId": 271935,
              "value": "+14 Stamina, +6 Intellect, +14 Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 53,
              "reqLevel": 48,
              "stats": "+14 Stamina, +6 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Heart of Smoldar",
              "itemId": 282088,
              "value": "+8 Stamina, +14 Fire Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q2",
              "iLvl": 52,
              "reqLevel": 47,
              "stats": "+8 Stamina",
              "icon": "inv_misc_orb_05"
            }
          ]
        },
        {
          "levelBracket": "53–60",
          "itemId": 274417,
          "name": "Barkskin Baubles",
          "icon": "inv_misc_bag_10_black",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Dala Fairmaw. Outstanding survivability and caster throughput for level 53-60."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 58,
          "reqLevel": 53,
          "stats": "+10 Stamina, +10 Spirit, +18 Healing / Spell Power",
          "alts": [
            {
              "name": "Insurgent's Manifesto",
              "itemId": 271935,
              "value": "+17 Stamina, +7 Intellect, +16 Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 63,
              "reqLevel": 58,
              "stats": "+17 Stamina, +7 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Tome of the Darkspear Prophecy",
              "itemId": 272090,
              "value": "+17 Stamina, +7 Intellect, +16 Spell Power",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 63,
              "reqLevel": 58,
              "stats": "+17 Stamina, +7 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "High Warlord's Tome of Destruction",
              "itemId": 234563,
              "value": "+24 Stamina, +13 Intellect, +23 Spell Power",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q4",
              "iLvl": 80,
              "reqLevel": 60,
              "stats": "+24 Stamina, +13 Intellect",
              "icon": "inv_misc_book_15"
            },
            {
              "name": "Grand Marshal's Tome of Power",
              "itemId": 234589,
              "value": "+24 Stamina, +13 Intellect, +23 Spell Power",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q4",
              "iLvl": 80,
              "reqLevel": 60,
              "stats": "+24 Stamina, +13 Intellect",
              "icon": "inv_misc_book_12"
            },
            {
              "name": "High Warlord's Tome of Mending",
              "itemId": 234564,
              "value": "+23 Stamina, +14 Intellect, +35 Healing",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q4",
              "iLvl": 80,
              "reqLevel": 60,
              "stats": "+23 Stamina, +14 Intellect",
              "icon": "inv_misc_book_14"
            },
            {
              "name": "Grand Marshal's Tome of Restoration",
              "itemId": 234590,
              "value": "+23 Stamina, +14 Intellect, +35 Healing",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q4",
              "iLvl": 80,
              "reqLevel": 60,
              "stats": "+23 Stamina, +14 Intellect",
              "icon": "inv_misc_book_13"
            }
          ]
        }
      ]
    },
    "priest": {
      "role": "Caster",
      "levels": [
        {
          "levelBracket": "1–9",
          "itemId": 287090,
          "name": "Letter Opener",
          "icon": "inv_weapon_shortblade_20",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Basic starter off-hand item for early stat-stick pairing."
          },
          "faction": "both",
          "quality": "q1",
          "iLvl": 17,
          "reqLevel": 2,
          "stats": "Starter Off-hand",
          "alts": []
        },
        {
          "levelBracket": "10–16",
          "itemId": 279898,
          "name": "Dwarven Tome",
          "icon": "inv_misc_book_07",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Important Heirlooms quest reward in Loch Modan (Alliance). First true caster spell power off-hand."
          },
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 17,
          "reqLevel": 10,
          "stats": "+1 Spirit, +3 Spell Power & Healing",
          "alts": [
            {
              "name": "Tear of Grief",
              "itemId": 5611,
              "value": "+3 Stamina, +2 Intellect - Horde Quest",
              "faction": "horde",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 16,
              "reqLevel": 11,
              "stats": "",
              "icon": "inv_jewelry_talisman_08"
            },
            {
              "name": "Disciple's Stein",
              "itemId": 15932,
              "value": "+2 Intellect, +1 Spirit - Level 7 Drop",
              "faction": "both",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "",
              "icon": "inv_drink_04"
            }
          ]
        },
        {
          "levelBracket": "17–20",
          "itemId": 273137,
          "name": "Skum's Bucket",
          "icon": "inv_misc_1h_bucket_c_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Skum in Wailing Caverns. Superb mana pool booster for low-level dungeons."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 22,
          "reqLevel": 17,
          "stats": "+5 Intellect, +3 Stamina",
          "alts": [
            {
              "name": "Expended Apothecary Vial",
              "itemId": 281294,
              "value": "+4 Intellect, +3 Stamina - Valuable Vantages quest",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q2",
              "iLvl": 25,
              "reqLevel": 19,
              "stats": "+3 Intellect, +3 Spirit",
              "icon": "inv_potion_12"
            },
            {
              "name": "Mathystra Channeling Orb",
              "itemId": 281291,
              "value": "+4 Intellect, +3 Spirit - Baron Marinous",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 21,
              "reqLevel": 17,
              "stats": "+3 Stamina, +5 Intellect",
              "icon": "inv_misc_orb_01"
            },
            {
              "name": "Defective Samophlange",
              "itemId": 274743,
              "value": "+4 Stamina, +3 Intellect - Winklespark in Barrens",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+5 Intellect, +5 Spirit",
              "icon": "inv_gizmo_06"
            }
          ]
        },
        {
          "levelBracket": "21–25",
          "itemId": 281306,
          "name": "Flamescarred Spellbook",
          "icon": "inv_misc_book_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Old Habits quest reward (Alliance). Excellent balanced mana recovery off-hand."
          },
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 31,
          "reqLevel": 23,
          "stats": "+5 Intellect, +5 Spirit",
          "alts": [
            {
              "name": "Alliance Outrunner Healing Rod",
              "itemId": 285348,
              "value": "+6 Healing, +3 Stamina - Hannah Bladeleaf",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 26,
              "reqLevel": 21,
              "stats": "",
              "icon": "inv_wand_04"
            },
            {
              "name": "Orb of Mystic Insight",
              "itemId": 249394,
              "value": "+7 Intellect, +5 Spirit - Crafted / Enchanting",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 30,
              "reqLevel": 25,
              "stats": "+6 Intellect",
              "icon": "inv_misc_orb_blue"
            },
            {
              "name": "Orb of Souls",
              "itemId": 249395,
              "value": "+8 Shadow Spell Power, +6 Stamina - Crafted / Enchanting",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 30,
              "reqLevel": 25,
              "stats": "+6 Spirit",
              "icon": "inv_misc_orb_04"
            }
          ]
        },
        {
          "levelBracket": "26–29",
          "itemId": 273027,
          "name": "Raptor's Gaze",
          "icon": "inv_misc_orb_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Shadetooth in Excavation Site: Wetlands. Invaluable dungeon spell power off-hand."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 31,
          "reqLevel": 26,
          "stats": "+4 Stamina, +4 Intellect, +8 Spell Power",
          "alts": [
            {
              "name": "Arcane Infused Rod",
              "itemId": 279838,
              "value": "+6 Intellect, +5 Stamina - Starving Arcane quest",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q2",
              "iLvl": 36,
              "reqLevel": 24,
              "stats": "",
              "icon": "inv_wand_04"
            },
            {
              "name": "Insurgent's Manifesto",
              "itemId": 271935,
              "value": "+8 Stamina, +4 Intellect, +8 Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+8 Stamina, +4 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Tome of the Darkspear Prophecy",
              "itemId": 272090,
              "value": "+8 Stamina, +4 Intellect, +8 Spell Power - Creeg Bothunk",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+8 Stamina, +4 Intellect",
              "icon": "inv_misc_book_06"
            }
          ]
        },
        {
          "levelBracket": "30–34",
          "itemId": 273052,
          "name": "Ponderous Orb",
          "icon": "inv_misc_orb_04",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Shade of the Archmage in City of Dalaran. Premier caster off-hand throughout the 30s."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 35,
          "reqLevel": 30,
          "stats": "+8 Intellect, +6 Spirit, +11 Spell Power",
          "alts": [
            {
              "name": "Salve and Salvation",
              "itemId": 276898,
              "value": "+9 Spirit, +50 Armor - Past Due quest",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 38,
              "reqLevel": 30,
              "stats": "+9 Spirit, +50 Armor",
              "icon": "inv_misc_book_01"
            },
            {
              "name": "Heart of Alterac",
              "itemId": 283254,
              "value": "+7 Stamina, +5 Intellect - Stone Fury in Alterac",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q2",
              "iLvl": 39,
              "reqLevel": 34,
              "stats": "+7 Stamina, +5 Intellect",
              "icon": "inv_misc_orb_05"
            }
          ]
        },
        {
          "levelBracket": "35–39",
          "itemId": 271805,
          "name": "Thrice-Damned Effigy",
          "icon": "inv_misc_orb_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Khan Jehn in Maraudon (Horde). Elite caster off-hand for mid-level leveling."
          },
          "faction": "horde",
          "quality": "q3",
          "iLvl": 42,
          "reqLevel": 35,
          "stats": "+4 Intellect, +7 Spirit, +2 Stamina, +10 Spell Power",
          "alts": [
            {
              "name": "Insurgent's Manifesto",
              "itemId": 271935,
              "value": "+12 Stamina, +5 Intellect, +12 Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 43,
              "reqLevel": 38,
              "stats": "+12 Stamina, +5 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Tome of the Darkspear Prophecy",
              "itemId": 272090,
              "value": "+12 Stamina, +5 Intellect, +12 Spell Power",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 43,
              "reqLevel": 38,
              "stats": "+12 Stamina, +5 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Orb of the Forgotten Seer",
              "itemId": 7685,
              "value": "+12 Intellect, +5 Spirit - Scarlet Monastery Library",
              "faction": "both",
              "weaponType": "Weapon",
              "quality": "q3",
              "iLvl": 37,
              "reqLevel": 32,
              "stats": "",
              "icon": "inv_misc_orb_01"
            }
          ]
        },
        {
          "levelBracket": "40–44",
          "itemId": 277260,
          "name": "Researcher's Night Light",
          "icon": "inv_lantern_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Greater Friend of the Library quest reward. Heavy durability and spell power boost."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 45,
          "reqLevel": 40,
          "stats": "+12 Stamina, +12 Spell Power",
          "alts": [
            {
              "name": "Fermented Restoration Potion",
              "itemId": 277259,
              "value": "+12 Stamina, +5 Spirit, +16 Healing",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 45,
              "reqLevel": 40,
              "stats": "+12 Stamina, +5 Spirit",
              "icon": "inv_potion_19"
            },
            {
              "name": "Spirit of Aquementas",
              "itemId": 11904,
              "value": "+20 Spell Power - Un'Goro Crater quest chain",
              "faction": "both",
              "weaponType": "Weapon",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 47,
              "stats": "",
              "icon": "inv_wand_05"
            }
          ]
        },
        {
          "levelBracket": "45–52",
          "itemId": 249455,
          "name": "Truesilver Conduit",
          "icon": "inv_misc_orb_blue",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Crafted by Enchanters / Tradeskills. Reliable high spell power off-hand leading into late game."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 50,
          "reqLevel": 45,
          "stats": "+8 Stamina, +8 Intellect, +14 Spell Power",
          "alts": [
            {
              "name": "Twisting Essence Jar",
              "itemId": 249456,
              "value": "+8 Stamina, +8 Spirit, +18 Healing",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 50,
              "reqLevel": 45,
              "stats": "+8 Stamina, +8 Spirit",
              "icon": "inv_10_misc_dragonorb_color1"
            },
            {
              "name": "Insurgent's Manifesto",
              "itemId": 271935,
              "value": "+14 Stamina, +6 Intellect, +14 Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 53,
              "reqLevel": 48,
              "stats": "+14 Stamina, +6 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Heart of Smoldar",
              "itemId": 282088,
              "value": "+8 Stamina, +14 Fire Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q2",
              "iLvl": 52,
              "reqLevel": 47,
              "stats": "+8 Stamina",
              "icon": "inv_misc_orb_05"
            }
          ]
        },
        {
          "levelBracket": "53–60",
          "itemId": 274417,
          "name": "Barkskin Baubles",
          "icon": "inv_misc_bag_10_black",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Dala Fairmaw. Outstanding survivability and caster throughput for level 53-60."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 58,
          "reqLevel": 53,
          "stats": "+10 Stamina, +10 Spirit, +18 Healing / Spell Power",
          "alts": [
            {
              "name": "Insurgent's Manifesto",
              "itemId": 271935,
              "value": "+17 Stamina, +7 Intellect, +16 Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 63,
              "reqLevel": 58,
              "stats": "+17 Stamina, +7 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Tome of the Darkspear Prophecy",
              "itemId": 272090,
              "value": "+17 Stamina, +7 Intellect, +16 Spell Power",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 63,
              "reqLevel": 58,
              "stats": "+17 Stamina, +7 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "High Warlord's Tome of Destruction",
              "itemId": 234563,
              "value": "+24 Stamina, +13 Intellect, +23 Spell Power",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q4",
              "iLvl": 80,
              "reqLevel": 60,
              "stats": "+24 Stamina, +13 Intellect",
              "icon": "inv_misc_book_15"
            },
            {
              "name": "Grand Marshal's Tome of Power",
              "itemId": 234589,
              "value": "+24 Stamina, +13 Intellect, +23 Spell Power",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q4",
              "iLvl": 80,
              "reqLevel": 60,
              "stats": "+24 Stamina, +13 Intellect",
              "icon": "inv_misc_book_12"
            },
            {
              "name": "High Warlord's Tome of Mending",
              "itemId": 234564,
              "value": "+23 Stamina, +14 Intellect, +35 Healing",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q4",
              "iLvl": 80,
              "reqLevel": 60,
              "stats": "+23 Stamina, +14 Intellect",
              "icon": "inv_misc_book_14"
            },
            {
              "name": "Grand Marshal's Tome of Restoration",
              "itemId": 234590,
              "value": "+23 Stamina, +14 Intellect, +35 Healing",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q4",
              "iLvl": 80,
              "reqLevel": 60,
              "stats": "+23 Stamina, +14 Intellect",
              "icon": "inv_misc_book_13"
            }
          ]
        }
      ]
    },
    "warlock": {
      "role": "Caster",
      "levels": [
        {
          "levelBracket": "1–9",
          "itemId": 287090,
          "name": "Letter Opener",
          "icon": "inv_weapon_shortblade_20",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Basic starter off-hand item for early stat-stick pairing."
          },
          "faction": "both",
          "quality": "q1",
          "iLvl": 17,
          "reqLevel": 2,
          "stats": "Starter Off-hand",
          "alts": []
        },
        {
          "levelBracket": "10–16",
          "itemId": 279898,
          "name": "Dwarven Tome",
          "icon": "inv_misc_book_07",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Important Heirlooms quest reward in Loch Modan (Alliance). First true caster spell power off-hand."
          },
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 17,
          "reqLevel": 10,
          "stats": "+1 Spirit, +3 Spell Power & Healing",
          "alts": [
            {
              "name": "Tear of Grief",
              "itemId": 5611,
              "value": "+3 Stamina, +2 Intellect - Horde Quest",
              "faction": "horde",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 16,
              "reqLevel": 11,
              "stats": "",
              "icon": "inv_jewelry_talisman_08"
            },
            {
              "name": "Disciple's Stein",
              "itemId": 15932,
              "value": "+2 Intellect, +1 Spirit - Level 7 Drop",
              "faction": "both",
              "weaponType": "Weapon",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "",
              "icon": "inv_drink_04"
            }
          ]
        },
        {
          "levelBracket": "17–20",
          "itemId": 273137,
          "name": "Skum's Bucket",
          "icon": "inv_misc_1h_bucket_c_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Skum in Wailing Caverns. Superb mana pool booster for low-level dungeons."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 22,
          "reqLevel": 17,
          "stats": "+5 Intellect, +3 Stamina",
          "alts": [
            {
              "name": "Expended Apothecary Vial",
              "itemId": 281294,
              "value": "+4 Intellect, +3 Stamina - Valuable Vantages quest",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q2",
              "iLvl": 25,
              "reqLevel": 19,
              "stats": "+3 Intellect, +3 Spirit",
              "icon": "inv_potion_12"
            },
            {
              "name": "Mathystra Channeling Orb",
              "itemId": 281291,
              "value": "+4 Intellect, +3 Spirit - Baron Marinous",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 21,
              "reqLevel": 17,
              "stats": "+3 Stamina, +5 Intellect",
              "icon": "inv_misc_orb_01"
            },
            {
              "name": "Defective Samophlange",
              "itemId": 274743,
              "value": "+4 Stamina, +3 Intellect - Winklespark in Barrens",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+5 Intellect, +5 Spirit",
              "icon": "inv_gizmo_06"
            }
          ]
        },
        {
          "levelBracket": "21–25",
          "itemId": 281306,
          "name": "Flamescarred Spellbook",
          "icon": "inv_misc_book_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Old Habits quest reward (Alliance). Excellent balanced mana recovery off-hand."
          },
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 31,
          "reqLevel": 23,
          "stats": "+5 Intellect, +5 Spirit",
          "alts": [
            {
              "name": "Alliance Outrunner Healing Rod",
              "itemId": 285348,
              "value": "+6 Healing, +3 Stamina - Hannah Bladeleaf",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 26,
              "reqLevel": 21,
              "stats": "",
              "icon": "inv_wand_04"
            },
            {
              "name": "Orb of Mystic Insight",
              "itemId": 249394,
              "value": "+7 Intellect, +5 Spirit - Crafted / Enchanting",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 30,
              "reqLevel": 25,
              "stats": "+6 Intellect",
              "icon": "inv_misc_orb_blue"
            },
            {
              "name": "Orb of Souls",
              "itemId": 249395,
              "value": "+8 Shadow Spell Power, +6 Stamina - Crafted / Enchanting",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 30,
              "reqLevel": 25,
              "stats": "+6 Spirit",
              "icon": "inv_misc_orb_04"
            }
          ]
        },
        {
          "levelBracket": "26–29",
          "itemId": 273027,
          "name": "Raptor's Gaze",
          "icon": "inv_misc_orb_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Shadetooth in Excavation Site: Wetlands. Invaluable dungeon spell power off-hand."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 31,
          "reqLevel": 26,
          "stats": "+4 Stamina, +4 Intellect, +8 Spell Power",
          "alts": [
            {
              "name": "Arcane Infused Rod",
              "itemId": 279838,
              "value": "+6 Intellect, +5 Stamina - Starving Arcane quest",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q2",
              "iLvl": 36,
              "reqLevel": 24,
              "stats": "",
              "icon": "inv_wand_04"
            },
            {
              "name": "Insurgent's Manifesto",
              "itemId": 271935,
              "value": "+8 Stamina, +4 Intellect, +8 Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+8 Stamina, +4 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Tome of the Darkspear Prophecy",
              "itemId": 272090,
              "value": "+8 Stamina, +4 Intellect, +8 Spell Power - Creeg Bothunk",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+8 Stamina, +4 Intellect",
              "icon": "inv_misc_book_06"
            }
          ]
        },
        {
          "levelBracket": "30–34",
          "itemId": 273052,
          "name": "Ponderous Orb",
          "icon": "inv_misc_orb_04",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Shade of the Archmage in City of Dalaran. Premier caster off-hand throughout the 30s."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 35,
          "reqLevel": 30,
          "stats": "+8 Intellect, +6 Spirit, +11 Spell Power",
          "alts": [
            {
              "name": "Salve and Salvation",
              "itemId": 276898,
              "value": "+9 Spirit, +50 Armor - Past Due quest",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 38,
              "reqLevel": 30,
              "stats": "+9 Spirit, +50 Armor",
              "icon": "inv_misc_book_01"
            },
            {
              "name": "Heart of Alterac",
              "itemId": 283254,
              "value": "+7 Stamina, +5 Intellect - Stone Fury in Alterac",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q2",
              "iLvl": 39,
              "reqLevel": 34,
              "stats": "+7 Stamina, +5 Intellect",
              "icon": "inv_misc_orb_05"
            }
          ]
        },
        {
          "levelBracket": "35–39",
          "itemId": 271805,
          "name": "Thrice-Damned Effigy",
          "icon": "inv_misc_orb_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Khan Jehn in Maraudon (Horde). Elite caster off-hand for mid-level leveling."
          },
          "faction": "horde",
          "quality": "q3",
          "iLvl": 42,
          "reqLevel": 35,
          "stats": "+4 Intellect, +7 Spirit, +2 Stamina, +10 Spell Power",
          "alts": [
            {
              "name": "Insurgent's Manifesto",
              "itemId": 271935,
              "value": "+12 Stamina, +5 Intellect, +12 Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 43,
              "reqLevel": 38,
              "stats": "+12 Stamina, +5 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Tome of the Darkspear Prophecy",
              "itemId": 272090,
              "value": "+12 Stamina, +5 Intellect, +12 Spell Power",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 43,
              "reqLevel": 38,
              "stats": "+12 Stamina, +5 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Orb of the Forgotten Seer",
              "itemId": 7685,
              "value": "+12 Intellect, +5 Spirit - Scarlet Monastery Library",
              "faction": "both",
              "weaponType": "Weapon",
              "quality": "q3",
              "iLvl": 37,
              "reqLevel": 32,
              "stats": "",
              "icon": "inv_misc_orb_01"
            }
          ]
        },
        {
          "levelBracket": "40–44",
          "itemId": 277260,
          "name": "Researcher's Night Light",
          "icon": "inv_lantern_01",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Greater Friend of the Library quest reward. Heavy durability and spell power boost."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 45,
          "reqLevel": 40,
          "stats": "+12 Stamina, +12 Spell Power",
          "alts": [
            {
              "name": "Fermented Restoration Potion",
              "itemId": 277259,
              "value": "+12 Stamina, +5 Spirit, +16 Healing",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 45,
              "reqLevel": 40,
              "stats": "+12 Stamina, +5 Spirit",
              "icon": "inv_potion_19"
            },
            {
              "name": "Spirit of Aquementas",
              "itemId": 11904,
              "value": "+20 Spell Power - Un'Goro Crater quest chain",
              "faction": "both",
              "weaponType": "Weapon",
              "quality": "q3",
              "iLvl": 56,
              "reqLevel": 47,
              "stats": "",
              "icon": "inv_wand_05"
            }
          ]
        },
        {
          "levelBracket": "45–52",
          "itemId": 249455,
          "name": "Truesilver Conduit",
          "icon": "inv_misc_orb_blue",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Crafted by Enchanters / Tradeskills. Reliable high spell power off-hand leading into late game."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 50,
          "reqLevel": 45,
          "stats": "+8 Stamina, +8 Intellect, +14 Spell Power",
          "alts": [
            {
              "name": "Twisting Essence Jar",
              "itemId": 249456,
              "value": "+8 Stamina, +8 Spirit, +18 Healing",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 50,
              "reqLevel": 45,
              "stats": "+8 Stamina, +8 Spirit",
              "icon": "inv_10_misc_dragonorb_color1"
            },
            {
              "name": "Insurgent's Manifesto",
              "itemId": 271935,
              "value": "+14 Stamina, +6 Intellect, +14 Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 53,
              "reqLevel": 48,
              "stats": "+14 Stamina, +6 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Heart of Smoldar",
              "itemId": 282088,
              "value": "+8 Stamina, +14 Fire Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q2",
              "iLvl": 52,
              "reqLevel": 47,
              "stats": "+8 Stamina",
              "icon": "inv_misc_orb_05"
            }
          ]
        },
        {
          "levelBracket": "53–60",
          "itemId": 274417,
          "name": "Barkskin Baubles",
          "icon": "inv_misc_bag_10_black",
          "weaponType": "Held In Off-hand",
          "speed": "2.80",
          "dps": "",
          "source": {
            "kind": "drop",
            "title": "World Drop / Quest",
            "detail": "Dropped by Dala Fairmaw. Outstanding survivability and caster throughput for level 53-60."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 58,
          "reqLevel": 53,
          "stats": "+10 Stamina, +10 Spirit, +18 Healing / Spell Power",
          "alts": [
            {
              "name": "Insurgent's Manifesto",
              "itemId": 271935,
              "value": "+17 Stamina, +7 Intellect, +16 Spell Power",
              "faction": "both",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 63,
              "reqLevel": 58,
              "stats": "+17 Stamina, +7 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "Tome of the Darkspear Prophecy",
              "itemId": 272090,
              "value": "+17 Stamina, +7 Intellect, +16 Spell Power",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q3",
              "iLvl": 63,
              "reqLevel": 58,
              "stats": "+17 Stamina, +7 Intellect",
              "icon": "inv_misc_book_06"
            },
            {
              "name": "High Warlord's Tome of Destruction",
              "itemId": 234563,
              "value": "+24 Stamina, +13 Intellect, +23 Spell Power",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q4",
              "iLvl": 80,
              "reqLevel": 60,
              "stats": "+24 Stamina, +13 Intellect",
              "icon": "inv_misc_book_15"
            },
            {
              "name": "Grand Marshal's Tome of Power",
              "itemId": 234589,
              "value": "+24 Stamina, +13 Intellect, +23 Spell Power",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q4",
              "iLvl": 80,
              "reqLevel": 60,
              "stats": "+24 Stamina, +13 Intellect",
              "icon": "inv_misc_book_12"
            },
            {
              "name": "High Warlord's Tome of Mending",
              "itemId": 234564,
              "value": "+23 Stamina, +14 Intellect, +35 Healing",
              "faction": "horde",
              "weaponType": "Held in Off-hand",
              "quality": "q4",
              "iLvl": 80,
              "reqLevel": 60,
              "stats": "+23 Stamina, +14 Intellect",
              "icon": "inv_misc_book_14"
            },
            {
              "name": "Grand Marshal's Tome of Restoration",
              "itemId": 234590,
              "value": "+23 Stamina, +14 Intellect, +35 Healing",
              "faction": "alliance",
              "weaponType": "Held in Off-hand",
              "quality": "q4",
              "iLvl": 80,
              "reqLevel": 60,
              "stats": "+23 Stamina, +14 Intellect",
              "icon": "inv_misc_book_13"
            }
          ]
        }
      ]
    },
    "druid": {
      "tracks": [
        {
          "id": "primary",
          "name": "Off-Hands & Class Idols"
        }
      ],
      "levels": [
        {
          "levelBracket": "1–10",
          "itemId": 279898,
          "name": "Stoneweaver Orb",
          "icon": "inv_misc_orb_01",
          "weaponType": "Held in Off-Hand",
          "source": {
            "kind": "quest",
            "title": "Early Leveling Quest",
            "detail": "+2 Spirit, +2 Stamina early off-hand."
          },
          "faction": "both",
          "quality": "q2",
          "iLvl": 14,
          "reqLevel": 8,
          "stats": "+2 Spirit, +2 Stamina",
          "alts": []
        },
        {
          "levelBracket": "11–18",
          "itemId": 15974,
          "name": "Pagan Rod",
          "icon": "inv_staff_13",
          "weaponType": "Held In Off-hand",
          "source": {
            "kind": "world",
            "title": "World Drop BoE",
            "detail": "+3 Intellect, +2 Spirit."
          },
          "faction": "both",
          "quality": "q2",
          "iLvl": 16,
          "reqLevel": 11,
          "stats": "+3 Intellect, +2 Spirit",
          "alts": []
        },
        {
          "levelBracket": "19–25",
          "itemId": 281313,
          "name": "Orb of the Forgotten",
          "icon": "inv_misc_orb_03",
          "weaponType": "Held in Off-Hand",
          "source": {
            "kind": "dungeon",
            "title": "Blackfathom Deeps Drop",
            "detail": "+4 Intellect, +5 Spirit."
          },
          "faction": "both",
          "quality": "q2",
          "iLvl": 27,
          "reqLevel": 22,
          "stats": "+4 Intellect, +5 Spirit",
          "alts": []
        },
        {
          "levelBracket": "26–30",
          "itemId": 273827,
          "name": "Omega Orb",
          "icon": "inv_misc_orb_03",
          "weaponType": "Held in Off-Hand",
          "source": {
            "kind": "quest",
            "title": "Compendium of the Fallen (Horde) / RFK Drop",
            "detail": "+5 Intellect, +5 Spirit."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 33,
          "reqLevel": 28,
          "stats": "+5 Intellect, +5 Spirit",
          "alts": [
            {
              "name": "Raptor's Gaze",
              "itemId": 273027,
              "weaponType": "Held in Off-Hand",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+6 Intellect, +3 Stamina",
              "icon": "inv_misc_eye_01",
              "value": "Dungeon Drop"
            }
          ]
        },
        {
          "levelBracket": "31–38",
          "itemId": 6803,
          "name": "Prophetic Cane",
          "icon": "inv_staff_13",
          "weaponType": "Held in Off-Hand",
          "source": {
            "kind": "quest",
            "title": "Scarlet Monastery Quest Reward",
            "detail": "+7 Intellect, +6 Spirit."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 38,
          "reqLevel": 33,
          "stats": "+7 Intellect, +6 Spirit",
          "alts": [
            {
              "name": "Beacon of Hope",
              "itemId": 9393,
              "weaponType": "Held in Off-Hand",
              "quality": "q3",
              "iLvl": 38,
              "reqLevel": 33,
              "stats": "+10 Armor, +5 Stamina, +10 Healing",
              "icon": "inv_misc_lantern_01",
              "value": "World Drop BoE"
            }
          ]
        },
        {
          "levelBracket": "39–46",
          "itemId": 5462,
          "name": "Furbolg Medicine Pouch",
          "icon": "inv_misc_bag_07",
          "weaponType": "Held in Off-Hand",
          "source": {
            "kind": "quest",
            "title": "Timbermaw Hold — Friendly Reputation Quest",
            "detail": "+10 Stamina, Use: Restores 1000 health over 10s (BiS survivability off-hand!)."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 45,
          "reqLevel": 40,
          "stats": "+10 Stamina, Use: Restores 1000 Health over 10 sec",
          "alts": []
        },
        {
          "levelBracket": "47–54",
          "itemId": 11904,
          "name": "Spirit of Aquementas",
          "icon": "inv_misc_book_06",
          "weaponType": "Held in Off-Hand",
          "source": {
            "kind": "quest",
            "title": "Un'Goro Crater — It's Dangerous to Go Alone",
            "detail": "Equip: Increases damage and healing done by magical spells and effects by up to 20."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 52,
          "reqLevel": 47,
          "stats": "Equip: +20 Spell Power & Healing",
          "alts": [
            {
              "name": "Brightly Glowing Stone",
              "itemId": 18523,
              "weaponType": "Held in Off-Hand",
              "quality": "q3",
              "iLvl": 59,
              "reqLevel": 54,
              "stats": "+7 Intellect, +37 Healing Spells",
              "icon": "inv_misc_gem_pearl_04",
              "value": "Dire Maul North — Guard Slip'kik"
            }
          ]
        },
        {
          "levelBracket": "55–60",
          "itemId": 13385,
          "name": "Tome of Knowledge",
          "icon": "inv_misc_book_06",
          "weaponType": "Held in Off-Hand",
          "source": {
            "kind": "dungeon",
            "title": "Stratholme Living / World Drop BoE",
            "detail": "+8 Strength, +8 Agility, +8 Stamina, +8 Intellect, +8 Spirit, +30 Armor. The ultimate hybrid & Feral/Bear off-hand!"
          },
          "faction": "both",
          "quality": "q4",
          "iLvl": 61,
          "reqLevel": 56,
          "stats": "+8 Str, +8 Agi, +8 Sta, +8 Int, +8 Spi, +30 Armor",
          "alts": [
            {
              "name": "Lei of the Lifegiver",
              "itemId": 19312,
              "weaponType": "Held in Off-Hand",
              "quality": "q4",
              "iLvl": 65,
              "reqLevel": 55,
              "stats": "+10 Intellect, +5 Mp5, +33 Healing Spells",
              "icon": "inv_misc_gem_pearl_02",
              "value": "Alterac Valley — Exalted (Vendor)"
            },
            {
              "name": "Jin'do's Bag of Whammies",
              "itemId": 19891,
              "weaponType": "Held in Off-Hand",
              "quality": "q4",
              "iLvl": 66,
              "reqLevel": 60,
              "stats": "+11 Intellect, +18 Spell Power, +1% Spell Hit",
              "icon": "inv_misc_bag_07",
              "value": "Zul'Gurub — Jin'do the Hexxer"
            },
            {
              "name": "Idol of Brutality",
              "itemId": 23198,
              "weaponType": "Idol",
              "quality": "q3",
              "iLvl": 65,
              "reqLevel": 60,
              "stats": "Equip: Reduces the rage cost of Maul and Swipe by 3.",
              "icon": "inv_relics_idolofbrutality",
              "value": "Stratholme — Magistrate Barthilas"
            },
            {
              "name": "Idol of Ferocity",
              "itemId": 22397,
              "weaponType": "Idol",
              "quality": "q3",
              "iLvl": 63,
              "reqLevel": 60,
              "stats": "Equip: Reduces the energy cost of Claw and Rake by 3.",
              "icon": "inv_relics_idolofferocity",
              "value": "Blackrock Depths — Lord Roccor"
            },
            {
              "name": "Idol of the Moon",
              "itemId": 23009,
              "weaponType": "Idol",
              "quality": "q3",
              "iLvl": 65,
              "reqLevel": 60,
              "stats": "Equip: Increases the damage of Moonfire by up to 17%.",
              "icon": "inv_relics_idolofthemoon",
              "value": "Scholomance — Ras Frostwhisper"
            },
            {
              "name": "Idol of Rejuvenation",
              "itemId": 22399,
              "weaponType": "Idol",
              "quality": "q3",
              "iLvl": 63,
              "reqLevel": 60,
              "stats": "Equip: Increases the healing done by Rejuvenation by up to 50.",
              "icon": "inv_relics_idolofrejuvenation",
              "value": "Stratholme — Baroness Anastari"
            }
          ]
        }
      ]
    },
    "shaman": {
      "tracks": [
        {
          "id": "primary",
          "name": "Elemental & Resto Shields"
        }
      ],
      "levels": [
        {
          "levelBracket": "1–9",
          "itemId": 2129,
          "name": "Large Metal Shield",
          "icon": "inv_shield_05",
          "weaponType": "Shield",
          "armor": 136,
          "block": 4,
          "source": {
            "kind": "vendor",
            "title": "Armor & Shield Vendor",
            "detail": "Early starter shield (+136 Armor, 4 Block)."
          },
          "faction": "horde",
          "quality": "q1",
          "iLvl": 8,
          "reqLevel": 3,
          "stats": "136 Armor, 4 Block",
          "alts": [
            {
              "name": "Tainted Wooden Shield",
              "itemId": 2128,
              "weaponType": "Shield",
              "quality": "q1",
              "iLvl": 5,
              "reqLevel": 1,
              "stats": "89 Armor, 3 Block",
              "icon": "inv_shield_04",
              "value": "Starting Zone"
            },
            {
              "name": "Crested Buckler",
              "itemId": 2362,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "+1 Strength, 161 Armor, 5 Block",
              "icon": "inv_shield_08",
              "value": "World Drop"
            }
          ]
        },
        {
          "levelBracket": "10–16",
          "itemId": 13245,
          "name": "Kresh's Back",
          "icon": "inv_shield_02",
          "weaponType": "Shield",
          "armor": 417,
          "block": 10,
          "source": {
            "kind": "dungeon",
            "title": "Wailing Caverns — Kresh",
            "detail": "Turtle shell shield (+417 Armor, 10 Block)."
          },
          "faction": "horde",
          "quality": "q3",
          "iLvl": 20,
          "reqLevel": 15,
          "stats": "417 Armor, 10 Block",
          "alts": [
            {
              "name": "Commander's Crest",
              "itemId": 6320,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+6 Stamina, +3 Strength, 552 Armor, 13 Block",
              "icon": "inv_shield_09",
              "value": "SFK — Commander Springvale"
            },
            {
              "name": "Redbeard Crest",
              "itemId": 12997,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 24,
              "reqLevel": 19,
              "stats": "+4 Stamina, +4 Strength, 495 Armor, 12 Block",
              "icon": "inv_shield_05",
              "value": "World Drop"
            }
          ]
        },
        {
          "levelBracket": "17–20",
          "itemId": 6320,
          "name": "Commander's Crest",
          "icon": "inv_shield_09",
          "weaponType": "Shield",
          "armor": 552,
          "block": 13,
          "source": {
            "kind": "dungeon",
            "title": "Shadowfang Keep — Commander Springvale",
            "detail": "+6 Stamina, +3 Strength, 552 Armor, 13 Block."
          },
          "faction": "horde",
          "quality": "q3",
          "iLvl": 25,
          "reqLevel": 20,
          "stats": "+6 Stamina, +3 Strength, 552 Armor, 13 Block",
          "alts": [
            {
              "name": "Redbeard Crest",
              "itemId": 12997,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 24,
              "reqLevel": 19,
              "stats": "+4 Stamina, +4 Strength, 495 Armor, 12 Block",
              "icon": "inv_shield_05",
              "value": "World Drop"
            }
          ]
        },
        {
          "levelBracket": "21–25",
          "itemId": 7748,
          "name": "Forcestone Buckler",
          "icon": "inv_shield_05",
          "weaponType": "Shield",
          "armor": 686,
          "block": 17,
          "source": {
            "kind": "quest",
            "title": "World Drop / Quest",
            "detail": "+6 Stamina, +6 Spirit, 686 Armor, 17 Block."
          },
          "faction": "horde",
          "quality": "q3",
          "iLvl": 29,
          "reqLevel": 24,
          "stats": "+6 Stamina, +6 Spirit, 686 Armor, 17 Block",
          "alts": [
            {
              "name": "Marbled Buckler",
              "itemId": 4833,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 29,
              "reqLevel": 24,
              "stats": "+4 Stamina, +4 Strength, 614 Armor, 15 Block",
              "icon": "inv_shield_04",
              "value": "World Drop"
            }
          ]
        },
        {
          "levelBracket": "26–30",
          "itemId": 4834,
          "name": "Basalt Buckler",
          "icon": "inv_shield_06",
          "weaponType": "Shield",
          "armor": 733,
          "block": 18,
          "source": {
            "kind": "world",
            "title": "World Drop BoE",
            "detail": "+5 Strength, +5 Stamina, 733 Armor, 18 Block."
          },
          "faction": "horde",
          "quality": "q2",
          "iLvl": 31,
          "reqLevel": 26,
          "stats": "+5 Strength, +5 Stamina, 733 Armor, 18 Block",
          "alts": [
            {
              "name": "Vile Protector",
              "itemId": 271220,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+7 Stamina, +4 Strength, 804 Armor, 20 Block",
              "icon": "inv_shield_10",
              "value": "Dungeon Drop"
            }
          ]
        },
        {
          "levelBracket": "31–39",
          "itemId": 7726,
          "name": "Aegis of the Scarlet Commander",
          "icon": "inv_shield_07",
          "weaponType": "Shield",
          "armor": 1548,
          "block": 29,
          "source": {
            "kind": "dungeon",
            "title": "Scarlet Monastery Cathedral — Scarlet Commander Mograine",
            "detail": "Top tier leveling shield (+7 Strength, +8 Stamina, 1548 Armor, 29 Block)."
          },
          "faction": "horde",
          "quality": "q3",
          "iLvl": 44,
          "reqLevel": 39,
          "stats": "+7 Strength, +8 Stamina, 1548 Armor, 29 Block",
          "alts": [
            {
              "name": "Aegis of Battle",
              "itemId": 6724,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 38,
              "reqLevel": 33,
              "stats": "+6 Strength, +6 Stamina, 968 Armor, 24 Block",
              "icon": "inv_shield_04",
              "value": "World Drop"
            }
          ]
        },
        {
          "levelBracket": "40–50",
          "itemId": 17718,
          "name": "Gizlock's Hypertech Buckler",
          "icon": "inv_shield_13",
          "weaponType": "Shield",
          "armor": 1823,
          "block": 33,
          "source": {
            "kind": "dungeon",
            "title": "Maraudon — Tinkerer Gizlock",
            "detail": "Top tier caster/healer shield (+7 Stamina, +8 Intellect, +11 Block Value, 1823 Armor, 33 Block)."
          },
          "faction": "horde",
          "quality": "q3",
          "iLvl": 52,
          "reqLevel": 47,
          "stats": "+7 Stamina, +8 Intellect, +11 Block Value, 1823 Armor, 33 Block",
          "alts": [
            {
              "name": "Wall of the Dead",
              "itemId": 1169,
              "weaponType": "Shield",
              "quality": "q4",
              "iLvl": 50,
              "reqLevel": 45,
              "stats": "+10 Stamina, +10 Armor, 1923 Armor, 35 Block",
              "icon": "inv_shield_05",
              "value": "World Drop Epic"
            }
          ]
        },
        {
          "levelBracket": "51–54",
          "itemId": 1168,
          "name": "Skullflame Shield",
          "icon": "inv_shield_01",
          "weaponType": "Shield",
          "armor": 2256,
          "block": 40,
          "source": {
            "kind": "world",
            "title": "World Drop Epic Shield",
            "detail": "Iconic lifesteal AOE shield (+2256 Armor, 40 Block, Life Drain / Flame Strike procs)."
          },
          "faction": "horde",
          "quality": "q4",
          "iLvl": 59,
          "reqLevel": 54,
          "stats": "2256 Armor, 40 Block, Equip: Chance to Drain 35 Life, Chance to deal 35-45 Fire DMG",
          "alts": [
            {
              "name": "Gizlock's Hypertech Buckler",
              "itemId": 17718,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 52,
              "reqLevel": 47,
              "stats": "+7 Stamina, +8 Intellect, 1823 Armor, 33 Block",
              "icon": "inv_shield_13",
              "value": "Maraudon — Tinkerer Gizlock"
            }
          ]
        },
        {
          "levelBracket": "55–60",
          "itemId": 17106,
          "name": "Malistar's Defender",
          "icon": "inv_shield_08",
          "weaponType": "Shield",
          "armor": 2548,
          "block": 44,
          "source": {
            "kind": "raid",
            "title": "Molten Core — Majordomo Executus",
            "detail": "BiS Shaman Shield (+13 Intellect, +9 Stamina, +11 Spell Power, 2548 Armor, 44 Block)."
          },
          "faction": "horde",
          "quality": "q4",
          "iLvl": 66,
          "reqLevel": 60,
          "stats": "+13 Intellect, +9 Stamina, +11 Spell Power, 2548 Armor, 44 Block",
          "alts": [
            {
              "name": "Draconian Deflector",
              "itemId": 12602,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 63,
              "reqLevel": 58,
              "stats": "+10 Defense, 2153 Armor, 40 Block",
              "icon": "inv_shield_11",
              "value": "UBRS — General Drakkisath"
            },
            {
              "name": "The Immovable Object",
              "itemId": 19325,
              "weaponType": "Shield",
              "quality": "q4",
              "iLvl": 65,
              "reqLevel": 60,
              "stats": "+15 Stamina, +27 Block Value, 2468 Armor, 44 Block",
              "icon": "inv_shield_12",
              "value": "Alterac Valley — Exalted (Vendor)"
            }
          ]
        }
      ]
    },
    "paladin": {
      "tracks": [
        {
          "id": "primary",
          "name": "Holy & Prot Shields"
        }
      ],
      "levels": [
        {
          "levelBracket": "1–9",
          "itemId": 2129,
          "name": "Large Metal Shield",
          "icon": "inv_shield_05",
          "weaponType": "Shield",
          "armor": 136,
          "block": 4,
          "source": {
            "kind": "vendor",
            "title": "Armor & Shield Vendor",
            "detail": "Early starter shield (+136 Armor, 4 Block)."
          },
          "faction": "alliance",
          "quality": "q1",
          "iLvl": 8,
          "reqLevel": 3,
          "stats": "136 Armor, 4 Block",
          "alts": [
            {
              "name": "Tainted Wooden Shield",
              "itemId": 2128,
              "weaponType": "Shield",
              "quality": "q1",
              "iLvl": 5,
              "reqLevel": 1,
              "stats": "89 Armor, 3 Block",
              "icon": "inv_shield_04",
              "value": "Starting Zone"
            },
            {
              "name": "Crested Buckler",
              "itemId": 2362,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "+1 Strength, 161 Armor, 5 Block",
              "icon": "inv_shield_08",
              "value": "World Drop"
            }
          ]
        },
        {
          "levelBracket": "10–16",
          "itemId": 13245,
          "name": "Kresh's Back",
          "icon": "inv_shield_02",
          "weaponType": "Shield",
          "armor": 417,
          "block": 10,
          "source": {
            "kind": "dungeon",
            "title": "Wailing Caverns — Kresh",
            "detail": "Turtle shell shield (+417 Armor, 10 Block)."
          },
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 20,
          "reqLevel": 15,
          "stats": "417 Armor, 10 Block",
          "alts": [
            {
              "name": "Commander's Crest",
              "itemId": 6320,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+6 Stamina, +3 Strength, 552 Armor, 13 Block",
              "icon": "inv_shield_09",
              "value": "SFK — Commander Springvale"
            },
            {
              "name": "Redbeard Crest",
              "itemId": 12997,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 24,
              "reqLevel": 19,
              "stats": "+4 Stamina, +4 Strength, 495 Armor, 12 Block",
              "icon": "inv_shield_05",
              "value": "World Drop"
            }
          ]
        },
        {
          "levelBracket": "17–20",
          "itemId": 7002,
          "name": "Arctic Buckler",
          "icon": "inv_shield_05",
          "weaponType": "Shield",
          "armor": 569,
          "block": 14,
          "source": {
            "kind": "quest",
            "title": "Blackfathom Deeps — Researching the Corruption",
            "detail": "Alliance quest shield (+569 Armor, 14 Block, +5 Stamina, +5 Spirit)."
          },
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 26,
          "reqLevel": 19,
          "stats": "+5 Stamina, +5 Spirit, 569 Armor, 14 Block",
          "alts": [
            {
              "name": "Commander's Crest",
              "itemId": 6320,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+6 Stamina, +3 Strength, 552 Armor, 13 Block",
              "icon": "inv_shield_09",
              "value": "SFK — Commander Springvale"
            },
            {
              "name": "Shield of Thorsen",
              "itemId": 13079,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+5 Stamina, +5 Strength, 552 Armor, 13 Block",
              "icon": "inv_shield_07",
              "value": "World Drop BoE"
            }
          ]
        },
        {
          "levelBracket": "21–25",
          "itemId": 7748,
          "name": "Forcestone Buckler",
          "icon": "inv_shield_05",
          "weaponType": "Shield",
          "armor": 686,
          "block": 17,
          "source": {
            "kind": "quest",
            "title": "World Drop / Quest",
            "detail": "+6 Stamina, +6 Spirit, 686 Armor, 17 Block."
          },
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 29,
          "reqLevel": 24,
          "stats": "+6 Stamina, +6 Spirit, 686 Armor, 17 Block",
          "alts": [
            {
              "name": "Marbled Buckler",
              "itemId": 4833,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 29,
              "reqLevel": 24,
              "stats": "+4 Stamina, +4 Strength, 614 Armor, 15 Block",
              "icon": "inv_shield_04",
              "value": "World Drop"
            },
            {
              "name": "Seedcloud Buckler",
              "itemId": 13166,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 29,
              "reqLevel": 24,
              "stats": "+5 Stamina, +3 Strength, 614 Armor, 15 Block",
              "icon": "inv_shield_08",
              "value": "World Drop"
            }
          ]
        },
        {
          "levelBracket": "26–30",
          "itemId": 4834,
          "name": "Basalt Buckler",
          "icon": "inv_shield_06",
          "weaponType": "Shield",
          "armor": 733,
          "block": 18,
          "source": {
            "kind": "world",
            "title": "World Drop BoE",
            "detail": "+5 Strength, +5 Stamina, 733 Armor, 18 Block."
          },
          "faction": "alliance",
          "quality": "q2",
          "iLvl": 31,
          "reqLevel": 26,
          "stats": "+5 Strength, +5 Stamina, 733 Armor, 18 Block",
          "alts": [
            {
              "name": "Vile Protector",
              "itemId": 271220,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+7 Stamina, +4 Strength, 804 Armor, 20 Block",
              "icon": "inv_shield_10",
              "value": "Dungeon Drop"
            },
            {
              "name": "Collection Plate",
              "itemId": 273829,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+6 Strength, +6 Stamina, 804 Armor, 20 Block",
              "icon": "inv_shield_05",
              "value": "Dungeon Drop"
            }
          ]
        },
        {
          "levelBracket": "31–39",
          "itemId": 7726,
          "name": "Aegis of the Scarlet Commander",
          "icon": "inv_shield_07",
          "weaponType": "Shield",
          "armor": 1548,
          "block": 29,
          "source": {
            "kind": "dungeon",
            "title": "Scarlet Monastery Cathedral — Scarlet Commander Mograine",
            "detail": "Top tier leveling shield (+7 Strength, +8 Stamina, 1548 Armor, 29 Block)."
          },
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 44,
          "reqLevel": 39,
          "stats": "+7 Strength, +8 Stamina, 1548 Armor, 29 Block",
          "alts": [
            {
              "name": "Aegis of Battle",
              "itemId": 6724,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 38,
              "reqLevel": 33,
              "stats": "+6 Strength, +6 Stamina, 968 Armor, 24 Block",
              "icon": "inv_shield_04",
              "value": "World Drop"
            }
          ]
        },
        {
          "levelBracket": "40–50",
          "itemId": 17718,
          "name": "Gizlock's Hypertech Buckler",
          "icon": "inv_shield_13",
          "weaponType": "Shield",
          "armor": 1823,
          "block": 33,
          "source": {
            "kind": "dungeon",
            "title": "Maraudon — Tinkerer Gizlock",
            "detail": "+7 Stamina, +8 Intellect, +11 Block Value, 1823 Armor, 33 Block."
          },
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 52,
          "reqLevel": 47,
          "stats": "+7 Stamina, +8 Intellect, +11 Block Value, 1823 Armor, 33 Block",
          "alts": [
            {
              "name": "Wall of the Dead",
              "itemId": 1169,
              "weaponType": "Shield",
              "quality": "q4",
              "iLvl": 50,
              "reqLevel": 45,
              "stats": "+10 Stamina, +10 Armor, 1923 Armor, 35 Block",
              "icon": "inv_shield_05",
              "value": "World Drop Epic"
            }
          ]
        },
        {
          "levelBracket": "51–54",
          "itemId": 1168,
          "name": "Skullflame Shield",
          "icon": "inv_shield_01",
          "weaponType": "Shield",
          "armor": 2256,
          "block": 40,
          "source": {
            "kind": "world",
            "title": "World Drop Epic Shield",
            "detail": "Iconic lifesteal AOE shield (+2256 Armor, 40 Block, Life Drain / Flame Strike procs)."
          },
          "faction": "alliance",
          "quality": "q4",
          "iLvl": 59,
          "reqLevel": 54,
          "stats": "2256 Armor, 40 Block, Equip: Chance to Drain 35 Life, Chance to deal 35-45 Fire DMG",
          "alts": [
            {
              "name": "Gizlock's Hypertech Buckler",
              "itemId": 17718,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 52,
              "reqLevel": 47,
              "stats": "+7 Stamina, +8 Intellect, 1823 Armor, 33 Block",
              "icon": "inv_shield_13",
              "value": "Maraudon — Tinkerer Gizlock"
            }
          ]
        },
        {
          "levelBracket": "55–60",
          "itemId": 12602,
          "name": "Draconian Deflector",
          "icon": "inv_shield_11",
          "weaponType": "Shield",
          "armor": 2153,
          "block": 40,
          "source": {
            "kind": "dungeon",
            "title": "Upper Blackrock Spire — General Drakkisath",
            "detail": "Standard pre-raid tanking shield (+10 Defense, 2153 Armor, 40 Block)."
          },
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 63,
          "reqLevel": 58,
          "stats": "+10 Defense, 2153 Armor, 40 Block",
          "alts": [
            {
              "name": "Malistar's Defender",
              "itemId": 17106,
              "weaponType": "Shield",
              "quality": "q4",
              "iLvl": 66,
              "reqLevel": 60,
              "stats": "+13 Intellect, +9 Stamina, +11 Healing/Spells, 2548 Armor, 44 Block",
              "icon": "inv_shield_08",
              "value": "Molten Core — Majordomo Executus"
            },
            {
              "name": "The Immovable Object",
              "itemId": 19325,
              "weaponType": "Shield",
              "quality": "q4",
              "iLvl": 65,
              "reqLevel": 60,
              "stats": "+15 Stamina, +27 Block Value, 2468 Armor, 44 Block",
              "icon": "inv_shield_12",
              "value": "Alterac Valley — Exalted (Vendor)"
            }
          ]
        }
      ]
    },
    "warrior": {
      "tracks": [
        {
          "id": "primary",
          "name": "Shield Progression"
        }
      ],
      "levels": [
        {
          "levelBracket": "1–9",
          "itemId": 2129,
          "name": "Large Metal Shield",
          "icon": "inv_shield_05",
          "weaponType": "Shield",
          "armor": 136,
          "block": 4,
          "source": {
            "kind": "vendor",
            "title": "Armor & Shield Vendor",
            "detail": "Early starter shield (+136 Armor, 4 Block)."
          },
          "faction": "both",
          "quality": "q1",
          "iLvl": 8,
          "reqLevel": 3,
          "stats": "136 Armor, 4 Block",
          "alts": [
            {
              "name": "Tainted Wooden Shield",
              "itemId": 2128,
              "weaponType": "Shield",
              "quality": "q1",
              "iLvl": 5,
              "reqLevel": 1,
              "stats": "89 Armor, 3 Block",
              "icon": "inv_shield_04",
              "value": "89 Armor, 3 Block - Starting Zone"
            },
            {
              "name": "Crested Buckler",
              "itemId": 2362,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 12,
              "reqLevel": 7,
              "stats": "+1 Strength, 161 Armor, 5 Block",
              "icon": "inv_shield_08",
              "value": "+1 Strength, 161 Armor - World Drop"
            }
          ]
        },
        {
          "levelBracket": "10–16",
          "itemId": 13245,
          "name": "Kresh's Back",
          "icon": "inv_shield_02",
          "weaponType": "Shield",
          "armor": 417,
          "block": 10,
          "source": {
            "kind": "dungeon",
            "title": "Wailing Caverns — Kresh",
            "detail": "Iconic turtle shell shield (+417 Armor, 10 Block)."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 20,
          "reqLevel": 15,
          "stats": "417 Armor, 10 Block",
          "alts": [
            {
              "name": "Commander's Crest",
              "itemId": 6320,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+6 Stamina, +3 Strength, 552 Armor, 13 Block",
              "icon": "inv_shield_09",
              "value": "Shadowfang Keep — Commander Springvale"
            },
            {
              "name": "Redbeard Crest",
              "itemId": 12997,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 24,
              "reqLevel": 19,
              "stats": "+4 Stamina, +4 Strength, 495 Armor, 12 Block",
              "icon": "inv_shield_05",
              "value": "World Drop"
            }
          ]
        },
        {
          "levelBracket": "17–20",
          "itemId": 7002,
          "name": "Arctic Buckler",
          "icon": "inv_shield_05",
          "weaponType": "Shield",
          "armor": 569,
          "block": 14,
          "source": {
            "kind": "quest",
            "title": "Blackfathom Deeps — Researching the Corruption",
            "detail": "Alliance quest shield (+569 Armor, 14 Block, +5 Stamina, +5 Spirit)."
          },
          "faction": "alliance",
          "quality": "q3",
          "iLvl": 26,
          "reqLevel": 19,
          "stats": "+5 Stamina, +5 Spirit, 569 Armor, 14 Block",
          "alts": [
            {
              "name": "Commander's Crest",
              "itemId": 6320,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+6 Stamina, +3 Strength, 552 Armor, 13 Block",
              "icon": "inv_shield_09",
              "value": "SFK — Commander Springvale"
            },
            {
              "name": "Shield of Thorsen",
              "itemId": 13079,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 25,
              "reqLevel": 20,
              "stats": "+5 Stamina, +5 Strength, 552 Armor, 13 Block",
              "icon": "inv_shield_07",
              "value": "World Drop BoE"
            }
          ]
        },
        {
          "levelBracket": "21–25",
          "itemId": 7748,
          "name": "Forcestone Buckler",
          "icon": "inv_shield_05",
          "weaponType": "Shield",
          "armor": 686,
          "block": 17,
          "source": {
            "kind": "quest",
            "title": "Uldaman Quest Preparation / World Drop",
            "detail": "+6 Stamina, +6 Spirit, 686 Armor, 17 Block."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 29,
          "reqLevel": 24,
          "stats": "+6 Stamina, +6 Spirit, 686 Armor, 17 Block",
          "alts": [
            {
              "name": "Marbled Buckler",
              "itemId": 4833,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 29,
              "reqLevel": 24,
              "stats": "+4 Stamina, +4 Strength, 614 Armor, 15 Block",
              "icon": "inv_shield_04",
              "value": "World Drop"
            },
            {
              "name": "Seedcloud Buckler",
              "itemId": 13166,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 29,
              "reqLevel": 24,
              "stats": "+5 Stamina, +3 Strength, 614 Armor, 15 Block",
              "icon": "inv_shield_08",
              "value": "World Drop"
            }
          ]
        },
        {
          "levelBracket": "26–30",
          "itemId": 4834,
          "name": "Basalt Buckler",
          "icon": "inv_shield_06",
          "weaponType": "Shield",
          "armor": 733,
          "block": 18,
          "source": {
            "kind": "world",
            "title": "World Drop BoE",
            "detail": "+5 Strength, +5 Stamina, 733 Armor, 18 Block."
          },
          "faction": "both",
          "quality": "q2",
          "iLvl": 31,
          "reqLevel": 26,
          "stats": "+5 Strength, +5 Stamina, 733 Armor, 18 Block",
          "alts": [
            {
              "name": "Vile Protector",
              "itemId": 271220,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+7 Stamina, +4 Strength, 804 Armor, 20 Block",
              "icon": "inv_shield_10",
              "value": "Dungeon Drop"
            },
            {
              "name": "Collection Plate",
              "itemId": 273829,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 33,
              "reqLevel": 28,
              "stats": "+6 Strength, +6 Stamina, 804 Armor, 20 Block",
              "icon": "inv_shield_05",
              "value": "Dungeon Drop"
            }
          ]
        },
        {
          "levelBracket": "31–39",
          "itemId": 7726,
          "name": "Aegis of the Scarlet Commander",
          "icon": "inv_shield_07",
          "weaponType": "Shield",
          "armor": 1548,
          "block": 29,
          "source": {
            "kind": "dungeon",
            "title": "Scarlet Monastery Cathedral — Scarlet Commander Mograine",
            "detail": "Top tier leveling shield (+7 Strength, +8 Stamina, 1548 Armor, 29 Block)."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 44,
          "reqLevel": 39,
          "stats": "+7 Strength, +8 Stamina, 1548 Armor, 29 Block",
          "alts": [
            {
              "name": "Aegis of Battle",
              "itemId": 6724,
              "weaponType": "Shield",
              "quality": "q2",
              "iLvl": 38,
              "reqLevel": 33,
              "stats": "+6 Strength, +6 Stamina, 968 Armor, 24 Block",
              "icon": "inv_shield_04",
              "value": "World Drop"
            }
          ]
        },
        {
          "levelBracket": "40–50",
          "itemId": 1169,
          "name": "Wall of the Dead",
          "icon": "inv_shield_05",
          "weaponType": "Shield",
          "armor": 1923,
          "block": 35,
          "source": {
            "kind": "world",
            "title": "World Drop Epic Shield",
            "detail": "+10 Stamina, +10 Armor, Chance on hit: +150 Armor buff."
          },
          "faction": "both",
          "quality": "q4",
          "iLvl": 50,
          "reqLevel": 45,
          "stats": "+10 Stamina, +10 Armor, 1923 Armor, 35 Block, Equip: +150 Armor Proc",
          "alts": [
            {
              "name": "Gizlock's Hypertech Buckler",
              "itemId": 17718,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 52,
              "reqLevel": 47,
              "stats": "+7 Stamina, +8 Intellect, +11 Block Value, 1823 Armor, 33 Block",
              "icon": "inv_shield_13",
              "value": "Maraudon — Tinkerer Gizlock"
            }
          ]
        },
        {
          "levelBracket": "51–54",
          "itemId": 1168,
          "name": "Skullflame Shield",
          "icon": "inv_shield_01",
          "weaponType": "Shield",
          "armor": 2256,
          "block": 40,
          "source": {
            "kind": "world",
            "title": "World Drop Epic Shield",
            "detail": "Iconic lifesteal AOE shield (+2256 Armor, 40 Block, Life Drain / Flame Strike procs)."
          },
          "faction": "both",
          "quality": "q4",
          "iLvl": 59,
          "reqLevel": 54,
          "stats": "2256 Armor, 40 Block, Equip: Chance to Drain 35 Life, Chance to deal 35-45 Fire DMG",
          "alts": [
            {
              "name": "Gizlock's Hypertech Buckler",
              "itemId": 17718,
              "weaponType": "Shield",
              "quality": "q3",
              "iLvl": 52,
              "reqLevel": 47,
              "stats": "+7 Stamina, +8 Intellect, 1823 Armor, 33 Block",
              "icon": "inv_shield_13",
              "value": "Maraudon — Tinkerer Gizlock"
            }
          ]
        },
        {
          "levelBracket": "55–60",
          "itemId": 12602,
          "name": "Draconian Deflector",
          "icon": "inv_shield_11",
          "weaponType": "Shield",
          "armor": 2153,
          "block": 40,
          "source": {
            "kind": "dungeon",
            "title": "Upper Blackrock Spire — General Drakkisath",
            "detail": "Standard pre-raid tanking shield (+10 Defense, 2153 Armor, 40 Block)."
          },
          "faction": "both",
          "quality": "q3",
          "iLvl": 63,
          "reqLevel": 58,
          "stats": "+10 Defense, 2153 Armor, 40 Block",
          "alts": [
            {
              "name": "The Immovable Object",
              "itemId": 19325,
              "weaponType": "Shield",
              "quality": "q4",
              "iLvl": 65,
              "reqLevel": 60,
              "stats": "+15 Stamina, +27 Block Value, 2468 Armor, 44 Block",
              "icon": "inv_shield_12",
              "value": "Alterac Valley — Exalted (Vendor)"
            },
            {
              "name": "Force Reactive Disk",
              "itemId": 18638,
              "weaponType": "Shield",
              "quality": "q4",
              "iLvl": 65,
              "reqLevel": 60,
              "stats": "+11 Stamina, 2548 Armor, 44 Block, AOE Lightning Discharge on Block",
              "icon": "inv_shield_16",
              "value": "Engineering Crafted"
            },
            {
              "name": "Elementium Reinforced Bulwark",
              "itemId": 19349,
              "weaponType": "Shield",
              "quality": "q4",
              "iLvl": 77,
              "reqLevel": 60,
              "stats": "+23 Stamina, +7 Defense, 2816 Armor, 49 Block",
              "icon": "inv_shield_19",
              "value": "Blackwing Lair — Chromaggus"
            }
          ]
        }
      ]
    }
  },
  "spellbooks": {
    "hunter": {
      "classId": "hunter",
      "levels": [
        {
          "level": 1,
          "note": "Your character starts with these",
          "spells": [
            {
              "name": "Auto Shot",
              "icon": "ability_whirlwind",
              "school": "Marksmanship",
              "desc": "Automatically shoots the target until cancelled. Requires Ranged Weapon"
            },
            {
              "name": "Raptor Strike",
              "icon": "ability_meleedamage",
              "school": "Survival",
              "desc": "A strong attack that deals melee weapon damage plus 5. Requires Melee Weapon"
            },
            {
              "name": "Track Beasts",
              "icon": "ability_tracking",
              "school": "Survival",
              "desc": "Shows the location of all nearby beasts on the minimap. Only one form of tracking can be active at a time."
            }
          ]
        },
        {
          "level": 4,
          "note": "",
          "spells": [
            {
              "name": "Aspect of the Monkey",
              "icon": "ability_hunter_aspectofthemonkey",
              "school": "Beast Mastery",
              "desc": "The hunter takes on the aspects of a monkey, increasing chance to dodge by 8%. Only one Aspect can be active at a time."
            },
            {
              "name": "Serpent Sting",
              "icon": "ability_hunter_quickshot",
              "school": "Marksmanship",
              "desc": "Stings the target, causing 10 Nature damage over 15 sec. Only one Sting per Hunter can be active on any one target. Requires Ranged Weapon"
            }
          ]
        },
        {
          "level": 6,
          "note": "",
          "spells": [
            {
              "name": "Arcane Shot",
              "icon": "ability_impalingbolt",
              "school": "Marksmanship",
              "desc": "An instant shot that causes 20 Arcane damage. Requires Ranged Weapon"
            },
            {
              "name": "Hunter's Mark",
              "icon": "ability_hunter_snipershot",
              "school": "Marksmanship",
              "desc": "Places the"
            }
          ]
        },
        {
          "level": 8,
          "note": "",
          "spells": [
            {
              "name": "Concussive Shot",
              "icon": "spell_frost_stun",
              "school": "Marksmanship",
              "desc": "Dazes the target, slowing movement speed by 50% for 4 sec. Requires Ranged Weapon"
            }
          ]
        },
        {
          "level": 10,
          "note": "",
          "spells": [
            {
              "name": "Aspect of the Hawk",
              "icon": "spell_nature_ravenform",
              "school": "Beast Mastery",
              "desc": "The hunter takes on the aspects of a hawk, increasing Ranged Attack Power by 20. Only one Aspect can be active at a time."
            },
            {
              "name": "Call Pet",
              "icon": "ability_hunter_beastcall",
              "school": "Beast Mastery",
              "desc": "Summons your pet to you."
            },
            {
              "name": "Dismiss Pet",
              "icon": "spell_nature_spiritwolf",
              "school": "Beast Mastery",
              "desc": "Dismiss your pet. Dismissing your pet will reduce its happiness by 50."
            },
            {
              "name": "Feed Pet",
              "icon": "ability_hunter_beasttraining",
              "school": "Beast Mastery",
              "desc": "Feed your pet the selected item. Feeding your pet increases happiness. Using food close to the pet's level will have a better result."
            },
            {
              "name": "Revive Pet",
              "icon": "ability_hunter_beastsoothe",
              "school": "Beast Mastery",
              "desc": "your pet, returning it to life with 15% of its health."
            },
            {
              "name": "Track Humanoids",
              "icon": "spell_holy_prayerofhealing",
              "school": "Survival",
              "desc": "Shows the location of all nearby humanoids on the minimap. Only one form of tracking can be active at a time."
            },
            {
              "name": "Beast Training",
              "icon": "ability_hunter_beastcall02",
              "school": "Beast Training",
              "desc": "Lets you train your pet with various abilities that you have learned how to teach."
            }
          ]
        },
        {
          "level": 12,
          "note": "",
          "spells": [
            {
              "name": "Mend Pet",
              "icon": "ability_hunter_mendpet",
              "school": "Beast Mastery",
              "desc": "Heals your pet 20 health every second while you focus. Lasts 5 sec."
            },
            {
              "name": "Distracting Shot",
              "icon": "spell_arcane_blink",
              "school": "Marksmanship",
              "desc": "the target, causing threat. Requires Ranged Weapon"
            },
            {
              "name": "Wing Clip",
              "icon": "ability_rogue_trip",
              "school": "Survival",
              "desc": "Inflicts 5 damage and reduces the enemy target's movement speed by 50% for 10 sec. Requires Melee Weapon"
            }
          ]
        },
        {
          "level": 14,
          "note": "",
          "spells": [
            {
              "name": "Eagle Eye",
              "icon": "ability_hunter_eagleeye",
              "school": "Beast Mastery",
              "desc": "Zooms in the hunter's vision. Only usable outdoors. Lasts 1 min."
            },
            {
              "name": "Eyes of the Beast",
              "icon": "ability_eyeoftheowl",
              "school": "Beast Mastery",
              "desc": "Take direct control of your pet and see through its eyes for 2 min."
            },
            {
              "name": "Scare Beast",
              "icon": "ability_druid_cower",
              "school": "Beast Mastery",
              "desc": "Scares a beast, causing it to run in fear for up to 10 sec. Damage caused may interrupt the effect. Only one beast can be feared at a time."
            }
          ]
        },
        {
          "level": 16,
          "note": "",
          "spells": [
            {
              "name": "Immolation Trap",
              "icon": "spell_fire_flameshock",
              "school": "Survival",
              "desc": "Place a Fire trap that will burn the first enemy to approach for 105 Fire damage over 15 sec. Trap will exist for 1 min. Only one Fire trap can be active at a time."
            },
            {
              "name": "Mongoose Bite",
              "icon": "ability_hunter_swiftstrike",
              "school": "Survival",
              "desc": "the enemy for melee weapon damage plus 15. Can only be performed after you dodge. Requires Melee Weapon"
            }
          ]
        },
        {
          "level": 18,
          "note": "",
          "spells": [
            {
              "name": "Multi-Shot",
              "icon": "ability_upgrademoonglaive",
              "school": "Marksmanship",
              "desc": "Fires several missiles, hitting 3 targets."
            },
            {
              "name": "Track Undead",
              "icon": "spell_shadow_darksummoning",
              "school": "Survival",
              "desc": "Shows the location of all nearby undead on the minimap. Only one form of tracking can be active at a time."
            }
          ]
        },
        {
          "level": 20,
          "note": "",
          "spells": [
            {
              "name": "Aspect of the Cheetah",
              "icon": "ability_mount_jungletiger",
              "school": "Beast Mastery",
              "desc": "The hunter takes on the aspects of a cheetah, increasing movement speed by 30%. If the hunter takes damage, he will be dazed for 4 sec. Only one Aspect can be active at a time."
            },
            {
              "name": "Aimed Shot",
              "icon": "inv_spear_07",
              "school": "Marksmanship",
              "desc": "An aimed shot that increases ranged damage by 20."
            },
            {
              "name": "Disengage",
              "icon": "ability_rogue_feint",
              "school": "Survival",
              "desc": "Attempts to disengage from the target by reducing threat. Disables auto-attack. Requires Melee Weapon"
            },
            {
              "name": "Freezing Trap",
              "icon": "spell_frost_chainsofice",
              "school": "Survival",
              "desc": "Place a Frost trap that freezes the first enemy that approaches, preventing all action for up to 10 sec. Any damage caused will break the ice. Trap will exist for 1 min. Only one Frost trap can be active at a time."
            }
          ]
        },
        {
          "level": 22,
          "note": "",
          "spells": [
            {
              "name": "Scorpid Sting",
              "icon": "ability_hunter_criticalshot",
              "school": "Marksmanship",
              "desc": "Stings the target, reducing the target's chance to hit with attacks by 2% for 20 sec. Only one Sting per Hunter can be active on any one target. Requires Ranged Weapon"
            }
          ]
        },
        {
          "level": 24,
          "note": "",
          "spells": [
            {
              "name": "Beast Lore",
              "icon": "ability_physical_taunt",
              "school": "Beast Mastery",
              "desc": "Gather information about the target beast. The tooltip will display damage, health, armor, any special resistances, and diet."
            },
            {
              "name": "Track Hidden",
              "icon": "ability_stealth",
              "school": "Survival",
              "desc": "Increases stealth detection and shows hidden units within detection range on the minimap. Only one form of tracking can be active at a time."
            }
          ]
        },
        {
          "level": 25,
          "note": "",
          "spells": [
            {
              "name": "Summon Hawk",
              "icon": "ability_hunter_animalhandler",
              "school": "Beast Mastery",
              "desc": "a hawk to dive-bomb your targeted enemy, dealing 34 Physical damage and continuing its assault for 18 sec. Only 2 hawks can be active at once."
            },
            {
              "name": "Trueshot Aura",
              "icon": "ability_trueshot",
              "school": "Marksmanship",
              "desc": "Increases the Ranged Attack Power of party or raid members within 45 yds by 30."
            },
            {
              "name": "Counterattack",
              "icon": "ability_warrior_challange",
              "school": "Survival",
              "desc": "A strike that becomes active after parrying an opponent's attack. This attack deals 50% weapon damage plus 26 and immobilizes the target for 5 sec."
            }
          ]
        },
        {
          "level": 26,
          "note": "",
          "spells": [
            {
              "name": "Rapid Fire",
              "icon": "ability_hunter_runningshot",
              "school": "Marksmanship",
              "desc": "Increases ranged and melee attack speed by 40% for 15 sec."
            },
            {
              "name": "Track Elementals",
              "icon": "spell_frost_summonwaterelemental",
              "school": "Survival",
              "desc": "Shows the location of all nearby elementals on the minimap. Only one form of tracking can be active at a time."
            }
          ]
        },
        {
          "level": 28,
          "note": "",
          "spells": [
            {
              "name": "Frost Trap",
              "icon": "spell_frost_freezingbreath",
              "school": "Survival",
              "desc": "Place a Frost trap that creates an ice slick around itself for 30 sec when the first enemy approaches it. All enemies within 10 yards will be slowed by 60% while in the area of effect. Trap will exist for 1 min. Only one Frost trap can be active at a time."
            }
          ]
        },
        {
          "level": 30,
          "note": "",
          "spells": [
            {
              "name": "Aspect of the Beast",
              "icon": "ability_mount_pinktiger",
              "school": "Beast Mastery",
              "desc": "The hunter takes on the aspects of a beast, becoming untrackable and increasing Melee Attack Power by 50. Only one Aspect can be active at a time."
            },
            {
              "name": "Feign Death",
              "icon": "ability_rogue_feigndeath",
              "school": "Survival",
              "desc": "Feign death which may trick enemies into ignoring you. Lasts 6 min. If not cancelled, after 6 min you will actually die."
            },
            {
              "name": "Lacerate",
              "icon": "ability_gouge",
              "school": "Survival",
              "desc": "Wounds the target causing them to bleed for 147 damage over 21 sec. Requires Melee Weapon"
            }
          ]
        },
        {
          "level": 32,
          "note": "",
          "spells": [
            {
              "name": "Flare",
              "icon": "spell_fire_flare",
              "school": "Marksmanship",
              "desc": "Exposes all hidden and invisible enemies within 10 yards of the targeted area for 30 sec."
            },
            {
              "name": "Track Demons",
              "icon": "spell_shadow_summonfelhunter",
              "school": "Survival",
              "desc": "Shows the location of all nearby demons on the minimap. Only one form of tracking can be active at a time."
            }
          ]
        },
        {
          "level": 34,
          "note": "",
          "spells": [
            {
              "name": "Explosive Trap",
              "icon": "spell_fire_selfdestruct",
              "school": "Survival",
              "desc": "Place a Fire trap that explodes when an enemy approaches, causing 105 to 135 Fire damage and 150 additional Fire damage over 20 sec to all within 10 yards. Trap will exist for 1 min. Only one Fire trap can be active at a time."
            }
          ]
        },
        {
          "level": 36,
          "note": "",
          "spells": [
            {
              "name": "Viper Sting",
              "icon": "ability_hunter_aimedshot",
              "school": "Marksmanship",
              "desc": "Stings the target, draining 616 mana over 8 sec. Only one Sting per Hunter can be active on any one target. Requires Ranged Weapon"
            }
          ]
        },
        {
          "level": 40,
          "note": "",
          "spells": [
            {
              "name": "Aspect of the Pack",
              "icon": "ability_mount_whitetiger",
              "school": "Beast Mastery",
              "desc": "The hunter and group members within 30 yards take on the aspects of a pack of cheetahs, increasing movement speed by 30%. If a pack member takes damage, they will be dazed for 4 sec. Only one Aspect can be active at a time."
            },
            {
              "name": "Sniper Shot",
              "icon": "hunter_pvp_snipershot",
              "school": "Marksmanship",
              "desc": "A long-range shot that deals ranged damage plus 160 and increases the range of your next 3 Shots by 10 yards for 10 sec. Requires Ranged Weapon"
            },
            {
              "name": "Volley",
              "icon": "ability_marksmanship",
              "school": "Marksmanship",
              "desc": "Continuously fires a volley of ammo at the target area, causing 70 Arcane damage to enemy targets within 8 yards every 1 sec for 6 sec. Requires Ranged Weapon"
            },
            {
              "name": "Track Giants",
              "icon": "ability_racial_avatar",
              "school": "Survival",
              "desc": "Shows the location of all nearby giants on the minimap. Only one form of tracking can be active at a time."
            }
          ]
        },
        {
          "level": 46,
          "note": "",
          "spells": [
            {
              "name": "Aspect of the Wild",
              "icon": "spell_nature_protectionformnature",
              "school": "Beast Mastery",
              "desc": "The hunter and all party and raid members within 30 yards take on the aspect of the wild, increasing Nature resistance by 45. Only one Aspect can be active at a time."
            }
          ]
        },
        {
          "level": 50,
          "note": "",
          "spells": [
            {
              "name": "Track Dragonkin",
              "icon": "inv_misc_head_dragon_01",
              "school": "Survival",
              "desc": "Shows the location of all nearby dragonkin on the minimap. Only one form of tracking can be active at a time."
            }
          ]
        },
        {
          "level": 60,
          "note": "",
          "spells": [
            {
              "name": "Tranquilizing Shot",
              "icon": "spell_nature_drowsy",
              "school": "Beast Mastery",
              "desc": "Attempts to remove 1"
            }
          ]
        }
      ]
    },
    "shaman": {
      "classId": "shaman",
      "levels": [
        {
          "level": 1,
          "note": "Your character starts with these",
          "spells": [
            {
              "name": "Lightning Bolt",
              "icon": "spell_nature_lightning",
              "school": "Elemental Combat",
              "desc": "Casts a bolt of lightning at the target for 14 to 17 Nature damage."
            },
            {
              "name": "Rockbiter Weapon",
              "icon": "spell_nature_rockbiter",
              "school": "Enhancement",
              "desc": "Imbue the Shaman's weapon, increasing melee attack power by 50 and allowing melee attacks to cause additional threat when using that weapon. Lasts for 60 minutes. Requires Melee Weapon"
            },
            {
              "name": "Healing Wave",
              "icon": "spell_nature_magicimmunity",
              "school": "Restoration",
              "desc": "Heals a friendly target for 37 to 47."
            }
          ]
        },
        {
          "level": 4,
          "note": "",
          "spells": [
            {
              "name": "Earth Shock",
              "icon": "spell_nature_earthshock",
              "school": "Elemental Combat",
              "desc": "Instantly shocks the target with concussive force, causing 20 to 21 Nature damage. It also interrupts spellcasting and prevents any spell in that school from being cast for 2 sec. Causes a high amount of threat."
            },
            {
              "name": "Stoneskin Totem",
              "icon": "spell_nature_stoneskintotem",
              "school": "Enhancement",
              "desc": "Summons a"
            }
          ]
        },
        {
          "level": 6,
          "note": "",
          "spells": [
            {
              "name": "Earthbind Totem",
              "icon": "spell_nature_strengthofearthtotem02",
              "school": "Elemental Combat",
              "desc": "Summons an"
            }
          ]
        },
        {
          "level": 8,
          "note": "",
          "spells": [
            {
              "name": "Stoneclaw Totem",
              "icon": "spell_nature_stoneclawtotem",
              "school": "Elemental Combat",
              "desc": "Summons a"
            },
            {
              "name": "Lightning Shield",
              "icon": "spell_nature_lightningshield",
              "school": "Enhancement",
              "desc": "The caster is surrounded by 3 balls of lightning. When a spell, melee or ranged attack hits the caster, the attacker will be struck for 13 Nature damage. This expends one lightning ball. Only one ball will fire every few seconds. Lasts 10 min."
            }
          ]
        },
        {
          "level": 10,
          "note": "",
          "spells": [
            {
              "name": "Flame Shock",
              "icon": "spell_fire_flameshock",
              "school": "Elemental Combat",
              "desc": "Instantly sears the target with fire, causing 24 Fire damage immediately and 28 Fire damage over 12 sec."
            },
            {
              "name": "Searing Totem",
              "icon": "spell_fire_searingtotem",
              "school": "Elemental Combat",
              "desc": "Summons a"
            },
            {
              "name": "Flametongue Weapon",
              "icon": "spell_fire_flametounge",
              "school": "Enhancement",
              "desc": "Imbue the Shaman's weapon with fire. Each hit causes 4.71 to 18 additional Fire damage, based on the speed of the weapon. Slower weapons cause more fire damage per swing. When applied to main hand, disables any benefit you personally receive from"
            },
            {
              "name": "Strength of Earth Totem",
              "icon": "spell_nature_earthbindtotem",
              "school": "Enhancement",
              "desc": "Summons a"
            }
          ]
        },
        {
          "level": 12,
          "note": "",
          "spells": [
            {
              "name": "Fire Nova",
              "icon": "spell_fire_sealoffire",
              "school": "Elemental Combat",
              "desc": "Instantly inflicts 32 to 38 fire damage to enemies within 10 yd of your active Fire totem."
            },
            {
              "name": "Purge",
              "icon": "spell_nature_purge",
              "school": "Elemental Combat",
              "desc": "Purges the enemy target, removing 1 magic effects."
            },
            {
              "name": "Ancestral Spirit",
              "icon": "spell_nature_regenerate",
              "school": "Restoration",
              "desc": "Returns the spirit to the body, restoring a dead target to life with 65 health and 120 mana. Cannot be cast when in combat."
            }
          ]
        },
        {
          "level": 16,
          "note": "",
          "spells": [
            {
              "name": "Cure Poison",
              "icon": "spell_nature_nullifypoison",
              "school": "Restoration",
              "desc": "Cures 1 poison effects on the target."
            }
          ]
        },
        {
          "level": 18,
          "note": "",
          "spells": [
            {
              "name": "Tremor Totem",
              "icon": "spell_nature_tremortotem",
              "school": "Restoration",
              "desc": "Summons a"
            }
          ]
        },
        {
          "level": 20,
          "note": "",
          "spells": [
            {
              "name": "Call of the Elements",
              "icon": "spell_shaman_dropall_01",
              "school": "Elemental Combat",
              "desc": "Simultaneously places up to 4 totems specified in the Totem Bar."
            },
            {
              "name": "Frost Shock",
              "icon": "spell_frost_frostshock",
              "school": "Elemental Combat",
              "desc": "Instantly shocks the target with frost, causing 68 to 73 Frost damage and slowing movement speed by 50%. Lasts 8 sec."
            },
            {
              "name": "Totemic Recall",
              "icon": "spell_shaman_totemrecall",
              "school": "Elemental Combat",
              "desc": "Returns your totems to the earth, giving you 25% of the mana required to cast each totem destroyed by Totemic Recall."
            },
            {
              "name": "Frostbrand Weapon",
              "icon": "spell_frost_frostbrand",
              "school": "Enhancement",
              "desc": "Imbue the Shaman's weapon with frost. Each hit has a chance of causing 45 additional Frost damage and slowing the target's movement speed by 25% for 8 sec. Lasts for 60 minutes. Requires Melee Weapon"
            },
            {
              "name": "Ghost Wolf",
              "icon": "spell_nature_spiritwolf",
              "school": "Enhancement",
              "desc": "Turns the Shaman into a"
            },
            {
              "name": "Healing Stream Totem",
              "icon": "inv_spear_04",
              "school": "Restoration",
              "desc": "Summons a"
            },
            {
              "name": "Lesser Healing Wave",
              "icon": "spell_nature_healingwavelesser",
              "school": "Restoration",
              "desc": "Heals a friendly target for 151 to 172."
            }
          ]
        },
        {
          "level": 22,
          "note": "",
          "spells": [
            {
              "name": "Totemic Projection",
              "icon": "ability_shaman_totemrelocation",
              "school": "Enhancement",
              "desc": "Relocates your active totems to the specified location."
            },
            {
              "name": "Water Breathing",
              "icon": "spell_shadow_demonbreath",
              "school": "Enhancement",
              "desc": "Allows the target to breathe underwater for 10 min."
            },
            {
              "name": "Cure Disease",
              "icon": "spell_nature_removedisease",
              "school": "Restoration",
              "desc": "Cures 1 disease on the target."
            },
            {
              "name": "Poison Cleansing Totem",
              "icon": "spell_nature_poisoncleansingtotem",
              "school": "Restoration",
              "desc": "Summons a"
            }
          ]
        },
        {
          "level": 24,
          "note": "",
          "spells": [
            {
              "name": "Frost Resistance Totem",
              "icon": "spell_frostresistancetotem_01",
              "school": "Enhancement",
              "desc": "Summons a"
            }
          ]
        },
        {
          "level": 25,
          "note": "",
          "spells": [
            {
              "name": "Mana Tide Totem",
              "icon": "spell_frost_summonwaterelemental",
              "school": "Restoration",
              "desc": "Summons a"
            }
          ]
        },
        {
          "level": 26,
          "note": "",
          "spells": [
            {
              "name": "Magma Totem",
              "icon": "spell_fire_selfdestruct",
              "school": "Elemental Combat",
              "desc": "Summons a"
            },
            {
              "name": "Far Sight",
              "icon": "spell_nature_farsight",
              "school": "Enhancement",
              "desc": "Changes the caster's viewpoint to the targeted location. Lasts 1 min. Only useable outdoors."
            },
            {
              "name": "Mana Spring Totem",
              "icon": "spell_nature_manaregentotem",
              "school": "Restoration",
              "desc": "Summons a"
            }
          ]
        },
        {
          "level": 28,
          "note": "",
          "spells": [
            {
              "name": "Fire Resistance Totem",
              "icon": "spell_fireresistancetotem_01",
              "school": "Enhancement",
              "desc": "Summons a"
            },
            {
              "name": "Flametongue Totem",
              "icon": "spell_nature_guardianward",
              "school": "Enhancement",
              "desc": "Summons a"
            },
            {
              "name": "Water Walking",
              "icon": "spell_frost_windwalkon",
              "school": "Enhancement",
              "desc": "Allows the friendly target to walk across water for 10 min. Any damage will cancel the effect."
            }
          ]
        },
        {
          "level": 30,
          "note": "",
          "spells": [
            {
              "name": "Call of the Ancestors",
              "icon": "spell_shaman_dropall_02",
              "school": "Elemental Combat",
              "desc": "Simultaneously places up to 4 totems specified in the Totem Bar. Can call different totems than Call of the Elements."
            },
            {
              "name": "Lava Burst",
              "icon": "spell_shaman_lavaburst",
              "school": "Elemental Combat",
              "desc": "You hurl molten lava at the target, dealing 114 to 145 Fire damage. If your"
            },
            {
              "name": "Astral Recall",
              "icon": "spell_nature_astralrecal",
              "school": "Enhancement",
              "desc": "Yanks the caster through the twisting nether back to your home location. Speak to an Innkeeper in a different place to change your home location."
            },
            {
              "name": "Grounding Totem",
              "icon": "spell_nature_groundingtotem",
              "school": "Enhancement",
              "desc": "Summons a"
            },
            {
              "name": "Nature Resistance Totem",
              "icon": "spell_nature_natureresistancetotem",
              "school": "Enhancement",
              "desc": "Summons a"
            },
            {
              "name": "Windfury Weapon",
              "icon": "spell_nature_cyclone",
              "school": "Enhancement",
              "desc": "Imbue the Shaman's weapon with wind. Each hit has a 20% chance of granting you 2 extra attacks with 104 extra melee attack power. When applied to main hand, disables any benefit you personally receive from"
            },
            {
              "name": "Reincarnation",
              "icon": "spell_nature_reincarnation",
              "school": "Restoration",
              "desc": "Allows you to resurrect yourself upon death with 20% health and mana."
            }
          ]
        },
        {
          "level": 32,
          "note": "",
          "spells": [
            {
              "name": "Chain Lightning",
              "icon": "spell_nature_chainlightning",
              "school": "Elemental Combat",
              "desc": "Hurls a lightning bolt at the enemy, dealing 85 to 97 Nature damage and then jumping to additional nearby enemies. Each jump reduces the damage by 30%. Affects 3 total targets."
            },
            {
              "name": "Windfury Totem",
              "icon": "spell_nature_windfury",
              "school": "Enhancement",
              "desc": "Summons a"
            }
          ]
        },
        {
          "level": 34,
          "note": "",
          "spells": [
            {
              "name": "Sentry Totem",
              "icon": "spell_nature_removecurse",
              "school": "Enhancement",
              "desc": "Summons an immobile"
            }
          ]
        },
        {
          "level": 36,
          "note": "",
          "spells": [
            {
              "name": "Windwall Totem",
              "icon": "spell_nature_earthbind",
              "school": "Enhancement",
              "desc": "Summons a"
            }
          ]
        },
        {
          "level": 38,
          "note": "",
          "spells": [
            {
              "name": "Disease Cleansing Totem",
              "icon": "spell_nature_diseasecleansingtotem",
              "school": "Restoration",
              "desc": "Summons a"
            }
          ]
        },
        {
          "level": 40,
          "note": "",
          "spells": [
            {
              "name": "Call of the Spirits",
              "icon": "spell_shaman_dropall_03",
              "school": "Elemental Combat",
              "desc": "Simultaneously places up to 4 totems specified in the Totem Bar. Can call different totems than Call of the Elements or Call of the Ancestors."
            },
            {
              "name": "Chain Heal",
              "icon": "spell_nature_healingwavegreater",
              "school": "Restoration",
              "desc": "Heals the friendly target for 246 to 281, then jumps to heal additional nearby targets. If cast on a party member, the heal will only jump to other party members. Each jump is 50% as effective as the previous target. Heals 3 total targets."
            },
            {
              "name": "Riptide",
              "icon": "spell_nature_riptide",
              "school": "Restoration",
              "desc": "Heals a friendly target for 486 to 534, an additional 445 over 15 sec, and increases the effectiveness of your"
            }
          ]
        },
        {
          "level": 42,
          "note": "",
          "spells": [
            {
              "name": "Grace of Air Totem",
              "icon": "spell_nature_invisibilitytotem",
              "school": "Enhancement",
              "desc": "Summons a"
            }
          ]
        }
      ]
    },
    "mage": {
      "classId": "mage",
      "levels": [
        {
          "level": 1,
          "note": "Your character starts with these",
          "spells": [
            {
              "name": "Arcane Intellect",
              "icon": "spell_holy_magicalsentry",
              "school": "Arcane",
              "desc": "Increases the target's Intellect by 2 for 1 hr."
            },
            {
              "name": "Fireball",
              "icon": "spell_fire_flamebolt",
              "school": "Fire",
              "desc": "Hurls a fiery ball that causes 15 to 23 Fire damage and an additional 2 Fire damage over 4 sec."
            },
            {
              "name": "Frost Armor",
              "icon": "spell_frost_frostarmor02",
              "school": "Frost",
              "desc": "Increases Armor by 30. If an enemy strikes the caster, they may have their movement slowed by 30% and the time between their attacks increased by 25% for 5 sec. Only one type of Armor spell can be active on the Mage at any time. Lasts 30 min."
            }
          ]
        },
        {
          "level": 4,
          "note": "",
          "spells": [
            {
              "name": "Conjure Water",
              "icon": "inv_drink_18",
              "school": "Arcane",
              "desc": "Conjures 20 bottles of water, providing the mage and his allies with something to drink. Conjured items disappear if logged out for more than 15 minutes."
            },
            {
              "name": "Frostbolt",
              "icon": "spell_frost_frostbolt02",
              "school": "Frost",
              "desc": "Launches a bolt of frost at the enemy, causing 19 to 21 Frost damage and slowing movement speed by 40% for 5 sec."
            }
          ]
        },
        {
          "level": 6,
          "note": "",
          "spells": [
            {
              "name": "Conjure Food",
              "icon": "inv_misc_food_73cinnamonroll",
              "school": "Arcane",
              "desc": "Conjures 20 muffins, providing the mage and his allies with something to eat. Conjured items disappear if logged out for more than 15 minutes."
            },
            {
              "name": "Fire Blast",
              "icon": "spell_fire_fireball",
              "school": "Fire",
              "desc": "Blasts the enemy for 27 to 35 Fire damage."
            },
            {
              "name": "Comprehend Scroll",
              "icon": "inv_misc_questionmark",
              "school": "Comprehension",
              "desc": "Decipher an untranslated scroll."
            },
            {
              "name": "Study",
              "icon": "inv_misc_book_08",
              "school": "Comprehension",
              "desc": "Perform spell research, resulting in a bundle of scrolls. Requires a suitable library."
            }
          ]
        },
        {
          "level": 8,
          "note": "",
          "spells": [
            {
              "name": "Arcane Missiles",
              "icon": "spell_nature_starfall",
              "school": "Arcane",
              "desc": "Launches"
            },
            {
              "name": "Polymorph",
              "icon": "spell_nature_polymorph",
              "school": "Arcane",
              "desc": "Transforms the enemy into a sheep, forcing it to wander around for up to 20 sec. While wandering, the sheep cannot attack or cast spells but will regenerate very quickly. Any damage will transform the target back into its normal form. Only one target can be polymorphed at a time. Only works on Beasts, Humanoids and Critters."
            }
          ]
        },
        {
          "level": 10,
          "note": "",
          "spells": [
            {
              "name": "Frost Nova",
              "icon": "spell_frost_frostnova",
              "school": "Frost",
              "desc": "Blasts enemies near the caster for 22 to 24 Frost damage and freezes them in place for up to 8 sec. Damage caused may interrupt the effect."
            }
          ]
        },
        {
          "level": 12,
          "note": "",
          "spells": [
            {
              "name": "Dampen Magic",
              "icon": "spell_nature_abolishmagic",
              "school": "Arcane",
              "desc": "Dampens magic used against the targeted party member, decreasing damage taken from spells by up to 15 and healing spells by up to 30. Lasts 10 min."
            },
            {
              "name": "Slow Fall",
              "icon": "spell_magic_featherfall",
              "school": "Arcane",
              "desc": "Slows falling speed for 30 sec."
            }
          ]
        },
        {
          "level": 14,
          "note": "",
          "spells": [
            {
              "name": "Arcane Explosion",
              "icon": "spell_nature_wispsplode",
              "school": "Arcane",
              "desc": "Causes an explosion of arcane magic around the caster, causing 32 to 36 Arcane damage to all targets within 10 yards."
            }
          ]
        },
        {
          "level": 16,
          "note": "",
          "spells": [
            {
              "name": "Flamestrike",
              "icon": "spell_fire_selfdestruct",
              "school": "Fire",
              "desc": "Calls down a pillar of fire, burning all enemies within the area for 55 to 71 Fire damage and an additional 44 Fire damage over 8 sec. Only one"
            }
          ]
        },
        {
          "level": 18,
          "note": "",
          "spells": [
            {
              "name": "Amplify Magic",
              "icon": "spell_holy_flashheal",
              "school": "Arcane",
              "desc": "Amplifies magic used against the targeted party member, increasing damage taken from spells by up to 23 and healing spells by up to 45. Lasts 10 min."
            },
            {
              "name": "Remove Lesser Curse",
              "icon": "spell_nature_removecurse",
              "school": "Arcane",
              "desc": "Removes 1 Curse or"
            }
          ]
        },
        {
          "level": 20,
          "note": "",
          "spells": [
            {
              "name": "Arcane Blast",
              "icon": "spell_arcane_blast",
              "school": "Arcane",
              "desc": "Blasts the target with energy, dealing 34 to 38 Arcane damage. Each time you cast"
            },
            {
              "name": "Blink",
              "icon": "spell_arcane_blink",
              "school": "Arcane",
              "desc": "Teleports the caster 20 yards forward, unless something is in the way. Also frees the caster from Stuns and Immobilizes."
            },
            {
              "name": "Evocation",
              "icon": "spell_nature_purge",
              "school": "Arcane",
              "desc": "While channeling this spell, your mana regeneration is active and increased by 1500%. Lasts 8 sec."
            },
            {
              "name": "Mana Shield",
              "icon": "spell_shadow_detectlesserinvisibility",
              "school": "Arcane",
              "desc": "Absorbs 120 physical damage, draining mana instead. Drains 2 mana per damage absorbed. Lasts 1 min."
            },
            {
              "name": "Teleport: Ironforge",
              "icon": "spell_arcane_teleportironforge",
              "school": "Arcane · Alliance",
              "desc": "Teleports the caster to Ironforge."
            },
            {
              "name": "Teleport: Orgrimmar",
              "icon": "spell_arcane_teleportorgrimmar",
              "school": "Arcane · Horde",
              "desc": "Teleports the caster to Orgrimmar."
            },
            {
              "name": "Teleport: Stormwind",
              "icon": "spell_arcane_teleportstormwind",
              "school": "Arcane · Alliance",
              "desc": "Teleports the caster to Stormwind."
            },
            {
              "name": "Teleport: Undercity",
              "icon": "spell_arcane_teleportundercity",
              "school": "Arcane · Horde",
              "desc": "Teleports the caster to Undercity."
            },
            {
              "name": "Fire Ward",
              "icon": "spell_fire_firearmor",
              "school": "Fire",
              "desc": "Absorbs 162 Fire damage. Lasts 30 sec."
            },
            {
              "name": "Pyroblast",
              "icon": "spell_fire_fireball02",
              "school": "Fire",
              "desc": "Hurls an immense fiery boulder that causes 101 to 131 Fire damage and an additional 44 Fire damage over 12 sec."
            },
            {
              "name": "Blizzard",
              "icon": "spell_frost_icestorm",
              "school": "Frost",
              "desc": "Ice shards pelt the target area doing 200 Frost damage over 8 sec."
            },
            {
              "name": "Ice Lance",
              "icon": "spell_frost_frostblast",
              "school": "Frost",
              "desc": "Deals 28 to 32 Frost damage to an enemy target. Deals 200% increased damage to Frozen targets."
            }
          ]
        },
        {
          "level": 22,
          "note": "",
          "spells": [
            {
              "name": "Scorch",
              "icon": "spell_fire_soulburn",
              "school": "Fire",
              "desc": "the enemy for 38 to 46 Fire damage."
            },
            {
              "name": "Frost Ward",
              "icon": "spell_frost_frostward",
              "school": "Frost",
              "desc": "Absorbs 162 Frost damage. Lasts 30 sec."
            }
          ]
        },
        {
          "level": 24,
          "note": "",
          "spells": [
            {
              "name": "Counterspell",
              "icon": "spell_frost_iceshock",
              "school": "Arcane",
              "desc": "Counters the enemy's spellcast, preventing any spell from that school of magic from being cast for 10 sec. Generates a high amount of threat."
            },
            {
              "name": "Frost Blast",
              "icon": "spell_ice_magicdamage",
              "school": "Frost",
              "desc": "Quickly launch a weak blast of frost at the enemy, causing 28 to 31 Frost damage and slowing movement speed by 40% for 9 sec."
            }
          ]
        },
        {
          "level": 25,
          "note": "",
          "spells": [
            {
              "name": "Arcane Wrath",
              "icon": "ability_mage_netherwindpresence",
              "school": "Arcane",
              "desc": "Launches a projectile of pure Arcane energy at the enemy target, causing 122 to 146 Arcane damage. This spell gains additional Spell Damage equal to 5% of your maximum Mana."
            }
          ]
        },
        {
          "level": 26,
          "note": "",
          "spells": [
            {
              "name": "Cone of Cold",
              "icon": "spell_frost_glacier",
              "school": "Frost",
              "desc": "Targets in a cone in front of the caster take 96 to 106 Frost damage and are slowed by 40% for 6 sec. The first 4 targets hit by this cone are slowed by an additional 10% for an additional 3 sec."
            }
          ]
        },
        {
          "level": 28,
          "note": "",
          "spells": [
            {
              "name": "Conjure Mana Agate",
              "icon": "inv_misc_gem_emerald_01",
              "school": "Arcane",
              "desc": "Conjures a mana agate that can be used to instantly restore 375 to 425 mana. Conjured items disappear if logged out for more than 15 minutes."
            }
          ]
        },
        {
          "level": 30,
          "note": "",
          "spells": [
            {
              "name": "Teleport: Darnassus",
              "icon": "spell_arcane_teleportdarnassus",
              "school": "Arcane · Alliance",
              "desc": "Teleports the caster to Darnassus."
            },
            {
              "name": "Teleport: Thunder Bluff",
              "icon": "spell_arcane_teleportthunderbluff",
              "school": "Arcane · Horde",
              "desc": "Teleports the caster to Thunder Bluff."
            },
            {
              "name": "Blast Wave",
              "icon": "spell_holy_excorcism_02",
              "school": "Fire",
              "desc": "A wave of flame radiates outward from the caster, damaging all enemies caught within the blast for 154 to 184 Fire damage, and Dazing them for 50% reduced movement speed for 6 sec."
            },
            {
              "name": "Ice Armor",
              "icon": "spell_frost_frostarmor02",
              "school": "Frost",
              "desc": "Increases Armor by 290 and frost resistance by 6. If an enemy strikes the caster, they may have their movement slowed by 30% and the time between their attacks increased by 25% for 5 sec. Only one type of Armor spell can be active on the Mage at any time. Lasts 30 min."
            }
          ]
        },
        {
          "level": 34,
          "note": "",
          "spells": [
            {
              "name": "Mage Armor",
              "icon": "spell_magearmor",
              "school": "Arcane",
              "desc": "Increases your resistance to all magic by 5 and allows 50% of your mana regeneration to continue while casting. Only one type of Armor spell can be active on the Mage at any time. Lasts 30 min."
            }
          ]
        },
        {
          "level": 38,
          "note": "",
          "spells": [
            {
              "name": "Conjure Mana Jade",
              "icon": "inv_misc_gem_emerald_02",
              "school": "Arcane",
              "desc": "Conjures a mana jade that can be used to instantly restore 550 to 650 mana. Conjured items disappear if logged out for more than 15 minutes."
            }
          ]
        },
        {
          "level": 40,
          "note": "",
          "spells": [
            {
              "name": "Portal: Ironforge",
              "icon": "spell_arcane_portalironforge",
              "school": "Arcane · Alliance",
              "desc": "Creates a portal, teleporting group members that use it to Ironforge."
            },
            {
              "name": "Portal: Orgrimmar",
              "icon": "spell_arcane_portalorgrimmar",
              "school": "Arcane · Horde",
              "desc": "Creates a portal, teleporting group members that use it to Orgrimmar."
            },
            {
              "name": "Portal: Stormwind",
              "icon": "spell_arcane_portalstormwind",
              "school": "Arcane · Alliance",
              "desc": "Creates a portal, teleporting group members that use it to Stormwind."
            },
            {
              "name": "Portal: Undercity",
              "icon": "spell_arcane_portalundercity",
              "school": "Arcane · Horde",
              "desc": "Creates a portal, teleporting group members that use it to Undercity."
            },
            {
              "name": "Frostfire Bolt",
              "icon": "ability_mage_frostfirebolt",
              "school": "Fire",
              "desc": "Launches a bolt of frostfire at the enemy, causing 103 to 118 Frostfire damage, slowing movement speed by 40% and causing an additional 27 Frostfire damage over 9 sec. This spell will be checked against the lower of the target's Frost and Fire resists and counts as both Frost and Fire damage."
            },
            {
              "name": "Ice Barrier",
              "icon": "spell_ice_lament",
              "school": "Frost",
              "desc": "Instantly shields you, absorbing 448 damage. Lasts 1 min. While the shield holds, your spellcasts will not be interrupted or delayed from taking damage."
            }
          ]
        },
        {
          "level": 48,
          "note": "",
          "spells": [
            {
              "name": "Conjure Mana Citrine",
              "icon": "inv_misc_gem_opal_01",
              "school": "Arcane",
              "desc": "Conjures a mana citrine that can be used to instantly restore 775 to 925 mana. Conjured items disappear if logged out for more than 15 minutes."
            }
          ]
        },
        {
          "level": 50,
          "note": "",
          "spells": [
            {
              "name": "Portal: Darnassus",
              "icon": "spell_arcane_portaldarnassus",
              "school": "Arcane · Alliance",
              "desc": "Creates a portal, teleporting group members that use it to Darnassus."
            },
            {
              "name": "Portal: Thunder Bluff",
              "icon": "spell_arcane_portalthunderbluff",
              "school": "Arcane · Horde",
              "desc": "Creates a portal, teleporting group members that use it to Thunder Bluff."
            },
            {
              "name": "Teleport: Dalaran",
              "icon": "spell_arcane_teleporthalloftheguardian",
              "school": "Arcane · Alliance",
              "desc": "Teleports the caster to Dalaran."
            }
          ]
        },
        {
          "level": 56,
          "note": "",
          "spells": [
            {
              "name": "Arcane Brilliance",
              "icon": "spell_holy_arcaneintellect",
              "school": "Arcane",
              "desc": "Infuses the target's party and raid with brilliance, increasing their Intellect by 31 for 1 hr."
            }
          ]
        },
        {
          "level": 58,
          "note": "",
          "spells": [
            {
              "name": "Conjure Mana Ruby",
              "icon": "inv_misc_gem_ruby_01",
              "school": "Arcane",
              "desc": "Conjures a mana ruby that can be used to instantly restore 1000 to 1200 mana. Conjured items disappear if logged out for more than 15 minutes."
            }
          ]
        },
        {
          "level": 60,
          "note": "",
          "spells": [
            {
              "name": "Polymorph: Cow",
              "icon": "spell_nature_polymorph_cow",
              "school": "Arcane",
              "desc": "Transforms the enemy into a cow, forcing it to wander around for up to 50 sec. While wandering, the cow cannot attack or cast spells but will regenerate very quickly. Any damage will transform the target back into its normal form. Only one target can be polymorphed at a time. Only works on Beasts, Humanoids and Critters."
            },
            {
              "name": "Felfire",
              "icon": "spell_fire_fireball",
              "school": "Fire",
              "desc": "Blasts the enemy for 500 Fire damage."
            }
          ]
        }
      ]
    },
    "paladin": {
      "classId": "paladin",
      "levels": [
        {
          "level": 1,
          "note": "Your character starts with these",
          "spells": [
            {
              "name": "Holy Light",
              "icon": "spell_holy_holybolt",
              "school": "Holy",
              "desc": "Heals a friendly target for 42 to 50."
            },
            {
              "name": "Seal of Righteousness",
              "icon": "ability_thunderbolt",
              "school": "Holy",
              "desc": "Fills the Paladin with holy spirit for 30 sec, granting each melee attack an additional 3.48 to 9.64 Holy damage. Slower weapons cause more Holy damage per swing. Only one Seal can be active on the Paladin at any one time."
            },
            {
              "name": "Devotion Aura",
              "icon": "spell_holy_devotionaura",
              "school": "Protection",
              "desc": "Gives 55 additional armor to party members within 30 yards. Players may only have one Aura on them per Paladin at any one time."
            }
          ]
        },
        {
          "level": 4,
          "note": "",
          "spells": [
            {
              "name": "Blessing of Might",
              "icon": "spell_holy_fistofjustice",
              "school": "Retribution",
              "desc": "Places a Blessing on the friendly target, increasing melee attack power by 14 for 1 hr. Players may only have one Blessing on them per Paladin at any one time."
            },
            {
              "name": "Judgement",
              "icon": "spell_holy_righteousfury",
              "school": "Retribution",
              "desc": "Unleash the energy of a Seal spell upon an enemy. Does not consume the Seal. Refer to individual Seals for Judgement effect."
            }
          ]
        },
        {
          "level": 6,
          "note": "",
          "spells": [
            {
              "name": "Divine Protection",
              "icon": "spell_holy_restoration",
              "school": "Protection",
              "desc": "You are protected from all physical attacks and spells for 6 sec, but during that time you cannot attack or use physical abilities yourself. Applies"
            },
            {
              "name": "Holy Strike",
              "icon": "classicon_paladin",
              "school": "Retribution",
              "desc": "An instant strike that causes 25% weapon damage plus an additional 11 to 14 as Holy damage. Requires Melee Weapon"
            },
            {
              "name": "Seal of the Crusader",
              "icon": "spell_holy_holysmite",
              "school": "Retribution",
              "desc": "Fills the Paladin with the spirit of a crusader for 30 sec, granting 35 melee attack power. The Paladin also attacks 40% faster, but deals less damage with each attack. Only one Seal can be active on the Paladin at any one time. Unleashing this Seal's energy will judge an enemy for 40 sec, increasing Holy damage taken by up to 23. Your melee strikes will refresh the spell's duration. Only one Judgement per Paladin can be active at any one time."
            }
          ]
        },
        {
          "level": 8,
          "note": "",
          "spells": [
            {
              "name": "Purify",
              "icon": "spell_holy_purify",
              "school": "Holy",
              "desc": "Purifies the friendly target, removing 1 disease effect and 1 poison effect."
            },
            {
              "name": "Hammer of Justice",
              "icon": "spell_holy_sealofmight",
              "school": "Protection",
              "desc": "Stuns the target for 3 sec."
            }
          ]
        },
        {
          "level": 10,
          "note": "",
          "spells": [
            {
              "name": "Lay on Hands",
              "icon": "spell_holy_layonhands",
              "school": "Holy",
              "desc": "Heals a friendly target for an amount equal to the Paladin's maximum health. Drains all of the Paladin's remaining Mana when used, but does not interrupt Mana regeneration."
            },
            {
              "name": "Blessing of Protection",
              "icon": "spell_holy_sealofprotection",
              "school": "Protection",
              "desc": "A targeted party member is protected from all physical attacks for 6 sec, but during that time they cannot attack or use physical abilities. Players may only have one Blessing on them per Paladin at any one time. Applies"
            },
            {
              "name": "Seal of Fury",
              "icon": "spell_holy_retributionaura",
              "school": "Protection",
              "desc": "Fills you with divine fury for 30 sec, causing melee attacks to deal an additional 6 Holy damage. While a shield is equipped, each attack also grants an absorb shield equal to 50% of the Holy damage dealt. Only one Seal can be active on the Paladin at any one time. Unleashing this Seal's energy inflicts 32 to 34 Holy damage to an enemy and taunts the target to attack you for 4 sec."
            }
          ]
        },
        {
          "level": 12,
          "note": "",
          "spells": [
            {
              "name": "Redemption",
              "icon": "spell_holy_resurrection",
              "school": "Holy",
              "desc": "Brings a dead player back to life with 65 health and 120 mana. Cannot be cast when in combat."
            }
          ]
        },
        {
          "level": 14,
          "note": "",
          "spells": [
            {
              "name": "Blessing of Wisdom",
              "icon": "spell_holy_sealofwisdom",
              "school": "Holy",
              "desc": "Places a Blessing on the friendly target, restoring 12 mana every 5 seconds for 1 hr. Players may only have one Blessing on them per Paladin at any one time."
            }
          ]
        },
        {
          "level": 16,
          "note": "",
          "spells": [
            {
              "name": "Righteous Fury",
              "icon": "spell_holy_sealoffury",
              "school": "Protection",
              "desc": "Increases the threat generated by your Holy attacks by 90%. Lasts 30 min."
            },
            {
              "name": "Retribution Aura",
              "icon": "spell_holy_auraoflight",
              "school": "Retribution",
              "desc": "Causes 5 Holy damage to any creature that strikes a party member within 30 yards. Players may only have one Aura on them per Paladin at any one time."
            }
          ]
        },
        {
          "level": 18,
          "note": "",
          "spells": [
            {
              "name": "Blessing of Freedom",
              "icon": "spell_holy_sealofvalor",
              "school": "Protection",
              "desc": "Places a Blessing on the friendly target, granting immunity to movement impairing effects for 10 sec. Players may only have one Blessing on them per Paladin at any one time."
            }
          ]
        },
        {
          "level": 20,
          "note": "",
          "spells": [
            {
              "name": "Consecration",
              "icon": "spell_holy_innerfire",
              "school": "Holy",
              "desc": "Consecrates the land beneath the Paladin, doing 16 Holy damage over 8 sec to enemies who enter the area. The first 4 enemies who enter the area will take an additional 32 damage over 8 sec."
            },
            {
              "name": "Exorcism",
              "icon": "spell_holy_excorcism_02",
              "school": "Holy",
              "desc": "Causes 80 to 90 Holy damage to an Undead or Demon target."
            },
            {
              "name": "Flash of Light",
              "icon": "spell_holy_flashheal",
              "school": "Holy",
              "desc": "Heals a friendly target for 48 to 54."
            },
            {
              "name": "Blessing of Kings",
              "icon": "spell_magic_magearmor",
              "school": "Protection",
              "desc": "Places a Blessing on the friendly target, increasing total stats by 10% for 1 hr. Players may only have one Blessing on them per Paladin at any one time."
            },
            {
              "name": "Seal of Command",
              "icon": "ability_warrior_innerrage",
              "school": "Retribution",
              "desc": "Gives the Paladin a chance to deal additional Holy damage equal to 70% of normal weapon damage. Only one Seal can be active on the Paladin at any one time. Lasts 30 sec. Unleashing this Seal's energy will judge an enemy, instantly causing 69 to 73 Holy damage, 138 to 146 if the target is stunned or incapacitated."
            }
          ]
        },
        {
          "level": 22,
          "note": "",
          "spells": [
            {
              "name": "Concentration Aura",
              "icon": "spell_holy_mindsooth",
              "school": "Protection",
              "desc": "Gives a 35% chance of ignoring spell interruption when damaged to all party members within 30 yards. Players may only have one Aura on them per Paladin at any one time."
            },
            {
              "name": "Seal of Justice",
              "icon": "spell_holy_sealofwrath",
              "school": "Protection",
              "desc": "Fills the Paladin with the spirit of justice for 30 sec, giving each melee attack a chance to stun for 2 sec. Only one Seal can be active on the Paladin at any one time. Unleashing this Seal's energy will judge an enemy for 10 sec, preventing them from fleeing. Your melee strikes will refresh the spell's duration. Only one Judgement per Paladin can be active at any one time."
            }
          ]
        },
        {
          "level": 24,
          "note": "",
          "spells": [
            {
              "name": "Turn Undead",
              "icon": "spell_holy_turnundead",
              "school": "Holy",
              "desc": "The targeted undead enemy will be compelled to flee for up to 10 sec. Damage caused may interrupt the effect. Only one target can be turned at a time."
            }
          ]
        },
        {
          "level": 26,
          "note": "",
          "spells": [
            {
              "name": "Revoke",
              "icon": "spell_holy_prayerofmendingtga",
              "school": "Protection",
              "desc": "Remove target party or raid member's Salvation or Mass Salvation."
            },
            {
              "name": "Salvation",
              "icon": "spell_holy_sealofsalvation",
              "school": "Protection",
              "desc": "Reduces all threat generated by target party member by 30% for 1 hr."
            }
          ]
        },
        {
          "level": 28,
          "note": "",
          "spells": [
            {
              "name": "Shadow Resistance Aura",
              "icon": "spell_shadow_sealofkings",
              "school": "Protection",
              "desc": "Gives 30 additional Shadow resistance to all party and raid members within 30 yards. Players may only have one Aura on them per Paladin at any one time."
            }
          ]
        },
        {
          "level": 30,
          "note": "",
          "spells": [
            {
              "name": "Holy Shock",
              "icon": "spell_holy_searinglight",
              "school": "Holy",
              "desc": "Blasts the target with Holy energy, causing 129 to 139 Holy damage to an enemy, or 110 to 118 healing to an ally."
            },
            {
              "name": "Seal of Light",
              "icon": "spell_holy_healingaura",
              "school": "Holy",
              "desc": "Fills the Paladin with divine light for 30 sec, giving each melee attack a chance to heal the Paladin for 39. Only one Seal can be active on the Paladin at any one time. Unleashing this Seal's energy will judge an enemy for 40 sec, granting melee attacks made against the judged enemy a chance of healing the attacker for 25. Your melee strikes will refresh the spell's duration. Only one Judgement per Paladin can be active at any one time."
            },
            {
              "name": "Divine Intervention",
              "icon": "spell_nature_timestop",
              "school": "Protection",
              "desc": "The paladin sacrifices himself to remove the targeted party member from harms way. Enemies will stop attacking the protected party member, who will be immune to all harmful attacks but cannot take any action for 3 min."
            }
          ]
        },
        {
          "level": 32,
          "note": "",
          "spells": [
            {
              "name": "Frost Resistance Aura",
              "icon": "spell_frost_wizardmark",
              "school": "Protection",
              "desc": "Gives 30 additional Frost resistance to all party and raid members within 30 yards. Players may only have one Aura on them per Paladin at any one time."
            }
          ]
        },
        {
          "level": 34,
          "note": "",
          "spells": [
            {
              "name": "Divine Shield",
              "icon": "spell_holy_divineintervention",
              "school": "Protection",
              "desc": "Protects the paladin from all damage and spells for 10 sec, but reduces all damage you deal by 50%. Applies"
            }
          ]
        },
        {
          "level": 36,
          "note": "",
          "spells": [
            {
              "name": "Fire Resistance Aura",
              "icon": "spell_fire_sealoffire",
              "school": "Protection",
              "desc": "Gives 30 additional Fire resistance to all party and raid members within 30 yards. Players may only have one Aura on them per Paladin at any one time."
            }
          ]
        },
        {
          "level": 38,
          "note": "",
          "spells": [
            {
              "name": "Seal of Wisdom",
              "icon": "spell_holy_righteousnessaura",
              "school": "Holy",
              "desc": "Fills the Paladin with divine wisdom for 30 sec, giving each melee attack a chance to restore 50 of the Paladin's mana. Only one Seal can be active on the Paladin at any one time. Unleashing this Seal's energy will judge an enemy for 40 sec, granting attacks and spells used against the judged enemy a chance to restore 33 mana to the attacker. Your melee strikes will refresh the spell's duration. Only one Judgement per Paladin can be active at any one time."
            }
          ]
        },
        {
          "level": 40,
          "note": "",
          "spells": [
            {
              "name": "Blessing of Light",
              "icon": "spell_holy_prayerofhealing02",
              "school": "Holy",
              "desc": "Places a Blessing on the friendly target, increasing the effects of"
            },
            {
              "name": "Light's Vigil",
              "icon": "ability_paladin_judgementofthepure",
              "school": "Holy",
              "desc": "Applies"
            },
            {
              "name": "Hammer of the Righteous",
              "icon": "ability_paladin_hammeroftherighteous",
              "school": "Protection",
              "desc": "Hammer the current target and up to 3 additional nearby targets, causing Holy damage to each equal to 3 times the damage per second of your main hand weapon. Cooldown shared with"
            },
            {
              "name": "Holy Shield",
              "icon": "spell_holy_blessingofprotection",
              "school": "Protection",
              "desc": "Increases chance to block by 30% for 10 sec, and deals 110 Holy damage for each attack blocked while active. Damage caused by"
            },
            {
              "name": "Summon Warhorse",
              "icon": "spell_nature_swiftness",
              "school": "Mounts",
              "desc": "Summons a warhorse, which serves as a mount."
            }
          ]
        },
        {
          "level": 42,
          "note": "",
          "spells": [
            {
              "name": "Cleanse",
              "icon": "spell_holy_renew",
              "school": "Holy",
              "desc": "Cleanses a friendly target, removing 1 poison effect, 1 disease effect, and 1 magic effect."
            }
          ]
        },
        {
          "level": 44,
          "note": "",
          "spells": [
            {
              "name": "Hammer of Wrath",
              "icon": "ability_thunderclap",
              "school": "Holy",
              "desc": "Hurls a hammer that strikes an enemy for 286 to 314 Holy damage. Only usable on enemies that have 20% or less health."
            }
          ]
        },
        {
          "level": 46,
          "note": "",
          "spells": [
            {
              "name": "Blessing of Sacrifice",
              "icon": "spell_holy_sealofsacrifice",
              "school": "Protection",
              "desc": "Places a Blessing on the party member, transfering 45 damage taken per hit to the caster. Lasts 30 sec. Players may only have one Blessing on them per Paladin at any one time."
            }
          ]
        },
        {
          "level": 50,
          "note": "",
          "spells": [
            {
              "name": "Holy Wrath",
              "icon": "spell_holy_excorcism",
              "school": "Holy",
              "desc": "Sends bolts of holy power in all directions, causing 368 to 434 Holy damage to all Undead and Demon targets within 20 yds and stunning them for 2 sec."
            }
          ]
        },
        {
          "level": 52,
          "note": "",
          "spells": [
            {
              "name": "Greater Blessing of Might",
              "icon": "spell_holy_greaterblessingofkings",
              "school": "Retribution",
              "desc": "Gives all members of the raid or group that share the same class with the target the"
            }
          ]
        },
        {
          "level": 54,
          "note": "",
          "spells": [
            {
              "name": "Greater Blessing of Wisdom",
              "icon": "spell_holy_greaterblessingofwisdom",
              "school": "Holy",
              "desc": "Gives all members of the raid or group that share the same class with the target the"
            }
          ]
        },
        {
          "level": 60,
          "note": "",
          "spells": [
            {
              "name": "Greater Blessing of Light",
              "icon": "spell_holy_greaterblessingoflight",
              "school": "Holy",
              "desc": "Gives all members of the raid or group that share the same class with the target the"
            },
            {
              "name": "Greater Blessing of Kings",
              "icon": "spell_magic_greaterblessingofkings",
              "school": "Protection",
              "desc": "Gives all members of the raid or group that share the same class with the target the"
            },
            {
              "name": "Mass Salvation",
              "icon": "spell_holy_greaterblessingofsalvation",
              "school": "Protection",
              "desc": "Gives all members of the raid or group that share the same class with the target a reduction to all threat generated by 30% for 1 hr."
            },
            {
              "name": "Summon Charger",
              "icon": "ability_mount_charger",
              "school": "Mounts · Alliance",
              "desc": "Summons a Charger, which serves as a mount."
            }
          ]
        }
      ]
    },
    "warrior": {
      "classId": "warrior",
      "levels": [
        {
          "level": 1,
          "note": "Your character starts with these",
          "spells": [
            {
              "name": "Battle Stance",
              "icon": "ability_warrior_offensivestance",
              "school": "Arms",
              "desc": "A balanced combat stance."
            },
            {
              "name": "Heroic Strike",
              "icon": "ability_rogue_ambush",
              "school": "Arms",
              "desc": "A strong attack that increases melee damage by 11 and causes a high amount of threat. Requires Melee Weapon"
            },
            {
              "name": "Battle Shout",
              "icon": "ability_warrior_battleshout",
              "school": "Fury",
              "desc": "The warrior shouts, increasing the melee attack power of all party or raid members within 20 yards by 12. Lasts 3 min."
            }
          ]
        },
        {
          "level": 4,
          "note": "",
          "spells": [
            {
              "name": "Charge",
              "icon": "ability_warrior_charge",
              "school": "Arms",
              "desc": "Charge an enemy, generate 9 Rage, and Stun it for 1 sec. Cannot be used in combat. Requires"
            },
            {
              "name": "Rend",
              "icon": "ability_gouge",
              "school": "Arms",
              "desc": "Wounds the target causing them to bleed for 15 damage over 9 sec. Requires Melee Weapon Requires"
            }
          ]
        },
        {
          "level": 6,
          "note": "",
          "spells": [
            {
              "name": "Thunder Clap",
              "icon": "spell_nature_thunderclap",
              "school": "Arms",
              "desc": "Blasts nearby enemies, increasing the time between their attacks by 20% for 10 sec and doing 10 damage to them. Will affect up to 4 targets. Requires"
            }
          ]
        },
        {
          "level": 8,
          "note": "",
          "spells": [
            {
              "name": "Hamstring",
              "icon": "ability_shockwave",
              "school": "Arms",
              "desc": "Maims the enemy, causing 5 damage and slowing the enemy's movement by 40% for 15 sec. Requires Melee Weapon Requires"
            }
          ]
        },
        {
          "level": 10,
          "note": "",
          "spells": [
            {
              "name": "Bloodrage",
              "icon": "ability_racial_bloodrage",
              "school": "Protection",
              "desc": "Generates 10 rage at the cost of health, and then generates an additional 10 rage over 10 sec."
            },
            {
              "name": "Defensive Stance",
              "icon": "ability_warrior_defensivestance",
              "school": "Protection",
              "desc": "A defensive combat stance. Decreases damage taken by 10% and damage caused by 10%. Increases all threat generated by 30%."
            },
            {
              "name": "Sunder Armor",
              "icon": "ability_warrior_sunder",
              "school": "Protection",
              "desc": "Sunders the target's armor, reducing it by 90 per"
            },
            {
              "name": "Taunt",
              "icon": "spell_nature_reincarnation",
              "school": "Protection",
              "desc": "Taunts the target to attack you, but has no effect if the target is already attacking you. Requires"
            }
          ]
        },
        {
          "level": 12,
          "note": "",
          "spells": [
            {
              "name": "Overpower",
              "icon": "ability_meleedamage",
              "school": "Arms",
              "desc": "Instantly overpower the enemy, causing weapon damage plus 5. Only useable after the target dodges. The"
            },
            {
              "name": "Shield Bash",
              "icon": "ability_warrior_shieldbash",
              "school": "Protection",
              "desc": "Bashes the target with your shield for 6 damage. It also interrupts spellcasting and prevents any spell in that school from being cast for 6 sec. Requires Shields Requires"
            }
          ]
        },
        {
          "level": 14,
          "note": "",
          "spells": [
            {
              "name": "Tactical Mastery",
              "icon": "spell_nature_enchantarmor",
              "school": "Arms",
              "desc": "You retain up to 10 Rage when you change Stances."
            },
            {
              "name": "Demoralizing Shout",
              "icon": "ability_warrior_warcry",
              "school": "Fury",
              "desc": "Reduces the melee attack power of all enemies within 10 yards by 63 for 45 sec."
            },
            {
              "name": "Revenge",
              "icon": "ability_warrior_revenge",
              "school": "Protection",
              "desc": "Instantly counterattack an enemy for 20 to 24 damage and a high amount of threat."
            }
          ]
        },
        {
          "level": 16,
          "note": "",
          "spells": [
            {
              "name": "Mocking Blow",
              "icon": "ability_warrior_punishingblow",
              "school": "Arms",
              "desc": "A mocking attack that causes 22 damage, a moderate amount of threat and forces the target to focus attacks on you for 6 sec. Requires Melee Weapon Requires"
            },
            {
              "name": "Shield Block",
              "icon": "ability_defend",
              "school": "Protection",
              "desc": "Increases chance to block by 75% for 7 sec, but will only block 2 attacks. Requires Shields Requires"
            }
          ]
        },
        {
          "level": 18,
          "note": "",
          "spells": [
            {
              "name": "Disarm",
              "icon": "ability_warrior_disarm",
              "school": "Protection",
              "desc": "the enemy's weapon for 10 sec. Requires"
            }
          ]
        },
        {
          "level": 20,
          "note": "",
          "spells": [
            {
              "name": "Retaliation",
              "icon": "ability_warrior_challange",
              "school": "Arms",
              "desc": "Instantly counterattack any enemy that strikes you in melee for 15 sec. Melee attacks made from behind cannot be counterattacked. A maximum of 30 attacks will cause retaliation. Requires"
            },
            {
              "name": "Victory Rush",
              "icon": "ability_warrior_devastate",
              "school": "Arms",
              "desc": "Instantly attack the target causing (1 + 15% of attack power) damage and healing you for 10% of your maximum health. Only useable within 20 sec after you kill a non-trivial enemy."
            },
            {
              "name": "Cleave",
              "icon": "ability_warrior_cleave",
              "school": "Fury",
              "desc": "A sweeping attack that does your weapon damage plus 5 to the target and a second nearby enemy. Requires Melee Weapon"
            },
            {
              "name": "Slam",
              "icon": "ability_warrior_decisivestrike",
              "school": "Fury",
              "desc": "Slams the opponent, causing weapon damage plus 16. Requires Melee Weapon"
            }
          ]
        },
        {
          "level": 22,
          "note": "",
          "spells": [
            {
              "name": "Intimidating Shout",
              "icon": "ability_golemthunderclap",
              "school": "Fury",
              "desc": "The warrior shouts, causing the targeted enemy to cower in fear. Up to 5 enemies within 8 yds will flee in fear. Lasts 8 sec."
            }
          ]
        },
        {
          "level": 24,
          "note": "",
          "spells": [
            {
              "name": "Execute",
              "icon": "inv_sword_48",
              "school": "Fury",
              "desc": "Attempt to finish off a wounded foe, causing 125 damage and converting each extra point of rage into 3 additional damage. Only usable on enemies that have 20% or less health. Requires Melee Weapon Requires"
            }
          ]
        },
        {
          "level": 26,
          "note": "",
          "spells": [
            {
              "name": "Challenging Shout",
              "icon": "ability_bullrush",
              "school": "Fury",
              "desc": "Forces all nearby enemies within 10 yards to focus attacks on you for 6 sec."
            }
          ]
        },
        {
          "level": 28,
          "note": "",
          "spells": [
            {
              "name": "Shield Wall",
              "icon": "ability_warrior_shieldwall",
              "school": "Protection",
              "desc": "Reduces the damage taken from all attacks by 60% for 12 sec. Requires Shields Requires"
            }
          ]
        },
        {
          "level": 30,
          "note": "",
          "spells": [
            {
              "name": "Berserker Rage",
              "icon": "spell_nature_ancestralguardian",
              "school": "Fury",
              "desc": "The warrior enters a berserker rage, becoming immune to Fear and Incapacitate effects and generating extra rage when taking damage. Lasts 10 sec. Requires"
            },
            {
              "name": "Berserker Stance",
              "icon": "ability_racial_avatar",
              "school": "Fury",
              "desc": "An aggressive stance. Critical strike chance increased by 3% and all damage taken is increased by 10%."
            },
            {
              "name": "Intercept",
              "icon": "ability_rogue_sprint",
              "school": "Fury",
              "desc": "Charge an enemy, causing 25 damage and stunning it for 3 sec. Requires"
            }
          ]
        },
        {
          "level": 36,
          "note": "",
          "spells": [
            {
              "name": "Whirlwind",
              "icon": "ability_whirlwind",
              "school": "Fury",
              "desc": "In a whirlwind of steel you attack up to 4 enemies within 8 yards, causing weapon damage from both melee weapons to each enemy. Requires Melee Weapon Requires"
            }
          ]
        },
        {
          "level": 38,
          "note": "",
          "spells": [
            {
              "name": "Pummel",
              "icon": "inv_gauntlets_04",
              "school": "Fury",
              "desc": "the target for 20 damage. It also interrupts spellcasting and prevents any spell in that school from being cast for 4 sec. Requires"
            }
          ]
        },
        {
          "level": 40,
          "note": "",
          "spells": [
            {
              "name": "Mortal Strike",
              "icon": "ability_warrior_savageblow",
              "school": "Arms",
              "desc": "A vicious strike that deals weapon damage plus 85 and wounds the target, reducing the effectiveness of any healing by 50% for 10 sec. Requires Melee Weapon"
            },
            {
              "name": "Bloodthirst",
              "icon": "spell_nature_bloodlust",
              "school": "Fury",
              "desc": "Instantly attack the target causing damage equal to 45% of your Attack Power plus 30 and increasing your movement speed by 10% for 10 sec."
            },
            {
              "name": "Shield Slam",
              "icon": "inv_shield_05",
              "school": "Protection",
              "desc": "the target with your shield, causing 421 to 439 damage, increased by your Block Value, and has a 50% chance of dispelling 1 magic effect on the target. Causes a very high amount of threat. Requires Shields"
            }
          ]
        },
        {
          "level": 50,
          "note": "",
          "spells": [
            {
              "name": "Recklessness",
              "icon": "ability_criticalstrike",
              "school": "Fury",
              "desc": "The warrior will gain 100% increased critical strike chance and will be immune to Fear effects for the next 15 sec, but all damage taken is increased by 20%. Requires"
            }
          ]
        }
      ]
    },
    "warlock": {
      "classId": "warlock",
      "levels": [
        {
          "level": 1,
          "note": "Your character starts with these",
          "spells": [
            {
              "name": "Demon Skin",
              "icon": "spell_shadow_ragingscream",
              "school": "Demonology",
              "desc": "Protects the caster, increasing armor by 40 and increases health regeneration by 3 health per 5 sec. for 30 min."
            },
            {
              "name": "Summon Imp",
              "icon": "spell_shadow_summonimp",
              "school": "Demonology",
              "desc": "Summons an Imp under the command of the Warlock."
            },
            {
              "name": "Immolate",
              "icon": "spell_fire_immolation",
              "school": "Destruction",
              "desc": "Burns the enemy for 11 Fire damage and then an additional 15 Fire damage over 15 sec."
            },
            {
              "name": "Shadow Bolt",
              "icon": "spell_shadow_shadowbolt",
              "school": "Destruction",
              "desc": "Sends a shadowy bolt at the enemy, causing 12 to 16 Shadow damage."
            }
          ]
        },
        {
          "level": 4,
          "note": "",
          "spells": [
            {
              "name": "Corruption",
              "icon": "spell_shadow_abominationexplosion",
              "school": "Affliction",
              "desc": "Corrupts the target, causing 40 Shadow damage over 12 sec."
            },
            {
              "name": "Curse of Weakness",
              "icon": "spell_shadow_curseofmannoroth",
              "school": "Affliction",
              "desc": "Physical damage caused by the target is reduced by 4 for 2 min. Only one Curse per Warlock can be active on any one target."
            }
          ]
        },
        {
          "level": 6,
          "note": "",
          "spells": [
            {
              "name": "Life Tap",
              "icon": "spell_shadow_burningspirit",
              "school": "Affliction",
              "desc": "Converts 60 Health into 60 Mana for you. Spirit increases the amount converted."
            }
          ]
        },
        {
          "level": 8,
          "note": "",
          "spells": [
            {
              "name": "Bane of Agony",
              "icon": "spell_shadow_curseofsargeras",
              "school": "Affliction",
              "desc": "Afflicts the target with agony, causing 72 Shadow damage over 24 sec. This damage is dealt slowly at first, and builds up as the"
            },
            {
              "name": "Fear",
              "icon": "spell_shadow_possession",
              "school": "Affliction",
              "desc": "Strikes fear in the enemy, causing it to run in fear for up to 10 sec. Damage caused may interrupt the effect. Only 1 target can be feared at a time."
            }
          ]
        },
        {
          "level": 10,
          "note": "",
          "spells": [
            {
              "name": "Drain Soul",
              "icon": "spell_shadow_haunting",
              "school": "Affliction",
              "desc": "Drains the soul of the target, causing 85 Shadow damage over 15 sec. Non-trivial targets damaged by"
            },
            {
              "name": "Create Healthstone",
              "icon": "inv_stone_04",
              "school": "Demonology",
              "desc": "Creates a"
            },
            {
              "name": "Summon Voidwalker",
              "icon": "spell_shadow_summonvoidwalker",
              "school": "Demonology",
              "desc": "Summons a Voidwalker under the command of the Warlock."
            }
          ]
        },
        {
          "level": 12,
          "note": "",
          "spells": [
            {
              "name": "Health Funnel",
              "icon": "spell_shadow_lifedrain",
              "school": "Demonology",
              "desc": "Gives 12 health to the caster's pet every second for 10 sec as long as the caster channels. Generates reduced threat."
            }
          ]
        },
        {
          "level": 14,
          "note": "",
          "spells": [
            {
              "name": "Curse of Recklessness",
              "icon": "spell_shadow_unholystrength",
              "school": "Affliction",
              "desc": "Curses the target with recklessness, reducing the target's armor by 175 for 2 min. Cursed enemies will not flee and will ignore Fear and Horror effects. Only one Curse per Warlock can be active on any one target."
            },
            {
              "name": "Drain Life",
              "icon": "spell_shadow_lifedrain02",
              "school": "Affliction",
              "desc": "Transfers 10 health every 1 second from the target to the caster. Lasts 5 sec."
            }
          ]
        },
        {
          "level": 16,
          "note": "",
          "spells": [
            {
              "name": "Unending Breath",
              "icon": "spell_shadow_demonbreath",
              "school": "Demonology",
              "desc": "Allows the target to breathe underwater for 10 min."
            }
          ]
        },
        {
          "level": 18,
          "note": "",
          "spells": [
            {
              "name": "Create Soulstone",
              "icon": "spell_shadow_soulgem",
              "school": "Demonology",
              "desc": "Creates a Minor Soulstone. The Soulstone can be used to store one target's soul. If the target dies while their soul is stored, they will be able to resurrect with 400 health and 700 mana. Conjured items disappear if logged out for more than 15 minutes."
            },
            {
              "name": "Searing Pain",
              "icon": "spell_fire_soulburn",
              "school": "Destruction",
              "desc": "Inflict searing pain on the enemy target, causing 24 to 29 Fire damage. Causes a high amount of threat."
            }
          ]
        },
        {
          "level": 20,
          "note": "",
          "spells": [
            {
              "name": "Curse of the Elements",
              "icon": "warlock_curse_shadow",
              "school": "Affliction",
              "desc": "Curses the target for 5 min, reducing Magic resistances by 30 and increases Magic damage taken by 4%. Only one Curse per Warlock can be active on any one target."
            },
            {
              "name": "Demon Armor",
              "icon": "spell_shadow_ragingscream",
              "school": "Demonology",
              "desc": "Protects the caster, increasing armor by 210, Shadow resistance by 3 and increases health regeneration by 7 health per 5 sec. for 30 min."
            },
            {
              "name": "Ritual of Summoning",
              "icon": "spell_shadow_twilight",
              "school": "Demonology",
              "desc": "Begins a ritual that summons the targeted group member. Requires the caster and 2 additional party members to complete the ritual. In order to participate, all players must be out of combat and right-click the portal and not move until the ritual is complete."
            },
            {
              "name": "Summon Incubus",
              "icon": "ability_warlock_incubus",
              "school": "Demonology",
              "desc": "Summons an"
            },
            {
              "name": "Summon Succubus",
              "icon": "spell_shadow_summonsuccubus",
              "school": "Demonology",
              "desc": "Summons a Succubus under the command of the Warlock."
            },
            {
              "name": "Rain of Fire",
              "icon": "spell_shadow_rainoffire",
              "school": "Destruction",
              "desc": "Calls down a fiery rain to burn enemies in the area of effect for 168 Fire damage over 8 sec."
            },
            {
              "name": "Shadowburn",
              "icon": "spell_shadow_scourgebuild",
              "school": "Destruction",
              "desc": "Instantly blasts the target for 65 to 74 Shadow damage. If a non-trivial target dies within 8 sec of being hit with"
            }
          ]
        },
        {
          "level": 22,
          "note": "",
          "spells": [
            {
              "name": "Eye of Kilrogg",
              "icon": "spell_shadow_evileye",
              "school": "Demonology",
              "desc": "Summons an"
            }
          ]
        },
        {
          "level": 24,
          "note": "",
          "spells": [
            {
              "name": "Drain Mana",
              "icon": "spell_shadow_siphonmana",
              "school": "Affliction",
              "desc": "Transfers 44 Mana every 1 sec from the target to the caster. Lasts 5 sec."
            },
            {
              "name": "Sense Demons",
              "icon": "spell_shadow_metamorphosis",
              "school": "Demonology",
              "desc": "Shows the location of all nearby demons on the minimap until cancelled. Only one type of tracking can be used at a time."
            }
          ]
        },
        {
          "level": 25,
          "note": "",
          "spells": [
            {
              "name": "Conflagrate",
              "icon": "spell_fire_fireball",
              "school": "Destruction",
              "desc": "Ignites a target that is already afflicted by your"
            }
          ]
        },
        {
          "level": 26,
          "note": "",
          "spells": [
            {
              "name": "Curse of Tongues",
              "icon": "spell_shadow_curseoftounges",
              "school": "Affliction",
              "desc": "Forces the target to speak in Demonic, increasing the casting time of all spells by 50%. Only one Curse per Warlock can be active on any one target. Lasts 30 sec."
            },
            {
              "name": "Detect Invisibility",
              "icon": "spell_shadow_detectinvisibility",
              "school": "Demonology",
              "desc": "Allows the friendly target to detect lesser invisibility for 10 min."
            }
          ]
        },
        {
          "level": 28,
          "note": "",
          "spells": [
            {
              "name": "Banish",
              "icon": "spell_shadow_cripple",
              "school": "Demonology",
              "desc": "Banishes the enemy target, preventing all action but making it invulnerable for up to 20 sec. Only one target can be banished at a time. Only works on Demons and Elementals."
            },
            {
              "name": "Create Firestone",
              "icon": "inv_misc_gem_bloodstone_02",
              "school": "Demonology",
              "desc": "Creates a Lesser Firestone which can be used to enchant your weapon with Fire, increasing your spell critical strike chance by 1% and the damage done by your Fire spells by up to 10. Conjured items disappear if logged out for more than 15 minutes."
            }
          ]
        },
        {
          "level": 30,
          "note": "",
          "spells": [
            {
              "name": "Siphon Life",
              "icon": "spell_shadow_requiem",
              "school": "Affliction",
              "desc": "Transfers 11 health from the target to the caster every 3 sec. Lasts 30 sec."
            },
            {
              "name": "Subjugate Demon",
              "icon": "spell_shadow_enslavedemon",
              "school": "Demonology",
              "desc": "Subjugates the target demon, up to level 45, forcing it to do your bidding. While subjugated, the time between the demon's attacks is increased by 40% and its casting speed is slowed by 30%. Lasts up to 5 min. If you repeatedly subjugate the same demon, it will become more difficult to control with each attempt."
            },
            {
              "name": "Summon Felhunter",
              "icon": "spell_shadow_summonfelhunter",
              "school": "Demonology",
              "desc": "Summons a Felhunter under the command of the Warlock."
            },
            {
              "name": "Hellfire",
              "icon": "spell_fire_incinerate",
              "school": "Destruction",
              "desc": "Ignites the area surrounding the caster, causing 86 Fire damage to himself and 86 Fire damage to all nearby enemies every 1 sec. Lasts 15 sec."
            }
          ]
        },
        {
          "level": 32,
          "note": "",
          "spells": [
            {
              "name": "Shadow Ward",
              "icon": "spell_shadow_antishadow",
              "school": "Demonology",
              "desc": "Absorbs 290 shadow damage. Lasts 30 sec."
            }
          ]
        },
        {
          "level": 36,
          "note": "",
          "spells": [
            {
              "name": "Create Spellstone",
              "icon": "inv_misc_gem_sapphire_01",
              "school": "Demonology",
              "desc": "Creates a"
            }
          ]
        },
        {
          "level": 40,
          "note": "",
          "spells": [
            {
              "name": "Howl of Terror",
              "icon": "spell_shadow_deathscream",
              "school": "Affliction",
              "desc": "Howl, causing 5 enemies within 10 yds to flee in terror for 10 sec. Damage caused may interrupt the effect."
            },
            {
              "name": "Incinerate",
              "icon": "spell_fire_burnout",
              "school": "Destruction",
              "desc": "Deals 100 to 114 Fire damage to your target and an additional 25% damage if the target is afflicted by"
            },
            {
              "name": "Summon Felsteed",
              "icon": "spell_nature_swiftness",
              "school": "Mounts",
              "desc": "Summons a Felsteed, which serves as a mount for the caster."
            }
          ]
        },
        {
          "level": 42,
          "note": "",
          "spells": [
            {
              "name": "Death Coil",
              "icon": "spell_shadow_deathcoil",
              "school": "Affliction",
              "desc": "Causes the enemy target to run in horror for 3 sec and causes 285 Shadow damage. The caster gains 100% of the damage caused in health."
            }
          ]
        },
        {
          "level": 48,
          "note": "",
          "spells": [
            {
              "name": "Soul Fire",
              "icon": "spell_fire_fireball02",
              "school": "Destruction",
              "desc": "the enemy's soul, causing 344 to 430 Fire damage."
            }
          ]
        },
        {
          "level": 50,
          "note": "",
          "spells": [
            {
              "name": "Inferno",
              "icon": "spell_shadow_summoninfernal",
              "school": "Demonology",
              "desc": "Summons a meteor from the"
            }
          ]
        },
        {
          "level": 60,
          "note": "",
          "spells": [
            {
              "name": "Bane of Doom",
              "icon": "spell_shadow_auraofdarkness",
              "school": "Affliction",
              "desc": "Afflicts the target with impending doom, causing 1742 Shadow damage after 1 min. If the target dies from this damage, there is a chance that a Doomguard will be summoned. Cannot be cast on players. Only one"
            },
            {
              "name": "Portal of Summoning",
              "icon": "inv_misc_rune_10",
              "school": "Demonology",
              "desc": "Begins a ritual that creates a summoning portal. The summoning portal can be used by 2 party or raid members to summon a targeted party or raid member. The ritual portal requires the caster and 2 additional party or raid members to complete. In order to participate, all players must be out of combat and right-click the portal and not move until the ritual is complete."
            },
            {
              "name": "Ritual of Doom",
              "icon": "spell_shadow_antimagicshell",
              "school": "Demonology",
              "desc": "Begins a ritual that sacrifices a random participant to summon a doomguard. The doomguard must be immediately subjugated or it will attack the ritual participants. Requires the caster and 4 additional party members to complete the ritual. In order to participate, all players must right-click the portal and not move until the ritual is complete."
            },
            {
              "name": "Summon Dreadsteed",
              "icon": "ability_mount_dreadsteed",
              "school": "Mounts",
              "desc": "Summons a Dreadsteed, which serves as a mount for the caster."
            }
          ]
        }
      ]
    },
    "priest": {
      "classId": "priest",
      "levels": [
        {
          "level": 1,
          "note": "Your character starts with these",
          "spells": [
            {
              "name": "Power Word: Fortitude",
              "icon": "spell_holy_wordfortitude",
              "school": "Discipline",
              "desc": "Power infuses the target, increasing their Stamina by 4 for 1 hr."
            },
            {
              "name": "Lesser Heal",
              "icon": "spell_holy_lesserheal",
              "school": "Holy",
              "desc": "Heal your target for 47 to 57."
            },
            {
              "name": "Smite",
              "icon": "spell_holy_holysmite",
              "school": "Holy",
              "desc": "an enemy for 13 to 18 Holy damage."
            }
          ]
        },
        {
          "level": 4,
          "note": "",
          "spells": [
            {
              "name": "Shadow Word: Pain",
              "icon": "spell_shadow_shadowwordpain",
              "school": "Shadow Magic",
              "desc": "A word of darkness that causes 30 Shadow damage over 18 sec."
            }
          ]
        },
        {
          "level": 6,
          "note": "",
          "spells": [
            {
              "name": "Power Word: Shield",
              "icon": "spell_holy_powerwordshield",
              "school": "Discipline",
              "desc": "Draws on the soul of the party member to shield them, absorbing 48 damage. Lasts 30 sec. While the shield holds, spellcasting will not be interrupted by damage. Once shielded, the target cannot be shielded again for 15 sec."
            }
          ]
        },
        {
          "level": 8,
          "note": "",
          "spells": [
            {
              "name": "Renew",
              "icon": "spell_holy_renew",
              "school": "Holy",
              "desc": "Heals the target of 45 damage over 15 sec."
            },
            {
              "name": "Fade",
              "icon": "spell_magic_lesserinvisibilty",
              "school": "Shadow Magic",
              "desc": "out, discouraging enemies from attacking you for 10 sec."
            }
          ]
        },
        {
          "level": 10,
          "note": "",
          "spells": [
            {
              "name": "Confounding Flash",
              "icon": "ability_paladin_blindinglight2",
              "school": "Discipline · Gnome only",
              "desc": "Confuses up to 5 enemies within 8 yds for 3 sec. Any damage taken will break the effect."
            },
            {
              "name": "Starshards",
              "icon": "spell_arcane_starfire",
              "school": "Discipline · Night Elf only",
              "desc": "Rains starshards down on the enemy target's head, causing 162 Arcane damage over 6 sec."
            },
            {
              "name": "Desperate Prayer",
              "icon": "spell_holy_restoration",
              "school": "Holy · Dwarf only",
              "desc": "Instantly heals the caster for 146 to 181."
            },
            {
              "name": "Divine Grace",
              "icon": "ability_priest_savinggrace",
              "school": "Holy · Human only",
              "desc": "Instantly heals a friendly target below 50% Health for 146 to 181 and removes"
            },
            {
              "name": "Resurrection",
              "icon": "spell_holy_resurrection",
              "school": "Holy",
              "desc": "Brings a dead player back to life with 70 health and 135 mana. Cannot be cast when in combat."
            },
            {
              "name": "Hex of Weakness",
              "icon": "spell_shadow_fingerofdeath",
              "school": "Shadow Magic · Troll only",
              "desc": "Weakens the target enemy, reducing melee attack power by 43 and reducing the effectiveness of any healing by 20%. Lasts 2 min."
            },
            {
              "name": "Mind Blast",
              "icon": "spell_shadow_unholyfrenzy",
              "school": "Shadow Magic",
              "desc": "Blasts the target for 40 to 44 Shadow damage, but causes a high amount of threat."
            },
            {
              "name": "Touch of Weakness",
              "icon": "spell_shadow_deadofnight",
              "school": "Shadow Magic · Undead only",
              "desc": "The next melee attack against the caster will cause 8 Shadow damage and reduce the attacker's melee attack power by 43 for 2 min."
            }
          ]
        },
        {
          "level": 12,
          "note": "",
          "spells": [
            {
              "name": "Inner Fire",
              "icon": "spell_holy_innerfire",
              "school": "Discipline",
              "desc": "A burst of Holy energy fills the caster, increasing armor by 315. Each melee or ranged damage hit against the priest will remove one charge. Lasts 10 min or until 20 charges are used."
            }
          ]
        },
        {
          "level": 14,
          "note": "",
          "spells": [
            {
              "name": "Cure Disease",
              "icon": "spell_holy_nullifydisease",
              "school": "Holy",
              "desc": "Removes 1 disease from the friendly target."
            },
            {
              "name": "Psychic Scream",
              "icon": "spell_shadow_psychicscream",
              "school": "Shadow Magic",
              "desc": "The caster lets out a psychic scream, causing 2 enemies within 8 yards to flee for 8 sec. Damage caused may interrupt the effect."
            }
          ]
        },
        {
          "level": 16,
          "note": "",
          "spells": [
            {
              "name": "Heal",
              "icon": "spell_holy_heal02",
              "school": "Holy",
              "desc": "Heal your target for 260 to 300."
            }
          ]
        },
        {
          "level": 18,
          "note": "",
          "spells": [
            {
              "name": "Dispel Magic",
              "icon": "spell_holy_dispelmagic",
              "school": "Discipline",
              "desc": "Dispels magic on the target, removing 1 harmful spells from a friend or 1 beneficial spells from an enemy."
            }
          ]
        },
        {
          "level": 20,
          "note": "",
          "spells": [
            {
              "name": "Contingency Plan",
              "icon": "ability_priest_soulwarding",
              "school": "Discipline · Gnome only",
              "desc": "Place a Holy ward on an ally for 30 sec. The next time this ally takes damage dropping their Health below 35%, they will gain a shield absorbing 155 damage and begin healing for 125 Health over 15 sec. A target may be affected by only one"
            },
            {
              "name": "Elune's Grace",
              "icon": "spell_holy_elunesgrace",
              "school": "Discipline · Night Elf only",
              "desc": "Reduces the chance you'll be hit by melee and ranged attacks by 50% for 15 sec or until you are missed 3 times."
            },
            {
              "name": "Feedback",
              "icon": "spell_shadow_ritualofsacrifice",
              "school": "Discipline · Human only",
              "desc": "The priest becomes surrounded with anti-magic energy. Any successful spell cast against the priest will burn 18 of the attacker's Mana, causing 1 Shadow damage for each point of Mana burned. Lasts 15 sec."
            },
            {
              "name": "Shackle Undead",
              "icon": "spell_nature_slow",
              "school": "Discipline",
              "desc": "Shackles the target undead enemy for up to 30 sec. The shackled unit is unable to move, attack or cast spells. Any damage caused will release the target. Only one target can be shackled at a time."
            },
            {
              "name": "Chastise",
              "icon": "spell_holy_chastise",
              "school": "Holy · Dwarf only",
              "desc": "the target, causing 43 to 49 Holy damage and immobilizing them for up to 2 sec. Only works against Humanoids. This spell causes very low threat."
            },
            {
              "name": "Fear Ward",
              "icon": "spell_holy_excorcism",
              "school": "Holy",
              "desc": "Wards the friendly target against Fear. The next Fear effect used against the target will fail, using up the ward. Lasts 3 min."
            },
            {
              "name": "Flash Heal",
              "icon": "spell_holy_flashheal",
              "school": "Holy",
              "desc": "Heals a friendly target for 184 to 223."
            },
            {
              "name": "Holy Fire",
              "icon": "spell_holy_searinglight",
              "school": "Holy",
              "desc": "Consumes the enemy in holy flames that cause 57 to 70 Holy damage and an additional 20 Holy damage over 10 sec."
            },
            {
              "name": "Holy Nova",
              "icon": "spell_holy_holynova",
              "school": "Holy",
              "desc": "Causes an explosion of holy light around the caster, causing 26 to 30 Holy damage to all enemy targets within 10 yards and healing all party members within 10 yards for 50 to 57. These effects cause no threat."
            },
            {
              "name": "Dark Sacrifice",
              "icon": "spell_holy_powerinfusion_shadow",
              "school": "Shadow Magic · Undead only",
              "desc": "Cannibalize 440 of your own Health over 15 sec to gain 528 Mana."
            },
            {
              "name": "Devouring Plague",
              "icon": "spell_shadow_devouringplague",
              "school": "Shadow Magic",
              "desc": "Afflicts the target with a disease that causes 128 Shadow damage over 24 sec. Damage caused by the"
            },
            {
              "name": "Mind Flay",
              "icon": "spell_shadow_siphonmana",
              "school": "Shadow Magic",
              "desc": "Assault the target's mind with Shadow energy, causing 63 Shadow damage over 3 sec and slowing their movement speed by 50%."
            },
            {
              "name": "Mind Soothe",
              "icon": "spell_holy_mindsooth",
              "school": "Shadow Magic",
              "desc": "Soothes the target, reducing the range at which it will attack you by 10 yards. Only affects Humanoid targets level 40 or lower. Lasts 15 sec."
            },
            {
              "name": "Shadowguard",
              "icon": "spell_nature_lightningshield",
              "school": "Shadow Magic · Troll only",
              "desc": "The caster is surrounded by shadows. When a spell, melee or ranged attack hits the caster, the attacker will be struck for 13 Shadow damage. Attackers can only be damaged once every few seconds. This damage causes no threat. 3 charges. Lasts 10 min."
            }
          ]
        },
        {
          "level": 22,
          "note": "",
          "spells": [
            {
              "name": "Mind Vision",
              "icon": "spell_holy_mindvision",
              "school": "Shadow Magic",
              "desc": "Allows the caster to see through the target's eyes for 1 min."
            }
          ]
        },
        {
          "level": 24,
          "note": "",
          "spells": [
            {
              "name": "Mana Burn",
              "icon": "spell_shadow_manaburn",
              "school": "Discipline",
              "desc": "Drains 199 to 210 mana from a target. For each mana drained in this way, the target takes 0.5 Shadow damage."
            }
          ]
        },
        {
          "level": 25,
          "note": "",
          "spells": [
            {
              "name": "Binding Heal",
              "icon": "spell_holy_blindingheal",
              "school": "Holy",
              "desc": "Heals a friendly target and the caster for 236 to 284. Low threat."
            }
          ]
        },
        {
          "level": 30,
          "note": "",
          "spells": [
            {
              "name": "Divine Spirit",
              "icon": "spell_holy_divinespirit",
              "school": "Discipline",
              "desc": "Holy power infuses the target, increasing their Spirit by 17 for 1 hr."
            },
            {
              "name": "Penance",
              "icon": "spell_holy_penance",
              "school": "Discipline",
              "desc": "Launches a volley of holy light at the target, causing 45 Holy damage to an enemy, or 134 healing to an ally, instantly and every 1 sec for 2 sec."
            },
            {
              "name": "Prayer of Healing",
              "icon": "spell_holy_prayerofhealing02",
              "school": "Holy",
              "desc": "A powerful prayer that heals the target and their party for 179 to 191. Party members must be within 40 yards of target."
            },
            {
              "name": "Mind Control",
              "icon": "spell_shadow_shadowworddominate",
              "school": "Shadow Magic",
              "desc": "Controls a humanoid mind up to level 44, but increases the time between its attacks by 25%. Lasts up to 1 min."
            },
            {
              "name": "Shadow Protection",
              "icon": "spell_shadow_antishadow",
              "school": "Shadow Magic",
              "desc": "Increases the target's resistance to Shadow spells by 30 for 10 min."
            }
          ]
        },
        {
          "level": 32,
          "note": "",
          "spells": [
            {
              "name": "Abolish Disease",
              "icon": "spell_nature_nullifydisease",
              "school": "Holy",
              "desc": "Attempts to cure 1 disease effect on the target, and 1 more disease effect every 5 seconds for 20 sec."
            },
            {
              "name": "Shadow Word: Death",
              "icon": "spell_shadow_demonicfortitude",
              "school": "Shadow Magic",
              "desc": "A word of dark binding that inflicts 294 to 311 Shadow damage to the target. If your target is not killed by"
            }
          ]
        },
        {
          "level": 34,
          "note": "",
          "spells": [
            {
              "name": "Levitate",
              "icon": "spell_holy_layonhands",
              "school": "Discipline",
              "desc": "Allows the caster to levitate, floating a few feet above the ground. While levitating, you will fall at a reduced speed and travel over water-like surfaces. Mounting or any damage taken will cancel the effect. Lasts 2 min."
            }
          ]
        },
        {
          "level": 40,
          "note": "",
          "spells": [
            {
              "name": "Greater Heal",
              "icon": "spell_holy_greaterheal",
              "school": "Holy",
              "desc": "A slow casting spell that heals a single target for 819 to 920."
            },
            {
              "name": "Lightwell",
              "icon": "spell_holy_summonlightwell",
              "school": "Holy",
              "desc": "Creates a holy"
            },
            {
              "name": "Lightwell Renew",
              "icon": "spell_holy_summonlightwell",
              "school": "Holy",
              "desc": ""
            },
            {
              "name": "Prayer of Mending",
              "icon": "spell_holy_prayerofmendingtga",
              "school": "Holy",
              "desc": "Places a spell on the target that heals them for 172 the next time they take damage or receive non-periodic healing. When the heal occurs,"
            }
          ]
        },
        {
          "level": 48,
          "note": "",
          "spells": [
            {
              "name": "Prayer of Fortitude",
              "icon": "spell_holy_prayeroffortitude",
              "school": "Discipline",
              "desc": "Power infuses all party and raid members, increasing their Stamina by 56 for 1 hr."
            }
          ]
        },
        {
          "level": 56,
          "note": "",
          "spells": [
            {
              "name": "Prayer of Shadow Protection",
              "icon": "spell_holy_prayerofshadowprotection",
              "school": "Shadow Magic",
              "desc": "Power infuses all party and raid members, increasing their Shadow resistance by 60 for 20 min."
            }
          ]
        },
        {
          "level": 60,
          "note": "",
          "spells": [
            {
              "name": "Prayer of Spirit",
              "icon": "spell_holy_prayerofspirit",
              "school": "Discipline",
              "desc": "Power infuses all party and raid members, increasing their Spirit by 40 for 1 hr."
            }
          ]
        }
      ]
    },
    "druid": {
      "classId": "druid",
      "levels": [
        {
          "level": 1,
          "note": "Your character starts with these",
          "spells": [
            {
              "name": "Wrath",
              "icon": "spell_nature_abolishmagic",
              "school": "Balance",
              "desc": "Causes 15 to 17 Nature damage to the target."
            },
            {
              "name": "Healing Touch",
              "icon": "spell_nature_healingtouch",
              "school": "Restoration",
              "desc": "Heals a friendly target for 40 to 54."
            },
            {
              "name": "Mark of the Wild",
              "icon": "spell_nature_regeneration",
              "school": "Restoration",
              "desc": "Increases the friendly target's armor by 34 for 1 hr."
            }
          ]
        },
        {
          "level": 4,
          "note": "",
          "spells": [
            {
              "name": "Moonfire",
              "icon": "spell_nature_starfall",
              "school": "Balance",
              "desc": "Burns the enemy for 10 to 12 Arcane damage and then an additional 12 Arcane damage over 9 sec."
            },
            {
              "name": "Rejuvenation",
              "icon": "spell_nature_rejuvenation",
              "school": "Restoration",
              "desc": "Heals the target for 32 over 12 sec."
            }
          ]
        },
        {
          "level": 6,
          "note": "",
          "spells": [
            {
              "name": "Thorns",
              "icon": "spell_nature_thorns",
              "school": "Balance",
              "desc": "sprout from the friendly target causing 3 Nature damage to attackers when hit. Lasts 10 min."
            }
          ]
        },
        {
          "level": 8,
          "note": "",
          "spells": [
            {
              "name": "Entangling Roots",
              "icon": "spell_nature_stranglevines",
              "school": "Balance",
              "desc": "Roots the target in place and causes 20 Nature damage over 12 sec. Damage caused may interrupt the effect. You may only have 1 target Rooted at a time."
            }
          ]
        },
        {
          "level": 10,
          "note": "",
          "spells": [
            {
              "name": "Nature's Grasp",
              "icon": "spell_nature_natureswrath",
              "school": "Balance",
              "desc": "The next 1 melee attacks that strike the caster will afflict the attacker with"
            },
            {
              "name": "Teleport: Moonglade",
              "icon": "spell_arcane_teleportmoonglade",
              "school": "Balance",
              "desc": "Teleports the caster to the Moonglade."
            },
            {
              "name": "Bear Form",
              "icon": "ability_racial_bearform",
              "school": "Feral Combat",
              "desc": "Shapeshift into"
            },
            {
              "name": "Demoralizing Roar",
              "icon": "ability_druid_demoralizingroar",
              "school": "Feral Combat",
              "desc": "The druid roars, decreasing nearby enemies' melee attack power by 56. Lasts 30 sec. Requires"
            },
            {
              "name": "Growl",
              "icon": "ability_physical_taunt",
              "school": "Feral Combat",
              "desc": "Taunts the target to attack you, but has no effect if the target is already attacking you. Requires"
            },
            {
              "name": "Maul",
              "icon": "ability_druid_maul",
              "school": "Feral Combat",
              "desc": "Increases the druid's next attack by 18 damage. Requires"
            }
          ]
        },
        {
          "level": 12,
          "note": "",
          "spells": [
            {
              "name": "Enrage",
              "icon": "ability_druid_enrage",
              "school": "Feral Combat",
              "desc": "Instantly generates 10 Rage and another 20 Rage over 10 sec, but reduces base armor by 27% in"
            },
            {
              "name": "Regrowth",
              "icon": "spell_nature_resistnature",
              "school": "Restoration",
              "desc": "Heals a friendly target for 89 to 103 and another 91 over 21 sec."
            },
            {
              "name": "Revive",
              "icon": "ability_druid_lunarguidance",
              "school": "Restoration",
              "desc": "Brings a dead player back to life with 70 health and 135 mana. Cannot be cast when in combat."
            }
          ]
        },
        {
          "level": 14,
          "note": "",
          "spells": [
            {
              "name": "Bash",
              "icon": "ability_druid_bash",
              "school": "Feral Combat",
              "desc": "Stuns the target for 2 sec. Requires"
            },
            {
              "name": "Cure Poison",
              "icon": "spell_nature_nullifypoison",
              "school": "Restoration",
              "desc": "Cures 1 poison effects on the target."
            }
          ]
        },
        {
          "level": 16,
          "note": "",
          "spells": [
            {
              "name": "Aquatic Form",
              "icon": "ability_druid_aquaticform",
              "school": "Feral Combat",
              "desc": "Shapeshift into"
            },
            {
              "name": "Swipe",
              "icon": "inv_misc_monsterclaw_03",
              "school": "Feral Combat",
              "desc": "3 nearby enemies, inflicting 18 damage. Requires"
            }
          ]
        },
        {
          "level": 18,
          "note": "",
          "spells": [
            {
              "name": "Faerie Fire",
              "icon": "spell_nature_faeriefire",
              "school": "Balance",
              "desc": "Decrease the armor of the target by 175 for 40 sec. While affected, the target cannot stealth or turn invisible."
            },
            {
              "name": "Hibernate",
              "icon": "spell_nature_sleep",
              "school": "Balance",
              "desc": "Forces the enemy target to sleep for up to 20 sec. Any damage will awaken the target. Only one target can be forced to hibernate at a time. Only works on Beasts and Dragonkin."
            }
          ]
        },
        {
          "level": 20,
          "note": "",
          "spells": [
            {
              "name": "Omen of Clarity",
              "icon": "spell_nature_crystalball",
              "school": "Balance",
              "desc": "Your spells and attacks have a chance to grant you"
            },
            {
              "name": "Starfire",
              "icon": "spell_arcane_starfire",
              "school": "Balance",
              "desc": "Causes 79 to 96 Arcane damage to the target."
            },
            {
              "name": "Cat Form",
              "icon": "ability_druid_catform",
              "school": "Feral Combat",
              "desc": "Shapeshift into"
            },
            {
              "name": "Claw",
              "icon": "ability_druid_rake",
              "school": "Feral Combat",
              "desc": "the enemy for 110% normal damage plus 27. Awards 1 combo points. Requires"
            },
            {
              "name": "Prowl",
              "icon": "ability_ambush",
              "school": "Feral Combat",
              "desc": "Allows the Druid to prowl around, but reduces your movement speed by 40%. Lasts until cancelled. Requires"
            },
            {
              "name": "Rip",
              "icon": "ability_ghoulfrenzy",
              "school": "Feral Combat",
              "desc": "Finishing move that causes damage over time. Damage increases per combo point and by your Attack Power: 1 point : 44 damage over 12 sec. 2 points: 71 damage over 12 sec. 3 points: 97 damage over 12 sec. 4 points: 124 damage over 12 sec. 5 points: 150 damage over 12 sec. Requires"
            },
            {
              "name": "Shred",
              "icon": "spell_shadow_vampiricaura",
              "school": "Feral Combat",
              "desc": "the target, causing 155% damage plus 22 to the target. Must be behind the target. Awards 1 combo points. Requires"
            },
            {
              "name": "Rebirth",
              "icon": "spell_nature_reincarnation",
              "school": "Restoration",
              "desc": "Returns the spirit to the body, restoring a dead target to life with 400 health and 700 mana."
            }
          ]
        },
        {
          "level": 22,
          "note": "",
          "spells": [
            {
              "name": "Soothe Animal",
              "icon": "ability_hunter_beastsoothe",
              "school": "Balance",
              "desc": "Soothes the target beast, reducing the range at which it will attack you by 10 yards. Only affects Beast targets level 40 or lower. Lasts 15 sec."
            }
          ]
        },
        {
          "level": 24,
          "note": "",
          "spells": [
            {
              "name": "Rake",
              "icon": "ability_druid_disembowel",
              "school": "Feral Combat",
              "desc": "the target for 23 damage and an additional 48 damage over 9 sec. Awards 1 combo points. Requires"
            },
            {
              "name": "Remove Curse",
              "icon": "spell_holy_removecurse",
              "school": "Restoration",
              "desc": "Dispels 1 Curse or"
            }
          ]
        },
        {
          "level": 25,
          "note": "",
          "spells": [
            {
              "name": "Insect Swarm",
              "icon": "spell_nature_insectswarm",
              "school": "Balance",
              "desc": "The enemy target is swarmed by insects, decreasing their chance to hit with attacks by 2% and causing 48 Nature damage over 12 sec."
            },
            {
              "name": "Primal Bite",
              "icon": "ability_racial_cannibalize",
              "school": "Feral Combat",
              "desc": "the target, dealing 100% normal damage plus 26 and generating a high amount of threat. Requires"
            }
          ]
        },
        {
          "level": 26,
          "note": "",
          "spells": [
            {
              "name": "Dash",
              "icon": "ability_druid_dash",
              "school": "Feral Combat",
              "desc": "Increases movement speed by 50% for 15 sec. Does not break prowling. Requires"
            },
            {
              "name": "Abolish Poison",
              "icon": "spell_nature_nullifypoison_02",
              "school": "Restoration",
              "desc": "Attempts to cure 1 poison effect on the target, and 1 more poison effect every 2 seconds for 8 sec."
            }
          ]
        },
        {
          "level": 28,
          "note": "",
          "spells": [
            {
              "name": "Challenging Roar",
              "icon": "ability_druid_challangingroar",
              "school": "Feral Combat",
              "desc": "Forces all nearby enemies to focus attacks on you for 6 sec. Requires"
            },
            {
              "name": "Cower",
              "icon": "ability_druid_cower",
              "school": "Feral Combat",
              "desc": ", causing no damage but lowering your threat a small amount, making the enemy less likely to attack you. Requires"
            }
          ]
        },
        {
          "level": 30,
          "note": "",
          "spells": [
            {
              "name": "Travel Form",
              "icon": "ability_druid_travelform",
              "school": "Feral Combat",
              "desc": "Shapeshift into"
            },
            {
              "name": "Tranquility",
              "icon": "spell_nature_tranquility",
              "school": "Restoration",
              "desc": "Regenerates all nearby party members within 20 yards for 91 every 2 sec for 10 sec. Druid must channel to maintain the spell."
            }
          ]
        },
        {
          "level": 32,
          "note": "",
          "spells": [
            {
              "name": "Ferocious Bite",
              "icon": "ability_druid_ferociousbite",
              "school": "Feral Combat",
              "desc": "Finishing move that causes damage per combo point and converts each extra point of energy into 1.0 additional damage. Damage is increased by your Attack Power. 1 point : 50-66 damage 2 points: 86-102 damage 3 points: 122-138 damage 4 points: 158-174 damage 5 points: 194-210 damage Requires"
            },
            {
              "name": "Ravage",
              "icon": "ability_druid_ravage",
              "school": "Feral Combat",
              "desc": "the target, causing 350% damage plus 147 to the target. Must be prowling and behind the target. Awards 1 combo points. Requires"
            },
            {
              "name": "Track Humanoids",
              "icon": "ability_tracking",
              "school": "Feral Combat",
              "desc": "Shows the location of all nearby humanoids on the minimap. Only one type of thing can be tracked at a time. Requires"
            }
          ]
        },
        {
          "level": 36,
          "note": "",
          "spells": [
            {
              "name": "Pounce",
              "icon": "ability_druid_supriseattack",
              "school": "Feral Combat",
              "desc": ", stunning the target for 2 sec and causing 90 damage over 18 sec. Must be prowling and behind the target. Awards 1 combo points. Requires"
            }
          ]
        },
        {
          "level": 40,
          "note": "",
          "spells": [
            {
              "name": "Hurricane",
              "icon": "spell_nature_cyclone",
              "school": "Balance",
              "desc": "Creates a violent storm in the target area causing 69 Nature damage to enemies every 1 sec, and increasing the time between attacks of enemies by 20%. Lasts 10 sec. Druid must channel to maintain the spell."
            },
            {
              "name": "Dire Bear Form",
              "icon": "ability_racial_bearform",
              "school": "Feral Combat",
              "desc": "Shapeshift into"
            },
            {
              "name": "Feline Grace",
              "icon": "inv_feather_01",
              "school": "Feral Combat",
              "desc": "Reduces damage from falling."
            },
            {
              "name": "Innervate",
              "icon": "spell_nature_lightning",
              "school": "Restoration",
              "desc": "Increases the target's Mana regeneration by 400% and allows 100% of the target's Mana regeneration to continue while casting. Lasts 20 sec."
            },
            {
              "name": "Wild Growth",
              "icon": "ability_druid_flourish",
              "school": "Restoration",
              "desc": "Heals the target and their party for 336 over 7 sec. Party members must be within 43.5 yards of target. The amount healed is applied quickly at first, and slows down as"
            }
          ]
        },
        {
          "level": 42,
          "note": "",
          "spells": [
            {
              "name": "Lacerate",
              "icon": "ability_druid_lacerate",
              "school": "Feral Combat",
              "desc": "Lacerates the enemy target, making them bleed for 50 damage over 15 sec plus 10% weapon damage per existing application of"
            }
          ]
        },
        {
          "level": 44,
          "note": "",
          "spells": [
            {
              "name": "Barkskin",
              "icon": "spell_nature_stoneclawtotem",
              "school": "Balance",
              "desc": "Your skin becomes as tough as bark. Physical damage taken is reduced by 20%. While you are protected, damaging attacks will not cause spellcasting delays. Lasts 15 sec."
            }
          ]
        },
        {
          "level": 50,
          "note": "",
          "spells": [
            {
              "name": "Gift of the Wild",
              "icon": "spell_nature_regeneration",
              "school": "Restoration",
              "desc": "Gives the"
            }
          ]
        }
      ]
    },
    "rogue": {
      "classId": "rogue",
      "levels": [
        {
          "level": 1,
          "note": "Your character starts with these",
          "spells": [
            {
              "name": "Eviscerate",
              "icon": "ability_rogue_eviscerate",
              "school": "Assassination",
              "desc": "Finishing move that causes damage per combo point, increased by Attack Power: 1 point : 6-10 damage 2 points: 11-15 damage 3 points: 16-20 damage 4 points: 21-25 damage 5 points: 26-30 damage Requires Melee Weapon"
            },
            {
              "name": "Sinister Strike",
              "icon": "spell_shadow_ritualofsacrifice",
              "school": "Combat",
              "desc": "An instant strike that causes 3 damage in addition to your normal weapon damage. Awards 1 combo points. Requires Melee Weapon"
            },
            {
              "name": "Stealth",
              "icon": "ability_stealth",
              "school": "Subtlety",
              "desc": "Allows the rogue to sneak around, but reduces your speed by 50%. Lasts until cancelled."
            },
            {
              "name": "Pick Lock",
              "icon": "spell_nature_moonkey",
              "school": "Lockpicking",
              "desc": "Allows opening of locked chests and doors."
            }
          ]
        },
        {
          "level": 4,
          "note": "",
          "spells": [
            {
              "name": "Backstab",
              "icon": "ability_backstab",
              "school": "Combat",
              "desc": "the target, causing 150% weapon damage plus 10 to the target. Must be behind the target. Requires a dagger in the main hand. Awards 1 combo points. Requires Daggers"
            },
            {
              "name": "Pick Pocket",
              "icon": "inv_misc_bag_11",
              "school": "Subtlety",
              "desc": "Pick the target's pocket. Requires"
            }
          ]
        },
        {
          "level": 6,
          "note": "",
          "spells": [
            {
              "name": "Gouge",
              "icon": "ability_gouge",
              "school": "Combat",
              "desc": "Causes 10 damage, stops your attack, and incapacitates the target for 4 sec. The target must be facing you. Any damage taken will break the effect. Awards 1 combo points. Requires Melee Weapon"
            }
          ]
        },
        {
          "level": 8,
          "note": "",
          "spells": [
            {
              "name": "Evasion",
              "icon": "spell_shadow_shadowward",
              "school": "Combat",
              "desc": "The rogue's dodge chance will increase by 50% for 15 sec."
            }
          ]
        },
        {
          "level": 10,
          "note": "",
          "spells": [
            {
              "name": "Slice and Dice",
              "icon": "ability_rogue_slicedice",
              "school": "Assassination",
              "desc": "Finishing move that increases melee attack speed by 20%. Lasts longer per combo point: 1 point : 9 seconds 2 points: 12 seconds 3 points: 15 seconds 4 points: 18 seconds 5 points: 21 seconds"
            },
            {
              "name": "Sprint",
              "icon": "ability_rogue_sprint",
              "school": "Combat",
              "desc": "Increases the rogue's movement speed by 50% for 15 sec. Does not break stealth."
            },
            {
              "name": "Sap",
              "icon": "ability_sap",
              "school": "Subtlety",
              "desc": "Incapacitates the target for up to 25 sec. Only works on Humanoids that are not in combat. Any damage taken will break the effect. Only 1 target may be sapped at a time. Does not break"
            }
          ]
        },
        {
          "level": 12,
          "note": "",
          "spells": [
            {
              "name": "Kick",
              "icon": "ability_kick",
              "school": "Combat",
              "desc": "A quick kick that injures a single foe for 15 damage. It also interrupts spellcasting and prevents any spell in that school from being cast for 5 sec."
            }
          ]
        },
        {
          "level": 14,
          "note": "",
          "spells": [
            {
              "name": "Expose Armor",
              "icon": "ability_warrior_riposte",
              "school": "Assassination",
              "desc": "Finishing move that exposes the target for 30 sec, reducing Armor per combo point: 1 point : 90 Armor 2 points: 180 Armor 3 points: 270 Armor 4 points: 360 Armor 5 points: 450 Armor Requires Melee Weapon"
            },
            {
              "name": "Garrote",
              "icon": "ability_rogue_garrote",
              "school": "Assassination",
              "desc": "the enemy, causing 144 damage over 18 sec, increased by your Attack Power. Must be stealthed and behind the target. Awards 1 combo points. Requires"
            }
          ]
        },
        {
          "level": 16,
          "note": "",
          "spells": [
            {
              "name": "Feint",
              "icon": "ability_rogue_feint",
              "school": "Combat",
              "desc": "Performs a feint, causing no damage but lowering your threat by a small amount, making the enemy less likely to attack you."
            }
          ]
        },
        {
          "level": 18,
          "note": "",
          "spells": [
            {
              "name": "Ambush",
              "icon": "ability_rogue_ambush",
              "school": "Assassination",
              "desc": "the target, causing 250% weapon damage plus 70 to the target. Must be stealthed and behind the target. Requires a dagger in the main hand. Awards 1 combo points. Requires Daggers Requires"
            }
          ]
        },
        {
          "level": 20,
          "note": "",
          "spells": [
            {
              "name": "Rupture",
              "icon": "ability_rogue_rupture",
              "school": "Assassination",
              "desc": "Finishing move that causes damage over time, increased by your Attack Power. Lasts longer per combo point: 1 point : 25 damage over 8 secs 2 points: 37 damage over 10 secs 3 points: 51 damage over 12 secs 4 points: 68 damage over 14 secs 5 points: 87 damage over 16 secs Requires Melee Weapon"
            },
            {
              "name": "Crippling Poison",
              "icon": "ability_poisonsting",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 30% chance of poisoning the enemy, slowing their movement speed by 50% for 12 sec."
            },
            {
              "name": "Instant Poison",
              "icon": "ability_poisons",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 20% chance of poisoning the enemy which instantly inflicts 13 to 17 Nature damage. 60 charges."
            },
            {
              "name": "Poisons",
              "icon": "trade_brewpoison",
              "school": "Poisons",
              "desc": "You can create and mix poisons, with both found and storebought ingredients."
            }
          ]
        },
        {
          "level": 22,
          "note": "",
          "spells": [
            {
              "name": "Distract",
              "icon": "ability_rogue_distract",
              "school": "Subtlety",
              "desc": "Throws a distraction, attracting the attention of all nearby enemies and reducing their"
            },
            {
              "name": "Vanish",
              "icon": "ability_vanish",
              "school": "Subtlety",
              "desc": "Allows the rogue to vanish from sight, entering an improved stealth mode for 10 sec. Also breaks movement impairing effects."
            }
          ]
        },
        {
          "level": 24,
          "note": "",
          "spells": [
            {
              "name": "Detect Traps",
              "icon": "ability_spy",
              "school": "Subtlety",
              "desc": "Greatly increased chance to detect traps."
            },
            {
              "name": "Mind-numbing Poison",
              "icon": "spell_nature_nullifydisease",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 20% chance of poisoning the enemy, increasing their casting time by 40% for 10 sec. 75 charges."
            }
          ]
        },
        {
          "level": 26,
          "note": "",
          "spells": [
            {
              "name": "Cheap Shot",
              "icon": "ability_cheapshot",
              "school": "Assassination",
              "desc": "Stuns the target for 4 sec. Must be stealthed. Awards 2 combo points. Requires Melee Weapon Requires"
            }
          ]
        },
        {
          "level": 28,
          "note": "",
          "spells": [
            {
              "name": "Instant Poison II",
              "icon": "ability_poisons",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 20% chance of poisoning the enemy which instantly inflicts 20 to 26 Nature damage. 85 charges."
            }
          ]
        },
        {
          "level": 30,
          "note": "",
          "spells": [
            {
              "name": "Kidney Shot",
              "icon": "ability_rogue_kidneyshot",
              "school": "Assassination",
              "desc": "Finishing move that stuns the target. Lasts longer per combo point: 1 point : 1 second 2 points: 2 seconds 3 points: 3 seconds 4 points: 4 seconds 5 points: 5 seconds Requires Melee Weapon"
            },
            {
              "name": "Mutilate",
              "icon": "ability_rogue_deadlybrew",
              "school": "Assassination",
              "desc": "Instantly attacks with both weapons for 75% weapon damage plus an additional 17 with each weapon. Damage increased by 20% against Poisoned targets. Awards 2 Combo Points. Requires Daggers"
            },
            {
              "name": "Disarm Trap",
              "icon": "spell_shadow_grimward",
              "school": "Subtlety",
              "desc": "Sneak up on the trap in order to disarm it. Don't get too close or the trap will go off."
            },
            {
              "name": "Deadly Poison",
              "icon": "ability_rogue_dualweild",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 30% chance of poisoning the enemy for 24 Nature damage over 12 sec. Stacks up to 5 times on a single target. 90 charges."
            }
          ]
        },
        {
          "level": 32,
          "note": "",
          "spells": [
            {
              "name": "Wound Poison",
              "icon": "inv_misc_herb_16",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 30% chance of poisoning the enemy, reducing all healing effects used on them by 67 for 15 sec. Stacks up to 5 times on a single target. 90 charges."
            }
          ]
        },
        {
          "level": 34,
          "note": "",
          "spells": [
            {
              "name": "Blind",
              "icon": "spell_shadow_mindsteal",
              "school": "Subtlety",
              "desc": "Blinds the target, causing it to wander disoriented for up to 10 sec. Any damage caused will remove the effect."
            },
            {
              "name": "Blinding Powder",
              "icon": "inv_misc_ammo_gunpowder_02",
              "school": "Poisons",
              "desc": "Create the reagent for the"
            }
          ]
        },
        {
          "level": 36,
          "note": "",
          "spells": [
            {
              "name": "Instant Poison III",
              "icon": "ability_poisons",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 20% chance of poisoning the enemy which instantly inflicts 29 to 37 Nature damage. 105 charges."
            }
          ]
        },
        {
          "level": 38,
          "note": "",
          "spells": [
            {
              "name": "Deadly Poison II",
              "icon": "ability_rogue_dualweild",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 30% chance of poisoning the enemy for 36 Nature damage over 12 sec. Stacks up to 5 times on a single target. 115 charges."
            },
            {
              "name": "Mind-numbing Poison II",
              "icon": "spell_nature_nullifydisease",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 20% chance of poisoning the enemy, increasing their casting time by 50% for 12 sec. 115 charges."
            }
          ]
        },
        {
          "level": 40,
          "note": "",
          "spells": [
            {
              "name": "Safe Fall",
              "icon": "inv_feather_01",
              "school": "Subtlety",
              "desc": "Reduces damage from falling."
            },
            {
              "name": "Wound Poison II",
              "icon": "inv_misc_herb_16",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 30% chance of poisoning the enemy, reducing all healing effects used on them by 92 for 15 sec. Stacks up to 5 times on a single target. 115 charges."
            }
          ]
        },
        {
          "level": 44,
          "note": "",
          "spells": [
            {
              "name": "Instant Poison IV",
              "icon": "ability_poisons",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 20% chance of poisoning the enemy which instantly inflicts 45 to 57 Nature damage. 1800 charges."
            }
          ]
        },
        {
          "level": 46,
          "note": "",
          "spells": [
            {
              "name": "Deadly Poison III",
              "icon": "ability_rogue_dualweild",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 30% chance of poisoning the enemy for 56 Nature damage over 12 sec. Stacks up to 5 times on a single target. 135 charges."
            }
          ]
        },
        {
          "level": 48,
          "note": "",
          "spells": [
            {
              "name": "Wound Poison III",
              "icon": "inv_misc_herb_16",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 30% chance of poisoning the enemy, reducing all healing effects used on them by 128 for 15 sec. Stacks up to 5 times on a single target. 135 charges."
            }
          ]
        },
        {
          "level": 50,
          "note": "",
          "spells": [
            {
              "name": "Crippling Poison II",
              "icon": "ability_poisonsting",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 30% chance of poisoning the enemy, slowing their movement speed by 70% for 12 sec."
            }
          ]
        },
        {
          "level": 52,
          "note": "",
          "spells": [
            {
              "name": "Instant Poison V",
              "icon": "ability_poisons",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 20% chance of poisoning the enemy which instantly inflicts 62 to 80 Nature damage. 150 charges."
            },
            {
              "name": "Mind-numbing Poison III",
              "icon": "spell_nature_nullifydisease",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 20% chance of poisoning the enemy, increasing their casting time by 60% for 14 sec. 150 charges."
            }
          ]
        },
        {
          "level": 54,
          "note": "",
          "spells": [
            {
              "name": "Deadly Poison IV",
              "icon": "ability_rogue_dualweild",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 30% chance of poisoning the enemy for 72 Nature damage over 12 sec. Stacks up to 5 times on a single target. 160 charges."
            }
          ]
        },
        {
          "level": 56,
          "note": "",
          "spells": [
            {
              "name": "Wound Poison IV",
              "icon": "inv_misc_herb_16",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 30% chance of poisoning the enemy, reducing all healing effects used on them by 165 for 15 sec. Stacks up to 5 times on a single target. 160 charges."
            }
          ]
        },
        {
          "level": 60,
          "note": "",
          "spells": [
            {
              "name": "Deadly Poison V",
              "icon": "ability_rogue_dualweild",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 30% chance of poisoning the enemy for 92 Nature damage over 12 sec. Stacks up to 5 times on a single target. 180 charges."
            },
            {
              "name": "Instant Poison VI",
              "icon": "ability_poisons",
              "school": "Poisons",
              "desc": "Coats a weapon with poison that lasts for 30 minutes. Each strike has a 20% chance of poisoning the enemy which instantly inflicts 76 to 100 Nature damage. 175 charges."
            }
          ]
        }
      ]
    }
  },
  "milestones": {
    "hunter": [
      {
        "bracket": "1–10",
        "title": "Starting Out & Core Identity",
        "universal": [
          "First weapon upgrade from starter zone quests or weapon vendor",
          "Learn first core class mechanics at Level 4, 6, 8, and 10 from Class Trainer",
          "Level 10: Unlock first Talent Point and Class Quest (Hunter Pet Taming, Shaman Earth Totem, Druid Bear Form, Warlock Voidwalker, Paladin Redemption, Warrior Defensive Stance)"
        ]
      },
      {
        "bracket": "11–20",
        "title": "First Dungeons & Core Specialization",
        "universal": [
          "Level 14–16: First instanced dungeon runs (Ragefire Chasm, Deadmines, Wailing Caverns)",
          "Level 18–20: Second class quest milestone (Druid Aquatic Form, Shaman Fire Totem, Warlock Succubus)",
          "Level 20: 11-point milestone talent unlocked in your primary tree"
        ]
      },
      {
        "bracket": "21–30",
        "title": "Mid-Game Powers & Forever Legacy System",
        "universal": [
          "Level 20: Legacy System activates! Begin tracking account-wide milestone perks",
          "Level 20–24: Dungeon progression in Blackfathom Deeps, Shadowfang Keep, and Stockade",
          "Level 28–30: Shaman Water Totem quest chain, Warlock Felhunter, Warrior Whirlwind Axe chain prep",
          "Level 30: 21-point major capstone talent unlocked in Beta Build 70425 cap"
        ]
      },
      {
        "bracket": "31–40",
        "title": "Mount Speed, Dual Spec & Scarlet Monastery",
        "universal": [
          "Level 32–36: Scarlet Monastery (Graveyard, Library, Armory, Cathedral) and Gnomeregan",
          "Level 40: Apprentice Riding and 60% Mount unlock (gold savings priority)",
          "Level 40: Dual Specialization unlock from Class Trainer (swap specs anywhere outside combat)",
          "Level 40: Armor proficiency upgrades: Mail for Warriors/Paladins; Leather to Mail for Hunters/Shamans; Plate readiness"
        ]
      },
      {
        "bracket": "41–50",
        "title": "Deep Wilderness & Mid-Tier Dungeons",
        "universal": [
          "Level 42–46: Zul'Farrak and Maraudon wings (quest chains provide top-tier weapon and trinket upgrades)",
          "Level 45: 31-point ultimate talent unlocked in your main talent tree",
          "Level 48–50: Sunken Temple (Temple of Atal'Hakkar) and custom Forever excavation dungeons"
        ]
      },
      {
        "bracket": "51–60",
        "title": "The Road to Endgame & Raid Attunements",
        "universal": [
          "Level 52–58: Blackrock Depths (BRD), Scholomance, and Stratholme (Living & Undead sides)",
          "Level 55: Level 50+ epic class quest from class trainers for unique rare/epic gear",
          "Level 58–60: Complete Onyxia Attunement, Molten Core douse/Hydraxian Waterlords quests, and Barrow Deeps 10M keys",
          "Level 60: Journeyman Riding (100% Epic Mount) and Phase 1 Pre-Raid BiS farming"
        ]
      }
    ],
    "shaman": [
      {
        "bracket": "1–10",
        "title": "Starting Out & Core Identity",
        "universal": [
          "First weapon upgrade from starter zone quests or weapon vendor",
          "Learn first core class mechanics at Level 4, 6, 8, and 10 from Class Trainer",
          "Level 10: Unlock first Talent Point and Class Quest (Hunter Pet Taming, Shaman Earth Totem, Druid Bear Form, Warlock Voidwalker, Paladin Redemption, Warrior Defensive Stance)"
        ]
      },
      {
        "bracket": "11–20",
        "title": "First Dungeons & Core Specialization",
        "universal": [
          "Level 14–16: First instanced dungeon runs (Ragefire Chasm, Deadmines, Wailing Caverns)",
          "Level 18–20: Second class quest milestone (Druid Aquatic Form, Shaman Fire Totem, Warlock Succubus)",
          "Level 20: 11-point milestone talent unlocked in your primary tree"
        ]
      },
      {
        "bracket": "21–30",
        "title": "Mid-Game Powers & Forever Legacy System",
        "universal": [
          "Level 20: Legacy System activates! Begin tracking account-wide milestone perks",
          "Level 20–24: Dungeon progression in Blackfathom Deeps, Shadowfang Keep, and Stockade",
          "Level 28–30: Shaman Water Totem quest chain, Warlock Felhunter, Warrior Whirlwind Axe chain prep",
          "Level 30: 21-point major capstone talent unlocked in Beta Build 70425 cap"
        ]
      },
      {
        "bracket": "31–40",
        "title": "Mount Speed, Dual Spec & Scarlet Monastery",
        "universal": [
          "Level 32–36: Scarlet Monastery (Graveyard, Library, Armory, Cathedral) and Gnomeregan",
          "Level 40: Apprentice Riding and 60% Mount unlock (gold savings priority)",
          "Level 40: Dual Specialization unlock from Class Trainer (swap specs anywhere outside combat)",
          "Level 40: Armor proficiency upgrades: Mail for Warriors/Paladins; Leather to Mail for Hunters/Shamans; Plate readiness"
        ]
      },
      {
        "bracket": "41–50",
        "title": "Deep Wilderness & Mid-Tier Dungeons",
        "universal": [
          "Level 42–46: Zul'Farrak and Maraudon wings (quest chains provide top-tier weapon and trinket upgrades)",
          "Level 45: 31-point ultimate talent unlocked in your main talent tree",
          "Level 48–50: Sunken Temple (Temple of Atal'Hakkar) and custom Forever excavation dungeons"
        ]
      },
      {
        "bracket": "51–60",
        "title": "The Road to Endgame & Raid Attunements",
        "universal": [
          "Level 52–58: Blackrock Depths (BRD), Scholomance, and Stratholme (Living & Undead sides)",
          "Level 55: Level 50+ epic class quest from class trainers for unique rare/epic gear",
          "Level 58–60: Complete Onyxia Attunement, Molten Core douse/Hydraxian Waterlords quests, and Barrow Deeps 10M keys",
          "Level 60: Journeyman Riding (100% Epic Mount) and Phase 1 Pre-Raid BiS farming"
        ]
      }
    ],
    "mage": [
      {
        "bracket": "1–10",
        "title": "Starting Out & Core Identity",
        "universal": [
          "First weapon upgrade from starter zone quests or weapon vendor",
          "Learn first core class mechanics at Level 4, 6, 8, and 10 from Class Trainer",
          "Level 10: Unlock first Talent Point and Class Quest (Hunter Pet Taming, Shaman Earth Totem, Druid Bear Form, Warlock Voidwalker, Paladin Redemption, Warrior Defensive Stance)"
        ]
      },
      {
        "bracket": "11–20",
        "title": "First Dungeons & Core Specialization",
        "universal": [
          "Level 14–16: First instanced dungeon runs (Ragefire Chasm, Deadmines, Wailing Caverns)",
          "Level 18–20: Second class quest milestone (Druid Aquatic Form, Shaman Fire Totem, Warlock Succubus)",
          "Level 20: 11-point milestone talent unlocked in your primary tree"
        ]
      },
      {
        "bracket": "21–30",
        "title": "Mid-Game Powers & Forever Legacy System",
        "universal": [
          "Level 20: Legacy System activates! Begin tracking account-wide milestone perks",
          "Level 20–24: Dungeon progression in Blackfathom Deeps, Shadowfang Keep, and Stockade",
          "Level 28–30: Shaman Water Totem quest chain, Warlock Felhunter, Warrior Whirlwind Axe chain prep",
          "Level 30: 21-point major capstone talent unlocked in Beta Build 70425 cap"
        ]
      },
      {
        "bracket": "31–40",
        "title": "Mount Speed, Dual Spec & Scarlet Monastery",
        "universal": [
          "Level 32–36: Scarlet Monastery (Graveyard, Library, Armory, Cathedral) and Gnomeregan",
          "Level 40: Apprentice Riding and 60% Mount unlock (gold savings priority)",
          "Level 40: Dual Specialization unlock from Class Trainer (swap specs anywhere outside combat)",
          "Level 40: Armor proficiency upgrades: Mail for Warriors/Paladins; Leather to Mail for Hunters/Shamans; Plate readiness"
        ]
      },
      {
        "bracket": "41–50",
        "title": "Deep Wilderness & Mid-Tier Dungeons",
        "universal": [
          "Level 42–46: Zul'Farrak and Maraudon wings (quest chains provide top-tier weapon and trinket upgrades)",
          "Level 45: 31-point ultimate talent unlocked in your main talent tree",
          "Level 48–50: Sunken Temple (Temple of Atal'Hakkar) and custom Forever excavation dungeons"
        ]
      },
      {
        "bracket": "51–60",
        "title": "The Road to Endgame & Raid Attunements",
        "universal": [
          "Level 52–58: Blackrock Depths (BRD), Scholomance, and Stratholme (Living & Undead sides)",
          "Level 55: Level 50+ epic class quest from class trainers for unique rare/epic gear",
          "Level 58–60: Complete Onyxia Attunement, Molten Core douse/Hydraxian Waterlords quests, and Barrow Deeps 10M keys",
          "Level 60: Journeyman Riding (100% Epic Mount) and Phase 1 Pre-Raid BiS farming"
        ]
      }
    ],
    "paladin": [
      {
        "bracket": "1–10",
        "title": "Starting Out & Core Identity",
        "universal": [
          "First weapon upgrade from starter zone quests or weapon vendor",
          "Learn first core class mechanics at Level 4, 6, 8, and 10 from Class Trainer",
          "Level 10: Unlock first Talent Point and Class Quest (Hunter Pet Taming, Shaman Earth Totem, Druid Bear Form, Warlock Voidwalker, Paladin Redemption, Warrior Defensive Stance)"
        ]
      },
      {
        "bracket": "11–20",
        "title": "First Dungeons & Core Specialization",
        "universal": [
          "Level 14–16: First instanced dungeon runs (Ragefire Chasm, Deadmines, Wailing Caverns)",
          "Level 18–20: Second class quest milestone (Druid Aquatic Form, Shaman Fire Totem, Warlock Succubus)",
          "Level 20: 11-point milestone talent unlocked in your primary tree"
        ]
      },
      {
        "bracket": "21–30",
        "title": "Mid-Game Powers & Forever Legacy System",
        "universal": [
          "Level 20: Legacy System activates! Begin tracking account-wide milestone perks",
          "Level 20–24: Dungeon progression in Blackfathom Deeps, Shadowfang Keep, and Stockade",
          "Level 28–30: Shaman Water Totem quest chain, Warlock Felhunter, Warrior Whirlwind Axe chain prep",
          "Level 30: 21-point major capstone talent unlocked in Beta Build 70425 cap"
        ]
      },
      {
        "bracket": "31–40",
        "title": "Mount Speed, Dual Spec & Scarlet Monastery",
        "universal": [
          "Level 32–36: Scarlet Monastery (Graveyard, Library, Armory, Cathedral) and Gnomeregan",
          "Level 40: Apprentice Riding and 60% Mount unlock (gold savings priority)",
          "Level 40: Dual Specialization unlock from Class Trainer (swap specs anywhere outside combat)",
          "Level 40: Armor proficiency upgrades: Mail for Warriors/Paladins; Leather to Mail for Hunters/Shamans; Plate readiness"
        ]
      },
      {
        "bracket": "41–50",
        "title": "Deep Wilderness & Mid-Tier Dungeons",
        "universal": [
          "Level 42–46: Zul'Farrak and Maraudon wings (quest chains provide top-tier weapon and trinket upgrades)",
          "Level 45: 31-point ultimate talent unlocked in your main talent tree",
          "Level 48–50: Sunken Temple (Temple of Atal'Hakkar) and custom Forever excavation dungeons"
        ]
      },
      {
        "bracket": "51–60",
        "title": "The Road to Endgame & Raid Attunements",
        "universal": [
          "Level 52–58: Blackrock Depths (BRD), Scholomance, and Stratholme (Living & Undead sides)",
          "Level 55: Level 50+ epic class quest from class trainers for unique rare/epic gear",
          "Level 58–60: Complete Onyxia Attunement, Molten Core douse/Hydraxian Waterlords quests, and Barrow Deeps 10M keys",
          "Level 60: Journeyman Riding (100% Epic Mount) and Phase 1 Pre-Raid BiS farming"
        ]
      }
    ],
    "warrior": [
      {
        "bracket": "1–10",
        "title": "Starting Out & Core Identity",
        "universal": [
          "First weapon upgrade from starter zone quests or weapon vendor",
          "Learn first core class mechanics at Level 4, 6, 8, and 10 from Class Trainer",
          "Level 10: Unlock first Talent Point and Class Quest (Hunter Pet Taming, Shaman Earth Totem, Druid Bear Form, Warlock Voidwalker, Paladin Redemption, Warrior Defensive Stance)"
        ]
      },
      {
        "bracket": "11–20",
        "title": "First Dungeons & Core Specialization",
        "universal": [
          "Level 14–16: First instanced dungeon runs (Ragefire Chasm, Deadmines, Wailing Caverns)",
          "Level 18–20: Second class quest milestone (Druid Aquatic Form, Shaman Fire Totem, Warlock Succubus)",
          "Level 20: 11-point milestone talent unlocked in your primary tree"
        ]
      },
      {
        "bracket": "21–30",
        "title": "Mid-Game Powers & Forever Legacy System",
        "universal": [
          "Level 20: Legacy System activates! Begin tracking account-wide milestone perks",
          "Level 20–24: Dungeon progression in Blackfathom Deeps, Shadowfang Keep, and Stockade",
          "Level 28–30: Shaman Water Totem quest chain, Warlock Felhunter, Warrior Whirlwind Axe chain prep",
          "Level 30: 21-point major capstone talent unlocked in Beta Build 70425 cap"
        ]
      },
      {
        "bracket": "31–40",
        "title": "Mount Speed, Dual Spec & Scarlet Monastery",
        "universal": [
          "Level 32–36: Scarlet Monastery (Graveyard, Library, Armory, Cathedral) and Gnomeregan",
          "Level 40: Apprentice Riding and 60% Mount unlock (gold savings priority)",
          "Level 40: Dual Specialization unlock from Class Trainer (swap specs anywhere outside combat)",
          "Level 40: Armor proficiency upgrades: Mail for Warriors/Paladins; Leather to Mail for Hunters/Shamans; Plate readiness"
        ]
      },
      {
        "bracket": "41–50",
        "title": "Deep Wilderness & Mid-Tier Dungeons",
        "universal": [
          "Level 42–46: Zul'Farrak and Maraudon wings (quest chains provide top-tier weapon and trinket upgrades)",
          "Level 45: 31-point ultimate talent unlocked in your main talent tree",
          "Level 48–50: Sunken Temple (Temple of Atal'Hakkar) and custom Forever excavation dungeons"
        ]
      },
      {
        "bracket": "51–60",
        "title": "The Road to Endgame & Raid Attunements",
        "universal": [
          "Level 52–58: Blackrock Depths (BRD), Scholomance, and Stratholme (Living & Undead sides)",
          "Level 55: Level 50+ epic class quest from class trainers for unique rare/epic gear",
          "Level 58–60: Complete Onyxia Attunement, Molten Core douse/Hydraxian Waterlords quests, and Barrow Deeps 10M keys",
          "Level 60: Journeyman Riding (100% Epic Mount) and Phase 1 Pre-Raid BiS farming"
        ]
      }
    ],
    "warlock": [
      {
        "bracket": "1–10",
        "title": "Starting Out & Core Identity",
        "universal": [
          "First weapon upgrade from starter zone quests or weapon vendor",
          "Learn first core class mechanics at Level 4, 6, 8, and 10 from Class Trainer",
          "Level 10: Unlock first Talent Point and Class Quest (Hunter Pet Taming, Shaman Earth Totem, Druid Bear Form, Warlock Voidwalker, Paladin Redemption, Warrior Defensive Stance)"
        ]
      },
      {
        "bracket": "11–20",
        "title": "First Dungeons & Core Specialization",
        "universal": [
          "Level 14–16: First instanced dungeon runs (Ragefire Chasm, Deadmines, Wailing Caverns)",
          "Level 18–20: Second class quest milestone (Druid Aquatic Form, Shaman Fire Totem, Warlock Succubus)",
          "Level 20: 11-point milestone talent unlocked in your primary tree"
        ]
      },
      {
        "bracket": "21–30",
        "title": "Mid-Game Powers & Forever Legacy System",
        "universal": [
          "Level 20: Legacy System activates! Begin tracking account-wide milestone perks",
          "Level 20–24: Dungeon progression in Blackfathom Deeps, Shadowfang Keep, and Stockade",
          "Level 28–30: Shaman Water Totem quest chain, Warlock Felhunter, Warrior Whirlwind Axe chain prep",
          "Level 30: 21-point major capstone talent unlocked in Beta Build 70425 cap"
        ]
      },
      {
        "bracket": "31–40",
        "title": "Mount Speed, Dual Spec & Scarlet Monastery",
        "universal": [
          "Level 32–36: Scarlet Monastery (Graveyard, Library, Armory, Cathedral) and Gnomeregan",
          "Level 40: Apprentice Riding and 60% Mount unlock (gold savings priority)",
          "Level 40: Dual Specialization unlock from Class Trainer (swap specs anywhere outside combat)",
          "Level 40: Armor proficiency upgrades: Mail for Warriors/Paladins; Leather to Mail for Hunters/Shamans; Plate readiness"
        ]
      },
      {
        "bracket": "41–50",
        "title": "Deep Wilderness & Mid-Tier Dungeons",
        "universal": [
          "Level 42–46: Zul'Farrak and Maraudon wings (quest chains provide top-tier weapon and trinket upgrades)",
          "Level 45: 31-point ultimate talent unlocked in your main talent tree",
          "Level 48–50: Sunken Temple (Temple of Atal'Hakkar) and custom Forever excavation dungeons"
        ]
      },
      {
        "bracket": "51–60",
        "title": "The Road to Endgame & Raid Attunements",
        "universal": [
          "Level 52–58: Blackrock Depths (BRD), Scholomance, and Stratholme (Living & Undead sides)",
          "Level 55: Level 50+ epic class quest from class trainers for unique rare/epic gear",
          "Level 58–60: Complete Onyxia Attunement, Molten Core douse/Hydraxian Waterlords quests, and Barrow Deeps 10M keys",
          "Level 60: Journeyman Riding (100% Epic Mount) and Phase 1 Pre-Raid BiS farming"
        ]
      }
    ],
    "priest": [
      {
        "bracket": "1–10",
        "title": "Starting Out & Core Identity",
        "universal": [
          "First weapon upgrade from starter zone quests or weapon vendor",
          "Learn first core class mechanics at Level 4, 6, 8, and 10 from Class Trainer",
          "Level 10: Unlock first Talent Point and Class Quest (Hunter Pet Taming, Shaman Earth Totem, Druid Bear Form, Warlock Voidwalker, Paladin Redemption, Warrior Defensive Stance)"
        ]
      },
      {
        "bracket": "11–20",
        "title": "First Dungeons & Core Specialization",
        "universal": [
          "Level 14–16: First instanced dungeon runs (Ragefire Chasm, Deadmines, Wailing Caverns)",
          "Level 18–20: Second class quest milestone (Druid Aquatic Form, Shaman Fire Totem, Warlock Succubus)",
          "Level 20: 11-point milestone talent unlocked in your primary tree"
        ]
      },
      {
        "bracket": "21–30",
        "title": "Mid-Game Powers & Forever Legacy System",
        "universal": [
          "Level 20: Legacy System activates! Begin tracking account-wide milestone perks",
          "Level 20–24: Dungeon progression in Blackfathom Deeps, Shadowfang Keep, and Stockade",
          "Level 28–30: Shaman Water Totem quest chain, Warlock Felhunter, Warrior Whirlwind Axe chain prep",
          "Level 30: 21-point major capstone talent unlocked in Beta Build 70425 cap"
        ]
      },
      {
        "bracket": "31–40",
        "title": "Mount Speed, Dual Spec & Scarlet Monastery",
        "universal": [
          "Level 32–36: Scarlet Monastery (Graveyard, Library, Armory, Cathedral) and Gnomeregan",
          "Level 40: Apprentice Riding and 60% Mount unlock (gold savings priority)",
          "Level 40: Dual Specialization unlock from Class Trainer (swap specs anywhere outside combat)",
          "Level 40: Armor proficiency upgrades: Mail for Warriors/Paladins; Leather to Mail for Hunters/Shamans; Plate readiness"
        ]
      },
      {
        "bracket": "41–50",
        "title": "Deep Wilderness & Mid-Tier Dungeons",
        "universal": [
          "Level 42–46: Zul'Farrak and Maraudon wings (quest chains provide top-tier weapon and trinket upgrades)",
          "Level 45: 31-point ultimate talent unlocked in your main talent tree",
          "Level 48–50: Sunken Temple (Temple of Atal'Hakkar) and custom Forever excavation dungeons"
        ]
      },
      {
        "bracket": "51–60",
        "title": "The Road to Endgame & Raid Attunements",
        "universal": [
          "Level 52–58: Blackrock Depths (BRD), Scholomance, and Stratholme (Living & Undead sides)",
          "Level 55: Level 50+ epic class quest from class trainers for unique rare/epic gear",
          "Level 58–60: Complete Onyxia Attunement, Molten Core douse/Hydraxian Waterlords quests, and Barrow Deeps 10M keys",
          "Level 60: Journeyman Riding (100% Epic Mount) and Phase 1 Pre-Raid BiS farming"
        ]
      }
    ],
    "druid": [
      {
        "bracket": "1–10",
        "title": "Starting Out & Core Identity",
        "universal": [
          "First weapon upgrade from starter zone quests or weapon vendor",
          "Learn first core class mechanics at Level 4, 6, 8, and 10 from Class Trainer",
          "Level 10: Unlock first Talent Point and Class Quest (Hunter Pet Taming, Shaman Earth Totem, Druid Bear Form, Warlock Voidwalker, Paladin Redemption, Warrior Defensive Stance)"
        ]
      },
      {
        "bracket": "11–20",
        "title": "First Dungeons & Core Specialization",
        "universal": [
          "Level 14–16: First instanced dungeon runs (Ragefire Chasm, Deadmines, Wailing Caverns)",
          "Level 18–20: Second class quest milestone (Druid Aquatic Form, Shaman Fire Totem, Warlock Succubus)",
          "Level 20: 11-point milestone talent unlocked in your primary tree"
        ]
      },
      {
        "bracket": "21–30",
        "title": "Mid-Game Powers & Forever Legacy System",
        "universal": [
          "Level 20: Legacy System activates! Begin tracking account-wide milestone perks",
          "Level 20–24: Dungeon progression in Blackfathom Deeps, Shadowfang Keep, and Stockade",
          "Level 28–30: Shaman Water Totem quest chain, Warlock Felhunter, Warrior Whirlwind Axe chain prep",
          "Level 30: 21-point major capstone talent unlocked in Beta Build 70425 cap"
        ]
      },
      {
        "bracket": "31–40",
        "title": "Mount Speed, Dual Spec & Scarlet Monastery",
        "universal": [
          "Level 32–36: Scarlet Monastery (Graveyard, Library, Armory, Cathedral) and Gnomeregan",
          "Level 40: Apprentice Riding and 60% Mount unlock (gold savings priority)",
          "Level 40: Dual Specialization unlock from Class Trainer (swap specs anywhere outside combat)",
          "Level 40: Armor proficiency upgrades: Mail for Warriors/Paladins; Leather to Mail for Hunters/Shamans; Plate readiness"
        ]
      },
      {
        "bracket": "41–50",
        "title": "Deep Wilderness & Mid-Tier Dungeons",
        "universal": [
          "Level 42–46: Zul'Farrak and Maraudon wings (quest chains provide top-tier weapon and trinket upgrades)",
          "Level 45: 31-point ultimate talent unlocked in your main talent tree",
          "Level 48–50: Sunken Temple (Temple of Atal'Hakkar) and custom Forever excavation dungeons"
        ]
      },
      {
        "bracket": "51–60",
        "title": "The Road to Endgame & Raid Attunements",
        "universal": [
          "Level 52–58: Blackrock Depths (BRD), Scholomance, and Stratholme (Living & Undead sides)",
          "Level 55: Level 50+ epic class quest from class trainers for unique rare/epic gear",
          "Level 58–60: Complete Onyxia Attunement, Molten Core douse/Hydraxian Waterlords quests, and Barrow Deeps 10M keys",
          "Level 60: Journeyman Riding (100% Epic Mount) and Phase 1 Pre-Raid BiS farming"
        ]
      }
    ],
    "rogue": [
      {
        "bracket": "1–10",
        "title": "Starting Out & Core Identity",
        "universal": [
          "First weapon upgrade from starter zone quests or weapon vendor",
          "Learn first core class mechanics at Level 4, 6, 8, and 10 from Class Trainer",
          "Level 10: Unlock first Talent Point and Class Quest (Hunter Pet Taming, Shaman Earth Totem, Druid Bear Form, Warlock Voidwalker, Paladin Redemption, Warrior Defensive Stance)"
        ]
      },
      {
        "bracket": "11–20",
        "title": "First Dungeons & Core Specialization",
        "universal": [
          "Level 14–16: First instanced dungeon runs (Ragefire Chasm, Deadmines, Wailing Caverns)",
          "Level 18–20: Second class quest milestone (Druid Aquatic Form, Shaman Fire Totem, Warlock Succubus)",
          "Level 20: 11-point milestone talent unlocked in your primary tree"
        ]
      },
      {
        "bracket": "21–30",
        "title": "Mid-Game Powers & Forever Legacy System",
        "universal": [
          "Level 20: Legacy System activates! Begin tracking account-wide milestone perks",
          "Level 20–24: Dungeon progression in Blackfathom Deeps, Shadowfang Keep, and Stockade",
          "Level 28–30: Shaman Water Totem quest chain, Warlock Felhunter, Warrior Whirlwind Axe chain prep",
          "Level 30: 21-point major capstone talent unlocked in Beta Build 70425 cap"
        ]
      },
      {
        "bracket": "31–40",
        "title": "Mount Speed, Dual Spec & Scarlet Monastery",
        "universal": [
          "Level 32–36: Scarlet Monastery (Graveyard, Library, Armory, Cathedral) and Gnomeregan",
          "Level 40: Apprentice Riding and 60% Mount unlock (gold savings priority)",
          "Level 40: Dual Specialization unlock from Class Trainer (swap specs anywhere outside combat)",
          "Level 40: Armor proficiency upgrades: Mail for Warriors/Paladins; Leather to Mail for Hunters/Shamans; Plate readiness"
        ]
      },
      {
        "bracket": "41–50",
        "title": "Deep Wilderness & Mid-Tier Dungeons",
        "universal": [
          "Level 42–46: Zul'Farrak and Maraudon wings (quest chains provide top-tier weapon and trinket upgrades)",
          "Level 45: 31-point ultimate talent unlocked in your main talent tree",
          "Level 48–50: Sunken Temple (Temple of Atal'Hakkar) and custom Forever excavation dungeons"
        ]
      },
      {
        "bracket": "51–60",
        "title": "The Road to Endgame & Raid Attunements",
        "universal": [
          "Level 52–58: Blackrock Depths (BRD), Scholomance, and Stratholme (Living & Undead sides)",
          "Level 55: Level 50+ epic class quest from class trainers for unique rare/epic gear",
          "Level 58–60: Complete Onyxia Attunement, Molten Core douse/Hydraxian Waterlords quests, and Barrow Deeps 10M keys",
          "Level 60: Journeyman Riding (100% Epic Mount) and Phase 1 Pre-Raid BiS farming"
        ]
      }
    ]
  }
};
