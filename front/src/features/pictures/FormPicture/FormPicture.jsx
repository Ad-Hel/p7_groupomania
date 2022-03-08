import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { useAuth } from "features/users";
import apiRequest from "apiRequest";

import { Button, Form, Input } from 'features/ui'

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
        /**
         * Aliment the form if it's called to modify an existing picture.
         */
        if (props.isModify){
            setPicture({ title: props.picture.title })
            document.getElementById('image').style.backgroundImage = 'url(' + props.picture.imageUrl + ')';
        }
    }, [])
    
    /**
     * 
     * This function make an API call to create a picture ressource.
     * It sends a formData object with a file and a title.
     * 
     * @name createPicture
     * @function
     * @param {formData.instance & {title: string, image: file}} data 
     */
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

    /**
     * 
     * This function make an API call to update an existing picture.
     * The data sent mays contain a file and/or a title.
     * 
     * @name modifyPicture
     * @function
     * @param {formData.instance & {title: string, image: file}} data 
     */
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

    /**
     * 
     * This function make an instance of FormData with the file and the title - inside a picture object - and call the right function to make the API call.
     * 
     * @name handlePicture
     * @function
     * @param {formData.instance & {title: string, image: file}} form 
     */
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

    /**
     * 
     * This function get the value of the input text named title to add it to a picture object in state picture.
     * 
     * @name getTitle
     * @function
     * @param {event} event 
     */
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

    /**
     * 
     * This function get the file of file input named image, create an url to display a preview and save it to file state.
     * 
     * @name getFile
     * @function
     * @param {event} event 
     */
    function getFile(event){
        const [file] = event.target.files;
        event.target.style.backgroundImage = 'url(' + URL.createObjectURL(file) +')';
        setFile(file)
    }

    return(
        <Form action={handlePicture}>
            <Input label="Titre" type="text" name="title" value={picture.title} onchange={getTitle} error={error.title}/>
            <Input label="Image" type="file" name="image" onchange={getFile} accept="image/jpg, image/jpeg, image/gif, image/webp, image/png" value={null}/>
            <Button type="submit">Poster</Button>
            {error.form && error.form.map((error) => (
                <p className="form__error">{error}</p>
            ))}
        </Form>
    )
}

export default FormPicture