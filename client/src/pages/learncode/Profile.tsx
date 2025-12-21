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
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCourseStore } from '@/store/courseStore';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import ProgressBadge from '@/components/learncode/ProgressBadge';

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

  const stats = [
    {
      label: 'Cours suivis',
      value: myCourses.length,
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Leçons terminées',
      value: completedLessons,
      icon: <Target className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Total XP',
      value: totalXP,
      icon: <Trophy className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      label: 'Badges',
      value: 0,
      icon: <Award className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
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
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Profile Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card gradient className="text-center">
                {/* Avatar */}
                <div className="mb-4">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12" />
                    )}
                  </div>
                  <h2 className="text-2xl font-black mb-1">{user.fullName}</h2>
                  <p className="text-gray-400">@{user.username}</p>
                </div>

                {/* Bio */}
                {user.bio && (
                  <p className="text-gray-400 text-sm mb-4 pb-4 border-b border-dark-700">
                    {user.bio}
                  </p>
                )}

                {/* Info */}
                <div className="space-y-2 text-left mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Membre depuis {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" icon={<Edit className="w-4 h-4" />}>
                  Modifier le profil
                </Button>
              </Card>
            </motion.div>

            {/* Level Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card glass>
                <h3 className="font-bold mb-4 text-center">Niveau actuel</h3>
                <div className="flex justify-center mb-4">
                  <ProgressBadge xp={user.xp} level={user.level} size="lg" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">
                    {user.xp} / {user.level * 1000} XP
                  </p>
                  <p className="text-xs text-gray-500">
                    Plus que {user.level * 1000 - user.xp} XP pour le niveau {user.level + 1}
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} hover glass>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                        {stat.icon}
                      </div>
                    </div>
                    <p className="text-2xl font-black mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Badges & Achievements</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <Card
                    key={index}
                    hover
                    glass
                    className={!achievement.unlocked ? 'opacity-50' : ''}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`text-3xl ${
                          achievement.unlocked ? '' : 'grayscale'
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-400">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && (
                          <div className="mt-2">
                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                              Débloqué ✓
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">Activité récente</h2>
              <Card glass>
                {progress.length > 0 ? (
                  <div className="space-y-3">
                    {progress.slice(0, 5).map((p, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 pb-3 border-b border-dark-700 last:border-0 last:pb-0"
                      >
                        <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-primary-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {p.completed ? 'Leçon complétée' : 'Progression sauvegardée'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(p.updatedAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        {p.completed && (
                          <Trophy className="w-5 h-5 text-yellow-400" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                    <p className="text-gray-400">Aucune activité pour le moment</p>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;