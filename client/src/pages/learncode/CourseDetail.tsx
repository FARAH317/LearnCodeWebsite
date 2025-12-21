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
} from 'lucide-react';
import { useCourseStore } from '@/store/courseStore';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentCourse, lessons, progress, fetchCourse, fetchLessons, fetchProgress, enrollCourse, isLoading } = useCourseStore();
  const { user } = useAuthStore();
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCourse(id);
      fetchLessons(id);
      fetchProgress();
    }
  }, [id]);

  useEffect(() => {
    // Vérifier si l'utilisateur est inscrit
    const checkEnrollment = async () => {
      // Cette vérification sera faite via l'API
      setIsEnrolled(true); // Pour l'instant, on suppose que l'utilisateur est inscrit
    };
    checkEnrollment();
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
      <div className="min-h-screen bg-dark-900">
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

  const difficultyColors = {
    beginner: 'text-green-400 bg-green-500/20',
    intermediate: 'text-yellow-400 bg-yellow-500/20',
    advanced: 'text-red-400 bg-red-500/20',
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back button */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux cours
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card gradient className="border-2 border-primary-500/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded">
                        {currentCourse.language.toUpperCase()}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${difficultyColors[currentCourse.difficulty]}`}>
                        {currentCourse.difficulty === 'beginner'
                          ? 'Débutant'
                          : currentCourse.difficulty === 'intermediate'
                          ? 'Intermédiaire'
                          : 'Avancé'}
                      </span>
                    </div>
                    <h1 className="text-3xl font-black mb-2">{currentCourse.title}</h1>
                    <p className="text-gray-400">{currentCourse.description}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-dark-700">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary-400" />
                    <div>
                      <p className="text-sm text-gray-400">Leçons</p>
                      <p className="font-bold">{lessons.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-400">XP Total</p>
                      <p className="font-bold">{currentCourse.xpReward}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-sm text-gray-400">Progression</p>
                      <p className="font-bold">{Math.round(progressPercentage)}%</p>
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
              </Card>
            </motion.div>

            {/* Lessons List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4">Contenu du cours</h2>
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
                    >
                      <Card
                        hover={!isLocked}
                        glass
                        className={`${isLocked ? 'opacity-50' : ''} ${isCompleted ? 'border-2 border-green-500/20' : ''}`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Status Icon */}
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isCompleted
                              ? 'bg-green-500/20'
                              : isLocked
                              ? 'bg-dark-700'
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
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-gray-500">Leçon {index + 1}</span>
                              {isCompleted && (
                                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">
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
                              <span className="text-xs text-primary-400">+{lesson.xpReward} XP</span>
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
                      </Card>
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
            >
              <Card glass>
                <h3 className="font-bold mb-4">Votre progression</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Leçons complétées</span>
                      <span className="font-bold">
                        {completedLessons}/{lessons.length}
                      </span>
                    </div>
                    <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {Math.round(progressPercentage)}% terminé
                    </p>
                  </div>

                  {progressPercentage === 100 && (
                    <div className="pt-4 border-t border-dark-700">
                      <div className="text-center p-4 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-lg">
                        <Trophy className="w-12 h-12 mx-auto mb-2 text-yellow-400" />
                        <p className="font-bold mb-1">Cours terminé ! 🎉</p>
                        <p className="text-sm text-gray-400">
                          +{currentCourse.xpReward} XP gagnés
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* XP Reward */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card glass>
                <h3 className="font-bold mb-3">Récompenses</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Points XP</p>
                      <p className="text-xs text-gray-400">+{currentCourse.xpReward} XP</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Badge de complétion</p>
                      <p className="text-xs text-gray-400">En terminant le cours</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* What you'll learn */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card glass>
                <h3 className="font-bold mb-3">Ce que vous allez apprendre</h3>
                <ul className="space-y-2">
                  {[
                    'Les bases du langage',
                    'Syntaxe et concepts fondamentaux',
                    'Exercices pratiques',
                    'Projets guidés',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;