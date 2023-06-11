import { Calendar } from "react-feather";
import { format, parseISO } from "date-fns";

function formatDate(dateString: string | null) {
  if (!dateString) {
    return "";
  }
  const date = parseISO(dateString);
  const formattedDate = format(date, "do MMM");
  return formattedDate;
}

type Date = {
  dueDate: string;
};

function CalenderIcon() {
  return (
    <button className="dueDate sm:scale-75 md:scale-100 lg:scale-125">
      <Calendar size={24} />
    </button>
  );
}

export function DueDate({ dueDate }: Date) {
  const date = formatDate(dueDate);
  return (
    <div className="flex h-10 w-28 self-center gap-2 sm:w-20 sm:h-6 sm:text-xs md:w-24 md:h-8 md:text-sm lg:w-28 lg:h-10 lg:text-base">
      <CalenderIcon />
      <div className="pl-1 mt-1 text-purple-500 self-center">{date}</div>
    </div>
  );
}
