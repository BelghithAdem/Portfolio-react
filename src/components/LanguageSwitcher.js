import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe, FaChevronDown, FaCheck } from "react-icons/fa";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  const languages = useMemo(
    () => [
      { code: "fr", name: "Français", flag: "🇫🇷" },
      { code: "en", name: "English", flag: "🇺🇸" },
    ],
    []
  );

  const current = useMemo(() => {
    const lang = (i18n.language || "en").split("-")[0]; // handle en-US
    return languages.find((l) => l.code === lang) || languages[1];
  }, [i18n.language, languages]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div ref={rootRef} className="relative">
      {/* Toggle */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        title="Change language"
        className="
          inline-flex items-center gap-2
          h-10 px-3 rounded-full
          border border-white/10 bg-white/5 text-white/85
          backdrop-blur-xl
          hover:bg-white/10 hover:text-white transition
          shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
        "
      >
        <FaGlobe className="text-white/70" />
        <span className="text-sm font-extrabold tracking-tight">
          {current.flag} <span className="uppercase">{current.code}</span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/60"
        >
          <FaChevronDown size={12} />
        </motion.span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
              absolute right-0 mt-2 z-50 min-w-[170px]
              rounded-2xl border border-white/15
              bg-[#0D1324] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_20px_50px_-12px_rgba(0,0,0,0.6)]
              backdrop-blur-xl overflow-hidden
            "
            role="menu"
          >
            <div className="px-4 py-3 border-b border-white/10 bg-white/[0.04] text-xs font-extrabold tracking-wider text-white/60 uppercase">
              Language
            </div>

            <div className="p-2">
              {languages.map((lang) => {
                const active = (i18n.language || "").startsWith(lang.code);
                return (
                  <motion.button
                    key={lang.code}
                    type="button"
                    onClick={() => changeLanguage(lang.code)}
                    whileHover={{ x: 3 }}
                    className={[
                      "w-full flex items-center justify-between gap-3",
                      "px-3 py-2.5 rounded-xl text-left transition",
                      active ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/5 hover:text-white",
                    ].join(" ")}
                    role="menuitem"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-bold">{lang.name}</span>
                    </span>

                    {active ? (
                      <span className="text-emerald-300">
                        <FaCheck />
                      </span>
                    ) : (
                      <span className="text-white/25 text-xs font-bold uppercase">
                        {lang.code}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
