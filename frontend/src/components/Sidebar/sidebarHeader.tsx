import { IProject, ITodo } from "../../utils";
import { HomeBtn } from "./home";
import { NewProjectBtn } from "./newProject";
import { WeekBtn } from "./thisWeek";
import { TodayBtn } from "./today";

interface HeaderProps {
  userId: number;
  homeId: number;
  projects: IProject[];
  fetchProjects: () => void;
  onSidebarClick: (projectId: number) => void;
  setTodos: (todos: ITodo[]) => void;
  setSelectedProject: (pid: number) => void;
  setSelectedProjectName: (pname: string) => void;
}

export function SidebarHeader({
  userId,
  homeId,
  projects,
  fetchProjects,
  onSidebarClick,
  setTodos,
  setSelectedProject,
  setSelectedProjectName,
}: HeaderProps) {
  return (
    <div className="flex flex-col w-64 my-3 self-center">
      <h2 className="my-2 text-gray-400 text-2xl font-bold ">Projects</h2>
      <div className="flex flex-col gap-2 py-3 border-solid border-y-4 border-grey-200">
        <NewProjectBtn userId={userId} fetchProjects={fetchProjects} />
        <HomeBtn homeId={homeId} onSidebarClick={onSidebarClick} />
        <TodayBtn
          userId={userId}
          projects={projects}
          setTodos={setTodos}
          setSelectedProject={setSelectedProject}
          setSelectedProjectName={setSelectedProjectName}
        />
        <WeekBtn
          userId={userId}
          projects={projects}
          setTodos={setTodos}
          setSelectedProject={setSelectedProject}
          setSelectedProjectName={setSelectedProjectName}
        />
      </div>
    </div>
  );
}
