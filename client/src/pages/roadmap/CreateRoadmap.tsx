import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, Save, GripVertical, Sparkles } from 'lucide-react';
import { useRoadmapStore } from '@/store/roadmapStore';
import Navbar from '@/components/common/Navbar';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ROADMAP_CATEGORIES, ROADMAP_CATEGORY_LABELS } from '@/utils/constants';

interface Step {
  id: string;
  title: string;
  description: string;
  order: number;
}

const CreateRoadmap = () => {
  const navigate = useNavigate();
  const { createRoadmap, updateSteps, isLoading } = useRoadmapStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    isPublic: false,
  });

  const [steps, setSteps] = useState<Step[]>([
    { id: '1', title: '', description: '', order: 0 },
  ]);

  const handleAddStep = () => {
    const newStep: Step = {
      id: Date.now().toString(),
      title: '',
      description: '',
      order: steps.length,
    };
    setSteps([...steps, newStep]);
  };

  const handleRemoveStep = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const handleStepChange = (id: string, field: keyof Step, value: string) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const roadmap = await createRoadmap({
        ...formData,
        data: { nodes: [], edges: [] },
      });

      if (steps.length > 0 && steps[0].title) {
        await updateSteps(roadmap.id, steps);
      }

      navigate(`/roadmaps/${roadmap.id}`);
    } catch (error) {
      console.error('Error creating roadmap:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
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
              Créer une <span className="gradient-text">Roadmap</span>
            </h1>
          </div>
          <p className="text-xl text-gray-400">
            Définissez votre parcours d'apprentissage étape par étape
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Informations générales</h2>

              <div className="space-y-6">
                <Input
                  label="Titre"
                  placeholder="Ex: Devenir développeur Full Stack"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Décrivez votre roadmap..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full rounded-xl bg-dark-800/50 border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-white/20 min-h-[100px] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full rounded-xl bg-dark-800/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer transition-all"
                    required
                  >
                    {ROADMAP_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {ROADMAP_CATEGORY_LABELS[cat]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3 p-4 bg-dark-800/50 rounded-xl">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) =>
                      setFormData({ ...formData, isPublic: e.target.checked })
                    }
                    className="w-5 h-5 text-primary-500 bg-dark-800 border-white/20 rounded focus:ring-primary-500 focus:ring-2 cursor-pointer"
                  />
                  <label htmlFor="isPublic" className="text-sm text-gray-300 cursor-pointer flex-1">
                    Rendre cette roadmap publique (visible par tous les utilisateurs)
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Étapes du parcours</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddStep}
                  icon={<Plus className="w-4 h-4" />}
                >
                  Ajouter une étape
                </Button>
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="bg-dark-800/50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center gap-3 flex-shrink-0 pt-2">
                        <GripVertical className="w-5 h-5 text-gray-500" />
                        <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
                          <span className="text-primary-400 font-bold">{index + 1}</span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        <Input
                          placeholder="Titre de l'étape"
                          value={step.title}
                          onChange={(e) =>
                            handleStepChange(step.id, 'title', e.target.value)
                          }
                          required
                        />
                        <textarea
                          placeholder="Description (optionnel)"
                          value={step.description}
                          onChange={(e) =>
                            handleStepChange(
                              step.id,
                              'description',
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl bg-dark-700/50 border border-white/10 px-4 py-2 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                          rows={2}
                        />
                      </div>

                      {steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(step.id)}
                          className="p-2 hover:bg-red-500/10 rounded-xl transition-colors text-red-400"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4"
          >
            <Button
              type="submit"
              isLoading={isLoading}
              className="flex-1"
              size="lg"
              icon={<Save className="w-5 h-5" />}
            >
              Créer la roadmap
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate('/roadmaps')}
            >
              Annuler
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoadmap;