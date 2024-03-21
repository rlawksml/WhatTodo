import { json } from "react-router";

export const local = {
  getLocal: () => {
    let data = JSON.parse(localStorage.getItem("todos"));
    return data !== undefined ? data : null;
  },
  setLocal: (status) => {
    localStorage.setItem("todos", JSON.stringify(status));
  },
  clearLocal: () => {
    localStorage.removeItem("todos");
  },
};
