import { create } from 'zustand';
import { Roadmap, RoadmapStep } from '@/types';
import { roadmapService } from '@/services/roadmapService';

interface RoadmapState {
  roadmaps: Roadmap[];
  myRoadmaps: Roadmap[];
  currentRoadmap: Roadmap | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchRoadmaps: () => Promise<void>;
  fetchMyRoadmaps: () => Promise<void>;
  fetchRoadmap: (id: string) => Promise<void>;
  createRoadmap: (data: {
    title: string;
    description?: string;
    category: string;
    isPublic: boolean;
    data?: any;
  }) => Promise<Roadmap>;
  updateRoadmap: (id: string, data: Partial<Roadmap>) => Promise<void>;
  deleteRoadmap: (id: string) => Promise<void>;
  likeRoadmap: (id: string) => Promise<void>;
  updateSteps: (id: string, steps: Partial<RoadmapStep>[]) => Promise<void>;
  toggleStepCompletion: (roadmapId: string, stepId: string) => Promise<void>;
  clearError: () => void;
}

export const useRoadmapStore = create<RoadmapState>((set, get) => ({
  roadmaps: [],
  myRoadmaps: [],
  currentRoadmap: null,
  isLoading: false,
  error: null,

  fetchRoadmaps: async () => {
    set({ isLoading: true, error: null });
    try {
      const roadmaps = await roadmapService.getAllRoadmaps();
      set({ roadmaps, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchMyRoadmaps: async () => {
    set({ isLoading: true, error: null });
    try {
      const myRoadmaps = await roadmapService.getMyRoadmaps();
      set({ myRoadmaps, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchRoadmap: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const roadmap = await roadmapService.getRoadmapById(id);
      set({ currentRoadmap: roadmap, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createRoadmap: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const roadmap = await roadmapService.createRoadmap(data);
      set({ isLoading: false });
      await get().fetchMyRoadmaps();
      return roadmap;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateRoadmap: async (id: string, data: Partial<Roadmap>) => {
    set({ isLoading: true, error: null });
    try {
      await roadmapService.updateRoadmap(id, data);
      await get().fetchRoadmap(id);
      await get().fetchMyRoadmaps();
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteRoadmap: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await roadmapService.deleteRoadmap(id);
      await get().fetchMyRoadmaps();
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  likeRoadmap: async (id: string) => {
    try {
      await roadmapService.likeRoadmap(id);
      await get().fetchRoadmap(id);
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateSteps: async (id: string, steps: Partial<RoadmapStep>[]) => {
    try {
      await roadmapService.updateSteps(id, steps);
      await get().fetchRoadmap(id);
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  toggleStepCompletion: async (roadmapId: string, stepId: string) => {
    try {
      await roadmapService.toggleStepCompletion(roadmapId, stepId);
      await get().fetchRoadmap(roadmapId);
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  clearError: () => set({ error: null }),
}));