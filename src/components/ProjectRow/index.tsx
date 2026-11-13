import { urlFor } from "@/libs/sanity";
import type { LinksObject, Project } from "@/schemas/types";
import formatIsoDate from "@/utils/formatIsoDate";
import sortAlphaByKey from "@/utils/sortAlphaByKey";
import icons from "../Icons";

const projectLinks = [
  { key: "gitHubUrl", label: "GitHub", icon: icons.gitHub },
  { key: "vsCodeUrl", label: "VS Code Marketplace", icon: icons.code },
  { key: "figmaUrl", label: "Figma", icon: icons.figma },
  { key: "deployedUrl", label: "Live site", icon: icons.externalLink },
] satisfies { key: keyof LinksObject; label: string; icon: React.ReactNode }[];

export default function ProjectRow({ project }: { project: Project }) {
  const { yearBuilt, title, builtFor, builtWith, links, mainImage } = project;
  const previewImage = mainImage ? urlFor(mainImage).width(650).height(364).auto("format").url() : undefined;
  const technologies = builtWith?.toSorted((a, b) => sortAlphaByKey(a, b, "name"));

  return (
    <tr className="other-work__row" data-preview-image={previewImage}>
      <td className="other-work__year other-work__hide-small">{formatIsoDate(yearBuilt, "YYYY")}</td>
      <td>{title}</td>
      <td className="other-work__hide-medium">{builtFor?.name ?? "—"}</td>
      <td className="other-work__hide-small">{technologies?.map(({ name }) => name).join(", ")}</td>
      <td>
        <ul className="other-work__links">
          {projectLinks.map(({ key, label, icon }) => {
            const href = links?.[key];

            return href ? (
              <li key={key} className="other-work__link">
                <a
                  aria-label={`${title} – ${label}`}
                  href={href}
                  rel="noreferrer"
                  className="other-work__icon-link shadow-link"
                  target="_blank"
                >
                  {icon}
                </a>
              </li>
            ) : null;
          })}
        </ul>
      </td>
    </tr>
  );
}
