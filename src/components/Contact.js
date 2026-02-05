import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaGitlab,
  FaGlobe,
  FaPaperPlane,
  FaCheckCircle,
  FaComments,
} from "react-icons/fa";
import { usePortfolioData } from "../hooks/usePortfolioData";

const Contact = () => {
  const portfolioData = usePortfolioData();

  const [ref, inView] = useInView({
    threshold: 0.14,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // demo submit
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 2600);
    }, 1400);
  };

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
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    }),
    []
  );

  const contactInfo = useMemo(
    () => [
      {
        icon: <FaEnvelope />,
        title: "Email",
        value: portfolioData.contact.email,
        link: `mailto:${portfolioData.contact.email}`,
      },
      {
        icon: <FaPhone />,
        title: "Téléphone",
        value: portfolioData.contact.phone,
        link: `tel:${portfolioData.contact.phone}`,
      },
      {
        icon: <FaMapMarkerAlt />,
        title: "Localisation",
        value: portfolioData.contact.location,
        link: "#",
      },
    ],
    [portfolioData]
  );

  const socialLinks = useMemo(
    () => [
      {
        icon: <FaLinkedin />,
        name: "LinkedIn",
        url: portfolioData.contact.linkedin,
      },
      {
        icon: <FaGithub />,
        name: "GitHub",
        url: portfolioData.contact.github,
      },
      {
        icon: <FaGitlab />,
        name: "GitLab",
        url: portfolioData.contact.gitlab,
      },
      {
        icon: <FaGlobe />,
        name: "Portfolio",
        url: portfolioData.contact.portfolio,
      },
    ],
    [portfolioData]
  );

  return (
    <section id="contact" className="relative overflow-hidden py-24 px-4 sm:px-6 md:px-8">
      {/* Background (matches Skills section) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020] via-[#0B1228] to-[#090A12]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.18),transparent_45%),radial-gradient(circle_at_35%_80%,rgba(34,197,94,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="container mx-auto max-w-6xl relative z-10 w-full">
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
            <FaComments className="opacity-80" />
            <span className="font-semibold">Restons en contact</span>
          </motion.div>

          <h2 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Contact
          </h2>

          <p className="mt-5 text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Intéressé par mon profil ? Contactez-moi pour discuter de vos besoins, d’un projet ou d’une opportunité.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left column */}
          <motion.div
            className="space-y-7"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <span className="grid place-items-center w-11 h-11 rounded-2xl border border-white/10 bg-white/5 text-white">
                  <FaEnvelope />
                </span>
                Informations de contact
              </h3>
            </motion.div>

            {/* Contact cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div key={index} variants={itemVariants} whileHover={{ y: -3 }}>
                  <a
                    href={info.link}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.07] transition"
                  >
                    <div className="grid place-items-center w-12 h-12 rounded-2xl border border-white/10 bg-white/5 text-white/90">
                      {info.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm text-white/60">{info.title}</div>
                      <div className="text-base md:text-lg font-semibold text-white/90 break-all">
                        {info.value}
                      </div>
                    </div>

                    <div className="ml-auto text-white/40 group-hover:text-white/70 transition">
                      <span className="text-sm">↗</span>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <motion.div variants={itemVariants} className="pt-2">
              <h4 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-2xl border border-white/10 bg-white/5 text-white">
                  <FaGlobe />
                </span>
                Réseaux
              </h4>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-white/85 font-semibold backdrop-blur hover:bg-white/[0.08] transition"
                  >
                    <span className="opacity-90">{social.icon}</span>
                    <span className="text-sm md:text-base">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              variants={itemVariants}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
            >
              <div className="flex items-center gap-3">
                <span className="grid place-items-center w-10 h-10 rounded-2xl border border-white/10 bg-white/5 text-emerald-300">
                  <FaCheckCircle />
                </span>
                <h4 className="text-lg md:text-xl font-bold text-white">Disponibilité</h4>
              </div>

              <div className="mt-4 grid gap-2.5 text-white/80">
                {[
                  "Disponible pour un job part-time (PFE en cours)",
                  "Réponse rapide sous 24h",
                  "Réunion en ligne possible",
                  "Remote ou sur site selon le besoin",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm md:text-base leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: Form */}
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <span className="text-white/85">
                  <FaPaperPlane />
                </span>
                Envoyez-moi un message
              </h3>
              <p className="mt-3 text-white/70">
                Remplissez le formulaire et je vous répondrai rapidement.
              </p>
            </motion.div>

            {isSubmitted ? (
              <motion.div
                className="text-center py-10"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 grid place-items-center">
                  <FaCheckCircle className="text-emerald-300 text-2xl" />
                </div>
                <h4 className="mt-5 text-xl font-bold text-white">Message envoyé !</h4>
                <p className="mt-2 text-white/70">
                  Merci. Je reviens vers vous très bientôt.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-white/80 mb-2" htmlFor="name">
                      Nom complet *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Votre nom"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-sky-400/40 focus:ring-4 focus:ring-sky-500/10 transition"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-white/80 mb-2" htmlFor="email">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="votre@email.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-sky-400/40 focus:ring-4 focus:ring-sky-500/10 transition"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-white/80 mb-2" htmlFor="subject">
                    Sujet *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Sujet de votre message"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-sky-400/40 focus:ring-4 focus:ring-sky-500/10 transition"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-white/80 mb-2" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Décrivez votre besoin / projet..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-sky-400/40 focus:ring-4 focus:ring-sky-500/10 transition resize-none"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-white text-[#0B1020] font-extrabold px-6 py-4 shadow-lg hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-[#0B1020] border-t-transparent rounded-full animate-spin" />
                      <span>Envoi...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Envoyer</span>
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-white/50 leading-relaxed pt-1">
                  En envoyant ce message, vous acceptez d’être contacté par email.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
