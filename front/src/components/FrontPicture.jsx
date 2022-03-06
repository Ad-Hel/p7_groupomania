import { Link } from 'react-router-dom';

import useAuth from './useAuth';

import Reactions from "./Reactions";
import ModActions from './ModActions';

import '../scss/component/front-picture.scss';


function FrontPicture(props){
    const picture = props.item;
    const {auth} = useAuth();


    return(
        <article className="front-picture">
                <header className="front-picture__header">
                    <Link to={`/picture/${picture.id}`}>
                        <h3 className="front-picture__title">{picture.title}</h3>
                    </Link>                   
                </header>
                <img className="front-picture__image" src={picture.imageUrl} alt=""/>
                <footer className="front-picture__footer">
                    <Link to={`/user/${picture.UserId}`}>{picture.User.firstName} {picture.User.lastName}</Link>
                    {auth.role > 1 && <ModActions isMod list={props.items} setList={props.setItems} path="picture" id={picture.id} deletedAt={picture.deletedAt}/>}
                    <Reactions auth={auth} target={picture} path='picture' />
                </footer>
        </article>
    )
}

export default FrontPicture