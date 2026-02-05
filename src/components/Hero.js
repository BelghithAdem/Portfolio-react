import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import {
  FaDownload,
  FaLinkedin,
  FaGithub,
  FaGitlab,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { usePortfolioData } from "../hooks/usePortfolioData";

const Hero = () => {
  const { t } = useTranslation();
  const portfolioData = usePortfolioData();

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    }),
    []
  );

  // Floating aura
  const Floating = ({ className, delay = 0, duration = 18 }) => (
    <motion.div
      className={className}
      animate={{ y: [-14, 14, -14] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6 md:px-8"
    >
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020] via-[#0B1228] to-[#090A12]" />
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_15%_25%,rgba(56,189,248,0.25),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.20),transparent_45%),radial-gradient(circle_at_25%_85%,rgba(34,197,94,0.14),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:44px_44px]" />

      {/* Subtle floating blobs */}
      <Floating
        className="absolute -top-10 left-10 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl"
        delay={0}
        duration={22}
      />
      <Floating
        className="absolute top-40 -right-10 w-72 h-72 rounded-full bg-fuchsia-500/10 blur-3xl"
        delay={2}
        duration={26}
      />
      <Floating
        className="absolute bottom-10 left-1/4 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl"
        delay={3}
        duration={24}
      />

      <div className="container mx-auto relative z-10 max-w-6xl">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 backdrop-blur">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-semibold">
                {t("hero.greeting") || "Hello 👋"}
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
          >
            <span className="text-white/90">{portfolioData.name}</span>
            <span className="block mt-2 bg-gradient-to-r from-sky-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
              {t("hero.title")}
            </span>
          </motion.h1>

          {/* Subtitle/Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            {t("hero.description")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <motion.a
              href="https://flowcv.com/resume/o6vebkrtdq"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-white text-[#0B1020] font-extrabold px-7 py-4 shadow-lg hover:shadow-xl transition"
            >
              <FaDownload />
              <span>{t("hero.downloadCv")}</span>
            </motion.a>

            <Link to="projects" smooth duration={500} offset={-80}>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 text-white font-bold px-7 py-4 backdrop-blur hover:bg-white/[0.08] transition"
              >
                <span>{t("hero.viewProjects")}</span>
                <FaChevronDown className="opacity-80" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Social */}
          <motion.div
            variants={itemVariants}
            className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
          >
            {[
              {
                icon: <FaLinkedin />,
                href: portfolioData.contact.linkedin,
                label: "LinkedIn",
              },
              {
                icon: <FaGithub />,
                href: portfolioData.contact.github,
                label: "GitHub",
              },
              {
                icon: <FaGitlab />,
                href: portfolioData.contact.gitlab,
                label: "GitLab",
              },
              {
                icon: <FaEnvelope />,
                href: `mailto:${portfolioData.contact.email}`,
                label: "Email",
              },
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-white/85 backdrop-blur hover:bg-white/[0.08] transition"
                aria-label={s.label}
              >
                <span className="opacity-90">{s.icon}</span>
                <span className="text-sm font-semibold">{s.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex justify-center"
          >
            <Link to="about" smooth duration={500} offset={-80}>
              <motion.div
                className="cursor-pointer inline-flex items-center gap-2 text-white/60 hover:text-white/80 transition"
                whileHover={{ y: -2 }}
              >
                <span className="text-sm font-semibold">Scroll</span>
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaChevronDown />
                </motion.span>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
