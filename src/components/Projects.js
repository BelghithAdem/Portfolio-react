import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaGithub,
  FaGitlab,
  FaExternalLinkAlt,
  FaCode,
  FaMobile,
  FaServer,
  FaEye,
  FaVuejs,
  FaWordpress,
  FaShoppingCart,
  FaStethoscope,
  FaArrowRight,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { usePortfolioData } from "../hooks/usePortfolioData";

const Projects = () => {
  const { t } = useTranslation();
  const portfolioData = usePortfolioData();

  const [ref, inView] = useInView({
    threshold: 0.18,
    triggerOnce: true,
  });

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
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

  const getProjectIcon = (name = "") => {
    const n = name.toLowerCase();
    if (n.includes("social")) return <FaServer className="text-white/90" />;
    if (n.includes("mincraft") || n.includes("minecraft")) return <FaMobile className="text-white/90" />;
    if (n.includes("quran")) return <FaVuejs className="text-white/90" />;
    if (n.includes("tech gateway")) return <FaWordpress className="text-white/90" />;
    if (n.includes("dhiya")) return <FaShoppingCart className="text-white/90" />;
    if (n.includes("medical")) return <FaStethoscope className="text-white/90" />;
    return <FaCode className="text-white/90" />;
  };

  // Keep your project-specific tech lists (same logic, but styled better)
  const getProjectTechnologies = (project) => {
    const name = project?.name || "";
    const tech = (arr) => arr.map((x) => ({ name: x }));

    if (name === "Mincraft") return tech(["React", "React Native", "AWS S3", "Docker", "GitLab CI/CD"]);
    if (name === "Social Media") return tech(["Spring Boot", "Angular", "Hibernate", "Tailwind", "MySQL", "WebSocket"]);
    if (name === "Quran App") return tech(["Vue 3", "Vite", "JavaScript", "CSS3", "GitHub Pages"]);
    if (name === "Tech Gateway") return tech(["WordPress", "WooCommerce", "PHP", "MySQL", "SEO", "Responsive"]);
    if (name === "Dhiya Store") return tech(["WordPress", "WooCommerce", "PHP", "MySQL", "E-commerce", "Custom Orders"]);
    if (name === "Medical Recording") return tech(["ASP.NET Core", "Next.js", "PostgreSQL", "Tailwind CSS", "FullCalendar", "Swagger"]);

    return Array.isArray(project?.technologies) ? tech(project.technologies) : [];
  };

  const getProjectImage = (project) =>
    project.image || "https://via.placeholder.com/1200x800/0B1020/FFFFFF?text=Project+Preview";

  const getPrimaryLink = (project) => (project.live && project.live.trim() ? project.live : project.github || "#");

  const getRepoIcon = (project) =>
    project.github && project.github.includes("gitlab.com") ? <FaGitlab /> : <FaGithub />;

  const isLive = (project) => Boolean(project.live && project.live.trim());

  const categoryLabel = (project) => (project.category === "professional" ? "Pro" : "Académique");

  return (
    <section id="projects" className="relative overflow-hidden py-24 px-4 sm:px-6 md:px-8">
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
            <FaCode className="opacity-80" />
            <span className="font-semibold">{t("projects.badge") || "Projets sélectionnés"}</span>
          </div>

          <h2 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            {t("projects.title")}
          </h2>

          <p className="mt-5 text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t("projects.subtitle") ||
              "Découvrez une sélection de projets qui démontrent mes compétences et mon approche orientée qualité."}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {portfolioData.projects.map((project, index) => {
            const techs = getProjectTechnologies(project);
            return (
              <motion.article
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden
                           shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.07] transition"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={getProjectImage(project)}
                    alt={`${project.name} preview`}
                    className="w-full h-52 object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A12]/70 via-transparent to-transparent opacity-90" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white/85">
                      {categoryLabel(project)}
                    </span>
                    {project.date && (
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/75">
                        {project.date}
                      </span>
                    )}
                  </div>

                  {isLive(project) && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        Live
                      </span>
                    </div>
                  )}

                  {/* Top action icons */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 grid place-items-center rounded-full border border-white/10 bg-white/10 text-white/85 hover:bg-white/20 transition"
                        aria-label="Repository"
                      >
                        {getRepoIcon(project)}
                      </a>
                    )}
                    {isLive(project) && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 grid place-items-center rounded-full border border-white/10 bg-white/10 text-white/85 hover:bg-white/20 transition"
                        aria-label="Live demo"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title row */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl border border-white/10 bg-white/5 grid place-items-center">
                      {getProjectIcon(project.name)}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-lg font-extrabold text-white leading-snug">
                        {project.name}
                      </h3>
                      <p className="text-sm text-white/60 font-semibold">
                        {project.type || "Projet Full-Stack"}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-4 grid gap-2">
                    {(project.description || []).slice(0, 2).map((desc, i) => (
                      <div key={i} className="flex items-start gap-3 text-white/70">
                        <span className="mt-2 w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                        <p className="text-sm leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech */}
                  {techs.length > 0 && (
                    <div className="mt-5">
                      <div className="text-xs font-extrabold text-white/60 mb-2">
                        Technologies
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {techs.slice(0, 5).map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.03 }}
                            whileHover={{ y: -1 }}
                            className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white/75"
                          >
                            {tech.name}
                          </motion.span>
                        ))}
                        {techs.length > 5 && (
                          <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white/55">
                            +{techs.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 flex gap-2">
                    <motion.a
                      href={getPrimaryLink(project)}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-[#0B1020] font-extrabold px-4 py-3 shadow-lg hover:shadow-xl transition"
                    >
                      <FaEye />
                      <span>Voir le projet</span>
                      <FaArrowRight />
                    </motion.a>

                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.99 }}
                        className="inline-flex items-center justify-center w-12 rounded-2xl border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 transition"
                        aria-label="Repository"
                      >
                        {getRepoIcon(project)}
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <p className="text-white/70 text-lg mb-6">
            Vous voulez voir plus ? Retrouvez tous mes projets sur GitHub.
          </p>

          <motion.a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 text-white font-extrabold px-7 py-4
                       backdrop-blur hover:bg-white/10 transition shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            <FaGithub />
            <span>Voir plus de projets</span>
            <FaArrowRight />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
