import { useEffect, useState } from "react";
import apiRequest from "../js/apiRequest";
import LikeButton from "./LikeButton";

function OnePicture(props){
    const [picture, setPicture] = useState({
        title: "Chargement",
        imageUrl: "/",
        id: 1
    });
    const id = props.id;
    const auth = JSON.parse(window.localStorage.getItem('auth'))
    useEffect( () => {
        async function getOnePicture(id) {
            try{
                const args = {
                    token: auth.token,
                    url: "picture/" + id,
                }
                const res = await apiRequest(args);
                setPicture(res.data);
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
            <LikeButton auth={auth} picture={picture.id}/>
        </article>
        
    )
}

export default OnePicture