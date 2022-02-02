import Header from "../layout/Header";
import Container from "../layout/Container";
import Footer from "../layout/Footer";
import FormPicture from "../components/FormPicture";
import OnePicture from "../components/OnePicture";


function Picture(){
    return(
        <div>
            <Header/>
            <Container>
                <h1>Nouvelle image</h1>
                <FormPicture/>
                <OnePicture id="1"/>
            </Container>
            <Footer/>
        </div>

    )
}

export default Picture