import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Rocket, Trophy, Users, Sparkles, Zap, Target } from 'lucide-react';
import Button from '@/components/common/Button';

const Landing = () => {
  return (
    <div className="min-h-screen bg-dark-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-primary-400 text-sm font-medium">
                Plateforme d'apprentissage interactive
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="gradient-text">LearnCode</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Maîtrisez la programmation avec des cours interactifs, des défis passionnants
              et des roadmaps personnalisées. Apprenez à coder comme jamais auparavant.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/register">
                <Button size="lg" icon={<Rocket className="w-5 h-5" />}>
                  Commencer gratuitement
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
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
                { label: 'Étudiants', value: '10K+' },
                { label: 'Cours', value: '150+' },
                { label: 'Défis', value: '500+' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Pourquoi <span className="gradient-text">LearnCode</span> ?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Une plateforme complète pour apprendre, pratiquer et maîtriser le code
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 className="w-12 h-12" />,
                title: 'Éditeur Interactif',
                description: 'Écrivez et testez votre code directement dans le navigateur avec notre éditeur Monaco',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: <Trophy className="w-12 h-12" />,
                title: 'Système de Défis',
                description: 'Affrontez des défis quotidiens et grimpez dans le classement mondial',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                icon: <Target className="w-12 h-12" />,
                title: 'Roadmaps Visuelles',
                description: 'Créez et suivez votre parcours d\'apprentissage avec des roadmaps interactives',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: 'Communauté Active',
                description: 'Rejoignez des milliers de développeurs et apprenez ensemble',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: 'Progression XP',
                description: 'Gagnez des points d\'expérience et débloquez des badges exclusifs',
                color: 'from-red-500 to-rose-500',
              },
              {
                icon: <Sparkles className="w-12 h-12" />,
                title: 'Contenu Premium',
                description: 'Accédez à des cours avancés et des projets guidés',
                color: 'from-indigo-500 to-blue-500',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl p-6 group cursor-pointer"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center glass rounded-3xl p-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Prêt à commencer votre <span className="gradient-text">voyage</span> ?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Rejoignez des milliers de développeurs qui transforment leur passion en compétences
          </p>
          <Link to="/register">
            <Button size="lg" icon={<Rocket className="w-5 h-5" />}>
              Créer un compte gratuitement
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;