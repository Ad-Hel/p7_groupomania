import { useState, useEffect } from 'react';

import useAuth from '../useAuth/useAuth';

import { Button, Form, Input } from 'features/ui';

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
        /**
         * 
         * Aliment the form if props.user object exists.
         * 
         */
        if (props.user){
            setUser(props.user);
        }
    }, []);

    /**
     * 
     * This function use the value of the input who triggers it to saves it in the user state.
     * Some controls over the input are also triggered and return messages in the error state.
     * 
     * @function
     * @param {event} event 
     */
    function handleInput(event){
        // Handle wrong inputs.
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
        // Save input content in user state.
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    /**
     * 
     * Call an function from props with the user state as parameter.
     * 
     * @name handleFormSubmit
     * @function
     * @param {event} form 
     */
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
            {props.error && props.error.map((error) => (
                <p className="form__error">{error}</p>
            ))}
        </Form>
    )
}

export default FormUser