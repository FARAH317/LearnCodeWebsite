// User types
export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  xp: number;
  level: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Type helper for JSON
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail?: string;
  xpReward: number;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Lesson types
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  code?: string;
  solution?: string;
  hints: string[];
  xpReward: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Progress types
export interface Progress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  code?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Challenge types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: string;
  code?: string;
  testCases: {
    inputs: any[];
    outputs: any[];
  };
  xpReward: number;
  timeLimit?: number;
  createdAt: string;
  updatedAt: string;
}

// Roadmap types
export interface Roadmap {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: string;
  isPublic: boolean;
  likes: number;
  views: number;
  data: {
    nodes: RoadmapNode[];
    edges: RoadmapEdge[];
  };
  createdAt: string;
  updatedAt: string;
  user?: User;
  steps?: RoadmapStep[];
  _count?: {
    steps: number;
    comments: number;
  };
}

export interface RoadmapNode {
  id: string;
  label: string;
  position: { x: number; y: number };
}

export interface RoadmapEdge {
  id: string;
  source: string;
  target: string;
}

export interface RoadmapStep {
  id: string;
  roadmapId: string;
  title: string;
  description?: string;
  order: number;
  completed: boolean;
  resources?: {
    links?: string[];
    videos?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

// Achievement types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpRequired: number;
  category: string;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}