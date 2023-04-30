import { compareDesc } from "date-fns";
let id = 0;

export const todoNote = (title, description, priority, date) => {
  return {
    id: id++,
    title,
    description,
    priority,
    date,
    completed: false,
  };
};

export const projects = (name) => {
  const todos = [];
  const addTodo = (todo) => {
    todos.push(todo);
  };
  const removeTodo = (todo) => {
    const todoIndex = todos.findIndex((t) => t.id === todo.id);
    todos.splice(todoIndex, 1);
  };
  const sortTodosByDate = () => {
    todos.sort((a, b) => compareDesc(a.date, b.date));
  };
  const sortTodosByPriority = () => {
    todos.sort((a, b) => a.priority - b.priority);
  };

  return {
    name,
    todos,
    addTodo,
    removeTodo,
    sortTodosByDate,
    sortTodosByPriority,
  };
};
