import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { FaCode, FaServer, FaDatabase, FaCloud, FaLightbulb, FaUsers, FaRocket, FaReact, FaVuejs, FaAngular, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaPython, FaJava } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiSpringboot, SiExpress, SiGraphql, SiMongodb, SiPostgresql, SiMysql, SiDocker, SiGitlab, SiGithub, SiAmazonaws, SiVercel, SiNetlify } from 'react-icons/si';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Skills = () => {
  const { t } = useTranslation();
  const portfolioData = usePortfolioData();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

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

  const getTechnologyIcon = (techName) => {
    const name = techName.toLowerCase();
    
    // Frontend Technologies
    if (name.includes('react')) return <FaReact className="text-2xl" />;
    if (name.includes('vue')) return <FaVuejs className="text-2xl" />;
    if (name.includes('angular')) return <FaAngular className="text-2xl" />;
    if (name.includes('next')) return <SiNextdotjs className="text-2xl" />;
    if (name.includes('tailwind')) return <SiTailwindcss className="text-2xl" />;
    if (name.includes('html')) return <FaHtml5 className="text-2xl" />;
    if (name.includes('css')) return <FaCss3Alt className="text-2xl" />;
    if (name.includes('javascript')) return <FaJs className="text-2xl" />;
    
    // Backend Technologies
    if (name.includes('spring')) return <SiSpringboot className="text-2xl" />;
    if (name.includes('node')) return <FaNodeJs className="text-2xl" />;
    if (name.includes('express')) return <SiExpress className="text-2xl" />;
    if (name.includes('graphql')) return <SiGraphql className="text-2xl" />;
    if (name.includes('websocket')) return <FaCode className="text-2xl" />;
    if (name.includes('php')) return <FaPhp className="text-2xl" />;
    if (name.includes('python')) return <FaPython className="text-2xl" />;
    if (name.includes('java')) return <FaJava className="text-2xl" />;
    
    // Database Technologies
    if (name.includes('mongodb')) return <SiMongodb className="text-2xl" />;
    if (name.includes('mysql')) return <SiMysql className="text-2xl" />;
    if (name.includes('postgresql')) return <SiPostgresql className="text-2xl" />;
    
    // DevOps & Tools
    if (name.includes('docker')) return <SiDocker className="text-2xl" />;
    if (name.includes('gitlab')) return <SiGitlab className="text-2xl" />;
    if (name.includes('github')) return <SiGithub className="text-2xl" />;
    if (name.includes('aws')) return <SiAmazonaws className="text-2xl" />;
    if (name.includes('vercel')) return <SiVercel className="text-2xl" />;
    if (name.includes('netlify')) return <SiNetlify className="text-2xl" />;
    
    // Default icon
    return <FaCode className="text-2xl" />;
  };

  const skillCategories = [
    {
      title: t('skills.frontend'),
      icon: <FaCode />,
      skills: portfolioData.skills.frontend,
      color: "blue",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-500",
      borderColor: "border-blue-200"
    },
    {
      title: t('skills.backend'),
      icon: <FaServer />,
      skills: portfolioData.skills.backend,
      color: "green",
      bgColor: "bg-green-50",
      iconBg: "bg-green-500",
      borderColor: "border-green-200"
    },
    {
      title: t('skills.databases'),
      icon: <FaDatabase />,
      skills: portfolioData.skills.databases,
      color: "purple",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-500",
      borderColor: "border-purple-200"
    },
    {
      title: t('skills.devops'),
      icon: <FaCloud />,
      skills: portfolioData.skills.devops,
      color: "orange",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-500",
      borderColor: "border-orange-200"
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Pro':
        return 'bg-green-500';
      case 'Éducatif':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getLevelWidth = (level) => {
    switch (level) {
      case 'Pro':
        return 'w-full';
      case 'Éducatif':
        return 'w-3/4';
      default:
        return 'w-1/2';
    }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('skills.title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className={`${category.bgColor} rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 border ${category.borderColor} relative overflow-hidden`}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <div className="relative">
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`w-16 h-16 ${category.iconBg} rounded-2xl flex items-center justify-center text-white text-2xl shadow-md`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{category.title}</h3>
                    <p className="text-gray-600">{t('skills.technologies')}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className="group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: skillIndex * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${category.iconBg} rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                            {getTechnologyIcon(skill.name)}
                          </div>
                          <span className="font-semibold text-gray-800 text-lg">{skill.name}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          skill.level === 'Pro' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                                              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-2 rounded-full ${getLevelColor(skill.level)} shadow-sm`}
                            initial={{ width: 0 }}
                            animate={inView ? { width: getLevelWidth(skill.level) } : { width: 0 }}
                            transition={{ delay: skillIndex * 0.1 + index * 0.2, duration: 1.2, ease: "easeOut" }}
                          />
                        </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">Compétences Transversales</h3>
                <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                  Au-delà des compétences techniques, voici mes qualités professionnelles qui font la différence
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.div 
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all duration-300">
                    <FaLightbulb className="text-3xl" />
                  </div>
                  <h4 className="font-bold text-xl mb-3">Résolution de problèmes</h4>
                  <p className="text-blue-100 leading-relaxed">
                    Capacité à analyser et résoudre des problèmes complexes de manière efficace et créative
                  </p>
                </motion.div>

                <motion.div 
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all duration-300">
                    <FaUsers className="text-3xl" />
                  </div>
                  <h4 className="font-bold text-xl mb-3">Travail en équipe</h4>
                  <p className="text-blue-100 leading-relaxed">
                    Collaboration efficace avec les équipes et communication claire dans un environnement agile
                  </p>
                </motion.div>

                <motion.div 
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all duration-300">
                    <FaRocket className="text-3xl" />
                  </div>
                  <h4 className="font-bold text-xl mb-3">Productivité</h4>
                  <p className="text-blue-100 leading-relaxed">
                    Optimisation du temps et des ressources pour des résultats optimaux et une livraison rapide
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Langues</h3>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Maîtriser plusieurs langues pour une communication efficace dans un environnement international
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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

              const getLevelProgress = (level) => {
                const levelStr = String(level).toLowerCase();
                switch (levelStr) {
                  case 'courant':
                  case 'fluent':
                    return 100;
                  case 'compétent':
                  case 'competent':
                    return 85;
                  case 'langue maternelle':
                  case 'native':
                    return 100;
                  default:
                    return 70;
                }
              };

              const getLevelColor = (level) => {
                const levelStr = String(level).toLowerCase();
                switch (levelStr) {
                  case 'courant':
                  case 'fluent':
                  case 'langue maternelle':
                  case 'native':
                    return 'from-green-500 to-emerald-500';
                  case 'compétent':
                  case 'competent':
                    return 'from-blue-500 to-cyan-500';
                  default:
                    return 'from-gray-500 to-gray-600';
                }
              };

              const getLevelBadge = (level) => {
                const levelStr = String(level).toLowerCase();
                switch (levelStr) {
                  case 'courant':
                  case 'fluent':
                  case 'langue maternelle':
                  case 'native':
                    return { text: 'Avancé', color: 'bg-green-100 text-green-700' };
                  case 'compétent':
                  case 'competent':
                    return { text: 'Intermédiaire', color: 'bg-blue-100 text-blue-700' };
                  default:
                    return { text: 'Basique', color: 'bg-gray-100 text-gray-700' };
                }
              };

              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden group"
                  whileHover={{ y: -8, scale: 1.02 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -translate-y-12 translate-x-12 opacity-50"></div>
                  
                  <div className="relative">
                    {/* Language Icon and Name */}
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-3">{getLanguageIcon(language)}</div>
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">{language}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelBadge(level).color}`}>
                        {getLevelBadge(level).text}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Niveau</span>
                        <span className="text-sm font-semibold text-gray-800">{level}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`h-3 rounded-full bg-gradient-to-r ${getLevelColor(level)} shadow-sm`}
                          initial={{ width: 0 }}
                          animate={{ width: `${getLevelProgress(level)}%` }}
                          transition={{ delay: index * 0.1 + 1.5, duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Language Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Compréhension</span>
                        <span className="font-semibold text-gray-800">
                          {String(level).toLowerCase() === 'langue maternelle' ? '100%' : 
                           String(level).toLowerCase() === 'courant' ? '95%' : '85%'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Expression</span>
                        <span className="font-semibold text-gray-800">
                          {String(level).toLowerCase() === 'langue maternelle' ? '100%' : 
                           String(level).toLowerCase() === 'courant' ? '90%' : '80%'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Écrit</span>
                        <span className="font-semibold text-gray-800">
                          {String(level).toLowerCase() === 'langue maternelle' ? '100%' : 
                           String(level).toLowerCase() === 'courant' ? '85%' : '75%'}
                        </span>
                      </div>
                    </div>

                    {/* Special Badge for Native Language */}
                    {String(level).toLowerCase() === 'langue maternelle' && (
                      <div className="mt-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                          🌟 Langue maternelle
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Language Summary */}
          <motion.div
            className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <div className="text-center">
              <h4 className="text-xl font-bold mb-3">Compétences Linguistiques</h4>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Ma maîtrise de l'anglais, du français et de l'arabe me permet de collaborer efficacement 
                dans des environnements internationaux et multiculturels.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 