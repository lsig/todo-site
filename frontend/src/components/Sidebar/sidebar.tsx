import axios from "axios";
import { useEffect, useState } from "react";
import { Project } from "./project";
import { SidebarHeader } from "./sidebarHeader";
import { IProject, ITodo } from "../../utils";

interface User {
  userId: number;
  homeId: number;
  onSidebarClick: (projectId: number) => void;
  setTodos: (todos: ITodo[]) => void;
  setSelectedProjectName: (pname: string) => void;
}

export function Sidebar({
  userId,
  homeId,
  onSidebarClick,
  setTodos,
  setSelectedProjectName,
}: User) {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`/users/${userId}/projects`);
      setProjects(res.data);
      console.log("projects: ", res.data);
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
    <div
      id="sidebar"
      className="flex-1 flex flex-col w-80 px-4 py-2 bg-gray-700 rounded-2xl m-4 sm:min-h-[555px] md:min-h-[655px] lg:min-h-[700px]"
    >
      <SidebarHeader
        userId={userId}
        homeId={homeId}
        projects={projects}
        fetchProjects={fetchProjects}
        onSidebarClick={onSidebarClick}
        setTodos={setTodos}
        setSelectedProjectName={setSelectedProjectName}
      />
      {projects.map(
        (project) =>
          project.project_id != homeId && (
            <Project
              key={project.project_id}
              userId={project.user_id}
              projectId={project.project_id}
              projectName={project.project_name}
              onDelete={() => handleProjectDelete(project.project_id)}
              onSiderbarClick={() => onSidebarClick(project.project_id)}
            />
          )
      )}
    </div>
  );
}
