import { useEffect, useState } from "react";
import apiRequest from "../js/apiRequest";
import LikeButton from "./LikeButton";
import '../scss/component/front-picture.scss'
import useAuth from "./useAuth";

function AllPictures(){
    const [pictures, setPictures] = useState([]);
    const [page, setPage] = useState(1);
    const auth = useAuth().auth;
    useEffect(() => {
        async function getAllPictures(pageNumber){
            try{
                const args = {
                    token: auth.token,
                    url: "picture/page/" + pageNumber,
                }
                const res = await apiRequest(args);
                setPictures(res.data);
                console.log(res.data)
            } catch(error){
                console.log(error);
            }
        }
        getAllPictures(page);
        window.scrollTo(0,0);

    }, [page])

    function handlePagination(){
        setPage(page + 1);
    }

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
                    <p><a href={`/user?id=${picture.UserId}`}>{picture.User.firstName} {picture.User.lastName}</a></p>
                    <LikeButton auth={auth} picture={picture.id} likesCount={picture.Likes.length} isLiked={picture.Likes.find(x => (x = {UserId: auth.id})) ? true : false} />
                </footer>
            </article>
            ))}
            <button onClick={handlePagination}>Page suivante</button>
        </section>
       
    )
}

export default AllPictures