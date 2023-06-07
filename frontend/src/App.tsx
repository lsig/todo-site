// import { useState } from "react";
import { PriorityBtn } from "./components/Todo/priority";
import { DetailsBtn } from "./components/Todo/details";
import { TrashBtn } from "./components/Todo/trash";
import { EditBtn } from "./components/Todo/edit";
import { DueDate } from "./components/Todo/date";
import { Checkbox } from "./components/Todo/checkbox";
import { Todo } from "./components/Todo/todo";

function App() {
  return (
    <>
      <PriorityBtn priority={3} />
      <DetailsBtn />
      <TrashBtn onClick={() => {}} />
      <EditBtn onClick={() => {}} />
      <br />
      <DueDate dueDate="2023-12-24" />
      <Checkbox label="Clean bathroom" values={{ projectId: 5, todoId: 7 }} />
      <br />
      <Todo />
    </>
  );
}

export default App;
