"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { FolkloreRecord, Source } from "@/content/schema";
import recordTranslations from "@/content/locales/records.ja.json";
import { getArchivePortrait, type ArchivePortrait } from "@/content/portraits";
import { useLocale, type SiteLocale } from "./LocaleProvider";

type ArchiveIndexProps = {
  records: FolkloreRecord[];
  sources: Source[];
};

type RecordTranslation = {
  summary: string;
  description: string;
  traditionNotes: string;
  variants: Array<{ label: string; description: string; region?: string; period?: string }>;
  regions: string[];
  periods: string[];
  themes: string[];
  motifs: string[];
  sourceNotes: string;
  ashigaraAdaptation: { role: string; designNotes: string };
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[ōŌ]/g, "o");
}

function translationFor(record: FolkloreRecord, locale: SiteLocale) {
  return locale === "ja"
    ? recordTranslations[record.id as keyof typeof recordTranslations] as RecordTranslation | undefined
    : undefined;
}

function searchableRecord(record: FolkloreRecord) {
  const translation = recordTranslations[record.id as keyof typeof recordTranslations] as RecordTranslation | undefined;
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
    translation?.summary,
    ...(translation?.regions ?? []),
    ...(translation?.themes ?? []),
    ...(translation?.motifs ?? []),
  ].filter(Boolean).join(" "));
}

function portraitFor(record: FolkloreRecord) {
  const assetId = record.assets.portraitId ?? (record.id === "hoju" ? record.assets.heroImageId : undefined);
  return getArchivePortrait(assetId);
}

function ArchivePortraitImage({ portrait, locale, sizes, loading = "lazy", detail = false }: {
  portrait: ArchivePortrait;
  locale: SiteLocale;
  sizes: string;
  loading?: "eager" | "lazy";
  detail?: boolean;
}) {
  const [small, large] = portrait.responsiveWidths;
  const portraitPosition = detail ? portrait.detailPosition : portrait.objectPosition;
  const mobilePortraitPosition = detail ? portrait.mobileDetailPosition : portrait.objectPosition;
  return (
    <picture>
      <source type="image/avif" srcSet={`${portrait.stem}-${small}.avif ${small}w, ${portrait.stem}-${large}.avif ${large}w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${portrait.stem}-${small}.webp ${small}w, ${portrait.stem}-${large}.webp ${large}w`} sizes={sizes} />
      <img
        src={`${portrait.stem}-${large}.webp`}
        alt={portrait.alt[locale]}
        width={portrait.width}
        height={portrait.height}
        loading={loading}
        style={{
          "--portrait-position": portraitPosition,
          "--portrait-position-mobile": mobilePortraitPosition,
        } as CSSProperties}
      />
    </picture>
  );
}

