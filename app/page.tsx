import { type SiteMode } from "./types";
import HomeClient from "./HomeClient";
import { getHostname, isPhoenixHost } from "./site-host";

// Server Component: resolve the default Work/Life mode on the server so the
// first HTML response already matches the domain (SEO-reliable, no flash).
//   1) ?mode=life|work explicit override wins — used for local testing and to
//      carry intent across a domain-level redirect that strips the hostname.
//   2) Otherwise fall back to hostname: phoenixtian.com → Life, everything
//      else (xinyutian.me, localhost) → Work.
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string | string[] }>;
}) {
  const { mode } = await searchParams;
  const queryMode = Array.isArray(mode) ? mode[0] : mode;

  let defaultMode: SiteMode;
  if (queryMode === "life" || queryMode === "work") {
    defaultMode = queryMode;
  } else {
    const hostname = await getHostname();
    defaultMode = isPhoenixHost(hostname) ? "life" : "work";
  }

  return <HomeClient defaultMode={defaultMode} />;
}
