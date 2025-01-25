"use client";

import { useState } from "react";

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

type CharacterLogsProps = {
    logs: CharacterLog[];
    defaultItemsPerPage?: number;  
};

const CharacterLogs = ({ logs, defaultItemsPerPage = 5 }: CharacterLogsProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

    const totalPages = Math.ceil(logs.length / itemsPerPage);

    const currentLogs = logs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold text-white border-b border-gray-600 pb-2">Stat History</h2>
            {logs.length > 0 ? (
                <>
                    <div className="flex justify-end  pt-5 mb-4">
                        <label className="text-gray-400 mt-1 mr-2">Show per page:</label>
                        <select
                            className="bg-gray-800 text-white p-2 rounded-md border border-gray-600"
                            onChange={handleItemsPerPageChange}
                            value={itemsPerPage}
                        >
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <ul className="mt-4 space-y-4">
                        {currentLogs.map((log, index) => (
                            <li key={index} className="bg-gray-800 p-6 rounded-md border border-gray-700">
                                <div className="flex gap-8 border-b border-gray-700 pb-4 mb-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-400 font-medium">Date:</span>
                                        <span className="font-bold">{new Date(log.date_saved).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-400 font-medium">Overall:</span>
                                        <span className="font-bold text-green-500">{log.overall}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-y-4 gap-x-10">
                                    <div className="flex justify-between space-x-4">
                                        <span className="text-gray-400">Strength:</span>
                                        <span className="font-bold">{log.strength}</span>
                                    </div>
                                    <div className="flex justify-between space-x-4">
                                        <span className="text-gray-400">Dexterity:</span>
                                        <span className="font-bold">{log.dexterity}</span>
                                    </div>
                                    <div className="flex justify-between space-x-4">
                                        <span className="text-gray-400">Constitution:</span>
                                        <span className="font-bold">{log.constitution}</span>
                                    </div>
                                    <div className="flex justify-between space-x-4">
                                        <span className="text-gray-400">Intelligence:</span>
                                        <span className="font-bold">{log.intelligence}</span>
                                    </div>
                                    <div className="flex justify-between space-x-4">
                                        <span className="text-gray-400">Wisdom:</span>
                                        <span className="font-bold">{log.wisdom}</span>
                                    </div>
                                    <div className="flex justify-between space-x-4">
                                        <span className="text-gray-400">Mentality:</span>
                                        <span className="font-bold">{log.mentality}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-center mt-6 space-x-4">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            className={`px-4 py-2 rounded-md text-white ${currentPage === 1 ? 'bg-gray-600 opacity-50 pointer-events-none' : 'bg-gray-700 hover:bg-gray-600'
                                }`}
                        >
                            Previous
                        </button>
                        <span className="text-white text-lg">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            className={`px-4 py-2 rounded-md text-white ${currentPage === totalPages ? 'bg-gray-600 opacity-50 pointer-events-none' : 'bg-gray-700 hover:bg-gray-600'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-gray-400 mt-4">No logging history available.</p>
            )}
        </div>
    );
};

export default CharacterLogs;
