import axios from "axios";
import { Header } from "./components/Header/header";
import { ProjectOverview } from "./components/ProjectOverview/projectOverview";
import { Sidebar } from "./components/Sidebar/sidebar";
import { useEffect, useState } from "react";
import { createHome } from "./utils";

axios.defaults.baseURL = "http://localhost:8080/api/v1";
const user = 1;

function App() {
  const [homeId, setHomeId] = useState(0);
  const [selectedProject, setSelectedProject] = useState(0);
  const [selectedProjectName, setSelectedProjectName] = useState("");

  useEffect(() => {
    createHome(user)
      .then((homeId) => {
        setHomeId(homeId);
        setSelectedProject(homeId);
      })
      .catch((error) => {
        console.error("Error fetching home ID:", error);
      });
  }, []);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const res = await axios.get(
          `users/${user}/projects/${selectedProject}`
        );
        // Update the necessary state or perform actions with the data
        setSelectedProject(res.data.project_id);
        setSelectedProjectName(res.data.project_name);
        console.log("selected project 1: ", selectedProject);
      } catch (error) {
        console.error("Error fetching project data", error);
      }
    };
    fetchProjectData();
  }, [selectedProject]);

  const handleSiderbarClick = (projectId: number) => {
    setSelectedProject(projectId);
    console.log("selected project: ", selectedProject);
  };

  return (
    <div className="bg-gray-800 h-full">
      <Header />
      <div className="flex">
        <Sidebar
          userId={user}
          homeId={homeId}
          onSidebarClick={handleSiderbarClick}
        />
        <ProjectOverview
          userId={user}
          projectId={selectedProject}
          projectName={selectedProjectName}
        />
      </div>
    </div>
  );
}

export default App;
