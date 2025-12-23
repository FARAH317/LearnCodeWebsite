import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
} from 'lucide-react';
import { useRoadmapStore } from '@/store/roadmapStore';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { ROADMAP_CATEGORY_LABELS } from '@/utils/constants';

const ViewRoadmap = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
      <div className="min-h-screen bg-dark-900">
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
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/roadmaps')}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux roadmaps
          </button>

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
          <div className="lg:col-span-2 space-y-6">
            {/* Roadmap Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card gradient className="border-2 border-primary-500/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Map className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded">
                        {ROADMAP_CATEGORY_LABELS[
                          currentRoadmap.category as keyof typeof ROADMAP_CATEGORY_LABELS
                        ] || currentRoadmap.category}
                      </span>
                    </div>
                    <h1 className="text-3xl font-black mb-2">
                      {currentRoadmap.title}
                    </h1>
                    <p className="text-gray-400">{currentRoadmap.description}</p>
                  </div>
                </div>

                {/* Author & Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {currentRoadmap.user?.fullName}
                      </p>
                      <p className="text-xs text-gray-500">
                        @{currentRoadmap.user?.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {currentRoadmap.views}
                    </span>
                    <button
                      onClick={handleLike}
                      disabled={hasLiked}
                      className={`flex items-center gap-1 ${
                        hasLiked
                          ? 'text-red-400'
                          : 'hover:text-red-400 transition-colors'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`}
                      />
                      {currentRoadmap.likes + (hasLiked ? 1 : 0)}
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4">Parcours</h2>

              {currentRoadmap.steps && currentRoadmap.steps.length > 0 ? (
                <div className="space-y-3">
                  {currentRoadmap.steps.map((step: any, index: number) => (
                    <Card
                      key={step.id}
                      hover
                      glass
                      className={
                        step.completed ? 'border-2 border-green-500/20' : ''
                      }
                    >
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => handleToggleStep(step.id)}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                            step.completed
                              ? 'bg-green-500/20'
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
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-500">
                              Étape {index + 1}
                            </span>
                            {step.completed && (
                              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">
                                Complétée
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold mb-1">{step.title}</h3>
                          {step.description && (
                            <p className="text-sm text-gray-400">
                              {step.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card glass>
                  <div className="text-center py-8">
                    <p className="text-gray-400">
                      Aucune étape définie pour cette roadmap
                    </p>
                  </div>
                </Card>
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
            >
              <Card glass>
                <h3 className="font-bold mb-4">Progression</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">
                        Étapes complétées
                      </span>
                      <span className="font-bold">
                        {completedSteps}/{totalSteps}
                      </span>
                    </div>
                    <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {Math.round(progressPercentage)}% terminé
                    </p>
                  </div>

                  {progressPercentage === 100 && (
                    <div className="pt-4 border-t border-dark-700">
                      <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg">
                        <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-400" />
                        <p className="font-bold mb-1">Roadmap terminée ! 🎉</p>
                        <p className="text-sm text-gray-400">
                          Félicitations pour avoir complété ce parcours
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card glass>
                <h3 className="font-bold mb-3">Informations</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Catégorie</span>
                    <span>
                      {ROADMAP_CATEGORY_LABELS[
                        currentRoadmap.category as keyof typeof ROADMAP_CATEGORY_LABELS
                      ] || currentRoadmap.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Étapes</span>
                    <span>{totalSteps}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Visibilité</span>
                    <span>
                      {currentRoadmap.isPublic ? 'Publique' : 'Privée'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Créée le</span>
                    <span>
                      {new Date(currentRoadmap.createdAt).toLocaleDateString(
                        'fr-FR'
                      )}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRoadmap;