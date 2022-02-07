import { useEffect, useState } from "react";
import apiRequest from "../js/apiRequest";
import LikeButton from "./LikeButton";
import '../scss/component/picture.scss';

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
                props.setUserId(res.data.UserId);
            } catch(error){
                console.log(error);
            }
        }
        getOnePicture(id)
    }, [])


    return(
        <article className="picture">
            <img className="picture__image" src={picture.imageUrl} alt="" />
            <div className="picture__content">
                <header className="picture__header">
                    <h1 className="picture__title">{picture.title}</h1>
                </header>
                <footer className="picture__footer"> 
                    <LikeButton auth={auth} picture={picture.id}/>
                </footer>
            </div>            
        </article>
        
    )
}

export default OnePicture