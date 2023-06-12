import { Todo } from "../Todo/todo";
import axios from "axios";
import { ProjectHeader } from "./header";
import { useEffect } from "react";
import { ITodo } from "../../utils";

interface ProjectOverviewProps {
  userId: number;
  projectId: number;
  projectName: string;
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
}

export function ProjectOverview({
  userId,
  projectId,
  projectName,
  todos,
  setTodos,
}: ProjectOverviewProps) {
  useEffect(() => {
    fetchTodos();
  }, [projectId]);

  const fetchTodos = async () => {
    if (projectId === -1) return; // we should not fetch the todos, as we don't have a specific project.
    try {
      const res = await axios.get(
        `/users/${userId}/projects/${projectId}/todos`
      );
      setTodos(res.data);
    } catch (e) {
      console.error("Error fetching projects", e);
    }
  };

  const handleTodoDelete = async (todoId: number) => {
    if (projectId === -1) {
      alert("not implemented error");
      return;
    }
    try {
      await axios.delete(
        `/users/${userId}/projects/${projectId}/todos/${todoId}`
      );
      // Perform any additional actions after successful deletion
      fetchTodos();
    } catch (error) {
      console.error("Error deleting project", error);
      // Handle the error or show a notification to the user
    }
  };

  return (
    <div className="flex flex-col h-5/6 w-3/4 p-5 m-4 bg-gray-700 rounded-3xl sm:min-h-[555px] md:min-h-[655px] lg:min-h-[700px]">
      <ProjectHeader
        name={projectName}
        userId={userId}
        projectId={projectId}
        fetchTodos={fetchTodos}
      />
      {todos.map((todo) => (
        <Todo
          key={todo.todo_id}
          userId={todo.user_id}
          projectId={todo.project_id}
          todoId={todo.todo_id}
          title={todo.title}
          description={todo.description || ""}
          dueDate={todo.due_date}
          priority={todo.priority}
          completed={todo.completed}
          onDelete={() => handleTodoDelete(todo.todo_id)}
          fetchTodos={fetchTodos}
        />
      ))}
    </div>
  );
}
