import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateCredits: (state, action: PayloadAction<{ checking: number; savings: number }>) => {
      if (state.currentUser) {
        state.currentUser.credits = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUser, updateCredits, setLoading, setError, clearUser } = userSlice.actions;
export default userSlice.reducer;
