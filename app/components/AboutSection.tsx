import Image from "next/image";
import { type Translation } from "../data/i18n/en";
import { type SiteMode } from "../types";
import EntityLogo from "./ui/EntityLogo";
import { socialLinks } from "../data/social";

const MEDIA_PLATFORM_NAMES = ["YouTube", "Instagram", "X", "RedNote"] as const;
const mediaPlatforms = socialLinks.filter((s) =>
  (MEDIA_PLATFORM_NAMES as readonly string[]).includes(s.name)
);

export default function AboutSection({ t, mode }: { t: Translation; mode: SiteMode }) {
  const isLife = mode === "life";
  const focusAreas = isLife ? t.focusAreasLife : t.focusAreasWork;
  const stats = isLife ? t.about.statsLife : t.about.statsWork;

  const accentText = isLife ? "text-teal-600" : "text-sky-600";
  const badgeBg = isLife ? "bg-teal-100/60 text-teal-700" : "bg-sky-100/60 text-sky-700";

  return (
    <section id="about" className="pt-8 pb-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <p className={`mb-4 text-center text-sm uppercase tracking-[0.32em] ${accentText}`}>
          {t.about.label}
        </p>
        <h2 className="mb-8 text-center text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {t.about.heading}
        </h2>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* Photo — spans rows 1-2 on desktop */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm lg:row-span-2">
            <Image
              src="/images/portrait.jpeg"
              alt="Xinyu Tian portrait"
              width={600}
              height={600}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          {/* Bio card — col-span-2 on desktop */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
            <p className={`mb-3 text-xs font-medium uppercase tracking-widest ${accentText}`}>
              {t.about.tagline}
            </p>
            <div className="space-y-3">
              {t.about.body.map((paragraph, i) => (
                <p key={i} className="text-pretty text-base leading-8 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {stats.map((badge) => (
                <span key={badge} className={`rounded-full px-3 py-1 text-xs font-medium ${badgeBg}`}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Stats row — col-span-2 on desktop */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {isLife ? (
              <>
                {/* Creator followers card */}
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-3xl font-bold text-teal-600">{t.about.followersCount}</p>
                    <p className="text-sm text-slate-500">{t.about.followersLabel}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    {mediaPlatforms.map((p) => (
                      <a
                        key={p.name}
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={p.name}
                        className="flex items-center justify-center transition hover:opacity-75 [&_svg]:h-7 [&_svg]:w-7"
                      >
                        {p.name === "RedNote" ? (
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF2442] p-1">
                            <img
                              src="https://cdn.simpleicons.org/xiaohongshu/ffffff"
                              alt="Rednote"
                              className="h-full w-full"
                            />
                          </span>
                        ) : (
                          p.icon
                        )}
                      </a>
                    ))}
                  </div>
                </div>
                {/* Travel card */}
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <span className="text-2xl leading-none">🌍</span>
                  <div>
                    <p className="text-3xl font-bold text-teal-600">{t.about.travelCount}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{t.about.travelLabel}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <a
                  href="https://www.a-star.edu.sg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <EntityLogo
                    src="/logos/ASTAR.jpeg"
                    alt="A*STAR logo"
                    fallback="A*"
                    bgClass="bg-red-50"
                    textClass="text-red-700"
                    borderClass="border-red-200"
                    className="h-12 w-12 shrink-0 rounded-xl"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">A*STAR</p>
                    <p className="mt-0.5 text-xs text-slate-500">Research Intern</p>
                  </div>
                </a>
                <a
                  href="https://www.nus.edu.sg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <EntityLogo
                    src="/logos/NUS.jpeg"
                    alt="NUS logo"
                    fallback="NUS"
                    bgClass="bg-[#F36F21]/12"
                    textClass="text-[#F36F21]"
                    borderClass="border-[#F36F21]/25"
                    className="h-12 w-12 shrink-0 rounded-xl"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">NUS</p>
                    <p className="mt-0.5 text-xs text-slate-500">MSc Physics</p>
                  </div>
                </a>
              </>
            )}
          </div>

          {/* Focus areas — full width row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-3">
            {focusAreas.map((area) => (
              <div key={area.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl leading-none">{area.icon}</span>
                  <h3 className="font-semibold text-slate-950">{area.title}</h3>
                </div>
                <p className="text-sm leading-6 text-slate-600">{area.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
