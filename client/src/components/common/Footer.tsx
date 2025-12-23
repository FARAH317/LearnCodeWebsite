import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Cours', to: '/courses' },
      { label: 'Défis', to: '/challenges' },
      { label: 'Roadmaps', to: '/roadmaps' },
      { label: 'Classement', to: '/challenges/leaderboard' },
    ],
    company: [
      { label: 'À propos', to: '/about' },
      { label: 'Blog', to: '/blog' },
      { label: 'Carrières', to: '/careers' },
      { label: 'Contact', to: '/contact' },
    ],
    legal: [
      { label: 'Confidentialité', to: '/privacy' },
      { label: "Conditions d'utilisation", to: '/terms' },
      { label: 'Cookies', to: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com', label: 'GitHub' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:contact@learncode.com', label: 'Email' },
  ];

  return (
    <footer className="bg-dark-900 border-t border-dark-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black gradient-text">LearnCode</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Apprenez à coder avec des cours interactifs et des défis passionnants.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Produit */}
          <div>
            <h3 className="font-bold mb-4">Produit</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="font-bold mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-bold mb-4">Légal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-dark-700">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} LearnCode. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;