import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

type Character = {
    name: string;
    role: string;
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

type SortConfig = {
    key: keyof Character;
    direction: "asc" | "desc";
};

const roleIcons: { [key: string]: string } = {
    Tank: "/tank.png",
    Fighter: "/fighter.png",
    Ranger: "/ranger.png",
    Bard: "/bard.png",
    Cleric: "/cleric.png",
    Mage: "/mage.png",
};

const StatsTable = ({ characters }: { characters: Character[] }) => {
    const [sortConfig, setSortConfig] = useState<SortConfig | null>({
        key: "overall",
        direction: "desc",
    });

    const sortedCharacters = useMemo(() => {
        if (!sortConfig) return characters;

        return [...characters].sort((a, b) => {
            const key = sortConfig.key;
            const valueA = a[key];
            const valueB = b[key];

            if (typeof valueA === "string" && typeof valueB === "string") {
                return sortConfig.direction === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
            if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [characters, sortConfig]);

    const requestSort = (key: keyof Character) => {
        let direction: "asc" | "desc" = "desc"; 

        if (sortConfig && sortConfig.key === key && sortConfig.direction === "desc") {
            direction = "asc";
        }

        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: keyof Character) => {
        if (sortConfig?.key === key) {
            return sortConfig.direction === "asc" ? "▲" : "▼";
        }
        return " ";
    };

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return "N/A";

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }

        return date.toISOString().split("T")[0];  
    };


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white border border-gray-700 text-center">
                <thead>
                    <tr className="bg-gray-700">
                        <th className="p-2 w-12">#</th>
                        <th
                            className={`p-2 cursor-pointer w-20 ${sortConfig?.key === "overall" ? "bg-gray-600" : ""}`}
                            onClick={() => requestSort("overall")}
                        >
                            OVR <span className="inline-block w-4">{getSortIcon("overall")}</span>
                        </th>
                        <th
                            className={`p-2 cursor-pointer text-left w-40 ${sortConfig?.key === "name" ? "bg-gray-600" : ""}`}
                            onClick={() => requestSort("name")}
                        >
                            Name <span className="inline-block w-4">{getSortIcon("name")}</span>
                        </th>
                        <th
                            className={`p-2 cursor-pointer text-left w-40 ${sortConfig?.key === "role" ? "bg-gray-600" : ""}`}
                            onClick={() => requestSort("role")}
                        >
                            Role <span className="inline-block w-4">{getSortIcon("role")}</span>
                        </th>
                        <th
                            className={`p-2 cursor-pointer w-16 ${sortConfig?.key === "level" ? "bg-gray-600" : ""}`}
                            onClick={() => requestSort("level")}
                        >
                            Level <span className="inline-block w-4">{getSortIcon("level")}</span>
                        </th>
                        <th
                            className={`p-2 cursor-pointer w-16 ${sortConfig?.key === "strength" ? "bg-gray-600" : ""}`}
                            onClick={() => requestSort("strength")}
                        >
                            STR <span className="inline-block w-4">{getSortIcon("strength")}</span>
                        </th>
                        <th
                            className={`p-2 cursor-pointer w-16 ${sortConfig?.key === "dexterity" ? "bg-gray-600" : ""}`}
                            onClick={() => requestSort("dexterity")}
                        >
                            DEX <span className="inline-block w-4">{getSortIcon("dexterity")}</span>
                        </th>
                        <th
                            className={`p-2 cursor-pointer w-16 ${sortConfig?.key === "constitution" ? "bg-gray-600" : ""}`}
                            onClick={() => requestSort("constitution")}
                        >
                            CON <span className="inline-block w-4">{getSortIcon("constitution")}</span>
                        </th>
                        <th
                            className={`p-2 cursor-pointer w-16 ${sortConfig?.key === "intelligence" ? "bg-gray-600" : ""}`}
                            onClick={() => requestSort("intelligence")}
                        >
                            INT <span className="inline-block w-4">{getSortIcon("intelligence")}</span>
                        </th>
                        <th
                            className={`p-2 cursor-pointer w-16 ${sortConfig?.key === "wisdom" ? "bg-gray-600" : ""}`}
                            onClick={() => requestSort("wisdom")}
                        >
                            WIS <span className="inline-block w-4">{getSortIcon("wisdom")}</span>
                        </th>
                        <th
                            className={`p-2 cursor-pointer w-16 ${sortConfig?.key === "mentality" ? "bg-gray-600" : ""}`}
                            onClick={() => requestSort("mentality")}
                        >
                            MNT <span className="inline-block w-4">{getSortIcon("mentality")}</span>
                        </th>
                        <th
                            className={`p-2 cursor-pointer text-left w-32 ${sortConfig?.key === "guild" ? "bg-gray-600" : ""
                                }`}
                            onClick={() => requestSort("guild")}
                        >
                            Guild <span className="inline-block w-4">{getSortIcon("guild")}</span>
                        </th>

                        <th
                            className={`p-2 cursor-pointer text-left w-40 ${sortConfig?.key === "date_saved" ? "bg-gray-600" : ""
                                }`}
                            onClick={() => requestSort("date_saved")}
                        >
                            Date <span className="inline-block w-4">{getSortIcon("date_saved")}</span>
                        </th>                    </tr>
                </thead>
                <tbody>
                    {sortedCharacters.map((character, index) => (
                        <tr key={index} className="border border-gray-700">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{character.overall}</td>

                            <td className="p-2 text-left">
                                <Link href={`/stats/${encodeURIComponent(character.name)}`} className="text-blue-400 hover:underline">
                                    {character.name}
                                </Link>
                            </td>


                            <td className="p-2 flex items-center space-x-2">
                                <Image src={roleIcons[character.role]} alt={character.role} width={24} height={24} />
                                <span>{character.role}</span>
                            </td>
                            <td className="p-2">{character.level}</td>
                            <td className="p-2">{character.strength}</td>
                            <td className="p-2">{character.dexterity}</td>
                            <td className="p-2">{character.constitution}</td>
                            <td className="p-2">{character.intelligence}</td>
                            <td className="p-2">{character.wisdom}</td>
                            <td className="p-2">{character.mentality}</td>
                            <td className="p-2 text-left">{character.guild}</td>
                            <td className="p-2 text-left">{formatDate(character.date_saved)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatsTable;
