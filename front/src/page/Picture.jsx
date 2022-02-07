import Header from "../layout/Header";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import OnePicture from "../components/OnePicture";
import FormPictureModify from "../components/FormPictureModify";
import isAuth from "../js/isAuth";
import { useEffect, useState } from 'react';


function Picture(){
    if (!isAuth()){
        window.location.replace('http://localhost:3001/signin')
      }
    const [userId, setUserId] = useState(0);
    const id = parseInt(new URLSearchParams(window.location.search).get('id'),10);
    useEffect(()=>{
        console.log(userId);
    }, [userId])
    
    const auth = JSON.parse(window.localStorage.getItem('auth'));
    console.log(auth.id);
    const [isModify, setIsModify] = useState(false);
    return(
        <div>
            <Container>
                {!isModify ?
                <OnePicture id={id} setUserId={setUserId}/>
                :
                <FormPictureModify id={id} setIsModify={setIsModify}/>
                }
                {(auth.id === userId && !isModify) && <button onClick={() => setIsModify(true)}>Modifier</button>}
            </Container>
        </div>

    )
}

export default Picture