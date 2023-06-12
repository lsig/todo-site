import axios from "axios";
import { IProject, ITodo, isToday } from "../../utils";
import { SideBarBtn } from "./sidebarButton";

interface Today {
  userId: number;
  projects: IProject[];
  setTodos: (todos: ITodo[]) => void;
  setSelectedProject: (pid: number) => void;
  setSelectedProjectName: (projectName: string) => void;
}

export function TodayBtn({
  userId,
  projects,
  setTodos,
  setSelectedProject,
  setSelectedProjectName,
}: Today) {
  const fetchTodaysTodos = async () => {
    const todos: ITodo[] = [];
    setSelectedProject(-1); // -1 means not a project selected, but a time filter.
    setSelectedProjectName("Due Today");

    const axiosPromises = projects.map((project) =>
      axios.get(`/users/${userId}/projects/${project.project_id}/todos`)
    );

    try {
      const responses = await Promise.all(axiosPromises); // waits for all calls to the backend.

      responses.forEach((response) => {
        const projectsTodos: ITodo[] = response.data;

        projectsTodos.forEach((todo) => {
          if (isToday(todo.due_date)) {
            todos.push(todo);
          }
        });
      });

      setTodos(todos);
    } catch (error) {
      console.error(error);
    }
  };

  return <SideBarBtn name="Today" onClick={fetchTodaysTodos} />;
}
