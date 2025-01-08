import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, signInWithPopup, AuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth, githubProvider, googleProvider } from '../firebase';
import { toast } from 'react-hot-toast';

export interface ExtendedUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  completedChallenges: number;
  currentStreak: number;
  badges: string[];
}

export const signUp = async (email: string, password: string, name: string): Promise<User> => {
  if (!auth) {
    throw new Error('Firebase authentication is not initialized');
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      completedChallenges: 0,
      currentStreak: 0,
      badges: [],
    });
    return user;
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  if (!auth) {
    throw new Error('Firebase authentication is not initialized');
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

export const signInWithProvider = async (provider: AuthProvider): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error: any) {
    console.error('Error during sign in with provider:', error);
    if (error.code === 'auth/configuration-not-found') {
      toast.error('Authentication configuration is missing. Please check your Firebase setup.');
    } else {
      toast.error('Failed to sign in. Please try again.');
    }
    return null;
  }
};

export const signInWithGithub = () => signInWithProvider(githubProvider);
export const signInWithGoogle = () => signInWithProvider(googleProvider);

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

export const getUserData = async (userId: string): Promise<ExtendedUser> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    if (!userData) {
      throw new Error('User data not found');
    }
    return {
      uid: userId,
      email: userData.email || null,
      displayName: userData.name || null,
      completedChallenges: userData.completedChallenges || 0,
      currentStreak: userData.currentStreak || 0,
      badges: userData.badges || [],
    };
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

export const updateUserProgress = async (userId: string, completedChallenges: number, currentStreak: number): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      completedChallenges,
      currentStreak,
    });
  } catch (error) {
    console.error('Error updating user progress:', error);
    throw error;
  }
};

export const addBadgeToUser = async (userId: string, badge: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      badges: arrayUnion(badge),
    });
  } catch (error) {
    console.error('Error adding badge to user:', error);
    throw error;
  }
};

