import type { ReactNode } from "react";
import { MartyrsShell } from "../_components/MartyrsShell";

export default function MartyrsLayout({ children }: { children: ReactNode }) {
  return <MartyrsShell>{children}</MartyrsShell>;
}
