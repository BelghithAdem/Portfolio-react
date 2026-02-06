import React, { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const qualitiesRef = useRef(null);
  const qualityCardsRef = useRef([]);
  const approachRef = useRef(null);
  const goalsRef = useRef(null);
  const ctaRef = useRef(null);

  const qualities = useMemo(
    () => [
      { icon: <FaUser />, title: "Adaptabilité", description: "Je m'adapte rapidement aux nouvelles technologies et aux environnements de travail." },
      { icon: <FaCode />, title: "Qualité du code", description: "J'applique les bonnes pratiques (clean code, maintenabilité, lisibilité)." },
      { icon: <FaLightbulb />, title: "Innovation", description: "J'aime apprendre, expérimenter et proposer des solutions simples et efficaces." },
      { icon: <FaRocket />, title: "Performance", description: "Je fais attention à l'optimisation, l'UX et les détails qui font la différence." },
    ],
    []
  );

  const approach = useMemo(
    () => [
      "Développement centré utilisateur avec une attention forte à l'UX.",
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

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      // Header: scale + fade
      tl.fromTo(badgeRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 })
        .fromTo(titleRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.25")
        .fromTo(descRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

      // Qualities: stagger slide up
      if (qualityCardsRef.current.length) {
        tl.fromTo(
          qualityCardsRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
          "-=0.2"
        );
      }

      // Approach from left, Goals from right
      tl.fromTo(approachRef.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.65 }, "-=0.3")
        .fromTo(goalsRef.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.65 }, "-=0.5")
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden py-24 px-4 sm:px-6 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020] via-[#0B1228] to-[#090A12]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.18),transparent_45%),radial-gradient(circle_at_35%_80%,rgba(34,197,94,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div ref={headerRef} className="text-center mb-16">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 backdrop-blur hover:scale-[1.03] transition-transform"
          >
            <FaHeart className="text-rose-300" />
            <span className="font-semibold">Qui suis-je ?</span>
          </div>
          <h2 ref={titleRef} className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            {t("about.title")}
          </h2>
          <p ref={descRef} className="mt-5 text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            {t("about.description")}
          </p>
        </div>

        <div ref={qualitiesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {qualities.map((q, idx) => (
            <div
              key={idx}
              ref={(el) => (qualityCardsRef.current[idx] = el)}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.07] hover:-translate-y-1.5 transition"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-white/90">
                  <span className="text-xl">{q.icon}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white text-center">{q.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70 text-center">{q.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-7">
          <div
            ref={approachRef}
            className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-8 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-sky-200">
                <FaBullseye />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Mon approche</h3>
            </div>
            <div className="grid gap-3">
              {approach.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="mt-2 w-2 h-2 rounded-full bg-sky-400" />
                  <p className="text-white/80 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={goalsRef}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-7 sm:p-8 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-fuchsia-200">
                <FaStar />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Objectifs professionnels</h3>
            </div>
            <div className="grid gap-3">
              {goals.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="mt-2 w-2 h-2 rounded-full bg-fuchsia-400" />
                  <p className="text-white/80 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={ctaRef} className="text-center mt-14">
          <Link to="experience" smooth duration={500} offset={-90}>
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-2xl bg-white text-[#0B1020] px-7 py-4 font-extrabold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] transition"
            >
              <FaRocket />
              <span>Découvrir mon expérience</span>
              <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
