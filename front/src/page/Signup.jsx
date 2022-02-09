import Container from '../layout/Container';
import FormSignup from '../components/FormSignup';
import { Link } from 'react-router-dom';

function Signup(){
    return(
        <Container>
            <h1>Rejoindre la communauté Groupomania </h1>
            <FormSignup/>
            <p>Si vous avez déjà un compte, c'est par <Link to="/signin">ici</Link>.</p>
        </Container>
    )
}

export default Signup;