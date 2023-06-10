import { HomeBtn } from "./home";
import { NewProjectBtn } from "./newProject";
import { WeekBtn } from "./thisWeek";
import { TodayBtn } from "./today";

interface HeaderProps {
  userId: number;
  fetchProjects: () => {};
}

export function SidebarHeader({ userId, fetchProjects }: HeaderProps) {
  return (
    <div className="flex flex-col w-64 my-3 self-center">
      <h2 className="my-2 text-gray-400 text-4xl font-bold sm:text-base md:text-xl lg:text-xl">
        Projects
      </h2>
      <div className="flex flex-col pt-3 border-solid border-y-4 border-grey-200">
        <NewProjectBtn userId={userId} fetchProjects={fetchProjects} />
        <HomeBtn />
        <TodayBtn />
        <WeekBtn />
      </div>
    </div>
  );
}
