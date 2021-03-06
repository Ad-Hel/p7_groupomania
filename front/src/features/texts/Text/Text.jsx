import { useAuth } from "features/users";

import { Button, ModActions } from "features/ui";
import { Reactions } from "features/likes";

import './text.scss'

function Text(props){
    const text      = props.item;
    const list      = props.items;
    const setList   = props.setItems;
    const { auth }  = useAuth();

    return(
        <section className="text">
            <header className="text__header">
                <h2 className="text__author">
                    {text.User.firstName} {text.User.lastName}
                </h2>
            </header>
            <p className="text__content">
                {text.content}
            </p>
            <footer className="text__footer">   
                {props.handle && 
                <Button type='button' onclick={props.handle} classStyle={`icon button--${props.showResponses}`}>
                    <span className="visually-hidden">Voir les réponses</span>
                    <span>
                        <svg aria-hidden="true" height="15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z"/>
                        </svg>
                    </span>
                </Button>}
                {auth.id === text.UserId && <ModActions list={list} setList={setList} id={text.id} path='text' deletedAt={text.deletedAt}/>}
                {auth.role > text.User.role && <ModActions isMod list={list} setList={setList} id={text.id} path='text' deletedAt={text.deletedAt}/>}
                <Reactions auth={auth} target={text} path='text'/>
            </footer>
        </section>
    )
}

export default Text;