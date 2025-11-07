'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setUser } from '@/lib/redux/slices/userSlice';
import { setAvailableGames } from '@/lib/redux/slices/gameSlice';
import { updateCredits } from '@/lib/redux/slices/userSlice';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

interface Game {
  id: string;
  name: string;
  description: string;
  minReward: number;
  maxReward: number;
  cooldown: number;
  difficulty: string;
  canPlay: boolean;
}

export default function GamesPage() {
  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games/available');
        const result = await response.json();

        if (result.success) {
          setGames(result.data);
          dispatch(setAvailableGames(result.data));
        }
      } catch (error) {
        console.error('Failed to fetch games:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchGames();
    }
  }, [user, dispatch]);

  if (!user) {
    return null;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#10b981';
      case 'medium':
        return '#f59e0b';
      case 'hard':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <>
      <Header />
      <main className="container">
        <div className={styles.header}>
          <h2>🎮 Mini-Games</h2>
          <p>Play games to earn credits and level up your pets!</p>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading games...</div>
        ) : (
          <div className="grid grid-3">
            {games.map((game) => (
              <div key={game.id} className={styles.gameCard}>
                <div className={styles.gameHeader}>
                  <h3>{game.name}</h3>
                  <span
                    className={styles.difficulty}
                    style={{ backgroundColor: getDifficultyColor(game.difficulty) }}
                  >
                    {game.difficulty}
                  </span>
                </div>
                <p className={styles.description}>{game.description}</p>
                <div className={styles.rewards}>
                  <div className={styles.rewardInfo}>
                    <span>💰 Reward</span>
                    <strong>
                      {game.minReward} - {game.maxReward}
                    </strong>
                  </div>
                  <div className={styles.rewardInfo}>
                    <span>⏱️ Cooldown</span>
                    <strong>{game.cooldown} min</strong>
                  </div>
                </div>
                <Link
                  href={`/games/${game.id}`}
                  className={`btn ${game.canPlay ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    width: '100%',
                    opacity: game.canPlay ? 1 : 0.5,
                    pointerEvents: game.canPlay ? 'auto' : 'none',
                  }}
                >
                  {game.canPlay ? 'Play Now' : 'On Cooldown'}
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && games.length === 0 && (
          <div className="card text-center">
            <p>No games available at the moment.</p>
          </div>
        )}
      </main>
    </>
  );
}
