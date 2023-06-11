import { useState } from "react";
import { X } from "react-feather";

interface DetailsProps {
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  completed: boolean;
}

enum Priority {
  Low = 1,
  Medium = 2,
  High = 3,
}

export function DetailsBtn({
  title,
  description,
  dueDate,
  priority,
  completed,
}: DetailsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const getPriority = (priority: number) => {
    switch (priority) {
      case Priority.Low:
        return "Low";
        break;
      case Priority.Medium:
        return "Medium";
        break;
      case Priority.High:
        return "High";
        break;
      default:
        return "No Priority";
        break;
    }
  };

  return (
    <>
      <button
        onClick={openDialog}
        className={
          "rounded-lg w-28 h-10 bg-purple-200 text-purple-500 disabled:opacity-100 sm:w-20 sm:h-6 sm:text-xs md:w-24 md:h-8 md:text-sm lg:w-28 lg:h-10"
        }
      >
        Details
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-500 opacity-95">
          <dialog
            open
            className="fixed z-50 inset-0 flex flex-col justify-center bg-gray-600 rounded-lg"
          >
            <div className="flex justify-between text-purple-300">
              <div className="ml-6"></div>
              <h2>{title}</h2>
              <X onClick={closeDialog} />
            </div>

            <div className="p-2 text-purple-300">
              Description: {description}
            </div>
            <div className="p-2 text-purple-300">DueDate: {dueDate}</div>
            <div className="p-2 text-purple-300">
              Priority: {getPriority(priority)}
            </div>
            <div className="p-2 text-purple-300">
              Completed: {completed.toString()}
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}
