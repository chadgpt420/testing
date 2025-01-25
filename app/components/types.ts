export type Character = {
    name: string;
    role: "Tank" | "Bard" | "Cleric" | "Mage" | "Ranger" | "Fighter";
    level: number;
    overall: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    mentality: number;
    guild: string;
    date_saved: string;
};
