"use client";

import { useLocale } from "./LocaleProvider";

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, dictionary, setLocale } = useLocale();

  return (
    <div className={`language-switch${compact ? " language-switch--compact" : ""}`} role="group" aria-label={dictionary.language.label}>
      <button type="button" aria-pressed={locale === "en"} onClick={() => setLocale("en")} lang="en">
        {dictionary.language.english}
      </button>
      <button type="button" aria-pressed={locale === "ja"} onClick={() => setLocale("ja")} lang="ja">
        {dictionary.language.japanese}
      </button>
      {locale === "ja" ? <span className="language-switch__status" role="status">仮訳</span> : null}
    </div>
  );
}
