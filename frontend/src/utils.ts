import axios from "axios";

interface IProject {
  user_id: number;
  project_id: number;
  project_name: string;
}

export const createHome = async (userId: number) => {
  try {
    let res = await axios.get(`/users/${userId}/projects`);
    const data = res.data;
    const home = data.find(
      (project: IProject) => project.project_name === "Home"
    );

    if (!home) {
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
