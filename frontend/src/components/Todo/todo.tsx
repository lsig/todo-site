import { Checkbox } from "./checkbox";
import { DueDate } from "./date";
import { PriorityBtn } from "./priority";
import { DetailsBtn } from "./details";
import { EditBtn } from "./edit";
import { TrashBtn } from "./trash";

interface TodoProps {
  userId: number;
  projectId: number;
  todoId: number;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  completed: boolean;
  onDelete: () => void;
  fetchTodos: () => Promise<void>;
}

export function Todo({
  userId,
  projectId,
  todoId,
  title,
  description,
  dueDate,
  priority,
  completed,
  onDelete,
  fetchTodos,
}: TodoProps) {
  return (
    <div className="flex h-20 w-11/12 mt-8 gap-2 self-center justify-between bg-purple-300 rounded-3xl">
      <div className="flex gap-5 pl-10">
        <Checkbox
          label={title}
          values={{ userId: userId, projectId: projectId, todoId: todoId }}
        />
        <DueDate dueDate={dueDate} />
      </div>
      <div className="flex self-center gap-5">
        <PriorityBtn priority={priority} />
        <DetailsBtn
          title={title}
          description={description}
          dueDate={dueDate}
          priority={priority}
          completed={completed}
        />
      </div>
      <div className="flex gap-5 pr-8">
        <EditBtn
          userId={userId}
          projectId={projectId}
          todoId={todoId}
          title={title}
          description={description}
          dueDate={dueDate}
          priority={priority}
          fetchTodos={fetchTodos}
        />
        <TrashBtn onClick={onDelete} />
      </div>
    </div>
  );
}
