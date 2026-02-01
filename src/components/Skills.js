import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

import {
  FaCheckCircle,
  FaCog,
  FaGlobe,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiGithub,
  SiLinux,
  SiNginx,
  SiPostman,
  SiPython,
  SiOpenjdk,
  SiVite,
  SiFramer,
} from "react-icons/si";

import { usePortfolioData } from "../hooks/usePortfolioData";

const badgeStyles = {
  pro: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30",
  good: "bg-sky-500/15 text-sky-200 border-sky-500/30",
};

const levelToBadge = (level) => {
  const lv = (level || "").toLowerCase();
  if (lv.includes("pro")) return { label: level, cls: badgeStyles.pro };
  return { label: level, cls: badgeStyles.good };
};

// ✅ Map skill name => icon
const iconMap = {
  javascript: SiJavascript,
  js: SiJavascript,
  typescript: SiTypescript,
  ts: SiTypescript,
  react: SiReact,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss3,
  css3: SiCss3,
  vite: SiVite,
  "framer motion": SiFramer,

  node: SiNodedotjs,
  nodejs: SiNodedotjs,
  "node.js": SiNodedotjs,
  express: SiExpress,
  nest: SiNestjs,
  nestjs: SiNestjs,
  python: SiPython,
  java: SiOpenjdk,

  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  redis: SiRedis,

  docker: SiDocker,
  kubernetes: SiKubernetes,
  git: SiGit,
  github: SiGithub,
  linux: SiLinux,
  nginx: SiNginx,
  postman: SiPostman,
};

const SkillIcon = ({ name }) => {
  const key = (name || "").trim().toLowerCase();
  const Icon = iconMap[key];
  if (!Icon) return <FaCheckCircle className="opacity-70" />;
  return <Icon className="text-[18px] opacity-90" />;
};

/** Normalize language name → key so US/FR/TN flags always match (English/Anglais→en, French/Français→fr, Arabic/Arabe→ar). */
const normalizeLangKey = (language) => {
  const s = (language || "").toLowerCase().trim();
  if (!s) return "other";
  // French: fr, french, français, francais, fran
  if (s === "fr" || s.startsWith("fran") || s.includes("french") || s.includes("français") || s.includes("francais")) return "fr";
  // English: en, english, angl, anglais, engl
  if (s === "en" || s.startsWith("engl") || s.startsWith("angl") || s.includes("english") || s.includes("anglais")) return "en";
  // Arabic: ar, arab, arabe, arabic
  if (s === "ar" || s.startsWith("arab") || s.includes("arabe") || s.includes("arabic")) return "ar";
  return "other";
};

// US 🇺🇸, FR 🇫🇷, TN 🇹🇳 — flag + code so they always show (emoji can fail on some fonts)
const LANG_CONFIG = {
  fr: { flag: "🇫🇷", code: "FR", stars: 4, displayLevel: "Courant" },
  en: { flag: "🇺🇸", code: "US", stars: 4, displayLevel: "Courant" },
  ar: { flag: "🇹🇳", code: "TN", stars: 5, displayLevel: "Natif" },
  other: { flag: "🌍", code: "—", stars: 3, displayLevel: "Intermédiaire" },
};

