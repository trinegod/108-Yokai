import type { Metadata } from "next";
import { ArchiveShell } from "../_components/ArchiveShell";
import { ChroniclesContent } from "../_components/ChroniclesContent";
import { chronicles, recordsById, sources } from "@/content";
import en from "@/content/locales/en.json";
import ja from "@/content/locales/ja.json";

export const metadata: Metadata = {
  title: "Chronicles",
  description: "Finite, source-linked exhibitions connecting records across the living archive.",
};

export default function ChroniclesPage() {
  const chronicle = chronicles[0];
  const steps = chronicle.recordIds.map((recordId) => recordsById.get(recordId)).filter((record): record is NonNullable<typeof record> => Boolean(record));

  return (
    <ArchiveShell
      eyebrow={{ en: en.chronicles.eyebrow, ja: ja.chronicles.eyebrow }}
      title={{ en: en.chronicles.title, ja: ja.chronicles.title }}
      introduction={{ en: en.chronicles.introduction, ja: ja.chronicles.introduction }}
    >
      <ChroniclesContent chronicle={chronicle} steps={steps} sources={sources} />
    </ArchiveShell>
  );
}
