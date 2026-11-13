import { notFound } from "next/navigation";

import PortfolioSection from "@/portfolio/PortfolioSection";
import { portfolioSections } from "@/portfolio/routes";
import { getPortfolioMetadata } from "@/seo";

export const dynamic = "force-dynamic";
export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioSections.map(({ slug }) => ({ section: slug }));
}

async function getSection(params: Promise<{ section: string }>) {
  const { section } = await params;
  const entry = portfolioSections.find(({ slug }) => slug === section);
  if (!entry) notFound();
  return entry;
}

export async function generateMetadata({ params }: PageProps<"/[section]">) {
  const section = await getSection(params);
  return getPortfolioMetadata({ ...section, path: `/${section.slug}` });
}

export default async function SectionPage({ params }: PageProps<"/[section]">) {
  const section = await getSection(params);
  return (
    <PortfolioSection
      section={section}
      headingLevel={1}
    />
  );
}
