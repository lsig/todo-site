import axios from "axios";
import { useEffect, useState } from "react";
import { Project } from "./project";
import { SidebarHeader } from "./sidebarHeader";

interface User {
  userId: number;
  onSidebarClick: (projectId: number) => void;
}

export function Sidebar({ userId, onSidebarClick }: User) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`/users/${userId}/projects`);
      setProjects(res.data);
      console.log(res.data);
    } catch (e) {
      console.error("Error fetching projects", e);
    }
  };

  const handleProjectDelete = async (projectId: number) => {
    try {
      await axios.delete(`/users/${userId}/projects/${projectId}`);
      // Perform any additional actions after successful deletion
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project", error);
      // Handle the error or show a notification to the user
    }
  };

  return (
    <div className="flex-1 flex flex-col w-80 px-4 py-2 bg-gray-700 rounded-2xl m-4 sm:min-h-[555px] md:min-h-[655px] lg:min-h-[700px]">
      <SidebarHeader userId={userId} fetchProjects={fetchProjects} />
      {projects.map((project) => (
        <Project
          key={project.project_id}
          userId={project.user_id}
          projectId={project.project_id}
          projectName={project.project_name}
          onDelete={() => handleProjectDelete(project.project_id)}
          onClick={() => onSidebarClick(project.project_id)}
        />
      ))}
    </div>
  );
}
