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

// Dynamic metadata: the canonical URL must point at whichever domain actually
// served the request so Google indexes xinyutian.me and phoenixtian.com
// independently. Reading the hostname makes this depend on the request, hence
// generateMetadata rather than a static metadata object.
export async function generateMetadata(): Promise<Metadata> {
  const isPhoenix = isPhoenixHost(await getHostname());

  // Per-domain title/description so each domain is indexed for its own brand:
  // xinyutian.me → the professional (Work) identity, phoenixtian.com → the
  // creator (Life) identity.
  const title = isPhoenix
    ? "Phoenix Tian | Tech, Travel & Life"
    : "Xinyu Tian | Computer Vision & AI";
  const description = isPhoenix
    ? "Phoenix Tian (Phoenix 蓝色火焰) is the creator brand of Xinyu Tian, sharing tech, travel, and life in Singapore across YouTube, Instagram, TikTok, and other platforms."
    : "Xinyu Tian (Tian Xinyu or 田新宇) is a NUS master's student in Singapore focused on computer vision and AI applications. Explore his LinkedIn, GitHub, experiences and work.";
  const canonical = isPhoenix
    ? "https://phoenixtian.com/"
    : "https://xinyutian.me/";

  return {
    title,
    description,
    metadataBase: new URL(canonical),
    alternates: {
      canonical,
    },
    // Per-domain browser-tab icon: phoenixtian.com (creator brand) uses the
    // media-brand avatar, xinyutian.me (professional) keeps the default favicon.
    // Root-relative paths resolve against the serving origin, so this is correct
    // on each domain regardless of metadataBase.
    icons: {
      icon: isPhoenix ? "/phoenix-icon.png" : "/favicon.ico",
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      // og:site_name — the brand each domain represents.
      siteName: isPhoenix ? "Phoenix Tian" : "Xinyu Tian",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
