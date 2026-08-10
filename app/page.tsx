import type { Metadata } from "next";
import { ThresholdScene } from "./_components/ThresholdScene";

export const metadata: Metadata = {
  title: "Threshold",
  description: "Enter ASHIGARA — The Living Archive through the permanent Mount Ashigara threshold.",
};

export default function Home() {
  return <ThresholdScene />;
}
