import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth, FormUser } from "features/users";
import apiRequest from "apiRequest";

import { Button, Container } from "features/ui";

function User(){
    const [user, setUser] = useState(null);
    const [isModify, setIsModify] = useState(false);
    const [error, setError] = useState(null)

    const { auth } = useAuth();
    const navigate = useNavigate();

    const { id } =  useParams();
    
    useEffect( () => {
        /**
         * 
         * This function makes an API call to retrieve an user ressource determined by its id.
         * 
         * @name getUser
         * @function
         * @param {integer} id 
         */
        async function getUser(id){
            const args = {
                token: auth.token,
                url: 'user/' + id
            }
            const res = await apiRequest(args);
            if ( res.status === 200 ){
                setUser(res.data);            }
        }
        getUser(id);
    }, [isModify, id, auth.token])

    /**
     * 
     * This function makes an API call to update an existing user ressource.
     * It sets the error state if needed.
     * 
     * @name updateUser
     * @function
     * @param {object & {firstName: string, lastName: string, email: string, password: string, role: integer}} user 
     */
    async function updateUser(data){
        const args = {
            token: auth.token,
            head: {
                "Content-Type": "application/json"
            },
            init: {
                method: 'PUT',
                body: data
            },
            url: 'user/' + id
        }
        const res = await apiRequest(args);
        if (res.status === 200){
           setIsModify(false);
       } else if (res.status === 403){
           setError(res.data.message);
       }
    }

    /**
     * 
     * This function deletes entries in the object whose content have not be modified or are empty string.
     * It stringify the final object and call the updateUser function.
     * 
     * @name handleUser
     * @function
     * @param {object & {firstName: string, lastName: string, email: string, password: string, role: integer}} data 
     */
    function handleUser(data){
        const newUser = Object.keys(data).reduce((diff, key) => {
            if (user[key] === data[key] || data[key] === '') return diff;
            return {
                ...diff,
                [key]: data[key]
            }
        }, {})
        updateUser(JSON.stringify(newUser));
    }

    /**
     * 
     * This function makes an API call to soft delete an user ressource.
     * 
     * @name handleDelete
     * @function
     */
    async function handleDelete(){
        const args = {
            token: auth.token,
            init: {
                method: 'DELETE'
            },
            url: 'user/' + id
        };
        const res = await apiRequest(args);
        if (res.status === 200){
            navigate('/');
        } else if (res.status === 403){
            setError(res.data.message)
        }
    }

    /**
     * This function toggle the isModify state to show the form.
     * @name handleModify
     * @function
     */
    function handleModify(){
        setIsModify(!isModify);
    }

    return user ? (
        <Container>
            {isModify ?
            <>
                <FormUser user={user} isModify error={error} formaction={handleUser} label='Modifier' /> 
                <Button type='button' classStyle='delete' onclick={handleDelete}>Supprimer</Button>
                { error && <p>{error}</p>}
            </>
            :
            <article className="user-card">
                <h1 className="user-card__title">{user.firstName} {user.lastName}</h1>
                <p className="user-card__text">Contacter par <a href={`mailto:${user.email}`}>email</a></p>
            </article>
            }
            {((auth.id === parseInt(id) || auth.role > 1 )&& !isModify) && <Button type='button' classStyle='edit' onclick={handleModify}>Modifier</Button>}
        </Container>
    ) : (
        <Container>
            <p>Chargement...</p>
        </Container>
    )
}

export default User;