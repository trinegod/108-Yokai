import type { Metadata } from "next";
import { MartyrsEditorial } from "../../_components/MartyrsEditorial";
import { getMartyrsEditorial } from "@/content/martyrs-editorials";
import { createEditorialMetadata } from "../_metadata";

const editorial = getMartyrsEditorial("below");

export function generateMetadata(): Promise<Metadata> {
  return createEditorialMetadata(editorial);
}

export default function BelowPage() {
  return <MartyrsEditorial editorial={editorial} />;
}
