import ExperienceSlider from "../ExperienceSlider";

export default function Experience({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  return <ExperienceSlider headingLevel={headingLevel} />;
}
