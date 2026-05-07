import Image from "next/image";
import { type Translation } from "../data/i18n/en";
import { type SiteMode } from "../types";

export default function AboutSection({
  t,
  focusAreas,
  mode,
}: {
  t: Translation;
  focusAreas: Translation["focusAreas"];
  mode: SiteMode;
}) {
  return (
    <section id="about" className="pt-8 pb-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-10">
          <p className={`text-center text-sm uppercase tracking-[0.32em] ${mode === "life" ? "text-teal-600" : "text-sky-600"}`}>{t.about.label}</p>
          <h2 className="mt-4 text-center text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.about.heading}</h2>
          <p className="mt-6 text-pretty text-base leading-8 text-slate-600">{t.about.body}</p>
        </div>

        <div className="grid w-full grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <div className="grid grid-cols-1 gap-4">
              {focusAreas.map((area) => (
                <div key={area.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-950">{area.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full shrink-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm lg:mt-1">
            <Image src="/images/portrait.jpeg" alt="Xinyu Tian portrait" width={600} height={600} className="h-full w-full object-cover" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
