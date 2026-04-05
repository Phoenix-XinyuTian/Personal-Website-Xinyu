import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xinyu Tian ｜ Phoenix | AI & Computer Vision",
  description:
    "Personal website for Xinyu Tian, an NUS Master’s student focused on computer vision, AI, and digital storytelling.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Xinyu Tian ｜ Phoenix | AI & Computer Vision",
    description:
      "Personal website for Xinyu Tian, an NUS Master’s student focused on computer vision, AI, and digital storytelling.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xinyu Tian ｜ Phoenix | AI & Computer Vision",
    description:
      "Personal website for Xinyu Tian, an NUS Master’s student focused on computer vision, AI, and digital storytelling.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-slate-950 selection:bg-sky-300 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
