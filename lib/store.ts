import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Tournament } from './types';

interface AppState {
  user: User | null;
  currentTournament: Tournament | null;
  userTournaments: Tournament[];
  setUser: (user: User | null) => void;
  setCurrentTournament: (tournament: Tournament | null) => void;
  setUserTournaments: (tournaments: Tournament[]) => void;
  addTournament: (tournament: Tournament) => void;
  removeTournament: (tournamentId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      currentTournament: null,
      userTournaments: [],
      setUser: (user) => set({ user }),
      setCurrentTournament: (tournament) => set({ currentTournament: tournament }),
      setUserTournaments: (tournaments) => set({ userTournaments: tournaments }),
      addTournament: (tournament) =>
        set((state) => ({
          userTournaments: [...state.userTournaments, tournament],
          currentTournament: tournament
        })),
      removeTournament: (tournamentId) =>
        set((state) => ({
          userTournaments: state.userTournaments.filter(t => t.id !== tournamentId),
          currentTournament: state.currentTournament?.id === tournamentId ? null : state.currentTournament
        })),
    }),
    {
      name: 't20-fantasy-storage',
    }
  )
);
