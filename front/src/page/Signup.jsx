import Header from '../layout/Header'
import Container from '../layout/Container';
import Footer from '../layout/Footer';
import FormSignup from '../components/FormSignup';

function Signup(){
    return(
        <div>
            <Header/>
            <h1>Rejoindre la communauté Groupomania </h1>
            <Container>
                <FormSignup/>
            </Container>
            {/* <Footer/> */}
        </div>
    )
}

export default Signup;