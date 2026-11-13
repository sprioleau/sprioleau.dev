import PortfolioSection from "@/portfolio/PortfolioSection";
import { workPage } from "@/portfolio/routes";
import { getPortfolioMetadata } from "@/seo";

export const dynamic = "force-dynamic";
export const metadata = getPortfolioMetadata(workPage);

export default function WorkPage() {
  return (
    <PortfolioSection
      section={workPage}
      headingLevel={1}
    />
  );
}
