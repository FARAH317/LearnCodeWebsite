import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Award,
  Zap,
  Code2,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCourseStore } from '@/store/courseStore';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { myCourses, progress, fetchMyCourses, fetchProgress } = useCourseStore();

  useEffect(() => {
    fetchMyCourses();
    fetchProgress();
  }, []);

  const stats = [
    {
      label: 'Cours suivis',
      value: myCourses.length,
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Leçons complétées',
      value: progress.filter((p) => p.completed).length,
      icon: <Target className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Points XP',
      value: user?.xp || 0,
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      label: 'Niveau',
      value: user?.level || 1,
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const recentActivity = [
    {
      type: 'lesson',
      title: 'HTML Basics complété',
      time: 'Il y a 2 heures',
      xp: 50,
    },
    {
      type: 'challenge',
      title: 'Challenge FizzBuzz réussi',
      time: 'Il y a 5 heures',
      xp: 100,
    },
    {
      type: 'course',
      title: 'Inscrit à JavaScript Basics',
      time: 'Il y a 1 jour',
      xp: 0,
    },
  ];

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
          <h1 className="text-4xl font-black mb-2">
            Bienvenue, <span className="gradient-text">{user?.fullName}</span> ! 👋
          </h1>
          <p className="text-gray-400">
            Continuez votre parcours d'apprentissage
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
                    <p className="text-3xl font-black">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </Card>
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Continuer l'apprentissage</h2>
                <Link to="/courses">
                  <Button variant="outline" size="sm">
                    Voir tous les cours
                  </Button>
                </Link>
              </div>

              {myCourses.length > 0 ? (
                <div className="grid gap-4">
                  {myCourses.slice(0, 3).map((course) => (
                    <Card key={course.id} hover gradient>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Code2 className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                          <p className="text-gray-400 text-sm mb-2">{course.description}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded">
                              {course.language}
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
                    </Card>
                  ))}
                </div>
              ) : (
                <Card glass>
                  <div className="text-center py-8">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400 mb-4">
                      Vous n'êtes inscrit à aucun cours pour le moment
                    </p>
                    <Link to="/courses">
                      <Button>Explorer les cours</Button>
                    </Link>
                  </div>
                </Card>
              )}
            </motion.div>

            {/* Recommended Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Recommandé pour vous</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Python pour débutants',
                    language: 'Python',
                    difficulty: 'beginner',
                    xp: 800,
                  },
                  {
                    title: 'React Avancé',
                    language: 'JavaScript',
                    difficulty: 'advanced',
                    xp: 1200,
                  },
                ].map((course, index) => (
                  <Card key={index} hover glass>
                    <h3 className="font-bold mb-2">{course.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-1 bg-secondary-500/20 text-secondary-400 rounded">
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
                  </Card>
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
            >
              <Card glass>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-400" />
                  Votre progression
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Niveau {user?.level}</span>
                      <span className="text-sm text-primary-400">
                        {user?.xp} / {(user?.level || 1) * 1000} XP
                      </span>
                    </div>
                    <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${((user?.xp || 0) / ((user?.level || 1) * 1000)) * 100}%`,
                        }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-dark-700">
                    <p className="text-sm text-gray-400 mb-2">
                      Plus que {(user?.level || 1) * 1000 - (user?.xp || 0)} XP pour le niveau suivant !
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card glass>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-400" />
                  Activité récente
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        {activity.type === 'lesson' && <BookOpen className="w-4 h-4 text-primary-400" />}
                        {activity.type === 'challenge' && <Trophy className="w-4 h-4 text-primary-400" />}
                        {activity.type === 'course' && <Award className="w-4 h-4 text-primary-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
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
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card glass>
                <h3 className="font-bold mb-4">Actions rapides</h3>
                <div className="space-y-2">
                  <Link to="/challenges">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Trophy className="w-4 h-4" />
                      Relever un défi
                    </Button>
                  </Link>
                  <Link to="/roadmaps">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Target className="w-4 h-4" />
                      Créer une roadmap
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Award className="w-4 h-4" />
                      Voir mes badges
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;