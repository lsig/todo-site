import axios from "axios";
import { ChangeEvent, useState } from "react";
import { X } from "react-feather";
import { RangeInputWithLabels } from "./prioritySetter";

interface NewTaskProps {
  userId: number;
  projectId: number;
  fetchTodos: () => Promise<void>;
}

export function NewTaskBtn({ userId, projectId, fetchTodos }: NewTaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [priority, setPriority] = useState<number>(1);
  const [completed, setCompleted] = useState<boolean>(false);

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

  const createNewTodo = async () => {
    try {
      if (!todoName) {
        return alert("Todo must have a title");
      }
      const res = await axios.post(
        `/users/${userId}/projects/${projectId}/todos`,
        {
          title: todoName,
          description: todoDescription,
          due_date: dueDate,
          priority: priority,
          completed: completed,
        }
      );
      console.log("new todo created: ", res.data);
      fetchTodos();
      setTodoName("");
      setTodoDescription(null);
      setDueDate(null);
      setPriority(1);
      setCompleted(false);
      closeDialog();
    } catch (e) {
      console.error("Error creating todo", e);
    }
  };

  return (
    <>
      <button
        onClick={openDialog}
        className={
          "rounded-lg w-32 h-12 mb-3 self-center bg-purple-200 text-purple-500 disabled:opacity-100"
        }
      >
        New Task +
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
              value={priority}
              handleChange={handlePriorityChange}
            />
          </div>
          <button
            onClick={createNewTodo}
            className="rounded-lg bg-purple-500 text-purple-100 border border-purple-400"
          >
            Submit
          </button>
        </dialog>
      )}
    </>
  );
}
