import api from './api';
import { ApiResponse, Course, Lesson, Progress } from '@/types';

export const courseService = {
  // Récupérer tous les cours
  async getAllCourses(): Promise<Course[]> {
    const response = await api.get<ApiResponse<Course[]>>('/courses');
    return response.data.data || [];
  },

  // Récupérer un cours par ID
  async getCourseById(id: string): Promise<Course> {
    const response = await api.get<ApiResponse<Course>>(`/courses/${id}`);
    if (!response.data.data) throw new Error('Course not found');
    return response.data.data;
  },

  // Récupérer les leçons d'un cours
  async getCourseLessons(courseId: string): Promise<Lesson[]> {
    const response = await api.get<ApiResponse<Lesson[]>>(`/courses/${courseId}/lessons`);
    return response.data.data || [];
  },

  // Récupérer une leçon spécifique
  async getLessonById(lessonId: string): Promise<Lesson> {
    const response = await api.get<ApiResponse<Lesson>>(`/lessons/${lessonId}`);
    if (!response.data.data) throw new Error('Lesson not found');
    return response.data.data;
  },

  // S'inscrire à un cours
  async enrollCourse(courseId: string): Promise<void> {
    await api.post(`/courses/${courseId}/enroll`);
  },

  // Récupérer mes cours
  async getMyCourses(): Promise<Course[]> {
    const response = await api.get<ApiResponse<Course[]>>('/courses/my-courses');
    return response.data.data || [];
  },

  // Sauvegarder la progression
  // Sauvegarder la progression
async saveProgress(lessonId: string, code: string, completed: boolean): Promise<any> {
  const response = await api.post<ApiResponse<any>>('/lessons/progress', {
    lessonId,
    code,
    completed,
  });
  
  if (!response.data.data) throw new Error('Failed to save progress');
  
  return response.data.data;
},

// Récupérer la progression d'un utilisateur
async getUserProgress(): Promise<Progress[]> {
  const response = await api.get<ApiResponse<Progress[]>>('/lessons/progress');
  return response.data.data || [];
},

  
};