import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs, doc, updateDoc } from 'firebase/firestore';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: number;
}

export const getLeaderboard = async (limitCount: number = 100): Promise<LeaderboardEntry[]> => {
  const leaderboardQuery = query(
    collection(db, 'users'),
    orderBy('score', 'desc'),
    limit(limitCount)
  );
  const leaderboardSnapshot = await getDocs(leaderboardQuery);
  return leaderboardSnapshot.docs.map((doc, index) => ({
    id: doc.id,
    name: doc.data().name,
    score: doc.data().score,
    rank: index + 1,
  }));
};

export const updateUserScore = async (userId: string, newScore: number): Promise<void> => {
  await updateDoc(doc(db, 'users', userId), {
    score: newScore,
  });
};

