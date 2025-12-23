import { useRoadmapStore } from '@/store/roadmapStore';
import { useNavigate } from 'react-router-dom';

export const useRoadmap = () => {
  const navigate = useNavigate();
  const {
    roadmaps,
    myRoadmaps,
    currentRoadmap,
    isLoading,
    error,
    fetchRoadmaps,
    fetchMyRoadmaps,
    fetchRoadmap,
    createRoadmap,
    updateRoadmap,
    deleteRoadmap,
    likeRoadmap,
    updateSteps,
    toggleStepCompletion,
    clearError,
  } = useRoadmapStore();

  const handleCreateRoadmap = async (data: {
    title: string;
    description?: string;
    category: string;
    isPublic: boolean;
    data?: any;
  }) => {
    try {
      const roadmap = await createRoadmap(data);
      navigate(`/roadmaps/${roadmap.id}`);
      return roadmap;
    } catch (error) {
      console.error('Failed to create roadmap:', error);
      throw error;
    }
  };

  const handleUpdateRoadmap = async (id: string, data: any) => {
    try {
      await updateRoadmap(id, data);
      return true;
    } catch (error) {
      console.error('Failed to update roadmap:', error);
      return false;
    }
  };

  const handleDeleteRoadmap = async (id: string) => {
    try {
      await deleteRoadmap(id);
      navigate('/roadmaps/my-roadmaps');
      return true;
    } catch (error) {
      console.error('Failed to delete roadmap:', error);
      return false;
    }
  };

  const handleLikeRoadmap = async (id: string) => {
    try {
      await likeRoadmap(id);
      return true;
    } catch (error) {
      console.error('Failed to like roadmap:', error);
      return false;
    }
  };

  const handleToggleStep = async (roadmapId: string, stepId: string) => {
    try {
      await toggleStepCompletion(roadmapId, stepId);
      return true;
    } catch (error) {
      console.error('Failed to toggle step:', error);
      return false;
    }
  };

  const getRoadmapProgress = (roadmapId: string) => {
    const roadmap = myRoadmaps.find((r) => r.id === roadmapId) || currentRoadmap;
    if (!roadmap || !roadmap.steps) {
      return { completed: 0, total: 0, percentage: 0 };
    }

    const completed = roadmap.steps.filter((s: any) => s.completed).length;
    const total = roadmap.steps.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    return { completed, total, percentage };
  };

  return {
    roadmaps,
    myRoadmaps,
    currentRoadmap,
    isLoading,
    error,
    fetchRoadmaps,
    fetchMyRoadmaps,
    fetchRoadmap,
    handleCreateRoadmap,
    handleUpdateRoadmap,
    handleDeleteRoadmap,
    handleLikeRoadmap,
    handleToggleStep,
    updateSteps,
    getRoadmapProgress,
    clearError,
  };
};