"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CharacterProfileCard from "@/app/components/CharacterProfileCard";

type Character = {
    name: string;
    role: string;
    level: number;
    guild: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    mentality: number;
    avatar?: string;
};

type CharacterLog = {
    date_saved: string;
    level: number;
    overall: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    mentality: number;
};
const roleImages: { [key: string]: string } = {
    Tank: "/tank.png",
    Fighter: "/fighter.png",
    Ranger: "/ranger.png",
    Bard: "/bard.png",
    Cleric: "/cleric.png",
    Mage: "/mage.png",
};

const CharacterProfile = () => {
    const { name } = useParams();
    const [character, setCharacter] = useState<Character | null>(null);
    const [logs, setLogs] = useState<CharacterLog[]>([]);
    const [loading, setLoading] = useState(true);

    const characterName = Array.isArray(name) ? name[0] : name;

    useEffect(() => {
        if (characterName) {
            fetch(`/api/stats?name=${encodeURIComponent(characterName)}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.message) {
                        setCharacter(null);
                    } else {
                        const updatedCharacter = {
                            ...data.character,
                            avatar: roleImages[data.character.role] || "/default-avatar.png",
                        };
                        setCharacter(updatedCharacter);
                        setLogs(data.logs || []);
                    }
                })
                .catch(() => setCharacter(null))
                .finally(() => setLoading(false));
        }
    }, [characterName]);

    if (loading) return <p className="text-center text-white mt-10">Loading...</p>;
    if (!character) return <p className="text-center text-red-400 mt-10">Character not found.</p>;

    return (
        <div className="container mx-auto p-6">
            <CharacterProfileCard {...character} logs={logs} />
        </div>
    );
};

export default CharacterProfile;
