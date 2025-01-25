"use client";

import { useEffect, useState } from "react";

export default function InviteList() {
    const [names, setNames] = useState<string[]>([]);
    const [invitingNames, setInvitingNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchNames = async () => {
            try {
                const res = await fetch('/api/invite');
                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await res.json();
                setNames(data.names);
            } catch (error) {
                console.error("Failed to fetch names:", error);
            }
        };

        fetchNames();
        const interval = setInterval(fetchNames, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleStartInvites = async () => {
        if (names.length === 0) {
            alert("No names to invite!");
            return;
        }

        setInvitingNames((prevInvites) => [...prevInvites, ...names]);
        setNames([]);

        localStorage.setItem("invitingList", JSON.stringify([...invitingNames, ...names]));
        localStorage.removeItem("inviteList");

        try {
            await fetch('/api/invite', { method: 'DELETE' });
        } catch (error) {
            console.error("Error clearing invite list from server:", error);
        }

        copyNextInvite([...invitingNames, ...names]);
    };

    const copyNextInvite = (list: string[]) => {
        if (list.length > 0) {
            navigator.clipboard.writeText(`/invite ${list[0]}`)
                .then(() => {
                    setInvitingNames(list.slice(1));
                    localStorage.setItem("invitingList", JSON.stringify(list.slice(1)));
                })
                .catch((err) => console.error("Clipboard write failed:", err));
        } else {
            alert("No more names to invite!");
        }
    };

    const handlePaste = (event: ClipboardEvent) => {
        if (invitingNames.length > 0) {
            copyNextInvite(invitingNames);
        }
    };

    useEffect(() => {
        document.addEventListener("paste", handlePaste);
        return () => {
            document.removeEventListener("paste", handlePaste);
        };
    }, [invitingNames]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && invitingNames.length > 0) {
                copyNextInvite(invitingNames);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [invitingNames]);

    const handleClearList = async () => {
        try {
            const res = await fetch('/api/invite', { method: 'DELETE' });
            if (res.ok) {
                setNames([]);
                setInvitingNames([]);
                localStorage.removeItem("inviteList");
                localStorage.removeItem("invitingList");
                alert("Invite list cleared!");
            } else {
                alert("Failed to clear the invite list.");
            }
        } catch (error) {
            console.error("Error clearing list:", error);
            alert("Error clearing the invite list.");
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-900 min-h-screen py-10">
            <div className="w-full max-w-5xl p-6 bg-gray-800 text-white rounded-lg shadow-lg">
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        onClick={handleStartInvites}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Start Invites
                    </button>
                    <button
                        onClick={handleClearList}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Clear List
                    </button>
                </div>

                <h2 className="text-2xl font-bold text-center mb-4">Invite Management</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2 text-center">Invite List</h3>
                        <ul className="space-y-2">
                            {names.length > 0 ? (
                                names.map((name, index) => (
                                    <li key={index} className="p-3 bg-gray-600 rounded-lg text-center text-lg font-medium">
                                        {name}
                                    </li>
                                ))
                            ) : (
                                <p className="text-center text-gray-400">No invites yet.</p>
                            )}
                        </ul>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2 text-center">Inviting...</h3>
                        <ul className="space-y-2">
                            {invitingNames.length > 0 ? (
                                invitingNames.map((name, index) => (
                                    <li key={index} className="p-3 bg-gray-500 rounded-lg text-center text-lg font-medium">
                                        {name}
                                    </li>
                                ))
                            ) : (
                                <p className="text-center text-gray-400">No invites in progress.</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
