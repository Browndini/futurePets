import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import petReducer from './slices/petSlice';
import gameReducer from './slices/gameSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      pets: petReducer,
      game: gameReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these field paths in all actions
          ignoredActionPaths: ['payload.createdAt', 'payload.lastActive', 'payload.lastFed', 'payload.startTime', 'payload.endTime'],
          // Ignore these paths in the state
          ignoredPaths: ['user.currentUser.createdAt', 'user.currentUser.lastActive', 'pets.pets', 'game.currentSession'],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
