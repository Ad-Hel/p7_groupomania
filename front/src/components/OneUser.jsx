import { useEffect, useState } from "react";

function OneUser(props){
    const [user, setUser] = useState(' ');
    const id = props.id;
    const auth = JSON.parse(window.localStorage.getItem('user'))
    const token = "Bearer " + auth.token;
    useEffect( () => {
        async function getUser(id){
            try{
                const headers = new Headers({
                    "Authorization": token
                })
                const init = {
                    headers: headers
                }
                const res = await fetch('http://localhost:3000/api/auth/' + id, init);
                const user = await res.json();
                setUser(user);
            } catch(error){
                console.log(error)
            }
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