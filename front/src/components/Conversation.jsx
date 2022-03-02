import { useState, useEffect } from 'react';

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
    
    useEffect(() => {
       
        /**
         * 
         * This function make an API call with a text id and page number to get its responses.
         * 
         * @name getResponses
         * @function
         * @param {integer} id 
         * @param {integer} page 
         */
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

        /**
         * Avoid to get responses if it's hidden.
         */
        if ( showResponses ){
            getResponses(text.id, page)
        }

    }, [showResponses, page, auth.token, text.id])

    /**
     * Toggle the display of responses.
     */
    function handleShowResponses(){
        setShowResponses(!showResponses);
    }

    /**
     * Increment the page number.
     */
    function handlePagination(){
        setPage(page + 1 );
    }

    return(
        <article className="conversation">
            <div className="conversation__first-text">
                <Text text={text} showResponses={showResponses} handle={handleShowResponses} list={props.texts} setList={props.setTexts}/>
            </div>
            {showResponses && <div className="conversation__responses">
                {responses && responses.map((response) => (
                    <Text key={response.id} text={response} list={responses} setList={setResponses} />
                ))}
                {!isLastPage && <Button type="button" classStyle="next" onclick={handlePagination}>Page suivante</Button>}
                {isLastPage && <FormText texts={responses} set={setResponses} parent={text.id} response/>}
            </div>}   
        </article>
    )
}

export default Conversation;