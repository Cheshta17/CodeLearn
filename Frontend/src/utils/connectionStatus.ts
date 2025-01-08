import { ref, onValue } from 'firebase/database';
import { realtimeDb } from '../firebase';

export const checkConnectionStatus = (callback: (isOnline: boolean) => void) => {
  const connectedRef = ref(realtimeDb, '.info/connected');
  return onValue(connectedRef, (snap) => {
    callback(snap.val() === true);
  });
};

