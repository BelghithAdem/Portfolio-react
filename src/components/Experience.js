import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Experience = () => {
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
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">{t('experience.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-3">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={index}
              className="relative pb-12 last:pb-0"
              variants={itemVariants}
            >
              {/* Experience Card */}
              <div className="flex gap-4 md:gap-6">
                {/* Timeline Dot */}
                <div className="flex-shrink-0 relative">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md relative z-10">
                    <FaBriefcase className="text-white text-sm" />
                  </div>
                  {/* Timeline Line */}
                  {index !== portfolioData.experience.length - 1 && (
                    <div className="absolute left-1/2 top-10 bottom-0 w-0.5 bg-blue-200 -translate-x-1/2"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-blue-700 font-semibold">
                          <FaBriefcase className="text-sm" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm bg-gray-100 px-3 py-1.5 rounded-md whitespace-nowrap">
                        <FaCalendarAlt className="text-blue-600" />
                        <span className="font-medium">{exp.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <FaMapMarkerAlt className="text-blue-600" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="mb-5">
                    <ul className="space-y-2">
                      {exp.tasks.map((task, taskIndex) => (
                        <li
                          key={taskIndex}
                          className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed"
                        >
                          <FaCheckCircle className="text-blue-600 flex-shrink-0 mt-1 text-xs" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                        exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-200"
                          >
                            {tech}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 