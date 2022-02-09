import Container from "../layout/Container";
import OnePicture from "../components/OnePicture";
import FormPictureModify from "../components/FormPictureModify";
import { useEffect, useState } from 'react';
import useAuth from "../components/useAuth";
import apiRequest from "../js/apiRequest";
import { useNavigate } from "react-router-dom";


function Picture(){
    const [userId, setUserId] = useState(0);
    const [isModify, setIsModify] = useState(false);
    const [error, setError] = useState(null)
    const id = parseInt(new URLSearchParams(window.location.search).get('id'),10);
    const auth = useAuth().auth;
    const navigate = useNavigate();

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
    
    return(
        <div>
            <Container>
                {!isModify ?
                <OnePicture id={id} setUserId={setUserId}/>
                :
                <div>
                    <FormPictureModify id={id} setIsModify={setIsModify}/>
                    <button className="button button--delete" onClick={handleDelete}>Supprimer</button>
                    { error && <p>{error}</p>}
                </div>
                }
                {((auth.id === userId || auth.role > 1 )&& !isModify) && <div className="edit"><button className="button button--edit" onClick={() => setIsModify(true)}>Modifier</button></div>}
            </Container>
        </div>

    )
}

export default Picture