
import { app, aside, body } from "./elements.js"
import { state } from "../data/state.js";


//Render login **********************************************

export function renderLogin() {
    aside.style.display = "none"
    app.innerHTML = `
    <div class="mainForms">
        <section id="formsection" class="formvisible">

            <div id="title">
                <img src="./img/logo.png" alt="logo"><span>CRUDZASO</span>
            </div>
            <h1>Welcome back</h1>
            <p>Enter your credentials to access the platform</p>
            <form id="loginForm">
                <label for="emailLogin">Email or Username</label>
                <input id="emailLogin" type="email" placeholder="name@example.com" required><br>

                <label for="passwordLogin">Password</label>
                <input id="passwordLogin" type="password" placeholder="Your password" required><br>

                <p id="forgotPassword">Forgot password?</p>

                <button id="submitLogin" type="submit">Sign in</button><br>
                <div id="signup">
                    Don't have an account? <a href="#">Register</a>
                </div>
            </form>
        </section>
    </div>
    `

}

//Render signUp **********************************************

export function renderSignUp() {
    aside.style.display = "none"
    app.innerHTML = ""
    const signUpSection = document.createElement("section");
    signUpSection.classList.add("signUpSection");
    signUpSection.innerHTML = `

        <div id="title">
            <img src="./img/logo.png" alt="logo">
            <span>CRUDZASO</span>
        </div>
        <h1>Create account</h1>
        <p>Join the academic performance platform today</p>
        <form id="signUpForm">
            <label for="nameSignUp">Full Name</label><br>
            <input id="nameSignUp" type="text" placeholder="e.g. John Doe" required><br><br>
            <label for="emailSignUp">Email Address</label><br>
            <input id="emailSignUp" type="email" placeholder="name@example.com" required><br><br>
            <label for="passwordSignUp">Password</label><br>
            <input id="passwordSignUp" type="password" placeholder="Your password" required><br><br>
            <label for="confirmPasswordSignUp">Confirm Password</label><br>
            <input id="confirmPasswordSignUp" type="password" placeholder="Confirm Password" required><br><br>
            <button id="submitSignUp" type="submit">Sign up</button><br>
        </form>
        <div id="logindiv">
                Already have an account? <span id="login">Login</span>
        </div>
    `

    app.appendChild(signUpSection)
    const login = document.getElementById("login").addEventListener(
        "click", (event) => {
            renderLogin();
        }
    )
}



//Render User Page **********************************************

