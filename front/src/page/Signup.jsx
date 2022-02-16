import { useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../components/useAuth';
import apiRequest from '../js/apiRequest';

import Container from '../layout/Container';
import FormUser from '../components/FormUser';


function Signup(){
    const [error, setError] = useState(null)
    const Auth = useAuth();

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
        } else if (res.status === 500 && res.data.name === "SequelizeUniqueConstraintError"){
            setError('L\'adresse email renseignée est déjà utilisée pour un compte. Veuillez vous connecter.')
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