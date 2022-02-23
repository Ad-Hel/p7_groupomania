import { useEffect, useState } from "react";
import apiRequest from "../js/apiRequest";
import Text from "./Text";
import useAuth from "./useAuth";

function Responses(props){
    const [responses, setResponses] = useState(null);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);

    const { auth } = useAuth();

    useEffect(() => {
        async function getResponses(id){
            const args = {
                url: 'text/' + id + '/page/' + page,
                token: auth.token
            };
            const res = await apiRequest(args);
            if ( res.status === 200 ){
                setResponses(res.data.rows);
                if ( (page * 9 ) > res.data.count ){
                    setIsLastPage(true);
                };
            };
        };
        getResponses(props.id)
    }, [])

    return( 
        <>
            { responses && responses.map((response) => (
                <Text text={response} />
            ))}
        </>
    )
}

export default Responses;