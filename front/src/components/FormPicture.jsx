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
    const [picture, setPicture] = useState({ title: null });
    const [file, setFile] = useState(null);
    const [error, setError] = useState({
        form: [],
        title: null
    });

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
        } else {
            setError({
                ...error,
                form: res.data
            });
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
       } else {
           setError({
               ...error,
               form: res.data
           });
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
        if (!value){
            setError({title: 'Une image doit avoir un titre !'})
        } else {
            setError({title: null})
        }
        
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
            <Input label="Titre" type="text" name="title" value={picture.title} onchange={getTitle} error={error.title}/>
            <Input label="Image" type="file" name="image" onchange={getFile} accept="image/jpg, image/jpeg, image/gif, image/webp, image/png"/>
            <Button type="submit">Poster</Button>
            {error.form && error.form.map((error) => (
                <p className="form__error">{error}</p>
            ))}
        </Form>
    )
}

export default FormPicture