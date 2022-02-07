import { useEffect, useState } from "react";
import apiRequest from "../js/apiRequest";
import LikeButton from "./LikeButton";
import '../scss/component/front-picture.scss'
import useAuth from "./useAuth";

function AllPictures(){
    const [pictures, setPictures] = useState([]);
    const auth = useAuth().auth;
    console.log(auth);
    useEffect(() => {
        async function getAllPictures(){
            try{
                const args = {
                    token: auth.token,
                    url: "picture"
                }
                const res = await apiRequest(args);
                setPictures(res.data);
                console.log(res.data)
            } catch(error){
                console.log(error);
            }
        }
        getAllPictures();
    }, [])

    return(
        <section>
            <h2>
                Bonjour {auth.firstName}.
            </h2>
            {pictures.map((picture)=>(
            <article key={picture.id} className="front-picture">
                <header className="front-picture__header">
                    <a href={`/picture?id=${picture.id}`} >
                        <h3 className="front-picture__title">{picture.title}</h3>
                    </a>
                </header>
                <img className="front-picture__image" src={picture.imageUrl} alt=""/>
                <footer className="front-picture__footer">
                    <p><a href={`/user?id=${picture.User.id}`}>{picture.User.firstName} {picture.User.lastName}</a></p>
                    <LikeButton auth={auth} picture={picture.id} />
                </footer>
            </article>
            ))}
        </section>
       
    )
}

export default AllPictures