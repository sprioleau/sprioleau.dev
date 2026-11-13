import { client, queries } from "@/libs/sanity";

import { Project } from "@/schemas/types";
import SelectedWork from "../SelectedWork";

export default async function Work({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const featuredProjects = await client.fetch<Project[]>(
    queries.featuredProjects
  );

  return <SelectedWork projects={featuredProjects} headingLevel={headingLevel} />;
}
