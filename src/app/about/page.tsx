import PortfolioSection from "@/portfolio/PortfolioSection";
import { aboutPage } from "@/portfolio/routes";
import { getPortfolioMetadata } from "@/seo";

export const dynamic = "force-dynamic";
export const metadata = getPortfolioMetadata(aboutPage);

export default function AboutPage() {
  return (
    <PortfolioSection
      section={aboutPage}
      headingLevel={1}
    />
  );
}
