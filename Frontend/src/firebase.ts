import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBPgmatI0kMgpE4M1nXQlogOc3uB1yU-Xg",
  authDomain: "coding-platform-a52ba.firebaseapp.com",
  databaseURL: "https://coding-platform-a52ba-default-rtdb.firebaseio.com",
  projectId: "coding-platform-a52ba",
  storageBucket: "coding-platform-a52ba.appspot.com",
  messagingSenderId: "16555273166",
  appId: "1:16555273166:web:ff0cb6155c03e8c051199f",
  measurementId: "G-YNNK6HN4QW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { app, analytics, auth, db, realtimeDb, googleProvider, githubProvider };

