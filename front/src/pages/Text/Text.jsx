import { useState } from "react";

import { Archive, Container} from "features/ui";
import { Conversation, FormText } from "features/texts";

function Text(){
    const [texts, setTexts] = useState(null);

    return(
        <Container>
            <FormText texts={texts} set={setTexts} />
            <Archive path="text/page/" list={texts} setList={setTexts}>
                <Conversation/>
            </Archive>
        </Container>
    )
}

export default Text;