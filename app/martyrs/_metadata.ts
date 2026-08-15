import type { Metadata } from "next";
import { headers } from "next/headers";
import type { MartyrsEditorial } from "@/content/martyrs-editorials";

export async function createEditorialMetadata(editorial: MartyrsEditorial): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = new URL(`/assets/editorials/martyrs/${editorial.imageStem}-desktop-1440.webp`, `${protocol}://${host}`).toString();
  const title = `${editorial.title} · MART¥RS`;

  return {
    title: { absolute: title },
    description: editorial.statement,
    robots: { index: false, follow: false, nocache: true },
    openGraph: {
      type: "article",
      title,
      description: editorial.statement,
      images: [{ url: image, width: 1440, height: 1800, alt: editorial.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: editorial.statement,
      images: [image],
    },
  };
}
