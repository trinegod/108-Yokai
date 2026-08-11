import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { LocaleProvider, type SiteLocale } from "./_components/LocaleProvider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "ASHIGARA — The Living Archive",
    template: "%s · ASHIGARA",
  },
  description: "A source-conscious living archive of Japanese folklore connected to the original ASHIGARA game world.",
  applicationName: "ASHIGARA — The Living Archive",
  keywords: ["Japanese folklore", "Kintarō", "Mount Ashigara", "interactive archive", "creative technology"],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    title: "ASHIGARA — The Living Archive",
    description: "Enter a source-conscious folklore archive through the permanent Mount Ashigara threshold.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Kintarō and the Hōju beneath Mount Ashigara" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASHIGARA — The Living Archive",
    description: "A living folklore archive at the threshold of Mount Ashigara.",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#07090a",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLocale: SiteLocale = cookieStore.get("ashigara-language")?.value === "ja" ? "ja" : "en";

  return (
    <html lang={initialLocale} data-locale={initialLocale}>
      <body><LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider></body>
    </html>
  );
}
