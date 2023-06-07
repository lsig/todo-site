import { useState } from "react";

type CheckboxProps = {
  label: string;
  values: {
    projectId: number;
    todoId: number;
  };
};

export function Checkbox({ label, values }: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => setChecked((prevChecked) => !prevChecked);

  // TODO: Patch todo when check box is clicked, completed == true
  // need the values attribute for the patch request

  return (
    <label className="flex gap-2 text-purple-400">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="h-6 w-6 appearance-none border-solid border-2 rounded border-purple-400 bg-purple-300 checked:bg-green-300"
      />
      {label}
    </label>
  );
}
