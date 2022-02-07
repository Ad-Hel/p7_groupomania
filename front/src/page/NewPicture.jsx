import Header from "../layout/Header";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import FormPicture from "../components/FormPicture";
import isAuth from "../js/isAuth";


function NewPicture(){
    if (!isAuth()){
        window.location.replace('http://localhost:3001/signin')
      }
    return(
        <Container>
            <h1>Nouvelle image</h1>
            <FormPicture/>
        </Container>

    )
}

export default NewPicture