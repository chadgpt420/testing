import React, { useState, useEffect, useMemo } from "react";
import { Character } from "./types";

type FilterProps = {
    characters: Character[];
    onFilter: (filteredCharacters: Character[]) => void;
};

const Filters = ({ characters, onFilter }: FilterProps) => {
    const [selectedRole, setSelectedRole] = useState<string>("All");
    const [selectedGuild, setSelectedGuild] = useState<string>("All");
    const [minOverall, setMinOverall] = useState<string>("");
    const [maxOverall, setMaxOverall] = useState<string>("");
    const [startDate, setStartDate] = useState<string>(""); 
    const [endDate, setEndDate] = useState<string>("");

    const guilds = useMemo(() => ["All", ...new Set(characters.map((char) => char.guild))], [characters]);

    const roles = useMemo(() => {
        let filteredCharacters = characters;

        if (selectedGuild !== "All") {
            filteredCharacters = characters.filter((char) => char.guild === selectedGuild);
        }

        const availableRoles = ["All", ...new Set(filteredCharacters.map((char) => char.role))];

        if (selectedRole !== "All" && !availableRoles.includes(selectedRole)) {
            setSelectedRole("All");
        }

        return availableRoles;
    }, [characters, selectedGuild, selectedRole]);

    useEffect(() => {
        let filtered = [...characters];

        if (selectedGuild !== "All") {
            filtered = filtered.filter((char) => char.guild.toLowerCase() === selectedGuild.toLowerCase());
        }

        if (selectedRole !== "All") {
            filtered = filtered.filter((char) => char.role.toLowerCase() === selectedRole.toLowerCase());
        }

        const minValue = minOverall.trim() !== "" ? Number(minOverall) : Number.NEGATIVE_INFINITY;
        const maxValue = maxOverall.trim() !== "" ? Number(maxOverall) : Number.POSITIVE_INFINITY;

        filtered = filtered.filter(
            (char) => char.overall >= minValue && char.overall <= maxValue
        );

        if (startDate || endDate) {
            filtered = filtered.filter((char) => {
                const characterDate = new Date(char.date_saved).toISOString().split("T")[0];
                const start = startDate ? new Date(startDate).toISOString().split("T")[0] : null;
                const end = endDate ? new Date(endDate).toISOString().split("T")[0] : null;

                return (!start || characterDate >= start) && (!end || characterDate <= end);
            });
        }

        onFilter(filtered);
    }, [selectedRole, selectedGuild, minOverall, maxOverall, startDate, endDate]);

    return (
        <div className="flex flex-wrap gap-4 mb-4 justify-center">
            <div className="flex flex-col">
                <label className="text-white mb-1">Guild:</label>
                <select
                    className="p-2 rounded bg-gray-700 text-white border border-gray-600"
                    value={selectedGuild}
                    onChange={(e) => setSelectedGuild(e.target.value)}
                >
                    {guilds.map((guild) => (
                        <option key={guild} value={guild}>
                            {guild}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-white mb-1">Role:</label>
                <select
                    className="p-2 rounded bg-gray-700 text-white border border-gray-600"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                >
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-white mb-1">Min OVR:</label>
                <input
                    type="number"
                    min="0"
                    className="p-2 rounded bg-gray-700 text-white border border-gray-600"
                    value={minOverall}
                    onChange={(e) => setMinOverall(e.target.value)}
                    placeholder="Min OVR"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-white mb-1">Max OVR:</label>
                <input
                    type="number"
                    min="0"
                    className="p-2 rounded bg-gray-700 text-white border border-gray-600"
                    value={maxOverall}
                    onChange={(e) => setMaxOverall(e.target.value)}
                    placeholder="Max OVR"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-white mb-1">After:</label>
                <input
                    type="date"
                    className="p-2 rounded bg-gray-700 text-white border border-gray-600"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <label className="text-white mb-1">Before:</label>
                <input
                    type="date"
                    className="p-2 rounded bg-gray-700 text-white border border-gray-600"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <div className="flex flex-col justify-end">
                <button
                    className="bg-red-600 text-white py-2 px-4 rounded border border-gray-600 hover:bg-red-700"
                    onClick={() => {
                        setSelectedRole("All");
                        setSelectedGuild("All");
                        setMinOverall("");
                        setMaxOverall("");
                        setStartDate("");
                        setEndDate("");
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Filters;