export function ArchiveIndex({ records, sources }: ArchiveIndexProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale, dictionary } = useLocale();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const selectedSlug = searchParams.get("record");
  const selected = records.find((record) => record.slug === selectedSlug) ?? null;
  const selectedTranslation = selected ? translationFor(selected, locale) : undefined;
  const selectedPortrait = selected ? portraitFor(selected) : undefined;
  const sourceById = useMemo(() => new Map(sources.map((source) => [source.id, source])), [sources]);
  const recordById = useMemo(() => new Map(records.map((record) => [record.id, record])), [records]);
  const types = Array.from(new Set(records.map((record) => record.entityType))).sort();
  const illustratedCount = records.filter((record) => portraitFor(record)).length;

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

  function displayName(record: FolkloreRecord) {
    return locale === "ja" ? record.names.japanese ?? record.names.primaryEnglish : record.names.primaryEnglish;
  }

  function secondaryName(record: FolkloreRecord) {
    return locale === "ja" ? record.names.primaryEnglish : record.names.japanese;
  }

  return (
    <>
      <section className="archive-curatorial" aria-labelledby="archive-curatorial-title">
        <div>
          <p className="eyebrow">{dictionary.archive.curatorialEyebrow}</p>
          <h2 id="archive-curatorial-title">{dictionary.archive.curatorialTitle}</h2>
        </div>
        <p>{dictionary.archive.curatorialCopy}</p>
        <dl>
          <div><dt>{String(records.length).padStart(2, "0")}</dt><dd>{dictionary.archive.records}</dd></div>
          <div><dt>{String(illustratedCount).padStart(2, "0")}</dt><dd>{dictionary.archive.illustrated}</dd></div>
          <div><dt>EN / 日</dt><dd>{dictionary.archive.languageStatus}</dd></div>
        </dl>
      </section>

      <section className="archive-tools" aria-label={dictionary.archive.searchLabel}>
        <label className="search-field">
          <span>{dictionary.archive.searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dictionary.archive.searchPlaceholder}
          />
        </label>
        <label className="filter-field">
          <span>{dictionary.archive.filterLabel}</span>
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="all">{dictionary.archive.allRecords}</option>
            {types.map((entityType) => <option key={entityType} value={entityType}>{dictionary.entityTypes[entityType]}</option>)}
          </select>
        </label>
        <div className="view-switch" aria-label={dictionary.archive.viewLabel}>
          <button type="button" aria-pressed={view === "grid"} onClick={() => setView("grid")}>{dictionary.archive.grid}</button>
          <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>{dictionary.archive.list}</button>
        </div>
      </section>

      <p className="result-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? dictionary.archive.record : dictionary.archive.records} · {dictionary.archive.sample}
      </p>

      <section className={`record-collection record-collection--${view}`} aria-label={dictionary.archive.collectionLabel}>
        {filtered.map((record, index) => {
          const translation = translationFor(record, locale);
          const portrait = portraitFor(record);
          return (
            <article className={`record-card${portrait ? " record-card--portrait" : ""}`} key={record.id}>
              <button
                type="button"
                ref={(node) => {
                  if (node) triggerRefs.current.set(record.slug, node);
                }}
                onClick={() => openRecord(record.slug)}
                aria-haspopup="dialog"
              >
                <span className={`record-card__visual record-card__sigil--${record.slug}`}>
                  {portrait ? (
                    <>
                      <ArchivePortraitImage portrait={portrait} locale={locale} sizes={view === "list" ? "11rem" : "(max-width: 760px) 100vw, 33vw"} />
                      <span className="record-card__art-label">{dictionary.archive.characterStudy}</span>
                    </>
                  ) : (
                    <span className="record-card__sigil" aria-hidden="true"><i>{record.names.japanese?.slice(0, 1) ?? "印"}</i></span>
                  )}
                </span>
                <span className="record-card__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="record-card__content">
                  <span className="record-card__type">{dictionary.entityTypes[record.entityType]}</span>
                  <strong>{displayName(record)}</strong>
                  {secondaryName(record) ? <b lang={locale === "ja" ? "en" : "ja"}>{secondaryName(record)}</b> : null}
                  <span>{translation?.summary ?? record.summary}</span>
                  <em>{dictionary.archive.openRecord} <span aria-hidden="true">↗</span></em>
                </span>
              </button>
            </article>
          );
        })}
      </section>

      {selected ? (
        <div className="record-dialog-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeRecord(selected.slug);
        }}>
          <section className={`record-dialog${selectedPortrait ? " record-dialog--portrait" : ""}`} role="dialog" aria-modal="true" aria-labelledby="record-title">
            <button ref={closeRef} type="button" className="record-dialog__close" onClick={() => closeRecord(selected.slug)}>
              {dictionary.archive.close} <span aria-hidden="true">×</span>
            </button>
            <div className="record-dialog__hero">
              {selectedPortrait ? (
                <div className="record-dialog__portrait">
                  <ArchivePortraitImage portrait={selectedPortrait} locale={locale} sizes="(max-width: 760px) 100vw, 34rem" loading="eager" detail />
                </div>
              ) : null}
              <div className="record-dialog__hero-copy">
                <span>{dictionary.entityTypes[selected.entityType]}</span>
                <p lang="ja">{selected.names.japanese}</p>
                <h2 id="record-title">{displayName(selected)}</h2>
                <small>{locale === "ja" ? selected.names.primaryEnglish : selected.names.kana}</small>
              </div>
            </div>
            <div className="record-dialog__body">
              {selectedPortrait ? <p className="record-art-notice"><span>{dictionary.archive.characterStudy}</span>{dictionary.archive.artNotice}</p> : null}
              <p className="record-lede">{selectedTranslation?.description ?? selected.description}</p>

              <section>
                <p className="section-number">I</p>
                <div>
                  <h3>{dictionary.archive.tradition}</h3>
                  <p>{selectedTranslation?.traditionNotes ?? selected.traditionNotes}</p>
                  <p className="source-note">{selectedTranslation?.sourceNotes ?? selected.sourceNotes}</p>
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
                  <h3>{dictionary.archive.variants}</h3>
                  {selected.variants.map((variant, index) => {
                    const translatedVariant = selectedTranslation?.variants[index];
                    return (
                      <article key={variant.label} className="variant-note">
                        <h4>{translatedVariant?.label ?? variant.label}</h4>
                        <p>{translatedVariant?.description ?? variant.description}</p>
                        <small>{[
                          translatedVariant?.region ?? variant.region,
                          translatedVariant?.period ?? variant.period,
                        ].filter(Boolean).join(" · ")}</small>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section className="adaptation-block">
                <p className="section-number">III</p>
                <div>
                  <p className="eyebrow">{dictionary.archive.originalCanon} · {selected.ashigaraAdaptation.canonStatus}</p>
                  <h3>{dictionary.archive.adaptation}</h3>
                  <p>{selectedTranslation?.ashigaraAdaptation.role ?? selected.ashigaraAdaptation.role}</p>
                  <p>{selectedTranslation?.ashigaraAdaptation.designNotes ?? selected.ashigaraAdaptation.designNotes}</p>
                </div>
              </section>

              <section className="record-related">
                <p className="section-number">IV</p>
                <div>
                  <h3>{dictionary.archive.related}</h3>
                  <div>
                    {selected.relatedRecordIds.map((recordId) => {
                      const related = recordById.get(recordId);
                      return related ? <button type="button" key={recordId} onClick={() => openRecord(related.slug)}><span lang="ja">{related.names.japanese}</span>{displayName(related)}</button> : null;
                    })}
                  </div>
                </div>
              </section>

              <div className="record-tags">
                {[...(selectedTranslation?.themes ?? selected.themes), ...(selectedTranslation?.motifs ?? selected.motifs)].map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
