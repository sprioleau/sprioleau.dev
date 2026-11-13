import type { Metadata, Viewport } from "next";

import { homePage, portfolioOwner, SITE_URL } from "@/portfolio/routes";

const fullName = portfolioOwner.name;
const keywords = [
  fullName,
  "Portfolio",
  "Work",
  "Projects",
  "Web Development",
  "Frontend Engineer",
  "Software Engineer",
  "Full-Stack",
  "Full-Stack Engineer",
  "React",
  "TypeScript",
  "Atlanta",
];

const socialImages = [
  {
    url: "/images/sprioleau-social-card-2026-07.png",
    width: 1200,
    height: 628,
    alt: fullName,
  },
];

export const homepageViewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  themeColor: "#16032c",
  colorScheme: "dark",
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "sprioleau.dev",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: "/favicon.png",
  },
  manifest: "/manifest.json",
  keywords,
  authors: [{ name: fullName, url: SITE_URL }],
  creator: fullName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export function getPortfolioMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  const pageTitle = path === "/" ? title : `${title} | ${fullName}`;
  const url = new URL(path, SITE_URL).href;

  return {
    title: pageTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: homePage.title,
      locale: "en_US",
      type: "website",
      images: socialImages,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: socialImages,
    },
  };
}
