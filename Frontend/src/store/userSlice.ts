import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  name: string;
  email: string;
  completedChallenges: number;
  currentStreak: number;
  badges: string[];
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  completedChallenges: 0,
  currentStreak: 0,
  badges: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
