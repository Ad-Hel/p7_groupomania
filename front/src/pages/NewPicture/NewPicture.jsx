import { Container } from "features/ui";
import { FormPicture } from "features/pictures";

function NewPicture(){
    return(
        <Container>
            <h1>Nouvelle image</h1>
            <FormPicture/>
        </Container>

    )
}

export default NewPicture