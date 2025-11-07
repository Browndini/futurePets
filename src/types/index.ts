// Core game types for FuturePets

export interface User {
  id: string;
  username: string;
  credits: {
    checking: number;
    savings: number;
  };
  createdAt: Date;
  lastActive: Date;
}

export interface Pet {
  id: string;
  userId: string;
  name: string;
  species: string;
  color: string;
  stats: PetStats;
  createdAt: Date;
  lastFed: Date;
}

export interface PetStats {
  hunger: number; // 0-100
  happiness: number; // 0-100
  health: number; // 0-100
  level: number;
  experience: number;
}

export interface GameSession {
  id: string;
  userId: string;
  gameType: string;
  startTime: Date;
  endTime?: Date;
  score?: number;
  reward?: number;
  completed: boolean;
}

export interface MiniGame {
  id: string;
  name: string;
  description: string;
  minReward: number;
  maxReward: number;
  cooldown: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameResult {
  score: number;
  reward: number;
  newBalance: number;
  statsChanged?: Partial<PetStats>;
}

// Session type for authentication
export interface SessionData {
  userId: string;
  username: string;
  isLoggedIn: boolean;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
