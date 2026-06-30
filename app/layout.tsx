import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getHostname, isPhoenixHost } from "./site-host";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

const SEO_CONFIG = {
  phoenix: {
    title: "Phoenix Tian | Tech, Travel & Life",
    description:
      "Phoenix Tian (Phoenix 蓝色火焰) is the creator brand of Xinyu Tian, sharing tech, travel, and life in Singapore across YouTube, Instagram, TikTok, and other platforms.",
    canonical: "https://phoenixtian.com/",
    siteName: "Phoenix Tian",
    icon: "/phoenix-icon.png",
    iconSizes: "512x512",
    image: "https://phoenixtian.com/images/Phoenix-Tian.jpg",
    keywords: [
      "Phoenix Tian",
      "Phoenix 蓝色火焰",
      "Phoenix Tian Singapore",
      "Singapore content creator",
      "travel creator",
      "bilingual creator",
      "NUS life",
      "YouTube creator",
    ],
    sameAs: [
      "https://www.youtube.com/@Phoenix_Tian",
      "https://www.instagram.com/phoenix.tian.vlog/",
      "https://www.tiktok.com/@phoenix_tian",
      "https://www.threads.com/@phoenix.tian.vlog",
      "https://www.xiaohongshu.com/user/profile/65f6c122000000000600dd73",
      "https://space.bilibili.com/108107851",
      "https://www.douyin.com/user/MS4wLjABAAAA0kIU9S2qrHcdPJmPKemsdUdauZr8OJI1I5PSCCRcG_E",
    ],
    alternateName: ["Phoenix 蓝色火焰"],
    knowsAbout: ["Content Creation", "Travel Storytelling", "Singapore Life", "Bilingual Media"],
    brandRole: "Bilingual content creator and travel storyteller",
  },
  xinyu: {
    title: "Xinyu Tian | Computer Vision & AI",
    description:
      "Xinyu Tian (Tian Xinyu or 田新宇) is a NUS master's student in Singapore focused on computer vision and AI applications. Explore his LinkedIn, GitHub, experiences and work.",
    canonical: "https://xinyutian.me/",
    siteName: "Xinyu Tian",
    icon: "/favicon.ico",
    iconSizes: "any",
    image: "https://xinyutian.me/images/Xinyu-Tian.jpg",
    keywords: [
      "Xinyu Tian",
      "Tian Xinyu",
      "田新宇",
      "Xinyu Tian NUS",
      "Xinyu Tian Computer Vision",
      "Xinyu Tian AI",
      "Xinyu Tian Singapore",
      "computer vision engineer",
      "AI applications",
    ],
    sameAs: [
      "https://www.linkedin.com/in/xinyu-tian-phoenix",
      "https://github.com/Phoenix-XinyuTian",
      "https://x.com/Xinyu_Tian_AI",
    ],
    alternateName: ["Tian Xinyu", "田新宇"],
    knowsAbout: ["Computer Vision", "Machine Learning", "AI Applications", "Semantic Segmentation"],
    brandRole: "Computer vision and AI applications engineer, NUS MSc Physics student",
  },
} as const;

function getSeoConfig(isPhoenix: boolean) {
  return isPhoenix ? SEO_CONFIG.phoenix : SEO_CONFIG.xinyu;
}

function getStructuredData(config: ReturnType<typeof getSeoConfig>) {
  const personId = `${config.canonical}#person`;
  const websiteId = `${config.canonical}#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: config.siteName,
        alternateName: config.alternateName,
        url: config.canonical,
        image: config.image,
        description: config.description,
        jobTitle: config.brandRole,
        knowsAbout: config.knowsAbout,
        sameAs: config.sameAs,
        homeLocation: {
          "@type": "Place",
          name: "Singapore",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: config.canonical,
        name: config.siteName,
        description: config.description,
        publisher: {
          "@id": personId,
        },
        inLanguage: ["en", "zh-CN"],
      },
    ],
  };
}

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
  const config = getSeoConfig(isPhoenixHost(await getHostname()));

  // Per-domain title/description so each domain is indexed for its own brand:
  // xinyutian.me → the professional (Work) identity, phoenixtian.com → the
  // creator (Life) identity.
  const ogImage = `${config.canonical}opengraph-image`;

  return {
    title: config.title,
    description: config.description,
    applicationName: config.siteName,
    authors: [{ name: config.siteName, url: config.canonical }],
    creator: config.siteName,
    publisher: config.siteName,
    keywords: [...config.keywords],
    category: config.brandRole,
    metadataBase: new URL(config.canonical),
    alternates: {
      canonical: config.canonical,
    },
    // Per-domain browser-tab icon: phoenixtian.com (creator brand) uses the
    // media-brand avatar, xinyutian.me (professional) keeps the default favicon.
    // Root-relative paths resolve against the serving origin, so this is correct
    // on each domain regardless of metadataBase.
    icons: {
      icon: [{ url: config.icon, sizes: config.iconSizes }],
      shortcut: [config.icon],
      apple: [{ url: config.icon, sizes: config.iconSizes }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: config.title,
      description: config.description,
      type: "website",
      url: config.canonical,
      // og:site_name — the brand each domain represents.
      siteName: config.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${config.siteName} website preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [ogImage],
    },
  };
}

async function StructuredDataScript() {
  const config = getSeoConfig(isPhoenixHost(await getHostname()));
  const structuredData = getStructuredData(config);

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
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
        <StructuredDataScript />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
