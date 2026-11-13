import Hero from "@/components/Hero";
import PortfolioSection from "@/portfolio/PortfolioSection";
import { homePage, portfolioSections } from "@/portfolio/routes";
import { getPortfolioMetadata } from "@/seo";

export const dynamic = "force-dynamic";
export const metadata = getPortfolioMetadata(homePage);

export default function HomePage() {
  return (
    <>
      <Hero />
      {portfolioSections.map((section) => (
        <PortfolioSection
          key={section.slug}
          section={section}
        />
      ))}
    </>
  );
}
