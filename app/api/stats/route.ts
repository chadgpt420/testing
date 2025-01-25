import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || "";

if (!uri) {
    throw new Error("MONGO_URI is not defined in environment variables.");
}

// Caching the database connection to avoid multiple reconnections
let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        console.log("Using cached database connection");
        return { client: cachedClient, db: cachedDb };
    }

    console.log("Establishing new database connection");
    const client = new MongoClient(uri, { maxPoolSize: 10 });
    await client.connect();
    const db = client.db("paperdoll_database");

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

export async function GET(req: NextRequest) {
    try {
        const { client, db } = await connectToDatabase();
        const characterCollection = db.collection("characters");
        const logsCollection = db.collection("character_logs");

        const { searchParams } = new URL(req.url);
        const name = searchParams.get("name");

        if (name) {
            const character = await characterCollection.findOne({ name });
            if (!character) {
                return NextResponse.json({ message: "Character not found" }, { status: 404 });
            }

            const logs = await logsCollection.find({ character_name: name })
                .sort({ date_saved: -1 })
                .limit(20)
                .toArray();

            return NextResponse.json({ character, logs });
        } else {
            const allCharacters = await characterCollection.find({}).limit(50).toArray();
            return NextResponse.json(allCharacters);
        }
    } catch (error) {
        console.error("Error fetching character data:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";
