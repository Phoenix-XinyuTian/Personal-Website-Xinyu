"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { experiences, type ExperienceItem } from "../../data/experience";
import { type SiteLanguage } from "../../types";
import { type Translation } from "../../data/i18n/en";
import { SkillTag } from "../ui/SkillChip";

function ExperienceCard({
  item,
  lang,
  onOpenLightbox,
}: {
  item: ExperienceItem;
  lang: SiteLanguage;
  onOpenLightbox: (src: string) => void;
}) {
  const local = item.i18n[lang];
  const hasMedia = item.media.length > 0;
  const [logoError, setLogoError] = useState(false);

  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        {item.logoSrc && !logoError ? (
          <a href={item.website} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:h-14 sm:w-14">
            <img src={item.logoSrc} alt={local.company} className="h-full w-full object-contain" onError={() => setLogoError(true)} />
          </a>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 sm:h-14 sm:w-14">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-sky-700 sm:text-sm">{item.fallback}</span>
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-950 sm:text-xl">
            <a href={item.website} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">{local.title}</a>
          </h3>
          <p className="mt-0.5 text-sm text-slate-700 sm:text-base">
            <a href={item.website} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors">{local.company}</a>
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              {local.period ?? `${item.startDate} – ${item.endDate}`}
            </span>
            <span className="text-xs text-slate-500 sm:text-sm">{local.location}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={`mt-5 ${hasMedia ? "grid gap-6 lg:grid-cols-[3fr_2fr]" : ""}`}>
        {/* Bullets */}
        <ul className="space-y-3">
          {local.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-7 text-slate-950">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
              {bullet.text}
            </li>
          ))}
        </ul>

        {/* Media */}
        {hasMedia && (
          <div className="space-y-4">
            {item.media.map((m, i) => {
              if (m.type === "image") {
                return (
                  <div
                    key={i}
                    className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-slate-200"
                    onClick={() => onOpenLightbox(m.src)}
                  >
                    <div className="aspect-[4/3] bg-slate-100">
                      <img src={m.src} alt={m.alt} className="h-full w-full object-cover" />
                    </div>
                    {m.caption && (
                      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 px-3 py-2 text-xs text-white transition-transform duration-200 group-hover:translate-y-0">
                        {m.caption}
                      </div>
                    )}
                  </div>
                );
              }
              if (m.type === "metric") {
                return (
                  <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{m.label}</p>
                    <p className="mt-1 text-3xl font-bold text-sky-600">{m.value}</p>
                    {m.sublabel && <p className="mt-0.5 text-xs text-slate-500">{m.sublabel}</p>}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>

      {/* Tech tags */}
      {item.techStack.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5 border-t border-slate-100 pt-5">
          {item.techStack.map((tag) => (
            <SkillTag key={tag} name={tag} />
          ))}
        </div>
      )}
    </article>
  );
}

export default function ExperienceSection({ t, language }: { t: Translation; language: SiteLanguage }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxSrc(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxSrc]);

  return (
    <section id="experience" className="px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm uppercase tracking-[0.32em] text-sky-600">{t.experience.label}</p>
        <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {t.experience.heading}
        </h2>
        <div className="mt-10 space-y-6">
          {experiences.map((item) => (
            <ExperienceCard key={item.id} item={item} lang={language} onOpenLightbox={setLightboxSrc} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 [animation:lang-dropdown-in_0.15s_ease-out]"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <img
            src={lightboxSrc}
            alt=""
            className="max-h-[90vh] max-w-full rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setLightboxSrc(null)}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
