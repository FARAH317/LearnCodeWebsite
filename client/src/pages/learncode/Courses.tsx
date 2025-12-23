import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Code2,
  Trophy,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import { useCourseStore } from '@/store/courseStore';
import Navbar from '@/components/common/Navbar';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const Courses = () => {
  const { courses, fetchCourses, isLoading } = useCourseStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  const languages = ['all', 'html', 'javascript', 'python', 'css', 'react'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage =
      selectedLanguage === 'all' || course.language === selectedLanguage;
    const matchesDifficulty =
      selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;

    return matchesSearch && matchesLanguage && matchesDifficulty;
  });

  const difficultyColors = {
    beginner: 'text-green-400 bg-green-500/20',
    intermediate: 'text-yellow-400 bg-yellow-500/20',
    advanced: 'text-red-400 bg-red-500/20',
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
          <h1 className="text-4xl font-black mb-2">
            Explorez nos <span className="gradient-text">cours</span>
          </h1>
          <p className="text-gray-400">
            Apprenez à votre rythme avec nos cours interactifs
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
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="md:col-span-3">
                <Input
                  type="text"
                  placeholder="Rechercher un cours..."
                  icon={<Search className="w-5 h-5" />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Langage
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang === 'all' ? 'Tous les langages' : lang.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulté
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                >
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>
                      {diff === 'all'
                        ? 'Toutes les difficultés'
                        : diff === 'beginner'
                        ? 'Débutant'
                        : diff === 'intermediate'
                        ? 'Intermédiaire'
                        : 'Avancé'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results count */}
              <div className="flex items-end">
                <p className="text-sm text-gray-400">
                  {filteredCourses.length} cours trouvé{filteredCourses.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Chargement des cours...</p>
            </div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover gradient className="h-full flex flex-col">
                  {/* Course Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Code2 className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 line-clamp-2">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded">
                          {course.language.toUpperCase()}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            difficultyColors[course.difficulty]
                          }`}
                        >
                          {course.difficulty === 'beginner'
                            ? 'Débutant'
                            : course.difficulty === 'intermediate'
                            ? 'Intermédiaire'
                            : 'Avancé'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        <span>{course.xpReward} XP</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>8 leçons</span>
                      </div>
                    </div>
                    <Link to={`/courses/${course.id}`}>
                      <Button size="sm" icon={<ChevronRight className="w-4 h-4" />}>
                        Voir
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card glass>
            <div className="text-center py-12">
              <Filter className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-bold mb-2">Aucun cours trouvé</h3>
              <p className="text-gray-400 mb-4">
                Essayez de modifier vos filtres de recherche
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLanguage('all');
                  setSelectedDifficulty('all');
                }}
                variant="outline"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Courses;