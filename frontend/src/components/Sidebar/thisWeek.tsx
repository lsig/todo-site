import { IProject, ITodo, isWithinCurrentWeek } from "../../utils";
import { SideBarBtn } from "./sidebarButton";
import axios from "axios";

interface Week {
  userId: number;
  projects: IProject[];
  setTodos: (todos: ITodo[]) => void;
  setSelectedProject: (pid: number) => void;
  setSelectedProjectName: (pname: string) => void;
}

export function WeekBtn({
  userId,
  projects,
  setTodos,
  setSelectedProject,
  setSelectedProjectName,
}: Week) {
  const fetchThisWeeksTodos = async () => {
    const todos: ITodo[] = [];
    setSelectedProject(-1); // -1 means not a project selected, but a time filter.
    setSelectedProjectName("Due This Week");

    const axiosPromises = projects.map((project) =>
      axios.get(`/users/${userId}/projects/${project.project_id}/todos`)
    );

    try {
      const responses = await Promise.all(axiosPromises); // waits for all calls to the backend.

      responses.forEach((response) => {
        const projectsTodos: ITodo[] = response.data;

        projectsTodos.forEach((todo) => {
          if (isWithinCurrentWeek(todo.due_date)) {
            todos.push(todo);
          }
        });
      });

      setTodos(todos);
    } catch (error) {
      console.error(error);
    }
  };

  return <SideBarBtn name="This Week" onClick={fetchThisWeeksTodos} />;
}
