export type SiteLanguage = "en" | "zh";
export type SiteMode = "work" | "life";

export const LOCALES: { code: SiteLanguage; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "zh", label: "简体中文", short: "简中" },
];
