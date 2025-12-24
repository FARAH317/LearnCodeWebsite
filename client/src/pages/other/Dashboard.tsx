import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Zap,
  Code2,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCourseStore } from '@/store/courseStore';
import Navbar from '@/components/common/Navbar';
import Button from '@/components/common/Button';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { myCourses, progress, fetchMyCourses, fetchProgress } = useCourseStore();

  useEffect(() => {
    fetchMyCourses();
    fetchProgress();
  }, []);

  const completedLessons = progress.filter((p) => p.completed).length;

  const stats = [
    {
      label: 'Cours suivis',
      value: myCourses.length,
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Leçons complétées',
      value: completedLessons,
      icon: <Target className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Points XP',
      value: user?.xp || 0,
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      label: 'Niveau actuel',
      value: user?.level || 1,
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

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
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            Salut, <span className="gradient-text">{user?.fullName}</span> ! 👋
          </h1>
          <p className="text-xl text-gray-400">
            Continuez votre parcours d'apprentissage
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <div className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-black">{stat.value}</div>
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Flame className="w-6 h-6 text-orange-400" />
                  <h2 className="text-2xl font-bold">Continuer l'apprentissage</h2>
                </div>
                <Link to="/courses">
                  <Button variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                    Voir tout
                  </Button>
                </Link>
              </div>

              {myCourses.length > 0 ? (
                <div className="space-y-4">
                  {myCourses.slice(0, 3).map((course) => (
                    <motion.div
                      key={course.id}
                      whileHover={{ x: 4 }}
                      className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Code2 className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                          <p className="text-gray-400 text-sm mb-2 line-clamp-1">{course.description}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded-lg">
                              {course.language.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500">
                              {course.difficulty}
                            </span>
                          </div>
                        </div>
                        <Link to={`/courses/${course.id}`}>
                          <Button size="sm">Continuer</Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-12 text-center">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-400 mb-6">
                    Vous n'êtes inscrit à aucun cours pour le moment
                  </p>
                  <Link to="/courses">
                    <Button>Explorer les cours</Button>
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Recommended Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Recommandé pour vous</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Python pour débutants',
                    language: 'Python',
                    difficulty: 'beginner',
                    xp: 800,
                    color: 'from-green-500 to-emerald-500',
                  },
                  {
                    title: 'React Avancé',
                    language: 'JavaScript',
                    difficulty: 'advanced',
                    xp: 1200,
                    color: 'from-blue-500 to-cyan-500',
                  },
                ].map((course, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4 }}
                    className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Code2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold mb-2">{course.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-1 bg-secondary-500/20 text-secondary-400 rounded-lg">
                        {course.language}
                      </span>
                      <span className="text-xs text-gray-500">{course.difficulty}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">+{course.xp} XP</span>
                      <Link to="/courses">
                        <Button size="sm" variant="outline">
                          Découvrir
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-primary-400" />
                <h3 className="font-bold">Votre progression</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Niveau {user?.level}</span>
                    <span className="text-sm text-primary-400 font-semibold">
                      {user?.xp} / {(user?.level || 1) * 1000} XP
                    </span>
                  </div>
                  <div className="h-3 bg-dark-800/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((user?.xp || 0) / ((user?.level || 1) * 1000)) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Plus que {(user?.level || 1) * 1000 - (user?.xp || 0)} XP pour le niveau suivant !
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-primary-400" />
                <h3 className="font-bold">Activité récente</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'HTML Basics complété', time: 'Il y a 2h', xp: 50, icon: BookOpen },
                  { label: 'Challenge FizzBuzz réussi', time: 'Il y a 5h', xp: 100, icon: Trophy },
                  { label: 'Inscrit à JavaScript', time: 'Il y a 1j', xp: 0, icon: Code2 },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.label}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                        {activity.xp > 0 && (
                          <span className="text-xs text-primary-400">+{activity.xp} XP</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6"
            >
              <h3 className="font-bold mb-4">Actions rapides</h3>
              <div className="space-y-2">
                <Link to="/challenges">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm">Relever un défi</span>
                  </button>
                </Link>
                <Link to="/roadmaps">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left">
                    <Target className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">Créer une roadmap</span>
                  </button>
                </Link>
                <Link to="/profile">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <span className="text-sm">Voir mes badges</span>
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;