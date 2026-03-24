import type { CharProperties } from "../../models/character.interface";
import type { PartialSheet } from "./reducer";

const BASE_HP = 15

function emptyProperties(): CharProperties {
    return {
        hp: 0,
        dmgDone: 0,
        dmgTaken: 0,
        healingDone: 0,
        invSlots: 0,
        combatRolls: 0,
        envRolls: 0,
        stealth: 0,
        bonus: [],
    }
}

function mergeBonus(base: CharProperties, bonus: Partial<CharProperties>): CharProperties {
    return {
        hp:          base.hp          + (bonus.hp          ?? 0),
        dmgDone:     base.dmgDone     + (bonus.dmgDone     ?? 0),
        dmgTaken:    base.dmgTaken    + (bonus.dmgTaken    ?? 0),
        healingDone: base.healingDone + (bonus.healingDone ?? 0),
        invSlots:    base.invSlots    + (bonus.invSlots    ?? 0),
        combatRolls: base.combatRolls + (bonus.combatRolls ?? 0),
        envRolls:    base.envRolls    + (bonus.envRolls    ?? 0),
        stealth:     base.stealth     + (bonus.stealth     ?? 0),
        bonus: [...(base.bonus ?? []), ...(bonus.bonus ?? [])],
    }
}

export function buildSheet(sheet: PartialSheet): { charProperties: CharProperties; hp: number } {
    let props = emptyProperties()

    // Stats — each point maps to a specific CharProperty
    if (sheet.stats) {
        const { stamina, combat, pockets, reflexes, healer, stealth, highRoller } = sheet.stats
        props.hp          += stamina  * 2
        props.dmgDone     += combat
        props.invSlots    += pockets
        props.envRolls    += reflexes
        props.healingDone += healer
        props.stealth     += stealth
        if (highRoller > 0)
            props.bonus = [...(props.bonus ?? []), `Rolls above 20 increase outgoing DMG/Healing by +${highRoller}.`]
    }

    // Role bonus
    if (sheet.class?.role?.roleBonus)
        props = mergeBonus(props, sheet.class.role.roleBonus)

    // Ability bonuses
    for (const ability of sheet.abilities ?? [])
        props = mergeBonus(props, ability.abilityBonus)

    return {
        charProperties: props,
        hp: BASE_HP + props.hp,
    }
}
