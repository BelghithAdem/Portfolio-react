import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { FaBars, FaTimes, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { usePortfolioData } from "../hooks/usePortfolioData";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const portfolioData = usePortfolioData();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = useMemo(
    () => [
      { name: t("nav.home"), to: "home" },
      { name: t("nav.about"), to: "about" },
      { name: t("nav.experience"), to: "experience" },
      { name: t("nav.projects"), to: "projects" },
      { name: t("nav.skills"), to: "skills" },
      { name: t("nav.contact"), to: "contact" },
    ],
    [t]
  );

  const social = useMemo(
    () => [
      { icon: <FaLinkedin />, href: portfolioData.contact.linkedin, label: "LinkedIn" },
      { icon: <FaGithub />, href: portfolioData.contact.github, label: "GitHub" },
      { icon: <FaEnvelope />, href: `mailto:${portfolioData.contact.email}`, label: "Email" },
    ],
    [portfolioData]
  );

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {/* top bar */}
      <div
        className={[
          "mx-auto max-w-6xl px-4 sm:px-6 md:px-8",
          "transition-all duration-300",
          scrolled
            ? "pt-3"
            : "pt-5",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center justify-between h-16 rounded-2xl",
            "border border-white/10 backdrop-blur-xl",
            "transition-all duration-300",
            scrolled
              ? "bg-[#0B1020]/65 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
              : "bg-[#0B1020]/35",
          ].join(" ")}
        >
          {/* Logo */}
          <motion.div
            className="px-4 sm:px-5 font-extrabold tracking-tight text-white cursor-pointer select-none"
            whileHover={{ scale: 1.02 }}
          >
            <Link to="home" smooth duration={500} offset={-80}>
              <span className="bg-gradient-to-r from-sky-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
                {portfolioData.name}
              </span>
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy
                smooth
                offset={-90}
                duration={500}
                className="px-4 py-2 rounded-full text-sm font-semibold text-white/75 hover:text-white hover:bg-white/5 transition cursor-pointer"
                activeClass="!text-white bg-white/10"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3 pr-4 sm:pr-5">
            <div className="mr-1">
              <LanguageSwitcher />
            </div>

            {social.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={s.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white transition"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* Mobile button */}
          <button
            className="md:hidden mr-3 inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 transition"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <FaBars size={18} />
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* panel */}
            <motion.div
              className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 sm:px-6"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-[#0B1020]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <div className="font-extrabold text-white">
                    {portfolioData.name}
                  </div>
                  <button
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 transition"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                <div className="px-5 py-5">
                  <div className="flex justify-center pb-5">
                    <LanguageSwitcher />
                  </div>

                  <div className="grid gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        spy
                        smooth
                        offset={-90}
                        duration={500}
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 rounded-2xl text-base font-semibold text-white/80 hover:text-white hover:bg-white/5 transition cursor-pointer"
                        activeClass="!text-white bg-white/10"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-3">
                    {social.map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        aria-label={s.label}
                        className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white transition"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>

                  <div className="mt-6 text-center text-xs text-white/45">
                    © {new Date().getFullYear()} — {portfolioData.name}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
