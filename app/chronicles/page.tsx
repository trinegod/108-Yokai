import type { Metadata } from "next";
import { ArchiveShell } from "../_components/ArchiveShell";
import { chronicles, recordsById, sourcesById } from "@/content";

export const metadata: Metadata = {
  title: "Chronicles",
  description: "Finite, source-linked exhibitions connecting records across the living archive.",
};

export default function ChroniclesPage() {
  const chronicle = chronicles[0];
  const steps = chronicle.recordIds.map((recordId) => recordsById.get(recordId)).filter(Boolean);

  return (
    <ArchiveShell
      eyebrow="Curated tales · 03"
      title="Chronicles"
      introduction="Finite exhibitions connect records without turning the archive into an endless feed. This first route follows one ascent from mountain childhood toward a branching demon-road tradition."
    >
      <section className="chronicle-hero">
        <div>
          <p className="eyebrow">{chronicle.eyebrow}</p>
          <h2>{chronicle.title}</h2>
          <p>{chronicle.introduction}</p>
        </div>
        <span aria-hidden="true">物<br />語</span>
      </section>

      <ol className="chronicle-path">
        {steps.map((record, index) => record ? (
          <li key={record.id}>
            <span className="chronicle-path__number">{String(index + 1).padStart(2, "0")}</span>
            <div className="chronicle-path__line" aria-hidden="true" />
            <article>
              <p className="eyebrow">{record.entityType}</p>
              <h3>{record.names.primaryEnglish} <small lang="ja">{record.names.japanese}</small></h3>
              <p>{record.summary}</p>
              <a href={`/archive?record=${record.slug}`}>Open archive record <span aria-hidden="true">↗</span></a>
            </article>
          </li>
        ) : null)}
      </ol>

      <section className="chronicle-sources">
        <p className="eyebrow">Exhibition sources</p>
        <h2>Source trail</h2>
        <div>
          {chronicle.sourceIds.map((sourceId) => {
            const source = sourcesById.get(sourceId);
            return source ? <a key={source.id} href={source.url} target="_blank" rel="noreferrer">{source.title}<small>{source.institution}</small></a> : null;
          })}
        </div>
      </section>
    </ArchiveShell>
  );
}
