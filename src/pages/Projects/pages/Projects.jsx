import ProjectCard from "../components/ProjectCard";
import ProjectList from "../components/ProjectList";
import ProjectCardSkeleton from '../../../components/skeletons/projectCardSkeleton'
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
      console.log(data.projects);
      setProjects(data.projects);
      const total = data.projects.length;
      const completed = data.projects.filter(
        (project) => project.status === "Completed"
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
      <div className="mt-4 py-2 px-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="uppercase font-bold text-2xl">Projects</h1>
          <Link className="flex items-center gap-2 text-lg font-medium hover:bg-neutral-100 p-2 hover:rounded-lg transition-all duration-300" to={'/home/projects/create'}>
            <span>Add Project</span>
            <div className="p-[2px] bg-logo rounded-full">
              <Plus color="white" />
            </div>
          </Link>
        </div>
        <hr className="bg-black mt-1" />

        {/* Content */}
        <div className="mt-8 space-y-6">
          <p className="text-lg font-medium">Projects you are on</p>

          {projectsError.status && (
            <p className="text-red-500 mt-2">
              {projectsError.msg}
              <p
                className="hover:underline hover:cursor-pointer"
                onClick={getProjects}
              >
                Retry?
              </p>
            </p>
          )}

          <div className="project overflow-x-auto px-4">
            <div className="flex pb-4 min-w-max gap-6">
              {!projectsError.status ? (
                projectsLoading ? (

                  <div className="flex gap-6">
                    <ProjectCardSkeleton />
                    <ProjectCardSkeleton />
                    <ProjectCardSkeleton />
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
          <h1 className="uppercase font-medium text-xl">Projects Report</h1>
          <ProjectList projectCounts={projectsStats} />
        </div>
      </div>
    </div>
  );
};

export default Projects;
