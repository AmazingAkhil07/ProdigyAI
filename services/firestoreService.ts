import { db, auth } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UserProgress } from '../types';

export const firestoreService = {
  // Save user progress to Firestore
  async saveProgress(progress: UserProgress) {
    if (!auth.currentUser) throw new Error('User not authenticated');

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        progress,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  },

  // Load user progress from Firestore
  async loadProgress(): Promise<UserProgress | null> {
    if (!auth.currentUser) throw new Error('User not authenticated');

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        return docSnap.data().progress;
      }
      return null;
    } catch (error) {
      console.error('Error loading progress:', error);
      throw error;
    }
  },
};
