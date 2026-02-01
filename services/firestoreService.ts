import { db, auth } from './firebaseConfig';
import { doc, setDoc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { UserProgress } from '../types';

export interface UserLeaderboardEntry {
  uid: string;
  email: string;
  progress: UserProgress;
  updatedAt: string;
  score: number;
}

export const firestoreService = {
  // Save user progress to Firestore
  async saveProgress(progress: UserProgress) {
    if (!auth.currentUser) throw new Error('User not authenticated');

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, {
        email: auth.currentUser.email,
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

  // Fetch all users' progress for leaderboard
  async getAllUsersProgress(): Promise<UserLeaderboardEntry[]> {
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      
      const users: UserLeaderboardEntry[] = [];
      
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.progress) {
          const score = (data.progress.completedTodos?.length || 0) * 10 +
                       (data.progress.streak || 0) * 5 +
                       ((data.progress.badges?.length || 0) * 20);
          
          console.log('Found user:', data.email);
          
          users.push({
            uid: docSnap.id,
            email: data.email || 'Anonymous User',
            progress: data.progress,
            updatedAt: data.updatedAt || new Date().toISOString(),
            score,
          });
        }
      });
      
      console.log('Total leaderboard users:', users.length);
      
      // Sort by score descending
      return users.sort((a, b) => b.score - a.score);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      return [];
    }
  },
};
