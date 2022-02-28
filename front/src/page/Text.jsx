
import { useEffect, useState } from "react";

import useAuth from "../components/useAuth";
import apiRequest from "../js/apiRequest";

import Container from "../layout/Container";
import FormText from "../components/FormText";
import Conversation from "../components/Conversation";
import Button from "../components/Button";

import '../scss/component/text.scss';

function NewText(){
    const [ texts, setTexts ] = useState(null);
    const [ page, setPage ] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        async function getTexts(page){
            const args = {
                token: auth.token,
                url: 'text/page/' + page
            }
            const res = await apiRequest(args);
            if (res.status === 200 ){
                console.log(res.data.rows)
                setTexts(res.data.rows)
                if ( (page * 9 ) > res.data.count ){
                    setIsLastPage(true);
                } 
            }
        }
        getTexts(page)
    }, [page]);

    function handlePagination(){
        setPage(page + 1);
    }
    

    return(
        <Container>
            <FormText texts={texts} set={setTexts}/>
            { texts && texts.map((text) => (
                <Conversation text={text} texts={texts} setTexts={setTexts} key={text.id} />
            ))}
            {!isLastPage && <Button type="button" classStyle="next" onclick={handlePagination}>Page suivante</Button>}
        </Container>
    )
}

export default NewText;