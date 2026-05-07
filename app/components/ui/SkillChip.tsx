import { skillMap, type SkillItem } from "../../data/skills";

export function SkillChip({ skill }: { skill: SkillItem }) {
  return (
    <div className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:scale-105 hover:shadow-md sm:px-3 sm:py-1.5 sm:text-sm">
      {skill.path && skill.hex && (
        <svg
          role="img"
          viewBox="0 0 24 24"
          aria-label={skill.name}
          className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
          style={{ fill: `#${skill.hex}` }}
        >
          <path d={skill.path} />
        </svg>
      )}
      <span>{skill.name}</span>
    </div>
  );
}

export function SkillTag({ name }: { name: string }) {
  const skill = skillMap[name];
  return (
    <div className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600 transition hover:-translate-y-0.5 hover:shadow-md sm:px-3 sm:py-1">
      {skill?.path && skill?.hex && (
        <svg
          role="img"
          viewBox="0 0 24 24"
          aria-label={name}
          className="h-3 w-3 shrink-0"
          style={{ fill: `#${skill.hex}` }}
        >
          <path d={skill.path} />
        </svg>
      )}
      <span>{name}</span>
    </div>
  );
}
