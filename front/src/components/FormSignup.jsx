import { useState } from "react";
import apiRequest from "../js/apiRequest";
import signIn from "../js/signIn";

function FormSignup(props){
    const [user, setUser] = useState({
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'votre@email.ex',
    password: 'mot de passe'
    });
    
    async function sendUser(user){
        const args = {
            head: {
                "Content-Type": "application/json"
            },
            init: {
                method: 'POST',
                body: user
            },
            url: "auth/signup"
        }
        const res = await apiRequest(args);
        if (res.status === 201){
            signIn(user);
        }
    }

    function userCreate(form){
        form.preventDefault();
        console.log("userCreate : " + JSON.stringify(user));
        sendUser(JSON.stringify(user));
        
    }
    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setUser({
            ...user,
            [name]: value
        });
    }
    return(
        <form onSubmit={userCreate}>
            <input onChange={handleChange} type="text" name="firstName" className="input input--text" value={user.firstName}/>
            <input onChange={handleChange} type="text" name="lastName" className="input input--text" value={user.lastName}/>
            <input onChange={handleChange} type="email" name="email" className="input input--email" value={user.email}/>
            <input onChange={handleChange} type="password" name="password" className="input input--password" value={user.password}/>
            <button type="submit">Créer un compte</button>
        </form>
    )
}

export default FormSignup;