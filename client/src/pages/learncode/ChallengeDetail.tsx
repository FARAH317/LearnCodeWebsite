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
} from 'lucide-react';
import { useChallengeStore } from '@/store/challengeStore';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/common/Card';
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

      // Refresh user data if passed
      if (attemptResult.attempt?.passed) {
        // Optionally refresh user data here
      }
    } catch (error) {
      console.error('Error submitting attempt:', error);
    }
  };

  if (isLoading || !currentChallenge) {
    return (
      <div className="min-h-screen bg-dark-900">
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

  const difficultyColors = {
    easy: 'text-green-400 bg-green-500/20 border-green-500/30',
    medium: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
    hard: 'text-red-400 bg-red-500/20 border-red-500/30',
  };

  const timeLimit = currentChallenge.timeLimit || 0;
  const timeRemaining = Math.max(0, timeLimit - timeElapsed);
  const isTimeUp = timeLimit > 0 && timeElapsed >= timeLimit;

  return (
    <div className="min-h-screen bg-dark-900">
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
              <Card
                className={`text-center ${
                  result.attempt?.passed
                    ? 'border-2 border-green-500'
                    : 'border-2 border-red-500'
                }`}
              >
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    result.attempt?.passed
                      ? 'bg-green-500/20'
                      : 'bg-red-500/20'
                  }`}
                >
                  {result.attempt?.passed ? (
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  ) : (
                    <XCircle className="w-12 h-12 text-red-400" />
                  )}
                </div>

                <h2 className="text-2xl font-black mb-2">
                  {result.attempt?.passed ? 'Défi réussi ! 🎉' : 'Échec'}
                </h2>

                <p className="text-gray-400 mb-4">
                  {result.attempt?.passed
                    ? 'Félicitations ! Vous avez résolu ce défi.'
                    : 'Votre solution ne passe pas tous les tests.'}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                    <span className="text-gray-400">Score</span>
                    <span className="font-bold">{result.attempt?.score}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                    <span className="text-gray-400">Temps</span>
                    <span className="font-bold">{formatTime(timeElapsed)}</span>
                  </div>
                  {result.attempt?.passed && (
                    <div className="flex items-center justify-between p-3 bg-primary-500/10 rounded-lg border border-primary-500/20">
                      <span className="text-primary-400 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        XP gagnés
                      </span>
                      <span className="font-bold text-primary-400">
                        +{result.xpEarned} XP
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowResult(false);
                      setIsRunning(false);
                      setTimeElapsed(0);
                    }}
                  >
                    Réessayer
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => navigate('/challenges')}
                  >
                    Autres défis
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/challenges')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux défis
          </button>

          {/* Timer */}
          <div className="flex items-center gap-4">
            {timeLimit > 0 && (
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  isTimeUp
                    ? 'bg-red-500/20 border-red-500/30 text-red-400'
                    : 'bg-primary-500/10 border-primary-500/20 text-primary-400'
                }`}
              >
                <Clock className="w-5 h-5" />
                <span className="font-mono font-bold">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
            {!timeLimit && isRunning && (
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-lg text-primary-400">
                <Clock className="w-5 h-5" />
                <span className="font-mono font-bold">{formatTime(timeElapsed)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Challenge Info */}
          <div className="space-y-6">
            {/* Challenge Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card gradient className="border-2 border-primary-500/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs px-2 py-1 rounded border ${
                          difficultyColors[currentChallenge.difficulty]
                        }`}
                      >
                        {currentChallenge.difficulty === 'easy'
                          ? 'Facile'
                          : currentChallenge.difficulty === 'medium'
                          ? 'Moyen'
                          : 'Difficile'}
                      </span>
                      <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded">
                        {currentChallenge.language.toUpperCase()}
                      </span>
                    </div>
                    <h1 className="text-2xl font-black mb-2">
                      {currentChallenge.title}
                    </h1>
                    <p className="text-gray-400">{currentChallenge.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-700">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-400">Récompense</p>
                      <p className="font-bold">{currentChallenge.xpReward} XP</p>
                    </div>
                  </div>
                  {timeLimit > 0 && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary-400" />
                      <div>
                        <p className="text-sm text-gray-400">Limite</p>
                        <p className="font-bold">{Math.floor(timeLimit / 60)} min</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card glass>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary-400" />
                  Instructions
                </h3>
                <div className="prose prose-invert max-w-none text-gray-400">
                  <p>{currentChallenge.description}</p>
                  <h4 className="text-white mt-4 mb-2">Exemples :</h4>
                  <ul className="space-y-2">
                    {currentChallenge.testCases &&
                      typeof currentChallenge.testCases === 'object' &&
                      'inputs' in currentChallenge.testCases && (
                        <>
                          {(currentChallenge.testCases as any).inputs.slice(0, 3).map((input: any, idx: number) => (
                            <li key={idx} className="font-mono text-sm">
                              Input: {JSON.stringify(input)} → Output:{' '}
                              {JSON.stringify((currentChallenge.testCases as any).outputs[idx])}
                            </li>
                          ))}
                        </>
                      )}
                  </ul>
                </div>
              </Card>
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
            >
              <Card glass>
                <div className="space-y-3">
                  {!isRunning ? (
                    <Button
                      onClick={handleStart}
                      className="w-full"
                      icon={<Play className="w-5 h-5" />}
                    >
                      Commencer le défi
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleSubmit}
                        disabled={isTimeUp}
                        className="w-full"
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
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;