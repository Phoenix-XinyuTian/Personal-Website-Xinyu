import { headers } from "next/headers";

// Shared, server-side hostname helpers. Used by both the page (to pick the
// default Work/Life mode) and the layout (to emit a domain-correct canonical).
// `headers()` is async in Next.js 16 and reading it opts the route into
// dynamic rendering — intentional, so each request sees its own hostname.

const PHOENIX_DOMAIN = "phoenixtian";

/** Lowercased request hostname, preferring the proxy-forwarded value. */
export async function getHostname(): Promise<string> {
  const h = await headers();
  return (h.get("x-forwarded-host") ?? h.get("host") ?? "").toLowerCase();
}

/** phoenixtian.com → Life domain. xinyutian.me / localhost → not. */
export function isPhoenixHost(hostname: string): boolean {
  return hostname.includes(PHOENIX_DOMAIN);
}
