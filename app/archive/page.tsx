import type { Metadata } from "next";
import { Suspense } from "react";
import { ArchiveIndex } from "../_components/ArchiveIndex";
import { ArchiveShell } from "../_components/ArchiveShell";
import { records, sources } from "@/content";
import en from "@/content/locales/en.json";
import ja from "@/content/locales/ja.json";

export const metadata: Metadata = {
  title: "Living Index",
  description: "Browse source-conscious records from the evolving ASHIGARA folklore archive.",
};

export default function ArchivePage() {
  return (
    <ArchiveShell
      eyebrow={{ en: en.archive.eyebrow, ja: ja.archive.eyebrow }}
      title={{ en: en.archive.title, ja: ja.archive.title }}
      introduction={{ en: en.archive.introduction, ja: ja.archive.introduction }}
    >
      <Suspense fallback={<p className="route-loading">Preparing the index…</p>}>
        <ArchiveIndex records={records} sources={sources} />
      </Suspense>
    </ArchiveShell>
  );
}
