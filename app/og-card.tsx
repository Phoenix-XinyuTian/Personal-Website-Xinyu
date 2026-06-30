import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
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
  footerSize: number;
  portraitAlt: string;
  portraitPath: string;
  subtitle: string;
  subtitleSize: number;
  title: string;
  topics: string[];
};

async function getPublicImageDataUri(path: string): Promise<string> {
  const image = await readFile(join(process.cwd(), "public", path));
  const extension = path.split(".").pop();
  const mimeType = extension === "png" ? "image/png" : "image/jpeg";

  return `data:${mimeType};base64,${image.toString("base64")}`;
}

async function getOgCardConfig(): Promise<OgCardConfig> {
  const isPhoenix = isPhoenixHost(await getHostname());

  if (isPhoenix) {
    return {
      accent: "#14b8a6",
      accentSoft: "#ccfbf1",
      background: "#f0fdfa",
      chip: "Creator Brand",
      domain: "phoenixtian.com",
      footer: "Bilingual stories from Singapore and around the world.",
      footerSize: 23,
      portraitAlt: "Phoenix Tian portrait",
      portraitPath: "images/Phoenix-Tian.jpg",
      subtitle: "Content Creation · Travel · Life",
      subtitleSize: 40,
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
    footer: "Building reliable computer vision and AI systems",
    footerSize: 26,
    portraitAlt: "Xinyu Tian portrait",
    portraitPath: "images/Xinyu-Tian.jpg",
    subtitle: "Computer Vision · AI Engineering · NUS",
    subtitleSize: 34,
    title: "Xinyu Tian",
    topics: ["Computer Vision", "Machine Learning", "AI Systems"],
  };
}

export async function generateOgImage() {
  const card = await getOgCardConfig();
  const portraitSrc = await getPublicImageDataUri(card.portraitPath);

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
            border: "2px solid rgba(255,255,255,0.92)",
            borderRadius: 32,
            background: "rgba(255,255,255,0.88)",
            boxShadow:
              "0 42px 90px rgba(15,23,42,0.16), 0 14px 32px rgba(15,23,42,0.10), inset 0 0 0 1px rgba(15,23,42,0.06)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
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
                    fontSize: 30,
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
                  width: "100%",
                  maxWidth: 740,
                  color: "#334155",
                  fontSize: card.subtitleSize,
                  fontWeight: 600,
                  lineHeight: 1.18,
                  whiteSpace: "nowrap",
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
                marginTop: 26,
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
                      fontSize: 22,
                      fontWeight: 650,
                      padding: "7px 18px",
                    }}
                  >
                    {topic}
                  </div>
                ))}
              </div>
              <div
                style={{
                  color: "#64748b",
                  fontSize: card.footerSize,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {card.footer}
              </div>
            </div>
          </div>

          <div
            style={{
              width: 342,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 56,
            }}
          >
            <div
              style={{
                width: 318,
                height: 318,
                borderRadius: 74,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 30px 64px rgba(15,23,42,0.24)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders static markup, not next/image. */}
              <img
                alt={card.portraitAlt}
                src={portraitSrc}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 74,
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    ogImageSize,
  );
}
