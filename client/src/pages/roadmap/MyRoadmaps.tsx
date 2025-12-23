import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Plus, Trash2, Eye, Lock, Globe, ArrowLeft } from 'lucide-react';
import { useRoadmapStore } from '@/store/roadmapStore';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/common/Card';
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
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/roadmaps"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux roadmaps
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black mb-2">
                Mes <span className="gradient-text">Roadmaps</span>
              </h1>
              <p className="text-gray-400">
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
                <Card gradient className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded">
                          {roadmap.category}
                        </span>
                        {roadmap.isPublic ? (
                          <Globe className="w-4 h-4 text-green-400" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <h3 className="font-bold text-lg mb-1">
                        {roadmap.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {roadmap.description || 'Aucune description'}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Map className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span>{(roadmap as any)._count?.steps || 0} étapes</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {roadmap.views}
                    </span>
                    <span>•</span>
                    <span>{roadmap.likes} likes</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto pt-4 border-t border-dark-700">
                    <Link to={`/roadmaps/${roadmap.id}`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full">
                        <Eye className="w-4 h-4" />
                        Voir
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(roadmap.id)}
                      icon={<Trash2 className="w-4 h-4" />}
                    >
                      Supprimer
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card glass>
            <div className="text-center py-20">
              <Map className="w-20 h-20 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-bold mb-2">
                Aucune roadmap pour le moment
              </h3>
              <p className="text-gray-400 mb-6">
                Créez votre première roadmap d'apprentissage personnalisée
              </p>
              <Link to="/roadmaps/create">
                <Button icon={<Plus className="w-5 h-5" />}>
                  Créer une roadmap
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyRoadmaps;