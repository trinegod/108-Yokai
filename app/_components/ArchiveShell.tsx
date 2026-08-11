"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- The deployed Vinext client requires full document navigation back to the threshold. */
import type { ReactNode } from "react";
import { ArchiveNav } from "./ArchiveNav";
import { useLocale } from "./LocaleProvider";

export type LocalizedCopy = { en: string; ja: string };

type ArchiveShellProps = {
  eyebrow: LocalizedCopy;
  title: LocalizedCopy;
  introduction: LocalizedCopy;
  children: ReactNode;
};

export function ArchiveShell({ eyebrow, title, introduction, children }: ArchiveShellProps) {
  const { locale, dictionary } = useLocale();

  return (
    <div className="archive-space" lang={locale}>
      <a className="skip-link" href="#main-content">{dictionary.shell.skip}</a>
      <ArchiveNav />
      <main id="main-content" className="archive-main">
        <header className="route-intro">
          <p className="eyebrow"><span>{dictionary.siteKicker}</span>{eyebrow[locale]}</p>
          <h1>{title[locale]}</h1>
          <p>{introduction[locale]}</p>
        </header>
        {children}
      </main>
      <footer className="archive-footer">
        <a className="archive-footer__threshold" href="/">← {dictionary.shell.return}</a>
        <span>ASHIGARA — {dictionary.shell.brandSubtitle}</span>
        <span>{dictionary.creator}</span>
        <span>{dictionary.shell.phase}</span>
      </footer>
    </div>
  );
}
