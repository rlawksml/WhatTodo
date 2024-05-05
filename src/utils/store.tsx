import { createStore } from "redux";
import { TodoList } from "../types";

interface Actions extends TodoList {
    type? : string,
}

const todoList :TodoList[] = []

const todoReducser = (state : TodoList[] = todoList, action:Actions) : TodoList[] =>{
    switch(action.type){
        case "add":
            return [{no: action.no, todo: action.todo, done: action.done, important: action.important},...state]
        case "delete":
            return state.filter(item => item.title !== action.todo )
        case "done":
            return state.filter(item => item.title === action.todo ? {...item, done: !item.done} : {...item})
        case "important":
            return state.map(item => item.title === action.todo ? {...item, important: !item.important} : {...item} )
        default:
            return state
    }
}


const store = createStore(todoReducser)

export default store;