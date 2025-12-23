// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// XP and Leveling
export const XP_PER_LEVEL = 1000;
export const LEVEL_UP_BONUS = 100;

// Difficulty Settings
export const DIFFICULTY_COLORS = {
  beginner: 'text-green-400 bg-green-500/20 border-green-500/30',
  intermediate: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
  advanced: 'text-red-400 bg-red-500/20 border-red-500/30',
  easy: 'text-green-400 bg-green-500/20 border-green-500/30',
  medium: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
  hard: 'text-red-400 bg-red-500/20 border-red-500/30',
} as const;

export const DIFFICULTY_LABELS = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Difficile',
} as const;

// Programming Languages
export const LANGUAGES = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
  csharp: 'C#',
  ruby: 'Ruby',
  go: 'Go',
  rust: 'Rust',
  php: 'PHP',
  react: 'React',
  vue: 'Vue',
  angular: 'Angular',
} as const;

// Code Editor Settings
export const EDITOR_THEMES = {
  dark: 'vs-dark',
  light: 'vs-light',
  highContrast: 'hc-black',
} as const;

export const EDITOR_FONT_SIZES = [12, 14, 16, 18, 20];
export const DEFAULT_EDITOR_FONT_SIZE = 14;

// Roadmap Categories
export const ROADMAP_CATEGORIES = [
  'frontend',
  'backend',
  'fullstack',
  'mobile',
  'devops',
  'data-science',
  'machine-learning',
  'cybersecurity',
  'game-dev',
  'blockchain',
] as const;

export const ROADMAP_CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Full Stack',
  mobile: 'Mobile',
  devops: 'DevOps',
  'data-science': 'Data Science',
  'machine-learning': 'Machine Learning',
  cybersecurity: 'Cybersécurité',
  'game-dev': 'Développement de Jeux',
  blockchain: 'Blockchain',
} as const;

// Achievement Categories
export const ACHIEVEMENT_CATEGORIES = {
  beginner: 'Débutant',
  speed: 'Vitesse',
  milestone: 'Jalon',
  challenge: 'Défis',
  social: 'Social',
  special: 'Spécial',
} as const;

// Time Limits
export const CHALLENGE_TIME_LIMITS = {
  easy: 5 * 60, // 5 minutes
  medium: 10 * 60, // 10 minutes
  hard: 15 * 60, // 15 minutes
} as const;

// Pagination
export const ITEMS_PER_PAGE = 12;
export const LEADERBOARD_TOP_COUNT = 100;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  EDITOR_SETTINGS: 'editor_settings',
} as const;

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;