const Skills = () => {
  const { t } = useTranslation();
  const portfolioData = usePortfolioData();

  const [ref, inView] = useInView({
    threshold: 0.12,
    triggerOnce: true,
  });

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
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
        transition: { duration: 0.55, ease: "easeOut" },
      },
    }),
    []
  );

  const categories = useMemo(
    () => [
      {
        title: t("skills.frontend"),
        skills: portfolioData.skills.frontend,
        accent: "from-sky-500/15 to-indigo-500/10",
        border: "border-white/10",
        glow: "shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
      },
      {
        title: t("skills.backend"),
        skills: portfolioData.skills.backend,
        accent: "from-emerald-500/15 to-teal-500/10",
        border: "border-white/10",
        glow: "shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
      },
      {
        title: t("skills.databases"),
        skills: portfolioData.skills.databases,
        accent: "from-fuchsia-500/15 to-purple-500/10",
        border: "border-white/10",
        glow: "shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
      },
      {
        title: t("skills.devops"),
        skills: portfolioData.skills.devops,
        accent: "from-amber-500/15 to-orange-500/10",
        border: "border-white/10",
        glow: "shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
      },
    ],
    [portfolioData, t]
  );

  return (
    <section
      id="skills"
      className="relative overflow-hidden py-24 px-4 sm:px-6 md:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020] via-[#0B1228] to-[#090A12]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.18),transparent_45%),radial-gradient(circle_at_35%_80%,rgba(34,197,94,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.75 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 backdrop-blur"
            whileHover={{ scale: 1.03 }}
          >
            <FaCog className="opacity-80" />
            <span className="font-semibold">
              {t("skills.badge") || "Compétences techniques"}
            </span>
          </motion.div>

          <h2 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            {t("skills.title")}
          </h2>

          <p className="mt-5 text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl border ${cat.border} ${cat.glow} bg-gradient-to-br ${cat.accent} p-7 sm:p-8 backdrop-blur-xl`}
            >
              <div className="absolute inset-0 rounded-3xl bg-white/[0.03] opacity-0 hover:opacity-100 transition-opacity" />

              <div className="relative flex items-center justify-between gap-4 mb-7">
                <h3 className="text-2xl font-bold text-white">{cat.title}</h3>
                <span className="text-xs text-white/60 border border-white/10 bg-white/5 rounded-full px-3 py-1">
                  {cat.skills?.length || 0} skills
                </span>
              </div>

              <div className="relative grid gap-3">
                {cat.skills?.map((skill, i) => {
                  const badge = levelToBadge(skill.level);
                  return (
                    <motion.div
                      key={i}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="grid place-items-center w-9 h-9 rounded-xl border border-white/10 bg-white/5 text-white">
                          <SkillIcon name={skill.name} />
                        </span>
                        <span className="truncate text-white/90 font-semibold">
                          {skill.name}
                        </span>
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${badge.cls}`}
                      >
                        {badge.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ Languages (fixed flags + forced ratings/labels) */}
        <motion.div
          className="max-w-6xl mx-auto mt-16"
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
          transition={{ delay: 0.45, duration: 0.75 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 backdrop-blur">
              <FaGlobe className="opacity-80" />
              <span className="font-semibold">
                {t("skills.languages.badge") || "Langues"}
              </span>
            </div>
            <h3 className="mt-5 text-3xl font-bold text-white">
              {t("skills.languages.title")}
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(portfolioData.languages || {}).map(
              ([language, _level], index) => {
                const key = normalizeLangKey(language);
                const cfg = LANG_CONFIG[key] || LANG_CONFIG.other;

                return (
                  <motion.div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 + index * 0.12 }}
                    whileHover={{ y: -6 }}
                  >
                    {/* Flag + code (code ensures US/FR/TN show if emoji don't render) */}
                    <div className="flex flex-col items-center gap-1 mb-4">
                      <span className="text-5xl leading-none" role="img" aria-label={cfg.code}>{cfg.flag}</span>
                      <span className="text-sm font-bold text-white/80 tracking-widest">{cfg.code}</span>
                    </div>

                    {/* Language name */}
                    <div className="text-xl font-bold text-white">{language}</div>

                    {/* Stars */}
                    <div className="mt-3 flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-base ${
                            i < cfg.stars ? "text-yellow-300" : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Level text */}
                    <div className="mt-4 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/80">
                      {cfg.displayLevel}
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: 1.1, duration: 0.75 }}
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-3 rounded-full bg-white text-[#0B1020] px-7 py-3 font-bold shadow-lg hover:shadow-xl transition"
          >
            <span>{t("skills.cta") || "Voir mes projets"}</span>
            <FaArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
