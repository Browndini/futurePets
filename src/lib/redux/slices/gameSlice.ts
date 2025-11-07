import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameSession, MiniGame } from '@/types';

interface GameState {
  availableGames: MiniGame[];
  currentSession: GameSession | null;
  recentSessions: GameSession[];
  loading: boolean;
  error: string | null;
}

const initialState: GameState = {
  availableGames: [],
  currentSession: null,
  recentSessions: [],
  loading: false,
  error: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setAvailableGames: (state, action: PayloadAction<MiniGame[]>) => {
      state.availableGames = action.payload;
    },
    startGameSession: (state, action: PayloadAction<GameSession>) => {
      state.currentSession = action.payload;
    },
    endGameSession: (state) => {
      if (state.currentSession) {
        state.recentSessions.unshift(state.currentSession);
        if (state.recentSessions.length > 10) {
          state.recentSessions = state.recentSessions.slice(0, 10);
        }
      }
      state.currentSession = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setAvailableGames, startGameSession, endGameSession, setLoading, setError } = gameSlice.actions;
export default gameSlice.reducer;
