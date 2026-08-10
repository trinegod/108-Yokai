import type { Metadata } from "next";
import { Suspense } from "react";
import { ArchiveIndex } from "../_components/ArchiveIndex";
import { ArchiveShell } from "../_components/ArchiveShell";
import { records, sources } from "@/content";

export const metadata: Metadata = {
  title: "Living Index",
  description: "Browse source-conscious records from the evolving ASHIGARA folklore archive.",
};

export default function ArchivePage() {
  return (
    <ArchiveShell
      eyebrow="Archive chamber · 01"
      title="The Living Index"
      introduction="Ten connected records form a small, source-conscious vertical slice. Search names, places, motifs, or browse by entity class; each record keeps tradition separate from original ASHIGARA canon."
    >
      <Suspense fallback={<p className="route-loading">Preparing the index…</p>}>
        <ArchiveIndex records={records} sources={sources} />
      </Suspense>
    </ArchiveShell>
  );
}

