import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCertificate,
  FaExternalLinkAlt,
  FaAward,
  FaStar,
  FaBookOpen,
  FaArrowRight,
} from "react-icons/fa";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { Link } from "react-scroll";

const Education = () => {
  const portfolioData = usePortfolioData();
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
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    }),
    []
  );

  const isOngoing = (date = "") =>
    date.toLowerCase().includes("présent") || date.toLowerCase().includes("present");

  const ratingStars = 5;

  const continuous = useMemo(
    () => [
      "Apprentissage continu des nouvelles technologies",
      "Veille technologique et partage de connaissances",
      "Formations en ligne et certifications",
      "Participation à des communautés / meetups",
    ],
    []
  );

  return (
    <section id="education" className="relative overflow-hidden py-24 px-4 sm:px-6 md:px-8">
      {/* Background */}
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
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 backdrop-blur">
            <FaBookOpen className="opacity-80" />
            <span className="font-semibold">Parcours académique</span>
          </div>

          <h2 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Formation & Certifications
          </h2>

          <p className="mt-5 text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Mon parcours académique et mes certifications professionnelles.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
          {/* Education timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-sky-200">
                <FaGraduationCap />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Formation</h3>
            </motion.div>

            <div className="relative">
              {/* line */}
              <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />

              <div className="grid gap-6">
                {portfolioData.education.map((edu, index) => (
                  <motion.div key={index} variants={itemVariants} className="relative pl-14">
                    {/* dot */}
                    <div className="absolute left-[14px] top-7 -translate-x-1/2">
                      <div className="w-4 h-4 rounded-full bg-sky-400 ring-8 ring-sky-400/15 border border-white/10" />
                    </div>

                    {/* card */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7 backdrop-blur-xl
                                 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.07] transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="text-lg sm:text-xl font-extrabold text-white">
                            {edu.institution}
                          </h4>

                          <div className="mt-3 flex flex-wrap items-center gap-3 text-white/70">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
                              <FaMapMarkerAlt className="text-white/60" />
                              <span className="font-semibold">{edu.location}</span>
                            </span>

                            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
                              <FaCalendarAlt className="text-white/60" />
                              <span className="font-semibold">{edu.date}</span>
                            </span>
                          </div>
                        </div>

                        <span
                          className={[
                            "shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold",
                            isOngoing(edu.date)
                              ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200"
                              : "border-white/10 bg-white/5 text-white/70",
                          ].join(" ")}
                        >
                          {isOngoing(edu.date) ? "En cours" : "Terminé"}
                        </span>
                      </div>

                      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-white font-bold">{edu.program}</p>
                        {edu.description && (
                          <p className="mt-2 text-white/70 leading-relaxed">{edu.description}</p>
                        )}
                      </div>

                      {/* stars (subtle) */}
                      <div className="mt-5 flex items-center gap-1 text-yellow-300/90">
                        {[...Array(ratingStars)].map((_, i) => (
                          <FaStar key={i} className="text-sm" />
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-emerald-200">
                <FaCertificate />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Certifications</h3>
            </motion.div>

            <div className="grid gap-6">
              {portfolioData.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7 backdrop-blur-xl
                             shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.07] transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="text-lg font-extrabold text-white">
                        {cert.name}
                      </h4>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-white/70">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
                          <FaAward className="text-white/60" />
                          <span className="font-semibold">{cert.issuer}</span>
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
                          <FaCalendarAlt className="text-white/60" />
                          <span className="font-semibold">{cert.date}</span>
                        </span>
                      </div>
                    </div>

                    {cert.url && (
                      <motion.a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.99 }}
                        className="shrink-0 w-11 h-11 grid place-items-center rounded-2xl
                                   border border-emerald-400/25 bg-emerald-500/10 text-emerald-200
                                   hover:bg-emerald-500/15 transition"
                        aria-label="Voir la certification"
                      >
                        <FaExternalLinkAlt />
                      </motion.a>
                    )}
                  </div>

                  <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-emerald-100">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="font-semibold">Certification vérifiée</span>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-300/90">
                        {[...Array(ratingStars)].map((_, i) => (
                          <FaStar key={i} className="text-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Continuous learning card */}
            <motion.div
              className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-7 backdrop-blur-xl
                         shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-fuchsia-200">
                  <FaBookOpen />
                </div>
                <h4 className="text-xl font-extrabold text-white">Formation continue</h4>
              </div>

              <div className="grid gap-3">
                {continuous.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/75"
                  >
                    <span className="mt-2 w-2 h-2 rounded-full bg-fuchsia-400" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <Link to="contact" smooth duration={500} offset={-90}>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className="inline-flex items-center gap-3 rounded-2xl bg-white text-[#0B1020]
                         px-7 py-4 font-extrabold shadow-lg hover:shadow-xl transition"
            >
              <FaExternalLinkAlt />
              <span>Me contacter</span>
              <FaArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
