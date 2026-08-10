import type { Metadata } from "next";
import Link from "next/link";
import { ArchiveShell } from "../_components/ArchiveShell";
import { places, records } from "@/content";

export const metadata: Metadata = {
  title: "Places, Paths & Regions",
  description: "A deliberately approximate atlas of traditional and legendary folklore settings.",
};

export default function AtlasPage() {
  return (
    <ArchiveShell
      eyebrow="Spatial index · 02"
      title="Places, Paths & Regions"
      introduction="This is a narrative atlas, not a claim of scientific precision. Nodes identify traditional regions and variant settings; every certainty label stays visible."
    >
      <section className="atlas-layout">
        <div className="atlas-map" aria-label="Stylized map of Phase One places">
          <div className="atlas-map__contours" aria-hidden="true" />
          <p className="atlas-map__north" aria-hidden="true">N</p>
          <div className="atlas-map__path" aria-hidden="true" />
          {places.map((place, index) => {
            const record = records.find((item) => item.places.some((link) => link.placeId === place.id));
            return (
              <Link
                key={place.id}
                className="atlas-node"
                href={record ? `/archive?record=${record.slug}` : "/archive"}
                prefetch={false}
                style={{ left: `${place.mapPosition.x}%`, top: `${place.mapPosition.y}%` }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{place.name}</strong>
                <small>{place.kind}</small>
              </Link>
            );
          })}
          <p className="atlas-map__legend">Approximate narrative placement · not to scale</p>
        </div>

        <div className="atlas-list" aria-label="Text alternative for atlas places">
          {places.map((place, index) => (
            <article key={place.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="eyebrow">{place.kind} location</p>
                <h2>{place.name} <small lang="ja">{place.japanese}</small></h2>
                <p>{place.note}</p>
                <strong>{place.region}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </ArchiveShell>
  );
}
