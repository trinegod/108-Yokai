"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import locale from "@/content/locales/en.json";

const links = [
  { href: "/", label: locale.nav.threshold, mark: "一" },
  { href: "/archive", label: locale.nav.archive, mark: "二" },
  { href: "/atlas", label: locale.nav.atlas, mark: "三" },
  { href: "/chronicles", label: locale.nav.chronicles, mark: "四" },
  { href: "/about", label: locale.nav.about, mark: "五" },
];

export function ArchiveNav() {
  const pathname = usePathname();

  return (
    <header className="archive-header">
      <Link className="archive-brand" href="/" prefetch={false} aria-label="Return to the Ashigara threshold">
        <span className="archive-brand__seal" aria-hidden="true">足</span>
        <span>
          <strong>ASHIGARA</strong>
          <small>The Living Archive</small>
        </span>
      </Link>
      <nav aria-label="Primary archive navigation">
        <ul className="archive-nav-list">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
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
