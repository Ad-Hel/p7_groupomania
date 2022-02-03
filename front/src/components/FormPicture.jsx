import { useState } from "react";

function FormPicture(){
    const [picture, setPicture] = useState({
        title: "Titre",
    });

    const [file, setFile] = useState(null);

    async function sendPicture(data, picture){
        const user = JSON.parse(window.localStorage.getItem('user'));
        const auth = "Bearer " + user.token;
        picture = {
            ...picture,
            "UserId": user.id
        }
        data.append("picture", JSON.stringify(picture));
        const initHead = new Headers({
            // "Content-Type": "multipart/form-data",
            "Authorization": auth
        });
        const init = {
            method: 'POST',
            mode: 'cors',
            headers: initHead,
            body: data
        }
        await console.log(init.body.image);
        try{
            const res = await fetch('http://localhost:3000/api/picture', init);
            const picture = await res.json();
            console.log(picture);
        } catch(error){
            console.log(error);
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