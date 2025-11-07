import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { db, availableGames } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { gameType } = await request.json();

    if (!gameType) {
      return NextResponse.json(
        { success: false, error: 'Game type is required' },
        { status: 400 }
      );
    }

    const game = availableGames.find(g => g.id === gameType);
    if (!game) {
      return NextResponse.json(
        { success: false, error: 'Invalid game type' },
        { status: 400 }
      );
    }

    // Check cooldown
    if (!db.canPlayGame(session.userId, gameType, game.cooldown)) {
      return NextResponse.json(
        { success: false, error: 'Game is on cooldown. Please wait before playing again.' },
        { status: 429 }
      );
    }

    const gameSession = db.createGameSession(session.userId, gameType);
    return NextResponse.json({ success: true, data: gameSession });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