export function renderUserPage(name) {
    aside.style.display = "block"
    app.innerHTML = ""
    const dashboardUser = document.createElement("section");
    dashboardUser.classList.add("dashboardUser");
    dashboardUser.innerHTML = `

        <div id="saludoLogout">
            <p id="">Welcome ${name}</p>
            <img id="logoutBtn" src="./img/iconify-icon.png" alt="">
        </div>
        
        <section id="infoNewProduct">
            <div id="justInfo">
                <h1>Your tasks here</h1>
                <p>Feel free to add your task here.</p>
            </div>
            <button id="togleRegisterProd" type="button">+ New task</button>
        </section>        

        <div id="requestsProducts">

            <section id="TaskRegister" class="sectionsProd">
                
                <form id="formTaskRegister" style="display: none;">

                    <label for="taskName"> Task title</label><br>
                    <input id="taskName" type="text"><br><br>

                    <label for="category">Category:</label><br>
                    <select id="category" name="category">
                        <option value="mathematics">Mathematics</option>
                        <option value="physics">Physics</option>
                        <option value="history">History</option>
                        <option value="computerScience">Computer Science</option>
                        <option value="literature">Literature</option>

                    </select><br><br>

                    <label for="priority">priority:</label><br>
                    <select id="priority" name="priority">
                        <option value="high">high</option>
                        <option value="medium">medium</option>
                        <option value="low">low</option>
                    </select><br><br>

                    <label for="status">Status:</label><br>
                    <select id="status" name="status">
                        <option value="pending">Pending</option>
                        <option value="doing">doing</option>
                        <option value="done">done</option>
                    </select><br><br>

                    <label for="dueDate">Due Date</label>
                    <input id="dueDate" type="date"><br><br>

                    <button id="submitProduct" type="submit">Agregar producto</button>
                </form>
            </section>

            <section id="productsList" class="sectionsProd">

            </section>
        </div>

    <div id="editModal" class="modal hidden">
        <div class="modal-content">
            <h3>Edit task</h3>

            <form id="editProductForm">
                <label for="editTaskName"> Task title</label><br>
                <input id="editTaskName" type="text"><br><br>

                <label for="editTaskCategory">Category:</label><br>
                <select id="editTaskCategory" editTaskcategory="category">
                    <option value="mathematics">Mathematics</option>
                    <option value="physics">Physics</option>
                    <option value="history">History</option>
                    <option value="computerScience">Computer Science</option>
                    <option value="literature">Literature</option>
                </select><br><br>

                <label for="editTaskPriority">priority:</label><br>
                <select id="editTaskPriority" name="editTaskPriority">
                    <option value="high">high</option>
                    <option value="medium">medium</option>
                    <option value="low">low</option>
                </select><br><br>

                <label for="editTaskStatus">Status:</label><br>
                <select id="editTaskStatus" name="editTaskStatus">
                    <option value="pending">Pending</option>
                    <option value="doing">doing</option>
                    <option value="done">done</option>
                </select><br><br>

                <button type="submit">Save Changes</button>
                <button type="button" id="closeModal">Cancelar</button>
            </form>
        </div>
    </div>
    `
    app.appendChild(dashboardUser);

    const productsList = document.getElementById("productsList")
    
    const currentTaskList = state.tasks.filter(t => t.idResponsible === state.currentUser.id)

    currentTaskList.forEach(task => {
        const article = document.createElement("article")
        article.classList.add("eachProduct")
        article.innerHTML = `
        <div class="taskParts">
            <p id="showName">TASK NAME: ${task.name}</p> 
        </div>
        <div class="taskParts">
            <p id="showCategory"> CATEGORY: ${task.category}</p>
            <p id="showPriority">PRIORITY: <span class ="textPriority">${task.priority}</span></p>
        </div>
        <div class="taskParts">
            <p id="showStatus">STATUS: ${task.status}</p>
            <p id="showDueDate">DUE DATE: ${task.dueDate}</p>
        </div>

        <div class="taskParts">
            <img class="editProd" data-id="${task.id}" src="./img/edit.png" alt="">
            <img class="deleteProd" data-id="${task.id}" src="./img/delete.png" alt="">
        </div>
        `   
        productsList.appendChild(article)
    })

    const textPriority = document.querySelectorAll(".textPriority");
    textPriority.forEach(tP => {
        if(tP.textContent === "high"){
        tP.style.color = "red";
    }else if(tP.textContent === "medium"){
        tP.style.color = "orange";
    }else{
        tP.style.color = "green";
    }
    
    })

}


//Render Admin Page **********************************************

