import Container from "../layout/Container";
import OnePicture from "../components/OnePicture";
import FormPictureModify from "../components/FormPictureModify";
import { useEffect, useState } from 'react';
import useAuth from "../components/useAuth";
import apiRequest from "../js/apiRequest";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";


function Picture(){
    const [userId, setUserId] = useState(0);
    const [isModify, setIsModify] = useState(false);
    const [error, setError] = useState(null)
    const { id } = useParams()
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

    function handleModify(){
        setIsModify(!isModify);
    }
    
    return(
        <div>
            <Container>
                {!isModify ?
                <OnePicture id={id} setUserId={setUserId}/>
                :
                <div>
                    <FormPictureModify id={id} setIsModify={setIsModify}/>
                    <Button type='button' classStyle='delete' onclick={handleDelete}>Supprimer</Button>
                    { error && <p>{error}</p>}
                </div>
                }
                {((auth.id === userId || auth.role > 1 )&& !isModify) && <Button type='button' classStyle='edit' onclick={handleModify}>Modifier</Button>}
            </Container>
        </div>

    )
}

export default Picture