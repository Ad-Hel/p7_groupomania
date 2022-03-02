
import { useEffect, useState } from "react";

import useAuth from "../components/useAuth";
import apiRequest from "../js/apiRequest";

import Container from "../layout/Container";
import Text from "../components/Text";
import Button from "../components/Button";

import '../scss/page/deletedTexts.scss';

function DeletedTexts(){
    const [ texts, setTexts ] = useState(null);
    const [ page, setPage ] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        async function getTexts(page){
            const args = {
                token: auth.token,
                url: 'text/deleted/page/' + page
            }
            const res = await apiRequest(args);
            if (res.status === 200 ){
                console.log(res.data.rows)
                setTexts(res.data.rows)
                console.log(res.data.count)
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
            <div className="deletedTexts">
                { texts && texts.map((text) => (
                    <Text text={text} texts={texts} setTexts={setTexts} key={text.id} />
                ))}
            </div>
            {!isLastPage && <Button type="button" classStyle="next" onclick={handlePagination}>Page suivante</Button>}
        </Container>
    )
}

export default DeletedTexts;