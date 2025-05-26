import ProjectCard from "../components/ProjectCard";
import ProjectList from "../components/ProjectList";
import ProjectSkeleton from "../../../components/skeletons/ProjectSkeleton";
import { Plus } from "lucide-react";
import { useRequest } from "../../../Modules/useRequest";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [projectsStats, setProjectsStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
  });
  const [
    projectsRequest,
    projectsLoading,
    setProjectsLoading,
    projectsError,
    setProjectsError,
  ] = useRequest();

  const getProjects = async () => {
    setProjectsLoading(true);
    const res = await projectsRequest("project/get_all");
    const data = await res.json();
    
    if (res.ok) {
      console.log(data);
      setProjects(data.projects);
      const total = data.projects.length;
      const completed = data.projects.filter(
        (project) => project.status === "Completed",
      ).length;
      const inProgress = total - completed;
      setProjectsStats({ total, completed, inProgress });
    } else {
      setProjectsError({ status: true, msg: data.message });
    }
    setProjectsLoading(false);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mt-4 px-4 py-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold uppercase">Projects</h1>
          <Link
            className="flex items-center gap-2 p-2 text-lg font-medium transition-all duration-300 hover:rounded-lg hover:bg-neutral-100"
            to={"/home/projects/create"}
          >
            <span>Add Project</span>
            <div className="rounded-full bg-logo p-[2px]">
              <Plus color="white" />
            </div>
          </Link>
        </div>
        <hr className="mt-1 bg-black" />

        {/* Content */}
        <div className="mt-8 space-y-6">
          <p className="text-lg font-medium">Projects you are on</p>

          {projectsError.status && (
            <p className="mt-2 text-red-500">
              {projectsError.msg}
              <p
                className="hover:cursor-pointer hover:underline"
                onClick={getProjects}
              >
                Retry?
              </p>
            </p>
          )}

          <div className="project overflow-x-auto px-4">
            <div className="flex min-w-max gap-6 pb-4">
              {!projectsError.status ? (
                projectsLoading ? (
                  <div className="flex gap-6">
                    <ProjectSkeleton />
                    <ProjectSkeleton />
                    <ProjectSkeleton />
                  </div>
                ) : (
                  projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))
                )
              ) : (
                <p>No projects found...</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-xl font-medium uppercase">Projects Report</h1>
          <ProjectList projectCounts={projectsStats} />
        </div>
      </div>
    </div>
  );
};

export default Projects;
