import PortfolioSection from "@/portfolio/PortfolioSection";
import { experiencePage } from "@/portfolio/routes";
import { getPortfolioMetadata } from "@/seo";

export const dynamic = "force-dynamic";
export const metadata = getPortfolioMetadata(experiencePage);

export default function ExperiencePage() {
  return (
    <PortfolioSection
      section={experiencePage}
      headingLevel={1}
    />
  );
}
