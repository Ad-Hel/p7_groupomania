import { useState } from "react";
import apiRequest from "../js/apiRequest";

function FormPicture(){
    const [picture, setPicture] = useState({
        title: "Titre",
    });

    const [file, setFile] = useState(null);

    async function sendPicture(data, picture){
        const auth = JSON.parse(window.localStorage.getItem('auth'));
        console.log(auth.token)
        picture = {
            ...picture,
            "UserId": auth.id
        }
        data.append("picture", JSON.stringify(picture));
        const args = {
            token: auth.token,
            init: {
                method: 'POST',
                body: data,
            },
            url: 'picture'
        }
        const res = await apiRequest(args);
        if (res.status === 201){
            window.location.replace('http://localhost:3001/picture?id='+res.data.id)
        }
    }

    function createPicture(form){
        form.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        sendPicture(formData, picture)
    }

    function getTitle(event){
        const value = event.target.value;
        setPicture({
            'title': value
        })
    }

    function getFile(event){
        // const fileSelected = event.target.files[0];
        setFile(event.target.files[0])
        console.log(file);
    }

    return(
        <form onSubmit={createPicture}>
            <input onChange={getTitle} type="text" name="title" className="input input--text" value={picture.title}/>
            <input onChange={getFile} type="file" name="image" className="input input--file"/>
            <button type="submit">Poster</button>
        </form>
    )
}

export default FormPicture