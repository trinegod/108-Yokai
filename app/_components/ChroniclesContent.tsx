"use client";
import type { Chronicle, FolkloreRecord, Source } from "@/content/schema";
import chronicleTranslations from "@/content/locales/chronicles.ja.json";
import recordTranslations from "@/content/locales/records.ja.json";
import { useLocale } from "./LocaleProvider";

type ChronicleTranslation = (typeof chronicleTranslations)[keyof typeof chronicleTranslations];
type RecordTranslation = (typeof recordTranslations)[keyof typeof recordTranslations];

export function ChroniclesContent({ chronicle, steps, sources }: {
  chronicle: Chronicle;
  steps: FolkloreRecord[];
  sources: Source[];
}) {
  const { locale, dictionary } = useLocale();
  const chronicleTranslation = locale === "ja"
    ? chronicleTranslations[chronicle.id as keyof typeof chronicleTranslations] as ChronicleTranslation | undefined
    : undefined;
  const sourcesById = new Map(sources.map((source) => [source.id, source]));

  return (
    <>
      <section className="chronicle-hero">
        <div>
          <p className="eyebrow">{chronicleTranslation?.eyebrow ?? chronicle.eyebrow}</p>
          <h2>{chronicleTranslation?.title ?? chronicle.title}</h2>
          <p>{chronicleTranslation?.introduction ?? chronicle.introduction}</p>
        </div>
        <span aria-hidden="true">物<br />語</span>
      </section>

      <ol className="chronicle-path">
        {steps.map((record, index) => {
          const translation = locale === "ja"
            ? recordTranslations[record.id as keyof typeof recordTranslations] as RecordTranslation | undefined
            : undefined;
          return (
            <li key={record.id}>
              <span className="chronicle-path__number">{String(index + 1).padStart(2, "0")}</span>
              <div className="chronicle-path__line" aria-hidden="true" />
              <article>
                <p className="eyebrow">{dictionary.entityTypes[record.entityType]}</p>
                <h3>{locale === "ja" ? record.names.japanese : record.names.primaryEnglish} <small lang={locale === "ja" ? "en" : "ja"}>{locale === "ja" ? record.names.primaryEnglish : record.names.japanese}</small></h3>
                <p>{translation?.summary ?? record.summary}</p>
                <a href={`/archive?record=${record.slug}`}>{dictionary.chronicles.openRecord} <span aria-hidden="true">↗</span></a>
              </article>
            </li>
          );
        })}
      </ol>

      <section className="chronicle-sources">
        <p className="eyebrow">{dictionary.chronicles.sourcesEyebrow}</p>
        <h2>{dictionary.chronicles.sourcesTitle}</h2>
        <div>
          {chronicle.sourceIds.map((sourceId) => {
            const source = sourcesById.get(sourceId);
            return source ? <a key={source.id} href={source.url} target="_blank" rel="noreferrer">{source.title}<small>{source.institution}</small></a> : null;
          })}
        </div>
      </section>
    </>
  );
}
