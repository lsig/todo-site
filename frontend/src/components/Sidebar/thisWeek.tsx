import { useEffect, useState } from "react";
import { IProject, ITodo, isWithinCurrentWeek } from "../../utils";
import { SideBarBtn } from "./sidebarButton";
import axios from "axios";

interface Week {
  userId: number;
  projects: IProject[];
}

export function WeekBtn({ userId, projects }: Week) {
  // TODO: Window pops up when this week is pressed

  const todos: ITodo[] = [];

  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    fetchThisWeeksTodos();
    console.log(todos);
  }, [clicked]);

  const fetchThisWeeksTodos = async () => {
    projects.forEach((project) => {
      console.log("project id: ", project.project_id);
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
  };

  return <SideBarBtn name="This Week" onClick={() => setClicked(!clicked)} />;
}
