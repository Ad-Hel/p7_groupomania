import { useState } from "react";
import apiRequest from "../js/apiRequest";
import signIn from "../js/signIn";
import ButtonSubmit from "./ButtonSubmit";
import Form from "./Form";
import Input from "./Input";


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
        <Form action={userCreate}>
            <Input type="text" name="firstName" value={user.firstName} onchange={handleChange}/>
            <Input type="text" name="lastName" value={user.lastName} onchange={handleChange}/>
            <Input type="email" name="email" value={user.email} onchange={handleChange}/>
            <Input type="password" name="password" value={user.password} onchange={handleChange}/>
            <ButtonSubmit label="Je m'inscris"/>
        </Form>
    )
}

export default FormSignup;