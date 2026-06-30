"use client";

import { useState, useEffect } from "react";
import { type Translation } from "../data/i18n/en";
import { type SiteMode } from "../types";

export default function HeroSection({ t, mode }: { t: Translation; mode: SiteMode }) {
  const heroData = mode === "life" ? t.lifeHero : t.hero;

  return <HeroContent key={mode} heroData={heroData} mode={mode} />;
}

function HeroContent({
  heroData,
  mode,
}: {
  heroData: Translation["hero"];
  mode: SiteMode;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const flipOutTimer = setTimeout(() => setFlipping(true), 2800);
    const swapTimer = setTimeout(() => {
      setWordIndex((i) => (i + 1) % heroData.rotatingWords.length);
      setFlipping(false);
    }, 3100);
    return () => {
      clearTimeout(flipOutTimer);
      clearTimeout(swapTimer);
    };
  }, [wordIndex, heroData.rotatingWords.length]);

  return (
    <section id="top" className="px-6 pt-4 pb-0 sm:px-8 sm:pt-6 sm:pb-1">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-center text-2xl font-medium text-slate-700 motion-safe:animate-[fadeInUp_0.6s_ease-out] sm:text-3xl">
          {heroData.greeting}
        </p>
        <p className="text-center text-2xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl">
          <span className="inline-flex max-w-full items-baseline justify-center gap-3 sm:gap-4">
            <span className="shrink-0">{heroData.intro}</span>
            <span className={`relative inline-grid min-w-0 text-left ${mode === "life" ? "text-teal-600" : "text-sky-600"}`}>
              {heroData.rotatingWords.map((word) => (
                <span key={word} className="col-start-1 row-start-1 invisible whitespace-nowrap">
                  {word}
                </span>
              ))}
              <span
                className="col-start-1 row-start-1 inline-block whitespace-nowrap"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "600px",
                  transform: flipping ? "rotateX(90deg)" : "rotateX(0deg)",
                  opacity: flipping ? 0 : 1,
                  transition: "transform 300ms ease-in, opacity 200ms ease-in",
                }}
              >
                {heroData.rotatingWords[wordIndex]}
              </span>
            </span>
          </span>
        </p>
      </div>
    </section>
  );
}
