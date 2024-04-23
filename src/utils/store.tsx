import { createStore } from "redux";




const todoList :TodoList[]

interface TodoList {
    id : number;
    title : string;
    done : boolean;
    important : boolean;
}

interface Actions {
    id? :number;
    no? : number;
    title? : string;
    done? : boolean;
    important? : boolean;
    todo? : string
}  


const todoReducser = (state : TodoList[] = todoList, action:Actions)=>{
    // console.log(action)
    switch(action.type){
        case "add":
            console.log(action)
            return [{no:action.no, todo:action.todo, done:action.done, important:action.important},...state]
        case "delete":
            return state.filter(item => item.title: !== action.todo )
        case "done":
            state.map(item=>
                console.log("item", item , "action",action))
            return state.filter(item => item.title === action.todo ? {...item, done: !item.done} : {...item})
        case "important":
            return state.map(item => item.title === action.todo ? {...item, important: !item.important} : {...item} )
        default:
            return state
    }
}


const store = createStore(todoReducser)

export default store;