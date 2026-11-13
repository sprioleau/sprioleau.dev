import { type Project } from "@/schemas/types";
import ProjectRow from "../ProjectRow";
import ProjectTablePreview from "./ProjectTablePreview";

export default function ProjectTable({ projects }: { projects: Project[] }) {
  return (
    <div className="other-work">
      <ProjectTablePreview>
        <table>
          <thead>
            <tr className="other-work__header-row">
              <th className="other-work__hide-small" scope="col">Year</th>
              <th scope="col">Project</th>
              <th className="other-work__hide-medium" scope="col">Built for</th>
              <th className="other-work__hide-small" scope="col">Built with</th>
              <th scope="col">Links</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => <ProjectRow key={project._id} project={project} />)}
          </tbody>
        </table>
      </ProjectTablePreview>
    </div>
  );
}
