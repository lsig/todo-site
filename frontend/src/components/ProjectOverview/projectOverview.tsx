import { Todo } from "../Todo/todo";
import { ProjectHeader } from "./header";

export function ProjectOverview() {
  // TODO: Need to add Todos automatically
  return (
    <div className="flex flex-col h-5/6 w-3/4 p-5 m-4 bg-gray-600 rounded-3xl sm:min-h-[555px] md:min-h-[655px] lg:min-h-[700px]">
      <ProjectHeader />
      <Todo />
      <Todo />
      <Todo />
      <Todo />
    </div>
  );
}
