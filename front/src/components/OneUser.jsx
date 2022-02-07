import { useEffect, useState } from "react";
import apiRequest from "../js/apiRequest";
import useAuth from "./useAuth";

function OneUser(props){
    const [user, setUser] = useState(' ');
    const id = props.id;
    const auth = useAuth().auth;
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

    return(
        <article className="user-card">
            <h1 className="user-card__title">{user.firstName} {user.lastName}</h1>
            <p className="user-card__text">Contacter par <a href={`mailto:${user.email}`}>email</a></p>
        </article>
    )

}

export default OneUser