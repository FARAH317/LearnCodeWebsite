import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Plus, TrendingUp, Users, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { useRoadmapStore } from '@/store/roadmapStore';
import Navbar from '@/components/common/Navbar';
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
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Mes roadmaps',
      value: myRoadmaps.length,
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-500/10',
    },
    {
      label: 'Vues totales',
      value: roadmaps.reduce((sum, r) => sum + r.views, 0),
      icon: <Eye className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-500/10',
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-primary-400" />
                <h1 className="text-4xl md:text-5xl font-black">
                  <span className="gradient-text">Roadmaps</span> d'apprentissage
                </h1>
              </div>
              <p className="text-xl text-gray-400">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
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

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <Link to="/roadmaps/my-roadmaps">
            <motion.div
              whileHover={{ y: -6 }}
              className="h-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-8 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-blue-400" />
                </div>
                <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mes Roadmaps</h3>
              <p className="text-gray-400">
                Gérez et suivez vos roadmaps personnelles
              </p>
            </motion.div>
          </Link>

          <Link to="/roadmaps/explore">
            <motion.div
              whileHover={{ y: -6 }}
              className="h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Map className="w-7 h-7 text-purple-400" />
                </div>
                <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-2">Explorer</h3>
              <p className="text-gray-400">
                Découvrez des roadmaps créées par la communauté
              </p>
            </motion.div>
          </Link>

          <Link to="/roadmaps/create">
            <motion.div
              whileHover={{ y: -6 }}
              className="h-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-8 hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-7 h-7 text-green-400" />
                </div>
                <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-2">Créer</h3>
              <p className="text-gray-400">
                Créez votre roadmap personnalisée
              </p>
            </motion.div>
          </Link>
        </motion.div>

        {/* Popular Roadmaps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary-400" />
              <h2 className="text-3xl font-bold">Roadmaps populaires</h2>
            </div>
            <Link to="/roadmaps/explore">
              <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                Voir tout
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
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
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="h-full bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <span className="text-xs px-3 py-1 bg-primary-500/20 text-primary-400 rounded-lg font-medium inline-block mb-3">
                            {roadmap.category}
                          </span>
                          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                            {roadmap.title}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {roadmap.description}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ml-4">
                          <Map className="w-6 h-6" />
                        </div>
                      </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span>{roadmap._count?.steps} étapes</span>
                            <span>•</span>
                            <span>{roadmap.views} vues</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-primary-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-16 text-center">
              <Map className="w-20 h-20 mx-auto mb-6 text-gray-600" />
              <h3 className="text-xl font-bold mb-3">
                Aucune roadmap disponible
              </h3>
              <p className="text-gray-400 mb-6">
                Soyez le premier à créer une roadmap
              </p>
              <Link to="/roadmaps/create">
                <Button icon={<Plus className="w-5 h-5" />}>
                  Créer la première roadmap
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RoadmapHome;