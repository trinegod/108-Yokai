import type { ReactNode } from "react";
import Link from "next/link";
import { ArchiveNav } from "./ArchiveNav";

type ArchiveShellProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  children: ReactNode;
};

export function ArchiveShell({ eyebrow, title, introduction, children }: ArchiveShellProps) {
  return (
    <div className="archive-space">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ArchiveNav />
      <main id="main-content" className="archive-main">
        <header className="route-intro">
          <p className="eyebrow"><span>Gate 01</span>{eyebrow}</p>
          <h1>{title}</h1>
          <p>{introduction}</p>
        </header>
        {children}
      </main>
      <footer className="archive-footer">
        <Link className="archive-footer__threshold" href="/" prefetch={false}>← Return to Gate 01</Link>
        <span>ASHIGARA — The Living Archive</span>
        <span>Website created by Steven Adkins</span>
        <span>Phase One · Evolving vertical slice</span>
      </footer>
    </div>
  );
}
