'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setUser, setLoading } from '@/lib/redux/slices/userSlice';
import Header from '@/components/layout/Header';
import LoginForm from '@/components/ui/LoginForm';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const user = useAppSelector((state) => state.user.currentUser);
  const loading = useAppSelector((state) => state.user.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch('/api/user');
        const result = await response.json();

        if (result.success) {
          dispatch(setUser(result.data));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.loginContainer}>
        <LoginForm />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="container">
        <div className={styles.hero}>
          <h2>Welcome back, {user.username}! 🎉</h2>
          <p className={styles.subtitle}>
            Your virtual pets are waiting for you!
          </p>
        </div>

        <div className="grid grid-2">
          <Link href="/games" className={styles.featureCard}>
            <div className={styles.icon}>🎮</div>
            <h3>Play Mini-Games</h3>
            <p>Earn credits by playing fun Babylon.js powered games!</p>
          </Link>

          <Link href="/pets" className={styles.featureCard}>
            <div className={styles.icon}>🐾</div>
            <h3>My Pets</h3>
            <p>Take care of your virtual pets and watch them grow!</p>
          </Link>
        </div>

        <div className="card">
          <h3>About FuturePets</h3>
          <p>
            FuturePets is a modern virtual pet game inspired by NeoPets. Take care of your pets,
            play mini-games powered by Babylon.js to earn credits, and build your collection!
          </p>
          <ul className={styles.features}>
            <li>✨ Create and customize your own virtual pets</li>
            <li>🎮 Play 3D mini-games built with Babylon.js</li>
            <li>💰 Earn credits to buy items and upgrades</li>
            <li>📊 Track your pet&apos;s stats and progress</li>
            <li>🔒 Server-side validation prevents cheating</li>
          </ul>
        </div>
      </main>
    </>
  );
}
