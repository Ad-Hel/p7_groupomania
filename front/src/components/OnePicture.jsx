import { useEffect, useState } from "react";

function OnePicture(props){
    const [picture, setPicture] = useState(' ');
    const [id, setId] = useState(props.id); 
    console.log('ID : ' + id);
    useEffect( () => {
        async function getOnePicture(id) {
            try{
                const res = await fetch('http://localhost:3000/api/picture/' + id);
                const picture = await res.json();
                console.log(picture);
                setPicture(picture);
            } catch(error){
                console.log(error);
            }
        }
        console.log('ID in useEffect : ' + id)
        getOnePicture(id)
        
    }, [])

    return(
        <article>
            <h3>{picture.title}</h3>
            <img src={picture.imageUrl} alt="" />
        </article>
        
    )
}

export default OnePicture