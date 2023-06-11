import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Edit2, X } from "react-feather";
import { RangeInputWithLabels } from "../ProjectOverview/prioritySetter";

interface EditProps {
  userId: number;
  projectId: number;
  todoId: number;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  fetchTodos: () => Promise<void>;
}

export function EditBtn({
  userId,
  projectId,
  todoId,
  title,
  description,
  dueDate,
  priority,
  fetchTodos,
}: EditProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [todoName, setTodoName] = useState(title);
  const [todoDescription, setTodoDescription] = useState<string | null>(
    description
  );
  const [todoDueDate, setDueDate] = useState<string | null>(dueDate);
  const [todoPriority, setPriority] = useState<number>(priority);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleTodoNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
  };

  const handleTodoDescriptonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoDescription(e.target.value);
  };

  const handleTodoDueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    const dateObject = new Date(dateString);

    const isValid = !isNaN(dateObject.getTime());

    setDueDate(isValid ? dateString : null);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPriority(parseInt(e.target.value));
  };

  const patchTodo = async () => {
    try {
      const res = await axios.patch(
        `/users/${userId}/projects/${projectId}/todos/${todoId}`,
        {
          title: todoName,
          description: todoDescription,
          due_date: todoDueDate,
          priority: todoPriority,
        }
      );
      console.log("patched todo: ", res.data);
      fetchTodos();
      closeDialog();
    } catch (e) {
      console.error("Error creating todo", e);
    }
  };

  return (
    <>
      <button onClick={openDialog} className="edit-button">
        <Edit2 size={24} />
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-500 opacity-95">
          <dialog
            open
            className="fixed z-50 inset-0 flex flex-col justify-center bg-gray-600 rounded-lg"
          >
            <div className="flex justify-between text-purple-300">
              <div className="ml-6"></div>
              <h2>Change {title}</h2>
              <X onClick={closeDialog} />
            </div>

            <div className="p-2">
              <label htmlFor="todoName" className="p-1 text-purple-300">
                Task name:
              </label>
              <input
                type="text"
                id="todoName"
                className="p-1"
                onChange={handleTodoNameChange}
              />
            </div>
            <div className="p-2">
              <label htmlFor="todoDescription" className="p-1 text-purple-300">
                Task description:
              </label>
              <input
                type="text"
                id="todoDescription"
                className="p-1"
                onChange={handleTodoDescriptonChange}
              />
            </div>
            <div className="p-2">
              <label htmlFor="todoDueDate" className="p-1 text-purple-300">
                Task Due Date:
              </label>
              <input
                type="date"
                id="todoDueDate"
                placeholder="YYYY-MM-DD"
                className="p-1"
                onChange={handleTodoDueDateChange}
              />
            </div>
            <div className="p-2">
              <RangeInputWithLabels
                value={todoPriority}
                handleChange={handlePriorityChange}
              />
            </div>
            <button
              onClick={patchTodo}
              className="rounded-lg bg-purple-500 text-purple-100 border border-purple-400"
            >
              Submit
            </button>
          </dialog>
        </div>
      )}
    </>
  );
}
