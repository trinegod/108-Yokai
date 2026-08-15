export type MartyrsEditorial = {
  slug: "persona" | "unfinished";
  issue: string;
  title: string;
  kicker: string;
  statement: string;
  alt: string;
  imageStem: string;
  layout: "image-left" | "image-right";
  nextSlug: "persona" | "unfinished";
  nextTitle: string;
};

export const martyrsEditorials: readonly MartyrsEditorial[] = [
  {
    slug: "persona",
    issue: "02.01",
    title: "Persona",
    kicker: "A study in surfaces",
    statement:
      "Every face arrives with a replacement waiting behind it. The head beneath the mask exists across every layer. Fractured. Rehearsed. Still watching. The blood reveals no original face. It makes every surface equally real.",
    alt: "A frontal portrait of a blood-marked woman beneath a cluster of cracked pale masks against a dark technical grid.",
    imageStem: "persona",
    layout: "image-left",
    nextSlug: "unfinished",
    nextTitle: "Unfinished",
  },
  {
    slug: "unfinished",
    issue: "02.02",
    title: "Unfinished",
    kicker: "The body outgrows the city",
    statement:
      "The city is not a backdrop. It is the body continuing beyond its limits. Towers rise where the portrait should end. Rain and blood obey the same gravity. Having become monumental and imprisoned at once… an image too large for the world that constructed it.",
    alt: "A monumental blood-marked woman's face appears caught among black skyscrapers above a rain-soaked city.",
    imageStem: "unfinished",
    layout: "image-right",
    nextSlug: "persona",
    nextTitle: "Persona",
  },
] as const;

export function getMartyrsEditorial(slug: MartyrsEditorial["slug"]) {
  const editorial = martyrsEditorials.find((entry) => entry.slug === slug);
  if (!editorial) throw new Error(`Unknown MART¥RS editorial: ${slug}`);
  return editorial;
}
