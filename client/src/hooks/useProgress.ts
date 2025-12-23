import { useCourseStore } from '@/store/courseStore';
import { useAuthStore } from '@/store/authStore';

export const useProgress = () => {
  const { progress, saveProgress, fetchProgress } = useCourseStore();
  const { user } = useAuthStore();

  const getLessonProgress = (lessonId: string) => {
    return progress.find((p) => p.lessonId === lessonId);
  };

  const isLessonCompleted = (lessonId: string) => {
    const lessonProgress = getLessonProgress(lessonId);
    return lessonProgress?.completed || false;
  };

  const getCourseProgress = () => {
    // Cette fonction nécessite les leçons du cours
    // Pour une implémentation complète, vous devrez passer les leçons
    return {
      completed: 0,
      total: 0,
      percentage: 0,
    };
  };

  const handleSaveProgress = async (
    lessonId: string,
    code: string,
    completed: boolean
  ) => {
    try {
      await saveProgress(lessonId, code, completed);
      return true;
    } catch (error) {
      console.error('Failed to save progress:', error);
      return false;
    }
  };

  return {
    progress,
    user,
    getLessonProgress,
    isLessonCompleted,
    getCourseProgress,
    handleSaveProgress,
    fetchProgress,
  };
};