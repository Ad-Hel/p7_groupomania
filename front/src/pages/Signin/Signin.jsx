import { useState } from 'react';
import { Link } from 'react-router-dom'

import { useAuth, FormUser } from 'features/users';

import { Container } from 'features/ui';


function Signin(){
    const [error, setError] = useState(null);
    const Auth = useAuth();

    /**
     * 
     * This function call the onSignIn method of Auth context and set error state if needed.
     * 
     * @name signIn
     * @param {object & {email: string, password: string}} data 
     */
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