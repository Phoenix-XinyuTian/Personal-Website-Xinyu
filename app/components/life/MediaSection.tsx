import { type Translation } from "../../data/i18n/en";
import { socialLinks } from "../../data/social";
import YoutubeGallery from "./YoutubeGallery";

const SOCIAL_NAME_ALIAS: Record<string, string> = {
  小红书: "RedNote",
};

const PLATFORM_HREFS: Record<string, string> = {
  YouTube: "https://www.youtube.com/@Phoenix_Tian",
  Instagram: "https://www.instagram.com/phoenix.tian.vlog/",
  X: "https://x.com/Xinyu_Tian_AI",
  RedNote: "https://www.xiaohongshu.com/user/profile/5f1b2b3c0000000001004b2e",
  小红书: "https://www.xiaohongshu.com/user/profile/5f1b2b3c0000000001004b2e",
};

export default function MediaSection({
  t,
  lang,
}: {
  t: Translation;
  lang: "en" | "zh";
}) {
  return (
    <section id="media" className="px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <p className="text-center text-sm uppercase tracking-[0.32em] text-teal-600">
          {t.media.label}
        </p>
        <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {t.media.heading}
        </h2>
        <p className="mt-4 text-center text-base leading-8 text-slate-500">
          {t.media.description}
        </p>

        {/* Platform pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {t.media.matrix.map((item) => {
            const socialName = SOCIAL_NAME_ALIAS[item.name] ?? item.name;
            const social = socialLinks.find((s) => s.name === socialName);
            const href = PLATFORM_HREFS[item.name] ?? "#";
            return (
              <a
                key={item.name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm hover:border-teal-400 hover:shadow-md transition-all duration-200"
              >
                {social && (
                  <span className="shrink-0 flex h-5 w-5 items-center justify-center">
                    {social.icon}
                  </span>
                )}
                <span className="text-sm font-medium text-slate-700 group-hover:text-teal-700 transition-colors">
                  {item.name}
                </span>
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-3 w-3 text-slate-300 group-hover:text-teal-500 transition-colors"
                >
                  <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
                </svg>
              </a>
            );
          })}
        </div>

        {/* Video gallery */}
        <div className="mt-10 rounded-3xl border border-teal-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <svg viewBox="0 0 24 24" fill="#FF0000" className="h-5 w-5 shrink-0" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <p className="text-sm font-semibold text-slate-800 tracking-wide">
              {t.media.featuredVideosLabel}
            </p>
            <a
              href="https://www.youtube.com/@Phoenix_Tian"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs text-slate-400 hover:text-teal-600 transition-colors"
            >
              @Phoenix_Tian ↗
            </a>
          </div>
          <YoutubeGallery lang={lang} newestLabel={t.media.newestVideoLabel} playHintLabel={t.media.playHint} />
        </div>
      </div>
    </section>
  );
}
