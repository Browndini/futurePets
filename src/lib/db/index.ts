import { User, Pet, GameSession, MiniGame } from '@/types';
import { nanoid } from 'nanoid';

// In-memory database (replace with real database in production)
// This ensures game data is managed server-side to prevent client manipulation

class InMemoryDB {
  private users: Map<string, User> = new Map();
  private pets: Map<string, Pet> = new Map();
  private gameSessions: Map<string, GameSession> = new Map();
  private userPets: Map<string, string[]> = new Map(); // userId -> petIds
  private lastGamePlay: Map<string, Map<string, Date>> = new Map(); // userId -> gameType -> lastPlayed

  constructor() {
    // Initialize with a demo user
    this.createDemoUser();
  }

  private createDemoUser() {
    const userId = 'demo-user-id';
    const user: User = {
      id: userId,
      username: 'Browndini',
      credits: {
        checking: 10000,
        savings: 0,
      },
      createdAt: new Date(),
      lastActive: new Date(),
    };
    this.users.set(userId, user);
  }

  // User methods
  getUser(userId: string): User | undefined {
    return this.users.get(userId);
  }

  getUserByUsername(username: string): User | undefined {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  createUser(username: string): User {
    const user: User = {
      id: nanoid(),
      username,
      credits: { checking: 5000, savings: 0 },
      createdAt: new Date(),
      lastActive: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  updateUserCredits(userId: string, checking: number, savings: number): boolean {
    const user = this.users.get(userId);
    if (!user) return false;
    user.credits.checking = checking;
    user.credits.savings = savings;
    user.lastActive = new Date();
    return true;
  }

  // Pet methods
  getPet(petId: string): Pet | undefined {
    return this.pets.get(petId);
  }

  getUserPets(userId: string): Pet[] {
    const petIds = this.userPets.get(userId) || [];
    return petIds.map(id => this.pets.get(id)).filter(Boolean) as Pet[];
  }

  createPet(userId: string, name: string, species: string, color: string): Pet {
    const pet: Pet = {
      id: nanoid(),
      userId,
      name,
      species,
      color,
      stats: {
        hunger: 100,
        happiness: 100,
        health: 100,
        level: 1,
        experience: 0,
      },
      createdAt: new Date(),
      lastFed: new Date(),
    };
    this.pets.set(pet.id, pet);

    const userPets = this.userPets.get(userId) || [];
    userPets.push(pet.id);
    this.userPets.set(userId, userPets);

    return pet;
  }

  updatePetStats(petId: string, stats: Partial<Pet['stats']>): boolean {
    const pet = this.pets.get(petId);
    if (!pet) return false;
    pet.stats = { ...pet.stats, ...stats };
    return true;
  }

  // Game session methods
  createGameSession(userId: string, gameType: string): GameSession {
    const session: GameSession = {
      id: nanoid(),
      userId,
      gameType,
      startTime: new Date(),
      completed: false,
    };
    this.gameSessions.set(session.id, session);
    return session;
  }

  completeGameSession(sessionId: string, score: number, reward: number): boolean {
    const session = this.gameSessions.get(sessionId);
    if (!session || session.completed) return false;

    session.endTime = new Date();
    session.score = score;
    session.reward = reward;
    session.completed = true;

    // Update last game play time
    if (!this.lastGamePlay.has(session.userId)) {
      this.lastGamePlay.set(session.userId, new Map());
    }
    this.lastGamePlay.get(session.userId)!.set(session.gameType, new Date());

    return true;
  }

  canPlayGame(userId: string, gameType: string, cooldownMinutes: number): boolean {
    const userGames = this.lastGamePlay.get(userId);
    if (!userGames) return true;

    const lastPlayed = userGames.get(gameType);
    if (!lastPlayed) return true;

    const now = new Date();
    const diffMs = now.getTime() - lastPlayed.getTime();
    const diffMinutes = diffMs / (1000 * 60);

    return diffMinutes >= cooldownMinutes;
  }

  getGameSession(sessionId: string): GameSession | undefined {
    return this.gameSessions.get(sessionId);
  }
}

// Export singleton instance
export const db = new InMemoryDB();

// Available mini-games
export const availableGames: MiniGame[] = [
  {
    id: 'color-match',
    name: 'Color Match',
    description: 'Match colors in this fast-paced Babylon.js game!',
    minReward: 10,
    maxReward: 100,
    cooldown: 5,
    difficulty: 'easy',
  },
  {
    id: 'pet-racing',
    name: 'Pet Racing',
    description: 'Race your pet through 3D obstacles!',
    minReward: 50,
    maxReward: 200,
    cooldown: 10,
    difficulty: 'medium',
  },
  {
    id: 'treasure-hunt',
    name: 'Treasure Hunt',
    description: 'Find hidden treasures in a 3D world!',
    minReward: 100,
    maxReward: 500,
    cooldown: 30,
    difficulty: 'hard',
  },
];
