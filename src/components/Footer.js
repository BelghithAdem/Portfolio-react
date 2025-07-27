import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaGlobe, FaHeart } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Footer = () => {
  const portfolioData = usePortfolioData();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      url: portfolioData.contact.linkedin,
      color: "hover:text-blue-600"
    },
    {
      icon: <FaGithub />,
      name: "GitHub",
      url: portfolioData.contact.github,
      color: "hover:text-gray-800"
    },
    {
      icon: <FaGlobe />,
      name: "Portfolio",
      url: portfolioData.contact.portfolio,
      color: "hover:text-purple-600"
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold mb-4">{portfolioData.name}</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Développeur Full-Stack passionné par la création de solutions innovantes et évolutives.
              Toujours en quête d'apprentissage et d'innovation.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 transition-colors ${social.color}`}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-gray-400">
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="hover:text-white transition-colors"
              >
                {portfolioData.contact.email}
              </a>
              <span className="hidden md:inline">•</span>
              <a
                href={`tel:${portfolioData.contact.phone}`}
                className="hover:text-white transition-colors"
              >
                {portfolioData.contact.phone}
              </a>
              <span className="hidden md:inline">•</span>
              <span>{portfolioData.contact.location}</span>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-gray-800 mb-8"></div>

          {/* Copyright */}
          <motion.div
            className="text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="flex items-center justify-center space-x-2">
              <span>© {currentYear} {portfolioData.name}. Tous droits réservés.</span>
              <span className="flex items-center space-x-1">
                <span>Fait avec</span>
                <FaHeart className="text-red-500 animate-pulse" />
                <span>en React</span>
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 