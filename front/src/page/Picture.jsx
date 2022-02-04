import Header from "../layout/Header";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import OnePicture from "../components/OnePicture";
import FormPictureModify from "../components/FormPictureModify";
import isAuth from "../js/isAuth";
import { useState } from 'react';


function Picture(){
    if (!isAuth()){
        window.location.replace('http://localhost:3001/signin')
      }
    const id = parseInt(new URLSearchParams(window.location.search).get('id'),10);
    const auth = JSON.parse(window.localStorage.getItem('auth'));
    const [isModify, setIsModify] = useState(false);
    return(
        <div>
            <Header/>
            <Container>
                {!isModify ?
                <OnePicture id={id}/>
                :
                <FormPictureModify id={id} setIsModify={setIsModify}/>
                }
                {(auth.id === id && !isModify) && <button onClick={() => setIsModify(true)}>Modifier</button>}
            </Container>
            <Footer/>
        </div>

    )
}

export default Picture