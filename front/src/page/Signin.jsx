import { useState } from 'react';
import { Link } from 'react-router-dom'

import useAuth from '../components/useAuth';

import Container from '../layout/Container';
import FormUser from '../components/FormUser';

function Signin(){
    // const [formData, setFormData] = useState(null);
    const [error, setError] = useState(null);
    const Auth = useAuth();

    async function signIn(data){
        const res = await Auth.onSignIn(data);
        if (res){
            setError(res);
        } 
    }

    return(
        <Container>
            <FormUser isSignIn formaction={signIn} error={error} label='Se connecter'/>
            <p>Pas encore de compte ? C'est par <Link to="/signup">ici</Link>.</p>
        </Container>
    )
}

export default Signin;