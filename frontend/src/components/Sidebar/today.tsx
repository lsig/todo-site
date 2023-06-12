import { IProject, ITodo } from "../../utils";
import { SideBarBtn } from "./sidebarButton";

interface Today {
  userId: number;
  projects: IProject[];
  setTodos: (todos: ITodo[]) => void;
  setSelectedProject: (pid: number) => void;
  setSelectedProjectName: (projectName: string) => void;
}

export function TodayBtn({
  userId,
  projects,
  setTodos,
  setSelectedProject,
  setSelectedProjectName,
}: Today) {
  console.log(userId, projects);
  const getTodaysTodos = () => {
    console.log("today pressed");
  };

  // TODO: Window pops up when today is pressed
  return <SideBarBtn name="Today" onClick={() => console.log("today")} />;
}
