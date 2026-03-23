export type CharacterSheet = {
    name: string;
    race: string;
    class: Class;
    stats: Stats;
    hp: number;
    bonus?: Record<string, number>;
    equipments: Equipment[];
    signet: boolean;
    gold: number;
    consumables: Consumable[]
    abilities: Ability[]
}

export type Equipment = {
    rarity: 'Legendary' | 'Rare' | 'Uncommon' | 'Common',
    name: string
}

export type Consumable = {
    name: string;
    effect: string;
}

export type Ability = {
    name: string;
    abilityBonus: Partial<CharProperties>
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

export interface Class {
    name: string
    role: Role
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
    combatRolls: number;
    envRolls: number;
    stealth: number;
    hp: number;
    bonus?: string[]
}