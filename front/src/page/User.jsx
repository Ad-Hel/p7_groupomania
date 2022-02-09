import Container from "../layout/Container";
import OneUser from "../components/OneUser";
import { useState } from "react";
import FormUserModify from "../components/FormUserModify";
import useAuth from "../components/useAuth";
import apiRequest from "../js/apiRequest";
import { useNavigate } from 'react-router-dom'



function User(){
    const id = parseInt(new URLSearchParams(window.location.search).get('id'),10);
    const auth = useAuth().auth;
    const [isModify, setIsModify] = useState(false);
    const [error, setError] = useState(null)
    const navigate = useNavigate();

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

    return(
        <Container>
            {isModify ?
            <div>
                <FormUserModify id={id} setIsModify={setIsModify}/> 
                <button className="button button--delete" onClick={handleDelete}>Supprimer</button>
                { error && <p>{error}</p>}
            </div>
            :
            <OneUser id={id}/>}
            {((auth.id === id || auth.role > 1 ) && !isModify) && <button onClick={() => setIsModify(true)}>Modifier</button>}  
        </Container>
    ) 
}

export default User