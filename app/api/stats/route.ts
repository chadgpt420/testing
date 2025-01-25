import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || "";

if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables.');
}

export async function GET(req: NextRequest) {
    let client;
    try {
        client = new MongoClient(uri);
        await client.connect();
        const db = client.db('paperdoll_database');
        const characterCollection = db.collection('characters');
        const logsCollection = db.collection('character_logs');

        const { searchParams } = new URL(req.url);
        const name = searchParams.get('name');

        if (name) {
            const character = await characterCollection.findOne({ name });

            if (!character) {
                return NextResponse.json({ message: 'Character not found' }, { status: 404 });
            }

            const logs = await logsCollection
                .find({ character_name: name })
                .sort({ date_saved: -1 })
                .toArray();

            return NextResponse.json({
                character,
                logs,
            });
        } else {
            const allCharacters = await characterCollection.find({}).toArray();

            if (allCharacters.length === 0) {
                return NextResponse.json({ message: 'No characters found' }, { status: 404 });
            }

            return NextResponse.json(allCharacters);
        }
    } catch (error) {
        console.error('Error fetching character data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    } finally {
        if (client) await client.close();
    }
}

export const dynamic = 'force-dynamic';
