import { useEffect, useState } from "react";

function AllPictures(){
    const [pictures, setPictures] = useState([]);
    useEffect(() => {
        async function getAllPictures(){
            try{
                const user = JSON.parse(window.localStorage.getItem('user'));
                const auth = "Bearer " + user.token;
                const head = new Headers({
                    "Authorization": auth
                })
                const init = {
                    headers: head
                }
                const res = await fetch('http://localhost:3000/api/picture', init);
                const pictures = await res.json();
                console.log(pictures);
                setPictures(pictures);
            } catch(error){
                // console.log(res.error);
                // if (res.status() === 401){
                    // window.location.replace('http://localhost:3001/signin');
                // }
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
                <h3>{picture.title}</h3>
                <img src={picture.imageUrl} alt=""/>
            </article>
            ))}
        </section>
       
    )
}

export default AllPictures