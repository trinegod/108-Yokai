import type { Metadata } from "next";
import { MartyrsGate } from "../_components/MartyrsGate";

export const metadata: Metadata = {
  title: { absolute: "MART¥RS · Gate 02 · 108 Yōkai" },
  description: "An aggressive fashion-editorial threshold for Gate 02 of 108 Yōkai.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function MartyrsPage() {
  return <MartyrsGate />;
}
