import { Archive, Container } from "features/ui";
import { Text } from "features/texts";

import './deletedTexts.scss';

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