export type EditorialStatus = "draft" | "reviewed" | "published";
export type EntityType =
  | "yokai"
  | "oni"
  | "kami"
  | "hero"
  | "creature"
  | "spirit"
  | "object"
  | "place"
  | "tale"
  | "ritual";

export type Source = {
  id: string;
  title: string;
  institution: string;
  kind: "institutional-collection" | "institutional-exhibition" | "authority-record";
  url: string;
  accessedAt: string;
  rightsNote: string;
};

export type FolkloreRecord = {
  schemaVersion: 1;
  id: string;
  slug: string;
  status: EditorialStatus;
  entityType: EntityType;
  names: {
    primaryEnglish: string;
    japanese?: string;
    kana?: string;
    romanizations?: string[];
    aliases?: string[];
  };
  summary: string;
  description: string;
  traditionNotes: string;
  variants: Array<{
    label: string;
    description: string;
    region?: string;
    period?: string;
    sourceIds: string[];
  }>;
  regions: string[];
  places: Array<{
    placeId: string;
    certainty: "historical" | "traditional" | "legendary" | "approximate";
  }>;
  periods: string[];
  themes: string[];
  motifs: string[];
  relatedRecordIds: string[];
  sourceIds: string[];
  sourceNotes: string;
  ashigaraAdaptation: {
    role: string;
    designNotes: string;
    canonStatus: "concept" | "provisional" | "locked";
  };
  spoilerLevel: "none" | "light" | "major";
  assets: {
    spriteId?: string;
    portraitId?: string;
    heroImageId?: string;
    audioId?: string;
    modelId?: string;
  };
  rights: {
    owner: string;
    licenseOrPermission: string;
    creditLine: string;
  };
  lastReviewedAt: string;
};

export type Place = {
  id: string;
  name: string;
  japanese?: string;
  kind: "historical" | "traditional" | "legendary" | "approximate";
  region: string;
  note: string;
  sourceIds: string[];
  mapPosition: { x: number; y: number };
  mobileMapPosition?: { x: number; y: number };
};

export type Chronicle = {
  id: string;
  slug: string;
  status: EditorialStatus;
  title: string;
  eyebrow: string;
  introduction: string;
  recordIds: string[];
  sourceIds: string[];
};

export type AssetRecord = {
  id: string;
  sourceFilename: string;
  canonicalSourceName: string;
  sourcePath: string;
  type:
    | "background"
    | "atlas-environment"
    | "portal-environment"
    | "portal-sticker"
    | "gate-environment"
    | "atmosphere-audio"
    | "relic"
    | "sprite-reference"
    | "character-reference";
  association: string;
  width?: number;
  height?: number;
  durationSeconds?: number;
  frameLayout: string;
  transparency: "opaque" | "transparent" | "transparent RGBA" | "not-applicable";
  intendedUse: string;
  rightsStatus: string;
  optimization: string;
  missingStates: string;
  approvalStatus: "prototype" | "locked" | "locked-reference" | "approved-reference" | "identity-reference";
  runtimeAsset: boolean;
};
