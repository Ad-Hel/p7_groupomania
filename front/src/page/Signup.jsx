import Header from '../layout/Header'
import Container from '../layout/Container';
import Footer from '../layout/Footer';
import FormSignup from '../components/FormSignup';

function Signup(){
    return(
        <Container>
            <h1>Rejoindre la communauté Groupomania </h1>
            <FormSignup/>
        </Container>
    )
}

export default Signup;