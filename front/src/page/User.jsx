import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import useAuth from "../components/useAuth";
import apiRequest from "../js/apiRequest";

import Container from "../layout/Container";
import FormUser from "../components/FormUser";
import Button from "../components/Button";

function User(){
    const [user, setUser] = useState(null);
    const [isModify, setIsModify] = useState(false);
    const [error, setError] = useState(null)

    const auth = useAuth().auth;
    const navigate = useNavigate();

    const { id } =  useParams();
    
    useEffect( () => {
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
    }, [isModify])

    async function updateUser(user){
        const args = {
            token: auth.token,
            head: {
                "Content-Type": "application/json"
            },
            init: {
                method: 'PUT',
                body: user
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

    function handleUser(data){
        const newUser = Object.keys(data).reduce((diff, key) => {
            if (user[key] === data[key]) return diff;
            return {
                ...diff,
                [key]: data[key]
            }
        }, {})
        updateUser(JSON.stringify(newUser));
    }

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

export default User