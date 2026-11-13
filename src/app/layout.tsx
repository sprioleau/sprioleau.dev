import { Footer, InfoRail, Nav, SkipToMainContentLink, Spotlight, StructuredData } from "@/components";
import ToastContainer from "@/components/ToastContainer";
import { homepageViewport, personSchema, siteMetadata, websiteSchema } from "@/seo";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";

import "@/styles/styles.scss";
import styles from "./layout.module.scss";

const inter = localFont({
  src: "../../public/fonts/inter-latin-regular.woff2",
  variable: "--font-inter",
  weight: "400",
});

const quando = localFont({
  src: "../../public/fonts/quando-latin-regular.woff2",
  variable: "--font-quando",
  weight: "400",
  adjustFontFallback: "Times New Roman",
});

export const metadata = siteMetadata;
export const viewport = homepageViewport;
const isVercelDeployment = process.env.VERCEL === "1";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${quando.variable}`}>
      <body>
        <div className="app">
          <div className={styles["layout-background"]} />
          {/* <div className={styles["little-star"]}>
            <Star />
          </div> */}
          <SkipToMainContentLink />
          <Nav />
          <InfoRail />
          <main id="main-content" className="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
        <ToastContainer />
        <Spotlight />
        {isVercelDeployment && <Analytics />}
        {isVercelDeployment && <SpeedInsights />}
        <StructuredData structuredData={[personSchema, websiteSchema]} />
      </body>
    </html>
  );
}
