"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- The deployed Vinext client requires full document navigation between archive routes. */

import { usePathname } from "next/navigation";
import locale from "@/content/locales/en.json";

const links = [
  { href: "/archive", label: locale.nav.archive, mark: "一" },
  { href: "/atlas", label: locale.nav.atlas, mark: "二" },
  { href: "/chronicles", label: locale.nav.chronicles, mark: "三" },
  { href: "/about", label: locale.nav.about, mark: "四" },
];

export function ArchiveNav() {
  const pathname = usePathname();

  return (
    <header className="archive-header">
      <div className="archive-identity">
        <a className="archive-back" href="/" aria-label="Return to Gate 01, Ashigara">
          <span aria-hidden="true">←</span>
          Gate 01
        </a>
        <a className="archive-brand" href="/" aria-label="Ashigara — The Living Archive">
          <span className="archive-brand__seal" aria-hidden="true">足</span>
          <span>
            <strong>ASHIGARA</strong>
            <small>The Living Archive</small>
          </span>
        </a>
      </div>
      <nav aria-label="Primary archive navigation">
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
