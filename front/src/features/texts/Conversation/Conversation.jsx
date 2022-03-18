import { useState } from 'react';

import { FormText, Text } from 'features/texts';
import { Archive } from 'features/ui';

import './conversation.scss';

function Conversation(props){
    const text = props.item;
    const [showResponses, setShowResponses] = useState(false);
    const [responses, setResponses] = useState(null);

    /**
     * Toggle the display of responses.
     */
    function handleShowResponses(){
        setShowResponses(!showResponses);
    }

    return(
        <div className="conversation">
            <div className="conversation__first-text">
                <Text item={text} showResponses={showResponses} handle={handleShowResponses} items={props.items} setItems={props.setItems}/>
            </div>
            {showResponses && <div className="conversation__responses">
                <Archive path={`text/${text.id}/page/`} list={responses} setList={setResponses}>
                    <Text/>
                </Archive>
                <FormText texts={responses} set={setResponses} parent={text.id} response/>
            </div>}   
        </div>
    )
}

export default Conversation;