import type { MetadataRoute } from "next";
import { getHostname, isPhoenixHost } from "./site-host";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = isPhoenixHost(await getHostname())
    ? "https://phoenixtian.com"
    : "https://xinyutian.me";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
