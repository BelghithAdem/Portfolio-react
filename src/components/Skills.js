import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { FaCode, FaServer, FaDatabase, FaDocker, FaCheckCircle } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Skills = () => {
  const { t } = useTranslation();
  const portfolioData = usePortfolioData();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const skillCategories = [
    {
      title: t('skills.frontend'),
      icon: <FaCode className="text-xl" />,
      skills: portfolioData.skills.frontend,
      iconColor: "text-blue-600"
    },
    {
      title: t('skills.backend'),
      icon: <FaServer className="text-xl" />,
      skills: portfolioData.skills.backend,
      iconColor: "text-green-600"
    },
    {
      title: t('skills.databases'),
      icon: <FaDatabase className="text-xl" />,
      skills: portfolioData.skills.databases,
      iconColor: "text-purple-600"
    },
    {
      title: t('skills.devops'),
      icon: <FaDocker className="text-xl" />,
      skills: portfolioData.skills.devops,
      iconColor: "text-orange-600"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">{t('skills.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-3">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              variants={itemVariants}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`${category.iconColor}`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-600 text-xs flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{skill.name}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      skill.level === 'Pro' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Languages Section */}
        <motion.div
          className="max-w-5xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{t('skills.languages.title')}</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(portfolioData.languages).map(([language, level], index) => {
              const getLanguageIcon = (lang) => {
                switch (lang.toLowerCase()) {
                  case 'anglais':
                  case 'english':
                    return '🇺🇸';
                  case 'français':
                  case 'french':
                    return '🇫🇷';
                  case 'arabe':
                  case 'arabic':
                    return '🇹🇳';
                  default:
                    return '🌍';
                }
              };

              return (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <div className="text-3xl mb-3">{getLanguageIcon(language)}</div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{language}</h4>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
                    {level}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 