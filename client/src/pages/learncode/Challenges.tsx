import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy,
  Clock,
  Code2,
  Filter,
  Search,
  Target,
  Zap,
  Crown,
} from 'lucide-react';
import { useChallengeStore } from '@/store/challengeStore';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const Challenges = () => {
  const { challenges, fetchChallenges, isLoading } = useChallengeStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  useEffect(() => {
    fetchChallenges();
  }, []);

  const difficulties = ['all', 'easy', 'medium', 'hard'];
  const languages = ['all', 'javascript', 'python', 'java', 'cpp'];

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    const matchesLanguage =
      selectedLanguage === 'all' || challenge.language === selectedLanguage;

    return matchesSearch && matchesDifficulty && matchesLanguage;
  });

  const difficultyColors = {
    easy: 'text-green-400 bg-green-500/20 border-green-500/30',
    medium: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
    hard: 'text-red-400 bg-red-500/20 border-red-500/30',
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black mb-2">
                Défis de <span className="gradient-text">Code</span>
              </h1>
              <p className="text-gray-400">
                Testez vos compétences et grimpez dans le classement
              </p>
            </div>
            <Link to="/challenges/leaderboard">
              <Button variant="secondary" icon={<Crown className="w-5 h-5" />}>
                Classement
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: 'Défis actifs',
              value: challenges.length,
              icon: <Target className="w-6 h-6" />,
              color: 'from-blue-500 to-cyan-500',
            },
            {
              label: 'XP disponibles',
              value: challenges.reduce((sum, c) => sum + c.xpReward, 0),
              icon: <Zap className="w-6 h-6" />,
              color: 'from-yellow-500 to-orange-500',
            },
            {
              label: 'Complétés',
              value: 0,
              icon: <Trophy className="w-6 h-6" />,
              color: 'from-green-500 to-emerald-500',
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover glass>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-black">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card glass>
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <Input
                  type="text"
                  placeholder="Rechercher un défi..."
                  icon={<Search className="w-5 h-5" />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Difficulty Filter */}
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>
                      {diff === 'all'
                        ? 'Toutes difficultés'
                        : diff === 'easy'
                        ? 'Facile'
                        : diff === 'medium'
                        ? 'Moyen'
                        : 'Difficile'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang === 'all' ? 'Tous langages' : lang.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Challenges Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Chargement des défis...</p>
            </div>
          </div>
        ) : filteredChallenges.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover gradient className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        {challenge.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded border ${
                            difficultyColors[challenge.difficulty]
                          }`}
                        >
                          {challenge.difficulty === 'easy'
                            ? 'Facile'
                            : challenge.difficulty === 'medium'
                            ? 'Moyen'
                            : 'Difficile'}
                        </span>
                        <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded">
                          {challenge.language.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
                    {challenge.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span>{challenge.xpReward} XP</span>
                      </div>
                      {challenge.timeLimit && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{Math.floor(challenge.timeLimit / 60)} min</span>
                        </div>
                      )}
                    </div>
                    <Link to={`/challenges/${challenge.id}`}>
                      <Button size="sm" icon={<Code2 className="w-4 h-4" />}>
                        Relever
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card glass>
            <div className="text-center py-12">
              <Filter className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-bold mb-2">Aucun défi trouvé</h3>
              <p className="text-gray-400 mb-4">
                Essayez de modifier vos filtres
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDifficulty('all');
                  setSelectedLanguage('all');
                }}
                variant="outline"
              >
                Réinitialiser
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Challenges;