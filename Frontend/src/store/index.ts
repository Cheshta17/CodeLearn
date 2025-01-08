import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import challengeReducer from './challengeSlice';
import leaderboardReducer from './leaderboardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    challenge: challengeReducer,
    leaderboard: leaderboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

