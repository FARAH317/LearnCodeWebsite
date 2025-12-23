import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, Save, GripVertical } from 'lucide-react';
import { useRoadmapStore } from '@/store/roadmapStore';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/common/Card';
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
      // Créer la roadmap
      const roadmap = await createRoadmap({
        ...formData,
        data: { nodes: [], edges: [] }, // Simplified for now
      });

      // Ajouter les étapes
      if (steps.length > 0 && steps[0].title) {
        await updateSteps(roadmap.id, steps);
      }

      navigate(`/roadmaps/${roadmap.id}`);
    } catch (error) {
      console.error('Error creating roadmap:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
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
            Créer une <span className="gradient-text">Roadmap</span>
          </h1>
          <p className="text-gray-400">
            Définissez votre parcours d'apprentissage étape par étape
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card glass className="mb-6">
              <h2 className="text-xl font-bold mb-4">Informations générales</h2>

              <div className="space-y-4">
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
                    className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder:text-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-dark-600 min-h-[100px]"
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
                    className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    {ROADMAP_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {ROADMAP_CATEGORY_LABELS[cat]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) =>
                      setFormData({ ...formData, isPublic: e.target.checked })
                    }
                    className="w-4 h-4 text-primary-500 bg-dark-800 border-dark-700 rounded focus:ring-primary-500 focus:ring-2"
                  />
                  <label htmlFor="isPublic" className="text-sm text-gray-300">
                    Rendre cette roadmap publique
                  </label>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card glass className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Étapes</h2>
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
                  <Card key={step.id} className="bg-dark-800">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2 flex-shrink-0 pt-2">
                        <GripVertical className="w-5 h-5 text-gray-500" />
                        <span className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center text-primary-400 font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>

                      <div className="flex-1 space-y-3">
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
                          className="w-full rounded-lg bg-dark-700 border border-dark-600 px-4 py-2 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          rows={2}
                        />
                      </div>

                      {steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(step.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
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
              icon={<Save className="w-5 h-5" />}
            >
              Créer la roadmap
            </Button>
            <Button
              type="button"
              variant="outline"
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