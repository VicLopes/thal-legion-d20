export interface Class {
    name: string
    role: Role
    bonuses: string[]
}

export type CharacterSheet = {
    name: string;
    race: string;
    class: Class;
    stats: Stats;
}

type Stats = {
    stamina: number;
    combat: number;
    pockets: number;
    reflexes: number;
    healer: number;
    stealth: number;
    highRoller: number;
}

export type Role = {
    roleName: string;
    roleBonus: Partial<CharProperties>
}

export type CharProperties = {
    dmgTaken: number;
    dmgDone: number;
    healingDone: number;
    invSlots: number;
    envRolls: number;
    stealth: number;
    hp: number;
    bonus?: string[]
}