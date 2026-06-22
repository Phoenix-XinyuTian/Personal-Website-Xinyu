"use client";

import React from "react";
import { type Translation } from "../data/i18n/en";
import { type SiteMode } from "../types";

const NEWS_LINKS: Record<string, string> = {
  "NUS": "https://www.nus.edu.sg",
  "A*STAR": "https://www.a-star.edu.sg",
  "SWJTU": "https://www.swjtu.edu.cn",
  "YouTube channel": "https://www.youtube.com/@Phoenix_Tian",
  "YouTube 自媒体频道": "https://www.youtube.com/@Phoenix_Tian",
};

function renderTitleWithLinks(title: string, mode: "work" | "life"): React.ReactNode[] {
  const keywords = Object.keys(NEWS_LINKS).sort((a, b) => b.length - a.length);
  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = title.split(regex);
  const colorClass = mode === "life" ? "text-teal-600 hover:text-teal-800" : "text-sky-600 hover:text-sky-800";

  return parts.map((part, i) => {
    if (NEWS_LINKS[part]) {
      return (
        <a
          key={i}
          href={NEWS_LINKS[part]}
          target="_blank"
          rel="noopener noreferrer"
          className={`${colorClass} font-medium hover:underline transition-colors`}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function NewsSection({
  t,
  mode,
}: {
  t: Translation;
  mode: SiteMode;
  lang: "en" | "zh";
}) {
  const raw = mode === "life" ? t.news.lifeItems : t.news.workItems;
  const sortedItems = [...raw].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section id="news" className="scroll-mt-24 px-6 pt-2 pb-6 sm:px-8 sm:pb-8">
      <div className="mx-auto max-w-3xl">
        <p className={`text-center text-sm uppercase tracking-[0.32em] ${mode === "life" ? "text-teal-600" : "text-sky-600"}`}>
          {t.news.label}
        </p>

        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <ul className="mx-auto flex w-fit flex-col gap-3">
            {sortedItems.map((item, idx) => {
              const isNew = idx === 0;
              const [year, month] = item.date.split("-");
              const formattedDate = `${month}/${year}`;
              return (
                <li key={`${item.date}-${idx}`} className="flex items-center gap-3">
                  <span className={`shrink-0 h-2 w-2 rounded-full ${mode === "life" ? "bg-teal-500" : "bg-sky-500"}`} />
                  <span className={`shrink-0 w-[68px] font-mono text-sm font-semibold ${mode === "life" ? "text-teal-600" : "text-sky-600"}`}>
                    {formattedDate}
                  </span>
                  <span className="shrink-0 w-10 flex justify-center">
                    {isNew && (
                      <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${mode === "life" ? "bg-teal-100 text-teal-700" : "bg-sky-100 text-sky-700"}`}>
                        {t.news.newBadge}
                      </span>
                    )}
                  </span>
                  <span className="text-[15px] leading-7 text-slate-800">
                    {renderTitleWithLinks(item.title, mode)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
