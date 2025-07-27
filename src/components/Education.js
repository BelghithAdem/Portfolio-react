import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Education = () => {
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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Formation & Certifications</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Mon parcours académique et mes certifications professionnelles
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
              <FaGraduationCap className="mr-3 text-blue-600" />
              Formation Académique
            </h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

              {portfolioData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  className={`relative ${index !== portfolioData.education.length - 1 ? 'mb-12' : ''}`}
                  variants={itemVariants}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 top-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-16">
                    <motion.div
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800 mb-2">
                            {edu.institution}
                          </h4>
                          <div className="flex items-center space-x-4 text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <FaMapMarkerAlt className="text-blue-600" />
                              <span>{edu.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FaCalendarAlt className="text-blue-600" />
                              <span>{edu.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-gray-700 font-medium">{edu.program}</p>
                        {edu.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {edu.description}
                          </p>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div className="mt-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          edu.date.includes('Présent') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {edu.date.includes('Présent') ? 'En cours' : 'Terminé'}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
              <FaCertificate className="mr-3 text-green-600" />
              Certifications
            </h3>

            <div className="space-y-6">
              {portfolioData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">
                        {cert.name}
                      </h4>
                      <div className="flex items-center space-x-4 text-gray-600 mb-3">
                        <span className="font-medium">{cert.issuer}</span>
                        <span className="text-sm">{cert.date}</span>
                      </div>
                    </div>
                    <motion.a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaExternalLinkAlt size={20} />
                    </motion.a>
                  </div>

                  {/* Certification Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Certification vérifiée</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {cert.date}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h4 className="text-lg font-bold mb-4">Formation Continue</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Apprentissage continu des nouvelles technologies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Participation aux conférences et meetups tech</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Veille technologique et partage de connaissances</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Intéressé par mon profil ? N'hésitez pas à me contacter
          </p>
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt />
            Me contacter
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Education; 