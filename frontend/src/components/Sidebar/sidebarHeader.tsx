import { HomeBtn } from "./home";
import { NewProjectBtn } from "./newProject";
import { WeekBtn } from "./thisWeek";
import { TodayBtn } from "./today";

interface HeaderProps {
  userId: number;
  fetchProjects: () => void;
}

export function SidebarHeader({ userId, fetchProjects }: HeaderProps) {
  return (
    <div className="flex flex-col w-64 my-3 self-center">
      <h2 className="my-2 text-gray-400 text-2xl font-bold ">Projects</h2>
      <div className="flex flex-col gap-2 py-3 border-solid border-y-4 border-grey-200">
        <NewProjectBtn userId={userId} fetchProjects={fetchProjects} />
        <HomeBtn />
        <TodayBtn />
        <WeekBtn />
      </div>
    </div>
  );
}
