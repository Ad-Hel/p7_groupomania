import { useEffect, useState } from "react";

import apiRequest from "apiRequest";
import { useAuth } from "features/users";

import { Text } from "features/texts";

function Responses(props){
    const [responses, setResponses] = useState(null);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);

    const { auth } = useAuth();

    useEffect(() => {
        /**
         * 
         * This function makes an API call to get the answers of the specified text. 
         * The text parent is determined by its id. 
         * 
         * @name getResponses
         * @function
         * @param {integer} id 
         */
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
    }, [auth.token, props.id, page])

    return( 
        <>
            { responses && responses.map((response) => (
                <Text text={response} />
            ))}
        </>
    )
}

export default Responses;