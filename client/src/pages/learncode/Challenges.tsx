import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy,
  Clock,
  Code2,
  Search,
  Target,
  Zap,
  Crown,
  Flame,
} from 'lucide-react';
import { useChallengeStore } from '@/store/challengeStore';
import Navbar from '@/components/common/Navbar';
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

  const difficultyLabels = {
    all: 'Toutes',
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
  };

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
    easy: { bg: 'bg-green-500/10', text: 'text-green-400', ring: 'ring-green-500/20' },
    medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', ring: 'ring-yellow-500/20' },
    hard: { bg: 'bg-red-500/10', text: 'text-red-400', ring: 'ring-red-500/20' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Flame className="w-8 h-8 text-orange-400" />
                <h1 className="text-4xl md:text-5xl font-black">
                  Défis de <span className="gradient-text">Code</span>
                </h1>
              </div>
              <p className="text-xl text-gray-400">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            {
              label: 'Défis actifs',
              value: challenges.length,
              icon: <Target className="w-6 h-6" />,
              color: 'from-blue-500 to-cyan-500',
              bg: 'bg-blue-500/10',
            },
            {
              label: 'XP disponibles',
              value: challenges.reduce((sum, c) => sum + c.xpReward, 0),
              icon: <Zap className="w-6 h-6" />,
              color: 'from-yellow-500 to-orange-500',
              bg: 'bg-yellow-500/10',
            },
            {
              label: 'Complétés',
              value: 0,
              icon: <Trophy className="w-6 h-6" />,
              color: 'from-green-500 to-emerald-500',
              bg: 'bg-green-500/10',
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-black">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-xl ${stat.bg}`}>
                  <div className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6">
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
                  className="w-full rounded-xl bg-dark-800/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer transition-all"
                >
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>
                      {difficultyLabels[diff as keyof typeof difficultyLabels]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full rounded-xl bg-dark-800/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer transition-all"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang === 'all' ? 'Tous langages' : lang.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
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
                <Link to={`/challenges/${challenge.id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`h-full bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300 group ring-2 ${difficultyColors[challenge.difficulty].ring}`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className={`text-xs px-2 py-1 rounded-lg ${difficultyColors[challenge.difficulty].bg} ${difficultyColors[challenge.difficulty].text} font-medium`}>
                            {difficultyLabels[challenge.difficulty as keyof typeof difficultyLabels]}
                          </span>
                          <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded-lg">
                            {challenge.language.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                          {challenge.title}
                        </h3>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Trophy className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                      {challenge.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="font-medium">{challenge.xpReward} XP</span>
                        </div>
                        {challenge.timeLimit && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{Math.floor(challenge.timeLimit / 60)} min</span>
                          </div>
                        )}
                      </div>
                      <Button size="sm" icon={<Code2 className="w-4 h-4" />}>
                        Relever
                      </Button>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-12 text-center">
            <Search className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-bold mb-2">Aucun défi trouvé</h3>
            <p className="text-gray-400 mb-6">
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
        )}
      </div>
    </div>
  );
};

export default Challenges;