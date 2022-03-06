import { useState } from "react";

import Container from "../layout/Container";
import FormText from "../components/FormText";
import Conversation from "../components/Conversation";
import Archive from "../components/Archive";

import '../scss/component/text.scss';


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