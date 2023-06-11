import axios from "axios";

export interface IProject {
  user_id: number;
  project_id: number;
  project_name: string;
}

export interface ITodo {
  todo_id: number;
  title: string;
  description: string | null;
  priority: number;
  completed: boolean;
  due_date: string; // might be / should be of type Date??
}

export const createHome = async (userId: number) => {
  try {
    const res = await axios.get(`/users/${userId}/projects`);
    const data = res.data;
    const home: IProject = data.find(
      (project: IProject) => project.project_name === "Home"
    );
    console.log("home is:", home);

    if (home === undefined) {
      const createRes = await axios.post(`/users/${userId}/projects`, {
        project_name: "Home",
      });
      return createRes.data.project_id;
    }
    return home.project_id;
  } catch (e) {
    console.error("Error fetching Home", e);
  }
};

export const isToday = (date: string | Date): boolean => {
  const today = new Date();
  const compareDate = new Date(date);

  // Check if the compareDate is today
  return (
    compareDate.getDate() === today.getDate() &&
    compareDate.getMonth() === today.getMonth() &&
    compareDate.getFullYear() === today.getFullYear()
  );
};

export const isWithinCurrentWeek = (date: string | Date): boolean => {
  const today = new Date();
  const compareDate = new Date(date);

  // Calculate the difference in days between compareDate and the next Monday
  const daysUntilNextMonday = (1 + 7 - today.getDay()) % 7;

  // Calculate the difference in days between compareDate and today
  const diffDays = Math.floor(
    (compareDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Check if compareDate is within the current week
  return diffDays >= 0 && diffDays <= daysUntilNextMonday;
};
