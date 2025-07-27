import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCode, FaUsers, FaCog } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Experience = () => {
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
        staggerChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const getExperienceIcon = (title) => {
    if (title.toLowerCase().includes('front-end')) {
      return <FaCode className="text-3xl text-blue-600" />;
    } else if (title.toLowerCase().includes('stage')) {
      return <FaUsers className="text-3xl text-green-600" />;
    }
    return <FaBriefcase className="text-3xl text-purple-600" />;
  };

  const getExperienceBadge = (title) => {
    if (title.toLowerCase().includes('télétravail')) {
      return { text: 'Remote', color: 'bg-green-100 text-green-700' };
    } else if (title.toLowerCase().includes('stage')) {
      return { text: 'Stage', color: 'bg-blue-100 text-blue-700' };
    }
    return { text: 'Full-time', color: 'bg-purple-100 text-purple-700' };
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Expérience Professionnelle</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Mon parcours professionnel en développement web et mobile, avec une expertise en technologies modernes
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative ${index !== portfolioData.experience.length - 1 ? 'mb-16' : ''}`}
              variants={itemVariants}
            >
              {/* Timeline Line */}
              {index !== portfolioData.experience.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600"></div>
              )}

              <div className="flex items-start space-x-8">
                {/* Timeline Dot */}
                <div className="relative">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl border-4 border-white"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {index + 1}
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    {getExperienceIcon(exp.title)}
                  </div>
                </div>

                {/* Content Card */}
                <motion.div
                  className="flex-1 bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                  
                  {/* Header */}
                  <div className="relative">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-800">
                            {exp.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getExperienceBadge(exp.title).color}`}>
                            {getExperienceBadge(exp.title).text}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                          <div className="flex items-center space-x-2">
                            <FaBriefcase className="text-blue-600" />
                            <span className="font-semibold text-gray-800">{exp.company}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaMapMarkerAlt className="text-green-600" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-purple-600 font-semibold bg-purple-50 px-4 py-2 rounded-lg">
                        <FaCalendarAlt />
                        <span>{exp.date}</span>
                      </div>
                    </div>

                    {/* Tasks */}
                    <div className="space-y-4 mb-6">
                      {exp.tasks.map((task, taskIndex) => (
                        <motion.div
                          key={taskIndex}
                          className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: taskIndex * 0.1 }}
                        >
                          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 leading-relaxed font-medium">{task}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Technologies Used */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FaCog className="mr-2 text-blue-600" />
                        Technologies & Compétences
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {exp.title.includes('Front-End') && (
                          <>
                            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold hover:bg-blue-200 transition-colors">Vue.js</span>
                            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold hover:bg-green-200 transition-colors">React Native</span>
                            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold hover:bg-purple-200 transition-colors">Next.js</span>
                            <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold hover:bg-indigo-200 transition-colors">GraphQL</span>
                            <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold hover:bg-teal-200 transition-colors">Express.js</span>
                          </>
                        )}
                        {exp.title.includes('Stage') && (
                          <>
                            <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold hover:bg-red-200 transition-colors">Angular</span>
                            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold hover:bg-green-200 transition-colors">Node.js</span>
                            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold hover:bg-blue-200 transition-colors">MongoDB</span>
                            <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold hover:bg-orange-200 transition-colors">Sails.js</span>
                            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold hover:bg-yellow-200 transition-colors">GMAO</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 