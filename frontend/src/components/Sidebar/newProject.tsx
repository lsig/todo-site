import axios from "axios";
import { ChangeEvent, useState } from "react";
import { X } from "react-feather";

interface NewProjectProps {
  userId: number;
  fetchProjects: () => void;
}

export function NewProjectBtn({ userId, fetchProjects }: NewProjectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const createNewProject = async () => {
    try {
      if (!projectName) return alert("Project must have a name");

      if (projectName.toLowerCase().trim() === "home")
        return alert("You already have a Home project");

      const res = await axios.post(`/users/${userId}/projects`, {
        project_name: projectName,
      });
      console.log("new project created: ", res.data);
      fetchProjects();
      setProjectName("");
      closeDialog();
    } catch (e) {
      console.error("Error creating project", e);
    }
  };

  const handleProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  return (
    <>
      <button
        onClick={openDialog}
        className={
          "rounded-lg w-64 h-12 self-center bg-purple-200 text-purple-500 disabled:opacity-100 "
        }
      >
        New Project +
      </button>
      {isOpen && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 opacity-60"></div>
          <dialog
            open
            className="fixed z-50 inset-0 flex flex-col justify-center bg-gray-600 rounded-lg"
          >
            <div className="flex justify-between text-purple-300">
              <div className="ml-6"></div>
              <h2>New Project</h2>
              <X onClick={closeDialog} />
            </div>

            <div className="p-2">
              <label htmlFor="projectName" className="p-1 text-purple-300">
                Project Name:
              </label>
              <input
                type="text"
                id="projectName"
                placeholder="Project name..."
                className="p-1"
                onChange={handleProjectNameChange}
              />
            </div>
            <button
              onClick={createNewProject}
              className="rounded-lg bg-purple-500 text-purple-100 border border-purple-400"
            >
              Submit
            </button>
          </dialog>
        </>
      )}
    </>
    // </div>
  );
}
