import Header from "../layout/Header";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import OnePicture from "../components/OnePicture";
import FormPictureModify from "../components/FormPictureModify";

import { useState } from 'react';


function Picture(){
    const id = parseInt(new URLSearchParams(window.location.search).get('id'),10);
    const auth = JSON.parse(window.localStorage.getItem('user'));
    const [isModify, setIsModify] = useState(false);
    return(
        <div>
            <Header/>
            <Container>
                {!isModify ?
                <OnePicture id={id}/>
                :
                <FormPictureModify id={id}/>
                }
                {(auth.id === id && !isModify) && <button onClick={() => setIsModify(true)}>Modifier</button>}
            </Container>
            <Footer/>
        </div>

    )
}

export default Picture