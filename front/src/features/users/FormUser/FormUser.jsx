import { useState, useEffect } from 'react';

import useAuth from '../useAuth/useAuth';

import { Button, Form, Input } from 'features/ui';

function FormUser(props){
    const { auth } = useAuth();

    const initUser = {
        firstName: '', 
        lastName: '', 
        email: '',
        password: '',
        role: 1
    };
    const initError = {
        firstName: null, 
        lastName: null, 
        email: null,
        password: null,
        role: null,
        form: null
    }
    const [user, setUser] = useState(initUser);
    const [error, setError] = useState(initError)

    useEffect( () => {
        /**
         * 
         * Aliment the form if props.user object exists.
         * 
         */
        if (props.user){
            setUser({
                ...props.user,
                password: ''
            });
        }
    }, [props.user]);

    /**
     * 
     * This function use the value of the input who triggers it to saves it in the user state.
     * Some controls over the input are also triggered and return messages in the error state.
     * 
     * @function
     * @param {event} event 
     */
    function handleInput(event){
        const value = event.target.value;
        const name = event.target.name;
        // Handle wrong inputs.
        // Reset error
        setError({
            ...error,
            [name]: null
        })
        // check for arobas in email
        if ( name === 'email' && !value.includes('@') ){
            setError({
                ...error,
                email: 'Votre adresse doit comporter un @'
            });
        }
        // check for too short password
        if ( name === 'password' && ( value.length < 6 ) ){
            setError({
                ...error,
                password: 'Votre mot de passe doit comporter au moins 6 caractères.'
            })
        } 
        // check for too long password
        if ( name === 'password' && ( value.length > 50 )){
            setError({
                ...error,
                password: 'Votre mot de passe ne doit pas dépasser plus de 50 caractères.'
            })
        }
        // detect empty if its not called to modify an existing user
        if (!value){
            setError({
                ...error,
                [event.target.name]: 'Ce champ est obligatoire !'
            })
        }
        // Save input content in user state.
        setUser({
            ...user,
            [name]: value
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
        /**
         * If an error is still showed, the form can't be submitted
         */
        let valid = true;
        Object.entries(error).forEach(([key, value]) => {
            if (value !== null){
                valid = false;
                return valid;
            }
        });
        if (valid){
            props.formaction(user);
        }
    }

    return(
        <Form action={handleFormSubmit}>
            {(auth && auth.role > 1) && <Input label="Rôle" type="number" name="role" value={user.role} onchange={handleInput} error={error.role} max={auth.role}/>}
            {!props.isSignIn && <>
                <Input label="Prénom" type="text" name="firstName" value={user.firstName} onchange={handleInput} error={error.firstName}/>
                <Input label="Nom" type="text" name="lastName" value={user.lastName} onchange={handleInput} error={error.lastName}/>
            </>}
            <Input label="Courriel" type="email" name="email" value={user.email} onchange={handleInput} error={error.email}/>
            <Input label="Mot de passe" type="password" name="password" value={user.password} onchange={handleInput} error={error.password} {... props.user && {autocomplete:true}} />
            <Button type="submit">{props.label}</Button>
            {props.error && props.error.map((error, index) => (
                <p key={index} className="form__error">{error}</p>
            ))}
        </Form>
    )
}

export default FormUser