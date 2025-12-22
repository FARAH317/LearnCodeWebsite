import { create } from 'zustand';
import { Challenge } from '@/types';
import { challengeService, ChallengeAttempt, LeaderboardUser } from '@/services/challengeService';

interface ChallengeState {
  challenges: Challenge[];
  currentChallenge: Challenge | null;
  attempts: ChallengeAttempt[];
  leaderboard: LeaderboardUser[];
  myAttempts: ChallengeAttempt[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchChallenges: () => Promise<void>;
  fetchChallenge: (id: string) => Promise<void>;
  submitAttempt: (challengeId: string, code: string, timeSpent?: number) => Promise<any>;
  fetchChallengeAttempts: (challengeId: string) => Promise<void>;
  fetchLeaderboard: () => Promise<void>;
  fetchMyAttempts: () => Promise<void>;
  clearError: () => void;
}

export const useChallengeStore = create<ChallengeState>((set) => ({
  challenges: [],
  currentChallenge: null,
  attempts: [],
  leaderboard: [],
  myAttempts: [],
  isLoading: false,
  error: null,

  fetchChallenges: async () => {
    set({ isLoading: true, error: null });
    try {
      const challenges = await challengeService.getAllChallenges();
      set({ challenges, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchChallenge: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const challenge = await challengeService.getChallengeById(id);
      set({ currentChallenge: challenge, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  submitAttempt: async (challengeId: string, code: string, timeSpent?: number) => {
    set({ isLoading: true, error: null });
    try {
      const result = await challengeService.submitAttempt(challengeId, code, timeSpent);
      set({ isLoading: false });
      return result;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  fetchChallengeAttempts: async (challengeId: string) => {
    try {
      const attempts = await challengeService.getChallengeAttempts(challengeId);
      set({ attempts });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  fetchLeaderboard: async () => {
    set({ isLoading: true, error: null });
    try {
      const leaderboard = await challengeService.getLeaderboard();
      set({ leaderboard, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchMyAttempts: async () => {
    try {
      const myAttempts = await challengeService.getMyAttempts();
      set({ myAttempts });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  clearError: () => set({ error: null }),
}));