import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  points: number;
  completedChallenges: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 },
  completedChallenges: [{ type: Schema.Types.ObjectId, ref: 'Challenge' }],
});

export default mongoose.model<IUser>('User', UserSchema);
