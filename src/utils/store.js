import { createStore } from "redux";

// no: todoList?.length,
// title: inputValue,
// done: false,
// important: false,

const todoList = [
    // {
    //     id:"",
    //     title:"",
    //     done:false,
    //     important:false,
    // }
]

const todoReducser = (state = todoList, action)=>{
    // console.log(action)
    switch(action.type){
        case "add":
            console.log(action)
            return [{no:action.no, todo:action.todo, done:action.done, important:action.important},...state]
        case "delete":
            return state.filter(item => item.title !== action.todo )
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