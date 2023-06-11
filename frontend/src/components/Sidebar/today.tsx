import { IProject } from "../../utils";
import { SideBarBtn } from "./sidebarButton";

interface Today {
  userId: number;
  projects: IProject[];
}

export function TodayBtn({ userId, projects }: Today) {
  const getTodaysTodos = () => {};

  // TODO: Window pops up when today is pressed
  return <SideBarBtn name="Today" onClick={() => console.log("today")} />;
}
