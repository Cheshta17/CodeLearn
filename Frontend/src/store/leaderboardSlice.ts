import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: number;
}

interface LeaderboardState {
  entries: LeaderboardEntry[];
}

const initialState: LeaderboardState = {
  entries: [],
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderboard: (state, action: PayloadAction<LeaderboardEntry[]>) => {
      state.entries = action.payload;
    },
    updateLeaderboardEntry: (state, action: PayloadAction<LeaderboardEntry>) => {
      const index = state.entries.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      } else {
        state.entries.push(action.payload);
      }
      state.entries.sort((a, b) => b.score - a.score);
      state.entries.forEach((entry, index) => {
        entry.rank = index + 1;
      });
    },
  },
});

export const { setLeaderboard, updateLeaderboardEntry } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;

