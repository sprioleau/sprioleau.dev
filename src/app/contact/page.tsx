import PortfolioSection from "@/portfolio/PortfolioSection";
import { contactPage } from "@/portfolio/routes";
import { getPortfolioMetadata } from "@/seo";

export const dynamic = "force-dynamic";
export const metadata = getPortfolioMetadata(contactPage);

export default function ContactPage() {
  return (
    <PortfolioSection
      section={contactPage}
      headingLevel={1}
    />
  );
}
