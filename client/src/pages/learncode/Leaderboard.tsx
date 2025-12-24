import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Trophy, Medal, Zap, Target, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useChallengeStore } from '@/store/challengeStore';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/common/Navbar';

const Leaderboard = () => {
  const { leaderboard, fetchLeaderboard, isLoading } = useChallengeStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-7 h-7 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-7 h-7 text-gray-400" />;
    if (rank === 3) return <Medal className="w-7 h-7 text-orange-400" />;
    return <span className="text-gray-400 font-bold text-lg">#{rank}</span>;
  };

  const getRankGradient = (rank: number) => {
    if (rank === 1) return 'from-yellow-500/20 to-orange-500/20';
    if (rank === 2) return 'from-gray-400/20 to-gray-500/20';
    if (rank === 3) return 'from-orange-400/20 to-orange-500/20';
    return 'from-white/5 to-white/0';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            to="/challenges"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour aux défis
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full mb-6 backdrop-blur-sm">
              <Crown className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-lg">Classement Global</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              <span className="gradient-text">Leaderboard</span>
            </h1>
            <p className="text-xl text-gray-400">
              Top 100 des meilleurs codeurs de la plateforme
            </p>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <div className="grid grid-cols-3 gap-6 items-end">
              {/* 2nd Place */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pb-8"
              >
                <div className="bg-gradient-to-br from-gray-400/20 to-gray-500/20 backdrop-blur-sm rounded-3xl p-6 text-center ring-2 ring-gray-400/30">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center ring-4 ring-gray-400/20">
                    {leaderboard[1].avatar ? (
                      <img
                        src={leaderboard[1].avatar}
                        alt={leaderboard[1].username}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <User className="w-10 h-10" />
                    )}
                  </div>
                  <Medal className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                  <h3 className="font-bold text-lg mb-2">{leaderboard[1].username}</h3>
                  <p className="text-3xl font-black text-gray-400 mb-2">
                    {leaderboard[1].xp} XP
                  </p>
                  <p className="text-sm text-gray-500">Niveau {leaderboard[1].level}</p>
                </div>
              </motion.div>

              {/* 1st Place */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-8 text-center relative ring-2 ring-yellow-500/30">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="bg-yellow-500 text-dark-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Champion
                    </div>
                  </div>
                  <div className="w-28 h-28 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center ring-4 ring-yellow-500/30">
                    {leaderboard[0].avatar ? (
                      <img
                        src={leaderboard[0].avatar}
                        alt={leaderboard[0].username}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <User className="w-14 h-14" />
                    )}
                  </div>
                  <Crown className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
                  <h3 className="font-bold text-xl mb-2">{leaderboard[0].username}</h3>
                  <p className="text-4xl font-black text-yellow-400 mb-2">
                    {leaderboard[0].xp} XP
                  </p>
                  <p className="text-sm text-gray-400">Niveau {leaderboard[0].level}</p>
                </div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pb-16"
              >
                <div className="bg-gradient-to-br from-orange-400/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-6 text-center ring-2 ring-orange-400/30">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center ring-4 ring-orange-400/20">
                    {leaderboard[2].avatar ? (
                      <img
                        src={leaderboard[2].avatar}
                        alt={leaderboard[2].username}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <User className="w-10 h-10" />
                    )}
                  </div>
                  <Medal className="w-10 h-10 mx-auto mb-3 text-orange-400" />
                  <h3 className="font-bold text-lg mb-2">{leaderboard[2].username}</h3>
                  <p className="text-3xl font-black text-orange-400 mb-2">
                    {leaderboard[2].xp} XP
                  </p>
                  <p className="text-sm text-gray-500">Niveau {leaderboard[2].level}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl overflow-hidden">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Chargement du classement...</p>
              </div>
            ) : (
              <div className="p-6 space-y-2">
                {leaderboard.map((player, index) => {
                  const rank = index + 1;
                  const isCurrentUser = player.id === user?.id;

                  return (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        isCurrentUser
                          ? 'bg-primary-500/10 ring-2 ring-primary-500/30'
                          : `bg-gradient-to-br ${getRankGradient(rank)} hover:from-white/10 hover:to-white/5`
                      }`}
                    >
                      {/* Rank */}
                      <div className="w-14 flex items-center justify-center">
                        {getRankIcon(rank)}
                      </div>

                      {/* Avatar */}
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        {player.avatar ? (
                          <img
                            src={player.avatar}
                            alt={player.username}
                            className="w-full h-full rounded-full"
                          />
                        ) : (
                          <User className="w-7 h-7" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="font-bold flex items-center gap-2">
                          {player.username}
                          {isCurrentUser && (
                            <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded-lg">
                              Vous
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-400">{player.fullName}</p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span className="font-semibold">{player._count.challenges}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4 text-primary-400" />
                          <span className="text-gray-400">Niv. {player.level}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="font-bold">{player.xp} XP</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;