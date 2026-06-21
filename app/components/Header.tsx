"use client";

import { Orbitron } from "next/font/google";
import { Flame } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { type SiteLanguage, type SiteMode } from "../types";
import { type Translation } from "../data/i18n/en";
import LanguageDropdown from "./ui/LanguageDropdown";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700"] });

export default function Header({
  mode,
  language,
  onModeChange,
  onLanguageChange,
  navLinks,
  activeSection,
  mobileMenuOpen,
  onMobileMenuToggle,
  onMobileMenuClose,
  t,
}: {
  mode: SiteMode;
  language: SiteLanguage;
  onModeChange: (mode: SiteMode) => void;
  onLanguageChange: (lang: SiteLanguage) => void;
  navLinks: { href: string; label: string }[];
  activeSection: string;
  mobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  onMobileMenuClose: () => void;
  t: Translation;
}) {
  const isLife = mode === "life";
  const navContainerRef = useRef<HTMLDivElement>(null);
  const activeNavRef = useRef<HTMLAnchorElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ width: number; left: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      if (activeNavRef.current && navContainerRef.current) {
        const activeRect = activeNavRef.current.getBoundingClientRect();
        const containerRect = navContainerRef.current.getBoundingClientRect();
        setIndicatorStyle({
          width: activeRect.width,
          left: activeRect.left - containerRect.left,
        });
      }
    };

    measure();

    // Re-measure on any reflow (language switch, async font load, viewport resize)
    // so the indicator never lingers at a stale position between two nav items.
    const container = navContainerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [activeSection, language]);

  const isActive = (href: string) => `#${activeSection}` === href;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (href === "#news") {
      const newsEl = document.getElementById("news");
      if (newsEl) {
        const elementHeight = newsEl.offsetHeight;
        const scrollTop = newsEl.offsetTop - (window.innerHeight / 2) + (elementHeight / 2);
        window.scrollTo({ top: Math.max(0, scrollTop), behavior: "smooth" });
      }
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className={`relative sticky top-0 z-30 border-b backdrop-blur transition-colors duration-500 ${isLife ? "border-slate-200/50 bg-[#f5f7fa]/70" : "border-slate-200/50 bg-[#f5f7fa]/70"}`}>
      {/* Desktop Header (lg+) */}
      <div className="hidden items-center px-[clamp(1.5rem,4vw,4rem)] py-2 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className={`${orbitron.className} inline-flex items-center gap-1.5 text-sm uppercase tracking-[0.18em] lg:justify-self-start`}
        >
          <span style={{
            backgroundImage: "linear-gradient(to right, #38bdf8 0%, #818cf8 26%, #fbbf24 55%, #f97316 78%, #ef4444 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Xinyu Tian | Phoenix
          </span>
          <Flame
            className="h-3.5 w-3.5 shrink-0"
            style={{ color: "#f97316", filter: "drop-shadow(0 0 5px rgba(249,115,22,0.75))" }}
          />
        </a>

        {/* Mode toggle with sliding indicator */}
        <div className="relative mx-auto inline-flex shrink-0 rounded-full bg-slate-100 p-1 shadow-inner ring-1 ring-slate-200/80 lg:mx-0">
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-1 rounded-full shadow-sm transition-all duration-300 ease-in-out ${
              mode === "life" ? "bg-teal-400" : "bg-sky-400"
            }`}
            style={{
              width: "calc(50% - 4px)",
              left: "4px",
              transform: mode === "work" ? "translateX(0)" : "translateX(100%)",
            }}
          />
          <button
            type="button"
            onClick={() => onModeChange("work")}
            className={`relative z-10 px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
              mode === "work" ? "text-white" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.modeSwitch.work}
          </button>
          <button
            type="button"
            onClick={() => onModeChange("life")}
            className={`relative z-10 px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
              mode === "life" ? "text-white" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.modeSwitch.life}
          </button>
        </div>

        <div className="flex flex-nowrap items-center gap-[clamp(0.25rem,0.5vw,0.5rem)] text-[clamp(0.75rem,1.2vw,0.875rem)] lg:justify-self-end relative" ref={navContainerRef}>
          {indicatorStyle && (
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute -bottom-2 rounded-full shadow-sm transition-all duration-300 ease-in-out h-1 ${
                isLife ? "bg-teal-400" : "bg-sky-400"
              }`}
              style={{
                width: `${indicatorStyle.width}px`,
                left: 0,
                transform: `translateX(${indicatorStyle.left}px)`,
              }}
            />
          )}
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={active ? "location" : undefined}
                ref={active ? activeNavRef : null}
                className={`whitespace-nowrap rounded-full px-2.5 py-1 transition-colors duration-200 ${
                  active ? "text-black" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <LanguageDropdown language={language} onSelect={onLanguageChange} />
        </div>
      </div>

      {/* Mobile Header (sm and below) */}
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 py-2 sm:px-8 lg:hidden">
        {/* Mobile Brand - Shortened */}
        <a
          href="#top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className={`${orbitron.className} inline-flex items-center gap-1 justify-self-start text-sm uppercase tracking-[0.18em]`}
        >
          <span style={{
            backgroundImage: "linear-gradient(to right, #38bdf8 0%, #818cf8 26%, #fbbf24 55%, #f97316 78%, #ef4444 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {mode === "work" ? "XINYU" : "PHOENIX"}
          </span>
          <Flame
            className="h-3 w-3 shrink-0"
            style={{ color: "#f97316", filter: "drop-shadow(0 0 4px rgba(249,115,22,0.7))" }}
          />
        </a>

        {/* Mode toggle - Compact */}
        <div className="relative inline-flex rounded-full bg-slate-100 p-1 shadow-inner ring-1 ring-slate-200/80">
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-1 rounded-full shadow-sm transition-all duration-300 ease-in-out ${
              mode === "life" ? "bg-teal-400" : "bg-sky-400"
            }`}
            style={{
              width: "calc(50% - 4px)",
              left: "4px",
              transform: mode === "work" ? "translateX(0)" : "translateX(100%)",
            }}
          />
          <button
            type="button"
            onClick={() => onModeChange("work")}
            className={`relative z-10 px-2 py-1 text-xs font-semibold transition-colors duration-300 ${
              mode === "work" ? "text-white" : "text-slate-500"
            }`}
          >
            {t.modeSwitch.work}
          </button>
          <button
            type="button"
            onClick={() => onModeChange("life")}
            className={`relative z-10 px-2 py-1 text-xs font-semibold transition-colors duration-300 ${
              mode === "life" ? "text-white" : "text-slate-500"
            }`}
          >
            {t.modeSwitch.life}
          </button>
        </div>

        {/* Mobile Menu & Language Buttons */}
        <div className="flex items-center justify-self-end gap-2">
          <LanguageDropdown language={language} onSelect={onLanguageChange} />
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition ${
              mobileMenuOpen
                ? isLife ? "bg-teal-400" : "bg-sky-400"
                : "border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-100"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className={`h-5 w-5 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="absolute right-4 top-full z-50 w-44 rounded-2xl border border-slate-200/50 bg-[#f5f7fa]/70 backdrop-blur shadow-lg py-2 [animation:menu-in_0.2s_ease-out] lg:hidden">
          <nav className="space-y-0.5 px-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "location" : undefined}
                  className={`relative block rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "text-black"
                      : "text-slate-700 hover:text-slate-950"
                  }`}
                  onClick={(e) => { handleNavClick(e, link.href); onMobileMenuClose(); }}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className={`absolute left-1.5 top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full ${
                        isLife ? "bg-teal-500" : "bg-sky-500"
                      }`}
                    />
                  )}
                  <span className={active ? "pl-2" : undefined}>{link.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
