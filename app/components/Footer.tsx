import { type Translation } from "../data/i18n/en";

export default function Footer({ t }: { t: Translation }) {
  return (
    <footer className="border-t border-slate-200/60 px-6 pb-12 pt-10 sm:px-8">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-2.5 text-center">
        <p
          className="text-sm font-semibold tracking-widest uppercase"
          style={{
            backgroundImage: "linear-gradient(to right, #38bdf8 0%, #818cf8 26%, #fbbf24 55%, #f97316 78%, #ef4444 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Xinyu Tian · Phoenix
        </p>

        <p className="text-sm text-slate-500">{t.footer.roles}</p>

        <p className="text-sm italic text-slate-400">{t.footer.tagline}</p>

        <p className="text-sm text-slate-500">
          📧 {t.footer.collaborationLabel}:{" "}
          <a href={`mailto:${t.footer.email}`} className="text-sky-600 transition hover:text-sky-800">
            {t.footer.email}
          </a>
        </p>

        <div className="my-1.5 h-px w-12 bg-slate-200" />

        <p className="text-xs text-slate-400">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
