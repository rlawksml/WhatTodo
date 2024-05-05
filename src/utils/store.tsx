import { createStore } from "redux";


interface TodoList {
    id : number;
    title : string;
    done : boolean;
    important : boolean;
}

interface Actions {
    type? : string;
    id? :number;
    no? : number;
    title? : string;
    done? : boolean;
    important? : boolean;
    todo? : string
}

const todoList :TodoList[] = []


const todoReducser = (state : TodoList[] = todoList, action:Actions) : any =>{
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