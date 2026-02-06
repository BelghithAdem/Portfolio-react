import React, { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const ctaRef = useRef(null);

  const accents = useMemo(
    () => [
      { dot: "bg-sky-400", ring: "ring-sky-400/20", line: "bg-white/10", chip: "border-sky-400/25 text-sky-200 bg-sky-500/10" },
      { dot: "bg-emerald-400", ring: "ring-emerald-400/20", line: "bg-white/10", chip: "border-emerald-400/25 text-emerald-200 bg-emerald-500/10" },
      { dot: "bg-fuchsia-400", ring: "ring-fuchsia-400/20", line: "bg-white/10", chip: "border-fuchsia-400/25 text-fuchsia-200 bg-fuchsia-500/10" },
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

      tl.fromTo(headerRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65 })
        .fromTo(
          timelineItemsRef.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.12 },
          "-=0.3"
        )
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
    },
    { scope: sectionRef, dependencies: [portfolioData.experience?.length] }
  );

  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden py-24 px-4 sm:px-6 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020] via-[#0B1228] to-[#090A12]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.18),transparent_45%),radial-gradient(circle_at_35%_80%,rgba(34,197,94,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 backdrop-blur hover:scale-[1.03] transition-transform">
            <FaRocket className="opacity-80" />
            <span className="font-semibold">Mon parcours</span>
          </div>
          <h2 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            {t("experience.title")}
          </h2>
          <p className="mt-5 text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t("experience.subtitle")}
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {portfolioData.experience.map((exp, index) => {
            const a = accents[index % accents.length];
            return (
              <div key={index} ref={(el) => (timelineItemsRef.current[index] = el)} className="relative pb-14 last:pb-0">
                <div className="flex gap-5 sm:gap-7">
                  <div className="flex flex-col items-center">
                    <div className={["w-12 h-12 rounded-full grid place-items-center bg-white/5 border border-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] ring-8", a.ring].join(" ")}>
                      <span className={`w-3 h-3 rounded-full ${a.dot}`} />
                    </div>
                    {index !== portfolioData.experience.length - 1 && (
                      <div className={`mt-3 w-[2px] flex-1 rounded-full ${a.line}`} />
                    )}
                  </div>

                  <div className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.07] hover:-translate-y-1 transition">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-2xl font-extrabold text-white">{exp.title}</h3>
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

                    <div className="mt-7">
                      <div className="flex items-center gap-2 text-white/80 font-bold mb-4">
                        <FaBriefcase className="text-white/60" />
                        <span>Réalisations principales</span>
                      </div>
                      <ul className="grid gap-3">
                        {exp.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/75">
                            <FaCheckCircle className="mt-1 text-emerald-300 shrink-0" />
                            <span className="leading-relaxed">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                      <div className="mt-7 pt-6 border-t border-white/10">
                        <div className="text-sm font-extrabold text-white/70 mb-3">Technologies</div>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={["px-3 py-1.5 rounded-full border text-sm font-semibold transition hover:-translate-y-0.5", a.chip].join(" ")}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={ctaRef} className="text-center mt-16">
          <Link to="projects" smooth duration={500} offset={-90}>
            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-2xl bg-white text-[#0B1020] px-7 py-4 font-extrabold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99] transition"
            >
              <FaRocket />
              <span>Découvrir mes projets</span>
              <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Experience;
