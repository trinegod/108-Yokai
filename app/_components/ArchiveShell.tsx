import type { ReactNode } from "react";
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
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{introduction}</p>
        </header>
        {children}
      </main>
      <footer className="archive-footer">
        <span>ASHIGARA — The Living Archive</span>
        <span>Phase One · Local vertical slice</span>
      </footer>
    </div>
  );
}

