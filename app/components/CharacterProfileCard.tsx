"use client";

import Image from "next/image";
import CharacterLogs from "./CharacterLogs";

type CharacterProps = {
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
    logs?: {
        date_saved: string;
        level: number;
        overall: number;
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        mentality: number;
    }[];

};

const calculateOverall = (strength: number, dexterity: number, constitution: number, intelligence: number, wisdom: number, mentality: number) => {
    return strength + dexterity + constitution + intelligence + wisdom + mentality;
};

const CharacterProfileCard = ({
    name,
    role,
    level,
    guild,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    mentality,
    avatar,
    logs = []
}: CharacterProps) => {
    const overall = calculateOverall(strength, dexterity, constitution, intelligence, wisdom, mentality);

    return (
        <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
                <div className="flex items-center space-x-6">
                    <Image
                        src={avatar || "/default-avatar.png"}
                        alt={`${role} avatar`}
                        width={100}
                        height={100}
                        className="rounded-full border-4 border-gray-600"
                    />
                    <div>
                        <h1 className="text-3xl font-bold uppercase">{name}</h1>
                        <p className="text-gray-400 text-sm">{role} - Level {level}</p>
                        <p className="text-gray-400 text-sm italic">Guild: {guild}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-gray-400 text-lg ">Overall</p>
                    <p className="text-3xl font-bold text-green-500">{overall}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 text-lg">
                <div className="flex justify-between">
                    <span className="text-gray-400">Strength:</span>
                    <span className="font-bold">{strength}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Dexterity:</span>
                    <span className="font-bold">{dexterity}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Constitution:</span>
                    <span className="font-bold">{constitution}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Intelligence:</span>
                    <span className="font-bold">{intelligence}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Wisdom:</span>
                    <span className="font-bold">{wisdom}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Mentality:</span>
                    <span className="font-bold">{mentality}</span>
                </div>
            </div>

            {/* Logging History Component */}
            <CharacterLogs logs={logs} />
        </div>
    );
};

export default CharacterProfileCard;
