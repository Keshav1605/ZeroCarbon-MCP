import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import ScrollProvider from "./ScrollProvider";

import ThemeProvider from "./ThemeProvider";

// Load Google Fonts using Next.js optimization
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

// Enterprise-grade SEO Metadata using Next.js Metadata API
export const metadata: Metadata = {
  title: "ZeroCarbon MCP | Fewer Clicks, More Carbon Intelligence",
  description: "Enterprise Carbon Operating System. Unify AI agents, carbon telemetry, and compliance workflows in one automated control plane. Track Scope 1-3 emissions in real-time.",
  metadataBase: new URL("https://zerocarbon-mcp.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ZeroCarbon MCP | Fewer Clicks, More Carbon Intelligence",
    description: "Enterprise Carbon Operating System. Unify AI agents, carbon telemetry, and compliance workflows in one automated control plane. Track Scope 1-3 emissions in real-time.",
    url: "https://zerocarbon-mcp.vercel.app",
    siteName: "ZeroCarbon MCP",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroCarbon MCP | Fewer Clicks, More Carbon Intelligence",
    description: "Enterprise Carbon Operating System. Unify AI agents, carbon telemetry, and compliance workflows in one automated control plane.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${hankenGrotesk.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to fonts gstatic to speed up external assets (Material Symbols) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-off-white text-text-main selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ScrollProvider>
            {children}
          </ScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
