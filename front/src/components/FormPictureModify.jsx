import { useState, useEffect } from "react";


function FormPictureModify(props){
    const [picture, setPicture] = useState({
        title: "Titre",
    });
    const [file, setFile] = useState(null);
    const auth = JSON.parse(window.localStorage.getItem('user'));
    const token = "Bearer " + auth.token;
    const id = props.id;

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
                setPicture({
                    title: picture.title
                });
            } catch(error){
                console.log(error);
            }
        }
        getOnePicture(id)
        
    }, [])

    async function sendPicture(data, picture){
        picture = {
            ...picture
        }
        data.append("picture", JSON.stringify(picture));
        const initHead = new Headers({
            // "Content-Type": "multipart/form-data",
            "Authorization": token
        });
        const init = {
            method: 'PUT',
            mode: 'cors',
            headers: initHead,
            body: data
        }
        await console.log(init.body.image);
        try{
            const res = await fetch('http://localhost:3000/api/picture/' + id, init);
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
    }

    return(
        <form onSubmit={createPicture}>
            <input onChange={getTitle} type="text" name="title" className="input input--text" value={picture.title}/>
            <input onChange={getFile} type="file" name="image" className="input input--file"/>
            <button type="submit">Modifier</button>
        </form>
    )
}

export default FormPictureModify;