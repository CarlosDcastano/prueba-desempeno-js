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
