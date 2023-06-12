import { NewTaskBtn } from "./NewTask";

interface ProjectHeaderProps {
  name: string;
  userId: number;
  projectId: number;
  fetchTodos: () => Promise<void>;
}
export function ProjectHeader({
  name,
  userId,
  projectId,
  fetchTodos,
}: ProjectHeaderProps) {
  return (
    <div className="flex flex-wrap pb-3 w-11/12 self-center justify-between border-solid border-b-4 border-purple-200">
      <h2 className="mt-2 text-purple-200 text-4xl font-bold sm:text-3xl md:text-4xl lg:text-4xl">
        {name}
      </h2>
      {projectId !== -1 && (
        <NewTaskBtn
          userId={userId}
          projectId={projectId}
          fetchTodos={fetchTodos}
        />
      )}
    </div>
  );
}
