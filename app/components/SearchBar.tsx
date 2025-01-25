import { useState } from "react";
import { Character } from "./types";

type SearchBarProps = {
    characters: Character[];
    onSearch: (filtered: Character[]) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ characters, onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setQuery(value);

        const filteredResults = characters.filter((character) =>
            character.name.toLowerCase().includes(value)
        );

        onSearch(filteredResults);
    };

    return (
        <div className="w-full flex justify-center my-4">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search characters..."
                className="w-full md:w-1/2 p-3 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchBar;
