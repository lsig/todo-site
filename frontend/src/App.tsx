// import { useState } from "react";
// import { PriorityBtn } from "./components/Todo/priority";
// import { DetailsBtn } from "./components/Todo/details";
// import { TrashBtn } from "./components/Todo/trash";
// import { EditBtn } from "./components/Todo/edit";
// import { DueDate } from "./components/Todo/date";
// import { Checkbox } from "./components/Todo/checkbox";
// import { Todo } from "./components/Todo/todo";
// import { NewTaskBtn } from "./components/ProjectOverview/NewTask";
// import { ProjectHeader } from "./components/ProjectOverview/header";
import axios from "axios";
import { Header } from "./components/Header/header";
import { ProjectOverview } from "./components/ProjectOverview/projectOverview";
// import { NewProjectBtn } from "./components/Sidebar/newProject";
// import { Project } from "./components/Sidebar/project";
// import { SidebarHeader } from "./components/Sidebar/sidebarHeader";
import { Sidebar } from "./components/Sidebar/sidebar";
import { useEffect, useState } from "react";
import { createHome } from "./utils";

axios.defaults.baseURL = "http://localhost:8080/api/v1";
const user = 1;

localStorage.setItem("user", "1");

function App() {
  const [homeId, setHomeId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(0);

  useEffect(() => {
    createHome(user)
      .then((homeId) => {
        setHomeId(homeId);
        setSelectedProject(homeId);
      })
      .catch((error) => {
        console.error("Error fetching home ID:", error);
      });
  }, [user]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const res = await axios.get(
          `users/${user}/projects/${selectedProject}`
        );
        // Update the necessary state or perform actions with the data
        setSelectedProject(res.data.project_id);
      } catch (error) {
        console.error("Error fetching project data", error);
      }
    };
    fetchProjectData();
  }, [selectedProject]);

  const handleSiderbarClick = (projectId: number) => {
    setSelectedProject(projectId);
  };

  return (
    <div className="bg-gray-800 h-full">
      <Header />
      <div className="flex">
        <Sidebar userId={user} onSidebarClick={handleSiderbarClick} />
        <ProjectOverview userId={user} projectId={selectedProject} />
      </div>
    </div>
  );
}

export default App;
