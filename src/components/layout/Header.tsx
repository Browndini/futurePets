'use client';

import { useAppSelector } from '@/lib/redux/hooks';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const user = useAppSelector((state) => state.user.currentUser);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <h1>🐾 FuturePets</h1>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/games" className={styles.navLink}>Games</Link>
          <Link href="/pets" className={styles.navLink}>My Pets</Link>
        </nav>
        {user && (
          <div className={styles.userInfo}>
            <span className={styles.username}>{user.username}</span>
            <span className={styles.credits}>💰 {user.credits.checking.toLocaleString()}</span>
          </div>
        )}
      </div>
    </header>
  );
}
