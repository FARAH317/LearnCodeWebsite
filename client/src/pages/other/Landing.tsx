import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Rocket, Trophy, Users, Sparkles, Zap, Target, BookOpen, TrendingUp, Award } from 'lucide-react';
import Button from '@/components/common/Button';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-dark-900/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black gradient-text">LearnCode</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">Se connecter</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">S'inscrire</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-primary-400 text-sm font-medium">
                Plateforme d'apprentissage nouvelle génération
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              Apprenez à coder{' '}
              <span className="gradient-text">différemment</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Maîtrisez la programmation avec des cours interactifs, des défis passionnants
              et une communauté de développeurs passionnés.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-4" icon={<Rocket className="w-5 h-5" />}>
                  Commencer gratuitement
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Se connecter
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {[
                { label: 'Étudiants actifs', value: '10K+' },
                { label: 'Cours disponibles', value: '150+' },
                { label: 'Défis à relever', value: '500+' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-black gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Pourquoi <span className="gradient-text">LearnCode</span> ?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Une expérience d'apprentissage unique et complète
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 className="w-8 h-8" />,
                title: 'Éditeur en Ligne',
                description: 'Codez directement dans votre navigateur avec notre éditeur professionnel',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: 'Défis Quotidiens',
                description: 'Testez vos compétences et progressez avec des challenges adaptés',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: 'Parcours Personnalisés',
                description: 'Créez votre roadmap d\'apprentissage sur mesure',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Communauté Active',
                description: 'Échangez avec des milliers de développeurs passionnés',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Système de Progression',
                description: 'Gagnez des XP et débloquez des récompenses exclusives',
                color: 'from-red-500 to-rose-500',
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: 'Contenu Premium',
                description: 'Accédez à des cours avancés créés par des experts',
                color: 'from-indigo-500 to-blue-500',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl p-8 hover:from-white/10 hover:to-white/5 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/5 group-hover:to-secondary-500/5 rounded-2xl transition-all duration-300" />
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-500/10 via-purple-500/10 to-secondary-500/10 backdrop-blur-sm rounded-3xl p-12 md:p-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Rejoignez des milliers de <span className="gradient-text">développeurs</span>
              </h2>
              <p className="text-xl text-gray-400">
                Une communauté grandissante de passionnés
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: <Users className="w-8 h-8" />, value: '10,000+', label: 'Étudiants' },
                { icon: <Award className="w-8 h-8" />, value: '50,000+', label: 'Certificats' },
                { icon: <TrendingUp className="w-8 h-8" />, value: '95%', label: 'Satisfaction' },
                { icon: <Trophy className="w-8 h-8" />, value: '1M+', label: 'Défis complétés' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black gradient-text mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            Prêt à transformer votre <span className="gradient-text">carrière</span> ?
          </h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            Rejoignez notre communauté et commencez votre voyage dans le monde du développement
          </p>
          <Link to="/register">
            <Button size="lg" className="text-lg px-12 py-5" icon={<Rocket className="w-6 h-6" />}>
              Commencer maintenant - C'est gratuit
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>© 2024 LearnCode. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;