import '../scss/component/front-picture.scss';
import Reactions from "./Reactions";
import { Link } from 'react-router-dom'

function FrontPicture(props){
    const picture = props.picture;
    const auth = props.auth;
    return(
        <article className="front-picture">
                <header className="front-picture__header">
                    <Link to={`/picture/${picture.id}`}>
                        <h3 className="front-picture__title">{picture.title}</h3>
                    </Link>                   
                </header>
                <img className="front-picture__image" src={picture.imageUrl} alt=""/>
                <footer className="front-picture__footer">
                    <Link to={`/user/${picture.UserId}`} replace>{picture.User.firstName} {picture.User.lastName}</Link>
                    <Reactions auth={auth} picture={picture}/>
                </footer>
        </article>
    )
}

export default FrontPicture