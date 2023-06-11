import { useEffect, useState } from "react";
import { IProject, ITodo, isWithinCurrentWeek } from "../../utils";
import { SideBarBtn } from "./sidebarButton";
import axios from "axios";

interface Week {
  userId: number;
  projects: IProject[];
  setTodos: (todos: ITodo[]) => void;
  setSelectedProjectName: (pname: string) => void;
}

export function WeekBtn({
  userId,
  projects,
  setTodos,
  setSelectedProjectName,
}: Week) {
  // TODO: Window pops up when this week is pressed
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    fetchThisWeeksTodos();
  }, [clicked]);

  const fetchThisWeeksTodos = async () => {
    const todos: ITodo[] = [];
    setSelectedProjectName("Due This Week");

    projects.forEach((project) => {
      console.log("project name: ", project.project_name);
      axios
        .get(`/users/${userId}/projects/${project.project_id}/todos`)
        .then((response) => {
          const projectsTodos: ITodo[] = response.data;
          projectsTodos.forEach((todo) => {
            if (isWithinCurrentWeek(todo.due_date)) {
              todos.push(todo);
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
    setTodos(todos);
  };

  return <SideBarBtn name="This Week" onClick={fetchThisWeeksTodos} />;
}
