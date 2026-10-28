import Image from "next/image";
import { FileText, Mail } from "lucide-react";
import { type Translation } from "../data/i18n/en";
import { type SiteMode, type SiteLanguage } from "../types";
import { socialLinks } from "../data/social";

const MEDIA_PLATFORM_NAMES = ["YouTube", "Instagram", "TikTok", "RedNote"] as const;
const mediaPlatforms = socialLinks.filter((s) =>
  (MEDIA_PLATFORM_NAMES as readonly string[]).includes(s.name)
);

const linkedinUrl = socialLinks.find((s) => s.name === "LinkedIn")?.href ?? "#";
const githubUrl = socialLinks.find((s) => s.name === "GitHub")?.href ?? "#";
const xUrl = socialLinks.find((s) => s.name === "X")?.href ?? "#";
const emailHref = "mailto:xinyu.tian.phoenix@gmail.com";

// Restrained CTA pill: subtle grey border + white bg, lifts on hover like the
// other bento cards (matches the site's card-float interaction).
const ctaClass =
  "flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm text-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";

// lucide-react dropped brand icons, so render LinkedIn/GitHub as monochrome
// glyphs that inherit currentColor (grey → theme blue on hover, like the text).
function LinkedinGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function GithubGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
function XGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Render **bold** segments within a copy string as <strong>.
function renderWithBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-slate-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

export default function AboutSection({ t, mode, lang }: { t: Translation; mode: SiteMode; lang: SiteLanguage }) {
  const isLife = mode === "life";
  const focusAreas = isLife ? t.focusAreasLife : t.focusAreasWork;
  const stats = isLife ? t.about.statsLife : t.about.statsWork;
  const tagline = isLife ? t.about.taglineLife : t.about.taglineWork;
  const body = isLife ? t.about.bodyLife : t.about.bodyWork;
  // Lock the bio height to the (taller) EN rendering so the focus cards below
  // stay in the same position when switching EN/ZH (desktop split layout only).
  const bodyMinH = isLife ? "lg:min-h-[12rem]" : "lg:min-h-[11rem]";
  // ZH glyphs read smaller at the same px; nudge ZH body up a step so switching
  // languages barely changes the visual density.
  const bodyText = lang === "zh" ? "text-[17px]" : "text-base";
  const name = isLife ? t.about.nameLife : t.about.nameWork;
  const roleLine = isLife ? t.about.roleLineLife : t.about.roleLineWork;

  const accentText = isLife ? "text-teal-600" : "text-sky-600";
  const badgeBg = isLife ? "bg-teal-100/60 text-teal-700" : "bg-sky-100/60 text-sky-700";

  // Fixed-height shell for the bottom professional cards (uniform preview size).
  const workCard =
    "flex h-36 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md";

  return (
    <section id="about" className="scroll-mt-24 pt-4 pb-10">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <p className={`mb-8 text-center text-sm uppercase tracking-[0.32em] ${accentText}`}>
          {t.about.label}
        </p>

        {/* Outer container card wrapping all about cards — fixed height (work-EN reference) */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6 lg:min-h-[30rem]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[22rem_1fr] lg:gap-x-12">

          {/* LEFT COLUMN — portrait + identity (roles, status, platform links).
              Fixed 20rem width so the photo's 16px horizontal centering gap is constant;
              lg:pt-4 (16px) matches it, keeping the top gap == left gap at any width. */}
          <div className="flex flex-col gap-1 lg:pt-4">
            {/* Portrait */}
            <div className="mx-auto w-full max-w-[20rem] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <Image
                src={isLife ? "/images/Phoenix-Tian.jpg" : "/images/Xinyu-Tian.jpg"}
                alt={isLife ? "Phoenix Tian portrait" : "Xinyu Tian portrait"}
                width={600}
                height={600}
                className="block aspect-square w-full object-cover"
                priority
              />
            </div>
            {/* Identity — roles + status + platform links */}
            <div className="flex flex-1 flex-col justify-start gap-3 px-4 pb-4 pt-2 text-center">
              <div>
                <p className="text-2xl font-bold tracking-tight text-slate-950">{name}</p>
                <p className="mt-1 text-base text-slate-500">{roleLine}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {isLife ? (
                  <>
                    {mediaPlatforms.map((p) => (
                      <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className={ctaClass}>
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center [&_svg]:h-4 [&_svg]:w-4 [&>span]:h-4 [&>span]:w-4">
                          {p.icon}
                        </span>
                        {p.name}
                      </a>
                    ))}
                    <a href={emailHref} className={`${ctaClass} col-span-2`}>
                      <Mail className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                      {t.about.emailLabel}
                    </a>
                  </>
                ) : (
                  <>
                    <a href={t.about.resumeHref} download={t.about.resumeFileName} className={ctaClass}>
                      <FileText className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                      {t.about.downloadResume}
                    </a>
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={ctaClass}>
                      <LinkedinGlyph />
                      LinkedIn
                    </a>
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={ctaClass}>
                      <GithubGlyph />
                      GitHub
                    </a>
                    <a href={xUrl} target="_blank" rel="noopener noreferrer" className={ctaClass}>
                      <XGlyph />
                      X
                    </a>
                    <a href={emailHref} className={`${ctaClass} col-span-2`}>
                      <Mail className="h-4 w-4 shrink-0" strokeWidth={1.8} />
                      {t.about.emailLabel}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — bio + 2×2 professional cards */}
          <div className="flex flex-col gap-4">
            {/* Bio card (natural height) — borderless, blends into the outer card */}
            <div className="flex flex-col p-6">
              <p className={`mb-3 text-center text-base font-bold tracking-wide ${accentText}`}>
                {tagline}
              </p>
              <div className={`space-y-3 ${bodyMinH}`}>
                {body.map((paragraph, i) => (
                  <p key={i} className={`text-pretty text-justify leading-8 text-black ${bodyText}`}>
                    {renderWithBold(paragraph)}
                  </p>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {stats.map((badge) => (
                  <span key={badge} className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${badgeBg}`}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Focus / capability cards (fixed size) — px-6 matches the bio card's p-6 so the
                cards line up exactly with the bio text edges above */}
            <div className="grid grid-cols-2 gap-4 px-6">
              {focusAreas.map((area) => (
                <div key={area.title} className={workCard}>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl leading-none">{area.icon}</span>
                    <h3 className="font-semibold text-slate-950">{area.title}</h3>
                  </div>
                  <p className="line-clamp-3 text-sm leading-6 text-slate-500">{area.description}</p>
                </div>
              ))}
            </div>

            {/* Status line — bottom row of the right column (Life mode only) */}
            {isLife && (
              <div className="flex items-center justify-center gap-2 text-base text-slate-600">
                <span className="text-base leading-none" aria-hidden="true">👈</span>
                <span>{t.about.statusLife}</span>
              </div>
            )}
          </div>

        </div>
        </div>
      </div>
    </section>
  );
}
