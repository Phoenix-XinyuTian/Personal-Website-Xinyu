import { type Translation } from "../../data/i18n/en";

export default function LifeSection({ t }: { t: Translation }) {
  return (
    <section id="life" className="py-20 px-6 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm uppercase tracking-[0.32em] text-teal-600">{t.gallery.label}</p>
        <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.gallery.heading}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.lifeHighlights.map((item) => (
            <div key={item} className="rounded-[2rem] border border-teal-100 bg-white p-8 shadow-sm">
              <p className="text-base font-semibold text-slate-950">{item}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{t.gallery.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
