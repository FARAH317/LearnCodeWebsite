import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Plus, Trash2, Eye, Lock, Globe, ArrowLeft, Sparkles } from 'lucide-react';
import { useRoadmapStore } from '@/store/roadmapStore';
import Navbar from '@/components/common/Navbar';
import Button from '@/components/common/Button';

const MyRoadmaps = () => {
  const { myRoadmaps, fetchMyRoadmaps, deleteRoadmap, isLoading } = useRoadmapStore();

  useEffect(() => {
    fetchMyRoadmaps();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette roadmap ?')) {
      await deleteRoadmap(id);
    }
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
          <Link
            to="/roadmaps"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour aux roadmaps
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-primary-400" />
                <h1 className="text-4xl md:text-5xl font-black">
                  Mes <span className="gradient-text">Roadmaps</span>
                </h1>
              </div>
              <p className="text-xl text-gray-400">
                Gérez et suivez vos roadmaps personnelles
              </p>
            </div>
            <Link to="/roadmaps/create">
              <Button icon={<Plus className="w-5 h-5" />}>
                Nouvelle roadmap
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Roadmaps Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Chargement de vos roadmaps...</p>
          </div>
        ) : myRoadmaps.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRoadmaps.map((roadmap, index) => (
              <motion.div
                key={roadmap.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-xs px-3 py-1 bg-primary-500/20 text-primary-400 rounded-lg font-medium">
                          {roadmap.category}
                        </span>
                        {roadmap.isPublic ? (
                          <div className="flex items-center gap-1 text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-lg">
                            <Globe className="w-3 h-3" />
                            <span>Public</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-500/20 text-gray-400 rounded-lg">
                            <Lock className="w-3 h-3" />
                            <span>Privé</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        {roadmap.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                        {roadmap.description || 'Aucune description'}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0 ml-4">
                      <Map className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 pb-4 border-b border-white/5">
                    <span>{(roadmap as any)._count?.steps || 0} étapes</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{roadmap.views}</span>
                    </div>
                    <span>•</span>
                    <span>{roadmap.likes} likes</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link to={`/roadmaps/${roadmap.id}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full" icon={<Eye className="w-4 h-4" />}>
                        Voir
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(roadmap.id)}
                      icon={<Trash2 className="w-4 h-4" />}
                      className="text-red-400 hover:bg-red-500/10"
                    >
                      Supprimer
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-16 text-center">
            <Map className="w-24 h-24 mx-auto mb-6 text-gray-600" />
            <h3 className="text-2xl font-bold mb-3">
              Aucune roadmap pour le moment
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Créez votre première roadmap d'apprentissage personnalisée
            </p>
            <Link to="/roadmaps/create">
              <Button size="lg" icon={<Plus className="w-5 h-5" />}>
                Créer une roadmap
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRoadmaps;