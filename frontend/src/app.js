import { todoNote, projects } from "./todo";

console.log("this is connected");

const newTodo = todoNote("Hello", "test", 3, new Date(2023, 9, 11));
const newTodo1 = todoNote("Hello", "test", 3, new Date(2023, 9, 11));

console.log(newTodo);
console.log(newTodo1);
