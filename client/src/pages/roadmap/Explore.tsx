import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Search, Eye, Heart, User, ArrowLeft, Sparkles, Filter as FilterIcon } from 'lucide-react';
import { useRoadmapStore } from '@/store/roadmapStore';
import Navbar from '@/components/common/Navbar';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
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

          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary-400" />
            <h1 className="text-4xl md:text-5xl font-black">
              Explorer les <span className="gradient-text">Roadmaps</span>
            </h1>
          </div>
          <p className="text-xl text-gray-400">
            Découvrez des parcours d'apprentissage créés par la communauté
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6">
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
                className="w-full rounded-xl bg-dark-800/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer transition-all"
              >
                <option value="all">Toutes les catégories</option>
                {ROADMAP_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {ROADMAP_CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
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
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="h-full bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300 group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <span className="text-xs px-3 py-1 bg-primary-500/20 text-primary-400 rounded-lg font-medium inline-block mb-3">
                          {ROADMAP_CATEGORY_LABELS[roadmap.category as keyof typeof ROADMAP_CATEGORY_LABELS] || roadmap.category}
                        </span>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                          {roadmap.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                          {roadmap.description || 'Aucune description'}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ml-4">
                        <Map className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Author */}
                    {roadmap.user && (
                      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
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
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-16 text-center">
            <FilterIcon className="w-20 h-20 mx-auto mb-6 text-gray-600" />
            <h3 className="text-2xl font-bold mb-3">Aucune roadmap trouvée</h3>
            <p className="text-gray-400 mb-8">
              Essayez de modifier vos critères de recherche
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              variant="outline"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;