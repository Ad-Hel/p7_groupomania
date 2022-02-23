import { useState, useEffect } from 'react';

import useAuth from './useAuth';

import Form from './Form';
import Input from './Input';
import Button from './Button';
import apiRequest from '../js/apiRequest';

function FormText(props){
    const [ text, setText ] = useState('');
    const { auth } = useAuth();
    const texts = props.texts;
    const setTexts = props.set;

    useEffect( () => {
        if (props.text){
            setText(props.text)
        }
        if (props.parent){
            setText({
                ...text,
                ParentId: props.parent
            })
        }
    }, []);

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
            const newTexts = [
                (res.data.parentId && {
                    ...res.data,
                    User: auth,
                    Likes: [],
                    Texts: []
                }),
                ...((texts.length > 0) ? texts : []),
            ];
            setTexts(newTexts);
        }
    }

    function handleInput(event){
        setText({
            ...text,
            [event.target.name]: event.target.value
        });
    }

    function handleFormSubmit(form){
        form.preventDefault();
        const stringText = JSON.stringify(text);
        setText({
            content: ''
        });
        console.log(text);
        if (props.isModify){
            // modifyText(stringText);
        } else {
            createText(stringText);
        };
    }

    return(
        <Form action={handleFormSubmit} classStyle='form--text'>
            <Input label="none" type="text" name="content" value={text.content} onchange={handleInput} error='none'/>
            <Button type="submit" classStyle='none button--text'>{props.label}</Button>
            {props.error && <p className="error">{props.error}</p>}
        </Form>
    )
}

export default FormText