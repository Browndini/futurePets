import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { availableGames, db } from '@/lib/db';

export async function GET() {
  try {
    const session = await getSession();

    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Check which games can be played (cooldown check)
    const gamesWithStatus = availableGames.map(game => ({
      ...game,
      canPlay: db.canPlayGame(session.userId, game.id, game.cooldown),
    }));

    return NextResponse.json({ success: true, data: gamesWithStatus });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
