import { useEffect, useState } from "react";
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
  // const [clicked, setClicked] = useState<boolean>(false);

  const fetchThisWeeksTodos = async () => {
    const todos: ITodo[] = [];
    setSelectedProject(-1); // -1 means not a project selected, but a time filter.
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
