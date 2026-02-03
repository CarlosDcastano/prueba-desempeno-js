import { renderAdminPage, renderUserPage } from "./DOM/render.js";
import { postUser } from "./services/servicesUsers.js";
import { state } from "./data/state.js";


export function validarLogin(email, password) {

    const user = state.users.find(u => u.email === email && u.password === password);

    if (user) {

    state.currentUser = user;

    // Save local sesion
    localStorage.setItem("currentUser", JSON.stringify(user));
        if (user.role === "admin") {
            renderAdminPage(user.name);
        } else {
            renderUserPage(user.name);
        }
    } else {
        alert("Incorrect username or password");
    }
}

export function validarSignup(name, email, password, confirmPassword, rol) {

    if (/\s/.test(password) || !password) {
        return alert("The password cannot contain spaces.");
    }

    if(password !== confirmPassword){
        return alert("The passwords do not match")
    }

    const user = state.users.find(u => u.email === email);

    if (user) {
        return alert("Email address already registered");
    }

    postUser(name, email, password, rol);
}
