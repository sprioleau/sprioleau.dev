import { composeClasses } from "../../utils";

type Props = {
  id?: string;
  headingLevel: 1 | 2;
  sectionTitle: string;
  shouldCenter?: boolean;
};

export default function SectionHeader({ id, headingLevel, sectionTitle, shouldCenter = false }: Props) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  const sectionHeaderClasses = composeClasses({
    "section-header": true,
    center: shouldCenter,
  });

  return (
    <header className={sectionHeaderClasses}>
      <Heading
        id={id}
        className="section-header__title"
      >
        {sectionTitle}
      </Heading>
      <div className="section-header__accent-line" />
    </header>
  );
}
