import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  BookOpen,
  Trophy,
  Sparkles,
  Save,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useCourseStore } from '@/store/courseStore';
import Navbar from '@/components/common/Navbar';
import Button from '@/components/common/Button';
import CodeEditor from '@/components/learncode/CodeEditor';

const Lesson = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLesson, currentCourse, lessons, progress, fetchLesson, fetchLessons, saveProgress, isLoading } = useCourseStore();

  const [code, setCode] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      fetchLesson(id);
    }
  }, [id]);

  useEffect(() => {
    if (currentLesson) {
      const savedProgress = progress.find((p) => p.lessonId === currentLesson.id);
      if (savedProgress?.code) {
        setCode(savedProgress.code);
      } else if (currentLesson.code) {
        setCode(currentLesson.code);
      }
      setIsCompleted(savedProgress?.completed || false);

      if (currentLesson.courseId && lessons.length === 0) {
        fetchLessons(currentLesson.courseId);
      }
    }
  }, [currentLesson]);

  const currentLessonIndex = lessons.findIndex((l) => l.id === id);
  const hasNextLesson = currentLessonIndex < lessons.length - 1;
  const hasPrevLesson = currentLessonIndex > 0;

  const handleSaveProgress = async (completed: boolean = false) => {
    if (currentLesson) {
      await saveProgress(currentLesson.id, code, completed);
      if (completed && !isCompleted) {
        setIsCompleted(true);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }
  };

  const handleValidate = () => {
    handleSaveProgress(true);
  };

  const handleNext = () => {
    if (hasNextLesson) {
      const nextLesson = lessons[currentLessonIndex + 1];
      navigate(`/lessons/${nextLesson.id}`);
    }
  };

  const handlePrev = () => {
    if (hasPrevLesson) {
      const prevLesson = lessons[currentLessonIndex - 1];
      navigate(`/lessons/${prevLesson.id}`);
    }
  };

  const handleBackToCourse = () => {
    if (currentLesson?.courseId) {
      navigate(`/courses/${currentLesson.courseId}`);
    }
  };

  if (isLoading || !currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Chargement de la leçon...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Navbar />

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border-2 border-green-500 rounded-2xl flex items-center gap-3 px-6 py-4 shadow-2xl">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <p className="font-bold text-green-400">Leçon complétée ! 🎉</p>
                <p className="text-sm text-gray-300">+{currentLesson.xpReward} XP</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBackToCourse}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour au cours
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 font-medium">
              Leçon {currentLessonIndex + 1} / {lessons.length}
            </span>
            {isCompleted && (
              <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 rounded-lg text-xs text-green-400 font-medium">
                <CheckCircle className="w-3 h-3" />
                Complétée
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Content */}
          <div className="space-y-6 custom-scrollbar max-h-[calc(100vh-200px)] overflow-y-auto pr-4">
            {/* Lesson Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-sm rounded-2xl p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-black mb-2">{currentLesson.title}</h1>
                  <p className="text-gray-300">{currentLesson.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  +{currentLesson.xpReward} XP
                </span>
                <span className="text-sm text-gray-400">
                  ~15 min
                </span>
              </div>
            </motion.div>

            {/* Lesson Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-8"
            >
              <div className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-gray-300 prose-a:text-primary-400 prose-strong:text-white prose-code:text-primary-400 prose-code:bg-dark-800 prose-code:px-2 prose-code:py-1 prose-code:rounded">
                <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
              </div>
            </motion.div>

            {/* Hints */}
            {currentLesson.hints && currentLesson.hints.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6"
              >
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2 font-bold mb-4 hover:text-primary-400 transition-colors w-full text-left"
                >
                  <Lightbulb className="w-5 h-5" />
                  <span>Indices ({currentLesson.hints.length})</span>
                </button>
                <AnimatePresence>
                  {showHints && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      {currentLesson.hints.map((hint, index) => (
                        <div
                          key={index}
                          className="p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl"
                        >
                          <p className="text-sm text-gray-300">
                            {index + 1}. {hint}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Solution */}
            {currentLesson.solution && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6"
              >
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center gap-2 font-bold mb-4 hover:text-secondary-400 transition-colors w-full text-left"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Voir la solution</span>
                </button>
                <AnimatePresence>
                  {showSolution && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="p-4 bg-secondary-500/10 border border-secondary-500/20 rounded-xl">
                        <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
                          {currentLesson.solution}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Right: Code Editor */}
          <div className="space-y-4 sticky top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CodeEditor
                language={currentCourse?.language || 'javascript'}
                defaultValue={code}
                onRun={(newCode) => setCode(newCode)}
                height="500px"
              />
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="space-y-3">
                <Button
                  onClick={handleValidate}
                  className="w-full"
                  variant={isCompleted ? 'secondary' : 'primary'}
                  icon={isCompleted ? <CheckCircle className="w-5 h-5" /> : <Trophy className="w-5 h-5" />}
                >
                  {isCompleted ? 'Marquer comme non complété' : 'Valider et compléter'}
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={handlePrev}
                    disabled={!hasPrevLesson}
                    variant="outline"
                    icon={<ArrowLeft className="w-4 h-4" />}
                  >
                    Précédent
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!hasNextLesson}
                    variant="outline"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Suivant
                  </Button>
                </div>

                <Button
                  onClick={() => handleSaveProgress(false)}
                  variant="ghost"
                  className="w-full"
                  icon={<Save className="w-4 h-4" />}
                >
                  Sauvegarder
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;