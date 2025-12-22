import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Trophy, Medal, Zap, Target, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useChallengeStore } from '@/store/challengeStore';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/common/Card';

const Leaderboard = () => {
  const { leaderboard, fetchLeaderboard, isLoading } = useChallengeStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
    return <span className="text-gray-500 font-bold">#{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400/20 to-orange-500/20 border-orange-400/30';
    return 'bg-dark-800 border-dark-700';
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/challenges"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux défis
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-4">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Classement Global</span>
            </div>
            <h1 className="text-4xl font-black mb-2">
              <span className="gradient-text">Leaderboard</span>
            </h1>
            <p className="text-gray-400">
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
            className="mb-12"
          >
            <div className="grid grid-cols-3 gap-4 items-end">
              {/* 2nd Place */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pb-8"
              >
                <Card className="bg-gradient-to-br from-gray-400/10 to-gray-500/10 border-2 border-gray-400/30 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                    {leaderboard[1].avatar ? (
                      <img
                        src={leaderboard[1].avatar}
                        alt={leaderboard[1].username}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <User className="w-8 h-8" />
                    )}
                  </div>
                  <Medal className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <h3 className="font-bold mb-1">{leaderboard[1].username}</h3>
                  <p className="text-2xl font-black text-gray-400 mb-2">
                    {leaderboard[1].xp} XP
                  </p>
                  <p className="text-sm text-gray-500">Niveau {leaderboard[1].level}</p>
                </Card>
              </motion.div>

              {/* 1st Place */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30 text-center relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-yellow-500 text-dark-900 px-4 py-1 rounded-full text-xs font-bold">
                      Champion
                    </div>
                  </div>
                  <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-yellow-500/30">
                    {leaderboard[0].avatar ? (
                      <img
                        src={leaderboard[0].avatar}
                        alt={leaderboard[0].username}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <User className="w-10 h-10" />
                    )}
                  </div>
                  <Crown className="w-10 h-10 mx-auto mb-2 text-yellow-400" />
                  <h3 className="font-bold text-lg mb-1">{leaderboard[0].username}</h3>
                  <p className="text-3xl font-black text-yellow-400 mb-2">
                    {leaderboard[0].xp} XP
                  </p>
                  <p className="text-sm text-gray-400">Niveau {leaderboard[0].level}</p>
                </Card>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pb-16"
              >
                <Card className="bg-gradient-to-br from-orange-400/10 to-orange-500/10 border-2 border-orange-400/30 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                    {leaderboard[2].avatar ? (
                      <img
                        src={leaderboard[2].avatar}
                        alt={leaderboard[2].username}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <User className="w-8 h-8" />
                    )}
                  </div>
                  <Medal className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                  <h3 className="font-bold mb-1">{leaderboard[2].username}</h3>
                  <p className="text-2xl font-black text-orange-400 mb-2">
                    {leaderboard[2].xp} XP
                  </p>
                  <p className="text-sm text-gray-500">Niveau {leaderboard[2].level}</p>
                </Card>
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
          <Card glass>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Chargement du classement...</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((player, index) => {
                  const rank = index + 1;
                  const isCurrentUser = player.id === user?.id;

                  return (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                        isCurrentUser
                          ? 'bg-primary-500/10 border-primary-500/30'
                          : getRankBg(rank)
                      }`}
                    >
                      {/* Rank */}
                      <div className="w-12 flex items-center justify-center">
                        {getRankIcon(rank)}
                      </div>

                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                        {player.avatar ? (
                          <img
                            src={player.avatar}
                            alt={player.username}
                            className="w-full h-full rounded-full"
                          />
                        ) : (
                          <User className="w-6 h-6" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="font-bold flex items-center gap-2">
                          {player.username}
                          {isCurrentUser && (
                            <span className="text-xs px-2 py-0.5 bg-primary-500/20 text-primary-400 rounded">
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
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;