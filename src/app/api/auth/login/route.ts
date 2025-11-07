import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    if (!username || username.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Username is required' },
        { status: 400 }
      );
    }

    let user = db.getUserByUsername(username);
    if (!user) {
      // Create new user if doesn't exist (simplified for demo)
      user = db.createUser(username);
    }

    const session = await getSession();
    session.userId = user.id;
    session.username = user.username;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
