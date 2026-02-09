import { create } from 'zustand';
import { User, Tournament } from './types';

interface AppState {
  user: User | null;
  currentTournament: Tournament | null;
  setUser: (user: User | null) => void;
  setCurrentTournament: (tournament: Tournament | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  currentTournament: null,
  setUser: (user) => set({ user }),
  setCurrentTournament: (tournament) => set({ currentTournament: tournament }),
}));
