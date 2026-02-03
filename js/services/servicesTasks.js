import { state } from "../data/state.js";

const url = "http://localhost:3000"


//Get tasks **********************************************
export async function getAllTasksJs(){
    try{
        const res = await fetch(`${url}/tasks`)

        if(!res.ok) throw new Error("It's not possible to get the tasks.")
        
        const data = await res.json();
        state.tasks = data
        
    }catch (error) {
        console.error(error)
    }
}


//Create task **********************************************
export async function postTask(task) {
    try {
        const res = await fetch(`${url}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Obligatorio para que el servidor entienda el cuerpo
            },
            body: JSON.stringify(task)

        });

        if (!res.ok) throw new Error("It's not possible to edit the task")

        const newTask = await res.json();

        state.tasks.push(newTask);

        console.log("Task created successfully", newTask)
        return newTask;
        
    } catch (error) {
        console.error("Error in postTask:", error);
        
    }
}
//Update task **********************************************
export async function patchTask(id, updatedfields) {
    try {
        const res = await fetch(`${url}/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(updatedfields)

        });

        if (!res.ok) throw new Error("It's not possible to edit the task")

        const updatedTask = await res.json();

        const index = state.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            state.tasks[index] = updatedTask;
        }

        console.log("Task edited successfully", updatedTask)
        return updatedTask;
        
    } catch (error) {
        console.error("Error in patchtask:", error);
        
    }
}


//delete task **********************************************

export async function deleteTask(id) {
    try {
        const res = await fetch(`${url}/tasks/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) throw new Error("It's not possible to delet the task")
        
        state.tasks = state.tasks.filter(t => t.id !== id);

        console.log("Task deleted successfully", updatedTask)
        
    } catch (error) {
        console.error("Error in deleteTask:", error);
        
    }
    
}