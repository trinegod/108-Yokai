"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- The deployed Vinext client requires full document navigation between archive routes. */

import { usePathname } from "next/navigation";
import { LanguageToggle } from "./LanguageToggle";
import { useLocale } from "./LocaleProvider";

export function ArchiveNav() {
  const pathname = usePathname();
  const { dictionary } = useLocale();
  const links = [
    { href: "/archive", label: dictionary.nav.archive, mark: "一" },
    { href: "/atlas", label: dictionary.nav.atlas, mark: "二" },
    { href: "/chronicles", label: dictionary.nav.chronicles, mark: "三" },
    { href: "/about", label: dictionary.nav.about, mark: "四" },
  ];

  return (
    <header className="archive-header">
      <div className="archive-identity">
        <a className="archive-back" href="/" aria-label={dictionary.nav.returnLabel}>
          <span aria-hidden="true">←</span>
          Gate 01
        </a>
        <a className="archive-brand" href="/" aria-label="Ashigara — The Living Archive">
          <span className="archive-brand__seal" aria-hidden="true">足</span>
          <span>
            <strong>ASHIGARA</strong>
            <small>{dictionary.shell.brandSubtitle}</small>
          </span>
        </a>
        <LanguageToggle compact />
      </div>
      <nav aria-label={dictionary.nav.primaryLabel}>
        <ul className="archive-nav-list">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <a href={link.href} aria-current={active ? "page" : undefined}>
                  <span aria-hidden="true">{link.mark}</span>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
