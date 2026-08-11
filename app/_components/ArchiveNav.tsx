"use client";

import Link from "next/link";
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
        <Link className="archive-back" href="/" prefetch={false} aria-label="Return to Gate 01, Ashigara">
          <span aria-hidden="true">←</span>
          Gate 01
        </Link>
        <Link className="archive-brand" href="/" prefetch={false} aria-label="Ashigara — The Living Archive">
          <span className="archive-brand__seal" aria-hidden="true">足</span>
          <span>
            <strong>ASHIGARA</strong>
            <small>The Living Archive</small>
          </span>
        </Link>
      </div>
      <nav aria-label="Primary archive navigation">
        <ul className="archive-nav-list">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link href={link.href} prefetch={false} aria-current={active ? "page" : undefined}>
                  <span aria-hidden="true">{link.mark}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
