import { useState } from "react";

function FormSignup(props){
    const [user, setUser] = useState({
    firstName: 'Prénom',
    lastName: 'Nom',
    mail: 'votre@email.ex',
    password: 'mot de passe'
    });
    
    async function sendUser(user){
        const initHead = new Headers({
            "Content-Type": "application/json"
        })
        const init = {
            method: 'POST',
            headers: initHead,
            mode: 'cors',
            body: user
        }
        try{
            const res = await fetch('http://localhost:3000/api/auth/signup', init);
            user = await res.json();
            console.log("sendUser : " + user);
        }
        catch(error){
            console.log(error);
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