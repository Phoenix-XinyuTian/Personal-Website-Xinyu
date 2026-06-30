"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
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
import LanguageSection from "./components/life/LanguageSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NewsSection from "./components/NewsSection";

const translations: Record<SiteLanguage, Translation> = { en, zh };

const SECTION_IDS: Record<SiteMode, string[]> = {
  work: ["top", "news", "experience", "skills", "projects", "education", "contact"],
  life: ["top", "news", "media", "travel", "languages", "contact"],
};

// `defaultMode` is resolved on the server from the request hostname (and an
// optional ?mode= override) and handed in as the initial state, so the first
// painted HTML already matches the domain — no client-side flash or correction.
// Visitors can still toggle freely afterwards; toggling never touches the URL.
export default function HomeClient({ defaultMode }: { defaultMode: SiteMode }) {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  const [mode, setMode] = useState<SiteMode>(defaultMode);
  const [displayedMode, setDisplayedMode] = useState<SiteMode>(defaultMode);

  useEffect(() => {
    // Language is the only default still resolved on the client: navigator.language
    // is unavailable on the server. Mode is fully server-resolved (see page.tsx).
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

  // Switching language reflows the page (EN/ZH text differ in height), which would
  // otherwise shift the content under the viewport. Pin the topmost visible section
  // across the switch so the reader stays where they were.
  const langAnchorRef = useRef<{ el: HTMLElement; top: number } | null>(null);

  const handleLanguageChange = (newLang: SiteLanguage) => {
    if (newLang === language) return;
    for (const id of SECTION_IDS[displayedMode]) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.bottom > 0) {
        langAnchorRef.current = { el, top: rect.top };
        break;
      }
    }
    setLanguage(newLang);
  };

  useLayoutEffect(() => {
    const anchor = langAnchorRef.current;
    if (!anchor) return;
    langAnchorRef.current = null;
    const delta = anchor.el.getBoundingClientRect().top - anchor.top;
    if (delta) window.scrollBy({ top: delta, behavior: "instant" as ScrollBehavior });
  }, [language]);

  const t = translations[language];

  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sectionIds = SECTION_IDS[displayedMode];

    let rafId = 0;

    const update = () => {
      if (window.scrollY < 80) {
        setActiveSection(sectionIds[0]);
        return;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= viewportCenter && bottom > viewportCenter) {
          setActiveSection(id);
          return;
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [displayedMode]);

  const navLinks =
    displayedMode === "work"
      ? [
          { href: "#top", label: t.nav.about },
          { href: "#news", label: t.nav.news },
          { href: "#experience", label: t.nav.experience },
          { href: "#skills", label: t.nav.skills },
          { href: "#projects", label: t.nav.projects },
          { href: "#education", label: t.nav.education },
          { href: "#contact", label: t.nav.contact },
        ]
      : [
          { href: "#top", label: t.nav.about },
          { href: "#news", label: t.nav.news },
          { href: "#media", label: t.nav.media },
          { href: "#travel", label: t.nav.travel },
          { href: "#languages", label: t.nav.language },
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
        onLanguageChange={handleLanguageChange}
        navLinks={navLinks}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onMobileMenuClose={() => setMobileMenuOpen(false)}
        t={t}
      />

      <div className={`transition-opacity duration-300 ${contentVisible ? "opacity-100" : "opacity-0"}`}>
        <HeroSection t={t} mode={displayedMode} />

        <AboutSection t={t} mode={displayedMode} lang={language} />
        <NewsSection t={t} mode={displayedMode} lang={language} />

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
            <TravelSection lang={language} />
            <LanguageSection t={t} />
          </>
        )}

        <ContactSection t={t} mode={displayedMode} lang={language} onLanguageChange={handleLanguageChange} />
      </div>

      <Footer t={t} mode={displayedMode} />
    </main>
  );
}
