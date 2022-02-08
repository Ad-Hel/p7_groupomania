import Container from "../layout/Container";
import OneUser from "../components/OneUser";
import { useState } from "react";
import FormUserModify from "../components/FormUserModify";
import useAuth from "../components/useAuth";

function User(){
    const id = parseInt(new URLSearchParams(window.location.search).get('id'),10);
    const auth = useAuth().auth;
    const [isModify, setIsModify] = useState(false);
    return(
        <Container>
            {isModify ?
            <FormUserModify id={id} setIsModify={setIsModify}/> 
            :
            <OneUser id={id}/>}
            {((auth.id === id || auth.role > 1 ) && !isModify) && <button onClick={() => setIsModify(true)}>Modifier</button>}  
        </Container>
    ) 
}

export default User