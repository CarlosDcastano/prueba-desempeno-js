import {state} from "../data/state.js"

const url = "http://localhost:3000"


//Get users **********************************************

export async function getAllUsersJs(){
    try{
        const res = await fetch(`${url}/users`)

        if(!res.ok) throw new Error("It was not possible to query the users");
        const data = await res.json();
        state.users = data;

    }catch (error) {
        console.error(error)
    }

}

//Create users **********************************************

export async function postUser(name, email, password, role) {
    try {
        const res = await fetch(`${url}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                role: role
            })
        });

        if (!res.ok) throw new Error("The user could not be created.");

        const newUser = await res.json();
        
        state.users.push(newUser);
        
        console.log("User created successfully:", newUser);
        return newUser;

    } catch (error) {
        console.error("PostUser error:", error);
    }
}
