import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Trophy,
  CheckCircle,
  Circle,
  Play,
  Lock,
  ArrowLeft,
  Target,
  Sparkles,
} from 'lucide-react';
import { useCourseStore } from '@/store/courseStore';
import Navbar from '@/components/common/Navbar';
import Button from '@/components/common/Button';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentCourse, lessons, progress, fetchCourse, fetchLessons, fetchProgress, enrollCourse, isLoading } = useCourseStore();
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCourse(id);
      fetchLessons(id);
      fetchProgress();
    }
  }, [id]);

  useEffect(() => {
    setIsEnrolled(true);
  }, [currentCourse]);

  const getLessonProgress = (lessonId: string) => {
    return progress.find((p) => p.lessonId === lessonId);
  };

  const completedLessons = lessons.filter((lesson) => {
    const prog = getLessonProgress(lesson.id);
    return prog?.completed;
  }).length;

  const progressPercentage = lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0;

  const handleEnroll = async () => {
    if (id) {
      await enrollCourse(id);
      setIsEnrolled(true);
    }
  };

  const handleStartLesson = (lessonId: string) => {
    navigate(`/lessons/${lessonId}`);
  };

  if (isLoading || !currentCourse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Chargement du cours...</p>
          </div>
        </div>
      </div>
    );
  }

  const difficultyLabels = {
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé',
  };

  const difficultyColors = {
    beginner: { bg: 'bg-green-500/10', text: 'text-green-400' },
    intermediate: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
    advanced: { bg: 'bg-red-500/10', text: 'text-red-400' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back button */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour aux cours
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-sm rounded-3xl p-8"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs px-3 py-1 bg-primary-500/20 text-primary-400 rounded-lg font-medium">
                      {currentCourse.language.toUpperCase()}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-lg ${difficultyColors[currentCourse.difficulty].bg} ${difficultyColors[currentCourse.difficulty].text}`}>
                      {difficultyLabels[currentCourse.difficulty]}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black mb-3">{currentCourse.title}</h1>
                  <p className="text-gray-300 text-lg">{currentCourse.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-500/10 rounded-xl">
                    <BookOpen className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Leçons</p>
                    <p className="font-bold text-lg">{lessons.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-500/10 rounded-xl">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">XP Total</p>
                    <p className="font-bold text-lg">{currentCourse.xpReward}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500/10 rounded-xl">
                    <Target className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Progression</p>
                    <p className="font-bold text-lg">{Math.round(progressPercentage)}%</p>
                  </div>
                </div>
              </div>

              {!isEnrolled && (
                <div className="mt-6">
                  <Button onClick={handleEnroll} className="w-full" size="lg">
                    S'inscrire à ce cours
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Lessons List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-bold">Contenu du cours</h2>
              </div>
              <div className="space-y-3">
                {lessons.map((lesson, index) => {
                  const lessonProgress = getLessonProgress(lesson.id);
                  const isCompleted = lessonProgress?.completed;
                  const isLocked = !isEnrolled && index > 0;

                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={!isLocked ? { x: 4 } : {}}
                      className={`bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 ${isLocked ? 'opacity-50' : 'hover:from-white/10 hover:to-white/5'} transition-all duration-300 ${isCompleted ? 'ring-2 ring-green-500/20' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Status Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isCompleted
                            ? 'bg-green-500/20'
                            : isLocked
                            ? 'bg-gray-700/50'
                            : 'bg-primary-500/20'
                        }`}>
                          {isLocked ? (
                            <Lock className="w-6 h-6 text-gray-500" />
                          ) : isCompleted ? (
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          ) : (
                            <Circle className="w-6 h-6 text-primary-400" />
                          )}
                        </div>

                        {/* Lesson Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-500 font-medium">Leçon {index + 1}</span>
                            {isCompleted && (
                              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-lg">
                                Complétée
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold mb-1">{lesson.title}</h3>
                          <p className="text-sm text-gray-400 line-clamp-1">{lesson.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              ~15 min
                            </span>
                            <span className="text-xs text-primary-400 font-medium">+{lesson.xpReward} XP</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <Button
                          size="sm"
                          onClick={() => handleStartLesson(lesson.id)}
                          disabled={isLocked}
                          icon={isCompleted ? <CheckCircle className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        >
                          {isCompleted ? 'Revoir' : 'Commencer'}
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6"
            >
              <h3 className="font-bold mb-6">Votre progression</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Leçons complétées</span>
                    <span className="font-bold">
                      {completedLessons}/{lessons.length}
                    </span>
                  </div>
                  <div className="h-3 bg-dark-800/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {Math.round(progressPercentage)}% terminé
                  </p>
                </div>

                {progressPercentage === 100 && (
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl">
                      <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
                      <p className="font-bold mb-1">Cours terminé ! 🎉</p>
                      <p className="text-sm text-gray-400">
                        +{currentCourse.xpReward} XP gagnés
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6"
            >
              <h3 className="font-bold mb-4">Ce que vous allez apprendre</h3>
              <ul className="space-y-3">
                {[
                  'Les bases du langage',
                  'Syntaxe et concepts fondamentaux',
                  'Exercices pratiques',
                  'Projets guidés',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;