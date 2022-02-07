import Container from '../layout/Container';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
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