"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import en from "@/content/locales/en.json";
import ja from "@/content/locales/ja.json";

export type SiteLocale = "en" | "ja";
export type LocaleDictionary = typeof en;

type LocaleContextValue = {
  locale: SiteLocale;
  dictionary: LocaleDictionary;
  setLocale: (locale: SiteLocale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const storageKey = "ashigara-language";

export function LocaleProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale: SiteLocale }) {
  const [locale, setLocaleState] = useState<SiteLocale>(initialLocale);

  const setLocale = useCallback((nextLocale: SiteLocale) => {
    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale;
    document.documentElement.dataset.locale = nextLocale;
    document.cookie = `${storageKey}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    try {
      window.localStorage.setItem(storageKey, nextLocale);
    } catch {
      // A denied storage preference must not block the bilingual interface.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    dictionary: (locale === "ja" ? ja : en) as LocaleDictionary,
    setLocale,
  }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
