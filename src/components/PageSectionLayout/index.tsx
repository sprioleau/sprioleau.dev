import { composeClasses } from "@/utils";
import SectionHeader from "../SectionHeader";
import BackButton from "../BackButton";

type Props = {
  sectionTitle: string;
  children: React.ReactNode;
  headingLevel?: 1 | 2;
  sectionId?: string;
  shouldCenter?: boolean;
};

export default function PageSectionLayout({
  sectionTitle,
  children,
  headingLevel = 2,
  sectionId = "",
  shouldCenter = false,
}: Props) {
  const pageSectionLayoutClasses = composeClasses({
    section: true,
    [sectionId]: Boolean(sectionId),
  });
  const headingId = sectionId ? `${sectionId}-heading` : undefined;

  return (
    <section
      id={sectionId || undefined}
      className={pageSectionLayoutClasses}
      aria-labelledby={headingId}
      tabIndex={sectionId ? -1 : undefined}
    >
      <div className="container">
        {headingLevel === 1 && <BackButton title="Back to homepage" />}
        <SectionHeader
          id={headingId}
          headingLevel={headingLevel}
          sectionTitle={sectionTitle}
          shouldCenter={shouldCenter}
        />
        <div className={sectionId ? `${sectionId}__main-content` : undefined}>{children}</div>
      </div>
    </section>
  );
}
