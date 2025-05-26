
import { Link } from "react-router-dom";
import Dashboxes from "./Dashboxes";
import { Dot } from "lucide-react";

const Projects = ({ projects }) => {
  return (
    <Dashboxes header="Projects" nav="projects">
      <ul className="">
        {projects.length > 0 ? (
          projects.slice(0, 3)  .map((project) => {
            const { _id, name, description, status } = project;
            return (
              <Link key={_id} to={`/home/projects/${_id}`} state={project}>
                <div className="my-2 rounded-lg border p-2 hover:bg-navBg1">
                  <div className="flex items-center justify-between">
                    <li className="fade-in truncate text-base text-navBg2">
                      {name}
                    </li>
                    {
                      <Dot
                        size={36}
                        color={status == "Completed" ? "green" : "red"}
                      />
                    }
                  </div>
                  <li className="truncate text-xs">{description}</li>
                </div>
              </Link>
            );
          })
        ) : (
          // Work on skeletons. They will only show loading states of the contents when it's fetching from the backend. I'll work on that.
          <div className="">
            <p>No items...</p>
          </div>
        )}
      </ul>
    </Dashboxes>
  );
};

export default Projects;
