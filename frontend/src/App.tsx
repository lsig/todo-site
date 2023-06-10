// import { useState } from "react";
// import { PriorityBtn } from "./components/Todo/priority";
// import { DetailsBtn } from "./components/Todo/details";
// import { TrashBtn } from "./components/Todo/trash";
// import { EditBtn } from "./components/Todo/edit";
// import { DueDate } from "./components/Todo/date";
// import { Checkbox } from "./components/Todo/checkbox";
// import { Todo } from "./components/Todo/todo";
// import { NewTaskBtn } from "./components/ProjectOverview/NewTask";
// import { ProjectHeader } from "./components/ProjectOverview/header";
import { ProjectOverview } from "./components/ProjectOverview/projectOverview";
// import { NewProjectBtn } from "./components/Sidebar/newProject";
// import { Project } from "./components/Sidebar/project";
// import { SidebarHeader } from "./components/Sidebar/sidebarHeader";
import { Sidebar } from "./components/Sidebar/sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <ProjectOverview />
    </div>
  );
}

export default App;
