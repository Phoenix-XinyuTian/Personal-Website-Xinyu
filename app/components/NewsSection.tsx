"use client";

import { type Translation } from "../data/i18n/en";
import { type SiteMode } from "../types";

function formatDate(dateStr: string, lang: "en" | "zh"): string {
  const d = new Date(dateStr + "-01");
  if (lang === "zh") {
    return `${d.getFullYear()}年${d.getMonth() + 1}月`;
  }
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function NewsSection({
  t,
  mode,
  lang,
}: {
  t: Translation;
  mode: SiteMode;
  lang: "en" | "zh";
}) {
  const accent = mode === "life" ? "text-teal-600" : "text-sky-600";
  const dotBg = mode === "life" ? "bg-teal-500" : "bg-sky-500";
  const lineBg = mode === "life" ? "bg-teal-200" : "bg-sky-200";
  const badgeBg = mode === "life" ? "bg-teal-100 text-teal-700" : "bg-sky-100 text-sky-700";

  const raw = mode === "life" ? t.news.lifeItems : t.news.workItems;
  const now = Date.now();
  const newThreshold = 90 * 24 * 60 * 60 * 1000;

  const sortedItems = [...raw].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section id="news" className="px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <p className={`text-center text-sm uppercase tracking-[0.32em] ${accent}`}>
          {t.news.label}
        </p>
        <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {t.news.heading}
        </h2>

        <div className="mt-12 relative mx-auto max-w-md">
          <div className={`absolute left-[7px] top-2 bottom-2 w-[1.5px] ${lineBg}`} />
          <ul className="space-y-7">
            {sortedItems.map((item, idx) => {
              const isNew = now - new Date(item.date + "-01").getTime() < newThreshold;
              return (
                <li
                  key={`${item.date}-${idx}`}
                  className="relative pl-8 motion-safe:animate-[fadeInUp_0.5s_ease-out_both]"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <span className={`absolute left-0 top-1.5 h-4 w-4 rounded-full ring-4 ring-white ${dotBg}`} />
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold uppercase tracking-widest ${accent}`}>
                      {formatDate(item.date, lang)}
                    </span>
                    {isNew && (
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide ${badgeBg}`}>
                        {t.news.newBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-base leading-7 text-slate-800">{item.title}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
