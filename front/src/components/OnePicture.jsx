import { useEffect, useState } from "react";

function OnePicture(props){
    const [picture, setPicture] = useState(' ');
    const id = props.id;
    const token = "Bearer " + JSON.parse(window.localStorage.getItem('user')).token;
    useEffect( () => {
        async function getOnePicture(id) {
            try{
                const headers = new Headers({
                    "Authorization": token
                })
                const init = {
                    headers: headers
                }
                const res = await fetch('http://localhost:3000/api/picture/' + id, init);
                const picture = await res.json();
                setPicture(picture);
            } catch(error){
                console.log(error);
            }
        }
        getOnePicture(id)
        
    }, [])

    return(
        <article>
            <h1>{picture.title}</h1>
            <img src={picture.imageUrl} alt="" />
        </article>
        
    )
}

export default OnePicture