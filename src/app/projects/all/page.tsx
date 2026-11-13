import { BackButton, ProjectTable } from "@/components";
import { client, queries } from "@/libs/sanity";
import { projectsArchivePage } from "@/portfolio/routes";
import { Project } from "@/schemas/types";
import { getPortfolioMetadata } from "@/seo";

import styles from "./styles.module.scss";

export const metadata = getPortfolioMetadata(projectsArchivePage);

export default async function ProjectsArchive() {
  const projects = await client.fetch<Project[]>(queries.allProjects);

  return (
    <>
      <div className={styles.page}>
        <BackButton
          to="/"
          title="San'Quan Prioleau"
        />
        <h1>{projectsArchivePage.title}</h1>
        <ProjectTable projects={projects} />
      </div>
    </>
  );
}
