import Header from "../layout/Header";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import OneUser from "../components/OneUser";
import { useState } from "react";
import FormUserModify from "../components/FormUserModify";


function User(){
    const id = parseInt(new URLSearchParams(window.location.search).get('id'),10);
    const auth = JSON.parse(window.localStorage.getItem('user'));
    const [isModify, setIsModify] = useState(false);
    return(
        <div>
            <Header/>
            <Container>
                {isModify ?
                <FormUserModify id={id}/> 
                :
                <OneUser id={id}/>}
                {(auth.id === id && !isModify) && <button onClick={() => setIsModify(true)}>Modifier</button>}  
            </Container>
            <Footer/>
        </div>
    ) 
}

export default User