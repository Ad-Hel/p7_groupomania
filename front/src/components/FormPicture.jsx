import { useState } from "react";
import apiRequest from "../js/apiRequest";
import Button from "./Button";
import Form from "./Form";
import Input from "./Input";
import useAuth from "./useAuth";
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function FormPicture(){
    const auth = useAuth().auth;
    const navigate = useNavigate();
    const [picture, setPicture] = useState({
        title: "Titre",
    });

    const [file, setFile] = useState(null);

    async function sendPicture(data, picture){
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
            console.log("201 ok")
            const url = '/picture/' + res.data.id;
            // return <Navigate to={url} replace/>
            navigate(url);
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
        setFile(event.target.files[0])
    }

    return(
        <Form action={createPicture}>
            <Input type="text" name="title" value={picture.title} onchange={getTitle}/>
            <Input type="file" name="image" onchange={getFile}/>
            <Button type="submit">Poster</Button>
        </Form>
    )
}

export default FormPicture