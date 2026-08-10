"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { FolkloreRecord, Source } from "@/content/schema";
import { displayType } from "@/content";

type ArchiveIndexProps = {
  records: FolkloreRecord[];
  sources: Source[];
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[ōŌ]/g, "o");
}

function searchableRecord(record: FolkloreRecord) {
  return normalize([
    record.names.primaryEnglish,
    record.names.japanese,
    record.names.kana,
    ...(record.names.romanizations ?? []),
    ...(record.names.aliases ?? []),
    ...record.regions,
    ...record.themes,
    ...record.motifs,
    record.summary,
  ].filter(Boolean).join(" "));
}

export function ArchiveIndex({ records, sources }: ArchiveIndexProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const selectedSlug = searchParams.get("record");
  const selected = records.find((record) => record.slug === selectedSlug) ?? null;
  const sourceById = useMemo(() => new Map(sources.map((source) => [source.id, source])), [sources]);
  const types = Array.from(new Set(records.map((record) => record.entityType))).sort();

  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return records.filter((record) => {
      const matchesType = type === "all" || record.entityType === type;
      const matchesQuery = !normalizedQuery || searchableRecord(record).includes(normalizedQuery);
      return matchesType && matchesQuery;
    });
  }, [query, records, type]);

  const closeRecord = useCallback((slug: string) => {
    router.push("/archive", { scroll: false });
    window.setTimeout(() => triggerRefs.current.get(slug)?.focus(), 0);
  }, [router]);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && selected) closeRecord(selected.slug);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeRecord, selected]);

  function openRecord(slug: string) {
    router.push(`/archive?record=${encodeURIComponent(slug)}`, { scroll: false });
  }

  return (
    <>
      <section className="archive-tools" aria-label="Archive search and filters">
        <label className="search-field">
          <span>Search names, regions, motifs</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Kintarō, mountain, 宝珠…"
          />
        </label>
        <label className="filter-field">
          <span>Entity class</span>
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="all">All records</option>
            {types.map((entityType) => <option key={entityType} value={entityType}>{displayType(entityType)}</option>)}
          </select>
        </label>
        <div className="view-switch" aria-label="Archive view">
          <button type="button" aria-pressed={view === "grid"} onClick={() => setView("grid")}>Grid</button>
          <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>List</button>
        </div>
      </section>

      <p className="result-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "record" : "records"} · source-checked Phase One sample
      </p>

      <section className={`record-collection record-collection--${view}`} aria-label="Folklore records">
        {filtered.map((record, index) => (
          <article className="record-card" key={record.id}>
            <button
              type="button"
              ref={(node) => {
                if (node) triggerRefs.current.set(record.slug, node);
              }}
              onClick={() => openRecord(record.slug)}
              aria-haspopup="dialog"
            >
              <span className={`record-card__sigil record-card__sigil--${record.slug}`} aria-hidden="true">
                <i>{record.names.japanese?.slice(0, 1) ?? "印"}</i>
              </span>
              <span className="record-card__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="record-card__content">
                <span className="record-card__type">{displayType(record.entityType)}</span>
                <strong>{record.names.primaryEnglish}</strong>
                {record.names.japanese ? <b lang="ja">{record.names.japanese}</b> : null}
                <span>{record.summary}</span>
                <em>Open record <span aria-hidden="true">↗</span></em>
              </span>
            </button>
          </article>
        ))}
      </section>

      {selected ? (
        <div className="record-dialog-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeRecord(selected.slug);
        }}>
          <section className="record-dialog" role="dialog" aria-modal="true" aria-labelledby="record-title">
            <button ref={closeRef} type="button" className="record-dialog__close" onClick={() => closeRecord(selected.slug)}>
              Close <span aria-hidden="true">×</span>
            </button>
            <div className="record-dialog__hero">
              <span>{displayType(selected.entityType)}</span>
              <p>{selected.names.japanese}</p>
              <h2 id="record-title">{selected.names.primaryEnglish}</h2>
              <small>{selected.names.kana}</small>
            </div>
            <div className="record-dialog__body">
              <p className="record-lede">{selected.description}</p>

              <section>
                <p className="section-number">I</p>
                <div>
                  <h3>Tradition &amp; sources</h3>
                  <p>{selected.traditionNotes}</p>
                  <p className="source-note">{selected.sourceNotes}</p>
                  <ul className="source-list">
                    {selected.sourceIds.map((sourceId) => {
                      const source = sourceById.get(sourceId);
                      return source ? (
                        <li key={source.id}>
                          <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>
                          <span>{source.institution}</span>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              </section>

              <section>
                <p className="section-number">II</p>
                <div>
                  <h3>Variants &amp; interpretations</h3>
                  {selected.variants.map((variant) => (
                    <article key={variant.label} className="variant-note">
                      <h4>{variant.label}</h4>
                      <p>{variant.description}</p>
                      <small>{[variant.region, variant.period].filter(Boolean).join(" · ")}</small>
                    </article>
                  ))}
                </div>
              </section>

              <section className="adaptation-block">
                <p className="section-number">III</p>
                <div>
                  <p className="eyebrow">Original project canon · {selected.ashigaraAdaptation.canonStatus}</p>
                  <h3>ASHIGARA adaptation</h3>
                  <p>{selected.ashigaraAdaptation.role}</p>
                  <p>{selected.ashigaraAdaptation.designNotes}</p>
                </div>
              </section>

              <div className="record-tags">
                {[...selected.themes, ...selected.motifs].map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
