enum PRIORITY {
  Low = 1,
  Medium = 2,
  High = 3,
}

type Priority = {
  priority: number;
};

export function PriorityBtn({ priority }: Priority) {
  let buttonColor = "";
  let priorityText = "";

  switch (priority) {
    case PRIORITY.Low:
      buttonColor = "bg-green-300 text-green-400";
      priorityText = "Low";
      break;
    case PRIORITY.Medium:
      buttonColor = "bg-yellow-300 text-yellow-400";
      priorityText = "Medium";
      break;
    case PRIORITY.High:
      buttonColor = "bg-red-300 text-red-400";
      priorityText = "High";
      break;
    default:
      break;
  }
  return (
    <button
      className={`rounded-lg w-28 h-10 ${buttonColor} disabled:opacity-100`}
    >
      {priorityText}
    </button>
  );
}
