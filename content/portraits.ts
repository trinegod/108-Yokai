export type ArchivePortrait = {
  id: string;
  stem: string;
  width: number;
  height: number;
  responsiveWidths: [number, number];
  objectPosition: string;
  detailPosition: string;
  mobileDetailPosition: string;
  alt: {
    en: string;
    ja: string;
  };
};

export const archivePortraits: Record<string, ArchivePortrait> = {
  "kintaro-character": {
    id: "kintaro-character",
    stem: "/assets/sprites/characters/kintaro-character",
    width: 720,
    height: 1279,
    responsiveWidths: [480, 720],
    objectPosition: "center 22%",
    detailPosition: "center 16%",
    mobileDetailPosition: "center 18%",
    alt: {
      en: "ASHIGARA character study of Kintarō in black and white checkered garments with beadwork and a legendary axe",
      ja: "市松模様の衣、数珠、伝説の斧を持つ金太郎のASHIGARA人物画",
    },
  },
  "hoju-concept": {
    id: "hoju-concept",
    stem: "/assets/relics/hoju-concept",
    width: 720,
    height: 1279,
    responsiveWidths: [480, 720],
    objectPosition: "center 48%",
    detailPosition: "center 42%",
    mobileDetailPosition: "center 44%",
    alt: {
      en: "ASHIGARA Hōju study with a pale jewel encircled by red, black, and bone wave and flame forms",
      ja: "淡い宝珠を赤、黒、骨色の波と炎が包むASHIGARA宝珠画",
    },
  },
  "yamauba-archive-portrait": {
    id: "yamauba-archive-portrait",
    stem: "/assets/portraits/yamauba-archive",
    width: 720,
    height: 1280,
    responsiveWidths: [360, 720],
    objectPosition: "center 30%",
    detailPosition: "center 11%",
    mobileDetailPosition: "center 13%",
    alt: {
      en: "Original ASHIGARA character study of a towering Yamauba resting her hand on young Kintarō before a mountain shrine",
      ja: "山の社を背に、幼い金太郎の頭へ手を置く巨大な山姥のASHIGARA人物画",
    },
  },
  "shuten-doji-archive-portrait": {
    id: "shuten-doji-archive-portrait",
    stem: "/assets/portraits/shuten-doji-archive",
    width: 720,
    height: 1280,
    responsiveWidths: [360, 720],
    objectPosition: "center 25%",
    detailPosition: "center 14%",
    mobileDetailPosition: "center 16%",
    alt: {
      en: "Original ASHIGARA character study of a red, horned Shuten-dōji holding a sake cup beneath the moon",
      ja: "月下で杯を持つ、赤い肌と角を備えた酒呑童子のASHIGARA人物画",
    },
  },
  "ibaraki-doji-archive-portrait": {
    id: "ibaraki-doji-archive-portrait",
    stem: "/assets/portraits/ibaraki-doji-archive",
    width: 720,
    height: 1280,
    responsiveWidths: [360, 720],
    objectPosition: "center 24%",
    detailPosition: "center 17%",
    mobileDetailPosition: "center 18%",
    alt: {
      en: "Original ASHIGARA character study of a pale, white-haired Ibaraki-dōji seated with a sake cup in a moonlit room",
      ja: "月夜の室内で杯を持って座る、白い肌と白髪の茨木童子のASHIGARA人物画",
    },
  },
  "minamoto-yorimitsu-archive-portrait": {
    id: "minamoto-yorimitsu-archive-portrait",
    stem: "/assets/portraits/minamoto-yorimitsu-archive",
    width: 720,
    height: 1280,
    responsiveWidths: [360, 720],
    objectPosition: "center 24%",
    detailPosition: "center 18%",
    mobileDetailPosition: "center 19%",
    alt: {
      en: "Original ASHIGARA character study of Minamoto no Yorimitsu in blue and gold armor at a moonlit mountain shrine",
      ja: "月夜の山の社で青と金の甲冑をまとう源頼光のASHIGARA人物画",
    },
  },
};

export function getArchivePortrait(assetId?: string) {
  return assetId ? archivePortraits[assetId] : undefined;
}
