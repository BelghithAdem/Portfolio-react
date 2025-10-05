import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaDownload, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Hero = () => {
  const { t } = useTranslation();
  const portfolioData = usePortfolioData();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [2, 1, 1, 2, 2],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [180, 270, 360, 90, 180],
          }}
          transition={{
            duration: 30,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.div
            className="text-lg md:text-xl text-gray-600 mb-4"
            variants={itemVariants}
          >
            {t('hero.greeting')}
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-800 mb-6"
            variants={itemVariants}
          >
            {portfolioData.name}
          </motion.h1>

          {/* Title */}
          <motion.h2
            className="text-2xl md:text-3xl text-blue-600 font-semibold mb-8"
            variants={itemVariants}
          >
            {t('hero.title')}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            variants={itemVariants}
          >
            <motion.a
              href="https://flowcv.com/resume/o6vebkrtdq"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload />
              {t('hero.downloadCv')}
            </motion.a>

            <Link to="projects" smooth={true} duration={500} offset={-80}>
              <motion.button
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.viewProjects')}
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-8"
            variants={itemVariants}
          >
            <motion.a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.2, y: -3 }}
            >
              <FaLinkedin size={28} />
            </motion.a>
            <motion.a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              whileHover={{ scale: 1.2, y: -3 }}
            >
              <FaGithub size={28} />
            </motion.a>
            <motion.a
              href={`mailto:${portfolioData.contact.email}`}
              className="text-gray-600 hover:text-red-600 transition-colors"
              whileHover={{ scale: 1.2, y: -3 }}
            >
              <FaEnvelope size={28} />
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Link to="about" smooth={true} duration={500} offset={-80}>
              <motion.div
                className="text-gray-600 hover:text-blue-600 cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 