export function renderAdminPage(name) {
    const totalTask = state.tasks.length;
    const totalDoing = state.tasks.filter(t => t.status === "doing")
    const totalCompleted = state.tasks.filter(t => t.status === "done")
    const totalPending = state.tasks.filter(t => t.status === "pending")
    
    app.innerHTML = ""
    const dashboardAdmin = document.createElement("section");
    dashboardAdmin.classList.add("dashboardAdmin");
    dashboardAdmin.innerHTML = `
        <div id="saludoLogout">
            <p id="">Bienvenid@ ${name}</p>
            <img id="logoutBtn" src="./img/iconify-icon.png" alt="">
        </div>

        <section id="infoNewProduct">
            <div id="justInfo">
                <h1>Task Management</h1>
                <p>View, edit, and organize all academic tasks in one place.</p>
            </div>

            <div>
                <form>
                    <select id="filterAssignee" type="text" name="Search for assignee">

                    </select>
                    <button type="submit" id="btnFilter">Filter assignee</button>
                <form>
            </div>
            <button id="togleRegisterProd" type="button">+ New task</button>
        </section>

        <form id="formTaskRegister" style="display: none;">
                    <label for="taskName"> Task title</label><br>
                    <input id="taskName" type="text" required><br><br>

                    <label for="category">Category:</label><br>
                    <select id="category" name="category">
                        <option value="mathematics">Mathematics</option>
                        <option value="physics">Physics</option>
                        <option value="history">History</option>
                        <option value="computerScience">Computer Science</option>
                        <option value="literature">Literature</option>

                    </select><br><br>

                    <label for="priority">priority:</label><br>
                    <select id="priority" name="priority">
                        <option value="high">high</option>
                        <option value="medium">medium</option>
                        <option value="low">low</option>
                    </select><br><br>

                    <label for="status">Status:</label><br>
                    <select id="status" name="status">
                        <option value="pending">Pending</option>
                        <option value="doing">doing</option>
                        <option value="done">done</option>
                    </select><br><br>

                    <label for="dueDate">Due Date</label>
                    <input id="dueDate" type="date" required><br><br>

                    <button id="submitProduct" type="submit">Agregar producto</button>
                </form>

        

        <div id="estadistics">
            <article class="statusTasks">
                <div>
                    <p>Total Tasks</p>
                    <h2>${totalTask}</p>
                </div>
                <div>
                    <img src="./img/totalTasks.png" alt="">
                </div>
            </article class="statusTasks">
                
            <article class="statusTasks">
                <div>
                    <p>In progress</p>
                    <h2>${totalDoing.length}</p>
                </div>
                <div>
                    <img src="./img/inProgress.png" alt="">
                </div>
                
            </article>
                
            <article class="statusTasks">

                <div>
                    <p>completed</p>
                    <h2>${totalCompleted.length}</p>
                </div>
                <div>
                    <img src="./img/completed.png" alt="">
                </div>
                
            </article>

            <article class="statusTasks">
                <div>
                    <p>Pending review</p>
                    <h2>${totalPending.length}</h1>
                </div>
                <div>
                    <img src="./img/pending.png" alt="">
                </div>
                
            </article>
        </div>

        <div id="requestsProducts">
            <section id="TaskRegister" class="sectionsProd">
                
                
            </section>

            <section id="productsList" class="sectionsProd">

            </section>
        </div>

    <div id="editModal" class="modal hidden">
        <div class="modal-content">
            <h3>Edit task</h3>

            <form id="editProductForm">
                <label for="editTaskName"> Task title</label><br>
                <input id="editTaskName" type="text" required><br><br>

                <label for="editTaskCategory">Category:</label><br>
                <select id="editTaskCategory" editTaskcategory="category">
                    <option value="mathematics">Mathematics</option>
                    <option value="physics">Physics</option>
                    <option value="history">History</option>
                    <option value="computerScience">Computer Science</option>
                    <option value="literature">Literature</option>
                </select><br><br>

                <label for="editTaskPriority">priority:</label><br>
                <select id="editTaskPriority" name="editTaskPriority">
                    <option value="high">high</option>
                    <option value="medium">medium</option>
                    <option value="low">low</option>
                </select><br><br>

                <label for="editTaskStatus">Status:</label><br>
                <select id="editTaskStatus" name="editTaskStatus">
                    <option value="pending">Pending</option>
                    <option value="doing">doing</option>
                    <option value="done">done</option>
                </select><br><br>

                <button type="submit">Save Changes</button>
                <button type="button" id="closeModal">Cancelar</button>
            </form>
        </div>
    </div>
    `
    app.appendChild(dashboardAdmin);

    const productsList = document.getElementById("productsList")
    state.tasks.forEach(task => {
        const article = document.createElement("article")
        article.classList.add("eachProduct")
        article.innerHTML = `
        <p id="showName"> <span class="head">TASK NAME</span>: ${task.name}</p>
        <p id="showResponsible"> <span class="head">ASSIGNEE</span>: ${task.responsible}</p>
        <p id="showCategory"> <span class="head">CATEGORY</span>: ${task.category}</p>
        <p id="showPriority"> <span class="head">PRIORITY</span>: <span class="textPriority">${task.priority}</span></p>
        <p id="showStatus"> <span class="head">STATUS</span>: ${task.status}</p>
        <p id="showDueDate"> <span class="head">DUE DATE</span>: ${task.dueDate}</p>
        <div class="EditDelete">
            <img class="editProd" data-id="${task.id}" src="./img/edit.png" alt="">
            <img class="deleteProd" data-id="${task.id}" src="./img/delete.png" alt="">
        </div>
    `


    productsList.appendChild(article)
    

    })
    
    const textPriority = document.querySelectorAll(".textPriority");
    textPriority.forEach(p => {
        if(p.textContent === "high"){
        p.style.color = "red";
    }else if(p.textContent === "medium"){
        p.style.color = "orange";
    }else{
        p.style.color = "green";
    }

    })
/*     const filterAssignee = document.getElementById("filterAssignee")
    state.users.forEach(user => {
        const option = document.createElement("option");
        option.classList.add("eachOption");
        option.value = `${user.idResponsible}`;
        option.textContent = `${user.name}`

        filterAssignee.appendChild(option);
    }) */

    



    



}




