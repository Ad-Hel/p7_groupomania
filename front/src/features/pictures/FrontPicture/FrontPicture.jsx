import { Link } from 'react-router-dom';

import { useAuth } from 'features/users';

import { Reactions } from "features/likes";
import { ModActions } from 'features/ui';

import './front-picture.scss';


function FrontPicture(props){
    const picture = props.item;
    const {auth} = useAuth();


    return(
        <article className="front-picture">
                <header className="front-picture__header">
                    <Link to={`/picture/${picture.id}`}>
                        <h2 className="front-picture__title">{picture.title}</h2>
                    </Link>                   
                </header>
                <img className="front-picture__image" src={picture.imageUrl} alt=""/>
                <footer className="front-picture__footer">
                    <Link to={`/user/${picture.UserId}`} className="front-picture__author">{picture.User.firstName} {picture.User.lastName}</Link>
                    {auth.role > 1 && <ModActions isMod list={props.items} setList={props.setItems} path="picture" id={picture.id} deletedAt={picture.deletedAt}/>}
                    <Reactions auth={auth} target={picture} path='picture' />
                </footer>
        </article>
    )
}

export default FrontPicture