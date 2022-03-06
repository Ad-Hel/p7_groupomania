import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import useAuth from "../components/useAuth";
import apiRequest from "../js/apiRequest";

import Container from "../layout/Container";
import FormPicture from "../components/FormPicture";
import Reactions from '../components/Reactions';
import Button from "../components/Button";

import '../scss/component/picture.scss';

function Picture(){
    const [picture, setPicture] = useState(null);
    const [userId, setUserId] = useState(0);
    const [isModify, setIsModify] = useState(false);
    const [error, setError] = useState(null)
    const { id } = useParams()

    const auth = useAuth().auth;
    const navigate = useNavigate();

    useEffect( () => {
        /**
         * 
         * This function makes an API call to retrieve one picture ressource identified by its id.
         * 
         * @name getOnePicture
         * @function
         * @param {integer} id 
         */
        async function getOnePicture(id) {
            const args = {
                token: auth.token,
                url: "picture/" + id,
            }
            const res = await apiRequest(args);
            setPicture(res.data);
            setUserId(res.data.UserId);
        }
        getOnePicture(id)
    }, [isModify, auth.token, id])

    /**
     * 
     * This function makes an api call to soft delete a picture ressource identified by its id.
     * 
     * @name handleDelete
     * @function
     */
    async function handleDelete(){
        const args = {
            token: auth.token,
            init: {
                method: 'DELETE'
            },
            url: 'picture/' + id
        };
        const res = await apiRequest(args);
        if (res.status === 200){
            navigate('/');
        } else if (res.status === 403){
            setError(res.data.message)
        }
    }


    /**
     * 
     * This function toggles the modify state to show the form to modify the picture.
     * 
     * @name handleModify
     * @function
     */
    function handleModify(){
        setIsModify(!isModify);
    }
    
    return picture ?
    
    (
        <Container>
            {!isModify ?
            
            <article className="picture">
                <img className="picture__image" src={picture.imageUrl} alt="" />
                <div className="picture__content">
                    <header className="picture__header">
                        <h1 className="picture__title">{picture.title}</h1>
                    </header>
                    <footer className="picture__footer">
                        <Link to={`/user/${picture.UserId}`} replace>{picture.User.firstName} {picture.User.lastName}</Link>
                        <Reactions auth={auth} target={picture} path='picture'/>
                    </footer>
                </div>            
            </article>
            :
            <>
                <FormPicture picture={picture} isModify setIsModify={setIsModify}/>
                <Button type='button' classStyle='delete' onclick={handleDelete}>Supprimer</Button>
                { error && <p>{error}</p>}
            </>
            }
            {((auth.id === userId || auth.role > 1 )&& !isModify) && <Button type='button' classStyle='edit' onclick={handleModify}>Modifier</Button>}
        </Container>
    ) : (
        <Container>
            <p>Chargement...</p>
        </Container>
    )
}

export default Picture