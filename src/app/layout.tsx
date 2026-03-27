import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
