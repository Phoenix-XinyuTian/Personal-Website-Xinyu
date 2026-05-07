import { programmingSkills, cvmlSkills, toolsSkills } from "../../data/skills";
import { type Translation } from "../../data/i18n/en";
import { SkillChip } from "../ui/SkillChip";

export default function SkillsSection({ t }: { t: Translation }) {
  const groups = [
    { key: "programming", label: t.skills.groups.programming, skills: programmingSkills },
    { key: "cvml", label: t.skills.groups.cvml, skills: cvmlSkills },
    { key: "tools", label: t.skills.groups.tools, skills: toolsSkills },
  ] as const;

  return (
    <section id="skills" className="px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm uppercase tracking-[0.32em] text-sky-600">{t.skills.label}</p>
        <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {t.skills.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.key} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
              {t.skills.groups.languages}
            </h3>
            <div className="flex flex-wrap gap-2">
              {t.skills.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:scale-105 hover:shadow-md sm:px-3 sm:py-1.5 sm:text-sm"
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  {lang.name} · {lang.level}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
