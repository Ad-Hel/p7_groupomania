import { useState, useEffect, useRef } from 'react';

import useAuth from './useAuth';
import apiRequest from '../js/apiRequest';

import FormText from './FormText';
import Text from './Text';
import Button from './Button';

import '../scss/component/conversation.scss';

function Conversation(props){
    const text = props.text;
    const { auth } = useAuth();

    const [showResponses, setShowResponses] = useState(false);
    const [responses, setResponses] = useState(null);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const onLoad = useRef(true);

    
    useEffect(() => {
        if ( onLoad.current ){
            onLoad.current = false;
            return;
        }
        
        async function getResponses(id, page){
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
        if ( showResponses ){
            getResponses(text.id, page)
        }
    }, [showResponses, page])

    function handleShowResponses(){
        setShowResponses(!showResponses);
    }

    function handlePagination(){
        setPage(page + 1 );
    }

    return(
        <article className="conversation">
            <div className="conversation__first-text">
            {!(text.Texts && showResponses) ? 
                <Text text={text}  handle={handleShowResponses} />
            :
                <Text text={text} show handle={handleShowResponses}/>
            }
            </div>
            {(text.Texts && showResponses) && <div className="conversation__responses">
                { responses && responses.map((response) => (
                    <Text key={response.id} text={response} />
                ))}
                {!isLastPage && <Button type="button" classStyle="next" onclick={handlePagination}>Page suivante</Button>}
                <FormText texts={responses} set={setResponses} parent={text.id} label='répondre'/>
            </div>}   
        </article>
    )
}

export default Conversation;