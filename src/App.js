import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./i18n";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/* Loading Screen (matches dark theme) */
const LoadingScreen = () => (
  <motion.div
    className="fixed inset-0 bg-[#090A12] flex items-center justify-center z-50"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.7, ease: "easeInOut" }}
  >
    <div className="text-center">
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 180 }}
      >
        <div className="w-20 h-20 border-4 border-white/10 border-t-white/70 rounded-full mx-auto animate-spin" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h3 className="text-xl font-extrabold text-white mb-2">Belghith Adem</h3>
        <p className="text-white/60 font-semibold">Loading portfolio...</p>

        <div className="mt-4 flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white/70 rounded-full"
              animate={{ scale: [1, 1.25, 1], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

/* Scroll progress bar (subtle, premium) */
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollPx = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? scrollPx / height : 0);
    };

    update();
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-sky-400 via-white to-fuchsia-400"
      style={{ scaleX: scrollProgress }}
      initial={{ scaleX: 0 }}
    />
  );
};

/* Back to top */
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setIsVisible(window.pageYOffset > 320);
    toggle();
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40
                     rounded-full border border-white/10 bg-white/5 text-white/85
                     w-12 h-12 grid place-items-center backdrop-blur-xl
                     shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
                     hover:bg-white/10 hover:text-white transition"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* Section wrapper */
const SectionWrapper = ({ children, className = "", delay = 0 }) => (
  <motion.div
    className={`relative ${className}`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-120px" }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

/* Divider (works with dark theme) */
const SectionDivider = ({ variant = "default" }) => {
  if (variant === "dots") {
    return (
      <div className="flex justify-center items-center space-x-2 py-10">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-white/25 rounded-full"
            animate={{ scale: [1, 1.25, 1], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </div>
    );
  }

  const cls =
    variant === "accent"
      ? "h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto max-w-4xl"
      : "h-px bg-white/10 mx-auto max-w-4xl";

  return (
    <motion.div
      className={cls}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 1700);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="App relative overflow-x-hidden min-h-screen bg-[#090A12]">
      <AnimatePresence mode="wait">{isLoading && <LoadingScreen />}</AnimatePresence>

      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <ScrollProgress />
          <Header />

          {/* ✅ FIXED: removed the extra ">" */}
          <main className="relative overflow-x-hidden">
            <SectionWrapper>
              <Hero />
            </SectionWrapper>

            <SectionDivider variant="accent" />

            <SectionWrapper delay={0.1}>
              <About />
            </SectionWrapper>

            <SectionDivider variant="dots" />

            <SectionWrapper delay={0.2}>
              <Experience />
            </SectionWrapper>

            <SectionDivider variant="accent" />

            <SectionWrapper delay={0.3}>
              <Projects />
            </SectionWrapper>

            <SectionDivider variant="default" />

            <SectionWrapper delay={0.4}>
              <Skills />
            </SectionWrapper>

            <SectionDivider variant="dots" />

            <SectionWrapper delay={0.5}>
              <Education />
            </SectionWrapper>

            <SectionDivider variant="accent" />

            <SectionWrapper delay={0.6}>
              <Contact />
            </SectionWrapper>
          </main>

          <Footer />
          <BackToTop />
        </motion.div>
      )}
    </div>
  );
}

export default App;
