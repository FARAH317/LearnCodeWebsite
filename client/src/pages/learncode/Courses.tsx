import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Code2,
  Trophy,
  BookOpen,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useCourseStore } from '@/store/courseStore';
import Navbar from '@/components/common/Navbar';
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

  const difficultyLabels = {
    all: 'Toutes',
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé',
  };

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
    beginner: { bg: 'bg-green-500/10', text: 'text-green-400' },
    intermediate: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
    advanced: { bg: 'bg-red-500/10', text: 'text-red-400' },
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
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary-400" />
            <h1 className="text-4xl md:text-5xl font-black">
              Explorez nos <span className="gradient-text">cours</span>
            </h1>
          </div>
          <p className="text-xl text-gray-400">
            Apprenez à votre rythme avec nos cours interactifs
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
                  className="w-full rounded-xl bg-dark-800/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer transition-all"
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
                  className="w-full rounded-xl bg-dark-800/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer transition-all"
                >
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>
                      {difficultyLabels[diff as keyof typeof difficultyLabels]}
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
          </div>
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
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/courses/${course.id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="h-full bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-6 hover:from-white/10 hover:to-white/5 transition-all duration-300 group"
                  >
                    {/* Course Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Code2 className="w-7 h-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded-lg font-medium">
                            {course.language.toUpperCase()}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-lg ${difficultyColors[course.difficulty].bg} ${difficultyColors[course.difficulty].text}`}>
                            {difficultyLabels[course.difficulty as keyof typeof difficultyLabels]}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg mb-1 line-clamp-2 group-hover:text-primary-400 transition-colors">
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                      {course.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span>{course.xpReward} XP</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>8 leçons</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-primary-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-12 text-center">
            <Search className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-bold mb-2">Aucun cours trouvé</h3>
            <p className="text-gray-400 mb-6">
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
        )}
      </div>
    </div>
  );
};

export default Courses;