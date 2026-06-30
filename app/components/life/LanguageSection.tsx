import { type Translation } from "../../data/i18n/en";
import CN from "country-flag-icons/react/3x2/CN";
import GB from "country-flag-icons/react/3x2/GB";
import HK from "country-flag-icons/react/3x2/HK";
import JP from "country-flag-icons/react/3x2/JP";

const FLAG_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = { CN, GB, HK, JP };

export default function LanguageSection({ t }: { t: Translation }) {
  const groups = [
    { key: "proficient", label: t.languages.groups.proficient, items: t.languages.proficient },
    { key: "learning", label: t.languages.groups.learning, items: t.languages.learning },
  ] as const;

  return (
    <section id="languages" className="px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm uppercase tracking-[0.32em] text-teal-600">{t.languages.label}</p>
        <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {t.languages.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-4xl text-center text-base leading-8 text-slate-500">
          {t.languages.description}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.key} className="rounded-[2rem] border border-teal-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.24em] text-teal-600">
                {group.label}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {group.items.map((lang) => {
                  const Flag = FLAG_COMPONENTS[lang.flag];
                  return (
                    <div
                      key={lang.name}
                      className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:scale-105 hover:shadow-md sm:px-3 sm:py-1.5 sm:text-sm"
                    >
                      {Flag ? <Flag className="h-4 w-auto rounded-sm ring-2 ring-inset ring-slate-400" /> : null}
                      {lang.name} · {lang.level}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
