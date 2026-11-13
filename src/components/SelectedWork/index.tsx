import PortableTextBlock from "../PortableTextBlock";
import { Project } from "@/schemas/types";
import icons from "../Icons";
import { urlFor } from "../../libs/sanity";
import Link from "next/link";
import Image from "next/image";

export default function SelectedWork({
  projects,
  headingLevel,
}: { projects: Project[]; headingLevel: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="selected-work">
      <ul className="selected-work__works">
        {projects.map(
          ({ _id, mainImage, title, tags, description, links }) => {
            const { gitHubUrl, vsCodeUrl, figmaUrl, deployedUrl } = links ?? {};
            const projectImage = mainImage && (
              <Image
                src={urlFor(mainImage).width(800).height(450).auto("format").url()}
                alt=""
                width={800}
                height={450}
                sizes="(max-width: 900px) 85vw, 420px"
              />
            );

            return (
              <li key={_id} className="selected-work__work">
                {projectImage && (
                  <div className="selected-work__image">
                    {deployedUrl ? (
                      <a
                        href={deployedUrl}
                        className="button selected-work__link"
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${title}`}
                      >
                        {projectImage}
                      </a>
                    ) : projectImage}
                  </div>
                )}
                <div className="selected-work__details">
                  <Heading className="selected-work__title">{title}</Heading>
                  <p className="selected-work__description">
                    {description.map(({ _key, children, markDefs }) => (
                      <PortableTextBlock
                        key={_key}
                        childrenContent={children}
                        markDefs={markDefs}
                      />
                    ))}
                  </p>
                  <div className="selected-work__meta">
                    {tags && (
                      <ul className="selected-work__tags">
                        {tags.map(({ _id: tagKey, name }) => (
                          <li
                            key={tagKey}
                            className="selected-work__tag"
                          >
                            <p>{name}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                    {(gitHubUrl || vsCodeUrl || figmaUrl || deployedUrl) && (
                      <ul className="selected-work__icon-links">
                        {gitHubUrl && (
                          <li>
                            <a
                              aria-label={`View ${title} on GitHub`}
                              href={gitHubUrl}
                              rel="noreferrer"
                              className="selected-work__icon-link shadow-link"
                              target="_blank"
                            >
                              {icons.gitHub}
                            </a>
                          </li>
                        )}
                        {vsCodeUrl && (
                          <li>
                            <a
                              aria-label={`View ${title} on the VS Code Marketplace`}
                              href={vsCodeUrl}
                              rel="noreferrer"
                              className="selected-work__icon-link shadow-link"
                              target="_blank"
                            >
                              {icons.code}
                            </a>
                          </li>
                        )}
                        {figmaUrl && (
                          <li>
                            <a
                              aria-label={`View ${title} on Figma`}
                              href={figmaUrl}
                              rel="noreferrer"
                              className="selected-work__icon-link shadow-link"
                              target="_blank"
                            >
                              {icons.figma}
                            </a>
                          </li>
                        )}
                        {deployedUrl && (
                          <li>
                            <a
                              aria-label={`Visit ${title}`}
                              href={deployedUrl}
                              rel="noreferrer"
                              className="selected-work__icon-link shadow-link"
                              target="_blank"
                            >
                              {icons.externalLink}
                            </a>
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            );
          }
        )}
      </ul>
      <Link
        href="/projects/all"
        className="button selected-work__view-all-projects-link"
        prefetch={false}
      >
        View All Projects
      </Link>
    </div>
  );
}
