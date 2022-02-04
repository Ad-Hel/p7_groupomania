import { useEffect, useState } from "react";
import apiRequest from "../js/apiRequest";
import LikeButton from "./LikeButton";

function AllPictures(){
    const [pictures, setPictures] = useState([]);
    const auth = JSON.parse(window.localStorage.getItem('auth'));
    useEffect(() => {
        async function getAllPictures(){
            try{
                const args = {
                    token: auth.token,
                    url: "picture"
                }
                const res = await apiRequest(args);
                setPictures(res.data);
            } catch(error){
                console.log(error);
            }
        }
        getAllPictures();
    }, [])

    return(
        <section>
            <h2>
                Timeline
            </h2>
            {pictures.map((picture)=>(
            <article key={picture.id}>
                <a href={`http://localhost:3001/picture?id=${picture.id}`} ><h3>{picture.title}</h3></a>
                <img src={picture.imageUrl} alt=""/>
                <LikeButton auth={auth} picture={picture.id} />
            </article>
            ))}
        </section>
       
    )
}

export default AllPictures