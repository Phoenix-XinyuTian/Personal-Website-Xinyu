import { ImageResponse } from "next/og";
import { getHostname, isPhoenixHost } from "./site-host";

export const ogImageSize = {
  width: 1200,
  height: 630,
};

export const ogImageContentType = "image/png";

type OgCardConfig = {
  accent: string;
  accentSoft: string;
  background: string;
  chip: string;
  domain: string;
  footer: string;
  initials: string;
  subtitle: string;
  title: string;
  topics: string[];
};

async function getOgCardConfig(): Promise<OgCardConfig> {
  const isPhoenix = isPhoenixHost(await getHostname());

  if (isPhoenix) {
    return {
      accent: "#14b8a6",
      accentSoft: "#ccfbf1",
      background: "#f0fdfa",
      chip: "Creator Brand",
      domain: "phoenixtian.com",
      footer: "Bilingual stories from Singapore and beyond",
      initials: "PT",
      subtitle: "Tech · Travel · Life in Singapore",
      title: "Phoenix Tian",
      topics: ["YouTube", "Instagram", "TikTok", "RedNote"],
    };
  }

  return {
    accent: "#0ea5e9",
    accentSoft: "#e0f2fe",
    background: "#f0f9ff",
    chip: "Professional Site",
    domain: "xinyutian.me",
    footer: "Open to CV/ML Engineer roles from Feb 2027",
    initials: "XT",
    subtitle: "Computer Vision · AI Engineering · NUS",
    title: "Xinyu Tian",
    topics: ["Computer Vision", "Machine Learning", "AI Systems"],
  };
}

export async function generateOgImage() {
  const card = await getOgCardConfig();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: card.background,
          color: "#0f172a",
          fontFamily: "Arial",
          padding: 56,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 12% 18%, rgba(255,255,255,0.95) 0, rgba(255,255,255,0.0) 34%), radial-gradient(circle at 86% 18%, rgba(251,191,36,0.28) 0, rgba(251,191,36,0) 28%), radial-gradient(circle at 82% 82%, rgba(248,113,113,0.22) 0, rgba(248,113,113,0) 30%)",
          }}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            border: "1px solid rgba(15,23,42,0.10)",
            borderRadius: 32,
            background: "rgba(255,255,255,0.78)",
            boxShadow: "0 28px 80px rgba(15,23,42,0.14)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 16,
              height: "100%",
              background: card.accent,
            }}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "54px 60px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 36,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 999,
                    background: card.accentSoft,
                    color: card.accent,
                    fontSize: 24,
                    fontWeight: 700,
                    padding: "12px 22px",
                  }}
                >
                  {card.chip}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: 26,
                    fontWeight: 600,
                  }}
                >
                  {card.domain}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  color: "#020617",
                  fontSize: 92,
                  fontWeight: 800,
                  lineHeight: 0.95,
                  letterSpacing: 0,
                  marginBottom: 30,
                }}
              >
                {card.title}
              </div>
              <div
                style={{
                  display: "flex",
                  maxWidth: 720,
                  color: "#334155",
                  fontSize: 42,
                  fontWeight: 600,
                  lineHeight: 1.18,
                }}
              >
                {card.subtitle}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div style={{ display: "flex", gap: 14 }}>
                {card.topics.map((topic) => (
                  <div
                    key={topic}
                    style={{
                      display: "flex",
                      border: "1px solid rgba(15,23,42,0.12)",
                      borderRadius: 999,
                      color: "#334155",
                      fontSize: 24,
                      fontWeight: 650,
                      padding: "11px 18px",
                    }}
                  >
                    {topic}
                  </div>
                ))}
              </div>
              <div
                style={{
                  color: "#64748b",
                  fontSize: 26,
                  fontWeight: 600,
                }}
              >
                {card.footer}
              </div>
            </div>
          </div>

          <div
            style={{
              width: 310,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 58,
            }}
          >
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: 56,
                background: card.accent,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 72,
                fontWeight: 800,
                boxShadow: "0 24px 56px rgba(15,23,42,0.24)",
              }}
            >
              {card.initials}
            </div>
          </div>
        </div>
      </div>
    ),
    ogImageSize,
  );
}
