import { json } from "react-router";
import { TodoList } from "../../types";

export const local = {
  getLocal: () : TodoList[] | null => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : null;
  },
  setLocal: (status : TodoList[]) => {
    localStorage.setItem("todos", JSON.stringify(status));
  },
  clearLocal: () : void => {
    localStorage.removeItem("todos");
  },
};
