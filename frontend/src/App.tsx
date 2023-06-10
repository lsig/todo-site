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
import axios from "axios";
import { Header } from "./components/Header/header";
import { ProjectOverview } from "./components/ProjectOverview/projectOverview";
// import { NewProjectBtn } from "./components/Sidebar/newProject";
// import { Project } from "./components/Sidebar/project";
// import { SidebarHeader } from "./components/Sidebar/sidebarHeader";
import { Sidebar } from "./components/Sidebar/sidebar";

axios.defaults.baseURL = "http://localhost:8080/api/v1";
const user = 1;

function App() {
  return (
    <div className="bg-gray-800">
      <Header />
      <div className="flex">
        <Sidebar userId={user} />
        <ProjectOverview />
      </div>
    </div>
  );
}

export default App;
