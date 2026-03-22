import type { Role } from "./character.interface";

export const Bulwark: Role = {
    roleName: 'Bulwark',
    roleBonus: {
        hp: 3,
        dmgTaken: -1
    }
}

export const Sentinel: Role = {
    roleName: 'Sentinel',
    roleBonus: {
        dmgTaken: -1,
        bonus: ['+2 to Roll when intervening.']
    }
}

export const Healer: Role = {
    roleName: 'Healer',
    roleBonus: {
        envRolls: +1,
        bonus: ['+2 to Roll result when healing.'] 
        // Are we sure this is what it's meant to happen, not +healing?
    }
}

export const PackRat: Role = {
    roleName: 'Pack Rat',
    roleBonus: {
        bonus: ['May use two consumables at a time.', 'When purchasing a consumable, get a copy for free.']
    }
}

export const Duelist: Role = {
    roleName: 'Duelist',
    roleBonus: {
        hp: 1,
        dmgDone: 1,
        envRolls: 1
    }
}

export const Ranger: Role = {
    roleName: 'Ranger',
    roleBonus: {
        envRolls: 2,
        bonus: ['+1 to Combat Rolls.']
    }
}

export const Magus: Role = {
    roleName: 'Magus',
    roleBonus: {
        dmgDone: 2,
        dmgTaken: 1,
        envRolls: -1
    }
}

export const Rogue: Role = {
    roleName: 'Rogue',
    roleBonus: {
        envRolls: 2,
        dmgDone: 3,
        dmgTaken: 2
    }
}