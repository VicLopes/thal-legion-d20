export interface CharacterSheet {
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

export interface Equipment {
    rarity: 'Legendary' | 'Rare' | 'Uncommon' | 'Common',
    name: string
}

export interface Consumable {
    name: string;
    effect: string;
}

export interface Ability {
    name: string;
    abilityBonus: Partial<CharProperties>
}

interface Stats {
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

export interface Role {
    roleName: string;
    roleBonus: Partial<CharProperties>
}

export interface CharProperties {
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