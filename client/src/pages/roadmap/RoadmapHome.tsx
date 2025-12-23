import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Plus, TrendingUp, Users, Eye } from 'lucide-react';
import { useRoadmapStore } from '@/store/roadmapStore';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const RoadmapHome = () => {
  const { roadmaps, myRoadmaps, fetchRoadmaps, fetchMyRoadmaps, isLoading } =
    useRoadmapStore();

  useEffect(() => {
    fetchRoadmaps();
    fetchMyRoadmaps();
  }, []);

  const stats = [
    {
      label: 'Roadmaps publiques',
      value: roadmaps.length,
      icon: <Map className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Mes roadmaps',
      value: myRoadmaps.length,
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Vues totales',
      value: roadmaps.reduce((sum, r) => sum + r.views, 0),
      icon: <Eye className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-black mb-2">
                <span className="gradient-text">Roadmaps</span> d'apprentissage
              </h1>
              <p className="text-gray-400">
                Créez et suivez votre parcours d'apprentissage personnalisé
              </p>
            </div>
            <Link to="/roadmaps/create">
              <Button icon={<Plus className="w-5 h-5" />}>
                Créer une roadmap
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
                    <p className="text-2xl font-black">{stat.value}</p>
                  </div>
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <Link to="/roadmaps/my-roadmaps">
            <Card hover gradient className="h-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-bold">Mes Roadmaps</h3>
                  <p className="text-sm text-gray-400">
                    Gérez vos roadmaps
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/roadmaps/explore">
            <Card hover gradient className="h-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary-500/20 rounded-lg flex items-center justify-center">
                  <Map className="w-6 h-6 text-secondary-400" />
                </div>
                <div>
                  <h3 className="font-bold">Explorer</h3>
                  <p className="text-sm text-gray-400">
                    Découvrez des roadmaps
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/roadmaps/create">
            <Card hover gradient className="h-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold">Créer</h3>
                  <p className="text-sm text-gray-400">
                    Nouvelle roadmap
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Popular Roadmaps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary-400" />
              Roadmaps populaires
            </h2>
            <Link to="/roadmaps/explore">
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Chargement des roadmaps...</p>
            </div>
          ) : roadmaps.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmaps.slice(0, 6).map((roadmap, index) => (
                <motion.div
                  key={roadmap.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/roadmaps/${roadmap.id}`}>
                    <Card hover gradient className="h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">
                            {roadmap.title}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {roadmap.description}
                          </p>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Map className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-dark-700">
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span>{roadmap._count.steps} étapes</span>
                          <span>•</span>
                          <span>{roadmap.views} vues</span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded">
                          {roadmap.category}
                        </span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card glass>
              <div className="text-center py-12">
                <Map className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400 mb-4">
                  Aucune roadmap disponible pour le moment
                </p>
                <Link to="/roadmaps/create">
                  <Button>Créer la première roadmap</Button>
                </Link>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RoadmapHome;