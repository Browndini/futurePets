'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setUser } from '@/lib/redux/slices/userSlice';
import { setPets, addPet } from '@/lib/redux/slices/petSlice';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { Pet } from '@/types';

export default function PetsPage() {
  const user = useAppSelector((state) => state.user.currentUser);
  const pets = useAppSelector((state) => state.pets.pets);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPet, setNewPet] = useState({
    name: '',
    species: 'dog',
    color: '#667eea',
  });

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
    const fetchPets = async () => {
      try {
        const response = await fetch('/api/pets');
        const result = await response.json();

        if (result.success) {
          dispatch(setPets(result.data));
        }
      } catch (error) {
        console.error('Failed to fetch pets:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPets();
    }
  }, [user, dispatch]);

  const handleCreatePet = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPet),
      });

      const result = await response.json();

      if (result.success) {
        dispatch(addPet(result.data));
        setShowCreateForm(false);
        setNewPet({ name: '', species: 'dog', color: '#667eea' });
      } else {
        alert(result.error || 'Failed to create pet');
      }
    } catch (error) {
      console.error('Failed to create pet:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatColor = (value: number) => {
    if (value >= 70) return '#10b981';
    if (value >= 40) return '#f59e0b';
    return '#ef4444';
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="container">
        <div className={styles.header}>
          <div>
            <h2>🐾 My Pets</h2>
            <p>Take care of your virtual companions!</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            + Create Pet
          </button>
        </div>

        {showCreateForm && (
          <div className={styles.modal} onClick={() => setShowCreateForm(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h3>Create a New Pet</h3>
              <form onSubmit={handleCreatePet}>
                <div className={styles.formGroup}>
                  <label>Pet Name</label>
                  <input
                    type="text"
                    value={newPet.name}
                    onChange={(e) =>
                      setNewPet({ ...newPet, name: e.target.value })
                    }
                    required
                    minLength={3}
                    placeholder="Enter pet name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Species</label>
                  <select
                    value={newPet.species}
                    onChange={(e) =>
                      setNewPet({ ...newPet, species: e.target.value })
                    }
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="dragon">Dragon</option>
                    <option value="unicorn">Unicorn</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Color</label>
                  <input
                    type="color"
                    value={newPet.color}
                    onChange={(e) =>
                      setNewPet({ ...newPet, color: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formActions}>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Pet'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading && !showCreateForm ? (
          <div className={styles.loading}>Loading pets...</div>
        ) : pets.length === 0 ? (
          <div className="card text-center">
            <h3>No pets yet!</h3>
            <p>Create your first pet to get started.</p>
          </div>
        ) : (
          <div className="grid grid-3">
            {pets.map((pet: Pet) => (
              <div key={pet.id} className={styles.petCard}>
                <div
                  className={styles.petAvatar}
                  style={{ backgroundColor: pet.color }}
                >
                  <span className={styles.petEmoji}>
                    {pet.species === 'dog' && '🐕'}
                    {pet.species === 'cat' && '🐈'}
                    {pet.species === 'bird' && '🐦'}
                    {pet.species === 'rabbit' && '🐰'}
                    {pet.species === 'dragon' && '🐉'}
                    {pet.species === 'unicorn' && '🦄'}
                  </span>
                </div>
                <h3>{pet.name}</h3>
                <p className={styles.species}>{pet.species}</p>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span>Hunger</span>
                    <div className={styles.statBar}>
                      <div
                        className={styles.statFill}
                        style={{
                          width: `${pet.stats.hunger}%`,
                          backgroundColor: getStatColor(pet.stats.hunger),
                        }}
                      />
                    </div>
                    <strong>{pet.stats.hunger}%</strong>
                  </div>
                  <div className={styles.stat}>
                    <span>Happiness</span>
                    <div className={styles.statBar}>
                      <div
                        className={styles.statFill}
                        style={{
                          width: `${pet.stats.happiness}%`,
                          backgroundColor: getStatColor(pet.stats.happiness),
                        }}
                      />
                    </div>
                    <strong>{pet.stats.happiness}%</strong>
                  </div>
                  <div className={styles.stat}>
                    <span>Health</span>
                    <div className={styles.statBar}>
                      <div
                        className={styles.statFill}
                        style={{
                          width: `${pet.stats.health}%`,
                          backgroundColor: getStatColor(pet.stats.health),
                        }}
                      />
                    </div>
                    <strong>{pet.stats.health}%</strong>
                  </div>
                </div>
                <div className={styles.petLevel}>
                  Level {pet.stats.level} • {pet.stats.experience} XP
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
