'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setUser, updateCredits } from '@/lib/redux/slices/userSlice';
import { startGameSession, endGameSession } from '@/lib/redux/slices/gameSlice';
import Header from '@/components/layout/Header';
import ColorMatchGame from '@/components/games/ColorMatchGame';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ColorMatchGamePage() {
  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSession, setGameSession] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/user');
        const result = await response.json();

        if (result.success) {
          dispatch(setUser(result.data));
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/');
      }
    };

    if (!user) {
      checkAuth();
    }
  }, [user, dispatch, router]);

  const handleStartGame = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/games/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameType: 'color-match' }),
      });

      const result = await response.json();

      if (result.success) {
        setGameSession(result.data.id);
        dispatch(startGameSession(result.data));
        setGameStarted(true);
      } else {
        alert(result.error || 'Failed to start game');
      }
    } catch (error) {
      console.error('Failed to start game:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGameEnd = async (score: number) => {
    if (!gameSession) return;

    setLoading(true);
    try {
      const response = await fetch('/api/games/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: gameSession, score }),
      });

      const result = await response.json();

      if (result.success) {
        setResult(result.data);
        dispatch(endGameSession());
        dispatch(
          updateCredits({
            checking: result.data.newBalance,
            savings: user?.credits.savings || 0,
          })
        );
      } else {
        alert(result.error || 'Failed to complete game');
      }
    } catch (error) {
      console.error('Failed to complete game:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
      setGameStarted(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="container">
        <div className={styles.header}>
          <h2>🎨 Color Match</h2>
          <p>Click the correct colored sphere as fast as you can!</p>
        </div>

        {!gameStarted && !result && (
          <div className={styles.startCard}>
            <div className={styles.instructions}>
              <h3>How to Play</h3>
              <ul>
                <li>🎯 Look at the target color at the top</li>
                <li>🖱️ Click the sphere with the matching color</li>
                <li>✅ Correct clicks earn you 100 points</li>
                <li>❌ Wrong clicks lose you 50 points</li>
                <li>⏱️ You have 30 seconds to score as high as you can!</li>
              </ul>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleStartGame}
              disabled={loading}
            >
              {loading ? 'Starting...' : 'Start Game'}
            </button>
          </div>
        )}

        {gameStarted && !result && <ColorMatchGame onGameEnd={handleGameEnd} />}

        {result && (
          <div className={styles.resultCard}>
            <h3>🎉 Game Complete!</h3>
            <div className={styles.resultStats}>
              <div className={styles.resultStat}>
                <span>Score</span>
                <strong>{result.score}</strong>
              </div>
              <div className={styles.resultStat}>
                <span>Reward</span>
                <strong style={{ color: '#10b981' }}>+{result.reward} 💰</strong>
              </div>
              <div className={styles.resultStat}>
                <span>New Balance</span>
                <strong>{result.newBalance.toLocaleString()}</strong>
              </div>
            </div>
            <div className={styles.resultActions}>
              <button className="btn btn-primary" onClick={() => setResult(null)}>
                Play Again
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => router.push('/games')}
              >
                Back to Games
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
