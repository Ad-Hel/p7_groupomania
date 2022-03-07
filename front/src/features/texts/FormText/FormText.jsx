import { useState, useEffect } from 'react';

import apiRequest from 'apiRequest';
import { useAuth } from 'features/users';

import { Form, Button } from 'features/ui';

function FormText(props){
    const [ text, setText ] = useState({
        content: ''
    });
    const [ error, setError ] = useState(null);
    const [ characterCount, setCharacterCount ] = useState(255);
    const { auth } = useAuth();
    const texts = props.texts;
    const setTexts = props.set;

    useEffect( () => {
        /**
         * Set the ParentId property if the form text is used to answer another text.
         */
        if (props.parent){
            setText({
                ...text,
                ParentId: props.parent
            })
        }
    }, []);

    /**
     * 
     * This function make an API call to create a new text ressource.
     * The data is an object which contains a content and mays contain a parent id if it is a response to an existing text.
     * 
     * @name createText
     * @function
     * @param {object &{content: string, ParentId: integer}} data 
     */
    async function createText(data){
        const args = {
            head: {
                "Content-Type": "application/json"
            },
            init: {
                method: 'POST',
                body: data
            },
            token: auth.token,
            url: 'text/'
        }
        const res = await apiRequest(args);
        if (res.status === 201){
            let newTexts = [];
            /**
             * 
             * The new text is added at the top of the list if it starts a new conversation. 
             * It is added at the bottom, if it's an answer to an existing text.
             * 
             */
            if (res.data.ParentId){
                newTexts = [
                    ...((texts.length > 0) ? texts : []),
                    {
                        ...res.data,
                        User: auth,
                        Likes: [],
                        Texts: []
                    }
                ];
            } else {
                newTexts = [
                    {
                        ...res.data,
                        User: auth,
                        Likes: [],
                        Texts: []
                    },
                    ...((texts.length > 0) ? texts : []), 
                ];
            }
            
            setTexts(newTexts);
            setText({
                ...text,
                content: ''
            });
        } else {
            setError(res.data[0])
        }
    }

    /**
     * 
     * This function get the value of the input named content to saved it in text state.
     * A first test reset the error state if an error was displayed.
     * A second test prevent user to make line break as they are not displayed back in text.
     * 
     * @name handleInput
     * @function
     * @param {event} event 
     */
    function handleInput(event){
        if (error){
            setError(null);
        }
        if (!event.target.value.match(/\n/g) ){
            setText({
                ...text,
                [event.target.name]: event.target.value
            });
        setCharacterCount( 255 - text.content.length);
        }            
    }

    /**
     * 
     * This function stringify the text content and call createText to make the API calL.
     * 
     * @param {event} form 
     */
    function handleFormSubmit(form){
        form.preventDefault();
        const stringText = JSON.stringify(text);
        createText(stringText);
    }

    return(
        <Form action={handleFormSubmit} classStyle='form--text'>
            <textarea className='form--text__textarea' onChange={handleInput} name="content" maxLength="300" minLength="1" autoComplete="off" value={text.content} placeholder='Une question, une idée, une pensée ?'>
            </textarea>
            {error && <span className='form--text__error'>{error}</span>}
            <span className={characterCount > 0 ? 'form--text__counter' : 'form--text__counter form--text__counter--alert'}>{characterCount}</span>
            <Button type="submit" classStyle='text'><span>{!props.response ? <svg height="15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"/></svg> : <svg height="15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M8.31 189.9l176-151.1c15.41-13.3 39.69-2.509 39.69 18.16v80.05C384.6 137.9 512 170.1 512 322.3c0 61.44-39.59 122.3-83.34 154.1c-13.66 9.938-33.09-2.531-28.06-18.62c45.34-145-21.5-183.5-176.6-185.8v87.92c0 20.7-24.31 31.45-39.69 18.16l-176-151.1C-2.753 216.6-2.784 199.4 8.31 189.9z"/></svg>}</span></Button>
        </Form>
    )
}

export default FormText