import type { MetadataRoute } from "next";
import { getHostname, isPhoenixHost } from "./site-host";

const SITE_LAST_MODIFIED = new Date("2026-06-30T00:00:00.000Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const isPhoenix = isPhoenixHost(await getHostname());
  const origin = isPhoenix ? "https://phoenixtian.com" : "https://xinyutian.me";
  const portrait = isPhoenix ? "Phoenix-Tian.jpg" : "Xinyu-Tian.jpg";

  return [
    {
      url: `${origin}/`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${origin}/opengraph-image`, `${origin}/images/${portrait}`],
    },
  ];
}
