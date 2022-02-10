import { useState, useEffect } from "react";
import apiRequest from "../js/apiRequest";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import useAuth from './useAuth';


function FormPictureModify(props){
    const [picture, setPicture] = useState({
        title: "Titre",
    });
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const auth = useAuth().auth;
    const id = props.id;

    useEffect( () => {
        async function getOnePicture(id) {
            try{
                const args = {
                    token: auth.token,
                    url: 'picture/' + id,
                }
                const res = await apiRequest(args);
                setPicture({
                    title: res.data.title
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
       const args =  {
           init: {
               method: 'PUT',
               body: data
           },
           token: auth.token,
           url: 'picture/' + id
       }
       const res = await apiRequest(args);
       if (res.status === 200){
            props.setIsModify(false);
       } else if (res.status === 403){
           setError(res.data.message);
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
            <Button type="submit">Modifier</Button>
            {error && <p className="error">{error}</p>}
        </Form>
    )
}

export default FormPictureModify;