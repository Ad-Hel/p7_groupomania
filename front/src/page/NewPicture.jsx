import Header from "../layout/Header";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import FormPicture from "../components/FormPicture";


function NewPicture(){
    return(
        <div>
            <Header/>
            <Container>
                <h1>Nouvelle image</h1>
                <FormPicture/>
            </Container>
            <Footer/>
        </div>

    )
}

export default NewPicture