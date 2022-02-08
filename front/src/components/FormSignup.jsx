import {  useState } from "react";
import useAuth from "./useAuth";
import apiRequest from "../js/apiRequest";
import ButtonSubmit from "./ButtonSubmit";
import Form from "./Form";
import Input from "./Input";


function FormSignup(){
    const [user, setUser] = useState({
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'votre@email.ex',
    password: 'mot de passe'
    });
    const [error, setError] = useState(null)
    const Auth = useAuth();


    async function sendUser(user){
        const args = {
            head: {
                "Content-Type": "application/json"
            },
            init: {
                method: 'POST',
                body: JSON.stringify(user)
            },
            url: "auth/signup"
        }        
        const res = await apiRequest(args);
        if (res.status === 201){
            await Auth.onSignIn(user);
        } else if (res.status === 500 && res.data.name === "SequelizeUniqueConstraintError"){
            setError('L\'adresse email renseignée est déjà utilisée pour un compte. Veuillez vous connecter.')
        }
    }

    function userCreate(form){
        form.preventDefault();
        sendUser(user);
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
            {error && <p className="error">{error}</p>}
        </Form>
    )
}

export default FormSignup;