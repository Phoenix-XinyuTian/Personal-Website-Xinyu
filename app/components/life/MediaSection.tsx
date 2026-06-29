import { type Translation } from "../../data/i18n/en";
import { socialLinks } from "../../data/social";
import YoutubeGallery from "./YoutubeGallery";

const INTERNATIONAL_PLATFORMS = ["YouTube", "TikTok", "Instagram"] as const;
const CHINESE_PLATFORMS = ["RedNote", "Bilibili", "Douyin"] as const;

// Localized labels shown beside each platform logo. The Chinese platforms get
// their native names when the site is in Chinese.
const PLATFORM_LABELS: Record<string, { en: string; zh: string }> = {
  YouTube: { en: "YouTube", zh: "YouTube" },
  TikTok: { en: "TikTok", zh: "TikTok" },
  Instagram: { en: "Instagram", zh: "Instagram" },
  RedNote: { en: "RedNote", zh: "小红书" },
  Bilibili: { en: "Bilibili", zh: "哔哩哔哩" },
  Douyin: { en: "Douyin", zh: "抖音" },
};

function PlatformCard({
  title,
  names,
  lang,
}: {
  title: string;
  names: readonly string[];
  lang: "en" | "zh";
}) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/30 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-center text-lg font-semibold tracking-wide text-slate-900">
        {title}
      </h3>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        {names.map((name) => {
          const social = socialLinks.find((s) => s.name === name);
          if (!social) return null;
          const label = PLATFORM_LABELS[name]?.[lang] ?? name;
          return (
            <a
              key={name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400 hover:shadow-md"
            >
              <span className="shrink-0 flex h-6 w-6 items-center justify-center [&_svg]:h-6 [&_svg]:w-6 [&>span]:h-6 [&>span]:w-6">
                {social.icon}
              </span>
              <span className="text-[15px] font-medium text-slate-700 group-hover:text-teal-700 transition-colors">
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

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

        {/* Platform cards: international (left) + Chinese (right) */}
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          <PlatformCard title={t.media.internationalLabel} names={INTERNATIONAL_PLATFORMS} lang={lang} />
          <PlatformCard title={t.media.chineseLabel} names={CHINESE_PLATFORMS} lang={lang} />
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
