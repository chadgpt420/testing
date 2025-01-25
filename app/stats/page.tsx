"use client";

import { useState, useEffect } from "react";
import StatsTable from "../components/StatsTable";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import { Character } from "../components/types";

export default function HomePage() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
    const [searchedCharacters, setSearchedCharacters] = useState<Character[]>([]);

    useEffect(() => {
        fetch("/api/stats")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched data:", data);
                setCharacters(Array.isArray(data) ? data : []);
                setFilteredCharacters(Array.isArray(data) ? data : []);
                setSearchedCharacters(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error("Failed to fetch characters:", err);
                setCharacters([]);
                setFilteredCharacters([]);
                setSearchedCharacters([]);
            });
    }, []);

    const handleFilter = (filtered: Character[] | null) => {
        setFilteredCharacters(Array.isArray(filtered) ? filtered : []);
    };

    const handleSearch = (searched: Character[] | null) => {
        setSearchedCharacters(Array.isArray(searched) ? searched : []);
    };

    const filteredSearchedCharacters = (Array.isArray(searchedCharacters) ? searchedCharacters : []).filter((character) =>
        Array.isArray(filteredCharacters) && filteredCharacters.includes(character)
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-white mb-4 text-center">Character Rankings</h1>

            {/* Search Bar */}
            <SearchBar characters={characters} onSearch={handleSearch} />

            {/* Filters */}
            <Filters characters={searchedCharacters} onFilter={handleFilter} />

            {/* Character Stats Table */}
            {filteredSearchedCharacters.length > 0 ? (
                <StatsTable characters={filteredSearchedCharacters} />
            ) : (
                <p className="text-center text-white">No characters found.</p>
            )}
        </div>
    );
}
