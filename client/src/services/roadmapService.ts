import api from './api';
import { ApiResponse, Roadmap, RoadmapStep } from '@/types';

export const roadmapService = {
  // Récupérer toutes les roadmaps publiques
  async getAllRoadmaps(): Promise<Roadmap[]> {
    const response = await api.get<ApiResponse<Roadmap[]>>('/roadmaps');
    return response.data.data || [];
  },

  // Récupérer mes roadmaps
  async getMyRoadmaps(): Promise<Roadmap[]> {
    const response = await api.get<ApiResponse<Roadmap[]>>('/roadmaps/my-roadmaps');
    return response.data.data || [];
  },

  // Récupérer une roadmap par ID
  async getRoadmapById(id: string): Promise<Roadmap> {
    const response = await api.get<ApiResponse<Roadmap>>(`/roadmaps/${id}`);
    if (!response.data.data) throw new Error('Roadmap not found');
    return response.data.data;
  },

  // Créer une roadmap
  async createRoadmap(data: {
    title: string;
    description?: string;
    category: string;
    isPublic: boolean;
    data?: any;
  }): Promise<Roadmap> {
    const response = await api.post<ApiResponse<Roadmap>>('/roadmaps', data);
    if (!response.data.data) throw new Error('Failed to create roadmap');
    return response.data.data;
  },

  // Mettre à jour une roadmap
  async updateRoadmap(id: string, data: Partial<Roadmap>): Promise<Roadmap> {
    const response = await api.put<ApiResponse<Roadmap>>(`/roadmaps/${id}`, data);
    if (!response.data.data) throw new Error('Failed to update roadmap');
    return response.data.data;
  },

  // Supprimer une roadmap
  async deleteRoadmap(id: string): Promise<void> {
    await api.delete(`/roadmaps/${id}`);
  },

  // Liker une roadmap
  async likeRoadmap(id: string): Promise<void> {
    await api.post(`/roadmaps/${id}/like`);
  },

  // Mettre à jour les étapes
  async updateSteps(id: string, steps: Partial<RoadmapStep>[]): Promise<Roadmap> {
    const response = await api.post<ApiResponse<Roadmap>>(`/roadmaps/${id}/steps`, { steps });
    if (!response.data.data) throw new Error('Failed to update steps');
    return response.data.data;
  },

  // Toggle completion d'une étape
  async toggleStepCompletion(roadmapId: string, stepId: string): Promise<RoadmapStep> {
    const response = await api.patch<ApiResponse<RoadmapStep>>(`/roadmaps/${roadmapId}/steps/${stepId}`);
    if (!response.data.data) throw new Error('Failed to toggle step');
    return response.data.data;
  },
};