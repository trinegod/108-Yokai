import type { Metadata } from "next";
import { AboutContent } from "../_components/AboutContent";

export const metadata: Metadata = {
  title: "Direction, System & Method",
  description: "The creative direction, experience design, technical system, authorship, and current status of ASHIGARA — The Living Archive.",
};

export default function AboutPage() {
  return <AboutContent />;
}
