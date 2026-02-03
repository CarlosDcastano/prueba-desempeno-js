
import { getAllUsersJs } from "./services/servicesUsers.js";
import { getAllTasksJs } from "./services/servicesTasks.js";
import { renderLogin, renderUserPage, renderAdminPage } from "./DOM/render.js";
import { setupListeners } from "./DOM/listeners.js";
import { state } from "./data/state.js";

async function main() {
    await getAllUsersJs()
    await getAllTasksJs()
    //Local storage
    const savedUser = localStorage.getItem("currentUser");
    

    if(savedUser){
    const user = JSON.parse(savedUser);
    state.currentUser = user;

        if (user.role === "admin") {
                renderAdminPage(user.name);
            } else {
                renderUserPage(user.name);
            }
    }else{
        renderLogin();
    }
    setupListeners();
}

main()
