import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth, FormUser } from 'features/users';
import apiRequest from 'apiRequest';

import { Container } from 'features/ui';

function Signup(){
    const [error, setError] = useState(null)
    const Auth = useAuth();

    /**
     * 
     * This function makes an API call to create a new user ressource.
     * It set error state if needed.
     * 
     * @name createUser
     * @function
     * @param {object & {firstName: string, lastName: string, email: string, password: string}} data 
     */
    async function createUser(data){
        const args = {
            head: {
                "Content-Type": "application/json"
            },
            init: {
                method: 'POST',
                body: JSON.stringify(data)
            },
            url: "user/signup"
        }        
        const res = await apiRequest(args);
        if (res.status === 201){
            await Auth.onSignIn(data);
        } else if (res.status === 500){
            setError(res.data)
        }
    }

    return(
        <Container>
            <FormUser formaction={createUser} error={error} label="S'inscrire" />
            <p>Si vous avez déjà un compte, c'est par <Link to="/signin">ici</Link>.</p>
        </Container>
    )
}

export default Signup;