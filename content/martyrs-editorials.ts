export type MartyrsEditorial = {
  slug: "persona" | "unfinished" | "below";
  issue: string;
  title: string;
  kicker: string;
  statement: string;
  continuation: string;
  alt: string;
  imageStem: string;
  audio?: {
    source: string;
    label: string;
    durationSeconds: number;
  };
  layout: "image-left" | "image-right";
  nextSlug: "persona" | "unfinished" | "below";
  nextTitle: string;
};

export const martyrsEditorials: readonly MartyrsEditorial[] = [
  {
    slug: "persona",
    issue: "02.01",
    title: "Persona",
    kicker: "A study in identity",
    statement:
      "Every face arrives with a replacement waiting behind it. Identity is not hidden beneath the mask. It exists across every layer: fractured, rehearsed, and still watching. The blood reveals no original face. It makes every layer equally real.",
    continuation:
      "The masks do not conceal a single truth. They multiply it. Each expression becomes evidence of another self, composed for the moment and abandoned before it can settle. What remains is not the person beneath the performance, but the performance learning how to look back.",
    alt: "A frontal portrait of a blood-marked woman beneath a cluster of cracked pale masks against a dark technical grid.",
    imageStem: "persona",
    audio: {
      source: "/assets/audio/persona-master.wav",
      label: "Persona minimal industrial dark-techno loop",
      durationSeconds: 30,
    },
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
      "The city is not a backdrop. It is the body continuing beyond its limits. Towers rise where the portrait should end. Rain and blood obey the same gravity. She has become monumental and imprisoned, an image too large for the world that constructed it.",
    continuation:
      "Scale becomes its own form of captivity. The larger she appears, the less room remains for her to exist. Architecture turns into a frame, a cage, and finally a witness. The city can contain the image, but it cannot contain what the image has become.",
    alt: "A monumental blood-marked woman's face appears caught among black skyscrapers above a rain-soaked city.",
    imageStem: "unfinished",
    layout: "image-right",
    nextSlug: "below",
    nextTitle: "Below",
  },
  {
    slug: "below",
    issue: "02.03",
    title: "Below",
    kicker: "Pattern against user",
    statement:
      "The room does not feel unfamiliar. That is the danger. Every surface carries the memory of a previous descent, every bruise another repetition mistaken for instinct. Whether the violence arrives through someone else or through her own hand, she recognizes the route. Rock bottom has become a place she knows how to inhabit.",
    continuation:
      "Patterns survive because they offer the comfort of prediction. Pain arrives on schedule, and certainty begins to resemble safety. She does not stay because she cannot see the exit. She stays because the room already knows her shape. The telephone offers connection, but she has returned to hear the same voice.",
    alt: "A blood-marked woman in black and yellow technical clothing holds a corded telephone inside a dark metal room beneath a fluorescent light.",
    imageStem: "below",
    layout: "image-left",
    nextSlug: "persona",
    nextTitle: "Persona",
  },
] as const;

export function getMartyrsEditorial(slug: MartyrsEditorial["slug"]) {
  const editorial = martyrsEditorials.find((entry) => entry.slug === slug);
  if (!editorial) throw new Error(`Unknown MART¥RS editorial: ${slug}`);
  return editorial;
}
