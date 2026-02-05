import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaUser,
  FaCode,
  FaLightbulb,
  FaRocket,
  FaHeart,
  FaBullseye,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";

const About = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ threshold: 0.14, triggerOnce: true });

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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

  const qualities = useMemo(
    () => [
      {
        icon: <FaUser />,
        title: "Adaptabilité",
        description:
          "Je m’adapte rapidement aux nouvelles technologies et aux environnements de travail.",
      },
      {
        icon: <FaCode />,
        title: "Qualité du code",
        description:
          "J’applique les bonnes pratiques (clean code, maintenabilité, lisibilité).",
      },
      {
        icon: <FaLightbulb />,
        title: "Innovation",
        description:
          "J’aime apprendre, expérimenter et proposer des solutions simples et efficaces.",
      },
      {
        icon: <FaRocket />,
        title: "Performance",
        description:
          "Je fais attention à l’optimisation, l’UX et les détails qui font la différence.",
      },
    ],
    []
  );

  const approach = useMemo(
    () => [
      "Développement centré utilisateur avec une attention forte à l’UX.",
      "Architecture claire, scalable et maintenable.",
      "Collaboration en équipe et communication efficace.",
      "Amélioration continue et veille technologique.",
    ],
    []
  );

  const goals = useMemo(
    () => [
      "Contribuer à des projets innovants et utiles.",
      "Construire des interfaces modernes et performantes.",
      "Travailler dans un environnement technique stimulant.",
      "Partager mes connaissances et apprendre des autres.",
    ],
    []
  );

  return (
    <section id="about" className="relative overflow-hidden py-24 px-4 sm:px-6 md:px-8">
      {/* Background (matches Skills section) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020] via-[#0B1228] to-[#090A12]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.18),transparent_45%),radial-gradient(circle_at_35%_80%,rgba(34,197,94,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 backdrop-blur"
            whileHover={{ scale: 1.03 }}
          >
            <FaHeart className="text-rose-300" />
            <span className="font-semibold">Qui suis-je ?</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white"
          >
            {t("about.title")}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed"
          >
            {t("about.description")}
          </motion.p>

          {/* Intro + Working / Learning */}
          <motion.div
            variants={itemVariants}
            className="mt-8 max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            <p className="text-lg font-semibold text-white/90 mb-4">
              {t("about.intro")}
            </p>
            <ul className="space-y-2 text-white/75">
              <li className="flex items-start gap-3">
                <span className="text-lg mt-0.5" aria-hidden>🔭</span>
                <span>{t("about.working")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-lg mt-0.5" aria-hidden>📚</span>
                <span>{t("about.learning")}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Qualities */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {qualities.map((q, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl
                         shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.07] transition"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-white/90">
                  <span className="text-xl">{q.icon}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white text-center">{q.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70 text-center">
                {q.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Approach + Goals */}
        <motion.div
          className="mt-12 grid lg:grid-cols-2 gap-7"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Approach */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-8 backdrop-blur-xl
                       shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-sky-200">
                <FaBullseye />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Mon approche</h3>
            </div>

            <div className="grid gap-3">
              {approach.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-sky-400" />
                  <p className="text-white/80 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Goals */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5
                       p-7 sm:p-8 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-fuchsia-200">
                <FaStar />
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Objectifs professionnels
              </h3>
            </div>

            <div className="grid gap-3">
              {goals.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-fuchsia-400" />
                  <p className="text-white/80 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <Link to="experience" smooth duration={500} offset={-90}>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className="inline-flex items-center gap-3 rounded-2xl bg-white text-[#0B1020]
                         px-7 py-4 font-extrabold shadow-lg hover:shadow-xl transition"
            >
              <FaRocket />
              <span>Découvrir mon expérience</span>
              <FaArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
