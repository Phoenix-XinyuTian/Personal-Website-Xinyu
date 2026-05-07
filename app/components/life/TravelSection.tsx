import { type Translation } from "../../data/i18n/en";

export default function TravelSection({ t }: { t: Translation }) {
  return (
    <section id="travel" className="py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <p className="text-center text-sm uppercase tracking-[0.32em] text-teal-600">{t.travel.label}</p>
        <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.travel.heading}</h2>
        <p className="mt-5 text-base leading-8 text-slate-600">{t.travel.description}</p>

        <div className="mt-8 overflow-x-auto pb-2">
          <div className="flex w-max gap-5 pr-6">
            {t.travel.cards.map((card) => (
              <div key={card.title} className="w-[270px] shrink-0 snap-start rounded-3xl border border-teal-100 bg-white p-5 shadow-sm sm:w-[320px]">
                <div className="h-44 rounded-2xl bg-gradient-to-br from-teal-200 via-cyan-100 to-sky-200" />
                <p className="mt-4 text-lg font-semibold text-slate-950">{card.title}</p>
                <p className="mt-2 text-sm text-slate-600">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
