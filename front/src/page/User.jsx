import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import useAuth from "../components/useAuth";
import apiRequest from "../js/apiRequest";

import Container from "../layout/Container";
import FormUserModify from "../components/FormUserModify";
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
                url: 'auth/' + id
            }
            const res = await apiRequest(args);
            if ( res.status === 200 ){
                setUser(res.data);            }
        }
        getUser(id);
    }, [])

    async function handleDelete(){
        const args = {
            token: auth.token,
            init: {
                method: 'DELETE'
            },
            url: 'auth/' + id
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
            <div>
                <FormUserModify id={id} setIsModify={setIsModify}/> 
                <button className="button button--delete" onClick={handleDelete}>Supprimer</button>
                { error && <p>{error}</p>}
            </div>
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