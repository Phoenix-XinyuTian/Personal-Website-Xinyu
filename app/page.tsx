"use client";

import { useState, useEffect, useRef } from "react";
import { type SiteLanguage, type SiteMode } from "./types";
import { en, type Translation } from "./data/i18n/en";
import { zh } from "./data/i18n/zh";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import ExperienceSection from "./components/work/ExperienceSection";
import SkillsSection from "./components/work/SkillsSection";
import ProjectsSection from "./components/work/ProjectsSection";
import EducationSection from "./components/work/EducationSection";
import MediaSection from "./components/life/MediaSection";
import TravelSection from "./components/life/TravelSection";
import LifeSection from "./components/life/LifeSection";
import Footer from "./components/Footer";

const translations: Record<SiteLanguage, Translation> = { en, zh };

export default function Home() {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  const [mode, setMode] = useState<SiteMode>("work");
  const [displayedMode, setDisplayedMode] = useState<SiteMode>("work");

  useEffect(() => {
    if (navigator.language.startsWith("zh")) setLanguage("zh");
  }, []);

  const [contentVisible, setContentVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleModeChange = (newMode: SiteMode) => {
    if (newMode === mode) return;
    if (transitionRef.current) clearTimeout(transitionRef.current);
    setMode(newMode);
    setContentVisible(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    transitionRef.current = setTimeout(() => {
      setDisplayedMode(newMode);
      setContentVisible(true);
    }, 320);
  };

  useEffect(() => {
    return () => { if (transitionRef.current) clearTimeout(transitionRef.current); };
  }, []);

  const t = translations[language];

  const navLinks =
    displayedMode === "work"
      ? [
          { href: "#about", label: t.nav.about },
          { href: "#experience", label: t.nav.experience },
          { href: "#skills", label: t.nav.skills },
          { href: "#projects", label: t.nav.projects },
          { href: "#education", label: t.nav.education },
          { href: "#contact", label: t.nav.contact },
        ]
      : [
          { href: "#about", label: t.nav.about },
          { href: "#media", label: t.nav.media },
          { href: "#travel", label: t.nav.travel },
          { href: "#life", label: t.nav.life },
          { href: "#contact", label: t.nav.contact },
        ];

  return (
    <main
      className="min-h-screen text-slate-950 transition-colors duration-500 selection:bg-sky-300 selection:text-slate-950"
      style={{
        backgroundColor: "#f5f7fa",
        backgroundImage: [
          "radial-gradient(ellipse at 5% 8%,  rgba(56,189,248,0.18)  0%, transparent 36%)",
          "radial-gradient(ellipse at 92% 6%,  rgba(132,204,22,0.20)  0%, transparent 32%)",
          "radial-gradient(ellipse at 8%  55%, rgba(56,189,248,0.12)  0%, transparent 36%)",
          "radial-gradient(ellipse at 88% 62%, rgba(248,113,113,0.10) 0%, transparent 32%)",
          "radial-gradient(ellipse at 40% 90%, rgba(132,204,22,0.14)  0%, transparent 36%)",
          "radial-gradient(circle, rgba(100,116,139,0.22) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 28px 28px",
        backgroundAttachment: "fixed, fixed, fixed, fixed, fixed, scroll",
      }}
    >
      <Header
        mode={mode}
        language={language}
        onModeChange={handleModeChange}
        onLanguageChange={setLanguage}
        navLinks={navLinks}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onMobileMenuClose={() => setMobileMenuOpen(false)}
        t={t}
      />

      <div className={`transition-opacity duration-300 ${contentVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="border-b border-amber-200 bg-amber-50 px-6 py-2 text-center text-sm text-amber-700">
          🚧 {t.devBanner}
        </div>

        <section id="top" className="px-6 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-6">
          <div className="mx-auto max-w-6xl">
            <p className={`text-center text-sm uppercase tracking-[0.32em] ${displayedMode === "life" ? "text-teal-600" : "text-sky-600"}`}>{displayedMode === "work" ? t.hero.topLabel : t.lifeHero.topLabel}</p>
            <h1 className="mt-3 text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{displayedMode === "work" ? t.hero.heading : t.lifeHero.heading}</h1>
          </div>
        </section>

        <AboutSection t={t} mode={displayedMode} />

        {displayedMode === "work" ? (
          <>
            <ExperienceSection t={t} language={language} />
            <SkillsSection t={t} />
            <ProjectsSection t={t} language={language} />
            <EducationSection t={t} />
          </>
        ) : (
          <>
            <MediaSection t={t} lang={language} />
            <TravelSection t={t} />
            <LifeSection t={t} />
          </>
        )}

        <ContactSection t={t} mode={displayedMode} />
      </div>

      <Footer t={t} />
    </main>
  );
}
