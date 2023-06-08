import { HomeBtn } from "./home";
import { NewProjectBtn } from "./newProject";
import { WeekBtn } from "./thisWeek";
import { TodayBtn } from "./today";

export function SidebarHeader() {
  return (
    <div className="flex flex-col w-64 my-3 self-center">
      <h2 className="my-2 text-gray-400 text-4xl sm:text-base md:text-xl lg:text-xl">
        Projects
      </h2>
      <div className="flex flex-col pt-3 border-solid border-y-4 border-grey-200">
        <NewProjectBtn />
        <HomeBtn />
        <TodayBtn />
        <WeekBtn />
      </div>
    </div>
  );
}
