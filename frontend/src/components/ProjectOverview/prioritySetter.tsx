import { ChangeEvent } from "react";

enum Priority {
  Low = 1,
  Medium = 2,
  High = 3,
}

interface RangeProps {
  value: number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function RangeInputWithLabels({ value, handleChange }: RangeProps) {
  const getLabel = () => {
    switch (value) {
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
    <div className="p-2">
      <label htmlFor="todoPriority" className="p-1 text-purple-300">
        Priority:
      </label>
      <input
        type="range"
        id="todoPriority"
        min="1"
        max="3"
        step="1"
        className="p-1"
        value={value}
        onChange={handleChange}
      />
      <div>{getLabel()}</div>
    </div>
  );
}
