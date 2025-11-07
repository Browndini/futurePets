'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setUser, setLoading, setError } from '@/lib/redux/slices/userSlice';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();

      if (result.success) {
        dispatch(setUser(result.data));
      } else {
        dispatch(setError(result.error || 'Login failed'));
      }
    } catch (error) {
      dispatch(setError('Network error'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Welcome to FuturePets!</h2>
      <p className={styles.subtitle}>Enter your username to start playing</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className={styles.input}
        required
        minLength={3}
      />
      <button type="submit" className="btn btn-primary">
        Start Playing
      </button>
    </form>
  );
}
