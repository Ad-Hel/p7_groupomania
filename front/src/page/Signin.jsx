import Container from '../layout/Container';
import FormSignin from '../components/FormSignin';
import { Link } from 'react-router-dom'


function Signin(){
    return(
        <Container>
            <h1>Se connecter</h1>
            <FormSignin />
            <p>Pas encore de compte ? C'est par <Link to="/signup">ici</Link>.</p>
        </Container>
    )
}

export default Signin;