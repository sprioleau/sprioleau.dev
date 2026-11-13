import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import PageSectionLayout from "@/components/PageSectionLayout";
import Work from "@/components/Work";

import type { portfolioSections } from "./routes";

type Section = (typeof portfolioSections)[number];

const sectionContent = {
  about: About,
  experience: Experience,
  work: Work,
  contact: Contact,
};

export default function PortfolioSection({ section, headingLevel = 2 }: { section: Section; headingLevel?: 1 | 2 }) {
  const Content = sectionContent[section.slug];

  return (
    <PageSectionLayout
      sectionId={section.slug}
      sectionTitle={section.title}
      headingLevel={headingLevel}
    >
      <Content headingLevel={headingLevel === 1 ? 2 : 3} />
    </PageSectionLayout>
  );
}
