import { Calendar } from "react-feather";
import { format, parseISO } from "date-fns";

function formatDate(dateString: string) {
  const date = parseISO(dateString);
  const formattedDate = format(date, "do MMM");
  return formattedDate;
}

type Date = {
  dueDate: string;
};

function CalenderIcon() {
  return (
    <button className="dueDate">
      <Calendar size={24} />
    </button>
  );
}

export function DueDate({ dueDate }: Date) {
  const date = formatDate(dueDate);
  return (
    <div className="flex h-10 w-28 items-center">
      <CalenderIcon />
      <div className="pl-1 mt-1 text-purple-400 text-center">{date}</div>
    </div>
  );
}
