import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Map,
  User,
  Eye,
  Heart,
  CheckCircle,
  Circle,
  Share2,
  Edit,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useRoadmapStore } from '@/store/roadmapStore';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/common/Navbar';
import Button from '@/components/common/Button';
import { ROADMAP_CATEGORY_LABELS } from '@/utils/constants';

const ViewRoadmap = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const {
    currentRoadmap,
    fetchRoadmap,
    likeRoadmap,
    toggleStepCompletion,
    isLoading,
  } = useRoadmapStore();

  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRoadmap(id);
    }
  }, [id]);

  const handleLike = async () => {
    if (!id) return;
    await likeRoadmap(id);
    setHasLiked(true);
  };

  const handleToggleStep = async (stepId: string) => {
    if (!id) return;
    await toggleStepCompletion(id, stepId);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentRoadmap?.title,
        text: currentRoadmap?.description || '',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  if (isLoading || !currentRoadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Chargement de la roadmap...</p>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === currentRoadmap.userId;
  const completedSteps =
    currentRoadmap.steps?.filter((s) => s.completed).length || 0;
  const totalSteps = currentRoadmap.steps?.length || 0;
  const progressPercentage =
    totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/roadmaps"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour aux roadmaps
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              icon={<Share2 className="w-4 h-4" />}
            >
              Partager
            </Button>
            {isOwner && (
              <Link to={`/roadmaps/${id}/edit`}>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Edit className="w-4 h-4" />}
                >
                  Modifier
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Roadmap Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-sm rounded-3xl p-8"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Map className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <span className="text-xs px-3 py-1 bg-primary-500/20 text-primary-400 rounded-lg font-medium inline-block mb-3">
                    {ROADMAP_CATEGORY_LABELS[
                      currentRoadmap.category as keyof typeof ROADMAP_CATEGORY_LABELS
                    ] || currentRoadmap.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-black mb-3">{currentRoadmap.title}</h1>
                  <p className="text-gray-300 text-lg">{currentRoadmap.description}</p>
                </div>
              </div>

              {/* Author & Stats */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {currentRoadmap.user?.fullName}
                    </p>
                    <p className="text-xs text-gray-500">
                      @{currentRoadmap.user?.username}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <span className="flex items-center gap-1 text-gray-400">
                    <Eye className="w-4 h-4" />
                    {currentRoadmap.views}
                  </span>
                  <button
                    onClick={handleLike}
                    disabled={hasLiked}
                    className={`flex items-center gap-1 ${
                      hasLiked
                        ? 'text-red-400'
                        : 'text-gray-400 hover:text-red-400 transition-colors'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`}
                    />
                    {currentRoadmap.likes + (hasLiked ? 1 : 0)}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-primary-400" />
                <h2 className="text-3xl font-bold">Parcours</h2>
              </div>

              {currentRoadmap.steps && currentRoadmap.steps.length > 0 ? (
                <div className="space-y-4">
                  {currentRoadmap.steps.map((step: any, index: number) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                      className={`bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300 ${
                        step.completed ? 'ring-2 ring-green-500/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => handleToggleStep(step.id)}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                            step.completed
                              ? 'bg-green-500/20 hover:bg-green-500/30'
                              : 'bg-primary-500/20 hover:bg-primary-500/30'
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          ) : (
                            <Circle className="w-6 h-6 text-primary-400" />
                          )}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-gray-500 font-medium">
                              Étape {index + 1}
                            </span>
                            {step.completed && (
                              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-lg">
                                Complétée
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                          {step.description && (
                            <p className="text-sm text-gray-400">
                              {step.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-12 text-center">
                  <p className="text-gray-400">
                    Aucune étape définie pour cette roadmap
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-primary-400" />
                <h3 className="font-bold">Progression</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">
                      Étapes complétées
                    </span>
                    <span className="font-bold">
                      {completedSteps}/{totalSteps}
                    </span>
                  </div>
                  <div className="h-3 bg-dark-800/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {Math.round(progressPercentage)}% terminé
                  </p>
                </div>

                {progressPercentage === 100 && (
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl">
                      <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-400" />
                      <p className="font-bold mb-1">Roadmap terminée ! 🎉</p>
                      <p className="text-sm text-gray-400">
                        Félicitations pour avoir complété ce parcours
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6"
            >
              <h3 className="font-bold mb-4">Informations</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-gray-400">Catégorie</span>
                  <span className="font-medium">
                    {ROADMAP_CATEGORY_LABELS[
                      currentRoadmap.category as keyof typeof ROADMAP_CATEGORY_LABELS
                    ] || currentRoadmap.category}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-gray-400">Étapes</span>
                  <span className="font-medium">{totalSteps}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-gray-400">Visibilité</span>
                  <span className="font-medium">
                    {currentRoadmap.isPublic ? 'Publique' : 'Privée'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Créée le</span>
                  <span className="font-medium">
                    {new Date(currentRoadmap.createdAt).toLocaleDateString(
                      'fr-FR'
                    )}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRoadmap;