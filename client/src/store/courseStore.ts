import { create } from 'zustand';
import { Course, Lesson, Progress } from '@/types';
import { courseService } from '@/services/courseService';

interface CourseState {
  courses: Course[];
  myCourses: Course[];
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  lessons: Lesson[];
  progress: Progress[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCourses: () => Promise<void>;
  fetchMyCourses: () => Promise<void>;
  fetchCourse: (id: string) => Promise<void>;
  fetchLessons: (courseId: string) => Promise<void>;
  fetchLesson: (lessonId: string) => Promise<void>;
  enrollCourse: (courseId: string) => Promise<void>;
  saveProgress: (lessonId: string, code: string, completed: boolean) => Promise<void>;
  fetchProgress: () => Promise<void>;
  clearError: () => void;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  myCourses: [],
  currentCourse: null,
  currentLesson: null,
  lessons: [],
  progress: [],
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const courses = await courseService.getAllCourses();
      set({ courses, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchMyCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const myCourses = await courseService.getMyCourses();
      set({ myCourses, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchCourse: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const course = await courseService.getCourseById(id);
      set({ currentCourse: course, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchLessons: async (courseId: string) => {
    set({ isLoading: true, error: null });
    try {
      const lessons = await courseService.getCourseLessons(courseId);
      set({ lessons, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchLesson: async (lessonId: string) => {
    set({ isLoading: true, error: null });
    try {
      const lesson = await courseService.getLessonById(lessonId);
      set({ currentLesson: lesson, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  enrollCourse: async (courseId: string) => {
    set({ isLoading: true, error: null });
    try {
      await courseService.enrollCourse(courseId);
      await get().fetchMyCourses();
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  saveProgress: async (lessonId: string, code: string, completed: boolean) => {
    try {
      await courseService.saveProgress(lessonId, code, completed);
      await get().fetchProgress();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  fetchProgress: async () => {
    try {
      const progress = await courseService.getUserProgress();
      set({ progress });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  clearError: () => set({ error: null }),
}));