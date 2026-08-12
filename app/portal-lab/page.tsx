import type { Metadata } from "next";
import { PortalLab } from "../_components/PortalLab";

export const metadata: Metadata = {
  title: "108 Yōkai Portal Lab",
  description: "A private interaction study for the future 108 Yōkai collection portal.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function PortalLabPage() {
  return <PortalLab />;
}
