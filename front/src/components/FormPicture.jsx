import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import useAuth from "./useAuth";
import apiRequest from "../js/apiRequest";

import Form from "./Form";
import Button from "./Button";
import Input from "./Input";

function FormPicture(props){
    const auth = useAuth().auth;
    const navigate = useNavigate();
    const [picture, setPicture] = useState({ title: "Titre" });
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (props.isModify){
            setPicture({ title: props.picture.title })
            document.getElementById('image').style.backgroundImage = 'url(' + props.picture.imageUrl + ')';
        }
    }, [])
    
    async function createPicture(data){
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
            const url = '/picture/' + res.data.id;
            navigate(url);
        }
    }

    async function modifyPicture(data){
       const args =  {
           init: {
               method: 'PUT',
               body: data
           },
           token: auth.token,
           url: 'picture/' + props.picture.id
       }
       const res = await apiRequest(args);
       if (res.status === 200){
            props.setIsModify(false);
       } else if (res.status === 403){
           setError(res.data.message);
       }
    }

    function handlePicture(form){
        form.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        formData.append("picture", JSON.stringify(picture));
        if (props.isModify){
            modifyPicture(formData)
        } else {
            createPicture(formData)
        }
    }

    function getTitle(event){
        const value = event.target.value;
        setPicture({
            'title': value
        })
    }

    function getFile(event){
        const [file] = event.target.files;
        event.target.style.backgroundImage = 'url(' + URL.createObjectURL(file) +')';
        setFile(file)

    }

    return(
        <Form action={handlePicture}>
            <Input type="text" name="title" value={picture.title} onchange={getTitle}/>
            <Input type="file" name="image" onchange={getFile}/>
            <Button type="submit">Poster</Button>
            {error && <p className="error">{error}</p>}
        </Form>
    )
}

export default FormPicture