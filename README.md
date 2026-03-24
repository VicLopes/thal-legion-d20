# Thal'dorei Legion — D20 Character Sheet

A web app for creating and viewing D20 character sheets for the Thal'dorei Legion RP community.

**[Open the app](https://viclopes.github.io/thal-legion-d20/)**

---

## What it does

Walk through a guided character creation flow and generate a ready-to-use character sheet:

1. **Basic Info** — Name and race (Sin'dorei, Ren'dorei, Draenei, etc.)
2. **Class** — A custom class name paired with one of the available roles
3. **Stats** — Distribute points across Stamina, Combat Proficiency, Swift Reflexes, and more
4. **Abilities** — Pick abilities that grant character property bonuses
5. **Review** — Confirm and generate your character sheet

## Roles

Each class is built on one of eight roles, each with its own stat bonuses:

| Role | Bonus |
|---|---|
| Bulwark | +3 HP, -1 Damage Taken |
| Sentinel | -1 Damage Taken, +2 to roll when intervening |
| Healer | +1 Environment Rolls, +2 to roll result when healing |
| Pack Rat | Use two consumables at a time; get a free copy when purchasing |
| Duelist | +1 HP, +1 Damage Done, +1 Environment Rolls |
| Ranger | +2 Environment Rolls, +1 Combat Rolls |
| Magus | +2 Damage Done, +1 Damage Taken, -1 Environment Rolls |
| Rogue | +3 Damage Done, +2 Damage Taken, +2 Environment Rolls |

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- Deployed via GitHub Pages

## Local development

```bash
npm install
npm run dev
```
