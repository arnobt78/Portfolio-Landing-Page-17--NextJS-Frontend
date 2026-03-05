import type { Metadata } from "next";
import "./globals.css";
import Navbar from "app/components/Navbar";
import { siteMetadata } from "app/data/siteMetadata";
import { Footer } from "./components/Footer";
import { BgGradient } from "./components/BgGradient";
import { cx } from "./lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";

/**
 * Root layout: wraps every page. Defines global metadata (SEO, OG, Twitter),
 * fonts (Geist), and the main shell (Navbar, content area with decorative
 * side stripes, Footer). Third-party scripts load after interactive.
 */
export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.siteUrl),
  authors: [
    {
      name: siteMetadata.authorName,
      url: siteMetadata.authorUrl,
    },
  ],
  creator: siteMetadata.authorName,
  publisher: siteMetadata.authorName,
  keywords: [
    "portfolio",
    "John Doe",
    "front-end engineer",
    "blog",
    "developer",
    "Next.js",
    "Tailwind CSS",
    "speaker",
  ],
  openGraph: {
    type: "website",
    locale: siteMetadata.locale,
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    images: [
      {
        url: "/braydon_coyer_blogfolio_og.jpg",
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ["/braydon_coyer_blogfolio_og.jpg"],
  },
  icons: {
    icon: "/bcoyerlogo_dark.svg",
  },
  robots: {
    index: true,
    follow: true,
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
      suppressHydrationWarning
      className={`bg-bg-primary ${GeistMono.variable} ${GeistSans.variable}`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col font-sans md:max-w-7xl lg:mx-auto lg:flex-row"
      >
        <main
          className={cx(
            "relative flex flex-1 flex-col overflow-x-hidden border-x border-border-primary/50",
          )}
        >
          <Navbar />
          <div className="grid flex-1 grid-cols-1 lg:grid-cols-[32px_1fr_32px]">
            <div className="hidden w-full border-r border-border-primary opacity-75 [background-image:linear-gradient(45deg,theme(colors.border-primary)_12.50%,transparent_12.50%,transparent_50%,theme(colors.border-primary)_50%,theme(colors.border-primary)_62.50%,transparent_62.50%,transparent_100%)] [background-size:5px_5px] lg:block"></div>
            <div className="relative col-span-1 px-3 lg:px-0">
              <BgGradient />
              {children}
            </div>
            <div className="hidden w-full border-l border-border-primary opacity-75 [background-image:linear-gradient(45deg,theme(colors.border-primary)_12.50%,transparent_12.50%,transparent_50%,theme(colors.border-primary)_50%,theme(colors.border-primary)_62.50%,transparent_62.50%,transparent_100%)] [background-size:5px_5px] lg:block"></div>
          </div>
          <Footer />
        </main>
      </body>

      <Script id="vemetric-loader" strategy="afterInteractive">
        {`
          window.vmtrcq = window.vmtrcq || [];
          window.vmtrc = window.vmtrc || ((...args) => window.vmtrcq.push(args));
        `}
      </Script>

      <Script
        src="https://cdn.vemetric.com/main.js"
        data-token="HUO9AbX53v2wkzRu"
        strategy="afterInteractive"
      />
    </html>
  );
}
