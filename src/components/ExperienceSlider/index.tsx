import { client, queries } from "@/libs/sanity";
import { type Experience } from "@/schemas/types";
import formatJobDates from "@/utils/formatJobDates";
import icons from "../Icons";
import PortableTextBlock from "../PortableTextBlock";
import TabList from "../TabList";
import TabLabel from "../TabList/components/TabLabel";

function ExperienceDetails({ experience, headingLevel }: { experience: Experience; headingLevel: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const { jobTitle, fromDate, toDate, currentlyInRole, employer, workHighlights } = experience;

  return (
    <>
      <header className="tab-list__header">
        <Heading className="tab-list__header-title">
          <span className="tab-list__role">{jobTitle}</span>{" "}
          {employer && (
            <span className="tab-list__employer">
              @&nbsp;
              {employer.webAddress ? (
                <a
                  href={employer.webAddress}
                  target="_blank"
                  rel="noreferrer"
                  className="tab-list__employer-link shadow-link"
                >
                  <span>{employer.name}</span>
                  <span className="icon p0" aria-hidden>{icons.externalLink}</span>
                </a>
              ) : employer.name}
            </span>
          )}
        </Heading>
        <p className="tab-list__dates">{formatJobDates(fromDate, toDate, currentlyInRole)}</p>
      </header>
      <ul className="tab-list__work-list">
        {workHighlights?.map(({ _key, children, markDefs }) => (
          <li key={_key} className="tab-list__work-list-item">
            <p>
              <PortableTextBlock childrenContent={children} markDefs={markDefs} />
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default async function ExperienceSlider({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const experience = await client.fetch<Experience[]>(queries.experience);

  if (!experience.length) return null;

  return (
    <TabList
      tabs={experience.map((entry) => ({
        id: entry._id,
        label: <TabLabel experience={entry} />,
        details: <ExperienceDetails experience={entry} headingLevel={headingLevel} />,
      }))}
    />
  );
}
