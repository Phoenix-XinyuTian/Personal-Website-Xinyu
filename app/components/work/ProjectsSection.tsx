import { projects } from "../../data/projects";
import { type SiteLanguage } from "../../types";
import { type Translation } from "../../data/i18n/en";

export default function ProjectsSection({ t, language }: { t: Translation; language: SiteLanguage }) {
  return (
    <section id="projects" className="px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="w-full text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-sky-600">{t.nav.projects}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{t.projectsHeading}</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project) => {
            const local = project.i18n[language];
            return (
              <article
                key={project.id}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-slate-950">{local.title}</h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                    {t.projectBadge}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{local.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {local.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={project.href} className="mt-6 inline-flex text-sm font-semibold text-sky-600 transition hover:text-sky-800">
                  {t.viewDetails}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
