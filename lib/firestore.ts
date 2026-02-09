import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  Timestamp,
} from 'firebase/firestore';
import { Tournament } from './types';

// Save tournament to Firestore
export async function saveTournament(tournament: Tournament): Promise<void> {
  try {
    const tournamentRef = doc(db, 'tournaments', tournament.id);
    await setDoc(tournamentRef, {
      ...tournament,
      createdAt: Timestamp.fromDate(tournament.createdAt),
    });
  } catch (error) {
    console.error('Error saving tournament:', error);
    throw error;
  }
}

// Get tournament by ID
export async function getTournament(tournamentId: string): Promise<Tournament | null> {
  try {
    const tournamentRef = doc(db, 'tournaments', tournamentId);
    const tournamentSnap = await getDoc(tournamentRef);

    if (tournamentSnap.exists()) {
      const data = tournamentSnap.data();
      return {
        ...data,
        createdAt: data.createdAt.toDate(),
      } as Tournament;
    }
    return null;
  } catch (error) {
    console.error('Error getting tournament:', error);
    throw error;
  }
}

// Get all tournaments for a user
export async function getUserTournaments(userId: string): Promise<Tournament[]> {
  try {
    const tournamentsRef = collection(db, 'tournaments');
    const q = query(
      tournamentsRef,
      where('owners', 'array-contains', { userId })
    );

    const querySnapshot = await getDocs(q);
    const tournaments: Tournament[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tournaments.push({
        ...data,
        createdAt: data.createdAt.toDate(),
      } as Tournament);
    });

    return tournaments;
  } catch (error) {
    console.error('Error getting user tournaments:', error);
    return [];
  }
}

// Save or update user profile
export async function saveUserProfile(userId: string, userData: {
  email: string;
  name: string;
  tournamentIds: string[];
}): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
}

// Get user profile
export async function getUserProfile(userId: string): Promise<any> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

// Add tournament to user's list
export async function addTournamentToUser(userId: string, tournamentId: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      tournamentIds: arrayUnion(tournamentId)
    });
  } catch (error) {
    console.error('Error adding tournament to user:', error);
    throw error;
  }
}

// Update tournament
export async function updateTournament(tournamentId: string, updates: Partial<Tournament>): Promise<void> {
  try {
    const tournamentRef = doc(db, 'tournaments', tournamentId);
    await updateDoc(tournamentRef, updates);
  } catch (error) {
    console.error('Error updating tournament:', error);
    throw error;
  }
}
