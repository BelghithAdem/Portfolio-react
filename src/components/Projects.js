import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaGitlab, FaExternalLinkAlt, FaCode, FaMobile, FaServer, FaEye, FaVuejs, FaWordpress, FaShoppingCart, FaExclamationCircle, FaStethoscope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Projects = () => {
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getProjectIcon = (projectName) => {
    if (projectName.toLowerCase().includes('social')) {
      return <FaServer className="text-4xl text-blue-600" />;
    } else if (projectName.toLowerCase().includes('mincraft')) {
      return <FaMobile className="text-4xl text-green-600" />;
    } else if (projectName.toLowerCase().includes('quran')) {
      return <FaVuejs className="text-4xl text-green-500" />;
    } else if (projectName.toLowerCase().includes('tech gateway')) {
      return <FaWordpress className="text-4xl text-blue-500" />;
    } else if (projectName.toLowerCase().includes('dhiya')) {
      return <FaShoppingCart className="text-4xl text-orange-500" />;
    } else if (projectName.toLowerCase().includes('medical')) {
      return <FaStethoscope className="text-4xl text-red-500" />;
    }
    return <FaCode className="text-4xl text-purple-600" />;
  };

  const getProjectTechnologies = (project) => {
    if (project.name === 'Mincraft') {
      return [
        { name: 'React', color: 'bg-blue-100 text-blue-800' },
        { name: 'React Native', color: 'bg-green-100 text-green-800' },
        { name: 'AWS S3', color: 'bg-orange-100 text-orange-800' },
        { name: 'Docker', color: 'bg-blue-100 text-blue-800' },
        { name: 'GitLab CI/CD', color: 'bg-purple-100 text-purple-800' }
      ];
    } else if (project.name === 'Social Media') {
      return [
        { name: 'Spring Boot', color: 'bg-green-100 text-green-800' },
        { name: 'Angular', color: 'bg-red-100 text-red-800' },
        { name: 'Hibernate', color: 'bg-blue-100 text-blue-800' },
        { name: 'Tailwind', color: 'bg-cyan-100 text-cyan-800' },
        { name: 'MySQL', color: 'bg-orange-100 text-orange-800' },
        { name: 'WebSocket', color: 'bg-purple-100 text-purple-800' }
      ];
    } else if (project.name === 'Quran App') {
      return [
        { name: 'Vue 3', color: 'bg-green-100 text-green-800' },
        { name: 'Vite', color: 'bg-purple-100 text-purple-800' },
        { name: 'JavaScript', color: 'bg-yellow-100 text-yellow-800' },
        { name: 'CSS3', color: 'bg-blue-100 text-blue-800' },
        { name: 'GitHub Pages', color: 'bg-gray-100 text-gray-800' }
      ];
    } else if (project.name === 'Tech Gateway') {
      return [
        { name: 'WordPress', color: 'bg-blue-100 text-blue-800' },
        { name: 'WooCommerce', color: 'bg-orange-100 text-orange-800' },
        { name: 'PHP', color: 'bg-purple-100 text-purple-800' },
        { name: 'MySQL', color: 'bg-blue-100 text-blue-800' },
        { name: 'SEO', color: 'bg-green-100 text-green-800' },
        { name: 'Responsive', color: 'bg-cyan-100 text-cyan-800' }
      ];
    } else if (project.name === 'Dhiya Store') {
      return [
        { name: 'WordPress', color: 'bg-blue-100 text-blue-800' },
        { name: 'WooCommerce', color: 'bg-orange-100 text-orange-800' },
        { name: 'PHP', color: 'bg-purple-100 text-purple-800' },
        { name: 'MySQL', color: 'bg-blue-100 text-blue-800' },
        { name: 'E-commerce', color: 'bg-green-100 text-green-800' },
        { name: 'Custom Orders', color: 'bg-cyan-100 text-cyan-800' }
      ];
    } else if (project.name === 'Medical Recording') {
      return [
        { name: 'ASP.NET Core', color: 'bg-purple-100 text-purple-800' },
        { name: 'Next.js', color: 'bg-gray-100 text-gray-800' },
        { name: 'PostgreSQL', color: 'bg-blue-100 text-blue-800' },
        { name: 'Tailwind CSS', color: 'bg-cyan-100 text-cyan-800' },
        { name: 'FullCalendar', color: 'bg-green-100 text-green-800' },
        { name: 'Swagger', color: 'bg-orange-100 text-orange-800' }
      ];
    }
    return [];
  };

  const getProjectImage = (project) => {
    return project.image || 'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Project+Screenshot';
  };

  const getProjectLink = (project) => {
    // Prioritize live demo URL, fallback to repository link
    if (project.live && project.live.trim() !== '') {
      return project.live;
    }
    return project.github || '#';
  };

  const getRepoIcon = (project) => {
    if (project.github && project.github.includes('gitlab.com')) {
      return <FaGitlab size={14} />;
    }
    return <FaGithub size={14} />;
  };

  const getRepoLink = (project) => {
    return project.github || '#';
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez mes projets récents qui démontrent mes compétences en développement full-stack et ma passion pour l'innovation
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={getProjectImage(project)}
                  alt={`${project.name} Screenshot`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge - Top Left */}
                <motion.div
                  className={`absolute top-3 left-3 flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium shadow-lg ${
                    project.category === 'professional' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                >
                  <span>{project.category === 'professional' ? 'Pro' : 'Académique'}</span>
                </motion.div>
                
                {/* Live Alert Badge - Top Right */}
                {project.live && (
                  <motion.div
                    className="absolute top-3 right-3 flex items-center space-x-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                  >
                    <FaExclamationCircle size={12} />
                    <span>Live</span>
                  </motion.div>
                )}
                
                <div className="absolute top-12 right-3 flex space-x-2">
                  {project.github && (
                    <motion.a
                      href={getRepoLink(project)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {getRepoIcon(project)}
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaExternalLinkAlt size={16} className="text-gray-700" />
                    </motion.a>
                  )}
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                    {project.date}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Project Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-2xl text-blue-600">
                    {getProjectIcon(project.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-600">Projet Full-Stack</p>
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-3 mb-4">
                  {project.description.slice(0, 2).map((desc, descIndex) => (
                    <motion.div
                      key={descIndex}
                      className="flex items-start space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: descIndex * 0.1 }}
                    >
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                    <FaCode className="mr-1 text-xs" />
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {getProjectTechnologies(project).slice(0, 4).map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${tech.color}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                      >
                        {tech.name}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <motion.a
                    href={getProjectLink(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 ${project.github ? 'flex-1' : 'w-full'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaEye size={14} />
                    <span>Voir le projet</span>
                  </motion.a>
                  {project.github && (
                    <motion.a
                      href={getRepoLink(project)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {getRepoIcon(project)}
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Intéressé par mes projets ? Découvrez plus sur GitHub
          </p>
          <motion.a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
            <span>Voir plus de projets</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 