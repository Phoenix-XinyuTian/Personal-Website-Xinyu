import { type Translation } from "../data/i18n/en";
import { type SiteMode } from "../types";
import { socialLinks } from "../data/social";

export default function ContactSection({ t, mode }: { t: Translation; mode: SiteMode }) {
  return (
    <section id="contact" className="px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className={`text-center text-sm uppercase tracking-[0.32em] ${mode === "life" ? "text-teal-600" : "text-sky-600"}`}>{t.contact.label}</p>
            <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.contact.heading}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">{t.contact.description}</p>
          </div>

          <div className="space-y-6 text-sm text-slate-600">
            <div>
              <p className="mb-4 font-semibold text-slate-950">{t.contact.emailLabel}</p>
              <a href="mailto:xinyu.tian.phoenix@gmail.com" className={mode === "life" ? "text-teal-600 hover:text-teal-800" : "text-sky-600 hover:text-sky-800"}>
                {t.contactCard.email}
              </a>
            </div>

            <div>
              <p className="mb-4 font-semibold text-slate-950">{t.contact.connectLabel}</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100 hover:shadow-md"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#top"
              className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md"
            >
              {t.contact.back}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
