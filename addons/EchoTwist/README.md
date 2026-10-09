# ⚡ EchoTwist

**High-precision Windfury Weapon & Seal Twisting Cadence Engine for World of Warcraft: Forever (Camelot 12.0 Engine & TOC 16001).**

---

## 🌟 Overview
EchoTwist is a specialized combat cadence and swing timing HUD engineered specifically for WoW Forever melee classes (Enhancement Shamans, Retribution/Holy Paladins, and Arms Warriors):
- **Precision Swing Timer**: Real-time main-hand melee swing tracker with sub-pixel animation.
- **Twist Window Indicator**: Visual golden highlight during the crucial 0.4-second window before swing execution for seamless Seal of Command / Seal of Righteousness twisting.
- **Windfury & Extra Attack Audio-Visual Echo**: Instant proc banner and audio chime upon `SPELL_EXTRA_ATTACKS` combat log events.
- **Zero-Taint Architecture**: Completely isolated from Blizzard protected frames; uses independent FrameXML widgets and C-side event listening.

## 🛠️ Slash Commands
- `/et` or `/echotwist`: Display command help.
- `/et lock`: Toggle frame lock / unlock to drag to desired HUD location.
- `/et test`: Trigger a simulated 3.2s swing and Windfury extra attack proc.
- `/et sound`: Toggle proc audio chimes.
- `/et window <seconds>`: Adjust the twist window threshold (default: `0.4`).
- `/et reset`: Reset HUD position to default screen center.

## 📁 Installation
Place into:
```
World of Warcraft\_classic_beta_\Interface\AddOns\EchoTwist\
```
