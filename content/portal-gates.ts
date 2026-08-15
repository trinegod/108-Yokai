export type PortalGate = {
  number: string;
  title: string;
  japanese?: string;
  subtitle: string;
  href?: string;
  status: "open" | "sealed";
};

export const portalGates: readonly PortalGate[] = [
  {
    number: "01",
    title: "Ashigara",
    japanese: "足柄",
    subtitle: "The Living Archive",
    href: "/",
    status: "open",
  },
  {
    number: "02",
    title: "MART¥RS",
    subtitle: "Fashion editorial study",
    href: "/martyrs",
    status: "open",
  },
  ...Array.from({ length: 10 }, (_, index) => ({
    number: String(index + 3).padStart(2, "0"),
    title: "Unwritten",
    subtitle: "Signal sealed",
    status: "sealed" as const,
  })),
];
