import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaBars, FaTimes, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { usePortfolioData } from '../hooks/usePortfolioData';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const portfolioData = usePortfolioData();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), to: 'home' },
    { name: t('nav.about'), to: 'about' },
    { name: t('nav.experience'), to: 'experience' },
    { name: t('nav.projects'), to: 'projects' },
    { name: t('nav.skills'), to: 'skills' },
    { name: t('nav.contact'), to: 'contact' }
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/30 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="text-xl font-mono font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="text-blue-600">&lt;</span>
            <span className="text-gray-800">Belghith Adem</span>
            <span className="text-blue-600">/&gt;</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200 font-medium"
                activeClass="text-blue-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Links & Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="mr-2">
              <LanguageSwitcher />
            </div>
            <motion.a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <FaLinkedin size={20} />
            </motion.a>
            <motion.a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a
              href={`mailto:${portfolioData.contact.email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <FaEnvelope size={20} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Slides down from top */}
        <motion.div
          className={`md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 ${
            isOpen ? 'block' : 'hidden'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            y: isOpen ? 0 : -20 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-6 px-4 space-y-6">
            {/* Language Switcher for Mobile */}
            <div className="flex justify-center pb-4 border-b border-gray-200">
              <LanguageSwitcher />
            </div>
            
            {/* Navigation Items */}
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 border-b border-gray-100"
                  activeClass="text-blue-600 font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header; 