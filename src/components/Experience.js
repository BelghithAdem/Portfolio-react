import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaBuilding,
  FaRocket,
  FaArrowRight,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { Link } from "react-scroll";

const Experience = () => {
  const { t } = useTranslation();
  const portfolioData = usePortfolioData();

  const [ref, inView] = useInView({
    threshold: 0.14,
    triggerOnce: true,
  });

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

  // Subtle accent rotation (professional, not too colorful)
  const accents = useMemo(
    () => [
      {
        dot: "bg-sky-400",
        ring: "ring-sky-400/20",
        line: "bg-white/10",
        chip: "border-sky-400/25 text-sky-200 bg-sky-500/10",
      },
      {
        dot: "bg-emerald-400",
        ring: "ring-emerald-400/20",
        line: "bg-white/10",
        chip: "border-emerald-400/25 text-emerald-200 bg-emerald-500/10",
      },
      {
        dot: "bg-fuchsia-400",
        ring: "ring-fuchsia-400/20",
        line: "bg-white/10",
        chip: "border-fuchsia-400/25 text-fuchsia-200 bg-fuchsia-500/10",
      },
    ],
    []
  );

  return (
    <section id="experience" className="relative overflow-hidden py-24 px-4 sm:px-6 md:px-8">
      {/* Background (same system as other sections) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020] via-[#0B1228] to-[#090A12]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_15%_25%,rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.16),transparent_45%),radial-gradient(circle_at_30%_85%,rgba(34,197,94,0.12),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.75 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 backdrop-blur"
            whileHover={{ scale: 1.03 }}
          >
            <FaRocket className="opacity-80" />
            <span className="font-semibold">Mon parcours</span>
          </motion.div>

          <h2 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            {t("experience.title")}
          </h2>

          <p className="mt-5 text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t("experience.subtitle")}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mx-auto max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {portfolioData.experience.map((exp, index) => {
            const a = accents[index % accents.length];

            return (
              <motion.div key={index} variants={itemVariants} className="relative pb-14 last:pb-0">
                <div className="flex gap-5 sm:gap-7">
                  {/* left rail */}
                  <div className="flex flex-col items-center">
                    <div
                      className={[
                        "w-12 h-12 rounded-full grid place-items-center",
                        "bg-white/5 border border-white/10 text-white",
                        "shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
                        "ring-8",
                        a.ring,
                      ].join(" ")}
                    >
                      <span className={`w-3 h-3 rounded-full ${a.dot}`} />
                    </div>

                    {index !== portfolioData.experience.length - 1 && (
                      <div className={`mt-3 w-[2px] flex-1 rounded-full ${a.line}`} />
                    )}
                  </div>

                  {/* card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl
                               shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.07] transition"
                  >
                    {/* title row */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-2xl font-extrabold text-white">
                          {exp.title}
                        </h3>

                        <div className="mt-3 flex flex-wrap items-center gap-4 text-white/70">
                          <div className="inline-flex items-center gap-2">
                            <FaBuilding className="text-white/60" />
                            <span className="font-semibold text-white/85">{exp.company}</span>
                          </div>

                          <div className="inline-flex items-center gap-2">
                            <FaMapMarkerAlt className="text-white/60" />
                            <span className="font-medium">{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                          <FaCalendarAlt className="text-white/60" />
                          <span className="font-semibold">{exp.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* tasks */}
                    <div className="mt-7">
                      <div className="flex items-center gap-2 text-white/80 font-bold mb-4">
                        <FaBriefcase className="text-white/60" />
                        <span>Réalisations principales</span>
                      </div>

                      <ul className="grid gap-3">
                        {exp.tasks.map((task, taskIndex) => (
                          <motion.li
                            key={taskIndex}
                            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/75"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: taskIndex * 0.05 }}
                          >
                            <FaCheckCircle className="mt-1 text-emerald-300 shrink-0" />
                            <span className="leading-relaxed">{task}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* technologies */}
                    {Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                      <div className="mt-7 pt-6 border-t border-white/10">
                        <div className="text-sm font-extrabold text-white/70 mb-3">
                          Technologies
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: techIndex * 0.03 }}
                              whileHover={{ y: -1 }}
                              className={[
                                "px-3 py-1.5 rounded-full border text-sm font-semibold",
                                "transition",
                                a.chip,
                              ].join(" ")}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <Link to="projects" smooth duration={500} offset={-90}>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className="inline-flex items-center gap-3 rounded-2xl bg-white text-[#0B1020]
                         px-7 py-4 font-extrabold shadow-lg hover:shadow-xl transition"
            >
              <FaRocket />
              <span>Découvrir mes projets</span>
              <FaArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
