import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getHostname, isPhoenixHost } from "./site-host";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Dynamic metadata: the canonical URL must point at whichever domain actually
// served the request so Google indexes xinyutian.me and phoenixtian.com
// independently. Reading the hostname makes this depend on the request, hence
// generateMetadata rather than a static metadata object.
export async function generateMetadata(): Promise<Metadata> {
  const hostname = await getHostname();
  const canonical = isPhoenixHost(hostname)
    ? "https://phoenixtian.com/"
    : "https://xinyutian.me/";

  return {
    title: "Xinyu Tian | Phoenix Tian",
    description:
      "Dual-mode personal brand website for Xinyu Tian | Phoenix Tian",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical,
    },
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: "Xinyu Tian | Phoenix Tian",
      description:
        "Dual-mode personal brand website for Xinyu Tian | Phoenix Tian",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Xinyu Tian | Phoenix Tian",
      description:
        "Dual-mode personal brand website for Xinyu Tian | Phoenix Tian",
      images: ["/favicon.ico"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-slate-950 selection:bg-sky-300 selection:text-slate-950">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
