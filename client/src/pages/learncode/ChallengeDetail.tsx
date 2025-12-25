import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  Zap,
  Target,
  Flame,
} from 'lucide-react';
import { useChallengeStore } from '@/store/challengeStore';
import Navbar from '@/components/common/Navbar';
import Button from '@/components/common/Button';
import CodeEditor from '@/components/learncode/CodeEditor';

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentChallenge, fetchChallenge, submitAttempt, isLoading } = useChallengeStore();

  const [code, setCode] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchChallenge(id);
    }
  }, [id]);

  useEffect(() => {
    if (currentChallenge?.code) {
      setCode(currentChallenge.code);
    }
  }, [currentChallenge]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setTimeElapsed(0);
    setShowResult(false);
  };

  const handleSubmit = async () => {
    if (!currentChallenge) return;

    setIsRunning(false);

    try {
      const attemptResult = await submitAttempt(currentChallenge.id, code, timeElapsed);
      setResult(attemptResult);
      setShowResult(true);
    } catch (error) {
      console.error('Error submitting attempt:', error);
    }
  };

  if (isLoading || !currentChallenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Chargement du défi...</p>
          </div>
        </div>
      </div>
    );
  }

  const difficultyLabels = {
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
  };

  const difficultyColors = {
    easy: { bg: 'bg-green-500/10', text: 'text-green-400', ring: 'ring-green-500/30' },
    medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', ring: 'ring-yellow-500/30' },
    hard: { bg: 'bg-red-500/10', text: 'text-red-400', ring: 'ring-red-500/30' },
  };

  const timeLimit = currentChallenge.timeLimit || 0;
  const timeRemaining = Math.max(0, timeLimit - timeElapsed);
  const isTimeUp = timeLimit > 0 && timeElapsed >= timeLimit;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Navbar />

      {/* Success/Failure Modal */}
      <AnimatePresence>
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowResult(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 text-center ring-2 ${
                result.attempt?.passed ? 'ring-green-500' : 'ring-red-500'
              }`}>
                <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  result.attempt?.passed ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {result.attempt?.passed ? (
                    <CheckCircle className="w-14 h-14 text-green-400" />
                  ) : (
                    <XCircle className="w-14 h-14 text-red-400" />
                  )}
                </div>

                <h2 className="text-3xl font-black mb-3">
                  {result.attempt?.passed ? 'Défi réussi ! 🎉' : 'Échec'}
                </h2>

                <p className="text-gray-400 mb-6">
                  {result.attempt?.passed
                    ? 'Félicitations ! Vous avez résolu ce défi.'
                    : 'Votre solution ne passe pas tous les tests.'}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                    <span className="text-gray-400">Score</span>
                    <span className="font-bold text-lg">{result.attempt?.score}%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                    <span className="text-gray-400">Temps</span>
                    <span className="font-bold text-lg">{formatTime(timeElapsed)}</span>
                  </div>
                  {result.attempt?.passed && (
                    <div className="flex items-center justify-between p-4 bg-primary-500/10 rounded-xl border border-primary-500/20">
                      <span className="text-primary-400 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        XP gagnés
                      </span>
                      <span className="font-bold text-lg text-primary-400">
                        +{result.xpEarned} XP
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowResult(false);
                      setIsRunning(false);
                      setTimeElapsed(0);
                    }}
                  >
                    Réessayer
                  </Button>
                  <Button onClick={() => navigate('/challenges')}>
                    Autres défis
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/challenges')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour aux défis
          </button>

          {/* Timer */}
          <div className="flex items-center gap-4">
            {timeLimit > 0 && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
                isTimeUp
                  ? 'bg-red-500/20 border-red-500/30 text-red-400'
                  : 'bg-primary-500/10 border-primary-500/20 text-primary-400'
              }`}>
                <Clock className="w-5 h-5" />
                <span className="font-mono font-bold text-lg">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
            {!timeLimit && isRunning && (
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-xl text-primary-400">
                <Clock className="w-5 h-5" />
                <span className="font-mono font-bold text-lg">{formatTime(timeElapsed)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Challenge Info */}
          <div className="space-y-6">
            {/* Challenge Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl p-8 ring-2 ${difficultyColors[currentChallenge.difficulty].ring}`}
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`text-xs px-3 py-1 rounded-lg ${difficultyColors[currentChallenge.difficulty].bg} ${difficultyColors[currentChallenge.difficulty].text} font-medium`}>
                      {difficultyLabels[currentChallenge.difficulty]}
                    </span>
                    <span className="text-xs px-3 py-1 bg-primary-500/20 text-primary-400 rounded-lg font-medium">
                      {currentChallenge.language.toUpperCase()}
                    </span>
                  </div>
                  <h1 className="text-3xl font-black mb-3">{currentChallenge.title}</h1>
                  <p className="text-gray-300">{currentChallenge.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-500/10 rounded-xl">
                    <Zap className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Récompense</p>
                    <p className="font-bold text-lg">{currentChallenge.xpReward} XP</p>
                  </div>
                </div>
                {timeLimit > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary-500/10 rounded-xl">
                      <Clock className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Limite</p>
                      <p className="font-bold text-lg">{Math.floor(timeLimit / 60)} min</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-primary-400" />
                <h3 className="font-bold text-xl">Instructions</h3>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">{currentChallenge.description}</p>
                <h4 className="text-white font-bold mb-4">Exemples :</h4>
                <ul className="space-y-3">
                  {currentChallenge.testCases &&
                    typeof currentChallenge.testCases === 'object' &&
                    'inputs' in currentChallenge.testCases && (
                      <>
                        {(currentChallenge.testCases as any).inputs.slice(0, 3).map((input: any, idx: number) => (
                          <li key={idx} className="font-mono text-sm bg-dark-800/50 p-3 rounded-lg">
                            <span className="text-gray-400">Input:</span> <span className="text-primary-400">{JSON.stringify(input)}</span>
                            {' → '}
                            <span className="text-gray-400">Output:</span> <span className="text-green-400">{JSON.stringify((currentChallenge.testCases as any).outputs[idx])}</span>
                          </li>
                        ))}
                      </>
                    )}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right: Code Editor */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CodeEditor
                language={currentChallenge.language}
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
                {!isRunning ? (
                  <Button
                    onClick={handleStart}
                    className="w-full"
                    size="lg"
                    icon={<Play className="w-5 h-5" />}
                  >
                    <Flame className="w-5 h-5 mr-2" />
                    Commencer le défi
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleSubmit}
                      disabled={isTimeUp}
                      className="w-full"
                      size="lg"
                      variant={isTimeUp ? 'danger' : 'primary'}
                      icon={<Trophy className="w-5 h-5" />}
                    >
                      {isTimeUp ? 'Temps écoulé' : 'Soumettre la solution'}
                    </Button>
                    <Button
                      onClick={() => {
                        setIsRunning(false);
                        setTimeElapsed(0);
                      }}
                      variant="ghost"
                      className="w-full"
                    >
                      Abandonner
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;