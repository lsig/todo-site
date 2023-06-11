import axios from "axios";
import { useState } from "react";

type CheckboxProps = {
  label: string;
  values: {
    userId: number;
    projectId: number;
    todoId: number;
  };
};

export function Checkbox({ label, values }: CheckboxProps) {
  // console.log("checkbox value: ", values);
  const [checked, setChecked] = useState(false);

  const patchTodoCheckbox = async (prevChecked: boolean) => {
    try {
      const res = await axios.patch(
        `/users/${values.userId}/projects/${values.projectId}/todos/${values.todoId}`,
        {
          completed: !prevChecked,
        }
      );
      console.log(res.data);
    } catch (e) {
      console.error("Error creating todo", e);
    }
  };

  const handleChange = () =>
    setChecked((prevChecked) => {
      patchTodoCheckbox(prevChecked);
      return !prevChecked;
    });

  return (
    <label className="flex gap-2 text-purple-500 self-center sm:scale-75 md:scale-90 lg:scale-100">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="h-6 w-6 self-center appearance-none border-solid border-2 rounded border-purple-500 bg-purple-300 checked:bg-green-300 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:w-6 lg:h-6"
      />
      {label}
    </label>
  );
}
