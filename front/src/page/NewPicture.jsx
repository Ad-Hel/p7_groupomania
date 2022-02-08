import Container from "../layout/Container";
import FormPicture from "../components/FormPicture";



function NewPicture(){
    return(
        <Container>
            <h1>Nouvelle image</h1>
            <FormPicture/>
        </Container>

    )
}

export default NewPicture