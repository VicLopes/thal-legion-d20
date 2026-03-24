export interface CharacterSheet {
    name: string;
    race: string;
    class: Class;
    stats: Stats;
    charProperties: CharProperties;
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

export interface Stats {
    stamina: number; // +2 to HP
    combat: number; // +1 Dmg Done
    pockets: number; // +1 to Inventory Slots
    reflexes: number; // +1 Environmental Rolls
    healer: number; // +1 to Healing Done
    stealth: number; // +1 to Stealth Rolls
    highRoller: number; // Rolls above 20 increase outgoing DMG/Healing by +1
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