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
      buttonColor = "bg-green-300 text-green-500";
      priorityText = "Low";
      break;
    case PRIORITY.Medium:
      buttonColor = "bg-yellow-300 text-yellow-500";
      priorityText = "Medium";
      break;
    case PRIORITY.High:
      buttonColor = "bg-red-300 text-red-500";
      priorityText = "High";
      break;
    default:
      break;
  }
  return (
    <button
      className={`rounded-lg w-28 h-10 ${buttonColor} disabled:opacity-100 sm:w-20 sm:h-6 sm:text-xs md:w-24 md:h-8 md:text-sm lg:w-28 lg:h-10`}
    >
      {priorityText}
    </button>
  );
}
