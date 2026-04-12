import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Xinyu Tian | Phoenix",
  description:
    "Dual-mode personal brand website for Xinyu Tian | Phoenix",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Xinyu Tian | Phoenix",
    description:
      "Dual-mode personal brand website for Xinyu Tian | Phoenix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xinyu Tian | Phoenix",
    description:
      "Dual-mode personal brand website for Xinyu Tian | Phoenix",
    images: ["/favicon.ico"],
  },
};

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
      </body>
    </html>
  );
}
