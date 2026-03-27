import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "channel47 — Turn Reddit threads and Amazon reviews into creative strategy",
  description:
    "A free Claude Code plugin that extracts real customer language from public data and turns it into personas and ad angles you can use today.",
  metadataBase: new URL("https://channel47.dev"),
  openGraph: {
    title: "channel47 — Turn Reddit threads and Amazon reviews into creative strategy",
    description:
      "A free Claude Code plugin that extracts real customer language from public data and turns it into personas and ad angles you can use today.",
    url: "https://channel47.dev",
    siteName: "channel47",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "channel47",
    description:
      "A free Claude Code plugin that extracts real customer language from public data and turns it into personas and ad angles you can use today.",
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
      className={`${satoshi.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
