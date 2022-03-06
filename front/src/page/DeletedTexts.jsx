import Container from "../layout/Container";
import Text from "../components/Text";
import Archive from "../components/Archive";

import '../scss/page/deletedTexts.scss';

function DeletedTexts(){
    
    return(
        <Container>
            <div className="deletedTexts">
                <Archive path='text/deleted/page/'>
                    <Text/>
                </Archive>
            </div>
        </Container>
    )
}

export default DeletedTexts;