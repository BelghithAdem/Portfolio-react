import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUser, FaCode, FaLightbulb, FaRocket } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const qualities = [
    {
      icon: <FaUser />,
      title: "Adaptabilité",
      description: "Capacité d'adaptation rapide aux nouvelles technologies et environnements de travail."
    },
    {
      icon: <FaCode />,
      title: "Qualité du Code",
      description: "Sensibilité élevée à la qualité du produit et aux bonnes pratiques de développement."
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "Volonté constante d'apprendre et d'innover dans les solutions proposées."
    },
    {
      icon: <FaRocket />,
      title: "Performance",
      description: "Focus sur l'optimisation et la performance des applications développées."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            {t('about.title')}
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t('about.description')}
          </motion.p>
        </motion.div>

        {/* Qualities Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {qualities.map((quality, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-4xl text-blue-600 mb-4 flex justify-center">
                {quality.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {quality.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {quality.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 grid md:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Mon Approche
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">
                  Développement centré sur l'utilisateur avec une attention particulière à l'expérience utilisateur
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">
                  Architecture évolutive et maintenable pour des solutions durables
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">
                  Collaboration efficace en équipe avec une communication claire
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">
                  Apprentissage continu et adoption des meilleures pratiques
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl text-white"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-6">Objectifs Professionnels</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>Contribuer à des projets innovants et impactants</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>Développer des solutions full-stack performantes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>Évoluer dans un environnement technique stimulant</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>Partager mes connaissances et apprendre des autres</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 