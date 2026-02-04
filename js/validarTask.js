import { postTask} from "./services/servicesTasks.js";
import { state } from "./data/state.js";

export function validarTask(task){
    console.log(state.tasks)
    const existTask = state.tasks.find(t => t.name === task.name)
        if(existTask){
            alert("That task already exists");
        }else{
            postTask(task)
        }
}

export function validarFilter(option){
    if(!option){
        console.log("Debe ingresar un valor")
    }
    const user  = state.users.find(u => u.idResponsible === option )
    if(!user){
        alert("No user matches the name you selected")
    }else{
        alert("Todo bien")
    }

}