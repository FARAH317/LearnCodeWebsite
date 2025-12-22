import api from './api';
import { ApiResponse, Challenge } from '@/types';

export interface ChallengeAttempt {
  id: string;
  userId: string;
  challengeId: string;
  code: string;
  passed: boolean;
  score: number;
  timeSpent?: number;
  createdAt: string;
}

export interface LeaderboardUser {
  id: string;
  username: string;
  fullName: string;
  avatar?: string;
  xp: number;
  level: number;
  _count: {
    challenges: number;
  };
}

export const challengeService = {
  // Récupérer tous les challenges
  async getAllChallenges(): Promise<Challenge[]> {
    const response = await api.get<ApiResponse<Challenge[]>>('/challenges');
    return response.data.data || [];
  },

  // Récupérer un challenge par ID
  async getChallengeById(id: string): Promise<Challenge> {
    const response = await api.get<ApiResponse<Challenge>>(`/challenges/${id}`);
    if (!response.data.data) throw new Error('Challenge not found');
    return response.data.data;
  },

  // Soumettre une tentative
  async submitAttempt(challengeId: string, code: string, timeSpent?: number): Promise<any> {
    const response = await api.post<ApiResponse<any>>(`/challenges/${challengeId}/attempt`, {
      code,
      timeSpent,
    });
    return response.data.data;
  },

  // Récupérer les tentatives d'un challenge
  async getChallengeAttempts(challengeId: string): Promise<ChallengeAttempt[]> {
    const response = await api.get<ApiResponse<ChallengeAttempt[]>>(`/challenges/${challengeId}/attempts`);
    return response.data.data || [];
  },

  // Récupérer le leaderboard
  async getLeaderboard(): Promise<LeaderboardUser[]> {
    const response = await api.get<ApiResponse<LeaderboardUser[]>>('/challenges/leaderboard');
    return response.data.data || [];
  },

  // Récupérer mes tentatives
  async getMyAttempts(): Promise<ChallengeAttempt[]> {
    const response = await api.get<ApiResponse<ChallengeAttempt[]>>('/challenges/my-attempts');
    return response.data.data || [];
  },
};