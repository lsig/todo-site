import axios from "axios";
import { ChangeEvent, useState } from "react";
import { X } from "react-feather";

interface NewProjectProps {
  userId: number;
  fetchProjects: () => {};
}

export function NewProjectBtn({ userId, fetchProjects }: NewProjectProps) {
  // TODO: Window pops up when new task is pressed

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
      const res = await axios.post(`/users/${userId}/projects`, {
        project_name: projectName,
      });
      console.log(res.data);
      fetchProjects();
      closeDialog();
    } catch (e) {
      console.error("Error creating project", e);
    }
  };

  const handleProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  return (
    <div>
      <button
        onClick={openDialog}
        className={
          "rounded-lg w-80 h-12 mb-3 self-center bg-purple-200 text-purple-500 disabled:opacity-100 sm:w-56 sm:h-8 sm:mb-1 sm:text-xs md:w-60 md:h-10 md:mb-2 md:text-base lg:w-64 lg:h-12 lg:mb-3 lg:text-base"
        }
      >
        New Project +
      </button>
      {isOpen && (
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
      )}
    </div>
  );
}
