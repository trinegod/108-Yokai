import type { Metadata } from "next";
import { LeftRightGate } from "../_components/LeftRightGate";

export const metadata: Metadata = {
  title: { absolute: "LEFT / RIGHT · Gate 02 · 108 Yōkai" },
  description: "A private atmospheric interaction study for Gate 02 of 108 Yōkai.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function LeftRightPage() {
  return <LeftRightGate />;
}
