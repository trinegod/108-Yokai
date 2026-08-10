import assetsData from "./assets.json";
import chroniclesData from "./chronicles.json";
import placesData from "./places.json";
import recordsData from "./records.json";
import sourcesData from "./sources.json";
import type { AssetRecord, Chronicle, FolkloreRecord, Place, Source } from "./schema";

export const assets = assetsData as AssetRecord[];
export const chronicles = chroniclesData as Chronicle[];
export const places = placesData as Place[];
export const records = (recordsData as FolkloreRecord[]).filter(
  (record) => record.status === "published",
);
export const sources = sourcesData as Source[];

export const sourcesById = new Map(sources.map((source) => [source.id, source]));
export const recordsById = new Map(records.map((record) => [record.id, record]));
export const placesById = new Map(places.map((place) => [place.id, place]));

export function displayType(type: FolkloreRecord["entityType"]) {
  return type === "yokai" ? "Yōkai" : type.charAt(0).toUpperCase() + type.slice(1);
}

