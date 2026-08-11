import type { Metadata } from "next";
import { ArchiveShell } from "../_components/ArchiveShell";
import { AtlasContent } from "../_components/AtlasContent";
import { places, records } from "@/content";
import en from "@/content/locales/en.json";
import ja from "@/content/locales/ja.json";

export const metadata: Metadata = {
  title: "Places, Paths & Regions",
  description: "A deliberately approximate atlas of traditional and legendary folklore settings.",
};

export default function AtlasPage() {
  return (
    <ArchiveShell
      eyebrow={{ en: en.atlas.eyebrow, ja: ja.atlas.eyebrow }}
      title={{ en: en.atlas.title, ja: ja.atlas.title }}
      introduction={{ en: en.atlas.introduction, ja: ja.atlas.introduction }}
    >
      <AtlasContent places={places} records={records} />
    </ArchiveShell>
  );
}
