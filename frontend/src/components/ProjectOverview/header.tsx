import { NewTaskBtn } from "./NewTask";

export function ProjectHeader() {
  //TODO: Change Bathroom to projectName prop
  return (
    <div className="flex flex-wrap w-11/12 self-center justify-between border-solid border-b-4 border-purple-200">
      <h2 className="mt-2 text-purple-200 text-4xl font-bold sm:text-3xl md:text-4xl lg:text-4xl">
        Bathroom
      </h2>
      <NewTaskBtn />
    </div>
  );
}
