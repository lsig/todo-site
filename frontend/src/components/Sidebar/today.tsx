import { IProject, ITodo } from "../../utils";
import { SideBarBtn } from "./sidebarButton";

interface Today {
  userId: number;
  projects: IProject[];
  setTodos: (todos: ITodo[]) => void;
}

export function TodayBtn({ userId, projects, setTodos }: Today) {
  const getTodaysTodos = () => {};

  // TODO: Window pops up when today is pressed
  return <SideBarBtn name="Today" onClick={() => console.log("today")} />;
}
