import { useState, useEffect } from 'react';

import useAuth from './useAuth';

import Form from './Form';
import Input from './Input';
import Button from './Button';

function FormUser(props){
    const[user, setUser] = useState({});
    const [error, setError] = useState({
        form: null,
        firstName: null, 
        lastName: null, 
        email: null,
        password: null,
        role: null
    })
    const { auth } = useAuth();

    useEffect( () => {
        if (props.user){
            setUser(props.user);
        }
    }, []);

    function handleInput(event){
        if (!event.target.value){
            setError({
                ...error,
                [event.target.name]: 'Ce champ est obligatoire !'
            })
        }  else {
            setError({
                ...error,
                [event.target.name]: null
            })
        }
        if ( event.target.name === 'email' && !event.target.value.includes('@') ){
            setError({
                ...error,
                email: 'Votre adresse doit comporter un @'
            });
        } else if ( event.target.name === 'email') {
            setError({
                ...error,
                email: null
            })
        }
        if ( event.target.name === 'password' && ( event.target.value.length < 6 ) ){
            setError({
                ...error,
                password: 'Votre mot de passe doit comporter au moins 6 caractères.'
            })
        } else if ( event.target.name === 'password' ) {
            setError({
                ...error,
                password: null
            })
        }
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
            {(auth && auth.role > 1) && <Input label="Rôle" type="number" name="role" value={user.role} onchange={handleInput} error={error.role}/>}
            {!props.isSignIn && <>
                <Input label="Prénom" type="text" name="firstName" value={user.firstName} onchange={handleInput} error={error.firstName}/>
                <Input label="Nom" type="text" name="lastName" value={user.lastName} onchange={handleInput} error={error.lastName}/>
            </>}
            <Input label="Courriel" type="email" name="email" value={user.email} onchange={handleInput} error={error.email}/>
            <Input label="Mot de passe" type="password" name="password" value={user.password} onchange={handleInput} error={error.password}/>
            <Button type="submit">{props.label}</Button>
            {props.error && <p className="error">{props.error}</p>}
        </Form>
    )
}

export default FormUser