import { NextResponse } from 'next/server';

let inviteList: string[] = [];

export async function GET() {
    return NextResponse.json({ names: inviteList });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name } = body;

        if (typeof name === 'string' && name.trim().length > 2 && !inviteList.includes(name)) {
            inviteList.push(name.trim());
            return NextResponse.json({ success: true, names: inviteList });
        }

        return NextResponse.json({ success: false, message: 'Invalid or duplicate name' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error processing request' }, { status: 500 });
    }
}

export async function DELETE() {
    inviteList = [];
    return NextResponse.json({ success: true, message: "Invite list cleared" });
}
