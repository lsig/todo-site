import { Checkbox } from "./checkbox";
import { DueDate } from "./date";
import { PriorityBtn } from "./priority";
import { DetailsBtn } from "./details";
import { EditBtn } from "./edit";
import { TrashBtn } from "./trash";

export function Todo() {
  return (
    <div className="flex h-20 w-11/12 mt-8 gap-2 self-center justify-between bg-purple-300 rounded-3xl">
      <div className="flex gap-5 pl-10">
        <Checkbox
          label="Clean the bathroom"
          values={{ projectId: 5, todoId: 7 }}
        />
        <DueDate dueDate="2023-06-11" />
      </div>
      <div className="flex self-center gap-5">
        <PriorityBtn priority={3} />
        <DetailsBtn />
      </div>
      <div className="flex gap-5 pr-8">
        <EditBtn
          onClick={() => {
            console.log("editing now");
          }}
        />
        <TrashBtn
          onClick={() => {
            console.log("throwing in trash now");
          }}
        />
      </div>
    </div>
  );
}
