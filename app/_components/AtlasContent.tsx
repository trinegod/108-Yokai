"use client";
import type { CSSProperties } from "react";
import type { FolkloreRecord, Place } from "@/content/schema";
import placeTranslations from "@/content/locales/places.ja.json";
import { useLocale } from "./LocaleProvider";

type PlaceTranslation = (typeof placeTranslations)[keyof typeof placeTranslations];

export function AtlasContent({ places, records }: { places: Place[]; records: FolkloreRecord[] }) {
  const { locale, dictionary } = useLocale();

  function localize(place: Place) {
    return locale === "ja"
      ? (placeTranslations[place.id as keyof typeof placeTranslations] as PlaceTranslation | undefined)
      : undefined;
  }

  return (
    <section className="atlas-layout">
      <div className="atlas-map" aria-label={dictionary.atlas.mapLabel}>
        <picture className="atlas-map__picture">
          <source
            media="(max-width: 760px)"
            type="image/avif"
            srcSet="/assets/backgrounds/atlas/ashigara-atlas-mobile-640.avif 640w, /assets/backgrounds/atlas/ashigara-atlas-mobile-853.avif 853w"
            sizes="100vw"
          />
          <source
            media="(max-width: 760px)"
            type="image/webp"
            srcSet="/assets/backgrounds/atlas/ashigara-atlas-mobile-640.webp 640w, /assets/backgrounds/atlas/ashigara-atlas-mobile-853.webp 853w"
            sizes="100vw"
          />
          <source
            type="image/avif"
            srcSet="/assets/backgrounds/atlas/ashigara-atlas-desktop-960.avif 960w, /assets/backgrounds/atlas/ashigara-atlas-desktop-1280.avif 1280w"
            sizes="(max-width: 1100px) 100vw, 65vw"
          />
          <source
            type="image/webp"
            srcSet="/assets/backgrounds/atlas/ashigara-atlas-desktop-960.webp 960w, /assets/backgrounds/atlas/ashigara-atlas-desktop-1280.webp 1280w"
            sizes="(max-width: 1100px) 100vw, 65vw"
          />
          <img
            className="atlas-map__art"
            src="/assets/backgrounds/atlas/ashigara-atlas-desktop-1280.webp"
            alt=""
            width="1280"
            height="960"
          />
        </picture>
        <div className="atlas-map__wash" aria-hidden="true" />
        <p className="atlas-map__north" aria-hidden="true">N</p>
        <div className="atlas-map__path" aria-hidden="true" />
        {places.map((place, index) => {
          const record = records.find((item) => item.places.some((link) => link.placeId === place.id));
          const translation = localize(place);
          return (
            <a
              key={place.id}
              className="atlas-node"
              href={record ? `/archive?record=${record.slug}` : "/archive"}
              style={{
                "--atlas-x": `${place.mapPosition.x}%`,
                "--atlas-y": `${place.mapPosition.y}%`,
                "--atlas-x-mobile": `${place.mobileMapPosition?.x ?? place.mapPosition.x}%`,
                "--atlas-y-mobile": `${place.mobileMapPosition?.y ?? place.mapPosition.y}%`,
              } as CSSProperties}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{translation?.name ?? place.name}</strong>
              <small>{translation?.kind ?? place.kind}</small>
            </a>
          );
        })}
        <p className="atlas-map__legend">{dictionary.atlas.legend}</p>
      </div>

      <div className="atlas-list" aria-label={dictionary.atlas.listLabel}>
        {places.map((place, index) => {
          const translation = localize(place);
          return (
            <article key={place.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="eyebrow">{translation?.kind ?? place.kind} {dictionary.atlas.location}</p>
                <h2>{translation?.name ?? place.name} <small lang="ja">{place.japanese}</small></h2>
                <p>{translation?.note ?? place.note}</p>
                <strong>{translation?.region ?? place.region}</strong>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
