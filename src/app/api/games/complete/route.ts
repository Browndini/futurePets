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

    const { sessionId, score } = await request.json();

    if (!sessionId || score === undefined) {
      return NextResponse.json(
        { success: false, error: 'Session ID and score are required' },
        { status: 400 }
      );
    }

    const gameSession = db.getGameSession(sessionId);
    if (!gameSession) {
      return NextResponse.json(
        { success: false, error: 'Invalid game session' },
        { status: 400 }
      );
    }

    if (gameSession.userId !== session.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    if (gameSession.completed) {
      return NextResponse.json(
        { success: false, error: 'Game session already completed' },
        { status: 400 }
      );
    }

    const game = availableGames.find(g => g.id === gameSession.gameType);
    if (!game) {
      return NextResponse.json(
        { success: false, error: 'Invalid game type' },
        { status: 400 }
      );
    }

    // Calculate reward based on score (server-side to prevent cheating)
    // Simple formula: normalize score to 0-1 and interpolate between min and max reward
    const normalizedScore = Math.min(Math.max(score / 1000, 0), 1);
    const reward = Math.floor(
      game.minReward + (game.maxReward - game.minReward) * normalizedScore
    );

    // Complete the game session
    db.completeGameSession(sessionId, score, reward);

    // Update user credits
    const user = db.getUser(session.userId);
    if (user) {
      db.updateUserCredits(
        session.userId,
        user.credits.checking + reward,
        user.credits.savings
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        score,
        reward,
        newBalance: user ? user.credits.checking + reward : 0,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
