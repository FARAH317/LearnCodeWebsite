import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Calendar,
  Trophy,
  BookOpen,
  Target,
  Award,
  Edit,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCourseStore } from '@/store/courseStore';
import Navbar from '@/components/common/Navbar';
import Button from '@/components/common/Button';

const Profile = () => {
  const { user } = useAuthStore();
  const { myCourses, progress, fetchMyCourses, fetchProgress } = useCourseStore();

  useEffect(() => {
    fetchMyCourses();
    fetchProgress();
  }, []);

  if (!user) return null;

  const completedLessons = progress.filter((p) => p.completed).length;
  const totalXP = user.xp;
  const level = user.level;
  const xpForNextLevel = level * 1000;
  const progressPercentage = (totalXP / xpForNextLevel) * 100;

  const stats = [
    {
      label: 'Cours suivis',
      value: myCourses.length,
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Leçons terminées',
      value: completedLessons,
      icon: <Target className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-500/10',
    },
    {
      label: 'Total XP',
      value: totalXP,
      icon: <Trophy className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500',
      bg: 'bg-yellow-500/10',
    },
    {
      label: 'Badges',
      value: 0,
      icon: <Award className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-500/10',
    },
  ];

  const achievements = [
    {
      title: 'Premier pas',
      description: 'Compléter votre première leçon',
      icon: '🎯',
      unlocked: completedLessons > 0,
    },
    {
      title: 'Apprenti codeur',
      description: 'Compléter 5 leçons',
      icon: '💻',
      unlocked: completedLessons >= 5,
    },
    {
      title: 'Expert',
      description: 'Atteindre le niveau 5',
      icon: '🏆',
      unlocked: level >= 5,
    },
    {
      title: 'Maître du code',
      description: 'Compléter 3 cours',
      icon: '👑',
      unlocked: myCourses.length >= 3,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Profile Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-sm rounded-3xl p-8 text-center"
            >
              {/* Avatar */}
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4 ring-4 ring-primary-500/20">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16" />
                  )}
                </div>
                <h2 className="text-3xl font-black mb-2">{user.fullName}</h2>
                <p className="text-gray-400">@{user.username}</p>
              </div>

              {/* Bio */}
              {user.bio && (
                <p className="text-gray-300 text-sm mb-6 pb-6 border-b border-white/10">
                  {user.bio}
                </p>
              )}

              {/* Info */}
              <div className="space-y-3 text-left mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Mail className="w-4 h-4 text-primary-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Calendar className="w-4 h-4 text-primary-400" />
                  <span>
                    Membre depuis {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              <Button variant="outline" className="w-full" icon={<Edit className="w-4 h-4" />}>
                Modifier le profil
              </Button>
            </motion.div>

            {/* Level Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-primary-400" />
                <h3 className="font-bold">Niveau actuel</h3>
              </div>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-dark-700"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                      animate={{
                        strokeDashoffset: 2 * Math.PI * 45 * (1 - progressPercentage / 100),
                      }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#d946ef" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Trophy className="w-8 h-8 text-yellow-400 mb-1" />
                    <span className="text-2xl font-black">{level}</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">
                  {user.xp} / {xpForNextLevel} XP
                </p>
                <p className="text-xs text-gray-500">
                  Plus que {xpForNextLevel - user.xp} XP pour le niveau {level + 1}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Statistiques</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4 }}
                    className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <div className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                        {stat.icon}
                      </div>
                    </div>
                    <p className="text-3xl font-black mb-2">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-6">Badges & Achievements</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4 }}
                    className={`bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300 ${
                      !achievement.unlocked ? 'opacity-50' : 'ring-2 ring-green-500/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-400 mb-3">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && (
                          <span className="inline-flex items-center gap-1 text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-lg">
                            <Zap className="w-3 h-3" />
                            Débloqué
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6">Activité récente</h2>
              <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6">
                {progress.length > 0 ? (
                  <div className="space-y-4">
                    {progress.slice(0, 5).map((p, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0"
                      >
                        <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-primary-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {p.completed ? 'Leçon complétée' : 'Progression sauvegardée'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(p.updatedAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        {p.completed && (
                          <Trophy className="w-6 h-6 text-yellow-400" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400">Aucune activité pour le moment</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;