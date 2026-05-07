import { type Translation } from "../../data/i18n/en";

export default function MediaSection({ t }: { t: Translation }) {
  return (
    <section id="media" className="px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm uppercase tracking-[0.32em] text-teal-600">{t.media.label}</p>
        <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.media.heading}</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{t.media.description}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid gap-4">
            {t.media.matrix.map((item) => (
              <div key={item.name} className="rounded-3xl border border-teal-100 bg-white px-6 py-5 shadow-sm">
                <p className="text-base font-semibold text-slate-950">{item.name}</p>
                <p className="mt-2 text-sm text-slate-600">{item.role}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-600">{t.media.featuredLabel}</p>
            <div className="mt-4 rounded-2xl bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-700 p-6 text-white">
              <p className="text-xl font-semibold">{t.media.featuredMain.title}</p>
              <p className="mt-3 text-sm text-teal-100">{t.media.featuredMain.description}</p>
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-teal-600">{t.media.clipsLabel}</p>
            <div className="mt-4 space-y-3">
              {t.media.clips.map((clip, idx) => (
                <div key={clip} className="flex items-center gap-3 rounded-xl border border-teal-100 bg-teal-50/60 px-4 py-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">{idx + 1}</span>
                  <p className="text-sm text-slate-700">{clip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
