import Container from '../layout/Container';
import FormSignin from '../components/FormSignin';


function Signin(){
    return(
        <Container>
            <h1>Se connecter</h1>
            <FormSignin />
        </Container>
    )
}

export default Signin;