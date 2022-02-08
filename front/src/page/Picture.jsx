import Container from "../layout/Container";
import OnePicture from "../components/OnePicture";
import FormPictureModify from "../components/FormPictureModify";
import { useEffect, useState } from 'react';
import useAuth from "../components/useAuth";


function Picture(){
    const [userId, setUserId] = useState(0);
    const [isModify, setIsModify] = useState(false);
    const id = parseInt(new URLSearchParams(window.location.search).get('id'),10);
    const auth = useAuth().auth;
    
    return(
        <div>
            <Container>
                {!isModify ?
                <OnePicture id={id} setUserId={setUserId}/>
                :
                <FormPictureModify id={id} setIsModify={setIsModify}/>
                }
                {((auth.id === userId || auth.role > 1 )&& !isModify) && <button onClick={() => setIsModify(true)}>Modifier</button>}
            </Container>
        </div>

    )
}

export default Picture