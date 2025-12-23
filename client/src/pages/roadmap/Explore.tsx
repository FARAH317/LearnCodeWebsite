import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Search, Filter, Eye, Heart, User, ArrowLeft } from 'lucide-react';
import { useRoadmapStore } from '@/store/roadmapStore';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/common/Card';
import Input from '@/components/common/Input';
import { ROADMAP_CATEGORIES, ROADMAP_CATEGORY_LABELS } from '@/utils/constants';

const Explore = () => {
  const { roadmaps, fetchRoadmaps, isLoading } = useRoadmapStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const filteredRoadmaps = roadmaps.filter((roadmap) => {
    const matchesSearch =
      roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      roadmap.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || roadmap.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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

          <h1 className="text-4xl font-black mb-2">
            Explorer les <span className="gradient-text">Roadmaps</span>
          </h1>
          <p className="text-gray-400">
            Découvrez des parcours d'apprentissage créés par la communauté
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card glass>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Search */}
              <Input
                type="text"
                placeholder="Rechercher une roadmap..."
                icon={<Search className="w-5 h-5" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Toutes les catégories</option>
                {ROADMAP_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {ROADMAP_CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
            </div>
          </Card>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-400">
            {filteredRoadmaps.length} roadmap{filteredRoadmaps.length > 1 ? 's' : ''} trouvée
            {filteredRoadmaps.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Roadmaps Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Chargement des roadmaps...</p>
          </div>
        ) : filteredRoadmaps.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoadmaps.map((roadmap, index) => (
              <motion.div
                key={roadmap.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/roadmaps/${roadmap.id}`}>
                  <Card hover gradient className="h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded mb-2 inline-block">
                          {ROADMAP_CATEGORY_LABELS[roadmap.category as keyof typeof ROADMAP_CATEGORY_LABELS] || roadmap.category}
                        </span>
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

                    {/* Author */}
                    {roadmap.user && (
                      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-dark-700">
                        <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-sm text-gray-400">
                          {roadmap.user.fullName}
                        </span>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-3">
                        <span>{roadmap._count?.steps || 0} étapes</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {roadmap.views}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-red-400">
                        <Heart className="w-4 h-4" />
                        {roadmap.likes}
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
              <Filter className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-bold mb-2">Aucune roadmap trouvée</h3>
              <p className="text-gray-400 mb-4">
                Essayez de modifier vos critères de recherche
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-primary-400 hover:text-primary-300"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Explore;