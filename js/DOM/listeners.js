import { app, aside } from "./elements.js";
import { renderSignUp, renderAdminPage } from "./render.js";
import { validarLogin, validarSignup } from "../validarUser.js";
import { User } from "../models/user.js"
import { Task } from "../models/task.js";
import { validarTask } from "../validarTask.js";
import { state } from "../data/state.js";
import { patchTask, deleteTask} from "../services/servicesTasks.js";



export function setupListeners() {
    //Going to the sign up page
    app.addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
            renderSignUp()
        }
    })
    // //Loging  users 
    app.addEventListener("submit", event => {
        event.preventDefault();
        if (event.target.id === "loginForm") {
            const emailLogin = event.target.querySelector("#emailLogin").value;
            const passwordLogin = event.target.querySelector("#passwordLogin").value;
            validarLogin(emailLogin, passwordLogin)

        }
    })
    //Creating users
    app.addEventListener("submit", event => {
        event.preventDefault();
        if (event.target.id === "signUpForm") {
            const nameSignUp = event.target.querySelector("#nameSignUp").value.trim();
            const emailSignUp = event.target.querySelector("#emailSignUp").value.trim();
            const passwordSignUp = event.target.querySelector("#passwordSignUp").value.trim();
            const confirmPasswordSignUp = event.target.querySelector("#confirmPasswordSignUp").value.trim();

            const user = new User(nameSignUp, emailSignUp, passwordSignUp, confirmPasswordSignUp)

            validarSignup(user.name, user.email, user.password, user.confirmPassword, user.rol)

        }

    })

    //Show register task option
    app.addEventListener("click", event => {
        if (event.target.id === "togleRegisterProd") {
            const formTaskRegister = document.getElementById("formTaskRegister");
            formTaskRegister.style.display = formTaskRegister.style.display === "block" ? "none" : "block";
        }
    });
    //Creating tasks
    app.addEventListener("submit", event => {
        event.preventDefault();
        if (event.target.id === "formTaskRegister") {
            const name = event.target.querySelector("#taskName").value.trim();
            const category = event.target.querySelector("#category").value.trim();
            const priority = event.target.querySelector("#priority").value.trim();
            const status = event.target.querySelector("#status").value.trim();
            const dueDate = event.target.querySelector("#dueDate").value.trim();
            const idResponsible = state.currentUser.id;
            const responsible = state.users.find(u =>u.id === idResponsible);
            const userName = responsible.name

            const task = new Task(name, idResponsible, userName, category, priority, status, dueDate);

            validarTask(task)

        }

    });

    let taskIdEditing = null;


// Open Modal

app.addEventListener("click", (e) => {
    if (e.target.classList.contains("editProd")) {

        const id = e.target.dataset.id;
        taskIdEditing = id;

        const task = state.tasks.find(t => t.id == id);

        document.getElementById("editTaskName").value = task.name;
        document.getElementById("editTaskCategory").value = task.category;
        document.getElementById("editTaskPriority").value = task.priority;
        document.getElementById("editTaskStatus").value = task.status;

        document.getElementById("editModal").classList.remove("hidden");
    }
});



   // Close modal

app.addEventListener("click", (e) => {
    if (e.target.id === "closeModal") {
        document.getElementById("editModal").classList.add("hidden");
        taskIdEditing = null;
    }
});



  // Save changes)

app.addEventListener("submit", async (e) => {

    if (e.target.id === "editProductForm") {

        e.preventDefault();

        const name = e.target.querySelector("#editTaskName").value.trim();
        const category = e.target.querySelector("#editTaskCategory").value.trim();
        const priority = e.target.querySelector("#editTaskPriority").value.trim();
        const status = e.target.querySelector("#editTaskStatus").value.trim();

        if (!name || !category || !priority || !status) {
            alert("All fields are mandatory");
            return;
        }

        const updatedData = {
            name: name,
            category: category,
            priority: priority,
            status: status
        };

        try {
            await patchTask(taskIdEditing, updatedData);

            document.getElementById("editModal").classList.add("hidden");
            taskIdEditing = null;

            renderAdminPage("algo");

        } catch (error) {
            console.error("Error updating task:", error);
            alert("It was not possible to update this task");
        }
    }
});
    // Delete tasks
    document.addEventListener("click", async (e) => {

    if (e.target.classList.contains("deleteProd")) {
        const id = e.target.dataset.id;

        const confirmDelete = confirm("¿Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        await deleteTask(id);

        renderAdminPage(state.currentUser.name);
    }

});
}