import Container from '../layout/Container';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import FormSignin from '../components/FormSignin';


function Signin(){
    return(
        <div>
            <Header/>
            <h1>Se connecter</h1>
            <Container>
                <FormSignin/>
            </Container>
            <Footer/>
        </div>
    )
}

export default Signin;