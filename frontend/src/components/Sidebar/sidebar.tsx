import { Project } from "./project";
import { SidebarHeader } from "./sidebarHeader";

export function Sidebar() {
  return (
    <div className="flex flex-col w-80 px-4 py-2 bg-gray-600 rounded-2xl m-4 sm:min-h-[555px] md:min-h-[655px] lg:min-h-[700px]">
      <SidebarHeader />
      <Project />
      <Project />
      <Project />
    </div>
  );
}
