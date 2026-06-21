"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { LOCALES, type SiteLanguage } from "../../types";

export default function LanguageDropdown({
  language,
  onSelect,
  triggerClassName,
  contentDark = false,
  showFullLabel = false,
}: {
  language: SiteLanguage;
  onSelect: (lang: SiteLanguage) => void;
  triggerClassName?: string;
  contentDark?: boolean;
  showFullLabel?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((l) => l.code === language) ?? LOCALES[0]!;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={triggerClassName ?? "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 sm:px-1 font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-100"}
      >
        <Globe className={`h-4 w-4 shrink-0 ${contentDark ? "text-black" : "text-slate-500"}`} strokeWidth={1.8} />
        <span className={`${showFullLabel ? "inline" : "hidden sm:inline"} text-[13px] font-normal ${contentDark ? "text-black" : "text-slate-500"}`}>
          {showFullLabel ? current.label : current.short}
        </span>
        <ChevronDown
          className={`${showFullLabel ? "block" : "hidden sm:block"} h-3 w-3 shrink-0 transition-transform duration-150 ${contentDark ? "text-black" : "text-slate-400"} ${open ? "rotate-180" : ""}`}
          strokeWidth={2.5}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full z-50 mt-1.5 w-max rounded-2xl border border-slate-200 bg-white p-1.5 shadow-lg [animation:lang-dropdown-in_0.13s_ease-out]"
        >
          {LOCALES.map((locale) => {
            const isCurrent = locale.code === language;
            return (
              <button
                key={locale.code}
                role="option"
                aria-selected={isCurrent}
                type="button"
                disabled={isCurrent}
                onClick={() => { onSelect(locale.code); setOpen(false); }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  isCurrent
                    ? "cursor-default font-semibold text-sky-600"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center text-sky-600">
                  {isCurrent && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                </span>
                {locale.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
