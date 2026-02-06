import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";
import {
  FaDownload,
  FaLinkedin,
  FaGithub,
  FaGitlab,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { usePortfolioData } from "../hooks/usePortfolioData";

const Hero = () => {
  const { t } = useTranslation();
  const portfolioData = usePortfolioData();
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const scrollRef = useRef(null);
  const scrollChevronRef = useRef(null);
  const blobRefs = useRef([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staggered entrance: badge → name → title → description → CTAs → social → scroll
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          nameRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          socialRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        );

      // Scroll chevron bounce (loop)
      if (scrollChevronRef.current) {
        gsap.to(scrollChevronRef.current, {
          y: 6,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Subtle float animation for background blobs
      const blobs = blobRefs.current.filter(Boolean);
      if (blobs.length) {
        gsap.to(blobs, {
          y: "+=20",
          duration: 4,
          stagger: { each: 1.5, from: "random" },
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6 md:px-8"
    >
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020] via-[#0B1228] to-[#090A12]" />
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_15%_25%,rgba(56,189,248,0.25),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.20),transparent_45%),radial-gradient(circle_at_25%_85%,rgba(34,197,94,0.14),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:44px_44px]" />

      {/* Subtle floating blobs - GSAP will animate via refs */}
      <div
        ref={(el) => (blobRefs.current[0] = el)}
        className="absolute -top-10 left-10 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl"
      />
      <div
        ref={(el) => (blobRefs.current[1] = el)}
        className="absolute top-40 -right-10 w-72 h-72 rounded-full bg-fuchsia-500/10 blur-3xl"
      />
      <div
        ref={(el) => (blobRefs.current[2] = el)}
        className="absolute bottom-10 left-1/4 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center">
          {/* Badge */}
          <div ref={badgeRef} className="mt-8 sm:mt-0 mb-7 opacity-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 backdrop-blur">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-semibold">{t("hero.greeting")}</span>
            </div>
          </div>

          {/* Name & Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
            <span
              ref={nameRef}
              className="block text-white/90 opacity-0"
            >
              {portfolioData.name}
            </span>
            <span
              ref={titleRef}
              className="block mt-2 bg-gradient-to-r from-sky-300 via-white to-fuchsia-300 bg-clip-text text-transparent opacity-0"
            >
              {t("hero.title")}
            </span>
          </h1>

          {/* Subtitle/Description */}
          <p
            ref={descriptionRef}
            className="mt-6 text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed opacity-0"
          >
            {t("hero.description")}
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center opacity-0"
          >
            <a
              href="https://flowcv.com/resume/o6vebkrtdq"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-white text-[#0B1020] font-extrabold px-7 py-4 shadow-lg hover:shadow-xl transition hover:-translate-y-0.5 active:scale-[0.99]"
            >
              <FaDownload />
              <span>{t("hero.downloadCv")}</span>
            </a>
            <Link to="projects" smooth duration={500} offset={-80}>
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 text-white font-bold px-7 py-4 backdrop-blur hover:bg-white/[0.08] transition hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <span>{t("hero.viewProjects")}</span>
                <FaChevronDown className="opacity-80" />
              </button>
            </Link>
          </div>

          {/* Social */}
          <div
            ref={socialRef}
            className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto opacity-0"
          >
            {[
              {
                icon: <FaLinkedin />,
                href: portfolioData.contact.linkedin,
                label: "LinkedIn",
              },
              {
                icon: <FaGithub />,
                href: portfolioData.contact.github,
                label: "GitHub",
              },
              {
                icon: <FaGitlab />,
                href: portfolioData.contact.gitlab,
                label: "GitLab",
              },
              {
                icon: <FaEnvelope />,
                href: `mailto:${portfolioData.contact.email}`,
                label: "Email",
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-white/85 backdrop-blur hover:bg-white/[0.08] transition hover:-translate-y-0.5 active:scale-[0.98]"
                aria-label={s.label}
              >
                <span className="opacity-90">{s.icon}</span>
                <span className="text-sm font-semibold">{s.label}</span>
              </a>
            ))}
          </div>

          {/* Scroll indicator */}
          <div ref={scrollRef} className="mt-12 flex justify-center opacity-0">
            <Link to="about" smooth duration={500} offset={-80}>
              <div className="cursor-pointer inline-flex items-center gap-2 text-white/60 hover:text-white/80 transition hover:-translate-y-0.5">
                <span className="text-sm font-semibold">Scroll</span>
                <span ref={scrollChevronRef} className="inline-block">
                  <FaChevronDown />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
