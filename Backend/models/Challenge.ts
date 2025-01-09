import mongoose, { Document, Schema } from 'mongoose';

interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface IChallenge extends Document {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  points: number;
  initialCode: Record<string, string>;
  testCases: TestCase[];
}

const ChallengeSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  category: { type: String, required: true },
  points: { type: Number, required: true },
  initialCode: { type: Map, of: String },
  testCases: [{ input: String, expectedOutput: String }],
});

export default mongoose.model<IChallenge>('Challenge', ChallengeSchema);
