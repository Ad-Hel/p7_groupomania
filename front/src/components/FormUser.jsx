import { useState, useEffect } from 'react';

import useAuth from './useAuth';

import Form from './Form';
import Input from './Input';
import Button from './Button';

function FormUser(props){
    const[user, setUser] = useState({});
    const { auth } = useAuth();

    useEffect( () => {
        if (props.user){
            setUser(props.user);
        }
    }, []);

    function handleInput(event){
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    function handleFormSubmit(form){
        form.preventDefault();
        props.formaction(user);
    }

    return(
        <Form action={handleFormSubmit}>
            {(auth && auth.role > 1) && <Input label="Rôle" type="number" name="role" value={user.role} onchange={handleInput}/>}
            {!props.isSignIn && <><Input label="Prénom" type="text" name="firstName" value={user.firstName} onchange={handleInput}/>
            <Input label="Nom" type="text" name="lastName" value={user.lastName} onchange={handleInput}/></>}
            <Input label="Courriel" type="email" name="email" value={user.email} onchange={handleInput}/>
            <Input label="Mot de passe" type="password" name="password" value={user.password} onchange={handleInput}/>
            <Button type="submit">{props.label}</Button>
            {props.error && <p className="error">{props.error}</p>}
        </Form>
    )
}

export default FormUser