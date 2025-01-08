import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number;
  starterCode: string;
}

interface ChallengeState {
  challenges: Challenge[];
  currentChallenge: Challenge | null;
}

const initialState: ChallengeState = {
  challenges: [],
  currentChallenge: null,
};

const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    setChallenges: (state, action: PayloadAction<Challenge[]>) => {
      state.challenges = action.payload;
    },
    setCurrentChallenge: (state, action: PayloadAction<Challenge>) => {
      state.currentChallenge = action.payload;
    },
  },
});

export const { setChallenges, setCurrentChallenge } = challengeSlice.actions;
export default challengeSlice.reducer;

