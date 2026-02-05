import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaGitlab,
  FaGlobe,
  FaHeart,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCode,
  FaArrowUp,
} from "react-icons/fa";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { Link } from "react-scroll";

const Footer = () => {
  const portfolioData = usePortfolioData();
  const currentYear = new Date().getFullYear();

  const socialLinks = useMemo(
    () => [
      { icon: <FaLinkedin />, name: "LinkedIn", url: portfolioData.contact.linkedin },
      { icon: <FaGithub />, name: "GitHub", url: portfolioData.contact.github },
      { icon: <FaGitlab />, name: "GitLab", url: portfolioData.contact.gitlab },
      { icon: <FaGlobe />, name: "Portfolio", url: portfolioData.contact.portfolio },
    ],
    [portfolioData]
  );

  const nav = useMemo(
    () => [
      { to: "home", label: "Accueil" },
      { to: "about", label: "À propos" },
      { to: "experience", label: "Expérience" },
      { to: "projects", label: "Projets" },
      { to: "skills", label: "Compétences" },
      { to: "contact", label: "Contact" },
    ],
    []
  );

  const techStack = useMemo(
    () => ["React", "Framer Motion", "Tailwind CSS", "JavaScript"],
    []
  );

  return (
    <footer className="relative overflow-hidden px-4 sm:px-6 md:px-8 pt-16 pb-10">
      {/* Background (same system) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020] via-[#0B1228] to-[#090A12]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_15%_25%,rgba(56,189,248,0.16),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.14),transparent_45%),radial-gradient(circle_at_30%_85%,rgba(34,197,94,0.10),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur grid place-items-center text-white/85">
                <FaCode />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight text-white">
                {portfolioData.name}
              </h3>
            </div>

            <p className="mt-5 text-white/70 leading-relaxed max-w-md">
              Développeur logiciel orienté qualité, performance et expérience utilisateur.
              J’aime construire des produits propres, maintenables et utiles.
            </p>

            {/* Social */}
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5
                             text-white/85 hover:bg-white/10 hover:text-white transition backdrop-blur"
                >
                  <span className="opacity-90">{s.icon}</span>
                  <span className="text-sm font-semibold">{s.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white/60 mb-4">
              Navigation
            </h4>
            <ul className="grid gap-2">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    smooth
                    duration={500}
                    offset={-90}
                    className="cursor-pointer inline-flex items-center gap-2 text-white/70 hover:text-white transition"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Back to top */}
            <div className="mt-6">
              <Link to="home" smooth duration={500} offset={-90}>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5
                             text-white/85 hover:bg-white/10 transition backdrop-blur"
                >
                  <FaArrowUp />
                  <span className="text-sm font-extrabold">Retour en haut</span>
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white/60 mb-4">
              Contact
            </h4>

            <div className="grid gap-3">
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur
                           hover:bg-white/10 transition flex items-center gap-3 min-w-0"
              >
                <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 grid place-items-center text-sky-200 shrink-0">
                  <FaEnvelope />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white/55 font-semibold">Email</div>
                  <div className="text-sm font-extrabold text-white/85 truncate">
                    {portfolioData.contact.email}
                  </div>
                </div>
              </a>

              <a
                href={`tel:${portfolioData.contact.phone}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur
                           hover:bg-white/10 transition flex items-center gap-3 min-w-0"
              >
                <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 grid place-items-center text-emerald-200 shrink-0">
                  <FaPhone />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white/55 font-semibold">Téléphone</div>
                  <div className="text-sm font-extrabold text-white/85 break-all">
                    {portfolioData.contact.phone}
                  </div>
                </div>
              </a>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 grid place-items-center text-fuchsia-200 shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white/55 font-semibold">Localisation</div>
                  <div className="text-sm font-extrabold text-white/85 truncate">
                    {portfolioData.contact.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Tech pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white/65"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-center text-white/55 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>© {currentYear} {portfolioData.name}. Tous droits réservés.</span>
            <span className="hidden sm:inline text-white/25">•</span>
            <span className="inline-flex items-center gap-2">
              Fait avec <FaHeart className="text-rose-400" /> et <FaCode className="text-sky-300" /> en React
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
