import { json } from "react-router";

interface TodoList {
  id ? : number,
  no? : number,
  title : string,
  done : boolean,
  important : boolean,
}


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
